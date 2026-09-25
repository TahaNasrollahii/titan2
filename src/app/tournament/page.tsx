'use client';

import React, { useState } from 'react';
import './tournament.css';

export default function TournamentPage() {
  const [activeTab, setActiveTab] = useState('بهترین تیم‌ها');

  return (
    <div className="tournament-page reveal" style={{ '--d': 2 } as React.CSSProperties}>
      <div className="top-row">
        <div className="banner">
          <svg className="banner-rays" viewBox="0 0 600 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.35">
              <path d="M560 -40 L620 -40 L500 420 L440 420 Z" fill="rgba(255,150,90,0.15)"/>
              <path d="M500 -40 L545 -40 L430 420 L385 420 Z" fill="rgba(255,150,90,0.1)"/>
            </g>
          </svg>
          <div className="banner-ghost">T</div>
          <div className="banner-inner">
            <div className="badge-row">
              <span className="badge badge-gold">فصل جدید</span>
              <span className="badge badge-outline">۳ مسابقه زنده<span className="pulse-dot"></span></span>
            </div>
            <h1>مسابقات <em>تایتان</em></h1>
            <p>در تورنومنت‌های رسمی تایتان ثبت‌نام کن، با بهترین بازیکن‌های کشور رقابت کن و سهمی از جوایز نقدی این فصل رو ببر.</p>
            <div className="banner-foot">
              <button className="btn-primary">ثبت‌نام در مسابقه</button>
              <div className="review-pill"><div className="avatars"><span></span><span></span><span></span></div>+۲۴۰ بازیکن فعال</div>
            </div>
          </div>
        </div>

        <div className="status-card">
          <div className="status-glow"></div>
          <div className="status-ring-wrap">
            <div className="status-blob"></div>
            <div className="status-ring-inner">
              <div className="lbl">امتیاز کل</div>
              <div className="val">4,851</div>
            </div>
          </div>
          <div className="status-mini-row">
            <div className="status-mini win">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="#5fd07a" strokeWidth="2.2"><path d="M5 13l4 4L19 7"/></svg></div>
              <b>38</b><span>برد</span>
            </div>
            <div className="status-mini loss">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="#ff5a35" strokeWidth="2.2"><path d="M6 6l12 12M18 6L6 18"/></svg></div>
              <b>12</b><span>باخت</span>
            </div>
            <div className="status-mini matches">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="#6fa8dc" strokeWidth="2.2"><circle cx="12" cy="12" r="8"/></svg></div>
              <b>50</b><span>مسابقه</span>
            </div>
          </div>
        </div>
      </div>

      <section className="tour-section reveal" style={{ '--d': 3 } as React.CSSProperties}>
        <div className="section-head"><div className="head-left"><div className="accent-bar"></div><div><h2>مسابقات پیش رو</h2><p>ثبت‌نام کن و منتظر شروع نبرد بمون</p></div></div></div>

        <div className="match-card m1">
          <span className="match-status">ثبت‌نام باز است</span>
          <div className="match-side"><div className="crest">SW</div><div><div className="team-name">Shadow Wolves</div><div className="team-tag">تیم مدافع عنوان</div></div></div>
          <div className="match-center">
            <span className="vs-badge">VS</span>
            <svg className="vs-bolt" viewBox="0 0 24 24" fill="#fff"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>
            <div className="match-time">فردا · ۲۱:۰۰</div>
          </div>
          <div className="match-side right"><div className="crest">CF</div><div><div className="team-name">Crimson Fangs</div><div className="team-tag">صعود از مرحله گروهی</div></div></div>
        </div>

        <div className="match-card m2">
          <span className="match-status">۲ روز دیگر</span>
          <div className="match-side"><div className="crest">NP</div><div><div className="team-name">Night Phantoms</div><div className="team-tag">رتبه ۳ فصل قبل</div></div></div>
          <div className="match-center">
            <span className="vs-badge">VS</span>
            <svg className="vs-bolt" viewBox="0 0 24 24" fill="#fff"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>
            <div className="match-time">پنجشنبه · ۱۹:۳۰</div>
          </div>
          <div className="match-side right"><div className="crest">IF</div><div><div className="team-name">Iron Falcons</div><div className="team-tag">تازه‌وارد فصل</div></div></div>
        </div>
      </section>

      <section className="tour-section reveal" style={{ '--d': 4 } as React.CSSProperties}>
        <div className="section-head"><div className="head-left"><div className="accent-bar"></div><h2>چطور ثبت‌نام کنم؟</h2></div></div>
        <div className="steps">
          <div className="step"><div className="step-num">۱</div><h3>تیم بساز یا بپیوند</h3><p>یه تیم جدید بساز یا با کد دعوت به تیم دوستات ملحق شو.</p></div>
          <div className="step"><div className="step-num">۲</div><h3>مسابقه رو انتخاب کن</h3><p>از بین مسابقات باز، اونی که بازی و بازه‌ی زمانیش مناسبته رو انتخاب کن.</p></div>
          <div className="step"><div className="step-num">۳</div><h3>ثبت‌نام رو تکمیل کن</h3><p>اطلاعات تیم و شناسه بازیکن‌ها رو وارد و پرداخت ورودی رو انجام بده.</p></div>
          <div className="step"><div className="step-num">۴</div><h3>منتظر قرعه‌کشی باش</h3><p>۴۸ ساعت قبل از شروع، جدول و حریفت رو توی همین صفحه می‌بینی.</p></div>
        </div>
      </section>

      <section className="tour-section reveal" style={{ '--d': 5 } as React.CSSProperties}>
        <div className="section-head"><div className="head-left"><div className="accent-bar"></div><h2>درباره تورنومنت‌ها</h2></div></div>
        <div className="carousel">
          <div className="carousel-img"></div>
          <div className="carousel-text">
            <h3>فرمت مسابقات چطوریه؟</h3>
            <p>هر تورنومنت شامل مرحله گروهی و سپس حذفی هست. تیم‌ها بعد از ثبت‌نام به‌صورت خودکار قرعه‌کشی میشن و زمان مسابقه ۴۸ ساعت قبل اعلام میشه.</p>
            <div className="carousel-dots"><span className="dot active"></span><span className="dot"></span><span className="dot"></span></div>
          </div>
        </div>
      </section>

      <section className="tour-section reveal" style={{ '--d': 6 } as React.CSSProperties}>
        <div className="section-head"><div className="head-left"><div className="accent-bar"></div><h2>جدول رتبه‌بندی</h2></div></div>
        <div className="tabs">
          <div className={`tab ${activeTab === 'بهترین تیم‌ها' ? 'active' : ''}`} onClick={() => setActiveTab('بهترین تیم‌ها')}>بهترین تیم‌ها</div>
          <div className={`tab ${activeTab === 'بهترین بازیکنان' ? 'active' : ''}`} onClick={() => setActiveTab('بهترین بازیکنان')}>بهترین بازیکنان</div>
        </div>
        <div className="lb">
          <div className="lb-row r1"><div className="lb-rank">۱</div><div className="lb-avatar"></div><div className="lb-name">Shadow Wolves</div><div className="lb-points">9,240</div><div className="lb-wins">۴۲ برد</div></div>
          <div className="lb-row r2"><div className="lb-rank">۲</div><div className="lb-avatar"></div><div className="lb-name">Crimson Fangs</div><div className="lb-points">8,910</div><div className="lb-wins">۳۹ برد</div></div>
          <div className="lb-row r3"><div className="lb-rank">۳</div><div className="lb-avatar"></div><div className="lb-name">Night Phantoms</div><div className="lb-points">8,470</div><div className="lb-wins">۳۵ برد</div></div>
          <div className="lb-row"><div className="lb-rank">۴</div><div className="lb-avatar"></div><div className="lb-name">Iron Falcons</div><div className="lb-points">7,930</div><div className="lb-wins">۳۱ برد</div></div>
        </div>
      </section>

      <footer className="tour-footer">© تایتان — پلتفرم گیمینگ و اسپورت</footer>
    </div>
  );
}
