import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building2, CreditCard, ListChecks, TrendingUp,
  ArrowRight, UserPlus, Building, Sparkles,
} from 'lucide-react';
import { usersApi, organizationsApi, subscriptionsApi, jobsApi } from '@/services/api';

const AVATAR_COLORS = ['#6366f1', '#0891b2', '#059669', '#d97706', '#db2777'];

export function DashboardOverview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, orgs: 0, subs: 0, jobs: 0 });
  const [recentUsers, setRecentUsers] = useState<Array<{ id: string; email: string; firstName: string; lastName: string; status: string }>>([]);

  useEffect(() => {
    const load = async () => {
      const [u, o, s, j] = await Promise.allSettled([
        usersApi.list({ limit: '5' }),
        organizationsApi.list({ limit: '1' }),
        subscriptionsApi.list({ limit: '1' }),
        jobsApi.list({ limit: '1' }),
      ]);
      setStats({
        users: u.status === 'fulfilled' ? (u.value.data.pagination?.total ?? u.value.data.data?.length ?? 0) : 0,
        orgs: o.status === 'fulfilled' ? (o.value.data.pagination?.total ?? o.value.data.data?.length ?? 0) : 0,
        subs: s.status === 'fulfilled' ? (s.value.data.pagination?.total ?? s.value.data.data?.length ?? 0) : 0,
        jobs: j.status === 'fulfilled' ? (j.value.data.pagination?.total ?? j.value.data.data?.length ?? 0) : 0,
      });
      if (u.status === 'fulfilled') setRecentUsers(u.value.data.data?.slice(0, 5) ?? []);
    };
    load();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.users, icon: Users, color: '#6366f1', route: '/dashboard/users' },
    { label: 'Organizations', value: stats.orgs, icon: Building2, color: '#0891b2', route: '/dashboard/organizations' },
    { label: 'Subscriptions', value: stats.subs, icon: CreditCard, color: '#059669', route: '/dashboard/subscriptions' },
    { label: 'Job Postings', value: stats.jobs, icon: ListChecks, color: '#d97706', route: '/dashboard/jobs' },
  ];

  const quickActions = [
    { label: 'Create a new user', sub: 'Add someone to the platform', icon: UserPlus, color: '#6366f1', route: '/dashboard/users' },
    { label: 'Register organization', sub: 'Onboard a new tenant', icon: Building, color: '#0891b2', route: '/dashboard/organizations' },
    { label: 'Manage subscriptions', sub: 'Plans, trials and billing', icon: CreditCard, color: '#059669', route: '/dashboard/subscriptions' },
  ];

  return (
    <>
      {/* Stats */}
      <div className="dash-stats">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="dash-stat" onClick={() => navigate(s.route)}>
              <div className="dash-stat__accent" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}55)` }} />
              <div className="dash-stat__top">
                <div>
                  <p className="dash-stat__label">{s.label}</p>
                  <p className="dash-stat__value">{stats ? s.value.toLocaleString() : '—'}</p>
                </div>
                <div className="dash-stat__icon" style={{ background: `${s.color}12` }}>
                  <Icon size={19} style={{ color: s.color }} strokeWidth={2.2} />
                </div>
              </div>
              <span className="dash-stat__trend">
                <TrendingUp size={11} />
                Active
              </span>
            </div>
          );
        })}
      </div>

      {/* Two-column area */}
      <div className="dash-grid-3-2">
        {/* Recent users */}
        <section className="dash-card">
          <header className="dash-card__header">
            <h2 className="dash-card__title">
              <Users size={15} style={{ color: '#6366f1' }} />
              Recent Users
            </h2>
            <button
              onClick={() => navigate('/dashboard/users')}
              className="dash-btn dash-btn--ghost"
              style={{ height: 30, padding: '0 11px', fontSize: 12 }}
            >
              View all <ArrowRight size={12} />
            </button>
          </header>
          <div className="dash-card__body" style={{ padding: 8 }}>
            {recentUsers.length === 0 ? (
              <div className="dash-table__empty">No users yet.</div>
            ) : (
              <div className="dash-list">
                {recentUsers.map((u, i) => (
                  <div key={u.id} className="dash-list__item">
                    <div className="dash-avatar dash-avatar--md" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                      {u.firstName[0]}{u.lastName[0]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="dash-table__cellmain">{u.firstName} {u.lastName}</p>
                      <p className="dash-table__cellsub">{u.email}</p>
                    </div>
                    <span className={`dash-badge ${u.status === 'ACTIVE' ? 'dash-badge--green' : 'dash-badge--gray'}`}>
                      <span className="dash-badge__dot" />
                      {u.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quick actions */}
        <section className="dash-card">
          <header className="dash-card__header">
            <h2 className="dash-card__title">
              <Sparkles size={15} style={{ color: '#d97706' }} />
              Quick Actions
            </h2>
          </header>
          <div className="dash-card__body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  onClick={() => navigate(a.route)}
                  className="dash-list__item"
                  style={{ border: '1px solid #edf0f5', background: '#fff', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', width: '100%' }}
                >
                  <div className="dash-stat__icon" style={{ width: 34, height: 34, borderRadius: 9, background: `${a.color}12` }}>
                    <Icon size={16} style={{ color: a.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{a.label}</p>
                    <p style={{ fontSize: 11.5, color: '#8391a5' }}>{a.sub}</p>
                  </div>
                  <ArrowRight size={14} style={{ color: '#b6c0cf' }} />
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default DashboardOverview;
