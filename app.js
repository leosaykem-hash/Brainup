const appContent = document.getElementById('app-content');
const navLinks = document.querySelectorAll('.nav-links li');
const navDash = document.getElementById('nav-dashboard');
const navSub = document.getElementById('nav-subjects');
const navLead = document.getElementById('nav-leaderboard');
const sidebar = document.querySelector('.sidebar');
const sbAvatar = document.querySelector('.user-profile .avatar');
const sbName = document.querySelector('.user-profile .name');

const AVATARS = ['👩‍🎤', '👨‍🚀', '🥷', '👨‍🎓', '🕵️‍♀️', '🦸‍♀️', '👽', '👻', '🤖', '👾'];

const ALL_BADGES = [
  { id: 'flawless', icon: '🌟', titleTh: 'สมบูรณ์แบบ', descTh: 'ตอบถูก 100% ในชุดทดสอบ', titleEn: 'Flawless Victory', descEn: '100% on any quiz' },
  { id: 'marathon', icon: '🏃', titleTh: 'มาราธอนพลังช้าง', descTh: 'ผ่านแบบทดสอบ 50 ข้อรวด', titleEn: 'Marathon Run', descEn: 'Complete 50 questions' },
  { id: 'math_god', icon: '🔥', titleTh: 'เทพเจ้าวิชาการ', descTh: 'เก็บ XP ทะลุ 10,000 XP', titleEn: 'Academic God', descEn: 'Reach 10,000 XP' },
  { id: 'lin_master', icon: '📈', titleTh: 'ปรมาจารย์กราฟเส้น', descTh: 'ได้เต็มหมวดสมการเชิงเส้น', titleEn: 'Linear Master', descEn: '100% on Linear Eqs' },
  { id: 'calc_god', icon: '∫', titleTh: 'นักรบแคลคูลัส', descTh: 'ได้เต็มหมวดแคลคูลัส', titleEn: 'Calculus Warrior', descEn: '100% on Calculus' }
];

const RANKS = [
  { id: 'Bronze', xp: 0, icon: '🥉' },
  { id: 'Silver', xp: 2000, icon: '🥈' },
  { id: 'Gold', xp: 6000, icon: '🥇' },
  { id: 'Platinum', xp: 12000, icon: '💠' },
  { id: 'Diamond', xp: 25000, icon: '💎' },
  { id: 'Master', xp: 50000, icon: '🔥' },
  { id: 'Grandmaster', xp: 100000, icon: '💫' }
];

const state = {
  lang: 'th',
  view: 'login',
  authMode: 'login',
  user: null,
  db: {},
  quiz: {
    activeCategory: null, activeSubject: null, activeTopic: null,
    selectedTypes: [], currentQuestion: 0, score: 0, questions: [], savedScore: false, difficulty: 1
  },
  room: {
    players: [], mode: 'ffa', config: { timer: false, timerSec: 15, numQ: 10, difficulty: 1, topic: 'add' },
    questions: [], currentPlayer: 0, currentQuestion: 0, phase: 'create', timerInterval: null
  },
  publicViewUser: null,
  activeIntervals: [], activeTimeouts: []
};

let selectedAvatarId = AVATARS[3];

const i18n = {
  en: {
    nav: { dash: 'Dashboard', sub: 'Categories', lead: 'Leaderboard', prof: 'Profile & Friends', set: 'Settings', don: 'Donate/Support' },
    dash: { title: 'Welcome back', sub: "Here's your learning progress.", streak: 'Daily Streak', hours: 'Total XP', rank: 'Current Rank', badges: 'Global Achievements' },
    cats: { title: 'Major Categories', sub: 'Select a major category to explore subjects.', math: 'Mathematics', mathDesc: 'Logic, numbers, equations.', sci: 'Science', sciDesc: 'Physics, Chemistry, Biology.', lang: 'Languages', langDesc: 'Enhance your communication skills.', tech: 'Technology', techDesc: 'Computers and software frameworks.' },
    sub: { title: 'Choose a Subject', sub: 'Select a subject to see available sub-topics.', mathBasic: 'Basic Mathematics', mathAlg: 'Algebra', mathGeo: 'Geometry', mathTrig: 'Trigonometry', mathCalc: 'Calculus', mathStat: 'Statistics', phys: 'Physics', chem: 'Chemistry', bio: 'Biology', en: 'English', cs: 'CS', back: '← Back to Categories' },
    topics: {
      title: 'Study Topics', subDesc: 'Choose a specific topic to practice.',
      add: 'Addition', addDesc: 'Add integers.', subMath: 'Subtraction', subMathDesc: 'Subtract integers.', multMath: 'Multiplication', multMathDesc: 'Multiplication tables.', divMath: 'Division', divMathDesc: 'Divisions and quotients.', integer: 'Integers (+/-)', integerDesc: 'Negative numbers.', decimal: 'Decimals', decimalDesc: 'Decimals operations.', fraction: 'Fractions', fractionDesc: 'Adding fractions.', percent: 'Percentages', percentDesc: 'Percentages / discounts.',
      algLin: 'Linear Eqs', algLinDesc: 'Linear functions.', algQuad: 'Quadratics', algQuadDesc: 'Quadratic formula.', algPoly: 'Polynomials', algPolyDesc: 'Polynomials.', algMat: 'Matrices', algMatDesc: 'Matrices.', algExp: 'Exponents', algExpDesc: 'Exponents.', algLog: 'Logarithms', algLogDesc: 'Logarithms.', algIneq: 'Inequalities', algIneqDesc: 'Inequalities.', algSeq: 'Sequences', algSeqDesc: 'Sequences.',
      geoShape: 'Shapes', geoShapeDesc: 'Shapes.', geoArea: 'Area', geoAreaDesc: 'Area.', geoVol: 'Volume', geoVolDesc: 'Volume.', geoCoord: 'Coord Geometry', geoCoordDesc: 'Coord Geometry.', geoCirc: 'Circles', geoCircDesc: 'Circles.', geoVect: 'Vectors', geoVectDesc: 'Vectors.',
      trigRatio: 'Ratios', trigRatioDesc: 'Ratios.', trigId: 'Identities', trigIdDesc: 'Identities.', trigEq: 'Trig Eqs', trigEqDesc: 'Trig Eqs.', trigLaw: 'Law Sines/Cos', trigLawDesc: 'Law Sines/Cos.', trigInv: 'Inverses', trigInvDesc: 'Inverses.',
      calcLim: 'Limits', calcLimDesc: 'Limits.', calcDeriv: 'Derivatives', calcDerivDesc: 'Derivs.', calcInt: 'Integration', calcIntDesc: 'Integrals.', calcApp: 'Applications', calcAppDesc: 'Apps.', calcArea: 'Area Curve', calcAreaDesc: 'Area Curve.',
      statBasic: 'Mean/Med/Mode', statBasicDesc: 'Mean/Med/Mode.', statVar: 'Var/SD', statVarDesc: 'Var/SD.', statProb: 'Probability', statProbDesc: 'Probability.', statDist: 'Distributions', statDistDesc: 'Distributions.', statComb: 'Combinatorics', statCombDesc: 'Comb.', statZ: 'Z-Scores', statZDesc: 'Z-Scores.',
      physMech: 'Mechanics', physMechDesc: 'Newton & Forces.', physElec: 'Electricity', physElecDesc: 'Circuits.', chemPer: 'Periodic Table', chemPerDesc: 'Elements.', chemBond: 'Chemical Bonds', chemBondDesc: 'Ionic/Covalent.', bioCell: 'Cell Biology', bioCellDesc: 'Organelles.', bioHuman: 'Anatomy', bioHumanDesc: 'Body Systems.', coming: 'Content Active', comingDesc: 'Topics mapped.', back: '← Back to Subjects'
    },
    quiz: { qCount: 'Question {num} of {total}', score: 'Score: {score}', done: 'Quiz Complete!', got: 'You got {score} out of {total} correct.', earned: '+{xp} XP Earned' },
    lead: { title: 'Leaderboard', sub: 'Top scholars globally.', rank: 'Rnk', pilot: 'Pilot', score: 'Score', you: '(You)' }
  },
  th: {
    nav: { dash: 'หน้าหลัก', sub: 'หมวดหมู่หลัก', lead: 'กระดานคะแนน', prof: 'โปรไฟล์และเพื่อน', set: 'ตั้งค่า', don: 'สนับสนุนเซิฟเวอร์' },
    dash: { title: 'ยินดีต้อนรับ', sub: "สรุปข้อมูลบัญชีของคุณ", streak: 'Streak', hours: 'Total XP', rank: 'Rank', badges: 'Achievements' },
    cats: { title: 'หมวดหมู่หลัก', sub: 'เลือกหมวดหมู่ที่ต้องการ', math: 'Mathematics', mathDesc: 'พีชคณิต ตรีโกณ แคลคูลัส', sci: 'Science', sciDesc: 'ฟิสิกส์ เคมี ชีววิทยา', lang: 'Languages', langDesc: 'ทักษะภาษา', tech: 'Technology', techDesc: 'วิทยาการคอมพิวเตอร์และสถาปัตยกรรม' },
    sub: { title: 'เลือกรายวิชา', sub: 'เลือกวิชาเพื่อทำแบบทดสอบ', mathBasic: 'คณิตศาสตร์พื้นฐาน', mathAlg: 'พีชคณิต (Algebra)', mathGeo: 'เรขาคณิต (Geometry)', mathTrig: 'ตรีโกณมิติ', mathCalc: 'แคลคูลัส', mathStat: 'สถิติและความน่าจะเป็น', phys: 'ฟิสิกส์', chem: 'เคมี', bio: 'ชีววิทยา', en: 'English', cs: 'Computer Science', back: '← กลับไปหน้าหมวดหมู่' },
    topics: {
      title: 'หัวข้อย่อย', subDesc: 'เลือกหัวข้อย่อยที่ต้องการฝึกฝน',
      add: 'การบวกเลข', addDesc: 'ฝึกบวกเลข', subMath: 'การลบเลข', subMathDesc: 'ทักษะการลบเลข', multMath: 'การคูณ', multMathDesc: 'สูตรคูณต่าง', divMath: 'การหาร', divMathDesc: 'การหารลงตัว', integer: 'จำนวนเต็ม (+/-)', integerDesc: 'เลขบวก/ลบ', decimal: 'ทศนิยม', decimalDesc: 'บวกลบทศนิยม', fraction: 'เศษส่วน', fractionDesc: 'เศษส่วน', percent: 'ร้อยละ', percentDesc: 'เปอร์เซ็นต์',
      algLin: 'สมการเชิงเส้น', algLinDesc: 'สมการเชิงเส้นหลากรูปแบบ', algQuad: 'สมการกำลังสอง', algQuadDesc: 'แยกตัวประกอบ 2 วงเล็บ', algPoly: 'พหุนาม', algPolyDesc: 'พหุนามบวกลบ', algMat: 'เมทริกซ์', algMatDesc: 'กระบวนการหา Det', algExp: 'เลขยกกำลัง', algExpDesc: 'กฎเลขชี้กำลัง', algLog: 'ลอการิทึม', algLogDesc: 'สมบัติ Log', algIneq: 'อสมการ', algIneqDesc: 'เครื่องหมาย>', algSeq: 'ลำดับอนุกรม', algSeqDesc: 'อนุกรมต่างๆ',
      geoShape: 'รูปร่างและมุม', geoShapeDesc: 'คุณสมบัติต่างๆ', geoArea: 'พื้นที่/รอบรูป', geoAreaDesc: 'คำนวณพื้นที่ 2D', geoVol: 'ปริมาตร/พื้นที่ผิว', geoVolDesc: 'ทรงสามมิติ', geoCoord: 'เรขาคณิตวิเคราะห์', geoCoordDesc: 'แกนพิกัด', geoCirc: 'วงกลม', geoCircDesc: 'รัศมี', geoVect: 'เวกเตอร์', geoVectDesc: 'คุณสมบัติปริมาณเวกเตอร์',
      trigRatio: 'อัตราส่วนตรีโกณ', trigRatioDesc: 'คำนวณตรีโกณ', trigId: 'เอกลักษณ์ตรีโกณ', trigIdDesc: 'สมการตรีโกณ', trigEq: 'สมการตรีโกณมิติ', trigEqDesc: 'หาค่าตัวแปรมิติ', trigLaw: 'กฎของไซน์/โคไซน์', trigLawDesc: 'เรขาตรีโกณ', trigInv: 'ตรีโกณผกผัน', trigInvDesc: 'ฟังก์ชัน Arc',
      calcLim: 'ลิมิต/ต่อเนื่อง', calcLimDesc: 'ความเข้าใจลิมิต', calcDeriv: 'หาอนุพันธ์ (Diff)', calcDerivDesc: 'กฎลูกโซ่ กฎผลคูณ', calcInt: 'อินทิเกรต (Int)', calcIntDesc: 'อินทิกรัล', calcApp: 'ประยุกต์อนุพันธ์', calcAppDesc: 'อัตราสัมพัทธ์ ขอบเขต', calcArea: 'พื้นที่ใต้กราฟ', calcAreaDesc: 'หาพื้นที่ใต้กราฟบนแกนX',
      statBasic: 'พื้นฐานค่ากลาง', statBasicDesc: 'Mean, Median, Mode', statVar: 'ความแปรปรวน/SD', statVarDesc: 'เบี่ยงเบนมาตรฐาน', statProb: 'ความน่าจะเป็น', statProbDesc: 'ความเป็นไปได้เหตุการณ์', statDist: 'การแจกแจง', statDistDesc: 'แจกแจงปกติรูปแบบต่างๆ', statComb: 'การจัดหมู่ / สับเปลี่ยน', statCombDesc: 'nCr และ nPr', statZ: 'ค่ามาตรฐาน (Z-Score)', statZDesc: 'Z-Scores',
      physMech: 'กลศาสตร์พื้นฐาน', physMechDesc: 'กฎนิวตัน F=ma', physElec: 'ไฟฟ้าเบื้องต้น', physElecDesc: 'วงจรไฟฟ้า V=IR', chemPer: 'ตารางธาตุ', chemPerDesc: 'หมวดหมู่ธาตุ', chemBond: 'พันธะเคมี', chemBondDesc: 'พันธะไอออนิก ', bioCell: 'ชีววิทยาของเซลล์', bioCellDesc: 'เยื่อหุ้มเซลล์ ไมโทคอนเดรีย', bioHuman: 'กายวิภาค', bioHumanDesc: 'ระบบร่างกาย', coming: 'ระบบพร้อมทำงาน', comingDesc: 'มีด่านครอบคลุมทฤษฎีครบ!', back: '← กลับหน้ารายวิชา'
    },
    quiz: { qCount: 'ข้อที่ {num} / {total}', score: 'คะแนน: {score}', done: 'Completed', got: 'ถูกต้อง {score} / {total} ข้อ', earned: '+{xp} XP' },
    lead: { title: 'Leaderboard', sub: 'กระดานคะแนนอัปเดตแบบเรียลไทม์', rank: 'Rank', pilot: 'Account', score: 'Score', you: '(You)' }
  }
};

