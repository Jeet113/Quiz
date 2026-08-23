/* ============================================
   CUET Career Club — Quiz Challenge
   Club Fest 2026
   Application Logic
   ============================================ */

// ============================================
// CONFIGURATION — Easy to modify
// ============================================

/** Admin PIN for accessing the admin panel */
const ADMIN_PIN = "2026";

/** Number of correct answers required per level to advance */
const LEVEL_REQUIREMENTS = {
  easy: 3,
  medium: 3,
  hard: 3
};

/** Ordered list of difficulty levels */
const DIFFICULTIES = ["easy", "medium", "hard"];

/** Segment definitions with icons and descriptions */
const SEGMENTS = [
  { name: "Sports",            icon: "🏆", description: "Test your athletic knowledge" },
  { name: "Technology",        icon: "💻", description: "Decode the digital world" },
  { name: "Business",          icon: "💼", description: "Master the market" },
  { name: "Entertainment",     icon: "🎬", description: "Lights, camera, action!" },
  { name: "Science",           icon: "🔬", description: "Explore the unknown" },
  { name: "General Knowledge", icon: "🌍", description: "Know it all" }
];

/** LocalStorage keys */
const STORAGE_KEYS = {
  usedQuestions: "cuet_quiz_used_questions",
  eventStats:    "cuet_quiz_event_stats"
};

/** Delay timings (ms) */
const TIMING = {
  correctFeedback: 1200,
  wrongFeedback: 1500,
  transitionDelay: 600
};

// ============================================
// QUESTION BANK — 180 Questions
// ============================================
// Structure: { id, segment, difficulty, question, options[], answer (0-indexed) }
// Add more questions by appending to this array.

