'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import './store.css';

// SVG Icons from titan.js
const ICONS: Record<string, [string, boolean?]> = {
  home:  ['<path d="M10 3L2 10v10a2 2 0 0 0 2 2h4v-7h8v7h4a2 2 0 0 0 2-2V10L14 3" fill="currentColor" opacity="0.15" stroke="none"/><path d="M3 10l9-7 9 7"/><path d="M4 12v8a2 2 0 0 0 2 2h4v-7h4v7h4a2 2 0 0 0 2-2v-8"/>'],
  game:  ['<path d="M6 18c-3 0-4-2-4-6s1-6 4-6h12c3 0 4 2 4 6s-1 6-4 6H6z" fill="currentColor" opacity="0.15" stroke="none"/><path d="M6 18c-3 0-4-2-4-6s1-6 4-6h12c3 0 4 2 4 6s-1 6-4 6H6z"/><path d="M7 10v4M5 12h4"/><circle cx="15" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="17" cy="13" r="1" fill="currentColor" stroke="none"/>'],
  gift:  ['<rect x="4" y="9" width="16" height="11" rx="2" fill="currentColor" opacity="0.15" stroke="none"/><rect x="4" y="9" width="16" height="11" rx="2"/><rect x="2" y="5" width="20" height="4" rx="1"/><path d="M12 5v15"/><path d="M12 5c-1.5-3-5.5-2.5-5.5 0 0 2 3.5 1.5 5.5 0z"/><path d="M12 5c1.5-3 5.5-2.5 5.5 0 0 2-3.5 1.5-5.5 0z"/>'],
  trophy:['<path d="M7 4h10v6a5 5 0 0 1-10 0V4z" fill="currentColor" opacity="0.15" stroke="none"/><path d="M7 4h10v6a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a2 2 0 0 0 0 4h3"/><path d="M17 6h3a2 2 0 0 1 0 4h-3"/><path d="M12 15v4"/><path d="M9 19h6"/>'],
  chart: ['<rect x="3" y="14" width="4" height="6" rx="1" fill="currentColor" opacity="0.15" stroke="none"/><rect x="10" y="9" width="4" height="11" rx="1" fill="currentColor" opacity="0.15" stroke="none"/><rect x="17" y="4" width="4" height="16" rx="1" fill="currentColor" opacity="0.15" stroke="none"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="10" y="9" width="4" height="11" rx="1"/><rect x="17" y="4" width="4" height="16" rx="1"/><path d="M3 20h18"/>'],
  bag:   ['<rect x="4" y="8" width="16" height="13" rx="3" fill="currentColor" opacity="0.15" stroke="none"/><rect x="4" y="8" width="16" height="13" rx="3"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><circle cx="8.5" cy="12.5" r="1.5" fill="currentColor" stroke="none"/><circle cx="15.5" cy="12.5" r="1.5" fill="currentColor" stroke="none"/>'],
  chat:  ['<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="currentColor" opacity="0.15" stroke="none"/><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><circle cx="8" cy="11" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="1.5" fill="currentColor" stroke="none"/>'],
  search:['<circle cx="11" cy="11" r="6.5" fill="currentColor" opacity="0.15" stroke="none"/><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'],
  cart:  ['<path d="M6.4 7.5l-1.5-4h-2M6.4 7.5h13.6l-2 10.5H5L6.4 7.5z" fill="currentColor" opacity="0.15" stroke="none"/><path d="M3 4h1.5l1.5 4M6.4 7.5h13.6l-2 10.5H5L6.4 7.5z"/><circle cx="8.5" cy="19.5" r="1.5" fill="currentColor" stroke="none"/><circle cx="15.5" cy="19.5" r="1.5" fill="currentColor" stroke="none"/>'],
  bell:  ['<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.8 2H4.2z" fill="currentColor" opacity="0.15" stroke="none"/><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.8 2H4.2z"/><path d="M10 21h4"/>'],
  users: ['<circle cx="9" cy="8.5" r="3.2" fill="currentColor" opacity="0.15" stroke="none"/><circle cx="9" cy="8.5" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9.5" r="2.5"/><path d="M17 14.5a4.5 4.5 0 0 1 4.5 4.5"/>'],
  play:  ['<path d="M8 5.2v13.6a.6.6 0 0 0 .9.5l11-6.8a.6.6 0 0 0 0-1L8.9 4.7a.6.6 0 0 0-.9.5z"/>', true],
  pause: ['<rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/>', true],
  x:     ['<circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" stroke="none"/><path d="M15 9l-6 6M9 9l6 6"/>'],
  like:  ['<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" opacity="0.15" stroke="none"/><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'],
  chev:  ['<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>'],
  arrow: ['<path d="M4 12h15.5M13.5 6l6 6-6 6"/>'],
  flame: ['<path d="M12 3c.6 3.4 4.8 5 4.8 9.6a4.8 4.8 0 0 1-9.6 0c0-1.9.8-3.2 2-4.2.1 1.5.9 2.5 2 2.7C11 8.6 10.8 5.6 12 3z"/>'],
  plus:  ['<circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" stroke="none"/><circle cx="12" cy="12" r="10"/><path d="M12 7v10M7 12h10"/>'],
  clock: ['<circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" stroke="none"/><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'],
  sliders: ['<rect x="2" y="14" width="4" height="6" rx="1" fill="currentColor" opacity="0.15" stroke="none"/><rect x="10" y="8" width="4" height="6" rx="1" fill="currentColor" opacity="0.15" stroke="none"/><rect x="18" y="12" width="4" height="6" rx="1" fill="currentColor" opacity="0.15" stroke="none"/><path d="M4 21v-7M4 14V3M12 21v-13M12 8V3M20 21v-9M20 12V3"/><rect x="2" y="14" width="4" height="6" rx="1"/><rect x="10" y="8" width="4" height="6" rx="1"/><rect x="18" y="12" width="4" height="6" rx="1"/>']
};

