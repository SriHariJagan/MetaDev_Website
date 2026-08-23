import { useEffect, useState, useCallback } from 'react';
import { subscriptionsApi, organizationsApi, plansApi, type Subscription } from '@/services/api';
import { Plus, Search, CreditCard, RefreshCw, Ban } from 'lucide-react';
import { DashModal, PageHead, EmptyState } from './_shared';

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'dash-badge--green',
  TRIALING: 'dash-badge--blue',
  PAST_DUE: 'dash-badge--amber',
  PAUSED: 'dash-badge--amber',
  CANCELLED: 'dash-badge--red',
  EXPIRED: 'dash-badge--gray',
};

export function SubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [orgs, setOrgs] = useState<{ id: string; name: string }[]>([]);
  const [plans, setPlans] = useState<{ id: string; name: string; moduleId: string }[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ organizationId: '', planId: '', status: 'ACTIVE', startsAt: '', trialEndsAt: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: '50' };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const { data } = await subscriptionsApi.list(params);
      setSubs(data.data ?? []);
    } catch { /* ignore */ }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => {
    load();
    Promise.allSettled([organizationsApi.list({ limit: '50' }), plansApi.list({ limit: '50' })]).then(([o, p]) => {
      if (o.status === 'fulfilled') setOrgs((o.value.data.data ?? []).map((x) => ({ id: x.id, name: x.name })));
      if (p.status === 'fulfilled') setPlans((p.value.data.data ?? []).map((x) => ({ id: x.id, name: x.name, moduleId: x.moduleId })));
    });
  }, [load]);

  const handleCreate = async () => {
    try {
      await subscriptionsApi.create({
        organizationId: form.organizationId,
        planId: form.planId,
        status: form.status,
        ...(form.startsAt ? { startsAt: new Date(form.startsAt).toISOString() } : {}),
        ...(form.trialEndsAt ? { trialEndsAt: new Date(form.trialEndsAt).toISOString() } : {}),
      });
      setShowCreate(false);
      setForm({ organizationId: '', planId: '', status: 'ACTIVE', startsAt: '', trialEndsAt: '' });
      load();
    } catch { alert('Failed to create subscription'); }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Cancel this subscription?')) return;
    try { await subscriptionsApi.cancel(id); load(); } catch { alert('Failed to cancel'); }
  };

  const handleRenew = async (id: string) => {
    try { await subscriptionsApi.renew(id); load(); } catch { alert('Failed to renew'); }
  };

  const fmtDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

  return (
    <>
      <PageHead
        title="Subscriptions"
        subtitle="Organization plans and billing lifecycle"
        action={
          <button className="dash-btn dash-btn--primary" onClick={() => setShowCreate(true)}>
            <Plus size={15} /> Add Subscription
          </button>
        }
      />

      <div className="dash-toolbar">
        <div className="dash-search">
          <Search size={14} className="dash-search__icon" />
          <input className="dash-input" placeholder="Search subscriptions…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="dash-select" style={{ width: 150 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="TRIALING">Trialing</option>
          <option value="PAST_DUE">Past Due</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      <div className="dash-tablewrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Auto-Renew</th>
              <th>Period</th>
              <th style={{ width: 100 }} />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="dash-table__empty">Loading…</td></tr>
            ) : subs.length === 0 ? (
              <tr><td colSpan={6}><EmptyState icon={<CreditCard size={28} />} message="No subscriptions found." /></td></tr>
            ) : subs.map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="dash-entity">
                    <div className="dash-stat__icon" style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(99,102,241,0.1)' }}>
                      <CreditCard size={15} style={{ color: '#6366f1' }} />
                    </div>
                    <div>
                      <p className="dash-table__cellmain">{s.plan?.name ?? '—'}</p>
                      {s.plan && (
                        <p className="dash-table__cellsub">
                          ${Number(s.plan.price).toFixed(2)} / {s.plan.billingInterval.toLowerCase()}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <p className="dash-table__cellmain">{s.organization?.name ?? '—'}</p>
                </td>
                <td>
                  <span className={`dash-badge ${STATUS_BADGE[s.status] ?? 'dash-badge--gray'}`}>
                    <span className="dash-badge__dot" />
                    {s.status}
                  </span>
                </td>
                <td>{s.autoRenew ? <span className="dash-badge dash-badge--green">On</span> : <span className="dash-muted">Off</span>}</td>
                <td className="dash-muted" style={{ fontSize: 12 }}>
                  {fmtDate(s.startsAt)} → {fmtDate(s.endsAt)}
                  {s.trialEndsAt && (
                    <span style={{ display: 'block', fontSize: 11 }}>Trial ends {fmtDate(s.trialEndsAt)}</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                    <button className="dash-rowaction" title="Renew" onClick={() => handleRenew(s.id)}>
                      <RefreshCw size={14} />
                    </button>
                    <button className="dash-rowaction dash-rowaction--danger" title="Cancel" onClick={() => handleCancel(s.id)}>
                      <Ban size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <DashModal title="Create Subscription" onClose={() => setShowCreate(false)}>
          <div className="dash-field">
            <label className="dash-field__label">Organization</label>
            <select className="dash-select" value={form.organizationId} onChange={(e) => setForm({ ...form, organizationId: e.target.value })}>
              <option value="">Select organization…</option>
              {orgs.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Plan</label>
            <select className="dash-select" value={form.planId} onChange={(e) => setForm({ ...form, planId: e.target.value })}>
              <option value="">Select plan…</option>
              {plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="dash-form-row">
            <div className="dash-field">
              <label className="dash-field__label">Starts at</label>
              <input className="dash-input" type="date" value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} />
            </div>
            <div className="dash-field">
              <label className="dash-field__label">Trial ends (optional)</label>
              <input className="dash-input" type="date" value={form.trialEndsAt} onChange={(e) => setForm({ ...form, trialEndsAt: e.target.value })} />
            </div>
          </div>
          <button
            className="dash-btn dash-btn--primary"
            style={{ justifyContent: 'center', marginTop: 4 }}
            onClick={handleCreate}
            disabled={!form.organizationId || !form.planId}
          >
            Create Subscription
          </button>
        </DashModal>
      )}
    </>
  );
}

export default SubscriptionsPage;
