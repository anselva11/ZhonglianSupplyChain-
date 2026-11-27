/**
 * ZHONGLIAN SUPPLY CHAIN CO., LTD. (中联供应链有限公司)
 * Corporate JavaScript functionality
 * - Multi-Language Support: China (中文), Indonesia (ID), International (EN)
 * - Navigation & Smooth Scroll Spy
 * - Mobile Drawer Menu
 * - Facility Photography Lightbox
 * - Corporate Inquiry Submission Handling
 */

// Facility Gallery Data for Lightbox in 3 Languages (ZH, ID, EN)
const facilityItems = [
  {
    src: 'Assets/images/facility-high-bay.jpg',
    tag_zh: '立体高位货架',
    tag_id: 'RAK TINGGI (HIGH-BAY)',
    tag_en: 'HIGH-BAY RACKING',
    title_zh: '标准化工业立体货架区',
    title_id: 'Rak Penyimpanan Industri Terorganisir',
    title_en: 'Organized Industrial Storage Racks',
    desc_zh: '高密度多层托盘立体货架系统，适用于标准化货物定位存放与高位叉车安全作业。',
    desc_id: 'Sistem rak palet bertingkat densitas tinggi untuk penempatan inventaris terstandar dan keselamatan operasional reach truck.',
    desc_en: 'High-density multi-tier pallet racking engineered for systematic inventory placement and safe reach-truck operations.'
  },
  {
    src: 'Assets/images/cold-storage-facility.jpg',
    tag_zh: '恒温洁净冷库',
    tag_id: 'RUANG COLD STORAGE',
    tag_en: 'COLD STORAGE ROOM',
    title_zh: '专业温控冷链库房',
    title_id: 'Fasilitas Cold Storage Bersih',
    title_en: 'Clean Cold Storage Facilities',
    desc_zh: '洁净级全封闭恒温冷库，配备自动化温控监测与均匀冷风循环系统，确保存放物料品质稳定。',
    desc_id: 'Ruang berpendingin higienis dengan pemantauan suhu otomatis dan sirkulasi pendinginan udara merata untuk menjaga stabilitas kualitas produk.',
    desc_en: 'Sanitary temperature-monitored refrigerated chamber equipped with continuous air circulation and thermal insulation.'
  },
  {
    src: 'Assets/images/warehouse-exterior-dock.jpg',
    tag_zh: '库内作业分流区',
    tag_id: 'PENANGANAN & STAGING',
    tag_en: 'HANDLING & STAGING',
    title_zh: '货物装卸与库内调度',
    title_id: 'Penanganan Barang & Operasional',
    title_en: 'Goods Handling & Operations',
    desc_zh: '规范化库内中转与装卸作业区，保障托盘流转与货物入库暂存的安全性与高效性。',
    desc_id: 'Area khusus penanganan dan transit barang untuk memastikan pemindahan palet dan penerimaan barang berlangsung aman dan efisien.',
    desc_en: 'Dedicated handling floor for secure pallet staging, sorting, and systematic goods receipt.'
  },
  {
    src: 'Assets/images/service-warehousing.jpg',
    tag_zh: '库内实景空间',
    tag_id: 'INTERIOR GUDANG',
    tag_en: 'WAREHOUSE INTERIOR',
    title_zh: '现代化库内作业空间',
    title_id: 'Interior Gudang Profesional',
    title_en: 'Professional Warehouse Interiors',
    desc_zh: '宽敞整洁的库内通道，常年保持严谨的工业定置与清洁管理标准。',
    desc_id: 'Lorong penyimpanan yang luas dan tertata rapi dengan standar housekeeping industri dan kebersihan yang ketat.',
    desc_en: 'Wide, well-lit storage aisles maintained under strict industrial housekeeping protocols.'
  },
  {
    src: 'Assets/images/warehouse-interior-racks.jpg',
    tag_zh: '通用仓储设施',
    tag_id: 'PENYIMPANAN UMUM',
    tag_en: 'GENERAL STORAGE',
    title_zh: '大容量通用仓储库区',
    title_id: 'Fasilitas Pergudangan Umum',
    title_en: 'General Warehouse Facilities',
    desc_zh: '适合多品类货物存储的大型通用普货库容，支持灵活的货位分区与容量扩展。',
    desc_id: 'Kapasitas pergudangan umum bervolume besar untuk berbagai kategori barang dengan konfigurasi ruang yang fleksibel.',
    desc_en: 'Multi-category general warehousing with flexible floor configurations for commercial enterprises.'
  },
  {
    src: 'Assets/images/hero-warehouse.jpg',
    tag_zh: '高净空立体库容',
    tag_id: 'KAPASITAS VERTIKAL',
    tag_en: 'VERTICAL CAPACITY',
    title_zh: '窄通道高位立体存储',
    title_id: 'Sistem Rak Lorong Sempit (VNA)',
    title_en: 'High-Bay Narrow Aisle System',
    desc_zh: '采用高强度重型立体货架结构，科学提升垂直空间利用率，满足大体量长期存管需求。',
    desc_id: 'Struktur rak baja berat untuk memaksimalkan efisiensi pemanfaatan ruang vertikal dan penyimpanan jangka panjang bervolume besar.',
    desc_en: 'Engineered for high vertical cube efficiency with durable steel uprights and guided aisle ways.'
  }
];

