/**
 * ChromaClock - Dynamic Aurora Gradient Clock Application
 * High-performance, time-interpolated color engine with modern UI
 */

// ============================================================================
// State Management
// ============================================================================
const state = {
  is24Hour: true,
  showSeconds: true,
  currentTheme: 'dynamic', // 'dynamic' | 'aurora' | 'sunset' | 'cyberpunk' | 'pastel'
  isSimulating: false,
  simulatedMinutes: 0,
  isAudioPlaying: false,
  audioContext: null,
  audioNodes: null
};

// ============================================================================
// Color Palettes & 24h Sky Interpolation Engine
// ============================================================================
/**
 * 24時間キーフレームパレット
 * 各時間における { hour, name, icon, base, orb1, orb2, orb3, orb4 }
 */
const SKY_TIMELINE = [
  {
    hour: 0.0,
    name: 'Midnight Serenity',
    icon: '✨',
    base: [6, 7, 20],
    orb1: [26, 16, 64],
    orb2: [11, 26, 48],
    orb3: [24, 0, 54],
    orb4: [13, 36, 58]
  },
  {
    hour: 4.5,
    name: 'Pre-Dawn Violet',
    icon: '🌌',
    base: [12, 13, 33],
    orb1: [44, 22, 84],
    orb2: [21, 34, 68],
    orb3: [59, 29, 90],
    orb4: [24, 48, 82]
  },
  {
    hour: 5.75,
    name: 'Dawn Blue Hour',
    icon: '🌅',
    base: [17, 22, 45],
    orb1: [68, 35, 106],
    orb2: [43, 62, 109],
    orb3: [109, 53, 112],
    orb4: [50, 82, 123]
  },
  {
    hour: 6.75,
    name: 'Sunrise Glow',
    icon: '🌄',
    base: [28, 24, 52],
    orb1: [255, 110, 127],
    orb2: [191, 233, 255],
    orb3: [255, 175, 123],
    orb4: [138, 35, 135]
  },
  {
    hour: 8.5,
    name: 'Morning Radiance',
    icon: '☀️',
    base: [20, 34, 61],
    orb1: [79, 172, 254],
    orb2: [0, 242, 254],
    orb3: [255, 177, 153],
    orb4: [67, 233, 123]
  },
  {
    hour: 12.0,
    name: 'Zenith Noon',
    icon: '🌤️',
    base: [14, 42, 71],
    orb1: [0, 198, 255],
    orb2: [0, 114, 255],
    orb3: [56, 239, 125],
    orb4: [17, 153, 142]
  },
  {
    hour: 15.5,
    name: 'Afternoon Amber',
    icon: '⛅',
    base: [26, 38, 54],
    orb1: [54, 209, 220],
    orb2: [91, 134, 229],
    orb3: [252, 227, 138],
    orb4: [243, 129, 129]
  },
  {
    hour: 17.5,
    name: 'Golden Twilight',
    icon: '🌇',
    base: [38, 21, 42],
    orb1: [248, 87, 166],
    orb2: [255, 88, 88],
    orb3: [255, 153, 102],
    orb4: [255, 94, 98]
  },
  {
    hour: 19.0,
    name: 'Magic Hour',
    icon: '🌆',
    base: [29, 18, 46],
    orb1: [101, 78, 163],
    orb2: [234, 175, 200],
    orb3: [142, 45, 226],
    orb4: [74, 0, 224]
  },
  {
    hour: 21.0,
    name: 'Nightfall Indigo',
    icon: '🌙',
    base: [10, 14, 39],
    orb1: [36, 59, 85],
    orb2: [20, 30, 48],
    orb3: [63, 43, 150],
    orb4: [168, 192, 255]
  },
  {
    hour: 24.0, // wrap around to 0
    name: 'Midnight Serenity',
    icon: '✨',
    base: [6, 7, 20],
    orb1: [26, 16, 64],
    orb2: [11, 26, 48],
    orb3: [24, 0, 54],
    orb4: [13, 36, 58]
  }
];