function Icon({ name, className = '', style }: { name: string, className?: string, style?: React.CSSProperties }) {
  const ico = ICONS[name];
  if (!ico) return null;
  const [inner, filled] = ico;
  return (
    <i data-icon={name} className={className} style={style} dangerouslySetInnerHTML={{
      __html: `<svg viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="${filled ? 'none' : 'currentColor'}" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">${inner}</svg>`
    }} />
  );
}

function Avatar({ seed }: { seed: number }) {
  const bgs = [['#ffcf8a','#ff8a5c'],['#9be8b0','#37b57a'],['#a5c6ff','#6272f2'],['#ffe17a','#ffa02e'],['#f7b0dd','#c862dc'],['#a6dcff','#4aa0e6']];
  const skins = ['#f4cfa8','#e6b088','#c98d62','#f8dcc4','#a8714a','#dca47a'];
  const hairs = ['#2b1b17','#5b3a26','#d9a441','#151515','#8a2e2e','#3a2a5c'];
  const shirts = ['#2f2a4a','#c9403f','#1f6f6b','#f0f0f0','#3a5bd0','#222'];
  const s = Math.abs(seed | 0);
  const bg = bgs[s % 6], sk = skins[(s * 7 + 1) % 6], hr = hairs[(s * 5 + 2) % 6], sh = shirts[(s * 3 + 4) % 6], style = (s * 11 + 3) % 4;
  let hair = '';
  if (style === 0) hair = `<path d="M10.5 19c-.6-7.5 4-10.5 9.5-10.5S30 11.5 29.5 19c-1.8-3.6-5.2-5-9.5-5s-7.7 1.4-9.5 5z" fill="${hr}"/>`;
  else if (style === 1) hair = `<circle cx="13" cy="13" r="4.5" fill="${hr}"/><circle cx="20" cy="10.5" r="5" fill="${hr}"/><circle cx="27" cy="13" r="4.5" fill="${hr}"/>`;
  else if (style === 2) hair = `<path d="M9.5 24c-1.5-9 2-16 10.5-16s12 7 10.5 16c-1.2-2-2-5-2-8-3.5 1-11 1-14.5 0 0 3-.8 6-2 8z" fill="${hr}"/>`;
  else hair = `<path d="M11 17.5c1-5 4.5-7 9-7s8 2 9 7c-3-2.5-6-3-9-3s-6 .5-9 3z" fill="${hr}"/>`;
  const id = 'av' + s;
  const svg = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient></defs><rect width="40" height="40" fill="url(#${id})"/><ellipse cx="20" cy="42" rx="15" ry="11" fill="${sh}"/><rect x="17" y="26" width="6" height="6" rx="3" fill="${sk}"/><circle cx="20" cy="20" r="8.6" fill="${sk}"/>${hair}<circle cx="16.8" cy="20.3" r="1" fill="#2a1414"/><circle cx="23.2" cy="20.3" r="1" fill="#2a1414"/><path d="M17.2 24c1.8 1.6 3.8 1.6 5.6 0" fill="none" stroke="#7a3a2a" stroke-width="1.1" stroke-linecap="round"/>`;
  return <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}

// Data
const DISCOUNT_PROMOS = [
  {
    title: 'باندل ویژه Valorant',
    subtitle: 'پکیج کامل اسکین‌های پرایم',
    price: '۲,۱۰۰,۰۰۰',
    oldPrice: '۳,۵۰۰,۰۰۰',
    discount: '۴۰٪',
    img: '/images/games/valorant-character.png',
    scale: 1.15,
    y: 0,
  },
  {
    title: 'Elden Crown',
    subtitle: 'نسخه دلوکس',
    price: '۲,۹۵۰,۰۰۰',
    oldPrice: '۳,۴۵۰,۰۰۰',
    discount: '۱۵٪',
    img: '/images/banner-hero.png',
    scale: 1.1,
    y: 0,
  }
];

const BESTSELLER_PROMOS = [
  {
    title: 'باندل ویژه Apex',
    subtitle: 'شامل اسکین اپیک و ۱۰۰۰ کوین',
    price: '۲,۹۵۰,۰۰۰',
    img: '/images/games/apexlegends-character.png',
    bgImg: 'url(/images/games/apexlegends-background.png)',
    bgGrad: 'linear-gradient(135deg, rgba(30, 15, 35, 0.85) 0%, rgba(15, 5, 20, 0.98) 100%)',
    scale: 1.05,
    y: 0,
    x: -15
  },
  {
    title: 'باندل ویژه Fortnite',
    subtitle: 'اسکین لجندری + ۲۰۰۰ وی‌باکس',
    price: '۴,۵۰۰,۰۰۰',
    img: '/images/games/fortnite-character.png',
    bgImg: 'url(/images/games/fortnite-background.png)',
    bgGrad: 'linear-gradient(135deg, rgba(20, 30, 80, 0.85) 0%, rgba(5, 10, 30, 0.98) 100%)',
    scale: 1.1,
    y: 0,
    x: 0
  }
];

const TABS = ['همه', 'فورتنایت', 'ولورانت', 'ایپکس لجندز', 'پرمیوم'];

const PRODUCTS = [
  { id: '1', title: 'Elden Crown', subtitle: 'نسخه دلوکس', price: 2950000, originalPrice: 3450000, badge: 'پرفروش', rating: 4.9, image: '/images/products/p-game-1.jpg', type: 'پرمیوم', platform: 'پی‌سی', genre: 'نقش‌آفرینی', popularity: 100 },
  { id: '2', title: 'Red Frontier', subtitle: 'بسته پرمیوم', price: 2500000, originalPrice: 4000000, badge: 'تخفیف', rating: 4.6, image: '/images/products/p-game-3.jpg', type: 'پرمیوم', platform: 'پلی‌استیشن', genre: 'ماجراجویی', popularity: 95 },
  { id: '3', title: 'هدست تایتان پرو', subtitle: '۷.۱ فراگیر · بی‌سیم', price: 7450000, originalPrice: 9000000, badge: 'تخفیف', rating: 4.7, image: '/images/products/p-headset.jpg', type: 'ایپکس لجندز', platform: 'پی‌سی', genre: '', popularity: 90 },
  { id: '4', title: 'کیبورد تایتان K60', subtitle: '۶۰٪ · هات‌سواپ · RGB', price: 5950000, originalPrice: undefined, badge: '', rating: 4.8, image: '/images/products/p-keyboard.jpg', type: 'ولورانت', platform: 'پی‌سی', genre: '', popularity: 88 },
  { id: '5', title: 'موس تایتان M40', subtitle: '۱۶۰۰۰ DPI · بی‌سیم', price: 3450000, originalPrice: undefined, badge: 'جدید', rating: 4.5, image: '/images/products/p-mouse.jpg', type: 'فورتنایت', platform: 'پی‌سی', genre: '', popularity: 80 },
  { id: '6', title: 'گیفت کارت تایتان', subtitle: '۵۰ دلار اعتبار', price: 2500000, originalPrice: undefined, badge: '', rating: 5.0, image: '/images/products/p-controller.jpg', type: 'پرمیوم', platform: '', genre: '', popularity: 110 },
];

export default function StorePage() {
  const [cartCount, setCartCount] = useState(0);
  const [cartPop, setCartPop] = useState(false);
  const [activeNav, setActiveNav] = useState('/store');
  const [navIndStyle, setNavIndStyle] = useState({});
  const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [activeTab, setActiveTab] = useState('همه');
  const [tabIndStyle, setTabIndStyle] = useState({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [priceMax, setPriceMax] = useState(10000000);
  const [priceOpen, setPriceOpen] = useState(false);

  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('محبوبیت');

  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Nav indicator effect
  useEffect(() => {
    const el = navRefs.current[activeNav];
    if (el) {
      setNavIndStyle({
        transform: `translate(${el.offsetLeft}px, ${el.offsetTop}px)`,
      });
    }
  }, [activeNav]);

  // Tab indicator effect
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setTabIndStyle({
        transform: `translateX(${el.offsetLeft}px)`,
        width: `${el.offsetWidth}px`
      });
    }
  }, [activeTab]);

  const addToCart = () => {
    setCartCount(c => c + 1);
    setCartPop(false);
    setTimeout(() => setCartPop(true), 10);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(w => ({ ...w, [id]: !w[id] }));
  };

  // Promo Carousel
  const [mainPromoIdx, setMainPromoIdx] = useState(0);
  const [mainPromoHover, setMainPromoHover] = useState(false);
  useEffect(() => {
    if (mainPromoHover) return;
    const t = setInterval(() => {
      setMainPromoIdx(i => (i + 1) % 2);
    }, 6000);
    return () => clearInterval(t);
  }, [mainPromoHover]);

  const [promoIdx, setPromoIdx] = useState(0);
  const [promoHover, setPromoHover] = useState(false);
  useEffect(() => {
    if (promoHover) return;
    const t = setInterval(() => {
      setPromoIdx(i => (i + 1) % 2);
    }, 5000);
    return () => clearInterval(t);
  }, [promoHover]);

  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 12 * 60 + 58);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(l => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  // Mouse tracking for parallax and spot hover effects
  useEffect(() => {
    const handlePointerMove = (e: Event) => {
      const pe = e as PointerEvent;
      const promo = pe.currentTarget as HTMLElement;
      const rect = promo.getBoundingClientRect();
      const x = pe.clientX - rect.left;
      const y = pe.clientY - rect.top;
      
      // Center-relative percentages (-1 to 1)
      const px = (x / rect.width) * 2 - 1;
      const py = (y / rect.height) * 2 - 1;
      
      promo.style.setProperty('--px', px.toString());
      promo.style.setProperty('--py', py.toString());
      promo.style.setProperty('--mx', x + 'px');
      promo.style.setProperty('--my', y + 'px');
    };

    const handlePointerLeave = (e: Event) => {
      const promo = e.currentTarget as HTMLElement;
      promo.style.setProperty('--px', '0');
      promo.style.setProperty('--py', '0');
      promo.style.setProperty('--mx', '50%');
      promo.style.setProperty('--my', '50%');
    };

    const promos = document.querySelectorAll('.store-promo');
    promos.forEach(promo => {
      promo.addEventListener('pointermove', handlePointerMove, { passive: true });
      promo.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    });

    return () => {
      promos.forEach(promo => {
        promo.removeEventListener('pointermove', handlePointerMove);
        promo.removeEventListener('pointerleave', handlePointerLeave);
      });
    };
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sc = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sc}`;
  };

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let p = [...PRODUCTS];
    if (activeTab !== 'همه') p = p.filter(x => x.type === activeTab);
    p = p.filter(x => x.price <= priceMax);

    if (sortBy === 'قیمت: کم به زیاد') p.sort((a, b) => a.price - b.price);
    else if (sortBy === 'قیمت: زیاد به کم') p.sort((a, b) => b.price - a.price);
    else if (sortBy === 'محبوبیت') p.sort((a, b) => b.popularity - a.popularity);
    
    return p;
  }, [activeTab, priceMax, sortBy]);


  // Pointer parallax shell variables are managed globally by titan.js

  return (
    <>
      <div 
        className="frame" 
        id="frame"
      >
        
        {/* ===== Left navigation (Shell) ===== */}
        <aside className="nav panel reveal" style={{ '--d': 0 } as any} aria-label="منوی اصلی">
          <Link href="/" className="logo" aria-label="خانه تایتان">
            <svg viewBox="0 0 34 34" width="34" height="34" aria-hidden="true">
              <path d="M3 4h28v8H21v18h-8V12H3z" fill="#fff"/><path d="M3 4h11L3 15z" fill="#e2453f"/>
            </svg>
          </Link>
          <nav className="nav-list" id="navList">
            <span className="nav-ind" style={navIndStyle}></span>
            <Link href="/" className="nav-item" data-label="خانه" ref={el => { navRefs.current['/'] = el; }} onClick={() => setActiveNav('/')}><Icon name="home"/></Link>
            <Link href="/store" className="nav-item active" data-label="فروشگاه" ref={el => { navRefs.current['/store'] = el; }} onClick={() => setActiveNav('/store')}><Icon name="bag"/></Link>
            <a className="nav-item" href="#" data-label="بازی‌ها"><Icon name="game"/></a>
            <a className="nav-item" href="#" data-label="گیفت کارت"><Icon name="gift"/></a>
            <a className="nav-item" href="#" data-label="تورنمنت‌ها"><Icon name="trophy"/></a>
            <a className="nav-item" href="#" data-label="آمار"><Icon name="chart"/></a>
            <a className="nav-item" href="#" data-label="پیام‌ها"><Icon name="chat"/></a>
          </nav>
          <button className="add-btn" aria-label="ساخت تیم" data-label="ساخت تیم">
            <span className="plus"><Icon name="plus"/></span>
          </button>
        </aside>

        {/* ===== Main (Store Content) ===== */}
        <main className="main" id="store">
          
          {/* Topbar Shell */}
          <header className="topbar reveal" style={{ '--d': 1 } as any}>
            <div className="search" id="search" role="search">
              <Icon name="search" />
              <input type="search" placeholder="جستجو" autoComplete="off" aria-label="جستجوی بازی‌ها، تجهیزات و تورنمنت‌ها" />
              <kbd aria-hidden="true">/</kbd>
            </div>
            <div className="top-actions">
              <button className="round" aria-label="اعلان‌ها">
                <Icon name="bell"/>
                <span className="dot" hidden></span>
              </button>
              <button className="round" aria-label="سبد خرید" onClick={addToCart}>
                <Icon name="cart"/>
                <span className={`badge ${cartPop ? 'pop' : ''}`} hidden={cartCount === 0}>{cartCount}</span>
              </button>
              <button className="me" aria-label="پروفایل شما">
                <span className="face"><Avatar seed={5} /></span>
                <b id="userName">طاها</b>
              </button>
            </div>
          </header>

          <div className="store-content reveal" style={{ '--d': 2 } as any}>
            {/* Category + Sort Row */}
            <div className="store-cat-row">
              <div className="store-tabs">
                <span className="store-tab-ind" style={tabIndStyle}></span>
                {TABS.map(tab => (
                  <button 
                    key={tab} 
                    ref={el => { tabRefs.current[tab] = el; }}
                    className={`store-tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="store-sort">
                  <button className="store-sort-btn" onClick={() => { setPriceOpen(!priceOpen); setSortOpen(false); }}>
                    <Icon name="sliders" /> قیمت تا: {priceMax === 0 ? '۰' : priceMax.toLocaleString('fa-IR')} تومان <Icon name="chev" className="sort-chev" style={{ transform: priceOpen ? 'rotate(-90deg)' : 'none', transition: 'transform 0.3s var(--spring)' }} />
                  </button>
                  {priceOpen && (
                    <div className="store-sort-drop" style={{ minWidth: '260px', padding: '24px 16px', zIndex: 101 }}>
                      <div className="sf-range-wrap" dir="ltr">
                        <input type="range" min="0" max="10000000" step="100000" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="sf-range" />
                        <div className="sf-range-track" style={{ width: `${(priceMax/10000000)*100}%` }}></div>
                        <div className="sf-range-pill" style={{ left: `${(priceMax/10000000)*100}%`, transform: `translate(-${(priceMax/10000000)*100}%, -50%)` }} dir="rtl">
                          <svg width="6" height="12" viewBox="0 0 6 12" fill="currentColor" style={{ opacity: 0.5, marginRight: '-2px', marginLeft: '6px' }}>
                            <circle cx="2" cy="2" r="1"/><circle cx="2" cy="6" r="1"/><circle cx="2" cy="10" r="1"/>
                            <circle cx="5" cy="2" r="1"/><circle cx="5" cy="6" r="1"/><circle cx="5" cy="10" r="1"/>
                          </svg>
                          <input 
                            type="text"
                            value={priceMax === 0 ? '۰' : priceMax.toLocaleString('fa-IR')}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()).replace(/\D/g, '');
                              let num = Number(val);
                              if (num > 10000000) num = 10000000;
                              setPriceMax(num);
                            }}
                            className="sf-pill-input"
                            dir="ltr"
                          />
                          <span>تومان</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="store-sort">
                  <button className="store-sort-btn" onClick={() => { setSortOpen(!sortOpen); setPriceOpen(false); }}>
                    <Icon name="arrow" className="sort-icon-rev" style={{ transform: sortBy === 'قیمت: کم به زیاد' ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform 0.3s var(--spring)' }} /> مرتب‌سازی: {sortBy} <Icon name="chev" className="sort-chev" style={{ transform: sortOpen ? 'rotate(-90deg)' : 'none', transition: 'transform 0.3s var(--spring)' }} />
                  </button>
                  {sortOpen && (
                    <div className="store-sort-drop">
                      {['محبوبیت', 'قیمت: کم به زیاد', 'قیمت: زیاد به کم', 'جدیدترین'].map(s => (
                        <button key={s} onClick={() => { setSortBy(s); setSortOpen(false); }}>{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>


            {/* Promo Banners */}
            <div className="store-promos reveal" style={{ '--d': 3 } as any}>
              <article 
                className="store-promo main-promo spot"
                onPointerEnter={() => setMainPromoHover(true)}
                onPointerLeave={() => setMainPromoHover(false)}
              >
                <div className="sp-bg discount-bg"></div>
                <img src="/images/discount.png" alt="Discount Background" className="sp-discount-overlay" />
                
                {DISCOUNT_PROMOS.map((promo, idx) => (
                  <div key={idx} className={`promo-slide-layer ${mainPromoIdx === idx ? 'active' : ''}`}>
                    <div className="sp-content">
                      <div className="sp-badges">
                        <span className="sp-badge live-red"><Icon name="flame" /> <span className="live-badge-text">پیشنهاد ویژه</span></span>
                        <span className="sp-badge dark"><Icon name="clock" /> پایان در {formatTime(timeLeft)}</span>
                        <span className="sp-badge" style={{ background: '#ffeb3b', color: '#000' }}>{promo.discount} تخفیف</span>
                      </div>
                      <h2>{promo.title}</h2>
                      <p>{promo.subtitle}</p>
                      <div className="sp-foot">
                        <button className="sp-btn" onClick={addToCart}>
                          مشاهده محصول
                        </button>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginRight: '16px' }}>
                          <span className="sp-strike">{promo.oldPrice} تومان</span>
                          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{promo.price} تومان</span>
                        </div>
                      </div>
                    </div>
                    <div className="sp-art-wrap">
                      <img src={promo.img} alt="" className="sp-art discount-art" style={{ 
                        transform: `translate(calc(var(--px) * 10px), calc(var(--py) * 10px)) scale(${promo.scale}) translateY(${promo.y}px)` 
                      }} />
                    </div>
                  </div>
                ))}

                <div className="sp-dots">
                  {DISCOUNT_PROMOS.map((_, i) => (
                    <button key={i} className={`sp-dot ${mainPromoIdx === i ? 'active' : ''}`} onClick={() => setMainPromoIdx(i)}>
                      <span><i></i></span>
                    </button>
                  ))}
                </div>
              </article>

              <article 
                className="store-promo side-promo spot"
                onPointerEnter={() => setPromoHover(true)}
                onPointerLeave={() => setPromoHover(false)}
              >
                {BESTSELLER_PROMOS.map((promo, idx) => (
                  <div key={idx} className={`promo-slide-layer ${promoIdx === idx ? 'active' : ''}`}>
                    <div className="sp-bg side-bg" style={{ 
                      backgroundImage: `${promo.bgGrad}, ${promo.bgImg}`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    
                    <div className="sp-content side-content">
                      <div className="sp-badges">
                        <span className="sp-badge cream"><Icon name="trophy" /> پرفروش‌ها</span>
                      </div>
                      <h3>{promo.title}</h3>
                      <p className="side-subtitle">{promo.subtitle}</p>
                      <div className="sp-foot">
                        <button className="sp-btn" onClick={addToCart}>
                          مشاهده محصول
                        </button>
                        <div style={{ marginRight: '4px', whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{promo.price} تومان</span>
                        </div>
                      </div>
                    </div>
                    <div className="sp-art-wrap side-art-wrap">
                      <img src={promo.img} alt="" className="sp-art" style={{
                        transform: `translate(calc(var(--px) * 10px + ${promo.x}px), calc(var(--py) * 10px + ${promo.y}px)) scale(${promo.scale})`
                      }} />
                    </div>
                  </div>
                ))}

                <div className="sp-dots">
                  {BESTSELLER_PROMOS.map((_, i) => (
                    <button key={i} className={`sp-dot ${promoIdx === i ? 'active' : ''}`} onClick={() => setPromoIdx(i)}>
                      <span><i></i></span>
                    </button>
                  ))}
                </div>
              </article>
            </div>

            {/* All Products */}
            <div className="store-sec-h">
              <div className="store-sec-l">
                <h3>همه محصولات</h3>
              </div>
            </div>

            <div className="store-grid">
              {filteredProducts.map((p, i) => (
                <article key={p.id} className="sg-card spot reveal" style={{ '--d': i + 3 } as any}>
                  {p.image === 'gift' ? (
                    <div className="sg-art gift">
                      <div className="sg-gift-icon"><Icon name="gift" /></div>
                    </div>
                  ) : (
                    <div className="sg-art">
                      <img src={p.image} alt={p.title} />
                    </div>
                  )}
                  
                  <div className="sg-badges-top">
                    <div className="sg-b-left">
                      {p.badge && <span className={`sg-badge ${p.badge === 'پرفروش' ? 'cream' : p.badge === 'تخفیف' ? 'red' : 'dark'}`}>
                        {p.badge === 'تخفیف' && <Icon name="flame" />}
                        {p.badge}
                      </span>}
                      <span className="sg-badge dark star"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> {p.rating}</span>
                    </div>
                    <button className={`sg-heart ${wishlist[p.id] ? 'active' : ''}`} onClick={() => toggleWishlist(p.id)}>
                      <Icon name="like" />
                    </button>
                  </div>

                  <div className="sg-body">
                    <span className="sg-sub">{p.subtitle}</span>
                    <h4>{p.title}</h4>
                    <div className="sg-price-row">
                      <span className="sg-price">{p.price.toLocaleString('fa-IR')} تومان</span>
                      {p.originalPrice && <span className="sg-old-price">{p.originalPrice.toLocaleString('fa-IR')}</span>}
                    </div>
                  </div>

                  <div className="sg-actions">
                    <button className="sg-view-btn">مشاهده محصول</button>
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length > 0 && (
              <div className="store-load-wrap reveal" style={{ '--d': filteredProducts.length + 3 } as any}>
                <button className="store-load-btn">بارگذاری بیشتر <Icon name="chev" /></button>
              </div>
            )}
            {filteredProducts.length === 0 && (
              <div className="store-empty">هیچ محصولی با فیلترهای شما مطابقت ندارد.</div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}
