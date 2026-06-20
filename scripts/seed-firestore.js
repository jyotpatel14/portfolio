#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

const repoRoot = path.resolve(__dirname, '..');
const memoryRoot = path.join(repoRoot, 'memoryV2');
const collectionName = process.env.FIRESTORE_COLLECTION || 'portfolio';

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function extractEmail(text) {
  const match = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  return match ? match[0] : null;
}

function extractPhone(text) {
  const match = text.match(/\+?\d[\d\s().-]{7,}\d/);
  return match ? match[0].replace(/\s+/g, ' ').trim() : null;
}

function extractUrls(text) {
  const matches = text.match(/https?:\/\/[^\s)]+/gi) || [];
  return [...new Set(matches.map((url) => url.replace(/[),.;]+$/, '')))] ;
}

function extractLines(text, marker) {
  const regex = new RegExp(`(^|\\n)${marker}.*?(?=\\n\\s*(?:[-*] |[A-Z][A-Za-z].*|$))`, 's');
  const match = text.match(regex);
  return match ? match[0].split('\n').map((line) => line.replace(/^[-*]\s*/, '').trim()).filter(Boolean) : [];
}

function extractSection(text, heading) {
  const regex = new RegExp(`${heading}[\s\S]*?(?=\\n[A-Z][A-Za-z][^\n]*:|\\nSummary|\\nKey Retrieval|$)`, 'i');
  const match = text.match(regex);
  return match ? normalizeWhitespace(match[0].replace(new RegExp(`^${heading}`, 'i'), '')) : '';
}

function extractBulletItems(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, '').trim());
}

function sanitizeText(value) {
  return value && value.trim() ? value.trim() : null;
}

function buildTimestamp() {
  return admin.firestore.FieldValue.serverTimestamp();
}

function toArray(items) {
  return items.filter(Boolean);
}

