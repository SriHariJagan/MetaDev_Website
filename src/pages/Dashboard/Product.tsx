import { useEffect, useState } from 'react';
import { useParams, NavLink, Outlet, useOutletContext } from 'react-router-dom';
import { modulesApi, plansApi, subscriptionsApi, type Module, type Plan, type Subscription } from '@/services/api';
import { ArrowLeft, BarChart3, Tags, CreditCard, Settings2, Boxes } from 'lucide-react';
import { EmptyState } from './_shared';

type ProductContext = {
  module: Module | null;
  plans: Plan[];
  subs: Subscription[];
  loading: boolean;
};

function useProductContext() {
  return useOutletContext<ProductContext>();
}

export function ProductPage() {
  const { code } = useParams();
  const [module, setModule] = useState<Module | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    let mod: Module | undefined;
    modulesApi.list({ limit: '50' })
      .then(({ data }) => {
        mod = data.data?.find((m) => m.code.toLowerCase() === code.toLowerCase());
        setModule(mod ?? null);
        if (!mod) return;
        return Promise.allSettled([
          plansApi.list({ moduleId: mod.id, limit: '50' }),
          subscriptionsApi.list({ moduleId: mod.id, limit: '50' }),
        ]).then(([p, s]) => {
          if (p.status === 'fulfilled') setPlans(p.value.data.data ?? []);
          if (s.status === 'fulfilled') setSubs(s.value.data.data ?? []);
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [code]);

  const tabs = [
    { path: '', label: 'Overview', icon: BarChart3 },
    { path: '/plans', label: 'Plans', icon: Tags },
    { path: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { path: '/settings', label: 'Settings', icon: Settings2 },
  ];

  return (
    <>
      {/* Product hero */}
      <section className="dash-card" style={{ overflow: 'hidden' }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
        <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <NavLink to="/dashboard/modules" className="dash-iconbtn" aria-label="Back to modules">
            <ArrowLeft size={15} />
          </NavLink>
          <div className="dash-stat__icon" style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(99,102,241,0.1)' }}>
            <Boxes size={21} style={{ color: '#6366f1' }} strokeWidth={2.1} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <h1 className="dash-pagehead__title" style={{ fontSize: 18 }}>{module?.name ?? code}</h1>
            <p className="dash-table__cellsub">{module?.description ?? 'Product module'}</p>
          </div>
          {module && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="dash-badge dash-badge--blue"><Tags size={10} /> {plans.length} plans</span>
              <span className="dash-badge dash-badge--cyan"><CreditCard size={10} /> {subs.length} subs</span>
            </div>
          )}
        </div>
      </section>

      {/* Tabs */}
      <div className="dash-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={`/dashboard/product/${code}${tab.path}`}
              end={tab.path === ''}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '10px 14px',
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#4f46e5' : '#64748b',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #4f46e5' : '2px solid transparent',
                marginBottom: -1,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              })}
            >
              <Icon size={14} />
              {tab.label}
            </NavLink>
          );
        })}
      </div>

      <Outlet context={{ module, plans, subs, loading }} />
    </>
  );
}

/* ---------- Overview ---------- */

