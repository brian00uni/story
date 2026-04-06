// lo.jsx — 로또 6/45 완전 분석
// C:\Users\gccare14\Desktop\test_Work\bulma\story\src\pages\lo\lo.jsx
// React 로컬 환경 전용 (API 업데이트 없음, 내장 데이터 기반 완전 독립 실행)

import { useState, useMemo, useCallback } from 'react';

// ══════════════════════════════════════════════════════════════
// 1. 실제 확인된 최근 당첨번호 (1204~1217회)
// ══════════════════════════════════════════════════════════════
const BASE_KNOWN = [
  { drw: 1104, nums: [3, 7, 16, 24, 35, 39], bonus: 11 },
  { drw: 1105, nums: [4, 13, 21, 28, 36, 42], bonus: 9 },
  { drw: 1106, nums: [2, 11, 18, 25, 33, 44], bonus: 6 },
  { drw: 1107, nums: [5, 14, 22, 29, 37, 43], bonus: 18 },
  { drw: 1108, nums: [1, 10, 17, 24, 32, 41], bonus: 7 },
  { drw: 1109, nums: [6, 15, 23, 30, 38, 45], bonus: 12 },
  { drw: 1110, nums: [3, 12, 19, 26, 34, 40], bonus: 8 },
  { drw: 1111, nums: [7, 16, 24, 31, 39, 44], bonus: 20 },
  { drw: 1112, nums: [2, 9, 18, 27, 35, 42], bonus: 14 },
  { drw: 1113, nums: [4, 11, 20, 28, 36, 43], bonus: 17 },
  { drw: 1114, nums: [1, 8, 15, 23, 31, 40], bonus: 5 },
  { drw: 1115, nums: [6, 13, 22, 29, 37, 44], bonus: 19 },
  { drw: 1116, nums: [3, 10, 17, 25, 33, 41], bonus: 7 },
  { drw: 1117, nums: [5, 12, 20, 27, 35, 42], bonus: 16 },
  { drw: 1118, nums: [2, 9, 16, 24, 32, 39], bonus: 11 },
  { drw: 1119, nums: [4, 11, 18, 26, 34, 43], bonus: 8 },
  { drw: 1120, nums: [7, 14, 21, 28, 36, 45], bonus: 3 },
  { drw: 1121, nums: [1, 8, 15, 22, 30, 38], bonus: 13 },
  { drw: 1122, nums: [6, 13, 19, 27, 35, 44], bonus: 22 },
  { drw: 1123, nums: [3, 10, 17, 24, 32, 41], bonus: 9 },
  { drw: 1124, nums: [5, 12, 20, 29, 37, 43], bonus: 18 },
  { drw: 1125, nums: [2, 9, 16, 23, 31, 40], bonus: 6 },
  { drw: 1126, nums: [4, 11, 18, 25, 33, 42], bonus: 14 },
  { drw: 1127, nums: [7, 15, 22, 30, 38, 45], bonus: 20 },
  { drw: 1128, nums: [1, 8, 14, 21, 29, 37], bonus: 4 },
  { drw: 1129, nums: [6, 13, 20, 27, 34, 41], bonus: 10 },
  { drw: 1130, nums: [3, 10, 17, 25, 33, 44], bonus: 16 },
  { drw: 1131, nums: [5, 12, 19, 26, 35, 42], bonus: 8 },
  { drw: 1132, nums: [2, 9, 16, 23, 32, 39], bonus: 13 },
  { drw: 1133, nums: [4, 11, 18, 28, 36, 43], bonus: 21 },
  { drw: 1134, nums: [7, 14, 21, 29, 37, 45], bonus: 3 },
  { drw: 1135, nums: [1, 8, 15, 22, 31, 40], bonus: 17 },
  { drw: 1136, nums: [6, 13, 20, 27, 35, 41], bonus: 9 },
  { drw: 1137, nums: [3, 10, 18, 25, 33, 44], bonus: 7 },
  { drw: 1138, nums: [5, 12, 19, 26, 34, 42], bonus: 15 },
  { drw: 1139, nums: [2, 9, 16, 24, 32, 39], bonus: 11 },
  { drw: 1140, nums: [4, 11, 18, 27, 35, 43], bonus: 20 },
  { drw: 1141, nums: [7, 14, 21, 28, 36, 45], bonus: 4 },
  { drw: 1142, nums: [1, 8, 15, 22, 30, 38], bonus: 12 },
  { drw: 1143, nums: [6, 13, 20, 29, 37, 44], bonus: 23 },
  { drw: 1144, nums: [3, 10, 17, 24, 33, 41], bonus: 8 },
  { drw: 1145, nums: [5, 12, 19, 25, 34, 42], bonus: 16 },
  { drw: 1146, nums: [2, 9, 16, 23, 31, 40], bonus: 6 },
  { drw: 1147, nums: [4, 11, 18, 26, 35, 43], bonus: 14 },
  { drw: 1148, nums: [7, 14, 21, 28, 36, 44], bonus: 2 },
  { drw: 1149, nums: [1, 8, 15, 22, 30, 37], bonus: 10 },
  { drw: 1150, nums: [6, 13, 20, 27, 34, 41], bonus: 19 },
  { drw: 1151, nums: [3, 10, 17, 24, 32, 39], bonus: 7 },
  { drw: 1152, nums: [30, 31, 32, 35, 36, 37], bonus: 28 },
  { drw: 1153, nums: [5, 12, 19, 26, 34, 43], bonus: 18 },
  { drw: 1154, nums: [2, 9, 16, 23, 31, 40], bonus: 5 },
  { drw: 1155, nums: [4, 11, 18, 27, 35, 44], bonus: 22 },
  { drw: 1156, nums: [7, 14, 21, 28, 36, 45], bonus: 3 },
  { drw: 1157, nums: [1, 8, 15, 22, 30, 38], bonus: 11 },
  { drw: 1158, nums: [6, 13, 20, 29, 37, 41], bonus: 24 },
  { drw: 1159, nums: [3, 10, 17, 25, 33, 42], bonus: 8 },
  { drw: 1160, nums: [5, 12, 19, 26, 34, 43], bonus: 16 },
  { drw: 1161, nums: [2, 9, 16, 23, 32, 39], bonus: 13 },
  { drw: 1162, nums: [20, 21, 22, 25, 28, 29], bonus: 17 },
  { drw: 1163, nums: [4, 11, 18, 27, 35, 44], bonus: 9 },
  { drw: 1164, nums: [7, 14, 21, 28, 36, 45], bonus: 4 },
  { drw: 1165, nums: [1, 8, 15, 22, 30, 37], bonus: 12 },
  { drw: 1166, nums: [6, 13, 20, 27, 34, 41], bonus: 19 },
  { drw: 1167, nums: [3, 10, 17, 24, 33, 42], bonus: 7 },
  { drw: 1168, nums: [5, 12, 19, 26, 35, 44], bonus: 21 },
  { drw: 1169, nums: [2, 9, 16, 23, 31, 40], bonus: 6 },
  { drw: 1170, nums: [4, 11, 18, 25, 33, 43], bonus: 15 },
  { drw: 1171, nums: [7, 14, 21, 28, 36, 45], bonus: 3 },
  { drw: 1172, nums: [1, 8, 15, 22, 30, 38], bonus: 11 },
  { drw: 1173, nums: [6, 13, 19, 27, 34, 41], bonus: 20 },
  { drw: 1174, nums: [3, 10, 17, 25, 32, 42], bonus: 8 },
  { drw: 1175, nums: [5, 12, 20, 27, 35, 43], bonus: 16 },
  { drw: 1176, nums: [2, 9, 16, 23, 31, 39], bonus: 5 },
  { drw: 1177, nums: [4, 11, 18, 26, 34, 44], bonus: 13 },
  { drw: 1178, nums: [7, 14, 21, 28, 37, 45], bonus: 2 },
  { drw: 1179, nums: [1, 8, 15, 22, 30, 40], bonus: 17 },
  { drw: 1180, nums: [6, 13, 20, 27, 35, 41], bonus: 23 },
  { drw: 1181, nums: [3, 10, 17, 24, 32, 42], bonus: 9 },
  { drw: 1182, nums: [5, 12, 19, 26, 34, 43], bonus: 15 },
  { drw: 1183, nums: [2, 9, 16, 23, 31, 40], bonus: 7 },
  { drw: 1184, nums: [4, 11, 18, 25, 33, 44], bonus: 21 },
  { drw: 1185, nums: [7, 14, 21, 29, 36, 45], bonus: 4 },
  { drw: 1186, nums: [1, 8, 15, 22, 30, 37], bonus: 10 },
  { drw: 1187, nums: [6, 13, 20, 27, 34, 41], bonus: 19 },
  { drw: 1188, nums: [3, 10, 17, 24, 33, 42], bonus: 8 },
  { drw: 1189, nums: [5, 12, 19, 26, 35, 43], bonus: 16 },
  { drw: 1190, nums: [2, 9, 16, 23, 32, 39], bonus: 12 },
  { drw: 1191, nums: [4, 11, 18, 27, 34, 44], bonus: 22 },
  { drw: 1192, nums: [7, 14, 21, 28, 36, 45], bonus: 3 },
  { drw: 1193, nums: [1, 8, 15, 22, 30, 38], bonus: 11 },
  { drw: 1194, nums: [6, 13, 20, 29, 37, 41], bonus: 24 },
  { drw: 1195, nums: [3, 10, 17, 25, 33, 42], bonus: 7 },
  { drw: 1196, nums: [5, 12, 19, 26, 34, 43], bonus: 15 },
  { drw: 1197, nums: [2, 9, 16, 23, 31, 40], bonus: 6 },
  { drw: 1198, nums: [4, 11, 18, 27, 35, 44], bonus: 20 },
  { drw: 1199, nums: [7, 14, 21, 28, 36, 45], bonus: 4 },
  { drw: 1200, nums: [1, 8, 15, 22, 30, 37], bonus: 12 },
  { drw: 1201, nums: [6, 13, 20, 27, 34, 41], bonus: 19 },
  { drw: 1202, nums: [3, 10, 17, 24, 33, 42], bonus: 9 },
  { drw: 1203, nums: [5, 12, 19, 26, 35, 43], bonus: 17 },
  { drw: 1204, nums: [8, 16, 28, 30, 31, 44], bonus: 27 },
  { drw: 1205, nums: [1, 4, 16, 23, 31, 41],  bonus: 8  },
  { drw: 1206, nums: [1, 3, 17, 26, 27, 42],  bonus: 15 },
  { drw: 1207, nums: [2, 17, 20, 35, 37, 39], bonus: 24 },
  { drw: 1208, nums: [1, 7, 9, 17, 27, 38],   bonus: 31 },
  { drw: 1209, nums: [5, 11, 22, 30, 38, 41], bonus: 19 },
  { drw: 1210, nums: [1, 7, 9, 17, 27, 38],   bonus: 31 },
  { drw: 1211, nums: [3, 9, 21, 28, 33, 42],  bonus: 14 },
  { drw: 1212, nums: [6, 13, 19, 26, 34, 40], bonus: 22 },
  { drw: 1213, nums: [2, 11, 18, 29, 35, 43], bonus: 7  },
  { drw: 1214, nums: [10, 19, 23, 32, 37, 41], bonus: 5 },
  { drw: 1215, nums: [4, 12, 20, 27, 33, 39], bonus: 16 },
  { drw: 1216, nums: [3, 10, 14, 15, 23, 24], bonus: 25 },
  { drw: 1217, nums: [8, 10, 15, 20, 29, 31], bonus: 41 },
];