function parseProfile() {
  const text = readText(path.join(memoryRoot, 'identity/profile.txt'));
  const email = extractEmail(text);
  const phone = extractPhone(text);
  const urls = extractUrls(text);
  const linkedin = urls.find((url) => /linkedin/i.test(url)) || null;
  const github = urls.find((url) => /github/i.test(url)) || null;

  return {
    id: 'profile',
    title: 'Profile',
    name: 'Jyot Kalpesh Patel',
    preferredName: 'Jyot',
    headline: 'Software Engineer | Flutter, React Native, Backend Integration',
    location: {
      city: 'Vadodara',
      state: 'Gujarat',
      country: 'India'
    },
    email,
    phone,
    languages: ['English', 'Gujarati', 'Hindi'],
    socials: toArray([
      linkedin ? { platform: 'LinkedIn', url: linkedin } : null,
      github ? { platform: 'GitHub', url: github } : null
    ]),
    currentRole: 'Associate Software Engineer',
    currentOrganization: 'OpenEyes Technologies Inc.',
    summary: normalizeWhitespace(text.split('Identity Summary')[1]?.split('Key Retrieval Facts')[0] || ''),
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

function parseAbout() {
  const text = readText(path.join(memoryRoot, 'identity/about.txt'));
  const lines = text.split('\n');
  const beliefs = [];
  let inBeliefs = false;

  for (const line of lines) {
    if (/^Core Beliefs$/.test(line.trim())) {
      inBeliefs = true;
      continue;
    }
    if (inBeliefs && /^Thinking Style$/.test(line.trim())) {
      inBeliefs = false;
    }
    if (inBeliefs && /^- /.test(line.trim())) {
      beliefs.push(line.replace(/^-\s*/, '').trim());
    }
  }

  return {
    id: 'about',
    title: 'About',
    philosophy: normalizeWhitespace(text.split('Core Beliefs')[1]?.split('Thinking Style')[0] || ''),
    beliefs,
    workStyle: toArray([
      'Collaborative',
      'Experimental',
      'Growth-Oriented'
    ]),
    values: [
      'Practical problem solving',
      'Continuous learning',
      'Resilience',
      'Spiritual grounding'
    ],
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

function parsePersonality() {
  const text = readText(path.join(memoryRoot, 'personality/core_traits.txt'));
  const communication = readText(path.join(memoryRoot, 'personality/communication_style.txt'));
  const motivation = readText(path.join(memoryRoot, 'personality/motivation.txt'));
  const abbreviation = readText(path.join(memoryRoot, 'personality/abbrieviation.txt'));

  return {
    id: 'personality',
    title: 'Personality',
    coreTraits: extractBulletItems(text).concat(['Reflective', 'Calm under pressure']),
    communicationStyle: normalizeWhitespace(communication.split('Summary')[0] || communication),
    motivation: normalizeWhitespace(motivation.split('Summary')[0] || motivation),
    abbreviation: normalizeWhitespace(abbreviation),
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

function parseInterests() {
  const text = readText(path.join(memoryRoot, 'personality/interest_hobbies.txt'));
  const buckets = {
    hiking: /Trekking and Hiking|Trekking|Hiking/i,
    ai: /Generative Artificial Intelligence|Generative AI|ComfyUI|LoRA|RVC|Local AI/i,
    music: /Music|Flute|Performance|Auditorium/i,
    writing: /Reflective Writing|LinkedIn Writing|Storytelling/i,
    design: /Video Editing|Graphic Design|Visual Storytelling/i
  };

  const hobbies = [
    {
      name: 'Trekking & Hiking',
      category: 'Outdoor',
      description: 'Enjoys adventure, nature exploration, and endurance-building experiences such as the Tungnath–Chandrashila trek.',
      isActive: true
    },
    {
      name: 'Generative AI Exploration',
      category: 'Technology',
      description: 'Explores AI workflows, local model experimentation, automation, and creative tech use.',
      isActive: true
    },
    {
      name: 'Music & Performance',
      category: 'Creative',
      description: 'Enjoys music performance, public expression, and confidence-building through stage experiences.',
      isActive: true
    },
    {
      name: 'Flute',
      category: 'Creative',
      description: 'Uses flute playing as a focused, disciplined, and reflective artistic practice.',
      isActive: true
    },
    {
      name: 'Reflective Writing',
      category: 'Personal Growth',
      description: 'Writes about career growth, lessons learned, and professional self-reflection.',
      isActive: true
    },
    {
      name: 'Video Editing & Graphic Design',
      category: 'Creative',
      description: 'Combines visual storytelling, digital design, and multimedia creativity with technology.',
      isActive: true
    }
  ];

  const interests = [
    {
      name: 'Artificial Intelligence',
      description: 'Interested in AI systems, model experimentation, and practical workflow automation.',
      isActive: true
    },
    {
      name: 'Mobile Engineering',
      description: 'Passionate about building reliable, user-friendly mobile applications across platforms.',
      isActive: true
    },
    {
      name: 'Backend Integration',
      description: 'Enjoys designing APIs, connecting systems, and improving performance.',
      isActive: true
    },
    {
      name: 'Creative Technology',
      description: 'Explores ways to merge software engineering with design, storytelling, and content creation.',
      isActive: true
    },
    {
      name: 'Continuous Learning',
      description: 'Believes growth comes through reflection, experimentation, and disciplined consistency.',
      isActive: true
    }
  ];

  return {
    id: 'interests',
    title: 'Interests & Hobbies',
    summary: normalizeWhitespace(text.split('Overview of Interests')[1]?.split('Trekking and Hiking')[0] || ''),
    hobbies,
    interests,
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

function parseSkills() {
  const text = readText(path.join(memoryRoot, 'skills/texhnical.txt'));
  const technicalKeywords = [
    'Flutter', 'React Native', 'Dart', 'Kotlin', 'Java', 'Python', 'JavaScript',
    'Node.js', 'NestJS', 'Next.js', 'Laravel', 'ReactJS', 'ASP.NET',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Git'
  ];

  const categories = [
    {
      category: 'Languages',
      items: ['Java', 'Dart', 'Kotlin', 'Python', 'JavaScript', 'C#']
    },
    {
      category: 'Mobile & Frontend',
      items: ['Flutter', 'React Native', 'Android', 'ReactJS']
    },
    {
      category: 'Backend & APIs',
      items: ['Node.js', 'NestJS', 'Next.js', 'Laravel', 'REST APIs']
    },
    {
      category: 'Databases & Cloud',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Firestore']
    },
    {
      category: 'Tools & Practices',
      items: ['Git', 'BLoC', 'Provider', 'API Integration', 'Software Architecture']
    }
  ];

  return {
    id: 'skills',
    title: 'Skills',
    categories,
    technologies: technicalKeywords,
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

function parseExperience() {
  const text = readText(path.join(memoryRoot, 'experience/oess.txt'));
  const leadershipText = readText(path.join(memoryRoot, 'experience/gs_nvpas.txt'));

  const experience = [
    {
      role: 'Associate Software Engineer',
      company: 'OpenEyes Technologies Inc.',
      location: 'Vadodara, Gujarat, India',
      startDate: '2026-05-01',
      endDate: null,
      employmentType: 'Full-time',
      summary: 'Contributes to enterprise-grade mobile applications, backend integrations, scalable architecture, and client-facing technical discussions.',
      highlights: [
        'Develops cross-platform mobile solutions with Flutter',
        'Supports backend APIs and integrations using Next.js and NestJS',
        'Participates in technical walkthroughs and stakeholder discussions'
      ],
      technologies: ['Flutter', 'React Native', 'Next.js', 'NestJS', 'Kotlin', 'Java'],
      isActive: true
    },
    {
      role: 'Associate Developer',
      company: 'OpenEyes Technologies Inc.',
      location: 'Vadodara, Gujarat, India',
      startDate: '2025-07-01',
      endDate: '2026-04-30',
      employmentType: 'Full-time',
      summary: 'Expanded ownership of enterprise app development, backend integrations, and production workflows.',
      highlights: [
        'Built and optimized production mobile features',
        'Worked on API integrations and application architecture',
        'Improved stability across Android and iOS applications'
      ],
      technologies: ['Flutter', 'React Native', 'Next.js'],
      isActive: true
    },
    {
      role: 'Intern – Products and Projects',
      company: 'OpenEyes Technologies Inc.',
      location: 'Vadodara, Gujarat, India',
      startDate: '2024-12-01',
      endDate: '2025-06-30',
      employmentType: 'Internship',
      summary: 'Worked on HRMS timesheet development, mobile application features, and backend API integrations.',
      highlights: [
        'Developed React Native timesheet features for employee attendance tracking',
        'Integrated Laravel APIs for secure data synchronization',
        'Contributed to enterprise mobile app delivery'
      ],
      technologies: ['React Native', 'Laravel', 'REST APIs'],
      isActive: true
    }
  ];

  const leadership = {
    title: 'Leadership Experience',
    org: 'NVPAS',
    role: 'General Secretary',
    duration: 'June 2022 to April 2023',
    summary: 'Led more than 25 student coordinators, organized large-scale events, coordinated sponsorships, and promoted technical participation.',
    highlights: [
      'Managed event planning and stakeholder coordination',
      'Encouraged hackathons and innovation-driven student engagement',
      'Built collaborative leadership skills'
    ],
    isActive: true
  };

  return {
    id: 'experience',
    title: 'Experience',
    professional: experience,
    leadership,
    sourceSummary: normalizeWhitespace(text.split('Overall Tenure')[1]?.split('Summary')[0] || ''),
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

function parseEducation() {
  const academic = readText(path.join(memoryRoot, 'education/academic.txt'));
  const certs = readText(path.join(memoryRoot, 'education/certifications.txt'));

  return {
    id: 'education',
    title: 'Education',
    academic: [
      {
        degree: 'Master of Computer Applications (MCA)',
        institution: 'Parul Institute of Engineering and Technology (PIET)',
        university: 'Parul University',
        location: 'Limda, Waghodia, Gujarat, India',
        startDate: '2023-08-01',
        endDate: '2025-05-31',
        grade: '8.93 CGPA',
        specialization: 'Full Stack Web Development',
        highlights: [
          'Served as Class Representative',
          'Published a review paper in Scopus Indexed Journal'
        ],
        isActive: true
      },
      {
        degree: 'Bachelor of Computer Applications (BCA)',
        institution: 'Natubhai V Patel College of Pure and Applied Sciences (NVPAS)',
        university: 'CVM University',
        location: 'Vallabh Vidyanagar, Gujarat, India',
        startDate: '2020-01-01',
        endDate: '2023-01-01',
        grade: '9.88 CGPA',
        highlights: [
          'Secured 2nd rank at university level',
          'Served as General Secretary',
          'Participated in NSS activities'
        ],
        isActive: true
      }
    ],
    certifications: [
      {
        name: 'SQL (Advance + Intermediate + Beginner)',
        issuer: 'HackerRank',
        year: '2025',
        credentialId: 'DF98B7568F92',
        category: 'Database',
        isActive: true
      },
      {
        name: 'Programming, Data Structures and Algorithms using Python',
        issuer: 'IIT Madras',
        year: '2024',
        credentialId: 'NPTEL24CS78S449300365',
        category: 'Programming',
        isActive: true
      },
      {
        name: 'Computer Networks and Internet Protocol',
        issuer: 'IIT Kharagpur',
        year: '2024',
        credentialId: 'NPTEL24CS19S469602285',
        category: 'Networking',
        isActive: true
      },
      {
        name: 'Java Training',
        issuer: 'IIT Bombay',
        year: '2024',
        credentialId: '375538851C',
        category: 'Programming',
        isActive: true
      },
      {
        name: 'Introduction to Artificial Intelligence',
        issuer: 'IBM',
        year: '2023',
        credentialId: 'TYG4V7LXBP74',
        category: 'AI',
        isActive: true
      }
    ],
    summary: normalizeWhitespace(academic.split('Summary')[1] || academic),
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

function parseProjects() {
  const yourWay = JSON.parse(readText(path.join(memoryRoot, 'projects/yourway.txt')));
  const hrms = readText(path.join(memoryRoot, 'projects/hrms.txt'));
  const mdt = readText(path.join(memoryRoot, 'projects/mdt.txt'));
  const openEyes = readText(path.join(memoryRoot, 'projects/openeyestech.txt'));
  const theatre = readText(path.join(memoryRoot, 'projects/theatremanagementsystem.txt'));

  return {
    id: 'projects',
    title: 'Projects',
    featured: [
      {
        name: yourWay.project_name,
        type: 'Academic',
        category: yourWay.category || [],
        tagline: yourWay.tagline,
        description: yourWay.summary,
        technologies: yourWay.technology_stack?.frontend.concat(yourWay.technology_stack?.backend_services || []),
        impact: yourWay.impact,
        links: yourWay.repository ? [{ platform: yourWay.repository.platform, url: yourWay.repository.url }] : [],
        isActive: true
      },
      {
        name: 'OpenEyesTech Marketing Application',
        type: 'Professional',
        category: ['Mobile', 'Enterprise'],
        description: 'Enterprise marketing application developed with Flutter and used for production workflows and optimized UI experiences.',
        technologies: ['Flutter', 'Provider', 'BLoC'],
        isActive: true
      },
      {
        name: 'HRMS Timesheet Module',
        type: 'Professional',
        category: ['Workforce Management', 'Mobile'],
        description: 'Timesheet and attendance tracking module built for enterprise workforce management.',
        technologies: ['React Native', 'Laravel', 'REST APIs'],
        isActive: true
      }
    ],
    otherProjects: [
      {
        name: 'Theatre Management System',
        description: 'Academic project focused on theatre booking and management workflows.',
        isActive: true
      },
      {
        name: 'MDT Project',
        description: 'Project associated with mobile or enterprise development learning and product experimentation.',
        isActive: true
      }
    ],
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

function parseResearch() {
  const reviewPaper = readText(path.join(memoryRoot, 'research/reviewpaper.txt'));
  const confParticipation = readText(path.join(memoryRoot, 'research/confparticipation.txt'));

  return {
    id: 'research',
    title: 'Research & Publications',
    publications: [
      {
        title: 'Computational Advancements in Multimodal Medical Imaging: Bridging Deep Learning, Molecular-Scale Anatomy, and Real-Time Clinical Applications',
        type: 'Review Paper',
        journal: 'International Journal of Applied Mathematics (IJAM)',
        status: 'Published',
        indexed: 'Scopus Indexed',
        publicationDate: '2025-11-25',
        authors: [
          'Jay Gandhi',
          'Karan Bhoi',
          'Kunjan Thakor',
          'Nidhi Valand',
          'Jyot Kalpesh Patel'
        ],
        guide: 'Prof. Vivek Dave',
        summary: 'Review paper exploring AI, deep learning, multimodal imaging, and precision healthcare.',
        isActive: true
      }
    ],
    conferences: [],
    isActive: true,
    updatedAt: buildTimestamp()
  };
}

async function seedFirestore() {
  if (!admin.apps.length) {
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_PROJECT_ID) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        })
      });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.initializeApp();
    } else {
      throw new Error(
        'Missing Firebase auth configuration. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY or GOOGLE_APPLICATION_CREDENTIALS.'
      );
    }
  }

  const db = admin.firestore();

  const payload = {
    profile: parseProfile(),
    about: parseAbout(),
    personality: parsePersonality(),
    interests: parseInterests(),
    skills: parseSkills(),
    experience: parseExperience(),
    education: parseEducation(),
    projects: parseProjects(),
    research: parseResearch()
  };

  const entries = Object.entries(payload);

  for (const [docId, data] of entries) {
    await db.collection(collectionName).doc(docId).set(
      {
        ...data,
        source: 'memoryV2'
      },
      { merge: true }
    );
  }

  await db.collection(collectionName).doc('meta').set(
    {
      id: 'meta',
      title: 'Portfolio Data Metadata',
      updatedAt: buildTimestamp(),
      sourceRoot: 'memoryV2',
      isActive: true,
      documentCount: entries.length
    },
    { merge: true }
  );

  console.log(`Seeded ${entries.length} portfolio documents into collection "${collectionName}".`);
}

seedFirestore().catch((error) => {
  if (error?.code === 5 || /NOT_FOUND/i.test(error?.message || '')) {
    console.error(
      'Firestore seeding failed: the Firestore database for this project may not exist or may not be enabled yet.\n' +
      'Please enable/create the Firestore database in Firebase Console, then run the script again.'
    );
  } else {
    console.error('Firestore seeding failed:', error);
  }
  process.exit(1);
});
