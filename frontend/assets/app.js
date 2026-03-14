
const pages = {
  dashboard: 'nav.dashboard',
  inventory: 'inv.title',
  billing: 'bill.title',
  customers: 'cust.title',
  feedback: 'feed.title',
  clinic: 'clinic.title',
  prescription: 'rx.title',
  notifications: 'notif.title',
  analytics: 'ai.title',
  subscription: 'sub.title',
  admin: 'admin.title'
};

const I18N_STORAGE_KEY = 'digiservice.lang';
let currentLang = 'en';

const I18N = {
  en: {
    'nav.section.overview': 'Overview',
    'nav.dashboard': 'Dashboard',
    'nav.section.business': 'Business',
    'nav.inventory': 'Inventory',
    'nav.billing': 'Billing',
    'nav.customers': 'Customers',
    'nav.feedback': 'Feedback & Reviews',
    'nav.section.clinic': 'Clinic',
    'nav.clinic': 'Clinic & Appointments',
    'nav.prescription': 'Prescriptions',
    'nav.section.platform': 'Platform',
    'nav.notifications': 'Notifications',
    'nav.analytics': 'AI Analytics',
    'nav.subscription': 'Subscription',
    'nav.admin': 'Admin Panel',
    'search.placeholder': 'Search anything…',

    'dash.greeting': 'Good morning 👋',
    'dash.subtitle': 'Saturday, 14 March 2026 · Sharma Business Hub · Kunigal, Karnataka',

    'domain.title': 'Domains',
    'domain.shop': 'Shop',
    'domain.restaurant': 'Restaurant',
    'domain.clinic': 'Clinic',
    'domain.hint': 'Turn modules on/off per business type.',

    'inv.title': 'Inventory Management',
    'inv.subtitle': 'Track stock, manage products and supplier orders',
    'bill.title': 'Billing & Invoices',
    'bill.subtitle': 'Generate invoices, record payments and view sales reports',
    'cust.title': 'Customer Management',
    'cust.subtitle': 'Profiles, purchase history, loyalty programmes and analytics',
    'feed.title': 'Feedback & Reviews',
    'feed.subtitle': 'Collect, manage and analyse customer feedback',
    'clinic.title': 'Clinic & Appointments',
    'clinic.subtitle': 'Patient management, scheduling and doctor roster',
    'rx.title': 'Prescriptions',
    'rx.subtitle': 'Digital prescriptions, diagnoses and treatment notes',
    'notif.title': 'Notifications',
    'notif.subtitle': 'WhatsApp, SMS, email and appointment reminders',
    'ai.title': 'AI Analytics',
    'ai.subtitle': 'Sales prediction, inventory forecasting and business insights',
    'sub.title': 'Subscription',
    'sub.subtitle': 'Plan management, upgrades and billing cycle',
    'admin.title': 'Admin Panel',
    'admin.subtitle': 'Platform monitoring, business management and system health',

    'admin.business.title': 'Business Management',
    'admin.business.addRetail': '+ Add Shop (Retail)',
    'admin.business.help': 'Retail users can register their shop so customers can discover it nearby.',
    'shop.name': 'Shop name',
    'shop.address': 'Address / Area',
    'shop.lat': 'Latitude',
    'shop.lng': 'Longitude',
    'shop.useLocation': '📍 Use my location',
    'shop.save': 'Save Shop',
    'common.cancel': 'Cancel',
    'shop.type.retail': 'Retail',
    'shop.type.shop': 'Shop',
    'shop.type.pharmacy': 'Pharmacy',
    'shop.type.clinic': 'Clinic',
    'shop.type.restaurant': 'Restaurant',
    'shop.type.other': 'Other'
  },
  kn: {
      'domain.title': 'ಡೊಮೇನ್‌ಗಳು',
      'domain.shop': 'ಅಂಗಡಿ',
      'domain.restaurant': 'ಉಪಹಾರಗೃಹ',
      'domain.clinic': 'ಕ್ಲಿನಿಕ್',
      'domain.hint': 'ವ್ಯವಹಾರದ ಪ್ರಕಾರ ಮೋಡ್ಯೂಲ್‌ಗಳನ್ನು ಆನ್/ಆಫ್ ಮಾಡಿ.',
    'nav.section.overview': 'ಒವರ್‌ವ್ಯೂ',
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.section.business': 'ವ್ಯವಹಾರ',
    'nav.inventory': 'ಇನ್‌ವೆಂಟರಿ',
    'nav.billing': 'ಬಿಲ್ಲಿಂಗ್',
    'nav.customers': 'ಗ್ರಾಹಕರು',
    'nav.feedback': 'ಫೀಡ್ಬ್ಯಾಕ್ & ವಿಮರ್ಶೆಗಳು',
    'nav.section.clinic': 'ಕ್ಲಿನಿಕ್',
    'nav.clinic': 'ಕ್ಲಿನಿಕ್ & ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು',
    'nav.prescription': 'ಪ್ರೆಸ್ಕ್ರಿಪ್ಶನ್‌ಗಳು',
    'nav.section.platform': 'ಪ್ಲ್ಯಾಟ್ಫಾರ್ಮ್',
    'nav.notifications': 'ಅಧಿಸೂಚನೆಗಳು',
    'nav.analytics': 'AI ವಿಶ್ಲೇಷಣೆ',
    'nav.subscription': 'ಚಂದಾದಾರಿಕೆ',
    'nav.admin': 'ಆಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್',
    'search.placeholder': 'ಏನಾದರೂ ಹುಡುಕಿ…',

    'inv.title': 'ಇನ್‌ವೆಂಟರಿ ನಿರ್ವಹಣೆ',
    'inv.subtitle': 'ಸ್ಟಾಕ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಪೂರೈಕೆದಾರ ಆರ್ಡರ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
    'bill.title': 'ಬಿಲ್ಲಿಂಗ್ & ಇನ್ವಾಯ್ಸ್‌ಗಳು',
    'bill.subtitle': 'ಇನ್ವಾಯ್ಸ್ ರಚಿಸಿ, ಪಾವತಿಗಳನ್ನು ದಾಖಲಿಸಿ ಮತ್ತು ಮಾರಾಟ ವರದಿಗಳನ್ನು ನೋಡಿ',
    'cust.title': 'ಗ್ರಾಹಕ ನಿರ್ವಹಣೆ',
    'cust.subtitle': 'ಪ್ರೊಫೈಲ್‌ಗಳು, ಖರೀದಿ ಇತಿಹಾಸ, ಲಾಯಲ್ಟಿ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ',
    'feed.title': 'ಫೀಡ್ಬ್ಯಾಕ್ & ವಿಮರ್ಶೆಗಳು',
    'feed.subtitle': 'ಗ್ರಾಹಕ ಪ್ರತಿಕ್ರಿಯೆ ಸಂಗ್ರಹಿಸಿ, ನಿರ್ವಹಿಸಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ',
    'clinic.title': 'ಕ್ಲಿನಿಕ್ & ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು',
    'clinic.subtitle': 'ರೋಗಿ ನಿರ್ವಹಣೆ, ಶೆಡ್ಯೂಲಿಂಗ್ ಮತ್ತು ಡಾಕ್ಟರ್ ರೋಸ್ಟರ್',
    'rx.title': 'ಪ್ರೆಸ್ಕ್ರಿಪ್ಶನ್‌ಗಳು',
    'rx.subtitle': 'ಡಿಜಿಟಲ್ ಪ್ರೆಸ್ಕ್ರಿಪ್ಶನ್‌ಗಳು, ನಿರ್ಣಯಗಳು ಮತ್ತು ಚಿಕಿತ್ಸೆ ಟಿಪ್ಪಣಿಗಳು',
    'notif.title': 'ಅಧಿಸೂಚನೆಗಳು',
    'notif.subtitle': 'WhatsApp, SMS, ಇಮೇಲ್ ಮತ್ತು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ರಿಮೈಂಡರ್‌ಗಳು',
    'ai.title': 'AI ವಿಶ್ಲೇಷಣೆ',
    'ai.subtitle': 'ಮಾರಾಟ ಪೂರ್ವಾನುಮಾನ, ಇನ್‌ವೆಂಟರಿ ಫೋರ್‌ಕಾಸ್ಟ್ ಮತ್ತು ಒಳನೋಟಗಳು',
    'sub.title': 'ಚಂದಾದಾರಿಕೆ',
    'sub.subtitle': 'ಪ್ಲಾನ್ ನಿರ್ವಹಣೆ, ಅಪ್‌ಗ್ರೇಡ್‌ಗಳು ಮತ್ತು ಬಿಲ್ಲಿಂಗ್ ಸೈಕಲ್',
    'admin.title': 'ಆಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್',
    'admin.subtitle': 'ಪ್ಲ್ಯಾಟ್ಫಾರ್ಮ್ ಮಾನಿಟರಿಂಗ್, ಬಿಸಿನೆಸ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಸಿಸ್ಟಮ್ ಆರೋಗ್ಯ',

    'admin.business.title': 'ವ್ಯವಹಾರ ನಿರ್ವಹಣೆ',
    'admin.business.addRetail': '+ ಅಂಗಡಿ ಸೇರಿಸಿ (ರಿಟೇಲ್)',
    'admin.business.help': 'ಗ್ರಾಹಕರು ಹತ್ತಿರದಲ್ಲೇ ಹುಡುಕಲು ರಿಟೇಲ್ ಬಳಕೆದಾರರು ತಮ್ಮ ಅಂಗಡಿಯನ್ನು ನೋಂದಾಯಿಸಬಹುದು.',
    'shop.name': 'ಅಂಗಡಿಯ ಹೆಸರು',
    'shop.address': 'ವಿಳಾಸ / ಪ್ರದೇಶ',
    'shop.lat': 'ಅಕ್ಷಾಂಶ',
    'shop.lng': 'ರೇಖಾಂಶ',
    'shop.useLocation': '📍 ನನ್ನ ಸ್ಥಳ ಬಳಸಿ',
    'shop.save': 'ಅಂಗಡಿ ಉಳಿಸಿ',
    'common.cancel': 'ರದ್ದು',
    'shop.type.retail': 'ರಿಟೇಲ್',
    'shop.type.shop': 'ಅಂಗಡಿ',
    'shop.type.pharmacy': 'ಔಷಧಾಲಯ',
    'shop.type.clinic': 'ಕ್ಲಿನಿಕ್',
    'shop.type.restaurant': 'ಉಪಹಾರಗೃಹ',
    'shop.type.other': 'ಇತರೆ'
  },
  hi: {
      'domain.title': 'डोमेन',
      'domain.shop': 'दुकान',
      'domain.restaurant': 'रेस्टोरेंट',
      'domain.clinic': 'क्लिनिक',
      'domain.hint': 'व्यवसाय के प्रकार के अनुसार मॉड्यूल ऑन/ऑफ करें।',
    'nav.section.overview': 'ओवरव्यू',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.section.business': 'व्यवसाय',
    'nav.inventory': 'इन्वेंटरी',
    'nav.billing': 'बिलिंग',
    'nav.customers': 'ग्राहक',
    'nav.feedback': 'फीडबैक व रिव्यू',
    'nav.section.clinic': 'क्लिनिक',
    'nav.clinic': 'क्लिनिक व अपॉइंटमेंट',
    'nav.prescription': 'प्रिस्क्रिप्शन',
    'nav.section.platform': 'प्लेटफ़ॉर्म',
    'nav.notifications': 'नोटिफिकेशन',
    'nav.analytics': 'AI एनालिटिक्स',
    'nav.subscription': 'सब्सक्रिप्शन',
    'nav.admin': 'एडमिन पैनल',
    'search.placeholder': 'कुछ भी खोजें…',

    'inv.title': 'इन्वेंटरी प्रबंधन',
    'inv.subtitle': 'स्टॉक ट्रैक करें, प्रोडक्ट और सप्लायर ऑर्डर मैनेज करें',
    'bill.title': 'बिलिंग व इनवॉइस',
    'bill.subtitle': 'इनवॉइस बनाएं, भुगतान रिकॉर्ड करें और बिक्री रिपोर्ट देखें',
    'cust.title': 'ग्राहक प्रबंधन',
    'cust.subtitle': 'प्रोफाइल, खरीद इतिहास, लॉयल्टी और एनालिटिक्स',
    'feed.title': 'फीडबैक व रिव्यू',
    'feed.subtitle': 'ग्राहक फीडबैक एकत्र करें, प्रबंधित करें और विश्लेषण करें',
    'clinic.title': 'क्लिनिक व अपॉइंटमेंट',
    'clinic.subtitle': 'मरीज प्रबंधन, शेड्यूलिंग और डॉक्टर रोस्टर',
    'rx.title': 'प्रिस्क्रिप्शन',
    'rx.subtitle': 'डिजिटल प्रिस्क्रिप्शन, निदान और उपचार नोट्स',
    'notif.title': 'नोटिफिकेशन',
    'notif.subtitle': 'WhatsApp, SMS, ईमेल और अपॉइंटमेंट रिमाइंडर',
    'ai.title': 'AI एनालिटिक्स',
    'ai.subtitle': 'बिक्री पूर्वानुमान, इन्वेंटरी फोरकास्ट और इनसाइट्स',
    'sub.title': 'सब्सक्रिप्शन',
    'sub.subtitle': 'प्लान प्रबंधन, अपग्रेड और बिलिंग सायकल',
    'admin.title': 'एडमिन पैनल',
    'admin.subtitle': 'प्लेटफ़ॉर्म मॉनिटरिंग, व्यवसाय प्रबंधन और सिस्टम हेल्थ',

    'admin.business.title': 'व्यवसाय प्रबंधन',
    'admin.business.addRetail': '+ दुकान जोड़ें (रिटेल)',
    'admin.business.help': 'ग्राहक पास में खोज सकें, इसके लिए रिटेल यूज़र अपनी दुकान रजिस्टर कर सकते हैं।',
    'shop.name': 'दुकान का नाम',
    'shop.address': 'पता / क्षेत्र',
    'shop.lat': 'अक्षांश',
    'shop.lng': 'देशांतर',
    'shop.useLocation': '📍 मेरी लोकेशन उपयोग करें',
    'shop.save': 'दुकान सेव करें',
    'common.cancel': 'रद्द करें',
    'shop.type.retail': 'रिटेल',
    'shop.type.shop': 'दुकान',
    'shop.type.pharmacy': 'फार्मेसी',
    'shop.type.clinic': 'क्लिनिक',
    'shop.type.restaurant': 'रेस्टोरेंट',
    'shop.type.other': 'अन्य'
  },
  ta: {
      'domain.title': 'டொமைன்கள்',
      'domain.shop': 'கடை',
      'domain.restaurant': 'உணவகம்',
      'domain.clinic': 'கிளினிக்',
      'domain.hint': 'வணிக வகைக்கு ஏற்ப மாட்யூல்களை ஆன்/ஆஃப் செய்யவும்.',
    'nav.section.overview': 'மேலோட்டம்',
    'nav.dashboard': 'டாஷ்போர்ட்',
    'nav.section.business': 'வணிகம்',
    'nav.inventory': 'சரக்கு',
    'nav.billing': 'பில்லிங்',
    'nav.customers': 'வாடிக்கையாளர்கள்',
    'nav.feedback': 'பின்னூட்டம் & மதிப்பீடுகள்',
    'nav.section.clinic': 'கிளினிக்',
    'nav.clinic': 'கிளினிக் & நேரம்காணல்',
    'nav.prescription': 'மருந்துச்சீட்டுகள்',
    'nav.section.platform': 'தளம்',
    'nav.notifications': 'அறிவிப்புகள்',
    'nav.analytics': 'AI பகுப்பாய்வு',
    'nav.subscription': 'சந்தா',
    'nav.admin': 'நிர்வாக பலகம்',
    'search.placeholder': 'எதையும் தேடுங்கள்…',

    'inv.title': 'சரக்கு மேலாண்மை',
    'inv.subtitle': 'கையிருப்பை கண்காணிக்கவும், தயாரிப்புகள் & சப்ளையர் ஆர்டர்களை நிர்வகிக்கவும்',
    'bill.title': 'பில்லிங் & ரசீதுகள்',
    'bill.subtitle': 'ரசீது உருவாக்கவும், கட்டணங்களை பதிவு செய்யவும், விற்பனை அறிக்கைகளை பார்க்கவும்',
    'cust.title': 'வாடிக்கையாளர் மேலாண்மை',
    'cust.subtitle': 'சுயவிவரம், வாங்கிய வரலாறு, நம்பிக்கை திட்டங்கள் & பகுப்பாய்வு',
    'feed.title': 'பின்னூட்டம் & மதிப்பீடுகள்',
    'feed.subtitle': 'வாடிக்கையாளர் கருத்தை சேகரித்து, நிர்வகித்து, பகுப்பாய்வு செய்யவும்',
    'clinic.title': 'கிளினிக் & நேரம்காணல்',
    'clinic.subtitle': 'நோயாளர் மேலாண்மை, நேர அட்டவணை & மருத்துவர் ரோஸ்டர்',
    'rx.title': 'மருந்துச்சீட்டுகள்',
    'rx.subtitle': 'டிஜிட்டல் மருந்துச்சீட்டுகள், நோயறிதல் & சிகிச்சை குறிப்புகள்',
    'notif.title': 'அறிவிப்புகள்',
    'notif.subtitle': 'WhatsApp, SMS, மின்னஞ்சல் & நேரம்காணல் நினைவூட்டல்கள்',
    'ai.title': 'AI பகுப்பாய்வு',
    'ai.subtitle': 'விற்பனை கணிப்பு, சரக்கு முன்னறிவு & வணிக உள்ளுணர்வுகள்',
    'sub.title': 'சந்தா',
    'sub.subtitle': 'திட்ட மேலாண்மை, மேம்படுத்தல் & பில்லிங் சுழற்சி',
    'admin.title': 'நிர்வாக பலகம்',
    'admin.subtitle': 'தளம் கண்காணிப்பு, வணிக மேலாண்மை & அமைப்பு நிலை',

    'admin.business.title': 'வணிக மேலாண்மை',
    'admin.business.addRetail': '+ கடை சேர்க்க (ரிட்டெயில்)',
    'admin.business.help': 'வாடிக்கையாளர்கள் அருகில் கண்டுபிடிக்க, ரிட்டெயில் பயனர்கள் தங்கள் கடையை பதிவு செய்யலாம்.',
    'shop.name': 'கடை பெயர்',
    'shop.address': 'முகவரி / பகுதி',
    'shop.lat': 'அட்சரேகை',
    'shop.lng': 'தீர்க்கரேகை',
    'shop.useLocation': '📍 என் இடத்தைப் பயன்படுத்து',
    'shop.save': 'கடை சேமிக்க',
    'common.cancel': 'ரத்து',
    'shop.type.retail': 'ரிட்டெயில்',
    'shop.type.shop': 'கடை',
    'shop.type.pharmacy': 'மருந்தகம்',
    'shop.type.clinic': 'கிளினிக்',
    'shop.type.restaurant': 'உணவகம்',
    'shop.type.other': 'மற்றவை'
  }
};