const TOPIC_CONFIGS = {
  'alg-lin': {
    th: ["สมการตัวแปรเดียว", "ความชันจากกราฟ", "จุดตัดแกน Y", "ระบบสมการเชิงเส้น 2 ตัวแปร"],
    en: ["Single variable", "Slope from graph", "y-intercept", "System of 2 linear equations"]
  },
  'calc-deriv': {
    th: ["กฎเลขยกกำลัง (Power Rule)", "กฎผลคูณและผลหาร", "กฎลูกโซ่ (Chain Rule)"],
    en: ["Power Rule", "Product and Quotient", "Chain Rule Absolute"]
  },
  'cs-py': { th: ["แกนหลักของภาษา"], en: ["Language Core"] },
  'cs-js': { th: ["แกนหลักของภาษา"], en: ["Language Core"] },
  'cs-cpp': { th: ["แกนหลักของภาษา"], en: ["Language Core"] },
  'cs-java': { th: ["แกนหลักของภาษา"], en: ["Language Core"] },
  'trig-ratio': { th: ["ข้ามฉาก-ชิดฉาก-ข้ามชิด", "วงกลมหนึ่งหน่วย", "ค่ามุมมาตรฐาน"], en: ["SOH-CAH-TOA", "Unit Circle", "Standard Angles"] },
  'trig-id': { th: ["เอกลักษณ์กำลังสอง", "สูตรมุมสองเท่า"], en: ["Pythagorean Identities", "Double Angle Formulas"] },
  'chem-per': { th: ["สมบัติธาตุตามหมู่", "แนวโน้มตารางธาตุ", "ธาตุแทรนซิชัน"], en: ["Group Properties", "Periodic Trends", "Transition Metals"] },
  'chem-bond': { th: ["พันธะไอออนิก", "พันธะโควาเลนต์", "รูปร่างโมเลกุล"], en: ["Ionic Bonding", "Covalent Bonding", "Molecular Shapes"] },
  'fraction': { th: ["การบวก/ลบ", "การคูณ/หาร", "เศษส่วนซ้อน"], en: ["Add/Sub", "Mult/Div", "Complex Fractions"] }
};

const THEORY_BANKS = {
  'bio-cell': [
    { q: { th: "(Basic) ส่วนประกอบใดควบคุมการทำงานเซลล์?", en: "Control center of the cell?" }, a: "Nucleus", o: ["Mitochondria", "Ribosome", "Golgi"], diff: 1 },
    { q: { th: "(Basic) แหล่งพลังงานของเซลล์ (Powerhouse) คือออร์แกเนลล์ใด?", en: "Powerhouse of the cell?" }, a: "Mitochondria", o: ["Nucleus", "Ribosome", "Lysosome"], diff: 1 },
    { q: { th: "(Basic) พืชมีส่วนประกอบใดที่สัตว์ไม่มี?", en: "What do plant cells have that animal cells don't?" }, a: "Chloroplast", o: ["Mitochondria", "Nucleus", "Ribosome"], diff: 1 },
    { q: { th: "(Basic) เยื่อหุ้มเซลล์มีหน้าที่หลักคืออะไร?", en: "Main function of cell membrane?" }, a: "Control entry/exit", o: ["Make energy", "Store Waste", "Shape"], diff: 1 },
    { q: { th: "(Med) กระบวนการสร้างโปรตีนเกิดขึ้นที่ใด?", en: "Protein synthesis occurs where?" }, a: "Ribosome", o: ["Nucleus", "Vacuole", "Lysosome"], diff: 2 },
    { q: { th: "(Med) ออร์แกเนลล์ใดทำหน้าที่ทำลายขยะในเซลล์?", en: "Which organelle handles waste disposal in cells?" }, a: "Lysosome", o: ["Ribosome", "Chloroplast", "Nucleolus"], diff: 2 },
    { q: { th: "(Med) กระบวนการแบ่งเซลล์ร่างกายเรียกว่า?", en: "Somatic cell division is called?" }, a: "Mitosis", o: ["Meiosis", "Binary Fission", "Budding"], diff: 2 },
    { q: { th: "(Hard) โครงสร้างใดที่มี DNA นอกเหนือจากนิวเคลียส?", en: "Which organelle has its own DNA excluding the nucleus?" }, a: "Mitochondria", o: ["Endoplasmic Reticulum", "Golgi Apparatus", "Cytoplasm"], diff: 3 },
    { q: { th: "(Hard) ขั้นตอนใดของ Mitosis ที่โครโมโซมเรียงตัวกลางเซลล์?", en: "In which Mitosis phase do chromosomes line up?" }, a: "Metaphase", o: ["Prophase", "Anaphase", "Telophase"], diff: 3 },
    { q: { th: "(Hard) โปรตีนที่ม้วนตัวเสร็จแล้วจะถูกส่งไปปรับแต่งที่ใด?", en: "Where are proteins modified after synthesis?" }, a: "Golgi Apparatus", o: ["Ribosome", "Smooth ER", "Nucleolus"], diff: 3 }
  ],
  'bio-human': [
    { q: { th: "(Basic) หัวใจมนุษย์มีกี่ห้อง?", en: "How many chambers in human heart?" }, a: "4", o: ["2", "3", "5"], diff: 1 },
    { q: { th: "(Basic) ก๊าซใดที่ร่างกายต้องการจากการหายใจเข้า?", en: "Which gas do we need from breathing in?" }, a: "Oxygen", o: ["Carbon Dioxide", "Nitrogen", "Hydrogen"], diff: 1 },
    { q: { th: "(Med) อวัยวะใดทำหน้าที่กรองของเสียออกจากเลือด?", en: "Which organ filters waste from blood?" }, a: "Kidneys", o: ["Liver", "Heart", "Lungs"], diff: 2 },
    { q: { th: "(Med) เส้นเลือดใดนำเลือดออกจากหัวใจ?", en: "Vessel carrying blood AWAY from heart?" }, a: "Artery", o: ["Vein", "Capillary", "Nerve"], diff: 2 },
    { q: { th: "(Hard) ฮอร์โมนอินซูลินถูกผลิตจากอวัยวะใด?", en: "Insulin is produced by which organ?" }, a: "Pancreas", o: ["Liver", "Spleen", "Appendix"], diff: 3 }
  ],
  'trig-ratio': [
    { q: { th: "(Basic) sin 30° มีค่าเท่าใด?", en: "Value of sin 30°?" }, a: "1/2", o: ["√3/2", "1", "0"], diff: 1 },
    { q: { th: "(Basic) cos 60° มีค่าเท่าใด?", en: "Value of cos 60°?" }, a: "1/2", o: ["1", "√2/2", "√3/2"], diff: 1 },
    { q: { th: "(Basic) tan 45° มีค่าเท่าใด?", en: "Value of tan 45°?" }, a: "1", o: ["0", "Infinity", "√3"], diff: 1 },
    { q: { th: "(Basic) ข้าม/ฉาก คือฟังก์ชันใด?", en: "Opposite/Hypotenuse is?" }, a: "sin", o: ["cos", "tan", "sec"], diff: 1 },
    { q: { th: "(Basic) ชิด/ฉาก คือฟังก์ชันใด?", en: "Adjacent/Hypotenuse is?" }, a: "cos", o: ["sin", "tan", "csc"], diff: 1 },
    { q: { th: "(Med) tan 45° + sin 90° = ?", en: "tan 45° + sin 90° = ?" }, a: "2", o: ["1", "3", "√2+1"], diff: 2 },
    { q: { th: "(Med) ต้นไม้สูง 10 เมตร ทอดเงายาว 10 เมตร มุมเงยคือ?", en: "Tree 10m high, 10m shadow. Elevation angle?" }, a: "45°", o: ["30°", "60°", "90°"], diff: 2 },
    { q: { th: "(Hard) ถ้า sin A = 3/5 แล้ว cos A (มุมแหลม) คือ?", en: "If sin A = 3/5, find cos A (acute angle)?" }, a: "4/5", o: ["3/4", "1", "5/3"], diff: 3 }
  ],
  'alg-exp': [
    { q: { th: "(Basic) 2^3 มีค่าเท่าใด?", en: "What is 2^3?" }, a: "8", o: ["6", "4", "16"], diff: 1 },
    { q: { th: "(Basic) 10^0 มีค่าเท่าใด?", en: "Value of 10^0?" }, a: "1", o: ["0", "10", "Error"], diff: 1 },
    { q: { th: "(Basic) x^a * x^b เท่ากับข้อใด?", en: "x^a * x^b equals?" }, a: "x^(a+b)", o: ["x^(a*b)", "x^(a-b)", "2x^a"], diff: 1 },
    { q: { th: "(Med) (a^2)^3 มีค่าเท่ากับข้อใด?", en: "(a^2)^3 is equal to?" }, a: "a^6", o: ["a^5", "a^8", "a^1"], diff: 2 },
    { q: { th: "(Hard) 2^(x+1) = 8 แล้ว x =", en: "2^(x+1) = 8, solve for x?" }, a: "2", o: ["1", "3", "4"], diff: 3 }
  ],
  'alg-log': [
    { q: { th: "(Med) log 100 (ฐาน 10) มีค่าเท่าใด?", en: "log 100 base 10?" }, a: "2", o: ["1", "10", "100"], diff: 2 },
    { q: { th: "(Med) log 1 (ฐานใดๆ) มีค่าเท่ากับ?", en: "log 1 base b is always?" }, a: "0", o: ["1", "b", "Infinite"], diff: 2 },
    { q: { th: "(Med) log x - log y เท่ากับข้อใด?", en: "log x - log y = ?" }, a: "log(x/y)", o: ["log(x-y)", "log(xy)", "log(x+y)"], diff: 2 },
    { q: { th: "(Hard) log a + log b มีค่าเท่ากับข้อใด?", en: "log a + log b = ?" }, a: "log(ab)", o: ["log(a+b)", "log(a-b)", "log(a/b)"], diff: 3 },
    { q: { th: "(Hard) log_b(b) มีค่าเท่าใด?", en: "Value of log_b(b)?" }, a: "1", o: ["0", "b", "Undefined"], diff: 3 }
  ],
  'chem-per': [
    { q: { th: "(Basic) สัญลักษณ์ของธาตุโซเดียมคืออะไร?", en: "Symbol for Sodium?" }, a: "Na", o: ["S", "So", "N"], diff: 1 },
    { q: { th: "(Basic) ธาตุหมู่ 18 (Noble Gases) ตัวใดอยู่ที่คาบ 1?", en: "Noble Gas in Period 1?" }, a: "He", o: ["Ne", "Ar", "Kr"], diff: 1 },
    { q: { th: "(Basic) สัญลักษณ์ของธาตุทอง (Gold) คืออะไร?", en: "Symbol for Gold?" }, a: "Au", o: ["Ag", "Gd", "Go"], diff: 1 },
    { q: { th: "(Basic) สัญลักษณ์ของธาตุเงิน (Silver) คืออะไร?", en: "Symbol for Silver?" }, a: "Ag", o: ["Au", "Si", "S"], diff: 1 },
    { q: { th: "(Basic) สัญลักษณ์ของธาตุเหล็ก (Iron) คืออะไร?", en: "Symbol for Iron?" }, a: "Fe", o: ["Ir", "I", "In"], diff: 1 },
    { q: { th: "(Basic) สารประกอบ CO2 คือก๊าซชนิดใด?", en: "What is CO2?" }, a: "Carbon Dioxide", o: ["Carbon Monoxide", "Oxygen", "Nitrogen"], diff: 1 },
    { q: { th: "(Basic) H2O คือชื่อทางเคมีของสารใด?", en: "H2O is the chemical name for?" }, a: "Water", o: ["Hydrogen Oxide", "Salt", "Sugar"], diff: 1 },
    { q: { th: "(Med) ธาตุที่มีเลขอะตอม 6 คือธาตุใด?", en: "Element with atomic number 6?" }, a: "Carbon", o: ["Oxygen", "Nitrogen", "Boron"], diff: 2 },
    { q: { th: "(Med) ธาตุหมู่ 18 มีชื่อเรียกว่าอะไร?", en: "Group 18 elements are called?" }, a: "Noble Gases", o: ["Halogens", "Alkali Metals", "Transition Metals"], diff: 2 },
    { q: { th: "(Med) ค่า pH ของสารบริสุทธิ์คือเท่าใด?", en: "pH of pure water?" }, a: "7", o: ["0", "14", "5"], diff: 2 },
    { q: { th: "(Med) อิเล็กตรอนวงนอกสุดเรียกว่า?", en: "Electrons in outermost shell?" }, a: "Valence Electrons", o: ["Core Electrons", "Protons", "Neutrons"], diff: 2 },
    { q: { th: "(Hard) ธาตุใดมีความไวต่อการทำปฏิกิริยามากที่สุดในหมู่ 1?", en: "Most reactive element in Group 1?" }, a: "Francium", o: ["Lithium", "Sodium", "Potassium"], diff: 3 },
    { q: { th: "(Hard) Electronegativity (EN) สูงสุดในตารางธาตุคือธาตุใด?", en: "Highest EN element?" }, a: "Fluorine (F)", o: ["Oxygen (O)", "Chlorine (Cl)", "Cesium (Cs)"], diff: 3 },
    { q: { th: "(Hard) เลขอะตอม 79 คือธาตุใด?", en: "Atomic number 79 is?" }, a: "Gold", o: ["Silver", "Platinum", "Mercury"], diff: 3 }
  ],
  'chem-bond': [
    { q: { th: "(Basic) พันธะระว่างโลหะกับอโลหะมักเป็นพันธะใด?", en: "Bond between metal and non-metal is usually?" }, a: "Ionic", o: ["Covalent", "Metallic", "Hydrogen"], diff: 1 },
    { q: { th: "(Basic) พันธะที่เกิดจากอโลหะกับอโลหะคือ?", en: "Bond between non-metal and non-metal?" }, a: "Covalent", o: ["Ionic", "Metallic", "Coordinate"], diff: 1 },
    { q: { th: "(Med) พันธะที่เกิดจากการใช้ร่วมกันของอิเล็กตรอนคือ?", en: "Bond formed by sharing electrons?" }, a: "Covalent", o: ["Ionic", "Metallic", "Hydrogen"], diff: 2 },
    { q: { th: "(Med) พันธะใดมีความแข็งแรงที่สุดในการยึดเหนี่ยวในโมเลกุลน้ำ?", en: "Strongest bond between water molecules?" }, a: "Hydrogen Bond", o: ["Covalent", "Ionic", "Van der Waals"], diff: 2 },
    { q: { th: "(Med) แรงยึดเหนี่ยวระหว่างโมเลกุลไม่มีขั้วคือ?", en: "Intermolecular force between non-polar molecules?" }, a: "London Dispersion", o: ["Dipole-Dipole", "Hydrogen", "Ionic"], diff: 2 },
    { q: { th: "(Hard) NaCl เป็นการสร้างพันธะรูปแบบใด?", en: "What type of bond is in NaCl?" }, a: "Ionic", o: ["Covalent", "Metallic", "Coordinate"], diff: 3 },
    { q: { th: "(Hard) รูปร่างโมเลกุลของ CH4 คืออะไร?", en: "Molecular geometry of CH4?" }, a: "Tetrahedral", o: ["Linear", "Bent", "Trigonal Planar"], diff: 3 },
    { q: { th: "(Hard) พันธะในกราไฟต์เป็นรูปทรงแบบใด?", en: "Structure of graphite bonds?" }, a: "Hexagonal Layers", o: ["3D Network", "Single Chains", "Closed Loops"], diff: 3 }
  ],
  'phys-elec': [
    { q: { th: "(Basic) หน่วยของแรงดันไฟฟ้า (Voltage) คือ?", en: "Unit of Voltage?" }, a: "Volt", o: ["Ampere", "Ohm", "Watt"], diff: 1 },
    { q: { th: "(Basic) อุปกรณ์ใดใช้จำกัดกระแสไฟฟ้า?", en: "Device used to limit current?" }, a: "Resistor", o: ["Battery", "Wire", "Switch"], diff: 1 },
    { q: { th: "(Med) กฎของโอห์ม สูตรว่าอย่างไร?", en: "Ohm's Law formula?" }, a: "V = IR", o: ["P = IV", "F = ma", "E = mc²"], diff: 2 },
    { q: { th: "(Hard) ความต้านทานต่ออนุกรม 2 Ohm และ 3 Ohm ได้รวมเท่าใด?", en: "Total resistance of 2Ω and 3Ω in series?" }, a: "5 Ohm", o: ["1.2 Ohm", "6 Ohm", "1 Ohm"], diff: 3 }
  ],
  'en': [
    { q: { th: "(Basic) Choose tense: I ___ watching TV.", en: "Choose tense: I ___ watching TV." }, a: "am", o: ["is", "are", "were"], diff: 1 },
    { q: { th: "(Basic) Antonym of 'Hot' is?", en: "Antonym of 'Hot' is?" }, a: "Cold", o: ["Warm", "Warmish", "Spicy"], diff: 1 },
    { q: { th: "(Basic) Which is a Noun?", en: "Which of these is a Noun?" }, a: "Elephant", o: ["Run", "Red", "Quickly"], diff: 1 },
    { q: { th: "(Med) Synonym of 'Ambiguous' is?", en: "Synonym of 'Ambiguous' is?" }, a: "Vague", o: ["Clear", "Lucid", "Bright"], diff: 2 },
    { q: { th: "(Med) Choose correctly: She ___ to school every day.", en: "Choose: She ___ to school every day." }, a: "goes", o: ["go", "gone", "going"], diff: 2 },
    { q: { th: "(Med) What is the past tense of 'Eat'?", en: "Past tense of 'Eat'?" }, a: "ate", o: ["eaten", "eats", "eating"], diff: 2 },
    { q: { th: "(Hard/Trick) 'Has had' is an example of which tense?", en: "'Has had' is an example of which tense?" }, a: "Present Perfect", o: ["Past Perfect", "Simple Past", "Future Perfect"], diff: 3 },
    { q: { th: "(Hard) 'Break a leg' means?", en: "'Break a leg' means?" }, a: "Good Luck", o: ["Get Hurt", "Run Fast", "Fail"], diff: 3 },
    { q: { th: "(Hard) If I ___ you, I would study harder.", en: "If I ___ you, I would study harder." }, a: "were", o: ["am", "was", "be"], diff: 3 },
    { q: { th: "(Hard) 'Piece of cake' means?", en: "'Piece of cake' means?" }, a: "Very Easy", o: ["Food", "Difficult", "Broken"], diff: 3 }
  ],
  'cs-py': [
    { q: { th: "(Basic) คำสั่งใดใช้พิมพ์อักษรใน Python?", en: "Function to output text in Python?" }, a: "print()", o: ["echo()", "console.log()", "cout"], diff: 1 },
    { q: { th: "(Basic) ชนิดข้อมูลของ [1, 2, 3] คือ?", en: "Data type of [1, 2, 3]?" }, a: "list", o: ["tuple", "dict", "array"], diff: 1 },
    { q: { th: "(Basic) การคอมเมนต์บรรทัดเดียวใช้สัญลักษณ์ใด?", en: "Single line comment in Python?" }, a: "#", o: ["//", "/*", "--"], diff: 1 },
    { q: { th: "(Med) len('Hello') ให้ค่าเท่าใด?", en: "len('Hello') returns?" }, a: "5", o: ["4", "0", "TypeError"], diff: 2 },
    { q: { th: "(Med) ผลลัพธ์ของ 3 ** 2 คือ?", en: "Result of 3 ** 2?" }, a: "9", o: ["6", "1", "SyntaxError"], diff: 2 },
    { q: { th: "(Med) คำสั่งสร้างฟังก์ชันคือคำใด?", en: "Keyword to define function?" }, a: "def", o: ["func", "function", "lambda"], diff: 2 },
    { q: { th: "(Hard/Trick) ค่าของ bool('False') คืออะไร?", en: "Value of bool('False')?" }, a: "True", o: ["False", "Null", "Error"], diff: 3 },
    { q: { th: "(Hard) คำสั่งใดใช้ลบสมาชิก 'x' ออกจาก List?", en: "Remove item 'x' from a List?" }, a: "list.remove('x')", o: ["list.delete('x')", "list.pop('x')", "del(list, 'x')"], diff: 3 },
    { q: { th: "(Hard/Trick) Output ของ `type(lambda: None)` คืออะไร?", en: "Output of `type(lambda: None)`?" }, a: "<class 'function'>", o: ["<class 'lambda'>", "<class 'method'>", "<class 'object'>"], diff: 3 },
    { q: { th: "(Hard) List Comprehension: [x*2 for x in [1,2]] ผลลัพธ์คือ?", en: "[x*2 for x in [1,2]] results in?" }, a: "[2, 4]", o: ["[1, 2]", "[x, x]", "Error"], diff: 3 }
  ],
  'cs-js': [
    { q: { th: "(Basic) คำสั่งประกาศตัวแปรแบบเปลี่ยนค่าไม่ได้?", en: "Declare a read-only variable in JS?" }, a: "const", o: ["let", "var", "static"], diff: 1 },
    { q: { th: "(Basic) ชนิดข้อมูล typeof 42 คืออะไร?", en: "typeof 42 is?" }, a: "'number'", o: ["'int'", "'float'", "'digit'"], diff: 1 },
    { q: { th: "(Basic) สัญลักษณ์ใดใช้บวกเลข?", en: "Symbol for addition?" }, a: "+", o: ["-", "*", "/"], diff: 1 },
    { q: { th: "(Med) ผลของ '5' + 3 คือบรรทัดใด?", en: "Result of '5' + 3?" }, a: "'53'", o: ["8", "NaN", "TypeError"], diff: 2 },
    { q: { th: "(Med) คำสั่งใดใช้สร้าง Timer?", en: "Set a recurring timer in JS?" }, a: "setInterval()", o: ["setTimeout()", "wait()", "sleep()"], diff: 2 },
    { q: { th: "(Med) JSON.stringify([1]) คืนค่าอะไร?", en: "JSON.stringify([1]) returns?" }, a: "'[1]'", o: ["[1]", "1", "object"], diff: 2 },
    { q: { th: "(Hard/Trick) typeof NaN คืออะไร?", en: "typeof NaN is?" }, a: "'number'", o: ["'NaN'", "'undefined'", "'object'"], diff: 3 },
    { q: { th: "(Hard/Trick) 0.1 + 0.2 === 0.3 คืนค่าอะไร?", en: "0.1 + 0.2 === 0.3 evaluates to?" }, a: "false", o: ["true", "undefined", "TypeError"], diff: 3 },
    { q: { th: "(Hard/Trick) typeof [] คืออะไร?", en: "typeof [] is?" }, a: "'object'", o: ["'array'", "'list'", "'undefined'"], diff: 3 },
    { q: { th: "(Hard) คอร์ของ JavaScript Engine ใน Chrome คืออะไร?", en: "Chrome's JS Engine?" }, a: "V8", o: ["SpiderMonkey", "Chakra", "Nitro"], diff: 3 }
  ],
  'cs-cpp': [
    { q: { th: "(Basic) คำสั่งพิมพ์ข้อความทางจอภาพคือ?", en: "Standard output stream in C++?" }, a: "std::cout", o: ["printf", "Console.log", "System.print"], diff: 1 },
    { q: { th: "(Basic) ตัวแปรชนิดใดใช้เก็บจุดทศนิยม?", en: "Variable type for floating point?" }, a: "float", o: ["int", "char", "bool"], diff: 1 },
    { q: { th: "(Basic) ต้องปิดท้ายคำสั่งด้วยสัญลักษณ์ใด?", en: "Ends statement with?" }, a: ";", o: [":", ".", ","], diff: 1 },
    { q: { th: "(Med) สัญลักษณ์ที่ใช้บอก Reference/Address คือ?", en: "Address-of reference operator?" }, a: "&", o: ["*", "#", "@"], diff: 2 },
    { q: { th: "(Med) คำสั่งจองหน่วยความจำแบบ Dynamic คือ?", en: "Allocate dynamic memory keyword?" }, a: "new", o: ["malloc", "alloc", "create"], diff: 2 },
    { q: { th: "(Med) STL ย่อมาจากอะไร?", en: "What does STL stand for?" }, a: "Standard Template Library", o: ["System Tool Language", "Simple Type List", "Static Tool Library"], diff: 2 },
    { q: { th: "(Hard/Trick) การ Dereference 'Null Pointer' ส่งผลอย่างไร?", en: "Dereferencing a Null Pointer causes?" }, a: "Segmentation Fault", o: ["Returns 0", "Returns NULL", "Compilation Error"], diff: 3 },
    { q: { th: "(Hard/Trick) Size ของ `char` ใน C++ คือกี่ Byte?", en: "Guaranteed size of `char` in C++?" }, a: "1 Byte", o: ["2 Bytes", "4 Bytes", "Varies by OS"], diff: 3 },
    { q: { th: "(Hard) Keyword ใดใช้ห้ามไม่ให้คลาสลูกสืบทอด?", en: "Prevent inheritance with?" }, a: "final", o: ["const", "stop", "sealed"], diff: 3 }
  ],
  'cs-java': [
    { q: { th: "(Basic) Java ใช้คีย์เวิร์ดใดในการสืบทอดคลาส?", en: "Keyword in Java to inherit a class?" }, a: "extends", o: ["implements", "inherits", "super"], diff: 1 },
    { q: { th: "(Basic) Java ถูกพัฒนาโดยบริษัทใด?", en: "Who developed Java originally?" }, a: "Sun Microsystems", o: ["Microsoft", "Apple", "Google"], diff: 1 },
    { q: { th: "(Med) String ถูกจองพื้นที่ในหน่วยความจำส่วนใด?", en: "Where are String literals stored in Memory?" }, a: "String Pool (Heap)", o: ["Stack", "Registers", "MetaSpace"], diff: 2 },
    { q: { th: "(Med) คลาสใดเป็น Superclass ของทุกคลาส?", en: "Root of the class hierarchy in Java?" }, a: "Object", o: ["String", "Class", "Main"], diff: 2 },
    { q: { th: "(Med) JDK ย่อมาจากอะไร?", en: "What does JDK stand for?" }, a: "Java Development Kit", o: ["Java Data Key", "Java Design Kernel", "Just Doing Koala"], diff: 2 },
    { q: { th: "(Hard/Trick) Interface สามารถมีตัวแปรแบบใดได้เท่านั้น?", en: "Fields in an Interface are implicitly?" }, a: "public static final", o: ["private static", "protected dynamic", "public volatile"], diff: 3 },
    { q: { th: "(Hard) Garbage Collector ทำงานในระดับใด?", en: "GC works at which level?" }, a: "JVM", o: ["CPU", "OS", "Compiler"], diff: 3 }
  ],
  'phys-mech': [
    { q: { th: "(Basic) หน่วยของแรงคืออะไร?", en: "Unit of Force?" }, a: "Newton", o: ["Watt", "Joule", "Pascal"], diff: 1 },
    { q: { th: "(Basic) ความเร็วหารด้วยเวลาคืออะไร?", en: "Velocity divided by time is?" }, a: "Acceleration", o: ["Distance", "Speed", "Mass"], diff: 1 },
    { q: { th: "(Med) งาน (Work) มีหน่วยเป็นอะไร?", en: "Unit of Work?" }, a: "Joule", o: ["Watt", "Newton", "Pascal"], diff: 2 },
    { q: { th: "(Med) สูตรหาความดัน (P) คือ?", en: "Formula for pressure P?" }, a: "F/A", o: ["m*a", "m*g", "1/2 mv2"], diff: 2 },
    { q: { th: "(Hard) พลังงานจลน์ (Ek) มีสูตรว่าอย่างไร?", en: "Kinetic energy formula?" }, a: "1/2 mv²", o: ["mgh", "ma", "F.s"], diff: 3 },
    { q: { th: "(Hard) กฎข้อที่ 2 ของนิวตันคือ?", en: "Newton's 2nd Law?" }, a: "F = ma", o: ["F = Gmm/r2", "v = u+at", "E = mc2"], diff: 3 }
  ],
};