let currentLightboxIndex = 0;
let currentLanguage = 'zh';

// Placeholders dictionary for form inputs
const formPlaceholders = {
  zh: {
    name: '张先生 / John Zhang',
    company: '例如：某某商贸实业有限公司',
    email: 'name@company.com',
    phone: '+86 ... / +62 ...',
    message: '请简要说明您的预估货量、温度温区要求、入库周期或供应链协同需求...'
  },
  id: {
    name: 'cth. Budi Santoso / John Zhang',
    company: 'cth. PT Maju Bersama Logistik',
    email: 'nama@perusahaan.com',
    phone: '+62 812 ... / +86 ...',
    message: 'Mohon jelaskan estimasi volume penyimpanan, spesifikasi suhu, atau kebutuhan koordinasi rantai pasok Anda...'
  },
  en: {
    name: 'e.g. John Zhang / Robert Miller',
    company: 'e.g. Global Trade Logistics Ltd.',
    email: 'name@company.com',
    phone: '+86 ... / +1 ...',
    message: 'Please outline your estimated storage volume, temperature specifications, or supply chain requirements...'
  }
};

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollSpy();
  initLanguage();
  initKeyboardNav();
  if (typeof updateFreightEstimate === 'function') {
    updateFreightEstimate();
  }
});

/* --------------------------------------------------------------------------
   1. Multi-Language Switcher (China 'zh', Indonesia 'id', English 'en')
   -------------------------------------------------------------------------- */
