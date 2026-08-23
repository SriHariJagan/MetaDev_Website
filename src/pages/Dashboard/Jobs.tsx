import { useEffect, useState, useCallback } from 'react';
import { jobsApi, modulesApi, type Job, type Module } from '@/services/api';
import { Plus, Search, Trash2, Briefcase, MapPin } from 'lucide-react';
import { DashModal, PageHead, EmptyState } from './_shared';

const STATUS_BADGE: Record<string, string> = {
  DRAFT: 'dash-badge--gray',
  PUBLISHED: 'dash-badge--green',
  CLOSED: 'dash-badge--red',
  ARCHIVED: 'dash-badge--gray',
};

export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', location: '', employmentType: 'FULL_TIME', moduleId: '' });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: '50' };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const { data } = await jobsApi.list(params);
      setJobs(data.data ?? []);
    } catch { /* ignore */ }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    modulesApi.list({ limit: '50' }).then(({ data }) => setModules(data.data ?? [])).catch(() => {});
  }, []);

  const handleCreate = async () => {
    try {
      await jobsApi.create({
        title: form.title,
        description: form.description,
        location: form.location || undefined,
        employmentType: form.employmentType,
        status: 'DRAFT',
        ...(form.moduleId ? { moduleId: form.moduleId } : {}),
      });
      setShowCreate(false);
      setForm({ title: '', description: '', location: '', employmentType: 'FULL_TIME', moduleId: '' });
      load();
    } catch { alert('Failed to create job'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return;
    try { await jobsApi.delete(id); load(); } catch { alert('Failed to delete'); }
  };

  return (
    <>
      <PageHead
        title="Jobs"
        subtitle="Career postings across product modules"
        action={
          <button className="dash-btn dash-btn--primary" onClick={() => setShowCreate(true)}>
            <Plus size={15} /> Post Job
          </button>
        }
      />

      <div className="dash-toolbar">
        <div className="dash-search">
          <Search size={14} className="dash-search__icon" />
          <input className="dash-input" placeholder="Search jobs…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="dash-select" style={{ width: 150 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div className="dash-tablewrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Module</th>
              <th>Type</th>
              <th>Status</th>
              <th>Applications</th>
              <th>Published</th>
              <th style={{ width: 60 }} />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="dash-table__empty">Loading…</td></tr>
            ) : jobs.length === 0 ? (
              <tr><td colSpan={7}><EmptyState icon={<Briefcase size={28} />} message="No jobs found." /></td></tr>
            ) : jobs.map((j) => (
              <tr key={j.id}>
                <td>
                  <p className="dash-table__cellmain">{j.title}</p>
                  {j.location && (
                    <p className="dash-table__cellsub" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={10} />{j.location}
                    </p>
                  )}
                </td>
                <td>{j.module ? <span className="dash-chip">{j.module.code}</span> : <span className="dash-muted">—</span>}</td>
                <td className="dash-muted">{j.employmentType.replace('_', ' ')}</td>
                <td>
                  <span className={`dash-badge ${STATUS_BADGE[j.status] ?? 'dash-badge--gray'}`}>
                    <span className="dash-badge__dot" />
                    {j.status}
                  </span>
                </td>
                <td>
                  <span className="dash-badge dash-badge--blue">
                    {j._count?.applications ?? 0} applied
                  </span>
                </td>
                <td className="dash-muted">{j.publishedAt ? new Date(j.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unpublished'}</td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="dash-rowaction dash-rowaction--danger" title="Delete" onClick={() => handleDelete(j.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <DashModal title="Post a Job" onClose={() => setShowCreate(false)}>
          <div className="dash-field">
            <label className="dash-field__label">Title</label>
            <input className="dash-input" placeholder="e.g. Senior Backend Engineer" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Description</label>
            <textarea className="dash-input" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="dash-form-row">
            <div className="dash-field">
              <label className="dash-field__label">Location</label>
              <input className="dash-input" placeholder="Remote / City" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="dash-field">
              <label className="dash-field__label">Employment</label>
              <select className="dash-select" value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })}>
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Module (optional)</label>
            <select className="dash-select" value={form.moduleId} onChange={(e) => setForm({ ...form, moduleId: e.target.value })}>
              <option value="">No specific module</option>
              {modules.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <button className="dash-btn dash-btn--primary" style={{ justifyContent: 'center', marginTop: 4 }} onClick={handleCreate}>
            Create Draft
          </button>
        </DashModal>
      )}
    </>
  );
}

export default JobsPage;
