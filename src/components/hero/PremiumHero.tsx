'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import styles from './PremiumHero.module.css';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const GAMES = [
  {
    id: 'valorant',
    monthIdx: 4, // May
    day: '03',
    monthName: 'May',
    title: 'Valorant',
    meta: 'PC • PLAYSTATION • XBOX',
    image: '/images/hero/characters/valorant.png',
    link: '/games/valorant'
  },
  {
    id: 'fortnite',
    monthIdx: 5, // June
    day: '14',
    monthName: 'June',
    title: 'Fortnite',
    meta: 'PC • PLAYSTATION • NINTENDO',
    image: '/images/hero/characters/fortnite.png',
    link: '/games/fortnite'
  },
  {
    id: 'callofduty',
    monthIdx: 7, // August
    day: '28',
    monthName: 'August',
    title: 'Call of Duty',
    meta: 'PC • PLAYSTATION • XBOX',
    image: '/images/hero/characters/callofduty.png',
    link: '/games/cod'
  },
  {
    id: 'apex',
    monthIdx: 8, // September
    day: '11',
    monthName: 'September',
    title: 'Apex Legends',
    meta: 'PC • PLAYSTATION • XBOX',
    image: '/images/hero/characters/apex.png',
    link: '/games/apex'
  }
];

export default function PremiumHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeGame = GAMES[currentIdx];

  // Page-turning Scrolljacking logic
  useEffect(() => {
    let lastScrollTime = 0;
    let touchStartY = 0;
    const cooldown = 1200; // 1.2s to let animation finish

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

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle inverse movements for different layers
  const artTranslateX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const artTranslateY = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  
  const dateTranslateX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const dateTranslateY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Premium easing curve as requested
  const transition = { duration: 1.0, ease: [0.76, 0, 0.24, 1] };

  return (
    <div className={styles.scrollContainer}>
      <section 
        className={styles.heroSection}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        dir="ltr" // We force LTR for this specific visual composition per spec
      >
        <div className={styles.background} />

        <div className={styles.container}>
          
          {/* TOP LEFT BRANDING */}
          <Link href="/" className={styles.brandMark}>
            <span className={styles.brandIcon}>◆</span>
            <span className={styles.brandText}>TITAN</span>
          </Link>

          {/* TOP RIGHT NAVIGATION */}
          <nav className={styles.topNav}>
            <Link href="/" className={styles.navItem}>Home</Link>
            <Link href="/store" className={styles.navItem}>Store</Link>
            <Link href="/tournaments" className={styles.navItem}>Tournaments</Link>
            <Link href="/games" className={styles.navItemActive + ' ' + styles.navItem}>Games</Link>
            <Link href="/about" className={styles.navItem}>About</Link>
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
                  className={`${styles.timelineMonth} ${isActive ? styles.timelineMonthActive : ''}`}
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

          {/* LEFT CENTER: RELEASE DATE */}
          <motion.div 
            className={styles.dateContainer}
            style={{ x: dateTranslateX, y: dateTranslateY }}
          >
            <div className={styles.releaseLabel}>
              Release Date
            </div>
            
            <div className={styles.dateNumberBlock}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeGame.day}
                  initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -50, filter: 'blur(4px)' }}
                  transition={transition}
                  className={styles.dateAnimatedContainer}
                >
                  <div className={styles.dayNumber}>{activeGame.day}</div>
                  <div className={styles.monthLabel}>{activeGame.monthName}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: FLOATING ARTWORK */}
          <motion.div 
            className={styles.artworkContainer}
            style={{ x: artTranslateX, y: artTranslateY }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeGame.id}
                className={styles.artwork3DWrapper}
                style={{
                  rotateY: 15,
                  rotateZ: -2,
                  rotateX: 4
                }}
                initial={{ opacity: 0, x: 100, rotateY: 25, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, rotateY: 15, scale: 1 }}
                exit={{ opacity: 0, x: -100, rotateY: 5, scale: 1.05 }}
                transition={transition}
              >
                <div className={styles.artworkBase}>
                  <img src="/images/hero/hero-bg.jpg" alt="bg" className={styles.artworkBg} />
                  <div className={styles.artworkOverlay} />
                </div>
                <img 
                  src={activeGame.image} 
                  alt={activeGame.title} 
                  className={styles.artworkCharacter} 
                />
              </motion.div>
            </AnimatePresence>

            {/* GAME TITLE & META */}
            <div className={styles.gameInfo}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeGame.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ ...transition, delay: 0.1 }}
                  style={{ position: 'absolute' }}
                >
                  <h2 className={styles.gameTitle}>{activeGame.title}</h2>
                  <div className={styles.gameMeta}>{activeGame.meta}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
