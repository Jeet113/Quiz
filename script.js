/* ============================================
   CUET Career Club — Quiz Challenge
   Club Fest 2026
   Application Logic — 5 Segments × 3 Questions
   ============================================ */

// ============================================
// CONFIGURATION
// ============================================

/** Total segments and questions per segment */
const TOTAL_SEGMENTS = 5;
const QUESTIONS_PER_SEGMENT = 3;
const TOTAL_QUESTIONS = TOTAL_SEGMENTS * QUESTIONS_PER_SEGMENT; // 15

/** Timer duration in seconds */
const TIMER_DURATION = 30;
const EXTRA_TIME_BONUS = 15;

/** Initial lifelines count */
const INITIAL_LIFELINES = 3;

/** Topic definitions with icons and descriptions */
/** Topic definitions with icons and descriptions */
const TOPICS = [
  { name: "Bangladesh", icon: "🇧🇩", description: "History, heritage & geography" },
  { name: "British Rule in India", icon: "👑", description: "Colonial era, freedom & acts" },
  { name: "Sports", icon: "🏆", description: "Cricket, football & athletics" },
  { name: "International", icon: "🌍", description: "World geopolitics & bodies" },
  { name: "Recent Affairs", icon: "📰", description: "Global events, summits & news" },
  { name: "Entertainment", icon: "🎬", description: "Cinema, music & pop culture" },
  { name: "Science & Technology", icon: "🔬", description: "Physics, chemistry & biotech" },
  { name: "Inventions & Discoveries", icon: "💡", description: "Pioneers & breakthroughs" },
  { name: "Politics & Government", icon: "⚖️", description: "Constitutions, law & governance" },
  { name: "Computer & Internet", icon: "💻", description: "Cyber, programming & IT" },
  { name: "Space & Astronomy", icon: "🚀", description: "Cosmos, planets & NASA" },
  { name: "IQ & Logic", icon: "🧠", description: "Puzzles, patterns & reasoning" }
];

/** Scoring per difficulty */
const SCORE_MAP = {
  "easy": 10,
  "easy-medium": 15,
  "medium": 20,
  "medium-hard": 25,
  "hard": 30
};

/** Difficulty by overall question number (1-indexed) */
function getDifficultyForQuestion(qNum) {
  if (qNum >= 1 && qNum <= 3) return "easy";
  if (qNum >= 4 && qNum <= 6) return "easy-medium";
  if (qNum >= 7 && qNum <= 9) return "medium";
  if (qNum >= 10 && qNum <= 12) return "medium-hard";
  if (qNum >= 13 && qNum <= 15) return "hard";
  return "easy";
}

/** Map transition difficulties to actual question bank difficulties */
function getActualDifficulties(difficulty) {
  switch (difficulty) {
    case "easy": return ["easy"];
    case "easy-medium": return ["medium", "easy"];
    case "medium": return ["medium"];
    case "medium-hard": return ["hard", "medium"];
    case "hard": return ["hard"];
    default: return ["easy"];
  }
}

/** Display label for difficulty */
function difficultyLabel(diff) {
  switch (diff) {
    case "easy": return "EASY";
    case "easy-medium": return "EASY → MEDIUM";
    case "medium": return "MEDIUM";
    case "medium-hard": return "MEDIUM → HARD";
    case "hard": return "HARD";
    default: return diff.toUpperCase();
  }
}

/** LocalStorage keys */
const STORAGE_KEYS = {
  currentState: "cuet_quiz_current_state",
  results: "cuet_quiz_results"
};

/** Delay timings (ms) */
const TIMING = {
  correctFeedback: 1200,
  wrongFeedback: 1500,
  timeoutFeedback: 1500,
  transitionDelay: 600
};

// ============================================
// QUESTION BANK — 12 Topics × 3 Difficulties (288 Questions)
// ============================================

