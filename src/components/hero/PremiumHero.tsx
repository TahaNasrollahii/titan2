'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './PremiumHero.module.css';

// ----------------------------------------------------
// MOCK DATA
// ----------------------------------------------------
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October'
];

const GAMES = [
  {
    id: 1,
    title: 'VALORANT POINTS',
    meta: 'IN-GAME CURRENCY',
    day: '03',
    monthName: 'May',
    monthIdx: 4,
    image: '/images/hero/characters/valorant.png',
    bg: '/images/hero/hero-bg.jpg'
  },
  {
    id: 2,
    title: 'V-BUCKS',
    meta: 'IN-GAME CURRENCY',
    day: '07',
    monthName: 'May',
    monthIdx: 4,
    image: '/images/hero/characters/fortnite.png',
    bg: '/images/hero/hero-bg.jpg'
  },
  {
    id: 3,
    title: 'COD POINTS',
    meta: 'IN-GAME CURRENCY',
    day: '22',
    monthName: 'June',
    monthIdx: 5,
    image: '/images/hero/characters/callofduty.png',
    bg: '/images/hero/hero-bg.jpg'
  },
  {
    id: 4,
    title: 'APEX COINS',
    meta: 'IN-GAME CURRENCY',
    day: '06',
    monthName: 'September',
    monthIdx: 8,
    image: '/images/hero/characters/apex.png',
    bg: '/images/hero/hero-bg.jpg'
  }
];

export default function PremiumHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeGame = GAMES[currentIdx];

  // Page-turning Scrolljacking logic
  useEffect(() => {
    let lastScrollTime = 0;
    let touchStartY = 0;
    const cooldown = 1000; // 1s cooldown matches transition duration

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 5) return; // Let normal scroll happen if not at top

      if (e.deltaY > 0) {
        // Scroll down
        if (currentIdx < GAMES.length - 1) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastScrollTime > cooldown) {
            setCurrentIdx(prev => prev + 1);
            lastScrollTime = now;
          }
        }
      } else if (e.deltaY < 0) {
        // Scroll up
        if (currentIdx > 0) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastScrollTime > cooldown) {
            setCurrentIdx(prev => prev - 1);
            lastScrollTime = now;
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 5) return;
      
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      // Swipe up (scroll down)
      if (deltaY > 30 && currentIdx < GAMES.length - 1) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime > cooldown) {
          setCurrentIdx(prev => prev + 1);
          lastScrollTime = now;
        }
      } 
      // Swipe down (scroll up)
      else if (deltaY < -30 && currentIdx > 0) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime > cooldown) {
          setCurrentIdx(prev => prev - 1);
          lastScrollTime = now;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentIdx]);

  return (
    <div className={styles.scrollContainer}>
      <section className={styles.heroSection} dir="ltr">
        <div className={styles.background} />

        {/* ==================== FIXED UI OVERLAY ==================== */}
        <div className={styles.fixedUI}>
          {/* TOP LEFT BRANDING */}
          <Link href="/" className={styles.brandMark}>
            <span className={styles.brandIcon}>GAMEDATE</span>
          </Link>

          {/* TOP RIGHT NAVIGATION */}
          <nav className={styles.topNav}>
            <Link href="/news" className={styles.navItem}>News</Link>
            <Link href="/previews" className={styles.navItemActive + ' ' + styles.navItem}>Previews</Link>
            <Link href="/reviews" className={styles.navItem}>Reviews</Link>
            <Link href="/features" className={styles.navItem}>Features</Link>
            <Link href="/videos" className={styles.navItem}>Videos</Link>
          </nav>

          {/* LEFT VERTICAL MONTH TIMELINE */}
          <div className={styles.monthTimeline}>
            {MONTHS.map((month, idx) => {
              const featuredGameIdx = GAMES.findIndex(g => g.monthIdx === idx);
              const isFeatured = featuredGameIdx !== -1;
              const isActive = activeGame.monthIdx === idx;

              return (
                <div 
                  key={month} 
                  className={styles.timelineMonth}
                  style={{ opacity: isFeatured ? (isActive ? 1 : 0.4) : 0.1 }}
                  onClick={() => {
                    if (isFeatured) setCurrentIdx(featuredGameIdx);
                  }}
                >
                  {isActive && <div className={styles.activeLine} />}
                  {month}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== VERTICAL SLIDES TRACK ==================== */}
        <motion.div 
          className={styles.track}
          animate={{ y: `-${currentIdx * 100}vh` }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {GAMES.map((game) => (
            <div className={styles.slide} key={game.id}>
              <div className={styles.slideInner}>
                
                {/* LEFT CENTER: RELEASE DATE */}
                <div className={styles.dateContainer}>
                  <div className={styles.releaseLabel}>
                    Release Date
                  </div>
                  <div className={styles.dateNumberBlock}>
                    <div className={styles.dayNumber}>{game.day}</div>
                    <div className={styles.monthLabel}>{game.monthName}</div>
                  </div>
                </div>

                {/* CENTER: GAME INFO */}
                <div className={styles.gameInfo}>
                  <h2 className={styles.gameTitle}>{game.title}</h2>
                  <div className={styles.gameMeta}>{game.meta}</div>
                </div>

                {/* RIGHT: 3D ARTWORK */}
                <div className={styles.artworkContainer}>
                  <div className={styles.artwork3DWrapper}>
                    <div className={styles.artworkBase}>
                      <img src={game.bg} alt="bg" className={styles.artworkBg} />
                      <div className={styles.artworkOverlay} />
                    </div>
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      className={styles.artworkCharacter} 
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </motion.div>

      </section>
    </div>
  );
}
