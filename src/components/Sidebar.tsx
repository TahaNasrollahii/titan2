'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icons';
import { useAppContext } from '@/context/AppContext';

export function Sidebar() {
  const pathname = usePathname();
  const { addToast } = useAppContext();
  
  const [navIndStyle, setNavIndStyle] = useState({});
  const navRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    // Find the active link based on pathname
    let activeKey = pathname;
    if (!navRefs.current[activeKey]) {
      // Default to home if route not in sidebar
      activeKey = '/';
    }

    const el = navRefs.current[activeKey];
    if (el) {
      setNavIndStyle({
        transform: `translate(${el.offsetLeft}px, ${el.offsetTop}px)`,
      });
    }
  }, [pathname]);

  const handleAddSquad = () => {
    addToast({
      title: 'تیم جدید',
      text: 'دوستان خود را به لابی دعوت کنید',
      icon: 'users'
    });
  };

  return (
    <aside className="nav panel reveal" style={{ '--d': 0 } as React.CSSProperties} aria-label="منوی اصلی">
      <Link href="/" className="logo" aria-label="خانه تایتان">
        <svg viewBox="0 0 34 34" width="34" height="34" aria-hidden="true">
          <path d="M3 4h28v8H21v18h-8V12H3z" fill="#fff"/><path d="M3 4h11L3 15z" fill="#e2453f"/>
        </svg>
      </Link>
      <nav className="nav-list" id="navList">
        <span className="nav-ind" style={navIndStyle}></span>
        
        <Link 
          href="/" 
          className={`nav-item ${pathname === '/' ? 'active' : ''}`} 
          data-label="خانه" 
          ref={el => { navRefs.current['/'] = el; }}
        >
          <Icon name="home"/>
        </Link>
        
        <Link 
          href="/store" 
          className={`nav-item ${pathname === '/store' ? 'active' : ''}`} 
          data-label="فروشگاه" 
          ref={el => { navRefs.current['/store'] = el; }}
        >
          <Icon name="bag"/>
        </Link>
        
        <a className="nav-item" href="#" data-label="بازی‌ها" onClick={e => e.preventDefault()}>
          <Icon name="game"/>
        </a>
        <a className="nav-item" href="#" data-label="گیفت کارت" onClick={e => e.preventDefault()}>
          <Icon name="gift"/>
        </a>
        <a className="nav-item" href="#" data-label="تورنمنت‌ها" onClick={e => e.preventDefault()}>
          <Icon name="trophy"/>
        </a>
        <a className="nav-item" href="#" data-label="آمار" onClick={e => e.preventDefault()}>
          <Icon name="chart"/>
        </a>
        <a className="nav-item" href="#" data-label="پیام‌ها" onClick={e => e.preventDefault()}>
          <Icon name="chat"/>
        </a>
      </nav>
      <button className="add-btn" aria-label="ساخت تیم" data-label="ساخت تیم" onClick={handleAddSquad}>
        <span className="plus"><Icon name="plus"/></span>
      </button>
    </aside>
  );
}