const DOMAINS_STORAGE_KEY = 'digiservice.domains';
const DOMAIN_KEYS = ['shop', 'restaurant', 'clinic'];
let enabledDomains = new Set(DOMAIN_KEYS);

function getStoredDomains() {
  try {
    const raw = localStorage.getItem(DOMAINS_STORAGE_KEY);
    if (!raw) return DOMAIN_KEYS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DOMAIN_KEYS;
    const cleaned = parsed.filter((d) => DOMAIN_KEYS.includes(d));
    return cleaned.length ? cleaned : DOMAIN_KEYS;
  } catch {
    return DOMAIN_KEYS;
  }
}

function storeDomains(domains) {
  localStorage.setItem(DOMAINS_STORAGE_KEY, JSON.stringify(domains));
}

function isDomainEnabled(key) {
  return enabledDomains.has(key);
}

function updateBizHeader() {
  const typeEl = document.getElementById('biz-type');
  if (!typeEl) return;
  const labels = [];
  DOMAIN_KEYS.forEach((k) => {
    if (isDomainEnabled(k)) labels.push(t(`domain.${k}`) || k);
  });
  typeEl.textContent = `${t('domain.title') || 'Domains'}: ${labels.join(' • ')}`;
}

function applyDomains(domains) {
  enabledDomains = new Set(domains);

  // Sync checkboxes
  const shopCb = document.getElementById('domain-shop');
  const restCb = document.getElementById('domain-restaurant');
  const clinicCb = document.getElementById('domain-clinic');
  if (shopCb) shopCb.checked = isDomainEnabled('shop');
  if (restCb) restCb.checked = isDomainEnabled('restaurant');
  if (clinicCb) clinicCb.checked = isDomainEnabled('clinic');

  // Toggle clinic module UI
  document.querySelectorAll('[data-module="clinic"]').forEach((el) => {
    el.style.display = isDomainEnabled('clinic') ? '' : 'none';
  });

  // If user is on a hidden page, bounce to dashboard
  const activePage = getActivePage();
  if (activePage) {
    const activeContent = document.getElementById('content-' + activePage);
    const moduleKey = activeContent ? activeContent.getAttribute('data-module') : null;
    if (moduleKey === 'clinic' && !isDomainEnabled('clinic')) {
      show('dashboard');
    }
  }

  updateBizHeader();
}

