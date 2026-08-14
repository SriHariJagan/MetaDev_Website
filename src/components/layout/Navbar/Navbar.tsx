import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useTheme } from '@/context/ThemeContext';
import { PRODUCTS } from '@/constants/products';
import styles from './Navbar.module.css';

interface NavItem {
  label: string;
  to: string;
  dropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Our Solutions', to: '/solutions' },
  { label: 'Our Platforms', to: '/products', dropdown: true },
  { label: 'Team', to: '/team' },
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
];

function LogoMark() {
  return (
    <span className={styles.logoWrap}>
      <img
        src="/logo-noBg.png"
        alt="metadev"
        className={`${styles.logoImage} ${styles.logoDark}`}
        aria-hidden="true"
        draggable={false}
      />
      <img
        src="/logo-lightmode.png"
        alt="metadev"
        className={`${styles.logoImage} ${styles.logoLight}`}
        aria-hidden="true"
        draggable={false}
      />
    </span>
  );
}

function ContactCta() {
  return (
    <Link to="/contact" className={styles.cta}>
      Contact Us
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}

function SignInCta() {
  return (
    <Link to="/login" className={styles.signIn}>
      Sign in
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
    >
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  const isMobile = () => window.matchMedia('(max-width: 47.9375rem)').matches;

  const handleProductsClick = (e: React.MouseEvent) => {
    if (isMobile()) {
      e.preventDefault();
      setProductsOpen((open) => !open);
    } else {
      closeMenu();
    }
  };

  return (
    <header className={cn(styles.header, scrolled && styles.headerScrolled)}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <LogoMark />
          <span className={styles.brandText}>
            <span className={styles.brandTagline}>Digital Transformation Leaders</span>
          </span>
        </Link>

        <nav
          id="primary-navigation"
          className={cn(styles.nav, menuOpen && styles.navOpen)}
          aria-label="Primary navigation"
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.to}
                className={styles.navItem}
                onMouseEnter={
                  item.dropdown && !isMobile() ? () => setProductsOpen(true) : undefined
                }
                onMouseLeave={
                  item.dropdown && !isMobile() ? () => setProductsOpen(false) : undefined
                }
              >
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => cn(styles.navLink, isActive && styles.navLinkActive)}
                  onClick={item.dropdown ? handleProductsClick : closeMenu}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      size={16}
                      className={cn(styles.chevron, productsOpen && styles.chevronOpen)}
                      aria-hidden="true"
                    />
                  )}
                </NavLink>
                {item.dropdown && (
                  <div
                    className={cn(styles.dropdown, productsOpen && styles.dropdownOpen)}
                    aria-hidden={!productsOpen}
                  >
                    <ul className={styles.dropdownList}>
                      {PRODUCTS.map((product) => (
                        <li key={product.href}>
                          <Link
                            to={product.href}
                            className={cn(styles.dropdownItem, styles[`accent-${product.accent}`])}
                            onClick={closeMenu}
                          >
                            <span className={styles.dropdownIcon}>
                              <product.icon size={16} aria-hidden="true" />
                            </span>
                            <span className={styles.dropdownText}>
                              <span className={styles.dropdownName}>{product.name}</span>
                              <span className={styles.dropdownSubtitle}>{product.subtitle}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                      </ul>
                      <Link to="/products" className={styles.dropdownFooter} onClick={closeMenu}>
                        All Products
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          <SignInCta />
          <ContactCta />
        </nav>

        <div className={styles.actions}>
          <SignInCta />
          <ThemeToggle />
          <ContactCta />
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
