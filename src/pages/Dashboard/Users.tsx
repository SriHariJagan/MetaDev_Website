import { useEffect, useState, useCallback } from 'react';
import { usersApi, modulesApi, type User, type Module } from '@/services/api';
import { Plus, Search, Trash2, ShieldCheck, Users } from 'lucide-react';
import { DashModal, PageHead, EmptyState } from './_shared';

const AVATAR_COLORS = ['#6366f1', '#0891b2', '#059669', '#d97706', '#db2777'];

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'dash-badge--green',
  INACTIVE: 'dash-badge--gray',
  SUSPENDED: 'dash-badge--red',
};

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [assignFor, setAssignFor] = useState<User | null>(null);
  const [createForm, setCreateForm] = useState({ email: '', password: '', firstName: '', lastName: '', phone: '' });
  const [assignForm, setAssignForm] = useState({ moduleCode: '', roleCode: '' });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: '50' };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const { data } = await usersApi.list(params);
      setUsers(data.data ?? []);
    } catch { /* ignore */ }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { loadUsers(); }, [loadUsers]);
  useEffect(() => {
    modulesApi.list({ limit: '50' }).then(({ data }) => setModules(data.data ?? [])).catch(() => {});
  }, []);

  const handleCreate = async () => {
    try {
      await usersApi.create(createForm);
      setShowCreate(false);
      setCreateForm({ email: '', password: '', firstName: '', lastName: '', phone: '' });
      loadUsers();
    } catch { alert('Failed to create user'); }
  };

  const handleAssign = async () => {
    if (!assignFor) return;
    try {
      await usersApi.assignModule(assignFor.id, assignForm);
      setAssignFor(null);
      setAssignForm({ moduleCode: '', roleCode: '' });
      loadUsers();
    } catch { alert('Failed to assign module'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this user?')) return;
    try { await usersApi.delete(id); loadUsers(); } catch { alert('Failed to delete'); }
  };

  return (
    <>
      <PageHead
        title="Users"
        subtitle="Manage platform users and their module access"
        action={
          <button className="dash-btn dash-btn--primary" onClick={() => setShowCreate(true)}>
            <Plus size={15} /> Add User
          </button>
        }
      />

      <div className="dash-toolbar">
        <div className="dash-search">
          <Search size={14} className="dash-search__icon" />
          <input
            className="dash-input"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="dash-select" style={{ width: 150 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
      </div>

      <div className="dash-tablewrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Role</th>
              <th>Modules</th>
              <th>Joined</th>
              <th style={{ width: 90 }} />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="dash-table__empty">Loading…</td></tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState icon={<Users size={28} />} message="No users found." />
                </td>
              </tr>
            ) : users.map((u, i) => (
              <tr key={u.id}>
                <td>
                  <div className="dash-entity">
                    <div
                      className={`dash-avatar dash-avatar--md ${u.isSuperAdmin ? 'dash-avatar--admin' : ''}`}
                      style={!u.isSuperAdmin ? { background: AVATAR_COLORS[i % AVATAR_COLORS.length] } : undefined}
                    >
                      {u.firstName[0]}{u.lastName[0]}
                    </div>
                    <div>
                      <p className="dash-table__cellmain">{u.firstName} {u.lastName}</p>
                      <p className="dash-table__cellsub">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`dash-badge ${STATUS_BADGE[u.status] ?? 'dash-badge--gray'}`}>
                    <span className="dash-badge__dot" />
                    {u.status}
                  </span>
                </td>
                <td>
                  {u.isSuperAdmin ? (
                    <span className="dash-badge dash-badge--violet"><ShieldCheck size={11} /> Super Admin</span>
                  ) : (
                    <span className="dash-muted">User</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {(u.userModules ?? []).slice(0, 2).map((m) => (
                      <span key={m.id} className="dash-chip">{m.module.code}</span>
                    ))}
                    {(u.userModules?.length ?? 0) > 2 && (
                      <span className="dash-muted" style={{ fontSize: 11 }}>+{u.userModules!.length - 2}</span>
                    )}
                    {(u.userModules?.length ?? 0) === 0 && <span className="dash-muted" style={{ fontSize: 12 }}>—</span>}
                  </div>
                </td>
                <td className="dash-muted">{new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                    <button className="dash-rowaction" title="Assign module" onClick={() => setAssignFor(u)}>
                      <ShieldCheck size={14} />
                    </button>
                    <button className="dash-rowaction dash-rowaction--danger" title="Delete" onClick={() => handleDelete(u.id)}>
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
        <DashModal title="Create User" onClose={() => setShowCreate(false)}>
          <div className="dash-form-row">
            <div className="dash-field">
              <label className="dash-field__label">First name</label>
              <input className="dash-input" value={createForm.firstName} onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })} />
            </div>
            <div className="dash-field">
              <label className="dash-field__label">Last name</label>
              <input className="dash-input" value={createForm.lastName} onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })} />
            </div>
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Email</label>
            <input className="dash-input" type="email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} />
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Password</label>
            <input className="dash-input" type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} />
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Phone (optional)</label>
            <input className="dash-input" value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} />
          </div>
          <button className="dash-btn dash-btn--primary" style={{ justifyContent: 'center', marginTop: 4 }} onClick={handleCreate}>
            Create User
          </button>
        </DashModal>
      )}

      {assignFor && (
        <DashModal title={`Assign Module — ${assignFor.firstName}`} onClose={() => setAssignFor(null)}>
          <div className="dash-field">
            <label className="dash-field__label">Module</label>
            <select className="dash-select" value={assignForm.moduleCode} onChange={(e) => setAssignForm({ ...assignForm, moduleCode: e.target.value })}>
              <option value="">Select a module…</option>
              {modules.map((m) => <option key={m.id} value={m.code}>{m.name}</option>)}
            </select>
          </div>
          <div className="dash-field">
            <label className="dash-field__label">Role code</label>
            <input className="dash-input" placeholder="e.g. ADMIN" value={assignForm.roleCode} onChange={(e) => setAssignForm({ ...assignForm, roleCode: e.target.value })} />
          </div>
          <button className="dash-btn dash-btn--primary" style={{ justifyContent: 'center', marginTop: 4 }} onClick={handleAssign}>
            Assign
          </button>
        </DashModal>
      )}
    </>
  );
}

export default UsersPage;
