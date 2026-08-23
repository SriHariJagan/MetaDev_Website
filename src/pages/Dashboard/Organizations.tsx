import { useEffect, useState, useCallback } from 'react';
import { organizationsApi, type Organization } from '@/services/api';
import { Plus, Search, Building2, Mail } from 'lucide-react';
import { DashModal, PageHead, EmptyState } from './_shared';

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'dash-badge--green',
  INACTIVE: 'dash-badge--gray',
  SUSPENDED: 'dash-badge--red',
};

export function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', email: '', phone: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: '50' };
      if (search) params.search = search;
      const { data } = await organizationsApi.list(params);
      setOrgs(data.data ?? []);
    } catch { /* ignore */ }
    setLoading(false);
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    try {
      await organizationsApi.create({
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        email: form.email || undefined,
        phone: form.phone || undefined,
      });
      setShowCreate(false);
      setForm({ name: '', slug: '', email: '', phone: '' });
      load();
    } catch { alert('Failed to create organization'); }
  };

  return (
    <>
      <PageHead
        title="Organizations"
        subtitle="Tenants using the platform"
        action={
          <button className="dash-btn dash-btn--primary" onClick={() => setShowCreate(true)}>
            <Plus size={15} /> Add Organization
          </button>
        }
      />

      <div className="dash-toolbar">
        <div className="dash-search">
          <Search size={14} className="dash-search__icon" />
          <input className="dash-input" placeholder="Search organizations…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="dash-tablewrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Slug</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="dash-table__empty">Loading…</td></tr>
            ) : orgs.length === 0 ? (
              <tr><td colSpan={4}><EmptyState icon={<Building2 size={28} />} message="No organizations found." /></td></tr>
            ) : orgs.map((o) => (
              <tr key={o.id}>
                <td>
                  <div className="dash-entity">
                    <div className="dash-stat__icon" style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(8,145,178,0.1)' }}>
                      <Building2 size={16} style={{ color: '#0891b2' }} />
                    </div>
                    <p className="dash-table__cellmain">{o.name}</p>
                  </div>
                </td>
                <td><span className="dash-chip">{o.slug}</span></td>
                <td>
                  {o.email ? (
                    <span className="dash-muted" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5 }}>
                      <Mail size={12} />{o.email}
                    </span>
                  ) : (
                    <span className="dash-muted">—</span>
                  )}
                </td>
                <td>
                  <span className={`dash-badge ${STATUS_BADGE[o.status] ?? 'dash-badge--gray'}`}>
                    <span className="dash-badge__dot" />
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <DashModal title="Create Organization" onClose={() => setShowCreate(false)}>
          <div className="dash-field">
            <label className="dash-field__label">Name</label>
            <input className="dash-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Slug (auto from name if blank)</label>
            <input className="dash-input dash-mono" placeholder="acme-corp" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Email (optional)</label>
            <input className="dash-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Phone (optional)</label>
            <input className="dash-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <button className="dash-btn dash-btn--primary" style={{ justifyContent: 'center', marginTop: 4 }} onClick={handleCreate}>
            Create Organization
          </button>
        </DashModal>
      )}
    </>
  );
}

export default OrganizationsPage;
