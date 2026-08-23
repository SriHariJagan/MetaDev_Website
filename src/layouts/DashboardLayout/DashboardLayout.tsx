import { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, Boxes, CreditCard,
  ListChecks, ScrollText, ChevronDown, ChevronsLeft, ChevronsRight, LogOut, Menu, X,
  HeartPulse, GraduationCap, ShieldCheck, Megaphone, Wallet, BookOpen,
  Bell, Search,
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';

const PRODUCTS = [
  { code: 'METAHEALTH', name: 'MetaHealth', icon: HeartPulse, color: '#10b981' },
  { code: 'METAEDU', name: 'MetaEdu', icon: GraduationCap, color: '#8b5cf6' },
  { code: 'METACHECK', name: 'MetaCheck', icon: ShieldCheck, color: '#06b6d4' },
  { code: 'METAADS', name: 'MetaAds', icon: Megaphone, color: '#f59e0b' },
  { code: 'METALEDGER', name: 'MetaLedger', icon: Wallet, color: '#ef4444' },
  { code: 'METAPE', name: 'MetaPE', icon: BookOpen, color: '#ec4899' },
];

const NAV_LINKS = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { path: '/dashboard/users', label: 'Users', icon: Users },
  { path: '/dashboard/organizations', label: 'Organizations', icon: Building2 },
  { path: '/dashboard/modules', label: 'Modules', icon: Boxes },
  { path: '/dashboard/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { path: '/dashboard/jobs', label: 'Jobs', icon: ListChecks },
  { path: '/dashboard/audit', label: 'Audit Logs', icon: ScrollText },
];

const COLLAPSE_KEY = 'dash-sidebar-collapsed';

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === '1');
  const [productsOpen, setProductsOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
  }, [collapsed]);

  // Auto-expand Products section when navigating into a product page
  useEffect(() => {
    if (location.pathname.includes('/dashboard/product/')) setProductsOpen(true);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const currentPage = NAV_LINKS.find((l) =>
    l.end ? location.pathname === '/dashboard' : location.pathname.startsWith(l.path),
  );

  return (
    <div className="dash-root">
      {mobileOpen && <div className="dash-backdrop" onClick={() => setMobileOpen(false)} />}

      {/* ===== Sidebar ===== */}
      <aside className={`dash-sidebar ${mobileOpen ? 'dash-sidebar--open' : 'dash-sidebar--closed'} ${collapsed ? 'dash-sidebar--collapsed' : ''}`}>
        <div className="dash-sidebar__logo">
          <div className="dash-sidebar__logo-mark" title="MetaDev">
            <img src="/logo-lightmode.png" alt="" style={{ width: 16, height: 16, objectFit: 'contain' }} />
          </div>
          <span className="dash-nav__label dash-sidebar__logo-name">MetaDev</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="dash-sidebar__close dash-rowaction"
            aria-label="Close menu"
          >
            <X size={15} />
          </button>
        </div>

        <nav className="dash-nav">
          <p className="dash-nav__section">Menu</p>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              title={link.label}
              className={({ isActive }) =>
                `dash-nav__item ${isActive ? 'dash-nav__item--active' : ''}`
              }
            >
              <link.icon size={17} strokeWidth={2} />
              <span className="dash-nav__label">{link.label}</span>
            </NavLink>
          ))}

          <button
            onClick={() => { setProductsOpen(!productsOpen); setCollapsed(false); }}
            className="dash-nav__item"
            title="Products"
            style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <Boxes size={17} strokeWidth={2} />
            <span className="dash-nav__label" style={{ flex: 1, textAlign: 'left' }}>Products</span>
            <ChevronDown
              size={13}
              className="dash-nav__chevron"
              style={{
                transition: 'transform 0.2s ease',
                transform: productsOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              }}
            />
          </button>

          {productsOpen && (
            <div className="dash-nav__sub">
              {PRODUCTS.map((p) => {
                const active = location.pathname.includes(`/dashboard/product/${p.code.toLowerCase()}`);
                const Icon = p.icon;
                return (
                  <NavLink
                    key={p.code}
                    to={`/dashboard/product/${p.code.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    title={p.name}
                    className={`dash-nav__item ${active ? 'dash-nav__item--active' : ''}`}
                    style={{ fontSize: 12.5, padding: '7px 10px' }}
                  >
                    <Icon size={14} style={{ color: p.color }} />
                    <span className="dash-nav__label">{p.name}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </nav>

        <div className="dash-sidebar__footer">
          <div className="dash-sidebar__user" title={`${user?.firstName} ${user?.lastName}`}>
            <div className={`dash-avatar dash-avatar--sm ${user?.isSuperAdmin ? 'dash-avatar--admin' : ''}`}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="dash-sidebar__user-info" style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12.5, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.firstName} {user?.lastName}
              </p>
              <p style={{ fontSize: 10.5, color: '#64748b' }}>
                {user?.isSuperAdmin ? 'Super Admin' : 'Admin'}
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="dash-sidebar__signout" title="Sign Out" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>
            <LogOut size={16} />
            <span className="dash-nav__label dash-sidebar__signout-label">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ===== Main ===== */}
      <div className="dash-main">
        <header className="dash-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setMobileOpen(true)}
              className="dash-iconbtn dash-menu-btn"
              aria-label="Open menu"
              style={{ border: 'none', background: 'transparent' }}
            >
              <Menu size={19} />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="dash-collapse-btn"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronsRight size={17} /> : <ChevronsLeft size={17} />}
            </button>
            <h1 className="dash-header__title">{currentPage?.label ?? 'Dashboard'}</h1>
          </div>

          <div className="dash-header__actions">
            <div className="dash-header__search">
              <Search size={15} className="dash-search__icon" />
              <input className="dash-input" placeholder="Search…" aria-label="Search" />
              <kbd className="dash-kbd">Ctrl K</kbd>
            </div>

            <button className="dash-iconbtn" aria-label="Notifications" title="Notifications">
              <Bell size={17} />
              <span className="dash-iconbtn__badge" />
            </button>

            <div className="dash-header__divider" />

            <div className="dash-header__user" title={`${user?.email}`}>
              <div className={`dash-avatar dash-avatar--sm ${user?.isSuperAdmin ? 'dash-avatar--admin' : ''}`}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="dash-header__user-info" style={{ lineHeight: 1.25 }}>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>
                  {user?.firstName} {user?.lastName}
                </p>
                <p style={{ fontSize: 10.5, color: '#64748b' }}>
                  {user?.isSuperAdmin ? 'Super Admin' : 'Admin'}
                </p>
              </div>
              <ChevronDown size={14} className="dash-header__user-chevron" style={{ color: '#94a3b8' }} />
            </div>
          </div>
        </header>

        <main className="dash-content">
          <div className="dash-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
