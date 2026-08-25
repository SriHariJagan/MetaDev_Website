import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Boxes,
  CreditCard,
  ScrollText,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Menu,
  X,
  Lock,
  Bell,
  Search,
  Layers,
  Server,
  Globe,
  Plug,
  LifeBuoy,
  BarChart3,
  Settings,
  ShieldCheck,
  Wallet,
  UserCog,
  type LucideIcon,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

interface NavItem {
  path?: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  locked?: boolean;
  color: string;
}

/* Locked entries are placeholders — routes will be enabled incrementally. */
const NAV_LINKS: NavItem[] = [
  {
    path: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
    color: "#818cf8",
  },
  {
    path: "/dashboard/modules",
    label: "ERP Products",
    icon: Boxes,
    color: "#22d3ee",
  },
  { label: "Tenants", icon: Layers, locked: true, color: "#34d399" },
  {
    path: "/dashboard/organizations",
    label: "Organizations",
    icon: Building2,
    color: "#f59e0b",
  },
  {
    path: "/dashboard/users",
    label: "Users & Roles",
    icon: Users,
    color: "#38bdf8",
  },
  {
    path: "/dashboard/subscriptions",
    label: "Subscriptions",
    icon: CreditCard,
    color: "#a78bfa",
  },
  { label: "Billing & Revenue", icon: Wallet, locked: true, color: "#4ade80" },
  { label: "Infrastructure", icon: Server, locked: true, color: "#fb7185" },
  { label: "Domains & SSL", icon: Globe, locked: true, color: "#60a5fa" },
  { label: "Integrations", icon: Plug, locked: true, color: "#c084fc" },
  { label: "Support Center", icon: LifeBuoy, locked: true, color: "#2dd4bf" },
  {
    path: "/dashboard/audit",
    label: "Audit Logs",
    icon: ScrollText,
    color: "#fbbf24",
  },
  { label: "Security", icon: ShieldCheck, locked: true, color: "#f472b6" },
  {
    label: "Reports & Analytics",
    icon: BarChart3,
    locked: true,
    color: "#7dd3fc",
  },
  { label: "System Settings", icon: Settings, locked: true, color: "#94a3b8" },
];

const COLLAPSE_KEY = "dash-sidebar-collapsed";

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(COLLAPSE_KEY) === "1",
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const currentPage = NAV_LINKS.find(
    (l) =>
      l.path &&
      (l.end
        ? location.pathname === "/dashboard"
        : location.pathname.startsWith(l.path)),
  );

  return (
    <div className="dash-root">
      {mobileOpen && (
        <div className="dash-backdrop" onClick={() => setMobileOpen(false)} />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`dash-sidebar ${mobileOpen ? "dash-sidebar--open" : "dash-sidebar--closed"} ${collapsed ? "dash-sidebar--collapsed" : ""}`}
      >
        <div className="dash-sidebar__logo">
          <div className="dash-sidebar__logo-mark" title="MetaDev">
            <img
              src="/logo-lightmode.png"
              alt="MetaDev"
              draggable={false}
              className="dash-logo-img"
            />
            <img
              src="/logo-noBg.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="dash-logo-img dash-logo-img--light"
            />
          </div>
          <span className="dash-nav__label dash-sidebar__logo-name">
            MetaDev
          </span>
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
          {NAV_LINKS.map((link) =>
            link.locked ? (
              <div
                key={link.label}
                className="dash-nav__item dash-nav__item--locked"
                style={{ "--item-accent": link.color } as CSSProperties}
                title={`${link.label} — coming soon`}
                aria-disabled="true"
              >
                <link.icon size={17} strokeWidth={2} />
                <span className="dash-nav__label">{link.label}</span>
                <Lock size={11} className="dash-nav__lock" aria-hidden="true" />
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path!}
                end={link.end}
                onClick={() => setMobileOpen(false)}
                title={link.label}
                style={{ "--item-accent": link.color } as CSSProperties}
                className={({ isActive }) =>
                  `dash-nav__item ${isActive ? "dash-nav__item--active" : ""}`
                }
              >
                <link.icon size={17} strokeWidth={2} />
                <span className="dash-nav__label">{link.label}</span>
              </NavLink>
            ),
          )}
        </nav>
      </aside>

      {/* ===== Main ===== */}
      <div className="dash-main">
        <header className="dash-header">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setMobileOpen(true)}
              className="dash-iconbtn dash-menu-btn"
              aria-label="Open menu"
              style={{ border: "none", background: "transparent" }}
            >
              <Menu size={19} />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="dash-collapse-btn"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronsRight size={17} />
              ) : (
                <ChevronsLeft size={17} />
              )}
            </button>
            <h1 className="dash-header__title">
              {currentPage?.label ?? "Dashboard"}
            </h1>
          </div>

          <div className="dash-header__actions">
            <div className="dash-header__search">
              <Search size={15} className="dash-search__icon" />
              <input
                className="dash-input"
                placeholder="Search…"
                aria-label="Search"
              />
              <kbd className="dash-kbd">Ctrl K</kbd>
            </div>

            <button
              className="dash-iconbtn"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={17} />
              <span className="dash-iconbtn__badge" />
            </button>

            <div className="dash-header__divider" />

            <div className="dash-header__profile" ref={profileRef}>
              <button
                type="button"
                className="dash-header__user"
                onClick={() => setProfileOpen((open) => !open)}
                title={user?.email}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
              >
                <div
                  className={`dash-avatar dash-avatar--sm ${user?.isSuperAdmin ? "dash-avatar--admin" : ""}`}
                >
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <div
                  className="dash-header__user-info"
                  style={{ lineHeight: 1.25 }}
                >
                  <p
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p style={{ fontSize: 10.5, color: "#64748b" }}>
                    {user?.isSuperAdmin ? "Super Admin" : "Admin"}
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className="dash-header__user-chevron"
                  style={{
                    color: "#94a3b8",
                    transform: profileOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.18s ease",
                  }}
                />
              </button>

              {profileOpen && (
                <div className="dash-profile-menu" role="menu">
                  <div className="dash-profile-menu__head">
                    <div
                      className={`dash-avatar dash-avatar--md ${user?.isSuperAdmin ? "dash-avatar--admin" : ""}`}
                    >
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p className="dash-profile-menu__name">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="dash-profile-menu__email">{user?.email}</p>
                      <span className="dash-profile-menu__role">
                        {user?.isSuperAdmin ? "Super Admin" : "Admin"}
                      </span>
                    </div>
                  </div>

                  <div className="dash-profile-menu__sep" />

                  <button
                    type="button"
                    className="dash-profile-menu__item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserCog size={15} />
                    Profile
                  </button>
                  <button
                    type="button"
                    className="dash-profile-menu__item dash-profile-menu__item--danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              )}
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