function setDomainFromCheckbox(key, checked) {
  if (!DOMAIN_KEYS.includes(key)) return;
  const domains = new Set(getStoredDomains());
  if (checked) domains.add(key);
  else domains.delete(key);
  const next = Array.from(domains);
  if (next.length === 0) return; // keep at least one domain
  storeDomains(next);
  applyDomains(next);
}

function toggleDomainMenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const menu = document.getElementById('domain-menu');
  if (!menu) return;
  const open = menu.style.display !== 'none' && menu.style.display !== '';
  menu.style.display = open ? 'none' : 'block';
}

function closeDomainMenu() {
  const menu = document.getElementById('domain-menu');
  if (!menu) return;
  menu.style.display = 'none';
}

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en && I18N.en[key]) || null;
}

function getActivePage() {
  const active = document.querySelector('.content.active');
  if (active && active.id && active.id.startsWith('content-')) return active.id.slice('content-'.length);
  return null;
}

function updatePageTitle(page) {
  const key = pages[page];
  const label = (key && t(key)) || page;
  const titleEl = document.getElementById('page-title');
  const bcEl = document.getElementById('page-bc');
  if (titleEl) titleEl.textContent = label;
  if (bcEl) bcEl.textContent = label;
}

function applyLanguage(lang) {
  currentLang = I18N[lang] ? lang : 'en';
  document.documentElement.setAttribute('lang', currentLang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = key ? t(key) : null;
    if (val != null) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const val = key ? t(key) : null;
    if (val != null) el.setAttribute('placeholder', val);
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });

  const activePage = getActivePage();
  if (activePage) updatePageTitle(activePage);
}

