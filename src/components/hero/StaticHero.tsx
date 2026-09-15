import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Gamepad2, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './StaticHero.module.css';

const banners = [
  {
    id: 1,
    title: 'VALORANT',
    subtitle: 'رقابت‌های تاکتیکال و هیجان‌انگیز',
    character: '/images/hero/characters/valorant.png',
    bg: '/images/hero/valorant.jpg',
    customStyle: { left: '-10%', transform: 'scale(1.15)', transformOrigin: 'bottom left' },
    gradient: 'radial-gradient(circle at 70% 30%, rgba(255, 70, 85, 0.8), rgba(15, 25, 35, 0.9) 70%)',
    glowColor: 'rgba(255, 70, 85, 0.5)'
  },
  {
    id: 2,
    title: 'CALL OF DUTY',
    subtitle: 'نبرد در خط مقدم وارزون',
    character: '/images/hero/characters/callofduty.png',
    bg: '/images/hero/callofduty.jpg',
    gradient: 'radial-gradient(circle at 70% 30%, rgba(0, 255, 170, 0.5), rgba(10, 20, 15, 0.9) 70%)',
    glowColor: 'rgba(0, 255, 170, 0.5)'
  },
  {
    id: 3,
    title: 'FORTNITE',
    subtitle: 'چالش بقا در دنیای فورتنایت',
    character: '/images/hero/characters/fortnite.png',
    bg: '/images/hero/fortnite.jpg',
    gradient: 'radial-gradient(circle at 70% 30%, rgba(160, 32, 240, 0.7), rgba(20, 10, 35, 0.9) 70%)',
    glowColor: 'rgba(160, 32, 240, 0.5)'
  },
  {
    id: 4,
    title: 'TOURNAMENTS',
    subtitle: 'رقابت‌های هیجان‌انگیز',
    character: '/images/hero/characters/tournaments-character.png',
    bg: '/images/hero/tournaments-bg.png',
    gradient: 'radial-gradient(circle at 70% 30%, rgba(69, 248, 130, 0.7), rgba(10, 30, 20, 0.9) 70%)',
    glowColor: 'rgba(69, 248, 130, 0.5)',
    customStyle: { height: '65%', bottom: '100px' }
  },
  {
    id: 5,
    title: 'APEX LEGENDS',
    subtitle: 'قهرمانان اپکس در انتظار شما',
    character: '/images/hero/characters/apex.png',
    bg: '/images/hero/apex.jpg',
    gradient: 'radial-gradient(circle at 70% 30%, rgba(255, 50, 50, 0.7), rgba(30, 10, 10, 0.9) 70%)',
    glowColor: 'rgba(255, 50, 50, 0.5)'
  }
];

export default function StaticHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.badge}>
              <span className={styles.badgePulse}></span>
              نسل جدید پلتفرم گیمینگ
            </div>
            
            <h1 className={styles.title}>
              پلتفرم <span className="text-gradient">تایتان</span> <br />
              آرنای قهرمانان
            </h1>
            
            <p className={styles.subtitle}>
              در بزرگترین تورنومنت‌های آنلاین شرکت کن، جوایز نقدی ببر و با خرید محصولات دیجیتال، قدرت خودت رو در بازی دوچندان کن.
            </p>
            
            <div className={styles.actions}>
              <Button href="/tournaments" variant="primary" size="lg" glow icon={<Trophy size={20} />}>
                ورود به مسابقات
              </Button>
              <Button href="/store" variant="outline" size="lg" icon={<Gamepad2 size={20} />}>
                فروشگاه تایتان
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className={styles.imageWrapper}>
          {/* Floating Container (Separate from 3D tilt) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0] 
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'center' }}
          >
            {/* 3D Tilt Wrapper */}
            <motion.div
              className={styles.imageContainer}
              style={{ rotateX, rotateY, zIndex: 10 }}
              onMouseMove={(e) => {
                handleMouseMove(e);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                handleMouseLeave();
                setIsHovered(false);
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className={styles.carouselSlide}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glass Base (clips background, allows character to overflow above) */}
                  <div className={styles.carouselGlassBase}>
                    <img src={banners[currentSlide].bg} alt={banners[currentSlide].title} className={styles.carouselSpaceBg} />
                    <div 
                      className={styles.carouselGradient} 
                      style={{ background: banners[currentSlide].gradient }}
                    />
                  </div>
                  
                  {/* Character Overlay - Pops out fully */}
                  <motion.img 
                    src={banners[currentSlide].character} 
                    alt={banners[currentSlide].title}
                    className={styles.characterLayer}
                    style={banners[currentSlide].customStyle || {}}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, y: [0, -8, 0] }}
                    transition={{ 
                      x: { duration: 0.4, ease: "easeOut" },
                      opacity: { duration: 0.4 },
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />

                  {/* Info Text */}
                  <div className={styles.carouselInfo}>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={styles.carouselTitle}>{banners[currentSlide].title}</div>
                      <div className={styles.carouselSubtitle}>{banners[currentSlide].subtitle}</div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav Arrows */}
              <div className={`${styles.navArrow} ${styles.navArrowLeft}`} onClick={(e) => { e.stopPropagation(); nextSlide(); }}>
                <ChevronLeft size={24} />
              </div>
              <div className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={(e) => { e.stopPropagation(); prevSlide(); }}>
                <ChevronRight size={24} />
              </div>

              {/* Carousel Indicators */}
              <div className={styles.indicators}>
                {banners.map((_, index) => (
                  <div 
                    key={index} 
                    className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                    onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }}
                  />
                ))}
              </div>


            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