function setLanguage(lang) {
  if (lang !== 'zh' && lang !== 'id' && lang !== 'en') return;
  currentLanguage = lang;
  localStorage.setItem('zhonglian_lang', lang);

  // Update HTML lang attribute & class
  document.documentElement.lang = lang;
  document.body.classList.remove('zh-mode', 'id-mode', 'en-mode');
  document.body.classList.add(`${lang}-mode`);

  // Update button active states in top bar and mobile menu
  const allLangBtns = document.querySelectorAll('.lang-btn');
  allLangBtns.forEach(btn => {
    const text = btn.textContent.trim().toUpperCase();
    if ((lang === 'zh' && (text === '中文' || text === 'ZH')) ||
        (lang === 'id' && text === 'ID') ||
        (lang === 'en' && text === 'EN')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update all elements with data attributes
  const translatableElements = document.querySelectorAll(`[data-${lang}]`);
  translatableElements.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update select dropdown options
  const select = document.getElementById('contact-service');
  if (select) {
    Array.from(select.options).forEach(opt => {
      const optText = opt.getAttribute(`data-${lang}`);
      if (optText) opt.textContent = optText;
    });
  }

  // Update placeholders in the contact form
  const pl = formPlaceholders[lang];
  if (pl) {
    const nameInput = document.getElementById('contact-name');
    const compInput = document.getElementById('contact-company');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const msgInput = document.getElementById('contact-message');

    if (nameInput) nameInput.placeholder = pl.name;
    if (compInput) compInput.placeholder = pl.company;
    if (emailInput) emailInput.placeholder = pl.email;
    if (phoneInput) phoneInput.placeholder = pl.phone;
    if (msgInput) msgInput.placeholder = pl.message;
  }

  // Update open lightbox if active
  if (document.getElementById('lightbox-modal').classList.contains('active')) {
    updateLightboxContent(currentLightboxIndex);
  }

  // Update dynamic freight estimates and telematics in active language
  if (typeof updateFreightEstimate === 'function') {
    updateFreightEstimate();
  }
}

function initLanguage() {
  const savedLang = localStorage.getItem('zhonglian_lang') || 'zh';
  setLanguage(savedLang);
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('mobile-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Spy & Sticky Header Offset
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120; // 80px header + buffer

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Facility Lightbox Modal
   -------------------------------------------------------------------------- */
function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent(index);
  const modal = document.getElementById('lightbox-modal');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightboxContent(index) {
  const item = facilityItems[index];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-img');
  const tagEl = document.getElementById('lightbox-tag');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');

  const lang = currentLanguage;
  imgEl.src = item.src;
  imgEl.alt = item[`title_${lang}`] || item.title_en;
  tagEl.textContent = item[`tag_${lang}`] || item.tag_en;
  titleEl.textContent = item[`title_${lang}`] || item.title_en;
  descEl.textContent = item[`desc_${lang}`] || item.desc_en;
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % facilityItems.length;
  updateLightboxContent(currentLightboxIndex);
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + facilityItems.length) % facilityItems.length;
  updateLightboxContent(currentLightboxIndex);
}

function initKeyboardNav() {
  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
  });
}

/* --------------------------------------------------------------------------
   5. Corporate Inquiry Form Handling in 3 Languages
   -------------------------------------------------------------------------- */
function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  const name = document.getElementById('contact-name').value.trim();
  const company = document.getElementById('contact-company').value.trim();
  const service = document.getElementById('contact-service').value;

  if (!name || !company || !service) {
    return;
  }

  // Button state
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;

  if (currentLanguage === 'zh') {
    submitBtn.textContent = '正在提交...';
  } else if (currentLanguage === 'id') {
    submitBtn.textContent = 'Sedang Mengirim...';
  } else {
    submitBtn.textContent = 'Transmitting Inquiry...';
  }

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    form.reset();

    statusEl.className = 'form-status success';
    statusEl.style.display = 'block';

    const refNum = 'ZL-' + Math.floor(100000 + Math.random() * 900000);
    if (currentLanguage === 'zh') {
      statusEl.innerHTML = `<strong>咨询已成功提交！</strong><br>感谢您的垂询（业务参考编号：${refNum}）。中联供应链企业业务团队将在 24 小时内与您联系对接。`;
    } else if (currentLanguage === 'id') {
      statusEl.innerHTML = `<strong>Inquiry Berhasil Dikirimkan!</strong><br>Terima kasih atas pesan Anda (Nomor Referensi: ${refNum}). Tim operasional Zhonglian Supply Chain akan segera menghubungi Anda dalam waktu 24 jam.`;
    } else {
      statusEl.innerHTML = `<strong>Inquiry Received Successfully!</strong><br>Thank you for contacting Zhonglian Supply Chain (Reference ID: ${refNum}). Our operational team will review your requirements and respond promptly within 24 hours.`;
    }

    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 10000);
  }, 600);
}

/* --------------------------------------------------------------------------
   6. Hansai Shipping Line Integration: Instant Freight Estimator & Telematics
   -------------------------------------------------------------------------- */