function getStoredLanguage() {
  const stored = localStorage.getItem(I18N_STORAGE_KEY);
  if (stored && I18N[stored]) return stored;
  return 'en';
}

function show(page) {
  // Auth/role guard
  if (!currentUser) {
    showLoginScreen();
    return;
  }
  if (!isPageAllowed(page)) {
    page = getDefaultPageForRole(currentUser.role);
  }

  const target = document.getElementById('content-' + page);
  if (target) {
    const moduleKey = target.getAttribute('data-module');
    if (moduleKey === 'clinic' && !isDomainEnabled('clinic')) {
      page = 'dashboard';
    }
  }

  if (!isPageAllowed(page)) {
    page = getDefaultPageForRole(currentUser.role);
  }

  document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const content = document.getElementById('content-' + page);
  if (content) content.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(el => {
    if (el.getAttribute('onclick') && el.getAttribute('onclick').includes("'" + page + "'")) {
      el.classList.add('active');
    }
  });
  updatePageTitle(page);

  if (page === 'admin') {
    loadBusinesses();
  }
}

function setLang(btn, lang) {
  const selected = lang || (btn ? btn.getAttribute('data-lang') : null) || 'en';
  localStorage.setItem(I18N_STORAGE_KEY, selected);
  applyLanguage(selected);
  updateBizHeader();
}

function filterTable(val, tbodyId) {
  const rows = document.querySelectorAll('#' + tbodyId + ' tr');
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(val.toLowerCase()) ? '' : 'none';
  });
}

// Draw revenue bar chart
function drawRevChart() {
  const wrap = document.getElementById('revenue-chart');
  if (!wrap) return;
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const vals = [82, 94, 105, 142, 118, 124, 79];
  const max = Math.max(...vals);
  wrap.innerHTML = days.map((d,i) => `
    <div class="bar-col" title="${d}: ₹${vals[i]}K">
      <div class="bar-fill ${i===3?'green':''}" style="height:${Math.round((vals[i]/max)*72)}px"></div>
      <div class="bar-label">${d}</div>
    </div>`).join('');
}

// Draw forecast chart
function drawForecast() {
  const wrap = document.getElementById('forecast-chart');
  if (!wrap) return;
  const vals = [95,102,88,115,124,108,132,119,140,128,145,138,122,130,148,135,152,144,158,150,162,155,170,162,168,175,180,172,185,190];
  const max = Math.max(...vals);
  wrap.style.gap = '3px';
  wrap.innerHTML = vals.map((v,i) => `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center">
      <div style="width:100%;border-radius:3px 3px 0 0;background:${i<14?'var(--accent)':'var(--surface2)'};height:${Math.round((v/max)*90)}px;opacity:${i<14?'0.7':'0.4'}"></div>
    </div>`).join('');
}

drawRevChart();
setTimeout(drawForecast, 100);

// ───────────────────────── UPI QR SCAN (Camera) ─────────────────────────
let upiStream = null;
let upiScanTimer = null;

function setUpiStatus(text) {
  const el = document.getElementById('upi-scan-status');
  if (el) el.textContent = text;
}

function setUpiResult(html) {
  const el = document.getElementById('upi-scan-result');
  if (el) el.innerHTML = html || '';
}

function parseUpiUri(text) {
  try {
    if (!text) return null;
    if (!text.toLowerCase().startsWith('upi://')) return { raw: text };
    const url = new URL(text);
    const params = new URLSearchParams(url.search);
    return {
      raw: text,
      pa: params.get('pa') || '',
      pn: params.get('pn') || '',
      am: params.get('am') || '',
      tn: params.get('tn') || '',
      tr: params.get('tr') || ''
    };
  } catch {
    return { raw: text };
  }
}

async function startUpiScan() {
  const videoWrap = document.getElementById('upi-video-wrap');
  const video = document.getElementById('upi-video');
  const stopBtn = document.getElementById('upi-stop-btn');
  const startBtn = document.getElementById('upi-scan-btn');

  setUpiResult('');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    setUpiStatus('Camera not supported in this browser');
    return;
  }
  if (!('BarcodeDetector' in window)) {
    setUpiStatus('QR scanning not supported (BarcodeDetector missing)');
    setUpiResult('Tip: Try Chrome/Edge on mobile/desktop.');
    return;
  }

  try {
    setUpiStatus('Requesting camera permission…');
    upiStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false
    });

    if (videoWrap) videoWrap.style.display = '';
    if (video) {
      video.srcObject = upiStream;
      await video.play();
    }
    if (stopBtn) stopBtn.style.display = '';
    if (startBtn) startBtn.disabled = true;

    const detector = new BarcodeDetector({ formats: ['qr_code'] });
    setUpiStatus('Scanning… point camera at UPI QR');

    // Throttled scan loop.
    upiScanTimer = setInterval(async () => {
      try {
        if (!video || video.readyState < 2) return;
        const codes = await detector.detect(video);
        if (!codes || !codes.length) return;
        const raw = (codes[0] && codes[0].rawValue) ? codes[0].rawValue : '';
        const parsed = parseUpiUri(raw);
        stopUpiScan();
        setUpiStatus('QR detected');
        if (parsed && parsed.pa) {
          setUpiResult(
            `<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px">
              <div style="font-size:11px;color:var(--text3);margin-bottom:6px">UPI Details</div>
              <div style="display:flex;flex-direction:column;gap:4px">
                <div><span style="color:var(--text3)">VPA:</span> <span style="color:var(--text)">${parsed.pa}</span></div>
                ${parsed.pn ? `<div><span style="color:var(--text3)">Name:</span> <span style="color:var(--text)">${parsed.pn}</span></div>` : ''}
                ${parsed.am ? `<div><span style="color:var(--text3)">Amount:</span> <span style="color:var(--text)">₹${parsed.am}</span></div>` : ''}
                ${parsed.tn ? `<div><span style="color:var(--text3)">Note:</span> <span style="color:var(--text)">${parsed.tn}</span></div>` : ''}
              </div>
              <div style="margin-top:8px;font-size:11px;color:var(--text3);word-break:break-all">${parsed.raw}</div>
            </div>`
          );
        } else {
          setUpiResult(
            `<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px">
              <div style="font-size:11px;color:var(--text3);margin-bottom:6px">QR Content</div>
              <div style="color:var(--text);word-break:break-all">${(parsed && parsed.raw) ? parsed.raw : raw}</div>
            </div>`
          );
        }
      } catch {
        // keep scanning
      }
    }, 350);
  } catch (e) {
    setUpiStatus('Camera permission denied or unavailable');
    setUpiResult('<div style="margin-top:6px;color:var(--text3)">Allow camera access to scan UPI QR codes.</div>');
    // eslint-disable-next-line no-console
    console.warn(e);
  }
}

