import { useEffect, useState, useCallback } from 'react';
import { auditApi, type AuditLog } from '@/services/api';
import { Search, ScrollText, Plus, Pencil, Trash2, LogIn, LogOut, ShieldCheck, Settings } from 'lucide-react';
import { PageHead, EmptyState } from './_shared';

const ACTION_ICON: Record<string, typeof Plus> = {
  CREATE: Plus,
  UPDATE: Pencil,
  DELETE: Trash2,
  LOGIN: LogIn,
  LOGOUT: LogOut,
  ASSIGN: ShieldCheck,
};

const ACTION_STYLE: Record<string, { color: string; bg: string }> = {
  CREATE: { color: '#059669', bg: 'rgba(5,150,105,0.09)' },
  UPDATE: { color: '#2563eb', bg: 'rgba(37,99,235,0.09)' },
  DELETE: { color: '#dc2626', bg: 'rgba(220,38,38,0.09)' },
  LOGIN: { color: '#7c3aed', bg: 'rgba(124,58,237,0.09)' },
  LOGOUT: { color: '#64748b', bg: 'rgba(100,116,139,0.1)' },
  ASSIGN: { color: '#0891b2', bg: 'rgba(8,145,178,0.09)' },
};

export function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { limit: '100' };
      if (actionFilter) params.action = actionFilter;
      if (search) params.search = search;
      const { data } = await auditApi.list(params);
      setLogs(data.data ?? []);
    } catch { /* ignore */ }
    setLoading(false);
  }, [actionFilter, search]);

  useEffect(() => { load(); }, [load]);

  return (
    <>
      <PageHead title="Audit Logs" subtitle="Every action taken across the platform" />

      <div className="dash-toolbar">
        <div className="dash-search">
          <Search size={14} className="dash-search__icon" />
          <input className="dash-input" placeholder="Search resource…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="dash-select" style={{ width: 150 }} value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
          <option value="">All Actions</option>
          <option value="CREATE">Create</option>
          <option value="UPDATE">Update</option>
          <option value="DELETE">Delete</option>
          <option value="LOGIN">Login</option>
          <option value="LOGOUT">Logout</option>
        </select>
      </div>

      <section className="dash-card">
        {loading ? (
          <div className="dash-table__empty">Loading…</div>
        ) : logs.length === 0 ? (
          <EmptyState icon={<ScrollText size={28} />} message="No audit logs found." />
        ) : (
          <div style={{ padding: 8 }}>
            {logs.map((log) => {
              const Icon = ACTION_ICON[log.action] ?? Settings;
              const s = ACTION_STYLE[log.action] ?? { color: '#64748b', bg: 'rgba(100,116,139,0.1)' };
              return (
                <div key={log.id} className="dash-list__item" style={{ alignItems: 'flex-start' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.bg, flexShrink: 0 }}>
                    <Icon size={14} style={{ color: s.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{log.action}</span>
                      <span className="dash-chip">{log.resource}</span>
                      {log.module && <span className="dash-badge dash-badge--blue">{log.module}</span>}
                    </div>
                    <p className="dash-table__cellsub" style={{ marginTop: 3 }}>
                      {log.user ? `${log.user.firstName} ${log.user.lastName}` : 'System'}
                      {log.ipAddress ? ` · ${log.ipAddress}` : ''}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p className="dash-muted" style={{ fontSize: 11.5 }}>
                      {log.createdAt ? new Date(log.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                    </p>
                    {log.resourceId && (
                      <p className="dash-mono dash-muted" style={{ fontSize: 10.5 }}>{log.resourceId.slice(0, 8)}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

export default AuditPage;