const questionBank = [

  // ==========================================
  //  1. BANGLADESH — EASY
  // ==========================================
  { id: "bd_e1", topic: "Bangladesh", difficulty: "easy", question: "বাংলাদেশের জাতীয় পশু কোনটি?", options: ["এশীয় হাতি", "রয়্যাল বেঙ্গল টাইগার", "চিত্রা হরিণ", "একশৃঙ্গ গন্ডার"], answer: 1 },
  { id: "bd_e2", topic: "Bangladesh", difficulty: "easy", question: "বাংলাদেশে কোন দিনটি 'বিজয় দিবস' হিসেবে উদযাপিত হয়?", options: ["২৬ মার্চ", "২১ ফেব্রুয়ারি", "১৬ ডিসেম্বর", "১৪ এপ্রিল"], answer: 2 },
  { id: "bd_e3", topic: "Bangladesh", difficulty: "easy", question: "বাংলাদেশের জাতীয় মুদ্রার নাম কী?", options: ["রুপি", "টাকা", "কিয়াত", "রিঙ্গিত"], answer: 1 },
  { id: "bd_e4", topic: "Bangladesh", difficulty: "easy", question: "বাংলাদেশের দীর্ঘতম অবিচ্ছিন্ন প্রাকৃতিক বালুকাময় সমুদ্র সৈকত কোনটি?", options: ["কুয়াকাটা সৈকত", "পতেঙ্গা সৈকত", "কক্সবাজার সৈকত", "সেন্টমার্টিন সৈকত"], answer: 2 },
  { id: "bd_e5", topic: "Bangladesh", difficulty: "easy", question: "বাংলাদেশের জাতীয় ফুল কোনটি?", options: ["গোলাপ", "শাপলা (Water Lily)", "গাঁদা", "বেলি"], answer: 1 },
  { id: "bd_e6", topic: "Bangladesh", difficulty: "easy", question: "কোন দিনটি বাংলাদেশে 'শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস' হিসেবে পালিত হয়?", options: ["৭ ফেব্রুয়ারি", "১৪ ফেব্রুয়ারি", "২১ ফেব্রুয়ারি", "৭ মার্চ"], answer: 2 },
  { id: "bd_e7", topic: "Bangladesh", difficulty: "easy", question: "বাংলাদেশের রাজধানী ও বৃহত্তম শহর কোনটি?", options: ["চট্টগ্রাম", "সিলেট", "ঢাকা", "রাজশাহী"], answer: 2 },
  { id: "bd_e8", topic: "Bangladesh", difficulty: "easy", question: "বাংলাদেশের জাতীয় সংগীত 'আমার সোনার বাংলা'র রচয়িতা কে?", options: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীমউদ্দীন", "লালন শাহ"], answer: 1 },

  // ==========================================
  //  1. BANGLADESH — MEDIUM
  // ==========================================
  { id: "bd_m1", topic: "Bangladesh", difficulty: "medium", question: "বঙ্গবন্ধু শেখ মুজিবুর রহমান কত সালে ঐতিহাসিক 'ছয় দফা' দাবি পেশ করেন?", options: ["১৯৫২", "১৯৬৬", "১৯৬৯", "১৯৭১"], answer: 1 },
  { id: "bd_m2", topic: "Bangladesh", difficulty: "medium", question: "ভারত থেকে গঙ্গা নদী বাংলাদেশে কোন নামে প্রবেশ করেছে?", options: ["মেঘনা", "যমুনা", "পদ্মা", "কর্ণফুলী"], answer: 2 },
  { id: "bd_m3", topic: "Bangladesh", difficulty: "medium", question: "১৯৭১ সালের মহান মুক্তিযুদ্ধে সমগ্র বাংলাদেশকে কয়টি সেক্টরে বিভক্ত করা হয়েছিল?", options: ["৭টি", "৯টি", "১১টি", "১৪টি"], answer: 2 },
  { id: "bd_m4", topic: "Bangladesh", difficulty: "medium", question: "সাভারে অবস্থিত জাতীয় স্মৃতিসৌধের প্রধান স্থপতি কে?", options: ["সৈয়দ মাইনুল হোসেন", "হামিদুর রহমান", "মাজহারুল ইসলাম", "নিতুন কুণ্ডু"], answer: 0 },
  { id: "bd_m5", topic: "Bangladesh", difficulty: "medium", question: "নওগাঁয় অবস্থিত কোন প্রাচীন বৌদ্ধ বিহারটি ইউনেস্কো ওয়ার্ল্ড হেরিটেজ সাইট?", options: ["ময়নামতি", "সোমপুর মহাবিহার (পাহাড়পুর)", "মহাস্থানগড়", "কান্তজীউ মন্দির"], answer: 1 },
  { id: "bd_m6", topic: "Bangladesh", difficulty: "medium", question: "জাতীয় সংসদ ভবনের প্রধান স্থপতি লুই আই কান কোন দেশের নাগরিক ছিলেন?", options: ["ফ্রান্স", "যুক্তরাষ্ট্র", "জার্মানি", "যুক্তরাজ্য"], answer: 1 },
  { id: "bd_m7", topic: "Bangladesh", difficulty: "medium", question: "বিশ্বের বৃহত্তম ম্যানগ্রোভ বন 'সুন্দরবন' প্রধানত বাংলাদেশের কোন প্রশাসনিক বিভাগে অবস্থিত?", options: ["বরিশাল বিভাগ", "খুলনা বিভাগ", "চট্টগ্রাম বিভাগ", "ঢাকা বিভাগ"], answer: 1 },
  { id: "bd_m8", topic: "Bangladesh", difficulty: "medium", question: "বাংলাদেশ কত সালে আনুষ্ঠানিকভাবে জাতিসংঘের পূর্ণাঙ্গ সদস্যপদ লাভ করে?", options: ["১৯৭১", "১৯৭২", "১৯৭৪", "১৯৭৬"], answer: 2 },

  // ==========================================
  //  1. BANGLADESH — HARD
  // ==========================================
  { id: "bd_h1", topic: "Bangladesh", difficulty: "hard", question: "১৯৭১ সালের মুক্তিযুদ্ধে মুক্তিবাহিনীর প্রধান সেনাপতি কে ছিলেন?", options: ["মেজর জিয়াউর রহমান", "জেনারেল এম এ জি ওসমানী", "মেজর খালেদ মোশাররফ", "ক্যাপ্টেন মহিউদ্দিন জাহাঙ্গীর"], answer: 1 },
  { id: "bd_h2", topic: "Bangladesh", difficulty: "hard", question: "১৯৭১ সালে অস্থায়ী মুজিবনগর সরকার কত তারিখে আনুষ্ঠানিকভাবে শপথ গ্রহণ করে?", options: ["২৬ মার্চ ১৯৭১", "১০ এপ্রিল ১৯৭১", "১৭ এপ্রিল ১৯৭১", "১৬ ডিসেম্বর ১৯৭১"], answer: 2 },
  { id: "bd_h3", topic: "Bangladesh", difficulty: "hard", question: "১৯৪৭ সালে ভারত ও পাকিস্তানের সীমানা নির্ধারণকারী কমিশনের প্রধান কে ছিলেন?", options: ["লর্ড মাউন্টব্যাটেন", "স্যার সিরিল র‍্যাডক্লিফ", "লর্ড কার্জন", "স্যার স্ট্যাফোর্ড ক্রিপস"], answer: 1 },
  { id: "bd_h4", topic: "Bangladesh", difficulty: "hard", question: "স্বাধীন বাংলাদেশের সুপ্রিম কোর্টের প্রথম প্রধান বিচারপতি কে ছিলেন?", options: ["বিচারপতি কামালউদ্দিন হোসেন", "বিচারপতি আবু সাদাত মোহাম্মদ সায়েম", "বিচারপতি বদরুল হায়দার চৌধুরী", "বিচারপতি সাহাবুদ্দীন আহমদ"], answer: 1 },
  { id: "bd_h5", topic: "Bangladesh", difficulty: "hard", question: "মওলানা ভাসানীর নেতৃত্বে ঐতিহাসিক ফারাক্কা লংমার্চ কত সালে অনুষ্ঠিত হয়?", options: ["১৯৭২", "১৯৭৪", "১৯৭৬", "১৯৭৮"], answer: 2 },
  { id: "bd_h6", topic: "Bangladesh", difficulty: "hard", question: "গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান কত তারিখ থেকে আনুষ্ঠানিকভাবে কার্যকর হয়?", options: ["৪ নভেম্বর ১৯৭২", "১৬ ডিসেম্বর ১৯৭২", "২৬ মার্চ ১৯৭৩", "১ জানুয়ারি ১৯৭৩"], answer: 1 },
  { id: "bd_h7", topic: "Bangladesh", difficulty: "hard", question: "মুক্তিযুদ্ধে বীরত্বপূর্ণ অবদানের জন্য একমাত্র কোন বিদেশী নাগরিককে 'বীর প্রতীক' খেতাবে ভূষিত করা হয়?", options: ["ফাদার টিম", "উইলিয়াম এ এস ওডারল্যান্ড", "মার্ক টালি", "এডওয়ার্ড কেনেডি"], answer: 1 },
  { id: "bd_h8", topic: "Bangladesh", difficulty: "hard", question: "নরসিংদীতে আবিষ্কৃত প্রাচীন প্রত্নতাত্ত্বিক নগর সভ্যতা উয়ারী-বটেশ্বর আনুমানিক কত পূর্বাব্দের?", options: ["১০০০ খ্রিস্টাব্দ", "৪৫০ খ্রিস্টপূর্বাব্দ", "১৫০০ খ্রিস্টাব্দ", "৩০০০ খ্রিস্টপূর্বাব্দ"], answer: 1 },

  // ==========================================
  //  2. BRITISH RULE IN INDIA — EASY
  // ==========================================
  { id: "br_e1", topic: "British Rule in India", difficulty: "easy", question: "১৭৫৭ সালের কোন ঐতিহাসিক যুদ্ধের মাধ্যমে বাংলায় ব্রিটিশ শাসনের সূচনা হয়?", options: ["বক্সারের যুদ্ধ", "পলাশীর যুদ্ধ", "পানিপথের যুদ্ধ", "ওয়ান্দিওয়াশের যুদ্ধ"], answer: 1 },
  { id: "br_e2", topic: "British Rule in India", difficulty: "easy", question: "ব্রিটিশ শাসনের বিরুদ্ধে অহিংস ও অসহযোগ আন্দোলনের নেতৃত্ব দেন কে?", options: ["সুভাষচন্দ্র বসু", "মহাত্মা গান্ধী", "জওহরলাল নেহেরু", "ভগত সিং"], answer: 1 },
  { id: "br_e3", topic: "British Rule in India", difficulty: "easy", question: "ভারতীয় উপমহাদেশে ব্রিটিশ ঔপনিবেশিক শাসনের অবসান ঘটে কত সালে?", options: ["১৯৪২", "১৯৪৫", "১৯৪৭", "১৯৫০"], answer: 2 },
  { id: "br_e4", topic: "British Rule in India", difficulty: "easy", question: "ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানির বিরুদ্ধে ঐতিহাসিক সিপাহী বিদ্রোহ কত সালে শুরু হয়?", options: ["১৭৫৭", "১৮৫৭", "১৯০৫", "১৯১৯"], answer: 1 },
  { id: "br_e5", topic: "British Rule in India", difficulty: "easy", question: "কোন ব্রিটিশ বাণিজ্যিক কোম্পানি ভারতে প্রথম শাসন কর্তৃত্ব প্রতিষ্ঠা করে?", options: ["ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানি", "রয়্যাল ইন্ডিয়ান নেভি", "ডাচ ইস্ট ইন্ডিয়া কোম্পানি", "হাডসন বে কোম্পানি"], answer: 0 },
  { id: "br_e6", topic: "British Rule in India", difficulty: "easy", question: "১৯১৯ সালে জেনারেল ডায়ারের নেতৃত্বে জালিয়ানওয়ালাবাগ হত্যাকাণ্ড কোন শহরে ঘটেছিল?", options: ["লাহোর", "অমৃতসর", "দিল্লি", "কলকাতা"], answer: 1 },
  { id: "br_e7", topic: "British Rule in India", difficulty: "easy", question: "১৯৪৭ সালের পূর্বে ভারতীয় উপমহাদেশ কোন ইউরোপীয় সাম্রাজ্যের অধীনে ছিল?", options: ["ফরাসি সাম্রাজ্য", "পর্তুগিজ সাম্রাজ্য", "ব্রিটিশ সাম্রাজ্য", "ডাচ সাম্রাজ্য"], answer: 2 },
  { id: "br_e8", topic: "British Rule in India", difficulty: "easy", question: "১৯৪২ সালে 'ভারত ছাড়ো' আন্দোলনে গান্ধীজির বিখ্যাত স্লোগান কোনটি ছিল?", options: ["জয় হিন্দ", "ইনকিলাব জিন্দাবাদ", "করেঙ্গে অথবা মরেঙ্গে (Do or Die)", "স্বরাজ আমার জন্মগত অধিকার"], answer: 2 },

  // ==========================================
  //  2. BRITISH RULE IN INDIA — MEDIUM
  // ==========================================
  { id: "br_m1", topic: "British Rule in India", difficulty: "medium", question: "কোন আইনের মাধ্যমে ১৮৫৮ সালে কোম্পানির শাসনের অবসান ঘটিয়ে ক্ষমতা ব্রিটিশ রানীর হাতে ন্যস্ত হয়?", options: ["রেগুলেটিং অ্যাক্ট", "ভারত শাসন আইন ১৮৫৮", "পিটস ইন্ডিয়া অ্যাক্ট", "চার্টার অ্যাক্ট ১৮৩৩"], answer: 1 },
  { id: "br_m2", topic: "British Rule in India", difficulty: "medium", question: "১৯০৫ সালের বিতর্কিত বঙ্গভঙ্গের সময় ভারতের ভাইসরয় কে ছিলেন?", options: ["লর্ড রিপন", "লর্ড কার্জন", "লর্ড ডালহৌসি", "লর্ড ক্যানিং"], answer: 1 },
  { id: "br_m3", topic: "British Rule in India", difficulty: "medium", question: "লবণ করের বিরুদ্ধে মহাত্মা গান্ধীর নেতৃত্বে ঐতিহাসিক 'ডান্ডি পদযাত্রা' কত সালে অনুষ্ঠিত হয়?", options: ["১৯২০", "১৯৩০", "১৯৩৫", "১৯৪২"], answer: 1 },
  { id: "br_m4", topic: "British Rule in India", difficulty: "medium", question: "১৭৭৩ সালের রেগুলেটিং অ্যাক্টের অধীনে বাংলার প্রথম গভর্নর-জেনারেল কে ছিলেন?", options: ["লর্ড কর্নওয়ালিস", "ওয়ারেন হেস্টিংস", "রবার্ট ক্লাইভ", "লর্ড ওয়েলেসলি"], answer: 1 },
  { id: "br_m5", topic: "British Rule in India", difficulty: "medium", question: "১৯০৯ সালের কোন সংস্কার আইনের মাধ্যমে ব্রিটিশ ভারতে মুসলমানদের জন্য পৃথক নির্বাচন ব্যবস্থা চালু হয়?", options: ["মন্টেগু-চেমনসফোর্ড সংস্কার", "মর্লে-মিন্টো সংস্কার", "সাইমন কমিশন", "ক্যাবিনেট মিশন"], answer: 1 },
  { id: "br_m6", topic: "British Rule in India", difficulty: "medium", question: "ভারতীয় রাজ্যগুলো দখলের জন্য আগ্রাসী 'স্বত্ববিলোপ নীতি' (Doctrine of Lapse) প্রবর্তন করেন কে?", options: ["লর্ড ডালহৌসি", "লর্ড হেস্টিংস", "লর্ড বেন্টিঙ্ক", "লর্ড কার্জন"], answer: 0 },
  { id: "br_m7", topic: "British Rule in India", difficulty: "medium", question: "কত সালের দিল্লি দরবারে ব্রিটিশ ভারতের রাজধানী কলকাতা থেকে দিল্লিতে স্থানান্তরের ঘোষণা দেওয়া হয়?", options: ["১৯০৫", "১৯১১", "১৯১৯", "১৯২৩"], answer: 1 },
  { id: "br_m8", topic: "British Rule in India", difficulty: "medium", question: "১৮৮৫ সালে ভারতীয় জাতীয় কংগ্রেস (INC) প্রতিষ্ঠায় প্রধান ভূমিকা রাখেন কোন প্রাক্তন ব্রিটিশ কর্মকর্তা?", options: ["এ ও হিউম (A. O. Hume)", "লর্ড ডাফরিন", "উইলিয়াম ওয়েডারবার্ন", "লর্ড মেকলে"], answer: 0 },

  // ==========================================
  //  2. BRITISH RULE IN INDIA — HARD
  // ==========================================
  { id: "br_h1", topic: "British Rule in India", difficulty: "hard", question: "১৭৬৪ সালের কোন যুদ্ধের পর ইস্ট ইন্ডিয়া কোম্পানি বাংলা, বিহার ও উড়িষ্যার দেওয়ানি লাভ করে?", options: ["পলাশীর যুদ্ধ", "বক্সারের যুদ্ধ", "ওয়ান্দিওয়াশের যুদ্ধ", "শ্রীরঙ্গপত্তনমের যুদ্ধ"], answer: 1 },
  { id: "br_h2", topic: "British Rule in India", difficulty: "hard", question: "১৭৯৩ সালে বাংলায় চিরস্থায়ী বন্দোবস্ত (Permanent Settlement) প্রবর্তন করেন কে?", options: ["ওয়ারেন হেস্টিংস", "লর্ড কর্নওয়ালিস", "লর্ড ওয়েলেসলি", "লর্ড উইলিয়াম বেন্টিঙ্ক"], answer: 1 },
  { id: "br_h3", topic: "British Rule in India", difficulty: "hard", question: "১৯৪২ সালে 'ভারত ছাড়ো' আন্দোলন শুরু হওয়ার সময় ভারতের ভাইসরয় কে ছিলেন?", options: ["লর্ড ওয়াভেল", "লর্ড লিনলিথগো", "লর্ড উইলিংডন", "লর্ড আরউইন"], answer: 1 },
  { id: "br_h4", topic: "British Rule in India", difficulty: "hard", question: "১৯১৯ সালের কুখ্যাত 'রাউলাট আইন'-এর সরকারি আনুষ্ঠানিক নাম কী ছিল?", options: ["ডিফেন্স অব ইন্ডিয়া অ্যাক্ট", "অ্যানার্কিক্যাল অ্যান্ড রেভোলিউশনারি ক্রাইমস অ্যাক্ট", "ভার্নাকুলার প্রেস অ্যাক্ট", "সিডিশাস মিটিংস অ্যাক্ট"], answer: 1 },
  { id: "br_h5", topic: "British Rule in India", difficulty: "hard", question: "ব্রিটিশ ভারতের শেষ ভাইসরয় এবং স্বাধীন ভারতের প্রথম গভর্নর-জেনারেল কে ছিলেন?", options: ["লর্ড ওয়াভেল", "লর্ড মাউন্টব্যাটেন", "লর্ড লিনলিথগো", "সি রাজাগোপালাচারী"], answer: 1 },
  { id: "br_h6", topic: "British Rule in India", difficulty: "hard", question: "১৮৮৩ সালে ভারতীয় বিচারকদের ইউরোপীয়দের বিচার করার অধিকার সম্পর্কিত 'ইলবার্ট বিল' বিতর্ক কার সময়ে হয়?", options: ["লর্ড লিটন", "লর্ড রিপন", "লর্ড ডাফরিন", "লর্ড ল্যান্সডাউন"], answer: 1 },
  { id: "br_h7", topic: "British Rule in India", difficulty: "hard", question: "ইস্ট ইন্ডিয়া কোম্পানির কার্যক্রম নিয়ন্ত্রণের জন্য ব্রিটিশ পার্লামেন্টে পিটস ইন্ডিয়া অ্যাক্ট কত সালে পাস হয়?", options: ["১৭৭৩", "১৭৮৪", "১৭৯৩", "১৮১৩"], answer: 1 },
  { id: "br_h8", topic: "British Rule in India", difficulty: "hard", question: "১৭৮৪ সালে কলকাতায় এশিয়াটিক সোসাইটি অফ বেঙ্গল প্রতিষ্ঠা করেন কে?", options: ["জেমস মিল", "স্যার উইলিয়াম জোন্স", "টমাস মেকলে", "ম্যাক্স মুলার"], answer: 1 },

  // ==========================================
  //  3. SPORTS — EASY
  // ==========================================
  { id: "sp_e1", topic: "Sports", difficulty: "easy", question: "২০২২ সালের ফিফা বিশ্বকাপ ফুটবলে চ্যাম্পিয়ন হয় কোন দেশ?", options: ["ফ্রান্স", "আর্জেন্টিনা", "ব্রাজিল", "জার্মানি"], answer: 1 },
  { id: "sp_e2", topic: "Sports", difficulty: "easy", question: "ক্রিকেটে একটি দলের হয়ে মাঠে একসাথে কতজন খেলোয়াড় ফিল্ডিং করেন?", options: ["৯ জন", "১০ জন", "১১ জন", "১২ জন"], answer: 2 },
  { id: "sp_e3", topic: "Sports", difficulty: "easy", question: "'স্ল্যাম ডাঙ্ক', 'ফ্রি থ্রো' এবং 'রিবBOUND' শব্দগুলো কোন খেলার সাথে সম্পর্কিত?", options: ["ভলিবল", "বাস্কেটবল", "হ্যান্ডবল", "টেনিস"], answer: 1 },
  { id: "sp_e4", topic: "Sports", difficulty: "easy", question: "গ্রীষ্মকালীন অলিম্পিক গেমস সাধারণত কত বছর পর পর অনুষ্ঠিত হয়?", options: ["২ বছর", "৩ বছর", "৪ বছর", "৫ বছর"], answer: 2 },
  { id: "sp_e5", topic: "Sports", difficulty: "easy", question: "কোন খেলায় র‍্যাকেটের সাহায্যে শাটলকক দিয়ে খেলা হয়?", options: ["স্কোয়াশ", "টেনিস", "ব্যাডমিন্টন", "টেবিল টেনিস"], answer: 2 },
  { id: "sp_e6", topic: "Sports", difficulty: "easy", question: "ক্রিকেটে বল মাটি স্পর্শ না করে সীমানার বাইরে গেলে কত রান দেওয়া হয়?", options: ["৪ রান", "৫ রান", "৬ রান", "৮ রান"], answer: 2 },
  { id: "sp_e7", topic: "Sports", difficulty: "easy", question: "২০২৪ সালের গ্রীষ্মকালীন অলিম্পিক গেমস কোন শহরে অনুষ্ঠিত হয়?", options: ["লন্ডন", "টোকিও", "প্যারিস", "বার্লিন"], answer: 2 },
  { id: "sp_e8", topic: "Sports", difficulty: "easy", question: "লন টেনিসের স্কোরিংয়ে 'লাভ' (Love) শব্দের অর্থ কী?", options: ["অ্যাডভান্টেজ", "ডিউস", "শূন্য (০)", "গেম পয়েন্ট"], answer: 2 },

  // ==========================================
  //  3. SPORTS — MEDIUM
  // ==========================================
  { id: "sp_m1", topic: "Sports", difficulty: "medium", question: "আইসিসি ওয়ানডে ক্রিকেট বিশ্বকাপে সবচেয়ে বেশিবার শিরোপা জিতেছে কোন দেশ?", options: ["ভারত", "ওয়েস্ট ইন্ডিজ", "অস্ট্রেলিয়া", "ইংল্যান্ড"], answer: 2 },
  { id: "sp_m2", topic: "Sports", difficulty: "medium", question: "একটি পূর্ণাঙ্গ ম্যারাথন দৌড়ের মানসম্মত দূরত্ব কত?", options: ["২১.০৯৭ কিমি", "৩৫.৫ কিমি", "৪২.১৯৫ কিমি", "৫০.০ কিমি"], answer: 2 },
  { id: "sp_m3", topic: "Sports", difficulty: "medium", question: "১০০ মিটার স্প্রিন্টে ৯.৫৮ সেকেন্ডের বিশ্বরেকর্ডের অধিকারী কে?", options: ["টাইসন গে", "উসাইন বোল্ট", "ইয়োহান ব্লেক", "কার্ল লুইস"], answer: 1 },
  { id: "sp_m4", topic: "Sports", difficulty: "medium", question: "টেনিসের চারটি গ্র্যান্ড স্ল্যামের মধ্যে কোনটি ঐতিহ্যবাহী লাল মাটির (Clay) কোর্টে খেলা হয়?", options: ["উইম্বলডন", "ইউএস ওপেন", "ফ্রেঞ্চ ওপেন (রোলঁ গারো)", "অস্ট্রেলিয়ান ওপেন"], answer: 2 },
  { id: "sp_m5", topic: "Sports", difficulty: "medium", question: "বাংলাদেশ জাতীয় ক্রিকেট দল কত সালে আইসিসির পূর্ণাঙ্গ টেস্ট মর্যাদা লাভ করে?", options: ["১৯৯৭", "১৯৯৯", "২০০০", "২০০৩"], answer: 2 },
  { id: "sp_m6", topic: "Sports", difficulty: "medium", question: "ফুটবলের ইতিহাসে খেলোয়াড় হিসেবে তিনটি বিশ্বকাপ জয়ের একমাত্র অনন্য রেকর্ড কার?", options: ["দিয়েগো ম্যারাডোনা", "পেলে", "লিওনেল মেসি", "জিনেদিন জিদান"], answer: 1 },
  { id: "sp_m7", topic: "Sports", difficulty: "medium", question: "আধুনিক ফুটবলে প্রযুক্তিগত সহায়তা 'VAR'-এর পূর্ণরূপ কী?", options: ["Virtual Action Reviewer", "Video Assistant Referee", "Visual Angle Replay", "Voice Assisted Referee"], answer: 1 },
  { id: "sp_m8", topic: "Sports", difficulty: "medium", question: "দাবা খেলায় রাজা এবং নৌকার সমন্বয়ে করা বিশেষ চালটিকে কী বলা হয়?", options: ["অঁ পাসঁ (En Passant)", "প্রমোশন", "ক্যাসলিং (Castling)", "ফর্ক"], answer: 2 },

  // ==========================================
  //  3. SPORTS — HARD
  // ==========================================
  { id: "sp_h1", topic: "Sports", difficulty: "hard", question: "কত সালে এবং কোন দেশে সর্বপ্রথম ফিফা বিশ্বকাপ ফুটবল প্রতিযোগিতা অনুষ্ঠিত হয়?", options: ["১৯২৮, ইতালি", "১৯৩০, উরুগুয়ে", "১৯৩৪, ফ্রান্স", "১৯৩৮, ব্রাজিল"], answer: 1 },
  { id: "sp_h2", topic: "Sports", difficulty: "hard", question: "আন্তর্জাতিক টেস্ট ক্রিকেটে সর্বোচ্চ ৮০০ উইকেটের অনন্য বিশ্বরেকর্ডের অধিকারী কে?", options: ["শেন ওয়ার্ন", "মুত্তিয়া মুরালিধরন", "অনিল কুম্বলে", "জেমস অ্যান্ডারসন"], answer: 1 },
  { id: "sp_h3", topic: "Sports", difficulty: "hard", question: "আন্তর্জাতিক ব্যাডমিন্টন প্রতিযোগিতায় 'টমাস কাপ' ও 'উবার কাপ' ট্রফি দুটি যথাক্রমে কাদের জন্য?", options: ["পুরুষ ও নারী দল", "একক ও দ্বৈত", "জুনিয়র ও সিনিয়র", "এশিয়া ও ইউরোপ"], answer: 0 },
  { id: "sp_h4", topic: "Sports", difficulty: "hard", question: "১৮৯৬ সালে কোন ঐতিহাসিক শহরে প্রথম আধুনিক অলিম্পিক গেমস অনুষ্ঠিত হয়েছিল?", options: ["রোম, ইতালি", "প্যারিস, ফ্রান্স", "অ্যাথেন্স, গ্রিস", "লন্ডন, যুক্তরাজ্য"], answer: 2 },
  { id: "sp_h5", topic: "Sports", difficulty: "hard", question: "১৯৭৬ মন্ট্রিল অলিম্পিকে জিমন্যাস্টিকসে প্রথম নিখুঁত ১০.০ স্কোর করে ইতিহাস গড়েন কে?", options: ["সিমোন বাইলস", "নাদিয়া কোমানেচি", "স্বেতলানা খরকিনা", "ম্যারি লু রেটন"], answer: 1 },
  { id: "sp_h6", topic: "Sports", difficulty: "hard", question: "টেস্ট ক্রিকেটে এক ইনিংসে ব্যক্তিগত সর্বোচ্চ অপরাজিত ৪০০ রান করার বিশ্বরেকর্ড কার?", options: ["ম্যাথিউ হেইডেন", "ব্রায়ান লারা", "বীরেন্দর শেবাগ", "ডন ব্র্যাডম্যান"], answer: 1 },
  { id: "sp_h7", topic: "Sports", difficulty: "hard", question: "গলফ খেলায় কোনো হোলে পার (Par) স্কোরের চেয়ে ৩ শট কম খেলাকে কী বলা হয়?", options: ["বার্ডি", "ঈগল", "অ্যালবাট্রস (ডাবল ঈগল)", "কনডোর"], answer: 2 },
  { id: "sp_h8", topic: "Sports", difficulty: "hard", question: "১৯৫৪ সালে ইতিহাসে প্রথমবার চার মিনিটের কমে এক মাইল দৌড় সম্পন্ন করেন কোন ক্রীড়াবিদ?", options: ["রজার ব্যানিস্টার", "জন ল্যান্ডি", "সেবাস্টিয়ান কো", "স্টিভ ক্র্যাম"], answer: 0 },

  // ==========================================
  //  4. INTERNATIONAL — EASY
  // ==========================================
  { id: "in_e1", topic: "International", difficulty: "easy", question: "জাতিসংঘের (UN) প্রধান সদর দপ্তর কোথায় অবস্থিত?", options: ["জেনেভা, সুইজারল্যান্ড", "নিউইয়র্ক, যুক্তরাষ্ট্র", "লন্ডন, যুক্তরাজ্য", "প্যারিস, ফ্রান্স"], answer: 1 },
  { id: "in_e2", topic: "International", difficulty: "easy", question: "আয়তন ও জনসংখ্যা—উভয় দিক থেকেই বিশ্বের বৃহত্তম মহাদেশ কোনটি?", options: ["আফ্রিকা", "এশিয়া", "উত্তর আমেরিকা", "ইউরোপ"], answer: 1 },
  { id: "in_e3", topic: "International", difficulty: "easy", question: "ফ্রান্সের রাজধানী শহর কোনটি?", options: ["রোম", "বার্লিন", "প্যারিস", "মাদ্রিদ"], answer: 2 },
  { id: "in_e4", topic: "International", difficulty: "easy", question: "পৃথিবীর বৃহত্তম ও গভীরতম মহাসাগর কোনটি?", options: ["আটলান্টিক মহাসাগর", "ভারত মহাসাগর", "প্রশান্ত মহাসাগর", "উত্তর মহাসাগর"], answer: 2 },
  { id: "in_e5", topic: "International", difficulty: "easy", question: "যুক্তরাজ্যের (UK) জাতীয় মুদ্রার নাম কী?", options: ["ইউরো", "ডলার", "পাউন্ড স্টার্লিং", "ফ্রাঙ্ক"], answer: 2 },
  { id: "in_e6", topic: "International", difficulty: "easy", question: "কোন দেশকে 'সূর্যোদয়ের দেশ' (Land of the Rising Sun) বলা হয়?", options: ["চীন", "দক্ষিণ কোরিয়া", "জাপান", "থাইল্যান্ড"], answer: 2 },
  { id: "in_e7", topic: "International", difficulty: "easy", question: "দক্ষিণ এশীয় আঞ্চলিক সংস্থা সার্ক (SAARC)-এর সদস্য রাষ্ট্র কয়টি?", options: ["৫টি", "৭টি", "৮টি", "১০টি"], answer: 2 },
  { id: "in_e8", topic: "International", difficulty: "easy", question: "আয়তন ও জনসংখ্যার দিক থেকে বিশ্বের ক্ষুদ্রতম স্বাধীন রাষ্ট্র কোনটি?", options: ["মোনাকো", "সান মারিনো", "ভ্যাটিকান সিটি", "লিশটেনস্টাইন"], answer: 2 },

  // ==========================================
  //  4. INTERNATIONAL — MEDIUM
  // ==========================================
  { id: "in_m1", topic: "International", difficulty: "medium", question: "আন্তর্জাতিক বিচার আদালত (ICJ)-এর সদর দপ্তর নেদারল্যান্ডসের কোন শহরে অবস্থিত?", options: ["জেনেভা", "ব্রাসেলস", "দ্য হেগ", "ভিয়েনা"], answer: 2 },
  { id: "in_m2", topic: "International", difficulty: "medium", question: "মিশরে অবস্থিত কোন বিখ্যাত কৃত্রিম খাল ভূমধ্যসাগর ও লোহিত সাগরকে যুক্ত করেছে?", options: ["পানামা খাল", "সুয়েজ খাল", "কিল খাল", "করিন্থ খাল"], answer: 1 },
  { id: "in_m3", topic: "International", difficulty: "medium", question: "পশ্চিমা সামরিক জোট 'NATO'-এর পূর্ণরূপ কী?", options: ["North Atlantic Treaty Organization", "National American Trade Office", "Northern Alliance for Trade Operations", "New Atlantic Tactical Organization"], answer: 0 },
  { id: "in_m4", topic: "International", difficulty: "medium", question: "বিশ্ব স্বাস্থ্য সংস্থা (WHO)-এর আন্তর্জাতিক সদর দপ্তর কোথায় অবস্থিত?", options: ["জেনেভা, সুইজারল্যান্ড", "ওয়াশিংটন ডিসি, যুক্তরাষ্ট্র", "লন্ডন, যুক্তরাজ্য", "রোম, ইতালি"], answer: 0 },
  { id: "in_m5", topic: "International", difficulty: "medium", question: "জাতিসংঘের নিরাপত্তা পরিষদে স্থায়ী (ভেটো ক্ষমতার অধিকারী) সদস্য রাষ্ট্র কয়টি?", options: ["৩টি", "৫টি", "৭টি", "১০টি"], answer: 1 },
  { id: "in_m6", topic: "International", difficulty: "medium", question: "কোন প্রণালীটি এশিয়া ও উত্তর আমেরিকা মহাদেশকে পৃথক করেছে?", options: ["জিব্রাল্টার প্রণালী", "মালাক্কা প্রণালী", "বেরিং প্রণালী", "হরমুজ প্রণালী"], answer: 2 },
  { id: "in_m7", topic: "International", difficulty: "medium", question: "বিশ্বের দীর্ঘতম আন্তর্জাতিক স্থল সীমান্ত কোন দুটি দেশের মধ্যে বিদ্যমান?", options: ["রাশিয়া ও চীন", "যুক্তরাষ্ট্র ও কানাডা", "আর্জেন্টিনা ও চিলি", "ভারত ও চীন"], answer: 1 },
  { id: "in_m8", topic: "International", difficulty: "medium", question: "প্রতি বছর শান্তিতে নোবেল পুরস্কার কোন দেশের রাজধানী থেকে প্রদান করা হয়?", options: ["স্টকহোম, সুইডেন", "অসলো, নরওয়ে", "কোপেনহেগেন, ডেনমার্ক", "হেলসিঙ্কি, ফিনল্যান্ড"], answer: 1 },

  // ==========================================
  //  4. INTERNATIONAL — HARD
  // ==========================================
  { id: "in_h1", topic: "International", difficulty: "hard", question: "আধুনিক রাষ্ট্রীয় সার্বভৌমত্বের ভিত্তি স্থাপনকারী 'ওয়েস্টফালিয়া শান্তি চুক্তি' কত সালে স্বাক্ষরিত হয়?", options: ["১৫৫৫", "১৬৪৮", "১৭১৩", "১৭৮৯"], answer: 1 },
  { id: "in_h2", topic: "International", difficulty: "hard", question: "আফ্রিকান ইউনিয়ন (AU)-এর স্থায়ী সদর দপ্তর কোন শহরে অবস্থিত?", options: ["নাইরোবি, কেনিয়া", "কায়রো, মিশর", "আদ্দিস আবাবা, ইথিওপিয়া", "জোহানেসবার্গ, দক্ষিণ আফ্রিকা"], answer: 2 },
  { id: "in_h3", topic: "International", difficulty: "hard", question: "ইউরোপীয় ঔপনিবেশিকতার যুগে আফ্রিকার কোন দেশটি কখনোই কোনো ইউরোপীয় শক্তির উপনিবেশ ছিল না?", options: ["লাইবেরিয়া", "ইথিওপিয়া", "সুদান", "ঘানা"], answer: 1 },
  { id: "in_h4", topic: "International", difficulty: "hard", question: "১৯৪৪ সালের ব্রেটন উডস সম্মেলনের মাধ্যমে কোন দুটি বিশ্ব অর্থনৈতিক প্রতিষ্ঠান সৃষ্টি হয়?", options: ["WTO ও UNCTAD", "IMF ও বিশ্বব্যাংক", "OECD ও OPEC", "G7 ও G20"], answer: 1 },
  { id: "in_h5", topic: "International", difficulty: "hard", question: "দক্ষিণ-পূর্ব এশিয়ার একমাত্র স্থলবেষ্টিত (Landlocked) রাষ্ট্র কোনটি?", options: ["কম্বোডিয়া", "লাওস", "ভিয়েতনাম", "থাইল্যান্ড"], answer: 1 },
  { id: "in_h6", topic: "International", difficulty: "hard", question: "ইউরোপে পাসপোর্টমুক্ত যাতায়াত নিশ্চিতকারী ঐতিহাসিক 'শেনজেন চুক্তি' কোন দেশে স্বাক্ষরিত হয়?", options: ["বেলজিয়াম", "নেদারল্যান্ডস", "লুক্সেমবার্গ", "ফ্রান্স"], answer: 2 },
  { id: "in_h7", topic: "International", difficulty: "hard", question: "পৃথিবীর গভীরতম বিন্দু 'চ্যালেঞ্জার ডিপ' প্রশান্ত মহাসাগরের কোন খাতে অবস্থিত?", options: ["জাভা খাত", "পুয়ের্তো রিকো খাত", "মারিয়ানা খাত", "সুন্দা খাত"], answer: 2 },
  { id: "in_h8", topic: "International", difficulty: "hard", question: "প্রথম বিশ্বযুদ্ধের সমাপ্তির পর কত সালে আনুষ্ঠানিক 'লিগ অব নেশনস' গঠিত হয়েছিল?", options: ["১৯১৮", "১৯২০", "১৯২৪", "১৯৩০"], answer: 1 },

  // ==========================================
  //  5. RECENT AFFAIRS — EASY
  // ==========================================
  { id: "ra_e1", topic: "Recent Affairs", difficulty: "easy", question: "বর্তমানে জাতিসংঘের মহাসচিব হিসেবে কে দায়িত্ব পালন করছেন?", options: ["বান কি-মুন", "আন্তোনিও গুতেরেস", "কফি আনান", "তেদরোস আদহানোম"], answer: 1 },
  { id: "ra_e2", topic: "Recent Affairs", difficulty: "easy", question: "জনপ্রিয় কৃত্রিম বুদ্ধিমত্তা সহকারী 'ChatGPT' কোন এআই গবেষণাগারের তৈরি?", options: ["গুগল", "ওপেনএআই (OpenAI)", "মেটা", "মাইক্রোসফট"], answer: 1 },
  { id: "ra_e3", topic: "Recent Affairs", difficulty: "easy", question: "২০২৩ সালের জি-২০ শীর্ষ সম্মেলন কোন দক্ষিণ এশীয় দেশের রাজধানী নয়াদিল্লিতে অনুষ্ঠিত হয়?", options: ["বাংলাদেশ", "শ্রীলঙ্কা", "ভারত", "পাকিস্তান"], answer: 2 },
  { id: "ra_e4", topic: "Recent Affairs", difficulty: "easy", question: "২০২২ সালে রানী দ্বিতীয় এলিজাবেথের মৃত্যুর পর ব্রিটেনের সিংহাসনে কে বসেন?", options: ["প্রিন্স উইলিয়াম", "রাজা তৃতীয় চার্লস", "প্রিন্স হ্যারি", "রাজা সপ্তম জর্জ"], answer: 1 },
  { id: "ra_e5", topic: "Recent Affairs", difficulty: "easy", question: "২০২৩ সালের এপ্রিলে কোন নর্ডিক দেশটি ন্যাটোর (NATO) ৩১তম সদস্য হিসেবে যোগদান করে?", options: ["সুইডেন", "ফিনল্যান্ড", "নরওয়ে", "আইসল্যান্ড"], answer: 1 },
  { id: "ra_e6", topic: "Recent Affairs", difficulty: "easy", question: "২০২৪ সালের আইসিসি টি-টোয়েন্টি বিশ্বকাপ ওয়েস্ট ইন্ডিজের সাথে যৌথভাবে আয়োজন করে কোন দেশ?", options: ["কানাডা", "যুক্তরাষ্ট্র (USA)", "মেক্সিকো", "ইংল্যান্ড"], answer: 1 },
  { id: "ra_e7", topic: "Recent Affairs", difficulty: "easy", question: "২০২৩ সালের শেষের দিকে জাতিসংঘের কপ২৮ (COP28) জলবায়ু সম্মেলন কোথায় অনুষ্ঠিত হয়?", options: ["শার্ম আল-শেখ", "গ্লাসগো", "দুবাই (সংযুক্ত আরব আমিরাত)", "বাকু"], answer: 2 },
  { id: "ra_e8", topic: "Recent Affairs", difficulty: "easy", question: "২০২৩ সালের ফেব্রুয়ারিতে ৭.৮ মাত্রার ভয়াবহ ভূমিকম্পে কোন দুটি দেশে ব্যাপক ধ্বংসযজ্ঞ ঘটে?", options: ["তুরস্ক ও সিরিয়া", "ইরান ও ইরাক", "মরক্কো ও লিবিয়া", "আফগানিস্তান ও পাকিস্তান"], answer: 0 },

  // ==========================================
  //  5. RECENT AFFAIRS — MEDIUM
  // ==========================================
  { id: "ra_m1", topic: "Recent Affairs", difficulty: "medium", question: "২০২৪ সালের মার্চে কোন স্ক্যান্ডিনেভিয়ান রাষ্ট্র ন্যাটোর ৩২তম সদস্য রাষ্ট্র হিসেবে আনুষ্ঠানিকভাবে যোগ দেয়?", options: ["অস্ট্রিয়া", "সুইডেন", "সুইজারল্যান্ড", "আয়ারল্যান্ড"], answer: 1 },
  { id: "ra_m2", topic: "Recent Affairs", difficulty: "medium", question: "২০২৩ সালে চাঁদের দক্ষিণ মেরুতে সফলভাবে 'চন্দ্রযান-৩' অবতরণ করায় কোন দেশের মহাকাশ গবেষণা সংস্থা?", options: ["জাপান (JAXA)", "ভারত (ISRO)", "চীন (CNSA)", "ইউরোপ (ESA)"], answer: 1 },
  { id: "ra_m3", topic: "Recent Affairs", difficulty: "medium", question: "কৃত্রিম বুদ্ধিমত্তা নিয়ন্ত্রণে ২০২৪ সালে পাস হওয়া বিশ্বের প্রথম পূর্ণাঙ্গ আইন কোনটি?", options: ["ডিজিটাল মার্কেটস অ্যাক্ট", "ইউরোপীয় ইউনিয়ন এআই অ্যাক্ট (EU AI Act)", "গ্লোবাল এআই ট্রিটি", "ডাটা গভর্ন্যান্স অ্যাক্ট"], answer: 1 },
  { id: "ra_m4", topic: "Recent Affairs", difficulty: "medium", question: "জাতিসংঘের ২০২৩ সালের পরিসংখ্যান অনুযায়ী চীনকে ছাড়িয়ে বিশ্বের সর্বাধিক জনসংখ্যার দেশ কোনটি?", options: ["যুক্তরাষ্ট্র", "ভারত", "ইন্দোনেশিয়া", "নাইজেরিয়া"], answer: 1 },
  { id: "ra_m5", topic: "Recent Affairs", difficulty: "medium", question: "ইরানে নারী অধিকার ও স্বাধীনতার আন্দোলনে নেতৃত্ব দেওয়ায় ২০২৩ সালে শান্তিতে নোবেল পান কে?", options: ["মালালা ইউসুফজাই", "নার্গিস মোহাম্মদী", "মারিয়া রেসা", "তাওয়াক্কুল কারমান"], answer: 1 },
  { id: "ra_m6", topic: "Recent Affairs", difficulty: "medium", question: "২০২৪ সালের নভেম্বরে জাতিসংঘের কপ২৯ (COP29) জলবায়ু সম্মেলন কোন শহরে অনুষ্ঠিত হয়?", options: ["বাকু, আজারবাইজান", "দোহা, কাতার", "কায়রো, মিশর", "রিয়াদ, সৌদি আরব"], answer: 0 },
  { id: "ra_m7", topic: "Recent Affairs", difficulty: "medium", question: "২০২১ সালে প্রথম দেশ হিসেবে বিটকয়েনকে রাষ্ট্রীয়ভাবে বৈধ মুদ্রা (Legal Tender) ঘোষণা করে কোনটি?", options: ["পানামা", "এল সালভাদর", "আর্জেন্টিনা", "কোস্টারিকা"], answer: 1 },
  { id: "ra_m8", topic: "Recent Affairs", difficulty: "medium", question: "গুগল ডিপমাইন্ড কর্তৃক উন্মোচিত অত্যাধুনিক মাল্টিমোডাল এআই মডেল সিরিজের নাম কী?", options: ["ক্লদ", "জেমিনি (Gemini)", "লামা", "কোপাইলট"], answer: 1 },

  // ==========================================
  //  5. RECENT AFFAIRS — HARD
  // ==========================================
  { id: "ra_h1", topic: "Recent Affairs", difficulty: "hard", question: "আফ্রিকান ইউনিয়ন কর্তৃক চালু করা ঐতিহাসিক মহাদেশীয় মুক্ত বাণিজ্য চুক্তির সংক্ষিপ্ত রূপ কোনটি?", options: ["ECOWAS", "AfCFTA", "COMESA", "SADC"], answer: 1 },
  { id: "ra_h2", topic: "Recent Affairs", difficulty: "hard", question: "উন্মুক্ত সমুদ্রের জীববৈচিত্র্য রক্ষায় ২০২৩ সালে জাতিসংঘে গৃহীত ঐতিহাসিক চুক্তিটি কী নামে পরিচিত?", options: ["কিয়োটো প্রটোকল", "হাই সিজ ট্রিটি (BBNJ)", "মারপোল কনভেনশন", "রামসার কনভেনশন"], answer: 1 },
  { id: "ra_h3", topic: "Recent Affairs", difficulty: "hard", question: "২০২৪ সালে বিশ্বের প্রথম দেশ হিসেবে সংবিধানে গর্ভপাতের অধিকার স্পষ্টভাবে অন্তর্ভুক্ত করে কোন দেশ?", options: ["সুইডেন", "ফ্রান্স", "স্পেন", "জার্মানি"], answer: 1 },
  { id: "ra_h4", topic: "Recent Affairs", difficulty: "hard", question: "জেমস ওয়েব স্পেস টেলিস্কোপ (JWST) ফ্রেঞ্চ গায়ানা থেকে কোন রকেটে করে উৎক্ষেপণ করা হয়েছিল?", options: ["ফ্যালকন হেভি", "অ্যারিয়ান ৫ (Ariane 5)", "অ্যাটলাস ৫", "ডেল্টা ৪"], answer: 1 },
  { id: "ra_h5", topic: "Recent Affairs", difficulty: "hard", question: "জাতিসমূহের সমৃদ্ধিতে প্রাতিষ্ঠানিক ভূমিকার প্রভাব গবেষণার জন্য ২০২৪ সালে অর্থনীতিতে নোবেল পান কারা?", options: ["অ্যাসেমোগলু, জনসন ও রবিনসন", "বার্নানকে, ডায়মন্ড ও ডিবভিগ", "ব্যানার্জি, দুফলো ও ক্রেমার", "কার্ড, আংরিস্ট ও ইমবেন্স"], answer: 0 },
  { id: "ra_h6", topic: "Recent Affairs", difficulty: "hard", question: "২০২৪ সালের সেপ্টেম্বরে জাতিসংঘের সামিট অব দ্য ফিউচারে গৃহীত ঐতিহাসিক সনদের নাম কী?", options: ["জেনেভা অ্যাকর্ড", "প্যাক্ট ফর দ্য ফিউচার (Pact for the Future)", "গ্লোবাল কার্বন প্যাক্ট", "ভিশন ২০৫০ প্রটোকল"], answer: 1 },
  { id: "ra_h7", topic: "Recent Affairs", difficulty: "hard", question: "বিশ্বের ৩৫টি দেশের সহযোগিতায় ফ্রান্সে নির্মিত বৃহত্তম পরীক্ষামূলক ফিউশন রিঅ্যাক্টরটির নাম কী?", options: ["JET", "ITER", "EAST", "NIF"], answer: 1 },
  { id: "ra_h8", topic: "Recent Affairs", difficulty: "hard", question: "২০২৩ সালের জি-২০ সম্মেলনে ভারত, মধ্যপ্রাচ্য ও ইউরোপকে সংযুক্ত করতে ঘোষিত অর্থনৈতিক করিডোরের নাম কী?", options: ["CPEC", "IMEC (India-Middle East-Europe Corridor)", "INSTC", "BRI"], answer: 1 },

  // ==========================================
  //  6. ENTERTAINMENT — EASY
  // ==========================================
  { id: "en_e1", topic: "Entertainment", difficulty: "easy", question: "মার্ভেল সিনেমাটিক ইউনিভার্সে 'টনি স্টার্ক' (আয়রন ম্যান) চরিত্রে অভিনয় করেছেন কে?", options: ["ক্রিস ইভানস", "রবার্ট ডাউনি জুনিয়র", "ক্রিস হেমসওয়ার্থ", "মার্ক রাফালো"], answer: 1 },
  { id: "en_e2", topic: "Entertainment", difficulty: "easy", question: "সঙ্গীত জগতে বিশ্বব্যাপী কাকে 'কিং অব পপ' (King of Pop) হিসেবে অভিহিত করা হয়?", options: ["এলভিস প্রেসলি", "মাইকেল জ্যাকসন", "প্রিন্স", "ফ্রেডি মার্কারি"], answer: 1 },
  { id: "en_e3", topic: "Entertainment", difficulty: "easy", question: "বিশ্বখ্যাত সাত খণ্ডের 'হ্যারি পটার' জাদুকরী উপন্যাস সিরিজের রচয়িতা কে?", options: ["জে আর আর টলকিন", "জর্জ আর আর মার্টিন", "জে কে রাউলিং", "সি এস লুইস"], answer: 2 },
  { id: "en_e4", topic: "Entertainment", difficulty: "easy", question: "জনপ্রিয় কমেডি টেলিভিশন সিরিজ 'ফ্রেন্ডস' (Friends)-এর পটভূমি কোন শহর?", options: ["লস অ্যাঞ্জেলেস", "শিকাগো", "নিউইয়র্ক সিটি", "মিয়ামি"], answer: 2 },
  { id: "en_e5", topic: "Entertainment", difficulty: "easy", question: "ডিজনির কোন বিখ্যাত অ্যানিমেশন চলচ্চিত্রের গান 'লেট ইট গো' (Let It Go) বিশ্বজুড়ে সাড়া ফেলেছিল?", options: ["মোয়ানা", "ট্যাঙ্গেল্ড", "ফ্রোজেন (Frozen)", "ব্রেভ"], answer: 2 },
  { id: "en_e6", topic: "Entertainment", difficulty: "easy", question: "কালজয়ী মাস্টারপিস 'বোহেমিয়ান র‍্যাপসোডি' গানটি কোন ব্রিটিশ রক ব্যান্ডের সৃষ্টি?", options: ["দ্য বিটলস", "পিংক ফ্লয়েড", "কুইন (Queen)", "দ্য রোলিং স্টোনস"], answer: 2 },
  { id: "en_e7", topic: "Entertainment", difficulty: "easy", question: "ব্রিটিশ লেখক ইয়ান ফ্লেমিংয়ের সৃষ্ট কাল্পনিক গুপ্তচর জেমস বন্ডের কোড নম্বর কত?", options: ["০০১", "০০৭", "৭৭৭", "৯৯৯"], answer: 1 },
  { id: "en_e8", topic: "Entertainment", difficulty: "easy", question: "গোথাম সিটির রক্ষক 'ডার্ক নাইট' নামে পরিচিত বিখ্যাত কমিকস সুপারহিরো কে?", options: ["সুপারম্যান", "স্পাইডার-ম্যান", "ব্যাটম্যান (Batman)", "উলভারিন"], answer: 2 },

  // ==========================================
  //  6. ENTERTAINMENT — MEDIUM
  // ==========================================
  { id: "en_m1", topic: "Entertainment", difficulty: "medium", question: "সিনেমা জগতের আলোড়ন সৃষ্টিকারী চলচ্চিত্র 'ইনসেপশন', 'ইন্টারস্টেলার' এবং 'ওপেনহাইমার'-এর পরিচালক কে?", options: ["স্টিভেন স্পিলবার্গ", "ক্রিস্টোফার নোলান", "জেমস ক্যামেরন", "দ্যনি ভিলনোভ"], answer: 1 },
  { id: "en_m2", topic: "Entertainment", difficulty: "medium", question: "অস্কারজয়ী অ্যানিমেশন চলচ্চিত্র 'স্পিরিটেড অ্যাওয়ে' কোন বিখ্যাত জাপানি স্টুডিওর সৃষ্টি?", options: ["টোই অ্যানিমেশন", "স্টুডিও গিবলি (Studio Ghibli)", "ম্যাডহাউস", "কিয়োটো অ্যানিমেশন"], answer: 1 },
  { id: "en_m3", topic: "Entertainment", difficulty: "medium", question: "এইচবিওর বিশ্বখ্যাত ড্রামা সিরিজ 'গেম অব থ্রোনস' জর্জ আর আর মার্টিনের কোন বই সিরিজ অবলম্বনে নির্মিত?", options: ["দ্য হুইল অব টাইম", "আ সং অব আইস অ্যান্ড ফায়ার", "দ্য ডার্ক টাওয়ার", "দ্য কিংফিলার ক্রনিকল"], answer: 1 },
  { id: "en_m4", topic: "Entertainment", difficulty: "medium", question: "সর্বকালের অন্যতম সেরা মাফিয়া ড্রামা 'দ্য গডফাদার' (১৯৭২) চলচ্চিত্রের পরিচালক কে?", options: ["মার্টিন স্করসেসি", "ফ্রান্সিস ফোর্ড কোপলা", "স্ট্যানলি কুবরিক", "সার্জিও লিওনে"], answer: 1 },
  { id: "en_m5", topic: "Entertainment", difficulty: "medium", question: "সঙ্গীতের ইতিহাসে সর্বাধিক ৩২টি গ্র্যামি অ্যাওয়ার্ড জয়ের সর্বকালের রেকর্ড কার?", options: ["টেইলর সুইফট", "অ্যাডেল", "বিয়ন্সে (Beyoncé)", "আরেথা ফ্র্যাঙ্কলিন"], answer: 2 },
  { id: "en_m6", topic: "Entertainment", difficulty: "medium", question: "আইএমডিবি-র শীর্ষ রেটিংপ্রাপ্ত সিনেমা 'দ্য শশাঙ্ক রিডেম্পশন' কোন লেখকের গল্প অবলম্বনে তৈরি?", options: ["স্টিফেন কিং", "জন গ্রিশাম", "ডিন কুন্টজ", "থমাস হ্যারিস"], answer: 0 },
  { id: "en_m7", topic: "Entertainment", difficulty: "medium", question: "১৯৭১ সালের বিখ্যাত ক্লাসিক রক গান 'স্টেয়ারওয়ে টু হ্যাভেন' কোন ব্যান্ডের সৃষ্টি?", options: ["দ্য হু", "লেড জেপেলিন (Led Zeppelin)", "ডিপ পার্পল", "ব্ল্যাক সাবাথ"], answer: 1 },
  { id: "en_m8", topic: "Entertainment", difficulty: "medium", question: "২০২০ সালের অস্কারে প্রথম অ-ইংরেজি ভাষার সিনেমা হিসেবে সেরা চলচ্চিত্রের অস্কার জেতে কোনটি?", options: ["ওল্ডবয়", "ট্রেন টু বুসান", "প্যারাসাইট (Parasite)", "দ্য হ্যান্ডমেইডেন"], answer: 2 },

  // ==========================================
  //  6. ENTERTAINMENT — HARD
  // ==========================================
  { id: "en_h1", topic: "Entertainment", difficulty: "hard", question: "১৯৩৭ সালে মুক্তিপ্রাপ্ত চলচ্চিত্রের ইতিহাসের প্রথম পূর্ণদৈর্ঘ্য রঙিন অ্যানিমেশন চলচ্চিত্র কোনটি?", options: ["ফ্যান্টাসিয়া", "স্নো হোয়াইট অ্যান্ড দ্য সেভেন ডোয়ার্ফস", "পিনোকিও", "বাম্বি"], answer: 1 },
  { id: "en_h2", topic: "Entertainment", difficulty: "hard", question: "মাত্র ২৫ বছর বয়সে যুগান্তকারী মাস্টারপিস 'সিটিজেন কেন' (১৯৪১) পরিচালনা ও অভিনয় করেন কে?", options: ["অ্যালফ্রেড হিচকক", "অরসন ওয়েলস (Orson Welles)", "বিলি ওয়াইল্ডার", "জন ফোর্ড"], answer: 1 },
  { id: "en_h3", topic: "Entertainment", difficulty: "hard", question: "ব্রডওয়ের ইতিহাসে দীর্ঘতম সময় ধরে প্রদর্শিত সঙ্গীতনাট্য (Musical) কোনটি?", options: ["ক্যাটস", "লে মিজারেবল", "দ্য ফ্যান্টম অব দি অপেরা", "শিকাগো"], answer: 2 },
  { id: "en_h4", topic: "Entertainment", difficulty: "hard", question: "১৯৯৪ সালের বিখ্যাত কাল্ট ক্রাইম চলচ্চিত্র 'পাল্প ফিকশন' (Pulp Fiction)-এর পরিচালক কে?", options: ["ডেভিড ফিঞ্চার", "কোয়েন্টিন টারান্টিনো", "গাই রিচি", "পল থমাস অ্যান্ডারসন"], answer: 1 },
  { id: "en_h5", topic: "Entertainment", difficulty: "hard", question: "১৯২৯ সালে অনুষ্ঠিত প্রথম অস্কার আসরে সেরা চলচ্চিত্রের পুরস্কার জিতেছিল কোন নির্বাক ছবি?", options: ["সানরাইজ", "উইংস (Wings)", "দ্য ব্রডওয়ে মেলোডি", "মেট্রোপলিস"], answer: 1 },
  { id: "en_h6", topic: "Entertainment", difficulty: "hard", question: "'স্টার ওয়ার্স', 'জুরাসিক পার্ক' ও 'ইন্ডিয়ানা জোন্স'-এর কালজয়ী ব্যাকগ্রাউন্ড মিউজিক কে রচনা করেন?", options: ["হ্যান্স জিমার", "এন্নিও মরিকোনে", "জন উইলিয়ামস (John Williams)", "হাওয়ার্ড শোর"], answer: 2 },
  { id: "en_h7", topic: "Entertainment", difficulty: "hard", question: "১৯২৭ সালের কোন সিনেমাটিকে প্রথম পূর্ণদৈর্ঘ্য সংলাপ ও গানসমৃদ্ধ সবাক চলচ্চিত্র (Talkie) ধরা হয়?", options: ["দ্য জ্যাজ সিঙ্গার (The Jazz Singer)", "মেট্রোপলিস", "সিটি লাইটস", "দ্য জেনারেল"], answer: 0 },
  { id: "en_h8", topic: "Entertainment", difficulty: "hard", question: "১৯৬৮ সালের বৈজ্ঞানিক কল্পকাহিনীর মাইলফলক চলচ্চিত্র '2001: A Space Odyssey'-এর পরিচালক কে?", options: ["রিডলি স্কট", "স্ট্যানলি কুবরিক (Stanley Kubrick)", "জর্জ লুকাস", "আর্থার সি ক্লার্ক"], answer: 1 },

  // ==========================================
  //  7. SCIENCE & TECHNOLOGY — EASY
  // ==========================================
  { id: "st_e1", topic: "Science & Technology", difficulty: "easy", question: "বিশুদ্ধ পানির রাসায়নিক সংকেত কোনটি?", options: ["CO₂", "H₂O", "NaCl", "O₂"], answer: 1 },
  { id: "st_e2", topic: "Science & Technology", difficulty: "easy", question: "সালোকসংশ্লেষণ প্রক্রিয়ায় সবুজ উদ্ভিদ বাতাস থেকে কোন গ্যাস গ্রহণ করে?", options: ["অক্সিজেন", "কার্বন ডাই অক্সাইড", "নাইট্রোজেন", "হাইড্রোজেন"], answer: 1 },
  { id: "st_e3", topic: "Science & Technology", difficulty: "easy", question: "প্রকৃতিতে পাওয়া সবচেয়ে কঠিনতম প্রাকৃতিক খনিজ কোনটি?", options: ["টোপাজ", "করান্ডাম", "হীরা (Diamond)", "কোয়ার্টজ"], answer: 2 },
  { id: "st_e4", topic: "Science & Technology", difficulty: "easy", question: "একজন প্রাপ্তবয়স্ক পূর্ণাঙ্গ মানবদেহে মোট অস্থির (হাড়) সংখ্যা কত?", options: ["১৮৬টি", "২০৬টি", "২২৬টি", "২৫৬টি"], answer: 1 },
  { id: "st_e5", topic: "Science & Technology", difficulty: "easy", question: "জীবকোষের কোন অঙ্গাণুকে 'কোষের পাওয়ার হাউস' (শক্তিঘর) বলা হয়?", options: ["রাইবোজোম", "মাইটোকন্ড্রিয়া", "নিউক্লিয়াস", "গলগি বডি"], answer: 1 },
  { id: "st_e6", topic: "Science & Technology", difficulty: "easy", question: "পর্যায় সারণিতে 'Au' প্রতীকটি কোন রাসায়নিক মৌলকে নির্দেশ করে?", options: ["রূপা", "স্বর্ণ (Gold)", "অ্যালুমিনিয়াম", "আর্গন"], answer: 1 },
  { id: "st_e7", topic: "Science & Technology", difficulty: "easy", question: "কোন অদৃশ্য প্রাকৃতিক বলের কারণে পৃথিবীর সমস্ত বস্তু কেন্দ্রের দিকে আকর্ষিত হয়?", options: ["চৌম্বক বল", "মহাকর্ষ/অভিকর্ষ বল", "ঘর্ষণ বল", "কেন্দ্রবিমুখী বল"], answer: 1 },
  { id: "st_e8", topic: "Science & Technology", difficulty: "easy", question: "আন্তর্জাতিক এসআই (SI) পদ্ধতিতে তড়িৎ প্রবাহের (Electric Current) একক কী?", options: ["ভোল্ট", "ওয়াট", "অ্যাম্পিয়ার", "ওহম"], answer: 2 },

  // ==========================================
  //  7. SCIENCE & TECHNOLOGY — MEDIUM
  // ==========================================
  { id: "st_m1", topic: "Science & Technology", difficulty: "medium", question: "জিনতত্ত্বে জিনগত তথ্যের মূল উপাদান 'DNA'-এর পূর্ণরূপ কী?", options: ["Deoxyribonucleic Acid", "Dynamic Nuclear Acid", "Dinitric Amino Acid", "Deoxyribose Nitrogen Assembly"], answer: 0 },
  { id: "st_m2", topic: "Science & Technology", difficulty: "medium", question: "শূন্য মাধ্যমে আলোর গতির আনুমানিক বেগ প্রতি সেকেন্ডে কত?", options: ["১,৫০,০০০ কিমি/সে", "৩,০০,০০০ কিমি/সে (3 × 10⁸ m/s)", "৫,০০,০০০ কিমি/সে", "১০,০০,০০০ কিমি/সে"], answer: 1 },
  { id: "st_m3", topic: "Science & Technology", difficulty: "medium", question: "রসায়নে pH স্কেল মূলত কোনো দ্রবণের কোন বৈশিষ্ট্য পরিমাপে ব্যবহৃত হয়?", options: ["তড়িৎ পরিবাহিতা", "হাইড্রোজেন আয়নের ঘনত্ব (অম্লত্ব বা ক্ষারত্ব)", "সান্দ্রতা", "ঘনত্ব"], answer: 1 },
  { id: "st_m4", topic: "Science & Technology", difficulty: "medium", question: "পরমাণুর নিউক্লিয়াসের চারপাশে ঋণাত্মক (Negative) চার্জ বহনকারী কণা কোনটি?", options: ["প্রোটন", "নিউট্রন", "ইলেকট্রন", "পজিট্রন"], answer: 2 },
  { id: "st_m5", topic: "Science & Technology", difficulty: "medium", question: "কোন রক্তের গ্রুপকে সার্বজনীন লোহিত রক্তকণিকা দাতা (Universal Donor) বলা হয়?", options: ["AB+", "O- (ও নেগেটিভ)", "A+", "B-"], answer: 1 },
  { id: "st_m6", topic: "Science & Technology", difficulty: "medium", question: "শুষ্ক বায়ুমণ্ডলে সর্বাধিক প্রায় ৭৮% পরিমাণ বিদ্যমান কোন গ্যাস?", options: ["অক্সিজেন", "কার্বন ডাই অক্সাইড", "নাইট্রোজেন", "আর্গন"], answer: 2 },
  { id: "st_m7", topic: "Science & Technology", difficulty: "medium", question: "আইনস্টাইনের বিখ্যাত ভর-শক্তি সমীকরণ E = mc² এ 'c' দ্বারা কী বোঝায়?", options: ["ইলেকট্রনের চার্জ", "আলোর গতিবেগ (Speed of Light)", "মহাকর্ষীয় ধ্রুবক", "ক্যালোরি"], answer: 1 },
  { id: "st_m8", topic: "Science & Technology", difficulty: "medium", question: "কোনো কঠিন পদার্থ তরলে পরিণত না হয়ে সরাসরি বাষ্পে রূপান্তর হওয়ার প্রক্রিয়াকে কী বলে?", options: ["বাষ্পীভবন", "ঊর্ধ্বপাতন (Sublimation)", "ঘনীভবন", "গলন"], answer: 1 },

  // ==========================================
  //  7. SCIENCE & TECHNOLOGY — HARD
  // ==========================================
  { id: "st_h1", topic: "Science & Technology", difficulty: "hard", question: "জিন প্রকৌশলে বিপ্লব সৃষ্টিকারী 'CRISPR'-এর সম্পূর্ণ পূর্ণরূপ কোনটি?", options: ["Clustered Regularly Interspaced Short Palindromic Repeats", "Cellular RNA In-Situ Processing Reaction", "Chromosomal Repair Integration System Protocol", "Catalytic Ribonucleic Protein Repressor"], answer: 0 },
  { id: "st_h2", topic: "Science & Technology", difficulty: "hard", question: "হাইজেনবার্গের অনিশ্চয়তা নীতি অনুসারে একসাথে নিখুঁতভাবে কোন দুটি পরিমাপ করা অসম্ভব?", options: ["ভর ও চার্জ", "অবস্থান ও ভরবেগ (Position & Momentum)", "গতি ও শক্তি", "তরঙ্গদৈর্ঘ্য ও বিস্তার"], answer: 1 },
  { id: "st_h3", topic: "Science & Technology", difficulty: "hard", question: "রসায়নে অ্যাভোগ্যাড্রো সংখ্যার (Avogadro's Constant) আনুমানিক মান কত?", options: ["6.022 × 10²³ mol⁻¹", "3.141 × 10⁸", "1.602 × 10⁻¹⁹ C", "6.626 × 10⁻³⁴ J·s"], answer: 0 },
  { id: "st_h4", topic: "Science & Technology", difficulty: "hard", question: "আলবার্ট আইনস্টাইন ১৯২১ সালে মূলত কোন আবিষ্কারের ব্যাখ্যার জন্য পদার্থবিজ্ঞানে নোবেল পান?", options: ["আপেক্ষিকতার বিশেষ তত্ত্ব", "আপেক্ষিকতার সাধারণ তত্ত্ব", "আলোক-তড়িৎ ক্রিয়া (Photoelectric Effect)", "ব্রাউনীয় গতি"], answer: 2 },
  { id: "st_h5", topic: "Science & Technology", difficulty: "hard", question: "২০১২ সালে সার্ন (CERN)-এ আবিষ্কৃত কোন মৌলিক কণা অন্যান্য কণাকে ভর প্রদান করে?", options: ["টপ কোয়ার্ক", "হিগস বোসন (Higgs Boson)", "তাউ নিউট্রিনো", "গ্লুয়ন"], answer: 1 },
  { id: "st_h6", topic: "Science & Technology", difficulty: "hard", question: "কোয়ান্টাম মেকানিক্সে প্ল্যাঙ্কের ধ্রুবকের (Planck's Constant, h) আনুমানিক মান কত?", options: ["6.626 × 10⁻³⁴ J·s", "1.380 × 10⁻²³ J/K", "9.109 × 10⁻³¹ kg", "8.314 J/(mol·K)"], answer: 0 },
  { id: "st_h7", topic: "Science & Technology", difficulty: "hard", question: "কোয়ান্টাম সুপারপজিশনের প্যারাডক্স ব্যাখ্যার জন্য ব্যবহৃত কাল্পনিক চিন্তা-পরীক্ষা কোনটি?", options: ["ম্যাক্সওয়েলের ডেমন", "শ্রয়ডিঙ্গারের বিড়াল (Schrödinger's Cat)", "ল্যাপ্লাসের ডেমন", "উইগনারের বন্ধু"], answer: 1 },
  { id: "st_h8", topic: "Science & Technology", difficulty: "hard", question: "আন্তর্জাতিক এসআই (SI) পদ্ধতিতে চৌম্বক প্রবাহ ঘনত্বের (Magnetic Flux Density) একক কী?", options: ["হেনরি", "টেসলা (Tesla)", "ওয়েবার", "ফ্যারাড"], answer: 1 },

  // ==========================================
  //  8. INVENTIONS & DISCOVERIES — EASY
  // ==========================================
  { id: "id_e1", topic: "Inventions & Discoveries", difficulty: "easy", question: "বাণিজ্যিকভাবে কার্যকর আধুনিক বৈদ্যুতিক বাতি (Incandescent Bulb) কে আবিষ্কার করেন?", options: ["নিকোলা টেসলা", "টমাস আলভা এডিসন", "আলেকজান্ডার গ্রাহাম বেল", "বেঞ্জামিন ফ্র্যাঙ্কলিন"], answer: 1 },
  { id: "id_e2", topic: "Inventions & Discoveries", difficulty: "easy", question: "১৯২৮ সালে পেনিসিলিন নামক প্রথম কার্যকর প্রাকৃতিক অ্যান্টিবায়োটিক কে আবিষ্কার করেন?", options: ["লুই পাস্তুর", "আলেকজান্ডার ফ্লেমিং", "রবার্ট কচ", "এডওয়ার্ড জেনার"], answer: 1 },
  { id: "id_e3", topic: "Inventions & Discoveries", difficulty: "easy", question: "গাছ থেকে আপেল পড়ার পর্যবেক্ষণ থেকে সার্বজনীন মহাকর্ষ সূত্র কে আবিষ্কার করেন?", options: ["গ্যালিলিও গ্যালিলি", "স্যার আইজ্যাক নিউটন", "আলবার্ট আইনস্টাইন", "জোহানেস কেপলার"], answer: 1 },
  { id: "id_e4", topic: "Inventions & Discoveries", difficulty: "easy", question: "১৮৭৬ সালে মানুষের ব্যবহারের উপযোগী ব্যবহারিক টেলিফোন আবিষ্কার ও পেটেন্ট করেন কে?", options: ["টমাস এডিসন", "আলেকজান্ডার গ্রাহাম বেল", "মার্কোনি", "স্যামুয়েল মোর্স"], answer: 1 },
  { id: "id_e5", topic: "Inventions & Discoveries", difficulty: "easy", question: "১৯৮৯ সালে সার্ন (CERN)-এ কর্মরত অবস্থায় ওয়ার্ল্ড ওয়াইড ওয়েব (WWW) উদ্ভাবন করেন কে?", options: ["বিল গেটস", "স্টিভ জবস", "টিম বার্নার্স-লি", "অ্যালান টুরিং"], answer: 2 },
  { id: "id_e6", topic: "Inventions & Discoveries", difficulty: "easy", question: "১৯০৩ সালে প্রথম সফল ইঞ্জিনচালিত উড়োজাহাজ চালিয়ে আকাশে ওড়েন কোন দুই ভাই?", options: ["মন্টগলফিয়ার ব্রাদার্স", "রাইট ভ্রাতৃদ্বয় (Orville & Wilbur)", "লুমিয়ার ব্রাদার্স", "ডাসল্ট ব্রাদার্স"], answer: 1 },
  { id: "id_e7", topic: "Inventions & Discoveries", difficulty: "easy", question: "১৭৯৬ সালে গোবসন্তের রস ব্যবহার করে গুটিবসন্তের বিশ্বের প্রথম সফল টিকা আবিষ্কার করেন কে?", options: ["লুই পাস্তুর", "এডওয়ার্ড জেনার", "জোনাস সাল্ক", "অ্যালবার্ট সাবিন"], answer: 1 },
  { id: "id_e8", topic: "Inventions & Discoveries", difficulty: "easy", question: "১৪৪০-এর দশকে ইউরোপে আধুনিক ধাতব অক্ষরের ছাপাখানা (Printing Press) উদ্ভাবন করেন কে?", options: ["জোহানেস গুটেনবার্গ", "উইলিয়াম ক্যাক্সটন", "লিওনার্দো দা ভিঞ্চি", "গ্যালিলিও"], answer: 0 },

  // ==========================================
  //  8. INVENTIONS & DISCOVERIES — MEDIUM
  // ==========================================
  { id: "id_m1", topic: "Inventions & Discoveries", difficulty: "medium", question: "১৮৯৫ সালে এক্স-রে (X-Ray) রশ্মি আবিষ্কার করে প্রথম পদার্থবিজ্ঞানে নোবেল পুরস্কার পান কে?", options: ["উইলহেম রন্টজেন", "হেনরি বেকারেল", "আর্নেস্ট রাদারফোর্ড", "ম্যাক্স প্ল্যাঙ্ক"], answer: 0 },
  { id: "id_m2", topic: "Inventions & Discoveries", difficulty: "medium", question: "অল্টারনেটিং কারেন্ট (AC) মোটর এবং এসি বিদ্যুৎ সরবরাহ ব্যবস্থার প্রধান উদ্ভাবক কে?", options: ["টমাস এডিসন", "নিকোলা টেসলা", "মাইকেল ফ্যারাডে", "জেমস ওয়াট"], answer: 1 },
  { id: "id_m3", topic: "Inventions & Discoveries", difficulty: "medium", question: "১৮৬৯ সালে মৌলসমূহের পারমাণবিক ভরভিত্তিক প্রথম পর্যায় সারণি আবিষ্কার করেন কে?", options: ["মিকাহিল লোমোনোসভ", "দিমিত্রি মেন্দেলিভ", "অঁতোয়ান লাভোয়াজিয়ে", "জন ডাল্টন"], answer: 1 },
  { id: "id_m4", topic: "Inventions & Discoveries", difficulty: "medium", question: "১৯৫৩ সালে ডিএনএ (DNA)-এর দ্বি-সূত্রক (Double Helix) গঠন কাঠামো আবিষ্কার করেন কারা?", options: ["ওয়াটসন ও ক্রিক", "বেন্টিং ও বেস্ট", "ফ্লেমিং ও ফ্লোরি", "মেন্ডেল ও মরগান"], answer: 0 },
  { id: "id_m5", topic: "Inventions & Discoveries", difficulty: "medium", question: "নাইট্রোগ্লিসারিন নিয়ন্ত্রণের মাধ্যমে ডিনামাইট আবিষ্কার করেন এবং পরবর্তীতে নোবেল পুরস্কার প্রতিষ্ঠা করেন কে?", options: ["আলফ্রেড নোবেল", "রবার্ট নোবেল", "ফ্রিৎস হেবার", "সভান্তে আরহেনিয়াস"], answer: 0 },
  { id: "id_m6", topic: "Inventions & Discoveries", difficulty: "medium", question: "১৯৫০-এর দশকের শুরুতে পোলিও রোগের কার্যকর প্রথম ভ্যাকসিন (IPV) কে উদ্ভাবন করেন?", options: ["অ্যালবার্ট সাবিন", "জোনাস সাল্ক", "লুই পাস্তুর", "আলেকজান্ডার ফ্লেমিং"], answer: 1 },
  { id: "id_m7", topic: "Inventions & Discoveries", difficulty: "medium", question: "১৮৯৬ সালে ইউরেনিয়াম থেকে স্বতঃস্ফূর্ত প্রাকৃতিক তেজস্ক্রিয়তা (Radioactivity) কে আবিষ্কার করেন?", options: ["মেরি ক্যুরি", "হেনরি বেকারেল", "পিয়েরে ক্যুরি", "এনরিকো ফার্মি"], answer: 1 },
  { id: "id_m8", topic: "Inventions & Discoveries", difficulty: "medium", question: "বেতার বা রেডিও তরঙ্গ যোগাযোগের সফল উদ্ভাবনের জন্য ১৯০৯ সালে নোবেল পান কে?", options: ["গুলিয়েলমো মার্কোনি", "হাইনরিশ হার্টজ", "আলেকজান্ডার পপভ", "লি ডি ফরেস্ট"], answer: 0 },

  // ==========================================
  //  8. INVENTIONS & DISCOVERIES — HARD
  // ==========================================
  { id: "id_h1", topic: "Inventions & Discoveries", difficulty: "hard", question: "১৯৪৭ সালে বেল ল্যাবসে আধুনিক ইলেকট্রনিক্সের মূল ভিত্তি 'ট্রানজিস্টর' আবিষ্কার করেন কারা?", options: ["বার্ডিন, ব্র্যাটেন ও শকলি", "কিলবি, নয়েস ও মুর", "টুরিং, ভন নিউম্যান ও একার্ট", "শক্লি, মুর ও গ্রোভ"], answer: 0 },
  { id: "id_h2", topic: "Inventions & Discoveries", difficulty: "hard", question: "রোগজীবাণু তত্ত্ব (Germ Theory) এবং জলাতঙ্ক রোগের ভ্যাকসিন আবিষ্কার করেন কে?", options: ["রবার্ট কচ", "লুই পাস্তুর", "জোসেফ লিস্টার", "পল এরলিখ"], answer: 1 },
  { id: "id_h3", topic: "Inventions & Discoveries", difficulty: "hard", question: "১৬২৮ সালে মানবদেহে হৃদপিণ্ডের মাধ্যমে রক্ত সঞ্চালন প্রক্রিয়ার সঠিক বৈজ্ঞানিক বর্ণনা দেন কে?", options: ["আন্দ্রেয়াস ভেসালিয়াস", "উইলিয়াম হার্ভে", "গ্যালেন", "মার্সেলো মালপিগি"], answer: 1 },
  { id: "id_h4", topic: "Inventions & Discoveries", difficulty: "hard", question: "কম্পিউটারের আদি রূপ 'ডিফারেন্স ইঞ্জিন' ও 'অ্যানালিটিক্যাল ইঞ্জিন'-এর নকশা তৈরি করেন কে?", options: ["চার্লস ব্যাবেজ", "অ্যালান টুরিং", "আডা লাভলেস", "হারম্যান হলেরিথ"], answer: 0 },
  { id: "id_h5", topic: "Inventions & Discoveries", difficulty: "hard", question: "মহাবিশ্বের সৃষ্টির বিগ ব্যাং তত্ত্বের প্রত্যক্ষ প্রমাণ 'কসমিক মাইক্রোওয়েভ ব্যাকগ্রাউন্ড' কে আবিষ্কার করেন?", options: ["এডউইন হাবল ও মিল্টন হিউমাসন", "আর্নো পেনজিয়াস ও রবার্ট উইলসন", "কার্ল সাগান ও ফ্র্যাঙ্ক ড্রেক", "জর্জেস লেমেত্র ও এডিংটন"], answer: 1 },
  { id: "id_h6", topic: "Inventions & Discoveries", difficulty: "hard", question: "পদার্থ ও রসায়ন—বিজ্ঞানের দুটি ভিন্ন শাখায় নোবেল পুরস্কার অর্জনকারী একমাত্র বিজ্ঞানী কে?", options: ["লিনাস পাওলিং", "মেরি ক্যুরি", "জন বার্ডিন", "ফ্রেডরিক স্যাঙ্গার"], answer: 1 },
  { id: "id_h7", topic: "Inventions & Discoveries", difficulty: "hard", question: "১৭৬৯ সালে পৃথক কনডেনসারযুক্ত আধুনিক বাষ্পীয় ইঞ্জিন (Steam Engine) উন্নত করেন কে?", options: ["টমাস নিউকোমেন", "জেমস ওয়াট", "জর্জ স্টিফেনসন", "রিচার্ড ট্রেভিথিক"], answer: 1 },
  { id: "id_h8", topic: "Inventions & Discoveries", difficulty: "hard", question: "১৯৩২ সালে পরমাণুর চার্জহীন মৌলিক কণা 'নিউট্রন' (Neutron) আবিষ্কার করেন কে?", options: ["আর্নেস্ট রাদারফোর্ড", "জেমস চ্যাডউইক", "জে জে থমসন", "নিলস বোর"], answer: 1 },

  // ==========================================
  //  9. POLITICS & GOVERNMENT — EASY
  // ==========================================
  { id: "pg_e1", topic: "Politics & Government", difficulty: "easy", question: "জনগণের দ্বারা, জনগণের জন্য ও জনগণের শাসন ব্যবস্থাকে কী বলা হয়?", options: ["স্বৈরতন্ত্র", "অভিজাততন্ত্র", "গণতন্ত্র (Democracy)", "রাজতন্ত্র"], answer: 2 },
  { id: "pg_e2", topic: "Politics & Government", difficulty: "easy", question: "একটি দেশের শাসন পরিচালনার সর্বোচ্চ ও মৌলিক আইন দলিল কোনটি?", options: ["অধ্যাদেশ", "সংবিধান (Constitution)", "চুক্তিপত্র", "ডিক্রি"], answer: 1 },
  { id: "pg_e3", topic: "Politics & Government", difficulty: "easy", question: "আধুনিক গণতান্ত্রিক সরকারের তিনটি প্রধান অঙ্গ বা বিভাগ কোনগুলো?", options: ["নির্বাহী, আইন ও বিচার বিভাগ", "সামরিক, বেসামরিক ও রাজনৈতিক বিভাগ", "পুলিশ, আদালত ও সংসদ", "কেন্দ্রীয়, প্রাদেশিক ও স্থানীয়"], answer: 0 },
  { id: "pg_e4", topic: "Politics & Government", difficulty: "easy", question: "যে শাসন ব্যবস্থায় উত্তরাধিকার সূত্রে রাজা বা রানী রাষ্ট্রের প্রধান হন তাকে কী বলে?", options: ["প্রজাতন্ত্র", "রাজতন্ত্র (Monarchy)", "ধর্মতন্ত্র", "নৈরাজ্যবাদ"], answer: 1 },
  { id: "pg_e5", topic: "Politics & Government", difficulty: "easy", question: "মার্কিন যুক্তরাষ্ট্রের সিনেটে (Senate) প্রতিটি অঙ্গরাজ্য থেকে মোট কতজন সদস্য থাকেন (মোট ১০০)?", options: ["১ জন", "২ জন", "৩ জন", "৫ জন"], answer: 1 },
  { id: "pg_e6", topic: "Politics & Government", difficulty: "easy", question: "১৯৪৫ সালে বিশ্বশান্তি ও আন্তর্জাতিক সহযোগিতা রক্ষার লক্ষ্যে প্রতিষ্ঠিত শীর্ষ সংস্থা কোনটি?", options: ["লিগ অব নেশনস", "জাতিসংঘ (United Nations)", "বিশ্ব বাণিজ্য সংস্থা", "ইন্টারপোল"], answer: 1 },
  { id: "pg_e7", topic: "Politics & Government", difficulty: "easy", question: "সংসদীয় সরকার ব্যবস্থায় সরকারের প্রধান নির্বাহী বা চিফ এক্সিকিউটিভ কে হন?", options: ["রাষ্ট্রপতি", "প্রধানমন্ত্রী (Prime Minister)", "স্পিকার", "প্রধান বিচারপতি"], answer: 1 },
  { id: "pg_e8", topic: "Politics & Government", difficulty: "easy", question: "কোনো বিশেষ জাতীয় বিষয়ে দেশের সমস্ত ভোটারের সরাসরি মতামত গ্রহণের ভোটকে কী বলে?", options: ["ককাস", "প্রাইমারি", "গণভোট (Referendum)", "উপনির্বাচন"], answer: 2 },

  // ==========================================
  //  9. POLITICS & GOVERNMENT — MEDIUM
  // ==========================================
  { id: "pg_m1", topic: "Politics & Government", difficulty: "medium", question: "'দ্য সোশ্যাল কন্ট্রাক্ট' গ্রন্থের রচয়িতা কোন ফরাসি দার্শনিক যিনি সাধারণ ইচ্ছার কথা বলেন?", options: ["টমাস হবস", "জন লক", "জঁ-জ্যাক রুশো", "ভলতেয়ার"], answer: 2 },
  { id: "pg_m2", topic: "Politics & Government", difficulty: "medium", question: "আইনসভার ক্ষেত্রে 'দ্বিকক্ষবিশিষ্ট' (Bicameral) কথাটির অর্থ কী?", options: ["দুই বছর পর নির্বাচন", "আইনসভা দুটি পৃথক কক্ষ বা সভায় বিভক্ত", "দুই দলের সংসদ", "দুই প্রধানের সরকার"], answer: 1 },
  { id: "pg_m3", topic: "Politics & Government", difficulty: "medium", question: "'দ্য স্পিরিট অব দ্য লজ' গ্রন্থে সরকারের ক্ষমতা স্বতন্ত্রীকরণ নীতির প্রবক্তা কে?", options: ["রুশো", "মন্টেস্কু (Montesquieu)", "দিদেরো", "ম্যাকিয়াভেলি"], answer: 1 },
  { id: "pg_m4", topic: "Politics & Government", difficulty: "medium", question: "নির্বাচনী এলাকার সীমানা কোনো নির্দিষ্ট দলের সুবিধার জন্য পরিবর্তন করার চাতুর্যকে কী বলে?", options: ["ফিলিবাস্টার", "জেরিম্যান্ডারিং (Gerrymandering)", "লগরোলিং", "পর্ক ব্যারেল"], answer: 1 },
  { id: "pg_m5", topic: "Politics & Government", difficulty: "medium", question: "বিশ্বের বৃহত্তম ও দীর্ঘতম লিখিত সংবিধান কোন দেশের?", options: ["যুক্তরাষ্ট্র", "ভারত", "ব্রাজিল", "দক্ষিণ আফ্রিকা"], answer: 1 },
  { id: "pg_m6", topic: "Politics & Government", difficulty: "medium", question: "সংসদীয় পদ্ধতিতে প্রধানমন্ত্রী ও মন্ত্রিসভার ওপর সংখ্যাগরিষ্ঠ সমর্থন প্রত্যাহারের প্রস্তাবকে কী বলে?", options: ["ভেটো প্রস্তাব", "অনাস্থা প্রস্তাব (Vote of No Confidence)", "ইমপিচমেন্ট", "স্থগিত প্রস্তাব"], answer: 1 },
  { id: "pg_m7", topic: "Politics & Government", difficulty: "medium", question: "১২১৫ সালে ইংল্যান্ডের রাজা জনের স্বাক্ষরিত কোন সনদ আইনের শাসনের ঐতিহাসিক ভিত্তি গড়ে?", options: ["বিল অব রাইটস", "ম্যাগনা কার্টা (Magna Carta)", "হেবিয়াস কর্পাস", "পিটিশন অব রাইট"], answer: 1 },
  { id: "pg_m8", topic: "Politics & Government", difficulty: "medium", question: "যে শাসন ব্যবস্থায় কেন্দ্রীয় সরকার ও প্রাদেশিক সরকারগুলোর মধ্যে সাংবিধানিক ক্ষমতা বণ্টিত থাকে তাকে কী বলে?", options: ["এককেন্দ্রিক", "যুক্তরাষ্ট্রীয় (Federalism)", "কনফেডারেশন", "সর্বগ্রাসী"], answer: 1 },

  // ==========================================
  //  9. POLITICS & GOVERNMENT — HARD
  // ==========================================
  { id: "pg_h1", topic: "Politics & Government", difficulty: "hard", question: "রাজনৈতিক ক্ষমতা অর্জন ও রক্ষার বাস্তববাদী কৌশল নিয়ে 'দ্য প্রিন্স' গ্রন্থটি কে রচনা করেন?", options: ["টমাস মোর", "নিকোলো ম্যাকিয়াভেলি", "ইরাসমাস", "দান্তে"], answer: 1 },
  { id: "pg_h2", topic: "Politics & Government", difficulty: "hard", question: "সব জটিল সংস্থাই শেষ পর্যন্ত মুষ্টিমেয়দের দ্বারা নিয়ন্ত্রিত হয়—এই 'অলিগার্কির লৌহবিধি' কার?", options: ["ম্যাক্স ওয়েবার", "রবার্ট মিশেলস (Robert Michels)", "এমিল ডুরখেইম", "ভিলফ্রেডো প্যারেটো"], answer: 1 },
  { id: "pg_h3", topic: "Politics & Government", difficulty: "hard", question: "বাংলাদেশের সংবিধানের কোন ভাগে মৌলিক অধিকারসমূহ (অনুচ্ছেদ ২৬ থেকে ৪৭ক) নিশ্চিত করা হয়েছে?", options: ["প্রথম ভাগ", "দ্বিতীয় ভাগ", "তৃতীয় ভাগ", "চতুর্থ ভাগ"], answer: 2 },
  { id: "pg_h4", topic: "Politics & Government", difficulty: "hard", question: "১৮০৩ সালের কোন ঐতিহাসিক মামলার রায়ে মার্কিন সুপ্রিম কোর্ট 'বিচার বিভাগীয় পর্যালোচনা' (Judicial Review) প্রতিষ্ঠা করে?", options: ["ম্যাককুলাচ বনাম মেরিল্যান্ড", "মারবারি বনাম ম্যাডিসন (Marbury v. Madison)", "গিবনস বনাম ওগডেন", "ড্রেড স্কট বনাম স্যান্ডফোর্ড"], answer: 1 },
  { id: "pg_h5", topic: "Politics & Government", difficulty: "hard", question: "প্রকৃতির রাজ্যে মানুষের জীবন 'একাকী, দরিদ্র, নোংরা, পাশবিক ও স্বল্পস্থায়ী'—কার যুক্তি?", options: ["জন লক", "টমাস হবস (Leviathan)", "ডেভিড হিউম", "জন স্টুয়ার্ট মিল"], answer: 1 },
  { id: "pg_h6", topic: "Politics & Government", difficulty: "hard", question: "প্রাপ্ত ভোটের শতকরা অনুপাতের ভিত্তিতে সংসদে আসন বণ্টনের নির্বাচনী পদ্ধতি কোনটি?", options: ["ফার্স্ট-পাস্ট-দ্য-পোস্ট", "সংখ্যানুপাতিক প্রতিনিধিত্ব (Proportional Representation)", "র‌্যাঙ্কড চয়েস", "টু-রাউন্ড রানঅফ"], answer: 1 },
  { id: "pg_h7", topic: "Politics & Government", difficulty: "hard", question: "কোনো সরকারি বা সংবিধিবদ্ধ কর্তৃপক্ষকে আইনগত দায়িত্ব পালনের নির্দেশ দিয়ে উচ্চ আদালতের জারি করা রিট কোনটি?", options: ["হেবিয়াস কর্পাস", "ম্যান্ডামাস (Mandamus / পরমাদেশ)", "সার্টিওরারি", "কুয়ো ওয়ারেন্টো"], answer: 1 },
  { id: "pg_h8", topic: "Politics & Government", difficulty: "hard", question: "আন্তর্জাতিক Relations-এ সাংস্কৃতিক ও মূল্যবোধের আকর্ষণভিত্তিক 'সফট পাওয়ার' ধারণার জনক কে?", options: ["স্যামুয়েল পি হান্টিংটন", "জোসেফ নাই (Joseph Nye)", "ফ্রান্সিস ফুকুইয়ামা", "হেনরি কিসিঞ্জার"], answer: 1 },

  // ==========================================
  //  10. COMPUTER & INTERNET — EASY
  // ==========================================
  { id: "ci_e1", topic: "Computer & Internet", difficulty: "easy", question: "কম্পিউটার হার্ডওয়্যারের ক্ষেত্রে 'CPU'-এর পূর্ণরূপ কোনটি?", options: ["Central Processing Unit", "Computer Personal Utility", "Core Program Unit", "Central Peripheral Unit"], answer: 0 },
  { id: "ci_e2", topic: "Computer & Internet", difficulty: "easy", question: "ইন্টারনেটে ওয়েব ঠিকানার ক্ষেত্রে 'URL'-এর পূর্ণরূপ কী?", options: ["Universal Resource Link", "Uniform Resource Locator", "Unified Reference Locator", "United Record Location"], answer: 1 },
  { id: "ci_e3", topic: "Computer & Internet", difficulty: "easy", question: "কম্পিউটার নেটওয়ার্কে ইন্টারনেটের সাথে যুক্ত করতে এবং ডেটা প্যাকেট পাঠাতে কোন ডিভাইস ব্যবহৃত হয়?", options: ["মনিটর", "রাউটার (Router)", "হার্ডড্রাইভ", "প্রিন্টার"], answer: 1 },
  { id: "ci_e4", topic: "Computer & Internet", difficulty: "easy", question: "কম্পিউটারের প্রাথমিক অস্থায়ী মেমোরি 'RAM'-এর পূর্ণরূপ কী?", options: ["Read Access Memory", "Random Access Memory", "Rapid Application Module", "Running Action Memory"], answer: 1 },
  { id: "ci_e5", topic: "Computer & Internet", difficulty: "easy", question: "ওয়েব ব্রাউজিংয়ে ব্যবহৃত স্ট্যান্ডার্ড প্রোটোকল 'HTTP'-এর পূর্ণরূপ কী?", options: ["HyperText Transfer Protocol", "High Transfer Tech Protocol", "Hyper Terminal Text Program", "Home Technology Transfer Protocol"], answer: 0 },
  { id: "ci_e6", topic: "Computer & Internet", difficulty: "easy", question: "জনপ্রিয় মোবাইল অপারেটিং সিস্টেম অ্যান্ড্রয়েড (Android) কোন প্রযুক্তি কোম্পানির তৈরি?", options: ["অ্যাপল", "গুগল (Google)", "মাইক্রোসফট", "স্যামসাং"], answer: 1 },
  { id: "ci_e7", topic: "Computer & Internet", difficulty: "easy", question: "ডিজিটাল ডকুমেন্টের জন্য বহুল ব্যবহৃত ফাইল ফরম্যাট 'PDF'-এর পূর্ণরূপ কী?", options: ["Personal Data File", "Portable Document Format", "Printable Document File", "Program Digital Format"], answer: 1 },
  { id: "ci_e8", topic: "Computer & Internet", difficulty: "easy", question: "কম্পিউটার সিস্টেমে গোপনে অনুপ্রবেশ ও ক্ষতিসাধনের জন্য তৈরি ক্ষতিকর প্রোগ্রামকে কী বলে?", options: ["হার্ডওয়্যার", "ফার্মওয়্যার", "ম্যালওয়্যার / ভাইরাস", "মিডলওয়্যার"], answer: 2 },

  // ==========================================
  //  10. COMPUTER & INTERNET — MEDIUM
  // ==========================================
  { id: "ci_m1", topic: "Computer & Internet", difficulty: "medium", question: "নিরাপদ ওয়েব যোগাযোগের জন্য 'HTTPS' প্রোটোকলে সাধারণ HTTP-এর চেয়ে বাড়তি কী থাকে?", options: ["উচ্চতর ব্রাউজিং স্পিড", "SSL/TLS ভিত্তিক এন্ড-টু-এন্ড এনক্রিপশন", "এসইও রেটিং সুবিধা", "মাল্টিমিডিয়া কম্প্রেশন"], answer: 1 },
  { id: "ci_m2", topic: "Computer & Internet", difficulty: "medium", question: "ইন্টারনেট নেটওয়ার্কিংয়ে 'IP' ঠিকানার ক্ষেত্রে 'IP'-এর পূর্ণরূপ কী?", options: ["Internet Protocol", "Information Path", "Internal Program", "Interconnected Point"], answer: 0 },
  { id: "ci_m3", topic: "Computer & Internet", difficulty: "medium", question: "ইন্টারনেটে ডোমেন নেম সিস্টেম (DNS)-এর প্রধান কাজ কী?", options: ["ইমেইল এনক্রিপ্ট করা", "ওয়েবসাইটের নামকে আইপি (IP) ঠিকানায় রূপান্তর করা", "ম্যালওয়্যার দূর করা", "স্পিড বাড়ানো"], answer: 1 },
  { id: "ci_m4", topic: "Computer & Internet", difficulty: "medium", question: "১৯৯১ সালে লিনুস তোরভালদস কোন ওপেন-সোর্স অপারেটিং সিস্টেমের কার্নেল তৈরি করেন?", options: ["ফ্রিবিএসডি", "লিনাক্স (Linux)", "মিনিক্স", "সোলারিস"], answer: 1 },
  { id: "ci_m5", topic: "Computer & Internet", difficulty: "medium", question: "ডাটাবেজ ব্যবস্থাপনায় ব্যবহৃত আন্তর্জাতিক স্ট্যান্ডার্ড ভাষা 'SQL'-এর পূর্ণরূপ কী?", options: ["Simple Query Language", "Structured Query Language", "Sequential Question Logic", "System Query Language"], answer: 1 },
  { id: "ci_m6", topic: "Computer & Internet", difficulty: "medium", question: "কম্পিউটার বাইনারি স্টোরেজের হিসেবে ঠিক কত মেগাবাইট (MB) সমান ১ গিগাবাইট (GB)?", options: ["১০০ মেগাবাইট", "৫০০ মেগাবাইট", "১০০০ মেগাবাইট", "১০২৪ মেগাবাইট"], answer: 3 },
  { id: "ci_m7", topic: "Computer & Internet", difficulty: "medium", question: "ইন্টারনেটে গোপনীয়তা ও নিরাপদ নেটওয়ার্ক টানেলিংয়ের জন্য ব্যবহৃত 'VPN'-এর পূর্ণরূপ কী?", options: ["Virtual Private Network", "Variable Port Node", "Visual Processing Network", "Verified Protocol Name"], answer: 0 },
  { id: "ci_m8", topic: "Computer & Internet", difficulty: "medium", question: "আধুনিক দ্রুতগতির ফ্ল্যাশ স্টোরেজ ড্রাইভ 'SSD'-এর পূর্ণরূপ কী?", options: ["Super Speed Disk", "Solid State Drive", "System Storage Device", "Serial Signal Drive"], answer: 1 },

  // ==========================================
  //  10. COMPUTER & INTERNET — HARD
  // ==========================================
  { id: "ci_h1", topic: "Computer & Internet", difficulty: "hard", question: "কম্পিউটার নেটওয়ার্কিংয়ের তাত্ত্বিক ওএসআই (OSI) মডেলে মোট কয়টি লেয়ার বা স্তর রয়েছে?", options: ["৪টি স্তর", "৫টি স্তর", "৭টি স্তর", "৯টি স্তর"], answer: 2 },
  { id: "ci_h2", topic: "Computer & Internet", difficulty: "hard", question: "৩২-বিটের IPv4-এর তুলনায় নতুন সংস্করণের IPv6 ঠিকানার দৈর্ঘ্য কত বিট?", options: ["৬৪ বিট", "১২৮ বিট", "২৫৬ বিট", "৫১২ বিট"], answer: 1 },
  { id: "ci_h3", topic: "Computer & Internet", difficulty: "hard", question: "এনক্রিপশন ও ডিক্রিপশনের জন্য পাবলিক ও প্রাইভেট কী জোড়া ব্যবহার করা এনক্রিপশন পদ্ধতি কোনটি?", options: ["সিমেট্রিক এনক্রিপশন", "অ্যাসিমেট্রিক (পাবলিক-কী) এনক্রিপশন", "হ্যাশিং", "স্টেগানোগ্রাফি"], answer: 1 },
  { id: "ci_h4", topic: "Computer & Internet", difficulty: "hard", question: "১৯৪৫ সালে নির্মিত বিশ্বের প্রথম ইলেকট্রনিক জেনারেল-পারপাস ডিজিটাল কম্পিউটার কোনটি?", options: ["UNIVAC I", "ENIAC", "Colossus", "Manchester Baby"], answer: 1 },
  { id: "ci_h5", topic: "Computer & Internet", difficulty: "hard", question: "টিসিপি (TCP) নেটওয়ার্কে সংযোগ স্থাপনের প্রারম্ভিক প্রক্রিয়াকে কী বলা হয়?", options: ["টু-ওয়ে পিং", "থ্রি-ওয়ে হ্যান্ডশেক (SYN, SYN-ACK, ACK)", "ফোর-ওয়ে ফিনিশ", "স্লাইডিং উইন্ডো"], answer: 1 },
  { id: "ci_h6", topic: "Computer & Internet", difficulty: "hard", question: "সাইবার নিরাপত্তায় যে ত্রুটির কোনো সমাধান বা প্যাচ এখনো তৈরি হয়নি তাকে কী বলে?", options: ["জিরো-ডে ভালনারেবিলিটি (Zero-Day)", "ব্রুট ফোর্স অ্যাটাক", "ম্যান-ইন-দ্য-মিডল", "এসকিউএল ইনজেকশন"], answer: 0 },
  { id: "ci_h7", topic: "Computer & Internet", difficulty: "hard", question: "একটি সাজানো (Sorted) অ্যারেতে বাইনারি সার্চ অ্যালগরিদমের টাইম কমপ্লেক্সিটি কত?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 1 },
  { id: "ci_h8", topic: "Computer & Internet", difficulty: "hard", question: "বিটকয়েন ব্লকচেইনে লেনদেন যাচাই ও নতুন ব্লক যুক্ত করার মূল ঐকমত্য পদ্ধতি কোনটি?", options: ["প্রুফ অব স্টেক (PoS)", "প্রুফ অব ওয়ার্ক (Proof of Work - PoW)", "প্রুফ অব অথরিটি", "ডেলিগেটেড বিএফটি"], answer: 1 },

  // ==========================================
  //  11. SPACE & ASTRONOMY — EASY
  // ==========================================
  { id: "sa_e1", topic: "Space & Astronomy", difficulty: "easy", question: "আমাদের পৃথিবী গ্রহের সবচেয়ে নিকটতম নক্ষত্র কোনটি?", options: ["প্রক্সিমা সেন্টরাই", "সিরিয়াস", "সূর্য (The Sun)", "আলফা সেন্টরাই"], answer: 2 },
  { id: "sa_e2", topic: "Space & Astronomy", difficulty: "easy", question: "আমাদের সৌরজগতের সবচেয়ে বৃহত্তম গ্রহ কোনটি?", options: ["শনি", "বৃহস্পতি (Jupiter)", "নেপচুন", "ইউরেনাস"], answer: 1 },
  { id: "sa_e3", topic: "Space & Astronomy", difficulty: "easy", question: "পৃষ্ঠে আয়রন অক্সাইডের উপস্থিতির কারণে সৌরজগতের কোন গ্রহকে 'লাল গ্রহ' বলা হয়?", options: ["শুক্র", "মঙ্গল (Mars)", "বুধ", "বৃহস্পতি"], answer: 1 },
  { id: "sa_e4", topic: "Space & Astronomy", difficulty: "easy", question: "১৯৬১ সালে ভস্টক-১ মহাকাশযানে চেপে ইতিহাসে প্রথম মহাকাশ ভ্রমণ করেন কে?", options: ["নীল আর্মস্ট্রং", "ইউরি গ্যাগারিন", "বাজ অলড্রিন", "অ্যালান শেপার্ড"], answer: 1 },
  { id: "sa_e5", topic: "Space & Astronomy", difficulty: "easy", question: "১৯৬৯ সালে অ্যাপোলো ১১ মিশনে প্রথম মানুষ হিসেবে চাঁদের মাটিতে পা রাখেন কে?", options: ["বাজ অলড্রিন", "মাইকেল কলিন্স", "নীল আর্মস্ট্রং", "ইউরি গ্যাগারিন"], answer: 2 },
  { id: "sa_e6", topic: "Space & Astronomy", difficulty: "easy", question: "আমাদের সৌরজগৎ যে সর্পিল ছায়াপথ বা গ্যালাক্সিতে অবস্থিত তার নাম কী?", options: ["অ্যান্ড্রোমিডা", "ট্রায়াঙ্গুলাম", "মিল্কিওয়ে (ছায়াপথ)", "হুইলপুল"], answer: 2 },
  { id: "sa_e7", topic: "Space & Astronomy", difficulty: "easy", question: "আমাদের সৌরজগতে সূর্যের সবচেয়ে নিকটতম গ্রহ কোনটি?", options: ["শুক্র", "বুধ (Mercury)", "মঙ্গল", "পৃথিবী"], answer: 1 },
  { id: "sa_e8", topic: "Space & Astronomy", difficulty: "easy", question: "পৃথিবীর একমাত্র প্রাকৃতিক উপগ্রহ কোনটি যার আকর্ষণে সমুদ্রে জোয়ার-ভাটা হয়?", options: ["সূর্য", "চাঁদ (The Moon)", "শুক্র", "মঙ্গল"], answer: 1 },

  // ==========================================
  //  11. SPACE & ASTRONOMY — MEDIUM
  // ==========================================
  { id: "sa_m1", topic: "Space & Astronomy", difficulty: "medium", question: "সৌরজগতের কোন গ্যাসীয় দানব গ্রহের চারপাশে সবচেয়ে উজ্জ্বল ও স্পষ্ট বলয় রয়েছে?", options: ["বৃহস্পতি", "শনি (Saturn)", "ইউরেনাস", "নেপচুন"], answer: 1 },
  { id: "sa_m2", topic: "Space & Astronomy", difficulty: "medium", question: "শূন্য মাধ্যমে আলো এক বছরে যে দূরত্ব অতিক্রম করে সেই জ্যোতির্বৈজ্ঞানিক একককে কী বলে?", options: ["অ্যাস্ট্রোনমিক্যাল ইউনিট (AU)", "আলোকবর্ষ (Light-year)", "পারসেক", "সোলার রেডিয়াস"], answer: 1 },
  { id: "sa_m3", topic: "Space & Astronomy", difficulty: "medium", question: "বিশাল কোনো নক্ষত্রের জীবনের চরমতম ভয়াবহ বিস্ফোরণ ও মৃত্যুকে কী বলা হয়?", options: ["প্রোটোস্টার", "সুপারনোভা (Supernova)", "নেবুলা", "হোয়াইট ডোয়ার্ফ"], answer: 1 },
  { id: "sa_m4", topic: "Space & Astronomy", difficulty: "medium", question: "বায়ুমণ্ডলে ঘন কার্বন ডাই অক্সাইডের কারণে সৌরজগতের সবচেয়ে উষ্ণতম গ্রহ কোনটি?", options: ["বুধ", "শুক্র (Venus)", "মঙ্গল", "বৃহস্পতি"], answer: 1 },
  { id: "sa_m5", topic: "Space & Astronomy", difficulty: "medium", question: "ব্ল্যাকহোলের চারপাশের যে সীমানা পেরিয়ে আলো পর্যন্ত বেরিয়ে আসতে পারে না তাকে কী বলে?", options: ["অ্যাক্রিশন ডিস্ক", "ঘটনা দিগন্ত (Event Horizon)", "ফোটন স্ফিয়ার", "সিঙ্গুলারিটি"], answer: 1 },
  { id: "sa_m6", topic: "Space & Astronomy", difficulty: "medium", question: "শনি গ্রহের কোন বৃহত্তম উপগ্রহে নাইট্রোজেন বায়ুমণ্ডল এবং তরল মিথেনের হ্রদ রয়েছে?", options: ["ইউরোপা", "গ্যানিমিড", "টাইটান (Titan)", "এনসেলাডাস"], answer: 2 },
  { id: "sa_m7", topic: "Space & Astronomy", difficulty: "medium", question: "১৯৭৭ সালে উৎক্ষেপিত মানুষের তৈরি দূরতম সক্রিয় মহাকাশযান কোনটি যা আন্তঃনাক্ষত্রিক স্থানে রয়েছে?", options: ["পায়োনিয়ার ১০", "ভয়েজার ১ (Voyager 1)", "নিউ হরাইজনস", "ক্যাসিনি"], answer: 1 },
  { id: "sa_m8", topic: "Space & Astronomy", difficulty: "medium", question: "আমাদের মিল্কিওয়ে ছায়াপথের সবচেয়ে নিকটতম বৃহৎ সর্পিল প্রতিবেশী গ্যালাক্সি কোনটি?", options: ["মেসিয়ার ৮৭", "অ্যান্ড্রোমিডা (Andromeda / M31)", "ম্যাগেলানিক ক্লাউড", "পিনহুইল গ্যালাক্সি"], answer: 1 },

  // ==========================================
  //  11. SPACE & ASTRONOMY — HARD
  // ==========================================
  { id: "sa_h1", topic: "Space & Astronomy", difficulty: "hard", question: "আধুনিক জ্যোতির্বিজ্ঞানের পর্যবেক্ষণ অনুযায়ী দৃশ্যমান মহাবিশ্বের আনুমানিক বয়স কত?", options: ["৪.৫ বিলিয়ন বছর", "১০.২ বিলিয়ন বছর", "১৩.৮ বিলিয়ন বছর", "২০.০ বিলিয়ন বছর"], answer: 2 },
  { id: "sa_h2", topic: "Space & Astronomy", difficulty: "hard", question: "জ্যোতির্বিজ্ঞানে দ্রুত ঘূর্ণায়মান এবং তেজস্ক্রিয় রশ্মি বিকিরণকারী 'পালসার' আসলে কী?", options: ["একটি সুপারজায়ান্ট নক্ষত্র", "তীব্র চৌম্বকীয় ঘূর্ণায়মান নিউট্রন স্টার", "একটি ধূমকেতু", "একটি সাদা বামন নক্ষত্র"], answer: 1 },
  { id: "sa_h3", topic: "Space & Astronomy", difficulty: "hard", question: "আমাদের মিল্কিওয়ে ছায়াপথের কেন্দ্রে অবস্থিত সুপারম্যাসিভ ব্ল্যাকহোলটির নাম কী?", options: ["সিগনাস এক্স-১", "স্যাজিটেরিয়াস এ* (Sagittarius A*)", "মেসিয়ার ৮৭*", "সেন্টরাস এ"], answer: 1 },
  { id: "sa_h4", topic: "Space & Astronomy", difficulty: "hard", question: "জ্যোতির্পদার্থবিদ্যায় হার্টসপ্রুং-রাসেল (H-R) চিত্রে নক্ষত্রের উজ্জ্বলতার বিপরীতে কী প্লট করা হয়?", options: ["পৃথিবী থেকে দূরত্ব", "পৃষ্ঠের তাপমাত্রা বা বর্ণালী শ্রেণি", "কক্ষপথীয় বেগ", "চৌম্বক ক্ষেত্র"], answer: 1 },
  { id: "sa_h5", topic: "Space & Astronomy", difficulty: "hard", question: "একটি স্থিতিশীল সাদা বামন নক্ষত্রের সর্বোচ্চ তাত্ত্বিক ভরসীমাকে (১.৪ সৌর ভর) কী বলা হয়?", options: ["ওপেনহাইমার লিমিট", "চন্দ্রশেখর সীমা (Chandrasekhar Limit)", "শোয়ার্জশিল্ড ব্যাসার্ধ", "হাবল ধ্রুবক"], answer: 1 },
  { id: "sa_h6", topic: "Space & Astronomy", difficulty: "hard", question: "২০১৫ সালে নাসার নিউ হরাইজনস মহাকাশযান কুইপার বেল্টের কোন বামন গ্রহটি সফলভাবে পর্যবেক্ষণ করে?", options: ["এরিস", "সেরেস", "প্লুটো (Pluto)", "হাউমিয়া"], answer: 2 },
  { id: "sa_h7", topic: "Space & Astronomy", difficulty: "hard", question: "মহাবিশ্বের মোট পদার্থের প্রায় ৮৫% গঠনকারী কিন্তু আলো নির্গমন বা শোষণ না করা অদৃশ্য বস্তুটি কী?", options: ["অ্যান্টিম্যাটার", "ডার্ক ম্যাটার (Dark Matter)", "ট্যাকিয়ন", "ডিজেনারেট নিউট্রন"], answer: 1 },
  { id: "sa_h8", topic: "Space & Astronomy", difficulty: "hard", question: "সপ্তদশ শতকের শুরুতে গ্রহদের উপবৃত্তাকার গতির তিনটি মৌলিক নিয়ম কে আবিষ্কার করেন?", options: ["টাইকো ব্রাহে", "জোহানেস কেপলার (Johannes Kepler)", "নিকোলাস কোপার্নিকাস", "গ্যালিলিও"], answer: 1 },

  // ==========================================
  //  12. IQ & LOGIC — EASY
  // ==========================================
  { id: "iq_e1", topic: "IQ & Logic", difficulty: "easy", question: "সংখ্যার ধারাক্রমটি পূরণ করুন: ২, ৪, ৮, ১৬, ৩২, ___?", options: ["৪৮", "৫৬", "৬৪", "৭২"], answer: 2 },
  { id: "iq_e2", topic: "IQ & Logic", difficulty: "easy", question: "যদি সব 'ক' হয় 'খ' এবং সব 'খ' হয় 'গ', তবে কি সব 'ক' নিশ্চিতভাবেই 'গ' হবে?", options: ["হ্যাঁ, অবশ্যই", "না, কখনো নয়", "শুধু কিছু ক্ষেত্রে", "বলা সম্ভব নয়"], answer: 0 },
  { id: "iq_e3", topic: "IQ & Logic", difficulty: "easy", question: "বর্ণমালার ক্রমে পরের বর্ণটি কী হবে: A, C, E, G, ___?", options: ["H", "I", "J", "K"], answer: 1 },
  { id: "iq_e4", topic: "IQ & Logic", difficulty: "easy", question: "একজন কৃষকের ১৭টি ভেড়া ছিল। ৯টি বাদে বাকি সব পালিয়ে গেল। কৃষকের কাছে আর কয়টি ভেড়া রইল?", options: ["৮টি", "৯টি", "১৭টি", "০টি"], answer: 1 },
  { id: "iq_e5", topic: "IQ & Logic", difficulty: "easy", question: "গতকাল যদি রবিবার হয়ে থাকে, তবে আগামীকালের ৩ দিন পর কোন বার হবে?", options: ["বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"], answer: 2 },
  { id: "iq_e6", topic: "IQ & Logic", difficulty: "easy", question: "ধারার পরবর্তী সংখ্যাটি কত: ৫, ১০, ১৫, ২০, ২৫, ___?", options: ["২৮", "৩০", "৩৫", "৪০"], answer: 1 },
  { id: "iq_e7", topic: "IQ & Logic", difficulty: "easy", question: "নিচের শব্দগুলোর মধ্যে কোনটি দলভুক্ত নয়: আপেল, কলা, গাজর, আম?", options: ["আপেল", "কলা", "গাজর (কারণ এটি সবজি)", "আম"], answer: 2 },
  { id: "iq_e8", topic: "IQ & Logic", difficulty: "easy", question: "একটি পেন্সিলের দাম ৫০ পয়সা হলে ৬.০০ টাকায় কয়টি পেন্সিল কেনা যাবে?", options: ["১০টি", "১২টি", "১৪টি", "১৬টি"], answer: 1 },

  // ==========================================
  //  12. IQ & LOGIC — MEDIUM
  // ==========================================
  { id: "iq_m1", topic: "IQ & Logic", difficulty: "medium", question: "ধারার পরবর্তী সংখ্যাটি কত: ৩, ৭, ১৫, ৩১, ৬৩, ___? (প্যাটার্ন: ×২ + ১)", options: ["৯৫", "১২৭", "১২৮", "১৩১"], answer: 1 },
  { id: "iq_m2", topic: "IQ & Logic", difficulty: "medium", question: "যদি ৫টি মেশিনের ৫টি খেলনা তৈরি করতে ৫ মিনিট লাগে, তবে ১০০টি মেশিনের ১০০টি খেলনা তৈরি করতে কত মিনিট লাগবে?", options: ["১০০ মিনিট", "৫০ মিনিট", "৫ মিনিট", "১ মিনিট"], answer: 2 },
  { id: "iq_m3", topic: "IQ & Logic", difficulty: "medium", question: "একটি ব্যাট ও বলের মোট দাম ১.১০ ডলার। ব্যাটের দাম বলের চেয়ে ১.০০ ডলার বেশি হলে বলটির দাম কত?", options: ["১০ সেন্ট ($0.10)", "৫ সেন্ট ($0.05)", "১ সেন্ট ($0.01)", "১৫ সেন্ট ($0.15)"], answer: 1 },
  { id: "iq_m4", topic: "IQ & Logic", difficulty: "medium", question: "ফিবোনাচ্চি ধারার পরবর্তী সংখ্যাটি কত: ১, ১, ২, ৩, ৫, ৮, ১৩, ২১, ___?", options: ["২৮", "৩১", "৩৪", "৩৬"], answer: 2 },
  { id: "iq_m5", topic: "IQ & Logic", difficulty: "medium", question: "বর্ণমালার অবস্থানের যোগফল অনুসারে CAT = ২৪ (৩+১+২০) এবং DOG = ২৬ হলে BIRD = কত?", options: ["২৯", "৩১", "৩৩ (২+৯+১৮+৪)", "৩৫"], answer: 2 },
  { id: "iq_m6", topic: "IQ & Logic", difficulty: "medium", question: "একটি ছবির দিকে তাকিয়ে এক ব্যক্তি বললেন, 'আমার ভাই বা বোন নেই, কিন্তু ওই ব্যক্তির বাবা আমার বাবার ছেলে।' ছবিতে কে ছিলেন?", options: ["তাঁর বাবা", "তাঁর ছেলে", "তাঁর ভাগ্নে", "তিনি নিজে"], answer: 1 },
  { id: "iq_m7", topic: "IQ & Logic", difficulty: "medium", question: "যদি ২ জন রংমিস্ত্রি ২ ঘণ্টায় ২টি রুম রং করতে পারেন, তবে ৬ ঘণ্টায় ১৮টি রুম রং করতে কতজন মিস্ত্রি লাগবে?", options: ["৩ জন", "৬ জন", "৯ জন", "১২ জন"], answer: 1 },
  { id: "iq_m8", topic: "IQ & Logic", difficulty: "medium", question: "ধারার পরবর্তী সংখ্যাটি কত: ২, ৬, ১২, ২০, ৩০, ৪২, ___? (পার্থক্য: +৪, +৬, +৮, +১০, +১২, +১৪)", options: ["৫২", "৫৪", "৫৬", "৬০"], answer: 2 },

  // ==========================================
  //  12. IQ & LOGIC — HARD
  // ==========================================
  { id: "iq_h1", topic: "IQ & Logic", difficulty: "hard", question: "মৌলিক সংখ্যার ধারায় পরবর্তী সংখ্যাটি কত: ২, ৩, ৫, ৭, ১১, ১৩, ১৭, ১৯, ___?", options: ["২১", "২৩", "২৫", "২৭"], answer: 1 },
  { id: "iq_h2", topic: "IQ & Logic", difficulty: "hard", question: "একটি সাংকেতিক ভাষায় যদি 'TIGER' কে লেখা হয় 'VKIGT' (+২ নিয়ম), তবে 'HORSE' কে কী লেখা হবে?", options: ["JQUTG", "JQTUG", "IPSTF", "KSUVH"], answer: 1 },
  { id: "iq_h3", topic: "IQ & Logic", difficulty: "hard", question: "আপেল, কমলা ও মিশ্র—লেবেলযুক্ত ৩টি বাক্সের প্রতিটির লেবেল ভুল। মাত্র ১টি বাক্স থেকে ১টি ফল দেখে সঠিক লেবেল দিতে কোন বাক্সটি বেছে নিতে হবে?", options: ["'আপেল' লেবেলযুক্ত বাক্স", "'কমলা' লেবেলযুক্ত বাক্স", "'মিশ্র' (Mixed) লেবেলযুক্ত বাক্স", "যেকোনো বাক্স"], answer: 2 },
  { id: "iq_h4", topic: "IQ & Logic", difficulty: "hard", question: "একটি অ্যানালগ ঘড়িতে কাঁটায় কাঁটায় ৩টা ১৫ মিনিটে ঘণ্টার কাঁটা ও মিনিটের কাঁটার মধ্যকার কোণ কত ডিগ্রি?", options: ["০ ডিগ্রি", "৫.০ ডিগ্রি", "৭.৫ ডিগ্রি", "১৫.০ ডিগ্রি"], answer: 2 },
  { id: "iq_h5", topic: "IQ & Logic", difficulty: "hard", question: "ঘন সংখ্যার ধারায় পরবর্তী সংখ্যাটি কত: ১, ৮, ২৭, ৬৪, ১২৫, ২১৬, ___? (৭³)", options: ["২৮৯", "৩২৪", "৩৪৩", "৫১২"], answer: 2 },
  { id: "iq_h6", topic: "IQ & Logic", difficulty: "hard", question: "একটি অনুষ্ঠানে ৬ জন ব্যক্তি উপস্থিত ছিলেন এবং প্রত্যেকে প্রত্যেকের সাথে একবার হ্যান্ডশেক করলে মোট কতটি হ্যান্ডশেক হবে?", options: ["১২টি", "১৫টি (৬×৫/২)", "৩০টি", "৩৬টি"], answer: 1 },
  { id: "iq_h7", topic: "IQ & Logic", difficulty: "hard", question: "ধারার পরবর্তী সংখ্যাটি কত: ৪, ৯, ২৫, ৪৯, ১২১, ১৬৯, ___? (পরপর মৌলিক সংখ্যার বর্গ: ১৭²)", options: ["২২৫", "২৫৬", "২৮৯", "৩৬১"], answer: 2 },
  { id: "iq_h8", topic: "IQ & Logic", difficulty: "hard", question: "একই রকম দেখতে ৮টি বলের মধ্যে ১টি বল সামান্য ভারী। দুই পাল্লার ব্যালেন্স স্কেলে সর্বনিম্ন কতবার মেপে নিশ্চিতভাবে ভারী বলটি শনাক্ত করা সম্ভব?", options: ["১ বার", "২ বার", "৩ বার", "৪ বার"], answer: 1 }
];


// ============================================
// GAME STATE
// ============================================

let gameState = null;
let timerInterval = null;
let timerRemaining = 0;

function createFreshState(name) {
  return {
    participantId: "p_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    participantName: name,
    currentSegment: 1,
    currentQuestionInSegment: 0,
    overallQuestionNumber: 0,
    selectedTopics: {},
    usedQuestions: [],
    lifelinesRemaining: INITIAL_LIFELINES,
    lifelinesUsed: { "5050": false, "phone": false, "switch": false },
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    switchedQuestions: 0,
    turnActive: true,
    completed: false,
    startTime: new Date().toISOString(),
    endTime: null,
    totalTimeMs: 0,
    currentQuestion: null,
    isAnswered: false,
    questionStartTime: null
  };
}

// ============================================
// LOCALSTORAGE MANAGEMENT
// ============================================

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.currentState, JSON.stringify(gameState));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

function loadState() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.currentState);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function clearCurrentState() {
  try {
    localStorage.removeItem(STORAGE_KEYS.currentState);
  } catch (e) {
    console.error("Failed to clear state:", e);
  }
}