function stopUpiScan() {
  const videoWrap = document.getElementById('upi-video-wrap');
  const video = document.getElementById('upi-video');
  const stopBtn = document.getElementById('upi-stop-btn');
  const startBtn = document.getElementById('upi-scan-btn');

  if (upiScanTimer) {
    clearInterval(upiScanTimer);
    upiScanTimer = null;
  }
  if (video) {
    try { video.pause(); } catch {}
    video.srcObject = null;
  }
  if (upiStream) {
    try { upiStream.getTracks().forEach(t => t.stop()); } catch {}
    upiStream = null;
  }
  if (videoWrap) videoWrap.style.display = 'none';
  if (stopBtn) stopBtn.style.display = 'none';
  if (startBtn) startBtn.disabled = false;
  if (document.getElementById('upi-scan-status') && document.getElementById('upi-scan-status').textContent === 'Scanning… point camera at UPI QR') {
    setUpiStatus('Idle');
  }
}

// ───────────────────── Nearby Shops (Location) ─────────────────────
function setShopsStatus(text) {
  const el = document.getElementById('shops-status');
  if (el) el.textContent = text;
}

function renderShops(list) {
  const wrap = document.getElementById('shops-list');
  if (!wrap) return;
  if (!list || !list.length) {
    wrap.innerHTML = '<div style="font-size:12px;color:var(--text3)">No shops found nearby.</div>';
    return;
  }
  wrap.innerHTML = list.map(s => `
    <div class="appt-item" style="cursor:default">
      <div class="biz-dot" style="background:linear-gradient(135deg,#10B981,#06B6D4)">🏪</div>
      <div class="appt-info">
        <div class="appt-name">${s.name}</div>
        <div class="appt-meta">${s.address || ''}</div>
      </div>
      <span class="badge info">${typeof s.distanceKm === 'number' ? s.distanceKm.toFixed(1) + ' km' : ''}</span>
    </div>
  `).join('');
}

async function findNearbyShops() {
  if (!navigator.geolocation) {
    setShopsStatus('Location not supported');
    return;
  }

  setShopsStatus('Requesting location permission…');

  navigator.geolocation.getCurrentPosition(async (pos) => {
    try {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setShopsStatus(`Fetching nearby shops…`);
      const res = await fetch(`/api/shops/nearby?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}&limit=5`);
      if (!res.ok) throw new Error('Request failed');
      const json = await res.json();
      renderShops(json && json.shops ? json.shops : []);
      setShopsStatus('Done');
    } catch {
      setShopsStatus('Failed to fetch shops');
      renderShops([]);
    }
  }, () => {
    setShopsStatus('Location permission denied');
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 60000
  });
}

// ───────────────────── Admin: Retail shop registration ─────────────────────

function toggleAddShopForm(forceOpen) {
  const form = document.getElementById('add-shop-form');
  if (!form) return;
  const shouldOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : (form.style.display === 'none' || form.style.display === '');
  form.style.display = shouldOpen ? 'block' : 'none';
  const status = document.getElementById('shop-form-status');
  if (status) status.textContent = '';
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatInr(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return '';
  return `₹${n.toLocaleString('en-IN')}`;
}

function badgeForStatus(status) {
  const s = String(status || '').toLowerCase();
  if (s === 'paid' || s === 'in stock') return 'success';
  if (s === 'pending' || s === 'low') return 'warning';
  if (s === 'overdue' || s.includes('low')) return 'danger';
  return 'info';
}

// ───────────────────── Inventory: Products ─────────────────────

function toggleAddProductForm(forceOpen) {
  const form = document.getElementById('add-product-form');
  if (!form) return;
  const shouldOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : (form.style.display === 'none' || form.style.display === '');
  form.style.display = shouldOpen ? 'block' : 'none';
  const status = document.getElementById('prod-form-status');
  if (status) status.textContent = '';
}

function stockLevelPct(stockNumber) {
  const n = Number(stockNumber);
  if (!Number.isFinite(n) || n <= 0) return 0;
  // simple heuristic: 0..100 mapped using 0..200 units.
  return Math.max(0, Math.min(100, Math.round((n / 200) * 100)));
}

function stockBarHtml(pct) {
  const p = Math.max(0, Math.min(100, Number(pct) || 0));
  let color = 'var(--green)';
  if (p < 15) color = 'var(--coral)';
  else if (p < 35) color = 'var(--amber)';
  return `<div class="stock-bar"><div class="stock-fill" style="width:${p}%;background:${color}"></div></div>`;
}

async function loadProducts() {
  const body = document.getElementById('inv-body');
  if (!body) return;
  try {
    const res = await fetch('/api/products?limit=200');
    if (!res.ok) throw new Error('failed');
    const json = await res.json();
    const products = Array.isArray(json && json.products) ? json.products : [];
    if (products.length === 0) {
      body.innerHTML = '<tr><td colspan="7" style="color:var(--text3);padding:14px 0">No products yet.</td></tr>';
      return;
    }

    body.innerHTML = products.map((p) => {
      const name = escapeHtml(p.name || '');
      const category = escapeHtml(p.category || '');
      const stockText = escapeHtml(p.stockText || (Number.isFinite(p.stockQty) ? `${p.stockQty} units` : ''));
      const unitPrice = Number.isFinite(p.unitPriceInr) ? `₹${Number(p.unitPriceInr).toFixed(2)}` : '';
      const supplier = escapeHtml(p.supplier || '');
      const statusText = escapeHtml(p.status || '');
      const badge = badgeForStatus(statusText);
      const pct = Number.isFinite(p.levelPct) ? p.levelPct : stockLevelPct(p.stockQty);
      return `<tr><td>${name}</td><td>${category}</td><td>${stockText}</td><td>${stockBarHtml(pct)}</td><td>${unitPrice}</td><td>${supplier}</td><td><span class="badge ${badge}">${statusText || '—'}</span></td></tr>`;
    }).join('');
  } catch {
    // ignore; keep sample
  }
}

async function submitProduct() {
  const status = document.getElementById('prod-form-status');
  const name = (document.getElementById('prod-name') || {}).value ? document.getElementById('prod-name').value.trim() : '';
  const category = (document.getElementById('prod-category') || {}).value || 'Other';
  const stockQty = Number((document.getElementById('prod-stock') || {}).value);
  const unitPriceInr = Number((document.getElementById('prod-price') || {}).value);
  const supplier = (document.getElementById('prod-supplier') || {}).value ? document.getElementById('prod-supplier').value.trim() : '';

  if (!name) {
    if (status) status.textContent = 'Please enter product name.';
    return;
  }

  if (status) status.textContent = 'Saving…';
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, category, stockQty, unitPriceInr, supplier })
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json && json.message) || 'Failed');
    if (status) status.textContent = 'Saved.';
    toggleAddProductForm(false);
    await loadProducts();
  } catch (e) {
    if (status) status.textContent = e && e.message ? e.message : 'Failed to save.';
  }
}

