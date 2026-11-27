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