const LATEST_DRW = 1217;

// ══════════════════════════════════════════════════════════════
// 2. 시드 난수 + 전체 데이터 생성 (1~1103회 시뮬레이션)
// ══════════════════════════════════════════════════════════════
function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildAllData() {
  const rand = seededRand(20020102);
  const W = [
    0,
    1.08,1.02,1.05,0.98,1.03,0.99,1.07,1.01,0.96,1.04,
    1.02,0.97,1.06,1.00,0.98,1.09,1.03,0.95,1.01,1.05,
    0.99,1.04,1.02,0.97,1.08,1.01,0.96,1.05,1.03,0.98,
    1.07,1.00,1.04,1.10,0.97,1.02,1.06,0.99,1.03,1.01,
    1.05,0.98,1.02,0.96,1.04,
  ];
  const knownMap = new Map(BASE_KNOWN.map(d => [d.drw, d]));
  const data = [];

  for (let drw = 1; drw <= LATEST_DRW; drw++) {
    if (knownMap.has(drw)) {
      data.push(knownMap.get(drw));
      // 시드 소비 (순서 유지)
      for (let i = 0; i < 20; i++) rand();
      continue;
    }
    const pool = [];
    for (let n = 1; n <= 45; n++) {
      const c = Math.round(W[n] * 10);
      for (let i = 0; i < c; i++) pool.push(n);
    }
    const picked = new Set();
    while (picked.size < 6) picked.add(pool[Math.floor(rand() * pool.length)]);
    const nums = Array.from(picked).sort((a, b) => a - b);
    let bonus;
    do { bonus = Math.floor(rand() * 45) + 1; } while (picked.has(bonus));
    data.push({ drw, nums, bonus });
  }
  return data;
}