// ───────────────────── Billing: Invoices ─────────────────────

function toggleNewInvoiceForm(forceOpen) {
  const form = document.getElementById('new-invoice-form');
  if (!form) return;
  const shouldOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : (form.style.display === 'none' || form.style.display === '');
  form.style.display = shouldOpen ? 'block' : 'none';
  const status = document.getElementById('inv-form-status');
  if (status) status.textContent = '';
}

function invoiceRowHtml(inv) {
  const id = escapeHtml(inv.id || '');
  const customer = escapeHtml(inv.customer || '');
  const date = escapeHtml(inv.date || '');
  const amount = formatInr(inv.amountInr);
  const tax = formatInr(inv.taxInr);
  const payment = escapeHtml(inv.payment || '—');
  const statusText = escapeHtml(inv.status || '');
  const badge = badgeForStatus(statusText);
  const actionLabel = (String(inv.status || '').toLowerCase() === 'pending') ? 'Send' : 'View';
  const actionClass = (String(inv.status || '').toLowerCase() === 'pending') ? 'appt-btn primary' : 'appt-btn';
  return `<tr><td>${id}</td><td>${customer}</td><td>${date}</td><td>${amount}</td><td>${tax}</td><td>${payment}</td><td><span class="badge ${badge}">${statusText || '—'}</span></td><td><button class="${actionClass}">${actionLabel}</button></td></tr>`;
}

async function loadInvoices() {
  const body = document.getElementById('inv-list-body');
  if (!body) return;

  try {
    const res = await fetch('/api/invoices?limit=50');
    if (!res.ok) throw new Error('failed');
    const json = await res.json();
    const invoices = Array.isArray(json && json.invoices) ? json.invoices : [];
    if (invoices.length === 0) {
      body.innerHTML = '<tr><td colspan="8" style="color:var(--text3);padding:14px 0">No invoices yet.</td></tr>';
      return;
    }
    body.innerHTML = invoices.map(invoiceRowHtml).join('');
  } catch {
    // ignore
  }
}

async function submitInvoice() {
  const statusEl = document.getElementById('inv-form-status');
  const customer = (document.getElementById('inv-customer') || {}).value ? document.getElementById('inv-customer').value.trim() : '';
  const amountInr = Number((document.getElementById('inv-amount') || {}).value);
  const taxInr = Number((document.getElementById('inv-tax') || {}).value);
  const payment = (document.getElementById('inv-payment') || {}).value || '—';
  const status = (document.getElementById('inv-status') || {}).value || 'Pending';

  if (!customer) {
    if (statusEl) statusEl.textContent = 'Please enter customer name.';
    return;
  }
  if (!Number.isFinite(amountInr) || amountInr <= 0) {
    if (statusEl) statusEl.textContent = 'Please enter a valid amount.';
    return;
  }
  if (!Number.isFinite(taxInr) || taxInr < 0) {
    if (statusEl) statusEl.textContent = 'Please enter valid tax.';
    return;
  }

  if (statusEl) statusEl.textContent = 'Saving…';
  try {
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer, amountInr, taxInr, payment, status })
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json && json.message) || 'Failed');
    if (statusEl) statusEl.textContent = 'Saved.';
    toggleNewInvoiceForm(false);
    await loadInvoices();
  } catch (e) {
    if (statusEl) statusEl.textContent = e && e.message ? e.message : 'Failed to save.';
  }
}

// ───────────────────── Customers: Customer list ─────────────────────

function toggleAddCustomerForm(forceOpen) {
  const form = document.getElementById('add-customer-form');
  if (!form) return;
  const shouldOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : (form.style.display === 'none' || form.style.display === '');
  form.style.display = shouldOpen ? 'block' : 'none';
  const status = document.getElementById('cust-form-status');
  if (status) status.textContent = '';
}

function customerRowHtml(c) {
  const name = escapeHtml(c.name || '');
  const phone = escapeHtml(c.phone || '');
  const visits = Number.isFinite(c.visits) ? String(c.visits) : '0';
  const totalSpentInr = formatInr(c.totalSpentInr);
  const points = Number.isFinite(c.loyaltyPoints) ? `${c.loyaltyPoints} pts` : '0 pts';
  const pct = Math.max(0, Math.min(100, Number(c.progressPct) || 0));
  const segment = escapeHtml(c.segment || 'New');
  const segBadge = (segment.toLowerCase() === 'premium') ? 'purple' : (segment.toLowerCase() === 'regular') ? 'info' : 'success';
  return `<tr><td>${name}</td><td>${phone}</td><td>${visits}</td><td>${totalSpentInr}</td><td>${points}</td><td><div class="loyalty-bar" style="width:80px"><div class="loyalty-fill" style="width:${pct}%"></div></div></td><td><span class="badge ${segBadge}">${segment}</span></td></tr>`;
}

async function loadCustomersList() {
  const body = document.getElementById('cust-body');
  if (!body) return;
  try {
    const res = await fetch('/api/customers/list?limit=200');
    if (!res.ok) throw new Error('failed');
    const json = await res.json();
    const customers = Array.isArray(json && json.customers) ? json.customers : [];
    if (customers.length === 0) {
      body.innerHTML = '<tr><td colspan="7" style="color:var(--text3);padding:14px 0">No customers yet.</td></tr>';
      return;
    }
    body.innerHTML = customers.map(customerRowHtml).join('');
  } catch {
    // ignore
  }
}

async function submitCustomer() {
  const statusEl = document.getElementById('cust-form-status');
  const name = (document.getElementById('cust-name') || {}).value ? document.getElementById('cust-name').value.trim() : '';
  const phone = (document.getElementById('cust-phone') || {}).value ? document.getElementById('cust-phone').value.trim() : '';
  const segment = (document.getElementById('cust-segment') || {}).value || 'New';

  if (!name) {
    if (statusEl) statusEl.textContent = 'Please enter name.';
    return;
  }
  if (!phone) {
    if (statusEl) statusEl.textContent = 'Please enter phone.';
    return;
  }

  if (statusEl) statusEl.textContent = 'Saving…';
  try {
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, segment })
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json && json.message) || 'Failed');
    if (statusEl) statusEl.textContent = 'Saved.';
    toggleAddCustomerForm(false);
    await loadCustomersList();
  } catch (e) {
    if (statusEl) statusEl.textContent = e && e.message ? e.message : 'Failed to save.';
  }
}