// 固定プリセットテーマ
const THEME_PRESETS = {
  aurora: {
    name: 'Aurora Borealis',
    icon: '🌌',
    base: '#051329',
    orb1: 'rgba(0, 198, 255, 0.9)',
    orb2: 'rgba(0, 114, 255, 0.8)',
    orb3: 'rgba(43, 255, 136, 0.75)',
    orb4: 'rgba(92, 37, 141, 0.7)'
  },
  sunset: {
    name: 'Golden Sunset',
    icon: '🌇',
    base: '#1f0d1a',
    orb1: 'rgba(248, 87, 166, 0.85)',
    orb2: 'rgba(255, 88, 88, 0.85)',
    orb3: 'rgba(255, 195, 113, 0.8)',
    orb4: 'rgba(142, 45, 226, 0.75)'
  },
  cyberpunk: {
    name: 'Cyber Midnight',
    icon: '⚡',
    base: '#090314',
    orb1: 'rgba(255, 0, 127, 0.85)',
    orb2: 'rgba(121, 40, 202, 0.85)',
    orb3: 'rgba(0, 242, 254, 0.8)',
    orb4: 'rgba(77, 255, 219, 0.75)'
  },
  pastel: {
    name: 'Dreamy Sky',
    icon: '🌸',
    base: '#1a1829',
    orb1: 'rgba(161, 140, 209, 0.8)',
    orb2: 'rgba(251, 194, 235, 0.75)',
    orb3: 'rgba(250, 208, 196, 0.75)',
    orb4: 'rgba(137, 247, 254, 0.7)'
  }
};

/**
 * 2つのRGB配列を線形補間
 */
function lerpColor(c1, c2, factor) {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * factor),
    Math.round(c1[1] + (c2[1] - c1[1]) * factor),
    Math.round(c1[2] + (c2[2] - c1[2]) * factor)
  ];
}

