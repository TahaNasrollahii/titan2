'use client';

import React, { useState, useEffect } from 'react';
import './tournament.css';
import { Icon } from '@/components/Icons';

export default function TournamentPage() {
  const [activeTab, setActiveTab] = useState('teams');

  // Mouse tracking for parallax and spot hover effects on cards
  useEffect(() => {
    const handlePointerMove = (e: Event) => {
      const pe = e as PointerEvent;
      const el = pe.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = pe.clientX - rect.left;
      const y = pe.clientY - rect.top;

      const px = (x / rect.width) * 2 - 1;
      const py = (y / rect.height) * 2 - 1;

      el.style.setProperty('--px', px.toString());
      el.style.setProperty('--py', py.toString());
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
    };

    const handlePointerLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
    };

    const elements = document.querySelectorAll('.spot-track');
    elements.forEach(el => {
      el.addEventListener('pointermove', handlePointerMove, { passive: true });
      el.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerleave', handlePointerLeave);
      });
    };
  }, []);

  return (
    <div className="tour-wrapper liquid-theme">
      {/* Liquid Background Blobs */}
      <div className="liquid-bg" aria-hidden="true">
        <div className="l-blob blob-1"></div>
        <div className="l-blob blob-2"></div>
        <div className="l-blob blob-3"></div>
      </div>
      {/* 1. Hero Promo */}
      <article className="tour-hero spot spot-track reveal" style={{ '--d': 2 } as any}>
        <div className="th-bg"></div>
        <div className="th-content">
          <div className="th-badges">
            <span className="th-badge red"><Icon name="flame" /> <span className="pulse-text">تورنومنت‌های تایتان</span></span>
            <span className="th-badge dark">فصل ۳ مسابقات</span>
          </div>
          <h1>میدان نبردِ <em>قهرمانان</em></h1>
          <p>در رقابت‌های نفس‌گیر تایتان شرکت کنید و سهمی از جوایز نقدی این فصل ببرید.</p>
          <div className="th-foot">
            <button className="th-btn-primary">
              ثبت‌نام در مسابقات
              <Icon name="arrow" style={{ transform: 'rotate(180deg)' }} />
            </button>
            <div className="th-players">
              <div className="avatars"><span></span><span></span><span></span></div>
              <small>+۲۴۰ بازیکن فعال</small>
            </div>
          </div>
        </div>
        <div className="th-art-wrap">
          <img src="/images/banner-hero.png" alt="" className="th-art" />
        </div>
      </article>

      {/* 2. Global Stats */}
      <div className="tour-stats-row reveal" style={{ '--d': 3 } as any}>
        <div className="tour-stat-card spot spot-track">
          <div className="ts-icon" style={{ background: 'rgba(226, 69, 63, 0.15)', color: 'var(--red)' }}><Icon name="trophy" /></div>
          <div className="ts-info">
            <span className="ts-val">۴۸۵</span>
            <span className="ts-lbl">مجموع مسابقات</span>
          </div>
        </div>
        <div className="tour-stat-card spot spot-track">
          <div className="ts-icon" style={{ background: 'rgba(61, 220, 132, 0.15)', color: 'var(--green)' }}><Icon name="game" /></div>
          <div className="ts-info">
            <span className="ts-val">۳ زنده</span>
            <span className="ts-lbl">مسابقات در جریان</span>
          </div>
        </div>
        <div className="tour-stat-card spot spot-track">
          <div className="ts-icon" style={{ background: 'rgba(255, 240, 179, 0.15)', color: 'var(--cream)' }}><Icon name="users" /></div>
          <div className="ts-info">
            <span className="ts-val">۱۲۴۰</span>
            <span className="ts-lbl">تیم ثبت‌نام کرده</span>
          </div>
        </div>
      </div>

      {/* 3. Upcoming Matches */}
      <div className="tour-sec-h reveal" style={{ '--d': 4 } as any}>
        <h3>مسابقات پیش‌رو</h3>
      </div>
      <div className="tour-matches">
        {[
          { id: 1, team1: 'Shadow Wolves', tag1: 'مدافع عنوان', team2: 'Crimson Fangs', tag2: 'صعود گروهی', time: 'امروز · ۲۱:۰۰', status: 'ثبت‌نام باز' },
          { id: 2, team1: 'Night Phantoms', tag1: 'رتبه ۳', team2: 'Iron Falcons', tag2: 'تازه‌وارد', time: 'پنجشنبه · ۱۹:۳۰', status: '۲ روز دیگر' }
        ].map((m, i) => (
          <article key={m.id} className="match-card spot spot-track reveal" style={{ '--d': 5 + i } as any}>
            <div className="mc-bg"></div>
            <div className="mc-status">
              <span className="mc-status-dot"></span> {m.status}
            </div>
            <div className="mc-body">
              <div className="mc-team">
                <div className="mc-crest">{m.team1.substring(0, 2).toUpperCase()}</div>
                <div className="mc-team-info">
                  <h4>{m.team1}</h4>
                  <p>{m.tag1}</p>
                </div>
              </div>
              <div className="mc-center">
                <span className="mc-vs">VS</span>
                <span className="mc-time">{m.time}</span>
              </div>
              <div className="mc-team mc-team-right">
                <div className="mc-team-info">
                  <h4>{m.team2}</h4>
                  <p>{m.tag2}</p>
                </div>
                <div className="mc-crest crest-alt">{m.team2.substring(0, 2).toUpperCase()}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 4. Steps & About */}
      <div className="tour-cols cols">
        <section className="col col-a reveal" style={{ '--d': 7 } as any}>
          <div className="tour-sec-h">
            <h3>چطور ثبت‌نام کنم؟</h3>
          </div>
          <div className="tour-steps">
            {[
              { num: '۱', t: 'تیم بساز یا بپیوند', d: 'یه تیم جدید بساز یا با کد دعوت به تیم دوستات ملحق شو.' },
              { num: '۲', t: 'مسابقه رو انتخاب کن', d: 'از بین مسابقات باز، اونی که بازی و بازه‌ی زمانیش مناسبته رو انتخاب کن.' },
              { num: '۳', t: 'ثبت‌نام رو تکمیل کن', d: 'اطلاعات تیم و شناسه بازیکن‌ها رو وارد و پرداخت رو انجام بده.' },
              { num: '۴', t: 'منتظر قرعه‌کشی باش', d: '۴۸ ساعت قبل از شروع، جدول و حریفت رو توی همین صفحه می‌بینی.' }
            ].map((st, i) => (
              <div key={st.num} className="tour-step spot spot-track">
                <div className="ts-num">{st.num}</div>
                <div className="ts-text">
                  <h4>{st.t}</h4>
                  <p>{st.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="col col-b reveal" style={{ '--d': 8 } as any}>
          <div className="tour-sec-h">
            <h3>جدول رتبه‌بندی</h3>
          </div>
          <div className="tour-lb-card spot spot-track">
            <div className="lb-tabs">
              <button className={`lb-tab ${activeTab === 'teams' ? 'active' : ''}`} onClick={() => setActiveTab('teams')}>برترین تیم‌ها</button>
              <button className={`lb-tab ${activeTab === 'players' ? 'active' : ''}`} onClick={() => setActiveTab('players')}>برترین بازیکنان</button>
            </div>
            <div className="lb-list">
              {[
                { r: 1, n: 'Shadow Wolves', pts: '9,240', w: 42 },
                { r: 2, n: 'Crimson Fangs', pts: '8,910', w: 39 },
                { r: 3, n: 'Night Phantoms', pts: '8,470', w: 35 },
                { r: 4, n: 'Iron Falcons', pts: '7,930', w: 31 }
              ].map(lb => (
                <div key={lb.r} className={`lb-row ${lb.r <= 3 ? 'top-' + lb.r : ''}`}>
                  <div className="lb-rank">{lb.r}</div>
                  <div className="lb-avatar"></div>
                  <div className="lb-name">{lb.n}</div>
                  <div className="lb-stats">
                    <span className="lb-w">{lb.w} برد</span>
                    <span className="lb-pts">{lb.pts} امتیاز</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
