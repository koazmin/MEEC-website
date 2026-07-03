// All copy below is taken verbatim from the live meec.edu.mm site.

export const site = {
  name: "MEEC",
  fullName: "Mahar Euporia Education Centre",
  legal: "MEEC OES",
  copyright: "Copyright © 2010–2026 MEEC OES. All rights reserved.",
  phones: ["09 882 609 922", "09 882 709 922"],
  address: "No 270, Aung Tagun Street, 29 Ward, North Dagon Township, Yangon",
  socials: [
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/MEEC.MMR" },
    { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@meec.mmr23" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Japanese", href: "/japanese" },
  { label: "OES", href: "/oes" },
  { label: "MVI", href: "/mvi" },
  { label: "Blog", href: "/blog" },
  { label: "Recruitments", href: "/recruitments" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "Mahar Euporia Education Centre",
  title: "Wings for Your Dreams",
  body: "Discover a transformative educational experience at our Education Centre. Our dynamic programs and supportive community create a nurturing environment for academic success. Join us on a journey of inspiration, growth, and achievement.",
  // Looping clip at public/meec/hero.mp4 plays as the hero background.
  video: "/meec/hero.mp4",
  // Clean still frame from the video — shown until the video can play (seamless).
  poster: "/meec/hero-poster.jpg",
};

export const vision =
  "To be a beacon of educational excellence, and inspiring lifelong learners who positively impact the nation.";

export const mission =
  "At MEEC, our mission is to provide a nurturing and inclusive learning environment that empowers students to reach their full potential academically, socially, and personally. We are committed to:";

export const missionPillars = [
  {
    title: "Academic excellence",
    body: "The ability to perform, achieve, and excel in academic activities, demonstrating strong intellectual capacity and a passion for learning.",
  },
  {
    title: "Diversity and inclusion",
    body: "We celebrate diversity, promoting an enriching, inclusive learning environment.",
  },
  {
    title: "Lifelong learning",
    body: "We cultivate a love for continuous learning in our students.",
  },
  {
    title: "Research",
    body: "Create abilities that allow students to find, evaluate, and utilize information to answer questions, solve problems, and gain a deeper understanding of a subject.",
  },
];

export const coreValues = [
  {
    title: "Excellence",
    body: "We strive for excellence in all that we do, fostering a culture of continuous improvement in academics, character, and community engagement.",
    icon: "award",
  },
  {
    title: "Passion and honesty",
    body: "We love what we do and we conduct our job with enthusiasm and dedication. We ensure integrity and transparency to all our customers.",
    icon: "heart",
  },
  {
    title: "Responsibility & accountability",
    body: "We are responsible for the future of our students and we provide excellent care and education at MEEC during their life journey. We remove parents' concern through best care at MEEC for the education of their children.",
    icon: "shield",
  },
];

export const teachingApproach = {
  title: "Our unique teaching approach",
  body: "Our teaching method goes beyond the ordinary, employing innovative strategies to inspire curiosity, foster creativity, and ensure each student's success. Join us on a journey where education becomes an exciting adventure, shaping bright minds for a dynamic future.",
};

export const activities = {
  title: "Captivating school activity",
  body: "Dive into interactive learning experiences, collaborative projects, and professional development opportunities, creating a vibrant space where aspiring educators can thrive and grow.",
};

export const stats = [
  { value: 55, suffix: "K", label: "Satisfied students" },
  { value: 11, suffix: "K", label: "Verified students" },
  { value: 6, suffix: "", label: "Program pathways" },
];

export type Program = {
  name: string;
  track: "GED" | "Secondary" | "IGCSE" | "Diploma";
  duration: string;
  blurb: string;
  detail: string;
  featured?: boolean;
};

export const programs: Program[] = [
  {
    name: "GED program",
    track: "GED",
    duration: "5–6 months",
    blurb:
      "A series of tests for individuals who haven't completed their high school education.",
    detail: "Starter, Foundation & Preparation levels · RLA, Maths, Science, Social studies",
  },
  {
    name: "Pre-GED",
    track: "GED",
    duration: "5 months",
    blurb: "Entry preparation before starting the GED program levels.",
    detail: "Foundation literacy and numeracy skills",
  },
  {
    name: "Secondary I & II",
    track: "Secondary",
    duration: "10 months",
    blurb:
      "Foundation for higher secondary education and preparation for specialised studies.",
    detail: "From Grade 8 / Year 6 (International) · English, Maths, Sciences, ICT, Business",
  },
  {
    name: "IGCSE O' Level",
    track: "IGCSE",
    duration: "18 months",
    blurb:
      "An internationally recognised qualification for students aged 14 to 16 years.",
    detail: "Medical · ICT · Business tracks",
    featured: true,
  },
  {
    name: "Pre-IGCSE",
    track: "IGCSE",
    duration: "10–12 months",
    blurb: "A bridging program preparing students for the full IGCSE pathway.",
    detail: "English, Maths, Physics, Chemistry, Bio, ICT, Business",
  },
  {
    name: "Professional diplomas",
    track: "Diploma",
    duration: "Flexible",
    blurb:
      "Career-focused diplomas in Human Resource Management, Marketing Management, and Business Model.",
    detail: "Recruitment, Marketing process, and real-world business models",
  },
];

export const programTracks = ["All", "GED", "Secondary", "IGCSE", "Diploma"] as const;

export const igcseTracks = [
  { name: "Medical track", subjects: ["Further Pure Mathematics", "Biology", "Human Biology"] },
  { name: "Business track", subjects: ["Accounting", "Business Studies", "Economics"] },
  {
    name: "ICT track",
    subjects: ["Further Pure Mathematics", "Information & Communication Technology", "Computer Science"],
  },
];

export const igcseCoreSubjects = ["English Language", "Mathematics B", "Physics", "Chemistry"];

export const gedScoring =
  "Each GED subject is scored from 100 to 200. A minimum of 145 per subject and 580 points overall (out of a possible 800) is required to pass.";

export const diplomas = [
  {
    name: "Diploma in Human Resource Management",
    modules: ["Recruitment & Selection", "Training Development", "Compensation & Employee Benefit", "Labor & Employee Relations"],
  },
  {
    name: "Diploma in Marketing Management",
    modules: [
      "Defining Marketing & the Marketing Process",
      "Understanding the Marketplace & Consumer Value",
      "Designing a Consumer Value-Driven Strategy & Mix",
      "Extending Marketing",
    ],
  },
  {
    name: "Diploma in Business Model",
    modules: [
      "Retail Business Model",
      "Media & Entertainment Business Model",
      "Service Business Model",
      "Manufacturing Business Model",
    ],
  },
];

export const programAccreditation =
  "Curricula are delivered by Midwest College of London Limited (Company No. 14375292, registered in England & Wales) and regulated by the Ofqual and SQF awarding bodies.";

export const gallery = [
  "/meec/gallery-1.webp",
  "/meec/gallery-2.webp",
  "/meec/gallery-3.webp",
  "/meec/gallery-4.webp",
  "/meec/gallery-5.webp",
  "/meec/gallery-6.webp",
  "/meec/gallery-7.webp",
  "/meec/gallery-8.webp",
];

// MEEC community & event posts (day trips, classes, activities).
export const events = [
  "/meec/events/event-1.jpg",
  "/meec/events/event-2.jpg",
  "/meec/events/event-3.jpg",
  "/meec/events/event-4.jpg",
  "/meec/events/event-5.jpg",
  "/meec/events/event-6.jpg",
  "/meec/events/event-7.jpg",
  "/meec/events/event-8.jpg",
  "/meec/events/event-9.jpg",
];

// ---------------------------------------------------------------------------
// About Us
// ---------------------------------------------------------------------------

export const aboutIntro = {
  welcome:
    "Welcome to Mahar Euphoria Education Centre, where inspiration meets education. Our mission is to provide a transformative learning experience, focusing on academic excellence, character development, and fostering a sense of curiosity.",
  overview:
    "MEEC is an institution dedicated to creating environments where students thrive, learn, and embrace a journey of lifelong learning.",
};

export const leadership = [
  {
    name: "Dr. Than Naing Win",
    role: "CEO & Principal",
    photo: "/meec/team/leader-3.webp",
    quote:
      "Programs at MEEC intend to give students not only academic achievements but also their personal development, and critical thinking to improve creativity.",
  },
  {
    name: "Dr. Tin Tin Mar",
    role: "Education Consultant",
    photo: "/meec/team/leader-2.webp",
    quote:
      "We have built MEEC that stands not only as a symbol of academic excellence but also as a sanctuary of character development.",
  },
  {
    name: "Mr. Min San",
    role: "Founder",
    photo: "/meec/team/leader-4.webp",
    quote:
      "In every challenge, there is an opportunity to grow. Embrace each lesson, cherish every moment, and let your determination light your path to success.",
  },
  {
    name: "Ms. Mon Mon San",
    role: "General Manager",
    photo: "/meec/team/leader-1.webp",
    quote:
      "We are committed to providing a safe, caring, and inspiring environment where every child can learn, grow, and succeed.",
  },
];

// ---------------------------------------------------------------------------
// OES — overseas education services
// ---------------------------------------------------------------------------

export const oes = {
  tagline: "Outstanding Education Services",
  intro:
    "Your pathway to higher education overseas — from choosing the right course to settling in on campus abroad.",
  mission:
    "To empower students with the right knowledge, resources, and guidance to pursue higher education overseas, fostering academic and personal growth.",
  services: [
    {
      title: "Study abroad counselling",
      body: "Personalized advice to match students with the right courses and institutions.",
      icon: "globe",
    },
    {
      title: "University & college applications",
      body: "Complete assistance with preparing and submitting your applications.",
      icon: "book",
    },
    {
      title: "Visa guidance",
      body: "Step-by-step support for your student visa application.",
      icon: "shield",
    },
    {
      title: "Accommodation assistance",
      body: "Help securing safe and suitable overseas housing.",
      icon: "pin",
    },
    {
      title: "Pre-departure orientation",
      body: "Equipping you with essential travel and settling-in information.",
      icon: "stairs",
    },
    {
      title: "Ongoing support",
      body: "Continued guidance even after you arrive at your destination.",
      icon: "heart",
    },
  ],
  established: "A service of Mahar Euphoria Company Limited, established in 2023.",
  destinations: ["Malaysia", "Thailand", "Singapore", "China", "Europe"],
  // Partner-programme slides (branded overviews of what each institution offers).
  slides: [
    { image: "/meec/oes/photo-1.png", name: "North-Chiang Mai University", country: "Thailand" },
    { image: "/meec/oes/photo-2.png", name: "ERC Institute", country: "Singapore" },
    { image: "/meec/oes/photo-3.png", name: "James Cook University", country: "Singapore" },
  ],
  europeNations: [
    "Bulgaria",
    "Croatia",
    "Czech Republic",
    "Germany",
    "Italy",
    "Poland",
    "Romania",
    "Spain",
    "Turkey",
    "Ukraine",
  ],
  levels: ["Foundation", "Diploma", "Bachelor's", "Master's", "PhD"],
  partnerNote:
    "Partnered with universities across Malaysia and Thailand, plus the Medical Education Guild for medical pathways in Europe, Asia, and the Caribbean.",
  medicalGuild:
    "Through the Medical Education Guild, we offer pathways to medical universities across Europe, Asia, and the Caribbean.",
  // Featured partners with logos.
  partners: [
    { name: "SEGi University", country: "Malaysia", image: "/meec/oes/uni-segi.jpg" },
    { name: "City University", country: "Malaysia", image: "/meec/oes/uni-city.jpg" },
    { name: "North-Chiang Mai University", country: "Thailand", image: "/meec/oes/uni-chiangmai.jpg" },
  ],
  // Full partner list by country.
  partnersByCountry: [
    {
      country: "Malaysia",
      universities: [
        "SEGi University",
        "Assumption University",
        "INTI University",
        "City University",
        "Asia Pacific University (APU)",
        "Sunway University",
        "Taylor's University",
      ],
    },
    {
      country: "Thailand",
      universities: [
        "North-Chiang Mai University",
        "Kasem Bundit University",
        "Raffles International College (Bangkok)",
        "Pathumthani University",
        "Charansanitwong Technological College",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// MVI — Mahar Vocational Institute
// ---------------------------------------------------------------------------

export const mvi = {
  fullName: "Mahar Vocational Institute",
  intro:
    "A maritime vocational training centre established in 2024, founded on the training requirements of Ushin-G Co., Ltd.",
  vision:
    "To be the leading maritime vocational institute that empowers seafarers with practical skills and certifications, ensuring they are immediately capable of excelling onboard ships worldwide.",
  mission:
    "Delivering hands-on, industry-focused training for seafarers while bridging the gap between certification and operational readiness.",
  values: [
    { title: "Mastery", body: "Excellence in teaching and skill instruction.", icon: "award" },
    { title: "Versatility", body: "Adapting to diverse shipboard environments.", icon: "globe" },
    { title: "Integrity", body: "Maintaining professional maritime standards.", icon: "shield" },
  ],
  courses: [
    { name: "Fitter Course", body: "Arc welding, gas cutting and welding, and lathe machine operation." },
    { name: "GS / Messman Ready Course", body: "Steward duties, bed making, galley operations, and waste management." },
    { name: "Mental Health Awareness Course", body: "Alcohol and drug awareness, stress management, and mental health topics." },
    { name: "AB Ready Course", body: "Shipboard safety, navigation, watchkeeping, and deck operations." },
    { name: "OLR Ready Course", body: "Arc and gas welding." },
    { name: "Cadet Ready Course", body: "Deck operations, engine room, messman duties, and English & Chinese language training." },
  ],
  trainers:
    "Trained by qualified maritime professionals — certified deck officers, chief engineers, maritime instructors, and language specialists.",
  hero: "/meec/mvi/campus-01.webp",
  campus: [
    "/meec/mvi/campus-02.webp",
    "/meec/mvi/campus-03.webp",
    "/meec/mvi/campus-04.webp",
    "/meec/mvi/campus-05.webp",
    "/meec/mvi/campus-06.webp",
    "/meec/mvi/history.webp",
  ],
  trainerPhotos: [
    "/meec/mvi/trainer-01.webp",
    "/meec/mvi/trainer-02.webp",
    "/meec/mvi/trainer-03.webp",
    "/meec/mvi/trainer-04.webp",
    "/meec/mvi/trainer-05.webp",
    "/meec/mvi/trainer-06.webp",
    "/meec/mvi/trainer-07.webp",
  ],
};

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export const blogPosts = [
  {
    slug: "message-from-the-editor-in-chief",
    title: "Message from the Editor-in-Chief",
    date: "October 2, 2025",
    excerpt:
      "Academic research and development are proceeding at a rapid pace, reshaping how we learn and what it means to be ready for the future.",
    image: "/meec/gallery-3.webp",
  },
];

// ---------------------------------------------------------------------------
// Recruitments
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Japanese Language Classes
// ---------------------------------------------------------------------------

export const japanese = {
  eyebrow: "日本語 · Japanese",
  intro:
    "Systematic training in Japanese language and culture for students who want to study at Japanese language schools, colleges, and universities — and for those aiming to work in Japan as skilled workers.",
  offerings: [
    {
      title: "Language & culture training",
      body: "Systematic training in Japanese language and culture for students aiming to study at Japanese language schools, colleges, and universities.",
      icon: "book",
    },
    {
      title: "Education consulting",
      body: "Education and educational consulting services, with full support to study at Japanese language schools across Japan.",
      icon: "globe",
    },
    {
      title: "JLPT exam preparation",
      body: "Dedicated preparation classes for the JLPT at every level, from N5 through to N1.",
      icon: "award",
    },
    {
      title: "Skilled worker training",
      body: "Training for skilled work in Japan — nursing care, food service, food & beverage manufacturing, agriculture, building cleaning, and more.",
      icon: "briefcase",
    },
    {
      title: "Recruitment connection",
      body: "Connecting students who want to work as skilled workers in Japan with the right recruitment agency.",
      icon: "heart",
    },
  ],
  jlpt: ["N5", "N4", "N3", "N2", "N1"],
  cities: ["Tokyo", "Osaka", "Nagoya", "Kobe"],
  skilledFields: [
    { label: "Nursing care", icon: "heart" },
    { label: "Food service industry", icon: "bowl" },
    { label: "Food & beverage manufacturing", icon: "building" },
    { label: "Agriculture", icon: "plant" },
    { label: "Building cleaning service", icon: "sparkles" },
  ],
};

export const recruitment = {
  intro:
    "At Mahar Euphoria Education Centre (MEEC), a learning venture of the GED and IGCSE programs, we are committed to guiding future learners toward success. Our recruitment approach focuses on connecting with students, sharing valuable opportunities, and helping them make informed choices for their academic journey and beyond.",
  banner: "/meec/recruitments/banner.webp",
  sections: [
    {
      title: "Open Days & Campus Tours",
      body: "At MEEC, our Open Days and Campus Tours give future students the chance to experience life on campus. You'll explore our learning facilities, meet lecturers and student ambassadors, and discover the opportunities available at MEEC. Whether you're considering a program, curious about student life, or looking for admission guidance, our tours are the perfect way to see what makes MEEC unique.",
      images: ["/meec/recruitments/r1.webp", "/meec/recruitments/r4.webp", "/meec/recruitments/r7.webp"],
    },
    {
      title: "School Visits & Outreach",
      body: "At MEEC, we bring the campus experience directly to schools. Our recruitment team visits partner schools to share information about programs, scholarships, and career opportunities. Through engaging presentations, interactive workshops, and Q&A sessions, students gain valuable insights to help them plan their future. These visits are designed to inspire, inform, and support students in making confident decisions about their education journey with MEEC.",
      images: ["/meec/recruitments/r2.webp", "/meec/recruitments/r3.webp", "/meec/recruitments/r5.webp"],
    },
    {
      title: "Info Sessions & Webinars",
      body: "At MEEC, we host regular information sessions and webinars to guide students and parents through the admission journey. These sessions provide clear insights into our programs, scholarships, and career pathways, while also offering a chance to interact directly with our faculty and advisors.",
      images: ["/meec/recruitments/r6.webp", "/meec/recruitments/r8.webp", "/meec/recruitments/r9.webp"],
    },
  ],
  gains: [
    "Understand program structures and study options",
    "Learn about scholarships and financial aid opportunities",
    "Get step-by-step guidance on the application process",
    "Hear from current students and alumni about their experiences",
    "Ask questions live and receive personalized advice",
  ],
  gainsCta: "Join our upcoming webinars to explore how MEEC can shape your future.",
  admissions: {
    tagline: "Simple, supportive, and personalized for your success.",
    body: "At MEEC, admissions are simple and supportive. Our team guides you through applications, scholarships, and FAQs, while advisors provide personalized help every step of the way.",
  },
};