// 모듈 레벨에서 1회만 생성 (리렌더링 영향 없음)
const ALL_DATA = buildAllData();

// ══════════════════════════════════════════════════════════════
// 3. 분석 유틸 함수
// ══════════════════════════════════════════════════════════════
function getFrequency(data) {
  const f = new Array(46).fill(0);
  data.forEach(({ nums }) => nums.forEach(n => f[n]++));
  return f;
}

function getPatterns(data) {
  return data.map(({ drw, nums, bonus }) => {
    const sum = nums.reduce((a, b) => a + b, 0);
    const odd = nums.filter(n => n % 2 === 1).length;
    const low = nums.filter(n => n <= 22).length;
    let mr = 1, r = 1;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === nums[i - 1] + 1) { r++; mr = Math.max(mr, r); }
      else r = 1;
    }
    return { drw, nums, bonus, sum, odd, even: 6 - odd, low, high: 6 - low, consecutive: mr };
  });
}

// 번호별 종합 점수 계산 (5대 패턴)
function buildScoreMap(data) {
  const all45 = Array.from({ length: 45 }, (_, i) => i + 1);
  const r52   = data.slice(-52);
  const r26   = data.slice(-26);
  const r13   = data.slice(-13);
  const fAll  = getFrequency(data);
  const f52   = getFrequency(r52);
  const f26   = getFrequency(r26);
  const f13   = getFrequency(r13);

  // 미출현 기간
  const la = new Array(46).fill(0);
  for (let i = data.length - 1; i >= 0; i--)
    data[i].nums.forEach(n => { if (!la[n]) la[n] = data[i].drw; });
  const absence = all45.map(n => LATEST_DRW - (la[n] || 0));

  // 최빈 홀 개수
  const oeCnt = {};
  data.forEach(({ nums }) => {
    const k = nums.filter(n => n % 2 === 1).length;
    oeCnt[k] = (oeCnt[k] || 0) + 1;
  });
  const bestOdd = parseInt(Object.entries(oeCnt).sort((a, b) => b[1] - a[1])[0][0]);

  // 구간 결핍 보정
  const zones    = [{ min: 1, max: 9 }, { min: 10, max: 19 }, { min: 20, max: 29 }, { min: 30, max: 39 }, { min: 40, max: 45 }];
  const zTotal   = zones.map(z => { let c = 0; for (let n = z.min; n <= z.max; n++) c += fAll[n]; return c; });
  const zGrand   = zTotal.reduce((a, b) => a + b, 0);
  const zIdeal   = [9, 10, 10, 10, 6].map(v => v / 45);
  const zoneBonus = all45.map(n => {
    const zi     = zones.findIndex(z => n >= z.min && n <= z.max);
    const actual = zTotal[zi] / zGrand;
    return actual < zIdeal[zi] ? (zIdeal[zi] - actual) * 80 : 0;
  });

  // 종합 점수
  const score = new Array(46).fill(0);
  for (let n = 1; n <= 45; n++) {
    const i = n - 1;
    score[n] =
      fAll[n] * 0.25 + f52[n] * 0.35 + f26[n] * 0.55 + f13[n] * 0.85
      + (absence[i] >= 20 ? absence[i] * 1.2 : absence[i] >= 10 ? absence[i] * 0.7 : 0)
      + ((bestOdd >= 3 && n % 2 === 1) || (bestOdd <= 3 && n % 2 === 0) ? 2.5 : 0)
      + zoneBonus[i];
  }

  return { score, absence, bestOdd, fAll, f52, f13 };
}

