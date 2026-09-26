'use client';

import React, { useEffect, useRef } from 'react';
import { Icon } from './Icons';

export function ScoreWidget() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

    const HRS = [
      { k: 'games', name: 'تعداد بازی‌ها', v: 345, c: '#7458d6', fg: '#fff', bpm: 110 },
      { k: 'wins', name: 'تعداد بردها', v: 240, c: '#fff1b8', fg: '#2b1013', bpm: 128 },
      { k: 'losses', name: 'تعداد باخت‌ها', v: 105, c: '#d9443f', fg: '#fff', bpm: 92 }
    ];
    let total = HRS.reduce((a, h) => a + h.v, 0);

    const coreLabel = document.getElementById('swCoreLabel');
    const coreVal = document.getElementById('swCoreVal');
    
    let coreShown = total; 
    let coreRaf = 0;
    let hovering = -1;

    function setCore(label: string, val: number, dur = 700) {
      if (!coreLabel || !coreVal) return;
      coreLabel.textContent = label;
      cancelAnimationFrame(coreRaf);
      if (reduce) { 
        coreShown = val; 
        coreVal.textContent = fmt(val); 
        return; 
      }
      const from = coreShown, t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        coreShown = from + (val - from) * e;
        if (coreVal) coreVal.textContent = fmt(coreShown);
        if (p < 1) coreRaf = requestAnimationFrame(step);
      };
      coreRaf = requestAnimationFrame(step);
    }

    const BASE_BPM = 104;
    let bpmTarget = BASE_BPM;
    const blobEl = document.getElementById('swBlob');
    const cv = document.getElementById('swBlobCanvas') as HTMLCanvasElement;
    if (!blobEl || !cv) return;
    const cctx = cv.getContext('2d');
    if (!cctx) return;

    let cvSize = 0, dpr = 1;
    const LAYERS = [
      { n: 5, rot: .3, spd: .10, off: 0, rs: 1.00, a: .96, g: [0, -1, 0, .95], st: [[0, '#f5524a'], [.5, '#c2343b'], [1, 'rgba(90,24,40,0)']], rim: 'rgba(255,150,140,.30)' },
      { n: 6, rot: 1.4, spd: -.06, off: 3, rs: .96, a: .45, g: [.7, -.5, -.5, .9], st: [[0, '#ff9a90'], [1, 'rgba(255,120,120,0)']], rim: 'rgba(255,190,180,.18)' },
      { n: 5, rot: 1.1, spd: -.07, off: 2, rs: .95, a: .94, g: [-1, -.2, .75, .3], st: [[0, '#fff6d2'], [.45, '#ebcf9c'], [1, 'rgba(190,130,110,0)']], rim: 'rgba(255,255,255,.42)' },
      { n: 6, rot: .4, spd: .055, off: 4, rs: .92, a: .93, g: [-.7, 1, .45, -.25], st: [[0, '#bdb1ff'], [.5, '#6f5ad9'], [1, 'rgba(80,60,190,0)']], rim: 'rgba(215,205,255,.40)' }
    ];
    const bands = [.2, .2, .2, .2, .2, .2];
    let beat = 0, bpm = BASE_BPM, kickSm = 0;

    function sizeCanvas() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cvSize = blobEl?.offsetWidth || 0;
      cv.width = cv.height = Math.round(cvSize * dpr);
    }
    function simulateBands(t: number, dt: number) {
      bpm += (bpmTarget - bpm) * (1 - Math.exp(-dt * 2.5));
      beat += dt * bpm / 60;
      const b = beat % 4;
      const hit = (times: number[], decay: number) => { let m = 4; for (const x of times) m = Math.min(m, (b - x + 4) % 4); return Math.exp(-m * decay); };
      const kick = hit([0, 2, 2.75], 5.5);
      const snare = hit([1, 3], 5);
      const hat = Math.exp(-((b * 2) % 1) * 7) * (Math.floor(b * 2) % 2 ? 1 : .55);
      const wob = (k: number) => .5 + .5 * Math.sin(t * (1.1 + k * .37) + k * 1.9);
      const target = [
        kick * .95 + .10 * wob(0),
        kick * .60 + snare * .30 + .15 * wob(1),
        snare * .85 + .15 * wob(2),
        snare * .40 + hat * .50 + .20 * wob(3),
        hat * .80 + .20 * wob(4),
        hat * .50 + kick * .15 + .30 * wob(5)
      ];
      for (let k = 0; k < 6; k++) {
        const rate = 1 - Math.exp(-dt * (target[k] > bands[k] ? 28 : 7));
        bands[k] += (target[k] - bands[k]) * rate;
      }
      kickSm += (kick - kickSm) * (1 - Math.exp(-dt * (kick > kickSm ? 30 : 8)));
    }
    function drawBlob(dt: number) {
      if (!cctx) return;
      const s = cvSize, R = s * .5, ctx = cctx;
      const scale = 1 + .055 * kickSm;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, s, s);
      ctx.translate(R, R);
      for (const L of LAYERS) {
        L.rot += dt * L.spd * (1 + 3 * kickSm);
        const R0 = s * .41 * L.rs * scale, sigma = .36 * (Math.PI * 2 / L.n), N = 150;
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const th = i / N * Math.PI * 2;
          let r = .84;
          for (let j = 0; j < L.n; j++) {
            let d = th - (L.rot + j * 2 * Math.PI / L.n);
            d = Math.atan2(Math.sin(d), Math.cos(d));
            r += (.20 + .17 * bands[(j + L.off) % 6]) * Math.exp(-(d * d) / (sigma * sigma));
          }
          const x = Math.cos(th) * r * R0, y = Math.sin(th) * r * R0;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.closePath();
        const g = ctx.createLinearGradient(L.g[0] * R, L.g[1] * R, L.g[2] * R, L.g[3] * R);
        L.st.forEach(([o, c]) => g.addColorStop(o as number, c as string));
        ctx.globalAlpha = L.a; ctx.fillStyle = g; ctx.fill();
        ctx.globalAlpha = 1; ctx.lineWidth = 1.2; ctx.strokeStyle = L.rim; ctx.stroke();
      }
      if (blobEl) blobEl.style.setProperty('--kick', kickSm.toFixed(3));
    }
    
    let blobVisible = true, blobLast = performance.now();
    let animId: number;
    function blobLoop(now: number) {
      const dt = Math.min((now - blobLast) / 1000, .1); blobLast = now;
      if (blobVisible && !document.hidden) { simulateBands(now / 1000, dt); drawBlob(dt); }
      animId = requestAnimationFrame(blobLoop);
    }
    
    const ro = new ResizeObserver(() => { sizeCanvas(); if (reduce) { simulateBands(1.3, .016); drawBlob(0); } });
    ro.observe(blobEl);
    const io = new IntersectionObserver(([en]) => blobVisible = en.isIntersecting);
    io.observe(blobEl);
    sizeCanvas();
    if (reduce) { simulateBands(1.3, .016); drawBlob(0); } else animId = requestAnimationFrame(blobLoop);

    const ghButtons = document.querySelectorAll('.sw-gh');
    ghButtons.forEach((b: any) => {
      const i = +b.dataset.i;
      const on = () => { hovering = i; bpmTarget = HRS[i].bpm; setCore(HRS[i].name, HRS[i].v, 550); };
      const off = () => { hovering = -1; bpmTarget = BASE_BPM; setCore('مجموع امتیاز', total, 550); };
      b.addEventListener('pointerenter', on); b.addEventListener('pointerleave', off);
      b.addEventListener('focus', on); b.addEventListener('blur', off);
    });

    const interv = setInterval(() => {
      const i = Math.floor(Math.random() * HRS.length);
      HRS[i].v++; total++;
      const gvEl = document.getElementById('sw-gv' + i);
      if (gvEl) gvEl.textContent = fmt(HRS[i].v);
      const b = document.querySelector(`.sw-gh[data-i="${i}"]`) as HTMLElement;
      if (b) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
      if (hovering === -1) setCore('مجموع امتیاز', total, 500);
      else if (hovering === i) setCore(HRS[i].name, HRS[i].v, 500);
    }, 9000);

    return () => {
      cancelAnimationFrame(coreRaf);
      cancelAnimationFrame(animId);
      clearInterval(interv);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="stat-wrap col reveal" style={{ '--d': 4, flex: 1, display: 'flex', width: '100%' } as any}>
      <article className="stat spot reveal" style={{ '--d': 5, flex: 1, padding: '12px 16px', gap: '8px', justifyContent: 'center' } as any}>
        <div className="blob" id="swBlob" style={{ width: 'min(195px, 80%)', margin: '0 auto' }}>
          <canvas id="swBlobCanvas" aria-hidden="true"></canvas>
          <div className="core" style={{ transform: 'scale(1)' }}>
            <small id="swCoreLabel">مجموع امتیاز</small>
            <strong id="swCoreVal">4,752</strong>
          </div>
        </div>
        <div className="gh-row" id="swGhRow" style={{ transform: 'scale(0.75)', transformOrigin: 'top center', marginTop: '4px' }}>
          <button className="gh sw-gh" data-i="0" style={{ '--c': '#7458d6' } as any} aria-label="تعداد بازی‌ها">
            <span className="ic" style={{ background: '#7458d6', color: '#fff' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 7h9A4.5 4.5 0 0 1 21 11.5v1a4.5 4.5 0 0 1-4.5 4.5h-1.2l-1.8-2h-3l-1.8 2H7.5A4.5 4.5 0 0 1 3 12.5v-1A4.5 4.5 0 0 1 7.5 7z"/><path d="M8 10v3M6.5 11.5h3"/><circle cx="15.6" cy="10.8" r=".6"/><circle cx="17.6" cy="12.6" r=".6"/></svg>
            </span>
            <span className="gv" id="sw-gv0">345</span>
          </button>
          <button className="gh sw-gh" data-i="1" style={{ '--c': '#fff1b8' } as any} aria-label="تعداد بردها">
            <span className="ic" style={{ background: '#fff1b8', color: '#2b1013' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </span>
            <span className="gv" id="sw-gv1">240</span>
          </button>
          <button className="gh sw-gh" data-i="2" style={{ '--c': '#d9443f' } as any} aria-label="تعداد باخت‌ها">
            <span className="ic" style={{ background: '#d9443f', color: '#fff' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg>
            </span>
            <span className="gv" id="sw-gv2">105</span>
          </button>
        </div>
      </article>
    </div>
  );
}