function loadResults() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.results);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveResults(results) {
  try {
    localStorage.setItem(STORAGE_KEYS.results, JSON.stringify(results));
  } catch (e) {
    console.error("Failed to save results:", e);
  }
}

function addResult(participantResult) {
  const results = loadResults();
  // Check if this participant already has a result (prevent duplicates)
  const existing = results.findIndex(function (r) { return r.participantId === participantResult.participantId; });
  if (existing >= 0) {
    results[existing] = participantResult;
  } else {
    results.push(participantResult);
  }
  saveResults(results);
}

// ============================================
// QUESTION MANAGEMENT
// ============================================

function getEligibleQuestions(topic, difficulty) {
  var actualDiffs = getActualDifficulties(difficulty);
  var eligible = [];

  for (var d = 0; d < actualDiffs.length; d++) {
    var diff = actualDiffs[d];
    var found = questionBank.filter(function (q) {
      return q.topic === topic &&
        q.difficulty === diff &&
        gameState.usedQuestions.indexOf(q.id) === -1;
    });
    if (found.length > 0) {
      eligible = found;
      break;
    }
  }

  return eligible;
}

function selectNextQuestion(topic, difficulty) {
  var eligible = getEligibleQuestions(topic, difficulty);
  if (eligible.length === 0) return null;
  var idx = Math.floor(Math.random() * eligible.length);
  return eligible[idx];
}