const SFX = {
  audioCtx: null, init: function () { if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); },
  playOsc: function (freq, type, duration, vol = 0.03) {
    if (!this.audioCtx) return; const osc = this.audioCtx.createOscillator(); const gain = this.audioCtx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, this.audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
    osc.connect(gain); gain.connect(this.audioCtx.destination); osc.start(); osc.stop(this.audioCtx.currentTime + duration);
  },
  click: function () { this.init(); this.playOsc(400, 'sine', 0.1, 0.02); },
  correct: function () { this.init(); this.playOsc(800, 'sine', 0.1, 0.05); setTimeout(() => this.playOsc(1200, 'sine', 0.2, 0.1), 100); },
  wrong: function () { this.init(); this.playOsc(200, 'sawtooth', 0.3, 0.05); },
  levelUp: function () { this.init();[400, 500, 600, 800].forEach((f, i) => setTimeout(() => this.playOsc(f, 'sine', 0.2, 0.05), i * 100)); }
};

function getRank(xp) {
  let cur = RANKS[0], next = RANKS[1];
  for (let i = 0; i < RANKS.length; i++) { if (xp >= RANKS[i].xp) { cur = RANKS[i]; next = RANKS[i + 1] || null; } }
  return { cur, next };
}

function t(path, vars = {}) {
  const keys = path.split('.'); let current = i18n[state.lang];
  for (const k of keys) { if (current[k] === undefined) return path; current = current[k]; }
  let txt = current; for (const [v, val] of Object.entries(vars)) { txt = txt.replace(`{${v}}`, val); } return txt;
}
function getCategories() { return [{ id: 'math-cat', name: t('cats.math'), icon: '🧮', desc: t('cats.mathDesc') }, { id: 'sci-cat', name: t('cats.sci'), icon: '🔬', desc: t('cats.sciDesc') }, { id: 'lang', name: t('cats.lang'), icon: '🗣️', desc: t('cats.langDesc') }, { id: 'tech', name: t('cats.tech'), icon: '💻', desc: t('cats.techDesc') }]; }
function getSubjectsByCategory(catId) {
  const db = {
    'math-cat': [{ id: 'math-basic', name: t('sub.mathBasic'), icon: '➕' }, { id: 'math-alg', name: t('sub.mathAlg'), icon: '𝔁' }, { id: 'math-trig', name: t('sub.mathTrig'), icon: '📐' }, { id: 'math-calc', name: t('sub.mathCalc'), icon: '∫' }],
    'sci-cat': [{ id: 'phys', name: t('sub.phys'), icon: '🍎' }, { id: 'chem', name: t('sub.chem'), icon: '🧪' }, { id: 'bio', name: t('sub.bio'), icon: '🧬' }],
    'lang': [{ id: 'en', name: t('sub.en'), icon: '🌍' }],
    'tech': [{ id: 'cs-py', name: 'Python', icon: '🐍' }, { id: 'cs-js', name: 'JavaScript', icon: '🟨' }, { id: 'cs-cpp', name: 'C++', icon: '⚙️' }, { id: 'cs-java', name: 'Java', icon: '☕' }]
  }; return db[catId] || [];
}
function getTopicsBySubject(subjectId) {
  if (subjectId === 'math-basic') return [
    { id: 'add', name: t('topics.add'), icon: '➕', desc: t('topics.addDesc') },
    { id: 'multMath', name: t('topics.multMath'), icon: '✖️', desc: t('topics.multMathDesc') },
    { id: 'divMath', name: t('topics.divMath'), icon: '➗', desc: t('topics.divMathDesc') },
    { id: 'fraction', name: t('topics.fraction'), icon: '½', desc: t('topics.fractionDesc') },
    { id: 'percent', name: t('topics.percent'), icon: '%', desc: t('topics.percentDesc') }
  ];
  if (subjectId === 'math-alg') return [
    { id: 'alg-lin', name: t('topics.algLin'), icon: 'ⲭ', desc: t('topics.algLinDesc') },
    { id: 'alg-exp', name: t('topics.algExp'), icon: 'ⁿ', desc: t('topics.algExpDesc') },
    { id: 'alg-log', name: t('topics.algLog'), icon: 'log', desc: t('topics.algLogDesc') },
    { id: 'alg-seq', name: t('topics.algSeq'), icon: 'Σ', desc: t('topics.algSeqDesc') }
  ];
  if (subjectId === 'math-calc') return [{ id: 'calc-deriv', name: t('topics.calcDeriv'), icon: '𝑑/', desc: t('topics.calcDerivDesc') }];
  if (subjectId === 'math-trig') return [
    { id: 'trig-ratio', name: t('topics.trigRatio'), icon: '📐', desc: t('topics.trigRatioDesc') },
    { id: 'trig-id', name: t('topics.trigId'), icon: 'θ', desc: t('topics.trigIdDesc') },
    { id: 'trig-eq', name: t('topics.trigEq'), icon: '≈', desc: t('topics.trigEqDesc') },
    { id: 'trig-law', name: t('topics.trigLaw'), icon: '△', desc: t('topics.trigLawDesc') },
    { id: 'trig-inv', name: t('topics.trigInv'), icon: 'arc', desc: t('topics.trigInvDesc') }
  ];
  if (subjectId === 'chem') return [
    { id: 'chem-per', name: t('topics.chemPer'), icon: '💎', desc: t('topics.chemPerDesc') },
    { id: 'chem-bond', name: t('topics.chemBond'), icon: '🔗', desc: t('topics.chemBondDesc') }
  ];
  if (subjectId === 'phys') return [{ id: 'phys-mech', name: t('topics.physMech'), icon: '🚗', desc: t('topics.physMechDesc') }];
  if (subjectId === 'bio') return [{ id: 'bio-cell', name: t('topics.bioCell'), icon: '🦠', desc: t('topics.bioCellDesc') }];
  if (subjectId === 'en') return [{ id: 'en', name: t('topics.en'), icon: '📖', desc: t('topics.comingDesc') }];
  if (subjectId === 'cs-py') return [{ id: 'cs-py', name: 'Python Theory', icon: '🐍', desc: t('topics.comingDesc') }];
  if (subjectId === 'cs-js') return [{ id: 'cs-js', name: 'JS Theory', icon: '⚡', desc: t('topics.comingDesc') }];
  if (subjectId === 'cs-cpp') return [{ id: 'cs-cpp', name: 'C++ Theory', icon: '⚙️', desc: t('topics.comingDesc') }];
  if (subjectId === 'cs-java') return [{ id: 'cs-java', name: 'Java Theory', icon: '☕', desc: t('topics.comingDesc') }];
  return [];
}
function rand(m, x) { return Math.floor(Math.random() * (x - m + 1)) + m; }
function rA(avStr) { if (avStr && typeof avStr === 'string' && avStr.startsWith('data:image')) return `<img src="${avStr}" class="avatar-raw">`; return avStr || '👤'; }

