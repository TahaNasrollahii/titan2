'use client';

import { useState, useEffect } from 'react';
import { LogIn, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'خانه', href: '/' },
  { label: 'فروشگاه', href: '/store' },
  { label: 'مسابقات', href: '/tournaments' },
  { label: 'بازی‌ها', href: '/games' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.headerWrapper} dir="rtl">
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerInner}>
          
          {/* Brand & Basket (Right side in RTL) */}
          <div className={styles.brandSection}>
            <a href="/" className={styles.logo}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 2L5 12H12L10 22L19.5 12H12.5L14.5 2Z" fill="#3B82F6"/>
              </svg>
              <span className={styles.logoText}>STEM</span>
            </a>
            
            <a href="/cart" className={styles.basketBtn} aria-label="سبد خرید">
              <ShoppingCart size={18} />
              <span className={styles.cartBadge}>۲</span>
            </a>
          </div>

          {/* Center Navigation */}
          <nav className={styles.desktopNav}>
            <div className={styles.navBackground}></div>
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Auth Actions (Left side in RTL) */}
          <div className={styles.actions}>
            <a href="/signin" className={styles.signInBtn}>
              <LogIn size={16} />
              <span>ورود</span>
            </a>
            <a href="/signup" className={styles.signUpBtn}>
              ثبت نام
            </a>
          </div>

        </div>
      </header>
    </div>
  );
}