function markQuestionAsUsed(questionId) {
  if (gameState.usedQuestions.indexOf(questionId) === -1) {
    gameState.usedQuestions.push(questionId);
    saveState();
  }
}

// ============================================
// SCREEN MANAGEMENT
// ============================================

function showScreen(screenId) {
  var screens = document.querySelectorAll(".screen");
  screens.forEach(function (s) {
    s.classList.remove("active");
  });

  var target = document.getElementById(screenId);
  if (target) {
    void target.offsetWidth;
    target.classList.add("active");
  }
}

// ============================================
// WELCOME & NAME ENTRY
// ============================================

function submitName() {
  var input = document.getElementById("participant-name");
  var error = document.getElementById("name-error");
  var name = input.value.trim();

  if (!name) {
    error.textContent = "Please enter your name to continue.";
    input.focus();
    return;
  }

  if (name.length < 2) {
    error.textContent = "Name must be at least 2 characters.";
    input.focus();
    return;
  }

  error.textContent = "";

  // Create fresh state for this participant
  gameState = createFreshState(name);
  saveState();

  // Go to topic selection for segment 1
  showTopicSelection();
}

// ============================================
// TOPIC SELECTION
// ============================================

function showTopicSelection() {
  var greeting = document.getElementById("topic-greeting");
  greeting.textContent = "Welcome, " + gameState.participantName + "!";

  // Show segment indicator
  var indicator = document.getElementById("segment-indicator");
  indicator.innerHTML = '<span class="segment-number-badge">SEGMENT ' + gameState.currentSegment + ' OF ' + TOTAL_SEGMENTS + '</span>';

  // Update title
  var title = document.getElementById("topic-screen-title");
  title.textContent = "Select Topic for Segment " + gameState.currentSegment;

  // Render topic cards
  renderTopics();

  showScreen("screen-topic");
}

