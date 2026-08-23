import { useEffect, useState, useCallback } from 'react';
import { modulesApi, plansApi, type Module, type Plan } from '@/services/api';
import { Plus, Search, Boxes } from 'lucide-react';
import { DashModal, PageHead, EmptyState } from './_shared';

const COLORS = ['#6366f1', '#0891b2', '#059669', '#d97706', '#db2777', '#dc2626', '#7c3aed', '#0d9488'];

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'dash-badge--green',
  INACTIVE: 'dash-badge--gray',
};

export function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', description: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: '50' };
      if (search) params.search = search;
      const { data } = await modulesApi.list(params);
      setModules(data.data ?? []);
    } catch { /* ignore */ }
    setLoading(false);
  }, [search]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    plansApi.list({ limit: '50' }).then(({ data }) => setPlans(data.data ?? [])).catch(() => {});
  }, []);

  const handleCreate = async () => {
    try {
      await modulesApi.create(form);
      setShowCreate(false);
      setForm({ name: '', code: '', description: '' });
      load();
    } catch { alert('Failed to create module'); }
  };

  return (
    <>
      <PageHead
        title="Modules"
        subtitle="Products and feature modules on the platform"
        action={
          <button className="dash-btn dash-btn--primary" onClick={() => setShowCreate(true)}>
            <Plus size={15} /> Add Module
          </button>
        }
      />

      <div className="dash-toolbar">
        <div className="dash-search">
          <Search size={14} className="dash-search__icon" />
          <input className="dash-input" placeholder="Search modules…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="dash-tablewrap"><div className="dash-table__empty">Loading…</div></div>
      ) : modules.length === 0 ? (
        <div className="dash-tablewrap"><EmptyState icon={<Boxes size={28} />} message="No modules found." /></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 14 }}>
          {modules.map((m, i) => {
            const color = COLORS[i % COLORS.length];
            const planCount = plans.filter((p) => p.moduleId === m.id).length;
            return (
              <section key={m.id} className="dash-card" style={{ overflow: 'hidden', transition: 'all 0.18s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, ${color}55)` }} />
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div className="dash-stat__icon" style={{ width: 38, height: 38, borderRadius: 10, background: `${color}12` }}>
                      <Boxes size={18} style={{ color }} strokeWidth={2.2} />
                    </div>
                    <span className={`dash-badge ${STATUS_BADGE[m.status] ?? 'dash-badge--gray'}`}>
                      <span className="dash-badge__dot" />
                      {m.status}
                    </span>
                  </div>
                  <p className="dash-table__cellmain" style={{ fontSize: 14.5 }}>{m.name}</p>
                  <p><span className="dash-chip">{m.code}</span></p>
                  {m.description && (
                    <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.55, marginTop: 8 }}>{m.description}</p>
                  )}
                  <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #f1f4f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="dash-muted" style={{ fontSize: 12 }}>
                      {planCount} plan{planCount === 1 ? '' : 's'}
                    </span>
                    <a href={`/dashboard/product/${m.code.toLowerCase()}`} style={{ fontSize: 12.5, fontWeight: 600, color, textDecoration: 'none' }}>
                      Open →
                    </a>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {showCreate && (
        <DashModal title="Create Module" onClose={() => setShowCreate(false)}>
          <div className="dash-field">
            <label className="dash-field__label">Name</label>
            <input className="dash-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Code</label>
            <input className="dash-input dash-mono" placeholder="e.g. METAHEALTH" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Description (optional)</label>
            <textarea className="dash-input" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <button className="dash-btn dash-btn--primary" style={{ justifyContent: 'center', marginTop: 4 }} onClick={handleCreate}>
            Create Module
          </button>
        </DashModal>
      )}
    </>
  );
}

export default ModulesPage;