export function ProductOverview() {
  const { module, plans, subs, loading } = useProductContext();
  if (loading) return <div className="dash-card"><div className="dash-table__empty">Loading…</div></div>;
  if (!module) return <div className="dash-card"><EmptyState message="Module not found." /></div>;

  const activeSubs = subs.filter((s) => s.status === 'ACTIVE').length;
  const trialing = subs.filter((s) => s.status === 'TRIALING').length;

  const cards = [
    { label: 'Plans', value: plans.length, color: '#6366f1' },
    { label: 'Active Subscriptions', value: activeSubs, color: '#059669' },
    { label: 'Trialing', value: trialing, color: '#2563eb' },
    { label: 'Total Subscriptions', value: subs.length, color: '#0891b2' },
  ];

  return (
    <>
      <div className="dash-stats">
        {cards.map((c) => (
          <div key={c.label} className="dash-stat" style={{ cursor: 'default' }}>
            <div className="dash-stat__accent" style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}55)` }} />
            <p className="dash-stat__label">{c.label}</p>
            <p className="dash-stat__value">{c.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <section className="dash-card">
        <header className="dash-card__header">
          <h2 className="dash-card__title">About this module</h2>
          <span className={`dash-badge ${module.status === 'ACTIVE' ? 'dash-badge--green' : 'dash-badge--gray'}`}>
            <span className="dash-badge__dot" />{module.status}
          </span>
        </header>
        <div className="dash-card__body">
          <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#334155' }}>
            {module.description || 'No description provided yet.'}
          </p>
        </div>
      </section>
    </>
  );
}

/* ---------- Plans ---------- */

export function ProductPlans() {
  const { plans, loading } = useProductContext();
  if (loading) return <div className="dash-card"><div className="dash-table__empty">Loading…</div></div>;

  return (
    plans.length === 0 ? (
      <div className="dash-tablewrap"><EmptyState icon={<Tags size={28} />} message="No plans configured for this module." /></div>
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: 14 }}>
        {plans.map((plan) => (
          <section key={plan.id} className="dash-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <p className="dash-table__cellmain" style={{ fontSize: 14.5 }}>{plan.name}</p>
              <span className={`dash-badge ${plan.status === 'ACTIVE' ? 'dash-badge--green' : 'dash-badge--gray'}`}>{plan.status}</span>
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a' }}>
              ${Number(plan.price).toFixed(2)}
              <span className="dash-muted" style={{ fontSize: 12.5, fontWeight: 500 }}> / {plan.billingInterval.toLowerCase()}</span>
            </p>
            {plan.description && <p style={{ fontSize: 12.5, color: '#64748b', marginTop: 8, lineHeight: 1.55 }}>{plan.description}</p>}
            {plan.trialDays > 0 && (
              <p style={{ marginTop: 12 }}>
                <span className="dash-badge dash-badge--blue">{plan.trialDays}-day trial</span>
              </p>
            )}
          </section>
        ))}
      </div>
    )
  );
}

/* ---------- Subscriptions ---------- */

export function ProductSubscriptions() {
  const { subs, loading } = useProductContext();

  if (loading) return <div className="dash-tablewrap"><div className="dash-table__empty">Loading…</div></div>;

  return (
    <div className="dash-tablewrap">
      <table className="dash-table">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Renews</th>
          </tr>
        </thead>
        <tbody>
          {subs.length === 0 ? (
            <tr><td colSpan={4}><EmptyState icon={<CreditCard size={28} />} message="No subscriptions for this module." /></td></tr>
          ) : subs.map((s) => (
            <tr key={s.id}>
              <td className="dash-table__cellmain">{s.organization?.name ?? '—'}</td>
              <td>{s.plan?.name ?? '—'}</td>
              <td>
                <span className={`dash-badge ${['ACTIVE'].includes(s.status) ? 'dash-badge--green' : s.status === 'TRIALING' ? 'dash-badge--blue' : 'dash-badge--gray'}`}>
                  <span className="dash-badge__dot" />{s.status}
                </span>
              </td>
              <td className="dash-muted">{s.endsAt ? new Date(s.endsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Settings ---------- */

export function ProductSettings() {
  const { module } = useProductContext();
  return (
    <section className="dash-card" style={{ maxWidth: 480 }}>
      <header className="dash-card__header">
        <h2 className="dash-card__title"><Settings2 size={15} /> Module Settings</h2>
      </header>
      <div className="dash-card__body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="dash-field">
          <label className="dash-field__label">Name</label>
          <input className="dash-input" defaultValue={module?.name ?? ''} key={`n-${module?.id}`} />
        </div>
        <div className="dash-field">
          <label className="dash-field__label">Code</label>
          <input className="dash-input dash-mono" defaultValue={module?.code ?? ''} disabled style={{ opacity: 0.6 }} key={`c-${module?.id}`} />
        </div>
        <div className="dash-field">
          <label className="dash-field__label">Description</label>
          <textarea className="dash-input" rows={3} defaultValue={module?.description ?? ''} key={`d-${module?.id}`} />
        </div>
        <button className="dash-btn dash-btn--primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
      </div>
    </section>
  );
}

export default ProductPage;
