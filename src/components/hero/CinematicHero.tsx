import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play, ShieldCheck, Zap } from 'lucide-react';
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
    scale: 1.25
  },
  {
    id: 'callofduty',
    title: 'COD POINTS',
    category: 'IN-GAME CURRENCY',
    description: 'سی‌پی (CP) کال آف دیوتی برای خرید بتل پس و باندل‌های ویژه وارزون.',
    character: '/images/hero/characters/callofduty.png',
    glowColor: 'rgba(0, 255, 170, 0.25)',
    accentColor: '#00ffaa'
  },
  {
    id: 'fortnite',
    title: 'V-BUCKS',
    category: 'IN-GAME CURRENCY',
    description: 'وی‌باکس فورتنایت برای خرید اسکین‌ها، دنس‌ها و بتل پس سیزن جدید.',
    character: '/images/hero/characters/fortnite.png',
    glowColor: 'rgba(160, 32, 240, 0.3)',
    accentColor: '#a020f0'
  },
  {
    id: 'apex',
    title: 'APEX COINS',
    category: 'IN-GAME CURRENCY',
    description: 'اپکس کوین برای باز کردن لجندهای جدید و خرید پک‌های ویژه در اپکس لجندز.',
    character: '/images/hero/characters/apex.png',
    glowColor: 'rgba(255, 50, 50, 0.3)',
    accentColor: '#ff3232'
  },
  {
    id: 'tournaments',
    title: 'TITAN TOURNAMENTS',
    category: 'COMPETITIVE GAMING',
    description: 'در مسابقات حرفه‌ای ما شرکت کنید، مهارت خود را ثابت کنید و جوایز نقدی ببرید.',
    character: '/images/tournaments/tournament3.png',
    icon: '/images/tournaments/tournament3.png',
    glowColor: 'rgba(255, 200, 0, 0.3)',
    accentColor: '#ffc800',
    mixBlendMode: 'screen',
    scale: 1.15,
    titleStyle: { fontSize: 'clamp(var(--text-2xl), 3.5vw, var(--text-5xl))' }
  }
];

export default function CinematicHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeGame = GAMES[currentIdx];

  // Get next two games for selector cards
  const nextGame1Idx = (currentIdx + 1) % GAMES.length;
  const nextGame2Idx = (currentIdx + 2) % GAMES.length;
  const nextGame1 = GAMES[nextGame1Idx];
  const nextGame2 = GAMES[nextGame2Idx];

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % GAMES.length);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + GAMES.length) % GAMES.length);

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

        {/* Large Typography in BG */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-text-${activeGame.id}`}
            className={styles.bgText}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {activeGame.title}
          </motion.div>
        </AnimatePresence>
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
                <Button
                  href="/store"
                  variant="primary"
                  size="lg"
                  glow
                  style={{ '--btn-bg': activeGame.accentColor, '--btn-hover': activeGame.accentColor } as React.CSSProperties}
                >
                  مشاهده فروشگاه
                </Button>
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

        {/* RIGHT SIDE: Selectors */}
        <div className={styles.rightSide}>
          <div className={styles.selectorCards}>
            {/* Card 1 */}
            <motion.div
              className={styles.selectorCard}
              onClick={() => setCurrentIdx(nextGame1Idx)}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={nextGame1.character} alt={nextGame1.title} className={styles.selectorImg} />
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className={styles.selectorCard}
              onClick={() => setCurrentIdx(nextGame2Idx)}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={nextGame2.character} alt={nextGame2.title} className={styles.selectorImg} />
            </motion.div>
          </div>
        </div>

      </div>

      {/* BOTTOM CONTROL BAR */}
      <div className={`container ${styles.bottomBar}`}>

        {/* Bottom Left: Featured Preview */}
        <div className={styles.bottomLeft}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`featured-${activeGame.id}`}
              className={styles.featuredCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.featuredIconWrapper}>
                <Play size={16} fill="currentColor" />
              </div>
              <div>
                <div className={styles.featuredEyebrow}>بازی ویژه</div>
                <div className={styles.featuredTitle}>{activeGame.title}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Center: Navigation */}
        <div className={styles.bottomCenter}>
          <button className={styles.navBtn} onClick={nextSlide}>
            <ChevronRight size={20} />
          </button>

          <div className={styles.pagination}>
            {GAMES.map((_, idx) => (
              <div
                key={idx}
                className={`${styles.dot} ${idx === currentIdx ? styles.dotActive : ''}`}
                onClick={() => setCurrentIdx(idx)}
              />
            ))}
          </div>

          <button className={styles.navBtn} onClick={prevSlide}>
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Bottom Right: Info Cards */}
        <div className={styles.bottomRight}>
          <div className={styles.infoCard}>
            <Zap size={18} className={styles.infoIcon} />
            <span>تحویل آنی</span>
          </div>
          <div className={styles.infoCard}>
            <ShieldCheck size={18} className={styles.infoIcon} />
            <span>پرداخت امن</span>
          </div>
        </div>

      </div>
    </section>
  );
}
