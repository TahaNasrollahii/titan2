'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './product.module.css';
import { Play, Heart, ShieldCheck, RefreshCcw, Truck, Share2, Plus, Minus, Flame, Eye, LayoutGrid, MonitorPlay, MessageSquare, Monitor, ArrowLeft } from 'lucide-react';

const PsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M23.667 15.65c-2.02-.686-5.83-1.353-8.877-1.562l-1.02-.061v3.082l1.636.24c3.491.517 5.42 1.134 5.42 1.734 0 .346-1.083.743-2.906 1.059-1.93.336-4.63.418-6.172.193l-1.09-.16v-4.116c2.518-.344 5.346-.902 5.346-1.053 0-.05-1.144-.457-2.63-1.02-1.488-.564-2.715-1.022-2.727-1.018-.01.004-.017.904-.017 1.996l-.001 1.989-1.84.28c-1.013.155-1.84.269-1.835.253.003-.016.012-2.482.022-5.48.016-5.013.023-5.45.097-5.592.056-.11.233-.172 1.348-.485C9.52 5.586 11.08 5.112 12.186 4.8l.582-.164v10.998l2.138-.348V2c-3.194.52-8.544 1.79-10.96 2.604-1.294.437-1.492.518-1.594.654-.084.113-.092.3-.09 1.96.001 1.487.006 1.83.023 1.875.035.093.18.158.855.378 1.583.518 4.295 1.192 6.551 1.627l.951.182-.016 1.64c-.015 1.53-.024 1.642-.144 1.782-.088.102-.303.14-.997.172-1.795.086-4.263-.162-6.526-.653l-.976-.21v1.657l.001 1.655.234.126c.128.068.79.356 1.472.639 1.867.776 5.438 1.983 6.942 2.348l.613.148-.008 1.653c-.007 1.484-.014 1.656-.076 1.767-.1.176-.328.24-1.865.525-1.554.29-3.837.404-5.836.294-1.867-.102-3.883-.377-5.465-.745L0 19.102v-1.636l-.001-1.638.384.285c1.196.887 3.395 1.914 5.44 2.54 1.503.46 4.316.89 5.867.893.307.002.32-.002.347-.09.02-.066.027-2.316.025-7.53l-.004-7.447-2.228-.518C6.91 3.284 3.65 2.355 2.11 1.745 1.258 1.408 1.183 1.373 1.18 1.305c-.004-.09 1.696-.644 3.123-1.02C6.015-.164 12.016-1.127 15.637-.487c2.312.408 4.673 1.156 6.582 2.086 1.378.67 1.781 1.054 1.781 1.694 0 .546-.307.892-1.353 1.528-1.675 1.018-4.52 1.826-8.086 2.302L13.51 7.26v1.362l.504-.065c1.391-.178 3.51-.555 4.665-.83 1.294-.307 2.66-.757 3.385-1.116L22.5 6.398v1.653l-.001 1.65-.253.155c-.14.086-1.144.542-2.234.1012C17.65 10.748 14.398 11.234 13.51 11.3l-.507.037v2.09c0 1.92-.007 2.093-.083 2.158-.043.037-.624.167-1.29.289l-1.21.222.014-2.88c.01-1.584.02-2.886.025-2.894.004-.007.41-.05.902-.096 1.348-.124 3.738-.47 5.234-.757 1.385-.264 2.505-.592 3.187-.93.22-.108.41-.197.425-.197.014 0 .025.748.025 1.662v1.66z"/>
  </svg>
);

const XboxIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M11.984 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm-7.66 3.81c1.82-1.32 3.8-1.57 5.1-.38 1.48 1.34 2.82 4.09 3.5 7.1-1.92-2-4.52-3.8-7.3-4.8a6.34 6.34 0 01-1.3-1.92zm15.34.02c-.36.75-.85 1.4-1.42 1.94-2.73 1-5.32 2.83-7.23 4.8.69-3.05 2.05-5.83 3.56-7.18 1.33-1.18 3.32-.93 5.09.44zM2.4 12c0-.52.05-1.02.13-1.5.34.56.76 1.08 1.25 1.55 3.38 1.47 6.46 3.93 8.35 7.23a10.04 10.04 0 01-9.73-7.28zm19.2.02c0 2.8-1.18 5.31-3.06 7.1-1.12-2.1-2.9-4.2-5.18-5.8 2.03-1.5 4.78-2.6 8.16-2.92.05.53.08 1.07.08 1.62z"/>
  </svg>
);

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className={styles.container} dir="rtl">
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <span>خانه</span>
        <span className={styles.separator}>&gt;</span>
        <span>فورتنایت</span>
        <span className={styles.separator}>&gt;</span>
        <span className={styles.current}>۲۸۰۰ وی‌باکس فورتنایت</span>
      </nav>

      {/* Main Product Section */}
      <div className={styles.mainSection}>

        {/* Right Side - Details */}
        <div className={styles.detailsColumn}>

          <div className={styles.headerRow}>
            <div className={styles.badgePopular}>
              <Flame size={16} className={styles.flameIcon} />
              <span>محبوب</span>
            </div>
            <div className={styles.actionsTop}>
              <button className={styles.iconBtn} aria-label="Xbox Compatible"><XboxIcon /></button>
              <button className={styles.iconBtn} aria-label="PlayStation Compatible"><PsIcon /></button>
              <button className={styles.iconBtn} aria-label="PC Compatible"><Monitor size={18} /></button>
            </div>
          </div>

          <div className={styles.categoryTitle}>فورتنایت (Fortnite)</div>
          <h1 className={styles.productTitle}>۲۸۰۰ وی‌باکس فورتنایت (V-Bucks)</h1>

          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              <span className={styles.ratingScore}>۴/۸</span>
              <span className={styles.starsIcons}>⭐⭐⭐⭐⭐</span>
            </div>
            <div className={styles.reviewers}>
              {/* Avatars */}
              <div className={styles.avatars}>
                <div className={styles.avatar} style={{ backgroundColor: '#10b981' }}>س</div>
                <div className={styles.avatar} style={{ backgroundColor: '#3b82f6' }}>ک</div>
                <div className={styles.avatar} style={{ backgroundColor: '#f97316' }}>ن</div>
              </div>
              <span className={styles.reviewersCount}>۲۱۴۰ نفر</span>
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceRow}>
              <div className={styles.priceValues}>
                <span className={styles.currentPrice}>۱,۴۵۰,۰۰۰ <span>تومان</span></span>
                <span className={styles.oldPrice}>۱,۶۵۰,۰۰۰</span>
              </div>
              <div className={styles.discountBadge}>۱۸٪ تخفیف</div>
            </div>

            <div className={styles.stockInfo}>

              <div className={styles.stockLeft}>
                <span className={styles.redDot}></span>
                <span>فقط ۴ عدد باقی مانده</span>
              </div>
            </div>
          </div>



          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.wishlistBtn}><Heart size={20} /></button>
            <button className={styles.buyNowBtn}>خرید فوری</button>
            <button className={styles.addToCartBtn}>
              <Plus size={20} />
              افزودن به سبد
            </button>
            <div className={styles.quantityControl}>
              <button><Plus size={16} /></button>
              <span>۱</span>
              <button><Minus size={16} /></button>
            </div>
          </div>

          {/* Features */}
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <ShieldCheck size={24} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>تضمین قانونی بودن</div>
                <div className={styles.featureDesc}>بدون بن شدن</div>
              </div>
            </div>
            <div className={styles.featureItem}>
              <RefreshCcw size={24} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>پشتیبانی ۲۴ ساعته</div>
                <div className={styles.featureDesc}>رسید خرید معتبر</div>
              </div>
            </div>
            <div className={styles.featureItem}>
              <Truck size={24} className={styles.featureIcon} />
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>شارژ فوری</div>
                <div className={styles.featureDesc}>زیر ۱۵ دقیقه</div>
              </div>
            </div>
          </div>

        </div>

        {/* Left Side - Image Gallery */}
        <div className={styles.imageColumn}>
          <div className={styles.mainImageArea}>


            <img src="/images/products/vbucks.png" alt="2800 V-Bucks" className={styles.mainImage} />

            <button className={styles.videoBtn}>
              <Play size={16} fill="currentColor" />
              ویدیو معرفی
            </button>
          </div>


        </div>

      </div>

      {/* Tabs */}
      <div className={styles.tabsRow}>
        <button className={`${styles.tabItem} ${styles.tabActive}`}>توضیحات</button>
        <button className={styles.tabItem}>مشخصات</button>
        <button className={styles.tabItem}>نظرات <span className={styles.tabBadge}>۲۱۴</span></button>
      </div>

      {/* About Section */}
      <div className={styles.aboutSection}>
        <h2>درباره ۲۸۰۰ وی‌باکس</h2>
        <p>
          با خرید ۲۸۰۰ وی‌باکس فورتنایت، بتل پس سیزن جدید را بخرید یا اسکین‌های جذاب آیتم شاپ را از آن خود کنید. وی‌باکس‌ها به صورت قانونی و با رسید معتبر روی اکانت اپیک گیمز، پلی‌استیشن یا ایکس‌باکس شما شارژ می‌شوند. تمامی پرداخت‌ها مستقیماً در فروشگاه رسمی اپیک گیمز انجام شده و هیچ‌گونه خطری برای اکانت شما نخواهد داشت.
        </p>
        <div className={styles.aboutTags}>
          <span className={styles.aboutTag}>شارژ مستقیم روی اکانت</span>
          <span className={styles.aboutTag}>قابل استفاده در همه پلتفرم‌ها</span>
          <span className={styles.aboutTag}>رسید معتبر اپیک گیمز</span>
          <span className={styles.aboutTag}>بدون خطر بن شدن</span>
        </div>
      </div>

      {/* Recommended Section */}
      <div className={styles.recommendedSection}>
        <div className={styles.recommendedHeader}>
          <div className={styles.recommendedTitle}>
            <span className={styles.redBar}></span>
            شاید بپسندید
          </div>
          <button className={styles.scrollBtn}>
            <ArrowLeft size={18} />
          </button>
        </div>

        <Swiper 
          className={styles.recommendedScroll}
          spaceBetween={16}
          slidesPerView={'auto'}
          grabCursor={true}
          dir="rtl"
        >
          <SwiperSlide style={{ width: 'auto' }}>
            <div className={styles.recCard}>
              <img src="/images/products/p-controller.jpg" className={styles.recImage} alt="دسته بی‌سیم تایتان نوا" draggable={false} />
              <div className={styles.recOverlay}>
                <h3 className={styles.recTitle}>دسته بی‌سیم تایتان نوا</h3>
                <p className={styles.recPrice}>۲,۴۵۰,۰۰۰ <span>تومان</span></p>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide style={{ width: 'auto' }}>
            <div className={styles.recCard}>
              <img src="/images/products/p-keyboard.jpg" className={styles.recImage} alt="کیبورد مکانیکال پالس ۶۵" draggable={false} />
              <div className={styles.recOverlay}>
                <h3 className={styles.recTitle}>کیبورد مکانیکال پالس ۶۵</h3>
                <p className={styles.recPrice}>۳,۱۹۰,۰۰۰ <span>تومان</span></p>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide style={{ width: 'auto' }}>
            <div className={styles.recCard}>
              <img src="/images/products/p-game-1.jpg" className={styles.recImage} alt="بازی ولور ایجنتس - نسخه دلوکس" draggable={false} />
              <div className={styles.recOverlay}>
                <h3 className={styles.recTitle}>بازی ولور ایجنتس - نسخه دلوکس</h3>
                <p className={styles.recPrice}>۸۹۰,۰۰۰ <span>تومان</span></p>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide style={{ width: 'auto' }}>
            <div className={styles.recCard}>
              <img src="/images/products/p-headset.jpg" className={styles.recImage} alt="هدست پالس X - نسخه قرمز" draggable={false} />
              <div className={styles.recOverlay}>
                <h3 className={styles.recTitle}>هدست پالس X - نسخه قرمز</h3>
                <p className={styles.recPrice}>۴,۸۹۰,۰۰۰ <span>تومان</span></p>
              </div>
            </div>
          </SwiperSlide>
          
          <SwiperSlide style={{ width: 'auto' }}>
            <div className={styles.recCard}>
              <img src="/images/products/p-mouse.jpg" className={styles.recImage} alt="موس گیمینگ وایپر" draggable={false} />
              <div className={styles.recOverlay}>
                <h3 className={styles.recTitle}>موس گیمینگ وایپر</h3>
                <p className={styles.recPrice}>۱,۲۰۰,۰۰۰ <span>تومان</span></p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  );
}