function renderTopics() {
  var grid = document.getElementById("topic-grid");
  grid.innerHTML = "";

  var currentDiff = getDifficultyForQuestion((gameState.currentSegment - 1) * QUESTIONS_PER_SEGMENT + 1);

  TOPICS.forEach(function (topic, index) {
    var eligible = getEligibleQuestions(topic.name, currentDiff);
    var canStart = eligible.length >= QUESTIONS_PER_SEGMENT;

    var card = document.createElement("div");
    card.className = "segment-card" + (!canStart ? " segment-unavailable" : "");
    card.style.animationDelay = (index * 0.06) + "s";
    card.innerHTML =
      '<span class="segment-icon">' + topic.icon + '</span>' +
      '<h3 class="segment-name">' + topic.name + '</h3>' +
      '<p class="segment-desc">' + topic.description + '</p>';

    if (canStart) {
      card.onclick = (function (topicName) {
        return function () { selectTopic(topicName); };
      })(topic.name);
    }

    grid.appendChild(card);
  });
}

function selectTopic(topicName) {
  gameState.selectedTopics[gameState.currentSegment] = topicName;
  saveState();

  // Update confirmation screen
  document.getElementById("confirm-name").textContent = gameState.participantName;
  document.getElementById("confirm-segment").textContent = "Segment " + gameState.currentSegment + " of " + TOTAL_SEGMENTS;
  document.getElementById("confirm-topic").textContent = topicName;

  var firstQNum = (gameState.currentSegment - 1) * QUESTIONS_PER_SEGMENT + 1;
  var lastQNum = firstQNum + QUESTIONS_PER_SEGMENT - 1;
  var diff = getDifficultyForQuestion(firstQNum);
  document.getElementById("confirm-difficulty").textContent = difficultyLabel(diff);
  document.getElementById("confirm-questions").textContent = "Q" + firstQNum + " – Q" + lastQNum;

  showScreen("screen-confirm");
}