const questionBank = [

  // ==========================================
  //  SPORTS — EASY (1–10)
  // ==========================================
  { id: 1,  segment: "Sports", difficulty: "easy", question: "Which country won the FIFA World Cup in 2022?", options: ["Argentina", "France", "Brazil", "Germany"], answer: 0 },
  { id: 2,  segment: "Sports", difficulty: "easy", question: "How many players are on a standard football (soccer) team on the field?", options: ["9", "11", "13", "7"], answer: 1 },
  { id: 3,  segment: "Sports", difficulty: "easy", question: "In which sport is the term 'slam dunk' commonly used?", options: ["Basketball", "Tennis", "Volleyball", "Cricket"], answer: 0 },
  { id: 4,  segment: "Sports", difficulty: "easy", question: "The Summer Olympic Games are held every how many years?", options: ["2 years", "3 years", "4 years", "5 years"], answer: 2 },
  { id: 5,  segment: "Sports", difficulty: "easy", question: "Which sport uses a shuttlecock?", options: ["Tennis", "Badminton", "Squash", "Table Tennis"], answer: 1 },
  { id: 6,  segment: "Sports", difficulty: "easy", question: "What is the most popular sport in the world by viewership?", options: ["Football (Soccer)", "Cricket", "Basketball", "Tennis"], answer: 0 },
  { id: 7,  segment: "Sports", difficulty: "easy", question: "In cricket, how many runs is a boundary hit over the rope without bouncing worth?", options: ["2", "4", "6", "8"], answer: 2 },
  { id: 8,  segment: "Sports", difficulty: "easy", question: "Which country hosted the 2024 Summer Olympics?", options: ["France", "Japan", "USA", "China"], answer: 0 },
  { id: 9,  segment: "Sports", difficulty: "easy", question: "In tennis, what is a score of zero called?", options: ["Nil", "Zero", "Love", "Nought"], answer: 2 },
  { id: 10, segment: "Sports", difficulty: "easy", question: "In which sport is the term 'home run' used?", options: ["Cricket", "Baseball", "Golf", "Rugby"], answer: 1 },

  // ==========================================
  //  SPORTS — MEDIUM (11–20)
  // ==========================================
  { id: 11, segment: "Sports", difficulty: "medium", question: "Which country has won the most ICC Cricket World Cup titles?", options: ["India", "Australia", "West Indies", "England"], answer: 1 },
  { id: 12, segment: "Sports", difficulty: "medium", question: "What is the total distance of a standard marathon?", options: ["21.1 km", "36.5 km", "42.195 km", "50.0 km"], answer: 2 },
  { id: 13, segment: "Sports", difficulty: "medium", question: "In which country did the sport of judo originate?", options: ["Japan", "China", "South Korea", "Thailand"], answer: 0 },
  { id: 14, segment: "Sports", difficulty: "medium", question: "Who holds the world record for the 100m sprint?", options: ["Usain Bolt", "Tyson Gay", "Yohan Blake", "Carl Lewis"], answer: 0 },
  { id: 15, segment: "Sports", difficulty: "medium", question: "The Ryder Cup is associated with which sport?", options: ["Tennis", "Polo", "Golf", "Sailing"], answer: 2 },
  { id: 16, segment: "Sports", difficulty: "medium", question: "Which Grand Slam tennis tournament is played on red clay courts?", options: ["Wimbledon", "French Open", "US Open", "Australian Open"], answer: 1 },
  { id: 17, segment: "Sports", difficulty: "medium", question: "Which sport uses the terms 'love' and 'deuce'?", options: ["Badminton", "Tennis", "Table Tennis", "Squash"], answer: 1 },
  { id: 18, segment: "Sports", difficulty: "medium", question: "What does 'LBW' stand for in cricket?", options: ["Long Ball Wide", "Leg Below Waist", "Leg Before Wicket", "Last Batsman Won"], answer: 2 },
  { id: 19, segment: "Sports", difficulty: "medium", question: "Which country will co-host the FIFA World Cup 2026 alongside Canada and Mexico?", options: ["USA", "Brazil", "England", "Australia"], answer: 0 },
  { id: 20, segment: "Sports", difficulty: "medium", question: "In which sport is a 'century' a score of 100 by an individual?", options: ["Football", "Hockey", "Cricket", "Basketball"], answer: 2 },

  // ==========================================
  //  SPORTS — HARD (21–30)
  // ==========================================
  { id: 21, segment: "Sports", difficulty: "hard", question: "In which year was the first FIFA World Cup held?", options: ["1926", "1930", "1934", "1928"], answer: 1 },
  { id: 22, segment: "Sports", difficulty: "hard", question: "Which is the only country to have participated in every FIFA World Cup tournament?", options: ["Brazil", "Germany", "Argentina", "Italy"], answer: 0 },
  { id: 23, segment: "Sports", difficulty: "hard", question: "Who scored the infamous 'Hand of God' goal in the 1986 FIFA World Cup?", options: ["Pelé", "Zinedine Zidane", "Diego Maradona", "Johan Cruyff"], answer: 2 },
  { id: 24, segment: "Sports", difficulty: "hard", question: "The Duckworth-Lewis-Stern (DLS) method is used in which sport?", options: ["Football", "Cricket", "Baseball", "Rugby"], answer: 1 },
  { id: 25, segment: "Sports", difficulty: "hard", question: "Which gymnast scored the first perfect 10.0 in Olympic history?", options: ["Nadia Comăneci", "Simone Biles", "Mary Lou Retton", "Larisa Latynina"], answer: 0 },
  { id: 26, segment: "Sports", difficulty: "hard", question: "Which modern sport was originally called 'Mintonette'?", options: ["Badminton", "Tennis", "Volleyball", "Table Tennis"], answer: 2 },
  { id: 27, segment: "Sports", difficulty: "hard", question: "The Thomas Cup is an international championship associated with which sport?", options: ["Tennis", "Badminton", "Football", "Table Tennis"], answer: 1 },
  { id: 28, segment: "Sports", difficulty: "hard", question: "In which year were the first modern Olympic Games held?", options: ["1900", "1888", "1896", "1904"], answer: 2 },
  { id: 29, segment: "Sports", difficulty: "hard", question: "Who has won the most Grand Slam singles titles in men's tennis history?", options: ["Roger Federer", "Novak Djokovic", "Rafael Nadal", "Pete Sampras"], answer: 1 },
  { id: 30, segment: "Sports", difficulty: "hard", question: "In bowling, what is the term for three consecutive strikes?", options: ["Hat-trick", "Triple", "Turkey", "Trifecta"], answer: 2 },

  // ==========================================
  //  TECHNOLOGY — EASY (31–40)
  // ==========================================
  { id: 31, segment: "Technology", difficulty: "easy", question: "What does 'CPU' stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], answer: 0 },
  { id: 32, segment: "Technology", difficulty: "easy", question: "Which company created the iPhone?", options: ["Samsung", "Apple", "Google", "Microsoft"], answer: 1 },
  { id: 33, segment: "Technology", difficulty: "easy", question: "What is the most popular search engine in the world?", options: ["Bing", "Yahoo", "Google", "DuckDuckGo"], answer: 2 },
  { id: 34, segment: "Technology", difficulty: "easy", question: "What does 'USB' stand for?", options: ["Universal System Bus", "Ultra Speed Buffer", "Universal Serial Bus", "Unified System Board"], answer: 2 },
  { id: 35, segment: "Technology", difficulty: "easy", question: "Which company developed the Android mobile operating system?", options: ["Apple", "Google", "Microsoft", "Samsung"], answer: 1 },
  { id: 36, segment: "Technology", difficulty: "easy", question: "What does 'WWW' stand for in a web address?", options: ["World Wide Web", "Web World Wide", "Wide World Web", "World Web Wide"], answer: 0 },
  { id: 37, segment: "Technology", difficulty: "easy", question: "Which programming language shares its name with a type of coffee?", options: ["Python", "Java", "Ruby", "C++"], answer: 1 },
  { id: 38, segment: "Technology", difficulty: "easy", question: "What does 'URL' stand for?", options: ["Universal Record Locator", "Uniform Resource Locator", "United Reference Link", "Universal Resource Link"], answer: 1 },
  { id: 39, segment: "Technology", difficulty: "easy", question: "Who is the co-founder of Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Jeff Bezos"], answer: 1 },
  { id: 40, segment: "Technology", difficulty: "easy", question: "What does 'RAM' stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Application Module", "Run Access Mode"], answer: 1 },

  // ==========================================
  //  TECHNOLOGY — MEDIUM (41–50)
  // ==========================================
  { id: 41, segment: "Technology", difficulty: "medium", question: "In what year was the World Wide Web invented by Tim Berners-Lee?", options: ["1985", "1989", "1993", "1991"], answer: 1 },
  { id: 42, segment: "Technology", difficulty: "medium", question: "What does 'HTML' stand for?", options: ["Hyper Tool Markup Language", "HyperText Markup Language", "High Text Machine Language", "HyperText Making Language"], answer: 1 },
  { id: 43, segment: "Technology", difficulty: "medium", question: "Who created the Python programming language?", options: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"], answer: 0 },
  { id: 44, segment: "Technology", difficulty: "medium", question: "Which company owns the platform GitHub?", options: ["Google", "Amazon", "Microsoft", "Meta"], answer: 2 },
  { id: 45, segment: "Technology", difficulty: "medium", question: "What does 'SSD' stand for?", options: ["Super Speed Disk", "Solid State Drive", "System Storage Device", "Serial Signal Data"], answer: 1 },
  { id: 46, segment: "Technology", difficulty: "medium", question: "Which language is primarily used for styling web pages?", options: ["HTML", "JavaScript", "CSS", "PHP"], answer: 2 },
  { id: 47, segment: "Technology", difficulty: "medium", question: "In computer networking, what does 'IP' stand for?", options: ["Internet Program", "Internal Process", "Internet Protocol", "Information Path"], answer: 2 },
  { id: 48, segment: "Technology", difficulty: "medium", question: "Who created the Linux operating system kernel?", options: ["Linus Torvalds", "Dennis Ritchie", "Steve Wozniak", "Richard Stallman"], answer: 0 },
  { id: 49, segment: "Technology", difficulty: "medium", question: "In which year was the first iPhone released?", options: ["2005", "2006", "2007", "2008"], answer: 2 },
  { id: 50, segment: "Technology", difficulty: "medium", question: "What does 'AI' stand for in the context of technology?", options: ["Automatic Integration", "Artificial Intelligence", "Advanced Interface", "Analog Input"], answer: 1 },

  // ==========================================
  //  TECHNOLOGY — HARD (51–60)
  // ==========================================
  { id: 51, segment: "Technology", difficulty: "hard", question: "In which year was the first version of the Linux kernel released?", options: ["1989", "1991", "1993", "1987"], answer: 1 },
  { id: 52, segment: "Technology", difficulty: "hard", question: "What does HTTPS provide that HTTP does not?", options: ["Faster loading", "Encrypted communication", "Better SEO", "Multimedia support"], answer: 1 },
  { id: 53, segment: "Technology", difficulty: "hard", question: "Moore's Law predicts that the number of transistors on a chip doubles approximately every how many years?", options: ["1 year", "2 years", "5 years", "10 years"], answer: 1 },
  { id: 54, segment: "Technology", difficulty: "hard", question: "What does 'DNS' stand for in networking?", options: ["Digital Network Service", "Domain Name System", "Data Node Structure", "Dynamic Network Server"], answer: 1 },
  { id: 55, segment: "Technology", difficulty: "hard", question: "Which is widely regarded as the first high-level programming language?", options: ["COBOL", "Fortran", "BASIC", "C"], answer: 1 },
  { id: 56, segment: "Technology", difficulty: "hard", question: "What does 'TCP' stand for in the TCP/IP protocol suite?", options: ["Transfer Control Program", "Transmission Control Protocol", "Technical Communication Process", "Transport Connection Protocol"], answer: 1 },
  { id: 57, segment: "Technology", difficulty: "hard", question: "What is the name of the world's first general-purpose electronic digital computer?", options: ["UNIVAC", "ENIAC", "Colossus", "Z3"], answer: 1 },
  { id: 58, segment: "Technology", difficulty: "hard", question: "What does 'SQL' stand for?", options: ["Simple Query Language", "Structured Question Language", "Structured Query Language", "System Query Logic"], answer: 2 },
  { id: 59, segment: "Technology", difficulty: "hard", question: "What does 'API' stand for in software development?", options: ["Application Programming Interface", "Automated Program Integration", "Application Process Interchange", "Advanced Programming Instruction"], answer: 0 },
  { id: 60, segment: "Technology", difficulty: "hard", question: "Who invented the World Wide Web?", options: ["Vint Cerf", "Tim Berners-Lee", "Robert Cailliau", "Marc Andreessen"], answer: 1 },

  // ==========================================
  //  BUSINESS — EASY (61–70)
  // ==========================================
  { id: 61, segment: "Business", difficulty: "easy", question: "What does 'CEO' stand for?", options: ["Chief Executive Officer", "Chief Economic Organizer", "Corporate Executive Officer", "Central Executive Operations"], answer: 0 },
  { id: 62, segment: "Business", difficulty: "easy", question: "Who is the founder of Amazon?", options: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Mark Zuckerberg"], answer: 1 },
  { id: 63, segment: "Business", difficulty: "easy", question: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], answer: 2 },
  { id: 64, segment: "Business", difficulty: "easy", question: "Wall Street, the famous financial district, is located in which city?", options: ["New York City", "London", "Chicago", "Los Angeles"], answer: 0 },
  { id: 65, segment: "Business", difficulty: "easy", question: "What does 'GDP' stand for?", options: ["General Domestic Product", "Gross Domestic Product", "Grand Development Plan", "Global Development Program"], answer: 1 },
  { id: 66, segment: "Business", difficulty: "easy", question: "Who is the CEO of Tesla?", options: ["Tim Cook", "Elon Musk", "Sundar Pichai", "Satya Nadella"], answer: 1 },
  { id: 67, segment: "Business", difficulty: "easy", question: "What is the world's largest e-commerce company by revenue?", options: ["Alibaba", "Amazon", "eBay", "Shopify"], answer: 1 },
  { id: 68, segment: "Business", difficulty: "easy", question: "Which term describes a general rise in the price level of goods and services?", options: ["Deflation", "Inflation", "Recession", "Depression"], answer: 1 },
  { id: 69, segment: "Business", difficulty: "easy", question: "Which country has the largest economy by nominal GDP?", options: ["United States", "China", "Japan", "Germany"], answer: 0 },
  { id: 70, segment: "Business", difficulty: "easy", question: "What does the 'S' in 'SME' stand for?", options: ["Standard", "Small", "Strategic", "Sustainable"], answer: 1 },

  // ==========================================
  //  BUSINESS — MEDIUM (71–80)
  // ==========================================
  { id: 71, segment: "Business", difficulty: "medium", question: "What does 'IPO' stand for?", options: ["Internal Public Offering", "Initial Price Offering", "Initial Public Offering", "International Profit Order"], answer: 2 },
  { id: 72, segment: "Business", difficulty: "medium", question: "Which economist introduced the concept of the 'invisible hand'?", options: ["John Keynes", "Adam Smith", "Karl Marx", "Milton Friedman"], answer: 1 },
  { id: 73, segment: "Business", difficulty: "medium", question: "What is the central bank of the United States called?", options: ["Bank of America", "Federal Reserve", "US Treasury", "Wall Street Bank"], answer: 1 },
  { id: 74, segment: "Business", difficulty: "medium", question: "Who is the chairman and CEO of Berkshire Hathaway?", options: ["Warren Buffett", "Charlie Munger", "Ray Dalio", "George Soros"], answer: 0 },
  { id: 75, segment: "Business", difficulty: "medium", question: "What does 'FDI' stand for?", options: ["Federal Deposit Insurance", "Foreign Direct Investment", "Financial Development Index", "Fixed Deposit Interest"], answer: 1 },
  { id: 76, segment: "Business", difficulty: "medium", question: "What does 'ROI' stand for in business?", options: ["Rate of Inflation", "Return on Investment", "Revenue of Income", "Record of Interest"], answer: 1 },
  { id: 77, segment: "Business", difficulty: "medium", question: "What does 'OPEC' stand for?", options: ["Organization of Petroleum Exporting Countries", "Office of Public Economic Commerce", "Organization of Private Enterprise Cooperation", "Overseas Petroleum Exchange Commission"], answer: 0 },
  { id: 78, segment: "Business", difficulty: "medium", question: "Where is the headquarters of the World Bank?", options: ["New York", "Geneva", "Washington, D.C.", "London"], answer: 2 },
  { id: 79, segment: "Business", difficulty: "medium", question: "What are 'blue chip' stocks?", options: ["New startup stocks", "Government bonds", "Shares of large, well-established companies", "Penny stocks"], answer: 2 },
  { id: 80, segment: "Business", difficulty: "medium", question: "What does 'B2B' stand for in commerce?", options: ["Business to Business", "Back to Back", "Brand to Brand", "Buy to Build"], answer: 0 },

  // ==========================================
  //  BUSINESS — HARD (81–90)
  // ==========================================
  { id: 81, segment: "Business", difficulty: "hard", question: "Who wrote 'The Wealth of Nations', considered a foundational work of economics?", options: ["David Ricardo", "Adam Smith", "John Maynard Keynes", "Thomas Malthus"], answer: 1 },
  { id: 82, segment: "Business", difficulty: "hard", question: "The Keynesian school of economics is named after which economist?", options: ["Milton Friedman", "Friedrich Hayek", "John Maynard Keynes", "Adam Smith"], answer: 2 },
  { id: 83, segment: "Business", difficulty: "hard", question: "Which is considered the world's first official stock exchange?", options: ["London Stock Exchange", "New York Stock Exchange", "Tokyo Stock Exchange", "Amsterdam Stock Exchange"], answer: 3 },
  { id: 84, segment: "Business", difficulty: "hard", question: "What does the SWIFT system stand for in international banking?", options: ["Secure Worldwide Interbank Financial Transfer", "Society for Worldwide Interbank Financial Telecommunication", "Standard Wire International Finance Technology", "System for World Integrated Financial Transactions"], answer: 1 },
  { id: 85, segment: "Business", difficulty: "hard", question: "Who coined the economic term 'creative destruction'?", options: ["Adam Smith", "Joseph Schumpeter", "Karl Marx", "John Nash"], answer: 1 },
  { id: 86, segment: "Business", difficulty: "hard", question: "The Bretton Woods Agreement of 1944 established what kind of monetary system?", options: ["Floating exchange rate", "Cryptocurrency standard", "Fixed exchange rate system", "Bartering system"], answer: 2 },
  { id: 87, segment: "Business", difficulty: "hard", question: "The Laffer Curve illustrates the relationship between what two variables?", options: ["Supply and demand", "Tax rates and tax revenue", "Inflation and unemployment", "Interest rates and GDP"], answer: 1 },
  { id: 88, segment: "Business", difficulty: "hard", question: "Who authored the 'Black Swan' theory about unpredictable, high-impact events?", options: ["Daniel Kahneman", "Nassim Nicholas Taleb", "Malcolm Gladwell", "Steven Levitt"], answer: 1 },
  { id: 89, segment: "Business", difficulty: "hard", question: "What is a 'unicorn' in the startup/business world?", options: ["A company over 100 years old", "A privately held startup valued at over $1 billion", "A company with no employees", "A bankrupt company that recovered"], answer: 1 },
  { id: 90, segment: "Business", difficulty: "hard", question: "The Phillips Curve traditionally shows the inverse relationship between which two economic indicators?", options: ["Supply and demand", "GDP and debt", "Unemployment and inflation", "Interest rates and savings"], answer: 2 },

  // ==========================================
  //  ENTERTAINMENT — EASY (91–100)
  // ==========================================
  { id: 91,  segment: "Entertainment", difficulty: "easy", question: "Who played Iron Man in the Marvel Cinematic Universe?", options: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"], answer: 0 },
  { id: 92,  segment: "Entertainment", difficulty: "easy", question: "Who is the author of the Harry Potter book series?", options: ["Suzanne Collins", "J.K. Rowling", "J.R.R. Tolkien", "Rick Riordan"], answer: 1 },
  { id: 93,  segment: "Entertainment", difficulty: "easy", question: "Which singer is known as the 'King of Pop'?", options: ["Elvis Presley", "Prince", "Michael Jackson", "Freddie Mercury"], answer: 2 },
  { id: 94,  segment: "Entertainment", difficulty: "easy", question: "Which animated film features the song 'Let It Go'?", options: ["Moana", "Tangled", "Frozen", "Coco"], answer: 2 },
  { id: 95,  segment: "Entertainment", difficulty: "easy", question: "The TV show 'Friends' is set in which city?", options: ["New York City", "Los Angeles", "Chicago", "Boston"], answer: 0 },
  { id: 96,  segment: "Entertainment", difficulty: "easy", question: "Which band performed the iconic song 'Bohemian Rhapsody'?", options: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"], answer: 1 },
  { id: 97,  segment: "Entertainment", difficulty: "easy", question: "Which Disney film features a character named Simba?", options: ["Aladdin", "The Jungle Book", "The Lion King", "Bambi"], answer: 2 },
  { id: 98,  segment: "Entertainment", difficulty: "easy", question: "Which social media platform is famous for short-form video content?", options: ["Facebook", "LinkedIn", "TikTok", "Twitter"], answer: 2 },
  { id: 99,  segment: "Entertainment", difficulty: "easy", question: "Which superhero is also known as 'The Dark Knight'?", options: ["Superman", "Spider-Man", "Batman", "Iron Man"], answer: 2 },
  { id: 100, segment: "Entertainment", difficulty: "easy", question: "Which movie franchise features a character named Jack Sparrow?", options: ["Harry Potter", "Pirates of the Caribbean", "Lord of the Rings", "Indiana Jones"], answer: 1 },

  // ==========================================
  //  ENTERTAINMENT — MEDIUM (101–110)
  // ==========================================
  { id: 101, segment: "Entertainment", difficulty: "medium", question: "Who directed the films 'Inception' and 'Interstellar'?", options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Ridley Scott"], answer: 1 },
  { id: 102, segment: "Entertainment", difficulty: "medium", question: "Which TV series features the fictional character Walter White?", options: ["The Wire", "Breaking Bad", "Better Call Saul", "Narcos"], answer: 1 },
  { id: 103, segment: "Entertainment", difficulty: "medium", question: "Which Japanese animation studio produced 'Spirited Away'?", options: ["Toei Animation", "Studio Ghibli", "Madhouse", "Sunrise"], answer: 1 },
  { id: 104, segment: "Entertainment", difficulty: "medium", question: "The Beatles originated from which English city?", options: ["London", "Liverpool", "Manchester", "Birmingham"], answer: 1 },
  { id: 105, segment: "Entertainment", difficulty: "medium", question: "The TV show 'Game of Thrones' is based on which book series?", options: ["The Wheel of Time", "A Song of Ice and Fire", "The Kingkiller Chronicle", "Malazan Book of the Fallen"], answer: 1 },
  { id: 106, segment: "Entertainment", difficulty: "medium", question: "Which Netflix series is set in the fictional town of Hawkins, Indiana in the 1980s?", options: ["Dark", "Stranger Things", "The OA", "Ozark"], answer: 1 },
  { id: 107, segment: "Entertainment", difficulty: "medium", question: "Which K-pop group released the hit songs 'Dynamite' and 'Butter'?", options: ["BLACKPINK", "BTS", "EXO", "TWICE"], answer: 1 },
  { id: 108, segment: "Entertainment", difficulty: "medium", question: "Who directed 'The Godfather'?", options: ["Martin Scorsese", "Francis Ford Coppola", "Stanley Kubrick", "Alfred Hitchcock"], answer: 1 },
  { id: 109, segment: "Entertainment", difficulty: "medium", question: "'The Shawshank Redemption' is based on a novella by which author?", options: ["John Grisham", "Stephen King", "Michael Crichton", "Dan Brown"], answer: 1 },
  { id: 110, segment: "Entertainment", difficulty: "medium", question: "Which singer has the most Grammy Award wins of all time?", options: ["Adele", "Taylor Swift", "Beyoncé", "Stevie Wonder"], answer: 2 },

  // ==========================================
  //  ENTERTAINMENT — HARD (111–120)
  // ==========================================
  { id: 111, segment: "Entertainment", difficulty: "hard", question: "What was the first full-length animated feature film ever released?", options: ["Snow White and the Seven Dwarfs", "Fantasia", "Pinocchio", "Bambi"], answer: 0 },
  { id: 112, segment: "Entertainment", difficulty: "hard", question: "Who directed the 1941 classic film 'Citizen Kane'?", options: ["Alfred Hitchcock", "Orson Welles", "Billy Wilder", "John Ford"], answer: 1 },
  { id: 113, segment: "Entertainment", difficulty: "hard", question: "Which is the longest-running Broadway musical in history?", options: ["Les Misérables", "The Phantom of the Opera", "Chicago", "Cats"], answer: 1 },
  { id: 114, segment: "Entertainment", difficulty: "hard", question: "Which film is credited as the first Indian feature film (Bollywood)?", options: ["Alam Ara", "Raja Harishchandra", "Devdas", "Mother India"], answer: 1 },
  { id: 115, segment: "Entertainment", difficulty: "hard", question: "Who directed the 1994 film 'Pulp Fiction'?", options: ["Martin Scorsese", "David Fincher", "Quentin Tarantino", "Coen Brothers"], answer: 2 },
  { id: 116, segment: "Entertainment", difficulty: "hard", question: "Which film won the very first Academy Award for Best Picture?", options: ["Wings", "Sunrise", "The Jazz Singer", "All Quiet on the Western Front"], answer: 0 },
  { id: 117, segment: "Entertainment", difficulty: "hard", question: "Who directed the 1968 science fiction classic '2001: A Space Odyssey'?", options: ["Ridley Scott", "Steven Spielberg", "Stanley Kubrick", "George Lucas"], answer: 2 },
  { id: 118, segment: "Entertainment", difficulty: "hard", question: "Which legendary rock band performed 'Stairway to Heaven'?", options: ["Pink Floyd", "Led Zeppelin", "The Rolling Stones", "Deep Purple"], answer: 1 },
  { id: 119, segment: "Entertainment", difficulty: "hard", question: "Who was the first actor to portray James Bond on film?", options: ["Roger Moore", "Sean Connery", "Timothy Dalton", "George Lazenby"], answer: 1 },
  { id: 120, segment: "Entertainment", difficulty: "hard", question: "Which film won the Academy Award for Best Picture in 2020 (for the 2019 ceremony)?", options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"], answer: 2 },

  // ==========================================
  //  SCIENCE — EASY (121–130)
  // ==========================================
  { id: 121, segment: "Science", difficulty: "easy", question: "What is the chemical formula for water?", options: ["CO₂", "H₂O", "NaCl", "O₂"], answer: 1 },
  { id: 122, segment: "Science", difficulty: "easy", question: "Which is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], answer: 1 },
  { id: 123, segment: "Science", difficulty: "easy", question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2 },
  { id: 124, segment: "Science", difficulty: "easy", question: "Which star is closest to Earth?", options: ["Proxima Centauri", "The Sun", "Sirius", "Alpha Centauri"], answer: 1 },
  { id: 125, segment: "Science", difficulty: "easy", question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Dynamic Nuclear Acid", "Di-Nucleic Arrangement", "Dense Neutron Atom"], answer: 0 },
  { id: 126, segment: "Science", difficulty: "easy", question: "What are the three common states of matter?", options: ["Solid, Liquid, Gas", "Solid, Liquid, Plasma", "Gas, Plasma, Energy", "Liquid, Steam, Ice"], answer: 0 },
  { id: 127, segment: "Science", difficulty: "easy", question: "Who is credited with discovering the law of gravity?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], answer: 1 },
  { id: 128, segment: "Science", difficulty: "easy", question: "How many bones are in the adult human body?", options: ["196", "206", "216", "186"], answer: 1 },
  { id: 129, segment: "Science", difficulty: "easy", question: "Which planet is known as the 'Red Planet'?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: 1 },
  { id: 130, segment: "Science", difficulty: "easy", question: "What gas do plants absorb from the atmosphere during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },

  // ==========================================
  //  SCIENCE — MEDIUM (131–140)
  // ==========================================
  { id: 131, segment: "Science", difficulty: "medium", question: "What is the mitochondria commonly known as?", options: ["Brain of the cell", "Powerhouse of the cell", "Factory of the cell", "Shield of the cell"], answer: 1 },
  { id: 132, segment: "Science", difficulty: "medium", question: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Oxygen"], answer: 1 },
  { id: 133, segment: "Science", difficulty: "medium", question: "Who developed the theory of general relativity?", options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"], answer: 2 },
  { id: 134, segment: "Science", difficulty: "medium", question: "What does the pH scale measure?", options: ["Temperature", "Pressure", "Acidity or alkalinity", "Density"], answer: 2 },
  { id: 135, segment: "Science", difficulty: "medium", question: "What does a 'light-year' measure?", options: ["Time", "Speed", "Distance", "Brightness"], answer: 2 },
  { id: 136, segment: "Science", difficulty: "medium", question: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Skin", "Heart"], answer: 2 },
  { id: 137, segment: "Science", difficulty: "medium", question: "What is the speed of sound in air at sea level approximately?", options: ["150 m/s", "343 m/s", "500 m/s", "700 m/s"], answer: 1 },
  { id: 138, segment: "Science", difficulty: "medium", question: "What is the hardest known natural substance?", options: ["Titanium", "Quartz", "Diamond", "Sapphire"], answer: 2 },
  { id: 139, segment: "Science", difficulty: "medium", question: "The elements in the periodic table are primarily arranged by what?", options: ["Atomic mass", "Atomic number", "Electron count", "Alphabetical order"], answer: 1 },
  { id: 140, segment: "Science", difficulty: "medium", question: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], answer: 2 },

  // ==========================================
  //  SCIENCE — HARD (141–150)
  // ==========================================
  { id: 141, segment: "Science", difficulty: "hard", question: "The Heisenberg Uncertainty Principle states that you cannot simultaneously know both what properties of a particle?", options: ["Mass and charge", "Position and momentum", "Speed and size", "Energy and frequency"], answer: 1 },
  { id: 142, segment: "Science", difficulty: "hard", question: "What does CRISPR stand for in genetics?", options: ["Cellular RNA In-Situ Processing Reaction", "Clustered Regularly Interspaced Short Palindromic Repeats", "Critical Revision of Inherited Sequences Protocol", "Chromosome Repair and Integration System Protocol"], answer: 1 },
  { id: 143, segment: "Science", difficulty: "hard", question: "The Schrödinger's cat thought experiment illustrates which quantum concept?", options: ["Quantum entanglement", "Wave-particle duality", "Quantum superposition", "Quantum tunneling"], answer: 2 },
  { id: 144, segment: "Science", difficulty: "hard", question: "Hubble's Law describes the relationship between a galaxy's distance and its what?", options: ["Size", "Brightness", "Recession velocity", "Temperature"], answer: 2 },
  { id: 145, segment: "Science", difficulty: "hard", question: "What is Avogadro's number approximately equal to?", options: ["6.022 × 10²³", "3.14 × 10⁸", "1.602 × 10⁻¹⁹", "9.81 × 10¹"], answer: 0 },
  { id: 146, segment: "Science", difficulty: "hard", question: "The double-slit experiment primarily demonstrates which concept in physics?", options: ["Gravity waves", "Nuclear fission", "Wave-particle duality", "Conservation of energy"], answer: 2 },
  { id: 147, segment: "Science", difficulty: "hard", question: "Who discovered penicillin?", options: ["Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Robert Koch"], answer: 1 },
  { id: 148, segment: "Science", difficulty: "hard", question: "What is Planck's constant approximately equal to?", options: ["6.626 × 10⁻³⁴ J·s", "3.0 × 10⁸ m/s", "1.38 × 10⁻²³ J/K", "9.109 × 10⁻³¹ kg"], answer: 0 },
  { id: 149, segment: "Science", difficulty: "hard", question: "What type of particle does beta-minus decay emit?", options: ["Proton", "Neutron", "Electron", "Positron"], answer: 2 },
  { id: 150, segment: "Science", difficulty: "hard", question: "What is the SI unit of electric current?", options: ["Volt", "Watt", "Ampere", "Ohm"], answer: 2 },

  // ==========================================
  //  GENERAL KNOWLEDGE — EASY (151–160)
  // ==========================================
  { id: 151, segment: "General Knowledge", difficulty: "easy", question: "What is the capital city of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: 2 },
  { id: 152, segment: "General Knowledge", difficulty: "easy", question: "Which is the largest continent by area?", options: ["Africa", "Asia", "North America", "Europe"], answer: 1 },
  { id: 153, segment: "General Knowledge", difficulty: "easy", question: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 },
  { id: 154, segment: "General Knowledge", difficulty: "easy", question: "What is the currency of the United Kingdom?", options: ["Euro", "Dollar", "Pound Sterling", "Franc"], answer: 2 },
  { id: 155, segment: "General Knowledge", difficulty: "easy", question: "Where is the headquarters of the United Nations?", options: ["Geneva", "New York City", "London", "Washington D.C."], answer: 1 },
  { id: 156, segment: "General Knowledge", difficulty: "easy", question: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: 2 },
  { id: 157, segment: "General Knowledge", difficulty: "easy", question: "Which country is known as the 'Land of the Rising Sun'?", options: ["China", "Japan", "South Korea", "Thailand"], answer: 1 },
  { id: 158, segment: "General Knowledge", difficulty: "easy", question: "How many colors are in a rainbow?", options: ["5", "6", "7", "8"], answer: 2 },
  { id: 159, segment: "General Knowledge", difficulty: "easy", question: "In which country is the Great Wall located?", options: ["India", "Japan", "China", "Mongolia"], answer: 2 },
  { id: 160, segment: "General Knowledge", difficulty: "easy", question: "What is the largest hot desert in the world?", options: ["Arabian Desert", "Gobi Desert", "Sahara Desert", "Kalahari Desert"], answer: 2 },

  // ==========================================
  //  GENERAL KNOWLEDGE — MEDIUM (161–170)
  // ==========================================
  { id: 161, segment: "General Knowledge", difficulty: "medium", question: "What is the smallest country in the world by area?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: 1 },
  { id: 162, segment: "General Knowledge", difficulty: "medium", question: "What is the currency of Bangladesh?", options: ["Rupee", "Taka", "Ringgit", "Baht"], answer: 1 },
  { id: 163, segment: "General Knowledge", difficulty: "medium", question: "In which European country did the Renaissance begin?", options: ["France", "England", "Italy", "Spain"], answer: 2 },
  { id: 164, segment: "General Knowledge", difficulty: "medium", question: "The Dead Sea is located between which two countries?", options: ["Egypt and Libya", "Israel and Jordan", "Turkey and Syria", "Iran and Iraq"], answer: 1 },
  { id: 165, segment: "General Knowledge", difficulty: "medium", question: "What is the longest river in the world?", options: ["Amazon", "Mississippi", "Nile", "Yangtze"], answer: 2 },
  { id: 166, segment: "General Knowledge", difficulty: "medium", question: "Mount Everest is part of which mountain range?", options: ["Andes", "Alps", "Rockies", "Himalayas"], answer: 3 },
  { id: 167, segment: "General Knowledge", difficulty: "medium", question: "Where is the International Court of Justice located?", options: ["Geneva", "New York", "The Hague", "Brussels"], answer: 2 },
  { id: 168, segment: "General Knowledge", difficulty: "medium", question: "Which language has the most native speakers in the world?", options: ["English", "Mandarin Chinese", "Spanish", "Hindi"], answer: 1 },
  { id: 169, segment: "General Knowledge", difficulty: "medium", question: "Which city is known as the 'City of Love'?", options: ["Rome", "Venice", "Paris", "Vienna"], answer: 2 },
  { id: 170, segment: "General Knowledge", difficulty: "medium", question: "How many standard time zones are there in the world?", options: ["12", "18", "24", "36"], answer: 2 },

  // ==========================================
  //  GENERAL KNOWLEDGE — HARD (171–180)
  // ==========================================
  { id: 171, segment: "General Knowledge", difficulty: "hard", question: "The Treaty of Westphalia, which established the concept of state sovereignty, was signed in which year?", options: ["1555", "1648", "1715", "1789"], answer: 1 },
  { id: 172, segment: "General Knowledge", difficulty: "hard", question: "The Rosetta Stone is inscribed in how many scripts?", options: ["2", "3", "4", "5"], answer: 1 },
  { id: 173, segment: "General Knowledge", difficulty: "hard", question: "The ancient Silk Road trading route originated in which country?", options: ["India", "Persia", "China", "Mongolia"], answer: 2 },
  { id: 174, segment: "General Knowledge", difficulty: "hard", question: "The Magna Carta was sealed in which year?", options: ["1066", "1215", "1348", "1492"], answer: 1 },
  { id: 175, segment: "General Knowledge", difficulty: "hard", question: "The philosophical statement 'Cogito, ergo sum' (I think, therefore I am) was made by whom?", options: ["Aristotle", "Immanuel Kant", "René Descartes", "Socrates"], answer: 2 },
  { id: 176, segment: "General Knowledge", difficulty: "hard", question: "In which year did the Berlin Wall fall?", options: ["1987", "1989", "1991", "1993"], answer: 1 },
  { id: 177, segment: "General Knowledge", difficulty: "hard", question: "Who was the first woman to travel to space?", options: ["Sally Ride", "Valentina Tereshkova", "Mae Jemison", "Svetlana Savitskaya"], answer: 1 },
  { id: 178, segment: "General Knowledge", difficulty: "hard", question: "The Mariana Trench, the deepest oceanic trench, is located in which ocean?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: 2 },
  { id: 179, segment: "General Knowledge", difficulty: "hard", question: "The constructed language Esperanto was created by whom?", options: ["Noam Chomsky", "L. L. Zamenhof", "Ferdinand de Saussure", "J.R.R. Tolkien"], answer: 1 },
  { id: 180, segment: "General Knowledge", difficulty: "hard", question: "Who painted 'The Starry Night'?", options: ["Claude Monet", "Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci"], answer: 2 }
];


// ============================================
// GAME STATE
// ============================================

let gameState = {
  participantName: "",
  selectedSegment: "",
  currentDifficulty: "easy",
  correctInLevel: 0,
  questionNumberInLevel: 0,
  currentQuestion: null,
  usedQuestions: [],
  isAnswered: false,
  adminVerified: false
};

// ============================================
// LOCALSTORAGE MANAGEMENT
// ============================================

function loadUsedQuestions() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.usedQuestions);
    gameState.usedQuestions = data ? JSON.parse(data) : [];
  } catch (e) {
    gameState.usedQuestions = [];
  }
}

function saveUsedQuestions() {
  try {
    localStorage.setItem(STORAGE_KEYS.usedQuestions, JSON.stringify(gameState.usedQuestions));
  } catch (e) {
    console.error("Failed to save used questions:", e);
  }
}

function loadEventStats() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.eventStats);
    return data ? JSON.parse(data) : { totalParticipants: 0, qualified: 0, eliminated: 0 };
  } catch (e) {
    return { totalParticipants: 0, qualified: 0, eliminated: 0 };
  }
}

function saveEventStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEYS.eventStats, JSON.stringify(stats));
  } catch (e) {
    console.error("Failed to save event stats:", e);
  }
}

function recordParticipant(result) {
  const stats = loadEventStats();
  stats.totalParticipants++;
  if (result === "qualified") {
    stats.qualified++;
  } else {
    stats.eliminated++;
  }
  saveEventStats(stats);
}

// ============================================
// QUESTION MANAGEMENT
// ============================================

function getUnusedQuestions(segment, difficulty) {
  return questionBank.filter(function(q) {
    return q.segment === segment &&
           q.difficulty === difficulty &&
           gameState.usedQuestions.indexOf(q.id) === -1;
  });
}

function getRandomQuestion(segment, difficulty) {
  const available = getUnusedQuestions(segment, difficulty);
  if (available.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

function markQuestionAsUsed(questionId) {
  if (gameState.usedQuestions.indexOf(questionId) === -1) {
    gameState.usedQuestions.push(questionId);
    saveUsedQuestions();
  }
}

// ============================================
// SCREEN MANAGEMENT
// ============================================

function showScreen(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll(".screen");
  screens.forEach(function(s) {
    s.classList.remove("active");
  });

  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    // Force reflow for animation
    void target.offsetWidth;
    target.classList.add("active");
  }
}

// ============================================
// WELCOME & NAME ENTRY
// ============================================

function submitName() {
  const input = document.getElementById("participant-name");
  const error = document.getElementById("name-error");
  const name = input.value.trim();

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
  gameState.participantName = name;

  // Update greeting on segment screen
  document.getElementById("segment-greeting").textContent = "Welcome, " + name + "!";

  // Render segment cards
  renderSegments();

  showScreen("screen-segment");
}

// ============================================
// SEGMENT SELECTION
// ============================================

function renderSegments() {
  const grid = document.getElementById("segment-grid");
  grid.innerHTML = "";

  SEGMENTS.forEach(function(seg, index) {
    // Check if enough easy questions are available to start
    const easyAvail = getUnusedQuestions(seg.name, "easy").length;
    const canStart = easyAvail >= LEVEL_REQUIREMENTS.easy;

    const card = document.createElement("div");
    card.className = "segment-card" + (!canStart ? " segment-unavailable" : "");
    card.style.animationDelay = (index * 0.06) + "s";
    card.innerHTML =
      '<span class="segment-icon">' + seg.icon + '</span>' +
      '<h3 class="segment-name">' + seg.name + '</h3>' +
      '<p class="segment-desc">' + seg.description + '</p>';

    if (canStart) {
      card.onclick = function() { selectSegment(seg.name); };
    }

    grid.appendChild(card);
  });
}

function selectSegment(segmentName) {
  gameState.selectedSegment = segmentName;

  // Update confirmation screen
  document.getElementById("confirm-name").textContent = gameState.participantName;
  document.getElementById("confirm-segment").textContent = segmentName;

  showScreen("screen-confirm");
}

// ============================================
// CHALLENGE START
// ============================================

function startChallenge() {
  gameState.currentDifficulty = "easy";
  gameState.correctInLevel = 0;
  gameState.questionNumberInLevel = 0;
  gameState.isAnswered = false;
  gameState.currentQuestion = null;

  // Update quiz header info
  document.getElementById("quiz-participant").textContent = gameState.participantName;
  document.getElementById("quiz-segment-badge").textContent = gameState.selectedSegment;

  showScreen("screen-quiz");
  loadQuestion();
}

// ============================================
// QUIZ — QUESTION LOADING
// ============================================

function loadQuestion() {
  gameState.isAnswered = false;
  gameState.questionNumberInLevel++;

  const question = getRandomQuestion(gameState.selectedSegment, gameState.currentDifficulty);

  if (!question) {
    // No more questions available
    endGameNoQuestions();
    return;
  }

  gameState.currentQuestion = question;
  markQuestionAsUsed(question.id);

  // Update level badge
  updateLevelBadge();

  // Update progress
  const required = LEVEL_REQUIREMENTS[gameState.currentDifficulty];
  document.getElementById("quiz-progress-text").textContent =
    "Question " + gameState.questionNumberInLevel + " of " + required;
  document.getElementById("quiz-progress-fill").style.width =
    ((gameState.correctInLevel / required) * 100) + "%";

  // Update question number label
  const totalQuestionNum = gameState.correctInLevel + 1;
  document.getElementById("question-number").textContent = "QUESTION " + totalQuestionNum;

  // Update question text
  document.getElementById("question-text").textContent = question.question;

  // Render options
  renderOptions(question);

  // Animate question card
  const qCard = document.getElementById("question-card");
  qCard.style.animation = "none";
  void qCard.offsetWidth;
  qCard.style.animation = "cardEnter 0.4s var(--ease) both";
}

function renderOptions(question) {
  const grid = document.getElementById("options-grid");
  grid.innerHTML = "";
  const letters = ["A", "B", "C", "D"];

  question.options.forEach(function(optText, i) {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.style.animationDelay = (0.08 + i * 0.06) + "s";
    btn.innerHTML =
      '<span class="option-letter">' + letters[i] + '</span>' +
      '<span class="option-text">' + optText + '</span>';
    btn.onclick = function() { checkAnswer(i); };
    grid.appendChild(btn);
  });
}

function updateLevelBadge() {
  const badge = document.getElementById("quiz-level-badge");
  badge.textContent = gameState.currentDifficulty.toUpperCase();
  badge.className = "quiz-level-badge level-" + gameState.currentDifficulty;
}

// ============================================
// QUIZ — ANSWER CHECKING
// ============================================

function checkAnswer(selectedIndex) {
  if (gameState.isAnswered) return;
  gameState.isAnswered = true;

  const question = gameState.currentQuestion;
  const isCorrect = selectedIndex === question.answer;

  // Disable all options
  disableAllOptions();

  // Highlight selected option
  const options = document.querySelectorAll(".option-btn");
  if (isCorrect) {
    options[selectedIndex].classList.add("option-correct");
    showFeedbackOverlay(true);
    handleCorrectAnswer();
  } else {
    options[selectedIndex].classList.add("option-wrong");
    showFeedbackOverlay(false);
    handleWrongAnswer();
  }
}

function disableAllOptions() {
  const options = document.querySelectorAll(".option-btn");
  options.forEach(function(btn) {
    btn.classList.add("option-disabled");
  });
}

function showFeedbackOverlay(isCorrect) {
  const overlay = document.getElementById("feedback-overlay");
  const icon = document.getElementById("feedback-icon");
  const text = document.getElementById("feedback-text");

  overlay.className = "feedback-overlay show " +
    (isCorrect ? "feedback-correct" : "feedback-wrong");

  icon.textContent = isCorrect ? "✓" : "✕";
  text.textContent = isCorrect ? "CORRECT!" : "WRONG ANSWER";
}

function hideFeedbackOverlay() {
  const overlay = document.getElementById("feedback-overlay");
  overlay.className = "feedback-overlay";
}

// ============================================
// QUIZ — CORRECT ANSWER
// ============================================

function handleCorrectAnswer() {
  gameState.correctInLevel++;

  setTimeout(function() {
    hideFeedbackOverlay();

    const required = LEVEL_REQUIREMENTS[gameState.currentDifficulty];

    if (gameState.correctInLevel >= required) {
      // Level complete!
      advanceLevel();
    } else {
      // Next question in same level
      loadQuestion();
    }
  }, TIMING.correctFeedback);
}

// ============================================
// QUIZ — WRONG ANSWER
// ============================================

function handleWrongAnswer() {
  setTimeout(function() {
    hideFeedbackOverlay();
    endGame("eliminated");
  }, TIMING.wrongFeedback);
}

// ============================================
// LEVEL ADVANCEMENT
// ============================================

function advanceLevel() {
  const currentIndex = DIFFICULTIES.indexOf(gameState.currentDifficulty);

  if (currentIndex >= DIFFICULTIES.length - 1) {
    // Hard completed — WINNER!
    endGame("qualified");
    return;
  }

  const clearedLevel = gameState.currentDifficulty;
  const nextLevel = DIFFICULTIES[currentIndex + 1];

  // Check if enough questions exist for the next level
  const nextAvail = getUnusedQuestions(gameState.selectedSegment, nextLevel).length;
  if (nextAvail < LEVEL_REQUIREMENTS[nextLevel]) {
    // Not enough questions for next level
    endGameNoQuestions();
    return;
  }

  // Show transition screen
  showLevelTransition(clearedLevel, nextLevel);
}

function showLevelTransition(clearedLevel, nextLevel) {
  const title = document.getElementById("transition-title");
  const subtitle = document.getElementById("transition-subtitle");
  const icon = document.getElementById("transition-icon");

  title.textContent = clearedLevel.toUpperCase() + " CLEARED!";

  if (nextLevel === "medium") {
    icon.textContent = "🔓";
    subtitle.textContent = "MEDIUM level is now unlocked. Get ready!";
  } else if (nextLevel === "hard") {
    icon.textContent = "🔥";
    subtitle.textContent = "HARD MODE unlocked. This is where it gets real!";
  }

  // Update progress nodes
  updateTransitionProgress(clearedLevel, nextLevel);

  // Store next level for continue button
  document.getElementById("transition-btn").setAttribute("data-next", nextLevel);

  showScreen("screen-transition");
}

function updateTransitionProgress(clearedLevel, nextLevel) {
  const easyNode = document.getElementById("tl-easy");
  const mediumNode = document.getElementById("tl-medium");
  const hardNode = document.getElementById("tl-hard");
  const conn1 = document.getElementById("tc-1");
  const conn2 = document.getElementById("tc-2");

  // Reset all
  [easyNode, mediumNode, hardNode].forEach(function(n) {
    n.className = "level-node";
  });
  [conn1, conn2].forEach(function(c) {
    c.className = "level-connector";
  });

  if (clearedLevel === "easy") {
    easyNode.classList.add("completed");
    conn1.classList.add("filled");
    mediumNode.classList.add("current");
  } else if (clearedLevel === "medium") {
    easyNode.classList.add("completed");
    conn1.classList.add("filled");
    mediumNode.classList.add("completed");
    conn2.classList.add("filled");
    hardNode.classList.add("current");
  }
}

function continueAfterTransition() {
  const nextLevel = document.getElementById("transition-btn").getAttribute("data-next");
  gameState.currentDifficulty = nextLevel;
  gameState.correctInLevel = 0;
  gameState.questionNumberInLevel = 0;

  showScreen("screen-quiz");
  loadQuestion();
}

// ============================================
// GAME END
// ============================================

function endGame(result) {
  // Record stats
  recordParticipant(result);

  if (result === "qualified") {
    showWinnerScreen();
  } else {
    showOutScreen();
  }
}

function endGameNoQuestions() {
  recordParticipant("eliminated");

  document.getElementById("out-title").textContent = "NO MORE QUESTIONS";
  document.getElementById("out-message").textContent =
    "All questions in this category have been used. Please try another segment.";
  document.getElementById("out-name").textContent = gameState.participantName;
  document.getElementById("out-segment").textContent = gameState.selectedSegment;
  document.getElementById("out-level").textContent = capitalize(gameState.currentDifficulty);

  showScreen("screen-out");
}

function showOutScreen() {
  document.getElementById("out-title").textContent = "CHALLENGE OVER";
  document.getElementById("out-message").textContent = "Better luck next time!";
  document.getElementById("out-name").textContent = gameState.participantName;
  document.getElementById("out-segment").textContent = gameState.selectedSegment;
  document.getElementById("out-level").textContent = capitalize(gameState.currentDifficulty);

  showScreen("screen-out");
}

function showWinnerScreen() {
  document.getElementById("winner-name").textContent = gameState.participantName;
  document.getElementById("winner-segment").textContent = gameState.selectedSegment + " Challenge";

  showScreen("screen-winner");
}

// ============================================
// NEXT PARTICIPANT
// ============================================

function nextParticipant() {
  // Reset session data (NOT used questions)
  gameState.participantName = "";
  gameState.selectedSegment = "";
  gameState.currentDifficulty = "easy";
  gameState.correctInLevel = 0;
  gameState.questionNumberInLevel = 0;
  gameState.currentQuestion = null;
  gameState.isAnswered = false;

  // Clear name input
  const nameInput = document.getElementById("participant-name");
  nameInput.value = "";
  document.getElementById("name-error").textContent = "";

  // Hide any feedback overlay
  hideFeedbackOverlay();

  // Go back to name screen
  showScreen("screen-name");

  // Focus name input after animation
  setTimeout(function() {
    nameInput.focus();
  }, 500);
}

// ============================================
// ADMIN PANEL
// ============================================

function showAdminPanel() {
  const overlay = document.getElementById("admin-overlay");
  overlay.classList.add("show");

  // Reset admin state
  gameState.adminVerified = false;
  document.getElementById("admin-login").style.display = "block";
  document.getElementById("admin-content").style.display = "none";
  document.getElementById("admin-pin").value = "";
  document.getElementById("pin-error").textContent = "";
}

function hideAdminPanel() {
  const overlay = document.getElementById("admin-overlay");
  overlay.classList.remove("show");
  gameState.adminVerified = false;
}

function verifyAdminPin() {
  const pinInput = document.getElementById("admin-pin");
  const error = document.getElementById("pin-error");
  const pin = pinInput.value.trim();

  if (pin !== ADMIN_PIN) {
    error.textContent = "Incorrect PIN. Access denied.";
    pinInput.value = "";
    pinInput.focus();
    return;
  }

  error.textContent = "";
  gameState.adminVerified = true;
  document.getElementById("admin-login").style.display = "none";
  document.getElementById("admin-content").style.display = "block";

  updateAdminStats();
}

function updateAdminStats() {
  const statsContainer = document.getElementById("admin-stats");
  let html = "";

  // Summary cards
  const totalQ = questionBank.length;
  const usedQ = gameState.usedQuestions.length;
  const remainQ = totalQ - usedQ;

  html += '<div class="admin-summary">';
  html += '<div class="stat-card"><span class="stat-number">' + totalQ + '</span><span class="stat-label">Total</span></div>';
  html += '<div class="stat-card"><span class="stat-number">' + usedQ + '</span><span class="stat-label">Used</span></div>';
  html += '<div class="stat-card"><span class="stat-number">' + remainQ + '</span><span class="stat-label">Remaining</span></div>';
  html += '</div>';

  // Per-segment breakdown
  SEGMENTS.forEach(function(seg) {
    html += '<div class="admin-segment-section">';
    html += '<h3 class="admin-segment-title">' + seg.icon + ' ' + seg.name + '</h3>';

    DIFFICULTIES.forEach(function(diff) {
      const total = questionBank.filter(function(q) {
        return q.segment === seg.name && q.difficulty === diff;
      }).length;
      const remaining = getUnusedQuestions(seg.name, diff).length;
      const statusClass = remaining <= 3 ? "low" : "ok";

      html += '<div class="admin-diff-row">';
      html += '<span class="admin-diff-label">' + capitalize(diff) + '</span>';
      html += '<span class="admin-diff-value ' + statusClass + '">' + remaining + ' / ' + total + ' remaining</span>';
      html += '</div>';
    });

    html += '</div>';
  });

  // Event stats
  const eventStats = loadEventStats();
  html += '<div class="admin-event-stats">';
  html += '<h3>📊 Event Statistics</h3>';
  html += '<p>Total Participants: <strong>' + eventStats.totalParticipants + '</strong></p>';
  html += '<p>Qualified: <strong>' + eventStats.qualified + '</strong></p>';
  html += '<p>Eliminated: <strong>' + eventStats.eliminated + '</strong></p>';
  html += '</div>';

  statsContainer.innerHTML = html;
}

function confirmResetQuestions() {
  const confirmed = confirm(
    "⚠️ WARNING: This will reset ALL used questions.\n\n" +
    "Questions may repeat for future participants.\n\n" +
    "Are you absolutely sure?"
  );

  if (confirmed) {
    const doubleConfirmed = confirm(
      "FINAL CONFIRMATION:\n\n" +
      "Reset " + gameState.usedQuestions.length + " used questions?\n\n" +
      "This action cannot be undone."
    );

    if (doubleConfirmed) {
      resetUsedQuestions();
    }
  }
}

function resetUsedQuestions() {
  gameState.usedQuestions = [];
  saveUsedQuestions();
  updateAdminStats();
  alert("✅ All used questions have been reset successfully.");
}

// ============================================
// UTILITY
// ============================================

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener("keydown", function(e) {
  // Ctrl + Shift + A → Admin Panel
  if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
    e.preventDefault();
    showAdminPanel();
  }

  // Enter key on name input
  if (e.key === "Enter") {
    const nameScreen = document.getElementById("screen-name");
    if (nameScreen.classList.contains("active")) {
      submitName();
    }

    // Enter on admin PIN
    const adminOverlay = document.getElementById("admin-overlay");
    if (adminOverlay.classList.contains("show") && !gameState.adminVerified) {
      verifyAdminPin();
    }
  }

  // Escape to close admin panel
  if (e.key === "Escape") {
    const adminOverlay = document.getElementById("admin-overlay");
    if (adminOverlay.classList.contains("show")) {
      hideAdminPanel();
    }
  }
});

// ============================================
// INITIALIZATION
// ============================================

function init() {
  // Load persisted data
  loadUsedQuestions();

  // Show welcome screen
  showScreen("screen-welcome");
}

// Run on page load
document.addEventListener("DOMContentLoaded", init);