// ───────────────────── Auth + Role UI ─────────────────────

let currentUser = null;
let allowedPages = null;

function setVisible(elOrId, visible) {
  const el = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
  if (!el) return;
  el.style.display = visible ? '' : 'none';
}

function setLoginStatus(text) {
  const el = document.getElementById('login-status');
  if (el) el.textContent = text || '';
}

function showLoginScreen() {
  const login = document.getElementById('login-screen');
  const app = document.querySelector('.app');
  if (login) login.style.display = '';
  if (app) app.style.display = 'none';
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.style.display = 'none';
}

function showAppScreen() {
  const login = document.getElementById('login-screen');
  const app = document.querySelector('.app');
  if (login) login.style.display = 'none';
  if (app) app.style.display = '';
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.style.display = '';
}

function getDefaultPageForRole(role) {
  if (role === 'user') return 'customers';
  if (role === 'shopkeeper') return 'inventory';
  return 'dashboard';
}

function isPageAllowed(page) {
  if (!currentUser) return false;
  if (!allowedPages) return true;
  return allowedPages.has(page);
}

function applyRoleUI(role) {
  if (role === 'admin') {
    allowedPages = new Set(Object.keys(pages));
  } else if (role === 'shopkeeper') {
    allowedPages = new Set(['inventory']);
  } else {
    allowedPages = new Set(['customers']);
  }

  // Dashboard nav has no ID in HTML; hide/show by onclick target.
  document.querySelectorAll('.nav-item').forEach((el) => {
    const oc = el.getAttribute('onclick') || '';
    if (oc.includes("show('dashboard')") || oc.includes('show(\'dashboard\')')) {
      el.style.display = role === 'admin' ? '' : 'none';
    }
  });

  // Nav visibility
  setVisible('nav-inventory', allowedPages.has('inventory'));
  setVisible('nav-billing', allowedPages.has('billing'));
  setVisible('nav-customers', allowedPages.has('customers'));
  setVisible('nav-feedback', allowedPages.has('feedback'));
  setVisible('nav-clinic', allowedPages.has('clinic'));
  setVisible('nav-prescription', allowedPages.has('prescription'));
  setVisible('nav-notifications', allowedPages.has('notifications'));
  setVisible('nav-analytics', allowedPages.has('analytics'));
  setVisible('nav-subscription', allowedPages.has('subscription'));
  setVisible('nav-admin', allowedPages.has('admin'));

  // Action buttons visibility
  setVisible('btn-add-product', role === 'admin' || role === 'shopkeeper');
  setVisible('btn-new-invoice', role === 'admin' || role === 'shopkeeper');
  setVisible('btn-add-customer', role === 'admin');

  // Panels
  setVisible('orders-panel', role === 'admin' || role === 'shopkeeper');
  setVisible('user-order-panel', role === 'user');
  setVisible('my-orders-panel', role === 'user');

  // Customers page: for end-user keep only ordering panels
  const customersContent = document.getElementById('content-customers');
  if (customersContent) {
    const toolbar = customersContent.querySelector('.toolbar');
    if (toolbar) toolbar.style.display = role === 'user' ? 'none' : '';

    // Add customer form is admin-only
    setVisible('add-customer-form', role === 'admin');

    const shopsCard = customersContent.querySelector('#shops-status')?.closest('.card');
    if (shopsCard) shopsCard.style.display = role === 'user' ? 'none' : '';

    const customerListCard = customersContent.querySelector('#cust-body')?.closest('.card');
    if (customerListCard) customerListCard.style.display = role === 'user' ? 'none' : '';
  }
}

async function refreshDataForRole(role) {
  if (role === 'admin') {
    await Promise.allSettled([loadProducts(), loadInvoices(), loadCustomersList(), loadOrdersAll()]);
  } else if (role === 'shopkeeper') {
    await Promise.allSettled([loadProducts(), loadOrdersAll()]);
  } else {
    await Promise.allSettled([loadOrderProductsSelect(), loadMyOrders()]);
  }
}

async function initAuth() {
  try {
    const res = await fetch('/api/auth/me');
    const json = await res.json();
    if (json && json.ok && json.user) {
      currentUser = json.user;
      showAppScreen();
      applyRoleUI(currentUser.role);
      await refreshDataForRole(currentUser.role);
      show(getDefaultPageForRole(currentUser.role));
      return;
    }
  } catch {
    // ignore
  }

  currentUser = null;
  showLoginScreen();
}

async function doLogin() {
  const role = (document.getElementById('login-role') || {}).value || 'user';
  const username = (document.getElementById('login-username') || {}).value ? document.getElementById('login-username').value.trim() : '';
  const password = (document.getElementById('login-password') || {}).value || '';

  if (!username || !password) {
    setLoginStatus('Enter username and password.');
    return;
  }

  setLoginStatus('Logging in…');
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, username, password })
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !(json && json.ok)) throw new Error('Invalid credentials');

    currentUser = json.user;
    setLoginStatus('');
    showAppScreen();
    applyRoleUI(currentUser.role);
    await refreshDataForRole(currentUser.role);
    show(getDefaultPageForRole(currentUser.role));
  } catch (e) {
    setLoginStatus(e && e.message ? e.message : 'Login failed');
  }
}

async function logout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch {
    // ignore
  }
  currentUser = null;
  showLoginScreen();
}

// ───────────────────── Orders UI ─────────────────────

let orderProductsMap = new Map();

async function loadOrderProductsSelect() {
  const sel = document.getElementById('order-product');
  if (!sel) return;
  sel.innerHTML = '';
  orderProductsMap = new Map();

  try {
    const res = await fetch('/api/products?limit=200');
    if (!res.ok) throw new Error('failed');
    const json = await res.json();
    const products = Array.isArray(json && json.products) ? json.products : [];

    if (products.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'No products available';
      sel.appendChild(opt);
      return;
    }

    products.forEach((p) => {
      const id = p.id || p._id;
      const name = p.name || '';
      if (!id) return;
      orderProductsMap.set(id, name);
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = `${name}${p.category ? ' (' + p.category + ')' : ''}`;
      sel.appendChild(opt);
    });
  } catch {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Failed to load products';
    sel.appendChild(opt);
  }
}

function setOrderStatus(text) {
  const el = document.getElementById('order-status');
  if (el) el.textContent = text || '';
}