const hansaiRates = {
  IDJKT: {
    days: '8 – 10',
    '40reefer': {
      rate: '$1,280 – $1,550',
      zh: '冷链模式：40尺高顶冷藏集装箱全程通电温控（-25°C ~ +15°C）与物联网监控。',
      id: 'Mode Rantai Dingin: Kontainer Reefer 40ft aktif dengan telematika suhu -25°C hingga +15°C.',
      en: 'Cold Chain Mode: Active 40ft Reefer telematics with continuous -25°C to +15°C power.'
    },
    '40hc': {
      rate: '$780 – $960',
      zh: '普货整箱：40尺高顶高容积集装箱（76.4 CBM容积），适用工业品与电子机械。',
      id: 'Kargo Umum: Kontainer 40ft High Cube (kapasitas 76.4 CBM), untuk barang industri & manufaktur.',
      en: 'General Cargo: 40ft High Cube Dry Container (76.4 CBM capacity) for industrial and dry goods.'
    },
    '20gp': {
      rate: '$490 – $640',
      zh: '普货标准箱：20尺标准重箱（33.2 CBM容积），适用高密度工业耗材与重货。',
      id: 'Kargo Standar: Kontainer 20ft Standard (kapasitas 33.2 CBM), cocok untuk kargo berat.',
      en: 'Standard Dry: 20ft Standard Container (33.2 CBM capacity) for heavy and dense cargo.'
    }
  },
  IDSUB: {
    days: '10 – 12',
    '40reefer': {
      rate: '$1,380 – $1,650',
      zh: '冷链模式：40尺高顶冷藏集装箱全程通电温控（-25°C ~ +15°C）与物联网监控。',
      id: 'Mode Rantai Dingin: Kontainer Reefer 40ft aktif dengan telematika suhu -25°C hingga +15°C.',
      en: 'Cold Chain Mode: Active 40ft Reefer telematics with continuous -25°C to +15°C power.'
    },
    '40hc': {
      rate: '$840 – $1,020',
      zh: '普货整箱：40尺高顶高容积集装箱，直航印尼泗水丹戎佩拉港（Tanjung Perak）。',
      id: 'Kargo Umum: Kontainer 40ft High Cube, rute langsung ke Pelabuhan Tanjung Perak Surabaya.',
      en: 'General Cargo: 40ft High Cube Dry Container direct to Tanjung Perak Port, Surabaya.'
    },
    '20gp': {
      rate: '$540 – $710',
      zh: '普货标准箱：20尺标准重箱，直达印尼东爪哇工业核心枢纽。',
      id: 'Kargo Standar: Kontainer 20ft Standard menuju hub industri Jawa Timur.',
      en: 'Standard Dry: 20ft Standard Container serving East Java industrial corridor.'
    }
  },
  SGSIN: {
    days: '5 – 7',
    '40reefer': {
      rate: '$1,050 – $1,320',
      zh: '冷链模式：高速班轮直航新加坡港，配备高精度连续冷链监测。',
      id: 'Mode Rantai Dingin: Pelayaran cepat ke Pelabuhan Singapura dengan telematika suhu presisi.',
      en: 'Cold Chain Mode: Fast express liner direct to Singapore PSA with precision temperature logs.'
    },
    '40hc': {
      rate: '$620 – $800',
      zh: '普货整箱：40尺高箱直航东南亚核心中转枢纽，极速班期。',
      id: 'Kargo Umum: Kontainer 40ft High Cube rute kilat ke hub transit ASEAN Singapura.',
      en: 'General Cargo: 40ft High Cube Dry Container direct to Singapore transshipment hub.'
    },
    '20gp': {
      rate: '$380 – $520',
      zh: '普货标准箱：20尺标准干箱，经济高效的东南亚快线。',
      id: 'Kargo Standar: Kontainer 20ft Standard, rute hemat dan cepat ke Singapura.',
      en: 'Standard Dry: 20ft Standard Container, economical direct ASEAN sea connection.'
    }
  },
  NLRTM: {
    days: '26 – 28',
    '40reefer': {
      rate: '$3,200 – $3,650',
      zh: '欧线冷链特箱：40尺超长远洋冷藏箱，配置双套独立制冷机组与卫星温湿度回传。',
      id: 'Reefer Jalur Eropa: Kontainer 40ft jarak jauh dengan sistem pendingin ganda dan telematika satelit.',
      en: 'Europe Reefer: 40ft long-haul reefer container with dual redundant cooling and satellite telematics.'
    },
    '40hc': {
      rate: '$2,100 – $2,480',
      zh: '欧线大箱：40尺高箱直航欧洲第一大港荷兰鹿特丹港（NLRTM）。',
      id: 'Kargo Jalur Eropa: Kontainer 40ft High Cube langsung ke Pelabuhan Rotterdam (NLRTM).',
      en: 'Europe Liner: 40ft High Cube direct to Port of Rotterdam (NLRTM), gateway to Europe.'
    },
    '20gp': {
      rate: '$1,350 – $1,620',
      zh: '欧线小箱：20尺重箱经苏伊士运河直航欧洲门户枢纽。',
      id: 'Kargo 20ft Eropa: Kontainer 20ft via Terusan Suez menuju pintu gerbang Eropa.',
      en: 'Europe Standard: 20ft Dry Container via Suez maritime artery to European hub.'
    }
  },
  USLAX: {
    days: '14 – 16',
    '40reefer': {
      rate: '$3,800 – $4,350',
      zh: '美西冷链：40尺高箱直航美国洛杉矶港，满足严格FDA与USDA进口温控全流程验证。',
      id: 'Reefer Pantai Barat AS: Kontainer 40ft ke Los Angeles dengan kepatuhan standar suhu FDA/USDA.',
      en: 'US West Coast Reefer: 40ft Reefer direct to Port of Los Angeles with full temperature verification.'
    },
    '40hc': {
      rate: '$2,450 – $2,890',
      zh: '美西干线：太平洋跨洋直航美国西海岸核心集装箱码头。',
      id: 'Jalur Pantai Barat AS: Rute pelayaran Pasifik langsung ke dermaga peti kemas utama Los Angeles.',
      en: 'Transpacific Liner: Direct ocean service across the Pacific to Los Angeles gateway.'
    },
    '20gp': {
      rate: '$1,650 – $1,980',
      zh: '美西标箱：20尺标准重箱跨太平洋直发。',
      id: 'Standar Pantai Barat AS: Kontainer 20ft jalur cepat Pasifik.',
      en: 'Transpacific Standard: 20ft Dry container express Pacific service.'
    }
  }
};

