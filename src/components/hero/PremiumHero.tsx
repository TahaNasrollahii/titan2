'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import styles from './PremiumHero.module.css';

// ----------------------------------------------------
// MOCK DATA
// ----------------------------------------------------
// Removed MONTHS

const GAMES = [
  {
    id: 1,
    title: 'محصولات ولورانت',
    shortTitle: 'ولورانت',
    meta: 'ارز درون بازی',
    day: '03',
    monthName: 'May',
    monthIdx: 4,
    image: '/images/hero/characters/valorant.png',
    bg: '/images/hero/valorant.jpg',
    color: '#ff4655',
    href: '/store/valorant'
  },
  {
    id: 2,
    title: 'محصولات فورتنایت',
    shortTitle: 'فورتنایت',
    meta: 'ارز درون بازی',
    day: '07',
    monthName: 'May',
    monthIdx: 4,
    image: '/images/hero/characters/fortnite.png',
    bg: '/images/hero/fortnite.jpg',
    color: '#00d4ff',
    href: '/store/fortnite'
  },
  {
    id: 3,
    title: 'مسابقات',
    shortTitle: 'مسابقات',
    meta: 'بازی رقابتی',
    day: '15',
    monthName: 'October',
    monthIdx: 9,
    image: '/images/hero/characters/tournaments-character.png',
    bg: '/images/hero/tournaments-bg.png',
    color: '#45F882',
    customStyle: { height: '75%', bottom: '120px' },
    href: '/store/tournaments'
  },
  {
    id: 4,
    title: 'محصولات اپکس',
    shortTitle: 'اپکس',
    meta: 'ارز درون بازی',
    day: '06',
    monthName: 'September',
    monthIdx: 8,
    image: '/images/hero/characters/apex.png',
    bg: '/images/hero/apex.jpg',
    color: '#da292a',
    href: '/store/apex'
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
      <section className={styles.heroSection} dir="rtl">
        <div className={styles.background} />

        {/* ==================== FIXED UI OVERLAY ==================== */}
        <div className={styles.fixedUI}>

          {/* ==================== PREMIUM TIMELINE ==================== */}
          <div className={styles.timelineContainer}>
            {GAMES.map((game, idx) => {
              const isActive = activeGame.id === game.id;

              return (
                <div 
                  key={game.id} 
                  className={`${styles.timelineItem} ${isActive ? styles.active : ''}`}
                  onClick={() => setCurrentIdx(idx)}
                  style={{ '--game-color': game.color } as React.CSSProperties}
                >
                  <div className={styles.nodeWrapper}>
                    {isActive && (
                      <motion.div 
                        layoutId="activeTimelineGlow" 
                        className={styles.nodeActiveGlow} 
                        style={{ backgroundColor: game.color, boxShadow: `0 0 15px ${game.color}` }}
                      />
                    )}
                  </div>
                  
                  <div className={styles.itemContent}>
                    <span className={styles.itemIndex} style={{ color: isActive ? game.color : '#666' }}>
                      0{idx + 1}
                    </span>
                    <span className={styles.itemTitle}>{game.shortTitle}</span>
                  </div>
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
          {GAMES.map((game, idx) => {
            const isActive = idx === currentIdx;
            return (
            <div className={styles.slide} key={game.id}>
              <div className={styles.slideInner}>
                
                {/* LEFT CENTER: GAME INFO */}
                <div className={styles.gameInfo}>
                  <h2 className={styles.gameTitle}>{game.title}</h2>
                  <div className={styles.gameMeta}>{game.meta}</div>
                  <Link 
                    href={game.href || `/store`} 
                    className={styles.glassyButton}
                    style={{ '--game-color': game.color } as React.CSSProperties}
                  >
                    <span>مشاهده محصول</span>
                  </Link>
                </div>

                {/* RIGHT: 3D ARTWORK */}
                <div className={styles.artworkContainer}>
                  <div className={styles.artwork3DWrapper}>
                    <motion.div 
                      className={styles.artworkBase}
                      initial={false}
                      animate={{ 
                        rotateY: isActive ? 28 : 0,
                        rotateX: isActive ? 6 : 0,
                        rotateZ: isActive ? -14 : 0 
                      }}
                      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: isActive ? 0.4 : 0 }}
                    >
                      <img src={game.bg} alt="bg" className={styles.artworkBg} />
                      <div className={styles.artworkOverlay} />
                    </motion.div>
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      className={styles.artworkCharacter} 
                      style={game.customStyle || {}}
                    />
                  </div>
                </div>

              </div>
            </div>
            );
          })}
        </motion.div>

      </section>
    </div>
  );
}
