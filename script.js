/* ============================================
   CUET Career Club — Quiz Challenge
   Club Fest 2026
   Application Logic — 5 Progressive Steps × 3 Questions (15 Total)
   ============================================ */

// ============================================
// CONFIGURATION
// ============================================

/** Total steps/segments and questions per segment */
const TOTAL_SEGMENTS = 5;
const QUESTIONS_PER_SEGMENT = 3;
const TOTAL_QUESTIONS = TOTAL_SEGMENTS * QUESTIONS_PER_SEGMENT; // 15

/** Timer duration in seconds */
const TIMER_DURATION = 30;
const EXTRA_TIME_BONUS = 15;

/** Initial lifelines count */
const INITIAL_LIFELINES = 3;

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

/** Scoring per difficulty step */
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

/** Difficulty by step / segment number (1 to 5) */
function getDifficultyForSegment(segNum) {
  switch (segNum) {
    case 1: return "easy";
    case 2: return "easy-medium";
    case 3: return "medium";
    case 4: return "medium-hard";
    case 5: return "hard";
    default: return "easy";
  }
}

/** Map step difficulties to candidate question difficulties with graceful fallbacks */
function getActualDifficulties(difficulty) {
  switch (difficulty) {
    case "easy": return ["easy", "easy-medium"];
    case "easy-medium": return ["easy-medium", "easy", "medium"];
    case "medium": return ["medium", "easy-medium", "medium-hard"];
    case "medium-hard": return ["medium-hard", "hard", "medium"];
    case "hard": return ["hard", "medium-hard"];
    default: return [difficulty, "easy"];
  }
}

/** Display label for difficulty step */
function difficultyLabel(diff) {
  switch (diff) {
    case "easy": return "EASY";
    case "easy-medium": return "EASY MEDIUM";
    case "medium": return "MEDIUM";
    case "medium-hard": return "MEDIUM HARD";
    case "hard": return "HARD";
    default: return diff ? diff.toUpperCase() : "EASY";
  }
}

/** LocalStorage keys */
const STORAGE_KEYS = {
  currentState: "cuet_quiz_current_state",
  results: "cuet_quiz_results",
  globalUsedQuestions: "cuet_quiz_global_used_questions"
};

/** Delay timings (ms) */
const TIMING = {
  correctFeedback: 1200,
  wrongFeedback: 1500,
  timeoutFeedback: 1500,
  transitionDelay: 600
};

// ============================================
// QUESTION BANK — 12 Topics × 5 Difficulty Steps (300 Questions)
// Step 1: Easy | Step 2: Easy Medium | Step 3: Medium | Step 4: Medium Hard | Step 5: Hard
// ============================================

const questionBank = [

  // ==========================================
  //  1. BANGLADESH — STEP 1: EASY
  // ==========================================
  { "id": "bd_e1", "topic": "Bangladesh", "difficulty": "easy", "question": "Who was the Bengali army major who announced Bangladesh's declaration of independence on radio on behalf of Sheikh Mujib on March 27, 1971?", "options": ["M.A.G. Osmani", "Hussain Muhammad Ershad", "Khaled Mosharraf", "Ziaur Rahman"], "answer": 3 },
  { "id": "bd_e2", "topic": "Bangladesh", "difficulty": "easy", "question": "Who was the Commander -in-Chief of the Mukti Bahini (Bangladesh's liberation forces) during the 1971 war?", "options": ["K.M. Shafiullah", "Khaled Mosharraf", "M.A.G. Osmani", "Ziaur Rahman"], "answer": 2 },
  { "id": "bd_e3", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the term for the freedom fighters of Bangladesh during the 1971 Liberation War?", "options": ["Razakar", "Ansar", "Shanti Bahini", "Mukti Bahini"], "answer": 3 },
  { "id": "bd_e4", "topic": "Bangladesh", "difficulty": "easy", "question": "On what date did the Pakistani army launch \"Operation Searchlight\" against Bengali civilians in 1971?", "options": ["March 26", "December 16", "March 25", "April 17"], "answer": 2 },
  { "id": "bd_e5", "topic": "Bangladesh", "difficulty": "easy", "question": "What title is given to the highest gallantry award recipients of the Liberation War?", "options": ["Bir Uttom", "Bir Bikrom", "Bir Protik", "Bir Shreshtho"], "answer": 3 },
  { "id": "bd_e6", "topic": "Bangladesh", "difficulty": "easy", "question": "How many Bir Shreshtho (highest gallantry award) recipients are there from the Liberation War?", "options": ["7", "11", "9", "5"], "answer": 0 },
  { "id": "bd_e7", "topic": "Bangladesh", "difficulty": "easy", "question": "What was the name of the 1974 agreement between Bangladesh, India, and Pakistan that addressed post-war issues like prisoners of war?", "options": ["Delhi Agreement", "Simla Agreement", "Tripartite Agreement", "Dhaka Accord"], "answer": 2 },
  { "id": "bd_e8", "topic": "Bangladesh", "difficulty": "easy", "question": "Who served as President of the provisional Mujibnagar Government during the 1971 Liberation War, in absentia?", "options": ["Syed Nazrul Islam", "Abu Sayeed Chowdhury", "Sheikh Mujibur Rahman", "Tajuddin Ahmad"], "answer": 2 },
  { "id": "bd_e9", "topic": "Bangladesh", "difficulty": "easy", "question": "Which country is widely recognized as the first to formally recognize Bangladesh's independence?", "options": ["Bhutan", "Soviet Union", "India", "United Kingdom"], "answer": 0 },
  { "id": "bd_e10", "topic": "Bangladesh", "difficulty": "easy", "question": "Along with Nationalism, Socialism, and Democracy, what was the fourth fundamental state principle in Bangladesh's original 1972 constitution?", "options": ["Communism", "Absolutism", "Secularism", "Federalism"], "answer": 2 },
  { "id": "bd_e11", "topic": "Bangladesh", "difficulty": "easy", "question": "In which year was the Chittagong Hill Tracts Peace Accord signed, ending decades of insurgency?", "options": ["1997", "1994", "2001", "1991"], "answer": 0 },
  { "id": "bd_e12", "topic": "Bangladesh", "difficulty": "easy", "question": "Which Bangladeshi city is traditionally known as the \"City of Mosques\"?", "options": ["Bogra", "Sylhet", "Chittagong", "Dhaka"], "answer": 3 },
  { "id": "bd_e13", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the traditional Bengali dish of soaked, fermented rice, often eaten with fried hilsa fish?", "options": ["Pitha", "Biryani", "Panta Bhat", "Khichuri"], "answer": 2 },
  { "id": "bd_e14", "topic": "Bangladesh", "difficulty": "easy", "question": "Who is considered the \"Poet of Bengal\" whose poem \"Bidrohi\" (The Rebel) became iconic?", "options": ["Jasimuddin", "Michael Madhusudan Dutt", "Rabindranath Tagore", "Kazi Nazrul Islam"], "answer": 3 },
  { "id": "bd_e15", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of Bangladesh's stock exchange, established in 1954?", "options": ["Dhaka Stock Exchange", "Chittagong Stock Exchange", "National Exchange", "Bangladesh Exchange"], "answer": 0 },
  { "id": "bd_e16", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the term for the largest administrative unit of local government in Bangladesh, of which there are eight?", "options": ["Union", "Division", "Upazila", "District"], "answer": 1 },
  { "id": "bd_e17", "topic": "Bangladesh", "difficulty": "easy", "question": "Which river, along with the Ganges and Brahmaputra, forms the delta on which most of Bangladesh sits?", "options": ["Padma", "Surma", "Jamuna", "Meghna"], "answer": 3 },
  { "id": "bd_e18", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the largest city in Bangladesh by population?", "options": ["Chittagong", "Rajshahi", "Dhaka", "Khulna"], "answer": 2 },
  { "id": "bd_e19", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of the main international airport serving Dhaka?", "options": ["Cox's Bazar Airport", "Osmani International Airport", "Shah Amanat International Airport", "Hazrat Shahjalal International Airport"], "answer": 3 },
  { "id": "bd_e20", "topic": "Bangladesh", "difficulty": "easy", "question": "Which district in Bangladesh is most famous for producing tea?", "options": ["Sylhet", "Rangpur", "Khulna", "Barisal"], "answer": 0 },
  { "id": "bd_e21", "topic": "Bangladesh", "difficulty": "easy", "question": "In which district is Chittagong University of Engineering & Technology (CUET) located?", "options": ["Chittagong", "Comilla", "Feni", "Cox's Bazar"], "answer": 0 },
  { "id": "bd_e22", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of the traditional embroidered quilt of Bangladesh, stitched from layers of old cloth?", "options": ["Nakshi Kantha", "Tangail saree", "Muslin", "Jamdani"], "answer": 0 },
  { "id": "bd_e23", "topic": "Bangladesh", "difficulty": "easy", "question": "Which river flows through the city of Dhaka?", "options": ["Padma", "Surma", "Jamuna", "Buriganga"], "answer": 3 },
  { "id": "bd_e24", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of Bangladesh's largest football stadium, located in Dhaka?", "options": ["MA Aziz Stadium", "Shaheed Suhrawardy Stadium", "Bangabandhu National Stadium", "Sher -e-Bangla National Stadium"], "answer": 2 },
  { "id": "bd_e25", "topic": "Bangladesh", "difficulty": "easy", "question": "Which city in Bangladesh is known for the shrine of Hazrat Shah Jalal?", "options": ["Chittagong", "Sylhet", "Dhaka", "Bogra"], "answer": 1 },
  { "id": "bd_e26", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of Bangladesh's oldest and largest public university, established in 1921?", "options": ["University of Rajshahi", "Jahangirnagar University", "University of Dhaka", "University of Chittagong"], "answer": 2 },
  { "id": "bd_e27", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the term for a small, temporary island formed by silt deposits in Bangladesh's major rivers?", "options": ["Upazila", "Beel", "Haor", "Char"], "answer": 3 },
  { "id": "bd_e28", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of the popular Bengali sweet made from cottage cheese balls soaked in sugar syrup?", "options": ["Sandesh", "Kalojam", "Rasgulla", "Chomchom"], "answer": 2 },
  { "id": "bd_e29", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of Bangladesh's coast guard force, responsible for maritime law enforcement?", "options": ["Border Guard Bangladesh", "Bangladesh Navy", "Bangladesh Coast Guard", "Ansar VDP"], "answer": 2 },
  { "id": "bd_e30", "topic": "Bangladesh", "difficulty": "easy", "question": "Which Bangladeshi city serves as the country's main seaport and commercial hub?", "options": ["Chittagong", "Dhaka", "Khulna", "Mongla"], "answer": 0 },
  { "id": "bd_e31", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of the popular Bengali folk boat race traditionally held during the monsoon season?", "options": ["Kabaddi", "Nouka Baich", "Ha -du-du", "Lathi Khela"], "answer": 1 },
  { "id": "bd_e32", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of the international cricket stadium located in Mirpur, Dhaka?", "options": ["Sher -e-Bangla National Cricket Stadium", "Fatullah Stadium", "Sylhet International Cricket Stadium", "Zahur Ahmed Chowdhury Stadium"], "answer": 0 },
  { "id": "bd_e33", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of Bangladesh's securities market regulatory body?", "options": ["Bangladesh Securities and Exchange Commission", "Bangladesh Bank", "Dhaka Stock Exchange", "Bangladesh Investment Authority"], "answer": 0 },
  { "id": "bd_e34", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of the popular Bangladeshi street food snack made of lentil fritters?", "options": ["Samosa", "Chotpoti", "Piyaju", "Fuchka"], "answer": 2 },
  { "id": "bd_e35", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of the historic public university located in Rajshahi?", "options": ["University of Dhaka", "Jahangirnagar University", "University of Rajshahi", "Islamic University"], "answer": 2 },
  { "id": "bd_e36", "topic": "Bangladesh", "difficulty": "easy", "question": "In which year was CUET originally established as Chittagong Engineering College?", "options": ["1958", "1978", "1986", "1968"], "answer": 3 },
  { "id": "bd_e37", "topic": "Bangladesh", "difficulty": "easy", "question": "What is the name of the large hydroelectric power station located near Kaptai, not far from CUET's campus?", "options": ["Rooppur Power Station", "Karnaphuli Hydroelectric Power Station", "Raozan Power Plant", "Ashuganj Power Station"], "answer": 1 },

  // ==========================================
  //  1. BANGLADESH — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "bd_em1", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "Which American architect designed the National Parliament House (Jatiyo Sangsad Bhaban)?", "options": ["Louis Kahn", "F.R. Khan", "Muzharul Islam", "Le Corbusier"], "answer": 0 },
  { "id": "bd_em2", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "Who is known as the pioneer of modern architecture in Bangladesh, credited with helping bring Louis Kahn onto the Parliament project?", "options": ["Louis Kahn", "Muzharul Islam", "Rafiq Azam", "Bashirul Haq"], "answer": 1 },
  { "id": "bd_em3", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the 1952 movement in which students protested for Bengali to be made a state language of Pakistan?", "options": ["Non -Cooperation Movement", "Liberation Movement", "Six -Point Movement", "Language Movement"], "answer": 3 },
  { "id": "bd_em4", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What was the name of Sheikh Mujibur Rahman's 1966 political program demanding greater autonomy for East Pakistan?", "options": ["Round Table Conference", "Language Movement", "Six -Point Movement", "Mass Uprising"], "answer": 2 },
  { "id": "bd_em5", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "In which year did the mass uprising against Ayub Khan's regime occur in East Pakistan?", "options": ["1970", "1969", "1966", "1971"], "answer": 1 },
  { "id": "bd_em6", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What was the name of the Pakistani military crackdown that began in East Pakistan on the night of March 25, 1971?", "options": ["Operation Chengiz Khan", "Operation Blitz", "Operation Barisal", "Operation Searchlight"], "answer": 3 },
  { "id": "bd_em7", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "Which Bangladeshi social entrepreneur founded BRAC, one of the world's largest NGOs?", "options": ["Atiur Rahman", "Fazle Hasan Abed", "Amartya Sen", "Muhammad Yunus"], "answer": 1 },
  { "id": "bd_em8", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What does the acronym BRAC, one of the world's largest NGOs founded in Bangladesh, stand for?", "options": ["Bangladesh Relief and Aid Committee", "Bangladesh Rural Advancement Committee", "Bangladesh Rehabilitation Assistance Committee", "Bengal Rural Action Council"], "answer": 1 },
  { "id": "bd_em9", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What was Bangladesh's first private satellite television channel, launched in 1997?", "options": ["Channel i", "ATN Bangla", "NTV", "Ekushey TV"], "answer": 1 },
  { "id": "bd_em10", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name given to the 1970 cyclone that killed hundreds of thousands in East Pakistan and remains one of the deadliest natural disasters in history?", "options": ["Cyclone Amphan", "Cyclone Sidr", "Cyclone Aila", "Bhola cyclone"], "answer": 3 },
  { "id": "bd_em11", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the current name of Bangladesh's border security force, formerly called Bangladesh Rifles (BDR)?", "options": ["Rapid Action Battalion", "Ansar VDP", "Border Guard Bangladesh", "Special Security Force"], "answer": 2 },
  { "id": "bd_em12", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "In which year did the mutiny by border guard soldiers occur at their Dhaka headquarters, then called BDR?", "options": ["2013", "2007", "2009", "2011"], "answer": 2 },
  { "id": "bd_em13", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "Whose novel \"Lal Salu\" is considered a classic of Bengali literature exploring religious hypocrisy in rural Bengal?", "options": ["Humayun Ahmed", "Shahidullah Kaiser", "Akhtaruzzaman Elias", "Syed Waliullah"], "answer": 3 },
  { "id": "bd_em14", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the historic fort built by Mughal prince Azam Shah in Dhaka, now a major tourist site?", "options": ["Choto Katra", "Ahsan Manzil", "Bara Katra", "Lalbagh Fort"], "answer": 3 },
  { "id": "bd_em15", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the pink palace in Dhaka that once served as the residence of the Nawab of Dhaka?", "options": ["Lalbagh Fort", "Ruplal House", "Curzon Hall", "Ahsan Manzil"], "answer": 3 },
  { "id": "bd_em16", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the 1943 famine that devastated Bengal under British colonial rule, often studied alongside Bangladesh's history?", "options": ["Bengal famine of 1943", "Monga", "Great Famine", "Bhola cyclone"], "answer": 0 },
  { "id": "bd_em17", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What term describes the recurring seasonal food scarcity historically affecting parts of northern Bangladesh before harvest season?", "options": ["Monga", "Bengal famine", "Aila", "Bhola cyclone"], "answer": 0 },
  { "id": "bd_em18", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of Bangladesh's national mosque, located in Dhaka?", "options": ["Sat Gombuj Mosque", "Baitul Mukarram", "Kartalab Khan Mosque", "Star Mosque"], "answer": 1 },
  { "id": "bd_em19", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the traditional Bengali musical instrument, a single -stringed instrument often played by folk singers?", "options": ["Ektara", "Tabla", "Dotara", "Sarod"], "answer": 0 },
  { "id": "bd_em20", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "Who are the wandering mystic folk singers of Bengal, known for songs blending Sufi and folk traditions?", "options": ["Bauls", "Qawwals", "Kirtaniyas", "Jatra performers"], "answer": 0 },
  { "id": "bd_em21", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "In which year did Chittagong Engineering College convert into Bangladesh Institute of Technology, Chittagong (BIT Chittagong)?", "options": ["1978", "1990", "1968", "1986"], "answer": 3 },
  { "id": "bd_em22", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "In which year did BIT Chittagong become a full public university, taking the name CUET?", "options": ["2010", "1999", "1996", "2003"], "answer": 3 },
  { "id": "bd_em23", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the official motto of Chittagong University of Engineering & Technology?", "options": ["Truth and service", "A centre of excellence", "Light and learning", "Knowledge is power"], "answer": 1 },
  { "id": "bd_em24", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "In which upazila of Chittagong District is CUET's campus located?", "options": ["Hathazari", "Patiya", "Anwara", "Raozan"], "answer": 3 },
  { "id": "bd_em25", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "Along with CUET, which two other engineering universities form the \"CKRUET\" combined admission cluster?", "options": ["IUT and NSU", "MIST and AUST", "KUET and RUET", "BUET and DUET"], "answer": 2 },
  { "id": "bd_em26", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What does \"RUET,\" one of Bangladesh's leading engineering universities, stand for?", "options": ["Rangpur University of Engineering and Technology", "Regional University of Engineering and Technology", "Rajshahi University of Engineering and Technology", "Rural University of Engineering and Technology"], "answer": 2 },
  { "id": "bd_em27", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What does \"KUET,\" one of Bangladesh's leading engineering universities, stand for?", "options": ["Khulna University of Engineering and Technology", "Kushtia University of Engineering and Technology", "Karnaphuli University of Engineering and Technology", "Kingdom University of Engineering and Technology"], "answer": 0 },
  { "id": "bd_em28", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of Bangladesh's premier engineering and technology university located in Dhaka, established in 1962?", "options": ["American International University", "Bangladesh University of Engineering and Technology", "Ahsanullah University", "University of Dhaka"], "answer": 1 },
  { "id": "bd_em29", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the government body that oversees and accredits public universities in Bangladesh?", "options": ["National University", "Ministry of Education", "University Grants Commission", "Bangladesh Accreditation Council"], "answer": 2 },
  { "id": "bd_em30", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of Bangladesh's largest specialized medical university, located in Dhaka?", "options": ["Dhaka Medical College", "Sir Salimullah Medical College", "Bangabandhu Sheikh Mujib Medical University", "Chittagong Medical College"], "answer": 2 },
  { "id": "bd_em31", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the popular Bengali rice -based dessert made with condensed milk, often served during festivals?", "options": ["Semai", "Firni", "Zarda", "Payesh"], "answer": 3 },
  { "id": "bd_em32", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the traditional Bengali art of folk scroll painting depicting stories, often accompanied by singing?", "options": ["Patachitra", "Shola craft", "Alpana", "Nakshi art"], "answer": 0 },
  { "id": "bd_em33", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is Bangladesh's national bird?", "options": ["Peacock", "Oriental magpie -robin (Doel)", "Kingfisher", "Parrot"], "answer": 1 },
  { "id": "bd_em34", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is Bangladesh's national tree?", "options": ["Coconut tree", "Banyan tree", "Bamboo", "Mango tree"], "answer": 3 },
  { "id": "bd_em35", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the popular spicy Bangladeshi street food made from puffed rice, vegetables, and tamarind sauce?", "options": ["Fuchka", "Bhelpuri", "Jhalmuri", "Chotpoti"], "answer": 2 },
  { "id": "bd_em36", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the government authority responsible for regulating telecommunications in Bangladesh?", "options": ["Bangladesh Computer Council", "Bangladesh Standards Authority", "Bangladesh Telecommunication Regulatory Commission", "Bangladesh Bank"], "answer": 2 },
  { "id": "bd_em37", "topic": "Bangladesh", "difficulty": "easy-medium", "question": "What is the name of the Bangladeshi agency responsible for overseeing satellite and space -related activities?", "options": ["Bangladesh Telecommunication Regulatory Commission", "Bangladesh Space Research and Remote Sensing Organisation", "SPARRSO Institute of Technology", "Bangladesh Atomic Energy Commission"], "answer": 1 },

  // ==========================================
  //  1. BANGLADESH — STEP 3: MEDIUM
  // ==========================================
  { "id": "bd_m1", "topic": "Bangladesh", "difficulty": "medium", "question": "Who served as Acting President of the Mujibnagar Government while Sheikh Mujibur Rahman was imprisoned in Pakistan during 1971?", "options": ["A.H.M. Qamaruzzaman", "Syed Nazrul Islam", "Tajuddin Ahmad", "Khondaker Mostaq Ahmad"], "answer": 1 },
  { "id": "bd_m2", "topic": "Bangladesh", "difficulty": "medium", "question": "Into how many operational sectors was the Mukti Bahini organized during the 1971 Liberation War?", "options": ["11 sectors", "12 sectors", "10 sectors", "9 sectors"], "answer": 0 },
  { "id": "bd_m3", "topic": "Bangladesh", "difficulty": "medium", "question": "What was the code name of the August 1971 naval commando operation targeting Pakistani ships in Chittagong and Chalna ports?", "options": ["Operation Searchlight", "Operation X", "Operation Trident", "Operation Jackpot"], "answer": 3 },
  { "id": "bd_m4", "topic": "Bangladesh", "difficulty": "medium", "question": "What was the name of the underground radio station that broadcast pro -liberation news during the 1971 war?", "options": ["Radio Pakistan", "All India Radio", "Free Bengal Radio", "Shadhin Bangla Betar Kendro"], "answer": 3 },
  { "id": "bd_m5", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name given to the November 1975 killing of four senior national leaders inside Dhaka Central Jail?", "options": ["Jail Killing Day", "Dhaka Massacre", "Black November", "November Coup"], "answer": 0 },
  { "id": "bd_m6", "topic": "Bangladesh", "difficulty": "medium", "question": "What was the code name for the joint India -Bangladesh military command formed in late 1971 to coordinate the final offensive against Pakistani forces?", "options": ["Joint Forces Command", "Mitro Bahini", "Combined Forces", "Mukti Bahini"], "answer": 1 },
  { "id": "bd_m7", "topic": "Bangladesh", "difficulty": "medium", "question": "What was the name of the 1972 agreement between India and Pakistan that addressed the return of Pakistani prisoners of war held after the Liberation War?", "options": ["Tripartite Agreement", "Shimla Agreement", "Dhaka Accord", "Delhi Agreement"], "answer": 1 },
  { "id": "bd_m8", "topic": "Bangladesh", "difficulty": "medium", "question": "What was the name of the paramilitary auxiliary force recruited from local collaborators by the Pakistani army during the 1971 war, later tried for war crimes?", "options": ["Razakar", "Al -Badr", "Mukti Bahini", "Ansar"], "answer": 0 },
  { "id": "bd_m9", "topic": "Bangladesh", "difficulty": "medium", "question": "What tribunal, established in Bangladesh in 2010, has prosecuted individuals for war crimes committed during the 1971 Liberation War?", "options": ["International Crimes Tribunal", "Special Tribunal", "International Criminal Court", "War Crimes Commission"], "answer": 0 },
  { "id": "bd_m10", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name commonly given to the 1990 mass uprising that led to the fall of President Hussain Muhammad Ershad's government?", "options": ["Six -Point Movement", "Mass Uprising of 1969", "Mass Uprising of 1990", "Language Movement"], "answer": 2 },
  { "id": "bd_m11", "topic": "Bangladesh", "difficulty": "medium", "question": "Who became the first woman to serve as Speaker of the Jatiya Sangsad (Bangladesh's Parliament)?", "options": ["Sahara Khatun", "Khaleda Zia", "Shirin Sharmin Chaudhury", "Sheikh Hasina"], "answer": 2 },
  { "id": "bd_m12", "topic": "Bangladesh", "difficulty": "medium", "question": "What British -era land revenue system of 1793, applied to Bengal, had long -lasting effects on the rural land structure of present -day Bangladesh?", "options": ["Ryotwari System", "Zamindari Abolition", "Permanent Settlement", "Mahalwari System"], "answer": 2 },
  { "id": "bd_m13", "topic": "Bangladesh", "difficulty": "medium", "question": "Before the Bangladeshi Taka was introduced in 1972, what currency (some notes overprinted) was used in newly independent Bangladesh?", "options": ["Indian Rupee", "Pakistani Rupee", "Bangladeshi Rupee", "British Pound"], "answer": 1 },
  { "id": "bd_m14", "topic": "Bangladesh", "difficulty": "medium", "question": "What was the name of the border village that served as the provisional capital of the Mujibnagar Government during the 1971 war?", "options": ["Agartala", "Comilla", "Kolkata", "Baidyanathtala, Meherpur"], "answer": 3 },
  { "id": "bd_m15", "topic": "Bangladesh", "difficulty": "medium", "question": "Which of Bangladesh's seven Bir Shreshtho recipients was a Pakistan Navy sailor who defected and died fighting near Khulna in December 1971?", "options": ["Nur Mohammad Sheikh", "Mostafa Kamal", "Ruhul Amin", "Matiur Rahman"], "answer": 2 },
  { "id": "bd_m16", "topic": "Bangladesh", "difficulty": "medium", "question": "Which Pakistani lieutenant general signed the Instrument of Surrender in Dhaka on December 16, 1971?", "options": ["Tikka Khan", "A.A.K. Niazi", "Rao Farman Ali", "Yahya Khan"], "answer": 1 },
  { "id": "bd_m17", "topic": "Bangladesh", "difficulty": "medium", "question": "What was the name of the 1930 armed raid on British armories in Chittagong, led by revolutionary Surya Sen?", "options": ["Chittagong Revolt", "Chittagong Armoury Raid", "Chittagong Mutiny", "Chittagong Uprising"], "answer": 1 },
  { "id": "bd_m18", "topic": "Bangladesh", "difficulty": "medium", "question": "Which power plant, with a capacity of 420 megawatts, is situated directly opposite CUET's campus?", "options": ["Barapukuria Power Plant", "Ghorashal Power Plant", "Ashuganj Power Station", "Raozan Thermal Power Plant"], "answer": 3 },
  { "id": "bd_m19", "topic": "Bangladesh", "difficulty": "medium", "question": "Approximately how far is CUET's campus from Chittagong city center?", "options": ["About 2 kilometers", "About 5 kilometers", "About 20 kilometers", "About 50 kilometers"], "answer": 2 },
  { "id": "bd_m20", "topic": "Bangladesh", "difficulty": "medium", "question": "How many faculties does CUET currently operate under?", "options": ["Five", "Seven", "Ten", "Three"], "answer": 0 },
  { "id": "bd_m21", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the approximate size of CUET's campus, in acres?", "options": ["171 acres", "80 acres", "300 acres", "50 acres"], "answer": 0 },
  { "id": "bd_m22", "topic": "Bangladesh", "difficulty": "medium", "question": "What are CUET's official colors?", "options": ["Green and Red", "Navy Blue and Golden Brown", "Maroon and White", "Black and Gold"], "answer": 1 },
  { "id": "bd_m23", "topic": "Bangladesh", "difficulty": "medium", "question": "Which renowned Bangladeshi physicist and cosmologist chaired the Mathematics department at the University of Chittagong from 1986 to 1988?", "options": ["Abdus Salam", "Qudrat -i-Khuda", "Muhammad Yunus", "Jamal Nazrul Islam"], "answer": 3 },
  { "id": "bd_m24", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name of Bangladesh's premier institution for nuclear energy and research?", "options": ["Bangladesh Council of Scientific and Industrial Research", "Bangladesh Nuclear Regulatory Authority", "Bangladesh Space Agency", "Bangladesh Atomic Energy Commission"], "answer": 3 },
  { "id": "bd_m25", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name of Bangladesh's apex professional body representing engineers, headquartered in Dhaka?", "options": ["Bangladesh Association of Engineers", "Bangladesh Engineering Council", "Institution of Engineers, Bangladesh", "Bangladesh Computer Society"], "answer": 2 },
  { "id": "bd_m26", "topic": "Bangladesh", "difficulty": "medium", "question": "In which year was the University of Chittagong, CUET's original parent institution, itself established?", "options": ["1958", "1971", "1980", "1966"], "answer": 3 },
  { "id": "bd_m27", "topic": "Bangladesh", "difficulty": "medium", "question": "Which department at the University of Chittagong was established in 1968, the same year CUET was founded as an engineering college?", "options": ["Department of Statistics", "Department of Chemistry", "Department of Physics", "Department of Mathematics"], "answer": 2 },
  { "id": "bd_m28", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name of Bangladesh's telecommunications satellite, launched in 2018?", "options": ["SPARRSO -1", "Bangabandhu Satellite -1", "Padma Satellite", "Bangla -Sat"], "answer": 1 },
  { "id": "bd_m29", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name of Bangladesh's premier research institute for rice cultivation, headquartered in Gazipur?", "options": ["Bangladesh Agricultural Research Council", "Bangladesh Rice Research Institute", "Bangladesh Jute Research Institute", "Bangladesh Institute of Nuclear Agriculture"], "answer": 1 },
  { "id": "bd_m30", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name of Bangladesh's specialized public university dedicated to textile engineering?", "options": ["National Institute of Textile Engineering", "Bangladesh University of Textiles", "Dhaka Textile University", "Bangladesh Textile Institute"], "answer": 1 },
  { "id": "bd_m31", "topic": "Bangladesh", "difficulty": "medium", "question": "Which Bangladeshi Nobel laureate previously headed the economics department at Chittagong University?", "options": ["Amartya Sen", "Fazle Hasan Abed", "Abdus Salam", "Muhammad Yunus"], "answer": 3 },
  { "id": "bd_m32", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name of Bangladesh's oldest agricultural university, located in Mymensingh?", "options": ["Sylhet Agricultural University", "Bangladesh Agricultural University", "Sher -e-Bangla Agricultural University", "Patuakhali Science and Technology University"], "answer": 1 },
  { "id": "bd_m33", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name of the technology park established near Dhaka to promote IT and software exports?", "options": ["Chattogram Software Park", "Digital Bangladesh Park", "Bangabandhu Hi -Tech City", "Mongla Tech Zone"], "answer": 2 },
  { "id": "bd_m34", "topic": "Bangladesh", "difficulty": "medium", "question": "What term describes Bangladesh's network of institutes offering diploma -level (sub -bachelor) engineering education?", "options": ["Technical Academy", "Polytechnic Institute", "Vocational College", "Trade School"], "answer": 1 },
  { "id": "bd_m35", "topic": "Bangladesh", "difficulty": "medium", "question": "Which Bangladeshi engineering university, located in Dhaka, was established specifically for military - affiliated engineering education?", "options": ["Armed Forces Medical College", "Bangladesh University of Professionals", "Defence Services Command and Staff College", "Military Institute of Science and Technology"], "answer": 3 },
  { "id": "bd_m36", "topic": "Bangladesh", "difficulty": "medium", "question": "What is the name of Bangladesh's premier public health research institute, globally known for its work on diarrhoeal diseases?", "options": ["Institute of Public Health", "Bangladesh Medical Research Council", "icddr,b", "National Institute of Preventive and Social Medicine"], "answer": 2 },
  { "id": "bd_m37", "topic": "Bangladesh", "difficulty": "medium", "question": "Who is the current Vice -Chancellor of CUET?", "options": ["Md. Rezaul Karim", "Rafiqul Alam", "Mahmud Abdul Matin Bhuiyan", "Abul Kalam Azad"], "answer": 2 },

  // ==========================================
  //  1. BANGLADESH — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "bd_mh1", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "What was the name of the 1970 provincial election in which the Awami League won a landslide, setting the stage for the Liberation War?", "options": ["1970 Pakistani general election", "1965 Pakistani election", "1973 Bangladesh election", "1954 East Bengal election"], "answer": 0 },
  { "id": "bd_mh2", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "How many of the 162 East Pakistan seats did the Awami League win in the 1970 general election?", "options": ["150", "160", "162", "140"], "answer": 1 },
  { "id": "bd_mh3", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "What was the name of Bangladesh's first Five -Year economic development plan, launched in 1973?", "options": ["Second Five -Year Plan", "Perspective Plan", "Two -Year Plan", "First Five -Year Plan"], "answer": 3 },
  { "id": "bd_mh4", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "What economic policy did Bangladesh's 1972 constitution establish for major industries?", "options": ["Industrial Charter", "Land Reform Act", "Privatization Act", "Nationalization policy"], "answer": 3 },
  { "id": "bd_mh5", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "In which year did Bangladesh join the United Nations?", "options": ["1971", "1972", "1974", "1975"], "answer": 2 },
  { "id": "bd_mh6", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "What was the name of the devastating famine that struck Bangladesh in 1974?", "options": ["Bhola famine", "1974 Bangladesh famine", "Great Bengal Famine", "Monga"], "answer": 1 },
  { "id": "bd_mh7", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "In which year did Pakistan formally recognize Bangladesh's independence?", "options": ["1971", "1976", "1974", "1972"], "answer": 2 },
  { "id": "bd_mh8", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "At which 1974 Islamic Summit, held in Lahore, did Pakistan formally recognize Bangladesh?", "options": ["SAARC Summit", "Non -Aligned Summit", "First OIC Summit", "Second OIC Summit"], "answer": 3 },
  { "id": "bd_mh9", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "Which 1975 constitutional amendment established a one -party presidential system known as BAKSAL?", "options": ["Twelfth Amendment", "Eighth Amendment", "Fourth Amendment", "Fifth Amendment"], "answer": 2 },
  { "id": "bd_mh10", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "What does \"BAKSAL,\" the single political party formed by Sheikh Mujib in 1975, stand for?", "options": ["Bangladesh Karmi Samity", "Bangladesh Krishak Sramik Awami League", "Bangladesh Krishi Sangathan League", "Bangladesh Kishor Sena League"], "answer": 1 },
  { "id": "bd_mh11", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "In which month and year was Sheikh Mujibur Rahman assassinated in a military coup?", "options": ["August 1975", "January 1976", "November 1975", "March 1975"], "answer": 0 },
  { "id": "bd_mh12", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "Who assumed the presidency immediately after Sheikh Mujib's assassination in August 1975?", "options": ["Ziaur Rahman", "Khondaker Mostaq Ahmad", "Abu Sadat Mohammad Sayem", "Hussain Muhammad Ershad"], "answer": 1 },
  { "id": "bd_mh13", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "Which general became President in 1977 after a series of coups and countercoups in late 1975?", "options": ["Khondaker Mostaq Ahmad", "Hussain Muhammad Ershad", "Ziaur Rahman", "Abu Sadat Mohammad Sayem"], "answer": 2 },
  { "id": "bd_mh14", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "What political party did Ziaur Rahman found in 1978?", "options": ["Awami League", "Jatiya Party", "Bangladesh Nationalist Party", "Jatiyatabadi Front"], "answer": 2 },
  { "id": "bd_mh15", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "In which year was Ziaur Rahman assassinated in Chittagong?", "options": ["1983", "1985", "1981", "1979"], "answer": 2 },
  { "id": "bd_mh16", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "Which general seized power in a bloodless coup in 1982, later ruling Bangladesh for nearly a decade?", "options": ["Abdus Sattar", "Hussain Muhammad Ershad", "Ziaur Rahman", "A.F.M. Ahsanuddin Chowdhury"], "answer": 1 },
  { "id": "bd_mh17", "topic": "Bangladesh", "difficulty": "medium-hard", "question": "What political party did Hussain Muhammad Ershad found in 1986?", "options": ["Freedom Party", "Awami League", "Jatiya Party", "Bangladesh Nationalist Party"], "answer": 2 },

  // ==========================================
  //  1. BANGLADESH — STEP 5: HARD
  // ==========================================
  { "id": "bd_h1", "topic": "Bangladesh", "difficulty": "hard", "question": "Who served as ceremonial President between Ziaur Rahman's 1981 assassination and Ershad's 1982 coup?", "options": ["Abdus Sattar", "A.F.M. Ahsanuddin Chowdhury", "Abu Sadat Mohammad Sayem", "Justice Shahabuddin Ahmed"], "answer": 0 },
  { "id": "bd_h2", "topic": "Bangladesh", "difficulty": "hard", "question": "What system, introduced via a 1996 constitutional amendment, oversaw Bangladeshi elections until it was scrapped in 2011?", "options": ["Transitional Authority", "National Unity Government", "Interim Advisory Council", "Non -Party Caretaker Government system"], "answer": 3 },
  { "id": "bd_h3", "topic": "Bangladesh", "difficulty": "hard", "question": "Which constitutional amendment abolished the caretaker government system in 2011?", "options": ["Fifteenth Amendment", "Thirteenth Amendment", "Sixteenth Amendment", "Fourteenth Amendment"], "answer": 0 },
  { "id": "bd_h4", "topic": "Bangladesh", "difficulty": "hard", "question": "Who was Bangladesh's first female Prime Minister, taking office in 1991?", "options": ["Raushan Ershad", "Sheikh Hasina", "Sajeda Chowdhury", "Khaleda Zia"], "answer": 3 },
  { "id": "bd_h5", "topic": "Bangladesh", "difficulty": "hard", "question": "In which year did Sheikh Hasina's Awami League first come to power after the fall of the Ershad regime?", "options": ["1996", "2009", "2001", "1991"], "answer": 0 },
  { "id": "bd_h6", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the informal name given to the 2007 -2008 emergency caretaker period led by Fakhruddin Ahmed?", "options": ["The National Emergency", "The Yunus Interregnum", "The Grand Alliance period", "The \"1/11\" period"], "answer": 3 },
  { "id": "bd_h7", "topic": "Bangladesh", "difficulty": "hard", "question": "Which Nobel laureate faced legal scrutiny during the 2007 -08 caretaker period, before later heading Bangladesh's 2024 interim government?", "options": ["Muhammad Yunus", "Amartya Sen", "Atiur Rahman", "Fazle Hasan Abed"], "answer": 0 },
  { "id": "bd_h8", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the name of Bangladesh's long -term perspective plan targeting developed -country status by 2041?", "options": ["Vision 2021", "Vision 2041", "Delta Plan 2100", "Digital Bangladesh"], "answer": 1 },
  { "id": "bd_h9", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the name of Bangladesh's long -term water and climate resilience strategy, launched in 2018, planning infrastructure through the year 2100?", "options": ["Vision 2041", "Bangladesh Delta Plan 2100", "National Adaptation Plan", "Padma Multipurpose Plan"], "answer": 1 },
  { "id": "bd_h10", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the name of the bridge over the Padma River, inaugurated in 2022, built with domestic funding after a corruption controversy led the World Bank to withdraw financing?", "options": ["Meghna Bridge", "Jamuna Bridge", "Padma Bridge", "Bangabandhu Bridge"], "answer": 2 },
  { "id": "bd_h11", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the name of Dhaka's metro rail system, launched in 2022 as the first of its kind in Bangladesh?", "options": ["Dhaka Elevated Expressway", "Chittagong Metro", "Bangladesh Railway", "Dhaka Metro Rail"], "answer": 3 },
  { "id": "bd_h12", "topic": "Bangladesh", "difficulty": "hard", "question": "Which nuclear power plant, Bangladesh's first, is being built with Russian assistance in Pabna district?", "options": ["Padma Power Station", "Rooppur Nuclear Power Plant", "Ruppur Atomic Station", "Ganges Nuclear Facility"], "answer": 1 },
  { "id": "bd_h13", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the name of the deep -sea port being developed in Bangladesh with Japanese assistance?", "options": ["Matarbari Deep Sea Port", "Payra Deep Sea Port", "Chittagong Deep Water Port", "Sonadia Port"], "answer": 0 },
  { "id": "bd_h14", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the name of Bangladesh's largest export -earning industry, accounting for over 80 percent of export revenue?", "options": ["Pharmaceutical industry", "Jute industry", "Leather industry", "Ready -made garments industry"], "answer": 3 },
  { "id": "bd_h15", "topic": "Bangladesh", "difficulty": "hard", "question": "What was the name of the 2013 factory building collapse in Savar that killed over 1,100 garment workers?", "options": ["Rana Plaza collapse", "Tazreen Fashions fire", "Spectrum factory collapse", "Ha -Meem Group fire"], "answer": 0 },
  { "id": "bd_h16", "topic": "Bangladesh", "difficulty": "hard", "question": "Which international agreement, signed after the Rana Plaza disaster, established fire and building safety standards for Bangladeshi garment factories?", "options": ["Bangladesh Accord on Fire and Building Safety", "Better Work Bangladesh", "Alliance for Bangladesh Worker Safety", "ILO Safety Framework"], "answer": 0 },
  { "id": "bd_h17", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the name of the government authority overseeing Bangladesh's push to build 100 special economic zones nationwide?", "options": ["Board of Investment", "National Industrial Council", "Bangladesh Economic Zones Authority", "Export Processing Zones Authority"], "answer": 2 },
  { "id": "bd_h18", "topic": "Bangladesh", "difficulty": "hard", "question": "Which constitutional amendment, passed in 1988, declared Islam as the state religion of Bangladesh?", "options": ["Fifth Amendment", "Eighth Amendment", "Fourth Amendment", "Fifteenth Amendment"], "answer": 1 },
  { "id": "bd_h19", "topic": "Bangladesh", "difficulty": "hard", "question": "The 1974 Bangladesh -India Land Boundary Agreement was finally ratified and implemented in which year, resolving a decades -old border dispute?", "options": ["2001", "2015", "2009", "2019"], "answer": 1 },
  { "id": "bd_h20", "topic": "Bangladesh", "difficulty": "hard", "question": "What term describes the more than 160 small pockets of land that existed within each other's territory along the Bangladesh -India border until their 2015 exchange?", "options": ["Upazila", "Chhitmahal", "Char land", "Haor"], "answer": 1 },
  { "id": "bd_h21", "topic": "Bangladesh", "difficulty": "hard", "question": "How many Indian enclaves inside Bangladesh were transferred to Bangladesh under the 2015 Land Boundary Agreement?", "options": ["111", "51", "162", "92"], "answer": 0 },
  { "id": "bd_h22", "topic": "Bangladesh", "difficulty": "hard", "question": "How many Bangladeshi enclaves inside India were transferred to India under the same 2015 agreement?", "options": ["51", "162", "111", "37"], "answer": 0 },
  { "id": "bd_h23", "topic": "Bangladesh", "difficulty": "hard", "question": "What mass protest movement erupted in February 2013 at Dhaka's Shahbag intersection, demanding capital punishment for war criminals?", "options": ["Shahbag movement", "Language Movement", "Mass Uprising of 1990", "July Uprising"], "answer": 0 },
  { "id": "bd_h24", "topic": "Bangladesh", "difficulty": "hard", "question": "Who became the first person executed following a verdict from Bangladesh's International Crimes Tribunal, in December 2013?", "options": ["Delwar Hossain Sayeedi", "Abdul Quader Molla", "Motiur Rahman Nizami", "Ghulam Azam"], "answer": 1 },
  { "id": "bd_h25", "topic": "Bangladesh", "difficulty": "hard", "question": "What day is observed in Bangladesh to commemorate intellectuals killed by Pakistani forces and local collaborators on December 14, 1971?", "options": ["Martyred Intellectuals Day", "Victory Day", "Independence Day", "Language Movement Day"], "answer": 0 },
  { "id": "bd_h26", "topic": "Bangladesh", "difficulty": "hard", "question": "Which Pakistani general, nicknamed the \"Butcher of Bengal,\" served as Governor of East Pakistan from March to August 1971 during the crackdown's early months?", "options": ["Yahya Khan", "A.A.K. Niazi", "Rao Farman Ali", "Tikka Khan"], "answer": 3 },
  { "id": "bd_h27", "topic": "Bangladesh", "difficulty": "hard", "question": "Who was the very last Governor of East Pakistan, holding the post for only two days in December 1971 just before the surrender?", "options": ["Syed Mohammad Ahsan", "Abdul Motaleb Malik", "A.A.K. Niazi", "Tikka Khan"], "answer": 2 },
  { "id": "bd_h28", "topic": "Bangladesh", "difficulty": "hard", "question": "What was the name of the 1973 legislation that provided the legal basis both for immediate post -war tribunals and, decades later, for the tribunals held from 2010 onward?", "options": ["Collaborators Order, 1972", "Bangladesh Citizenship Act", "Special Powers Act, 1974", "International Crimes Act, 1973"], "answer": 3 },
  { "id": "bd_h29", "topic": "Bangladesh", "difficulty": "hard", "question": "Which Vice Admiral served as Governor of East Pakistan until March 1971, resigning due to reluctance to support a military crackdown?", "options": ["Tikka Khan", "Syed Mohammad Ahsan", "Abdul Motaleb Malik", "A.A.K. Niazi"], "answer": 1 },
  { "id": "bd_h30", "topic": "Bangladesh", "difficulty": "hard", "question": "Which civilian Governor of East Pakistan, appointed in August 1971, was later imprisoned after independence and died in Dhaka Central Jail?", "options": ["Syed Mohammad Ahsan", "Abdul Motaleb Malik", "Tikka Khan", "A.A.K. Niazi"], "answer": 1 },
  { "id": "bd_h31", "topic": "Bangladesh", "difficulty": "hard", "question": "Which constitutional amendment, passed in 1979, retroactively legitimized changes made by military governments after 1975, including the removal of secularism as a state principle?", "options": ["Fifth Amendment", "Fourth Amendment", "Eighth Amendment", "Fifteenth Amendment"], "answer": 0 },
  { "id": "bd_h32", "topic": "Bangladesh", "difficulty": "hard", "question": "Bangladesh's Fifth Amendment, which retroactively validated military -era changes, was declared illegal by the Supreme Court in which year, restoring secularism?", "options": ["1996", "2015", "2010", "2001"], "answer": 2 },
  { "id": "bd_h33", "topic": "Bangladesh", "difficulty": "hard", "question": "What is the name of Bangladesh's National Martyrs' Memorial, built to honor those who died in the Liberation War, located in Savar?", "options": ["Central Shaheed Minar", "Swadhinata Stambha", "Shaheed Minar", "Jatiyo Smriti Soudho"], "answer": 3 },
  { "id": "bd_h34", "topic": "Bangladesh", "difficulty": "hard", "question": "Which act of Bangladesh's original 1972 penal framework specifically dealt with prosecuting local collaborators of the Pakistani army, distinct from the later International Crimes Tribunal?", "options": ["Collaborators Order, 1972", "Emergency Powers Ordinance", "Public Safety Act", "Special Powers Act, 1974"], "answer": 0 },

  // ==========================================
  //  2. BRITISH RULE IN INDIA — STEP 1: EASY
  // ==========================================
  { "id": "br_e1", "topic": "British Rule in India", "difficulty": "easy", "question": "Who was the Governor -General of India during the 1856 annexation of Awadh (Oudh), a key trigger for the 1857 rebellion?", "options": ["Lord Canning", "Warren Hastings", "Lord Curzon", "Lord Dalhousie"], "answer": 3 },
  { "id": "br_e2", "topic": "British Rule in India", "difficulty": "easy", "question": "Who was the Viceroy of India during the 1857 rebellion?", "options": ["Lord Lytton", "Lord Ripon", "Lord Dalhousie", "Lord Canning"], "answer": 3 },
  { "id": "br_e3", "topic": "British Rule in India", "difficulty": "easy", "question": "What immediate grievance, involving rifle cartridges, triggered Indian sepoys to rebel in 1857?", "options": ["Cartridges greased with animal fat", "A new salt tax", "An increase in land revenue", "Forced religious conversion"], "answer": 0 },
  { "id": "br_e4", "topic": "British Rule in India", "difficulty": "easy", "question": "Which queen of Jhansi became a legendary figure for leading resistance during the 1857 rebellion?", "options": ["Rani Lakshmibai", "Begum Hazrat Mahal", "Rani Chennamma", "Ahilyabai Holkar"], "answer": 0 },
  { "id": "br_e5", "topic": "British Rule in India", "difficulty": "easy", "question": "The 1883 \"Ilbert Bill\" controversy centered on what proposal?", "options": ["Raising the salt tax", "Introducing press censorship", "Allowing Indian judges to try British subjects", "Partitioning Bengal"], "answer": 2 },
  { "id": "br_e6", "topic": "British Rule in India", "difficulty": "easy", "question": "Who founded the Indian National Congress in 1885?", "options": ["Surendranath Banerjee", "Allan Octavian Hume", "Dadabhai Naoroji", "W.C. Bonnerjee"], "answer": 1 },
  { "id": "br_e7", "topic": "British Rule in India", "difficulty": "easy", "question": "Who was the first President of the Indian National Congress?", "options": ["W.C. Bonnerjee", "Dadabhai Naoroji", "Gopal Krishna Gokhale", "Allan Octavian Hume"], "answer": 0 },
  { "id": "br_e8", "topic": "British Rule in India", "difficulty": "easy", "question": "Which Indian nationalist is known for the declaration \"Swaraj is my birthright\"?", "options": ["Bal Gangadhar Tilak", "Bipin Chandra Pal", "Gopal Krishna Gokhale", "Lala Lajpat Rai"], "answer": 0 },
  { "id": "br_e9", "topic": "British Rule in India", "difficulty": "easy", "question": "The nickname \"Lal -Bal-Pal\" refers to which trio of early 20th -century nationalist leaders?", "options": ["Naoroji, Gokhale, and Banerjee", "Nehru, Gandhi, and Patel", "Bose, Azad, and Bhagat Singh", "Lajpat Rai, Tilak, and Pal"], "answer": 3 },
  { "id": "br_e10", "topic": "British Rule in India", "difficulty": "easy", "question": "Dadabhai Naoroji's \"drain of wealth\" theory argued what about British rule?", "options": ["British policies were draining India's wealth to Britain", "China was draining India's silver reserves", "Gold reserves were being depleted by hoarding", "Indian wealth was increasing under British rule"], "answer": 0 },
  { "id": "br_e11", "topic": "British Rule in India", "difficulty": "easy", "question": "Which 1909 Act introduced separate electorates for Muslims in India?", "options": ["Government of India Act 1919", "Indian Councils Act 1909", "Government of India Act 1935", "Rowlatt Act"], "answer": 1 },
  { "id": "br_e12", "topic": "British Rule in India", "difficulty": "easy", "question": "Who was executed in 1931 for revolutionary activities against British rule, becoming a martyr especially among Indian youth?", "options": ["Rajguru", "Udham Singh", "Bhagat Singh", "Chandrashekhar Azad"], "answer": 2 },
  { "id": "br_e13", "topic": "British Rule in India", "difficulty": "easy", "question": "What name is given to the 1930 -1932 series of London conferences on constitutional reform for India?", "options": ["Cabinet Mission", "Round Table Conferences", "Simon Commission", "Cripps Mission"], "answer": 1 },
  { "id": "br_e14", "topic": "British Rule in India", "difficulty": "easy", "question": "Which 1928 British commission on constitutional reform was boycotted for having no Indian members?", "options": ["Cripps Mission", "Hunter Commission", "Simon Commission", "Cabinet Mission"], "answer": 2 },
  { "id": "br_e15", "topic": "British Rule in India", "difficulty": "easy", "question": "What was the 1931 pact between Gandhi and Lord Irwin that led Gandhi to attend the Second Round Table Conference?", "options": ["Gandhi -Irwin Pact", "Lucknow Pact", "Poona Pact", "Delhi Pact"], "answer": 0 },
  { "id": "br_e16", "topic": "British Rule in India", "difficulty": "easy", "question": "The 1932 \"Poona Pact\" between Gandhi and B.R. Ambedkar provided for what?", "options": ["Hindu -Muslim electoral unity", "Terms for the partition of India", "Reserved seats for depressed classes within the general electorate", "Abolition of the salt tax"], "answer": 2 },
  { "id": "br_e17", "topic": "British Rule in India", "difficulty": "easy", "question": "Which 1942 British mission, led by Stafford Cripps, offered India dominion status after the war but was rejected by Indian leaders?", "options": ["Simon Commission", "Cripps Mission", "Cabinet Mission", "Wavell Plan"], "answer": 1 },
  { "id": "br_e18", "topic": "British Rule in India", "difficulty": "easy", "question": "Which British queen's 1877 Delhi Durbar formally proclaimed her Empress of India?", "options": ["Queen Mary", "Queen Victoria", "Queen Elizabeth II", "Queen Alexandra"], "answer": 1 },
  { "id": "br_e19", "topic": "British Rule in India", "difficulty": "easy", "question": "What was the name given to the grand ceremonial assemblies held in Delhi to mark major British royal occasions in India?", "options": ["Delhi Durbar", "Coronation Court", "Royal Proclamation", "Imperial Assembly"], "answer": 0 },
  { "id": "br_e20", "topic": "British Rule in India", "difficulty": "easy", "question": "Which Indian city served as the capital of British India until 1911, when it moved to Delhi?", "options": ["Bombay", "Calcutta", "Madras", "Lahore"], "answer": 1 },
  { "id": "br_e21", "topic": "British Rule in India", "difficulty": "easy", "question": "In which year did the British shift India's capital from Calcutta to Delhi?", "options": ["1919", "1905", "1911", "1901"], "answer": 2 },
  { "id": "br_e22", "topic": "British Rule in India", "difficulty": "easy", "question": "Which British Viceroy oversaw the 1911 transfer of India's capital from Calcutta to Delhi?", "options": ["Lord Minto", "Lord Hardinge", "Lord Curzon", "Lord Chelmsford"], "answer": 1 },
  { "id": "br_e23", "topic": "British Rule in India", "difficulty": "easy", "question": "What was the name of the elite administrative service through which the British governed India, whose members were nicknamed \"civilians\"?", "options": ["Indian Civil Service", "Royal Indian Service", "Colonial Administrative Corps", "Imperial Bureaucracy"], "answer": 0 },
  { "id": "br_e24", "topic": "British Rule in India", "difficulty": "easy", "question": "Which Indian city hosted the 1911 Delhi Durbar, announcing the capital's move in the presence of King George V?", "options": ["Lahore", "Delhi", "Lucknow", "Agra"], "answer": 1 },
  { "id": "br_e25", "topic": "British Rule in India", "difficulty": "easy", "question": "What was the name of the famous British -built railway terminus in Bombay, an iconic example of Victorian Gothic architecture?", "options": ["Howrah Station", "Egmore Station", "Churchgate Station", "Victoria Terminus"], "answer": 3 },
  { "id": "br_e26", "topic": "British Rule in India", "difficulty": "easy", "question": "The British -founded city now known as Chennai was originally established around which fort?", "options": ["Fort Cochin", "Fort William", "Fort St. David", "Fort St. George"], "answer": 3 },
  { "id": "br_e27", "topic": "British Rule in India", "difficulty": "easy", "question": "What is the name of the British colonial -era fort in Calcutta, rebuilt after the 1756 fall of the earlier fort?", "options": ["Fort St. David", "Fort William", "Red Fort", "Fort St. George"], "answer": 1 },
  { "id": "br_e28", "topic": "British Rule in India", "difficulty": "easy", "question": "What is the name of India's oldest and most prestigious English -medium college, founded by the British in Calcutta in 1817?", "options": ["Madras Christian College", "Elphinstone College", "St. Stephen's College", "Presidency College"], "answer": 3 },
  { "id": "br_e29", "topic": "British Rule in India", "difficulty": "easy", "question": "What term describes the extensive irrigation canal networks the British built in Punjab in the late 19th century, transforming the region agriculturally?", "options": ["Water settlements", "Delta projects", "Canal colonies", "Irrigation trusts"], "answer": 2 },
  { "id": "br_e30", "topic": "British Rule in India", "difficulty": "easy", "question": "What was the name of the first university established by the British in India, founded in Calcutta in 1857?", "options": ["University of Calcutta", "University of the Punjab", "University of Bombay", "University of Madras"], "answer": 0 },
  { "id": "br_e31", "topic": "British Rule in India", "difficulty": "easy", "question": "Along with Calcutta, which two other universities were established by the British in 1857, forming India's first three modern universities?", "options": ["University of Bombay and University of Madras", "University of Punjab and University of Agra", "University of Delhi and University of Lahore", "University of Allahabad and University of Lucknow"], "answer": 0 },
  { "id": "br_e32", "topic": "British Rule in India", "difficulty": "easy", "question": "What was the name of the official British colonial legislature established in India under the 1861 Indian Councils Act?", "options": ["Provincial Assembly", "Governor's Council", "Viceroy's Executive Council", "Imperial Legislative Council"], "answer": 3 },
  { "id": "br_e33", "topic": "British Rule in India", "difficulty": "easy", "question": "What is the name of the famous British -built hill station in the Himalayas that served as the summer capital of British India?", "options": ["Mussoorie", "Nainital", "Darjeeling", "Shimla"], "answer": 3 },
  { "id": "br_e34", "topic": "British Rule in India", "difficulty": "easy", "question": "Which British -founded hill station in South India's Nilgiri Hills became a popular colonial retreat?", "options": ["Kodaikanal", "Coonoor", "Munnar", "Ooty"], "answer": 3 },
  { "id": "br_e35", "topic": "British Rule in India", "difficulty": "easy", "question": "What was the name of British India's official gazette recording government notifications and orders?", "options": ["The Times of India", "The Statesman", "The Imperial Register", "The Gazette of India"], "answer": 3 },
  { "id": "br_e36", "topic": "British Rule in India", "difficulty": "easy", "question": "Which British engineer designed the Ganges Canal, completed in 1854, one of the largest irrigation projects of its time?", "options": ["Arthur Cotton", "Thomas Telford", "John Rennie", "Proby Cautley"], "answer": 3 },
  { "id": "br_e37", "topic": "British Rule in India", "difficulty": "easy", "question": "What was the name of the pre -decimal currency subunit in British India, of which 16 made up one rupee?", "options": ["Pice", "Dam", "Anna", "Paisa"], "answer": 2 },

  // ==========================================
  //  2. BRITISH RULE IN INDIA — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "br_em1", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What is the name of the 1770 famine in Bengal under East India Company rule that killed an estimated one-third of the region's population?", "options": ["Bengal famine of 1943", "Orissa famine", "Great Bengal Famine", "Bengal famine of 1770"], "answer": 3 },
  { "id": "br_em2", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which 1773 Act established British parliamentary oversight of the East India Company and created the office of Governor -General?", "options": ["Regulating Act of 1773", "Pitt's India Act", "Charter Act of 1813", "Charter Act of 1833"], "answer": 0 },
  { "id": "br_em3", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which 1784 Act established a Board of Control to oversee the East India Company's political affairs?", "options": ["Regulating Act", "Government of India Act", "Pitt's India Act", "Charter Act of 1813"], "answer": 2 },
  { "id": "br_em4", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "The \"Permanent Settlement\" of 1793, introduced by Lord Cornwallis in Bengal, did what?", "options": ["Established a state salt monopoly", "Fixed land revenue permanently and created a zamindar landlord class", "Imposed new trade tariffs", "Granted temporary tax exemptions to farmers"], "answer": 1 },
  { "id": "br_em5", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which Charter Act ended the East India Company's monopoly on trade with India?", "options": ["Government of India Act 1858", "Regulating Act", "Charter Act of 1833", "Charter Act of 1813"], "answer": 3 },
  { "id": "br_em6", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which 1833 Charter Act ended the Company's remaining commercial functions, making it a purely administrative body?", "options": ["Charter Act of 1813", "Charter Act of 1833", "Pitt's India Act", "Regulating Act"], "answer": 1 },
  { "id": "br_em7", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Who introduced English as the medium of higher education in India through an influential 1835 minute?", "options": ["William Bentinck", "James Mill", "Charles Wood", "Thomas Babington Macaulay"], "answer": 3 },
  { "id": "br_em8", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which Governor -General banned the practice of Sati (widow immolation) in 1829?", "options": ["Lord Wellesley", "Lord Dalhousie", "Lord Cornwallis", "Lord William Bentinck"], "answer": 3 },
  { "id": "br_em9", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "The \"Subsidiary Alliance\" system, introduced by Lord Wellesley, worked on what basis?", "options": ["Indian states were directly annexed without exception", "Indian princes gained monopoly trade rights", "Indian rulers shared tax revenue equally with the British", "Indian rulers accepted British troops and control of foreign affairs in exchange for protection"], "answer": 3 },
  { "id": "br_em10", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which 1858 royal proclamation formally transferred India's governance from the East India Company to the Crown?", "options": ["Queen's Proclamation of 1858", "Government of India Act 1858", "Indian Councils Act", "Royal Titles Act 1876"], "answer": 0 },
  { "id": "br_em11", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which 1876 Act granted Queen Victoria the title \"Empress of India\"?", "options": ["Queen's Proclamation", "Government of India Act 1858", "Royal Titles Act 1876", "Indian Councils Act 1861"], "answer": 2 },
  { "id": "br_em12", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "The \"Vernacular Press Act\" of 1878 was designed to do what?", "options": ["Establish a state press agency", "Fund Indian -owned newspapers", "Promote regional Indian languages in schools", "Restrict and censor Indian -language newspapers critical of British policy"], "answer": 3 },
  { "id": "br_em13", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which nationalist economist wrote \"Poverty and Un -British Rule in India,\" a landmark critique of colonial economic policy?", "options": ["Bal Gangadhar Tilak", "M.G. Ranade", "R.C. Dutt", "Dadabhai Naoroji"], "answer": 3 },
  { "id": "br_em14", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "The 1916 \"Lucknow Pact\" between the Indian National Congress and the Muslim League addressed what?", "options": ["The partition of Bengal", "Hindu -Muslim unity and joint constitutional reform demands", "Terms for the salt tax", "Conditions for the Quit India Movement"], "answer": 1 },
  { "id": "br_em15", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "The 1943 Bengal famine, occurring under British rule during World War II, is estimated to have killed how many people?", "options": ["500,000 -700,000", "200,000 -300,000", "2-3 million", "5-6 million"], "answer": 2 },
  { "id": "br_em16", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which British Prime Minister has been widely criticized by historians for wartime policies that worsened the 1943 Bengal famine?", "options": ["Winston Churchill", "Clement Attlee", "Neville Chamberlain", "Stanley Baldwin"], "answer": 0 },
  { "id": "br_em17", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the name of the 1946 uprising by Indian sailors against British officers, seen as accelerating Britain's decision to leave India?", "options": ["Quit India Uprising", "Royal Indian Navy Mutiny", "Sepoy Mutiny", "Chittagong Armoury Raid"], "answer": 1 },
  { "id": "br_em18", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which British Governor -General is credited with introducing the first postage stamps in India, in 1854?", "options": ["Lord Ripon", "Lord Curzon", "Lord Canning", "Lord Dalhousie"], "answer": 3 },
  { "id": "br_em19", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "In which year was India's first official postage stamp issued, featuring a young Queen Victoria?", "options": ["1854", "1877", "1911", "1840"], "answer": 0 },
  { "id": "br_em20", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the name of the earliest known Indian postage stamp, used regionally in Sindh from 1852, predating the official India -wide stamp?", "options": ["Presidency Stamp", "Bengal Post", "Scinde Dawk", "Company Mail"], "answer": 2 },
  { "id": "br_em21", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "In which year were the Calcutta, Bombay, and Madras High Courts established, unifying earlier Supreme Courts and Sadar Adalats?", "options": ["1833", "1857", "1862", "1877"], "answer": 2 },
  { "id": "br_em22", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What were the earlier British -era courts in Bengal, Bombay, and Madras called before their 1862 merger into High Courts?", "options": ["Supreme Courts and Sadar Adalats", "District Tribunals", "Company Courts", "Crown Courts and Circuit Benches"], "answer": 0 },
  { "id": "br_em23", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the informal term for Indian soldiers who served in the British Indian Army?", "options": ["Sepoys", "Askaris", "Jawans", "Rajputs"], "answer": 0 },
  { "id": "br_em24", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "In which year were Indians first commissioned as King's Commissioned Officers in the British Indian Army, a significant reform?", "options": ["1900", "1947", "1935", "1917"], "answer": 3 },
  { "id": "br_em25", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the name of the elite military academy the British established in Dehradun in 1932 to train Indian army officers?", "options": ["Officers Training School", "National Defence Academy", "Sandhurst India", "Indian Military Academy"], "answer": 3 },
  { "id": "br_em26", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the name of India's first modern engineering college, established by the British in Roorkee in 1847?", "options": ["Bengal Engineering College", "Thomason College of Civil Engineering", "Poona Engineering College", "Madras School of Engineering"], "answer": 1 },
  { "id": "br_em27", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What is the modern name of the Thomason College of Civil Engineering, established in 1847, now one of India's premier technical institutes?", "options": ["Indian Institute of Technology Roorkee", "Indian Institute of Technology Delhi", "Indian Institute of Science", "National Institute of Technology"], "answer": 0 },
  { "id": "br_em28", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the name of the earliest engineering college established in colonial Bengal, founded in 1856?", "options": ["Presidency Engineering College", "Calcutta Technical School", "Bengal Engineering College", "Howrah College"], "answer": 2 },
  { "id": "br_em29", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which British official founded the Geological Survey of India in 1851?", "options": ["James Prinsep", "Thomas Oldfield", "Thomas Oldham", "William Jones"], "answer": 2 },
  { "id": "br_em30", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the name of the British -established forestry research institute in Dehradun, founded in 1906?", "options": ["Forest Research Institute", "Wildlife Institute of India", "Botanical Survey Institute", "Indian Forest College"], "answer": 0 },
  { "id": "br_em31", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Which British botanist established the Royal Botanic Garden in Calcutta's Sibpur area in 1787?", "options": ["Robert Kyd", "Joseph Hooker", "William Roxburgh", "Nathaniel Wallich"], "answer": 0 },
  { "id": "br_em32", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the name of the first English -language newspaper published in India, founded in Calcutta in 1780?", "options": ["Hicky's Bengal Gazette", "The Calcutta Chronicle", "The Bengal Journal", "The India Gazette"], "answer": 0 },
  { "id": "br_em33", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Who founded India's first newspaper, Hicky's Bengal Gazette, in 1780?", "options": ["James Augustus Hicky", "Warren Hastings", "Charles Metcalfe", "William Jones"], "answer": 0 },
  { "id": "br_em34", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What was the name of the British -era system that sent indentured Indian laborers to colonies like Fiji, Mauritius, and the Caribbean?", "options": ["Girmitiya system", "Indenture Charter", "Coolie Trade Act", "Colonial Labour Scheme"], "answer": 0 },
  { "id": "br_em35", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "What term was used for Indian indentured laborers who worked on British colonial plantations overseas?", "options": ["Kisans", "Zamindars", "Girmitiyas", "Ryots"], "answer": 2 },
  { "id": "br_em36", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "In which year did the first Indian, Satyendranath Tagore, pass the Indian Civil Service examination?", "options": ["1853", "1900", "1863", "1875"], "answer": 2 },
  { "id": "br_em37", "topic": "British Rule in India", "difficulty": "easy-medium", "question": "Who was the first Indian to qualify for the Indian Civil Service through competitive examination, in 1863?", "options": ["Romesh Chunder Dutt", "Ras Behari Ghosh", "Satyendranath Tagore", "Surendranath Banerjee"], "answer": 2 },

  // ==========================================
  //  2. BRITISH RULE IN INDIA — STEP 3: MEDIUM
  // ==========================================
  { "id": "br_m1", "topic": "British Rule in India", "difficulty": "medium", "question": "Which of the three villages that merged under East India Company control to form Calcutta was the site of Job Charnock's original 1690 settlement?", "options": ["Sutanuti", "Chandannagar", "Hooghly", "Serampore"], "answer": 0 },
  { "id": "br_m2", "topic": "British Rule in India", "difficulty": "medium", "question": "Who was the Nawab of Bengal defeated by Robert Clive at the Battle of Plassey in 1757?", "options": ["Mir Qasim", "Mir Jafar", "Alivardi Khan", "Siraj -ud-Daulah"], "answer": 3 },
  { "id": "br_m3", "topic": "British Rule in India", "difficulty": "medium", "question": "Which commander -in-chief of Siraj -ud-Daulah's army betrayed him at Plassey and was later installed as Nawab by the British?", "options": ["Shuja -ud-Daula", "Mir Jafar", "Najm -ud-Daula", "Mir Qasim"], "answer": 1 },
  { "id": "br_m4", "topic": "British Rule in India", "difficulty": "medium", "question": "The \"Diwani\" right, granted to the East India Company in 1765 after the Battle of Buxar, gave the Company what power?", "options": ["The right to mint imperial currency", "The right to appoint Mughal judges", "The right to collect revenue from Bengal, Bihar, and Odisha", "The right to raise a Mughal army"], "answer": 2 },
  { "id": "br_m5", "topic": "British Rule in India", "difficulty": "medium", "question": "Which Mughal emperor granted the East India Company Diwani rights in 1765 via the Treaty of Allahabad?", "options": ["Bahadur Shah Zafar", "Farrukhsiyar", "Shah Alam II", "Aurangzeb"], "answer": 2 },
  { "id": "br_m6", "topic": "British Rule in India", "difficulty": "medium", "question": "The \"dual government\" system in Bengal from 1765 -1772 involved which arrangement?", "options": ["Joint rule between the British and Mughal courts", "The Company held revenue rights while the Nawab retained nominal civil administration", "Shared administration between two Company officials", "Divided rule between the Bengal and Bihar Nawabs"], "answer": 1 },
  { "id": "br_m7", "topic": "British Rule in India", "difficulty": "medium", "question": "Who was the first Governor -General of Bengal, a position preceding the unified Governor -General of India?", "options": ["Robert Clive", "Lord Cornwallis", "Warren Hastings", "John Shore"], "answer": 2 },
  { "id": "br_m8", "topic": "British Rule in India", "difficulty": "medium", "question": "Who led the parliamentary prosecution in the 1788 -1795 impeachment trial of Warren Hastings, delivering famous speeches against him?", "options": ["Edmund Burke", "Richard Sheridan", "William Pitt", "Charles James Fox"], "answer": 0 },
  { "id": "br_m9", "topic": "British Rule in India", "difficulty": "medium", "question": "Which ruler of Mysore, known as the \"Tiger of Mysore,\" died fighting the British at the Battle of Seringapatam in 1799?", "options": ["Nizam of Hyderabad", "Tipu Sultan", "Hyder Ali", "Peshwa Baji Rao II"], "answer": 1 },
  { "id": "br_m10", "topic": "British Rule in India", "difficulty": "medium", "question": "The 1761 Third Battle of Panipat, which weakened a major Indian power ahead of British expansion, ended in defeat for which force?", "options": ["The Sikhs, defeated by the Marathas", "The Mughals, defeated by the British", "The British, defeated by the Marathas", "The Marathas, defeated by Ahmad Shah Abdali's Afghan forces"], "answer": 3 },
  { "id": "br_m11", "topic": "British Rule in India", "difficulty": "medium", "question": "What is the collective name for the series of three wars fought between the British and the Maratha Confederacy from 1775 to 1818?", "options": ["Anglo -Sikh Wars", "Anglo -Mysore Wars", "Anglo -Afghan Wars", "Anglo -Maratha Wars"], "answer": 3 },
  { "id": "br_m12", "topic": "British Rule in India", "difficulty": "medium", "question": "The First and Second Anglo -Sikh Wars (1845 -46 and 1848 -49) resulted in British annexation of which region?", "options": ["Sindh", "Kashmir", "Punjab", "Rajputana"], "answer": 2 },
  { "id": "br_m13", "topic": "British Rule in India", "difficulty": "medium", "question": "Who was the last Maharaja of the Sikh Empire, forced to cede the Koh -i-Noor diamond to the British after Punjab's 1849 annexation?", "options": ["Sher Singh", "Kharak Singh", "Duleep Singh", "Ranjit Singh"], "answer": 2 },
  { "id": "br_m14", "topic": "British Rule in India", "difficulty": "medium", "question": "Which princely state was annexed by Lord Dalhousie in 1856 on grounds of \"misgovernance\" rather than under the Doctrine of Lapse, becoming a major grievance behind the 1857 rebellion?", "options": ["Jhansi", "Satara", "Nagpur", "Awadh"], "answer": 3 },
  { "id": "br_m15", "topic": "British Rule in India", "difficulty": "medium", "question": "Whose 1897 assassination by the Chapekar brothers, during a plague -control crackdown in Pune, was one of the earliest acts of revolutionary nationalism in India?", "options": ["Michael O'Dwyer", "W.C. Rand", "Curzon Wyllie", "Robert Ashe"], "answer": 1 },
  { "id": "br_m16", "topic": "British Rule in India", "difficulty": "medium", "question": "Who assassinated Sir Michael O'Dwyer in London in 1940, in revenge for his role in the Jallianwala Bagh massacre?", "options": ["Udham Singh", "Chandrashekhar Azad", "Bhagat Singh", "Madan Lal Dhingra"], "answer": 0 },
  { "id": "br_m17", "topic": "British Rule in India", "difficulty": "medium", "question": "The 1930 Chittagong Armoury Raid, a major armed action against British rule in a city now in Bangladesh, was led by which revolutionary?", "options": ["Surya Sen", "Bagha Jatin", "Rash Behari Bose", "Khudiram Bose"], "answer": 0 },
  { "id": "br_m18", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of the 1929 declaration by the Indian National Congress, at its Lahore session, demanding complete independence rather than dominion status?", "options": ["Quit India declaration", "Purna Swaraj declaration", "Swadeshi declaration", "Non -Cooperation declaration"], "answer": 1 },
  { "id": "br_m19", "topic": "British Rule in India", "difficulty": "medium", "question": "On which date did the Indian National Congress first observe an unofficial \"Independence Day\" in 1930, years before actual independence?", "options": ["August 15", "March 26", "December 16", "January 26"], "answer": 3 },
  { "id": "br_m20", "topic": "British Rule in India", "difficulty": "medium", "question": "Which December 1929 Congress session is associated with the Purna Swaraj resolution and Jawaharlal Nehru's hoisting of the Indian tricolor?", "options": ["Lucknow Session", "Lahore Session", "Nagpur Session", "Karachi Session"], "answer": 1 },
  { "id": "br_m21", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of the 1930 report authored by the Simon Commission, recommending further constitutional reforms despite its boycott?", "options": ["Cabinet Mission Report", "Cripps Report", "Simon Commission Report", "Montagu -Chelmsford Report"], "answer": 2 },
  { "id": "br_m22", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of the 1932 award, issued by British PM Ramsay MacDonald, that granted separate electorates to depressed classes and prompted Gandhi's fast?", "options": ["Poona Award", "Lucknow Award", "Round Table Award", "Communal Award"], "answer": 3 },
  { "id": "br_m23", "topic": "British Rule in India", "difficulty": "medium", "question": "Which British Prime Minister issued the controversial 1932 Communal Award?", "options": ["Ramsay MacDonald", "Winston Churchill", "Stanley Baldwin", "Neville Chamberlain"], "answer": 0 },
  { "id": "br_m24", "topic": "British Rule in India", "difficulty": "medium", "question": "What term, meaning \"children of God,\" did Gandhi popularize to refer to India's \"untouchable\" castes?", "options": ["Dalit", "Shudra", "Harijan", "Adivasi"], "answer": 2 },
  { "id": "br_m25", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of the 1937 elections held under the Government of India Act 1935, the first significant elections with a wider Indian franchise?", "options": ["1937 Indian provincial elections", "1935 Constituent Assembly elections", "1919 Council elections", "1946 Legislative Assembly elections"], "answer": 0 },
  { "id": "br_m26", "topic": "British Rule in India", "difficulty": "medium", "question": "Which party won the majority of provinces in the 1937 Indian provincial elections?", "options": ["Muslim League", "Justice Party", "Indian National Congress", "Unionist Party"], "answer": 2 },
  { "id": "br_m27", "topic": "British Rule in India", "difficulty": "medium", "question": "What is the name given to the 1939 event in which Congress ministries resigned from provincial governments in protest of India being declared at war without consultation?", "options": ["Quit India walkout", "Congress resignation of 1939", "Provincial boycott of 1939", "Non -Cooperation withdrawal"], "answer": 1 },
  { "id": "br_m28", "topic": "British Rule in India", "difficulty": "medium", "question": "Which British Viceroy declared India at war with Germany in 1939 without consulting Indian political leaders, sparking major protest?", "options": ["Lord Wavell", "Lord Willingdon", "Lord Linlithgow", "Lord Mountbatten"], "answer": 2 },
  { "id": "br_m29", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of the 1940 Muslim League resolution, passed in Lahore, that first formally demanded a separate Muslim homeland?", "options": ["Delhi Resolution", "Lahore Resolution", "Karachi Resolution", "Simla Resolution"], "answer": 1 },
  { "id": "br_m30", "topic": "British Rule in India", "difficulty": "medium", "question": "Who presided over the Muslim League's 1940 Lahore session where the Pakistan Resolution was passed?", "options": ["Liaquat Ali Khan", "Fazlul Huq", "Chaudhry Rahmat Ali", "Muhammad Ali Jinnah"], "answer": 3 },
  { "id": "br_m31", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of the August 1946 call by the Muslim League that led to widespread communal violence, especially in Calcutta?", "options": ["Direct Action Day", "Quit India Day", "Solidarity Day", "Deliverance Day"], "answer": 0 },
  { "id": "br_m32", "topic": "British Rule in India", "difficulty": "medium", "question": "The August 1946 Direct Action Day violence claimed the most lives in which city, becoming known by a specific name for the killings?", "options": ["Delhi", "Lahore", "Calcutta", "Bombay"], "answer": 2 },
  { "id": "br_m33", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of the plan, announced by Lord Mountbatten in June 1947, that laid out the timeline and method for partitioning British India?", "options": ["Mountbatten Plan", "Cripps Plan", "Wavell Plan", "Cabinet Mission Plan"], "answer": 0 },
  { "id": "br_m34", "topic": "British Rule in India", "difficulty": "medium", "question": "Who chaired the boundary commission that drew the borders between India and Pakistan during the 1947 partition?", "options": ["Cyril Radcliffe", "Stafford Cripps", "Pethick -Lawrence", "Louis Mountbatten"], "answer": 0 },
  { "id": "br_m35", "topic": "British Rule in India", "difficulty": "medium", "question": "What is the name given to the border line, drawn by Cyril Radcliffe, that separated India and Pakistan in 1947?", "options": ["McMahon Line", "Durand Line", "Radcliffe Line", "Curzon Line"], "answer": 2 },
  { "id": "br_m36", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of the legislation passed by the British Parliament in July 1947 that formally granted independence to India and Pakistan?", "options": ["Indian Independence Act, 1947", "Government of India Act, 1947", "Dominion Status Act", "Partition of India Act"], "answer": 0 },
  { "id": "br_m37", "topic": "British Rule in India", "difficulty": "medium", "question": "What was the name of Gandhi's fast -based campaign against separate electorates for depressed classes, which led to the 1932 Poona Pact?", "options": ["Harijan fast", "Epic fast", "Fast unto death", "Satyagraha of Yerwada"], "answer": 2 },

  // ==========================================
  //  2. BRITISH RULE IN INDIA — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "br_mh1", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "Who was the first English ambassador sent to the Mughal court, arriving in 1615 to secure trading rights for the East India Company?", "options": ["Warren Hastings", "Sir Thomas Roe", "Robert Clive", "Sir Josiah Child"], "answer": 1 },
  { "id": "br_mh2", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "Which Mughal emperor granted Sir Thomas Roe's East India Company trading rights during his 1615 -1618 embassy?", "options": ["Akbar", "Jahangir", "Aurangzeb", "Shah Jahan"], "answer": 1 },
  { "id": "br_mh3", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "What was the name of the first English factory (trading post) established in India, at Surat, in 1613?", "options": ["Surat Factory", "Fort William", "Bombay Factory", "Fort St. George"], "answer": 0 },
  { "id": "br_mh4", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "Which 1612 naval battle allowed the English to gain standing with Mughal authorities at Surat, by defeating Portuguese naval forces?", "options": ["Battle of Bombay", "Battle of Diu", "Battle of Swally", "Battle of Colachel"], "answer": 2 },
  { "id": "br_mh5", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "What is the informal name for the 1686 -1690 war between the English East India Company and the Mughal Empire, which ended in a humiliating English defeat?", "options": ["Anglo -Maratha War", "Carnatic War", "Child's War", "Rohilla War"], "answer": 2 },
  { "id": "br_mh6", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "Who led the East India Company's disastrous military campaign against Aurangzeb's Mughal Empire in the 1680s, giving the conflict its name?", "options": ["Sir Josiah Child", "Gerald Aungier", "Sir Thomas Roe", "Job Charnock"], "answer": 0 },
  { "id": "br_mh7", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "What was the name of the 1717 Mughal decree issued by Emperor Farrukhsiyar, granting the East India Company duty -free trading rights in Bengal?", "options": ["Akbar's Firman", "Farrukhsiyar's Farman", "Diwani Grant", "Treaty of Allahabad"], "answer": 1 },
  { "id": "br_mh8", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "Which French East India Company Governor -General, a key rival to British ambitions in India, was recalled to France in 1754 after the Carnatic Wars?", "options": ["Joseph Francois Dupleix", "Robert Clive", "La Bourdonnais", "Comte de Lally"], "answer": 0 },
  { "id": "br_mh9", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "The three Carnatic Wars (1746 -1763) were fought primarily between which two European trading powers and their local allies?", "options": ["British and French East India Companies", "British and Dutch", "British and Portuguese", "French and Portuguese"], "answer": 0 },
  { "id": "br_mh10", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "Who commanded British forces at the decisive 1760 Battle of Wandiwash, which effectively ended French ambitions in India?", "options": ["Warren Hastings", "Lord Cornwallis", "Robert Clive", "Sir Eyre Coote"], "answer": 3 },
  { "id": "br_mh11", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "Which British Governor -General introduced railways to India, with the first line opening between Bombay and Thane in 1853?", "options": ["Lord Dalhousie", "Lord Bentinck", "Lord Canning", "Lord Curzon"], "answer": 0 },
  { "id": "br_mh12", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "What was the name of the company that operated India's first railway line, opened in 1853 between Bombay and Thane?", "options": ["Madras Railway", "Bengal Nagpur Railway", "East Indian Railway", "Great Indian Peninsula Railway"], "answer": 3 },
  { "id": "br_mh13", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "In which year was a direct submarine telegraph cable connection first established between Britain and India?", "options": ["1890", "1870", "1850", "1910"], "answer": 1 },
  { "id": "br_mh14", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "What was the name of the 19th -century mapping project, involving figures like George Everest, that surveyed and triangulated the Indian subcontinent?", "options": ["Great Trigonometrical Survey of India", "Imperial Gazetteer Survey", "Revenue Survey Project", "Cadastral Survey of India"], "answer": 0 },
  { "id": "br_mh15", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "Mount Everest is named after which British Surveyor General of India?", "options": ["George Everest", "James Rennell", "William Lambton", "Andrew Waugh"], "answer": 0 },
  { "id": "br_mh16", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "What 1878 act restricted Indians' right to own firearms, while largely exempting Europeans living in India?", "options": ["Ilbert Bill", "Vernacular Press Act", "Rowlatt Act", "Indian Arms Act"], "answer": 3 },
  { "id": "br_mh17", "topic": "British Rule in India", "difficulty": "medium-hard", "question": "What was the name of the influential network of Indian merchant -bankers, most notably one prominent family, who financed and helped facilitate the East India Company's rise to power in Bengal?", "options": ["Jagat Seth banking house", "Birla banking network", "Marwari trading guild", "Tata family enterprise"], "answer": 0 },

  // ==========================================
  //  2. BRITISH RULE IN INDIA — STEP 5: HARD
  // ==========================================
  { "id": "br_h1", "topic": "British Rule in India", "difficulty": "hard", "question": "Who was the Nawab of Bengal, briefly restored after Plassey, who later revolted and lost to the British at the Battle of Buxar in 1764?", "options": ["Mir Jafar", "Siraj -ud-Daulah", "Mir Qasim", "Shuja -ud-Daula"], "answer": 2 },
  { "id": "br_h2", "topic": "British Rule in India", "difficulty": "hard", "question": "What East India Company trading privilege, extensively abused by company servants for private profit, was a key grievance behind Mir Qasim's revolt?", "options": ["Subsidiary alliance terms", "Dastak", "Zamindari rights", "Diwani rights"], "answer": 1 },
  { "id": "br_h3", "topic": "British Rule in India", "difficulty": "hard", "question": "What was the name of the 1763 massacre of British prisoners at Patna, ordered by Mir Qasim during his conflict with the East India Company?", "options": ["Black Hole tragedy", "Patna Massacre", "Amritsar Massacre", "Cawnpore Massacre"], "answer": 1 },
  { "id": "br_h4", "topic": "British Rule in India", "difficulty": "hard", "question": "Whose posthumously published diary and letters provide key historical accounts of the 1756 Black Hole of Calcutta incident?", "options": ["Robert Clive", "Warren Hastings", "John Zephaniah Holwell", "Job Charnock"], "answer": 2 },
  { "id": "br_h5", "topic": "British Rule in India", "difficulty": "hard", "question": "What incident in 1756, in which British prisoners were allegedly confined overnight in a small Fort William cell, was later used to justify British reprisals against Bengal?", "options": ["Vellore Mutiny", "Cawnpore Massacre", "Patna Massacre", "Black Hole of Calcutta"], "answer": 3 },
  { "id": "br_h6", "topic": "British Rule in India", "difficulty": "hard", "question": "Which Nawab of Bengal was responsible for capturing Calcutta and the associated 1756 Black Hole incident?", "options": ["Siraj -ud-Daulah", "Mir Qasim", "Alivardi Khan", "Mir Jafar"], "answer": 0 },
  { "id": "br_h7", "topic": "British Rule in India", "difficulty": "hard", "question": "What term describes the 1770s -80s British parliamentary committees that investigated East India Company misrule, providing evidence later used in Warren Hastings's impeachment?", "options": ["Select Committees of the House of Commons", "Court of Directors tribunal", "Board of Control hearings", "Privy Council inquiry"], "answer": 0 },
  { "id": "br_h8", "topic": "British Rule in India", "difficulty": "hard", "question": "The 1774 conquest of which northern Indian kingdom, carried out by the East India Company allied with Awadh, became a key impeachment charge against Warren Hastings?", "options": ["Hyderabad", "Mysore", "Rohilkhand", "Jhansi"], "answer": 2 },
  { "id": "br_h9", "topic": "British Rule in India", "difficulty": "hard", "question": "Which Indian ruler, the Raja of Benares, was subjected to a controversial punitive fine by Warren Hastings in 1781, later cited as a key impeachment charge?", "options": ["Asaf -ud-Daula", "Chait Singh", "Balwant Singh", "Shuja -ud-Daula"], "answer": 1 },
  { "id": "br_h10", "topic": "British Rule in India", "difficulty": "hard", "question": "What term describes the East India Company's private military forces, distinct from British Crown forces, which eventually numbered over 300,000 soldiers by the mid -19th century?", "options": ["Sepoy regiments", "Auxiliary forces", "Presidency armies", "Company Raj forces"], "answer": 2 },
  { "id": "br_h11", "topic": "British Rule in India", "difficulty": "hard", "question": "Which of the East India Company's three Presidency armies (Bengal, Madras, and Bombay) mutinied most extensively during the 1857 rebellion?", "options": ["Bengal Army", "Bombay Army", "Madras Army", "All three equally"], "answer": 0 },
  { "id": "br_h12", "topic": "British Rule in India", "difficulty": "hard", "question": "What colonial -era code of criminal law, drafted primarily by Thomas Babington Macaulay and enacted in 1860, remains a foundation of criminal law in India, Pakistan, and Bangladesh today?", "options": ["Indian Evidence Act", "Government of India Act", "Criminal Procedure Code", "Indian Penal Code"], "answer": 3 },
  { "id": "br_h13", "topic": "British Rule in India", "difficulty": "hard", "question": "Who succeeded Warren Hastings as Governor -General, going on to implement the Permanent Settlement and broader administrative reforms?", "options": ["Lord Minto", "Lord Wellesley", "Lord Cornwallis", "Sir John Shore"], "answer": 2 },
  { "id": "br_h14", "topic": "British Rule in India", "difficulty": "hard", "question": "What administrative principle, introduced under Cornwallis's reforms, separated district judges from revenue collectors for the first time in Company -administered Bengal?", "options": ["Separation of judicial and revenue administration", "Subsidiary Alliance system", "Doctrine of Lapse", "Ryotwari settlement"], "answer": 0 },
  { "id": "br_h15", "topic": "British Rule in India", "difficulty": "hard", "question": "Which 1856 act, pushed through before the 1857 rebellion, permitted Hindu widows to legally remarry?", "options": ["Hindu Widows' Remarriage Act, 1856", "Special Marriage Act", "Age of Consent Act", "Sati Regulation Act"], "answer": 0 },
  { "id": "br_h16", "topic": "British Rule in India", "difficulty": "hard", "question": "Which Bombay -based East India Company governor, in the 1670s, first proposed fortifying and developing the settlement into a major city?", "options": ["Thomas Pitt", "Gerald Aungier", "Elihu Yale", "Job Charnock"], "answer": 1 },
  { "id": "br_h17", "topic": "British Rule in India", "difficulty": "hard", "question": "What was the name of the diplomatic and military system whereby the East India Company financed its Bengal army partly through revenue extracted under the Diwani grant, effectively making Bengal fund its own conquest?", "options": ["Permanent Settlement", "Subsidiary Alliance system", "Bengal's \"self -financing\" conquest system", "Doctrine of Lapse"], "answer": 2 },

  // ==========================================
  //  3. SPORTS — STEP 1: EASY
  // ==========================================
  { "id": "sp_e1", "topic": "Sports", "difficulty": "easy", "question": "Who holds the record for the most runs scored in Test cricket history?", "options": ["Rahul Dravid", "Jacques Kallis", "Ricky Ponting", "Sachin Tendulkar"], "answer": 3 },
  { "id": "sp_e2", "topic": "Sports", "difficulty": "easy", "question": "Which Bangladeshi cricketer became the first from the country to score a Test century, in the nation's inaugural Test match?", "options": ["Shakib Al Hasan", "Aminul Islam", "Habibul Bashar", "Mohammad Ashraful"], "answer": 1 },
  { "id": "sp_e3", "topic": "Sports", "difficulty": "easy", "question": "What is the term in cricket for an illegally bowled delivery, such as one where the bowler oversteps the crease?", "options": ["Wide", "Dead ball", "No ball", "Bye"], "answer": 2 },
  { "id": "sp_e4", "topic": "Sports", "difficulty": "easy", "question": "Which country won the first -ever ICC Cricket World Cup, held in 1975?", "options": ["India", "Australia", "West Indies", "England"], "answer": 2 },
  { "id": "sp_e5", "topic": "Sports", "difficulty": "easy", "question": "What is the maximum number of players allowed on a basketball court per team during play?", "options": ["4", "6", "7", "5"], "answer": 3 },
  { "id": "sp_e6", "topic": "Sports", "difficulty": "easy", "question": "In which year were women first allowed to compete in the modern Olympic Games?", "options": ["1896", "1912", "1920", "1900"], "answer": 3 },
  { "id": "sp_e7", "topic": "Sports", "difficulty": "easy", "question": "What is the term for a golf score of one stroke under par on a hole?", "options": ["Eagle", "Birdie", "Bogey", "Albatross"], "answer": 1 },
  { "id": "sp_e8", "topic": "Sports", "difficulty": "easy", "question": "What is the term for a golf score of two strokes under par on a hole?", "options": ["Condor", "Bogey", "Birdie", "Eagle"], "answer": 3 },
  { "id": "sp_e9", "topic": "Sports", "difficulty": "easy", "question": "Which country has won the most Cricket World Cup (ODI format) titles?", "options": ["Australia", "West Indies", "England", "India"], "answer": 0 },
  { "id": "sp_e10", "topic": "Sports", "difficulty": "easy", "question": "What is the name of the largest and most well -known mixed martial arts organization in the world?", "options": ["ONE Championship", "PFL", "Bellator", "UFC"], "answer": 3 },
  { "id": "sp_e11", "topic": "Sports", "difficulty": "easy", "question": "In Olympic swimming, how many meters long is one lap of a standard competition pool?", "options": ["50 meters", "25 meters", "40 meters", "100 meters"], "answer": 0 },
  { "id": "sp_e12", "topic": "Sports", "difficulty": "easy", "question": "Which three countries will jointly host the 2026 FIFA World Cup?", "options": ["United States alone", "United States and Mexico only", "Mexico and Canada only", "United States, Canada, and Mexico"], "answer": 3 },
  { "id": "sp_e13", "topic": "Sports", "difficulty": "easy", "question": "What is the term for the batting position of the player who comes in first to bat in cricket?", "options": ["Opener", "Floater", "Finisher", "Anchor"], "answer": 0 },
  { "id": "sp_e14", "topic": "Sports", "difficulty": "easy", "question": "Which Bangladeshi all -rounder is widely regarded as the country's greatest cricketer and a leading wicket -taker for the national team?", "options": ["Mustafizur Rahman", "Shakib Al Hasan", "Tamim Iqbal", "Mashrafe Mortaza"], "answer": 1 },
  { "id": "sp_e15", "topic": "Sports", "difficulty": "easy", "question": "What is the term for an unbeaten batting score in cricket, meaning the batsman was not dismissed?", "options": ["Retired", "Undefeated", "Not out", "Carried bat"], "answer": 2 },
  { "id": "sp_e16", "topic": "Sports", "difficulty": "easy", "question": "Which athlete holds the world record for the 100 meter sprint?", "options": ["Tyson Gay", "Carl Lewis", "Usain Bolt", "Justin Gatlin"], "answer": 2 },
  { "id": "sp_e17", "topic": "Sports", "difficulty": "easy", "question": "What is the term for a cricket match that ends without a clear winner after its full scheduled duration?", "options": ["No result", "Tie", "Abandoned", "Draw"], "answer": 3 },
  { "id": "sp_e18", "topic": "Sports", "difficulty": "easy", "question": "Which club won the UEFA Champions League in 2023, defeating Inter Milan in the final?", "options": ["Chelsea", "Bayern Munich", "Real Madrid", "Manchester City"], "answer": 3 },
  { "id": "sp_e19", "topic": "Sports", "difficulty": "easy", "question": "Who has won the Ballon d'Or a record number of times (8 as of recent years)?", "options": ["Johan Cruyff", "Lionel Messi", "Cristiano Ronaldo", "Michel Platini"], "answer": 1 },
  { "id": "sp_e20", "topic": "Sports", "difficulty": "easy", "question": "Which country has won the UEFA European Championship the most times, with 4 titles?", "options": ["Spain", "France", "Italy", "Germany"], "answer": 0 },
  { "id": "sp_e21", "topic": "Sports", "difficulty": "easy", "question": "What is the term for a football match that ends 0 -0?", "options": ["Stalemate", "Own goal", "Goalless draw", "Clean sheet"], "answer": 2 },
  { "id": "sp_e22", "topic": "Sports", "difficulty": "easy", "question": "In which city is the football club Barcelona based?", "options": ["Munich, Germany", "Madrid, Spain", "Milan, Italy", "Barcelona, Spain"], "answer": 3 },
  { "id": "sp_e23", "topic": "Sports", "difficulty": "easy", "question": "Which English football stadium, known as the \"Home of Football,\" hosts FA Cup finals?", "options": ["Anfield", "Wembley Stadium", "Emirates Stadium", "Old Trafford"], "answer": 1 },
  { "id": "sp_e24", "topic": "Sports", "difficulty": "easy", "question": "What is the term for a goalkeeper preventing the opposing team from scoring throughout an entire match?", "options": ["Clean sheet", "Golden save", "Perfect game", "Shutout"], "answer": 0 },
  { "id": "sp_e25", "topic": "Sports", "difficulty": "easy", "question": "As of recent tournaments, which two countries are tied for the most Copa America titles, with 15 each?", "options": ["Argentina and Brazil", "Argentina and Uruguay", "Brazil and Chile", "Uruguay and Brazil"], "answer": 1 },
  { "id": "sp_e26", "topic": "Sports", "difficulty": "easy", "question": "In cricket, what do we call the wooden structure a bowler aims to hit, made of three stumps and two bails?", "options": ["Pitch", "Wicket", "Crease", "Bail"], "answer": 1 },
  { "id": "sp_e27", "topic": "Sports", "difficulty": "easy", "question": "How many wickets does a bowler need to take in a single innings to achieve a \"five -wicket haul\"?", "options": ["7", "10", "3", "5"], "answer": 3 },
  { "id": "sp_e28", "topic": "Sports", "difficulty": "easy", "question": "In basketball, how many points is a free throw worth?", "options": ["1 point", "2 points", "0.5 points", "3 points"], "answer": 0 },
  { "id": "sp_e29", "topic": "Sports", "difficulty": "easy", "question": "In basketball, how many points is a successful shot from beyond the three -point line worth?", "options": ["3 points", "4 points", "2 points", "1 point"], "answer": 0 },
  { "id": "sp_e30", "topic": "Sports", "difficulty": "easy", "question": "What is the term for the football position responsible for organizing the defense, usually playing centrally at the back?", "options": ["Center -back", "Striker", "Midfielder", "Winger"], "answer": 0 },
  { "id": "sp_e31", "topic": "Sports", "difficulty": "easy", "question": "In tennis, how many sets must a man typically win to win a best -of-five match at a Grand Slam?", "options": ["4 sets", "2 sets", "5 sets", "3 sets"], "answer": 3 },
  { "id": "sp_e32", "topic": "Sports", "difficulty": "easy", "question": "What is the maximum number of players on an ice hockey team on the ice at one time, including the goalie?", "options": ["6", "5", "11", "7"], "answer": 0 },
  { "id": "sp_e33", "topic": "Sports", "difficulty": "easy", "question": "In golf, what is the term for completing a hole in the expected number of strokes?", "options": ["Eagle", "Birdie", "Par", "Bogey"], "answer": 2 },
  { "id": "sp_e34", "topic": "Sports", "difficulty": "easy", "question": "What is the name of the international governing body for cricket?", "options": ["FIFA", "World Cricket Federation", "International Cricket Council", "IOC"], "answer": 2 },
  { "id": "sp_e35", "topic": "Sports", "difficulty": "easy", "question": "What is the term for a cricket fielder standing very close to the batsman on the leg side?", "options": ["Third man", "Short leg", "Long -on", "Deep cover"], "answer": 1 },
  { "id": "sp_e36", "topic": "Sports", "difficulty": "easy", "question": "How many players are on a team in a standard game of rugby union?", "options": ["13", "7", "15", "11"], "answer": 2 },
  { "id": "sp_e37", "topic": "Sports", "difficulty": "easy", "question": "How many players are on a team in rugby league?", "options": ["15", "13", "9", "11"], "answer": 1 },
  { "id": "sp_e38", "topic": "Sports", "difficulty": "easy", "question": "What is the name of the annual golf tournament played at St Andrews, considered the \"home of golf\"?", "options": ["The Masters", "PGA Championship", "US Open", "The Open Championship"], "answer": 3 },
  { "id": "sp_e39", "topic": "Sports", "difficulty": "easy", "question": "In boxing, what do we call a fight that ends without a winner being declared?", "options": ["Split decision", "Draw", "Tie", "No contest"], "answer": 1 },
  { "id": "sp_e40", "topic": "Sports", "difficulty": "easy", "question": "In badminton, what is the basic scoring unit won when a team makes a legal return that the opponent fails to return?", "options": ["Set", "Point", "Serve", "Rally"], "answer": 1 },
  { "id": "sp_e41", "topic": "Sports", "difficulty": "easy", "question": "What is the standard distance of a marathon race?", "options": ["35 kilometers", "50 kilometers", "21 kilometers", "42.195 kilometers"], "answer": 3 },
  { "id": "sp_e42", "topic": "Sports", "difficulty": "easy", "question": "What is the name of the trophy awarded to Test cricket's top -ranked team on an ongoing basis?", "options": ["The Ashes", "World Test Trophy", "ICC Test Championship Mace", "ICC Golden Bat"], "answer": 2 },
  { "id": "sp_e43", "topic": "Sports", "difficulty": "easy", "question": "What color is the center of an archery target?", "options": ["Gold", "Black", "Blue", "Red"], "answer": 0 },
  { "id": "sp_e44", "topic": "Sports", "difficulty": "easy", "question": "In cricket, what is the term for the marked area of the pitch where the batsman stands to face the bowler?", "options": ["Box", "Wicket", "Crease", "Popping zone"], "answer": 2 },
  { "id": "sp_e45", "topic": "Sports", "difficulty": "easy", "question": "How many players are on a handball team on the court at one time?", "options": ["7", "5", "6", "9"], "answer": 0 },

  // ==========================================
  //  3. SPORTS — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "sp_em1", "topic": "Sports", "difficulty": "easy-medium", "question": "Which cricket format, introduced internationally in 2003 -05, limits each team to a maximum of 20 overs?", "options": ["Test cricket", "The Hundred", "One Day International", "Twenty20"], "answer": 3 },
  { "id": "sp_em2", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the traditional and most prestigious format of international cricket, played over up to five days?", "options": ["Twenty20", "First -class cricket", "Test cricket", "One Day International"], "answer": 2 },
  { "id": "sp_em3", "topic": "Sports", "difficulty": "easy-medium", "question": "Who captained Bangladesh's cricket team to its first -ever Test match win, against Zimbabwe in 2005?", "options": ["Shakib Al Hasan", "Aminul Islam", "Habibul Bashar", "Khaled Mahmud"], "answer": 2 },
  { "id": "sp_em4", "topic": "Sports", "difficulty": "easy-medium", "question": "Which two Formula 1 drivers are tied for the most World Championship titles, with 7 each?", "options": ["Sebastian Vettel and Max Verstappen", "Juan Manuel Fangio and Niki Lauda", "Ayrton Senna and Alain Prost", "Michael Schumacher and Lewis Hamilton"], "answer": 3 },
  { "id": "sp_em5", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name for the swimming stroke in which swimmers move face -down, alternating overhand arm movements?", "options": ["Freestyle", "Breaststroke", "Backstroke", "Butterfly"], "answer": 0 },
  { "id": "sp_em6", "topic": "Sports", "difficulty": "easy-medium", "question": "Which country has won the most Rugby World Cup titles?", "options": ["South Africa", "New Zealand", "Australia", "England"], "answer": 0 },
  { "id": "sp_em7", "topic": "Sports", "difficulty": "easy-medium", "question": "Which country's cricket team is nicknamed the \"Baggy Greens\"?", "options": ["South Africa", "England", "New Zealand", "Australia"], "answer": 3 },
  { "id": "sp_em8", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a badminton shot hit softly just over the net so it drops quickly on the other side?", "options": ["Clear", "Smash", "Drop shot", "Lob"], "answer": 2 },
  { "id": "sp_em9", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a fast, short -pitched cricket delivery aimed at a batsman's upper body or head?", "options": ["Full toss", "Bouncer", "Googly", "Yorker"], "answer": 1 },
  { "id": "sp_em10", "topic": "Sports", "difficulty": "easy-medium", "question": "Which Olympic gymnastics event involves competitors performing on a raised beam only 10 centimeters wide?", "options": ["Balance beam", "Uneven bars", "Floor exercise", "Vault"], "answer": 0 },
  { "id": "sp_em11", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for the extra period played in soccer knockout matches to break a tie, before any penalty shootout?", "options": ["Overtime", "Sudden death", "Extra time", "Stoppage time"], "answer": 2 },
  { "id": "sp_em12", "topic": "Sports", "difficulty": "easy-medium", "question": "Which country has won the most Olympic medals overall in Summer Olympics history?", "options": ["China", "Soviet Union/Russia", "Great Britain", "United States"], "answer": 3 },
  { "id": "sp_em13", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name of the annual cycling race, held primarily in France, widely considered the most prestigious in the world?", "options": ["Giro d'Italia", "Vuelta a Espana", "Tour de France", "Paris -Roubaix"], "answer": 2 },
  { "id": "sp_em14", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for the cricket fielding position stationed close behind the batsman to catch thin edges off the bat?", "options": ["Mid -on", "Slip", "Cover", "Gully"], "answer": 1 },
  { "id": "sp_em15", "topic": "Sports", "difficulty": "easy-medium", "question": "Which country won the inaugural ICC Twenty20 World Cup in 2007?", "options": ["India", "Australia", "Pakistan", "South Africa"], "answer": 0 },
  { "id": "sp_em16", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name of the annual golf tournament held at Augusta National, traditionally the first major of the year?", "options": ["The Open Championship", "The Masters", "US Open", "PGA Championship"], "answer": 1 },
  { "id": "sp_em17", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a bowler in cricket dismissing three batsmen with three consecutive deliveries?", "options": ["Triple wicket", "Hat -trick", "Golden over", "Perfect over"], "answer": 1 },
  { "id": "sp_em18", "topic": "Sports", "difficulty": "easy-medium", "question": "Which club has appeared in the most UEFA Champions League finals?", "options": ["Real Madrid", "AC Milan", "Bayern Munich", "Liverpool"], "answer": 0 },
  { "id": "sp_em19", "topic": "Sports", "difficulty": "easy-medium", "question": "Which player scored a famous overhead \"bicycle kick\" goal for Real Madrid against Juventus in the 2018 Champions League quarter -final?", "options": ["Sergio Ramos", "Gareth Bale", "Cristiano Ronaldo", "Karim Benzema"], "answer": 2 },
  { "id": "sp_em20", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name of South America's premier club football competition, considered the continental equivalent of the Champions League?", "options": ["Copa Libertadores", "Copa America", "Recopa Sudamericana", "Copa Sudamericana"], "answer": 0 },
  { "id": "sp_em21", "topic": "Sports", "difficulty": "easy-medium", "question": "Which club won the UEFA Champions League in the 2019 -20 season, played in a single -venue format in Portugal due to the COVID -19 pandemic?", "options": ["Manchester City", "Bayern Munich", "Real Madrid", "Paris Saint -Germain"], "answer": 1 },
  { "id": "sp_em22", "topic": "Sports", "difficulty": "easy-medium", "question": "Which English club, managed by Pep Guardiola, completed a continental treble (league, domestic cup, and Champions League) in the 2022 -23 season?", "options": ["Manchester City", "Liverpool", "Arsenal", "Chelsea"], "answer": 0 },
  { "id": "sp_em23", "topic": "Sports", "difficulty": "easy-medium", "question": "In rugby union, how many points is a try worth?", "options": ["6 points", "7 points", "3 points", "5 points"], "answer": 3 },
  { "id": "sp_em24", "topic": "Sports", "difficulty": "easy-medium", "question": "Which snooker player is known as \"The Rocket\" for his fast playing style?", "options": ["Steve Davis", "John Higgins", "Ronnie O'Sullivan", "Stephen Hendry"], "answer": 2 },
  { "id": "sp_em25", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a football match, tied after normal time in a cup competition, proceeding to two 15-minute periods before penalties?", "options": ["Stoppage time", "Golden goal period", "Added time", "Extra time"], "answer": 3 },
  { "id": "sp_em26", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a full -length cricket delivery that lands right at the batsman's feet, making it hard to hit?", "options": ["Full toss", "Bouncer", "Googly", "Yorker"], "answer": 3 },
  { "id": "sp_em27", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a badminton shot hit high and deep to the back of the opponent's court?", "options": ["Net shot", "Smash", "Clear", "Drop shot"], "answer": 2 },
  { "id": "sp_em28", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the maximum number of sets played in a badminton match?", "options": ["5", "7", "2", "3"], "answer": 3 },
  { "id": "sp_em29", "topic": "Sports", "difficulty": "easy-medium", "question": "In American football, how many points is a field goal worth?", "options": ["2 points", "1 point", "3 points", "6 points"], "answer": 2 },
  { "id": "sp_em30", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for an ice hockey team having more players on the ice than their opponents due to a penalty?", "options": ["Extra attacker", "Power play", "Man advantage play", "Fast break"], "answer": 1 },
  { "id": "sp_em31", "topic": "Sports", "difficulty": "easy-medium", "question": "In baseball, what is the term for a pitch that resembles a fastball but breaks late and down, deceiving the batter?", "options": ["Curveball", "Knuckleball", "Slider", "Changeup"], "answer": 2 },
  { "id": "sp_em32", "topic": "Sports", "difficulty": "easy-medium", "question": "In Formula 1, what is the term for the practice sessions held before qualifying and the race?", "options": ["Time trials", "Grid rehearsal", "Free practice", "Warm -up laps"], "answer": 2 },
  { "id": "sp_em33", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for the marked area in front of a football goal where the goalkeeper has special handling privileges?", "options": ["Center circle", "Technical area", "Offside line", "Penalty area"], "answer": 3 },
  { "id": "sp_em34", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name of the tennis shot played with forward -rotating spin, causing the ball to bounce high and away?", "options": ["Flat shot", "Backspin", "Topspin", "Slice"], "answer": 2 },
  { "id": "sp_em35", "topic": "Sports", "difficulty": "easy-medium", "question": "In cricket, what is the term for runs scored without the ball being hit by the bat, such as wides and no - balls?", "options": ["Bonus runs", "Byes", "Penalties", "Extras"], "answer": 3 },
  { "id": "sp_em36", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name of the volleyball position responsible for setting up attacks for teammates?", "options": ["Outside hitter", "Libero", "Middle blocker", "Setter"], "answer": 3 },
  { "id": "sp_em37", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a swimmer's turn at the wall involving a somersault, used in freestyle and backstroke?", "options": ["Open turn", "Crossover turn", "Bucket turn", "Flip turn"], "answer": 3 },
  { "id": "sp_em38", "topic": "Sports", "difficulty": "easy-medium", "question": "In cricket, what do we call an over in which no runs are scored off the bat or in extras?", "options": ["Maiden over", "Dot over", "Silent over", "Clean over"], "answer": 0 },
  { "id": "sp_em39", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a tennis serve that isn't touched by the opponent's racket, winning the point outright?", "options": ["Fault", "Winner", "Let", "Ace"], "answer": 3 },
  { "id": "sp_em40", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name of the American football position primarily responsible for throwing passes?", "options": ["Tight end", "Running back", "Wide receiver", "Quarterback"], "answer": 3 },
  { "id": "sp_em41", "topic": "Sports", "difficulty": "easy-medium", "question": "In cricket, what is the term used when a wicketkeeper dismisses a batsman who has stepped out of their crease?", "options": ["Run out", "Stumped", "Caught", "LBW"], "answer": 1 },
  { "id": "sp_em42", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name of the tiebreaker method used in tennis when a set reaches six games apiece?", "options": ["Deuce set", "Extra game", "Sudden death", "Tiebreak"], "answer": 3 },
  { "id": "sp_em43", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the term for a boxer being unable to continue due to injury or exhaustion, ending the fight?", "options": ["Disqualification", "Technical knockout", "Retirement", "Forfeit"], "answer": 1 },
  { "id": "sp_em44", "topic": "Sports", "difficulty": "easy-medium", "question": "What is the name of the football position primarily responsible for scoring goals?", "options": ["Striker", "Sweeper", "Full -back", "Winger"], "answer": 0 },
  { "id": "sp_em45", "topic": "Sports", "difficulty": "easy-medium", "question": "In rugby, what is the term for restarting play by throwing the ball into a line of players from touch?", "options": ["Ruck", "Scrum", "Maul", "Line -out"], "answer": 3 },

  // ==========================================
  //  3. SPORTS — STEP 3: MEDIUM
  // ==========================================
  { "id": "sp_m1", "topic": "Sports", "difficulty": "medium", "question": "Which country won the first -ever official Test cricket match, played in 1877 against Australia?", "options": ["Ireland", "New Zealand", "England", "South Africa"], "answer": 2 },
  { "id": "sp_m2", "topic": "Sports", "difficulty": "medium", "question": "What is the term for a deceptive delivery bowled by a leg -spinner that turns the opposite way to a normal leg break?", "options": ["Googly", "Doosra", "Carrom ball", "Flipper"], "answer": 0 },
  { "id": "sp_m3", "topic": "Sports", "difficulty": "medium", "question": "Which athlete won the 1912 Olympic decathlon and pentathlon, was later stripped of his medals over amateur status, and was posthumously reinstated?", "options": ["Jim Thorpe", "Paavo Nurmi", "Ray Ewry", "Hannes Kolehmainen"], "answer": 0 },
  { "id": "sp_m4", "topic": "Sports", "difficulty": "medium", "question": "What is the term for the tie -breaking method in soccer knockout matches, involving alternating kicks after extra time?", "options": ["Penalty shootout", "Golden goal", "Sudden death", "Away goals rule"], "answer": 0 },
  { "id": "sp_m5", "topic": "Sports", "difficulty": "medium", "question": "Which country won the Cricket World Cup on home soil in 2011, co -hosted with Sri Lanka and Bangladesh?", "options": ["Sri Lanka", "Bangladesh", "Pakistan", "India"], "answer": 3 },
  { "id": "sp_m6", "topic": "Sports", "difficulty": "medium", "question": "What is the popular nickname for the UEFA Champions League trophy, due to its distinctive large handles?", "options": ["The Cup with the Big Ears", "The Silver Chalice", "The Grand Cup", "The Golden Bowl"], "answer": 0 },
  { "id": "sp_m7", "topic": "Sports", "difficulty": "medium", "question": "Which Formula 1 driver holds the all -time record for the most Grand Prix race wins?", "options": ["Lewis Hamilton", "Sebastian Vettel", "Max Verstappen", "Michael Schumacher"], "answer": 0 },
  { "id": "sp_m8", "topic": "Sports", "difficulty": "medium", "question": "Which country has won the most Davis Cup titles in the history of men's international tennis?", "options": ["United States", "France", "Australia", "Great Britain"], "answer": 0 },
  { "id": "sp_m9", "topic": "Sports", "difficulty": "medium", "question": "What is the name of the statistical method used to set a revised target score for the team batting second in a rain -shortened cricket match?", "options": ["Par score method", "Powerplay formula", "Net Run Rate method", "Duckworth -Lewis -Stern method"], "answer": 3 },
  { "id": "sp_m10", "topic": "Sports", "difficulty": "medium", "question": "Which boxer, born Cassius Clay, famously declared \"I am the greatest\" and won Olympic gold in 1960?", "options": ["Muhammad Ali", "Joe Frazier", "Sonny Liston", "George Foreman"], "answer": 0 },
  { "id": "sp_m11", "topic": "Sports", "difficulty": "medium", "question": "What is the name of the swimming event that combines all four competitive strokes in a set sequence for a single swimmer?", "options": ["Mixed relay", "Medley relay", "Individual medley", "Freestyle relay"], "answer": 2 },
  { "id": "sp_m12", "topic": "Sports", "difficulty": "medium", "question": "Which national rugby team performs the \"Haka,\" a traditional Maori war dance, before matches?", "options": ["Australia", "South Africa", "Fiji", "New Zealand"], "answer": 3 },
  { "id": "sp_m13", "topic": "Sports", "difficulty": "medium", "question": "In which year was the Wimbledon Championships, the oldest tennis tournament in the world, first held?", "options": ["1850", "1920", "1900", "1877"], "answer": 3 },
  { "id": "sp_m14", "topic": "Sports", "difficulty": "medium", "question": "Which cricketer holds the record for the highest individual score in a Test match innings, with 400 not out?", "options": ["Matthew Hayden", "Virender Sehwag", "Brian Lara", "Don Bradman"], "answer": 2 },
  { "id": "sp_m15", "topic": "Sports", "difficulty": "medium", "question": "What is the term for the fielding restriction in limited -overs cricket that limits fielders outside a certain radius during specific overs?", "options": ["Free hit", "Powerplay", "Field restriction bonus", "Super over"], "answer": 1 },
  { "id": "sp_m16", "topic": "Sports", "difficulty": "medium", "question": "Which athlete won the first -ever Olympic marathon gold medal, at the 1896 Athens Games, as a home favorite?", "options": ["Spyridon Louis", "Dorando Pietri", "Johnny Hayes", "Emil Zatopek"], "answer": 0 },
  { "id": "sp_m17", "topic": "Sports", "difficulty": "medium", "question": "What is the name of the multi -sport event held every four years for athletes with physical, intellectual, and sensory disabilities, alongside the Olympics?", "options": ["World Games", "Deaflympics", "Special Olympics", "Paralympic Games"], "answer": 3 },
  { "id": "sp_m18", "topic": "Sports", "difficulty": "medium", "question": "Which player holds the record for most goals scored in UEFA Champions League history?", "options": ["Lionel Messi", "Karim Benzema", "Cristiano Ronaldo", "Robert Lewandowski"], "answer": 2 },
  { "id": "sp_m19", "topic": "Sports", "difficulty": "medium", "question": "Which club won the first -ever European Cup, in the 1955 -56 season?", "options": ["Real Madrid", "Ajax", "Benfica", "AC Milan"], "answer": 0 },
  { "id": "sp_m20", "topic": "Sports", "difficulty": "medium", "question": "In which year was the European Cup rebranded as the UEFA Champions League, adopting a group - stage format?", "options": ["1995", "2000", "1992", "1988"], "answer": 2 },
  { "id": "sp_m21", "topic": "Sports", "difficulty": "medium", "question": "Which club won the first -ever title under the rebranded \"UEFA Champions League\" name, in 1992 - 93?", "options": ["Ajax", "AC Milan", "Marseille", "Barcelona"], "answer": 2 },
  { "id": "sp_m22", "topic": "Sports", "difficulty": "medium", "question": "What is the popular name for Liverpool's comeback from 3 -0 down at halftime to win the 2005 Champions League final on penalties against AC Milan?", "options": ["The Anfield Comeback", "The Miracle of Istanbul", "The Great Escape", "The Istanbul Turnaround"], "answer": 1 },
  { "id": "sp_m23", "topic": "Sports", "difficulty": "medium", "question": "Which club holds the record for the most UEFA Champions League/European Cup titles won overall?", "options": ["AC Milan", "Bayern Munich", "Real Madrid", "Liverpool"], "answer": 2 },
  { "id": "sp_m24", "topic": "Sports", "difficulty": "medium", "question": "Which tiebreaker rule, in which away goals counted double when aggregate scores were level, was used in Champions League knockout ties until UEFA abolished it in 2021?", "options": ["Away goals rule", "Golden goal rule", "Extra -time-only rule", "Silver goal rule"], "answer": 0 },
  { "id": "sp_m25", "topic": "Sports", "difficulty": "medium", "question": "Which two English clubs met in an all -English UEFA Champions League final in 2019, won 2 -0 by one of them?", "options": ["Chelsea and Arsenal", "Liverpool and Tottenham Hotspur", "Manchester United and Chelsea", "Manchester City and Arsenal"], "answer": 1 },
  { "id": "sp_m26", "topic": "Sports", "difficulty": "medium", "question": "Which country won the first -ever Rugby League World Cup, in 1954?", "options": ["France", "New Zealand", "Great Britain", "Australia"], "answer": 2 },
  { "id": "sp_m27", "topic": "Sports", "difficulty": "medium", "question": "What is the term for a cricket team requiring the opposition to bat again immediately after being dismissed cheaply?", "options": ["Second innings", "Forced replay", "Reverse batting", "Follow -on"], "answer": 3 },
  { "id": "sp_m28", "topic": "Sports", "difficulty": "medium", "question": "By how many runs must a team typically lead to enforce the follow -on in a standard five -day Test match?", "options": ["100 runs", "300 runs", "150 runs", "200 runs"], "answer": 3 },
  { "id": "sp_m29", "topic": "Sports", "difficulty": "medium", "question": "Which country has won the most Men's Hockey World Cup titles?", "options": ["Pakistan", "Netherlands", "India", "Australia"], "answer": 0 },
  { "id": "sp_m30", "topic": "Sports", "difficulty": "medium", "question": "What is the term for a basketball violation where a player takes steps without dribbling the ball?", "options": ["Goaltending", "Double dribble", "Traveling", "Carrying"], "answer": 2 },
  { "id": "sp_m31", "topic": "Sports", "difficulty": "medium", "question": "In swimming, what is the term for a relay event in which four swimmers each perform one of the four competitive strokes?", "options": ["Medley relay", "Freestyle relay", "Mixed relay", "Individual medley"], "answer": 0 },
  { "id": "sp_m32", "topic": "Sports", "difficulty": "medium", "question": "Which three races make up professional cycling's \"Grand Tours\"?", "options": ["Tour de France, Paris -Roubaix, and Milan -San Remo", "Giro d'Italia, Vuelta a Espana, and Tour of Flanders", "Tour de France, Tour of California, and Vuelta a Espana", "Tour de France, Giro d'Italia, and Vuelta a Espana"], "answer": 3 },
  { "id": "sp_m33", "topic": "Sports", "difficulty": "medium", "question": "What are the three weapon disciplines used in Olympic fencing?", "options": ["Foil, Katana, and Epee", "Foil, Epee, and Sabre", "Epee, Sabre, and Longsword", "Foil, Rapier, and Sabre"], "answer": 1 },
  { "id": "sp_m34", "topic": "Sports", "difficulty": "medium", "question": "How many events make up the women's heptathlon in athletics?", "options": ["8", "5", "10", "7"], "answer": 3 },
  { "id": "sp_m35", "topic": "Sports", "difficulty": "medium", "question": "How many events make up the men's decathlon in athletics?", "options": ["10", "12", "7", "8"], "answer": 0 },
  { "id": "sp_m36", "topic": "Sports", "difficulty": "medium", "question": "What is the term for a cricket delivery that spins from leg to off for a right -handed batsman, bowled by a leg -spin bowler?", "options": ["Doosra", "Leg break", "Off break", "Arm ball"], "answer": 1 },
  { "id": "sp_m37", "topic": "Sports", "difficulty": "medium", "question": "What is the term for a leg -spinner's delivery that unexpectedly spins the opposite way to a normal leg break?", "options": ["Slower ball", "Bouncer", "Yorker", "Googly"], "answer": 3 },
  { "id": "sp_m38", "topic": "Sports", "difficulty": "medium", "question": "In which sport would an athlete perform a \"clean and jerk\"?", "options": ["Judo", "Wrestling", "Gymnastics", "Weightlifting"], "answer": 3 },
  { "id": "sp_m39", "topic": "Sports", "difficulty": "medium", "question": "What is the name of the other competitive lift in Olympic weightlifting, alongside the \"clean and jerk\"?", "options": ["Deadlift", "Clean pull", "Snatch", "Press"], "answer": 2 },
  { "id": "sp_m40", "topic": "Sports", "difficulty": "medium", "question": "What is the name of the biennial golf competition between teams from the United States and Europe?", "options": ["Presidents Cup", "Ryder Cup", "Solheim Cup", "World Cup of Golf"], "answer": 1 },
  { "id": "sp_m41", "topic": "Sports", "difficulty": "medium", "question": "What is the name of the biennial golf competition between a United States team and an International team, excluding Europe?", "options": ["Solheim Cup", "Ryder Cup", "Walker Cup", "Presidents Cup"], "answer": 3 },
  { "id": "sp_m42", "topic": "Sports", "difficulty": "medium", "question": "What is the name of the international women's team tennis competition, equivalent to the men's Davis Cup, renamed in 2020 to honor a tennis legend?", "options": ["Wightman Cup", "Hopman Cup", "Billie Jean King Cup", "Federation Cup"], "answer": 2 },
  { "id": "sp_m43", "topic": "Sports", "difficulty": "medium", "question": "What term describes an athlete's best -ever recorded time or result in a given event?", "options": ["Top form", "Personal best", "Season high", "Career mark"], "answer": 1 },
  { "id": "sp_m44", "topic": "Sports", "difficulty": "medium", "question": "Which two disciplines are combined in the winter sport of biathlon?", "options": ["Cross -country skiing and archery", "Ski jumping and rifle shooting", "Downhill skiing and archery", "Cross -country skiing and rifle shooting"], "answer": 3 },
  { "id": "sp_m45", "topic": "Sports", "difficulty": "medium", "question": "What is the term for a cricket match format limited to a set number of overs per side, as opposed to unlimited -innings Test cricket?", "options": ["Club cricket", "Declaration cricket", "Limited -overs cricket", "First -class cricket"], "answer": 2 },

  // ==========================================
  //  3. SPORTS — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "sp_mh1", "topic": "Sports", "difficulty": "medium-hard", "question": "Which club won the UEFA Champions League three consecutive times, from 2016 to 2018?", "options": ["Real Madrid", "Liverpool", "Bayern Munich", "Barcelona"], "answer": 0 },
  { "id": "sp_mh2", "topic": "Sports", "difficulty": "medium-hard", "question": "Which manager guided Liverpool to Champions League glory in 2019, a year after losing the final?", "options": ["Zinedine Zidane", "Carlo Ancelotti", "Pep Guardiola", "Jurgen Klopp"], "answer": 3 },
  { "id": "sp_mh3", "topic": "Sports", "difficulty": "medium-hard", "question": "Since the away goals rule was abolished in 2021, how are level -aggregate Champions League knockout ties now decided?", "options": ["A replay is scheduled", "The team with more away goals advances", "Extra time, then penalties if still level", "The higher -seeded team advances"], "answer": 2 },
  { "id": "sp_mh4", "topic": "Sports", "difficulty": "medium-hard", "question": "Which stadium, nicknamed the \"Theatre of Dreams,\" is Manchester United's home ground?", "options": ["Etihad Stadium", "Emirates Stadium", "Anfield", "Old Trafford"], "answer": 3 },
  { "id": "sp_mh5", "topic": "Sports", "difficulty": "medium-hard", "question": "Which country's top football division is known as \"Serie A\"?", "options": ["Italy", "Spain", "Germany", "France"], "answer": 0 },
  { "id": "sp_mh6", "topic": "Sports", "difficulty": "medium-hard", "question": "Which country's top football division is known as \"La Liga\"?", "options": ["Germany", "Italy", "Spain", "Portugal"], "answer": 2 },
  { "id": "sp_mh7", "topic": "Sports", "difficulty": "medium-hard", "question": "Which country's top football division is known as the \"Bundesliga\"?", "options": ["Switzerland", "Netherlands", "Austria", "Germany"], "answer": 3 },
  { "id": "sp_mh8", "topic": "Sports", "difficulty": "medium-hard", "question": "What is the name of France's top professional football division?", "options": ["Ligue 1", "Division 1", "Coupe de France", "Ligue Nationale"], "answer": 0 },
  { "id": "sp_mh9", "topic": "Sports", "difficulty": "medium-hard", "question": "Which club is nicknamed \"The Old Lady\" (La Vecchia Signora) in Italian football?", "options": ["Inter Milan", "AS Roma", "AC Milan", "Juventus"], "answer": 3 },
  { "id": "sp_mh10", "topic": "Sports", "difficulty": "medium-hard", "question": "Which club, nicknamed \"The Reds,\" plays its home matches at Anfield?", "options": ["Liverpool", "Arsenal", "Sunderland", "Manchester United"], "answer": 0 },
  { "id": "sp_mh11", "topic": "Sports", "difficulty": "medium-hard", "question": "What is the name of FC Barcelona's home stadium?", "options": ["San Siro", "Wanda Metropolitano", "Santiago Bernabeu", "Camp Nou"], "answer": 3 },
  { "id": "sp_mh12", "topic": "Sports", "difficulty": "medium-hard", "question": "Which country won the first -ever FIFA Women's World Cup, held in 1991?", "options": ["China", "Germany", "United States", "Norway"], "answer": 2 },
  { "id": "sp_mh13", "topic": "Sports", "difficulty": "medium-hard", "question": "Who is cricket's all -time leading wicket -taker in Test match history?", "options": ["James Anderson", "Anil Kumble", "Muttiah Muralitharan", "Shane Warne"], "answer": 2 },
  { "id": "sp_mh14", "topic": "Sports", "difficulty": "medium-hard", "question": "Which cricketer has scored the most centuries in One Day International (ODI) history?", "options": ["Sachin Tendulkar", "Ricky Ponting", "Rohit Sharma", "Virat Kohli"], "answer": 0 },
  { "id": "sp_mh15", "topic": "Sports", "difficulty": "medium-hard", "question": "How many times has a bowler taken all 10 wickets in a single Test innings, a feat achieved by Jim Laker and Anil Kumble?", "options": ["Never", "Three times", "Twice", "Once"], "answer": 2 },
  { "id": "sp_mh16", "topic": "Sports", "difficulty": "medium-hard", "question": "Who captained the West Indies cricket team during their dominant, largely unbeaten run through much of the 1980s?", "options": ["Garfield Sobers", "Clive Lloyd", "Brian Lara", "Viv Richards"], "answer": 1 },
  { "id": "sp_mh17", "topic": "Sports", "difficulty": "medium-hard", "question": "Among men, which tennis player has won the most Grand Slam singles titles, as of recent completed seasons?", "options": ["Pete Sampras", "Novak Djokovic", "Roger Federer", "Rafael Nadal"], "answer": 1 },
  { "id": "sp_mh18", "topic": "Sports", "difficulty": "medium-hard", "question": "Which female tennis player holds the record for most Grand Slam singles titles won in the Open Era (since 1968)?", "options": ["Margaret Court", "Steffi Graf", "Martina Navratilova", "Serena Williams"], "answer": 3 },
  { "id": "sp_mh19", "topic": "Sports", "difficulty": "medium-hard", "question": "Which gymnast holds the record for most Olympic medals ever won in gymnastics?", "options": ["Larisa Latynina", "Simone Biles", "Nadia Comaneci", "Vera Caslavska"], "answer": 0 },
  { "id": "sp_mh20", "topic": "Sports", "difficulty": "medium-hard", "question": "Who holds the record for the most Olympic medals of all time, across any sport?", "options": ["Michael Phelps", "Larisa Latynina", "Mark Spitz", "Usain Bolt"], "answer": 0 },
  { "id": "sp_mh21", "topic": "Sports", "difficulty": "medium-hard", "question": "In Formula 1, what is the term for the extra point awarded to the driver setting the fastest lap, provided they finish in the top 10?", "options": ["Grid penalty offset", "Fastest lap point", "Constructors' bonus", "Pole position bonus"], "answer": 1 },
  { "id": "sp_mh22", "topic": "Sports", "difficulty": "medium-hard", "question": "Which Formula 1 team has won the most Constructors' Championships in the sport's history?", "options": ["Ferrari", "Red Bull", "Mercedes", "McLaren"], "answer": 0 },
  { "id": "sp_mh23", "topic": "Sports", "difficulty": "medium-hard", "question": "What is the term for a snooker player potting every red and every colour in the correct sequence for the maximum possible break?", "options": ["Century break", "147 break", "Perfect frame", "Grand slam break"], "answer": 1 },
  { "id": "sp_mh24", "topic": "Sports", "difficulty": "medium-hard", "question": "Which country has appeared in the most Rugby World Cup finals?", "options": ["South Africa", "New Zealand", "England", "Australia"], "answer": 1 },
  { "id": "sp_mh25", "topic": "Sports", "difficulty": "medium-hard", "question": "What is the name of cricket's newest format, featuring 100 balls per side, introduced in England in 2021?", "options": ["The Hundred", "Fast Cricket", "T10", "Super Over League"], "answer": 0 },

  // ==========================================
  //  3. SPORTS — STEP 5: HARD
  // ==========================================
  { "id": "sp_h1", "topic": "Sports", "difficulty": "hard", "question": "Which club has featured in more European Cup/Champions League finals than any other without ever winning the trophy?", "options": ["Bayer Leverkusen", "Valencia", "Arsenal", "Atletico Madrid"], "answer": 3 },
  { "id": "sp_h2", "topic": "Sports", "difficulty": "hard", "question": "Which club has lost the most Champions League/European Cup finals overall, with 7 defeats?", "options": ["AC Milan", "Benfica", "Juventus", "Bayern Munich"], "answer": 2 },
  { "id": "sp_h3", "topic": "Sports", "difficulty": "hard", "question": "Borussia Dortmund won a Champions League final on home soil in 1997 (in Munich). Which Italian club achieved the same feat in Rome in 1996?", "options": ["Inter Milan", "Juventus", "AC Milan", "Napoli"], "answer": 1 },
  { "id": "sp_h4", "topic": "Sports", "difficulty": "hard", "question": "Which club won five consecutive European Cup titles from 1955 -56 to 1959 -60, the first team ever to do so?", "options": ["Benfica", "Real Madrid", "AC Milan", "Ajax"], "answer": 1 },
  { "id": "sp_h5", "topic": "Sports", "difficulty": "hard", "question": "Which English club has played the most Champions League matches without ever winning the trophy?", "options": ["Arsenal", "Tottenham Hotspur", "Newcastle United", "Manchester City"], "answer": 0 },
  { "id": "sp_h6", "topic": "Sports", "difficulty": "hard", "question": "Which bowler holds the record for the best innings bowling figures in Test cricket history, taking 10 wickets for just 53 runs in 1956?", "options": ["Shane Warne", "Muttiah Muralitharan", "Jim Laker", "Anil Kumble"], "answer": 2 },
  { "id": "sp_h7", "topic": "Sports", "difficulty": "hard", "question": "What is the highest team total ever recorded in a Test cricket innings?", "options": ["India's 759/7 declared", "Australia's 758/8 declared", "England's 903/7 declared", "Sri Lanka's 952/6 declared"], "answer": 3 },
  { "id": "sp_h8", "topic": "Sports", "difficulty": "hard", "question": "Which cricket format, introduced by Australian media mogul Kerry Packer in the 1970s, pioneered colored clothing and day -night matches?", "options": ["Super League Cricket", "Twenty20", "World Series Cricket", "The Hundred"], "answer": 2 },
  { "id": "sp_h9", "topic": "Sports", "difficulty": "hard", "question": "Which two clubs contested Europe's first -ever European Cup final, in 1956?", "options": ["AC Milan and Barcelona", "Real Madrid and Stade de Reims", "Real Madrid and Benfica", "Real Madrid and AC Milan"], "answer": 1 },
  { "id": "sp_h10", "topic": "Sports", "difficulty": "hard", "question": "What is the football term for a club winning its domestic league, domestic cup, and the Champions League all in the same season?", "options": ["Treble", "Triple Crown", "Grand Slam", "Sweep"], "answer": 0 },
  { "id": "sp_h11", "topic": "Sports", "difficulty": "hard", "question": "Which club, known as the \"Lisbon Lions,\" became the first British club to win the treble (league, domestic cup, and European Cup) in 1967?", "options": ["Celtic", "Manchester United", "Rangers", "Liverpool"], "answer": 0 },
  { "id": "sp_h12", "topic": "Sports", "difficulty": "hard", "question": "Which English club was the first to win the treble of league, FA Cup, and Champions League, in 1999?", "options": ["Liverpool", "Arsenal", "Chelsea", "Manchester United"], "answer": 3 },
  { "id": "sp_h13", "topic": "Sports", "difficulty": "hard", "question": "What term describes a football club winning six trophies in a single season, an extremely rare feat achieved by Barcelona in 2009 and 2015?", "options": ["Super Treble", "Continental Sweep", "Grand Slam", "Sextuple"], "answer": 3 },
  { "id": "sp_h14", "topic": "Sports", "difficulty": "hard", "question": "Which club achieved a rare football sextuple (six trophies in one season) in both 2009 and 2015?", "options": ["Barcelona", "Real Madrid", "Bayern Munich", "Manchester City"], "answer": 0 },
  { "id": "sp_h15", "topic": "Sports", "difficulty": "hard", "question": "What is the tennis term for winning all four Grand Slam tournaments in the same calendar year?", "options": ["Golden Slam", "Calendar Grand Slam", "Triple Crown", "Career Grand Slam"], "answer": 1 },
  { "id": "sp_h16", "topic": "Sports", "difficulty": "hard", "question": "Who was the last man to complete a tennis Calendar Grand Slam, achieving the feat in 1969?", "options": ["Rod Laver", "Roy Emerson", "Don Budge", "Bjorn Borg"], "answer": 0 },
  { "id": "sp_h17", "topic": "Sports", "difficulty": "hard", "question": "Which woman completed a tennis Calendar Grand Slam in 1988, also winning Olympic gold that year to complete a \"Golden Slam\"?", "options": ["Martina Navratilova", "Chris Evert", "Steffi Graf", "Margaret Court"], "answer": 2 },
  { "id": "sp_h18", "topic": "Sports", "difficulty": "hard", "question": "What tennis term describes winning all four Grand Slams plus Olympic gold in the same calendar year, achieved only once in history?", "options": ["Golden Slam", "Calendar Grand Slam", "Super Slam", "Career Slam"], "answer": 0 },
  { "id": "sp_h19", "topic": "Sports", "difficulty": "hard", "question": "Which cricketer scored the fastest century in Test match history, off just 54 balls?", "options": ["Viv Richards", "Shahid Afridi", "Brendon McCullum", "Misbah -ul-Haq"], "answer": 2 },
  { "id": "sp_h20", "topic": "Sports", "difficulty": "hard", "question": "What was the top division of English football called before its 1992 rebranding as the Premier League?", "options": ["First Division", "Football League Championship", "Division One", "Super League"], "answer": 0 },
  { "id": "sp_h21", "topic": "Sports", "difficulty": "hard", "question": "Which club won the very first Premier League title, in the 1992 -93 season?", "options": ["Leeds United", "Blackburn Rovers", "Arsenal", "Manchester United"], "answer": 3 },
  { "id": "sp_h22", "topic": "Sports", "difficulty": "hard", "question": "Which player holds the record for most goals scored in a single UEFA Champions League season, with 17 in 2013 -14?", "options": ["Robert Lewandowski", "Erling Haaland", "Cristiano Ronaldo", "Lionel Messi"], "answer": 2 },
  { "id": "sp_h23", "topic": "Sports", "difficulty": "hard", "question": "Which country has won the most Olympic gold medals in field hockey?", "options": ["Pakistan", "Netherlands", "India", "Australia"], "answer": 2 },
  { "id": "sp_h24", "topic": "Sports", "difficulty": "hard", "question": "What is the term for a batsman scoring a century before lunch on the first day of a Test match, an extremely rare feat?", "options": ["Session century", "Morning ton", "Century before lunch", "Golden century"], "answer": 2 },
  { "id": "sp_h25", "topic": "Sports", "difficulty": "hard", "question": "Which cricketer famously scored a century before lunch on the first day of an Ashes Test in 1930, at Headingley?", "options": ["Wally Hammond", "Herbert Sutcliffe", "Don Bradman", "Jack Hobbs"], "answer": 2 },
  { "id": "sp_h26", "topic": "Sports", "difficulty": "hard", "question": "What golf term describes a player winning all four major championships over the course of their career, not necessarily in the same year?", "options": ["Calendar Grand Slam", "Career Grand Slam", "Grand Circuit", "Major Sweep"], "answer": 1 },
  { "id": "sp_h27", "topic": "Sports", "difficulty": "hard", "question": "Which golfer has won the most major championships in men's golf history, with 18 titles?", "options": ["Tiger Woods", "Arnold Palmer", "Jack Nicklaus", "Gary Player"], "answer": 2 },
  { "id": "sp_h28", "topic": "Sports", "difficulty": "hard", "question": "Which club won the inaugural UEFA Europa League, after the competition was rebranded from the UEFA Cup, in 2009 -10?", "options": ["Juventus", "Atletico Madrid", "Hamburg", "Fulham"], "answer": 1 },
  { "id": "sp_h29", "topic": "Sports", "difficulty": "hard", "question": "Which country hosted and won the first -ever Rugby World Cup in 1987, co -hosting the tournament with Australia?", "options": ["South Africa", "Australia", "New Zealand", "England"], "answer": 2 },
  { "id": "sp_h30", "topic": "Sports", "difficulty": "hard", "question": "Which Indian cricketer holds the record for the highest individual score in a One Day International innings, with 264 runs?", "options": ["Virender Sehwag", "Rohit Sharma", "Ishan Kishan", "Sachin Tendulkar"], "answer": 1 },

  // ==========================================
  //  4. INTERNATIONAL — STEP 1: EASY
  // ==========================================
  { "id": "intl_e1", "topic": "International", "difficulty": "easy", "question": "What is the largest country in the world by land area?", "options": ["Russia", "Canada", "China", "United States"], "answer": 0 },
  { "id": "intl_e2", "topic": "International", "difficulty": "easy", "question": "What is the smallest country in the world by land area?", "options": ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], "answer": 2 },
  { "id": "intl_e3", "topic": "International", "difficulty": "easy", "question": "Which country has the largest population in the world?", "options": ["Indonesia", "India", "China", "United States"], "answer": 1 },
  { "id": "intl_e4", "topic": "International", "difficulty": "easy", "question": "What is the capital of France?", "options": ["Paris", "Lyon", "Nice", "Marseille"], "answer": 0 },
  { "id": "intl_e5", "topic": "International", "difficulty": "easy", "question": "What is the capital of Japan?", "options": ["Tokyo", "Kyoto", "Osaka", "Yokohama"], "answer": 0 },
  { "id": "intl_e6", "topic": "International", "difficulty": "easy", "question": "What is the capital of the United States?", "options": ["New York", "Los Angeles", "Washington, D.C.", "Chicago"], "answer": 2 },
  { "id": "intl_e7", "topic": "International", "difficulty": "easy", "question": "What is the largest continent by area?", "options": ["North America", "Asia", "Europe", "Africa"], "answer": 1 },
  { "id": "intl_e8", "topic": "International", "difficulty": "easy", "question": "What is the smallest continent by land area?", "options": ["Antarctica", "Australia", "Europe", "South America"], "answer": 1 },
  { "id": "intl_e9", "topic": "International", "difficulty": "easy", "question": "Which river is traditionally cited as the longest in the world?", "options": ["Yangtze", "Mississippi", "Amazon", "Nile"], "answer": 3 },
  { "id": "intl_e10", "topic": "International", "difficulty": "easy", "question": "What is the tallest mountain in the world?", "options": ["Mount Everest", "Kangchenjunga", "Denali", "K2"], "answer": 0 },
  { "id": "intl_e11", "topic": "International", "difficulty": "easy", "question": "Which country is known as the \"Land of the Rising Sun\"?", "options": ["South Korea", "Japan", "Thailand", "China"], "answer": 1 },
  { "id": "intl_e12", "topic": "International", "difficulty": "easy", "question": "What is the capital of the United Kingdom?", "options": ["London", "Birmingham", "Edinburgh", "Manchester"], "answer": 0 },
  { "id": "intl_e13", "topic": "International", "difficulty": "easy", "question": "Which desert is the largest hot desert in the world?", "options": ["Kalahari Desert", "Arabian Desert", "Gobi Desert", "Sahara Desert"], "answer": 3 },
  { "id": "intl_e14", "topic": "International", "difficulty": "easy", "question": "What is the official currency of the United States?", "options": ["US Dollar", "Euro", "Pound Sterling", "Canadian Dollar"], "answer": 0 },
  { "id": "intl_e15", "topic": "International", "difficulty": "easy", "question": "Which country gifted the Statue of Liberty to the United States?", "options": ["Spain", "France", "Netherlands", "United Kingdom"], "answer": 1 },
  { "id": "intl_e16", "topic": "International", "difficulty": "easy", "question": "What is the name of the international organization, headquartered in New York, that promotes peace among nations?", "options": ["European Union", "World Bank", "United Nations", "NATO"], "answer": 2 },
  { "id": "intl_e17", "topic": "International", "difficulty": "easy", "question": "Which country is home to the Great Wall?", "options": ["South Korea", "Japan", "China", "Mongolia"], "answer": 2 },
  { "id": "intl_e18", "topic": "International", "difficulty": "easy", "question": "What is the capital of Germany?", "options": ["Hamburg", "Frankfurt", "Berlin", "Munich"], "answer": 2 },
  { "id": "intl_e19", "topic": "International", "difficulty": "easy", "question": "What is the capital of Italy?", "options": ["Venice", "Rome", "Milan", "Naples"], "answer": 1 },
  { "id": "intl_e20", "topic": "International", "difficulty": "easy", "question": "What is the capital of Spain?", "options": ["Seville", "Madrid", "Barcelona", "Valencia"], "answer": 1 },
  { "id": "intl_e21", "topic": "International", "difficulty": "easy", "question": "What is the capital of Russia?", "options": ["Novosibirsk", "St. Petersburg", "Kazan", "Moscow"], "answer": 3 },
  { "id": "intl_e22", "topic": "International", "difficulty": "easy", "question": "What is the capital of China?", "options": ["Guangzhou", "Hong Kong", "Beijing", "Shanghai"], "answer": 2 },
  { "id": "intl_e23", "topic": "International", "difficulty": "easy", "question": "What is the capital of Egypt?", "options": ["Giza", "Luxor", "Alexandria", "Cairo"], "answer": 3 },
  { "id": "intl_e24", "topic": "International", "difficulty": "easy", "question": "What is the capital of Mexico?", "options": ["Guadalajara", "Monterrey", "Mexico City", "Cancun"], "answer": 2 },
  { "id": "intl_e25", "topic": "International", "difficulty": "easy", "question": "What is the capital of Turkey?", "options": ["Ankara", "Izmir", "Antalya", "Istanbul"], "answer": 0 },
  { "id": "intl_e26", "topic": "International", "difficulty": "easy", "question": "What is the capital of Saudi Arabia?", "options": ["Mecca", "Jeddah", "Medina", "Riyadh"], "answer": 3 },
  { "id": "intl_e27", "topic": "International", "difficulty": "easy", "question": "What is the capital of Indonesia?", "options": ["Bali", "Bandung", "Surabaya", "Jakarta"], "answer": 3 },
  { "id": "intl_e28", "topic": "International", "difficulty": "easy", "question": "What is the capital of Thailand?", "options": ["Bangkok", "Chiang Mai", "Pattaya", "Phuket"], "answer": 0 },
  { "id": "intl_e29", "topic": "International", "difficulty": "easy", "question": "What is the capital of Vietnam?", "options": ["Hue", "Ho Chi Minh City", "Da Nang", "Hanoi"], "answer": 3 },
  { "id": "intl_e30", "topic": "International", "difficulty": "easy", "question": "What is the capital of the Philippines?", "options": ["Manila", "Quezon City", "Davao City", "Cebu City"], "answer": 0 },
  { "id": "intl_e31", "topic": "International", "difficulty": "easy", "question": "What is the capital of Malaysia?", "options": ["Malacca", "Kuala Lumpur", "Johor Bahru", "Penang"], "answer": 1 },
  { "id": "intl_e32", "topic": "International", "difficulty": "easy", "question": "What is the capital of the city -state of Singapore?", "options": ["Sentosa", "Changi", "Singapore", "Jurong"], "answer": 2 },
  { "id": "intl_e33", "topic": "International", "difficulty": "easy", "question": "What is the capital of Nigeria?", "options": ["Kano", "Abuja", "Lagos", "Ibadan"], "answer": 1 },
  { "id": "intl_e34", "topic": "International", "difficulty": "easy", "question": "What is the capital of Kenya?", "options": ["Nairobi", "Kisumu", "Mombasa", "Nakuru"], "answer": 0 },
  { "id": "intl_e35", "topic": "International", "difficulty": "easy", "question": "What is the capital of Argentina?", "options": ["Rosario", "Mendoza", "Cordoba", "Buenos Aires"], "answer": 3 },
  { "id": "intl_e36", "topic": "International", "difficulty": "easy", "question": "What is the capital of Chile?", "options": ["Valparaiso", "Antofagasta", "Santiago", "Concepcion"], "answer": 2 },
  { "id": "intl_e37", "topic": "International", "difficulty": "easy", "question": "What is the capital of Sweden?", "options": ["Gothenburg", "Uppsala", "Stockholm", "Malmo"], "answer": 2 },

  // ==========================================
  //  4. INTERNATIONAL — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "intl_em1", "topic": "International", "difficulty": "easy-medium", "question": "What is the capital of Australia?", "options": ["Canberra", "Sydney", "Brisbane", "Melbourne"], "answer": 0 },
  { "id": "intl_em2", "topic": "International", "difficulty": "easy-medium", "question": "What is the capital of Canada?", "options": ["Ottawa", "Montreal", "Vancouver", "Toronto"], "answer": 0 },
  { "id": "intl_em3", "topic": "International", "difficulty": "easy-medium", "question": "What is the capital of Brazil?", "options": ["Rio de Janeiro", "Brasilia", "Sao Paulo", "Salvador"], "answer": 1 },
  { "id": "intl_em4", "topic": "International", "difficulty": "easy-medium", "question": "Which international organization, headquartered in Geneva, focuses on global public health?", "options": ["Red Cross", "UNESCO", "World Health Organization", "UNICEF"], "answer": 2 },
  { "id": "intl_em5", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the currency used by most European Union member countries?", "options": ["Franc", "Mark", "Pound", "Euro"], "answer": 3 },
  { "id": "intl_em6", "topic": "International", "difficulty": "easy-medium", "question": "Which country has the most time zones in the world, due to its overseas territories?", "options": ["Russia", "United States", "United Kingdom", "France"], "answer": 3 },
  { "id": "intl_em7", "topic": "International", "difficulty": "easy-medium", "question": "Which strait separates Europe and Africa at its narrowest point?", "options": ["Strait of Gibraltar", "Bering Strait", "Bosphorus Strait", "Strait of Hormuz"], "answer": 0 },
  { "id": "intl_em8", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the economic and political union of European countries?", "options": ["Schengen Area", "European Union", "Commonwealth", "Eurozone"], "answer": 1 },
  { "id": "intl_em9", "topic": "International", "difficulty": "easy-medium", "question": "Which country's largest city, Istanbul, is famously split between Europe and Asia?", "options": ["Turkey", "Russia", "Georgia", "Greece"], "answer": 0 },
  { "id": "intl_em10", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the famous ancient wonder located in Giza, Egypt?", "options": ["The Lighthouse of Alexandria", "The Sphinx", "The Hanging Gardens", "The Great Pyramid of Giza"], "answer": 3 },
  { "id": "intl_em11", "topic": "International", "difficulty": "easy-medium", "question": "Which South American country is named after independence leader Simon Bolivar?", "options": ["Ecuador", "Colombia", "Bolivia", "Venezuela"], "answer": 2 },
  { "id": "intl_em12", "topic": "International", "difficulty": "easy-medium", "question": "What is the official language of Brazil?", "options": ["Portuguese", "French", "Spanish", "Italian"], "answer": 0 },
  { "id": "intl_em13", "topic": "International", "difficulty": "easy-medium", "question": "Which African country was formerly known as Abyssinia?", "options": ["Somalia", "Ethiopia", "Eritrea", "Sudan"], "answer": 1 },
  { "id": "intl_em14", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the wall that divided a European capital during the Cold War, torn down in 1989?", "options": ["Berlin Wall", "Iron Curtain", "Maginot Line", "Great Wall"], "answer": 0 },
  { "id": "intl_em15", "topic": "International", "difficulty": "easy-medium", "question": "Which two countries share the longest international land border in the world?", "options": ["United States and Canada", "Russia and China", "India and China", "Brazil and Argentina"], "answer": 0 },
  { "id": "intl_em16", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the UN's specialized agency responsible for education, science, and culture?", "options": ["UNDP", "UNICEF", "WHO", "UNESCO"], "answer": 3 },
  { "id": "intl_em17", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the canal, opened in 1869, that connects the Mediterranean Sea to the Red Sea?", "options": ["Corinth Canal", "Kiel Canal", "Panama Canal", "Suez Canal"], "answer": 3 },
  { "id": "intl_em18", "topic": "International", "difficulty": "easy-medium", "question": "What is the largest ocean on Earth?", "options": ["Arctic Ocean", "Pacific Ocean", "Atlantic Ocean", "Indian Ocean"], "answer": 1 },
  { "id": "intl_em19", "topic": "International", "difficulty": "easy-medium", "question": "What is the smallest ocean on Earth?", "options": ["Atlantic Ocean", "Southern Ocean", "Indian Ocean", "Arctic Ocean"], "answer": 3 },
  { "id": "intl_em20", "topic": "International", "difficulty": "easy-medium", "question": "Which two continents does the Isthmus of Panama connect?", "options": ["North America and South America", "North America and Asia", "Africa and Asia", "Europe and Asia"], "answer": 0 },
  { "id": "intl_em21", "topic": "International", "difficulty": "easy-medium", "question": "What is the longest river in South America?", "options": ["Amazon River", "Sao Francisco River", "Orinoco River", "Parana River"], "answer": 0 },
  { "id": "intl_em22", "topic": "International", "difficulty": "easy-medium", "question": "What is the largest lake in Africa by surface area?", "options": ["Lake Chad", "Lake Victoria", "Lake Tanganyika", "Lake Malawi"], "answer": 1 },
  { "id": "intl_em23", "topic": "International", "difficulty": "easy-medium", "question": "Which mountain range runs along the western edge of South America?", "options": ["The Andes", "The Rockies", "The Atlas Mountains", "The Alps"], "answer": 0 },
  { "id": "intl_em24", "topic": "International", "difficulty": "easy-medium", "question": "What is the highest mountain in Africa?", "options": ["Mount Kenya", "Mount Kilimanjaro", "Mount Meru", "Mount Stanley"], "answer": 1 },
  { "id": "intl_em25", "topic": "International", "difficulty": "easy-medium", "question": "What is the highest mountain in North America?", "options": ["Pikes Peak", "Mount Whitney", "Mount Logan", "Denali"], "answer": 3 },
  { "id": "intl_em26", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the international organization of Portuguese -speaking countries?", "options": ["Lusophone Union", "Community of Portuguese Language Countries", "Atlantic Charter Group", "Iberian Alliance"], "answer": 1 },
  { "id": "intl_em27", "topic": "International", "difficulty": "easy-medium", "question": "Excluding Russia, which country is the largest by land area entirely within Europe?", "options": ["Spain", "France", "Germany", "Ukraine"], "answer": 3 },
  { "id": "intl_em28", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the mountain range separating Spain from France?", "options": ["The Alps", "The Apennines", "The Cantabrian Mountains", "The Pyrenees"], "answer": 3 },
  { "id": "intl_em29", "topic": "International", "difficulty": "easy-medium", "question": "What is the world's largest island, excluding continental landmasses?", "options": ["Greenland", "Madagascar", "Borneo", "New Guinea"], "answer": 0 },
  { "id": "intl_em30", "topic": "International", "difficulty": "easy-medium", "question": "Which strait separates the Indonesian islands of Sumatra and Java?", "options": ["Lombok Strait", "Sunda Strait", "Strait of Malacca", "Makassar Strait"], "answer": 1 },
  { "id": "intl_em31", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the vast desert covering much of Mongolia and northern China?", "options": ["Gobi Desert", "Karakum Desert", "Thar Desert", "Taklamakan Desert"], "answer": 0 },
  { "id": "intl_em32", "topic": "International", "difficulty": "easy-medium", "question": "Which landlocked South American country lies alongside Bolivia?", "options": ["Paraguay", "Guyana", "Uruguay", "Ecuador"], "answer": 0 },
  { "id": "intl_em33", "topic": "International", "difficulty": "easy-medium", "question": "What is the seat of the European Union's main administrative institutions?", "options": ["Strasbourg", "The Hague", "Frankfurt", "Brussels"], "answer": 3 },
  { "id": "intl_em34", "topic": "International", "difficulty": "easy-medium", "question": "Which African country was formerly known as Rhodesia?", "options": ["Zimbabwe", "Botswana", "Zambia", "Malawi"], "answer": 0 },
  { "id": "intl_em35", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the currency used in Japan?", "options": ["Japanese Won", "Japanese Ringgit", "Japanese Yen", "Japanese Dollar"], "answer": 2 },
  { "id": "intl_em36", "topic": "International", "difficulty": "easy-medium", "question": "What is the name of the currency used in India?", "options": ["Indian Taka", "Indian Ringgit", "Indian Dinar", "Indian Rupee"], "answer": 3 },
  { "id": "intl_em37", "topic": "International", "difficulty": "easy-medium", "question": "Which country is the world's largest exporter of coffee?", "options": ["Brazil", "Colombia", "Vietnam", "Ethiopia"], "answer": 0 },

  // ==========================================
  //  4. INTERNATIONAL — STEP 3: MEDIUM
  // ==========================================
  { "id": "intl_m1", "topic": "International", "difficulty": "medium", "question": "Which country recognizes 11 official languages, including Zulu, Xhosa, and Afrikaans?", "options": ["India", "Kenya", "Nigeria", "South Africa"], "answer": 3 },
  { "id": "intl_m2", "topic": "International", "difficulty": "medium", "question": "What is the name of the world's largest coral reef system, located off Australia's coast?", "options": ["Belize Barrier Reef", "Red Sea Coral Reef", "Great Barrier Reef", "Coral Triangle"], "answer": 2 },
  { "id": "intl_m3", "topic": "International", "difficulty": "medium", "question": "Which strait separates Asia from North America?", "options": ["Strait of Malacca", "Davis Strait", "Bering Strait", "Cook Strait"], "answer": 2 },
  { "id": "intl_m4", "topic": "International", "difficulty": "medium", "question": "What is the capital of South Korea?", "options": ["Incheon", "Daegu", "Seoul", "Busan"], "answer": 2 },
  { "id": "intl_m5", "topic": "International", "difficulty": "medium", "question": "Which mountain range separates Europe from Asia within Russia?", "options": ["Ural Mountains", "Altai Mountains", "Carpathian Mountains", "Caucasus Mountains"], "answer": 0 },
  { "id": "intl_m6", "topic": "International", "difficulty": "medium", "question": "What is the name of the 1949 treaty organization for collective defense among North American and European countries?", "options": ["ANZUS", "Warsaw Pact", "SEATO", "NATO"], "answer": 3 },
  { "id": "intl_m7", "topic": "International", "difficulty": "medium", "question": "Which African country is the most populous?", "options": ["Ethiopia", "Nigeria", "South Africa", "Egypt"], "answer": 1 },
  { "id": "intl_m8", "topic": "International", "difficulty": "medium", "question": "What is the name of the largest cold desert in the world, covering most of the continent of Antarctica?", "options": ["Patagonian Desert", "Antarctic Desert", "Gobi Desert", "Arctic Desert"], "answer": 1 },
  { "id": "intl_m9", "topic": "International", "difficulty": "medium", "question": "Which country has the most natural lakes in the world?", "options": ["Finland", "Canada", "United States", "Russia"], "answer": 1 },
  { "id": "intl_m10", "topic": "International", "difficulty": "medium", "question": "What is the name of the group of European countries that use the Euro as their official currency?", "options": ["European Union", "Schengen Area", "European Economic Area", "Eurozone"], "answer": 3 },
  { "id": "intl_m11", "topic": "International", "difficulty": "medium", "question": "Which country is the only one to border both the Atlantic and Indian Oceans on the African continent?", "options": ["Namibia", "South Africa", "Kenya", "Mozambique"], "answer": 1 },
  { "id": "intl_m12", "topic": "International", "difficulty": "medium", "question": "What is the name of the imaginary line at 0 degrees longitude that passes through Greenwich, England?", "options": ["Prime Meridian", "Equator", "International Date Line", "Tropic of Cancer"], "answer": 0 },
  { "id": "intl_m13", "topic": "International", "difficulty": "medium", "question": "Which country has more pyramids than Egypt?", "options": ["Libya", "Sudan", "Mexico", "Peru"], "answer": 1 },
  { "id": "intl_m14", "topic": "International", "difficulty": "medium", "question": "What is the smallest country in the world by population?", "options": ["Nauru", "Tuvalu", "San Marino", "Vatican City"], "answer": 3 },
  { "id": "intl_m15", "topic": "International", "difficulty": "medium", "question": "Which sea, bordering Jordan and Israel, is the saltiest large body of water in the world?", "options": ["Dead Sea", "Red Sea", "Caspian Sea", "Black Sea"], "answer": 0 },
  { "id": "intl_m16", "topic": "International", "difficulty": "medium", "question": "What is the name of the loose association of mostly former British colonies and territories, including India and Australia?", "options": ["ASEAN", "Commonwealth of Nations", "European Union", "African Union"], "answer": 1 },
  { "id": "intl_m17", "topic": "International", "difficulty": "medium", "question": "Which two Central American oceans does Panama connect via its famous canal?", "options": ["Atlantic and Indian", "Pacific and Atlantic", "Arctic and Pacific", "Pacific and Indian"], "answer": 1 },
  { "id": "intl_m18", "topic": "International", "difficulty": "medium", "question": "Which strait separates the Korean Peninsula from Japan?", "options": ["Korea Strait", "Taiwan Strait", "Tsugaru Strait", "Tatar Strait"], "answer": 0 },
  { "id": "intl_m19", "topic": "International", "difficulty": "medium", "question": "What is the name of the sea that lies between Australia and Papua New Guinea?", "options": ["Timor Sea", "Coral Sea", "Arafura Sea", "Tasman Sea"], "answer": 1 },
  { "id": "intl_m20", "topic": "International", "difficulty": "medium", "question": "Which country has the most active volcanoes in the world?", "options": ["United States", "Indonesia", "Philippines", "Japan"], "answer": 1 },
  { "id": "intl_m21", "topic": "International", "difficulty": "medium", "question": "What is the term for the imaginary line marking 0 degrees latitude?", "options": ["Prime Meridian", "Arctic Circle", "Tropic of Cancer", "Equator"], "answer": 3 },
  { "id": "intl_m22", "topic": "International", "difficulty": "medium", "question": "What is the name of the imaginary line, roughly following 180 degrees longitude, where the calendar date changes?", "options": ["Prime Meridian", "Equator", "International Date Line", "Tropic of Capricorn"], "answer": 2 },
  { "id": "intl_m23", "topic": "International", "difficulty": "medium", "question": "What is the name of the UN agency responsible for setting global civil aviation standards?", "options": ["International Maritime Organization", "International Civil Aviation Organization", "International Telecommunication Union", "World Meteorological Organization"], "answer": 1 },
  { "id": "intl_m24", "topic": "International", "difficulty": "medium", "question": "What is the name of the UN agency responsible for coordinating global postal policy?", "options": ["Universal Postal Union", "International Postal Council", "Global Post Union", "World Mail Organization"], "answer": 0 },
  { "id": "intl_m25", "topic": "International", "difficulty": "medium", "question": "Which country hosts the headquarters of the International Atomic Energy Agency?", "options": ["France", "Belgium", "Switzerland", "Austria"], "answer": 3 },
  { "id": "intl_m26", "topic": "International", "difficulty": "medium", "question": "What is the name of the international organization of Arabic -speaking countries, founded in 1945?", "options": ["Maghreb Union", "Gulf Cooperation Council", "Arab League", "Organisation of Islamic Cooperation"], "answer": 2 },
  { "id": "intl_m27", "topic": "International", "difficulty": "medium", "question": "Which international organization, headquartered in Paris, promotes economic cooperation among mostly developed nations?", "options": ["World Trade Organization", "World Bank", "International Monetary Fund", "Organisation for Economic Co -operation and Development"], "answer": 3 },
  { "id": "intl_m28", "topic": "International", "difficulty": "medium", "question": "What is the name of the South American trade bloc that includes Brazil and Argentina?", "options": ["Pacific Alliance", "CARICOM", "Mercosur", "Andean Community"], "answer": 2 },
  { "id": "intl_m29", "topic": "International", "difficulty": "medium", "question": "Which country is the world's largest producer of rice?", "options": ["India", "Indonesia", "Vietnam", "China"], "answer": 3 },
  { "id": "intl_m30", "topic": "International", "difficulty": "medium", "question": "Which country is the world's largest producer of wheat?", "options": ["United States", "India", "Russia", "China"], "answer": 3 },
  { "id": "intl_m31", "topic": "International", "difficulty": "medium", "question": "What is the name of the world's largest freshwater lake by volume, located in Russia?", "options": ["Lake Baikal", "Lake Tanganyika", "Caspian Sea", "Lake Superior"], "answer": 0 },
  { "id": "intl_m32", "topic": "International", "difficulty": "medium", "question": "What is the name of the tectonic plate boundary that runs through Iceland, visible above sea level?", "options": ["East African Rift", "San Andreas Fault", "Ring of Fire", "Mid -Atlantic Ridge"], "answer": 3 },
  { "id": "intl_m33", "topic": "International", "difficulty": "medium", "question": "Which Pacific island nation is the only country to span all four hemispheres?", "options": ["Nauru", "Kiribati", "Fiji", "Tuvalu"], "answer": 1 },
  { "id": "intl_m34", "topic": "International", "difficulty": "medium", "question": "What is the name of the group of seven major advanced economies that meet annually to discuss global issues?", "options": ["G7", "BRICS", "G20", "OECD"], "answer": 0 },
  { "id": "intl_m35", "topic": "International", "difficulty": "medium", "question": "What is the name of the group of 20 major economies, including both advanced and emerging nations?", "options": ["G7", "APEC", "BRICS", "G20"], "answer": 3 },
  { "id": "intl_m36", "topic": "International", "difficulty": "medium", "question": "Which country has the longest coastline in the world?", "options": ["Canada", "Russia", "Australia", "Indonesia"], "answer": 0 },
  { "id": "intl_m37", "topic": "International", "difficulty": "medium", "question": "What is the name of the 1968 international treaty aimed at preventing the spread of nuclear weapons?", "options": ["Strategic Arms Limitation Treaty", "Treaty on the Non -Proliferation of Nuclear Weapons", "Comprehensive Test Ban Treaty", "Partial Test Ban Treaty"], "answer": 1 },

  // ==========================================
  //  4. INTERNATIONAL — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "intl_mh1", "topic": "International", "difficulty": "medium-hard", "question": "What is the name of the 1648 series of treaties that ended the Thirty Years' War and established the modern concept of state sovereignty?", "options": ["Treaty of Versailles", "Peace of Westphalia", "Treaty of Utrecht", "Congress of Vienna"], "answer": 1 },
  { "id": "intl_mh2", "topic": "International", "difficulty": "medium-hard", "question": "Which international court, based in The Hague, handles legal disputes between states?", "options": ["International Court of Justice", "International Criminal Court", "Permanent Court of Arbitration", "European Court of Human Rights"], "answer": 0 },
  { "id": "intl_mh3", "topic": "International", "difficulty": "medium-hard", "question": "What is the name of the 1944 conference that established the World Bank and International Monetary Fund?", "options": ["Paris Peace Conference", "Bretton Woods Conference", "Yalta Conference", "Potsdam Conference"], "answer": 1 },
  { "id": "intl_mh4", "topic": "International", "difficulty": "medium-hard", "question": "Which country was formerly known as Persia?", "options": ["Iraq", "Iran", "Afghanistan", "Turkey"], "answer": 1 },
  { "id": "intl_mh5", "topic": "International", "difficulty": "medium-hard", "question": "What is the name of the European area allowing passport -free travel across most member countries?", "options": ["European Economic Area", "Eurozone", "Schengen Area", "European Union"], "answer": 2 },
  { "id": "intl_mh6", "topic": "International", "difficulty": "medium-hard", "question": "Which African country famously has three capital cities: Pretoria, Cape Town, and Bloemfontein?", "options": ["Ivory Coast", "Bolivia", "Tanzania", "South Africa"], "answer": 3 },
  { "id": "intl_mh7", "topic": "International", "difficulty": "medium-hard", "question": "What is the name of the organization of oil -producing countries that coordinates global petroleum policy?", "options": ["WTO", "G7", "OPEC", "IEA"], "answer": 2 },
  { "id": "intl_mh8", "topic": "International", "difficulty": "medium-hard", "question": "Which strait, a critical global shipping route, separates the Arabian Peninsula from Iran?", "options": ["Strait of Gibraltar", "Bab -el-Mandeb", "Strait of Malacca", "Strait of Hormuz"], "answer": 3 },
  { "id": "intl_mh9", "topic": "International", "difficulty": "medium-hard", "question": "What is the name of the world's largest archipelago nation by number of islands?", "options": ["Philippines", "Japan", "Indonesia", "Maldives"], "answer": 2 },
  { "id": "intl_mh10", "topic": "International", "difficulty": "medium-hard", "question": "Which small landlocked country is completely surrounded by the territory of South Africa?", "options": ["Lesotho", "Eswatini", "Namibia", "Botswana"], "answer": 0 },
  { "id": "intl_mh11", "topic": "International", "difficulty": "medium-hard", "question": "What is the general term for a country that is landlocked entirely within the territory of just one other country?", "options": ["Territory", "Dominion", "Enclaved country", "Protectorate"], "answer": 2 },
  { "id": "intl_mh12", "topic": "International", "difficulty": "medium-hard", "question": "Which two countries fought the brief 1969 \"Football War,\" partly triggered by tensions during World Cup qualifying matches?", "options": ["El Salvador and Honduras", "Chile and Bolivia", "Peru and Ecuador", "Nicaragua and Costa Rica"], "answer": 0 },
  { "id": "intl_mh13", "topic": "International", "difficulty": "medium-hard", "question": "What is the name of the heavily fortified buffer zone separating North and South Korea?", "options": ["38th Parallel Line", "Panmunjom Line", "Korean Demilitarized Zone", "Yalu River Line"], "answer": 2 },
  { "id": "intl_mh14", "topic": "International", "difficulty": "medium-hard", "question": "Which 2015 international agreement aims to limit global warming and reduce greenhouse gas emissions?", "options": ["Paris Agreement", "Kyoto Protocol", "Copenhagen Accord", "Montreal Protocol"], "answer": 0 },
  { "id": "intl_mh15", "topic": "International", "difficulty": "medium-hard", "question": "Which former colonial power's colonies and territories are grouped under the term \"Francophonie\"?", "options": ["Portugal", "Belgium", "France", "Spain"], "answer": 2 },
  { "id": "intl_mh16", "topic": "International", "difficulty": "medium-hard", "question": "Which mountain range contains K2, the world's second -highest peak?", "options": ["Hindu Kush", "Himalayas", "Pamir Mountains", "Karakoram Range"], "answer": 3 },
  { "id": "intl_mh17", "topic": "International", "difficulty": "medium-hard", "question": "Which Central American country is bordered by both the Pacific Ocean and the Caribbean Sea, and is home to a famous inter -oceanic canal?", "options": ["Panama", "Costa Rica", "Nicaragua", "Colombia"], "answer": 0 },

  // ==========================================
  //  4. INTERNATIONAL — STEP 5: HARD
  // ==========================================
  { "id": "intl_h1", "topic": "International", "difficulty": "hard", "question": "What is the name of the 1884 -85 conference in which European powers formalized the colonial partition of Africa?", "options": ["Congress of Vienna", "Berlin Conference", "Bandung Conference", "Treaty of Versailles"], "answer": 1 },
  { "id": "intl_h2", "topic": "International", "difficulty": "hard", "question": "Which 1494 treaty divided newly discovered lands outside Europe between Spain and Portugal?", "options": ["Treaty of Utrecht", "Treaty of Paris", "Treaty of Zaragoza", "Treaty of Tordesillas"], "answer": 3 },
  { "id": "intl_h3", "topic": "International", "difficulty": "hard", "question": "What is the name of the 1823 doctrine opposing further European colonization in the Americas, associated with a US President?", "options": ["Monroe Doctrine", "Truman Doctrine", "Roosevelt Corollary", "Eisenhower Doctrine"], "answer": 0 },
  { "id": "intl_h4", "topic": "International", "difficulty": "hard", "question": "What is the name of the strait, controlled largely by Denmark and Sweden, connecting the Baltic Sea to the North Sea?", "options": ["Skagerrak", "Oresund Strait", "Strait of Dover", "Bosphorus"], "answer": 1 },
  { "id": "intl_h5", "topic": "International", "difficulty": "hard", "question": "Which 1919 treaty formally ended World War I and imposed heavy reparations on Germany?", "options": ["Treaty of Trianon", "Treaty of Sevres", "Treaty of Versailles", "Treaty of Saint -Germain"], "answer": 2 },
  { "id": "intl_h6", "topic": "International", "difficulty": "hard", "question": "What was the name of the international body, precursor to the United Nations, established after World War I to maintain world peace?", "options": ["League of Nations", "Concert of Europe", "World Council", "International Federation"], "answer": 0 },
  { "id": "intl_h7", "topic": "International", "difficulty": "hard", "question": "Which European microstate uses the Swiss Franc as its official currency despite not being part of Switzerland?", "options": ["San Marino", "Andorra", "Monaco", "Liechtenstein"], "answer": 3 },
  { "id": "intl_h8", "topic": "International", "difficulty": "hard", "question": "What is the name of the 1955 conference of Asian and African states that gave rise to the Non -Aligned Movement?", "options": ["Berlin Conference", "Bandung Conference", "Geneva Conference", "Yalta Conference"], "answer": 1 },
  { "id": "intl_h9", "topic": "International", "difficulty": "hard", "question": "Which large body of saltwater, technically a lake, is the largest inland body of water in the world by area?", "options": ["Lake Victoria", "Aral Sea", "Caspian Sea", "Lake Superior"], "answer": 2 },
  { "id": "intl_h10", "topic": "International", "difficulty": "hard", "question": "What is the name of the disputed Himalayan territory whose status has caused ongoing conflict between India and Pakistan since 1947?", "options": ["Kashmir", "Ladakh", "Punjab", "Sindh"], "answer": 0 },
  { "id": "intl_h11", "topic": "International", "difficulty": "hard", "question": "Which international organization, established in 1967, promotes economic and political cooperation among Southeast Asian nations?", "options": ["APEC", "Pacific Alliance", "ASEAN", "SAARC"], "answer": 2 },
  { "id": "intl_h12", "topic": "International", "difficulty": "hard", "question": "Which African country was never formally colonized by a European power, aside from a brief Italian occupation?", "options": ["Liberia", "Thailand", "Nepal", "Ethiopia"], "answer": 3 },
  { "id": "intl_h13", "topic": "International", "difficulty": "hard", "question": "What is the name of the ocean current system that significantly warms Western Europe's climate, originating near the Gulf of Mexico?", "options": ["Gulf Stream", "Labrador Current", "Kuroshio Current", "Humboldt Current"], "answer": 0 },
  { "id": "intl_h14", "topic": "International", "difficulty": "hard", "question": "Which landlocked Central Asian country is the largest landlocked country in the world by area?", "options": ["Kazakhstan", "Mongolia", "Uzbekistan", "Afghanistan"], "answer": 0 },
  { "id": "intl_h15", "topic": "International", "difficulty": "hard", "question": "What is the name of the 1990s trade agreement that created a free trade area among the US, Canada, and Mexico, later replaced by the USMCA?", "options": ["Mercosur", "NAFTA", "CAFTA", "TPP"], "answer": 1 },
  { "id": "intl_h16", "topic": "International", "difficulty": "hard", "question": "Which Pacific island nation skipped December 30, 2011, entirely in order to switch which side of the International Date Line it was on?", "options": ["Samoa", "Fiji", "Kiribati", "Tonga"], "answer": 0 },
  { "id": "intl_h17", "topic": "International", "difficulty": "hard", "question": "What is the name of the 1943 conference among Allied leaders Roosevelt, Churchill, and Stalin, held in Iran, that helped plan the D -Day invasion?", "options": ["Tehran Conference", "Potsdam Conference", "Casablanca Conference", "Yalta Conference"], "answer": 0 },

  // ==========================================
  //  5. RECENT AFFAIRS — STEP 1: EASY
  // ==========================================
  { "id": "ra_e1", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which country hosted the 2026 Winter Olympics?", "options": ["Italy", "France", "Austria", "Switzerland"], "answer": 0 },
  { "id": "ra_e2", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which cricket team won the 2026 ICC Men's T20 World Cup?", "options": ["Pakistan", "India", "New Zealand", "Australia"], "answer": 1 },
  { "id": "ra_e3", "topic": "Recent Affairs", "difficulty": "easy", "question": "Who became Bangladesh's Prime Minister in February 2026?", "options": ["Khaleda Zia", "Tarique Rahman", "Sheikh Hasina", "Muhammad Yunus"], "answer": 1 },
  { "id": "ra_e4", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which K -pop group reunited in 2025 after completing mandatory military service?", "options": ["BTS", "Blackpink", "EXO", "Seventeen"], "answer": 0 },
  { "id": "ra_e5", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which film won Best Picture at the 2026 Academy Awards?", "options": ["Barbie", "Sinners", "Oppenheimer", "One Battle After Another"], "answer": 3 },
  { "id": "ra_e6", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which Bangladeshi political party won the February 2026 general election?", "options": ["Awami League", "Bangladesh Nationalist Party", "Jatiya Party", "Jamaat -e-Islami"], "answer": 1 },
  { "id": "ra_e7", "topic": "Recent Affairs", "difficulty": "easy", "question": "Who won the 2025 Nobel Peace Prize?", "options": ["Narges Mohammadi", "Volodymyr Zelenskyy", "Malala Yousafzai", "Maria Corina Machado"], "answer": 3 },
  { "id": "ra_e8", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which NASA mission sent astronauts around the Moon in 2026 for the first time since 1972?", "options": ["Artemis II", "Orion I", "Apollo 18", "Artemis I"], "answer": 0 },
  { "id": "ra_e9", "topic": "Recent Affairs", "difficulty": "easy", "question": "Who preceded Tarique Rahman as the leader governing Bangladesh, as head of the interim government?", "options": ["Khaleda Zia", "Muhammad Yunus", "Ziaur Rahman", "Sheikh Hasina"], "answer": 1 },
  { "id": "ra_e10", "topic": "Recent Affairs", "difficulty": "easy", "question": "In which two Italian cities were the 2026 Winter Olympics held?", "options": ["Rome and Turin", "Naples and Milan", "Venice and Florence", "Milan and Cortina d'Ampezzo"], "answer": 3 },
  { "id": "ra_e11", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which country's cricket team did India defeat to win the 2026 T20 World Cup final?", "options": ["Pakistan", "South Africa", "New Zealand", "Australia"], "answer": 2 },
  { "id": "ra_e12", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which cricketer was named Player of the Match in the 2026 T20 World Cup final?", "options": ["Rohit Sharma", "Jasprit Bumrah", "Virat Kohli", "Sanju Samson"], "answer": 1 },
  { "id": "ra_e13", "topic": "Recent Affairs", "difficulty": "easy", "question": "What are the names of the 2026 Winter Olympics mascots, a pair of stoats?", "options": ["Miraitowa and Someity", "Tina and Milo", "Soohorang and Bandabi", "Wenlock and Mandeville"], "answer": 1 },
  { "id": "ra_e14", "topic": "Recent Affairs", "difficulty": "easy", "question": "Who won the 2025 Nobel Prize in Literature?", "options": ["Laszlo Krasznahorkai", "Han Kang", "Jon Fosse", "Annie Ernaux"], "answer": 0 },
  { "id": "ra_e15", "topic": "Recent Affairs", "difficulty": "easy", "question": "Bangladesh's February 2026 election was its first since which major event?", "options": ["World War II", "Partition", "The Liberation War", "The 2024 uprising that ousted Sheikh Hasina"], "answer": 3 },
  { "id": "ra_e16", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which country's national cricket team is nicknamed \"The Tigers\"?", "options": ["Bangladesh", "Pakistan", "Sri Lanka", "India"], "answer": 0 },
  { "id": "ra_e17", "topic": "Recent Affairs", "difficulty": "easy", "question": "Who became the first woman to serve as Archbishop of Canterbury, installed in March 2026?", "options": ["Sarah Mullally", "Theresa May", "Justin Welby", "Angela Merkel"], "answer": 0 },
  { "id": "ra_e18", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which company released the AI model GPT -5 in August 2025?", "options": ["Anthropic", "Google", "OpenAI", "Meta"], "answer": 2 },
  { "id": "ra_e19", "topic": "Recent Affairs", "difficulty": "easy", "question": "In which US city is the CES technology conference held every January?", "options": ["Las Vegas", "San Francisco", "Austin", "New York"], "answer": 0 },
  { "id": "ra_e20", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which company released its Gemini 3 AI model in November 2025?", "options": ["Google", "OpenAI", "Amazon", "Microsoft"], "answer": 0 },
  { "id": "ra_e21", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which country are the members of K -pop group BTS from?", "options": ["China", "Thailand", "South Korea", "Japan"], "answer": 2 },
  { "id": "ra_e22", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which UC Berkeley chemist shared the 2025 Nobel Prize in Chemistry for work on metal -organic frameworks?", "options": ["John Clarke", "Susumu Kitagawa", "Omar Yaghi", "Richard Robson"], "answer": 2 },
  { "id": "ra_e23", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which country is 2025 Nobel Peace Prize winner Maria Corina Machado from?", "options": ["Colombia", "Venezuela", "Peru", "Ecuador"], "answer": 1 },
  { "id": "ra_e24", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which Canadian astronaut was part of the four -person Artemis II Moon mission crew?", "options": ["Jeremy Hansen", "David Saint -Jacques", "Chris Hadfield", "Robert Thirsk"], "answer": 0 },
  { "id": "ra_e25", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which US space agency organized the Artemis II mission?", "options": ["NASA", "ESA", "CSA", "JAXA"], "answer": 0 },
  { "id": "ra_e26", "topic": "Recent Affairs", "difficulty": "easy", "question": "Who is the CEO of OpenAI, the company behind GPT -5 and ChatGPT?", "options": ["Satya Nadella", "Elon Musk", "Sam Altman", "Sundar Pichai"], "answer": 2 },
  { "id": "ra_e27", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which cricket board organizes matches in India and hosted the 2026 T20 World Cup?", "options": ["PCB", "BCCI", "ICC", "ECB"], "answer": 1 },
  { "id": "ra_e28", "topic": "Recent Affairs", "difficulty": "easy", "question": "What is the profession of Muhammad Yunus, who led Bangladesh's 2024 -2026 interim government?", "options": ["Physician", "Lawyer", "Economist", "Engineer"], "answer": 2 },
  { "id": "ra_e29", "topic": "Recent Affairs", "difficulty": "easy", "question": "Who is the leader of the K -pop group BTS?", "options": ["Jimin", "Suga", "Jin", "RM"], "answer": 3 },
  { "id": "ra_e30", "topic": "Recent Affairs", "difficulty": "easy", "question": "In which Italian region is Cortina d'Ampezzo located, one of the two host cities of the 2026 Winter Olympics?", "options": ["Veneto", "Lombardy", "Piedmont", "Tuscany"], "answer": 0 },
  { "id": "ra_e31", "topic": "Recent Affairs", "difficulty": "easy", "question": "What number parliamentary election was Bangladesh's February 2026 vote, according to the country's official count?", "options": ["15th", "11th", "13th", "10th"], "answer": 2 },
  { "id": "ra_e32", "topic": "Recent Affairs", "difficulty": "easy", "question": "How many total seats are in Bangladesh's national parliament, the Jatiya Sangsad?", "options": ["300", "250", "350", "400"], "answer": 2 },
  { "id": "ra_e33", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which company owns and publishes the video game \"Fortnite\"?", "options": ["Ubisoft", "Electronic Arts", "Epic Games", "Activision"], "answer": 2 },
  { "id": "ra_e34", "topic": "Recent Affairs", "difficulty": "easy", "question": "What is the name of the reusable spacecraft NASA uses for its Artemis Moon missions, sitting atop the SLS rocket?", "options": ["Gateway", "Orion", "Starliner", "Dragon"], "answer": 1 },
  { "id": "ra_e35", "topic": "Recent Affairs", "difficulty": "easy", "question": "What does \"SLS,\" the rocket used to launch Artemis missions, stand for?", "options": ["Stellar Lift System", "Solar Launch Ship", "Space Landing Shuttle", "Space Launch System"], "answer": 3 },
  { "id": "ra_e36", "topic": "Recent Affairs", "difficulty": "easy", "question": "What annual global economic forum, held in a Swiss ski resort town, brings together world leaders and business figures each January?", "options": ["World Economic Forum", "G7 Summit", "G20 Summit", "United Nations Assembly"], "answer": 0 },
  { "id": "ra_e37", "topic": "Recent Affairs", "difficulty": "easy", "question": "Which social media platform did Elon Musk rename to \"X\" after acquiring it?", "options": ["Facebook", "Tumblr", "Snapchat", "Twitter"], "answer": 3 },

  // ==========================================
  //  5. RECENT AFFAIRS — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "ra_em1", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "At which stadium was the 2026 T20 World Cup final played?", "options": ["Eden Gardens, Kolkata", "M. Chinnaswamy Stadium, Bangalore", "Wankhede Stadium, Mumbai", "Narendra Modi Stadium, Ahmedabad"], "answer": 3 },
  { "id": "ra_em2", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "By how many runs did India defeat New Zealand in the 2026 T20 World Cup final?", "options": ["96 runs", "50 runs", "120 runs", "75 runs"], "answer": 0 },
  { "id": "ra_em3", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Tarique Rahman is the son of Khaleda Zia and which former Bangladeshi president, who was assassinated?", "options": ["Hussain Muhammad Ershad", "Ziaur Rahman", "Abdur Rahman Biswas", "Iajuddin Ahmed"], "answer": 1 },
  { "id": "ra_em4", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Who won the 2025 Nobel Prize in Physics for work on quantum mechanical tunnelling?", "options": ["John Clarke, Michel Devoret, and John M. Martinis", "Joel Mokyr and colleagues", "Omar Yaghi and colleagues", "Mary Brunkow and colleagues"], "answer": 0 },
  { "id": "ra_em5", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which film received a record 16 Oscar nominations at the 2026 Academy Awards ceremony?", "options": ["One Battle After Another", "Wicked", "Dune: Part Two", "Sinners"], "answer": 3 },
  { "id": "ra_em6", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Who directed the Best Picture winner \"One Battle After Another\" at the 2026 Oscars?", "options": ["Ryan Coogler", "Christopher Nolan", "Denis Villeneuve", "Paul Thomas Anderson"], "answer": 3 },
  { "id": "ra_em7", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Who won Best Actor at the 2026 Academy Awards for his role in \"Sinners\"?", "options": ["Timothee Chalamet", "Denzel Washington", "Michael B. Jordan", "Leonardo DiCaprio"], "answer": 2 },
  { "id": "ra_em8", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "In which country did Tarique Rahman live for around 17 years before returning to Bangladesh in December 2025?", "options": ["United Arab Emirates", "United States", "United Kingdom", "Saudi Arabia"], "answer": 2 },
  { "id": "ra_em9", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Who is the President of Bangladesh who administered the oath of office to PM Tarique Rahman?", "options": ["Ziaur Rahman", "Abdul Hamid", "Zillur Rahman", "Mohammed Shahabuddin"], "answer": 3 },
  { "id": "ra_em10", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which sport made its Olympic debut at the 2026 Winter Olympics?", "options": ["Biathlon", "Curling", "Snowboarding", "Ski mountaineering"], "answer": 3 },
  { "id": "ra_em11", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Where was the Closing Ceremony of the 2026 Winter Olympics held?", "options": ["Arena di Verona", "San Siro Stadium, Milan", "Cortina Ice Stadium", "Colosseum, Rome"], "answer": 0 },
  { "id": "ra_em12", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which Indian batter was named Player of the Tournament at the 2026 T20 World Cup?", "options": ["Sanju Samson", "Suryakumar Yadav", "Virat Kohli", "Jasprit Bumrah"], "answer": 0 },
  { "id": "ra_em13", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "What kind of majority did the BNP secure in Bangladesh's February 2026 parliamentary election?", "options": ["A simple majority", "No majority", "A two -thirds majority", "A narrow one -seat majority"], "answer": 2 },
  { "id": "ra_em14", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Who won the 2025 Nobel Prize in Economic Sciences for explaining technology -driven growth?", "options": ["Maria Corina Machado", "John Clarke and colleagues", "Joel Mokyr, Philippe Aghion, and Peter Howitt", "Omar Yaghi and colleagues"], "answer": 2 },
  { "id": "ra_em15", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which country's astronaut, Jeremy Hansen, was part of the four -person Artemis II crew in 2026?", "options": ["United Kingdom", "Canada", "Australia", "Japan"], "answer": 1 },
  { "id": "ra_em16", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which party secured the second -highest number of seats in Bangladesh's 2026 election, behind the BNP?", "options": ["National Citizen Party", "Awami League", "Jatiya Party", "Jamaat -e-Islami"], "answer": 3 },
  { "id": "ra_em17", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Approximately how many seats did the BNP win in Bangladesh's February 2026 parliamentary election?", "options": ["150 seats", "209 seats", "250 seats", "180 seats"], "answer": 1 },
  { "id": "ra_em18", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Approximately what hallucination rate did OpenAI report for GPT -5, down from about 20% in GPT - 4o?", "options": ["About 5%", "About 1%", "About 25%", "About 15%"], "answer": 0 },
  { "id": "ra_em19", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which major software company, along with Amazon and Intel, reduced headcount in 2025 amid AI - driven restructuring?", "options": ["Microsoft", "Apple", "IBM", "Oracle"], "answer": 0 },
  { "id": "ra_em20", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "What is the name of xAI's chatbot that the US military integrated into a Pentagon AI platform in December 2025?", "options": ["Claude", "Copilot", "Gemini", "Grok"], "answer": 3 },
  { "id": "ra_em21", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which entrepreneur founded xAI, the company behind the Grok chatbot?", "options": ["Mark Zuckerberg", "Jeff Bezos", "Elon Musk", "Sam Altman"], "answer": 2 },
  { "id": "ra_em22", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "At which international competition did AI reasoning models from Google DeepMind and OpenAI achieve gold -medal -level performance in 2025?", "options": ["International Physics Olympiad", "World Chess Championship", "International Mathematical Olympiad", "International Chemistry Olympiad"], "answer": 2 },
  { "id": "ra_em23", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Approximately how many days after Bangladesh's February 2026 election was PM Tarique Rahman sworn in?", "options": ["About 30 days", "About 5 days", "About 20 days", "About 2 days"], "answer": 1 },
  { "id": "ra_em24", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "What is the name of Bangladesh's national body responsible for organizing and overseeing elections?", "options": ["Bangladesh Election Commission", "Electoral Board of Bangladesh", "National Voting Authority", "Ministry of Elections"], "answer": 0 },
  { "id": "ra_em25", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which political party did Tarique Rahman's BNP displace as Bangladesh's dominant political force in the 2026 election?", "options": ["Jatiya Party", "Awami League", "National Citizen Party", "Jamaat -e-Islami"], "answer": 1 },
  { "id": "ra_em26", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "In which year did mass protests lead to the fall of Sheikh Hasina's government in Bangladesh?", "options": ["2024", "2022", "2023", "2025"], "answer": 0 },
  { "id": "ra_em27", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "In which year did Muhammad Yunus win the Nobel Peace Prize for pioneering microcredit?", "options": ["2015", "1998", "2006", "2010"], "answer": 2 },
  { "id": "ra_em28", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "What is the name of the bank Muhammad Yunus founded to provide microloans to the poor in Bangladesh?", "options": ["BRAC Bank", "Grameen Bank", "Bangladesh Bank", "Sonali Bank"], "answer": 1 },
  { "id": "ra_em29", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which economic historian, a 2025 Nobel laureate, is known for his work explaining the origins of sustained technological growth?", "options": ["Joel Mokyr", "Philippe Aghion", "Peter Howitt", "Daron Acemoglu"], "answer": 0 },
  { "id": "ra_em30", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "What term did the 2025 Nobel Economics laureates use for the process driving growth through innovation replacing older technologies?", "options": ["Productive collapse", "Disruptive innovation", "Schumpeterian shift", "Creative destruction"], "answer": 3 },
  { "id": "ra_em31", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which of the 2025 Nobel Physics laureates conducted key quantum tunnelling experiments at UC Berkeley?", "options": ["Michel Devoret", "John Clarke", "John Bardeen", "John M. Martinis"], "answer": 1 },
  { "id": "ra_em32", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Which company manufactures the Orion crew capsule used in NASA's Artemis missions?", "options": ["SpaceX", "Northrop Grumman", "Lockheed Martin", "Boeing"], "answer": 2 },
  { "id": "ra_em33", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "What is the name of the Indian city that hosted the 2026 T20 Cricket World Cup final?", "options": ["Ahmedabad", "Kolkata", "Chennai", "Mumbai"], "answer": 0 },
  { "id": "ra_em34", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "In which Indian state is Ahmedabad, host city of the 2026 T20 World Cup final, located?", "options": ["Gujarat", "Maharashtra", "Rajasthan", "Punjab"], "answer": 0 },
  { "id": "ra_em35", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "What is the nickname commonly used for India's national cricket team?", "options": ["Team India Eagles", "The Lions", "Men in Blue", "The Tigers"], "answer": 2 },
  { "id": "ra_em36", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "Sam Altman leads the development of ChatGPT and GPT -5 as head of which company?", "options": ["OpenAI", "Anthropic", "Google DeepMind", "Meta AI"], "answer": 0 },
  { "id": "ra_em37", "topic": "Recent Affairs", "difficulty": "easy-medium", "question": "What is the term for the 50 Bangladeshi parliamentary seats specifically reserved for women?", "options": ["Special constituency seats", "Nominated seats", "Gender quota seats", "Reserved women's seats"], "answer": 3 },

  // ==========================================
  //  5. RECENT AFFAIRS — STEP 3: MEDIUM
  // ==========================================
  { "id": "ra_m1", "topic": "Recent Affairs", "difficulty": "medium", "question": "What is the name of the 2024 mass protest movement in Bangladesh that led to Sheikh Hasina's ouster?", "options": ["Language Movement", "Liberation War", "Mass Uprising of 1990", "July Uprising"], "answer": 3 },
  { "id": "ra_m2", "topic": "Recent Affairs", "difficulty": "medium", "question": "Who is the Chief Election Commissioner who administered the oath to Bangladesh's newly elected MPs in February 2026?", "options": ["K.M. Nurul Huda", "Rakibuddin Ahmad", "AMM Nasir Uddin", "Kazi Habibul Awal"], "answer": 2 },
  { "id": "ra_m3", "topic": "Recent Affairs", "difficulty": "medium", "question": "Where, breaking with tradition, was Tarique Rahman's swearing -in ceremony held instead of at Bangabhaban?", "options": ["Osmani Memorial Hall", "Suhrawardy Udyan", "South Plaza of Jatiya Sangsad Bhaban", "Dhaka University campus"], "answer": 2 },
  { "id": "ra_m4", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which chemists won the 2025 Nobel Prize in Chemistry for developing metal -organic frameworks?", "options": ["Brunkow, Ramsdell, and Sakaguchi", "Clarke, Devoret, and Martinis", "Susumu Kitagawa, Richard Robson, and Omar Yaghi", "Mokyr, Aghion, and Howitt"], "answer": 2 },
  { "id": "ra_m5", "topic": "Recent Affairs", "difficulty": "medium", "question": "What is notable about the Narendra Modi Stadium in Ahmedabad, which hosted the 2026 T20 World Cup final?", "options": ["It is India's only day -night stadium", "It has a retractable roof", "It is the oldest cricket stadium in India", "It is the world's largest cricket stadium by capacity"], "answer": 3 },
  { "id": "ra_m6", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which Pakistani batter set a record for most runs scored in a single edition of the T20 World Cup (383) in 2026?", "options": ["Mohammad Rizwan", "Sahibzada Farhan", "Babar Azam", "Fakhar Zaman"], "answer": 1 },
  { "id": "ra_m7", "topic": "Recent Affairs", "difficulty": "medium", "question": "The 2025 Nobel Prize in Physiology or Medicine was awarded for discoveries in which area of immunology?", "options": ["Peripheral immune tolerance", "Vaccine development", "Cancer immunotherapy", "Autoimmune disease genetics"], "answer": 0 },
  { "id": "ra_m8", "topic": "Recent Affairs", "difficulty": "medium", "question": "Approximately how long did Muhammad Yunus's interim government lead Bangladesh, from August 2024 to February 2026?", "options": ["About 30 months", "About 3 years", "About 6 months", "About 18 months"], "answer": 3 },
  { "id": "ra_m9", "topic": "Recent Affairs", "difficulty": "medium", "question": "In the 2026 T20 World Cup Super Eight stage, which team ended India's long unbeaten streak at ICC limited -overs tournaments?", "options": ["New Zealand", "Australia", "Pakistan", "South Africa"], "answer": 3 },
  { "id": "ra_m10", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which of the 2026 Winter Olympics mascots represents the Paralympic Games specifically?", "options": ["Miraitowa", "Tina", "Soohorang", "Milo"], "answer": 3 },
  { "id": "ra_m11", "topic": "Recent Affairs", "difficulty": "medium", "question": "What title does Maria Corina Machado hold in Venezuelan politics, the basis for her 2025 Nobel Peace Prize?", "options": ["President", "Opposition leader", "UN Ambassador", "Vice President"], "answer": 1 },
  { "id": "ra_m12", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which team's total of 256/4 against Zimbabwe was the highest team total at the 2026 T20 World Cup?", "options": ["South Africa", "Pakistan", "Australia", "India"], "answer": 3 },
  { "id": "ra_m13", "topic": "Recent Affairs", "difficulty": "medium", "question": "What major infrastructure project did new PM Tarique Rahman announce plans to restructure to ease Dhaka's traffic congestion?", "options": ["The seaport", "The airport", "The metro rail", "The railway network"], "answer": 3 },
  { "id": "ra_m14", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which Indian dignitary attended Tarique Rahman's swearing -in and delivered a letter from PM Narendra Modi?", "options": ["President Droupadi Murmu", "Home Minister Amit Shah", "Lok Sabha Speaker Om Birla", "External Affairs Minister S. Jaishankar"], "answer": 2 },
  { "id": "ra_m15", "topic": "Recent Affairs", "difficulty": "medium", "question": "Against which team did India score 253/7 in the semi -final of the 2026 T20 World Cup?", "options": ["England", "Australia", "South Africa", "New Zealand"], "answer": 0 },
  { "id": "ra_m16", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which economic historian shared the 2025 Nobel Prize in Economic Sciences for identifying prerequisites for sustained technological growth?", "options": ["Peter Howitt", "Joel Mokyr", "Philippe Aghion", "Daron Acemoglu"], "answer": 1 },
  { "id": "ra_m17", "topic": "Recent Affairs", "difficulty": "medium", "question": "What was the theme of the 2026 Winter Olympics torch relay, which ran from Greece through Italy?", "options": ["The Greatest Journey", "Winter's Light", "Flame of Unity", "Path to Glory"], "answer": 0 },
  { "id": "ra_m18", "topic": "Recent Affairs", "difficulty": "medium", "question": "What is the term for OpenAI's GPT -5, marking the company's first model to combine fast conversational replies with deep reasoning in one system?", "options": ["Multimodal model", "Hybrid model", "Composite model", "Unified model"], "answer": 3 },
  { "id": "ra_m19", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which company's LLM -based Siri overhaul, reportedly code -named \"Linwood,\" was planned for release around spring 2026?", "options": ["Amazon", "Apple", "Samsung", "Google"], "answer": 1 },
  { "id": "ra_m20", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which Chinese AI company's GLM -5.2 model sparked debate in 2025 -2026 about China catching up to the US in the AI race?", "options": ["Alibaba", "Baidu", "Tencent", "Z.ai"], "answer": 3 },
  { "id": "ra_m21", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which social media platform faced a lawsuit from AI companies including OpenAI and Google over data -scraping restrictions in 2025?", "options": ["Reddit", "Twitter/X", "Facebook", "LinkedIn"], "answer": 0 },
  { "id": "ra_m22", "topic": "Recent Affairs", "difficulty": "medium", "question": "Out of how many directly -elected seats did the BNP win 209 in Bangladesh's February 2026 election?", "options": ["350", "250", "300", "330"], "answer": 2 },
  { "id": "ra_m23", "topic": "Recent Affairs", "difficulty": "medium", "question": "What is the name of the new Bangladeshi political party formed by leaders of the 2024 student -led uprising?", "options": ["Students Democratic Front", "National Citizen Party", "People's Freedom Party", "New Bangladesh Movement"], "answer": 1 },
  { "id": "ra_m24", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which two 2025 Nobel Economics laureates formalized the concept of growth through \"creative destruction,\" building on economist Joseph Schumpeter's ideas?", "options": ["Joel Mokyr and Daron Acemoglu", "Amartya Sen and Angus Deaton", "Philippe Aghion and Peter Howitt", "Paul Romer and Robert Solow"], "answer": 2 },
  { "id": "ra_m25", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which 2025 Nobel Economics laureate, who worked with Philippe Aghion on growth theory, is Canadian?", "options": ["James Robinson", "Joel Mokyr", "Daron Acemoglu", "Peter Howitt"], "answer": 3 },
  { "id": "ra_m26", "topic": "Recent Affairs", "difficulty": "medium", "question": "Who are the two additional 2025 Nobel Physics laureates who shared the prize alongside John Clarke for quantum tunnelling research?", "options": ["Peter Higgs and Francois Englert", "Alain Aspect and Anton Zeilinger", "Kip Thorne and Rainer Weiss", "Michel Devoret and John M. Martinis"], "answer": 3 },
  { "id": "ra_m27", "topic": "Recent Affairs", "difficulty": "medium", "question": "What nationality is Michel Devoret, one of the three 2025 Nobel Physics laureates?", "options": ["German", "British", "Italian", "French"], "answer": 3 },
  { "id": "ra_m28", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which of the 2025 Nobel Medicine laureates is Japanese, known for foundational work on regulatory T cells?", "options": ["Mary Brunkow", "Shimon Sakaguchi", "Fred Ramsdell", "Tasuku Honjo"], "answer": 1 },
  { "id": "ra_m29", "topic": "Recent Affairs", "difficulty": "medium", "question": "What immune cell type did the 2025 Nobel Medicine laureates' research primarily focus on, important for preventing autoimmune disease?", "options": ["Macrophages", "Regulatory T cells", "Natural killer cells", "B cells"], "answer": 1 },
  { "id": "ra_m30", "topic": "Recent Affairs", "difficulty": "medium", "question": "What was the name of NASA's uncrewed lunar flyby mission that tested the Orion spacecraft in 2022, immediately preceding Artemis II?", "options": ["Exploration Mission 1", "Artemis I", "Artemis 0", "Constellation I"], "answer": 1 },
  { "id": "ra_m31", "topic": "Recent Affairs", "difficulty": "medium", "question": "Approximately how many days did the Artemis II mission's crewed lunar flyby take?", "options": ["About 20 days", "About 30 days", "About 10 days", "About 3 days"], "answer": 2 },
  { "id": "ra_m32", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which Artemis II astronaut, a US Navy pilot and veteran NASA astronaut, commanded the mission?", "options": ["Christina Koch", "Victor Glover", "Reid Wiseman", "Jeremy Hansen"], "answer": 2 },
  { "id": "ra_m33", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which Artemis II crew member previously held the record for the longest single spaceflight by a woman, at 328 days aboard the ISS?", "options": ["Peggy Whitson", "Reid Wiseman", "Christina Koch", "Victor Glover"], "answer": 2 },
  { "id": "ra_m34", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which private American company is developing the Starship vehicle intended to serve as the crewed lunar lander for future Artemis missions?", "options": ["Lockheed Martin", "SpaceX", "Boeing", "Blue Origin"], "answer": 1 },
  { "id": "ra_m35", "topic": "Recent Affairs", "difficulty": "medium", "question": "Which Artemis II astronaut serves as the mission's pilot, and previously flew to the ISS aboard a SpaceX Crew Dragon?", "options": ["Victor Glover", "Jeremy Hansen", "Reid Wiseman", "Christina Koch"], "answer": 0 },
  { "id": "ra_m36", "topic": "Recent Affairs", "difficulty": "medium", "question": "What is the term for the process by which OpenAI's GPT -5 was made available to free ChatGPT users, lowering the barrier to advanced AI reasoning?", "options": ["Open -sourcing", "Public beta release", "Freemium rollout", "Democratization of reasoning -grade AI"], "answer": 3 },
  { "id": "ra_m37", "topic": "Recent Affairs", "difficulty": "medium", "question": "What was the estimated amount of water US data centers consumed in 2025, largely driven by AI workloads for server cooling?", "options": ["264 billion gallons", "50 billion gallons", "1 trillion gallons", "10 billion gallons"], "answer": 0 },

  // ==========================================
  //  5. RECENT AFFAIRS — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "ra_mh1", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which fast bowler, Player of the Match in the 2026 T20 World Cup final, also plays IPL cricket for Mumbai Indians?", "options": ["Mohammed Siraj", "Arshdeep Singh", "Mohammed Shami", "Jasprit Bumrah"], "answer": 3 },
  { "id": "ra_mh2", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which New Zealand batter scored the fastest century in T20 World Cup history at the 2026 tournament?", "options": ["Finn Allen", "Kane Williamson", "Glenn Phillips", "Devon Conway"], "answer": 0 },
  { "id": "ra_mh3", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "What edition number was the 2026 ICC Men's T20 World Cup, a tournament first held in 2007?", "options": ["12th edition", "8th edition", "10th edition", "6th edition"], "answer": 2 },
  { "id": "ra_mh4", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which two nations are set to co -host the 2028 ICC Men's T20 World Cup?", "options": ["England and Ireland", "India and Sri Lanka", "Australia and New Zealand", "South Africa and Zimbabwe"], "answer": 2 },
  { "id": "ra_mh5", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "At which Mumbai venue did India play their opening 2026 T20 World Cup match, against the United States?", "options": ["Eden Gardens", "Arun Jaitley Stadium", "Wankhede Stadium", "Narendra Modi Stadium"], "answer": 2 },
  { "id": "ra_mh6", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which space agency built the European Service Module that powers and propels the Artemis II spacecraft?", "options": ["Japan Aerospace Exploration Agency", "European Space Agency", "Roscosmos", "Canadian Space Agency"], "answer": 1 },
  { "id": "ra_mh7", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "From which launch pad at Kennedy Space Center did Artemis II lift off in 2026?", "options": ["Launch Complex 40", "Launch Pad 39B", "Launch Pad 39A", "Launch Complex 41"], "answer": 1 },
  { "id": "ra_mh8", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Laszlo Krasznahorkai, the 2025 Nobel Literature laureate, writes in which language?", "options": ["Czech", "Polish", "Hungarian", "Romanian"], "answer": 2 },
  { "id": "ra_mh9", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "What was the reported total prize pool for the 2026 ICC Men's T20 World Cup, with champions India receiving $3 million?", "options": ["$25 million", "$13.5 million", "$50 million", "$5 million"], "answer": 1 },
  { "id": "ra_mh10", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which Bangladeshi political figure had earlier legal convictions overturned by courts following the 2024 change of government?", "options": ["Amir Khosru Mahmud Chowdhury", "Tarique Rahman", "Mirza Fakhrul Islam Alamgir", "Salahuddin Ahmed"], "answer": 1 },
  { "id": "ra_mh11", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Who serves as Secretary General of the Bangladesh Nationalist Party under chairman Tarique Rahman?", "options": ["Humayun Kabir", "Salahuddin Ahmed", "Mirza Fakhrul Islam Alamgir", "Amir Khosru Mahmud Chowdhury"], "answer": 2 },
  { "id": "ra_mh12", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which Bangladeshi military figure, Chief of Army Staff, had publicly called for elections to be held by December 2025?", "options": ["General Aziz Ahmed", "General Waker -uz-Zaman", "General S M Shafiuddin Ahmed", "General Ziaur Rahman"], "answer": 1 },
  { "id": "ra_mh13", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which Italian alpine town, nicknamed the \"Queen of the Dolomites\" and previous host of the 1956 Winter Olympics, anchored the mountain cluster at Milan -Cortina 2026?", "options": ["Livigno", "Bormio", "Bolzano", "Cortina d'Ampezzo"], "answer": 3 },
  { "id": "ra_mh14", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "What was the venue for the Opening Ceremony of the 2026 Winter Olympics in Milan?", "options": ["Assago Forum", "PalaItalia Santa Giulia", "San Siro Stadium", "Hockey Arena"], "answer": 2 },
  { "id": "ra_mh15", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Approximately how many athletes and from how many countries competed at the 2026 Milan -Cortina Winter Olympics?", "options": ["Around 500 athletes from 30 countries", "Around 1,000 athletes from 50 countries", "Around 2,900 athletes from about 90 countries", "Around 10,000 athletes from 150 countries"], "answer": 2 },
  { "id": "ra_mh16", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which company built the HALO habitation module for NASA's lunar Gateway station, integrated at a facility in Arizona?", "options": ["SpaceX", "Northrop Grumman", "Boeing", "Lockheed Martin"], "answer": 1 },
  { "id": "ra_mh17", "topic": "Recent Affairs", "difficulty": "medium-hard", "question": "Which BNP figure was appointed as an adviser to PM Tarique Rahman on foreign affairs, tipped to become foreign minister?", "options": ["Amir Khosru Mahmud Chowdhury", "Mirza Fakhrul Islam Alamgir", "Humayun Kabir", "Salahuddin Ahmed"], "answer": 2 },

  // ==========================================
  //  5. RECENT AFFAIRS — STEP 5: HARD
  // ==========================================
  { "id": "ra_h1", "topic": "Recent Affairs", "difficulty": "hard", "question": "How many torchbearers participated in the 2026 Winter Olympics torch relay across its roughly 12,000 km route?", "options": ["15,000", "5,000", "10,001", "8,500"], "answer": 2 },
  { "id": "ra_h2", "topic": "Recent Affairs", "difficulty": "hard", "question": "What was the recorded attendance at the 2026 T20 World Cup final in Ahmedabad?", "options": ["86,824", "45,000", "60,000", "100,000"], "answer": 0 },
  { "id": "ra_h3", "topic": "Recent Affairs", "difficulty": "hard", "question": "Which two umpires officiated the 2026 T20 World Cup final between India and New Zealand?", "options": ["Richard Illingworth and Alex Wharf", "Aleem Dar and Ian Gould", "Marais Erasmus and Chris Gaffaney", "Kumar Dharmasena and Rod Tucker"], "answer": 0 },
  { "id": "ra_h4", "topic": "Recent Affairs", "difficulty": "hard", "question": "How many consecutive ICC limited -overs tournament wins had India's streak reached before South Africa ended it at the 2026 T20 World Cup?", "options": ["17", "12", "9", "20"], "answer": 0 },
  { "id": "ra_h5", "topic": "Recent Affairs", "difficulty": "hard", "question": "Which four regions held qualification tournaments that brought associate nations like Namibia, Nepal, and Italy into the 2026 T20 World Cup?", "options": ["A single global qualifier", "Only an Asia qualifier", "Africa, Americas, Asia/East Asia -Pacific, and Europe", "ICC direct invitations only"], "answer": 2 },
  { "id": "ra_h6", "topic": "Recent Affairs", "difficulty": "hard", "question": "Approximately how many executive orders had US President Donald Trump signed by the end of 2025, more than any predecessor's opening year?", "options": ["About 50", "About 100", "About 225", "About 400"], "answer": 2 },
  { "id": "ra_h7", "topic": "Recent Affairs", "difficulty": "hard", "question": "What is the name of NASA's lunar space station project, whose power system was activated for the first time in early 2026?", "options": ["Lunar Outpost", "Gateway", "Orion", "Artemis Base Camp"], "answer": 1 },
  { "id": "ra_h8", "topic": "Recent Affairs", "difficulty": "hard", "question": "Along with the general election, what constitutional matter did Bangladeshi voters also decide on around February 2026?", "options": ["Direct election of the President", "A referendum on the July Charter reforms", "A new national flag design", "Independence from the Commonwealth"], "answer": 1 },
  { "id": "ra_h9", "topic": "Recent Affairs", "difficulty": "hard", "question": "The 2025 Nobel Prize in Physics recognized research that could advance which technology, alongside quantum computing and quantum sensing?", "options": ["Quantum weather forecasting", "Quantum broadcasting", "Quantum farming", "Quantum cryptography"], "answer": 3 },
  { "id": "ra_h10", "topic": "Recent Affairs", "difficulty": "hard", "question": "Approximately how many years before 2025 was the field of quantum mechanics first developed, marked by a designated international year?", "options": ["50 years", "75 years", "100 years", "150 years"], "answer": 2 },
  { "id": "ra_h11", "topic": "Recent Affairs", "difficulty": "hard", "question": "How many total venues were used to host events across the 2026 Milan -Cortina Winter Olympics?", "options": ["12 venues", "8 venues", "15 venues", "20 venues"], "answer": 2 },
  { "id": "ra_h12", "topic": "Recent Affairs", "difficulty": "hard", "question": "What Winter Olympics record did Team USA break at Milan -Cortina 2026, previously set at the 2002 Salt Lake City Games?", "options": ["Most gold medals by the US at a single Winter Olympics", "Most athletes sent by a single nation", "Youngest average team age", "Most total medals ever by any nation"], "answer": 0 },
  { "id": "ra_h13", "topic": "Recent Affairs", "difficulty": "hard", "question": "How many gold medals did Team USA win at the 2026 Winter Olympics, breaking its previous record of 10?", "options": ["12", "15", "14", "11"], "answer": 0 },
  { "id": "ra_h14", "topic": "Recent Affairs", "difficulty": "hard", "question": "What was India's score in the 2026 T20 World Cup final, the highest total ever posted in a T20 World Cup final?", "options": ["270/4", "230/6", "255/5", "210/7"], "answer": 2 },
  { "id": "ra_h15", "topic": "Recent Affairs", "difficulty": "hard", "question": "Which Indian Prime Minister sent a personal letter to Tarique Rahman via Lok Sabha Speaker Om Birla, inviting him to visit India?", "options": ["Droupadi Murmu", "Rajnath Singh", "Narendra Modi", "Manmohan Singh"], "answer": 2 },
  { "id": "ra_h16", "topic": "Recent Affairs", "difficulty": "hard", "question": "What kind of era has NASA described itself as being in, referenced around the Artemis II mission and its increased exploration cadence?", "options": ["\"Moonshot 2.0\"", "A \"Golden Age\" of exploration", "The \"New Frontier\" era", "The \"Second Space Race\""], "answer": 1 },
  { "id": "ra_h17", "topic": "Recent Affairs", "difficulty": "hard", "question": "Which historic English cathedral installed Sarah Mullally as the first female Archbishop of Canterbury in March 2026?", "options": ["Westminster Abbey", "St Paul's Cathedral", "York Minster", "Canterbury Cathedral"], "answer": 3 },

  // ==========================================
  //  6. ENTERTAINMENT — STEP 1: EASY
  // ==========================================
  { "id": "ent_e1", "topic": "Entertainment", "difficulty": "easy", "question": "Who wrote the Harry Potter book series?", "options": ["Stephenie Meyer", "Rick Riordan", "Suzanne Collins", "J.K. Rowling"], "answer": 3 },
  { "id": "ent_e2", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the fictional wizarding school in the Harry Potter series?", "options": ["Ilvermorny", "Durmstrang", "Hogwarts", "Beauxbatons"], "answer": 2 },
  { "id": "ent_e3", "topic": "Entertainment", "difficulty": "easy", "question": "Which streaming service is known for shows like \"Stranger Things\"?", "options": ["Disney+", "Hulu", "Peacock", "Netflix"], "answer": 3 },
  { "id": "ent_e4", "topic": "Entertainment", "difficulty": "easy", "question": "Who played the character Jack in the movie \"Titanic\" (1997)?", "options": ["Tom Cruise", "Brad Pitt", "Leonardo DiCaprio", "Matt Damon"], "answer": 2 },
  { "id": "ent_e5", "topic": "Entertainment", "difficulty": "easy", "question": "Which of these is one of the highest -grossing films of all time?", "options": ["The Godfather", "Casablanca", "Avatar", "Psycho"], "answer": 2 },
  { "id": "ent_e6", "topic": "Entertainment", "difficulty": "easy", "question": "Which award is considered the most prestigious in the American film industry?", "options": ["Grammy Award", "Emmy Award", "Academy Award", "Tony Award"], "answer": 2 },
  { "id": "ent_e7", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the fictional superhero team that includes Iron Man, Captain America, and Thor?", "options": ["The Avengers", "The Justice League", "The Fantastic Four", "The X -Men"], "answer": 0 },
  { "id": "ent_e8", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the annual awards ceremony honoring achievement in the music industry, nicknamed the Grammys?", "options": ["American Music Awards", "Billboard Awards", "MTV Awards", "Grammy Awards"], "answer": 3 },
  { "id": "ent_e9", "topic": "Entertainment", "difficulty": "easy", "question": "Who is known as the \"King of Pop\"?", "options": ["Justin Timberlake", "Prince", "Michael Jackson", "Elvis Presley"], "answer": 2 },
  { "id": "ent_e10", "topic": "Entertainment", "difficulty": "easy", "question": "Which animation studio created \"Toy Story\"?", "options": ["Blue Sky Studios", "Illumination", "Pixar", "DreamWorks"], "answer": 2 },
  { "id": "ent_e11", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the fictional African country where \"Black Panther\" is set?", "options": ["Wakanda", "Latveria", "Zamunda", "Genovia"], "answer": 0 },
  { "id": "ent_e12", "topic": "Entertainment", "difficulty": "easy", "question": "Who directed the original 1993 film \"Jurassic Park\"?", "options": ["George Lucas", "James Cameron", "Steven Spielberg", "Ridley Scott"], "answer": 2 },
  { "id": "ent_e13", "topic": "Entertainment", "difficulty": "easy", "question": "Which British band is known for songs like \"Hey Jude\" and \"Let It Be\"?", "options": ["Queen", "The Beatles", "The Rolling Stones", "Pink Floyd"], "answer": 1 },
  { "id": "ent_e14", "topic": "Entertainment", "difficulty": "easy", "question": "Which singing competition format, with regional versions worldwide, is known for judges pressing a \"golden buzzer\"?", "options": ["American Idol", "Got Talent", "X Factor", "The Voice"], "answer": 1 },
  { "id": "ent_e15", "topic": "Entertainment", "difficulty": "easy", "question": "Which actor played the title role in the \"Iron Man\" films?", "options": ["Chris Hemsworth", "Chris Evans", "Mark Ruffalo", "Robert Downey Jr."], "answer": 3 },
  { "id": "ent_e16", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the fictional boy wizard's best friend with red hair in Harry Potter?", "options": ["Ron Weasley", "Seamus Finnigan", "Neville Longbottom", "Dean Thomas"], "answer": 0 },
  { "id": "ent_e17", "topic": "Entertainment", "difficulty": "easy", "question": "Which film won the first -ever Academy Award for Best Picture, in 1929?", "options": ["Sunrise", "Metropolis", "The Jazz Singer", "Wings"], "answer": 3 },
  { "id": "ent_e18", "topic": "Entertainment", "difficulty": "easy", "question": "Who played the character of Jon Snow in \"Game of Thrones\"?", "options": ["Richard Madden", "Alfie Allen", "Kit Harington", "Peter Dinklage"], "answer": 2 },
  { "id": "ent_e19", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the fictional city where Batman operates?", "options": ["Gotham City", "Metropolis", "Central City", "Star City"], "answer": 0 },
  { "id": "ent_e20", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the fictional city where Superman operates?", "options": ["Gotham City", "Smallville", "Coast City", "Metropolis"], "answer": 3 },
  { "id": "ent_e21", "topic": "Entertainment", "difficulty": "easy", "question": "Which actor played the Hulk in the Marvel Cinematic Universe films?", "options": ["Eric Bana", "Lou Ferrigno", "Mark Ruffalo", "Edward Norton"], "answer": 2 },
  { "id": "ent_e22", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the fictional ring that Frodo must destroy in \"The Lord of the Rings\"?", "options": ["The Ring of Power", "Sauron's Ring", "The One Ring", "The Dark Ring"], "answer": 2 },
  { "id": "ent_e23", "topic": "Entertainment", "difficulty": "easy", "question": "Who wrote \"The Lord of the Rings\" book series?", "options": ["C.S. Lewis", "J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin"], "answer": 1 },
  { "id": "ent_e24", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the popular anime and manga series about a boy who wants to become the \"Pirate King\"?", "options": ["Bleach", "One Piece", "Dragon Ball", "Naruto"], "answer": 1 },
  { "id": "ent_e25", "topic": "Entertainment", "difficulty": "easy", "question": "In which Pixar film does a trash -compacting robot fall in love with a sleek probe named EVE?", "options": ["The Incredibles", "WALL -E", "Cars", "Up"], "answer": 1 },
  { "id": "ent_e26", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the lion cub who becomes king in Disney's \"The Lion King\"?", "options": ["Scar", "Mufasa", "Simba", "Timon"], "answer": 2 },
  { "id": "ent_e27", "topic": "Entertainment", "difficulty": "easy", "question": "Which actor voices Woody in the \"Toy Story\" film series?", "options": ["Wallace Shawn", "Tom Hanks", "Don Rickles", "Tim Allen"], "answer": 1 },
  { "id": "ent_e28", "topic": "Entertainment", "difficulty": "easy", "question": "Which actor voices Buzz Lightyear in the \"Toy Story\" film series?", "options": ["Tim Allen", "Tom Hanks", "John Ratzenberger", "Joan Cusack"], "answer": 0 },
  { "id": "ent_e29", "topic": "Entertainment", "difficulty": "easy", "question": "Who played Katniss Everdeen in \"The Hunger Games\" film series?", "options": ["Emma Stone", "Jennifer Lawrence", "Kristen Stewart", "Shailene Woodley"], "answer": 1 },
  { "id": "ent_e30", "topic": "Entertainment", "difficulty": "easy", "question": "In which fictional nation is \"The Hunger Games\" set?", "options": ["Oceania", "Westeros", "Gilead", "Panem"], "answer": 3 },
  { "id": "ent_e31", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the popular video game and mascot franchise featuring a blue hedgehog?", "options": ["Rayman", "Crash Bandicoot", "Spyro", "Sonic the Hedgehog"], "answer": 3 },
  { "id": "ent_e32", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the popular video game and film franchise featuring an Italian plumber?", "options": ["Sonic", "Pac -Man", "Super Mario", "Donkey Kong"], "answer": 2 },
  { "id": "ent_e33", "topic": "Entertainment", "difficulty": "easy", "question": "Which company created the \"Super Mario\" and \"The Legend of Zelda\" franchises?", "options": ["Sony", "Nintendo", "Sega", "Capcom"], "answer": 1 },
  { "id": "ent_e34", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the popular singing competition show where contestants perform blind auditions for celebrity judges?", "options": ["The Voice", "Got Talent", "American Idol", "X Factor"], "answer": 0 },
  { "id": "ent_e35", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the popular sitcom, originally British, about a group of employees at a paper company, later adapted for American TV?", "options": ["The Office", "Brooklyn Nine -Nine", "Community", "Parks and Recreation"], "answer": 0 },
  { "id": "ent_e36", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the long -running British science fiction TV series about a time -traveling alien known as \"The Doctor\"?", "options": ["Red Dwarf", "Star Trek", "Doctor Who", "Torchwood"], "answer": 2 },
  { "id": "ent_e37", "topic": "Entertainment", "difficulty": "easy", "question": "What is the name of the video game publisher behind the \"Grand Theft Auto\" franchise?", "options": ["Activision", "Electronic Arts", "Ubisoft", "Rockstar Games"], "answer": 3 },

  // ==========================================
  //  6. ENTERTAINMENT — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "ent_em1", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which actress won the Academy Award for Best Actress for her role in \"La La Land\"?", "options": ["Amy Adams", "Emma Stone", "Jennifer Lawrence", "Natalie Portman"], "answer": 1 },
  { "id": "ent_em2", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Who created the fictional detective Sherlock Holmes?", "options": ["Edgar Allan Poe", "Wilkie Collins", "Agatha Christie", "Sir Arthur Conan Doyle"], "answer": 3 },
  { "id": "ent_em3", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which 2019 film won Best Picture, becoming the first non -English -language film to do so?", "options": ["Roma", "Parasite", "Amour", "Life Is Beautiful"], "answer": 1 },
  { "id": "ent_em4", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Who composed the score for the original \"Star Wars\" films?", "options": ["John Williams", "Danny Elfman", "Hans Zimmer", "James Horner"], "answer": 0 },
  { "id": "ent_em5", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which K -pop group is known for hits like \"Dynamite\" and \"Butter\"?", "options": ["Blackpink", "EXO", "Seventeen", "BTS"], "answer": 3 },
  { "id": "ent_em6", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Who played the Joker in the 2019 film \"Joker,\" winning an Academy Award for the role?", "options": ["Joaquin Phoenix", "Jack Nicholson", "Jared Leto", "Heath Ledger"], "answer": 0 },
  { "id": "ent_em7", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the African American superhero who debuted in Marvel Comics in 1966, later a hit film?", "options": ["Falcon", "Luke Cage", "Black Panther", "War Machine"], "answer": 2 },
  { "id": "ent_em8", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which director is known for films like \"Jaws,\" \"E.T.,\" and \"Schindler's List\"?", "options": ["Francis Ford Coppola", "Martin Scorsese", "George Lucas", "Steven Spielberg"], "answer": 3 },
  { "id": "ent_em9", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the British -originated singing competition franchise that includes \"American Idol\"?", "options": ["Pop Idol", "The Voice", "X Factor", "Got Talent"], "answer": 0 },
  { "id": "ent_em10", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which actress played Hermione Granger in the Harry Potter films?", "options": ["Emma Stone", "Emma Roberts", "Emma Thompson", "Emma Watson"], "answer": 3 },
  { "id": "ent_em11", "topic": "Entertainment", "difficulty": "easy-medium", "question": "In which French city is a major annual film festival held?", "options": ["Nice", "Cannes", "Marseille", "Lyon"], "answer": 1 },
  { "id": "ent_em12", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which musician is known as the \"Queen of Pop\"?", "options": ["Celine Dion", "Madonna", "Cher", "Whitney Houston"], "answer": 1 },
  { "id": "ent_em13", "topic": "Entertainment", "difficulty": "easy-medium", "question": "In which year was the original \"Jaws\" movie released?", "options": ["1975", "1985", "1980", "1970"], "answer": 0 },
  { "id": "ent_em14", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which actor has played James Bond the most times in the official film series?", "options": ["Sean Connery", "Pierce Brosnan", "Daniel Craig", "Roger Moore"], "answer": 3 },
  { "id": "ent_em15", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the fictional wizarding sport played on flying broomsticks in Harry Potter called?", "options": ["Quidditch", "Broomball", "Snitchball", "Bludgerball"], "answer": 0 },
  { "id": "ent_em16", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which animated Disney film features the song \"Let It Go\" and is set in the kingdom of Arendelle?", "options": ["Moana", "Encanto", "Frozen", "Tangled"], "answer": 2 },
  { "id": "ent_em17", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which streaming platform produced the historical drama series \"The Crown\"?", "options": ["Netflix", "Apple TV+", "HBO", "Amazon Prime"], "answer": 0 },
  { "id": "ent_em18", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which actress played Wonder Woman in the DC Extended Universe films?", "options": ["Scarlett Johansson", "Brie Larson", "Gal Gadot", "Margot Robbie"], "answer": 2 },
  { "id": "ent_em19", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which actor played Thor in the Marvel Cinematic Universe films?", "options": ["Chris Hemsworth", "Chris Pratt", "Chris Evans", "Chris Pine"], "answer": 0 },
  { "id": "ent_em20", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the fictional wizarding sport in Harry Potter, played on flying broomsticks and involving a \"golden snitch\"?", "options": ["Exploding Snap", "Quidditch", "Wizard's Chess", "Gobstones"], "answer": 1 },
  { "id": "ent_em21", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the South Korean survival drama series that became Netflix's most -watched show at release?", "options": ["All of Us Are Dead", "Squid Game", "Kingdom", "Sweet Home"], "answer": 1 },
  { "id": "ent_em22", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which animation studio produced the popular anime series \"Demon Slayer\"?", "options": ["Studio Ghibli", "Ufotable", "Toei Animation", "Madhouse"], "answer": 1 },
  { "id": "ent_em23", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the popular anime franchise about a ninja named Naruto Uzumaki?", "options": ["Bleach", "One Piece", "Naruto", "My Hero Academia"], "answer": 2 },
  { "id": "ent_em24", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which Disney musical, adapted for Broadway, features the song \"Circle of Life\"?", "options": ["Frozen", "Aladdin", "The Lion King", "Beauty and the Beast"], "answer": 2 },
  { "id": "ent_em25", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the popular British singing competition show associated with judge Simon Cowell?", "options": ["The X Factor", "The Voice UK", "Pop Idol", "Britain's Got Talent"], "answer": 0 },
  { "id": "ent_em26", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which song from the 2018 film \"A Star Is Born,\" performed by Lady Gaga and Bradley Cooper, won the Academy Award for Best Original Song?", "options": ["Shallow", "Look What I Found", "Always Remember Us This Way", "I'll Never Love Again"], "answer": 0 },
  { "id": "ent_em27", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the popular Broadway musical about the life of American founding father Alexander Hamilton?", "options": ["1776", "Hamilton", "The Founders", "Independence"], "answer": 1 },
  { "id": "ent_em28", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Who created and originally starred in the title role of the musical \"Hamilton\"?", "options": ["Daveed Diggs", "Lin -Manuel Miranda", "Jonathan Groff", "Leslie Odom Jr."], "answer": 1 },
  { "id": "ent_em29", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the popular video streaming platform primarily used for gaming content and live streams?", "options": ["Vimeo", "Twitch", "YouTube Gaming", "Dailymotion"], "answer": 1 },
  { "id": "ent_em30", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which major company owns the streaming platform Twitch?", "options": ["Amazon", "Microsoft", "Google", "Meta"], "answer": 0 },
  { "id": "ent_em31", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the reality TV format in which contestants are stranded on an island and compete in challenges, associated with the phrase \"the tribe has spoken\"?", "options": ["Big Brother", "Survivor", "The Amazing Race", "Naked and Afraid"], "answer": 1 },
  { "id": "ent_em32", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the popular Japanese creature -battling franchise that began as a video game and expanded into cards, anime, and films?", "options": ["Pokemon", "Monster Hunter", "Digimon", "Yu -Gi-Oh!"], "answer": 0 },
  { "id": "ent_em33", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which actor played Captain Jack Sparrow in the \"Pirates of the Caribbean\" film series?", "options": ["Geoffrey Rush", "Johnny Depp", "Orlando Bloom", "Javier Bardem"], "answer": 1 },
  { "id": "ent_em34", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which director, known for a distinctive gothic visual style, made \"Edward Scissorhands\" and \"Alice in Wonderland\"?", "options": ["David Fincher", "Tim Burton", "Wes Anderson", "Guillermo del Toro"], "answer": 1 },
  { "id": "ent_em35", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of Hayao Miyazaki's Academy Award -winning 2001 animated film about a girl who enters a magical spirit world?", "options": ["Howl's Moving Castle", "Princess Mononoke", "My Neighbor Totoro", "Spirited Away"], "answer": 3 },
  { "id": "ent_em36", "topic": "Entertainment", "difficulty": "easy-medium", "question": "What is the name of the fictional archaeologist and adventurer played by Harrison Ford in a famous film franchise?", "options": ["Indiana Jones", "Lara Croft", "Rick O'Connell", "Nathan Drake"], "answer": 0 },
  { "id": "ent_em37", "topic": "Entertainment", "difficulty": "easy-medium", "question": "Which actor plays the title role in the \"John Wick\" action film series?", "options": ["Matt Damon", "Liam Neeson", "Jason Statham", "Keanu Reeves"], "answer": 3 },

  // ==========================================
  //  6. ENTERTAINMENT — STEP 3: MEDIUM
  // ==========================================
  { "id": "ent_m1", "topic": "Entertainment", "difficulty": "medium", "question": "Which actor holds the record for the most Academy Award nominations for acting?", "options": ["Meryl Streep", "Daniel Day -Lewis", "Jack Nicholson", "Katharine Hepburn"], "answer": 0 },
  { "id": "ent_m2", "topic": "Entertainment", "difficulty": "medium", "question": "In what year was The Walt Disney Company founded?", "options": ["1937", "1923", "1955", "1901"], "answer": 1 },
  { "id": "ent_m3", "topic": "Entertainment", "difficulty": "medium", "question": "Which composer, known for collaborating with Disney, wrote the score for \"The Lion King\" (1994)?", "options": ["John Williams", "Hans Zimmer", "Alan Menken", "Randy Newman"], "answer": 1 },
  { "id": "ent_m4", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the longest -running scripted primetime American TV show, an animated sitcom that debuted in 1989?", "options": ["The Simpsons", "Family Guy", "South Park", "King of the Hill"], "answer": 0 },
  { "id": "ent_m5", "topic": "Entertainment", "difficulty": "medium", "question": "Which 1997 film became the first to gross over $1 billion worldwide?", "options": ["Titanic", "Jurassic Park", "Star Wars", "Independence Day"], "answer": 0 },
  { "id": "ent_m6", "topic": "Entertainment", "difficulty": "medium", "question": "Which artist's album \"Thriller\" is the best -selling album of all time?", "options": ["Elvis Presley", "Madonna", "Whitney Houston", "Michael Jackson"], "answer": 3 },
  { "id": "ent_m7", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the award given for outstanding achievement in television, considered the TV equivalent of the Oscars?", "options": ["SAG Award", "Golden Globe", "Peabody Award", "Emmy Award"], "answer": 3 },
  { "id": "ent_m8", "topic": "Entertainment", "difficulty": "medium", "question": "Which actress has won the most competitive Academy Awards for acting, with 4 wins?", "options": ["Ingrid Bergman", "Katharine Hepburn", "Bette Davis", "Meryl Streep"], "answer": 1 },
  { "id": "ent_m9", "topic": "Entertainment", "difficulty": "medium", "question": "What is the fictional London address where Sherlock Holmes lives?", "options": ["221B Baker Street", "42 Wallaby Way", "10 Downing Street", "12 Grimmauld Place"], "answer": 0 },
  { "id": "ent_m10", "topic": "Entertainment", "difficulty": "medium", "question": "Which 1972 film, directed by Francis Ford Coppola, is often ranked among the greatest films ever made?", "options": ["Apocalypse Now", "Goodfellas", "Scarface", "The Godfather"], "answer": 3 },
  { "id": "ent_m11", "topic": "Entertainment", "difficulty": "medium", "question": "Which British rock band's members include Freddie Mercury, Brian May, and Roger Taylor?", "options": ["Led Zeppelin", "Deep Purple", "Queen", "The Who"], "answer": 2 },
  { "id": "ent_m12", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the annual awards show honoring excellence in Broadway theatre?", "options": ["Tony Awards", "Grammy Awards", "Emmy Awards", "Drama Desk Awards"], "answer": 0 },
  { "id": "ent_m13", "topic": "Entertainment", "difficulty": "medium", "question": "Which actor played the Joker in \"The Dark Knight\" (2008), winning a posthumous Academy Award?", "options": ["Jack Nicholson", "Heath Ledger", "Jared Leto", "Joaquin Phoenix"], "answer": 1 },
  { "id": "ent_m14", "topic": "Entertainment", "difficulty": "medium", "question": "In which fictional town is the American sitcom \"The Simpsons\" set?", "options": ["Capital City", "Shelbyville", "Springfield", "Ogdenville"], "answer": 2 },
  { "id": "ent_m15", "topic": "Entertainment", "difficulty": "medium", "question": "Which musician's real name is Robyn Rihanna Fenty?", "options": ["Alicia Keys", "Nicki Minaj", "Beyonce", "Rihanna"], "answer": 3 },
  { "id": "ent_m16", "topic": "Entertainment", "difficulty": "medium", "question": "Which Japanese animation studio produced films like \"Spirited Away\" and \"My Neighbor Totoro\"?", "options": ["Toei Animation", "Madhouse", "Kyoto Animation", "Studio Ghibli"], "answer": 3 },
  { "id": "ent_m17", "topic": "Entertainment", "difficulty": "medium", "question": "Which actor is widely regarded as the greatest silent film comedian, known for his character \"The Tramp\"?", "options": ["Charlie Chaplin", "Stan Laurel", "Buster Keaton", "Harold Lloyd"], "answer": 0 },
  { "id": "ent_m18", "topic": "Entertainment", "difficulty": "medium", "question": "Which actress won multiple consecutive Emmy Awards for Lead Actress in a Comedy Series for her role in \"Veep\"?", "options": ["Amy Poehler", "Tina Fey", "Julia Louis -Dreyfus", "Ellie Kemper"], "answer": 2 },
  { "id": "ent_m19", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the long -running animated show following the Belcher family who run a burger restaurant?", "options": ["King of the Hill", "Bob's Burgers", "Family Guy", "American Dad"], "answer": 1 },
  { "id": "ent_m20", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the adult animated sitcom created by Seth MacFarlane, featuring the Griffin family?", "options": ["Family Guy", "Bob's Burgers", "South Park", "Rick and Morty"], "answer": 0 },
  { "id": "ent_m21", "topic": "Entertainment", "difficulty": "medium", "question": "Who composed the score for the \"Pirates of the Caribbean\" film franchise?", "options": ["James Newton Howard", "John Williams", "Hans Zimmer", "Alan Silvestri"], "answer": 2 },
  { "id": "ent_m22", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the annual awards ceremony for video games, sometimes called the \"Oscars of gaming\"?", "options": ["BAFTA Games Awards", "Golden Joystick Awards", "D.I.C.E. Awards", "The Game Awards"], "answer": 3 },
  { "id": "ent_m23", "topic": "Entertainment", "difficulty": "medium", "question": "Which video game won Game of the Year at The Game Awards in 2023?", "options": ["Spider -Man 2", "Zelda: Tears of the Kingdom", "Alan Wake 2", "Baldur's Gate 3"], "answer": 3 },
  { "id": "ent_m24", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the popular open -world crime video game franchise published by Rockstar Games?", "options": ["Sleeping Dogs", "Grand Theft Auto", "Watch Dogs", "Saints Row"], "answer": 1 },
  { "id": "ent_m25", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the multiplayer online battle arena game developed by Riot Games, a major esports title?", "options": ["Overwatch", "League of Legends", "Valorant", "Dota 2"], "answer": 1 },
  { "id": "ent_m26", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the popular battle royale video game developed by Epic Games?", "options": ["Fortnite", "PUBG", "Warzone", "Apex Legends"], "answer": 0 },
  { "id": "ent_m27", "topic": "Entertainment", "difficulty": "medium", "question": "Which actor won the Academy Award for Best Actor for portraying Freddie Mercury in \"Bohemian Rhapsody\" (2018)?", "options": ["Timothee Chalamet", "Taron Egerton", "Rami Malek", "Joaquin Phoenix"], "answer": 2 },
  { "id": "ent_m28", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the popular musical based on the songs of ABBA, later adapted into a hit film?", "options": ["Rock of Ages", "Moulin Rouge!", "Mamma Mia!", "Jersey Boys"], "answer": 2 },
  { "id": "ent_m29", "topic": "Entertainment", "difficulty": "medium", "question": "Which actress played Donna, the mother, in the \"Mamma Mia!\" film series?", "options": ["Amanda Seyfried", "Julie Walters", "Meryl Streep", "Christine Baranski"], "answer": 2 },
  { "id": "ent_m30", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the popular animated film franchise featuring a green ogre?", "options": ["Shrek", "Trolls", "Hotel Transylvania", "The Croods"], "answer": 0 },
  { "id": "ent_m31", "topic": "Entertainment", "difficulty": "medium", "question": "Which actor voices the title character in the \"Shrek\" film franchise?", "options": ["Eddie Murphy", "Antonio Banderas", "Mike Myers", "Cameron Diaz"], "answer": 2 },
  { "id": "ent_m32", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the 2022 sequel to \"Avatar,\" which became one of the highest -grossing films of all time?", "options": ["Avatar: The New World", "Avatar: The Way of Water", "Avatar Returns", "Avatar: Fire and Ash"], "answer": 1 },
  { "id": "ent_m33", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the internationally franchised competitive cooking show in which home cooks compete under time pressure?", "options": ["Top Chef", "Chopped", "Hell's Kitchen", "MasterChef"], "answer": 3 },
  { "id": "ent_m34", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the anime and manga franchise about a student who gains a supernatural notebook that can kill anyone whose name is written in it?", "options": ["Code Geass", "Death Note", "Tokyo Ghoul", "Attack on Titan"], "answer": 1 },
  { "id": "ent_m35", "topic": "Entertainment", "difficulty": "medium", "question": "Which actor played the title role in the \"Wolverine\" solo film series, part of the X -Men franchise?", "options": ["Liev Schreiber", "Ryan Reynolds", "Hugh Jackman", "James Marsden"], "answer": 2 },
  { "id": "ent_m36", "topic": "Entertainment", "difficulty": "medium", "question": "What is the name of the Pixar animated film about a Mexican boy who travels to the Land of the Dead?", "options": ["Coco", "The Book of Life", "Encanto", "Luca"], "answer": 0 },
  { "id": "ent_m37", "topic": "Entertainment", "difficulty": "medium", "question": "Which composer wrote the score for Pixar's \"Coco,\" incorporating traditional Mexican music?", "options": ["Michael Giacchino", "Randy Newman", "Thomas Newman", "Alexandre Desplat"], "answer": 0 },

  // ==========================================
  //  6. ENTERTAINMENT — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "ent_mh1", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Who was the first African American actor to win the Academy Award for Best Actor?", "options": ["Forest Whitaker", "Morgan Freeman", "Denzel Washington", "Sidney Poitier"], "answer": 3 },
  { "id": "ent_mh2", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Which 2003 fantasy film swept all 11 Academy Awards it was nominated for, tying the record for most Oscar wins?", "options": ["Titanic", "The Lord of the Rings: The Return of the King", "Ben -Hur", "The Lord of the Rings: The Fellowship of the Ring"], "answer": 1 },
  { "id": "ent_mh3", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Who composed the iconic two -note theme music for \"Jaws\"?", "options": ["Bernard Herrmann", "John Williams", "Jerry Goldsmith", "Ennio Morricone"], "answer": 1 },
  { "id": "ent_mh4", "topic": "Entertainment", "difficulty": "medium-hard", "question": "What is the name of the record label famously associated with the \"Motown Sound\" of the 1960s?", "options": ["Stax Records", "Motown Records", "Sun Records", "Atlantic Records"], "answer": 1 },
  { "id": "ent_mh5", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Which actress became the youngest person to win a competitive Academy Award for acting, at age 10, for \"Paper Moon\"?", "options": ["Shirley Temple", "Tatum O'Neal", "Quvenzhane Wallis", "Anna Paquin"], "answer": 1 },
  { "id": "ent_mh6", "topic": "Entertainment", "difficulty": "medium-hard", "question": "What is the name of the fictional prison in the film \"The Shawshank Redemption\"?", "options": ["Sing Sing", "Shawshank State Penitentiary", "Blackgate Prison", "Alcatraz"], "answer": 1 },
  { "id": "ent_mh7", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Which musician is known as \"The Boss,\" famous for albums like \"Born to Run\"?", "options": ["Tom Petty", "Bruce Springsteen", "Bob Seger", "Billy Joel"], "answer": 1 },
  { "id": "ent_mh8", "topic": "Entertainment", "difficulty": "medium-hard", "question": "What is the name of the highest honor awarded at the Cannes Film Festival?", "options": ["Golden Bear", "Palme d'Or", "Golden Lion", "Silver Shell"], "answer": 1 },
  { "id": "ent_mh9", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Which director is known for distinctive, symmetrical visual styles in films like \"The Grand Budapest Hotel\" and \"Moonrise Kingdom\"?", "options": ["Tim Burton", "Wes Anderson", "Guillermo del Toro", "Spike Jonze"], "answer": 1 },
  { "id": "ent_mh10", "topic": "Entertainment", "difficulty": "medium-hard", "question": "What is the name of the fictional criminal organization that James Bond frequently battles?", "options": ["SPECTRE", "COBRA", "KAOS", "HYDRA"], "answer": 0 },
  { "id": "ent_mh11", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Which actor played both a young and old version of a character in \"The Curious Case of Benjamin Button,\" aging in reverse?", "options": ["Will Smith", "George Clooney", "Brad Pitt", "Tom Hanks"], "answer": 2 },
  { "id": "ent_mh12", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Which Bollywood actor is often referred to as the \"King of Bollywood\" or \"King Khan\"?", "options": ["Salman Khan", "Shah Rukh Khan", "Aamir Khan", "Saif Ali Khan"], "answer": 1 },
  { "id": "ent_mh13", "topic": "Entertainment", "difficulty": "medium-hard", "question": "What is the name of the 1927 film considered the first \"talkie\" with synchronized dialogue?", "options": ["Metropolis", "Wings", "The Jazz Singer", "Sunrise"], "answer": 2 },
  { "id": "ent_mh14", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Which composer wrote the scores for both \"Interstellar\" and \"Inception\"?", "options": ["Thomas Newman", "Alexandre Desplat", "Hans Zimmer", "John Williams"], "answer": 2 },
  { "id": "ent_mh15", "topic": "Entertainment", "difficulty": "medium-hard", "question": "What is the name of the British Academy's annual film awards, considered the UK equivalent of the Oscars?", "options": ["BAFTA Awards", "London Film Critics Circle Awards", "Empire Awards", "British Independent Film Awards"], "answer": 0 },
  { "id": "ent_mh16", "topic": "Entertainment", "difficulty": "medium-hard", "question": "Which composer is known for scoring the \"Harry Potter,\" \"Jurassic Park,\" and \"Star Wars\" franchises?", "options": ["John Williams", "Hans Zimmer", "Danny Elfman", "James Newton Howard"], "answer": 0 },
  { "id": "ent_mh17", "topic": "Entertainment", "difficulty": "medium-hard", "question": "What is the popular term for a film sequel, prequel, or spin -off designed to launch a shared fictional universe?", "options": ["Spin -off", "Reboot", "Franchise starter", "Remake"], "answer": 2 },

  // ==========================================
  //  6. ENTERTAINMENT — STEP 5: HARD
  // ==========================================
  { "id": "ent_h1", "topic": "Entertainment", "difficulty": "hard", "question": "Which film, now widely regarded as one of the greatest ever made, lost the Best Picture Oscar for 1941 to \"How Green Was My Valley\"?", "options": ["Sergeant York", "The Maltese Falcon", "Suspicion", "Citizen Kane"], "answer": 3 },
  { "id": "ent_h2", "topic": "Entertainment", "difficulty": "hard", "question": "Who directed and starred in the lead role of the influential 1941 film \"Citizen Kane\"?", "options": ["William Wyler", "Preston Sturges", "John Ford", "Orson Welles"], "answer": 3 },
  { "id": "ent_h3", "topic": "Entertainment", "difficulty": "hard", "question": "What is the name of the film technique, associated with Alfred Hitchcock's \"Vertigo,\" combining a zoom and an opposing camera dolly move?", "options": ["Rack focus", "Match cut", "Dolly zoom", "Jump cut"], "answer": 2 },
  { "id": "ent_h4", "topic": "Entertainment", "difficulty": "hard", "question": "Which Andrew Lloyd Webber musical was the longest -running show in Broadway history before its 2023 closing?", "options": ["Cats", "The Phantom of the Opera", "Les Miserables", "Evita"], "answer": 1 },
  { "id": "ent_h5", "topic": "Entertainment", "difficulty": "hard", "question": "Which silent film star created, wrote, and directed the character known as \"The Tramp\"?", "options": ["Fatty Arbuckle", "Harold Lloyd", "Buster Keaton", "Charlie Chaplin"], "answer": 3 },
  { "id": "ent_h6", "topic": "Entertainment", "difficulty": "hard", "question": "Which 1995 Pixar film became the first fully computer -animated feature film ever released?", "options": ["Shrek", "A Bug's Life", "Antz", "Toy Story"], "answer": 3 },
  { "id": "ent_h7", "topic": "Entertainment", "difficulty": "hard", "question": "Which actor was the first to win the Best Actor Academy Award in consecutive years, for 1937's \"Captains Courageous\" and 1938's \"Boys Town\"?", "options": ["James Stewart", "Spencer Tracy", "Gary Cooper", "Clark Gable"], "answer": 1 },
  { "id": "ent_h8", "topic": "Entertainment", "difficulty": "hard", "question": "What is the name of the influential 1920s German film movement known for stark, angular sets and shadows, exemplified by \"The Cabinet of Dr. Caligari\"?", "options": ["Neue Sachlichkeit", "German Expressionism", "Bauhaus cinema", "Kammerspielfilm"], "answer": 1 },
  { "id": "ent_h9", "topic": "Entertainment", "difficulty": "hard", "question": "Who was the first actress to win an Academy Award for a performance in a foreign -language film, for 1962's \"Two Women\"?", "options": ["Sophia Loren", "Anna Magnani", "Simone Signoret", "Ingrid Bergman"], "answer": 0 },
  { "id": "ent_h10", "topic": "Entertainment", "difficulty": "hard", "question": "Which French New Wave director is known for the 1960 film \"Breathless\"?", "options": ["Eric Rohmer", "Claude Chabrol", "Francois Truffaut", "Jean -Luc Godard"], "answer": 3 },
  { "id": "ent_h11", "topic": "Entertainment", "difficulty": "hard", "question": "Which 1988 Japanese animated film, directed by Isao Takahata, is considered one of the most devastating war dramas in animation history?", "options": ["Princess Mononoke", "Barefoot Gen", "Grave of the Fireflies", "Akira"], "answer": 2 },
  { "id": "ent_h12", "topic": "Entertainment", "difficulty": "hard", "question": "Which cinematographer, known for his work on \"Citizen Kane,\" pioneered the use of deep -focus photography?", "options": ["James Wong Howe", "Stanley Cortez", "Gregg Toland", "Karl Freund"], "answer": 2 },
  { "id": "ent_h13", "topic": "Entertainment", "difficulty": "hard", "question": "What is the Japanese term for a genre of anime and manga aimed primarily at young boys, exemplified by \"Naruto\" and \"Dragon Ball\"?", "options": ["Josei", "Seinen", "Shonen", "Shojo"], "answer": 2 },
  { "id": "ent_h14", "topic": "Entertainment", "difficulty": "hard", "question": "Whose 1971 album \"What's Going On\" is frequently cited among the greatest albums of all time for its social commentary?", "options": ["Marvin Gaye", "Stevie Wonder", "Sam Cooke", "Curtis Mayfield"], "answer": 0 },
  { "id": "ent_h15", "topic": "Entertainment", "difficulty": "hard", "question": "Which chart, first published in 1952, has tracked the best -selling singles in the United Kingdom?", "options": ["UK Singles Chart", "ARIA Charts", "Eurochart", "Billboard Hot 100"], "answer": 0 },
  { "id": "ent_h16", "topic": "Entertainment", "difficulty": "hard", "question": "Who was the first host of the Academy Awards ceremony, in 1929?", "options": ["Douglas Fairbanks", "Bob Hope", "Billy Crystal", "Johnny Carson"], "answer": 0 },
  { "id": "ent_h17", "topic": "Entertainment", "difficulty": "hard", "question": "What is the name of the animation technique, pioneered by Disney, using multiple layers of artwork at different distances from the camera to create depth?", "options": ["Cel shading", "Rotoscoping", "Stop -motion", "Multiplane camera"], "answer": 3 },

  // ==========================================
  //  7. SCIENCE & TECHNOLOGY — STEP 1: EASY
  // ==========================================
  { "id": "st_e1", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the process called by which a cell divides to produce two identical daughter cells?", "options": ["Fertilization", "Osmosis", "Meiosis", "Mitosis"], "answer": 3 },
  { "id": "st_e2", "topic": "Science & Technology", "difficulty": "easy", "question": "Newton's Second Law of Motion is commonly expressed by which equation?", "options": ["Power = mass x velocity", "Force = mass x acceleration squared", "Force = mass x acceleration", "Energy = mass x speed of light squared"], "answer": 2 },
  { "id": "st_e3", "topic": "Science & Technology", "difficulty": "easy", "question": "What term describes energy that is stored in an object because of its position?", "options": ["Chemical energy", "Kinetic energy", "Potential energy", "Thermal energy"], "answer": 2 },
  { "id": "st_e4", "topic": "Science & Technology", "difficulty": "easy", "question": "Which layer of Earth's atmosphere contains the ozone layer?", "options": ["Mesosphere", "Troposphere", "Stratosphere", "Thermosphere"], "answer": 2 },
  { "id": "st_e5", "topic": "Science & Technology", "difficulty": "easy", "question": "What type of chemical bond involves atoms sharing pairs of electrons?", "options": ["Covalent bond", "Metallic bond", "Ionic bond", "Hydrogen bond"], "answer": 0 },
  { "id": "st_e6", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the name of the scientific theory stating that all living things are made of cells?", "options": ["Germ theory", "Big Bang theory", "Evolution theory", "Cell theory"], "answer": 3 },
  { "id": "st_e7", "topic": "Science & Technology", "difficulty": "easy", "question": "What term describes a protein that speeds up a specific biological chemical reaction?", "options": ["Enzyme", "Hormone", "Antibody", "Catalyst"], "answer": 0 },
  { "id": "st_e8", "topic": "Science & Technology", "difficulty": "easy", "question": "What unit is used to measure the loudness of sound?", "options": ["Decibel", "Pascal", "Hertz", "Watt"], "answer": 0 },
  { "id": "st_e9", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the process called by which the body converts food into usable energy?", "options": ["Digestion", "Metabolism", "Absorption", "Respiration"], "answer": 1 },
  { "id": "st_e10", "topic": "Science & Technology", "difficulty": "easy", "question": "What term describes the bending of light as it passes from one medium into another?", "options": ["Dispersion", "Reflection", "Diffraction", "Refraction"], "answer": 3 },
  { "id": "st_e11", "topic": "Science & Technology", "difficulty": "easy", "question": "What do we call a substance made of two or more elements chemically combined in fixed proportions?", "options": ["Alloy", "Mixture", "Compound", "Solution"], "answer": 2 },
  { "id": "st_e12", "topic": "Science & Technology", "difficulty": "easy", "question": "Which part of the human brain is primarily responsible for balance and coordination?", "options": ["Medulla oblongata", "Cerebellum", "Hypothalamus", "Cerebrum"], "answer": 1 },
  { "id": "st_e13", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the name of the process where a solid changes directly into a gas without becoming liquid first?", "options": ["Sublimation", "Condensation", "Evaporation", "Deposition"], "answer": 0 },
  { "id": "st_e14", "topic": "Science & Technology", "difficulty": "easy", "question": "What term describes the total number of protons and neutrons in an atomic nucleus?", "options": ["Molar mass", "Mass number", "Atomic number", "Atomic mass"], "answer": 1 },
  { "id": "st_e15", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the name of the hormone, produced by the pancreas, that regulates blood sugar levels?", "options": ["Estrogen", "Insulin", "Adrenaline", "Thyroxine"], "answer": 1 },
  { "id": "st_e16", "topic": "Science & Technology", "difficulty": "easy", "question": "What term describes organisms that can produce their own food through photosynthesis or similar processes?", "options": ["Decomposers", "Heterotrophs", "Consumers", "Autotrophs"], "answer": 3 },
  { "id": "st_e17", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the name of the force that opposes motion between two surfaces in contact?", "options": ["Gravity", "Tension", "Momentum", "Friction"], "answer": 3 },
  { "id": "st_e18", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the chemical symbol for iron?", "options": ["In", "Fe", "Ir", "I"], "answer": 1 },
  { "id": "st_e19", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the chemical symbol for potassium?", "options": ["P", "Po", "K", "Pt"], "answer": 2 },
  { "id": "st_e20", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the chemical symbol for silver?", "options": ["Sr", "Si", "Ag", "Sv"], "answer": 2 },
  { "id": "st_e21", "topic": "Science & Technology", "difficulty": "easy", "question": "Which organ in the human body produces insulin?", "options": ["Spleen", "Liver", "Kidney", "Pancreas"], "answer": 3 },
  { "id": "st_e22", "topic": "Science & Technology", "difficulty": "easy", "question": "What part of a cell contains most of its genetic material?", "options": ["Cell membrane", "Cytoplasm", "Nucleus", "Ribosome"], "answer": 2 },
  { "id": "st_e23", "topic": "Science & Technology", "difficulty": "easy", "question": "What gas makes soda drinks fizzy?", "options": ["Nitrogen", "Hydrogen", "Carbon dioxide", "Oxygen"], "answer": 2 },
  { "id": "st_e24", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the hardest natural substance found on Earth?", "options": ["Quartz", "Diamond", "Titanium", "Granite"], "answer": 1 },
  { "id": "st_e25", "topic": "Science & Technology", "difficulty": "easy", "question": "How many chambers does the human heart have?", "options": ["2", "4", "3", "6"], "answer": 1 },
  { "id": "st_e26", "topic": "Science & Technology", "difficulty": "easy", "question": "What do we call the process by which a caterpillar transforms into a butterfly?", "options": ["Photosynthesis", "Pollination", "Germination", "Metamorphosis"], "answer": 3 },
  { "id": "st_e27", "topic": "Science & Technology", "difficulty": "easy", "question": "What part of the eye controls how much light enters, by adjusting the size of the pupil?", "options": ["Retina", "Cornea", "Iris", "Lens"], "answer": 2 },
  { "id": "st_e28", "topic": "Science & Technology", "difficulty": "easy", "question": "What term describes organisms, like bacteria, that consist of only a single cell?", "options": ["Unicellular organisms", "Cellular colonies", "Prokaryotic plants", "Multicellular organisms"], "answer": 0 },
  { "id": "st_e29", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the unit used to measure electric current?", "options": ["Watt", "Volt", "Joule", "Ampere"], "answer": 3 },
  { "id": "st_e30", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the process by which plants lose water vapor through their leaves called?", "options": ["Photosynthesis", "Absorption", "Respiration", "Transpiration"], "answer": 3 },
  { "id": "st_e31", "topic": "Science & Technology", "difficulty": "easy", "question": "What do we call a substance that cannot be broken down into simpler substances by chemical means?", "options": ["Compound", "Mixture", "Element", "Molecule"], "answer": 2 },
  { "id": "st_e32", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the boiling point of water in degrees Fahrenheit?", "options": ["100 F", "32 F", "212 F", "180 F"], "answer": 2 },
  { "id": "st_e33", "topic": "Science & Technology", "difficulty": "easy", "question": "What do we call the layer of Earth located beneath the crust, made of hot, dense rock?", "options": ["Crust", "Lithosphere", "Core", "Mantle"], "answer": 3 },
  { "id": "st_e34", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the term for an animal without a backbone?", "options": ["Amphibian", "Vertebrate", "Invertebrate", "Mammal"], "answer": 2 },
  { "id": "st_e35", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the term for an animal with a backbone?", "options": ["Mollusk", "Vertebrate", "Arthropod", "Invertebrate"], "answer": 1 },
  { "id": "st_e36", "topic": "Science & Technology", "difficulty": "easy", "question": "What do we call the process by which the body breaks down food into usable nutrients?", "options": ["Respiration", "Excretion", "Circulation", "Digestion"], "answer": 3 },
  { "id": "st_e37", "topic": "Science & Technology", "difficulty": "easy", "question": "What is the name of the gland in the human body often called the \"master gland\" because it controls other hormone -producing glands?", "options": ["Pituitary gland", "Adrenal gland", "Pineal gland", "Thyroid gland"], "answer": 0 },

  // ==========================================
  //  7. SCIENCE & TECHNOLOGY — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "st_em1", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the process called in which an RNA copy is made of a gene's DNA sequence?", "options": ["Mutation", "Transcription", "Replication", "Translation"], "answer": 1 },
  { "id": "st_em2", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "Which particle is responsible for mediating the electromagnetic force?", "options": ["Photon", "Gluon", "Boson", "Electron"], "answer": 0 },
  { "id": "st_em3", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What term describes the bending of a star's light by a massive object's gravity, as predicted by general relativity?", "options": ["Diffraction", "Refraction", "Gravitational lensing", "Redshift"], "answer": 2 },
  { "id": "st_em4", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the process called by which an organism maintains a stable internal environment?", "options": ["Adaptation", "Osmoregulation", "Homeostasis", "Metabolism"], "answer": 2 },
  { "id": "st_em5", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the SI unit of electrical resistance?", "options": ["Ohm", "Farad", "Ampere", "Volt"], "answer": 0 },
  { "id": "st_em6", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What term describes a chemical reaction that absorbs heat from its surroundings?", "options": ["Catalytic reaction", "Redox reaction", "Endothermic reaction", "Exothermic reaction"], "answer": 2 },
  { "id": "st_em7", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the name of the particle, confirmed in 2012, that is believed to give other particles mass?", "options": ["Tau neutrino", "Graviton", "Gluon", "Higgs boson"], "answer": 3 },
  { "id": "st_em8", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What evolutionary process explains how bacteria populations develop resistance to antibiotics over time?", "options": ["Mutagenesis", "Genetic drift", "Gene flow", "Natural selection"], "answer": 3 },
  { "id": "st_em9", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What term describes a variant of an element with the same number of protons but a different number of neutrons?", "options": ["Allotrope", "Isotope", "Ion", "Isomer"], "answer": 1 },
  { "id": "st_em10", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the name of the enzyme that unwinds the DNA double helix during replication?", "options": ["Ligase", "Helicase", "Polymerase", "Primase"], "answer": 1 },
  { "id": "st_em11", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What term describes the minimum energy required to start a chemical reaction?", "options": ["Activation energy", "Bond energy", "Free energy", "Potential energy"], "answer": 0 },
  { "id": "st_em12", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What law states that energy cannot be created or destroyed, only converted from one form to another?", "options": ["Newton's First Law", "Second Law of Thermodynamics", "Law of Conservation of Mass", "First Law of Thermodynamics"], "answer": 3 },
  { "id": "st_em13", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the name of the plant cell structure that contains chlorophyll and carries out photosynthesis?", "options": ["Mitochondria", "Vacuole", "Nucleus", "Chloroplast"], "answer": 3 },
  { "id": "st_em14", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the process called by which a cell engulfs large particles or other cells?", "options": ["Osmosis", "Phagocytosis", "Pinocytosis", "Exocytosis"], "answer": 1 },
  { "id": "st_em15", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What term describes materials that lose all electrical resistance below a critical temperature?", "options": ["Superconductors", "Semiconductors", "Insulators", "Conductors"], "answer": 0 },
  { "id": "st_em16", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "Which of the four fundamental forces of nature governs radioactive beta decay?", "options": ["Strong nuclear force", "Weak nuclear force", "Gravity", "Electromagnetic force"], "answer": 1 },
  { "id": "st_em17", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What term describes a catalytic molecule made of RNA rather than protein?", "options": ["Enzyme", "Hormone", "Ribozyme", "Antibody"], "answer": 2 },
  { "id": "st_em18", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the chemical formula for table salt?", "options": ["CaCl2", "KCl", "NaOH", "NaCl"], "answer": 3 },
  { "id": "st_em19", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the process by which the human body maintains a constant internal temperature called?", "options": ["Circulation", "Metabolism", "Thermoregulation", "Homeostasis"], "answer": 2 },
  { "id": "st_em20", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the name of the green pigment in plants that captures sunlight for photosynthesis?", "options": ["Chlorophyll", "Carotene", "Melanin", "Xanthophyll"], "answer": 0 },
  { "id": "st_em21", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for the permanent disappearance of a species from Earth?", "options": ["Extinction", "Migration", "Adaptation", "Hibernation"], "answer": 0 },
  { "id": "st_em22", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What do we call the variety of life found in a particular habitat or on Earth as a whole?", "options": ["Ecology", "Symbiosis", "Biosphere", "Biodiversity"], "answer": 3 },
  { "id": "st_em23", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the name of the process by which rocks are broken down into smaller pieces by wind, water, or ice?", "options": ["Compaction", "Erosion", "Weathering", "Sedimentation"], "answer": 2 },
  { "id": "st_em24", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for the transfer of heat through direct contact between materials?", "options": ["Convection", "Insulation", "Radiation", "Conduction"], "answer": 3 },
  { "id": "st_em25", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for the transfer of heat through the movement of fluids like air or water?", "options": ["Convection", "Diffusion", "Radiation", "Conduction"], "answer": 0 },
  { "id": "st_em26", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for the transfer of heat through electromagnetic waves, without needing a medium?", "options": ["Conduction", "Radiation", "Convection", "Reflection"], "answer": 1 },
  { "id": "st_em27", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What do we call a chemical reaction that releases heat into its surroundings?", "options": ["Exothermic reaction", "Endothermic reaction", "Redox reaction", "Catalytic reaction"], "answer": 0 },
  { "id": "st_em28", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for the smallest functional unit of the nervous system, responsible for transmitting signals?", "options": ["Nerve", "Axon", "Neuron", "Synapse"], "answer": 2 },
  { "id": "st_em29", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the name of the fluid connective tissue that transports oxygen and nutrients throughout the human body?", "options": ["Plasma", "Mucus", "Lymph", "Blood"], "answer": 3 },
  { "id": "st_em30", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for the genetic material that carries hereditary information in living organisms?", "options": ["RNA", "DNA", "Protein", "Enzyme"], "answer": 1 },
  { "id": "st_em31", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the name of the process by which DNA makes a copy of itself before cell division?", "options": ["Transcription", "DNA replication", "Mutation", "Translation"], "answer": 1 },
  { "id": "st_em32", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What do we call the scientific study of heredity and variation in living organisms?", "options": ["Biochemistry", "Physiology", "Microbiology", "Genetics"], "answer": 3 },
  { "id": "st_em33", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for an organism's complete set of genetic material?", "options": ["Genotype", "Chromosome", "Phenotype", "Genome"], "answer": 3 },
  { "id": "st_em34", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for the total amount of matter contained in an object?", "options": ["Mass", "Weight", "Density", "Volume"], "answer": 0 },
  { "id": "st_em35", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for the force of gravity acting on an object's mass?", "options": ["Density", "Weight", "Pressure", "Mass"], "answer": 1 },
  { "id": "st_em36", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What do we call the study of chemical processes occurring within living organisms?", "options": ["Organic chemistry", "Biochemistry", "Geochemistry", "Physical chemistry"], "answer": 1 },
  { "id": "st_em37", "topic": "Science & Technology", "difficulty": "easy-medium", "question": "What is the term for a substance used to detect the presence of another substance in a chemical reaction, often via a color change?", "options": ["Solvent", "Reagent", "Catalyst", "Indicator"], "answer": 3 },

  // ==========================================
  //  7. SCIENCE & TECHNOLOGY — STEP 3: MEDIUM
  // ==========================================
  { "id": "st_m1", "topic": "Science & Technology", "difficulty": "medium", "question": "Which equation describes how the quantum state of a physical system evolves over time?", "options": ["Heisenberg's uncertainty principle", "Schrodinger equation", "Planck's law", "Dirac equation"], "answer": 1 },
  { "id": "st_m2", "topic": "Science & Technology", "difficulty": "medium", "question": "What quantum mechanical phenomenon causes two particles to remain correlated regardless of the distance separating them?", "options": ["Quantum tunneling", "Quantum entanglement", "Superposition", "Wave -particle duality"], "answer": 1 },
  { "id": "st_m3", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the name of the enzyme complex that synthesizes ATP in mitochondria using a proton gradient?", "options": ["ATP synthase", "Succinate dehydrogenase", "Cytochrome c oxidase", "NADH dehydrogenase"], "answer": 0 },
  { "id": "st_m4", "topic": "Science & Technology", "difficulty": "medium", "question": "The Krebs cycle, a key stage of cellular respiration, is also known by what other name?", "options": ["Urea cycle", "Glycolysis cycle", "Calvin cycle", "Citric acid cycle"], "answer": 3 },
  { "id": "st_m5", "topic": "Science & Technology", "difficulty": "medium", "question": "What term describes the theoretical temperature at which a substance has the minimum possible thermal energy?", "options": ["Curie point", "Triple point", "Absolute zero", "Critical point"], "answer": 2 },
  { "id": "st_m6", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for the phenomenon in which a virus inserts its genetic material into a host's genome and remains dormant?", "options": ["Lysis", "Conjugation", "Transduction", "Lysogeny"], "answer": 3 },
  { "id": "st_m7", "topic": "Science & Technology", "difficulty": "medium", "question": "Which principle states that it is impossible to simultaneously know both the exact position and momentum of a particle?", "options": ["Bohr's complementarity principle", "Heisenberg's uncertainty principle", "Schrodinger's principle", "Pauli exclusion principle"], "answer": 1 },
  { "id": "st_m8", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the process called in which certain atomic nuclei split into smaller nuclei, releasing energy?", "options": ["Nuclear fusion", "Radioactive decay", "Beta decay", "Nuclear fission"], "answer": 3 },
  { "id": "st_m9", "topic": "Science & Technology", "difficulty": "medium", "question": "What term describes a chromosomal mutation in which a segment is reversed end to end?", "options": ["Duplication", "Deletion", "Translocation", "Inversion"], "answer": 3 },
  { "id": "st_m10", "topic": "Science & Technology", "difficulty": "medium", "question": "Which rule states that no two electrons in an atom can share the same set of four quantum numbers?", "options": ["Hund's rule", "Aufbau principle", "Pauli exclusion principle", "Heisenberg's principle"], "answer": 2 },
  { "id": "st_m11", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the name of the metabolic pathway that breaks down glucose into pyruvate in the cytoplasm?", "options": ["Lipolysis", "Gluconeogenesis", "Glycogenolysis", "Glycolysis"], "answer": 3 },
  { "id": "st_m12", "topic": "Science & Technology", "difficulty": "medium", "question": "What term describes the smallest repeating unit of a crystal lattice that shows the full symmetry of the crystal structure?", "options": ["Crystal system", "Unit cell", "Bravais lattice", "Lattice point"], "answer": 1 },
  { "id": "st_m13", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the name of the effect, discovered by Kamerlingh Onnes in 1911, in which certain materials lose all electrical resistance below a critical temperature?", "options": ["Superconductivity", "Superfluidity", "Ferromagnetism", "Piezoelectricity"], "answer": 0 },
  { "id": "st_m14", "topic": "Science & Technology", "difficulty": "medium", "question": "What term describes the process by which a fertilized egg cell divides and differentiates into a complete organism?", "options": ["Morphogenesis", "Gametogenesis", "Embryogenesis", "Organogenesis"], "answer": 2 },
  { "id": "st_m15", "topic": "Science & Technology", "difficulty": "medium", "question": "What term describes a gene's expression being influenced by which parent it was inherited from, due to epigenetic marks?", "options": ["Gene silencing", "X -inactivation", "Alternative splicing", "Genomic imprinting"], "answer": 3 },
  { "id": "st_m16", "topic": "Science & Technology", "difficulty": "medium", "question": "What quantum mechanical phenomenon allows a particle to pass through an energy barrier it classically should not be able to cross?", "options": ["Zero -point energy", "Wave function collapse", "Quantum tunneling", "Quantum entanglement"], "answer": 2 },
  { "id": "st_m17", "topic": "Science & Technology", "difficulty": "medium", "question": "What term describes the specialized protective protein -DNA structures found at the ends of chromosomes?", "options": ["Histones", "Centromeres", "Telomeres", "Nucleosomes"], "answer": 2 },
  { "id": "st_m18", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for an organism capable of surviving in extreme environmental conditions, such as extreme heat, cold, or pressure?", "options": ["Extremophile", "Parasite", "Autotroph", "Decomposer"], "answer": 0 },
  { "id": "st_m19", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the name of the scientific theory explaining how Earth's continents have moved over geological time due to plate movement?", "options": ["Crustal dynamics", "Continental uplift theory", "Seismic drift theory", "Plate tectonics"], "answer": 3 },
  { "id": "st_m20", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for the boundary where two tectonic plates meet and interact?", "options": ["Crust seam", "Tectonic ridge", "Fault core", "Plate boundary"], "answer": 3 },
  { "id": "st_m21", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the name of the process by which magma rises and solidifies to form new oceanic crust at mid-ocean ridges?", "options": ["Seafloor spreading", "Subduction", "Isostasy", "Continental drift"], "answer": 0 },
  { "id": "st_m22", "topic": "Science & Technology", "difficulty": "medium", "question": "What instrument is used to measure and record the intensity of earthquakes?", "options": ["Seismograph", "Anemometer", "Hydrometer", "Barometer"], "answer": 0 },
  { "id": "st_m23", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the name of the scale used to measure the magnitude of earthquakes?", "options": ["Beaufort scale", "Kelvin scale", "Richter scale", "Mercalli index"], "answer": 2 },
  { "id": "st_m24", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for the scientific study of fossils and ancient life forms?", "options": ["Geology", "Anthropology", "Paleontology", "Archaeology"], "answer": 2 },
  { "id": "st_m25", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the name of the geological era during which dinosaurs lived, spanning roughly 180 million years?", "options": ["Cenozoic Era", "Paleozoic Era", "Precambrian Era", "Mesozoic Era"], "answer": 3 },
  { "id": "st_m26", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for a group of organisms of the same species living in the same area and able to interbreed?", "options": ["Ecosystem", "Species", "Community", "Population"], "answer": 3 },
  { "id": "st_m27", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for the evolutionary process by which new species arise?", "options": ["Speciation", "Adaptation", "Mutation", "Natural selection"], "answer": 0 },
  { "id": "st_m28", "topic": "Science & Technology", "difficulty": "medium", "question": "Which naturalist developed the theory of evolution by natural selection?", "options": ["Gregor Mendel", "Alfred Wallace", "Jean -Baptiste Lamarck", "Charles Darwin"], "answer": 3 },
  { "id": "st_m29", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the title of Charles Darwin's landmark 1859 book outlining his theory of evolution?", "options": ["The Voyage of the Beagle", "On the Origin of Species", "The Descent of Man", "The Expression of Emotions"], "answer": 1 },
  { "id": "st_m30", "topic": "Science & Technology", "difficulty": "medium", "question": "What term describes structures in different species that share a common evolutionary origin despite serving different functions?", "options": ["Homologous structures", "Convergent structures", "Vestigial structures", "Analogous structures"], "answer": 0 },
  { "id": "st_m31", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for a relationship between two species in which both organisms benefit?", "options": ["Parasitism", "Commensalism", "Predation", "Mutualism"], "answer": 3 },
  { "id": "st_m32", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for a relationship between two species in which one benefits and the other is harmed?", "options": ["Parasitism", "Mutualism", "Commensalism", "Symbiosis"], "answer": 0 },
  { "id": "st_m33", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for a relationship in which one species benefits while the other is neither helped nor harmed?", "options": ["Mutualism", "Commensalism", "Parasitism", "Competition"], "answer": 1 },
  { "id": "st_m34", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for the specific role and position an organism occupies within its ecosystem?", "options": ["Habitat", "Trophic level", "Biome", "Ecological niche"], "answer": 3 },
  { "id": "st_m35", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the name of the model describing how energy and nutrients flow through an ecosystem via interconnected feeding relationships?", "options": ["Food chain", "Energy pyramid", "Food web", "Nutrient cycle"], "answer": 2 },
  { "id": "st_m36", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for the base level of a food chain, typically organisms like plants that generate their own energy?", "options": ["Consumer", "Producer", "Decomposer", "Predator"], "answer": 1 },
  { "id": "st_m37", "topic": "Science & Technology", "difficulty": "medium", "question": "What is the term for organisms that break down dead organic matter, recycling nutrients back into the ecosystem?", "options": ["Decomposer", "Herbivore", "Scavenger", "Producer"], "answer": 0 },

  // ==========================================
  //  7. SCIENCE & TECHNOLOGY — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "st_mh1", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the name of the equation relating pressure, volume, and temperature of an ideal gas?", "options": ["Ideal gas law", "Gay -Lussac's Law", "Boyle's Law", "Charles's Law"], "answer": 0 },
  { "id": "st_mh2", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the SI unit of electrical inductance?", "options": ["Henry", "Weber", "Farad", "Tesla"], "answer": 0 },
  { "id": "st_mh3", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the name of the effect where certain materials generate a voltage when subjected to mechanical stress?", "options": ["Thermoelectric effect", "Hall effect", "Piezoelectric effect", "Photoelectric effect"], "answer": 2 },
  { "id": "st_mh4", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What law states that current through a conductor is proportional to voltage and inversely proportional to resistance?", "options": ["Coulomb's Law", "Ohm's Law", "Faraday's Law", "Kirchhoff's Law"], "answer": 1 },
  { "id": "st_mh5", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the term for the amount of electric charge a capacitor can store per unit of voltage?", "options": ["Conductance", "Resistance", "Capacitance", "Inductance"], "answer": 2 },
  { "id": "st_mh6", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the name of the process by which an unstable atomic nucleus emits particles or energy?", "options": ["Radioactive decay", "Ionization", "Nuclear fusion", "Electrolysis"], "answer": 0 },
  { "id": "st_mh7", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the SI unit of magnetic flux?", "options": ["Henry", "Tesla", "Weber", "Gauss"], "answer": 2 },
  { "id": "st_mh8", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What principle states that the total energy of an isolated system remains constant over time?", "options": ["Conservation of energy", "Conservation of mass", "Conservation of charge", "Conservation of momentum"], "answer": 0 },
  { "id": "st_mh9", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the term for a semiconductor deliberately treated with impurities to alter its electrical properties?", "options": ["Insulated semiconductor", "Doped semiconductor", "Intrinsic semiconductor", "Superconductor"], "answer": 1 },
  { "id": "st_mh10", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "Which of Kirchhoff's laws states that the sum of currents entering a junction equals the sum leaving it?", "options": ["Kirchhoff's Radiation Law", "Kirchhoff's Voltage Law", "Kirchhoff's Third Law", "Kirchhoff's Current Law"], "answer": 3 },
  { "id": "st_mh11", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the term for the process by which a changing magnetic field induces a current in a nearby conductor?", "options": ["Magnetic saturation", "Electrostatic discharge", "Eddy current formation", "Electromagnetic induction"], "answer": 3 },
  { "id": "st_mh12", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the term for the frequency at which a system oscillates with maximum amplitude when driven externally?", "options": ["Sampling frequency", "Fundamental frequency", "Resonant frequency", "Cutoff frequency"], "answer": 2 },
  { "id": "st_mh13", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the name of the transistor configuration in which the emitter terminal is shared between the input and output circuits?", "options": ["Common -source configuration", "Common -emitter configuration", "Common -base configuration", "Common -collector configuration"], "answer": 1 },
  { "id": "st_mh14", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the SI unit of luminous intensity?", "options": ["Watt", "Candela", "Lumen", "Lux"], "answer": 1 },
  { "id": "st_mh15", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the term for the process of converting alternating current (AC) into direct current (DC)?", "options": ["Modulation", "Amplification", "Inversion", "Rectification"], "answer": 3 },
  { "id": "st_mh16", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What equation describes how the rate of a chemical reaction increases with temperature?", "options": ["Van't Hoff equation", "Clausius -Clapeyron equation", "Arrhenius equation", "Nernst equation"], "answer": 2 },
  { "id": "st_mh17", "topic": "Science & Technology", "difficulty": "medium-hard", "question": "What is the term for the minimum voltage needed for a silicon diode to conduct significantly, typically around 0.7V?", "options": ["Breakdown voltage", "Reverse voltage", "Peak inverse voltage", "Forward voltage"], "answer": 3 },

  // ==========================================
  //  7. SCIENCE & TECHNOLOGY — STEP 5: HARD
  // ==========================================
  { "id": "st_h1", "topic": "Science & Technology", "difficulty": "hard", "question": "What theorem states that any linear electrical circuit can be simplified to a single voltage source in series with a resistance?", "options": ["Norton's theorem", "Superposition theorem", "Millman's theorem", "Thevenin's theorem"], "answer": 3 },
  { "id": "st_h2", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the equivalent circuit theorem using a current source in parallel with a resistance, as an alternative to Thevenin's theorem?", "options": ["Superposition theorem", "Reciprocity theorem", "Norton's theorem", "Thevenin's theorem"], "answer": 2 },
  { "id": "st_h3", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the term for an operational amplifier's output flattening out because the input signal exceeds the supply voltage limits?", "options": ["Resonance", "Saturation", "Attenuation", "Rectification"], "answer": 1 },
  { "id": "st_h4", "topic": "Science & Technology", "difficulty": "hard", "question": "What theorem states that a signal must be sampled at least twice its highest frequency component to be accurately reconstructed?", "options": ["Fourier theorem", "Central limit theorem", "Nyquist -Shannon sampling theorem", "Parseval's theorem"], "answer": 2 },
  { "id": "st_h5", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the term for the ratio of a bipolar transistor's collector current to its base current?", "options": ["Power gain", "Voltage gain", "Transconductance", "Current gain"], "answer": 3 },
  { "id": "st_h6", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the term for a system design where the output is measured and used to automatically adjust the input, forming a closed loop?", "options": ["Batch processing", "Pipelining", "Feedback control", "Open -loop control"], "answer": 2 },
  { "id": "st_h7", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the name of the phenomenon where two waves of close but different frequencies produce a periodic variation in amplitude?", "options": ["Harmonic distortion", "Doppler shift", "Standing wave", "Beat frequency"], "answer": 3 },
  { "id": "st_h8", "topic": "Science & Technology", "difficulty": "hard", "question": "Which digital logic gate outputs true only when its two inputs differ from each other?", "options": ["OR gate", "AND gate", "NAND gate", "XOR gate"], "answer": 3 },
  { "id": "st_h9", "topic": "Science & Technology", "difficulty": "hard", "question": "What theorem states that maximum power is delivered to a load when the load resistance equals the source's internal resistance?", "options": ["Superposition theorem", "Maximum power transfer theorem", "Thevenin's theorem", "Millman's theorem"], "answer": 1 },
  { "id": "st_h10", "topic": "Science & Technology", "difficulty": "hard", "question": "What effect describes the apparent change in a wave's frequency due to relative motion between the source and an observer?", "options": ["Doppler effect", "Piezoelectric effect", "Hall effect", "Photoelectric effect"], "answer": 0 },
  { "id": "st_h11", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the term for an amplifier circuit becoming uncontrollably oscillatory due to excessive positive feedback gain?", "options": ["Attenuation", "Instability", "Rectification", "Resonance"], "answer": 1 },
  { "id": "st_h12", "topic": "Science & Technology", "difficulty": "hard", "question": "What mathematical transform converts a time -domain signal into its frequency -domain representation?", "options": ["Fourier transform", "Z-transform", "Hilbert transform", "Laplace transform"], "answer": 0 },
  { "id": "st_h13", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the name of the charge -carrier -depleted region that forms at a P -N junction, creating a barrier to current flow?", "options": ["Conduction band", "Valence band", "Depletion region", "Space -charge lattice"], "answer": 2 },
  { "id": "st_h14", "topic": "Science & Technology", "difficulty": "hard", "question": "Which law relates the induced electromotive force (EMF) in a circuit to the rate of change of magnetic flux through it?", "options": ["Faraday's Law of Induction", "Gauss's Law", "Ampere's Law", "Lenz's Law"], "answer": 0 },
  { "id": "st_h15", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the term for the tendency of alternating current to flow mostly near the surface of a conductor at high frequencies?", "options": ["Skin effect", "Eddy current effect", "Proximity effect", "Corona effect"], "answer": 0 },
  { "id": "st_h16", "topic": "Science & Technology", "difficulty": "hard", "question": "What is the term for the process of converting a continuous analog signal into discrete digital values?", "options": ["Pulse -width modulation", "Digital -to-analog conversion", "Signal multiplexing", "Analog -to-digital conversion"], "answer": 3 },
  { "id": "st_h17", "topic": "Science & Technology", "difficulty": "hard", "question": "What criterion is used to determine a control system's stability without directly solving for the roots of its characteristic equation?", "options": ["Bode criterion", "Nyquist criterion", "Routh -Hurwitz criterion", "Laplace criterion"], "answer": 2 },

  // ==========================================
  //  8. INVENTIONS & DISCOVERIES — STEP 1: EASY
  // ==========================================
  { "id": "inv_e1", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is credited with inventing the telephone?", "options": ["Guglielmo Marconi", "Alexander Graham Bell", "Nikola Tesla", "Thomas Edison"], "answer": 1 },
  { "id": "inv_e2", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is commonly credited with inventing the practical incandescent light bulb?", "options": ["James Watt", "Alexander Graham Bell", "Nikola Tesla", "Thomas Edison"], "answer": 3 },
  { "id": "inv_e3", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is credited with inventing the World Wide Web?", "options": ["Tim Berners -Lee", "Bill Gates", "Steve Jobs", "Vint Cerf"], "answer": 0 },
  { "id": "inv_e4", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "What did the Wright brothers famously invent?", "options": ["The first successful powered airplane", "The automobile", "The submarine", "The helicopter"], "answer": 0 },
  { "id": "inv_e5", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Whose falling -apple story is associated with the discovery of gravity?", "options": ["Galileo Galilei", "Isaac Newton", "Albert Einstein", "Johannes Kepler"], "answer": 1 },
  { "id": "inv_e6", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the printing press with movable type in Europe?", "options": ["William Caxton", "Benjamin Franklin", "Leonardo da Vinci", "Johannes Gutenberg"], "answer": 3 },
  { "id": "inv_e7", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "What did Alexander Fleming accidentally discover in 1928?", "options": ["Vaccination", "X -rays", "Insulin", "Penicillin"], "answer": 3 },
  { "id": "inv_e8", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented dynamite?", "options": ["Alfred Nobel", "Thomas Edison", "Robert Oppenheimer", "John Hyatt"], "answer": 0 },
  { "id": "inv_e9", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Marie Curie is best known for her pioneering research into which phenomenon?", "options": ["Magnetism", "Electricity", "Radioactivity", "Gravity"], "answer": 2 },
  { "id": "inv_e10", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is widely credited with demonstrating the first working mechanical television system?", "options": ["Thomas Edison", "John Logie Baird", "Guglielmo Marconi", "Philo Farnsworth"], "answer": 1 },
  { "id": "inv_e11", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who significantly improved the steam engine, making it practical for widespread industrial use?", "options": ["George Stephenson", "James Watt", "Thomas Newcomen", "Richard Trevithick"], "answer": 1 },
  { "id": "inv_e12", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "What process did Louis Pasteur develop to make milk and other drinks safer to consume?", "options": ["Pasteurization", "Refrigeration", "Fermentation", "Sterilization"], "answer": 0 },
  { "id": "inv_e13", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who developed the first successful vaccine, against smallpox?", "options": ["Louis Pasteur", "Alexander Fleming", "Edward Jenner", "Jonas Salk"], "answer": 2 },
  { "id": "inv_e14", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is credited with inventing the first practical electric battery?", "options": ["Alessandro Volta", "Andre -Marie Ampere", "Benjamin Franklin", "Michael Faraday"], "answer": 0 },
  { "id": "inv_e15", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who pioneered the moving automobile assembly line for mass production?", "options": ["Karl Benz", "Henry Ford", "Gottlieb Daimler", "Ransom Olds"], "answer": 1 },
  { "id": "inv_e16", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "In the traditional Western historical narrative, who is credited with reaching the Americas in 1492?", "options": ["Ferdinand Magellan", "Christopher Columbus", "Amerigo Vespucci", "Vasco da Gama"], "answer": 1 },
  { "id": "inv_e17", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is credited with inventing radio communication?", "options": ["Guglielmo Marconi", "Alexander Graham Bell", "Thomas Edison", "Nikola Tesla"], "answer": 0 },
  { "id": "inv_e18", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is credited with inventing the elevator safety brake, making tall buildings practical?", "options": ["James Watt", "Elisha Otis", "Alexander Graham Bell", "Thomas Edison"], "answer": 1 },
  { "id": "inv_e19", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the cotton gin, a machine that revolutionized cotton processing?", "options": ["Samuel Slater", "Richard Arkwright", "James Hargreaves", "Eli Whitney"], "answer": 3 },
  { "id": "inv_e20", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the telegraph and Morse code, revolutionizing long -distance communication?", "options": ["Guglielmo Marconi", "Thomas Edison", "Samuel Morse", "Alexander Graham Bell"], "answer": 2 },
  { "id": "inv_e21", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the escalator, patented in 1892?", "options": ["George Westinghouse", "Charles Seeberger", "Elisha Otis", "Jesse W. Reno"], "answer": 3 },
  { "id": "inv_e22", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the first practical fire extinguisher?", "options": ["Henry Bessemer", "George William Manby", "Isaac Singer", "Alexander Graham Bell"], "answer": 1 },
  { "id": "inv_e23", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the first practical stethoscope?", "options": ["Edward Jenner", "Robert Koch", "Rene Laennec", "Louis Pasteur"], "answer": 2 },
  { "id": "inv_e24", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is popularly credited with inventing and popularizing the modern flush toilet?", "options": ["Alexander Cummings", "Thomas Crapper", "John Harington", "James Watt"], "answer": 1 },
  { "id": "inv_e25", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who attempted to invent an early metal detector to locate a bullet inside US President James Garfield?", "options": ["Samuel Morse", "Thomas Edison", "Nikola Tesla", "Alexander Graham Bell"], "answer": 3 },
  { "id": "inv_e26", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the Ferris wheel, first built for the 1893 World's Fair in Chicago?", "options": ["Jesse Reno", "Gustave Eiffel", "Elisha Otis", "George Ferris"], "answer": 3 },
  { "id": "inv_e27", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the first successful automobile powered by an internal combustion engine?", "options": ["Rudolf Diesel", "Gottlieb Daimler", "Henry Ford", "Karl Benz"], "answer": 3 },
  { "id": "inv_e28", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the first practical outboard motor for boats?", "options": ["Karl Benz", "Charles Parsons", "Ole Evinrude", "Rudolf Diesel"], "answer": 2 },
  { "id": "inv_e29", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is credited with inventing the microwave oven, discovered accidentally while working with radar technology?", "options": ["Percy Spencer", "Nikola Tesla", "Thomas Edison", "James Dyson"], "answer": 0 },
  { "id": "inv_e30", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is credited with inventing the first practical can opener?", "options": ["William Painter", "Peter Durand", "Ezra Warner", "John Landis Mason"], "answer": 2 },
  { "id": "inv_e31", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the modern shopping cart?", "options": ["King Camp Gillette", "Sylvan Goldman", "Sam Walton", "Clarence Saunders"], "answer": 1 },
  { "id": "inv_e32", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who is credited with inventing the Slinky toy?", "options": ["Richard James", "George Lerner", "Ruth Handler", "Ole Kirk Christiansen"], "answer": 0 },
  { "id": "inv_e33", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the flying disc toy later commercialized as the Frisbee?", "options": ["Fred Morrison Sr.", "Arthur Melin", "Walter Frederick Morrison", "Richard Knerr"], "answer": 2 },
  { "id": "inv_e34", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who invented the Rubik's Cube puzzle?", "options": ["Alex Fielding", "Erno Rubik", "Uwe Meffert", "Tom Kremer"], "answer": 1 },
  { "id": "inv_e35", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who founded Polaroid and invented the first practical instant camera?", "options": ["Edwin Land", "Chester Carlson", "Steve Sasson", "George Eastman"], "answer": 0 },
  { "id": "inv_e36", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who founded Atari and directed the creation of \"Pong,\" one of the first successful video games?", "options": ["Steve Russell", "Nolan Bushnell", "Ralph Baer", "Allan Alcorn"], "answer": 1 },
  { "id": "inv_e37", "topic": "Inventions & Discoveries", "difficulty": "easy", "question": "Who programmed \"Pong,\" one of the first successful video games, at Atari?", "options": ["Ralph Baer", "Nolan Bushnell", "Allan Alcorn", "Steve Russell"], "answer": 2 },

  // ==========================================
  //  8. INVENTIONS & DISCOVERIES — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "inv_em1", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the first commercially successful typewriter with the QWERTY layout?", "options": ["Isaac Singer", "Thomas Edison", "Elias Howe", "Christopher Latham Sholes"], "answer": 3 },
  { "id": "inv_em2", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who developed the theory of relativity?", "options": ["Isaac Newton", "Max Planck", "Albert Einstein", "Niels Bohr"], "answer": 2 },
  { "id": "inv_em3", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who developed the first successful polio vaccine, using an inactivated virus?", "options": ["Louis Pasteur", "Jonas Salk", "Albert Sabin", "Edward Jenner"], "answer": 1 },
  { "id": "inv_em4", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Which element, alongside polonium, did Marie and Pierre Curie discover?", "options": ["Uranium", "Thorium", "Radium", "Plutonium"], "answer": 2 },
  { "id": "inv_em5", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who is regarded as the first computer programmer for her work on Charles Babbage's Analytical Engine?", "options": ["Rosalind Franklin", "Marie Curie", "Grace Hopper", "Ada Lovelace"], "answer": 3 },
  { "id": "inv_em6", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who is credited with major improvements to the microscope that enabled the first observations of microorganisms?", "options": ["Robert Hooke", "Louis Pasteur", "Galileo Galilei", "Antonie van Leeuwenhoek"], "answer": 3 },
  { "id": "inv_em7", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who built the first successful mass -produced helicopter?", "options": ["Paul Cornu", "Juan de la Cierva", "The Wright Brothers", "Igor Sikorsky"], "answer": 3 },
  { "id": "inv_em8", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the Braille reading and writing system for the blind?", "options": ["Helen Keller", "Alexander Graham Bell", "Louis Braille", "Thomas Edison"], "answer": 2 },
  { "id": "inv_em9", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Along with Francis Crick, who is credited with discovering the double -helix structure of DNA?", "options": ["James Watson", "Gregor Mendel", "Rosalind Franklin", "Erwin Chargaff"], "answer": 0 },
  { "id": "inv_em10", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who developed the first practical diesel engine?", "options": ["Gottlieb Daimler", "Karl Benz", "Rudolf Diesel", "Nikolaus Otto"], "answer": 2 },
  { "id": "inv_em11", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Wilhelm Rontgen won the first -ever Nobel Prize in Physics for discovering what?", "options": ["Electrons", "Gamma rays", "X -rays", "Radioactivity"], "answer": 2 },
  { "id": "inv_em12", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the modern ballpoint pen?", "options": ["Lewis Waterman", "John Loud", "George Parker", "Laszlo Biro"], "answer": 3 },
  { "id": "inv_em13", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who is credited with patenting the first practical lockstitch sewing machine in the US?", "options": ["Barthelemy Thimonnier", "Walter Hunt", "Isaac Singer", "Elias Howe"], "answer": 3 },
  { "id": "inv_em14", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "What does \"WWW\", the system invented by Tim Berners -Lee, stand for?", "options": ["Wide World Web", "World Wide Wire", "World Web Wide", "World Wide Web"], "answer": 3 },
  { "id": "inv_em15", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who is known as the father of modern genetics for his experiments on pea plants?", "options": ["James Watson", "Gregor Mendel", "Louis Pasteur", "Charles Darwin"], "answer": 1 },
  { "id": "inv_em16", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who developed the first successful liquid -fueled rocket, launched in 1926?", "options": ["Wernher von Braun", "Sergei Korolev", "Konstantin Tsiolkovsky", "Robert Goddard"], "answer": 3 },
  { "id": "inv_em17", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who is credited, along with Carl Wilhelm Scheele, with independently discovering oxygen in the 1770s?", "options": ["Joseph Priestley", "Antoine Lavoisier", "John Dalton", "Henry Cavendish"], "answer": 0 },
  { "id": "inv_em18", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the first commercially successful photocopier, leading to the founding of Xerox?", "options": ["George Eastman", "Percy Spencer", "Edwin Land", "Chester Carlson"], "answer": 3 },
  { "id": "inv_em19", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the long -playing (LP) vinyl record format?", "options": ["Thomas Edison", "Emile Berliner", "Peter Goldmark", "Eldridge Johnson"], "answer": 2 },
  { "id": "inv_em20", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who is a key figure credited with developing practical liquid crystal display (LCD) technology?", "options": ["Robert Noyce", "Gordon Moore", "Jack Kilby", "James Fergason"], "answer": 3 },
  { "id": "inv_em21", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented practical fiber optic cable for telecommunications, earning a Nobel Prize in 2009?", "options": ["Charles K. Kao", "Robert Noyce", "Claude Shannon", "Jack Kilby"], "answer": 0 },
  { "id": "inv_em22", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the integrated circuit (microchip), working independently of Robert Noyce?", "options": ["William Shockley", "Jack Kilby", "Gordon Moore", "Andrew Grove"], "answer": 1 },
  { "id": "inv_em23", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Along with Jack Kilby, who else is credited with independently inventing the integrated circuit?", "options": ["Andrew Grove", "Gordon Moore", "William Shockley", "Robert Noyce"], "answer": 3 },
  { "id": "inv_em24", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the barcode, along with Bernard Silver?", "options": ["Jack Kilby", "Chester Carlson", "Norman Joseph Woodland", "David Collins"], "answer": 2 },
  { "id": "inv_em25", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who co -invented the barcode alongside Norman Joseph Woodland?", "options": ["George Laurer", "David Collins", "Bernard Silver", "Alan Haberman"], "answer": 2 },
  { "id": "inv_em26", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the first working photovoltaic cell using selenium, a precursor to modern solar cells?", "options": ["Daryl Chapin", "Russell Ohl", "Willoughby Smith", "Charles Fritts"], "answer": 3 },
  { "id": "inv_em27", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who is credited with inventing the first practical automated teller machine (ATM)?", "options": ["James Goodfellow", "Don Wetzel", "John Shepherd -Barron", "Luther Simjian"], "answer": 2 },
  { "id": "inv_em28", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who led the development of the Saturn V rocket used in the Apollo Moon missions?", "options": ["Sergei Korolev", "Hermann Oberth", "Wernher von Braun", "Robert Goddard"], "answer": 2 },
  { "id": "inv_em29", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who achieved the first controlled nuclear chain reaction, in 1942?", "options": ["Albert Einstein", "Niels Bohr", "Robert Oppenheimer", "Enrico Fermi"], "answer": 3 },
  { "id": "inv_em30", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who discovered nuclear fission, splitting uranium atoms, in 1938, along with Fritz Strassmann?", "options": ["Otto Hahn", "Niels Bohr", "Enrico Fermi", "Lise Meitner"], "answer": 0 },
  { "id": "inv_em31", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Which physicist provided the theoretical explanation for nuclear fission, though excluded from the Nobel Prize awarded to her collaborator?", "options": ["Lise Meitner", "Marie Curie", "Rosalind Franklin", "Irene Joliot -Curie"], "answer": 0 },
  { "id": "inv_em32", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who is credited with developing the first fully implantable cardiac pacemaker?", "options": ["Denton Cooley", "Christiaan Barnard", "Michael DeBakey", "Wilson Greatbatch"], "answer": 3 },
  { "id": "inv_em33", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented in -vitro fertilization (IVF), leading to the first \"test -tube baby\" in 1978?", "options": ["Robert Edwards", "Alan Trounson", "Howard Jones", "Patrick Steptoe"], "answer": 0 },
  { "id": "inv_em34", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Along with Robert Edwards, which gynecologist co -developed IVF?", "options": ["Landrum Shettles", "Alan Trounson", "Patrick Steptoe", "Howard Jones"], "answer": 2 },
  { "id": "inv_em35", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who established the precise base -pairing ratios of DNA's four bases, key evidence later used in determining DNA's structure?", "options": ["Maurice Wilkins", "Francis Crick", "James Watson", "Erwin Chargaff"], "answer": 3 },
  { "id": "inv_em36", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Who invented the polymerase chain reaction (PCR) technique, revolutionizing DNA analysis?", "options": ["Craig Venter", "Kary Mullis", "Frederick Sanger", "James Watson"], "answer": 1 },
  { "id": "inv_em37", "topic": "Inventions & Discoveries", "difficulty": "easy-medium", "question": "Which scientist's lab first demonstrated CRISPR gene editing working in human and other eukaryotic cells?", "options": ["Jennifer Doudna", "Feng Zhang", "George Church", "Emmanuelle Charpentier"], "answer": 1 },

  // ==========================================
  //  8. INVENTIONS & DISCOVERIES — STEP 3: MEDIUM
  // ==========================================
  { "id": "inv_m1", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Which British inventor developed an incandescent lamp design around the same time as Edison?", "options": ["William Thomson", "Joseph Swan", "James Watt", "Michael Faraday"], "answer": 1 },
  { "id": "inv_m2", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "At which research laboratory was the transistor invented in 1947?", "options": ["MIT", "IBM", "Xerox PARC", "Bell Labs"], "answer": 3 },
  { "id": "inv_m3", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who developed the daguerreotype, an early practical photographic process?", "options": ["George Eastman", "Louis Daguerre", "Joseph Niepce", "William Talbot"], "answer": 1 },
  { "id": "inv_m4", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered the electron, in 1897?", "options": ["James Chadwick", "Niels Bohr", "Ernest Rutherford", "J.J. Thomson"], "answer": 3 },
  { "id": "inv_m5", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who is credited with inventing the first mechanical calculator, the Pascaline?", "options": ["Gottfried Leibniz", "Blaise Pascal", "Charles Babbage", "Rene Descartes"], "answer": 1 },
  { "id": "inv_m6", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who mathematically predicted the existence and position of Neptune before it was directly observed?", "options": ["Giovanni Cassini", "Urbain Le Verrier", "William Herschel", "Johannes Kepler"], "answer": 1 },
  { "id": "inv_m7", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who built the first working laser, in 1960?", "options": ["Albert Einstein", "Theodore Maiman", "Charles Townes", "Gordon Gould"], "answer": 1 },
  { "id": "inv_m8", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who created the Mosaic web browser that helped bring the internet to the public?", "options": ["Larry Page", "Jeff Bezos", "Marc Andreessen", "Tim Berners -Lee"], "answer": 2 },
  { "id": "inv_m9", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Whose X -ray diffraction images (\"Photo 51\") were crucial evidence for discovering DNA's structure?", "options": ["Lise Meitner", "Dorothy Hodgkin", "Rosalind Franklin", "Barbara McClintock"], "answer": 2 },
  { "id": "inv_m10", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who invented the first practical powered vacuum cleaner, in 1901?", "options": ["Ives McGaffey", "William Hoover", "Hubert Cecil Booth", "James Dyson"], "answer": 2 },
  { "id": "inv_m11", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered the process for vulcanizing rubber, making it far more durable?", "options": ["Harvey Firestone", "John Dunlop", "Charles Goodyear", "John Boyd Dunlop"], "answer": 2 },
  { "id": "inv_m12", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who is credited, in English -language accounts, with inventing the first jet engine?", "options": ["Igor Sikorsky", "Frank Whittle", "Wernher von Braun", "Hans von Ohain"], "answer": 1 },
  { "id": "inv_m13", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who invented the modern safety pin, in 1849?", "options": ["Elias Howe", "Walter Hunt", "Whitcomb Judson", "Josephine Cochrane"], "answer": 1 },
  { "id": "inv_m14", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who invented the first practical modern air conditioner, in 1902?", "options": ["Alfred Wolff", "Stuart Cramer", "Frederick Jones", "Willis Carrier"], "answer": 3 },
  { "id": "inv_m15", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who patented the modern zipper design, in the early 1910s?", "options": ["Gideon Sundback", "Levi Strauss", "Whitcomb Judson", "Elias Howe"], "answer": 0 },
  { "id": "inv_m16", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who proposed the theoretical existence of the Higgs boson particle, in 1964?", "options": ["Enrico Fermi", "Stephen Hawking", "Paul Dirac", "Peter Higgs"], "answer": 3 },
  { "id": "inv_m17", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered the law of definite proportions, a foundational principle of modern chemistry?", "options": ["Antoine Lavoisier", "Amedeo Avogadro", "John Dalton", "Joseph Proust"], "answer": 3 },
  { "id": "inv_m18", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who invented the first jet -powered aircraft engine tested in flight, the Heinkel He 178, in 1939?", "options": ["Ernst Heinkel", "Hans von Ohain", "Wernher von Braun", "Frank Whittle"], "answer": 1 },
  { "id": "inv_m19", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who is credited as the \"father of virology\" for his foundational early work identifying viruses as a distinct class of infectious agents?", "options": ["Robert Koch", "Dmitri Ivanovsky", "Louis Pasteur", "Martinus Beijerinck"], "answer": 3 },
  { "id": "inv_m20", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered the bacterium that causes tuberculosis, a major breakthrough in germ theory, in 1882?", "options": ["Robert Koch", "Louis Pasteur", "Paul Ehrlich", "Alexander Fleming"], "answer": 0 },
  { "id": "inv_m21", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered human blood groups (A, B, AB, O), essential for safe blood transfusions?", "options": ["Karl Landsteiner", "Alexis Carrel", "William Harvey", "Charles Drew"], "answer": 0 },
  { "id": "inv_m22", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who, along with Alexander Wiener, discovered the Rh factor in human blood?", "options": ["Karl Landsteiner", "William Harvey", "Charles Drew", "Jean -Baptiste Denys"], "answer": 0 },
  { "id": "inv_m23", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who coined the term \"vitamin\" after isolating a compound essential for preventing the disease beriberi?", "options": ["Christiaan Eijkman", "Frederick Hopkins", "Albert Szent -Gyorgyi", "Casimir Funk"], "answer": 3 },
  { "id": "inv_m24", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who conducted one of the first controlled clinical trials in history, in 1747, demonstrating that citrus fruit prevents scurvy?", "options": ["John Snow", "Edward Jenner", "James Lind", "William Harvey"], "answer": 2 },
  { "id": "inv_m25", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered the mechanism of blood circulation in the human body, publishing his findings in 1628?", "options": ["Marcello Malpighi", "Galen", "Andreas Vesalius", "William Harvey"], "answer": 3 },
  { "id": "inv_m26", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who is credited, along with his father, with inventing the first compound microscope?", "options": ["Robert Hooke", "Galileo Galilei", "Zacharias Janssen", "Antonie van Leeuwenhoek"], "answer": 2 },
  { "id": "inv_m27", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered and named the cell, after observing cork tissue under a microscope in 1665?", "options": ["Matthias Schleiden", "Robert Hooke", "Antonie van Leeuwenhoek", "Rudolf Virchow"], "answer": 1 },
  { "id": "inv_m28", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who formulated the principle that all living cells arise from pre -existing cells, a cornerstone of cell theory?", "options": ["Rudolf Virchow", "Matthias Schleiden", "Robert Hooke", "Theodor Schwann"], "answer": 0 },
  { "id": "inv_m29", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered the law of conservation of mass in chemical reactions, a foundational principle of modern chemistry?", "options": ["Robert Boyle", "Antoine Lavoisier", "John Dalton", "Joseph Priestley"], "answer": 1 },
  { "id": "inv_m30", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who formulated modern atomic theory, proposing that elements consist of tiny, indivisible particles?", "options": ["Amedeo Avogadro", "Dmitri Mendeleev", "John Dalton", "Antoine Lavoisier"], "answer": 2 },
  { "id": "inv_m31", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered the noble gases, including argon, neon, krypton, and xenon?", "options": ["William Ramsay", "Henry Cavendish", "Humphry Davy", "Joseph Priestley"], "answer": 0 },
  { "id": "inv_m32", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who first correctly identified the element helium from its unique spectral signature in sunlight during a solar eclipse in 1868?", "options": ["William Ramsay", "Norman Lockyer", "Pierre Janssen", "Henry Cavendish"], "answer": 1 },
  { "id": "inv_m33", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered superconductivity, observed in mercury at extremely low temperatures, in 1911?", "options": ["Wolfgang Pauli", "Heike Kamerlingh Onnes", "Max Planck", "James Dewar"], "answer": 1 },
  { "id": "inv_m34", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Which father -and-son duo shared the Nobel Prize in Physics for pioneering X -ray crystallography, a technique later used to help reveal DNA's structure?", "options": ["William Henry Bragg and William Lawrence Bragg", "Niels Bohr and Aage Bohr", "J.J. Thomson and George Paget Thomson", "Marie Curie and Irene Joliot -Curie"], "answer": 0 },
  { "id": "inv_m35", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered cosmic rays, high -energy particles from space, through high -altitude balloon experiments in 1912?", "options": ["Robert Millikan", "Arthur Compton", "Victor Hess", "Carl Anderson"], "answer": 2 },
  { "id": "inv_m36", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who discovered the positron, the first known antimatter particle, in 1932?", "options": ["Ernest Lawrence", "Victor Hess", "Paul Dirac", "Carl Anderson"], "answer": 3 },
  { "id": "inv_m37", "topic": "Inventions & Discoveries", "difficulty": "medium", "question": "Who is commonly credited as a key chemist behind the first oral contraceptive pill, approved for use in 1960?", "options": ["Margaret Sanger", "Carl Djerassi", "John Rock", "Gregory Pincus"], "answer": 1 },

  // ==========================================
  //  8. INVENTIONS & DISCOVERIES — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "inv_mh1", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who invented the first programmable computer, the Z3, completed in 1941?", "options": ["Charles Babbage", "John von Neumann", "Konrad Zuse", "Alan Turing"], "answer": 2 },
  { "id": "inv_mh2", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who patented barbed wire in 1874, revolutionizing fencing in the American West?", "options": ["Lucien Smith", "Jacob Haish", "John Warne Gates", "Joseph Glidden"], "answer": 3 },
  { "id": "inv_mh3", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who invented Kevlar, the material used in bulletproof vests?", "options": ["Rosalind Franklin", "Marie Curie", "Stephanie Kwolek", "Rachel Carson"], "answer": 2 },
  { "id": "inv_mh4", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "At which laboratory was the first practical silicon solar cell developed, in 1954?", "options": ["Bell Labs", "General Electric", "Westinghouse", "IBM"], "answer": 0 },
  { "id": "inv_mh5", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who developed the oral polio vaccine using a weakened live virus, as an alternative to Salk's?", "options": ["Albert Sabin", "Jonas Salk", "Edward Jenner", "Maurice Hilleman"], "answer": 0 },
  { "id": "inv_mh6", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who successfully deciphered Egyptian hieroglyphs using the Rosetta Stone?", "options": ["Howard Carter", "Thomas Young", "Flinders Petrie", "Jean -Francois Champollion"], "answer": 3 },
  { "id": "inv_mh7", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who invented the first practical mercury barometer?", "options": ["Evangelista Torricelli", "Robert Boyle", "Galileo Galilei", "Blaise Pascal"], "answer": 0 },
  { "id": "inv_mh8", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "After whom is the Bunsen burner named, though he mainly improved rather than invented it?", "options": ["Justus von Liebig", "Michael Faraday", "Robert Bunsen", "Friedrich Wohler"], "answer": 2 },
  { "id": "inv_mh9", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Which ancient Greek scientist discovered the principle of buoyancy, reportedly shouting \"Eureka\"?", "options": ["Aristotle", "Archimedes", "Pythagoras", "Euclid"], "answer": 1 },
  { "id": "inv_mh10", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who reinvented and popularized the pneumatic (air -filled) tire still widely used today?", "options": ["Charles Goodyear", "John Boyd Dunlop", "Harvey Firestone", "Robert William Thomson"], "answer": 1 },
  { "id": "inv_mh11", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who designed the first artificial heart successfully implanted in a human, the Jarvik -7?", "options": ["Denton Cooley", "Christiaan Barnard", "Robert Jarvik", "Michael DeBakey"], "answer": 2 },
  { "id": "inv_mh12", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who invented the Geiger counter, used to detect ionizing radiation?", "options": ["Ernest Rutherford", "Marie Curie", "Wilhelm Rontgen", "Hans Geiger"], "answer": 3 },
  { "id": "inv_mh13", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who built and used the first submarine in combat, the Turtle, during the American Revolutionary War?", "options": ["Simon Lake", "David Bushnell", "John Holland", "Robert Fulton"], "answer": 1 },
  { "id": "inv_mh14", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Which chemist reportedly discovered the ring structure of benzene after a dream about a snake biting its own tail?", "options": ["August Kekule", "Justus von Liebig", "Linus Pauling", "Dmitri Mendeleev"], "answer": 0 },
  { "id": "inv_mh15", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who invented Bakelite, considered the first fully synthetic plastic?", "options": ["Charles Goodyear", "John Wesley Hyatt", "Wallace Carothers", "Leo Baekeland"], "answer": 3 },
  { "id": "inv_mh16", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who discovered the neutron, in 1932?", "options": ["Ernest Rutherford", "Niels Bohr", "James Chadwick", "Enrico Fermi"], "answer": 2 },
  { "id": "inv_mh17", "topic": "Inventions & Discoveries", "difficulty": "medium-hard", "question": "Who patented the first practical gyrocompass in the United States, used for maritime navigation?", "options": ["John Harrison", "Hermann Anschutz -Kaempfe", "Charles Draper", "Elmer Sperry"], "answer": 3 },

  // ==========================================
  //  8. INVENTIONS & DISCOVERIES — STEP 5: HARD
  // ==========================================
  { "id": "inv_h1", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who invented the Van de Graaff generator, used to build up very high voltages?", "options": ["Robert J. Van de Graaff", "Nikola Tesla", "Michael Faraday", "Heinrich Hertz"], "answer": 0 },
  { "id": "inv_h2", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who discovered the radioactive element radon, in 1900?", "options": ["Friedrich Ernst Dorn", "Ernest Rutherford", "Marie Curie", "William Ramsay"], "answer": 0 },
  { "id": "inv_h3", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Along with Ted Hoff and Stanley Mazor, who led the design of the first commercial microprocessor, the Intel 4004?", "options": ["Robert Noyce", "Federico Faggin", "Gordon Moore", "Jack Kilby"], "answer": 1 },
  { "id": "inv_h4", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Along with Robert Wilson, who discovered the cosmic microwave background radiation in 1965?", "options": ["Arno Penzias", "George Gamow", "Fred Hoyle", "Edwin Hubble"], "answer": 0 },
  { "id": "inv_h5", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who invented the first fully electronic television system, demonstrated in 1927?", "options": ["Vladimir Zworykin", "John Logie Baird", "Guglielmo Marconi", "Philo Farnsworth"], "answer": 3 },
  { "id": "inv_h6", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "In which country was the ancient Antikythera mechanism, an early analog astronomical calculator, discovered?", "options": ["Turkey", "Greece", "Italy", "Egypt"], "answer": 1 },
  { "id": "inv_h7", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who invented the first practical fuel cell, in 1839?", "options": ["Humphry Davy", "Michael Faraday", "William Grove", "Alessandro Volta"], "answer": 2 },
  { "id": "inv_h8", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Along with Charles Best, who is credited with discovering insulin?", "options": ["Frederick Banting", "Alexander Fleming", "Louis Pasteur", "Jonas Salk"], "answer": 0 },
  { "id": "inv_h9", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Along with Emmanuelle Charpentier, who co -developed the CRISPR gene -editing technique?", "options": ["Jennifer Doudna", "Rita Levi -Montalcini", "Rosalind Franklin", "Barbara McClintock"], "answer": 0 },
  { "id": "inv_h10", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Along with Didier Queloz, who discovered the first exoplanet found orbiting a Sun -like star, in 1995?", "options": ["Geoffrey Marcy", "Frank Drake", "Michel Mayor", "Carl Sagan"], "answer": 2 },
  { "id": "inv_h11", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who invented the first practical AC induction motor?", "options": ["Michael Faraday", "Thomas Edison", "George Westinghouse", "Nikola Tesla"], "answer": 3 },
  { "id": "inv_h12", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who formulated the periodic law and created an early version of the periodic table of elements?", "options": ["Antoine Lavoisier", "Dmitri Mendeleev", "Julius Lothar Meyer", "John Dalton"], "answer": 1 },
  { "id": "inv_h13", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who invented the first commercially successful mechanical calculator sold in large numbers, the Arithmometer?", "options": ["Charles Babbage", "Blaise Pascal", "Gottfried Leibniz", "Thomas de Colmar"], "answer": 3 },
  { "id": "inv_h14", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who discovered the Doppler effect, describing the change in frequency of waves from a moving source?", "options": ["Christian Doppler", "Ernst Mach", "Heinrich Hertz", "James Clerk Maxwell"], "answer": 0 },
  { "id": "inv_h15", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who invented the first successful vaccine against yellow fever, in 1937?", "options": ["Carlos Finlay", "Max Theiler", "Walter Reed", "Jesse Lazear"], "answer": 1 },
  { "id": "inv_h16", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Which scientist first proposed the theory of continental drift, a precursor to plate tectonics?", "options": ["James Hutton", "Alfred Wegener", "Harry Hess", "Charles Lyell"], "answer": 1 },
  { "id": "inv_h17", "topic": "Inventions & Discoveries", "difficulty": "hard", "question": "Who discovered the radioactivity of uranium in 1896, inspiring Marie Curie's further research?", "options": ["Henri Becquerel", "Marie Curie", "Ernest Rutherford", "Wilhelm Rontgen"], "answer": 0 },

  // ==========================================
  //  9. POLITICS & GOVERNMENT — STEP 1: EASY
  // ==========================================
  { "id": "pg_e1", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a system of government where power is held by elected representatives?", "options": ["Monarchy", "Theocracy", "Democracy", "Dictatorship"], "answer": 2 },
  { "id": "pg_e2", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a government headed by a king or queen?", "options": ["Oligarchy", "Democracy", "Monarchy", "Republic"], "answer": 2 },
  { "id": "pg_e3", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a system where one person holds absolute, unchecked power?", "options": ["Dictatorship", "Confederation", "Federation", "Democracy"], "answer": 0 },
  { "id": "pg_e4", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the name of the document that outlines the fundamental laws of a country?", "options": ["Constitution", "Treaty", "Manifesto", "Charter"], "answer": 0 },
  { "id": "pg_e5", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the branch of government responsible for making laws?", "options": ["Judiciary", "Executive", "Cabinet", "Legislature"], "answer": 3 },
  { "id": "pg_e6", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the branch of government responsible for enforcing laws?", "options": ["Executive", "Senate", "Judiciary", "Legislature"], "answer": 0 },
  { "id": "pg_e7", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the branch of government responsible for interpreting laws?", "options": ["Judiciary", "Executive", "Legislature", "Parliament"], "answer": 0 },
  { "id": "pg_e8", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the right to vote called?", "options": ["Suffrage", "Citizenship", "Franchise fee", "Ballot"], "answer": 0 },
  { "id": "pg_e9", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a system where two main political parties dominate a country's politics?", "options": ["Multi -party system", "One -party system", "Two -party system", "No -party system"], "answer": 2 },
  { "id": "pg_e10", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the head of government in a parliamentary system, typically the leader of the majority party?", "options": ["President", "Governor", "Chancellor of the Exchequer", "Prime Minister"], "answer": 3 },
  { "id": "pg_e11", "topic": "Politics & Government", "difficulty": "easy", "question": "What do we call a person who has the legal right to vote and participate in a country's democracy?", "options": ["Resident", "Immigrant", "Citizen", "Delegate"], "answer": 2 },
  { "id": "pg_e12", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a formal, organized group that seeks to gain political power through elections?", "options": ["Political party", "Union", "Committee", "Assembly"], "answer": 0 },
  { "id": "pg_e13", "topic": "Politics & Government", "difficulty": "easy", "question": "What do we call a country ruled by military leaders who have seized power?", "options": ["Republic", "Monarchy", "Military dictatorship", "Federation"], "answer": 2 },
  { "id": "pg_e14", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the process by which citizens choose their representatives?", "options": ["Referendum", "Nomination", "Election", "Census"], "answer": 2 },
  { "id": "pg_e15", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a government system divided between a national government and state or provincial governments?", "options": ["Federal system", "Unitary system", "Confederation", "City -state"], "answer": 0 },
  { "id": "pg_e16", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a government system where power is centralized nationally, with limited local authority?", "options": ["Federation", "Unitary system", "Autonomy", "Federal system"], "answer": 1 },
  { "id": "pg_e17", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for basic rights guaranteed to all citizens, often listed in a constitution?", "options": ["Statutes", "Legal codes", "Civic duties", "Fundamental rights"], "answer": 3 },
  { "id": "pg_e18", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a government headed by a small group of powerful individuals or families?", "options": ["Monarchy", "Oligarchy", "Theocracy", "Democracy"], "answer": 1 },
  { "id": "pg_e19", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a country ruled by a king or queen with limited power, sharing authority with an elected government?", "options": ["Federation", "Republic", "Absolute monarchy", "Constitutional monarchy"], "answer": 3 },
  { "id": "pg_e20", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the head of state in a republic?", "options": ["Governor", "Chancellor", "President", "Prime Minister"], "answer": 2 },
  { "id": "pg_e21", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a group of senior advisers, often department heads, who help a head of government make decisions?", "options": ["Caucus", "Committee", "Cabinet", "Council"], "answer": 2 },
  { "id": "pg_e22", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the specific geographic area an elected representative represents?", "options": ["Constituency", "District court", "Ward office", "Precinct hall"], "answer": 0 },
  { "id": "pg_e23", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a formal written request submitted to a government body by citizens?", "options": ["Petition", "Mandate", "Referendum", "Decree"], "answer": 0 },
  { "id": "pg_e24", "topic": "Politics & Government", "difficulty": "easy", "question": "What is a country's foundational document listing citizens' basic legal protections called?", "options": ["Executive Order", "Legal Code", "Bill of Rights", "Royal Charter"], "answer": 2 },
  { "id": "pg_e25", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a temporary halt or suspension of a legislative session?", "options": ["Adjournment", "Filibuster", "Recess appointment", "Dissolution"], "answer": 0 },
  { "id": "pg_e26", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for an official responsible for overseeing elections to ensure they are conducted fairly?", "options": ["Ballot Judge", "Vote Auditor", "Poll Marshal", "Election Commissioner"], "answer": 3 },
  { "id": "pg_e27", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the entire group of people eligible to vote in an election?", "options": ["Constituency", "Assembly", "Delegation", "Electorate"], "answer": 3 },
  { "id": "pg_e28", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a government's official approach to relations with other countries?", "options": ["Trade policy", "Fiscal policy", "Foreign policy", "Domestic policy"], "answer": 2 },
  { "id": "pg_e29", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a government's approach to internal, domestic issues, as opposed to foreign policy?", "options": ["Foreign policy", "International law", "Domestic policy", "Monetary policy"], "answer": 2 },
  { "id": "pg_e30", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the minimum number of members who must be present for a legislative body to conduct valid business?", "options": ["Quorum", "Majority", "Plurality", "Consensus"], "answer": 0 },
  { "id": "pg_e31", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a government employee who is not elected but works in an administrative role?", "options": ["Diplomat", "Elector", "Civil servant", "Delegate"], "answer": 2 },
  { "id": "pg_e32", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a formal written agreement between two or more countries?", "options": ["Treaty", "Decree", "Statute", "Ordinance"], "answer": 0 },
  { "id": "pg_e33", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the head of a city's local government?", "options": ["Alderman", "Mayor", "Governor", "Commissioner"], "answer": 1 },
  { "id": "pg_e34", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the smallest common unit of local government, often covering a town or group of villages?", "options": ["Municipality", "Territory", "Province", "District"], "answer": 0 },
  { "id": "pg_e35", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a judge's or official's right to hold office for an extended or indefinite period, protecting their independence?", "options": ["Term limit", "Appointment", "Tenure", "Mandate"], "answer": 2 },
  { "id": "pg_e36", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for a government's organized collection of laws on a specific subject, such as taxation?", "options": ["Statute book", "Constitution", "Charter", "Legal code"], "answer": 3 },
  { "id": "pg_e37", "topic": "Politics & Government", "difficulty": "easy", "question": "What is the term for the formal ceremony marking an elected official's official start of term?", "options": ["Ratification", "Investiture", "Inauguration", "Coronation"], "answer": 2 },

  // ==========================================
  //  9. POLITICS & GOVERNMENT — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "pg_em1", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a government system with an elected head of state, and no monarch?", "options": ["Protectorate", "Colony", "Republic", "Monarchy"], "answer": 2 },
  { "id": "pg_em2", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for dividing governmental power among different branches to prevent any one from becoming too powerful?", "options": ["Bicameralism", "Devolution", "Federalism", "Separation of powers"], "answer": 3 },
  { "id": "pg_em3", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for the power of courts to check the actions of the legislature and executive?", "options": ["Legislative oversight", "Due process", "Executive privilege", "Judicial review"], "answer": 3 },
  { "id": "pg_em4", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the name of the international organization founded in 1945 to maintain peace and security?", "options": ["League of Nations", "European Union", "NATO", "United Nations"], "answer": 3 },
  { "id": "pg_em5", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "How many permanent members does the United Nations Security Council have?", "options": ["10", "20", "15", "5"], "answer": 3 },
  { "id": "pg_em6", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a political system with several competing parties, none dominating exclusively?", "options": ["Multi -party system", "One -party system", "Two -party system", "Coalition state"], "answer": 0 },
  { "id": "pg_em7", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for the formal removal of a sitting official through a legal process for wrongdoing?", "options": ["Dissolution", "Recall", "Censure", "Impeachment"], "answer": 3 },
  { "id": "pg_em8", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for redrawing electoral district boundaries to favor a particular political party?", "options": ["Redistricting", "Gerrymandering", "Apportionment", "Delimitation"], "answer": 1 },
  { "id": "pg_em9", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is typically the minimum voting age in most democratic countries?", "options": ["25", "18", "21", "16"], "answer": 1 },
  { "id": "pg_em10", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a public vote on a specific proposed law or policy, rather than for a representative?", "options": ["Plebiscite vote", "Referendum", "Primary", "Census"], "answer": 1 },
  { "id": "pg_em11", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a country that avoids permanent alignment with major world power blocs?", "options": ["Neutral state", "Non -aligned nation", "Satellite state", "Buffer state"], "answer": 1 },
  { "id": "pg_em12", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a government led by religious leaders or based on religious law?", "options": ["Autocracy", "Aristocracy", "Theocracy", "Plutocracy"], "answer": 2 },
  { "id": "pg_em13", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the name of the global organization promoting free trade and economic cooperation, headquartered in Geneva?", "options": ["World Bank", "OECD", "World Trade Organization", "IMF"], "answer": 2 },
  { "id": "pg_em14", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a government seizing power through unconstitutional, often forceful means?", "options": ["Impeachment", "Referendum", "Coup d'etat", "Devolution"], "answer": 2 },
  { "id": "pg_em15", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a permanent UN Security Council member's power to block a resolution?", "options": ["Filibuster", "Veto power", "Override", "Sanction"], "answer": 1 },
  { "id": "pg_em16", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a government that has just come to power and not yet been formally confirmed by election?", "options": ["Interim government", "Coalition government", "Caretaker cabinet", "Shadow government"], "answer": 0 },
  { "id": "pg_em17", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a country's supreme law, outlining how governmental power is structured and limited?", "options": ["Statute", "Ordinance", "Constitution", "Decree"], "answer": 2 },
  { "id": "pg_em18", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a chief executive's power to reject a bill passed by the legislature?", "options": ["Repeal", "Amendment", "Veto", "Injunction"], "answer": 2 },
  { "id": "pg_em19", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a legislature's ability to override an executive veto, usually requiring a supermajority?", "options": ["Legislative supremacy", "Confidence motion", "Veto override", "Recall vote"], "answer": 2 },
  { "id": "pg_em20", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a political system that splits executive power between a head of state and a head of government?", "options": ["Shared cabinet", "Split presidency", "Coalition executive", "Dual executive"], "answer": 3 },
  { "id": "pg_em21", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for an election held to fill a vacant seat between regular election cycles?", "options": ["Run -off election", "Snap election", "Primary election", "By -election"], "answer": 3 },
  { "id": "pg_em22", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a politician switching from one political party to another, especially in a parliamentary system?", "options": ["Delegation shift", "Realignment", "Floor -crossing", "Party purge"], "answer": 2 },
  { "id": "pg_em23", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for an election in which voters choose among candidates from within their own party to select a nominee?", "options": ["By -election", "Referendum", "General election", "Primary election"], "answer": 3 },
  { "id": "pg_em24", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a process allowing citizens to propose new laws directly, often by gathering signatures for a ballot measure?", "options": ["Ballot initiative", "Plebiscite", "Petition drive", "Direct mandate"], "answer": 0 },
  { "id": "pg_em25", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a legislature's process of reviewing and approving a government's proposed spending plan?", "options": ["Ratification", "Certification", "Appropriation", "Audit"], "answer": 2 },
  { "id": "pg_em26", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a government resigning or being removed after losing a key parliamentary vote?", "options": ["Recall election", "Censure motion", "Vote of no confidence", "Impeachment"], "answer": 2 },
  { "id": "pg_em27", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for the leader of the largest non -governing party in a parliamentary system?", "options": ["Leader of the Opposition", "Shadow Chancellor", "Deputy Speaker", "Minority Whip"], "answer": 0 },
  { "id": "pg_em28", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a group of legislators from the same party who coordinate strategy and voting?", "options": ["Standing committee", "Party caucus", "Joint session", "Coalition bloc"], "answer": 1 },
  { "id": "pg_em29", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for the constitutional principle requiring the armed forces to answer to elected leaders rather than acting independently?", "options": ["Martial law doctrine", "Executive command principle", "Chain of command", "Civilian control of the military"], "answer": 3 },
  { "id": "pg_em30", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a law that applies retroactively to actions taken before it was passed, generally prohibited under most legal systems?", "options": ["Case law", "Ex post facto law", "Statutory law", "Common law"], "answer": 1 },
  { "id": "pg_em31", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for the legal principle protecting individuals from being tried twice for the same crime?", "options": ["Double jeopardy", "Presumption of innocence", "Habeas corpus", "Due process"], "answer": 0 },
  { "id": "pg_em32", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for the constitutional order determining who assumes power if a leader is incapacitated or dies in office?", "options": ["Transfer protocol", "Line of succession", "Continuity clause", "Emergency mandate"], "answer": 1 },
  { "id": "pg_em33", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for a legislative body's formal investigation into government conduct or a matter of public concern?", "options": ["Public hearing", "Parliamentary inquiry", "Judicial review", "Executive audit"], "answer": 1 },
  { "id": "pg_em34", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for redistributing legislative seats based on updated population data from a census?", "options": ["Boundary revision", "Delimitation", "Redistricting", "Reapportionment"], "answer": 3 },
  { "id": "pg_em35", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for citizens directly removing an elected official from office before their term ends, via a special vote?", "options": ["Recall election", "Vote of no confidence", "Impeachment", "Censure"], "answer": 0 },
  { "id": "pg_em36", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for rules issued by a government agency that carry the force of law without requiring new legislation?", "options": ["Judicial decree", "Administrative regulation", "Executive order", "Statutory instrument"], "answer": 1 },
  { "id": "pg_em37", "topic": "Politics & Government", "difficulty": "easy-medium", "question": "What is the term for insulating judges from political pressure by granting them long or lifetime tenure?", "options": ["Judicial activism", "Judicial restraint", "Judicial review", "Judicial independence"], "answer": 3 },

  // ==========================================
  //  9. POLITICS & GOVERNMENT — STEP 3: MEDIUM
  // ==========================================
  { "id": "pg_m1", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a political ideology favoring minimal government intervention in the economy and personal freedoms?", "options": ["Fascism", "Communism", "Libertarianism", "Socialism"], "answer": 2 },
  { "id": "pg_m2", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a political and economic system based on collective or state ownership of production?", "options": ["Socialism", "Capitalism", "Libertarianism", "Feudalism"], "answer": 0 },
  { "id": "pg_m3", "topic": "Politics & Government", "difficulty": "medium", "question": "What political philosophy, associated with Karl Marx, calls for abolishing private property and class structure?", "options": ["Communism", "Fascism", "Anarchism", "Socialism"], "answer": 0 },
  { "id": "pg_m4", "topic": "Politics & Government", "difficulty": "medium", "question": "In a parliamentary republic, what is the term for the largely ceremonial head of state, distinct from the Prime Minister who holds executive power?", "options": ["Chancellor", "President", "Speaker", "Governor -General"], "answer": 1 },
  { "id": "pg_m5", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a legislature made up of two separate chambers, such as a Senate and a House?", "options": ["Bicameral legislature", "Tricameral legislature", "Federal assembly", "Unicameral legislature"], "answer": 0 },
  { "id": "pg_m6", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a legislature that has only a single chamber?", "options": ["Joint assembly", "Federal congress", "Bicameral legislature", "Unicameral legislature"], "answer": 3 },
  { "id": "pg_m7", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the name of the 1948 UN document outlining basic human rights recognized globally?", "options": ["UN Charter", "Geneva Convention", "Atlantic Charter", "Universal Declaration of Human Rights"], "answer": 3 },
  { "id": "pg_m8", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a government controlling and restricting the flow of information, common in authoritarian states?", "options": ["Propaganda", "Regulation", "Censorship", "Surveillance"], "answer": 2 },
  { "id": "pg_m9", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for rule by a small, powerful group, often after seizing control undemocratically?", "options": ["Democracy", "Oligarchy", "Federation", "Republic"], "answer": 1 },
  { "id": "pg_m10", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a government's formal act of accepting another government as legitimate?", "options": ["Ratification", "Diplomatic recognition", "Accreditation", "Certification"], "answer": 1 },
  { "id": "pg_m11", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for an electoral system in which legislative seats are allocated based on each party's share of the vote?", "options": ["Proportional representation", "Ranked -choice voting", "First -past-the-post", "Electoral college"], "answer": 0 },
  { "id": "pg_m12", "topic": "Politics & Government", "difficulty": "medium", "question": "What electoral system, used in the UK and India, awards a seat to whichever candidate wins the most votes, even without a majority?", "options": ["Runoff voting", "First -past-the-post", "Ranked -choice voting", "Proportional representation"], "answer": 1 },
  { "id": "pg_m13", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the general term for the abuse of public office for private gain?", "options": ["Lobbying", "Bureaucracy", "Diplomacy", "Corruption"], "answer": 3 },
  { "id": "pg_m14", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a government's official policy of not aligning militarily with any bloc or power?", "options": ["Non -interference", "Neutrality", "Isolationism", "Detente"], "answer": 1 },
  { "id": "pg_m15", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for the formal process of changing or adding to a country's constitution?", "options": ["Executive order", "Legislative override", "Judicial review", "Constitutional amendment"], "answer": 3 },
  { "id": "pg_m16", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a system where citizens vote directly on most major issues rather than through elected representatives?", "options": ["Direct democracy", "Constitutional monarchy", "Federal republic", "Representative democracy"], "answer": 0 },
  { "id": "pg_m17", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a system where elected officials make decisions on behalf of the citizens who elected them?", "options": ["Direct democracy", "Meritocracy", "Technocracy", "Representative democracy"], "answer": 3 },
  { "id": "pg_m18", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a political system in which regional governments hold significant autonomy but remain loosely tied to a weak central authority?", "options": ["Unitary state", "Confederation", "Federation", "Protectorate"], "answer": 1 },
  { "id": "pg_m19", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for the judicial philosophy that laws should be interpreted based on the original intent of those who wrote them?", "options": ["Judicial restraint", "Legal positivism", "Living constitutionalism", "Originalism"], "answer": 3 },
  { "id": "pg_m20", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for the judicial philosophy favoring interpreting a constitution in light of modern, evolving circumstances?", "options": ["Strict constructionism", "Originalism", "Living constitution doctrine", "Textualism"], "answer": 2 },
  { "id": "pg_m21", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a temporary government that administers a country during a transition period, often after a political crisis?", "options": ["Provisional assembly", "Interim government", "Shadow government", "Transitional council"], "answer": 1 },
  { "id": "pg_m22", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for the political philosophy advocating a gradual, peaceful transition to socialism through existing democratic institutions?", "options": ["Communism", "Democratic socialism", "Anarcho -syndicalism", "Fascism"], "answer": 1 },
  { "id": "pg_m23", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a political ideology emphasizing extreme nationalism, authoritarianism, and often militarism, associated with early 20th century European regimes?", "options": ["Federalism", "Conservatism", "Liberalism", "Fascism"], "answer": 3 },
  { "id": "pg_m24", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for the principle that laws should apply equally to all citizens regardless of status?", "options": ["Rule of law", "Judicial review", "Due process", "Equality before the law"], "answer": 3 },
  { "id": "pg_m25", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for the transfer of government -run functions or services to private companies?", "options": ["Outsourcing", "Nationalization", "Deregulation", "Privatization"], "answer": 3 },
  { "id": "pg_m26", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a government's power to take private property for public use, typically with compensation?", "options": ["Eminent domain", "Requisition", "Confiscation", "Nationalization"], "answer": 0 },
  { "id": "pg_m27", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a legislative body having sole authority over a specific area of law -making, with no overlap from other bodies?", "options": ["Delegated authority", "Exclusive jurisdiction", "Concurrent jurisdiction", "Residual power"], "answer": 1 },
  { "id": "pg_m28", "topic": "Politics & Government", "difficulty": "medium", "question": "In a federal system like the United States, what is the term for powers not explicitly granted to the national government and left to the states?", "options": ["Reserved powers", "Enumerated powers", "Implied powers", "Concurrent powers"], "answer": 0 },
  { "id": "pg_m29", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for powers shared jointly by both national and state or provincial governments in a federal system?", "options": ["Concurrent powers", "Reserved powers", "Exclusive powers", "Delegated powers"], "answer": 0 },
  { "id": "pg_m30", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for the doctrine that a national government's laws take precedence over conflicting state or provincial laws?", "options": ["States' rights doctrine", "Dual sovereignty", "Federal supremacy doctrine", "Nullification"], "answer": 2 },
  { "id": "pg_m31", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a constitutional mechanism allowing citizens to propose amendments directly, bypassing the legislature?", "options": ["Executive referendum", "Legislative override", "Constitutional initiative", "Judicial amendment"], "answer": 2 },
  { "id": "pg_m32", "topic": "Politics & Government", "difficulty": "medium", "question": "In a bicameral legislature, what is the term for the joint committee formed to reconcile differing versions of a bill passed by each chamber?", "options": ["Conference committee", "Joint session", "Standing committee", "Select committee"], "answer": 0 },
  { "id": "pg_m33", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for an independent official appointed to investigate public complaints against government agencies?", "options": ["Inspector General", "Ombudsman", "Comptroller", "Public Advocate"], "answer": 1 },
  { "id": "pg_m34", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a country's chief law officer, responsible for representing the government in legal matters?", "options": ["Solicitor", "Chief Justice", "Public Prosecutor", "Attorney General"], "answer": 3 },
  { "id": "pg_m35", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for a legally binding international agreement made by a government that does not require full legislative treaty ratification?", "options": ["Executive agreement", "Communique", "Memorandum of understanding", "Protocol"], "answer": 0 },
  { "id": "pg_m36", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for an alliance formed between otherwise competing political parties to jointly contest an election or defeat a common opponent?", "options": ["Popular front", "Unity ticket", "Coalition government", "Electoral alliance"], "answer": 3 },
  { "id": "pg_m37", "topic": "Politics & Government", "difficulty": "medium", "question": "What is the term for the constitutional principle requiring government actions and decisions to be open to public scrutiny?", "options": ["Due process", "Separation of powers", "Government transparency", "Judicial review"], "answer": 2 },

  // ==========================================
  //  9. POLITICS & GOVERNMENT — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "pg_mh1", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for the political theory that ultimate authority resides in the people, who delegate power to their government?", "options": ["Social contract", "Popular sovereignty", "Natural law", "Divine right"], "answer": 1 },
  { "id": "pg_mh2", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the name of the principle that no person, including government officials, is above the law?", "options": ["Habeas corpus", "Due process", "Rule of law", "Judicial independence"], "answer": 2 },
  { "id": "pg_mh3", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for an alliance of political parties that jointly form a government when no single party has a majority?", "options": ["Shadow cabinet", "Confidence pact", "Unity ticket", "Coalition government"], "answer": 3 },
  { "id": "pg_mh4", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for the imposition of direct military control over civilian government functions during a crisis?", "options": ["Executive order", "Martial law", "State of emergency", "Federal intervention"], "answer": 1 },
  { "id": "pg_mh5", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for a formal agreement between just two countries, as opposed to among many nations?", "options": ["Multilateral treaty", "Protocol", "Bilateral agreement", "Accord"], "answer": 2 },
  { "id": "pg_mh6", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for a foreign policy strategy of maintaining an equilibrium among rival states to prevent any one from dominating?", "options": ["Balance of power", "Containment", "Appeasement", "Detente"], "answer": 0 },
  { "id": "pg_mh7", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What term describes former colonial powers continuing to exert economic or political influence over their former colonies?", "options": ["Federalism", "Neocolonialism", "Protectorate status", "Imperialism"], "answer": 1 },
  { "id": "pg_mh8", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for transferring authority and responsibilities from a central government to regional or local governments?", "options": ["Decentralization of markets", "Privatization", "Devolution", "Federalism"], "answer": 2 },
  { "id": "pg_mh9", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for governance carried out by technical experts rather than elected politicians?", "options": ["Technocracy", "Bureaucracy", "Aristocracy", "Meritocracy"], "answer": 0 },
  { "id": "pg_mh10", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for a legislative session called for a specific, limited purpose outside the regular schedule?", "options": ["Plenary session", "Special session", "Recess period", "Committee hearing"], "answer": 1 },
  { "id": "pg_mh11", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the historical term for electoral systems where voters of different religions or ethnicities vote separately for their own representatives?", "options": ["Separate electorates", "Reserved seats", "Proportional representation", "Federal constituencies"], "answer": 0 },
  { "id": "pg_mh12", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for a country's official representative who lives in a foreign country to maintain diplomatic relations?", "options": ["Envoy Extraordinary", "Ambassador", "Consul General", "Attache"], "answer": 1 },
  { "id": "pg_mh13", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for the legal principle that a person is considered innocent until proven guilty?", "options": ["Presumption of innocence", "Habeas corpus", "Double jeopardy", "Due process"], "answer": 0 },
  { "id": "pg_mh14", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for the formal approval of an international treaty by a country's legislature?", "options": ["Accession", "Ratification", "Certification", "Endorsement"], "answer": 1 },
  { "id": "pg_mh15", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for a system of government combining elements of both presidential and parliamentary systems, as seen in France?", "options": ["Constitutional monarchy", "Federal republic", "Semi -presidential system", "Parliamentary republic"], "answer": 2 },
  { "id": "pg_mh16", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for a country's permanent, official representative stationed at an international organization like the UN?", "options": ["Special rapporteur", "Permanent representative", "Charge d'affaires", "Consul"], "answer": 1 },
  { "id": "pg_mh17", "topic": "Politics & Government", "difficulty": "medium-hard", "question": "What is the term for appointing friends or family members to government positions regardless of their qualifications?", "options": ["Nepotism", "Clientelism", "Cronyism", "Patronage"], "answer": 0 },

  // ==========================================
  //  9. POLITICS & GOVERNMENT — STEP 5: HARD
  // ==========================================
  { "id": "pg_h1", "topic": "Politics & Government", "difficulty": "hard", "question": "Which political philosopher's theory, outlined in \"Leviathan,\" argued that individuals surrender freedoms to a sovereign in exchange for security and order?", "options": ["Baron de Montesquieu", "Jean -Jacques Rousseau", "John Locke", "Thomas Hobbes"], "answer": 3 },
  { "id": "pg_h2", "topic": "Politics & Government", "difficulty": "hard", "question": "Whose 1762 work \"The Social Contract\" argued that legitimate political authority stems from a collective agreement among the governed?", "options": ["Jean -Jacques Rousseau", "Thomas Hobbes", "John Locke", "Voltaire"], "answer": 0 },
  { "id": "pg_h3", "topic": "Politics & Government", "difficulty": "hard", "question": "What is the term for a political system in which a single party legally holds a permanent monopoly on political power?", "options": ["Hegemonic system", "Absolute monarchy", "One -party state", "Confederacy"], "answer": 2 },
  { "id": "pg_h4", "topic": "Politics & Government", "difficulty": "hard", "question": "What is the name of the principle, established by the 1648 Peace of Westphalia, holding that states have exclusive sovereignty over their own territory?", "options": ["Self -determination", "Non -intervention", "Balance of power", "Westphalian sovereignty"], "answer": 3 },
  { "id": "pg_h5", "topic": "Politics & Government", "difficulty": "hard", "question": "What Latin term describes a \"state within a state,\" referring to an autonomous power structure operating within a nation's formal government?", "options": ["Res publica", "De facto regime", "Sui generis", "Imperium in imperio"], "answer": 3 },
  { "id": "pg_h6", "topic": "Politics & Government", "difficulty": "hard", "question": "What is the term for the legal principle that a sitting head of state or government cannot be criminally prosecuted while in office?", "options": ["Diplomatic immunity", "Head of state immunity", "Parliamentary privilege", "Executive privilege"], "answer": 1 },
  { "id": "pg_h7", "topic": "Politics & Government", "difficulty": "hard", "question": "What term do political scientists use for a hybrid regime that holds elections but systematically suppresses genuine political competition?", "options": ["Competitive authoritarianism", "Illiberal democracy", "Managed pluralism", "Guided democracy"], "answer": 0 },
  { "id": "pg_h8", "topic": "Politics & Government", "difficulty": "hard", "question": "What political theory holds that real political power naturally concentrates among a small elite, regardless of a country's formal system of government?", "options": ["Corporatism", "Institutionalism", "Elite theory", "Pluralism"], "answer": 2 },
  { "id": "pg_h9", "topic": "Politics & Government", "difficulty": "hard", "question": "Which political scientist introduced the concept of \"soft power,\" a nation's ability to influence others through appeal rather than coercion?", "options": ["Henry Kissinger", "Joseph Nye", "Samuel Huntington", "Francis Fukuyama"], "answer": 1 },
  { "id": "pg_h10", "topic": "Politics & Government", "difficulty": "hard", "question": "What is the term for a legislative procedure used to delay or block a vote by extending debate indefinitely, notably used in the US Senate?", "options": ["Discharge petition", "Filibuster", "Cloture", "Quorum call"], "answer": 1 },
  { "id": "pg_h11", "topic": "Politics & Government", "difficulty": "hard", "question": "What is the term for political power passing down within a family across generations, even within a formally democratic republic?", "options": ["Political dynasty", "Feudal privilege", "Patrimonialism", "Hereditary succession"], "answer": 0 },
  { "id": "pg_h12", "topic": "Politics & Government", "difficulty": "hard", "question": "What principle in international law holds that a state should not interfere in the internal affairs of another sovereign state?", "options": ["Non -interference", "Mutual defense", "Self -determination", "Collective security"], "answer": 0 },
  { "id": "pg_h13", "topic": "Politics & Government", "difficulty": "hard", "question": "What is the term for an unwritten set of political norms and traditions that function alongside a country's formal written constitution?", "options": ["Statutory instrument", "Precedent", "Common law", "Constitutional convention"], "answer": 3 },
  { "id": "pg_h14", "topic": "Politics & Government", "difficulty": "hard", "question": "What is the term for the concept that a government's authority is only legitimate if it has the agreement of those it governs?", "options": ["Consent of the governed", "Divine right of kings", "Manifest destiny", "Social Darwinism"], "answer": 0 },
  { "id": "pg_h15", "topic": "Politics & Government", "difficulty": "hard", "question": "Which 17th -century English philosopher's ideas on natural rights and government by consent strongly influenced the US Declaration of Independence?", "options": ["Francis Bacon", "Thomas Hobbes", "David Hume", "John Locke"], "answer": 3 },
  { "id": "pg_h16", "topic": "Politics & Government", "difficulty": "hard", "question": "What is the term for a governing coalition formed between major parties from opposite ends of the political spectrum, often out of necessity?", "options": ["Grand coalition", "Confidence and supply", "Unity government", "Popular front"], "answer": 0 },
  { "id": "pg_h17", "topic": "Politics & Government", "difficulty": "hard", "question": "What term describes a legal doctrine under which courts defer to the executive branch's judgment on matters of national security or foreign policy?", "options": ["Political question doctrine", "Sovereign immunity", "Executive privilege", "Judicial restraint"], "answer": 0 },

  // ==========================================
  //  10. COMPUTER & INTERNET — STEP 1: EASY
  // ==========================================
  { "id": "ci_e1", "topic": "Computer & Internet", "difficulty": "easy", "question": "Which programming language, created by Guido van Rossum, is known for its readability and heavy use in data science?", "options": ["Ruby", "Python", "C++", "Java"], "answer": 1 },
  { "id": "ci_e2", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for a piece of software that automatically performs repetitive tasks online, sometimes maliciously?", "options": ["Applet", "Bot", "Widget", "Plugin"], "answer": 1 },
  { "id": "ci_e3", "topic": "Computer & Internet", "difficulty": "easy", "question": "Who is considered the \"father of the World Wide Web,\" having invented it in 1989?", "options": ["Vint Cerf", "Marc Andreessen", "Bill Gates", "Tim Berners -Lee"], "answer": 3 },
  { "id": "ci_e4", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"SQL\" stand for, a language used to manage databases?", "options": ["System Query Language", "Sequential Query Language", "Standard Query Logic", "Structured Query Language"], "answer": 3 },
  { "id": "ci_e5", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for a network attack that overwhelms a server with traffic to make it unavailable to users?", "options": ["Denial -of-Service attack", "Man -in-the-middle attack", "Phishing attack", "SQL injection"], "answer": 0 },
  { "id": "ci_e6", "topic": "Computer & Internet", "difficulty": "easy", "question": "Who created the original Linux kernel in 1991?", "options": ["Dennis Ritchie", "Ken Thompson", "Linus Torvalds", "Richard Stallman"], "answer": 2 },
  { "id": "ci_e7", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for software whose source code is made publicly available to use, modify, and distribute freely?", "options": ["Proprietary software", "Shareware", "Freeware", "Open -source software"], "answer": 3 },
  { "id": "ci_e8", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"HTTP\" stand for?", "options": ["HyperText Transmission Path", "Home Tool Transfer Protocol", "HyperText Transfer Protocol", "High Text Transmission Path"], "answer": 2 },
  { "id": "ci_e9", "topic": "Computer & Internet", "difficulty": "easy", "question": "In which year did Elon Musk acquire Twitter, later renaming it X?", "options": ["2018", "2022", "2024", "2020"], "answer": 1 },
  { "id": "ci_e10", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for tricking people into revealing sensitive information via fake emails or websites?", "options": ["Phishing", "Spamming", "Spoofing", "Hacking"], "answer": 0 },
  { "id": "ci_e11", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"GUI\" stand for?", "options": ["Global User Identity", "General User Interface", "Graphic Utility Icon", "Graphical User Interface"], "answer": 3 },
  { "id": "ci_e12", "topic": "Computer & Internet", "difficulty": "easy", "question": "What was the name of the first widely -used web browser, released in 1993, that helped popularize the internet?", "options": ["Lynx", "Internet Explorer", "Mosaic", "Netscape"], "answer": 2 },
  { "id": "ci_e13", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"DNS\" stand for, the system that translates domain names into IP addresses?", "options": ["Domain Name System", "Digital Naming Standard", "Domain Network Service", "Data Network Server"], "answer": 0 },
  { "id": "ci_e14", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for a copy of data stored separately in case the original is lost or damaged?", "options": ["Buffer", "Archive", "Cache", "Backup"], "answer": 3 },
  { "id": "ci_e15", "topic": "Computer & Internet", "difficulty": "easy", "question": "Which programming language, developed by Apple, is primarily used for iOS app development?", "options": ["Swift", "Dart", "Kotlin", "Objective -C"], "answer": 0 },
  { "id": "ci_e16", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"API\" stand for, allowing different software applications to communicate with each other?", "options": ["Application Programming Interface", "Application Process Index", "Automated Program Instruction", "Applied Program Integration"], "answer": 0 },
  { "id": "ci_e17", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for the amount of data that can be transmitted over an internet connection in a given time?", "options": ["Bandwidth", "Ping", "Throughput cap", "Latency"], "answer": 0 },
  { "id": "ci_e18", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"PC\" commonly stand for?", "options": ["Program Code", "Processing Chip", "Portable Component", "Personal Computer"], "answer": 3 },
  { "id": "ci_e19", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"ROM,\" a type of computer memory, stand for?", "options": ["Random Output Memory", "Rapid Operating Memory", "Read -Only Memory", "Recordable Optical Media"], "answer": 2 },
  { "id": "ci_e20", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the name of the small arrow icon controlled by a computer mouse on screen?", "options": ["Indicator", "Pointer stick", "Marker", "Cursor"], "answer": 3 },
  { "id": "ci_e21", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for a computer program used to browse websites on the internet?", "options": ["Web server", "Search engine", "Web browser", "Web host"], "answer": 2 },
  { "id": "ci_e22", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for a computer file that has been compressed to reduce its size and save storage space?", "options": ["Zip file", "Cache file", "Log file", "Temp file"], "answer": 0 },
  { "id": "ci_e23", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"app\" commonly refer to on smartphones and computers?", "options": ["Archive", "Attachment", "Access point", "Application"], "answer": 3 },
  { "id": "ci_e24", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the name of the touch -sensitive pad found on most laptop computers, used instead of a mouse?", "options": ["Digitizer", "Touchpad", "Trackball", "Scroll wheel"], "answer": 1 },
  { "id": "ci_e25", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"GB,\" a common unit for measuring digital storage, stand for?", "options": ["Gigabit", "Gigabyte", "Global Block", "General Byte"], "answer": 1 },
  { "id": "ci_e26", "topic": "Computer & Internet", "difficulty": "easy", "question": "What does \"MB,\" a common unit for measuring digital storage, stand for?", "options": ["Megabit", "Megabyte", "Memory Block", "Main Board"], "answer": 1 },
  { "id": "ci_e27", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for a computer's main circuit board, which connects all its components?", "options": ["Processor board", "Circuit hub", "Base card", "Motherboard"], "answer": 3 },
  { "id": "ci_e28", "topic": "Computer & Internet", "difficulty": "easy", "question": "What do we call unwanted software that installs itself without full user consent, often to display advertisements?", "options": ["Firmware", "Shareware", "Freeware", "Adware"], "answer": 3 },
  { "id": "ci_e29", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the name of Microsoft's word processing software?", "options": ["Microsoft Notes", "Microsoft Write", "Microsoft Word", "Microsoft Text"], "answer": 2 },
  { "id": "ci_e30", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the name of Microsoft's spreadsheet software?", "options": ["Microsoft Sheets", "Microsoft Excel", "Microsoft Calc", "Microsoft Tables"], "answer": 1 },
  { "id": "ci_e31", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the name of Microsoft's presentation software?", "options": ["Microsoft Present", "Microsoft Show", "Microsoft PowerPoint", "Microsoft Slides"], "answer": 2 },
  { "id": "ci_e32", "topic": "Computer & Internet", "difficulty": "easy", "question": "What do we call an organized collection of related data, often searched using queries?", "options": ["Spreadsheet", "Archive", "Database", "Directory"], "answer": 2 },
  { "id": "ci_e33", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for the process of sending a file from your computer to a server on the internet?", "options": ["Downloading", "Streaming", "Syncing", "Uploading"], "answer": 3 },
  { "id": "ci_e34", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the term for the process of receiving a file from the internet onto your computer?", "options": ["Uploading", "Downloading", "Mirroring", "Streaming"], "answer": 1 },
  { "id": "ci_e35", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the common keyboard shortcut used to copy selected text or items?", "options": ["Ctrl+C", "Ctrl+X", "Ctrl+Z", "Ctrl+V"], "answer": 0 },
  { "id": "ci_e36", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the common keyboard shortcut used to paste copied text or items?", "options": ["Ctrl+V", "Ctrl+P", "Ctrl+C", "Ctrl+Y"], "answer": 0 },
  { "id": "ci_e37", "topic": "Computer & Internet", "difficulty": "easy", "question": "What is the common keyboard shortcut used to undo the last action in most software?", "options": ["Ctrl+R", "Ctrl+Z", "Ctrl+U", "Ctrl+Y"], "answer": 1 },

  // ==========================================
  //  10. COMPUTER & INTERNET — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "ci_em1", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the first electronic general -purpose digital computer, completed in 1945?", "options": ["UNIVAC", "ENIAC", "Colossus", "EDSAC"], "answer": 1 },
  { "id": "ci_em2", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "Who is credited with writing the first computer algorithm, intended for Charles Babbage's Analytical Engine?", "options": ["Grace Hopper", "Margaret Hamilton", "Katherine Johnson", "Ada Lovelace"], "answer": 3 },
  { "id": "ci_em3", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What does \"TCP/IP\" stand for, the foundational protocol suite of the internet?", "options": ["Total Computer Protocol/Internal Process", "Terminal Connection Protocol/Interface Program", "Transfer Control Program/Internet Process", "Transmission Control Protocol/Internet Protocol"], "answer": 3 },
  { "id": "ci_em4", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a type of encryption that uses two keys, one public and one private?", "options": ["Symmetric encryption", "Asymmetric encryption", "Block encryption", "Hash encryption"], "answer": 1 },
  { "id": "ci_em5", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What was the name of one of the first computer viruses to spread widely on early personal computers, in 1986?", "options": ["Brain", "ILOVEYOU", "Sasser", "Melissa"], "answer": 0 },
  { "id": "ci_em6", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a computer system's ability to run multiple operating systems on one physical machine at once?", "options": ["Clustering", "Partitioning", "Multitasking", "Virtualization"], "answer": 3 },
  { "id": "ci_em7", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the security protocol used to encrypt data transmitted over the web, indicated by \"https\"?", "options": ["SMTP", "SSL/TLS", "FTP", "POP3"], "answer": 1 },
  { "id": "ci_em8", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for converting readable data into a coded, unreadable format for security purposes?", "options": ["Compression", "Formatting", "Encryption", "Indexing"], "answer": 2 },
  { "id": "ci_em9", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What do \"IPv4\" and \"IPv6\" refer to in internet addressing?", "options": ["Versions of the Internet Protocol", "Email server standards", "Kinds of web browsers", "Types of network cables"], "answer": 0 },
  { "id": "ci_em10", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a computer program that replicates itself and spreads to other computers, often causing harm?", "options": ["Firewall", "Computer virus", "Cache", "Cookie"], "answer": 1 },
  { "id": "ci_em11", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the technology that allows multiple virtual computers to run on a single physical server?", "options": ["Virtual machine", "Server farm", "Load balancer", "Data center"], "answer": 0 },
  { "id": "ci_em12", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What does \"RFID\" stand for?", "options": ["Rapid File Data Identification", "Radio Feed Information Data", "Remote Frequency Internet Device", "Radio -Frequency Identification"], "answer": 3 },
  { "id": "ci_em13", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a network of malware -infected computers controlled remotely, often used to launch attacks?", "options": ["Firewall", "Honeypot", "Sandbox", "Botnet"], "answer": 3 },
  { "id": "ci_em14", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What was the name of the first commercially successful personal computer, released by Apple in 1977?", "options": ["Macintosh", "Apple II", "Apple I", "Lisa"], "answer": 1 },
  { "id": "ci_em15", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a security vulnerability that is unknown to the software vendor and has no available fix?", "options": ["Buffer overflow", "Legacy bug", "Zero -day vulnerability", "Backdoor exploit"], "answer": 2 },
  { "id": "ci_em16", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What does \"LAN\" stand for?", "options": ["Linked Area Node", "Local Area Network", "Limited Access Network", "Long Area Network"], "answer": 1 },
  { "id": "ci_em17", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a database design principle that reduces data redundancy by organizing fields and tables?", "options": ["Partitioning", "Replication", "Normalization", "Indexing"], "answer": 2 },
  { "id": "ci_em18", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the standard connector widely used for charging and data transfer on modern smartphones, replacing older micro -USB?", "options": ["USB -A", "HDMI", "USB -C", "Lightning"], "answer": 2 },
  { "id": "ci_em19", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What does Bluetooth technology primarily enable between nearby devices?", "options": ["Fiber -optic networking", "Short -range wireless communication", "Wired data transfer", "Long -range satellite communication"], "answer": 1 },
  { "id": "ci_em20", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a computer processor containing multiple independent processing units, allowing it to handle multiple tasks at once?", "options": ["Single -core processor", "Multi -core processor", "Co -processor", "Microcontroller"], "answer": 1 },
  { "id": "ci_em21", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What does \"4K\" refer to in the context of television and monitor displays?", "options": ["Screen refresh rate", "Ultra High Definition resolution", "Contrast ratio", "Color depth"], "answer": 1 },
  { "id": "ci_em22", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for dividing a single physical hard drive into multiple separate logical sections?", "options": ["Formatting", "Compressing", "Partitioning", "Defragmenting"], "answer": 2 },
  { "id": "ci_em23", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for commercial software that must be purchased or licensed before use, as opposed to open -source software?", "options": ["Proprietary software", "Shareware", "Freeware", "Middleware"], "answer": 0 },
  { "id": "ci_em24", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a networking device that connects multiple computers, allowing them to communicate within a local network?", "options": ["Firewall", "Router", "Server", "Modem"], "answer": 1 },
  { "id": "ci_em25", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the process of restoring a computer or device to its original factory default settings?", "options": ["Hard reboot", "Data wipe", "System restore", "Factory reset"], "answer": 3 },
  { "id": "ci_em26", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What term describes software updates that fix security vulnerabilities or bugs?", "options": ["Patch", "Firmware", "Plugin", "Driver"], "answer": 0 },
  { "id": "ci_em27", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the common compressed file format widely used for photographs on the web?", "options": ["JPEG", "BMP", "PNG", "TIFF"], "answer": 0 },
  { "id": "ci_em28", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the common image file format known for lossless quality and support for transparent backgrounds?", "options": ["PNG", "BMP", "GIF", "JPEG"], "answer": 0 },
  { "id": "ci_em29", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What does \"GIF,\" a common animated image file format, stand for?", "options": ["Global Image Framework", "Graphics Interchange Format", "General Image File", "Graphic Info Format"], "answer": 1 },
  { "id": "ci_em30", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a small text file stored on a user's computer by a website to remember preferences or login details?", "options": ["Token", "Session ID", "Cache", "Cookie"], "answer": 3 },
  { "id": "ci_em31", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the browser mode that does not save browsing history, cookies, or site data?", "options": ["Incognito mode", "Airplane mode", "Guest mode", "Safe mode"], "answer": 0 },
  { "id": "ci_em32", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for software designed to detect and remove malicious programs from a computer?", "options": ["Compression software", "Antivirus software", "Firewall software", "Backup software"], "answer": 1 },
  { "id": "ci_em33", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What prefix appears at the start of a web address to indicate a secure, encrypted connection?", "options": ["https", "smtp", "www", "ftp"], "answer": 0 },
  { "id": "ci_em34", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for the process of converting a computer file from one format to another?", "options": ["File conversion", "File indexing", "File compression", "File encryption"], "answer": 0 },
  { "id": "ci_em35", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for a computer program that runs continuously in the background, performing tasks without direct user interaction?", "options": ["Foreground application", "Background process", "System driver", "User interface"], "answer": 1 },
  { "id": "ci_em36", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the name of the technology that allows a smartphone to share its internet connection wirelessly with other devices?", "options": ["Wi -Fi Direct", "Mobile hotspot", "NFC sharing", "Bluetooth tethering"], "answer": 1 },
  { "id": "ci_em37", "topic": "Computer & Internet", "difficulty": "easy-medium", "question": "What is the term for the practice of creating copies of important data to protect against loss?", "options": ["Data mining", "Data compression", "Data backup", "Data encryption"], "answer": 2 },

  // ==========================================
  //  10. COMPUTER & INTERNET — STEP 3: MEDIUM
  // ==========================================
  { "id": "ci_m1", "topic": "Computer & Internet", "difficulty": "medium", "question": "Who proposed the theoretical foundation of modern computing, the \"Turing machine,\" in a 1936 paper?", "options": ["John von Neumann", "Alan Turing", "Alonzo Church", "Claude Shannon"], "answer": 1 },
  { "id": "ci_m2", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the first computer worm to spread across the early internet (ARPANET), released in 1988?", "options": ["Code Red", "Blaster", "Conficker", "Morris Worm"], "answer": 3 },
  { "id": "ci_m3", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for the theoretical limit on how much a communication signal can be compressed without losing information, named after its formulator?", "options": ["Nyquist limit", "Shannon limit", "Moore's limit", "Turing limit"], "answer": 1 },
  { "id": "ci_m4", "topic": "Computer & Internet", "difficulty": "medium", "question": "Which programming paradigm, based on \"objects\" that bundle data and behavior together, is exemplified by languages like Java and C++?", "options": ["Declarative programming", "Functional programming", "Procedural programming", "Object -oriented programming"], "answer": 3 },
  { "id": "ci_m5", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the cryptographic algorithm, published in 1977, that became a foundational standard for public -key encryption?", "options": ["AES algorithm", "RSA algorithm", "DES algorithm", "Blowfish algorithm"], "answer": 1 },
  { "id": "ci_m6", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a computing architecture where program instructions and data share the same memory space, as opposed to Harvard architecture?", "options": ["Pipeline architecture", "Von Neumann architecture", "RISC architecture", "CISC architecture"], "answer": 1 },
  { "id": "ci_m7", "topic": "Computer & Internet", "difficulty": "medium", "question": "Who is credited, along with Donald Davies independently, with inventing packet -switching networks, a foundational concept for the internet?", "options": ["Leonard Kleinrock", "Vint Cerf", "Paul Baran", "Bob Kahn"], "answer": 2 },
  { "id": "ci_m8", "topic": "Computer & Internet", "difficulty": "medium", "question": "What was the name of one of the first search engines, created in 1990, that indexed files on FTP archives?", "options": ["WebCrawler", "AltaVista", "Yahoo", "Archie"], "answer": 3 },
  { "id": "ci_m9", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for the process by which a compiler translates high -level programming code into machine code?", "options": ["Interpretation", "Execution", "Assembly", "Compilation"], "answer": 3 },
  { "id": "ci_m10", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the algorithm Google uses to rank web pages in search results, named partly after a co -founder?", "options": ["WebRank", "PageRank", "LinkRank", "SearchRank"], "answer": 1 },
  { "id": "ci_m11", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a data structure that stores and retrieves elements in a last -in-first-out (LIFO) order?", "options": ["Queue", "Array", "Stack", "Linked list"], "answer": 2 },
  { "id": "ci_m12", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of a widely used hashing algorithm, now considered cryptographically insecure due to demonstrated collision attacks?", "options": ["MD5", "Diffie -Hellman", "RSA", "AES"], "answer": 0 },
  { "id": "ci_m13", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a type of computer memory that retains data only while powered, losing it when power is switched off?", "options": ["Non -volatile memory", "Read -only memory", "Volatile memory", "Flash memory"], "answer": 2 },
  { "id": "ci_m14", "topic": "Computer & Internet", "difficulty": "medium", "question": "Who is credited as the primary creator of the Java programming language while at Sun Microsystems?", "options": ["Bjarne Stroustrup", "Dennis Ritchie", "James Gosling", "Anders Hejlsberg"], "answer": 2 },
  { "id": "ci_m15", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for the process of finding and fixing errors or defects in computer software?", "options": ["Profiling", "Debugging", "Compiling", "Refactoring"], "answer": 1 },
  { "id": "ci_m16", "topic": "Computer & Internet", "difficulty": "medium", "question": "In which famous 1968 technology demonstration, dubbed \"The Mother of All Demos,\" did Douglas Engelbart showcase the computer mouse, hypertext, and video conferencing?", "options": ["The Homebrew Computer Club Demo", "The Dartmouth Time -Sharing Demo", "The Xerox PARC Showcase", "The Mother of All Demos"], "answer": 3 },
  { "id": "ci_m17", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for the smallest unit of information in classical computing, represented as either a 0 or a 1?", "options": ["Bit", "Word", "Byte", "Nibble"], "answer": 0 },
  { "id": "ci_m18", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a network architecture in which all computers have equal privileges, without a central server, commonly used in file -sharing systems?", "options": ["Client -server network", "Star network", "Peer -to-peer network", "Mesh network"], "answer": 2 },
  { "id": "ci_m19", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a computing model where data processing occurs on local devices close to the data source, rather than in a centralized cloud?", "options": ["Quantum computing", "Cloud computing", "Edge computing", "Grid computing"], "answer": 2 },
  { "id": "ci_m20", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the protocol used to securely access and manage remote computers over a network?", "options": ["FTP", "SSH", "SNMP", "HTTP"], "answer": 1 },
  { "id": "ci_m21", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a technique combining several physical storage drives into a single logical unit for improved performance or redundancy?", "options": ["RAID", "SAN", "NAS", "SSD array"], "answer": 0 },
  { "id": "ci_m22", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the popular open -source container platform that revolutionized software deployment, first released in 2013?", "options": ["Kubernetes", "Docker", "VMware", "Vagrant"], "answer": 1 },
  { "id": "ci_m23", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a software architecture style in which an application is built as a collection of small, independent services communicating over a network?", "options": ["Peer -to-peer architecture", "Microservices architecture", "Monolithic architecture", "Client -server architecture"], "answer": 1 },
  { "id": "ci_m24", "topic": "Computer & Internet", "difficulty": "medium", "question": "What version control system, created by Linus Torvalds, is widely used by software developers to track changes in code?", "options": ["Git", "Mercurial", "SVN", "Perforce"], "answer": 0 },
  { "id": "ci_m25", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a cyberattack in which an attacker secretly intercepts communication between two parties?", "options": ["Phishing attack", "Man -in-the-middle attack", "Denial -of-service attack", "Brute -force attack"], "answer": 1 },
  { "id": "ci_m26", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the security practice of testing a computer system for vulnerabilities by simulating an authorized attack?", "options": ["Load testing", "Penetration testing", "Regression testing", "Unit testing"], "answer": 1 },
  { "id": "ci_m27", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the widely used language for styling the visual presentation of web pages, working alongside HTML?", "options": ["PHP", "SQL", "CSS", "XML"], "answer": 2 },
  { "id": "ci_m28", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a website's design automatically adjusting its layout to fit different screen sizes, like mobile and desktop?", "options": ["Dynamic rendering", "Fluid scripting", "Responsive design", "Adaptive coding"], "answer": 2 },
  { "id": "ci_m29", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the international standard character encoding system that digitally represents most of the world's writing systems?", "options": ["UTF -32", "Unicode", "EBCDIC", "ASCII"], "answer": 1 },
  { "id": "ci_m30", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for software that manages and organizes digital content on a website without requiring manual coding of each page?", "options": ["Content Management System", "Operating System", "File Management System", "Database Management System"], "answer": 0 },
  { "id": "ci_m31", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the most widely used open -source Content Management System for building websites?", "options": ["Wix", "Drupal", "Joomla", "WordPress"], "answer": 3 },
  { "id": "ci_m32", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a cyberattack that encrypts a victim's files and demands payment for their release?", "options": ["Spyware", "Trojan horse", "Ransomware", "Rootkit"], "answer": 2 },
  { "id": "ci_m33", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the technique used to improve a website's visibility in unpaid search engine results?", "options": ["Pay -Per-Click Advertising", "Affiliate Marketing", "Search Engine Optimization", "Content Syndication"], "answer": 2 },
  { "id": "ci_m34", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for testing software with real users before its official public release?", "options": ["Alpha testing", "Unit testing", "Smoke testing", "Beta testing"], "answer": 3 },
  { "id": "ci_m35", "topic": "Computer & Internet", "difficulty": "medium", "question": "What widely used JavaScript library, developed by Facebook, is used for building user interfaces?", "options": ["jQuery", "React", "Vue", "Angular"], "answer": 1 },
  { "id": "ci_m36", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the term for a self -executing piece of code on a blockchain that automatically enforces the terms of an agreement?", "options": ["Consensus protocol", "Distributed ledger", "Smart contract", "Cryptographic hash"], "answer": 2 },
  { "id": "ci_m37", "topic": "Computer & Internet", "difficulty": "medium", "question": "What is the name of the popular front -end JavaScript framework developed by Google, an alternative to React?", "options": ["Ember", "React", "Angular", "Svelte"], "answer": 2 },

  // ==========================================
  //  10. COMPUTER & INTERNET — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "ci_mh1", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What term describes a computational problem where solutions can be verified quickly, but no known algorithm solves all instances in polynomial time?", "options": ["Halting problem", "P problem", "Undecidable problem", "NP -complete problem"], "answer": 3 },
  { "id": "ci_mh2", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the name of the data structure that allows efficient insertion and deletion at both its front and back ends?", "options": ["Singly linked list", "Stack", "Binary tree", "Deque"], "answer": 3 },
  { "id": "ci_mh3", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the term for a hierarchical data structure in which each node has at most two children?", "options": ["Hash table", "Binary tree", "Linked list", "Graph"], "answer": 1 },
  { "id": "ci_mh4", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "Which sorting algorithm has an average time complexity of O(n log n) and works by recursively splitting an array in half?", "options": ["Insertion sort", "Merge sort", "Selection sort", "Bubble sort"], "answer": 1 },
  { "id": "ci_mh5", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the term for a variable's visibility and lifetime within a program, determining where in the code it can be accessed?", "options": ["Scope", "Pointer", "Instance", "Namespace"], "answer": 0 },
  { "id": "ci_mh6", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What protocol is used to send email between mail servers?", "options": ["SMTP", "IMAP", "HTTP", "FTP"], "answer": 0 },
  { "id": "ci_mh7", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the term for a programming technique where a function calls itself to solve smaller instances of the same problem?", "options": ["Iteration", "Recursion", "Inheritance", "Polymorphism"], "answer": 1 },
  { "id": "ci_mh8", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What does \"REST,\" a common architectural style for web APIs, stand for?", "options": ["Representational State Transfer", "Reliable State Transfer", "Resource State Transmission", "Remote Execution State Transfer"], "answer": 0 },
  { "id": "ci_mh9", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What database transaction property ensures that a set of operations completes fully or not at all?", "options": ["Consistency", "Durability", "Atomicity", "Isolation"], "answer": 2 },
  { "id": "ci_mh10", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the term for a bug where the outcome of concurrent operations depends unpredictably on their timing?", "options": ["Race condition", "Stack overflow", "Memory leak", "Deadlock"], "answer": 0 },
  { "id": "ci_mh11", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the term for a processor's technique of overlapping the execution stages of multiple instructions to improve throughput?", "options": ["Caching", "Pipelining", "Virtualization", "Multithreading"], "answer": 1 },
  { "id": "ci_mh12", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "Which layer of the OSI model is primarily responsible for routing data between different networks?", "options": ["Data link layer", "Network layer", "Application layer", "Transport layer"], "answer": 1 },
  { "id": "ci_mh13", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the term for storing frequently accessed data in faster, smaller memory for quicker future retrieval?", "options": ["Buffering", "Paging", "Indexing", "Caching"], "answer": 3 },
  { "id": "ci_mh14", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What algorithmic strategy solves problems by breaking them into overlapping subproblems and storing previously computed results?", "options": ["Divide and conquer", "Dynamic programming", "Brute force", "Greedy algorithm"], "answer": 1 },
  { "id": "ci_mh15", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the term for code secretly inserted into a system to bypass normal authentication, often for malicious access?", "options": ["Backdoor", "Firewall", "Sandbox", "Honeypot"], "answer": 0 },
  { "id": "ci_mh16", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What network topology connects all devices to a single central hub or switch?", "options": ["Mesh topology", "Ring topology", "Star topology", "Bus topology"], "answer": 2 },
  { "id": "ci_mh17", "topic": "Computer & Internet", "difficulty": "medium-hard", "question": "What is the term for the intermediate, platform -independent code that Java source code is compiled into before execution?", "options": ["Bytecode", "Assembly code", "Source code", "Machine code"], "answer": 0 },

  // ==========================================
  //  10. COMPUTER & INTERNET — STEP 5: HARD
  // ==========================================
  { "id": "ci_h1", "topic": "Computer & Internet", "difficulty": "hard", "question": "What term describes a problem, exemplified by the Halting Problem, that is provably impossible for any algorithm to solve for all inputs?", "options": ["NP -hard problem", "Undecidable problem", "Heuristic problem", "Intractable problem"], "answer": 1 },
  { "id": "ci_h2", "topic": "Computer & Internet", "difficulty": "hard", "question": "Who proved, in a landmark 1936 paper, that the Halting Problem is undecidable?", "options": ["Alonzo Church", "Kurt Godel", "Alan Turing", "John von Neumann"], "answer": 2 },
  { "id": "ci_h3", "topic": "Computer & Internet", "difficulty": "hard", "question": "What class of security exploit infers secret data by measuring how long cryptographic operations take to execute?", "options": ["Brute -force attack", "Man -in-the-middle attack", "Side -channel attack", "SQL injection"], "answer": 2 },
  { "id": "ci_h4", "topic": "Computer & Internet", "difficulty": "hard", "question": "What graph traversal algorithm explores as far as possible along each branch before backtracking?", "options": ["Depth -first search", "Breadth -first search", "Binary search", "A* search"], "answer": 0 },
  { "id": "ci_h5", "topic": "Computer & Internet", "difficulty": "hard", "question": "Which algorithm, developed by a Dutch computer scientist, finds the shortest path between nodes in a weighted graph?", "options": ["Bellman -Ford algorithm", "Prim's algorithm", "Dijkstra's algorithm", "Kruskal's algorithm"], "answer": 2 },
  { "id": "ci_h6", "topic": "Computer & Internet", "difficulty": "hard", "question": "What complexity class contains all problems solvable in polynomial time by a deterministic computer?", "options": ["NP", "EXPTIME", "NP -hard", "P"], "answer": 3 },
  { "id": "ci_h7", "topic": "Computer & Internet", "difficulty": "hard", "question": "What cryptographic technique allows computations to be performed directly on encrypted data without first decrypting it?", "options": ["Hash encryption", "Elliptic curve encryption", "Symmetric encryption", "Homomorphic encryption"], "answer": 3 },
  { "id": "ci_h8", "topic": "Computer & Internet", "difficulty": "hard", "question": "The CAP theorem states a distributed system can only guarantee two of which three properties simultaneously?", "options": ["Consistency, Availability, and Partition tolerance", "Coherence, Accuracy, and Precision", "Concurrency, Atomicity, and Persistence", "Capacity, Access, and Performance"], "answer": 0 },
  { "id": "ci_h9", "topic": "Computer & Internet", "difficulty": "hard", "question": "What data structure, supporting O(log n) insertion and extraction, is typically used to implement priority queues?", "options": ["Linked list", "Stack", "Hash table", "Heap"], "answer": 3 },
  { "id": "ci_h10", "topic": "Computer & Internet", "difficulty": "hard", "question": "What compiler optimization technique removes code that has no effect on a program's observable output?", "options": ["Dead code elimination", "Constant folding", "Loop unrolling", "Inlining"], "answer": 0 },
  { "id": "ci_h11", "topic": "Computer & Internet", "difficulty": "hard", "question": "What is the name of the famous unsolved computer science problem asking whether every quickly - verifiable problem is also quickly solvable?", "options": ["P versus NP problem", "Halting problem", "Collatz conjecture", "Traveling salesman problem"], "answer": 0 },
  { "id": "ci_h12", "topic": "Computer & Internet", "difficulty": "hard", "question": "What hash table collision -resolution technique stores multiple colliding elements in a linked list at the same bucket?", "options": ["Linear probing", "Open addressing", "Chaining", "Double hashing"], "answer": 2 },
  { "id": "ci_h13", "topic": "Computer & Internet", "difficulty": "hard", "question": "What ancient algorithm, still in wide use, efficiently finds the greatest common divisor of two integers?", "options": ["Newton's method", "Sieve of Eratosthenes", "Euclidean algorithm", "Karatsuba algorithm"], "answer": 2 },
  { "id": "ci_h14", "topic": "Computer & Internet", "difficulty": "hard", "question": "What type of memory -corruption vulnerability occurs when a program writes data beyond its allocated buffer, potentially overwriting adjacent memory?", "options": ["Buffer overflow", "Null pointer dereference", "Memory leak", "Stack underflow"], "answer": 0 },
  { "id": "ci_h15", "topic": "Computer & Internet", "difficulty": "hard", "question": "What algorithmic paradigm, used by algorithms like merge sort, solves a problem by recursively splitting it into smaller subproblems and combining their results?", "options": ["Divide and conquer", "Dynamic programming", "Backtracking", "Greedy approach"], "answer": 0 },
  { "id": "ci_h16", "topic": "Computer & Internet", "difficulty": "hard", "question": "What security practice requires a user to verify their identity using two or more independent forms of credentials?", "options": ["Public key infrastructure", "Multi -factor authentication", "Role -based access control", "Single sign -on"], "answer": 1 },
  { "id": "ci_h17", "topic": "Computer & Internet", "difficulty": "hard", "question": "What term describes an algorithm's worst -case classification when it is at least as hard as the hardest problems in NP, but not necessarily verifiable in polynomial time itself?", "options": ["P-complete", "NP -hard", "NP -easy", "NP -complete"], "answer": 1 },

  // ==========================================
  //  11. SPACE & ASTRONOMY — STEP 1: EASY
  // ==========================================
  { "id": "sa_e1", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Which planet is closest to the Sun?", "options": ["Earth", "Venus", "Mars", "Mercury"], "answer": 3 },
  { "id": "sa_e2", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Which is the largest planet in our solar system?", "options": ["Saturn", "Jupiter", "Neptune", "Uranus"], "answer": 1 },
  { "id": "sa_e3", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name of our galaxy?", "options": ["Whirlpool", "Milky Way", "Sombrero", "Andromeda"], "answer": 1 },
  { "id": "sa_e4", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name of Earth's only natural satellite?", "options": ["Europa", "Titan", "Phobos", "The Moon"], "answer": 3 },
  { "id": "sa_e5", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Which planet is known as the \"Red Planet\"?", "options": ["Venus", "Mercury", "Mars", "Jupiter"], "answer": 2 },
  { "id": "sa_e6", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the star at the center of our solar system called?", "options": ["Alpha Centauri", "Sirius", "The Sun", "Polaris"], "answer": 2 },
  { "id": "sa_e7", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Who was the first person to walk on the Moon?", "options": ["Buzz Aldrin", "John Glenn", "Yuri Gagarin", "Neil Armstrong"], "answer": 3 },
  { "id": "sa_e8", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Which planet is famous for its spectacular ring system?", "options": ["Saturn", "Uranus", "Jupiter", "Mars"], "answer": 0 },
  { "id": "sa_e9", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call a person trained to travel into space?", "options": ["Aviator", "Pilot", "Navigator", "Astronaut"], "answer": 3 },
  { "id": "sa_e10", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name of the famous space telescope launched in 1990?", "options": ["Kepler", "Spitzer", "Hubble Space Telescope", "Chandra"], "answer": 2 },
  { "id": "sa_e11", "topic": "Space & Astronomy", "difficulty": "easy", "question": "How many planets are there in our solar system?", "options": ["8", "10", "7", "9"], "answer": 0 },
  { "id": "sa_e12", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call a small piece of rock that burns up in Earth's atmosphere, seen as a \"shooting star\"?", "options": ["Satellite", "Meteor", "Asteroid", "Comet"], "answer": 1 },
  { "id": "sa_e13", "topic": "Space & Astronomy", "difficulty": "easy", "question": "NASA is the space agency of which country?", "options": ["China", "India", "Russia", "United States"], "answer": 3 },
  { "id": "sa_e14", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the protective suit astronauts wear called?", "options": ["Wetsuit", "Flight suit", "Hazmat suit", "Spacesuit"], "answer": 3 },
  { "id": "sa_e15", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Which planet is often called Earth's \"twin\" due to its similar size?", "options": ["Venus", "Jupiter", "Mars", "Mercury"], "answer": 0 },
  { "id": "sa_e16", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call the curved path a planet follows around the Sun?", "options": ["Arc", "Orbit", "Axis", "Trajectory"], "answer": 1 },
  { "id": "sa_e17", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Which gas makes up most of the Sun?", "options": ["Oxygen", "Helium", "Carbon", "Hydrogen"], "answer": 3 },
  { "id": "sa_e18", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name of the imaginary line around which a planet spins?", "options": ["Meridian", "Orbit", "Equator", "Axis"], "answer": 3 },
  { "id": "sa_e19", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name for a large object in space made of ice and dust that develops a glowing tail as it nears the Sun?", "options": ["Comet", "Satellite", "Asteroid", "Meteor"], "answer": 0 },
  { "id": "sa_e20", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call a small rocky object orbiting the Sun that is smaller than a planet?", "options": ["Quasar", "Asteroid", "Nebula", "Comet"], "answer": 1 },
  { "id": "sa_e21", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name of the belt of asteroids located between Mars and Jupiter?", "options": ["Van Allen Belt", "Asteroid Belt", "Kuiper Belt", "Oort Cloud"], "answer": 1 },
  { "id": "sa_e22", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call a scientist who studies stars, planets, and outer space?", "options": ["Physicist", "Geologist", "Astronomer", "Meteorologist"], "answer": 2 },
  { "id": "sa_e23", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Who was the first human to travel into space, in 1961?", "options": ["Neil Armstrong", "John Glenn", "Alan Shepard", "Yuri Gagarin"], "answer": 3 },
  { "id": "sa_e24", "topic": "Space & Astronomy", "difficulty": "easy", "question": "Which country did Yuri Gagarin, the first human in space, come from?", "options": ["China", "Soviet Union", "United States", "United Kingdom"], "answer": 1 },
  { "id": "sa_e25", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name for the Moon phase when it is fully illuminated and appears as a complete circle?", "options": ["Full Moon", "New Moon", "Half Moon", "Crescent Moon"], "answer": 0 },
  { "id": "sa_e26", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name for the Moon phase when it is not visible at all, positioned between Earth and the Sun?", "options": ["New Moon", "Crescent Moon", "Full Moon", "Gibbous Moon"], "answer": 0 },
  { "id": "sa_e27", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call the imaginary belt of constellations the Sun appears to pass through over a year, the basis of zodiac signs?", "options": ["Zodiac", "Celestial belt", "Solar band", "Ecliptic circle"], "answer": 0 },
  { "id": "sa_e28", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What term describes a spacecraft specifically designed to carry humans, as opposed to unmanned probes?", "options": ["Satellite", "Crewed spacecraft", "Rover", "Probe"], "answer": 1 },
  { "id": "sa_e29", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call an object that naturally orbits a planet, such as the Moon orbiting Earth?", "options": ["Asteroid", "Artificial satellite", "Natural satellite", "Comet"], "answer": 2 },
  { "id": "sa_e30", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name for a human -made object placed in orbit around Earth for communication or observation?", "options": ["Space station", "Probe", "Natural satellite", "Artificial satellite"], "answer": 3 },
  { "id": "sa_e31", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call the scientific study of the possibility of life existing elsewhere in the universe?", "options": ["Astrobiology", "Cosmology", "Exogeology", "Astrophysics"], "answer": 0 },
  { "id": "sa_e32", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the name of the imaginary point directly overhead an observer, in the sky?", "options": ["Horizon", "Zenith", "Apex", "Meridian"], "answer": 1 },
  { "id": "sa_e33", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call a very large group of galaxies bound together by gravity?", "options": ["Constellation", "Star cluster", "Galaxy cluster", "Nebula"], "answer": 2 },
  { "id": "sa_e34", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call the phenomenon where Earth's shadow falls on the Moon?", "options": ["Transit", "Occultation", "Solar eclipse", "Lunar eclipse"], "answer": 3 },
  { "id": "sa_e35", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call the study of celestial objects and phenomena using the principles of physics and mathematics?", "options": ["Astrobiology", "Geophysics", "Meteorology", "Astrophysics"], "answer": 3 },
  { "id": "sa_e36", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What is the term for the invisible force field surrounding a planet through which its gravity acts?", "options": ["Gravitational field", "Electric field", "Magnetic field", "Radiation belt"], "answer": 0 },
  { "id": "sa_e37", "topic": "Space & Astronomy", "difficulty": "easy", "question": "What do we call the imaginary sphere surrounding Earth onto which all celestial objects appear to be projected?", "options": ["Celestial sphere", "Galactic disk", "Ecliptic plane", "Orbital plane"], "answer": 0 },

  // ==========================================
  //  11. SPACE & ASTRONOMY — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "sa_em1", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the name of the first artificial satellite, launched into space in 1957?", "options": ["Telstar", "Sputnik 1", "Vanguard 1", "Explorer 1"], "answer": 1 },
  { "id": "sa_em2", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "Who was the first woman to travel into space?", "options": ["Sally Ride", "Valentina Tereshkova", "Mae Jemison", "Helen Sharman"], "answer": 1 },
  { "id": "sa_em3", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "Which planet is known for its Great Red Spot, a giant storm?", "options": ["Mars", "Jupiter", "Neptune", "Saturn"], "answer": 1 },
  { "id": "sa_em4", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of the large galaxy nearest to the Milky Way?", "options": ["Triangulum Galaxy", "Whirlpool Galaxy", "Andromeda Galaxy", "Sombrero Galaxy"], "answer": 2 },
  { "id": "sa_em5", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "Which planet has the shortest day due to its fast rotation?", "options": ["Mars", "Mercury", "Jupiter", "Saturn"], "answer": 2 },
  { "id": "sa_em6", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "A light -year is a measure of which of the following?", "options": ["Brightness", "Speed", "Distance", "Time"], "answer": 2 },
  { "id": "sa_em7", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the name of NASA's reusable spacecraft program that ran from 1981 to 2011?", "options": ["Artemis", "Apollo", "Gemini", "Space Shuttle"], "answer": 3 },
  { "id": "sa_em8", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "Which dwarf planet was considered the 9th planet until 2006?", "options": ["Ceres", "Haumea", "Eris", "Pluto"], "answer": 3 },
  { "id": "sa_em9", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "Which planet rotates almost on its side, tilted at about 98 degrees?", "options": ["Uranus", "Saturn", "Neptune", "Venus"], "answer": 0 },
  { "id": "sa_em10", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What do we call it when the Moon completely blocks the Sun's light from reaching Earth?", "options": ["Solar eclipse", "Lunar eclipse", "Equinox", "Solstice"], "answer": 0 },
  { "id": "sa_em11", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the first human -made object to leave the solar system and enter interstellar space?", "options": ["New Horizons", "Pioneer 10", "Voyager 1", "Cassini"], "answer": 2 },
  { "id": "sa_em12", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "Which country launched Sputnik 1?", "options": ["United States", "China", "Soviet Union", "France"], "answer": 2 },
  { "id": "sa_em13", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What term describes a giant cloud of gas and dust in space where new stars are born?", "options": ["Cluster", "Galaxy", "Constellation", "Nebula"], "answer": 3 },
  { "id": "sa_em14", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of India's Mars orbiter mission, launched in 2013?", "options": ["Chandrayaan", "Mangalyaan", "Gaganyaan", "Aditya -L1"], "answer": 1 },
  { "id": "sa_em15", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "Approximately how long does sunlight take to reach Earth?", "options": ["1 hour", "8 minutes", "1 minute", "30 minutes"], "answer": 1 },
  { "id": "sa_em16", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What do we call a recognizable pattern of stars in the sky, like Orion?", "options": ["Nebula", "Galaxy", "Constellation", "Cluster"], "answer": 2 },
  { "id": "sa_em17", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the name of Bangladesh's first satellite, launched in 2018?", "options": ["Bangla -Sat", "Bangabandhu Satellite -1", "Padma Satellite", "BD -Star 1"], "answer": 1 },
  { "id": "sa_em18", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the name of the first artificial satellite to orbit the Moon, launched in 1966?", "options": ["Sputnik 2", "Ranger 7", "Apollo 8", "Luna 10"], "answer": 3 },
  { "id": "sa_em19", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the name of the 1997 mission that first landed a working rover on Mars?", "options": ["Viking 1", "Mars Pathfinder", "Mars Global Surveyor", "Mars Odyssey"], "answer": 1 },
  { "id": "sa_em20", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of NASA's rover exploring Mars's Jezero Crater since 2021, searching for signs of ancient microbial life?", "options": ["Perseverance", "Spirit", "Curiosity", "Opportunity"], "answer": 0 },
  { "id": "sa_em21", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of the small helicopter that achieved the first powered flight on another planet, flying alongside the Perseverance rover on Mars?", "options": ["Ingenuity", "Pathfinder", "Skycrane", "Dragonfly"], "answer": 0 },
  { "id": "sa_em22", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the name of the first spacecraft to successfully land on Mars and transmit data back to Earth, in 1976?", "options": ["Viking 1", "Mariner 4", "Phoenix", "Mars Pathfinder"], "answer": 0 },
  { "id": "sa_em23", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "Which planet has the strongest winds in the solar system, reaching supersonic speeds?", "options": ["Uranus", "Neptune", "Jupiter", "Saturn"], "answer": 1 },
  { "id": "sa_em24", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of the largest moon in the solar system, which orbits Jupiter?", "options": ["Callisto", "Ganymede", "Titan", "Io"], "answer": 1 },
  { "id": "sa_em25", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of the largest moon of Saturn?", "options": ["Titan", "Enceladus", "Rhea", "Iapetus"], "answer": 0 },
  { "id": "sa_em26", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of the process by which stars produce energy through nuclear reactions in their cores?", "options": ["Nuclear fusion", "Combustion", "Nuclear fission", "Radioactive decay"], "answer": 0 },
  { "id": "sa_em27", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name for the explosive death of a massive star?", "options": ["Nova", "Solar flare", "Supernova", "Big Bang"], "answer": 2 },
  { "id": "sa_em28", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What do we call the extremely dense remnant core left behind after certain supernovae, composed almost entirely of tightly packed particles?", "options": ["Red giant", "Brown dwarf", "Neutron star", "White dwarf"], "answer": 2 },
  { "id": "sa_em29", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the name of India's first uncrewed lunar exploration mission, launched in 2008?", "options": ["Chandrayaan -1", "Aditya -L1", "Mangalyaan", "Chandrayaan -3"], "answer": 0 },
  { "id": "sa_em30", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What was the name of the 2023 mission that made India the first country to land near the Moon's south pole?", "options": ["Chandrayaan -1", "Gaganyaan", "Chandrayaan -3", "Mangalyaan"], "answer": 2 },
  { "id": "sa_em31", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of Japan's national space agency?", "options": ["CNSA", "JAXA", "Roscosmos", "ISRO"], "answer": 1 },
  { "id": "sa_em32", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the common abbreviation for the European Space Agency?", "options": ["ESA", "ESRO", "EUSpace", "EUSA"], "answer": 0 },
  { "id": "sa_em33", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of China's national space agency?", "options": ["CNSA", "Roscosmos", "CSA", "JAXA"], "answer": 0 },
  { "id": "sa_em34", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of China's crewed space station currently in orbit?", "options": ["Tiangong", "Tianwen", "Shenzhou", "Chang'e Station"], "answer": 0 },
  { "id": "sa_em35", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What do we call a hypothetical tunnel through space -time that could theoretically connect distant points in the universe?", "options": ["White hole", "Time dilation field", "Black hole", "Wormhole"], "answer": 3 },
  { "id": "sa_em36", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the term for the moment a planet or moon passes directly between the Sun and an observer, appearing as a small dark dot?", "options": ["Conjunction", "Occultation", "Transit", "Eclipse"], "answer": 2 },
  { "id": "sa_em37", "topic": "Space & Astronomy", "difficulty": "easy-medium", "question": "What is the name of the effect that causes the Moon to always show the same face to Earth?", "options": ["Libration", "Tidal locking", "Axial precession", "Orbital resonance"], "answer": 1 },

  // ==========================================
  //  11. SPACE & ASTRONOMY — STEP 3: MEDIUM
  // ==========================================
  { "id": "sa_m1", "topic": "Space & Astronomy", "difficulty": "medium", "question": "Which spacecraft achieved the first -ever soft landing on the Moon, in 1966?", "options": ["Luna 9", "Luna 2", "Apollo 11", "Surveyor 1"], "answer": 0 },
  { "id": "sa_m2", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the closest known star to our solar system, other than the Sun?", "options": ["Proxima Centauri", "Barnard's Star", "Alpha Centauri A", "Sirius"], "answer": 0 },
  { "id": "sa_m3", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the boundary around a black hole beyond which nothing can escape called?", "options": ["Accretion disk", "Event horizon", "Singularity", "Photon sphere"], "answer": 1 },
  { "id": "sa_m4", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the space station currently orbiting Earth, built by multiple countries?", "options": ["Skylab", "Mir", "International Space Station", "Tiangong"], "answer": 2 },
  { "id": "sa_m5", "topic": "Space & Astronomy", "difficulty": "medium", "question": "Which planet was discovered through mathematical prediction before being directly observed?", "options": ["Saturn", "Neptune", "Pluto", "Uranus"], "answer": 1 },
  { "id": "sa_m6", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What term describes the point in a planet's orbit when it is closest to the Sun?", "options": ["Perihelion", "Apogee", "Aphelion", "Zenith"], "answer": 0 },
  { "id": "sa_m7", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the space telescope launched in December 2021 as Hubble's successor?", "options": ["James Webb Space Telescope", "Kepler Space Telescope", "Spitzer Space Telescope", "Roman Space Telescope"], "answer": 0 },
  { "id": "sa_m8", "topic": "Space & Astronomy", "difficulty": "medium", "question": "Which planet has a day (one rotation) longer than its year (one orbit)?", "options": ["Uranus", "Mars", "Mercury", "Venus"], "answer": 3 },
  { "id": "sa_m9", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What term describes a star that suddenly brightens dramatically before fading?", "options": ["Pulsar", "Nova", "Quasar", "Magnetar"], "answer": 1 },
  { "id": "sa_m10", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What natural light display near Earth's poles is caused by solar particles interacting with the magnetic field?", "options": ["Aurora", "Corona", "Halo", "Eclipse"], "answer": 0 },
  { "id": "sa_m11", "topic": "Space & Astronomy", "difficulty": "medium", "question": "Which Apollo mission was the first to carry astronauts around the Moon without landing?", "options": ["Apollo 8", "Apollo 10", "Apollo 11", "Apollo 13"], "answer": 0 },
  { "id": "sa_m12", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the theoretical point of infinite density at the center of a black hole called?", "options": ["Event horizon", "Nucleus", "Core", "Singularity"], "answer": 3 },
  { "id": "sa_m13", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What are the names of Mars's two small moons?", "options": ["Ariel and Umbriel", "Io and Europa", "Phobos and Deimos", "Titan and Rhea"], "answer": 2 },
  { "id": "sa_m14", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What force keeps planets in orbit around the Sun?", "options": ["Gravity", "Magnetism", "Inertia", "Friction"], "answer": 0 },
  { "id": "sa_m15", "topic": "Space & Astronomy", "difficulty": "medium", "question": "Which planet is the only one in our solar system not named after a Roman or Greek deity?", "options": ["Earth", "Mars", "Mercury", "Venus"], "answer": 0 },
  { "id": "sa_m16", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What defines a \"year\" on any planet?", "options": ["Time to complete one orbit around the Sun", "Number of moons it has", "Time to rotate once on its axis", "Distance traveled in space"], "answer": 0 },
  { "id": "sa_m17", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the Indian space agency?", "options": ["BARC", "ISRO", "DRDO", "CSIR"], "answer": 1 },
  { "id": "sa_m18", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the region considered the outer boundary of the Sun's gravitational influence, source of long -period comets?", "options": ["Heliopause", "Asteroid Belt", "Oort Cloud", "Kuiper Belt"], "answer": 2 },
  { "id": "sa_m19", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the space telescope launched by ESA in 2023 to study dark matter and dark energy?", "options": ["Euclid", "Gaia", "Hubble", "James Webb"], "answer": 0 },
  { "id": "sa_m20", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the private company capsule that became the first commercial spacecraft to carry NASA astronauts to the ISS, in 2020?", "options": ["Starliner", "Orion", "Dream Chaser", "Crew Dragon"], "answer": 3 },
  { "id": "sa_m21", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What was the name of the NASA -led mission that tested asteroid deflection by deliberately crashing into an asteroid's moon in 2022?", "options": ["OSIRIS -REx", "Hayabusa2", "DART", "NEAR Shoemaker"], "answer": 2 },
  { "id": "sa_m22", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the asteroid moon whose orbit was successfully altered by the DART mission?", "options": ["Phobos", "Deimos", "Didymos", "Dimorphos"], "answer": 3 },
  { "id": "sa_m23", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name for the ring -shaped image of a distant galaxy created when gravitational lensing is perfectly aligned with an observer?", "options": ["Photon ring", "Accretion ring", "Halo ring", "Einstein ring"], "answer": 3 },
  { "id": "sa_m24", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the term for a star system consisting of two stars orbiting a common center of mass?", "options": ["Double nova", "Paired nebula", "Twin star system", "Binary star system"], "answer": 3 },
  { "id": "sa_m25", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the closest known star system to our own, home to Proxima Centauri?", "options": ["Wolf 359", "Barnard's Star", "Sirius", "Alpha Centauri"], "answer": 3 },
  { "id": "sa_m26", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What method of exoplanet detection relies on measuring the dip in a star's brightness as a planet passes in front of it?", "options": ["Radial velocity method", "Gravitational microlensing", "Transit method", "Direct imaging"], "answer": 2 },
  { "id": "sa_m27", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of NASA's exoplanet -hunting space telescope, launched in 2018 as a successor to Kepler?", "options": ["Chandra", "TESS", "Spitzer", "WISE"], "answer": 1 },
  { "id": "sa_m28", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the NASA space telescope, launched in 2009, that discovered thousands of exoplanets before retiring in 2018?", "options": ["TESS", "Kepler Space Telescope", "Spitzer Space Telescope", "Hubble Space Telescope"], "answer": 1 },
  { "id": "sa_m29", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the leading scientific theory describing the origin and expansion of the universe from an extremely hot, dense state?", "options": ["Oscillating universe theory", "Steady State theory", "Multiverse theory", "Big Bang theory"], "answer": 3 },
  { "id": "sa_m30", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the term for the mysterious force believed to be causing the universe's expansion to accelerate?", "options": ["Dark energy", "Cosmic radiation", "Dark matter", "Antimatter"], "answer": 0 },
  { "id": "sa_m31", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the term for the invisible form of matter that does not emit light but exerts gravitational effects on visible matter?", "options": ["Dark matter", "Dark energy", "Neutrino matter", "Antimatter"], "answer": 0 },
  { "id": "sa_m32", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of the theoretical particle proposed to explain dark matter, though not yet directly detected?", "options": ["Axion boson", "WIMP", "Tachyon", "Graviton"], "answer": 1 },
  { "id": "sa_m33", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What was the name of the first reusable orbital -class rocket booster to land vertically after launch, achieved by SpaceX in 2015?", "options": ["Falcon 9", "Falcon Heavy", "Starship", "Atlas V"], "answer": 0 },
  { "id": "sa_m34", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the name of SpaceX's next -generation rocket system, currently in testing, designed for missions to Mars?", "options": ["Starship", "Vulcan Centaur", "Falcon Heavy", "New Glenn"], "answer": 0 },
  { "id": "sa_m35", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What was the name of the first module of the International Space Station, launched in 1998?", "options": ["Zvezda", "Destiny", "Zarya", "Unity"], "answer": 2 },
  { "id": "sa_m36", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the term for a star's final, stable stage after exhausting its fuel, if it is not massive enough to become a neutron star or black hole?", "options": ["White dwarf", "Blue supergiant", "Red giant", "Brown dwarf"], "answer": 0 },
  { "id": "sa_m37", "topic": "Space & Astronomy", "difficulty": "medium", "question": "What is the term describing a hypothetical scenario in which the universe's expansion eventually reverses, ending in a final collapse?", "options": ["Big Bounce", "Big Rip", "Big Crunch", "Big Freeze"], "answer": 2 },

  // ==========================================
  //  11. SPACE & ASTRONOMY — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "sa_mh1", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What was the name of the first spacecraft to successfully land on a comet, in 2014?", "options": ["Rosetta", "Giotto", "Stardust", "Philae"], "answer": 3 },
  { "id": "sa_mh2", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "Which galaxy is predicted to collide with the Milky Way in about 4.5 billion years?", "options": ["Andromeda Galaxy", "Whirlpool Galaxy", "Triangulum Galaxy", "Sombrero Galaxy"], "answer": 0 },
  { "id": "sa_mh3", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "The Chandrasekhar limit defines the maximum stable mass of what kind of star?", "options": ["Main -sequence star", "Red giant", "Neutron star", "White dwarf"], "answer": 3 },
  { "id": "sa_mh4", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What is the leftover radiation from the Big Bang called?", "options": ["Solar wind", "Cosmic Microwave Background", "Gamma -ray burst", "Redshift"], "answer": 1 },
  { "id": "sa_mh5", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What is the name of the region of icy bodies beyond Neptune's orbit?", "options": ["Oort Cloud", "Kuiper Belt", "Asteroid Belt", "Van Allen Belt"], "answer": 1 },
  { "id": "sa_mh6", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What effect explains why light from distant galaxies shifts toward red as the universe expands?", "options": ["Diffraction", "Blueshift", "Refraction", "Redshift"], "answer": 3 },
  { "id": "sa_mh7", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "Which private company was the first to successfully land and reuse an orbital rocket booster?", "options": ["SpaceX", "Virgin Galactic", "Rocket Lab", "Blue Origin"], "answer": 0 },
  { "id": "sa_mh8", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What do we call a rapidly rotating neutron star that emits beams of radiation?", "options": ["Quasar", "Magnetar", "Pulsar", "Nova"], "answer": 2 },
  { "id": "sa_mh9", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What is Earth's approximate escape velocity?", "options": ["25 km/s", "11.2 km/s", "7.9 km/s", "3 km/s"], "answer": 1 },
  { "id": "sa_mh10", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "Which moon of Saturn has a thick atmosphere and lakes of liquid methane?", "options": ["Mimas", "Enceladus", "Titan", "Rhea"], "answer": 2 },
  { "id": "sa_mh11", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What is the region around a star where liquid water could exist on a planet's surface called?", "options": ["Habitable zone", "Frost line", "Photic zone", "Roche limit"], "answer": 0 },
  { "id": "sa_mh12", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What was the first human -made object to reach interstellar space?", "options": ["Voyager 1", "Pioneer 10", "New Horizons", "Voyager 2"], "answer": 0 },
  { "id": "sa_mh13", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What term describes time passing more slowly in stronger gravitational fields?", "options": ["Relativistic mass", "Length contraction", "Gravitational time dilation", "Frame dragging"], "answer": 2 },
  { "id": "sa_mh14", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What is the boundary called where the Sun's solar wind is stopped by interstellar gas?", "options": ["Magnetopause", "Ionopause", "Heliopause", "Heliosphere"], "answer": 2 },
  { "id": "sa_mh15", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What is the theoretical undiscovered planet believed to explain unusual orbits in the outer solar system called?", "options": ["Tyche", "Planet X", "Nemesis", "Planet Nine"], "answer": 3 },
  { "id": "sa_mh16", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "Which spacecraft was the first man -made object to land on Venus and transmit data, in 1970?", "options": ["Venera 7", "Magellan", "Mariner 2", "Pioneer Venus"], "answer": 0 },
  { "id": "sa_mh17", "topic": "Space & Astronomy", "difficulty": "medium-hard", "question": "What do astronomers call a black hole formed from the collapse of a single massive star?", "options": ["Intermediate black hole", "Stellar -mass black hole", "Primordial black hole", "Supermassive black hole"], "answer": 1 },

  // ==========================================
  //  11. SPACE & ASTRONOMY — STEP 5: HARD
  // ==========================================
  { "id": "sa_h1", "topic": "Space & Astronomy", "difficulty": "hard", "question": "Which spacecraft was the first to fly past Pluto, in 2015?", "options": ["Juno", "Cassini", "New Horizons", "Voyager 2"], "answer": 2 },
  { "id": "sa_h2", "topic": "Space & Astronomy", "difficulty": "hard", "question": "Which spacecraft was the first to orbit and later land on an asteroid (Eros), in 2001?", "options": ["OSIRIS -REx", "Dawn", "NEAR Shoemaker", "Hayabusa"], "answer": 2 },
  { "id": "sa_h3", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What is the term for the slow wobble of Earth's rotational axis over about 26,000 years?", "options": ["Obliquity", "Nutation", "Axial precession", "Libration"], "answer": 2 },
  { "id": "sa_h4", "topic": "Space & Astronomy", "difficulty": "hard", "question": "Which country's lander, Beresheet, crashed while attempting a Moon landing in 2019?", "options": ["India", "Japan", "South Korea", "Israel"], "answer": 3 },
  { "id": "sa_h5", "topic": "Space & Astronomy", "difficulty": "hard", "question": "Which Japanese mission returned samples from the asteroid Ryugu?", "options": ["Kaguya", "Hitomi", "Hayabusa2", "Akatsuki"], "answer": 2 },
  { "id": "sa_h6", "topic": "Space & Astronomy", "difficulty": "hard", "question": "Which probe was the first to land on Saturn's moon Titan, in 2005?", "options": ["Huygens", "Galileo", "Voyager 1", "Cassini"], "answer": 0 },
  { "id": "sa_h7", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What is the Oort Cloud believed to be the main source of?", "options": ["Long -period comets", "Solar flares", "Asteroids", "Meteor showers"], "answer": 0 },
  { "id": "sa_h8", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What was the name of the mission that made China the first country to land a rover on the far side of the Moon, in 2019?", "options": ["Chang'e 3", "Chang'e 4", "Tianwen -1", "Yutu"], "answer": 1 },
  { "id": "sa_h9", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What term describes the apparent shift in a star's position due to Earth's orbital motion, used to measure distances to nearby stars?", "options": ["Redshift", "Proper motion", "Stellar parallax", "Aberration"], "answer": 2 },
  { "id": "sa_h10", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What was the first confirmed interstellar object to pass through our solar system, discovered in 2017?", "options": ["Halley", "Chiron", "Borisov", "'Oumuamua"], "answer": 3 },
  { "id": "sa_h11", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What is a magnetar?", "options": ["A rapidly cooling white dwarf", "A black hole with unusually strong gravity", "A star composed mostly of iron", "A neutron star with an extremely powerful magnetic field"], "answer": 3 },
  { "id": "sa_h12", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What is the name of the region around a black hole where light itself can orbit in a circle?", "options": ["Ergosphere", "Accretion disk", "Photon sphere", "Event horizon"], "answer": 2 },
  { "id": "sa_h13", "topic": "Space & Astronomy", "difficulty": "hard", "question": "Which astronomer first discovered the asteroid (and dwarf planet) Ceres, in 1801?", "options": ["William Herschel", "Urbain Le Verrier", "Giuseppe Piazzi", "Johann Galle"], "answer": 2 },
  { "id": "sa_h14", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What is the name of the region around a rotating black hole where objects cannot remain stationary because spacetime itself is dragged?", "options": ["Ergosphere", "Photon sphere", "Singularity", "Event horizon"], "answer": 0 },
  { "id": "sa_h15", "topic": "Space & Astronomy", "difficulty": "hard", "question": "Which of Saturn's moons shoots geysers of water ice from its south pole?", "options": ["Iapetus", "Enceladus", "Mimas", "Titan"], "answer": 1 },
  { "id": "sa_h16", "topic": "Space & Astronomy", "difficulty": "hard", "question": "Which astronomer discovered Uranus in 1781?", "options": ["Urbain Le Verrier", "William Herschel", "Giuseppe Piazzi", "Johann Galle"], "answer": 1 },
  { "id": "sa_h17", "topic": "Space & Astronomy", "difficulty": "hard", "question": "What is the term for a black hole with a mass millions to billions of times that of the Sun, found at the center of most large galaxies?", "options": ["Supermassive black hole", "Micro black hole", "Primordial black hole", "Stellar -mass black hole"], "answer": 0 },

  // ==========================================
  //  12. IQ & LOGIC — STEP 1: EASY
  // ==========================================
  { "id": "iq_e1", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 4, 9, 16, 25, 36, ?", "options": ["47", "49", "42", "45"], "answer": 1 },
  { "id": "iq_e2", "topic": "IQ & Logic", "difficulty": "easy", "question": "If 3 people can paint 3 fences in 3 hours, how long would it take 6 people to paint 6 identical fences?", "options": ["6 hours", "12 hours", "1.5 hours", "3 hours"], "answer": 3 },
  { "id": "iq_e3", "topic": "IQ & Logic", "difficulty": "easy", "question": "Complete the analogy: Tadpole is to Frog as Caterpillar is to ___?", "options": ["Butterfly", "Larva", "Moth", "Cocoon"], "answer": 0 },
  { "id": "iq_e4", "topic": "IQ & Logic", "difficulty": "easy", "question": "If some cats are black, and all black things absorb heat, which statement must be true?", "options": ["No cats absorb heat", "Some cats absorb heat", "All black things are cats", "All cats absorb heat"], "answer": 1 },
  { "id": "iq_e5", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 2, 6, 12, 20, 30, ?", "options": ["44", "36", "42", "40"], "answer": 2 },
  { "id": "iq_e6", "topic": "IQ & Logic", "difficulty": "easy", "question": "A clock shows exactly 3:15. What is the angle between the hour and minute hands?", "options": ["15 degrees", "7.5 degrees", "0 degrees", "90 degrees"], "answer": 1 },
  { "id": "iq_e7", "topic": "IQ & Logic", "difficulty": "easy", "question": "If today is Wednesday, what day of the week was it 100 days ago?", "options": ["Tuesday", "Monday", "Saturday", "Sunday"], "answer": 1 },
  { "id": "iq_e8", "topic": "IQ & Logic", "difficulty": "easy", "question": "Which word is the odd one out: Circle, Square, Triangle, Sphere?", "options": ["Circle", "Square", "Sphere", "Triangle"], "answer": 2 },
  { "id": "iq_e9", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 1, 2, 6, 24, 120, ?", "options": ["840", "620", "700", "720"], "answer": 3 },
  { "id": "iq_e10", "topic": "IQ & Logic", "difficulty": "easy", "question": "Complete the analogy: Bark is to Tree as Skin is to ___?", "options": ["Blood", "Body", "Hair", "Bone"], "answer": 1 },
  { "id": "iq_e11", "topic": "IQ & Logic", "difficulty": "easy", "question": "A is the mother of B. B is the father of C. What is A to C?", "options": ["Aunt", "Sister", "Grandmother", "Mother"], "answer": 2 },
  { "id": "iq_e12", "topic": "IQ & Logic", "difficulty": "easy", "question": "The word \"STRESSED\" spelled backward makes what common word?", "options": ["Dessert", "Stressed", "Address", "Desserts"], "answer": 3 },
  { "id": "iq_e13", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 3, 9, 27, 81, ?", "options": ["200", "162", "225", "243"], "answer": 3 },
  { "id": "iq_e14", "topic": "IQ & Logic", "difficulty": "easy", "question": "If a plane crashes exactly on the border between two countries, where are the survivors buried?", "options": ["Split between both", "Nowhere - survivors aren't buried", "In the second country", "In the first country"], "answer": 1 },
  { "id": "iq_e15", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 1, 4, 10, 22, 46, ?", "options": ["96", "94", "88", "90"], "answer": 1 },
  { "id": "iq_e16", "topic": "IQ & Logic", "difficulty": "easy", "question": "Complete the analogy: Fish is to Water as Bird is to ___?", "options": ["Air", "Nest", "Feather", "Tree"], "answer": 0 },
  { "id": "iq_e17", "topic": "IQ & Logic", "difficulty": "easy", "question": "If a red house is made of red bricks and a blue house is made of blue bricks, what is a greenhouse made of?", "options": ["Green bricks", "Glass", "Wood", "Plastic"], "answer": 1 },
  { "id": "iq_e18", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 5, 8, 13, 21, 34, ?", "options": ["45", "50", "60", "55"], "answer": 3 },
  { "id": "iq_e19", "topic": "IQ & Logic", "difficulty": "easy", "question": "If a train travels 300 km in 4 hours, what is its average speed?", "options": ["60 km/h", "75 km/h", "100 km/h", "80 km/h"], "answer": 1 },
  { "id": "iq_e20", "topic": "IQ & Logic", "difficulty": "easy", "question": "Complete the analogy: Teacher is to Student as Doctor is to ___?", "options": ["Medicine", "Hospital", "Patient", "Nurse"], "answer": 2 },
  { "id": "iq_e21", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 100, 81, 64, 49, ?", "options": ["36", "40", "32", "42"], "answer": 0 },
  { "id": "iq_e22", "topic": "IQ & Logic", "difficulty": "easy", "question": "If 6 pens cost $12, how much do 10 pens cost at the same rate?", "options": ["$18", "$24", "$20", "$16"], "answer": 2 },
  { "id": "iq_e23", "topic": "IQ & Logic", "difficulty": "easy", "question": "Which number is the odd one out: 4, 9, 16, 20, 25?", "options": ["20", "25", "9", "16"], "answer": 0 },
  { "id": "iq_e24", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 2, 4, 7, 11, 16, ?", "options": ["20", "22", "24", "21"], "answer": 1 },
  { "id": "iq_e25", "topic": "IQ & Logic", "difficulty": "easy", "question": "If a rectangle has a length of 8 cm and a width of 5 cm, what is its area?", "options": ["26 square cm", "45 square cm", "35 square cm", "40 square cm"], "answer": 3 },
  { "id": "iq_e26", "topic": "IQ & Logic", "difficulty": "easy", "question": "Complete the analogy: Hot is to Cold as Day is to ___?", "options": ["Night", "Dark", "Sun", "Evening"], "answer": 0 },
  { "id": "iq_e27", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 90, 80, 71, 63, ?", "options": ["52", "56", "54", "58"], "answer": 1 },
  { "id": "iq_e28", "topic": "IQ & Logic", "difficulty": "easy", "question": "If it takes 4 workers 6 days to complete a task, how many days would it take 8 workers to complete the same task?", "options": ["4 days", "3 days", "12 days", "2 days"], "answer": 1 },
  { "id": "iq_e29", "topic": "IQ & Logic", "difficulty": "easy", "question": "Complete the analogy: Scissors is to Cut as Hammer is to ___?", "options": ["Nail", "Build", "Break", "Hit"], "answer": 3 },
  { "id": "iq_e30", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 1, 5, 9, 13, 17, ?", "options": ["20", "21", "23", "19"], "answer": 1 },
  { "id": "iq_e31", "topic": "IQ & Logic", "difficulty": "easy", "question": "If a car travels at 60 km/h, how far does it travel in 2.5 hours?", "options": ["180 km", "120 km", "150 km", "140 km"], "answer": 2 },
  { "id": "iq_e32", "topic": "IQ & Logic", "difficulty": "easy", "question": "Which shape has exactly five sides?", "options": ["Pentagon", "Octagon", "Square", "Hexagon"], "answer": 0 },
  { "id": "iq_e33", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 500, 250, 125, 62.5, ?", "options": ["31.25", "40", "30", "25"], "answer": 0 },
  { "id": "iq_e34", "topic": "IQ & Logic", "difficulty": "easy", "question": "If A is taller than B, and B is taller than C, who is the shortest?", "options": ["A", "B", "Cannot be determined", "C"], "answer": 3 },
  { "id": "iq_e35", "topic": "IQ & Logic", "difficulty": "easy", "question": "Complete the analogy: Chef is to Kitchen as Pilot is to ___?", "options": ["Airport", "Runway", "Sky", "Cockpit"], "answer": 3 },
  { "id": "iq_e36", "topic": "IQ & Logic", "difficulty": "easy", "question": "What comes next in the sequence: 12, 17, 23, 30, 38, ?", "options": ["45", "46", "49", "47"], "answer": 3 },
  { "id": "iq_e37", "topic": "IQ & Logic", "difficulty": "easy", "question": "If 3x = 21, what is the value of x?", "options": ["6", "8", "7", "9"], "answer": 2 },

  // ==========================================
  //  12. IQ & LOGIC — STEP 2: EASY MEDIUM
  // ==========================================
  { "id": "iq_em1", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 2, 3, 5, 8, 13, 21, ?", "options": ["36", "33", "30", "34"], "answer": 3 },
  { "id": "iq_em2", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "A man looks at a portrait and says, \"Brothers and sisters, I have none, but this man's father is my father's son.\" Who is in the portrait?", "options": ["His son", "His father", "Himself", "His brother"], "answer": 0 },
  { "id": "iq_em3", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If all Bloops are Razzies, and all Razzies are Lazzies, are all Bloops definitely Lazzies?", "options": ["Cannot be determined", "Only some Bloops", "No", "Yes"], "answer": 3 },
  { "id": "iq_em4", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 5, 11, 23, 47, ?", "options": ["90", "94", "100", "95"], "answer": 3 },
  { "id": "iq_em5", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If 5 people can build 5 tables in 5 days, how many days would it take 10 people to build 10 identical tables?", "options": ["2.5 days", "10 days", "5 days", "1 day"], "answer": 2 },
  { "id": "iq_em6", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "Three boxes are labeled \"Apples,\" \"Oranges,\" and \"Apples and Oranges\" - but all three labels are wrong. You may pick one fruit from one box to correctly relabel all three. Which box should you pick from?", "options": ["It's impossible to determine", "The box labeled \"Oranges\"", "The box labeled \"Apples\"", "The box labeled \"Apples and Oranges\""], "answer": 3 },
  { "id": "iq_em7", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 1, 8, 27, 64, ?", "options": ["100", "125", "110", "120"], "answer": 1 },
  { "id": "iq_em8", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If 8 workers can build a wall in 10 days, how many days would it take 20 workers to build the same wall, at the same rate per worker?", "options": ["5 days", "4 days", "2.5 days", "8 days"], "answer": 1 },
  { "id": "iq_em9", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 1, 2, 4, 7, 11, 16, ?", "options": ["23", "20", "21", "22"], "answer": 3 },
  { "id": "iq_em10", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "In a family: A is married to B. C is the son of A. D is the sister of C. E is the mother of A. F is the brother of E. How is F related to C?", "options": ["F is C's cousin", "F is C's great -uncle", "F is C's grandfather", "F is C's uncle"], "answer": 1 },
  { "id": "iq_em11", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 6, 12, 21, 33, 48, ?", "options": ["63", "69", "60", "66"], "answer": 3 },
  { "id": "iq_em12", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If a clock's hour and minute hands overlap exactly at 12:00, at approximately what time will they next overlap?", "options": ["Exactly 1:00", "About 1:10", "About 1:05", "About 12:55"], "answer": 2 },
  { "id": "iq_em13", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 2, 5, 10, 17, 26, ?", "options": ["38", "37", "36", "35"], "answer": 1 },
  { "id": "iq_em14", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "A snail climbs 3 feet up a well each day but slips back 2 feet every night. If the well is 10 feet deep, how many days does it take the snail to reach the top?", "options": ["10 days", "8 days", "7 days", "9 days"], "answer": 1 },
  { "id": "iq_em15", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 1, 3, 6, 10, 15, ?", "options": ["21", "20", "24", "18"], "answer": 0 },
  { "id": "iq_em16", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If you rearrange all the letters of \"DORMITORY,\" what common two -word phrase can you make?", "options": ["Roomy Dirt", "Moody Trio", "Dirty Room", "Dirt Moor"], "answer": 2 },
  { "id": "iq_em17", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 3, 4, 7, 11, 18, 29, ?", "options": ["47", "50", "46", "45"], "answer": 0 },
  { "id": "iq_em18", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 4, 12, 36, 108, ?", "options": ["300", "324", "432", "216"], "answer": 1 },
  { "id": "iq_em19", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "A rectangular garden is 12 meters long and 8 meters wide. What is its perimeter?", "options": ["40 meters", "20 meters", "96 meters", "48 meters"], "answer": 0 },
  { "id": "iq_em20", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If today is Friday, what day will it be in 10 days?", "options": ["Monday", "Saturday", "Sunday", "Tuesday"], "answer": 0 },
  { "id": "iq_em21", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "Complete the analogy: Library is to Books as Museum is to ___?", "options": ["Artifacts", "Buildings", "Tickets", "Visitors"], "answer": 0 },
  { "id": "iq_em22", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 2, 4, 12, 48, 240, ?", "options": ["1680", "1440", "960", "1200"], "answer": 1 },
  { "id": "iq_em23", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "A car's odometer reads 45,678 km. After traveling another 234 km, what will it read?", "options": ["45,912 km", "45,902 km", "45,922 km", "45,890 km"], "answer": 0 },
  { "id": "iq_em24", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "Which number is the odd one out: 8, 27, 64, 100, 125?", "options": ["100", "125", "27", "64"], "answer": 0 },
  { "id": "iq_em25", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 3, 10, 24, 52, 108, ?", "options": ["216", "224", "220", "212"], "answer": 2 },
  { "id": "iq_em26", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "A train leaves at 2:45 PM and arrives at 6:20 PM. How long was the journey?", "options": ["3 hours 25 minutes", "3 hours 35 minutes", "3 hours 45 minutes", "4 hours 5 minutes"], "answer": 1 },
  { "id": "iq_em27", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "Complete the analogy: Seed is to Tree as Egg is to ___?", "options": ["Feather", "Bird", "Wing", "Nest"], "answer": 1 },
  { "id": "iq_em28", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 2, 7, 17, 37, 77, ?", "options": ["150", "147", "157", "160"], "answer": 2 },
  { "id": "iq_em29", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If 15 books cost $75, how much would 24 books cost at the same rate?", "options": ["$130", "$100", "$120", "$110"], "answer": 2 },
  { "id": "iq_em30", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "Which word doesn't belong: Whisper, Shout, Mumble, Jump?", "options": ["Mumble", "Shout", "Jump", "Whisper"], "answer": 2 },
  { "id": "iq_em31", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 64, 32, 16, 8, ?", "options": ["6", "4", "2", "0"], "answer": 1 },
  { "id": "iq_em32", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "A cyclist travels 15 km in 45 minutes. What is their speed in km/h?", "options": ["20 km/h", "25 km/h", "18 km/h", "15 km/h"], "answer": 0 },
  { "id": "iq_em33", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "Complete the analogy: Winter is to Cold as Summer is to ___?", "options": ["Sun", "Season", "Hot", "Rain"], "answer": 2 },
  { "id": "iq_em34", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "What comes next in the sequence: 3, 8, 18, 38, 78, ?", "options": ["148", "150", "158", "160"], "answer": 2 },
  { "id": "iq_em35", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If a clock shows exactly 6:00, what is the angle between the hour and minute hands?", "options": ["120 degrees", "180 degrees", "150 degrees", "90 degrees"], "answer": 1 },
  { "id": "iq_em36", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "Which number replaces the question mark: 12, 24, 48, 96, ?", "options": ["168", "192", "144", "180"], "answer": 1 },
  { "id": "iq_em37", "topic": "IQ & Logic", "difficulty": "easy-medium", "question": "If a recipe for 4 people needs 2 cups of rice, how many cups are needed for 10 people?", "options": ["4 cups", "5 cups", "6 cups", "4.5 cups"], "answer": 1 },

  // ==========================================
  //  12. IQ & LOGIC — STEP 3: MEDIUM
  // ==========================================
  { "id": "iq_m1", "topic": "IQ & Logic", "difficulty": "medium", "question": "In a room of 23 people, what is the approximate probability that at least two of them share the same birthday?", "options": ["About 99%", "About 6%", "About 50%", "About 23%"], "answer": 2 },
  { "id": "iq_m2", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 1, 2, 6, 24, 120, 720, ?", "options": ["5760", "4320", "6040", "5040"], "answer": 3 },
  { "id": "iq_m3", "topic": "IQ & Logic", "difficulty": "medium", "question": "A man must cross a river with a wolf, a goat, and a cabbage, taking only one across at a time. Left alone, the wolf eats the goat, and the goat eats the cabbage. What must he take across first?", "options": ["The goat", "Any item", "The wolf", "The cabbage"], "answer": 0 },
  { "id": "iq_m4", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in this \"look -and-say\" sequence: 1, 11, 21, 1211, 111221, ?", "options": ["213211", "312121", "132211", "312211"], "answer": 3 },
  { "id": "iq_m5", "topic": "IQ & Logic", "difficulty": "medium", "question": "Four people must cross a bridge at night sharing one flashlight, which is needed for every crossing. They take 1, 2, 5, and 10 minutes respectively, and pairs move at the slower person's pace. What is the minimum total time for all four to cross?", "options": ["15 minutes", "19 minutes", "17 minutes", "21 minutes"], "answer": 2 },
  { "id": "iq_m6", "topic": "IQ & Logic", "difficulty": "medium", "question": "Which number does not belong in this set of otherwise perfect squares: 121, 144, 169, 200, 225?", "options": ["169", "225", "121", "200"], "answer": 3 },
  { "id": "iq_m7", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the Fibonacci -style sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ?", "options": ["52", "55", "56", "54"], "answer": 1 },
  { "id": "iq_m8", "topic": "IQ & Logic", "difficulty": "medium", "question": "You have 8 balls, one of which is heavier than the rest (all others weigh the same). Using a balance scale, what is the minimum number of weighings needed to guarantee finding the heavier ball?", "options": ["1", "4", "2", "3"], "answer": 2 },
  { "id": "iq_m9", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 1, 4, 27, 256, ?", "options": ["2500", "3125", "3000", "4096"], "answer": 1 },
  { "id": "iq_m10", "topic": "IQ & Logic", "difficulty": "medium", "question": "A father is 3 times as old as his son. In 12 years, he will be twice as old as his son. How old is the son now?", "options": ["12", "18", "10", "15"], "answer": 0 },
  { "id": "iq_m11", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 2, 6, 18, 54, 162, ?", "options": ["480", "500", "486", "450"], "answer": 2 },
  { "id": "iq_m12", "topic": "IQ & Logic", "difficulty": "medium", "question": "In a group where every person shakes hands with every other person exactly once, there are 66 total handshakes. How many people are in the group?", "options": ["66", "11", "12", "13"], "answer": 2 },
  { "id": "iq_m13", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the alternating sequence: 7, 10, 8, 11, 9, 12, ?", "options": ["12", "13", "8", "10"], "answer": 3 },
  { "id": "iq_m14", "topic": "IQ & Logic", "difficulty": "medium", "question": "A bat and a ball together cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost?", "options": ["$0.01", "$0.10", "$0.05", "$0.15"], "answer": 2 },
  { "id": "iq_m15", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 1, 3, 4, 7, 11, 18, 29, 47, ?", "options": ["74", "76", "78", "70"], "answer": 1 },
  { "id": "iq_m16", "topic": "IQ & Logic", "difficulty": "medium", "question": "There are 100 closed lockers and 100 people. Person 1 opens every locker, person 2 toggles every 2nd locker, person 3 toggles every 3rd, and so on through person 100. How many lockers remain open at the end?", "options": ["100", "10", "1", "50"], "answer": 1 },
  { "id": "iq_m17", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 2, 12, 36, 80, 150, ?", "options": ["260", "252", "240", "210"], "answer": 1 },
  { "id": "iq_m18", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 5, 9, 17, 33, 65, ?", "options": ["121", "133", "129", "125"], "answer": 2 },
  { "id": "iq_m19", "topic": "IQ & Logic", "difficulty": "medium", "question": "A is the brother of B. C is the daughter of B. What is A to C?", "options": ["Uncle", "Grandfather", "Father", "Cousin"], "answer": 0 },
  { "id": "iq_m20", "topic": "IQ & Logic", "difficulty": "medium", "question": "If all Zips are Zaps, and no Zaps are Zops, can any Zip be a Zop?", "options": ["Only some Zips", "Yes", "Cannot be determined", "No"], "answer": 3 },
  { "id": "iq_m21", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 1, 6, 15, 28, 45, ?", "options": ["66", "63", "60", "70"], "answer": 0 },
  { "id": "iq_m22", "topic": "IQ & Logic", "difficulty": "medium", "question": "Five runners finish a race in order, except Elin, who finishes between Bina (2nd) and Chandra (4th). What position does Elin finish in?", "options": ["3rd", "4th", "1st", "2nd"], "answer": 0 },
  { "id": "iq_m23", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 2, 4, 16, 256, ?", "options": ["16384", "32768", "4096", "65536"], "answer": 3 },
  { "id": "iq_m24", "topic": "IQ & Logic", "difficulty": "medium", "question": "A is twice as old as B. In 10 years, A will be 1.5 times as old as B. How old is B now?", "options": ["10", "15", "8", "20"], "answer": 0 },
  { "id": "iq_m25", "topic": "IQ & Logic", "difficulty": "medium", "question": "In a class, 60% of students are girls. If there are 18 boys, how many girls are there?", "options": ["30", "27", "22", "24"], "answer": 1 },
  { "id": "iq_m26", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 100, 95, 85, 70, 50, ?", "options": ["20", "35", "25", "30"], "answer": 2 },
  { "id": "iq_m27", "topic": "IQ & Logic", "difficulty": "medium", "question": "If the day before yesterday was Wednesday, what day is tomorrow?", "options": ["Thursday", "Saturday", "Sunday", "Friday"], "answer": 1 },
  { "id": "iq_m28", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 5, 6, 8, 11, 15, 20, ?", "options": ["24", "27", "25", "26"], "answer": 3 },
  { "id": "iq_m29", "topic": "IQ & Logic", "difficulty": "medium", "question": "A father's age is 4 times his son's age. In 20 years, the father will be twice as old as his son. What is the son's current age?", "options": ["15", "10", "8", "12"], "answer": 1 },
  { "id": "iq_m30", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 2, 3, 7, 16, 32, ?", "options": ["50", "54", "57", "60"], "answer": 2 },
  { "id": "iq_m31", "topic": "IQ & Logic", "difficulty": "medium", "question": "In a group of 30 people, 18 like tea and 15 like coffee, with 8 liking both. How many like neither?", "options": ["10", "7", "3", "5"], "answer": 3 },
  { "id": "iq_m32", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 1, 5, 13, 25, 41, ?", "options": ["65", "57", "61", "55"], "answer": 2 },
  { "id": "iq_m33", "topic": "IQ & Logic", "difficulty": "medium", "question": "If a shirt originally priced at $40 is discounted by 25%, what is the sale price?", "options": ["$35", "$30", "$28", "$32"], "answer": 1 },
  { "id": "iq_m34", "topic": "IQ & Logic", "difficulty": "medium", "question": "A jar contains 40 coins, only $1 and $2 coins, worth $65 in total. How many $2 coins are there?", "options": ["25", "15", "30", "20"], "answer": 0 },
  { "id": "iq_m35", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 4, 5, 9, 14, 23, 37, ?", "options": ["55", "60", "65", "50"], "answer": 1 },
  { "id": "iq_m36", "topic": "IQ & Logic", "difficulty": "medium", "question": "If the probability of event A is 0.5 and event B is 0.3, and they are mutually exclusive, what is the probability of A or B?", "options": ["0.65", "0.2", "0.15", "0.8"], "answer": 3 },
  { "id": "iq_m37", "topic": "IQ & Logic", "difficulty": "medium", "question": "What comes next in the sequence: 8, 15, 29, 57, 113, ?", "options": ["220", "215", "225", "230"], "answer": 2 },

  // ==========================================
  //  12. IQ & LOGIC — STEP 4: MEDIUM HARD
  // ==========================================
  { "id": "iq_mh1", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "A fair six -sided die is rolled twice. What is the probability that the sum of the two rolls is 7?", "options": ["1/4", "1/12", "1/6", "1/36"], "answer": 2 },
  { "id": "iq_mh2", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "What comes next in the sequence: 1, 1, 2, 5, 14, 42, ?", "options": ["140", "120", "126", "132"], "answer": 3 },
  { "id": "iq_mh3", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "If the probability of an event is 0.3, what is the probability that the event does NOT occur, as a fraction?", "options": ["7/3", "1/3", "3/10", "7/10"], "answer": 3 },
  { "id": "iq_mh4", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "What is the minimum number of people needed in a room to guarantee that at least two were born in the same month?", "options": ["12", "6", "13", "24"], "answer": 2 },
  { "id": "iq_mh5", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "What comes next in the sequence of primes: 2, 3, 5, 7, 11, 13, 17, 19, ?", "options": ["23", "21", "24", "22"], "answer": 0 },
  { "id": "iq_mh6", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "Solve for x: x squared minus 5x plus 6 equals 0. What are the two values of x?", "options": ["-2 and -3", "2 and 3", "3 and 4", "1 and 6"], "answer": 1 },
  { "id": "iq_mh7", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "If a binary number is 1101, what is its decimal equivalent?", "options": ["14", "13", "11", "15"], "answer": 1 },
  { "id": "iq_mh8", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "A committee of 3 people is to be chosen from 6 people. How many different committees are possible?", "options": ["15", "24", "20", "18"], "answer": 2 },
  { "id": "iq_mh9", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "What comes next in the sequence: 1, 3, 7, 15, 31, ?", "options": ["60", "65", "62", "63"], "answer": 3 },
  { "id": "iq_mh10", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "If two fair dice are rolled, what is the probability of getting a double (both dice showing the same number)?", "options": ["1/6", "1/2", "1/12", "1/36"], "answer": 0 },
  { "id": "iq_mh11", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "A is twice as old as B. Five years ago, A was three times as old as B. How old is B now?", "options": ["15", "10", "5", "20"], "answer": 1 },
  { "id": "iq_mh12", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "What comes next in the sequence: 1, 2, 5, 12, 29, ?", "options": ["75", "58", "65", "70"], "answer": 3 },
  { "id": "iq_mh13", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "In how many ways can 4 different books be arranged in a row on a shelf?", "options": ["24", "12", "20", "16"], "answer": 0 },
  { "id": "iq_mh14", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "What comes next in the sum -of-squares sequence: 1, 5, 14, 30, 55, ?", "options": ["91", "80", "95", "85"], "answer": 0 },
  { "id": "iq_mh15", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "If P(A) = 0.4 and P(B) = 0.5, and A and B are independent events, what is P(A and B)?", "options": ["0.45", "0.9", "0.1", "0.2"], "answer": 3 },
  { "id": "iq_mh16", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "What comes next in the sequence: 3, 6, 11, 18, 27, ?", "options": ["40", "36", "38", "34"], "answer": 2 },
  { "id": "iq_mh17", "topic": "IQ & Logic", "difficulty": "medium-hard", "question": "A number leaves remainder 3 when divided by 5, and remainder 2 when divided by 7. What is the smallest such positive number?", "options": ["33", "38", "23", "13"], "answer": 2 },

  // ==========================================
  //  12. IQ & LOGIC — STEP 5: HARD
  // ==========================================
  { "id": "iq_h1", "topic": "IQ & Logic", "difficulty": "hard", "question": "What comes next in the sequence: 1, 2, 4, 7, 13, 24, 44, ?", "options": ["78", "81", "84", "75"], "answer": 1 },
  { "id": "iq_h2", "topic": "IQ & Logic", "difficulty": "hard", "question": "In a single -elimination knockout tournament with 64 players, how many total matches are played to determine a winner?", "options": ["128", "64", "32", "63"], "answer": 3 },
  { "id": "iq_h3", "topic": "IQ & Logic", "difficulty": "hard", "question": "What is the probability of getting exactly 2 heads when flipping a fair coin 3 times?", "options": ["1/4", "3/8", "1/8", "1/2"], "answer": 1 },
  { "id": "iq_h4", "topic": "IQ & Logic", "difficulty": "hard", "question": "How many distinct ways can the letters of the word \"MATHS\" be arranged?", "options": ["120", "24", "720", "60"], "answer": 0 },
  { "id": "iq_h5", "topic": "IQ & Logic", "difficulty": "hard", "question": "If a fair coin is flipped 5 times, what is the probability of getting at least one head?", "options": ["15/16", "31/32", "1/32", "1/2"], "answer": 1 },
  { "id": "iq_h6", "topic": "IQ & Logic", "difficulty": "hard", "question": "What comes next in the sequence: 1, 3, 6, 11, 18, 27, 38, ?", "options": ["47", "51", "53", "49"], "answer": 1 },
  { "id": "iq_h7", "topic": "IQ & Logic", "difficulty": "hard", "question": "In a lottery, you must choose 6 numbers from 1 to 49. How many different combinations are possible?", "options": ["6,000,000", "823,543", "13,983,816", "49,000,000"], "answer": 2 },
  { "id": "iq_h8", "topic": "IQ & Logic", "difficulty": "hard", "question": "What comes next in the sequence: 1, 4, 13, 40, 121, ?", "options": ["366", "364", "363", "360"], "answer": 1 },
  { "id": "iq_h9", "topic": "IQ & Logic", "difficulty": "hard", "question": "A biased coin has a 60% chance of landing heads. What is the probability of getting heads on two consecutive flips?", "options": ["0.3", "0.36", "0.9", "0.6"], "answer": 1 },
  { "id": "iq_h10", "topic": "IQ & Logic", "difficulty": "hard", "question": "What is the sum of the interior angles of a 12 -sided polygon (dodecagon)?", "options": ["2160 degrees", "1440 degrees", "1080 degrees", "1800 degrees"], "answer": 3 },
  { "id": "iq_h11", "topic": "IQ & Logic", "difficulty": "hard", "question": "What comes next in the sequence: 2, 5, 11, 23, 47, 95, ?", "options": ["185", "191", "193", "189"], "answer": 1 },
  { "id": "iq_h12", "topic": "IQ & Logic", "difficulty": "hard", "question": "The probability of rain tomorrow is 0.3, and the probability of rain the day after is 0.4 (independent). What is the probability it rains on both days?", "options": ["0.12", "0.24", "0.7", "0.35"], "answer": 0 },
  { "id": "iq_h13", "topic": "IQ & Logic", "difficulty": "hard", "question": "What comes next in the sequence: 1, 2, 4, 8, 15, 26, 42, ?", "options": ["64", "56", "60", "68"], "answer": 0 },
  { "id": "iq_h14", "topic": "IQ & Logic", "difficulty": "hard", "question": "How many diagonals does a regular octagon (8 -sided polygon) have?", "options": ["24", "28", "20", "16"], "answer": 2 },
  { "id": "iq_h15", "topic": "IQ & Logic", "difficulty": "hard", "question": "What comes next in the sequence: 6, 24, 60, 120, 210, ?", "options": ["280", "360", "336", "300"], "answer": 2 },
  { "id": "iq_h16", "topic": "IQ & Logic", "difficulty": "hard", "question": "Two trains, 300 km apart, move toward each other at 60 km/h and 90 km/h. After how many hours will they meet?", "options": ["3 hours", "2 hours", "1.5 hours", "2.5 hours"], "answer": 1 },
  { "id": "iq_h17", "topic": "IQ & Logic", "difficulty": "hard", "question": "What comes next in the Pell -number sequence: 1, 1, 3, 7, 17, 41, ?", "options": ["89", "103", "99", "95"], "answer": 2 },

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

/**
 * Global used-questions tracker — ensures no question is ever
 * repeated across different participants during the entire event.
 */
function loadGlobalUsedQuestions() {
  try {
    var data = localStorage.getItem(STORAGE_KEYS.globalUsedQuestions);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveGlobalUsedQuestions(list) {
  try {
    localStorage.setItem(STORAGE_KEYS.globalUsedQuestions, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save global used questions:", e);
  }
}

function markQuestionGloballyUsed(questionId) {
  var globalUsed = loadGlobalUsedQuestions();
  if (globalUsed.indexOf(questionId) === -1) {
    globalUsed.push(questionId);
    saveGlobalUsedQuestions(globalUsed);
  }
}

function getEligibleQuestions(topic, difficulty) {
  var actualDiffs = getActualDifficulties(difficulty);
  var globalUsed = loadGlobalUsedQuestions();
  var eligible = [];

  for (var d = 0; d < actualDiffs.length; d++) {
    var diff = actualDiffs[d];
    var found = questionBank.filter(function (q) {
      return q.topic === topic &&
        q.difficulty === diff &&
        gameState.usedQuestions.indexOf(q.id) === -1 &&
        globalUsed.indexOf(q.id) === -1;
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
  // Track per-participant (session)
  if (gameState.usedQuestions.indexOf(questionId) === -1) {
    gameState.usedQuestions.push(questionId);
    saveState();
  }
  // Track globally (across all participants)
  markQuestionGloballyUsed(questionId);
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
// WELCOME & STUDENT ID ENTRY
// ============================================

function submitName() {
  var input = document.getElementById("participant-name");
  var error = document.getElementById("name-error");
  var name = input.value.trim();

  if (!name) {
    error.textContent = "Please enter your Student ID to continue.";
    input.focus();
    return;
  }

  if (name.length < 2) {
    error.textContent = "Student ID must be at least 2 characters.";
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
  greeting.textContent = "Welcome, Detective " + gameState.participantName + "!";

  var segDiff = getDifficultyForSegment(gameState.currentSegment);
  var diffName = difficultyLabel(segDiff);
  var pts = SCORE_MAP[segDiff] || 10;

  // Show segment indicator
  var indicator = document.getElementById("segment-indicator");
  indicator.innerHTML = '<span class="segment-number-badge">STEP ' + gameState.currentSegment + ' OF ' + TOTAL_SEGMENTS + ' — ' + diffName + ' (' + pts + ' PTS/Q)</span>';

  // Update title
  var title = document.getElementById("topic-screen-title");
  title.textContent = "Choose Your Case — Step " + gameState.currentSegment + " (" + diffName + ")";

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
  document.getElementById("confirm-segment").textContent = "Step " + gameState.currentSegment + " of " + TOTAL_SEGMENTS;
  document.getElementById("confirm-topic").textContent = topicName;

  var firstQNum = (gameState.currentSegment - 1) * QUESTIONS_PER_SEGMENT + 1;
  var lastQNum = firstQNum + QUESTIONS_PER_SEGMENT - 1;
  var diff = getDifficultyForQuestion(firstQNum);
  var pts = SCORE_MAP[diff] || 10;
  document.getElementById("confirm-difficulty").textContent = difficultyLabel(diff) + " (+" + pts + " pts/Q)";
  document.getElementById("confirm-questions").textContent = "Q" + firstQNum + " – Q" + lastQNum + " (3 Questions)";

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
  document.getElementById("quiz-segment-badge").textContent = "STEP " + gameState.currentSegment;
  document.getElementById("quiz-topic-badge").textContent = gameState.selectedTopics[gameState.currentSegment];

  showScreen("screen-quiz");
  loadQuestion();
}

// ============================================
// QUIZ — QUESTION LOADING
// ============================================

function loadQuestion() {
  gameState.isAnswered = false;
  hideAnswerAction();
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
    "  •  Step " + gameState.currentSegment + " (" + difficultyLabel(currentDiff) + ") — Q" + gameState.currentQuestionInSegment + "/" + QUESTIONS_PER_SEGMENT;
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

// ============================================
// ANSWER ACTION & FEEDBACK CONTROLLER
// ============================================

let pendingNextAction = null;

function showAnswerAction(type, pointsEarned) {
  var container = document.getElementById("answer-action-container");
  var badge = document.getElementById("answer-feedback-badge");
  var icon = document.getElementById("feedback-badge-icon");
  var title = document.getElementById("feedback-badge-title");
  var sub = document.getElementById("feedback-badge-sub");
  var btn = document.getElementById("btn-next-action");
  var btnText = document.getElementById("btn-next-action-text");
  var btnArrow = document.getElementById("btn-next-action-arrow");

  if (!container) return;

  if (type === "correct") {
    if (badge) badge.className = "answer-feedback-badge feedback-badge-correct";
    if (icon) icon.textContent = "✓";
    if (title) title.textContent = "CORRECT";
    if (sub) sub.textContent = "+" + pointsEarned + " POINTS";
    if (btn) btn.className = "btn btn-action-next btn-glow";
    if (btnText) btnText.textContent = "NEXT QUESTION";
    if (btnArrow) btnArrow.style.display = "inline-block";

    pendingNextAction = function () {
      hideAnswerAction();
      // Check if segment is complete
      if (gameState.currentQuestionInSegment >= QUESTIONS_PER_SEGMENT) {
        if (gameState.currentSegment >= TOTAL_SEGMENTS) {
          endCompetition("completed");
        } else {
          showSegmentTransition();
        }
      } else {
        loadQuestion();
      }
    };
  } else if (type === "wrong") {
    if (badge) badge.className = "answer-feedback-badge feedback-badge-wrong";
    if (icon) icon.textContent = "✕";
    if (title) title.textContent = "WRONG ANSWER";
    if (sub) sub.textContent = "CASE CLOSED";
    if (btn) btn.className = "btn btn-action-turnover btn-glow";
    if (btnText) btnText.textContent = "TURN OVER";
    if (btnArrow) btnArrow.style.display = "none";

    pendingNextAction = function () {
      hideAnswerAction();
      endTurn("wrong");
    };
  } else if (type === "timeout") {
    if (badge) badge.className = "answer-feedback-badge feedback-badge-wrong";
    if (icon) icon.textContent = "⏱";
    if (title) title.textContent = "TIME'S UP!";
    if (sub) sub.textContent = "CASE CLOSED";
    if (btn) btn.className = "btn btn-action-turnover btn-glow";
    if (btnText) btnText.textContent = "TURN OVER";
    if (btnArrow) btnArrow.style.display = "none";

    pendingNextAction = function () {
      hideAnswerAction();
      endTurn("timeout");
    };
  }

  container.style.display = "flex";
  container.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideAnswerAction() {
  var container = document.getElementById("answer-action-container");
  if (container) container.style.display = "none";
  pendingNextAction = null;
}

function handleNextAction() {
  if (typeof pendingNextAction === "function") {
    var action = pendingNextAction;
    pendingNextAction = null;
    action();
  }
}

function handleTimeout() {
  if (gameState.isAnswered) return;
  gameState.isAnswered = true;

  disableAllOptions();

  var options = document.querySelectorAll(".option-btn");
  options.forEach(function (btn) {
    btn.classList.add("option-dimmed");
  });

  // Highlight Right option in green
  if (gameState.currentQuestion) {
    var correctIdx = gameState.currentQuestion.answer;
    if (options[correctIdx]) {
      options[correctIdx].classList.remove("option-dimmed");
      options[correctIdx].classList.add("option-correct");
      var correctLetterSpan = options[correctIdx].querySelector(".option-letter");
      if (correctLetterSpan) correctLetterSpan.textContent = "✓";
    }
  }

  gameState.wrongAnswers++;
  saveState();

  // Show "TURN OVER" action
  showAnswerAction("timeout");
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
  options.forEach(function (btn, idx) {
    if (idx !== selectedIndex) {
      btn.classList.add("option-dimmed");
    }
  });

  if (isCorrect) {
    options[selectedIndex].classList.add("option-correct");
    var letterSpan = options[selectedIndex].querySelector(".option-letter");
    if (letterSpan) letterSpan.textContent = "✓";

    // Scoring calculation: Fixed Points per difficulty
    gameState.correctAnswers++;
    var diff = getDifficultyForQuestion(gameState.overallQuestionNumber);
    var earnedPoints = SCORE_MAP[diff] || 10;
    gameState.score += earnedPoints;
    saveState();

    // Update score in UI
    document.getElementById("quiz-score").textContent = "Score: " + gameState.score;

    // Show feedback & action button "NEXT QUESTION →"
    showAnswerAction("correct", earnedPoints);
  } else {
    // Highlight wrong answer in red
    options[selectedIndex].classList.add("option-wrong");
    var wrongLetterSpan = options[selectedIndex].querySelector(".option-letter");
    if (wrongLetterSpan) wrongLetterSpan.textContent = "✕";

    // Highlight right option in green
    var correctIdx = question.answer;
    if (options[correctIdx]) {
      options[correctIdx].classList.remove("option-dimmed");
      options[correctIdx].classList.add("option-correct");
      var correctLetterSpan = options[correctIdx].querySelector(".option-letter");
      if (correctLetterSpan) correctLetterSpan.textContent = "✓";
    }

    gameState.wrongAnswers++;
    saveState();

    // Show feedback & action button "TURN OVER"
    showAnswerAction("wrong");
  }
}

function disableAllOptions() {
  var options = document.querySelectorAll(".option-btn");
  options.forEach(function (btn) {
    btn.classList.add("option-disabled");
  });
}

function showCorrectAnswer() {
  // Kept for backward compatibility if needed, but not called on wrong answers
  if (!gameState.currentQuestion) return;
  var correctIdx = gameState.currentQuestion.answer;
  var correctBtn = document.getElementById("option-" + correctIdx);
  if (correctBtn) {
    correctBtn.classList.add("option-correct");
  }
}

function showFeedbackOverlay(isCorrect) {
  // Legacy overlay retained for safety
  var overlay = document.getElementById("feedback-overlay");
  if (!overlay) return;
  var icon = document.getElementById("feedback-icon");
  var text = document.getElementById("feedback-text");

  overlay.className = "feedback-overlay show " +
    (isCorrect ? "feedback-correct" : "feedback-wrong");

  if (icon) icon.textContent = isCorrect ? "✓" : "✕";
  if (text) text.textContent = isCorrect ? "CORRECT!" : "WRONG ANSWER";
}

function hideFeedbackOverlay() {
  var overlay = document.getElementById("feedback-overlay");
  if (overlay) overlay.className = "feedback-overlay";
}

// ============================================
// CORRECT / WRONG DELEGATES (Internal)
// ============================================

function handleCorrectAnswer() {
  // Logic is handled directly in handleAnswer / pendingNextAction
}

function handleWrongAnswer() {
  // Logic is handled directly in handleAnswer / pendingNextAction
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

  var qNum = gameState.overallQuestionNumber || 1;
  var currentDiff = getDifficultyForQuestion(qNum);
  document.getElementById("out-title").textContent = title;
  document.getElementById("out-message").textContent = message;
  document.getElementById("out-name").textContent = gameState.participantName;
  document.getElementById("out-reached").textContent =
    "Step " + gameState.currentSegment + " (" + difficultyLabel(currentDiff) + "), Q" + qNum;
  document.getElementById("out-correct").textContent = gameState.correctAnswers + " / " + qNum;
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

  var noQNum = gameState.overallQuestionNumber || 1;
  var noQDiff = getDifficultyForQuestion(noQNum);
  document.getElementById("out-title").textContent = "NO MORE QUESTIONS";
  document.getElementById("out-message").textContent =
    "All questions in this topic/difficulty have been used. Please try another topic.";
  document.getElementById("out-name").textContent = gameState.participantName;
  document.getElementById("out-reached").textContent =
    "Step " + gameState.currentSegment + " (" + difficultyLabel(noQDiff) + "), Q" + noQNum;
  document.getElementById("out-correct").textContent = gameState.correctAnswers + " / " + noQNum;
  document.getElementById("out-score").textContent = gameState.score + " pts";

  showScreen("screen-out");
}

// ============================================
// SEGMENT TRANSITION
// ============================================

function showSegmentTransition() {
  var completedSeg = gameState.currentSegment;
  var completedDiff = getDifficultyForSegment(completedSeg);
  var nextSeg = completedSeg + 1;
  var nextDiff = nextSeg <= TOTAL_SEGMENTS ? getDifficultyForSegment(nextSeg) : null;

  document.getElementById("transition-icon").textContent = "✅";
  document.getElementById("transition-title").textContent = "STEP " + completedSeg + " COMPLETE! (" + difficultyLabel(completedDiff) + ")";
  document.getElementById("transition-subtitle").textContent =
    "Score: " + gameState.score + " pts  •  " + gameState.correctAnswers + " correct answers so far" +
    (nextDiff ? "  •  Up Next: STEP " + nextSeg + " (" + difficultyLabel(nextDiff) + ")" : "");

  // Render segment progress dots
  renderSegmentProgress(completedSeg);

  showScreen("screen-transition");
}

function renderSegmentProgress(completedUpTo) {
  var container = document.getElementById("transition-progress");
  container.innerHTML = "";

  var stepLabels = ["EASY", "EASY MED", "MEDIUM", "MED HARD", "HARD"];

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
    label.textContent = "STEP " + i + " (" + stepLabels[i - 1] + ")";
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
let isPhoneCallPaused = false;

function updatePhonePauseButton(isPaused) {
  var btn = document.getElementById("btn-phone-timer-toggle");
  var icon = document.getElementById("phone-pause-icon");
  var text = document.getElementById("phone-pause-text");
  var circle = document.getElementById("phone-timer-circle");
  var waves = document.getElementById("audio-waves");
  var statusText = document.getElementById("phone-call-status");

  if (btn) {
    if (isPaused) {
      btn.classList.add("is-paused");
      if (icon) icon.textContent = "▶️";
      if (text) text.textContent = "Resume Call Timer";
    } else {
      btn.classList.remove("is-paused");
      if (icon) icon.textContent = "⏸";
      if (text) text.textContent = "Pause Call Timer";
    }
  }

  if (circle) {
    if (isPaused) {
      circle.classList.add("is-paused");
    } else {
      circle.classList.remove("is-paused");
    }
  }

  if (waves) {
    if (isPaused) {
      waves.classList.add("is-paused");
    } else {
      waves.classList.remove("is-paused");
    }
  }

  if (statusText) {
    if (isPaused) {
      statusText.textContent = "⏸️ Call Timer Paused • Friend on line";
      statusText.style.color = "var(--accent-cyan)";
    } else {
      if (phoneCallSeconds <= 5) {
        statusText.textContent = "⚠️ Call Time Ending Soon • " + phoneCallSeconds + "s";
        statusText.style.color = "var(--color-error)";
      } else {
        statusText.textContent = "🟢 Call in Progress • Speak with your friend";
        statusText.style.color = "var(--color-success)";
      }
    }
  }
}

function togglePhoneCallPause() {
  isPhoneCallPaused = !isPhoneCallPaused;
  updatePhonePauseButton(isPhoneCallPaused);
  if (isPhoneCallPaused) {
    showLifelineBanner("⏸️ <strong>Phone Timer Paused</strong>", "toast-5050", 1200);
  } else {
    showLifelineBanner("▶️ <strong>Phone Timer Resumed</strong>", "toast-extra", 1200);
  }
}

function applyPhoneAFriend() {
  // Turn off / pause main quiz timer immediately
  pauseTimer();

  var modal = document.getElementById("modal-phone");
  var secondsSpan = document.getElementById("phone-call-seconds");
  var statusText = document.getElementById("phone-call-status");

  if (modal) modal.classList.add("show");
  phoneCallSeconds = 30;
  isPhoneCallPaused = false;
  updatePhonePauseButton(false);

  if (secondsSpan) secondsSpan.textContent = phoneCallSeconds;
  if (statusText) {
    statusText.textContent = "🟢 Call in Progress • Speak with your friend";
    statusText.style.color = "var(--color-success)";
  }

  // Turn on Phone a Friend 30s countdown timer
  if (phoneCallInterval) clearInterval(phoneCallInterval);
  phoneCallInterval = setInterval(function () {
    if (isPhoneCallPaused) return;

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
  isPhoneCallPaused = false;
  updatePhonePauseButton(false);

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
  hideAnswerAction();
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

  var podiumWrapper = document.getElementById("ranking-podium-wrapper");
  var wrapper = document.getElementById("ranking-table-wrapper");
  var emptyMsg = document.getElementById("ranking-empty");

  if (podiumWrapper) podiumWrapper.innerHTML = "";

  if (results.length === 0) {
    if (emptyMsg) emptyMsg.style.display = "block";
    var existingTable = wrapper ? wrapper.querySelector("table") : null;
    if (existingTable) existingTable.remove();
    showScreen("screen-ranking");
    return;
  }

  if (emptyMsg) emptyMsg.style.display = "none";

  // Sort: Score desc → Correct Answers desc → Total Time asc → Completed At asc
  results.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    if (b.correctAnswers !== a.correctAnswers) return b.correctAnswers - a.correctAnswers;
    if (a.totalTimeMs !== b.totalTimeMs) return a.totalTimeMs - b.totalTimeMs;
    return new Date(a.completedAt) - new Date(b.completedAt);
  });

  document.getElementById("ranking-subtitle").textContent =
    results.length + " detective" + (results.length !== 1 ? "s" : "") + " ranked by performance";

  // Render Top 3 Podium
  if (podiumWrapper) {
    var top3 = results.slice(0, 3);
    var podiumHtml = '<div class="podium-grid">';

    // Order for visual podium layout: Rank 2 (Left), Rank 1 (Center - elevated), Rank 3 (Right)
    var podiumOrder = [];
    if (top3.length === 1) {
      podiumOrder = [{ r: top3[0], rank: 1 }];
    } else if (top3.length === 2) {
      podiumOrder = [{ r: top3[1], rank: 2 }, { r: top3[0], rank: 1 }];
    } else {
      podiumOrder = [{ r: top3[1], rank: 2 }, { r: top3[0], rank: 1 }, { r: top3[2], rank: 3 }];
    }

    podiumOrder.forEach(function (item) {
      var r = item.r;
      var rank = item.rank;
      var crownIcon = rank === 1 ? "👑" : (rank === 2 ? "🥈" : "🥉");
      var rankTitle = rank === 1 ? "MASTER DETECTIVE" : (rank === 2 ? "SENIOR DETECTIVE" : "JUNIOR DETECTIVE");

      podiumHtml += '<div class="podium-card podium-rank-' + rank + '">';
      podiumHtml += '  <div class="podium-crown">' + crownIcon + '</div>';
      podiumHtml += '  <div class="podium-badge">RANK ' + rank + '</div>';
      podiumHtml += '  <h3 class="podium-name">' + escapeHtml(r.participantName) + '</h3>';
      podiumHtml += '  <div class="podium-title-sub">' + rankTitle + '</div>';
      podiumHtml += '  <div class="podium-score">' + r.score + ' <span class="podium-pts-label">pts</span></div>';
      podiumHtml += '  <div class="podium-meta">';
      podiumHtml += '    <span>✓ ' + r.correctAnswers + ' Correct</span>';
      podiumHtml += '    <span>⏱ ' + formatTime(r.totalTimeMs) + '</span>';
      podiumHtml += '  </div>';
      podiumHtml += '</div>';
    });

    podiumHtml += '</div>';
    podiumWrapper.innerHTML = podiumHtml;
  }

  // Render Table for all participants
  var html = '<table class="ranking-table">';
  html += '<thead><tr>';
  html += '<th>Rank</th><th>Detective</th><th>Score</th><th>Correct</th><th>Time</th><th>Status</th>';
  html += '</tr></thead><tbody>';

  results.forEach(function (r, idx) {
    var rank = idx + 1;
    var rankClass = "rank-other";
    if (rank === 1) rankClass = "rank-1";
    else if (rank === 2) rankClass = "rank-2";
    else if (rank === 3) rankClass = "rank-3";

    var statusClass = r.status === "completed" ? "status-completed" : "status-eliminated";
    var statusText = r.status === "completed" ? "SOLVED" : "CLOSED";

    html += '<tr>';
    html += '<td><span class="rank-badge ' + rankClass + '">' + rank + '</span></td>';
    html += '<td><strong>' + escapeHtml(r.participantName) + '</strong></td>';
    html += '<td><span class="table-score-pill">' + r.score + ' pts</span></td>';
    html += '<td>' + r.correctAnswers + ' / 15</td>';
    html += '<td>' + formatTime(r.totalTimeMs) + '</td>';
    html += '<td><span class="rank-status ' + statusClass + '">' + statusText + '</span></td>';
    html += '</tr>';
  });

  html += '</tbody></table>';

  // Remove existing table if any
  var existingTable = wrapper ? wrapper.querySelector("table") : null;
  if (existingTable) existingTable.remove();

  if (wrapper) wrapper.insertAdjacentHTML("afterbegin", html);

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
  // Enter key handling
  if (e.key === "Enter") {
    var nameScreen = document.getElementById("screen-name");
    if (nameScreen && nameScreen.classList.contains("active")) {
      submitName();
      return;
    }

    var actionContainer = document.getElementById("answer-action-container");
    if (actionContainer && actionContainer.style.display === "flex") {
      handleNextAction();
      return;
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