function rgbToString(c, alpha = 1) {
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

/**
 * 時刻(小数表記 0.00 〜 24.00)に基づき補間された色セットを計算
 */
function getInterpolatedSky(decimalHour) {
  let prev = SKY_TIMELINE[0];
  let next = SKY_TIMELINE[1];

  for (let i = 0; i < SKY_TIMELINE.length - 1; i++) {
    if (decimalHour >= SKY_TIMELINE[i].hour && decimalHour <= SKY_TIMELINE[i + 1].hour) {
      prev = SKY_TIMELINE[i];
      next = SKY_TIMELINE[i + 1];
      break;
    }
  }

  const range = next.hour - prev.hour;
  const factor = range === 0 ? 0 : (decimalHour - prev.hour) / range;

  return {
    phaseName: factor < 0.5 ? prev.name : next.name,
    icon: factor < 0.5 ? prev.icon : next.icon,
    base: rgbToString(lerpColor(prev.base, next.base, factor)),
    orb1: rgbToString(lerpColor(prev.orb1, next.orb1, factor), 0.85),
    orb2: rgbToString(lerpColor(prev.orb2, next.orb2, factor), 0.8),
    orb3: rgbToString(lerpColor(prev.orb3, next.orb3, factor), 0.78),
    orb4: rgbToString(lerpColor(prev.orb4, next.orb4, factor), 0.75)
  };
}

// ============================================================================
// DOM References
// ============================================================================
const dom = {
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  ampm: document.getElementById('ampm'),
  dateWeekday: document.getElementById('dateWeekday'),
  dateFull: document.getElementById('dateFull'),
  dateJp: document.getElementById('dateJp'),
  dayProgressPercent: document.getElementById('dayProgressPercent'),
  dayProgressBar: document.getElementById('dayProgressBar'),
  phaseName: document.getElementById('phaseName'),
  phaseIcon: document.getElementById('phaseIcon'),
  timePhaseBadge: document.getElementById('timePhaseBadge'),
  timezoneText: document.getElementById('timezoneText'),
  quoteText: document.getElementById('quoteText'),
  quoteAuthor: document.getElementById('quoteAuthor'),
  timeSubContainer: document.querySelector('.time-sub-container'),
  
  // Controls
  formatToggleBtn: document.getElementById('formatToggleBtn'),
  formatBtnLabel: document.getElementById('formatBtnLabel'),
  secToggleBtn: document.getElementById('secToggleBtn'),
  themePickerBtn: document.getElementById('themePickerBtn'),
  themeDrawer: document.getElementById('themeDrawer'),
  timeSliderToggleBtn: document.getElementById('timeSliderToggleBtn'),
  sliderDrawer: document.getElementById('sliderDrawer'),
  timeSlider: document.getElementById('timeSlider'),
  resetRealtimeBtn: document.getElementById('resetRealtimeBtn'),
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  soundLabel: document.getElementById('soundLabel'),
  fullscreenBtn: document.getElementById('fullscreenBtn')
};

// ============================================================================
// Inspiring Quotes Rotator
// ============================================================================
const QUOTES = [
  { text: "Time is what we want most, but what we use worst.", author: "William Penn" },
  { text: "The two most powerful warriors are patience and time.", author: "Leo Tolstoy" },
  { text: "Lost time is never found again.", author: "Benjamin Franklin" },
  { text: "Time is a created thing. To say 'I don't have time' is to say 'I don't want to.'", author: "Lao Tzu" },
  { text: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.", author: "Marcus Aurelius" },
  { text: "昨日から学び、今日のために生き、明日に希望を持とう。", author: "Albert Einstein" }
];

let currentQuoteIndex = 0;
function rotateQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % QUOTES.length;
  const quote = QUOTES[currentQuoteIndex];
  
  dom.quoteText.style.opacity = '0';
  dom.quoteAuthor.style.opacity = '0';
  
  setTimeout(() => {
    dom.quoteText.textContent = `"${quote.text}"`;
    dom.quoteAuthor.textContent = `— ${quote.author}`;
    dom.quoteText.style.opacity = '1';
    dom.quoteAuthor.style.opacity = '1';
  }, 400);
}
setInterval(rotateQuote, 16000);

// ============================================================================
// Clock Render Engine
// ============================================================================
function updateClock() {
  const now = new Date();
  
  // シミュレーター使用中なら時間をオーバーライド
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes();
  let currentSeconds = now.getSeconds();
  let currentMs = now.getMilliseconds();
  
  if (state.isSimulating) {
    const totalSimMinutes = state.simulatedMinutes;
    currentHours = Math.floor(totalSimMinutes / 60);
    currentMinutes = Math.floor(totalSimMinutes % 60);
    // 秒は実時間のアニメーションを流用
  }

  // 12h / 24h 判定
  let displayHours = currentHours;
  let ampmStr = '';
  
  if (!state.is24Hour) {
    ampmStr = currentHours >= 12 ? 'PM' : 'AM';
    displayHours = currentHours % 12;
    if (displayHours === 0) displayHours = 12;
  }
  
  dom.hours.textContent = String(displayHours).padStart(2, '0');
  dom.minutes.textContent = String(currentMinutes).padStart(2, '0');
  dom.seconds.textContent = String(currentSeconds).padStart(2, '0');
  
  if (state.is24Hour) {
    dom.ampm.style.display = 'none';
  } else {
    dom.ampm.style.display = 'inline-block';
    dom.ampm.textContent = ampmStr;
  }

  // 日付の更新
  const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const jpWeekdays = ['日', '月', '火', '水', '木', '金', '土'];
  
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const day = now.getDay();
  
  dom.dateWeekday.textContent = weekdayNames[day];
  dom.dateFull.textContent = `${monthNames[month]} ${date}, ${year}`;
  
  // 和暦年 (2026 = 令和8年)
  const reiwaYear = year - 2018;
  const reiwaText = reiwaYear === 1 ? '元年' : `${reiwaYear}年`;
  dom.dateJp.textContent = `令和${reiwaText} ${month + 1}月${date}日 (${jpWeekdays[day]})`;

  // 今日の進捗パーセンテージ計算 (00:00:00 から 23:59:59)
  const totalSecondsInDay = 86400;
  const passedSeconds = (currentHours * 3600) + (currentMinutes * 60) + currentSeconds + (currentMs / 1000);
  const dayPercentage = Math.min(100, Math.max(0, (passedSeconds / totalSecondsInDay) * 100));
  
  dom.dayProgressPercent.textContent = `${dayPercentage.toFixed(1)}%`;
  dom.dayProgressBar.style.width = `${dayPercentage}%`;

  // 動的グラデーションの適用
  applyGradient(currentHours, currentMinutes, currentSeconds);
}

/**
 * テーマおよび現在時刻に応じたグラデーションカラーのCSS適用
 */
function applyGradient(hours, minutes, seconds) {
  const root = document.documentElement;

  if (state.currentTheme === 'dynamic') {
    const decimalHour = hours + (minutes / 60) + (seconds / 3600);
    const sky = getInterpolatedSky(decimalHour);

    root.style.setProperty('--bg-base', sky.base);
    root.style.setProperty('--orb-1', sky.orb1);
    root.style.setProperty('--orb-2', sky.orb2);
    root.style.setProperty('--orb-3', sky.orb3);
    root.style.setProperty('--orb-4', sky.orb4);

    dom.phaseName.textContent = sky.phaseName;
    dom.phaseIcon.textContent = sky.icon;
  } else {
    // プリセットテーマ
    const preset = THEME_PRESETS[state.currentTheme];
    if (preset) {
      root.style.setProperty('--bg-base', preset.base);
      root.style.setProperty('--orb-1', preset.orb1);
      root.style.setProperty('--orb-2', preset.orb2);
      root.style.setProperty('--orb-3', preset.orb3);
      root.style.setProperty('--orb-4', preset.orb4);
      
      dom.phaseName.textContent = preset.name;
      dom.phaseIcon.textContent = preset.icon;
    }
  }
}

// ============================================================================
// Ambient Sound Synthesizer (Web Audio API - Natural Calm Wind / Rain)
// ============================================================================
function toggleSound() {
  if (state.isAudioPlaying) {
    stopSound();
  } else {
    startSound();
  }
}

function startSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!state.audioContext) {
      state.audioContext = new AudioContext();
    }
    if (state.audioContext.state === 'suspended') {
      state.audioContext.resume();
    }

    const ctx = state.audioContext;
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate Pink Noise for soothing natural ambience
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.05; // Gentle volume
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter for warm rain/wind sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 2);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();

    state.audioNodes = { whiteNoise, gainNode };
    state.isAudioPlaying = true;
    dom.soundToggleBtn.classList.add('active');
    dom.soundLabel.textContent = 'Playing';
  } catch (err) {
    console.error('Audio initialization error:', err);
  }
}

