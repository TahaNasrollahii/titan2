'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './product.module.css';
import { Play, Heart, ShieldCheck, RefreshCcw, Truck, Share2, Plus, Minus, Flame, Eye, LayoutGrid, MonitorPlay, MessageSquare, Monitor, ArrowLeft } from 'lucide-react';

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
              <button className={styles.iconBtn} aria-label="Xbox Compatible"><img src="/images/xbox.png" alt="Xbox" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /></button>
              <button className={styles.iconBtn} aria-label="PlayStation Compatible"><img src="/images/playstation.png" alt="PlayStation" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /></button>
              <button className={styles.iconBtn} aria-label="PC Compatible"><img src="/images/pc.png" alt="PC" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /></button>
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
