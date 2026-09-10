'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './GamesShowcaseSection.module.css';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const games = [
  {
    id: 'valorant',
    title: 'VALORANT',
    image: '/images/showcase/valorant.png',
    cardClass: styles.cardValorant,
    href: '/store?game=valorant'
  },
  {
    id: 'fortnite',
    title: 'FORTNITE',
    image: '/images/showcase/fortnite.png',
    cardClass: styles.cardFortnite,
    href: '/store?game=fortnite'
  },
  {
    id: 'apex',
    title: 'APEX LEGENDS',
    image: '/images/showcase/apex.png',
    cardClass: styles.cardApex,
    href: '/store?game=apex'
  },
  {
    id: 'cod',
    title: 'CALL OF DUTY',
    image: '/images/showcase/callofduty.png',
    cardClass: styles.cardCod,
    href: '/store?game=cod'
  }
];

export default function GamesShowcaseSection() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <motion.div variants={fadeUpItem} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeader
            title="بازی‌ها"
          />
        </motion.div>

        <motion.div 
          className={styles.cardsGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {games.map((game, index) => (
            <motion.div 
              key={game.id}
              className={`${styles.card} ${game.cardClass}`}
              style={{ backgroundImage: `url(${game.image})` }}
              variants={fadeUpItem}
            >
              <div className={styles.content}>
                <Link href={game.href} style={{ width: '100%' }}>
                  <button className={styles.button}>
                    مشاهده محصولات
                    <ChevronLeft size={16} />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.controls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className={styles.navButton}>
            <ChevronRight size={18} />
          </button>
          
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.active}`}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>

          <button className={styles.navButton}>
            <ChevronLeft size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
