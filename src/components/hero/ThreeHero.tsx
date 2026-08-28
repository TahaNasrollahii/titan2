'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gamepad2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './ThreeHero.module.css';

// Dynamically import the 3D scene to avoid SSR issues with Three.js/Canvas
import dynamic from 'next/dynamic';
const ThreeScene = dynamic(() => import('./ThreeScene'), { 
  ssr: false,
  loading: () => <div className={styles.fallback} />
});

export default function ThreeHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* 3D Environment Background */}
      <div className={styles.canvasContainer}>
        {mounted && (
          <Suspense fallback={<div className={styles.fallback} />}>
            <ThreeScene />
          </Suspense>
        )}
      </div>

      {/* UI Overlay */}
      <div className={`container ${styles.uiContainer}`}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <div className={styles.badge}>
              <span className={styles.badgePulse}></span>
              نسل جدید پلتفرم گیمینگ
            </div>
            
            <h1 className={styles.title}>
              وارد <span className="text-gradient">نسل بعد</span> <br />
              شوید
            </h1>
            
            <p className={styles.subtitle}>
              پلتفرم برتر برای رقابت، جوایز نقدی و تجهیزات دیجیتال. 
              آرنای خود را فتح کنید.
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
      </div>
    </section>
  );
}