// ============================================
// SEGMENT START
// ============================================

function startSegment() {
  gameState.currentQuestionInSegment = 0;
  gameState.isAnswered = false;
  gameState.currentQuestion = null;
  saveState();

  // Update quiz header info
  document.getElementById("quiz-participant").textContent = gameState.participantName;
  document.getElementById("quiz-segment-badge").textContent = "SEG " + gameState.currentSegment;
  document.getElementById("quiz-topic-badge").textContent = gameState.selectedTopics[gameState.currentSegment];

  showScreen("screen-quiz");
  loadQuestion();
}

// ============================================
// QUIZ — QUESTION LOADING
// ============================================

function loadQuestion() {
  gameState.isAnswered = false;
  gameState.currentQuestionInSegment++;
  gameState.overallQuestionNumber = (gameState.currentSegment - 1) * QUESTIONS_PER_SEGMENT + gameState.currentQuestionInSegment;

  var currentTopic = gameState.selectedTopics[gameState.currentSegment];
  var currentDiff = getDifficultyForQuestion(gameState.overallQuestionNumber);

  var question = selectNextQuestion(currentTopic, currentDiff);

  if (!question) {
    endGameNoQuestions();
    return;
  }

  gameState.currentQuestion = question;
  markQuestionAsUsed(question.id);
  gameState.questionStartTime = Date.now();
  saveState();

  // Update level badge
  updateLevelBadge(currentDiff);

  // Update score
  document.getElementById("quiz-score").textContent = "Score: " + gameState.score;

  // Update progress
  document.getElementById("quiz-progress-text").textContent =
    "Question " + gameState.overallQuestionNumber + " of " + TOTAL_QUESTIONS +
    "  •  Segment " + gameState.currentSegment + " — Q" + gameState.currentQuestionInSegment + "/" + QUESTIONS_PER_SEGMENT;
  document.getElementById("quiz-progress-fill").style.width =
    (((gameState.overallQuestionNumber - 1) / TOTAL_QUESTIONS) * 100) + "%";

  // Update question number label
  document.getElementById("question-number").textContent = "QUESTION " + gameState.overallQuestionNumber;

  // Update question text
  document.getElementById("question-text").textContent = question.question;

  // Render options
  renderOptions(question);

  // Update lifeline UI
  updateLifelineUI();

  // Animate question card
  var qCard = document.getElementById("question-card");
  qCard.style.animation = "none";
  void qCard.offsetWidth;
  qCard.style.animation = "cardEnter 0.4s var(--ease) both";

  // Start timer
  startTimer(TIMER_DURATION);
}