function stopSound() {
  if (state.audioNodes && state.audioContext) {
    const { gainNode, whiteNoise } = state.audioNodes;
    gainNode.gain.setValueAtTime(gainNode.gain.value, state.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, state.audioContext.currentTime + 1);
    setTimeout(() => {
      try {
        whiteNoise.stop();
        whiteNoise.disconnect();
      } catch (e) {}
      state.isAudioPlaying = false;
      dom.soundToggleBtn.classList.remove('active');
      dom.soundLabel.textContent = 'Sound';
    }, 1000);
  } else {
    state.isAudioPlaying = false;
    dom.soundToggleBtn.classList.remove('active');
    dom.soundLabel.textContent = 'Sound';
  }
}

// ============================================================================
// Event Listeners & UI Controls
// ============================================================================
function setupEventListeners() {
  // 12/24H 切り替え
  dom.formatToggleBtn.addEventListener('click', () => {
    state.is24Hour = !state.is24Hour;
    dom.formatBtnLabel.textContent = state.is24Hour ? '24H' : '12H';
    dom.formatToggleBtn.classList.toggle('active', !state.is24Hour);
    updateClock();
  });

  // 秒表示切り替え
  dom.secToggleBtn.addEventListener('click', () => {
    state.showSeconds = !state.showSeconds;
    dom.timeSubContainer.classList.toggle('hidden-seconds', !state.showSeconds);
    dom.secToggleBtn.classList.toggle('active', state.showSeconds);
  });
  dom.secToggleBtn.classList.add('active'); // Default ON

  // テーマセレクタ
  dom.themePickerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dom.sliderDrawer.classList.remove('open');
    dom.timeSliderToggleBtn.classList.remove('active');
    dom.themeDrawer.classList.toggle('open');
    dom.themePickerBtn.classList.toggle('active');
  });

  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.theme-option').forEach(el => el.classList.remove('active'));
      option.classList.add('active');
      state.currentTheme = option.dataset.theme;
      updateClock();
    });
  });

  // 時間シミュレータードロワー
  dom.timeSliderToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dom.themeDrawer.classList.remove('open');
    dom.themePickerBtn.classList.remove('active');
    dom.sliderDrawer.classList.toggle('open');
    dom.timeSliderToggleBtn.classList.toggle('active');

    if (dom.sliderDrawer.classList.contains('open')) {
      const now = new Date();
      dom.timeSlider.value = (now.getHours() * 60) + now.getMinutes();
    }
  });

  dom.timeSlider.addEventListener('input', (e) => {
    state.isSimulating = true;
    state.simulatedMinutes = parseInt(e.target.value, 10);
    // スライダー操作時は自動的にダイナミックテーマへ
    if (state.currentTheme !== 'dynamic') {
      state.currentTheme = 'dynamic';
      document.querySelectorAll('.theme-option').forEach(el => {
        el.classList.toggle('active', el.dataset.theme === 'dynamic');
      });
    }
    updateClock();
  });

  dom.resetRealtimeBtn.addEventListener('click', () => {
    state.isSimulating = false;
    dom.timeSliderToggleBtn.classList.remove('active');
    dom.sliderDrawer.classList.remove('open');
    updateClock();
  });

  // 音声アンビエント切り替え
  dom.soundToggleBtn.addEventListener('click', toggleSound);

  // フルスクリーン切り替え
  dom.fullscreenBtn.addEventListener('click', toggleFullscreen);

  // 外側クリックでドロワーを閉じる
  document.addEventListener('click', (e) => {
    if (!dom.sliderDrawer.contains(e.target) && !dom.timeSliderToggleBtn.contains(e.target)) {
      dom.sliderDrawer.classList.remove('open');
      dom.timeSliderToggleBtn.classList.remove('active');
    }
    if (!dom.themeDrawer.contains(e.target) && !dom.themePickerBtn.contains(e.target)) {
      dom.themeDrawer.classList.remove('open');
      dom.themePickerBtn.classList.remove('active');
    }
  });

  // キーボードショートカット
  window.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    } else if (e.key === 's' || e.key === 'S') {
      dom.secToggleBtn.click();
    } else if (e.key === 'h' || e.key === 'H') {
      dom.formatToggleBtn.click();
    }
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn(`Fullscreen error: ${err.message}`);
    });
    dom.fullscreenBtn.classList.add('active');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    dom.fullscreenBtn.classList.remove('active');
  }
}

// ============================================================================
// Initialization & Main Loop
// ============================================================================
function init() {
  // タイムゾーン文字列取得
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    dom.timezoneText.textContent = `${tz.toUpperCase()}`;
  } catch (e) {
    dom.timezoneText.textContent = 'LOCAL TIME';
  }

  setupEventListeners();
  updateClock();

  // 高頻度かつ滑らかな更新ループ (60fps animation frameで更新)
  function loop() {
    updateClock();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// ドキュメント読み込み後に起動
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
