'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GradientOrb from '@/components/effects/GradientOrb';
import StaticHero from '@/components/hero/StaticHero';
import DiscountsSection from '@/components/sections/DiscountsSection';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import TournamentCard from '@/components/cards/TournamentCard';
import GameCard from '@/components/cards/GameCard';
import ProductCard from '@/components/cards/ProductCard';
import { tournaments } from '@/data/tournaments';
import { games } from '@/data/games';
import { products } from '@/data/products';
import { players } from '@/data/players';
import { Swords, ShoppingBag, Trophy, ArrowLeft, Sparkles, Users, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

type TournamentTab = 'all' | 'live' | 'upcoming' | 'completed';

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUpItem: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TournamentTab>('all');

  const filteredTournaments = activeTab === 'all'
    ? tournaments.slice(0, 6)
    : tournaments.filter(t => t.status === activeTab).slice(0, 6);

  const displayTournaments = filteredTournaments.slice(0, 3);
  const featuredProducts = products.slice(0, 4);
  const topPlayers = players.slice(0, 5);

  const tabs: { key: TournamentTab; label: string }[] = [
    { key: 'all', label: 'همه' },
    { key: 'live', label: 'زنده' },
    { key: 'upcoming', label: 'بزودی' },
    { key: 'completed', label: 'پایان‌یافته' },
  ];

  return (
    <>
      <Navbar />

      <StaticHero />

      {/* ==================== DISCOUNTS ==================== */}
      <motion.section 
        className={styles.sectionWrapper}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <DiscountsSection />
      </motion.section>

      {/* ==================== LIVE BATTLES ==================== */}
      <motion.section 
        className={styles.sectionWrapper}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div variants={fadeUpItem}>
            <SectionHeader
              eyebrow="نبردهای زنده"
              title="وارد رقابت شو"
              subtitle="رقابت کن. صعود کن. فتح کن."
            />
          </motion.div>

          <motion.div variants={fadeUpItem} className={styles.tabsRow}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          <div className={styles.tournamentsGrid}>
            {displayTournaments.map(t => (
              <motion.div key={t.id} variants={fadeUpItem} style={{ height: '100%' }}>
                <TournamentCard tournament={t} />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpItem} className={styles.viewAllRow}>
            <Button variant="outline" href="/tournaments" icon={<ArrowLeft size={18} />} iconPosition="end">
              مشاهده همه مسابقات
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== FEATURED GAMES ==================== */}
      <motion.section 
        className={styles.sectionWrapper} 
        style={{ position: 'relative' }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <GradientOrb color="violet" size={400} top="10%" left="-10%" opacity={0.08} />
        <div className="container">
          <motion.div variants={fadeUpItem}>
            <SectionHeader
              eyebrow="بازی‌های محبوب"
              title="میدان نبرد خود را انتخاب کنید"
              subtitle="بازی مورد علاقه‌ات را انتخاب کن و وارد دنیای رقابتی شو."
            />
          </motion.div>

          <div className={styles.gamesGrid}>
            {games.map(game => (
              <motion.div key={game.id} variants={fadeUpItem} style={{ height: '100%' }}>
                <GameCard game={game} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ==================== STORE ==================== */}
      <motion.section 
        className={styles.sectionWrapper}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container">
          <motion.div variants={fadeUpItem}>
            <SectionHeader
              eyebrow="فروشگاه تایتان"
              title="بازی خود را قدرتمند کنید"
              subtitle="همه چیز برای گیمینگ در یک مقصد."
            />
          </motion.div>

          <div className={styles.productsGrid}>
            {featuredProducts.map(product => (
              <motion.div key={product.id} variants={fadeUpItem} style={{ height: '100%' }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpItem} className={styles.viewAllRow}>
            <Button variant="outline" href="/store" icon={<ArrowLeft size={18} />} iconPosition="end">
              مشاهده همه محصولات
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== LEADERBOARD PREVIEW ==================== */}
      <motion.section 
        className={styles.sectionWrapper} 
        style={{ position: 'relative' }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <GradientOrb color="blue" size={350} bottom="0%" right="-10%" opacity={0.02} />
        <div className="container">
          <SectionHeader
            eyebrow="رتبه‌بندی"
            title="رتبه‌بندی تایتان"
            subtitle="برترین بازیکنان پلتفرم تایتان."
          />

          <motion.div variants={fadeUpItem} className={styles.leaderboardPreview}>
            <table className={styles.leaderboardTable}>
              <thead>
                <tr>
                  <th>رتبه</th>
                  <th>بازیکن</th>
                  <th>بازی</th>
                  <th>بردها</th>
                  <th>نرخ برد</th>
                  <th>امتیاز</th>
                  <th>درآمد</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((player, index) => (
                  <tr key={player.id}>
                    <td className={`${styles.rankCell} ${
                      index === 0 ? styles.rankGold :
                      index === 1 ? styles.rankSilver :
                      index === 2 ? styles.rankBronze : ''
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${player.rank}`}
                    </td>
                    <td>
                      <div className={styles.playerCell}>
                        <div className={styles.playerAvatar}>
                          {player.username.charAt(0)}
                        </div>
                        <span className={styles.playerName}>{player.username}</span>
                      </div>
                    </td>
                    <td>{player.favoriteGame}</td>
                    <td>{player.wins.toLocaleString('fa-IR')}</td>
                    <td>{player.winRate}٪</td>
                    <td className={styles.pointsCell}>{player.points.toLocaleString('fa-IR')}</td>
                    <td>{player.earnings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div variants={fadeUpItem} className={styles.viewAllRow}>
            <Button variant="outline" href="/leaderboard" icon={<ArrowLeft size={18} />} iconPosition="end">
              مشاهده رتبه‌بندی کامل
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== CTA ==================== */}
      <motion.section 
        className={styles.ctaSection}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerContainer}
      >
        <GradientOrb color="blue" size={500} top="-30%" left="20%" opacity={0.03} />
        <GradientOrb color="violet" size={400} bottom="-20%" right="10%" opacity={0.02} />
        <div className={`container ${styles.ctaContent}`}>
          <motion.div variants={fadeUpItem}>
            <Sparkles size={40} style={{ color: 'var(--titan-accent-blue)' }} />
          </motion.div>
          <motion.h2 variants={fadeUpItem} className={styles.ctaHeading}>
            آماده‌ای وارد{' '}
            <span className="text-gradient">آرنا</span>{' '}
            بشی؟
          </motion.h2>
          <motion.p variants={fadeUpItem} className={styles.ctaText}>
            همین الان عضو تایتان شو و در مسابقات حرفه‌ای شرکت کن.
          </motion.p>
          <motion.div variants={fadeUpItem}>
            <Button size="lg" variant="primary" glow href="/register" icon={<Gamepad2 size={20} />}>
              ثبت‌نام رایگان
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