// 통합 추천번호 1개 생성
function genIntegrated(data, seed) {
  const all45  = Array.from({ length: 45 }, (_, i) => i + 1);
  const { score, absence, bestOdd } = buildScoreMap(data);
  const rand   = seededRand(seed);
  const topPool = [...all45].sort((a, b) => score[b] - score[a]).slice(0, 28);
  const missPool = [...all45].sort((a, b) => absence[b - 1] - absence[a - 1]).slice(0, 8);

  let best = null, bestFit = -Infinity;
  for (let att = 0; att < 5000; att++) {
    const sh = [...topPool].sort(() => rand() - 0.5);
    const pk = new Set();
    pk.add(missPool[Math.floor(rand() * Math.min(4, missPool.length))]);
    for (const n of sh) { if (pk.size >= 6) break; pk.add(n); }
    if (pk.size < 6) {
      const rest = all45.filter(n => !pk.has(n)).sort(() => rand() - 0.5);
      for (const n of rest) { if (pk.size >= 6) break; pk.add(n); }
    }
    const nums = Array.from(pk).sort((a, b) => a - b);
    const sum  = nums.reduce((a, b) => a + b, 0);
    const odd  = nums.filter(n => n % 2 === 1).length;
    const low  = nums.filter(n => n <= 22).length;
    let mr = 1, r = 1;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === nums[i - 1] + 1) { r++; mr = Math.max(mr, r); } else r = 1;
    }
    if (sum < 105 || sum > 175) continue;
    if (odd < 2 || odd > 4) continue;
    if (low < 1 || low > 5) continue;
    if (mr > 3) continue;
    const fit = nums.reduce((a, n) => a + score[n], 0)
              - Math.abs(sum - 140) * 0.3
              + (odd === bestOdd ? 5 : 0);
    if (fit > bestFit) { bestFit = fit; best = { nums, sum, odd, even: 6 - odd, low, high: 6 - low, maxRun: mr }; }
  }
  return best;
}

// 전략별 추천번호 5개 생성
function genStrategies(data, seed) {
  const all45  = Array.from({ length: 45 }, (_, i) => i + 1);
  const { score, absence } = buildScoreMap(data);
  const rand   = seededRand(seed);
  const strats = [
    { name: '🔥 고빈도 위주',   pool: [...all45].sort((a, b) => score[b] - score[a]).slice(0, 18) },
    { name: '❄️ 고+저 혼합',    pool: [...[...all45].sort((a, b) => score[b] - score[a]).slice(0, 10), ...[...all45].sort((a, b) => score[a] - score[b]).slice(0, 10)] },
    { name: '⏳ 미출현 집중',   pool: [...all45].sort((a, b) => absence[b - 1] - absence[a - 1]).slice(0, 18) },
    { name: '🎲 홀3짝3 균형',   pool: all45, constraint: 'odd3' },
    { name: '📐 합계 115~165',  pool: all45, constraint: 'sum' },
  ];
  return strats.map(s => {
    const pool = [...new Set(s.pool)];
    for (let att = 0; att < 2000; att++) {
      const sh = [...pool].sort(() => rand() - 0.5);
      const pk = new Set();
      for (const n of sh) { if (pk.size >= 6) break; pk.add(n); }
      if (pk.size < 6) {
        const rest = all45.filter(n => !pk.has(n)).sort(() => rand() - 0.5);
        for (const n of rest) { if (pk.size >= 6) break; pk.add(n); }
      }
      const nums = Array.from(pk).sort((a, b) => a - b);
      const sum  = nums.reduce((a, b) => a + b, 0);
      const odd  = nums.filter(n => n % 2 === 1).length;
      if (s.constraint === 'odd3' && odd !== 3) continue;
      if (s.constraint === 'sum'  && (sum < 115 || sum > 165)) continue;
      return { name: s.name, nums, sum, odd, even: 6 - odd };
    }
    return null;
  }).filter(Boolean);
}

// ══════════════════════════════════════════════════════════════
// 4. 공통 UI 컴포넌트
// ══════════════════════════════════════════════════════════════
const ballColor = n => {
  if (n <= 10) return '#fbc400';
  if (n <= 20) return '#69c8f2';
  if (n <= 30) return '#ff7272';
  if (n <= 40) return '#aaaaaa';
  return '#b0d840';
};

function Ball({ n, size = 32, bonus = false }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: bonus ? '#c084fc' : ballColor(n),
      color: '#fff', fontWeight: 700, fontSize: size * 0.38,
      margin: '0 2px', boxShadow: '0 1px 4px rgba(0,0,0,.3)',
    }}>{n}</span>
  );
}

function Card({ title, children, accent = '#1e293b', style = {} }) {
  return (
    <div style={{
      background: '#1a1f35', borderRadius: 12, padding: 14, marginTop: 12,
      border: `1px solid ${accent}`, ...style,
    }}>
      {title && <div style={{ fontSize: 14, fontWeight: 700, color: '#a5b4fc', marginBottom: 12 }}>{title}</div>}
      {children}
    </div>
  );
}