function genUID() {
  let newUid = Math.floor(100000 + Math.random() * 900000).toString();
  while (Object.values(state.db).find(v => v.uid === newUid)) { newUid = Math.floor(100000 + Math.random() * 900000).toString(); }
  return newUid;
}

function clearAllTimers() {
  state.activeIntervals.forEach(clearBy => clearInterval(clearBy));
  state.activeTimeouts.forEach(clearBy => clearTimeout(clearBy));
  state.activeIntervals = []; state.activeTimeouts = [];
  if (state.room.timerInterval) { clearInterval(state.room.timerInterval); state.room.timerInterval = null; }
}

function loadUserData() {
  try {
    state.db = JSON.parse(localStorage.getItem('lvlup_users_db') || '{}');
  } catch(e) { 
    console.error("Storage corrupted, resetting."); state.db = {}; 
  }
  
  // Inject/Sync Admin account
  state.db['admin'] = { username: 'admin', password: '38854Pt39_', name: 'Administrator', avatar: 'A', xp: 999999, rank: 'admin', uid: '000000', badges: ['flawless', 'marathon', 'math_god'], role: 'admin', streak: 999, friends: state.db['admin']?.friends || [] };

  Object.values(state.db).forEach(u => {
    if (!u.uid && u.username !== 'admin') u.uid = genUID();
    if (!u.friends) u.friends = [];
    if (u.bio === undefined) u.bio = '';
    if (u.ig === undefined) u.ig = '';
    if (!u.stats) u.stats = { totalQuizzes: 0, totalQ: 0, totalCorrect: 0 };
    if (u.facebook === undefined) u.facebook = '';
  });

  const activeUser = localStorage.getItem('lvlup_active_user');
  if (activeUser && state.db[activeUser]) { state.user = state.db[activeUser]; state.view = 'dashboard'; } else { state.view = 'login'; }
  render();
}
function saveUserData() {
  if (state.user && state.user.username) { 
    state.db[state.user.username] = state.user; 
    try {
      localStorage.setItem('lvlup_users_db', JSON.stringify(state.db)); 
    } catch(e) {
      showNotification("Storage Full!", "Please export your data or delete old accounts.", "⚠️");
    }
  }
}

let cropperInstance = null;
let cropTargetMode = 'settings';

window.openCropModal = function (file) {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (eRx) {
      const m = document.getElementById('crop-modal');
      const t = document.getElementById('crop-target');
      if (!m || !t || typeof Cropper === 'undefined') return;
      t.src = eRx.target.result;
      m.style.display = 'flex';
      if (cropperInstance) cropperInstance.destroy();
      cropperInstance = new Cropper(t, { aspectRatio: 1, viewMode: 1, dragMode: 'move', autoCropArea: 0.9, restore: false, guides: false, center: false, highlight: false, cropBoxMovable: false, cropBoxResizable: false, toggleDragModeOnDblclick: false });
      const in1 = document.getElementById('file-upload'); if (in1) in1.value = '';
      const in2 = document.getElementById('setting-file-upload'); if (in2) in2.value = '';
    };
    reader.readAsDataURL(file);
  }
}

window.closeCropModal = function () {
  const m = document.getElementById('crop-modal'); if (m) m.style.display = 'none';
  if (cropperInstance) { cropperInstance.destroy(); cropperInstance = null; }
  if (typeof SFX !== 'undefined') SFX.click();
}

window.saveCrop = function () {
  if (!cropperInstance) return;
  const cvs = cropperInstance.getCroppedCanvas({ width: 256, height: 256, fillColor: '#fff' });
  if (cvs) {
    const b64 = cvs.toDataURL('image/jpeg', 0.85);
    if (cropTargetMode === 'login') {
      selectedAvatarId = b64;
      const btn = document.getElementById('btn-custom-avatar'); if (btn) { btn.innerHTML = `<img src="${b64}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">`; selectAvatar(btn, b64); }
    } else {
      state.user.avatar = b64;
      state.db[state.user.username] = state.user;
      saveUserData();
      const pAv = document.getElementById('set-avatar-view');
      if (pAv) pAv.innerHTML = `<img src="${b64}" style="width:100%; height:100%; object-fit:cover;">`;
    }
    render();
    if (typeof SFX !== 'undefined') SFX.correct();
  }
  closeCropModal();
}

window.selectAvatar = function (el, icon) { document.querySelectorAll('.avatar-ch').forEach(d => d.classList.remove('active')); el.classList.add('active'); selectedAvatarId = icon; }
window.triggerFileSelect = function () { cropTargetMode = 'login'; document.getElementById('file-upload').click(); }
window.handleCustomAvatar = function (e) { openCropModal(e.target.files[0]); }

window.toggleAuthMode = function (mode) { state.authMode = mode; render(); }
window.runAuthValidation = function () {
  const isReg = state.authMode === 'register'; const uInput = document.getElementById('auth-user'); const pInput = document.getElementById('auth-pass'); const errDiv = document.getElementById('auth-error-msg');
  if (!uInput || !pInput || !errDiv) return true;
  let uVal = uInput.value.trim(); let pVal = pInput.value; let isValid = true; let errMsg = "";
  uInput.classList.remove('input-error'); pInput.classList.remove('input-error');
  if (isReg) {
    if (uVal.length < 4) { isValid = false; errMsg = "Username ต้องมีอย่างน้อย 4 ตัวอักษร"; uInput.classList.add('input-error'); }
    else if (["admin", "system", "support", "staff", "root"].includes(uVal.toLowerCase())) { isValid = false; errMsg = "ชื่อนี้ถูกสงวนไว้ ไม่สามารถใช้ได้"; uInput.classList.add('input-error'); }
    else if (!/^[A-Za-z0-9_\-\.\!]+$/.test(uVal)) { isValid = false; errMsg = "Username อนุญาตเฉพาะภาษาอังกฤษ ตัวเลข และ _ - . ! เท่านั้น"; uInput.classList.add('input-error'); }
    else if (pVal.length < 8) { isValid = false; errMsg = "Password ต้องมีอย่างน้อย 8 ตัวอักษร"; pInput.classList.add('input-error'); }
    else if (!/[A-Z]/.test(pVal)) { isValid = false; errMsg = "Password ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว"; pInput.classList.add('input-error'); }
    else if (!/^[A-Za-z0-9_\-\.\!]+$/.test(pVal)) { isValid = false; errMsg = "Password อนุญาตเฉพาะภาษาอังกฤษ ตัวเลข และ _ - . ! เท่านั้น"; pInput.classList.add('input-error'); }
  } else { if (uVal === '' || pVal === '') { isValid = false; errMsg = "กรุณากรอกข้อมูลให้ครบถ้วน"; } }
  if (!isValid) { errDiv.innerText = errMsg; errDiv.classList.add('show'); } else { errDiv.innerText = ""; errDiv.classList.remove('show'); }
  return isValid;
}
window.doAuth = function () {
  if (!runAuthValidation()) return;
  const uInput = document.getElementById('auth-user'); const pInput = document.getElementById('auth-pass'); const uname = uInput.value.trim(); const pass = pInput.value;
  if (state.authMode === 'register') {
    if (state.db[uname]) { document.getElementById('auth-error-msg').innerText = "ชื่อบัญชีนี้ถูกใช้แล้ว!"; document.getElementById('auth-error-msg').classList.add('show'); uInput.classList.add('input-error'); return; }
    const nm = document.getElementById('auth-name'); const displayName = nm && nm.value.trim() ? nm.value.trim() : uname;
    let targetUID = genUID();
    state.db[uname] = { username: uname, password: pass, name: displayName, avatar: selectedAvatarId, xp: 0, uid: targetUID, badges: [], streak: 1, friends: [] };
    localStorage.setItem('lvlup_users_db', JSON.stringify(state.db)); state.user = state.db[uname]; localStorage.setItem('lvlup_active_user', uname);
    showNotification('ยินดีต้อนรับสู่ BrainUp 🧠', `UID จำประจำตัวของคุณคือ ${targetUID}`, '🎉');
    state.view = 'dashboard';
  } else {
    if (!state.db[uname]) { document.getElementById('auth-error-msg').innerText = "ไม่พบชื่อบัญชีนี้"; document.getElementById('auth-error-msg').classList.add('show'); uInput.classList.add('input-error'); return; }
    if (state.db[uname].password !== pass) { document.getElementById('auth-error-msg').innerText = "รหัสผ่านไม่ถูกต้อง!"; document.getElementById('auth-error-msg').classList.add('show'); pInput.classList.add('input-error'); return; }
    state.user = state.db[uname]; localStorage.setItem('lvlup_active_user', uname); state.view = 'dashboard';
  }
  render();
}
window.doLogout = function () { localStorage.removeItem('lvlup_active_user'); state.user = null; state.view = 'login'; render(); }
window.saveAdminXp = function (uname) {
  const inpxp = document.getElementById(`xp-${uname}`);
  if (inpxp && state.db[uname]) {
    state.db[uname].xp = parseInt(inpxp.value) || 0; localStorage.setItem('lvlup_users_db', JSON.stringify(state.db));
    if (uname === state.user.username) state.user.xp = state.db[uname].xp;
    showNotification('อัปเดต XP สำเร็จ', `ปรับ XP ของ ${uname} เป็น ${state.db[uname].xp}`, '💾'); render();
  }
}
window.deleteAcc = function (uname) {
  if (confirm(`ตั้งสติให้ดี! คุณต้องการลบบัญชี [ ${uname} ] ถาวรหรือไม่? ข้อมูลทั้งหมดจะหายไปในพริบตา`)) {
    delete state.db[uname]; localStorage.setItem('lvlup_users_db', JSON.stringify(state.db));
    if (uname === state.user.username) { doLogout(); } else { render(); }
  }
}
window.showNotification = function (title, desc, icon) {
  const div = document.createElement('div'); div.className = 'notification animate-enter';
  div.innerHTML = `<div class="notification-icon">${rA(icon)}</div><div class="notification-text"><h4>${title}</h4><p>${desc}</p></div>`;
  document.body.appendChild(div); setTimeout(() => div.classList.add('show'), 50); setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 500); }, 4500);
}
function processAchievements() {
  const aq = (id) => {
    if (!state.user.badges.includes(id)) {
      state.user.badges.push(id); const b = ALL_BADGES.find(x => x.id === id);
      showNotification(state.lang === 'th' ? `Achievement! ปลดล็อก: ${b.titleTh}` : `Achievement! ${b.titleEn}`, state.lang === 'th' ? b.descTh : b.descEn, b.icon);
    }
  };
  if (state.quiz.score === state.quiz.questions.length && state.quiz.score >= 5) aq('flawless');
  if (state.quiz.questions.length >= 50) aq('marathon');
  if (state.user.xp >= 10000) aq('math_god');
}

window.addFriend = function () {
  const input = document.getElementById('search-uid'); if (!input) return;
  const targetUid = input.value.trim();
  if (targetUid === state.user.uid) { showNotification("เพิ่มตัวเองไม่ได้!", "เหงาหรอครับ?", "😅"); return; }
  let found = Object.values(state.db).find(v => v.uid === targetUid);
  if (!found) { showNotification("หาไม่เจอ", "ไม่มี UID นี้ในเซิฟเวอร์!", "❌"); return; }
  if (!state.user.friends) state.user.friends = [];
  if (state.user.friends.includes(targetUid)) { showNotification("ซ้ำ!", "เพื่อนคนนี้อยู่ในก๊วนของคุณแล้ว", "🤨"); return; }
  state.user.friends.push(targetUid); saveUserData(); showNotification("เพิ่มเพื่อนสำเร็จ", `${found.name} เข้าสู่วงโคจรของคุณ!`, "🙌"); render();
}

window.exportData = function () {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.db));
  const downloadAnchorNode = document.createElement('a'); downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "brainup_save_data.json");
  document.body.appendChild(downloadAnchorNode); downloadAnchorNode.click(); downloadAnchorNode.remove();
}
window.triggerImport = function () { document.getElementById('import-file').click(); }
window.importData = function (e) {
  const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
  reader.onload = function (event) {
    try { const imported = JSON.parse(event.target.result); Object.assign(state.db, imported); localStorage.setItem('lvlup_users_db', JSON.stringify(state.db)); showNotification("Import Success!", "กู้คืนระบบสำเร็จ โหลดข้อมูลแล้ว", "✅"); render(); } catch (e) { showNotification("Error", "ไฟล์ Json ไม่ถูกต้อง", "⚠️"); }
  }; reader.readAsText(file);
}