function updateFreightEstimate() {
  const destEl = document.getElementById('calc-dest');
  const equipEl = document.getElementById('calc-equipment');
  const transitEl = document.getElementById('calc-transit-time');
  const rateEl = document.getElementById('calc-rate-range');
  const specEl = document.getElementById('calc-spec-text');

  if (!destEl || !equipEl || !transitEl || !rateEl || !specEl) return;

  const dest = destEl.value;
  const equip = equipEl.value;

  const data = hansaiRates[dest];
  if (!data) return;

  const daysSuffix = currentLanguage === 'zh' ? ' 天' : (currentLanguage === 'id' ? ' Hari' : ' Days');
  transitEl.textContent = `${data.days}${daysSuffix}`;

  const equipData = data[equip];
  if (equipData) {
    rateEl.textContent = equipData.rate;
    specEl.textContent = equipData[currentLanguage] || equipData.en;
  }
}

// Telematics Lookup
function lookupTelematics() {
  const inputEl = document.getElementById('telematics-input');
  if (!inputEl) return;
  const val = inputEl.value.trim().toUpperCase();
  if (!val) return;

  const feedDisplay = document.getElementById('feed-id-display');
  const feedVessel = document.getElementById('feed-vessel');
  const feedRoute = document.getElementById('feed-route');
  const feedTemp = document.getElementById('feed-temp');
  const feedStatus = document.getElementById('feed-status');

  if (feedDisplay) feedDisplay.textContent = val;

  if (val.includes('DRY') || val.includes('ZLSC')) {
    if (feedVessel) feedVessel.textContent = 'M/V HANSAI GLORY (Voy. 1402W)';
    if (feedRoute) feedRoute.textContent = 'Ningbo (CNNGB) → Surabaya (IDSUB)';
    if (feedTemp) feedTemp.textContent = currentLanguage === 'zh' ? '常温干货（非温控）' : (currentLanguage === 'id' ? 'Kargo Suhu Ruang (Dry)' : 'Ambient (Dry Cargo)');
    if (feedStatus) feedStatus.textContent = currentLanguage === 'zh' ? '靠泊准备中 — 预计明日到港' : (currentLanguage === 'id' ? 'Mendekati Dermaga — Tiba Besok' : 'Approaching Berth — ETA Tomorrow');
  } else {
    if (feedVessel) feedVessel.textContent = 'M/V HANSAI PHOENIX (Voy. 2608S)';
    if (feedRoute) feedRoute.textContent = 'Ningbo (CNNGB) → Jakarta (IDJKT)';
    if (feedTemp) feedTemp.textContent = '-18.4°C / -18.0°C (' + (currentLanguage === 'zh' ? '运行稳定' : (currentLanguage === 'id' ? 'Stabil' : 'Stable')) + ')';
    if (feedStatus) feedStatus.textContent = currentLanguage === 'zh' ? '海上航行中 — 航期准点' : (currentLanguage === 'id' ? 'Dalam Pelayaran — Tepat Waktu' : 'Underway at Sea — On Schedule');
  }
}

function setTrackingSample(sampleId) {
  const inputEl = document.getElementById('telematics-input');
  if (inputEl) {
    inputEl.value = sampleId;
    lookupTelematics();
  }
}