async function submitOrder() {
  const productId = (document.getElementById('order-product') || {}).value || '';
  const qty = Number((document.getElementById('order-qty') || {}).value);
  const address = (document.getElementById('order-address') || {}).value ? document.getElementById('order-address').value.trim() : '';
  const productName = orderProductsMap.get(productId) || '';

  if (!productId) {
    setOrderStatus('Select a product.');
    return;
  }
  if (!Number.isFinite(qty) || qty <= 0) {
    setOrderStatus('Enter valid quantity.');
    return;
  }
  if (!address) {
    setOrderStatus('Enter address.');
    return;
  }

  setOrderStatus('Placing order…');
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, productName, qty, address })
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((json && json.message) || 'Failed');
    setOrderStatus('Order placed.');
    const qtyEl = document.getElementById('order-qty');
    const addrEl = document.getElementById('order-address');
    if (qtyEl) qtyEl.value = '';
    if (addrEl) addrEl.value = '';
    await loadMyOrders();
  } catch (e) {
    setOrderStatus(e && e.message ? e.message : 'Failed to place order.');
  }
}

async function loadMyOrders() {
  const wrap = document.getElementById('my-orders-list');
  if (!wrap) return;
  wrap.innerHTML = '<div style="font-size:12px;color:var(--text3)">Loading…</div>';

  try {
    const res = await fetch('/api/orders/my?limit=50');
    if (!res.ok) throw new Error('failed');
    const json = await res.json();
    const orders = Array.isArray(json && json.orders) ? json.orders : [];
    if (orders.length === 0) {
      wrap.innerHTML = '<div style="font-size:12px;color:var(--text3)">No orders yet.</div>';
      return;
    }

    wrap.innerHTML = orders.map((o) => {
      const id = escapeHtml(o._id || o.id || '');
      const product = escapeHtml(o.productName || o.productId || '');
      const qty = escapeHtml(o.qty);
      const status = escapeHtml(o.status || 'Pending');
      const badge = badgeForStatus(status);
      return `
        <div class="appt-item" style="cursor:default">
          <div class="biz-dot" style="background:linear-gradient(135deg,#5C7CFA,#10B981)">🧾</div>
          <div class="appt-info">
            <div class="appt-name">${product} × ${qty}</div>
            <div class="appt-meta">Order: ${id}</div>
          </div>
          <span class="badge ${badge}">${status}</span>
        </div>
      `;
    }).join('');
  } catch {
    wrap.innerHTML = '<div style="font-size:12px;color:var(--text3)">Failed to load orders.</div>';
  }
}

async function loadOrdersAll() {
  const body = document.getElementById('orders-body');
  if (!body) return;
  body.innerHTML = '<tr><td colspan="6" style="color:var(--text3);padding:14px 0">Loading…</td></tr>';

  try {
    const res = await fetch('/api/orders?limit=100');
    if (!res.ok) throw new Error('failed');
    const json = await res.json();
    const orders = Array.isArray(json && json.orders) ? json.orders : [];
    if (orders.length === 0) {
      body.innerHTML = '<tr><td colspan="6" style="color:var(--text3);padding:14px 0">No orders yet.</td></tr>';
      return;
    }

    body.innerHTML = orders.map((o) => {
      const id = escapeHtml(o._id || o.id || '');
      const user = escapeHtml(o.userName || o.userId || '');
      const product = escapeHtml(o.productName || o.productId || '');
      const qty = escapeHtml(o.qty);
      const address = escapeHtml(o.address || '');
      const status = escapeHtml(o.status || 'Pending');
      const badge = badgeForStatus(status);
      return `<tr><td>${id}</td><td>${user}</td><td>${product}</td><td>${qty}</td><td>${address}</td><td><span class="badge ${badge}">${status}</span></td></tr>`;
    }).join('');
  } catch {
    body.innerHTML = '<tr><td colspan="6" style="color:var(--text3);padding:14px 0">Failed to load orders.</td></tr>';
  }
}

// Start auth flow after script load
initAuth();

async function loadBusinesses() {
  const body = document.getElementById('admin-business-body');
  if (!body) return;
  body.innerHTML = '<tr><td colspan="4" style="color:var(--text3);padding:14px 0">Loading businesses…</td></tr>';

  try {
    const res = await fetch('/api/shops');
    if (!res.ok) throw new Error('Failed to load shops');
    const data = await res.json();
    const shops = Array.isArray(data && data.shops) ? data.shops : [];

    if (shops.length === 0) {
      body.innerHTML = '<tr><td colspan="4" style="color:var(--text3);padding:14px 0">No businesses yet.</td></tr>';
      return;
    }

    body.innerHTML = shops.map((s) => {
      const name = escapeHtml(s.name || '');
      const type = escapeHtml(s.type || 'Shop');
      const plan = '<span class="badge info">Pro</span>';
      const status = '<span class="badge success">Active</span>';
      return `<tr><td>${name}</td><td>${type}</td><td>${plan}</td><td>${status}</td></tr>`;
    }).join('');
  } catch {
    body.innerHTML = '<tr><td colspan="4" style="color:var(--text3);padding:14px 0">Failed to load businesses.</td></tr>';
  }
}

async function fillShopLocation() {
  const status = document.getElementById('shop-form-status');
  if (!navigator.geolocation) {
    if (status) status.textContent = 'Geolocation not supported.';
    return;
  }
  if (status) status.textContent = 'Fetching location…';

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const latEl = document.getElementById('shop-lat');
      const lngEl = document.getElementById('shop-lng');
      if (latEl) latEl.value = String(lat);
      if (lngEl) lngEl.value = String(lng);
      if (status) status.textContent = 'Location filled.';
    },
    (err) => {
      if (status) status.textContent = (err && err.message) ? err.message : 'Failed to get location.';
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

async function submitShop() {
  const status = document.getElementById('shop-form-status');
  const name = (document.getElementById('shop-name') || {}).value ? document.getElementById('shop-name').value.trim() : '';
  const type = (document.getElementById('shop-type') || {}).value || 'Retail';
  const address = (document.getElementById('shop-address') || {}).value ? document.getElementById('shop-address').value.trim() : '';
  const latRaw = (document.getElementById('shop-lat') || {}).value;
  const lngRaw = (document.getElementById('shop-lng') || {}).value;
  const lat = Number(latRaw);
  const lng = Number(lngRaw);

  if (!name) {
    if (status) status.textContent = 'Please enter shop name.';
    return;
  }
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    if (status) status.textContent = 'Please enter valid latitude/longitude.';
    return;
  }

  if (status) status.textContent = 'Saving…';
  try {
    const res = await fetch('/api/shops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, type, address, lat, lng })
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error((data && data.error) ? data.error : 'Failed to save shop.');

    if (status) status.textContent = 'Saved.';
    toggleAddShopForm(false);

    const nameEl = document.getElementById('shop-name');
    const typeEl = document.getElementById('shop-type');
    const addrEl = document.getElementById('shop-address');
    const latEl = document.getElementById('shop-lat');
    const lngEl = document.getElementById('shop-lng');
    if (nameEl) nameEl.value = '';
    if (addrEl) addrEl.value = '';
    if (latEl) latEl.value = '';
    if (lngEl) lngEl.value = '';
    if (typeEl) typeEl.value = 'Retail';

    await loadBusinesses();
  } catch (e) {
    if (status) status.textContent = (e && e.message) ? e.message : 'Failed to save shop.';
  }
}

// Apply saved language on load
applyLanguage(getStoredLanguage());
applyDomains(getStoredDomains());

// Close domain menu when clicking outside
document.addEventListener('click', () => {
  closeDomainMenu();
});
