import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play, ShieldCheck, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './CinematicHero.module.css';

const GAMES = [
  {
    id: 'valorant',
    title: 'VALORANT POINTS',
    category: 'IN-GAME CURRENCY',
    description: 'ولورانت پوینت (VP) بخرید و اسکین‌های جذاب و بتل پس را در بازی آزاد کنید.',
    character: '/images/hero/characters/valorant.png',
    glowColor: 'rgba(255, 70, 85, 0.3)',
    accentColor: '#ff4655',
    scale: 1.25,
    buttonText: 'محصولات ولورانت'
  },
  {
    id: 'fortnite',
    title: 'V-BUCKS',
    category: 'IN-GAME CURRENCY',
    description: 'وی‌باکس فورتنایت برای خرید اسکین‌ها، دنس‌ها و بتل پس سیزن جدید.',
    character: '/images/hero/characters/fortnite.png',
    glowColor: 'rgba(109, 184, 250, 0.3)',
    accentColor: '#6DB8FA',
    buttonText: 'محصولات فورتنایت'
  },
  {
    id: 'callofduty',
    title: 'COD POINTS',
    category: 'IN-GAME CURRENCY',
    description: 'سی‌پی (CP) کال آف دیوتی برای خرید بتل پس و باندل‌های ویژه وارزون.',
    character: '/images/hero/characters/callofduty.png',
    glowColor: 'rgba(255, 255, 255, 0.2)',
    accentColor: '#ffffff',
    buttonText: 'محصولات کالاف'
  },
  {
    id: 'apex',
    title: 'APEX COINS',
    category: 'IN-GAME CURRENCY',
    description: 'اپکس کوین برای باز کردن لجندهای جدید و خرید پک‌های ویژه در اپکس لجندز.',
    character: '/images/hero/characters/apex.png',
    glowColor: 'rgba(255, 50, 50, 0.3)',
    accentColor: '#ff3232',
    buttonText: 'محصولات ایپکس'
  },
  {
    id: 'tournaments',
    title: 'TITAN TOURNAMENTS',
    category: 'COMPETITIVE GAMING',
    description: 'در مسابقات حرفه‌ای ما شرکت کنید، مهارت خود را ثابت کنید و جوایز نقدی ببرید.',
    character: '/images/tournaments/tournament3.png',
    icon: '/images/tournaments/tournament3.png',
    glowColor: 'rgba(236, 202, 146, 0.3)',
    accentColor: '#ECCA92',
    mixBlendMode: 'screen',
    scale: 1.15,
    titleStyle: { fontSize: 'clamp(var(--text-xl), 2.5vw, var(--text-4xl))' },
    buttonText: 'تورنومنت‌ها'
  }
];

export default function CinematicHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeGame = GAMES[currentIdx];

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % GAMES.length);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + GAMES.length) % GAMES.length);

  // Set global theme color for navbar
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-accent', activeGame.accentColor);
    return () => {
      document.documentElement.style.removeProperty('--theme-accent');
    };
  }, [activeGame.accentColor]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  useEffect(() => {
    document.documentElement.style.setProperty('--active-hero-glow', activeGame.glowColor);
    return () => document.documentElement.style.removeProperty('--active-hero-glow');
  }, [activeGame]);

  return (
    <section
      className={styles.heroSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Backgrounds */}
      <div className={styles.bgWrapper}>

        {/* Dynamic Glow */}
        <motion.div
          className={styles.bgGlow}
          animate={{ background: `radial-gradient(circle at 50% 50%, ${activeGame.glowColor} 0%, transparent 65%)` }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

      </div>

      <div className={`container ${styles.gridContainer}`}>

        {/* LEFT SIDE: Information */}
        <div className={styles.leftSide}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeGame.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }}
              className={styles.infoContent}
            >
              <motion.span
                className={styles.category}
                style={{ color: activeGame.accentColor }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {activeGame.category}
              </motion.span>

              <motion.h1 
                className={styles.title}
                style={(activeGame as any).titleStyle || {}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {activeGame.title}
              </motion.h1>

              <motion.p
                className={styles.description}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {activeGame.description}
              </motion.p>

              <motion.div
                className={styles.ctaWrapper}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <a 
                  href="/store" 
                  className={styles.liquidGlassButton}
                  style={{ '--btn-glow': activeGame.glowColor, '--btn-accent': activeGame.accentColor } as React.CSSProperties}
                >
                  {(activeGame as any).buttonText || 'مشاهده فروشگاه'}
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER: Main Character Showcase */}
        <div className={styles.centerSide}>
          {/* Subtle base platform glow */}
          <motion.div
            className={styles.platformGlow}
            animate={{ boxShadow: `0 0 100px 30px ${activeGame.glowColor}` }}
            transition={{ duration: 1.5 }}
          />

          <AnimatePresence mode="wait">
            <motion.img
              key={`char-${activeGame.id}`}
              src={activeGame.character}
              alt={activeGame.title}
              className={styles.mainCharacter}
              style={{
                mixBlendMode: (activeGame as any).mixBlendMode || 'normal'
              }}
              initial={{ opacity: 0, scale: ((activeGame as any).scale || 1) - 0.1, x: -30 }}
              animate={{ 
                opacity: 1, 
                scale: (activeGame as any).scale || 1, 
                x: 0,
                y: [0, -10, 0] // Subtle idle breathing
              }}
              exit={{ opacity: 0, scale: ((activeGame as any).scale || 1) - 0.05, x: 30 }}
              transition={{
                opacity: { duration: 0.6 },
                scale: { duration: 0.6 },
                x: { duration: 0.6, ease: "easeOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </AnimatePresence>
        </div>

        {/* RIGHT SIDE: Vertical Nav Rail */}
        <div className={styles.rightSide}>
          <div className={styles.sideNav}>
            {GAMES.map((game, idx) => {
              const isActive = idx === currentIdx;
              return (
                <div
                  key={`nav-${game.id}`}
                  className={`${styles.navNode} ${isActive ? styles.navNodeActive : styles.navNodeInactive}`}
                  style={{ '--node-glow': game.accentColor } as React.CSSProperties}
                  onClick={() => setCurrentIdx(idx)}
                >
                  <img src={game.icon || game.character} alt={game.title} className={styles.navIcon} />
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* BOTTOM CONTROL BAR */}
      <div className={`container ${styles.bottomBar}`}>

        {/* Bottom Left: Featured Preview - Removed by user request */}
        <div className={styles.bottomLeft}>
        </div>

        {/* Bottom Center: Navigation */}
        <div className={styles.bottomCenter}>
          <div className={styles.pagination}>
            {GAMES.map((_, idx) => (
              <div
                key={idx}
                className={`${styles.dot} ${idx === currentIdx ? styles.dotActive : ''}`}
                style={{ backgroundColor: idx === currentIdx ? activeGame.accentColor : '' }}
                onClick={() => setCurrentIdx(idx)}
              />
            ))}
          </div>
          
          <div className={styles.navArrows}>
            <button className={`${styles.navBtn} ${styles.prevBtn}`} style={{ '--btn-accent': activeGame.accentColor, '--btn-glow': activeGame.glowColor } as React.CSSProperties} onClick={prevSlide}>
              <ArrowRight size={18} />
            </button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} style={{ '--btn-accent': activeGame.accentColor, '--btn-glow': activeGame.glowColor } as React.CSSProperties} onClick={nextSlide}>
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>



      </div>
    </section>
  );
}