function generateQuizQuestions(topicId, selectedTypes, numQs, diff = 1) {
  const qs = []; const isTh = state.lang === 'th'; const usedQs = new Set();
  let m1 = diff === 1 ? 12 : (diff === 2 ? 50 : 200); let m2 = diff === 1 ? 2 : (diff === 2 ? 5 : 20);
  
  for (let i = 0; i < numQs; i++) {
    let qStr = "", answer = ""; let optionSet = new Set(); let attemptsCount = 0;
    let actualTopicId = topicId;
    if (selectedTypes && selectedTypes.length > 0) {
      const typeIdx = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
      const subTopics = getTopicsBySubject(topicId);
      if (subTopics && subTopics[typeIdx]) actualTopicId = subTopics[typeIdx].id;
    }

    while (attemptsCount < 50) {
      qStr = ""; answer = ""; optionSet.clear();
      if (THEORY_BANKS[actualTopicId]) {
        let bank = THEORY_BANKS[actualTopicId]; let available = bank.filter(b => b.diff === diff);
        if (available.length === 0) available = bank.filter(b => b.diff <= diff); if (available.length === 0) available = bank;
        let pick = available[Math.floor(Math.random() * available.length)]; 
        qStr = isTh ? pick.q.th : pick.q.en; answer = typeof pick.a === 'object' ? (isTh ? pick.a.th : pick.a.en) : pick.a;
        pick.o.forEach(optVal => optionSet.add(typeof optVal === 'object' ? (isTh ? optVal.th : optVal.en) : optVal));
      } else if (actualTopicId === 'add') {
        let a = rand(m2, m1 * 2), b = rand(m2, m1 * 2); answer = a + b; qStr = `${a} + ${b} = ?`;
      } else if (actualTopicId === 'multMath') {
        let a = rand(2, diff === 1 ? 12 : (diff === 2 ? 25 : 99)), b = rand(2, diff === 1 ? 12 : (diff === 2 ? 15 : 25));
        answer = a * b; qStr = `${a} × ${b} = ?`;
      } else if (actualTopicId === 'divMath') {
        let b = rand(2, diff === 1 ? 12 : (diff === 2 ? 15 : 25)), ans = rand(2, diff === 1 ? 12 : (diff === 2 ? 25 : 50)), a = b * ans;
        answer = ans; qStr = `${a} ÷ ${b} = ?`;
      } else if (actualTopicId === 'fraction') {
        let d1 = rand(2, 6 * diff), n1 = rand(1, d1 - 1), d2 = rand(2, 6 * diff), n2 = rand(1, d2 - 1);
        let op = Math.random() > 0.5 ? '+' : '-';
        if (op === '+') { answer = `${n1 * d2 + n2 * d1}/${d1 * d2}`; qStr = `${n1}/${d1} + ${n2}/${d2} = ?`; }
        else { answer = `${Math.abs(n1 * d2 - n2 * d1)}/${d1 * d2}`; qStr = `${n1}/${d1} - ${n2}/${d2} = ?`; }
      } else if (actualTopicId === 'percent') {
        let p = [10, 20, 25, 50, 75, 15, 5][rand(0, 6)], val = rand(1, 10) * (diff === 1 ? 100 : 500);
        answer = (p * val) / 100; qStr = `${p}% ${isTh ? 'ของ' : 'of'} ${val} = ?`;
      } else if (actualTopicId === 'alg-lin') {
        if (diff >= 2) { let m = rand(-15, 15), B_val = rand(2, 6), A_val = -m * B_val; answer = m.toString(); qStr = isTh ? `หาความชัน (m): ${A_val}x + ${B_val}y + ${rand(1, 50)} = 0` : `Slope (m) of ${A_val}x + ${B_val}y + ${rand(1, 50)}=0?`; }
        else { let x = rand(1, 20), a = rand(2, 8), b = rand(1, 20), c = a * x + b; answer = x; qStr = `${a}x + ${b} = ${c}, x = ?`; }
      } else if (actualTopicId === 'alg-seq') {
        let a1 = rand(1, 10), d = rand(2, 5), n = rand(4, 10); answer = (a1 + (n - 1) * d).toString();
        qStr = isTh ? `ลำดับเลขคณิต: ${a1}, ${a1+d}, ${a1+2*d}... ตัวที่ ${n} คือ?` : `Arithmetic Seq: ${a1}, ${a1+d}, ${a1+2*d}... What is term ${n}?`;
      } else if (actualTopicId === 'trig-ratio') {
        const angles = [0, 30, 45, 60, 90]; const ang = angles[rand(0, 4)]; const func = ['sin', 'cos', 'tan'][rand(0, 2)];
        const table = { 'sin':['0','1/2','√2/2','√3/2','1'], 'cos':['1','√3/2','√2/2','1/2','0'], 'tan':['0','1/√3','1','√3','Inf'] };
        answer = table[func][angles.indexOf(ang)]; qStr = `${func}(${ang}°) = ?`;
      } else if (actualTopicId === 'calc-deriv') {
        let c = rand(2, 9), p = rand(2, 5); answer = `${c*p}x^${p-1}`; qStr = isTh ? `อนุพันธ์ของ ${c}x^${p} คือ?` : `Derivative of ${c}x^${p}?`;
        if (p === 2) answer = `${c*p}x`;
      } else if (actualTopicId === 'geo-area') {
        let w = rand(2, 12), h = rand(2, 12); answer = (w * h).toString();
        qStr = isTh ? `พื้นที่สี่เหลี่ยมผืนผ้า กว้าง ${w} ยาว ${h} คือ?` : `Area of rectangle (w=${w}, h=${h})?`;
      } else if (actualTopicId === 'stat-basic') {
        let nums = [rand(1,10), rand(1,10), rand(1,10)]; answer = ((nums[0]+nums[1]+nums[2])/3).toFixed(1);
        qStr = isTh ? `ค่าเฉลี่ยของ [${nums.join(', ')}] คือ?` : `Mean of [${nums.join(', ')}]?`;
      } else if (actualTopicId === 'phys-mech') {
        let m = rand(2, 10 * diff), a = rand(2, 10); answer = (m * a).toString(); qStr = isTh ? `มวล ${m}kg เร่งด้วย ${a}m/s² มีแรง (F)?` : `Force F: mass ${m}kg accel ${a}m/s²?`;
      } else { 
        answer = "42"; qStr = isTh ? `วิชา ${actualTopicId} กำลังอยู่ในช่วงอัปเดตระบบเร็วๆ นี้ (Alpha)` : `Topic ${actualTopicId} updated soon. Answer is 42.`; 
      }

      if (!usedQs.has(qStr)) { usedQs.add(qStr); break; }
      attemptsCount++;
      // IF BANK EXHAUSTED: Refresh used list for this specific topic only to allow repeat but shuffled
      if (attemptsCount === 49) { usedQs.clear(); }
    }

    optionSet.add(answer.toString()); let distIndices = 0;
    while (optionSet.size < 4 && distIndices < 40) {
      if (!isNaN(parseFloat(answer)) && isFinite(answer) && !answer.toString().includes('/')) { 
        let offset = rand(1, 20) * (Math.random() > 0.5 ? 1 : -1); 
        if (actualTopicId==='divMath'||actualTopicId==='add'||actualTopicId==='multMath') optionSet.add((parseFloat(answer) + offset).toString()); 
        else optionSet.add((parseFloat(answer) + (offset/10)).toFixed(1)); 
      } else {
        const dummyPool = ["None", "null", "undefined", "NaN", "true", "false", "0", "1", "SyntaxError", "TypeError", "ReferenceError", "void", "object", "array", "string"];
        optionSet.add(dummyPool[rand(0, dummyPool.length-1)]);
      }
      distIndices++;
    }
    const optionsArr = Array.from(optionSet).slice(0, 4).sort(() => Math.random() - 0.5);
    qs.push({ q: qStr, options: optionsArr, answer: optionsArr.indexOf(answer.toString()), userAns: null });
  }
  return qs;
}

window.setLang = function (lang) { state.lang = lang; document.getElementById('btn-en').classList.toggle('active', lang === 'en'); document.getElementById('btn-th').classList.toggle('active', lang === 'th'); document.getElementById('nav-dashboard').innerText = t('nav.dash'); document.getElementById('nav-subjects').innerText = t('nav.sub'); document.getElementById('nav-leaderboard').innerText = t('nav.lead'); document.getElementById('nav-profile').innerText = t('nav.prof'); document.getElementById('nav-settings').innerText = t('nav.set'); document.getElementById('nav-donate').innerText = t('nav.don'); render(); }