function renderOptions(question) {
  var grid = document.getElementById("options-grid");
  grid.innerHTML = "";
  var letters = ["A", "B", "C", "D"];

  question.options.forEach(function (optText, i) {
    var btn = document.createElement("button");
    btn.className = "option-btn";
    btn.id = "option-" + i;
    btn.style.animationDelay = (0.08 + i * 0.06) + "s";
    btn.innerHTML =
      '<span class="option-letter">' + letters[i] + '</span>' +
      '<span class="option-text">' + optText + '</span>';
    btn.onclick = (function (idx) {
      return function () { handleAnswer(idx); };
    })(i);
    grid.appendChild(btn);
  });
}

function updateLevelBadge(diff) {
  var badge = document.getElementById("quiz-level-badge");
  badge.textContent = difficultyLabel(diff);
  badge.className = "quiz-level-badge level-" + diff;
}

// ============================================
// TIMER
// ============================================

let isTimerPaused = false;

function startTimer(duration) {
  stopTimer();
  isTimerPaused = false;
  timerRemaining = duration;
  updateTimerDisplay();
  updateTimerToggleButton(false);

  timerInterval = setInterval(function () {
    if (isTimerPaused) return;
    timerRemaining--;
    updateTimerDisplay();

    if (timerRemaining <= 0) {
      stopTimer();
      handleTimeout();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  isTimerPaused = false;
  var ring = document.getElementById("timer-ring");
  var text = document.getElementById("timer-text");
  if (ring) ring.classList.remove("timer-paused");
  if (text) text.classList.remove("timer-text-paused");
  updateTimerToggleButton(false);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  isTimerPaused = true;
  var ring = document.getElementById("timer-ring");
  var text = document.getElementById("timer-text");
  if (ring) ring.classList.add("timer-paused");
  if (text) text.classList.add("timer-text-paused");
  updateTimerToggleButton(true);
}

function resumeTimer() {
  if (!gameState || gameState.isAnswered || timerRemaining <= 0) return;

  isTimerPaused = false;
  var ring = document.getElementById("timer-ring");
  var text = document.getElementById("timer-text");
  if (ring) ring.classList.remove("timer-paused");
  if (text) text.classList.remove("timer-text-paused");
  updateTimerToggleButton(false);

  if (!timerInterval) {
    updateTimerDisplay();
    timerInterval = setInterval(function () {
      if (isTimerPaused) return;
      timerRemaining--;
      updateTimerDisplay();

      if (timerRemaining <= 0) {
        stopTimer();
        handleTimeout();
      }
    }, 1000);
  }
}

function toggleTimerPause() {
  if (!gameState || gameState.isAnswered || timerRemaining <= 0) return;

  if (isTimerPaused) {
    resumeTimer();
    showLifelineBanner("▶️ <strong>Timer Resumed</strong>", "toast-extra", 1200);
  } else {
    pauseTimer();
    showLifelineBanner("⏸️ <strong>Timer Paused</strong>", "toast-5050", 1200);
  }
}

function updateTimerToggleButton(isPaused) {
  var btn = document.getElementById("btn-timer-toggle");
  var icon = document.getElementById("timer-toggle-icon");
  var text = document.getElementById("timer-toggle-text");

  if (!btn) return;

  if (isPaused) {
    btn.classList.add("is-paused");
    if (icon) icon.textContent = "▶";
    if (text) text.textContent = "Resume";
  } else {
    btn.classList.remove("is-paused");
    if (icon) icon.textContent = "⏸";
    if (text) text.textContent = "Pause";
  }
}

function updateTimerDisplay() {
  var text = document.getElementById("timer-text");
  var ring = document.getElementById("timer-ring");

  text.textContent = Math.max(0, timerRemaining);

  // Calculate ring progress
  var maxDuration = TIMER_DURATION;
  if (timerRemaining > TIMER_DURATION) maxDuration = timerRemaining; // for extra time
  var circumference = 2 * Math.PI * 45; // r=45
  var offset = circumference * (1 - timerRemaining / maxDuration);
  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = offset;

  // Color states
  text.className = "timer-text";
  ring.className = "timer-ring";

  if (timerRemaining <= 5) {
    ring.classList.add("timer-danger");
    text.classList.add("timer-text-danger");
  } else if (timerRemaining <= 10) {
    ring.classList.add("timer-warning");
    text.classList.add("timer-text-warning");
  }
}

function handleTimeout() {
  if (gameState.isAnswered) return;
  gameState.isAnswered = true;

  disableAllOptions();

  // Show timeout feedback
  var overlay = document.getElementById("feedback-overlay");
  var icon = document.getElementById("feedback-icon");
  var feedbackText = document.getElementById("feedback-text");
  overlay.className = "feedback-overlay show feedback-timeout";
  icon.textContent = "⏱";
  feedbackText.textContent = "TIME'S UP!";

  // Show correct answer
  showCorrectAnswer();

  setTimeout(function () {
    hideFeedbackOverlay();
    endTurn("timeout");
  }, TIMING.timeoutFeedback);
}

// ============================================
// ANSWER HANDLING
// ============================================

function handleAnswer(selectedIndex) {
  if (gameState.isAnswered) return;
  gameState.isAnswered = true;

  stopTimer();

  var question = gameState.currentQuestion;
  var isCorrect = selectedIndex === question.answer;

  // Calculate time spent
  var timeSpent = Date.now() - gameState.questionStartTime;
  gameState.totalTimeMs += timeSpent;

  disableAllOptions();

  var options = document.querySelectorAll(".option-btn");
  if (isCorrect) {
    options[selectedIndex].classList.add("option-correct");
    showFeedbackOverlay(true);
    handleCorrectAnswer();
  } else {
    options[selectedIndex].classList.add("option-wrong");
    showCorrectAnswer();
    showFeedbackOverlay(false);
    handleWrongAnswer();
  }
}

function disableAllOptions() {
  var options = document.querySelectorAll(".option-btn");
  options.forEach(function (btn) {
    btn.classList.add("option-disabled");
  });
}

function showCorrectAnswer() {
  if (!gameState.currentQuestion) return;
  var correctIdx = gameState.currentQuestion.answer;
  var correctBtn = document.getElementById("option-" + correctIdx);
  if (correctBtn) {
    correctBtn.classList.add("option-correct");
  }
}

function showFeedbackOverlay(isCorrect) {
  var overlay = document.getElementById("feedback-overlay");
  var icon = document.getElementById("feedback-icon");
  var text = document.getElementById("feedback-text");

  overlay.className = "feedback-overlay show " +
    (isCorrect ? "feedback-correct" : "feedback-wrong");

  icon.textContent = isCorrect ? "✓" : "✕";
  text.textContent = isCorrect ? "CORRECT!" : "WRONG ANSWER";
}

function hideFeedbackOverlay() {
  var overlay = document.getElementById("feedback-overlay");
  overlay.className = "feedback-overlay";
}

// ============================================
// CORRECT ANSWER
// ============================================

function handleCorrectAnswer() {
  gameState.correctAnswers++;

  // Calculate score with time bonus
  var diff = getDifficultyForQuestion(gameState.overallQuestionNumber);
  var baseScore = SCORE_MAP[diff] || 10;
  var timeBonus = Math.round(timerRemaining * 0.5);
  gameState.score += baseScore + timeBonus;

  saveState();

  setTimeout(function () {
    hideFeedbackOverlay();

    // Check if segment is complete
    if (gameState.currentQuestionInSegment >= QUESTIONS_PER_SEGMENT) {
      // Segment complete
      if (gameState.currentSegment >= TOTAL_SEGMENTS) {
        // All segments done — WINNER!
        endCompetition("completed");
      } else {
        // Show segment transition
        showSegmentTransition();
      }
    } else {
      // Next question in same segment
      loadQuestion();
    }
  }, TIMING.correctFeedback);
}

// ============================================
// WRONG ANSWER
// ============================================

function handleWrongAnswer() {
  gameState.wrongAnswers++;
  saveState();

  setTimeout(function () {
    hideFeedbackOverlay();
    endTurn("wrong");
  }, TIMING.wrongFeedback);
}

// ============================================
// END TURN (wrong answer or timeout)
// ============================================

function endTurn(reason) {
  stopTimer();
  gameState.turnActive = false;
  gameState.endTime = new Date().toISOString();
  saveState();

  // Save result
  addResult({
    participantId: gameState.participantId,
    participantName: gameState.participantName,
    score: gameState.score,
    correctAnswers: gameState.correctAnswers,
    wrongAnswers: gameState.wrongAnswers,
    totalTimeMs: gameState.totalTimeMs,
    completedAt: gameState.endTime,
    reachedSegment: gameState.currentSegment,
    reachedQuestion: gameState.overallQuestionNumber,
    status: "eliminated"
  });

  clearCurrentState();

  // Show out screen
  var title = reason === "timeout" ? "TIME'S UP!" : "TURN OVER";
  var message = reason === "timeout"
    ? "You ran out of time. Better luck next time!"
    : "Wrong answer! Better luck next time!";

  document.getElementById("out-title").textContent = title;
  document.getElementById("out-message").textContent = message;
  document.getElementById("out-name").textContent = gameState.participantName;
  document.getElementById("out-reached").textContent =
    "Segment " + gameState.currentSegment + ", Q" + gameState.overallQuestionNumber;
  document.getElementById("out-correct").textContent = gameState.correctAnswers + " / " + (gameState.overallQuestionNumber);
  document.getElementById("out-score").textContent = gameState.score + " pts";

  showScreen("screen-out");
}

// ============================================
// COMPETITION COMPLETE (all 15 questions answered)
// ============================================

function endCompetition(status) {
  stopTimer();
  gameState.turnActive = false;
  gameState.completed = true;
  gameState.endTime = new Date().toISOString();
  saveState();

  addResult({
    participantId: gameState.participantId,
    participantName: gameState.participantName,
    score: gameState.score,
    correctAnswers: gameState.correctAnswers,
    wrongAnswers: gameState.wrongAnswers,
    totalTimeMs: gameState.totalTimeMs,
    completedAt: gameState.endTime,
    reachedSegment: gameState.currentSegment,
    reachedQuestion: gameState.overallQuestionNumber,
    status: "completed"
  });

  clearCurrentState();

  // Show winner screen
  document.getElementById("winner-name").textContent = gameState.participantName;
  document.getElementById("winner-score").textContent = gameState.score;
  document.getElementById("winner-correct").textContent = gameState.correctAnswers + "/" + TOTAL_QUESTIONS;
  document.getElementById("winner-time").textContent = formatTime(gameState.totalTimeMs);

  showScreen("screen-winner");
}

function endGameNoQuestions() {
  stopTimer();
  gameState.turnActive = false;
  gameState.endTime = new Date().toISOString();
  saveState();

  addResult({
    participantId: gameState.participantId,
    participantName: gameState.participantName,
    score: gameState.score,
    correctAnswers: gameState.correctAnswers,
    wrongAnswers: gameState.wrongAnswers,
    totalTimeMs: gameState.totalTimeMs,
    completedAt: gameState.endTime,
    reachedSegment: gameState.currentSegment,
    reachedQuestion: gameState.overallQuestionNumber,
    status: "eliminated"
  });

  clearCurrentState();

  document.getElementById("out-title").textContent = "NO MORE QUESTIONS";
  document.getElementById("out-message").textContent =
    "All questions in this topic/difficulty have been used. Please try another topic.";
  document.getElementById("out-name").textContent = gameState.participantName;
  document.getElementById("out-reached").textContent =
    "Segment " + gameState.currentSegment + ", Q" + gameState.overallQuestionNumber;
  document.getElementById("out-correct").textContent = gameState.correctAnswers + " / " + gameState.overallQuestionNumber;
  document.getElementById("out-score").textContent = gameState.score + " pts";

  showScreen("screen-out");
}

// ============================================
// SEGMENT TRANSITION
// ============================================

function showSegmentTransition() {
  var completedSeg = gameState.currentSegment;

  document.getElementById("transition-icon").textContent = "✅";
  document.getElementById("transition-title").textContent = "SEGMENT " + completedSeg + " COMPLETE!";
  document.getElementById("transition-subtitle").textContent =
    "Score: " + gameState.score + " pts  •  " + gameState.correctAnswers + " correct answers so far";

  // Render segment progress dots
  renderSegmentProgress(completedSeg);

  showScreen("screen-transition");
}

function renderSegmentProgress(completedUpTo) {
  var container = document.getElementById("transition-progress");
  container.innerHTML = "";

  for (var i = 1; i <= TOTAL_SEGMENTS; i++) {
    if (i > 1) {
      var conn = document.createElement("div");
      conn.className = "seg-connector" + (i <= completedUpTo + 1 ? " filled" : "");
      container.appendChild(conn);
    }

    var node = document.createElement("div");
    var nodeClass = "seg-node";
    if (i <= completedUpTo) nodeClass += " completed";
    else if (i === completedUpTo + 1) nodeClass += " current";
    node.className = nodeClass;

    var dot = document.createElement("div");
    dot.className = "seg-dot";
    dot.textContent = i;
    node.appendChild(dot);

    var label = document.createElement("span");
    label.textContent = "SEG " + i;
    node.appendChild(label);

    container.appendChild(node);
  }
}

function continueAfterTransition() {
  gameState.currentSegment++;
  gameState.currentQuestionInSegment = 0;
  saveState();

  showTopicSelection();
}

// ============================================
// LIFELINES & TOAST FEEDBACK
// ============================================

function showLifelineBanner(message, type, durationMs) {
  var existing = document.getElementById("lifeline-toast");
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }

  var toast = document.createElement("div");
  toast.id = "lifeline-toast";
  toast.className = "lifeline-toast " + (type || "");
  toast.innerHTML = message;

  var qCard = document.getElementById("question-card");
  if (qCard && qCard.parentNode) {
    qCard.parentNode.insertBefore(toast, qCard);
  }

  var dur = durationMs || 2000;
  setTimeout(function () {
    if (toast && toast.parentNode) {
      toast.classList.add("fade-out");
      setTimeout(function () {
        if (toast && toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 350);
    }
  }, dur);
}

function useLifeline(type) {
  if (!gameState || gameState.isAnswered) return;
  if (gameState.lifelinesRemaining <= 0) return;
  if (gameState.lifelinesUsed[type]) return;

  // Immediately pause the timer while applying lifeline
  pauseTimer();

  gameState.lifelinesUsed[type] = true;
  gameState.lifelinesRemaining--;
  saveState();
  updateLifelineUI();

  switch (type) {
    case "5050":
      apply5050();
      break;
    case "phone":
      applyPhoneAFriend();
      break;
    case "switch":
      applySwitchQuestion();
      break;
  }
}

// 1. LIFELINE: 50:50
function apply5050() {
  var question = gameState.currentQuestion;
  var correctIdx = question.answer;

  // Collect wrong option indices
  var wrongIndices = [];
  for (var i = 0; i < question.options.length; i++) {
    if (i !== correctIdx) wrongIndices.push(i);
  }

  // Shuffle and pick 2 to hide
  shuffleArray(wrongIndices);
  var toHide = wrongIndices.slice(0, 2);

  toHide.forEach(function (idx) {
    var btn = document.getElementById("option-" + idx);
    if (btn) {
      btn.classList.add("option-hidden");
      btn.classList.add("option-disabled");
    }
  });

  // Show feedback banner
  showLifelineBanner("⚡ <strong>50:50 Lifeline</strong>: ২টি ভুল অপশন বাদ দেওয়া হলো!", "toast-5050", 1600);

  // Resume timer immediately
  resumeTimer();
}

// 2. LIFELINE: PHONE A FRIEND (30s Live Call Visualizer)
let phoneCallInterval = null;
let phoneCallSeconds = 30;

function applyPhoneAFriend() {
  // Turn off / pause main quiz timer immediately
  pauseTimer();

  var modal = document.getElementById("modal-phone");
  var secondsSpan = document.getElementById("phone-call-seconds");
  var statusText = document.getElementById("phone-call-status");

  if (modal) modal.classList.add("show");
  phoneCallSeconds = 30;
  if (secondsSpan) secondsSpan.textContent = phoneCallSeconds;
  if (statusText) {
    statusText.textContent = "🟢 Call in Progress • Speak with your friend";
    statusText.style.color = "var(--color-success)";
  }

  // Turn on Phone a Friend 30s countdown timer
  if (phoneCallInterval) clearInterval(phoneCallInterval);
  phoneCallInterval = setInterval(function () {
    phoneCallSeconds--;
    if (secondsSpan) secondsSpan.textContent = Math.max(0, phoneCallSeconds);

    if (phoneCallSeconds <= 5 && statusText) {
      statusText.textContent = "⚠️ Call Time Ending Soon • " + phoneCallSeconds + "s";
      statusText.style.color = "var(--color-error)";
    }

    if (phoneCallSeconds <= 0) {
      clearInterval(phoneCallInterval);
      phoneCallInterval = null;
      closePhoneModal(); // Automatically ends call & starts main timer
    }
  }, 1000);
}

function closePhoneModal() {
  if (phoneCallInterval) {
    clearInterval(phoneCallInterval);
    phoneCallInterval = null;
  }
  var modal = document.getElementById("modal-phone");
  if (modal) modal.classList.remove("show");

  showLifelineBanner("📞 <strong>Phone Call Ended</strong>: টাইমার পুনরায় চালু হয়েছে!", "toast-phone", 1600);

  // Automatically resumes the main quiz timer immediately
  resumeTimer();
}

// 3. LIFELINE: SWITCH THE QUESTION
function applySwitchQuestion() {
  var currentTopic = gameState.selectedTopics[gameState.currentSegment];
  var currentDiff = getDifficultyForQuestion(gameState.overallQuestionNumber);

  var newQuestion = selectNextQuestion(currentTopic, currentDiff);

  if (!newQuestion) {
    alert("No more questions available for this topic and difficulty.");
    // Refund lifeline if no question available
    gameState.lifelinesUsed["switch"] = false;
    gameState.lifelinesRemaining++;
    saveState();
    updateLifelineUI();
    resumeTimer();
    return;
  }

  // Time spent on switched question
  var timeSpent = Date.now() - gameState.questionStartTime;
  gameState.totalTimeMs += timeSpent;

  // Mark new question as used
  markQuestionAsUsed(newQuestion.id);
  gameState.switchedQuestions++;
  gameState.currentQuestion = newQuestion;
  gameState.questionStartTime = Date.now();
  gameState.isAnswered = false;
  saveState();

  // Re-render question
  document.getElementById("question-text").textContent = newQuestion.question;
  renderOptions(newQuestion);

  // Animate question card
  var qCard = document.getElementById("question-card");
  if (qCard) {
    qCard.style.animation = "none";
    void qCard.offsetWidth;
    qCard.style.animation = "cardEnter 0.4s var(--ease) both";
  }

  // Show switched banner
  showLifelineBanner("🔄 <strong>Switch Question</strong>: নতুন প্রশ্ন লোড করা হয়েছে!", "toast-switch", 1400);

  // Restart 30s timer immediately for the new question
  startTimer(TIMER_DURATION);
}

function updateLifelineUI() {
  var countSpan = document.getElementById("lifelines-count");
  if (countSpan) countSpan.textContent = gameState.lifelinesRemaining;

  var btn5050 = document.getElementById("lifeline-5050");
  var btnPhone = document.getElementById("lifeline-phone");
  var btnSwitch = document.getElementById("lifeline-switch");

  if (btn5050) btn5050.disabled = gameState.lifelinesUsed["5050"] || gameState.lifelinesRemaining <= 0;
  if (btnPhone) btnPhone.disabled = gameState.lifelinesUsed["phone"] || gameState.lifelinesRemaining <= 0;
  if (btnSwitch) btnSwitch.disabled = gameState.lifelinesUsed["switch"] || gameState.lifelinesRemaining <= 0;
}

// ============================================
// NEXT PARTICIPANT
// ============================================

function nextParticipant() {
  stopTimer();
  gameState = null;
  clearCurrentState();

  var nameInput = document.getElementById("participant-name");
  nameInput.value = "";
  document.getElementById("name-error").textContent = "";

  hideFeedbackOverlay();

  showScreen("screen-name");

  setTimeout(function () {
    nameInput.focus();
  }, 500);
}

// ============================================
// RANKING
// ============================================

function showRankingScreen() {
  var results = loadResults();

  var wrapper = document.getElementById("ranking-table-wrapper");
  var emptyMsg = document.getElementById("ranking-empty");

  if (results.length === 0) {
    emptyMsg.style.display = "block";
    // Remove any existing table
    var existingTable = wrapper.querySelector("table");
    if (existingTable) existingTable.remove();
    showScreen("screen-ranking");
    return;
  }

  emptyMsg.style.display = "none";

  // Sort: Score desc → Correct Answers desc → Total Time asc → Completed At asc
  results.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    if (b.correctAnswers !== a.correctAnswers) return b.correctAnswers - a.correctAnswers;
    if (a.totalTimeMs !== b.totalTimeMs) return a.totalTimeMs - b.totalTimeMs;
    return new Date(a.completedAt) - new Date(b.completedAt);
  });

  document.getElementById("ranking-subtitle").textContent =
    results.length + " participant" + (results.length !== 1 ? "s" : "") + " ranked by performance";

  // Build table
  var html = '<table class="ranking-table">';
  html += '<thead><tr>';
  html += '<th>Rank</th><th>Participant</th><th>Score</th><th>Correct</th><th>Time</th><th>Status</th>';
  html += '</tr></thead><tbody>';

  results.forEach(function (r, idx) {
    var rank = idx + 1;
    var rankClass = "rank-other";
    if (rank === 1) rankClass = "rank-1";
    else if (rank === 2) rankClass = "rank-2";
    else if (rank === 3) rankClass = "rank-3";

    var statusClass = r.status === "completed" ? "status-completed" : "status-eliminated";
    var statusText = r.status === "completed" ? "COMPLETED" : "ELIMINATED";

    html += '<tr>';
    html += '<td><span class="rank-badge ' + rankClass + '">' + rank + '</span></td>';
    html += '<td>' + escapeHtml(r.participantName) + '</td>';
    html += '<td>' + r.score + '</td>';
    html += '<td>' + r.correctAnswers + '</td>';
    html += '<td>' + formatTime(r.totalTimeMs) + '</td>';
    html += '<td><span class="rank-status ' + statusClass + '">' + statusText + '</span></td>';
    html += '</tr>';
  });

  html += '</tbody></table>';

  // Remove existing table if any
  var existingTable = wrapper.querySelector("table");
  if (existingTable) existingTable.remove();

  wrapper.insertAdjacentHTML("afterbegin", html);

  showScreen("screen-ranking");
}

// ============================================
// STATE RESTORATION
// ============================================

function restoreState() {
  var saved = loadState();
  if (!saved) return false;
  if (!saved.turnActive) {
    clearCurrentState();
    return false;
  }
  if (saved.completed) {
    clearCurrentState();
    return false;
  }

  gameState = saved;

  // Determine which screen to show
  if (gameState.overallQuestionNumber === 0 || gameState.currentQuestionInSegment === 0) {
    // Was at topic selection
    showTopicSelection();
    return true;
  }

  // Was mid-question — need to re-load the question
  if (gameState.currentQuestion) {
    // Re-show the quiz screen with current question
    document.getElementById("quiz-participant").textContent = gameState.participantName;
    document.getElementById("quiz-segment-badge").textContent = "SEG " + gameState.currentSegment;
    document.getElementById("quiz-topic-badge").textContent = gameState.selectedTopics[gameState.currentSegment];

    var currentDiff = getDifficultyForQuestion(gameState.overallQuestionNumber);
    updateLevelBadge(currentDiff);

    document.getElementById("quiz-score").textContent = "Score: " + gameState.score;
    document.getElementById("quiz-progress-text").textContent =
      "Question " + gameState.overallQuestionNumber + " of " + TOTAL_QUESTIONS +
      "  •  Segment " + gameState.currentSegment + " — Q" + gameState.currentQuestionInSegment + "/" + QUESTIONS_PER_SEGMENT;
    document.getElementById("quiz-progress-fill").style.width =
      (((gameState.overallQuestionNumber - 1) / TOTAL_QUESTIONS) * 100) + "%";

    document.getElementById("question-number").textContent = "QUESTION " + gameState.overallQuestionNumber;
    document.getElementById("question-text").textContent = gameState.currentQuestion.question;

    renderOptions(gameState.currentQuestion);
    updateLifelineUI();
    updateSwitchButton();

    gameState.isAnswered = false;
    gameState.questionStartTime = Date.now();

    showScreen("screen-quiz");
    startTimer(TIMER_DURATION);
    return true;
  }

  return false;
}

// ============================================
// UTILITY
// ============================================

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTime(ms) {
  if (!ms || ms <= 0) return "0s";
  var seconds = Math.round(ms / 1000);
  if (seconds < 60) return seconds + "s";
  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return mins + "m " + secs + "s";
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener("keydown", function (e) {
  // Enter key on name input
  if (e.key === "Enter") {
    var nameScreen = document.getElementById("screen-name");
    if (nameScreen.classList.contains("active")) {
      submitName();
    }
  }
});

// ============================================
// INITIALIZATION
// ============================================

function init() {
  // Try to restore saved state
  var restored = restoreState();

  if (!restored) {
    showScreen("screen-welcome");
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", init);