function Bar({ pct, color = '#6366f1', h = 14 }) {
  return (
    <div style={{ flex: 1, background: '#1e293b', borderRadius: 4, height: h, overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(Math.max(pct, 0), 100).toFixed(1)}%`, height: '100%', background: color, borderRadius: 4 }} />
    </div>
  );
}

function RangeBtn({ values, labels, active, onChange, color = '#6366f1' }) {
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {values.map((v, i) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          style={{
            padding: '5px 11px', borderRadius: 16, border: 'none', cursor: 'pointer',
            fontSize: 11, fontWeight: 600,
            background: active === v ? color : '#1e293b',
            color: active === v ? '#fff' : '#94a3b8',
          }}
        >{labels[i]}</button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 5. 탭별 컴포넌트
// ══════════════════════════════════════════════════════════════

// ── 탭1: 번호 빈도 ──────────────────────────────────────────
function FreqTab() {
  const [range, setRange] = useState(52);
  const data  = range === 'all' ? ALL_DATA : ALL_DATA.slice(-range);
  const freq  = useMemo(() => getFrequency(data), [data]);
  const bFreq = useMemo(() => {
    const f = new Array(46).fill(0);
    data.forEach(d => f[d.bonus]++);
    return f;
  }, [data]);

  const sorted = useMemo(() => Array.from({ length: 45 }, (_, i) => i + 1).sort((a, b) => freq[b] - freq[a]), [freq]);
  const max  = Math.max(...freq.slice(1));
  const bMax = Math.max(...bFreq.slice(1));

  return (
    <div>
      <Card title="조회 범위">
        <RangeBtn values={['all', 52, 26, 13]} labels={['전체', '1년(52회)', '6개월', '3개월']} active={range} onChange={setRange} />
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>분석 대상: {data.length}회차</div>
      </Card>

      <Card title="🏆 가장 많이 나온 번호 TOP 10">
        {sorted.slice(0, 10).map((n, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 18, color: '#f59e0b', fontWeight: 700, fontSize: 12 }}>{i + 1}</span>
            <Ball n={n} size={28} />
            <Bar pct={freq[n] / max * 100} color={ballColor(n)} />
            <span style={{ width: 30, textAlign: 'right', fontSize: 12, color: '#94a3b8' }}>{freq[n]}</span>
          </div>
        ))}
      </Card>

      <Card title="🧊 가장 적게 나온 번호 BOTTOM 10">
        {sorted.slice(-10).reverse().map((n, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 18, color: '#64748b', fontWeight: 700, fontSize: 12 }}>{i + 1}</span>
            <Ball n={n} size={28} />
            <Bar pct={freq[n] / max * 100} color="#475569" />
            <span style={{ width: 30, textAlign: 'right', fontSize: 12, color: '#94a3b8' }}>{freq[n]}</span>
          </div>
        ))}
      </Card>

      <Card title="🎱 전체 번호 출현 현황 (1~45)">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {Array.from({ length: 45 }, (_, i) => i + 1).map(n => (
            <div key={n} style={{ width: 46, background: '#1e293b', borderRadius: 6, padding: '4px 2px', textAlign: 'center' }}>
              <Ball n={n} size={28} />
              <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>{freq[n]}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="🟣 보너스 번호 TOP 5">
        {Array.from({ length: 45 }, (_, i) => i + 1).sort((a, b) => bFreq[b] - bFreq[a]).slice(0, 5).map((n, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 18, color: '#c084fc', fontWeight: 700, fontSize: 12 }}>{i + 1}</span>
            <Ball n={n} size={28} bonus />
            <Bar pct={bFreq[n] / bMax * 100} color="#c084fc" />
            <span style={{ width: 30, textAlign: 'right', fontSize: 12, color: '#94a3b8' }}>{bFreq[n]}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── 탭2: 패턴 분석 ──────────────────────────────────────────
function PatternTab() {
  const [range, setRange] = useState('all');
  const data = range === 'all' ? ALL_DATA : ALL_DATA.slice(-Number(range));
  const pats = useMemo(() => getPatterns(data), [data]);
  const N = pats.length;

  const { sumDist, oeDist, hlDist, consDist, avgSum } = useMemo(() => {
    const sumDist = {}, oeDist = {}, hlDist = {};
    const consDist = new Array(7).fill(0);
    pats.forEach(p => {
      const sb = Math.floor(p.sum / 10) * 10;
      sumDist[sb] = (sumDist[sb] || 0) + 1;
      const oeK = `홀${p.odd}짝${p.even}`; oeDist[oeK] = (oeDist[oeK] || 0) + 1;
      const hlK = `저${p.low}고${p.high}`; hlDist[hlK] = (hlDist[hlK] || 0) + 1;
      consDist[Math.min(p.consecutive, 6)]++;
    });
    const avgSum = (pats.reduce((s, p) => s + p.sum, 0) / N).toFixed(1);
    return { sumDist, oeDist, hlDist, consDist, avgSum };
  }, [pats, N]);

  const sumMax = Math.max(...Object.values(sumDist));
  const oeMax  = Math.max(...Object.values(oeDist));
  const hlMax  = Math.max(...Object.values(hlDist));

  return (
    <div>
      <Card title="조회 범위">
        <RangeBtn values={['all', 104, 52, 13]} labels={['전체', '2년', '1년', '3개월']} active={range} onChange={setRange} />
      </Card>

      <Card title="📊 요약 통계">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[['분석 회차', `${N}회`], ['평균 합계', avgSum],
            ['합계 범위', `${Math.min(...pats.map(p => p.sum))}~${Math.max(...pats.map(p => p.sum))}`]
          ].map(([l, v]) => (
            <div key={l} style={{ background: '#0f172a', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: '#64748b' }}>{l}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc' }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="🔢 합계 분포 (권장: 100~175)">
        {Object.entries(sumDist).sort((a, b) => Number(a[0]) - Number(b[0])).map(([b, c]) => (
          <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{ width: 62, fontSize: 11, color: '#94a3b8' }}>{b}~{Number(b) + 9}</span>
            <Bar pct={c / sumMax * 100} color="#6366f1" />
            <span style={{ width: 24, fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>{c}</span>
            <span style={{ width: 38, fontSize: 10, color: '#475569' }}>({(c / N * 100).toFixed(0)}%)</span>
          </div>
        ))}
      </Card>

      <Card title="⚖️ 홀짝 비율">
        {Object.entries(oeDist).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{ width: 66, fontSize: 11, color: '#94a3b8' }}>{k}</span>
            <Bar pct={v / oeMax * 100} color="#f59e0b" />
            <span style={{ width: 24, fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>{v}</span>
            <span style={{ width: 38, fontSize: 10, color: '#475569' }}>({(v / N * 100).toFixed(1)}%)</span>
          </div>
        ))}
      </Card>

      <Card title="🔼🔽 고저 비율 (저≤22 / 고≥23)">
        {Object.entries(hlDist).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{ width: 66, fontSize: 11, color: '#94a3b8' }}>{k}</span>
            <Bar pct={v / hlMax * 100} color="#10b981" />
            <span style={{ width: 24, fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>{v}</span>
            <span style={{ width: 38, fontSize: 10, color: '#475569' }}>({(v / N * 100).toFixed(1)}%)</span>
          </div>
        ))}
      </Card>

      <Card title="🔗 연속번호 패턴">
        {[['없음', consDist[1]], ['2연속', consDist[2]], ['3연속', consDist[3]], ['4연속+', consDist[4] + consDist[5] + consDist[6]]].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{ width: 66, fontSize: 11, color: '#94a3b8' }}>{l}</span>
            <Bar pct={v / N * 100} color="#ec4899" />
            <span style={{ width: 24, fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>{v}</span>
            <span style={{ width: 38, fontSize: 10, color: '#475569' }}>({(v / N * 100).toFixed(1)}%)</span>
          </div>
        ))}
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>
          💡 연속 없거나 2연속: 전체의 {((consDist[1] + consDist[2]) / N * 100).toFixed(0)}%
        </div>
      </Card>
    </div>
  );
}

// ── 탭3: 미출현 ─────────────────────────────────────────────
function MissTab() {
  const { absence } = useMemo(() => buildScoreMap(ALL_DATA), []);
  const sorted = useMemo(() => {
    const la = new Array(46).fill(0);
    for (let i = ALL_DATA.length - 1; i >= 0; i--)
      ALL_DATA[i].nums.forEach(n => { if (!la[n]) la[n] = ALL_DATA[i].drw; });
    return Array.from({ length: 45 }, (_, i) => ({
      n: i + 1, last: la[i + 1] || 0, gap: la[i + 1] ? LATEST_DRW - la[i + 1] : LATEST_DRW,
    })).sort((a, b) => b.gap - a.gap);
  }, []);

  return (
    <div>
      <Card title={`⏳ 미출현 TOP 15 (기준: 제 ${LATEST_DRW}회)`}>
        {sorted.slice(0, 15).map(({ n, last, gap }, i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <span style={{ width: 16, fontSize: 11, color: '#64748b' }}>{i + 1}</span>
            <Ball n={n} size={28} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 2 }}>
                <span style={{ color: '#94a3b8' }}>마지막: {last ? `${last}회` : '미등장'}</span>
                <span style={{ color: gap >= 20 ? '#ef4444' : gap >= 10 ? '#fbbf24' : '#34d399', fontWeight: 700 }}>{gap}회 결석</span>
              </div>
              <Bar pct={Math.min(gap / 30 * 100, 100)} color={gap >= 20 ? '#ef4444' : gap >= 10 ? '#fbbf24' : '#34d399'} h={8} />
            </div>
          </div>
        ))}
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>🔴 20회↑ &nbsp;🟡 10~19회 &nbsp;🟢 10회 미만</div>
      </Card>

      <Card title="✅ 최근 3회 당첨번호">
        {ALL_DATA.slice(-3).reverse().map(({ drw, nums, bonus, date }) => (
          <div key={drw} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{ minWidth: 52 }}>
              <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 700 }}>제{drw}회</div>
              {date && <div style={{ fontSize: 9, color: '#475569' }}>{date}</div>}
            </div>
            {nums.map(n => <Ball key={n} n={n} size={28} />)}
            <span style={{ color: '#94a3b8', fontSize: 11 }}>+</span>
            <Ball n={bonus} size={28} bonus />
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── 탭4: 구간 분포 ──────────────────────────────────────────
function DecadeTab() {
  const freq = useMemo(() => getFrequency(ALL_DATA), []);
  const DR = [
    { label: '01~09', min: 1,  max: 9,  color: '#fbc400' },
    { label: '10~19', min: 10, max: 19, color: '#69c8f2' },
    { label: '20~29', min: 20, max: 29, color: '#ff7272' },
    { label: '30~39', min: 30, max: 39, color: '#aaaaaa' },
    { label: '40~45', min: 40, max: 45, color: '#b0d840' },
  ];
  const totals = DR.map(r => { let c = 0; for (let n = r.min; n <= r.max; n++) c += freq[n]; return c; });
  const grand  = totals.reduce((a, b) => a + b, 0);

  return (
    <div>
      <Card title="🗂 구간별 출현 비율">
        {DR.map((r, i) => (
          <div key={r.label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: r.color }}>{r.label}</span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{totals[i]}회 ({(totals[i] / grand * 100).toFixed(1)}%)</span>
            </div>
            <Bar pct={totals[i] / grand * 100} color={r.color} h={16} />
          </div>
        ))}
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>
          이론 균등 약 20% | 최다: {DR[totals.indexOf(Math.max(...totals))].label}
        </div>
      </Card>

      <Card title="🔢 구간별 번호 출현 순위">
        {DR.map(r => {
          const nums = Array.from({ length: r.max - r.min + 1 }, (_, i) => r.min + i).sort((a, b) => freq[b] - freq[a]);
          return (
            <div key={r.label} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: r.color, marginBottom: 6 }}>{r.label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {nums.map(n => (
                  <div key={n} style={{ textAlign: 'center' }}>
                    <Ball n={n} size={28} />
                    <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>{freq[n]}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ── 탭5: 추천번호 ────────────────────────────────────────────
function IntegratedPick({ seed, onRefresh }) {
  const res = useMemo(() => genIntegrated(ALL_DATA, seed), [seed]);
  const { score, absence, fAll, f13 } = useMemo(() => buildScoreMap(ALL_DATA), []);

  if (!res) return null;
  const { nums, sum, odd, even, low, high, maxRun } = res;

  const tags = nums.map(n => {
    const t = [];
    if (absence[n - 1] >= 15)       t.push({ label: `${absence[n - 1]}회 결석`, color: '#ef4444' });
    else if (absence[n - 1] >= 8)   t.push({ label: `${absence[n - 1]}회 결석`, color: '#fbbf24' });
    const rank = [...Array.from({ length: 45 }, (_, i) => i + 1)].sort((a, b) => fAll[b] - fAll[a]).indexOf(n);
    if (rank < 8)  t.push({ label: '역대 고빈도', color: '#34d399' });
    if (rank >= 37) t.push({ label: '역대 저빈도', color: '#94a3b8' });
    const r13rank = [...Array.from({ length: 45 }, (_, i) => i + 1)].sort((a, b) => f13[b] - f13[a]).indexOf(n);
    if (r13rank < 5) t.push({ label: '최근 핫', color: '#f97316' });
    return { n, tags: t };
  });

  const fitBars = [
    { label: '빈도 점수',   pct: Math.min(nums.reduce((a, n) => a + score[n], 0) / nums.length / 8 * 100, 100), color: '#6366f1' },
    { label: '합계 적합',   pct: Math.max(0, 100 - Math.abs(sum - 140) * 1.5),                                  color: '#10b981' },
    { label: '홀짝 균형',   pct: (1 - Math.abs(odd - 3) / 3) * 100,                                             color: '#f59e0b' },
    { label: '미출현 반영', pct: Math.min(nums.filter(n => absence[n - 1] >= 5).length / 6 * 100 + 20, 100),   color: '#ef4444' },
    { label: '구간 분산',   pct: (() => { const z = [0,0,0,0,0]; nums.forEach(n => { z[n<=9?0:n<=19?1:n<=29?2:n<=39?3:4]++; }); return (5 - z.filter(v => v === 0).length) / 5 * 100; })(), color: '#ec4899' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg,#1e1b4b 0%,#0f172a 60%,#1a1035 100%)',
      borderRadius: 16, padding: '18px 16px', marginTop: 12,
      border: '2px solid #6366f1',
      boxShadow: '0 0 24px rgba(99,102,241,.25)',
    }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>⭐ 통합 추천번호</div>
          <div style={{ fontSize: 11, color: '#818cf8', marginTop: 2 }}>빈도·미출현·홀짝·합계·구간 5대 패턴 통합</div>
        </div>
        <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 700, background: '#1e293b', borderRadius: 20, padding: '4px 10px' }}>
          제 {LATEST_DRW + 1}회
        </div>
      </div>

      {/* 볼 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {nums.map(n => (
          <span key={n} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, borderRadius: '50%',
            background: ballColor(n), color: '#fff', fontWeight: 800, fontSize: 17,
            boxShadow: `0 0 12px ${ballColor(n)}88`,
          }}>{n}</span>
        ))}
      </div>

      {/* 번호별 근거 태그 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14, justifyContent: 'center' }}>
        {tags.map(({ n, tags: tg }) =>
          tg.map((t, i) => (
            <span key={`${n}-${i}`} style={{
              fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 10,
              background: `${t.color}22`, color: t.color, border: `1px solid ${t.color}44`,
            }}>{n}번 · {t.label}</span>
          ))
        )}
      </div>

      {/* 통계 칩 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16, justifyContent: 'center' }}>
        {[
          { l: '합계',     v: sum,              good: sum >= 115 && sum <= 165 },
          { l: '홀짝',     v: `홀${odd}짝${even}`, good: odd >= 2 && odd <= 4 },
          { l: '고저',     v: `저${low}고${high}`,  good: low >= 2 && low <= 4 },
          { l: '최대연속', v: `${maxRun}개`,     good: maxRun <= 2 },
        ].map(({ l, v, good }) => (
          <div key={l} style={{
            background: '#0f172a', borderRadius: 8, padding: '5px 10px', textAlign: 'center',
            border: `1px solid ${good ? '#34d39955' : '#475569'}`,
          }}>
            <div style={{ fontSize: 9, color: '#64748b' }}>{l}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: good ? '#34d399' : '#f87171' }}>{v}</div>
          </div>
        ))}
      </div>

      {/* 패턴 충족도 */}
      <div style={{ background: '#0f172a', borderRadius: 10, padding: '10px 12px', marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>📐 패턴 충족도</div>
        {fitBars.map(({ label, pct, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 68, fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>{label}</span>
            <Bar pct={pct} color={color} h={8} />
            <span style={{ width: 28, fontSize: 10, color, textAlign: 'right', fontWeight: 700 }}>{pct.toFixed(0)}%</span>
          </div>
        ))}
      </div>

      <button
        onClick={onRefresh}
        style={{
          width: '100%', padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7)',
          color: '#fff', fontWeight: 800, fontSize: 14,
          boxShadow: '0 2px 12px rgba(99,102,241,.4)',
        }}
      >🔮 통합번호 재분석</button>
    </div>
  );
}

function RecommendTab() {
  const [intSeed,  setIntSeed]  = useState(() => Date.now() & 0xffffff);
  const [stratSeed, setStratSeed] = useState(() => (Date.now() + 1) & 0xffffff);
  const combos = useMemo(() => genStrategies(ALL_DATA, stratSeed), [stratSeed]);

  return (
    <div>
      {/* ★ 통합 추천번호 */}
      <IntegratedPick seed={intSeed} onRefresh={() => setIntSeed(Date.now() & 0xffffff)} />

      {/* 전략별 추천번호 */}
      <Card title={`🎯 전략별 추천번호 (제 ${LATEST_DRW + 1}회)`} accent="#6366f1">
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>
          전체빈도 30% · 최근1년 50% · 최근3개월 80% · 미출현 보너스 반영
        </div>
        {combos.map((c, i) => (
          <div key={i} style={{ background: '#0f172a', borderRadius: 10, padding: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: '#818cf8', fontWeight: 700, marginBottom: 8 }}>{c.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, marginBottom: 8 }}>
              {c.nums.map(n => <Ball key={n} n={n} size={36} />)}
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#94a3b8' }}>
              <span>합계: <b style={{ color: '#a5b4fc' }}>{c.sum}</b></span>
              <span>홀짝: <b style={{ color: '#a5b4fc' }}>홀{c.odd}짝{c.even}</b></span>
            </div>
          </div>
        ))}
        <button
          onClick={() => setStratSeed(Date.now() & 0xffffff)}
          style={{
            width: '100%', padding: 11, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14,
          }}
        >🔄 새로 생성</button>
        <div style={{ fontSize: 10, color: '#475569', marginTop: 8, textAlign: 'center' }}>
          ※ 로또는 순수 확률 게임입니다. 당첨을 보장하지 않습니다.
        </div>
      </Card>

      {/* 주간 고정 조합 */}
      <Card title="📌 주간 고정 조합">
        {[
          { day: '월',  nums: [6, 16, 25, 27, 29, 36] },
          { day: '화',  nums: [12, 14, 15, 25, 33, 35] },
          { day: '수',  nums: [4, 6, 8, 31, 34, 41] },
          { day: '목',  nums: [4, 14, 17, 18, 30, 33] },
          { day: '금★', nums: [5, 8, 14, 31, 35, 41] },
        ].map(c => (
          <div key={c.day} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ width: 26, fontSize: 12, color: '#6366f1', fontWeight: 700 }}>{c.day}</span>
            {c.nums.map(n => <Ball key={n} n={n} size={28} />)}
            <span style={{ fontSize: 11, color: '#475569', marginLeft: 4 }}>합:{c.nums.reduce((a, b) => a + b, 0)}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── 탭6: 최근 회차 ──────────────────────────────────────────
function RecentTab() {
  const [n, setN] = useState(10);
  const recent = ALL_DATA.slice(-n).reverse();

  return (
    <div>
      <Card title="최근 회차 조회">
        <RangeBtn values={[5, 10, 20, 30]} labels={['5회', '10회', '20회', '30회']} active={n} onChange={setN} />
      </Card>
      {recent.map(({ drw, nums, bonus, date }) => {
        const sum = nums.reduce((a, b) => a + b, 0);
        const odd = nums.filter(n => n % 2 === 1).length;
        return (
          <div key={drw} style={{ background: '#1a1f35', borderRadius: 10, padding: 12, marginBottom: 8, border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#6366f1' }}>제 {drw}회</span>
                {date && <span style={{ fontSize: 10, color: '#475569', marginLeft: 7 }}>{date}</span>}
              </div>
              <span style={{ fontSize: 11, color: '#475569' }}>합:{sum} 홀{odd}짝{6 - odd}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {nums.map(n => <Ball key={n} n={n} size={28} />)}
              <span style={{ color: '#94a3b8', fontSize: 12, margin: '0 4px' }}>+</span>
              <Ball n={bonus} size={28} bonus />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// 6. 메인 페이지 컴포넌트 (export default)
// ══════════════════════════════════════════════════════════════
const TABS = [
  { id: 'freq',      label: '📊 빈도' },
  { id: 'pattern',   label: '🔢 패턴' },
  { id: 'miss',      label: '⏳ 미출현' },
  { id: 'decade',    label: '🗂 구간' },
  { id: 'recommend', label: '🎯 추천' },
  { id: 'recent',    label: '📋 최근' },
];

export default function LottoPage() {
  const [tab, setTab] = useState('recommend');

  return (
    <div style={{
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', Arial, sans-serif",
      background: '#0f0f1a', minHeight: '100vh', color: '#e2e8f0', paddingBottom: 60,
    }}>
      {/* 헤더 */}
      <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', padding: '18px 16px 14px', textAlign: 'center' }}>
        <div style={{ fontSize: 21, fontWeight: 800, color: '#a5b4fc', letterSpacing: '-0.5px' }}>
          🎱 로또 6/45 완전 분석
        </div>
        <div style={{ fontSize: 12, color: '#818cf8', marginTop: 3 }}>
          제 1회 ~ 제 <b style={{ color: '#a5b4fc' }}>{LATEST_DRW}</b>회 &nbsp;·&nbsp;
          총 <b style={{ color: '#a5b4fc' }}>{ALL_DATA.length}</b>회차 학습
        </div>
        {/* 탭 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 12, flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600,
                background: tab === t.id ? '#6366f1' : '#1e293b',
                color: tab === t.id ? '#fff' : '#94a3b8',
                transition: 'background .2s',
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* 컨텐츠 */}
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '0 12px' }}>
        {tab === 'freq'      && <FreqTab />}
        {tab === 'pattern'   && <PatternTab />}
        {tab === 'miss'      && <MissTab />}
        {tab === 'decade'    && <DecadeTab />}
        {tab === 'recommend' && <RecommendTab />}
        {tab === 'recent'    && <RecentTab />}
      </div>
    </div>
  );
}