function render() {
  if (state.view !== 'login') { sidebar.style.display = 'flex'; if (state.user) { sbAvatar.innerHTML = rA(state.user.avatar); sbName.innerText = state.user.name; } } else { sidebar.style.display = 'none'; }
  appContent.className = 'content-area animate-enter';

  if (state.view === 'login') {
    const isReg = state.authMode === 'register';
    appContent.innerHTML = `<div class="auth-wrapper"><div class="auth-panel"><h1 class="logo" style="margin-bottom: 2.5rem; display:flex; align-items:center; justify-content:center;"><img src="logo.png" style="height: 120px; object-fit: contain; filter: invert(1) hue-rotate(180deg) brightness(1.2); border-radius: 20px;"></h1><div class="auth-tabs"><div class="auth-tab ${!isReg ? 'active' : ''}" onclick="toggleAuthMode('login')">Sign In</div><div class="auth-tab ${isReg ? 'active' : ''}" onclick="toggleAuthMode('register')">Sign Up</div></div><input type="text" id="auth-user" class="auth-input" oninput="runAuthValidation()" placeholder="${state.lang === 'th' ? 'ชื่อผู้ใช้ (Username)' : 'Username'}" autocomplete="off"><input type="password" id="auth-pass" class="auth-input" oninput="runAuthValidation()" placeholder="${state.lang === 'th' ? 'รหัสผ่าน (Password)' : 'Password'}" autocomplete="off"><div id="auth-error-msg" class="error-msg"></div>${isReg ? `<input type="text" id="auth-name" class="auth-input" placeholder="${state.lang === 'th' ? 'ชื่อจอแสดงผล (Display Name)' : 'Display Name'}" autocomplete="off"><p style="margin-bottom: 1rem; color: #aaa; font-size: 0.95rem;">${state.lang === 'th' ? 'เลือกตัวละครหรืออัปโหลดรูป' : 'Choose or Upload Avatar'}</p><div class="avatars-grid" id="auth-avatars">${AVATARS.map((ic, i) => `<div class="avatar-ch ${i === 3 && selectedAvatarId === ic ? 'active' : ''}" onclick="selectAvatar(this, '${ic}')">${ic}</div>`).join('')}<div class="avatar-ch custom-btn" id="btn-custom-avatar" onclick="triggerFileSelect()">+ URL<br>IMAGE</div></div><input type="file" id="file-upload" accept="image/*" style="display:none" onchange="handleCustomAvatar(event)">` : ''}<button class="answer-btn correct" style="width: 100%; border: none; margin-top: 1rem;" onclick="doAuth()">${isReg ? (state.lang === 'th' ? 'เริ่มลงทะเบียน' : 'Create Account') : (state.lang === 'th' ? 'เข้าสู่ระบบ' : 'Login')}</button></div></div>`;
  } else if (state.view === 'dashboard') {
    const curRank = getRank(state.user.xp);
    const st = state.user.stats || {totalQuizzes:0,totalQ:0,totalCorrect:0}; const acc = st.totalQ > 0 ? Math.round((st.totalCorrect/st.totalQ)*100) : 0;
    appContent.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:flex-start;"><div><h1 class="page-title">${t('dash.title')}, ${state.user.name} <span style="display:inline-block; width:44px; height:44px; vertical-align:middle; margin-left:0.5rem; background:rgba(255,255,255,0.1); border-radius:50%; align-items:center; justify-content:center; display:inline-flex;">${rA(state.user.avatar)}</span></h1><p class="page-subtitle">${t('dash.sub')}</p></div><button class="answer-btn" style="padding: 0.5rem 1rem; border-color: red; color: red;" onclick="doLogout()">Sign Out</button></div>
      <div class="dashboard-grid"><div class="stat-card"><div class="stat-title">${t('dash.streak')}</div><div class="stat-value">${state.user.streak}</div></div><div class="stat-card"><div class="stat-title">${t('dash.hours')}</div><div class="stat-value">${state.user.xp}</div></div><div class="stat-card"><div class="stat-title">${t('dash.rank')}</div><div class="stat-value">${curRank.cur.id}</div></div><div class="stat-card"><div class="stat-title">Accuracy</div><div class="stat-value">${acc}%</div></div><div class="stat-card"><div class="stat-title">Quizzes</div><div class="stat-value">${st.totalQuizzes}</div></div></div>
      <button class="answer-btn" style="background: linear-gradient(135deg, #6366f1, #8b5cf6); border:none; color: #fff; width: 100%; margin-top: 2rem; padding: 1.2rem; font-size: 1.15rem; font-weight: 800; letter-spacing: 1px;" onclick="navigate('room_create')">${state.lang==='th'?'🎮 สร้างห้องเล่นกับเพื่อน':'🎮 Create Multiplayer Room'}</button>
      ${state.user.role === 'admin' ? `<button class="answer-btn" style="background: rgba(255,215,0,0.1); border-color: gold; color: gold; width: 100%; margin-top: 1rem;" onclick="navigate('admin_panel')">Admin Panel</button>` : ''}
      <h3 style="margin-top: 3rem; margin-bottom: 1rem; border-top: 1px solid var(--border-color); padding-top: 2rem;">${t('dash.badges')}</h3><div class="badges-grid">${ALL_BADGES.map(b => `<div class="badge-icon ${state.user.badges.includes(b.id) ? 'unlocked' : ''}" data-title="${state.lang === 'th' ? b.titleTh : b.titleEn}: ${state.lang === 'th' ? b.descTh : b.descEn}">${rA(b.icon)}</div>`).join('')}</div>`;
  } else if (state.view === 'profile') {
    const curRankInfo = getRank(state.user.xp);
    const wPrc = curRankInfo.next ? Math.min(100, Math.floor(((state.user.xp - curRankInfo.cur.xp) / (curRankInfo.next.xp - curRankInfo.cur.xp)) * 100)) : 100;
    appContent.innerHTML = `<h1 class="page-title">${state.lang === 'th' ? 'โปรไฟล์และจัดการเพื่อน' : 'Profile & Friends'}</h1><p class="page-subtitle">${state.lang === 'th' ? 'บอกให้โลกรู้ว่าคุณคือใคร ส่ง UID ให้เพื่อนแอดได้เลย' : 'Share your UID and connect with scholars globally.'}</p>
      <div class="profile-card animate-enter"><div style="font-size: 5rem; margin-bottom: 1rem;">${rA(state.user.avatar)}</div><h2 style="font-size: 2.2rem; letter-spacing: -1px;">${state.user.name}</h2><div class="uid-badge">UID: ${state.user.uid}</div>
         <div style="margin-top: 2.5rem; display:flex; justify-content:space-between; color: white; font-weight: 700; opacity:0.9;"><span>${curRankInfo.cur.icon} ${curRankInfo.cur.id}</span><span>${curRankInfo.next ? `${state.user.xp} / ${curRankInfo.next.xp} XP` : 'MAX LEVEL💎'}</span></div>
         <div class="xp-bar-container"><div class="xp-bar-fill" style="width: ${wPrc}%"></div></div></div>
      <h3 style="margin-top: 3rem;">${state.lang === 'th' ? 'เพื่อนของคุณ (Friends List)' : 'Your Friends'}</h3>
      <div style="display:flex; gap: 1rem; margin-top: 1rem; margin-bottom: 2rem; max-width: 600px;"><input type="text" id="search-uid" class="auth-input" placeholder="${state.lang === 'th' ? 'พิมพ์ UID 6 หลัก...' : 'Enter friend 6-Digit UID...'}" style="margin:0;"><button class="answer-btn correct" onclick="addFriend()">${state.lang === 'th' ? 'เพิ่มเพื่อน' : 'Add'}</button></div>
      <div style="max-width: 600px;">${state.user.friends && state.user.friends.length > 0 ? state.user.friends.map(fUid => { const fData = Object.values(state.db).find(v => v.uid === fUid); if (!fData) return `<div class="friend-item" style="color:red; opacity:0.5;">${state.lang === 'th' ? 'บัญชีโดนลบไปแล้ว' : 'Unknown/Deleted Account'} <button class="answer-btn" style="padding:0.3rem 0.8rem; border-color:#ef4444; color:#ef4444; font-size:0.8rem;" onclick="removeFriend('${fUid}')">✕</button></div>`; const fr = getRank(fData.xp); return `<div class="friend-item"><div style="display:flex; align-items:center; gap: 1rem;"><div style="font-size:2rem; width:50px; height:50px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border-radius:50%;">${rA(fData.avatar)}</div><div><div style="font-weight:700; font-size:1.1rem; color:#fff;">${fData.name}</div><div style="color:var(--text-muted); font-size: 0.85rem; font-family:monospace; margin-top:0.25rem;">UID: ${fUid}</div></div></div><div style="display:flex; align-items:center; gap: 1rem;"><div style="text-align:right; font-weight: 700;"><div style="color:#4ade80;">${fData.xp} XP</div><div style="color:rgba(255,255,255,0.8); font-size: 0.85rem; margin-top:0.25rem;">${fr.cur.icon} ${fr.cur.id}</div></div><button class="answer-btn" style="padding:0.3rem 0.6rem; border-color:#ef4444; color:#ef4444; font-size:0.75rem;" onclick="removeFriend('${fUid}')">✕</button></div></div>`; }).join('') : `<p style="color:var(--text-muted); padding: 2rem; border: 1px dashed rgba(255,255,255,0.1); border-radius:12px; text-align:center;">${state.lang === 'th' ? 'ยังไม่มีเพื่อน... แอดด้วย UID ข้างบนเลย!' : 'Forever alone. Add a friend UID above!'}</p>`}</div>`;
  } else if (state.view === 'settings') {
    appContent.innerHTML = `<h1 class="page-title">${state.lang === 'th' ? 'ระบบตั้งค่า' : 'Settings'} ⚙️</h1><p class="page-subtitle">${state.lang === 'th' ? 'จัดการเครื่องจักรสมองกล' : 'Configure engine parameters.'}</p>
        <div style="max-width: 600px; margin-top: 2rem;">
        <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 16px; margin-bottom: 2rem;">
            <h3 style="color:#fff; margin-bottom: 1rem;">${state.lang === 'th' ? 'แก้ไขโปรไฟล์' : 'Edit Profile'}</h3>
            <div style="display:flex; gap: 1rem; align-items:center;">
               <div style="width: 60px; height: 60px; display:flex; align-items:center; justify-content:center; border-radius:50%; font-size:3rem; background:rgba(255,255,255,0.1); overflow:hidden;" id="set-avatar-view">${rA(state.user.avatar)}</div>
               <button class="answer-btn" style="flex:1;" onclick="triggerFileSelectSetting()">${state.lang === 'th' ? 'เปลี่ยนรูปประจำตัว' : 'Change Avatar'}</button>
            </div>
            <input type="file" id="setting-file-upload" accept="image/*" style="display:none" onchange="handleCustomAvatarSetting(event)">
            <p style="margin-top: 1.5rem; margin-bottom: 0.5rem; color: #fff;">${state.lang === 'th' ? 'ชื่อแสดงผล (Display Name)' : 'Display Name'}</p>
            <input type="text" id="setting-name" class="auth-input" value="${state.user.name}" style="margin-top: 0; margin-bottom: 0;" onblur="saveProfileName(this.value)">
            <p style="margin-top: 1.5rem; margin-bottom: 0.5rem; color: #fff;">${state.lang === 'th' ? 'คำอธิบายตัวเอง (Bio)' : 'About Me (Bio)'}</p>
            <textarea id="setting-bio" class="auth-input" rows="3" style="margin-top: 0; margin-bottom: 0; resize: vertical; min-height: 60px;" placeholder="${state.lang === 'th' ? 'เขียนแนะนำตัวเองสั้นๆ...' : 'Write a short bio...'} " onblur="saveProfileField('bio', this.value)">${state.user.bio || ''}</textarea>
        </div>

        <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 16px; margin-bottom: 2rem;">
            <h3 style="color:#fff; margin-bottom: 1rem;">${state.lang === 'th' ? 'โซเชียลมีเดีย' : 'Social Media Links'}</h3>
            <div style="display:flex; align-items:center; gap: 0.75rem; margin-bottom: 1rem;">
              <span style="font-size: 1.5rem; width: 30px; text-align:center;">📸</span>
              <input type="text" id="setting-ig" class="auth-input" value="${state.user.ig || ''}" placeholder="${state.lang === 'th' ? 'Instagram Username เช่น leo.dev' : 'Instagram Username e.g. leo.dev'}" style="margin:0; flex:1;" onblur="saveProfileField('ig', this.value)">
            </div>
            <div style="display:flex; align-items:center; gap: 0.75rem;">
              <span style="font-size: 1.5rem; width: 30px; text-align:center;">👤</span>
              <input type="text" id="setting-fb" class="auth-input" value="${state.user.facebook || ''}" placeholder="${state.lang === 'th' ? 'Facebook Profile URL' : 'Facebook Profile URL'}" style="margin:0; flex:1;" onblur="saveProfileField('facebook', this.value)">
            </div>
        </div>

        <div style="background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 16px; margin-bottom: 2rem;">
            <h3 style="color:#fff; margin-bottom: 1rem;">${state.lang==='th'?'เปลี่ยนรหัสผ่าน':'Change Password'}</h3>
            <input type="password" id="set-old-pass" class="auth-input" placeholder="${state.lang==='th'?'รหัสผ่านเดิม':'Current Password'}" style="margin-top:0;">
            <input type="password" id="set-new-pass" class="auth-input" placeholder="${state.lang==='th'?'รหัสผ่านใหม่ (8+ ตัว, มีตัวใหญ่)':'New Password (8+, 1 uppercase)'}">
            <button class="answer-btn" style="margin-top: 0.5rem;" onclick="changePassword()">${state.lang==='th'?'บันทึกรหัสผ่านใหม่':'Save New Password'}</button>
        </div>
        <div class="setting-card" onclick="setLang(state.lang === 'th' ? 'en' : 'th')"><div><h3 style="margin-bottom:0.25rem; color:#fff;">${state.lang === 'th' ? 'เปลี่ยนภาษา (Language)' : 'Interface Language'}</h3><p style="color:var(--text-muted); font-size: 0.85rem;">${state.lang === 'th' ? 'สลับภาษาไทย / English' : 'Swap interface TH / EN'}</p></div><strong style="color: var(--accent); font-size:1.5rem;">${state.lang.toUpperCase()}</strong></div>
        <div class="setting-card" style="border: 1px solid rgba(239, 68, 68, 0.4);" onclick="deleteAcc('${state.user.username}')"><div><h3 style="margin-bottom:0.25rem; color: #ef4444;">${state.lang === 'th' ? 'ลบบัญชีและข้อมูลทั้งหมด' : 'Delete Current Account'}</h3><p style="color:#ef4444; font-size: 0.85rem; opacity:0.8;">${state.lang === 'th' ? 'การกระทำนี้ไม่สามารถย้อนกลับได้' : 'This action terminates the account permanently.'}</p></div><strong style="font-size:1.5rem;">⚠️</strong></div>
        </div>`;
  } else if (state.view === 'donate') {
    appContent.innerHTML = `<h1 class="page-title" style="color: gold;">${state.lang === 'th' ? 'สนับสนุนผู้พัฒนา' : 'Support BrainUp'} 💰</h1><p class="page-subtitle">${state.lang === 'th' ? 'ร่วมเป็นส่วนหนึ่งในการขับเคลื่อนการศึกษาฟรี' : 'Help us fuel the global knowledge engine.'}</p>
        <div class="profile-card animate-enter" style="border-color: gold; text-align:center; padding: 4rem;">
           <div style="width: 260px; height: 260px; background: #fff; margin: 0 auto; display:flex; align-items:center; justify-content:center; border-radius: 16px; margin-bottom: 2rem; padding: 8px;">
              <img src="qr_promptpay.png" style="width:100%; height:100%; object-fit:contain; border-radius:12px;">
           </div>
           <h2 style="margin-bottom: 0.5rem; color:#fff;">PromptPay — ธนาคารกสิกรไทย (KBank)</h2>
           <div class="uid-badge" style="background: rgba(255,215,0,0.1); color: gold; font-family: monospace; letter-spacing: 5px; font-size: 1.3rem;">185-1-61471-7</div>
           <p style="margin-top: 2rem; color: var(--text-muted); opacity:0.8;">${state.lang === 'th' ? 'ขอบคุณทุกท่านที่ร่วมสนับสนุนการพัฒนา BrainUp<br>ทุกบาทจะถูกนำไปพัฒนาระบบให้ดียิ่งขึ้น' : 'Thank you for supporting BrainUp development.<br>Every contribution helps us improve the platform.'}</p>
        </div>`;
  } else if (state.view === 'admin_panel') {
    appContent.innerHTML = `<h1 class="page-title" style="color: gold;">Admin Control Panel</h1><button class="answer-btn" style="padding: 0.5rem 1rem;" onclick="navigate('dashboard')">กลับหนัาหลัก</button><table class="admin-table"><thead><tr><th>Image</th><th>UID</th><th>Username</th><th>Display Name</th><th>XP</th><th>Actions</th></tr></thead><tbody>${Object.values(state.db).map(u => `<tr><td><div style="width: 44px; height: 44px; border-radius: 50%; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.1); overflow:hidden;">${rA(u.avatar)}</div></td><td style="font-family:monospace; color:#3b82f6;">${u.uid}</td><td><strong>${u.username}</strong> ${u.role === 'admin' ? '<span style="color:red;font-size:0.8rem;margin-left:0.5rem;">(ADMIN)</span>' : ''}</td><td>${u.name}</td><td><input type="number" id="xp-${u.username}" class="admin-input" value="${u.xp}"></td><td><button class="admin-save-btn" onclick="saveAdminXp('${u.username}')">SET</button>${u.role !== 'admin' ? `<button class="admin-delete-btn" onclick="deleteAcc('${u.username}')">DEL</button>` : ''}</td></tr>`).join('')}</tbody></table>`;
  } else if (state.view === 'categories') {
    appContent.innerHTML = `<h1 class="page-title">${t('cats.title')}</h1><p class="page-subtitle">${t('cats.sub')}</p><div class="subjects-grid">${getCategories().map(cat => `<div class="subject-card" onclick="openCategory('${cat.id}')"><div class="subject-icon" style="font-size: 3.5rem;">${cat.icon}</div><h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${cat.name}</h3><p style="color: var(--text-muted); font-size: 0.95rem;">${cat.desc}</p></div>`).join('')}</div>`;
  } else if (state.view === 'subjects') {
    appContent.innerHTML = `<h1 class="page-title">${t('sub.title')}</h1><p class="page-subtitle">${t('sub.sub')}</p><div class="subjects-grid">${getSubjectsByCategory(state.quiz.activeCategory).map(sub => `<div class="subject-card" onclick="openSubject('${sub.id}')"><div class="subject-icon">${sub.icon}</div><h3>${sub.name}</h3></div>`).join('')}</div><button class="answer-btn" style="margin-top: 3rem;" onclick="navigate('categories')">${t('sub.back')}</button>`;
  } else if (state.view === 'topics') {
    const topics = getTopicsBySubject(state.quiz.activeSubject);
    if (topics.length === 0) appContent.innerHTML = `<h1 class="page-title">${t('topics.coming')}</h1><p class="page-subtitle">${t('topics.comingDesc')}</p><button class="answer-btn" style="margin-top: 2rem;" onclick="navigate('subjects')">${t('topics.back')}</button>`;
    else appContent.innerHTML = `<h1 class="page-title">${t('topics.title')}</h1><p class="page-subtitle">${t('topics.subDesc')}</p><div class="subjects-grid">${topics.map(topic => `<div class="subject-card" onclick="chooseConfig('${topic.id}')"><div class="subject-icon" style="font-size: 2.5rem; filter: grayscale(1);">${topic.icon}</div><h3>${topic.name}</h3><p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">${topic.desc}</p></div>`).join('')}</div><button class="answer-btn" style="margin-top: 3rem;" onclick="navigate('subjects')">${t('topics.back')}</button>`;
  } else if (state.view === 'config') {
    let tCount = 1; let labels = state.lang === 'th' ? ["แกนหลักของวิชา"] : ["Subject Core"];
    if (TOPIC_CONFIGS[state.quiz.activeTopic]) { labels = state.lang === 'th' ? TOPIC_CONFIGS[state.quiz.activeTopic].th : TOPIC_CONFIGS[state.quiz.activeTopic].en; tCount = labels.length; }
    appContent.innerHTML = `
      <h1 class="page-title">${state.lang === 'th' ? 'ปรับแต่งแบบทดสอบ' : 'Quiz Configuration'}</h1><p class="page-subtitle">${state.lang === 'th' ? 'เลือกระดับความยากและขอบเขตข้อสอบ' : 'Set difficulty and scope parameters.'}</p>
      <div class="subjects-grid" style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 600px; margin: 2rem auto;">
        <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1rem;">
          <h3 style="margin-bottom: 1rem; color: #fff;">${state.lang === 'th' ? 'Difficulty' : 'Difficulty'}</h3>
          <select id="config-difficulty" style="width: 100%; padding: 0.75rem; border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.5); color: var(--accent); font-size: 1.15rem; font-weight: bold; outline:none; appearance: none;">
            <option value="1">Basic</option><option value="2">Medium</option><option value="3">Hard</option>
          </select>
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 1rem;">
          <h3 style="margin-bottom: 1rem; color: #fff;">${state.lang === 'th' ? 'จำนวนข้อที่ต้องการทำ (สูงสุด 50 ข้อ)' : 'Total Questions (Max 50)'}</h3>
          <input type="number" id="config-qcount" value="5" min="1" max="50" oninput="updateQCountMin(event)" onchange="updateQCountMin(event)" style="width: 100%; padding: 0.75rem; border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.5); color: #fff; font-size: 1.25rem;">
        </div>
        ${Array.from({ length: tCount }).map((_, i) => `<label style="display: flex; align-items: center; background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: var(--radius); cursor: pointer; border: 1px solid rgba(255,255,255,0.1);"><input type="checkbox" onchange="updateQCountMin()" class="cfg-chk" value="${i}" checked style="width: 25px; height: 25px; margin-right: 1.5rem; accent-color: var(--accent);"><span style="font-size: 1.15rem; color: #fff;">${labels[i]}</span></label>`).join('')}
      </div>
      <button class="answer-btn" id="config-start-btn" style="display: block; width: fit-content; margin: 2rem auto;" onclick="startQuizWithConfig()">${state.lang === 'th' ? 'เริ่มทำแบบทดสอบ' : 'Start Quiz'}</button>
      <button class="answer-btn" style="display: block; width: fit-content; margin: 1rem auto; background: transparent; border: none; color: var(--text-muted);" onclick="navigate('topics')">← ${state.lang === 'th' ? 'ย้อนกลับ' : 'Back'}</button>
    `;
    setTimeout(updateQCountMin, 50);
  } else if (state.view === 'quiz') {
    const qIndex = state.quiz.currentQuestion; const progress = ((qIndex) / state.quiz.questions.length) * 100;
    if (qIndex >= state.quiz.questions.length) {
      if (!state.quiz.savedScore) { state.quiz.savedScore = true; const earned = state.quiz.score * (150 * state.quiz.difficulty); state.user.xp += earned; if(!state.user.stats) state.user.stats={totalQuizzes:0,totalQ:0,totalCorrect:0}; state.user.stats.totalQuizzes++; state.user.stats.totalQ += state.quiz.questions.length; state.user.stats.totalCorrect += state.quiz.score; processAchievements(); saveUserData(); if (typeof SFX !== 'undefined') SFX.levelUp(); }
      appContent.innerHTML = `<div class="quiz-container animate-enter" style="text-align: center; margin-top: 5rem;"><h1 class="page-title">${t('quiz.done')}</h1><p class="page-subtitle">${t('quiz.got', { score: state.quiz.score, total: state.quiz.questions.length })}</p><div style="font-size: 2rem; font-weight: 800; margin-bottom: 3rem; color: #fff;">${t('quiz.earned', { xp: state.quiz.score * (150 * state.quiz.difficulty) })} (Diff x${state.quiz.difficulty})</div><div style="display:flex; justify-content:center; gap: 1rem;"><button class="answer-btn" onclick="navigate('review')">Review Details</button><button class="answer-btn correct" onclick="navigate('dashboard')">Home</button></div></div>`; return;
    }
    const q = state.quiz.questions[qIndex]; let diffStr = state.quiz.difficulty === 3 ? 'HARD' : (state.quiz.difficulty === 2 ? 'MEDIUM' : 'BASIC');
    appContent.innerHTML = `<div class="quiz-container"><div class="progress-header"><span>${t('quiz.qCount', { num: qIndex + 1, total: state.quiz.questions.length })}</span><span style="color: ${state.quiz.difficulty === 3 ? 'red' : 'var(--text-muted)'}; font-weight: 600;">[ ${diffStr} MODE ]</span><span>${t('quiz.score', { score: state.quiz.score })}</span></div><div class="progress-bar-container" style="margin-bottom: 2rem;"><div class="progress-bar" style="width: ${progress}%; background: ${state.quiz.difficulty === 3 ? 'red' : 'var(--accent)'}"></div></div><div class="question-card animate-enter"><div class="question-text" style="font-size: 2.2rem; letter-spacing: 1px; min-height: 80px;">${q.q}</div><div class="answers-grid">${q.options.map((opt, i) => `<button class="answer-btn" style="font-size: 1.15rem; padding: 1.25rem;" onclick="handleAnswer(${i}, this)">${opt}</button>`).join('')}</div></div></div>`;
    setTimeout(() => { const pBar = document.querySelector('.progress-bar'); if (pBar) pBar.style.width = `${((qIndex + 1) / state.quiz.questions.length) * 100}%`; }, 50);
  } else if (state.view === 'review') {
    appContent.innerHTML = `<h1 class="page-title">${state.lang === 'th' ? 'ทบทวนข้อผิดพลาด' : 'Review Mistakes'}</h1><p class="page-subtitle">${state.lang === 'th' ? 'ตรวจสอบคำตอบเพื่อพัฒนาตัวเองต่อไป' : 'Review your answers carefully.'}</p><div class="review-list animate-enter">${state.quiz.questions.map((q, i) => `<div class="review-card"><div class="review-q">ข้อ ${i + 1}: ${q.q}</div>${q.options.map((opt, oIdx) => { let cls = ''; if (oIdx === q.answer) cls = 'correct'; else if (oIdx === q.userAns) cls = 'wrong'; return `<div class="review-opt ${cls}">${opt} ${cls === 'correct' ? '(✓)' : (cls === 'wrong' ? '(✗ You answered)' : '')}</div>`; }).join('')}</div>`).join('')}</div><button class="answer-btn correct" style="margin: 3rem auto; display: block;" onclick="navigate('dashboard')">${state.lang === 'th' ? 'กลับสู่หน้าหลัก' : 'Home'}</button>`;
  } else if (state.view === 'leaderboard') {
    const listRaw = Object.values(state.db).filter(u => u.username !== 'admin').sort((a, b) => b.xp - a.xp).slice(0, 50);
    appContent.innerHTML = `<h1 class="page-title">${t('lead.title')}</h1><p class="page-subtitle">${t('lead.sub')}</p>
    <div class="leaderboard-container animate-enter"><div class="leaderboard-header"><div class="col-rank">${t('lead.rank')}</div><div class="col-user">${t('lead.pilot')}</div><div class="col-xp">${t('lead.score')}</div></div>
    ${listRaw.map((u, i) => { const rx = getRank(u.xp); return `<div class="leaderboard-item ${u.username === state.user?.username ? 'current-user' : ''}" onclick="viewPublicProfile('${u.uid}')" style="cursor:pointer;"><div class="col-rank rank">#${i + 1}</div><div class="col-user pilot-info"><div class="avatar" style="border-radius:50%; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; overflow:hidden;">${rA(u.avatar)}</div><div><div class="name" style="font-weight:700;">${u.name} ${u.username === state.user?.username ? t('lead.you') : ''}</div><div style="font-size:0.8rem; color:var(--text-muted);">${rx.cur.icon} ${rx.cur.id}</div></div></div><div class="col-xp xp">${u.xp} XP</div></div>`; }).join('')}
    ${listRaw.length === 0 ? `<p style="text-align:center; padding: 2rem; color:var(--text-muted);">ยังไม่มีผู้เล่นในระบบ</p>` : ''}</div>`;
  } else if (state.view === 'public_profile') {
    const pu = state.publicViewUser;
    if (!pu) { navigate('leaderboard'); return; }
    const puRank = getRank(pu.xp);
    const puPrc = puRank.next ? Math.min(100, Math.floor(((pu.xp - puRank.cur.xp) / (puRank.next.xp - puRank.cur.xp)) * 100)) : 100;
    const igLink = pu.ig ? `<a href="https://instagram.com/${pu.ig.replace('@', '')}" target="_blank" style="display:inline-flex; align-items:center; gap: 0.5rem; background: linear-gradient(135deg, #833AB4, #FD1D1D, #F77737); color:#fff; padding: 0.6rem 1.5rem; border-radius: 12px; text-decoration:none; font-weight:700; transition:0.2s; font-size:0.95rem;">📸 @${pu.ig.replace('@', '')}</a>` : '';
    const fbLink = pu.facebook ? `<a href="${pu.facebook.startsWith('http') ? pu.facebook : 'https://facebook.com/' + pu.facebook}" target="_blank" style="display:inline-flex; align-items:center; gap: 0.5rem; background: #1877F2; color:#fff; padding: 0.6rem 1.5rem; border-radius: 12px; text-decoration:none; font-weight:700; transition:0.2s; font-size:0.95rem;">👤 Facebook</a>` : '';
    const hasSocial = pu.ig || pu.facebook;
    appContent.innerHTML = `<button class="answer-btn" style="margin-bottom: 2rem; padding: 0.5rem 1.5rem;" onclick="navigate('leaderboard')">← ${state.lang === 'th' ? 'กลับ' : 'Back'}</button>
      <div class="profile-card animate-enter">
        <div style="font-size: 6rem; margin-bottom: 1rem;">${rA(pu.avatar)}</div>
        <h2 style="font-size: 2.5rem; letter-spacing: -1px; margin-bottom: 0.5rem;">${pu.name}</h2>
        <div class="uid-badge">UID: ${pu.uid}</div>
        ${pu.bio ? `<p style="margin-top: 1.5rem; color: rgba(255,255,255,0.75); font-size: 1.1rem; line-height: 1.6; max-width: 400px; margin-left:auto; margin-right:auto;">${pu.bio}</p>` : ''}
        <div style="margin-top: 2rem; display:flex; justify-content:space-between; color: white; font-weight: 700; opacity:0.9;"><span>${puRank.cur.icon} ${puRank.cur.id}</span><span>${puRank.next ? pu.xp + ' / ' + puRank.next.xp + ' XP' : 'MAX LEVEL 💎'}</span></div>
        <div class="xp-bar-container"><div class="xp-bar-fill" style="width: ${puPrc}%"></div></div>
        <div style="display:flex; gap: 1.5rem; justify-content:center; margin-top: 2rem; flex-wrap: wrap;">
          <div style="text-align:center;"><div style="font-size: 2rem; font-weight: 800; color:#4ade80;">${pu.xp}</div><div style="color:var(--text-muted); font-size:0.85rem;">Total XP</div></div>
          <div style="text-align:center;"><div style="font-size: 2rem; font-weight: 800; color:#3b82f6;">${pu.streak || 0}</div><div style="color:var(--text-muted); font-size:0.85rem;">Streak</div></div>
          <div style="text-align:center;"><div style="font-size: 2rem; font-weight: 800; color:#f59e0b;">${(pu.badges || []).length}</div><div style="color:var(--text-muted); font-size:0.85rem;">Badges</div></div>
        </div>
        ${hasSocial ? `<div style="margin-top: 2.5rem; display:flex; gap: 1rem; justify-content:center; flex-wrap: wrap;">${igLink}${fbLink}</div>` : ''}
      </div>
      ${state.user && pu.uid !== state.user.uid ? `<button class="answer-btn correct" style="display:block; margin: 2rem auto; padding: 0.8rem 2rem;" onclick="addFriendByUid('${pu.uid}')">${state.lang === 'th' ? 'เพิ่มเป็นเพื่อน' : 'Add Friend'}</button>` : ''}
    `;
  } else if (state.view === 'room_create') {
    const friendList = (state.user.friends||[]).map(uid => Object.values(state.db).find(v => v.uid === uid)).filter(Boolean);
    const isTh = state.lang==='th';
    const topicOptions = [
      {id:'add',n:isTh?'การบวกเลข':'Addition'},
      {id:'multMath',n:isTh?'การคูณ':'Multiplication'},
      {id:'divMath',n:isTh?'การหาร':'Division'},
      {id:'fraction',n:isTh?'เศษส่วน':'Fraction'},
      {id:'percent',n:isTh?'ร้อยละ/เปอร์เซ็นต์':'Percentage'},
      {id:'alg-lin',n:isTh?'สมการเชิงเส้น':'Linear Eq'},
      {id:'trig-ratio',n:isTh?'อัตราส่วนตรีโกณ':'Trig Ratios'},
      {id:'trig-id',n:isTh?'เอกลักษณ์ตรีโกณ':'Trig Identities'},
      {id:'calc-deriv',n:isTh?'แคลคูลัส':'Calculus'},
      {id:'phys-mech',n:isTh?'กลศาสตร์':'Physics'},
      {id:'chem-per',n:isTh?'ตารางธาตุ':'Periodic Table'},
      {id:'chem-bond',n:isTh?'พันธะเคมี':'Chemical Bond'},
      {id:'bio-cell',n:isTh?'ชีววิทยาเซลล์':'Biology'},
      {id:'en',n:isTh?'ภาษาอังกฤษ':'English'},
      {id:'cs-py',n:'Python'},
      {id:'cs-js',n:'JavaScript'},
      {id:'cs-cpp',n:'C++'},
      {id:'cs-java',n:'Java'}
    ];
    appContent.innerHTML = `<h1 class="page-title">${state.lang==='th'?'🎮 สร้างห้องเล่น':'🎮 Create Room'}</h1><p class="page-subtitle">${state.lang==='th'?'ตั้งค่าห้องแล้วเชิญเพื่อนเข้ามาแข่ง':'Configure room settings and invite friends.'}</p>
      <div style="max-width: 600px;">
        <div style="background:rgba(255,255,255,0.05); padding:2rem; border-radius:16px; margin-bottom:1.5rem; border:1px solid rgba(255,255,255,0.1);">
          <h3 style="color:#fff; margin-bottom:1rem;">${state.lang==='th'?'โหมดเกม':'Game Mode'}</h3>
          <div style="display:flex; gap:1rem;">
            <button class="answer-btn ${state.room.mode==='ffa'?'correct':''}" style="flex:1;" onclick="state.room.mode='ffa'; render()">⚔️ ${isTh?'แข่งกันเอง':'Free-for-All'}</button>
            <button class="answer-btn ${state.room.mode==='team'?'correct':''}" style="flex:1;" onclick="state.room.mode='team'; render()">🤝 ${isTh?'แบ่งทีม':'Team Mode'}</button>
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.05); padding:2rem; border-radius:16px; margin-bottom:1.5rem; border:1px solid rgba(255,255,255,0.1);">
          <h3 style="color:#fff; margin-bottom:1rem;">${state.lang==='th'?'ตั้งค่าห้อง':'Room Config'}</h3>
          <p style="color:#fff; margin-bottom:0.5rem;">${isTh?'หัวข้อวิชา':'Topic'}</p>
          <select id="room-topic" onchange="state.room.config.topic=this.value" style="width:100%; padding:0.75rem; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.5); color:var(--accent); font-size:1rem; outline:none; appearance:none;">
            ${topicOptions.map(tp => `<option value="${tp.id}" ${state.room.config.topic===tp.id?'selected':''}>${tp.n}</option>`).join('')}
          </select>
          <div style="display:flex; gap:1rem; margin-top:1rem;">
            <div style="flex:1;"><p style="color:#fff; margin-bottom:0.5rem;">${isTh?'ระดับความยาก':'Difficulty'}</p><select id="room-diff" onchange="state.room.config.difficulty=parseInt(this.value)" style="width:100%; padding:0.75rem; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.5); color:#fff; outline:none;"><option value="1" ${state.room.config.difficulty===1?'selected':''}>${isTh?'ง่าย':'Basic'}</option><option value="2" ${state.room.config.difficulty===2?'selected':''}>${isTh?'ปานกลาง':'Medium'}</option><option value="3" ${state.room.config.difficulty===3?'selected':''}>${isTh?'ยาก':'Hard'}</option></select></div>
            <div style="flex:1;"><p style="color:#fff; margin-bottom:0.5rem;">${isTh?'จำนวนข้อ':'Questions'}</p><input type="number" value="${state.room.config.numQ}" min="3" max="30" onchange="state.room.config.numQ=parseInt(this.value)" style="width:100%; padding:0.75rem; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.5); color:#fff; font-size:1rem;"></div>
          </div>
          <div style="display:flex; align-items:center; gap:1rem; margin-top:1.5rem; padding:1rem; background:rgba(0,0,0,0.3); border-radius:12px;">
            <label style="color:#fff; flex:1; cursor:pointer;" onclick="state.room.config.timer=!state.room.config.timer; render()"><input type="checkbox" ${state.room.config.timer?'checked':''} style="width:20px; height:20px; margin-right:0.75rem; accent-color:var(--accent); vertical-align:middle;"> ⏱️ ${state.lang==='th'?'เปิดจับเวลา':'Enable Timer'}</label>
            ${state.room.config.timer ? `<input type="number" value="${state.room.config.timerSec}" min="5" max="60" onchange="state.room.config.timerSec=parseInt(this.value)" style="width:80px; padding:0.5rem; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.5); color:#fff; text-align:center;"><span style="color:var(--text-muted);"> sec</span>` : ''}
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.05); padding:2rem; border-radius:16px; margin-bottom:1.5rem; border:1px solid rgba(255,255,255,0.1);">
          <h3 style="color:#fff; margin-bottom:1rem;">${state.lang==='th'?'ผู้เล่นในห้อง':'Players'} (${state.room.players.length})</h3>
          <div style="margin-bottom:1.5rem;">
            ${state.room.players.map(p => `<div class="friend-item" style="margin-bottom:0.5rem;"><div style="display:flex; align-items:center; gap:0.75rem;"><div style="font-size:1.5rem; width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border-radius:50%; overflow:hidden;">${rA(p.avatar)}</div><div><div style="font-weight:700; color:#fff;">${p.name}</div>${state.room.mode==='team'?`<span style="color:${p.team==='A'?'#4ade80':'#3b82f6'}; font-size:0.85rem; font-weight:700;">Team ${p.team}</span>`:''}</div></div><div style="display:flex; gap:0.5rem;">${state.room.mode==='team'?`<button class="answer-btn" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="roomToggleTeam('${p.uid}')">↔️</button>`:''}<button class="answer-btn" style="padding:0.3rem 0.6rem; border-color:#ef4444; color:#ef4444; font-size:0.75rem;" onclick="roomRemovePlayer('${p.uid}')">✕</button></div></div>`).join('')}
          </div>
          <p style="color:var(--text-muted); margin-bottom:0.75rem; font-size:0.9rem;">${state.lang==='th'?'เชิญเพื่อนจากลิสต์:':'Invite from friends list:'}</p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${friendList.filter(f => !state.room.players.find(p => p.uid === f.uid)).map(f => `<div class="friend-item" style="padding:0.75rem 1rem; cursor:pointer;" onclick="roomAddPlayer('${f.uid}')"><div style="display:flex; align-items:center; gap:0.75rem;"><div style="font-size:1.2rem; width:35px; height:35px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05); border-radius:50%; overflow:hidden;">${rA(f.avatar)}</div><span style="color:#fff; font-weight:600;">${f.name}</span></div><span style="color:#4ade80; font-size:1.2rem;">+</span></div>`).join('') || `<p style="color:var(--text-muted); text-align:center; padding:1rem;">${state.lang==='th'?'ไม่มีเพื่อนให้เชิญ แอดเพื่อนก่อน!':'No friends to invite.'}</p>`}
          </div>
        </div>
        <button class="answer-btn correct" style="width:100%; padding:1.2rem; font-size:1.15rem; font-weight:800;" onclick="roomStartGame()">${state.lang==='th'?'🚀 เริ่มเกม!':'🚀 Start Game!'}</button>
        <button class="answer-btn" style="width:100%; margin-top:0.75rem; background:transparent; border:none; color:var(--text-muted);" onclick="state.room.players=[]; navigate('dashboard')">← ${state.lang==='th'?'กลับ':'Back'}</button>
      </div>`;
  } else if (state.view === 'room_play') {
    const p = state.room.players[state.room.currentPlayer];
    const q = state.room.questions[state.room.currentQuestion];
    const totalQ = state.room.questions.length;
    const progress = ((state.room.currentQuestion) / totalQ) * 100;
    const cfg = state.room.config;
    appContent.innerHTML = `<div class="quiz-container">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; padding:1rem; background:rgba(255,255,255,0.05); border-radius:12px;">
        <div style="display:flex; align-items:center; gap:0.75rem;"><div style="width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.1); overflow:hidden; font-size:1.5rem;">${rA(p.avatar)}</div><div><div style="font-weight:700; color:#fff;">${p.name}</div><div style="font-size:0.8rem; color:var(--text-muted);">Score: ${p.score}/${state.room.currentQuestion}</div></div></div>
        <div style="text-align:right;"><div style="font-weight:700; color:var(--accent);">Q${state.room.currentQuestion+1} / ${totalQ}</div><div style="font-size:0.8rem; color:${state.room.mode==='team'?'#4ade80':'var(--text-muted)'};">${state.room.mode==='team'?'Team '+p.team:state.room.mode.toUpperCase()}</div></div>
      </div>
      ${cfg.timer ? `<div id="room-timer-bar" style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; margin-bottom:1.5rem; overflow:hidden;"><div id="room-timer-fill" style="width:100%; height:100%; background: linear-gradient(90deg, #ef4444, #f59e0b); transition: width 0.1s linear; border-radius:4px;"></div></div>` : ''}
      <div class="progress-bar-container" style="margin-bottom:2rem;"><div class="progress-bar" style="width:${progress}%"></div></div>
      <div class="question-card animate-enter">
        <div class="question-text" style="font-size:1.8rem; min-height:60px;">${q.q}</div>
        <div class="answers-grid">${q.options.map((opt, i) => `<button class="answer-btn room-ans-btn" style="font-size:1.1rem; padding:1.1rem;" onclick="roomHandleAnswer(${i}, this)">${opt}</button>`).join('')}</div>
      </div>
    </div>`;
    if(cfg.timer) {
      let timeLeft = cfg.timerSec * 10;
      const fill = document.getElementById('room-timer-fill');
      state.room.timerInterval = setInterval(() => {
        timeLeft--;
        if(fill) fill.style.width = ((timeLeft/(cfg.timerSec*10))*100)+'%';
        if(timeLeft <= 0) { roomTimerExpired(); }
      }, 100);
    }
  } else if (state.view === 'room_results') {
    const sorted = [...state.room.players].sort((a,b) => b.score - a.score);
    let resultHTML = '';
    if(state.room.mode === 'team') {
      const teamA = state.room.players.filter(p => p.team === 'A'); const teamB = state.room.players.filter(p => p.team === 'B');
      const scoreA = teamA.reduce((s,p) => s+p.score, 0); const scoreB = teamB.reduce((s,p) => s+p.score, 0);
      const winner = scoreA > scoreB ? 'Team A' : (scoreB > scoreA ? 'Team B' : 'Draw');
      resultHTML = `<div style="text-align:center; margin-bottom:3rem;"><h2 style="font-size:3rem; font-weight:900; color:${winner==='Team A'?'#4ade80':(winner==='Team B'?'#3b82f6':'#f59e0b')};">🏆 ${winner} ${winner==='Draw'?'':'Wins!'}</h2></div>
        <div style="display:flex; gap:2rem; flex-wrap:wrap; justify-content:center;">
          <div style="flex:1; min-width:250px; background:rgba(74,222,128,0.1); padding:2rem; border-radius:16px; border:2px solid ${scoreA>=scoreB?'#4ade80':'transparent'};"><h3 style="color:#4ade80; margin-bottom:1rem;">Team A — ${scoreA} pts</h3>${teamA.map(p => `<div style="display:flex; justify-content:space-between; padding:0.5rem 0; border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#fff;">${p.name}</span><span style="color:#4ade80; font-weight:700;">${p.score}</span></div>`).join('')}</div>
          <div style="flex:1; min-width:250px; background:rgba(59,130,246,0.1); padding:2rem; border-radius:16px; border:2px solid ${scoreB>=scoreA?'#3b82f6':'transparent'};"><h3 style="color:#3b82f6; margin-bottom:1rem;">Team B — ${scoreB} pts</h3>${teamB.map(p => `<div style="display:flex; justify-content:space-between; padding:0.5rem 0; border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#fff;">${p.name}</span><span style="color:#3b82f6; font-weight:700;">${p.score}</span></div>`).join('')}</div>
        </div>`;
    } else {
      resultHTML = `<div style="text-align:center; margin-bottom:3rem;"><h2 style="font-size:3rem; font-weight:900; color:#f59e0b;">🏆 ${sorted[0].name} Wins!</h2><p style="color:var(--text-muted);">${sorted[0].score} / ${state.room.questions.length} correct</p></div>
        <div style="max-width:500px; margin:0 auto;">${sorted.map((p,i) => `<div class="leaderboard-item" style="margin-bottom:0.5rem;"><div class="col-rank rank" style="color:${i===0?'#f59e0b':(i===1?'#94a3b8':'#cd7f32')};">#${i+1}</div><div class="col-user pilot-info"><div class="avatar" style="border-radius:50%; background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; overflow:hidden;">${rA(p.avatar)}</div><div><div class="name" style="font-weight:700;">${p.name}</div></div></div><div class="col-xp xp" style="color:#4ade80; font-weight:800;">${p.score} pts</div></div>`).join('')}</div>`;
    }
    appContent.innerHTML = `<h1 class="page-title">${state.lang==='th'?'🏆 ผลการแข่งขัน':'🏆 Match Results'}</h1><p class="page-subtitle">${state.room.mode==='team'?'Team Battle':'Free-for-All'} — ${state.room.questions.length} Questions</p>${resultHTML}
      <div style="display:flex; gap:1rem; justify-content:center; margin-top:3rem;">
        <button class="answer-btn" onclick="state.room.players.forEach(p=>{p.score=0;p.answers=[];}); state.room.currentQuestion=0; state.room.currentPlayer=0; navigate('room_create')">${state.lang==='th'?'เล่นอีกรอบ':'Play Again'}</button>
        <button class="answer-btn correct" onclick="state.room.players=[]; navigate('dashboard')">Home</button>
      </div>`;
  }
}

window.navigate = function (view) {
  clearAllTimers();
  if (typeof SFX !== 'undefined') SFX.click();
  if (view === 'subjects' && !state.quiz.activeCategory) view = 'categories';
  state.view = view;
  navLinks.forEach(link => { link.classList.remove('active'); const t = link.dataset.target; if (t === view || (t === 'subjects' && (view === 'categories' || view === 'topics' || view === 'config'))) link.classList.add('active'); });
  render();
}
window.openCategory = function (catId) { state.quiz.activeCategory = catId; navigate('subjects'); }
window.openSubject = function (subId) { state.quiz.activeSubject = subId; navigate('topics'); }
window.chooseConfig = function (topicId) { state.quiz.activeTopic = topicId; navigate('config'); }

window.viewPublicProfile = function (uid) {
  const pu = Object.values(state.db).find(u => u.uid === uid);
  if (!pu) { showNotification(state.lang === 'th' ? 'ไม่พบข้อมูล' : 'Not Found', state.lang === 'th' ? 'ผู้ใช้ถูกลบไปแล้ว' : 'User was deleted.', '⚠️'); return; }
  state.publicViewUser = pu;
  state.view = 'public_profile';
  render();
}
window.addFriendByUid = function (uid) {
  if (!state.user) return;
  if (state.user.uid === uid) { showNotification(state.lang === 'th' ? 'ไม่สำเร็จ' : 'Error', state.lang === 'th' ? 'ไม่สามารถแอดตัวเองได้' : 'Cannot add yourself.', '⚠️'); return; }
  if (state.user.friends.includes(uid)) { showNotification(state.lang === 'th' ? 'มีอยู่แล้ว' : 'Already Added', state.lang === 'th' ? 'เพื่อนคนนี้อยู่ในลิสต์แล้ว' : 'Already in your list.', '✅'); return; }
  state.user.friends.push(uid); saveUserData();
  showNotification(state.lang === 'th' ? 'สำเร็จ!' : 'Success!', state.lang === 'th' ? 'เพิ่มเพื่อนเรียบร้อยแล้ว' : 'Friend added successfully.', '🎉');
}
window.saveProfileField = function (field, value) {
  if (state.user) { state.user[field] = value.trim(); state.db[state.user.username] = state.user; saveUserData(); }
}

window.updateQCountMin = function (e) {
  const chks = document.querySelectorAll('.cfg-chk:checked').length; const qInput = document.getElementById('config-qcount');
  if (qInput) {
    const minQ = Math.max(1, chks); qInput.min = minQ; let val = parseInt(qInput.value) || 0;
    const isEditingText = e && e.type === 'input' && e.target === qInput;
    if (!isEditingText) { if (val < minQ) { qInput.value = minQ; val = minQ; } if (val > 50) { qInput.value = 50; val = 50; } }
    const displayVal = (val >= minQ && val <= 50) ? val : (val < minQ ? minQ : 50);
    const btn = document.getElementById('config-start-btn'); if (btn) btn.innerText = state.lang === 'th' ? `เริ่มทำแบบทดสอบ (${displayVal} ข้อ)` : `Start ${displayVal}-Q Quiz`;
  }
}
window.startQuizWithConfig = function () {
  const checkboxes = document.querySelectorAll('.cfg-chk:checked'); if (checkboxes.length === 0) { showNotification(state.lang === 'th' ? "เตือน!" : "Alert", state.lang === 'th' ? "กรุณาเลือกอย่างน้อย 1 หัวข้อ" : "Please select 1 option.", "⚠️"); return; }
  const minQ = checkboxes.length; const qCountInput = document.getElementById('config-qcount');
  let qCount = qCountInput ? parseInt(qCountInput.value) : 15; if (isNaN(qCount) || qCount < minQ) qCount = minQ; if (qCount > 50) qCount = 50;

  const diffSelect = document.getElementById('config-difficulty'); state.quiz.difficulty = diffSelect ? parseInt(diffSelect.value) : 1;
  state.quiz.selectedTypes = Array.from(checkboxes).map(c => parseInt(c.value)); state.quiz.currentQuestion = 0; state.quiz.score = 0; state.quiz.savedScore = false;
  state.quiz.questions = generateQuizQuestions(state.quiz.activeTopic, state.quiz.selectedTypes, qCount, state.quiz.difficulty); navigate('quiz');
}
window.handleAnswer = function (selectedIndex, btnElement) {
  const qIndex = state.quiz.currentQuestion; const q = state.quiz.questions[qIndex]; q.userAns = selectedIndex;
  const buttons = document.querySelectorAll('.answer-btn'); buttons.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
  if (selectedIndex === q.answer) { if (typeof SFX !== 'undefined') SFX.correct(); btnElement.classList.add('correct'); state.quiz.score += 1; } else { if (typeof SFX !== 'undefined') SFX.wrong(); btnElement.classList.add('wrong'); buttons[q.answer].classList.add('correct'); }
  const tid = setTimeout(() => { 
    if (state.view === 'quiz') { state.quiz.currentQuestion++; render(); } 
  }, 1200);
  state.activeTimeouts.push(tid);
}

window.triggerFileSelectSetting = function () { cropTargetMode = 'settings'; document.getElementById('setting-file-upload').click(); }
window.handleCustomAvatarSetting = function (e) { openCropModal(e.target.files[0]); }
window.saveProfileName = function (val) {
  if (val.trim().length > 0) {
    state.user.name = val.trim();
    state.db[state.user.username] = state.user;
    saveUserData();
    render();
  }
}

window.removeFriend = function(uid) {
  if(!state.user || !state.user.friends) return;
  if(confirm(state.lang==='th'?'ต้องการลบเพื่อนคนนี้ออกจากลิสต์?':'Remove this friend?')) {
    state.user.friends = state.user.friends.filter(f => f !== uid); saveUserData(); render();
  }
}
window.changePassword = function() {
  const old = document.getElementById('set-old-pass'); const nw = document.getElementById('set-new-pass');
  if(!old||!nw) return;
  if(old.value !== state.user.password) { showNotification(state.lang==='th'?'ผิดพลาด':'Error', state.lang==='th'?'รหัสผ่านเดิมไม่ถูกต้อง':'Current password is incorrect.', '⚠️'); return; }
  if(nw.value.length < 8) { showNotification(state.lang==='th'?'ผิดพลาด':'Error', state.lang==='th'?'รหัสผ่านใหม่ต้อง 8 ตัวขึ้นไป':'New password must be 8+ chars.', '⚠️'); return; }
  if(!/[A-Z]/.test(nw.value)) { showNotification(state.lang==='th'?'ผิดพลาด':'Error', state.lang==='th'?'ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว':'Need at least 1 uppercase letter.', '⚠️'); return; }
  state.user.password = nw.value; saveUserData();
  showNotification(state.lang==='th'?'สำเร็จ':'Success', state.lang==='th'?'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว':'Password changed successfully.', '✅');
  old.value = ''; nw.value = '';
}

// ====== ROOM SYSTEM ======
window.roomAddPlayer = function(uid) {
  if(state.room.players.find(p => p.uid === uid)) return;
  const u = Object.values(state.db).find(v => v.uid === uid);
  if(u) { state.room.players.push({uid: u.uid, name: u.name, avatar: u.avatar, username: u.username, team: state.room.players.length % 2 === 0 ? 'A' : 'B', score: 0, answers: []}); render(); }
}
window.roomRemovePlayer = function(uid) { state.room.players = state.room.players.filter(p => p.uid !== uid); render(); }
window.roomToggleTeam = function(uid) { const p = state.room.players.find(x => x.uid === uid); if(p) { p.team = p.team === 'A' ? 'B' : 'A'; render(); } }
window.roomStartGame = function() {
  if(state.room.players.length < 2) { showNotification(state.lang==='th'?'ต้องมีอย่างน้อย 2 คน':'Need 2+ players', '', '⚠️'); return; }
  const cfg = state.room.config;
  state.room.questions = generateQuizQuestions(cfg.topic, [0], cfg.numQ, cfg.difficulty);
  state.room.currentPlayer = 0; state.room.currentQuestion = 0;
  state.room.players.forEach(p => { p.score = 0; p.answers = []; });
  state.room.phase = 'playing'; state.view = 'room_play'; render();
}
window.roomHandleAnswer = function(idx, btn) {
  if(state.room.timerInterval) { clearInterval(state.room.timerInterval); state.room.timerInterval = null; }
  const p = state.room.players[state.room.currentPlayer]; const q = state.room.questions[state.room.currentQuestion];
  p.answers.push(idx); const btns = document.querySelectorAll('.room-ans-btn'); btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
  if(idx === q.answer) { if(typeof SFX!=='undefined') SFX.correct(); btn.classList.add('correct'); p.score++; } else { if(typeof SFX!=='undefined') SFX.wrong(); btn.classList.add('wrong'); btns[q.answer]?.classList.add('correct'); }
  setTimeout(() => { roomNextTurn(); }, 1200);
}
window.roomTimerExpired = function() {
  if(state.room.timerInterval) { clearInterval(state.room.timerInterval); state.room.timerInterval = null; }
  const p = state.room.players[state.room.currentPlayer]; p.answers.push(-1);
  if(typeof SFX!=='undefined') SFX.wrong();
  const btns = document.querySelectorAll('.room-ans-btn'); btns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
  const q = state.room.questions[state.room.currentQuestion]; if(btns[q.answer]) btns[q.answer].classList.add('correct');
  setTimeout(() => { roomNextTurn(); }, 1000);
}
function roomNextTurn() {
  let np = state.room.currentPlayer + 1;
  if(np >= state.room.players.length) { np = 0; state.room.currentQuestion++; }
  if(state.room.currentQuestion >= state.room.questions.length) { state.room.phase = 'results'; state.view = 'room_results'; render(); return; }
  state.room.currentPlayer = np; render();
}

navLinks.forEach(link => link.addEventListener('click', (e) => navigate(e.target.dataset.target)));
document.getElementById('btn-en').classList.remove('active'); document.getElementById('btn-th').classList.add('active');
loadUserData();
