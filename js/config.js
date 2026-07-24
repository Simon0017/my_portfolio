/**
 * CONFIG.JS — All portfolio data, constants, settings
 * Update this file to change site content.
 */

// ============================================================
// ENGINEER PROFILE
// ============================================================

export const PROFILE = {
  name:       'Simon Wafula Wekesa',
  nameShort:  'S.WEKESA',
  title:      'Electronics & Computer Engineer',
  roles:      ['Backend Engineer', 'Embedded Systems Engineer', 'Cybersecurity Enthusiast'],
  location:   'Nairobi, Kenya',
  available:  true,
  bio: [
    'Electronics and Computer Engineering graduate with hands-on experience across backend development, embedded systems, and cybersecurity. Comfortable operating from microcontroller firmware all the way up to cloud-deployed distributed systems.',
    'Built and shipped production systems including real-time video communication platforms, IoT-based computer vision prototypes, ML-driven recommendation engines, and cloud-deployed APIs — with a growing focus on secure-by-design architecture and offensive security techniques.',
    'I care about the fundamentals: system reliability, clean data flows, hardware-software integration, and building things that work correctly in the real world under real constraints.',
  ],
  specs: [
    { key: 'Focus',      val: 'Backend / Embedded Systems / Cybersecurity' },
    { key: 'Stack',      val: 'Python, JavaScript, C++, Rust, SQL' },
    { key: 'Hardware',   val: 'ESP32, ESP32-CAM, Arduino' },
    { key: 'Infra',      val: 'AWS (S3, RDS, Elastic Beanstalk), Redis, Docker (basic)' },
    { key: 'Education',  val: 'B.S. Electronics & Computer Engineering, JKUAT — 2nd Class Upper' },
    { key: 'Status',     val: 'Open to engineering roles across software, embedded, and data' },
  ],
  stats: [
    { label: 'Projects Shipped',    value: '5+',   color: '' },
    { label: 'Cloud Deployments',   value: 'AWS, Vercel, Netlify, Render',   color: 'amber' },
    { label: 'Languages',           value: '5',     color: 'green' },
    { label: 'Years Active',        value: '2',     color: '' },
  ],
  contact: {
    email:    'wekesawafula15@gmail.com',
    github:   'github.com/Simon0017',
    linkedin: 'www.linkedin.com/in/simon-wekesa-81a1b3233/',
    twitter:  '@Unconfigured', // Twitter handle (include @)
  },
};

// ============================================================
// ENGINEERING DOMAINS
// ============================================================

export const DOMAINS = [
  {
    icon: 'fa-solid fa-server',
    title: 'Backend Engineering',
    desc: 'API design, authentication flows, role-based access control, and data-driven application development. Experience building scalable platforms including LMS ecosystems, job recommendation engines, and billing systems.',
    tags: ['Python', 'Django', 'Flask', 'Node.js', 'ExpressJs', 'PostgreSQL', 'Redis', 'Rust','Axum','Tokio'],
    accent: '#00C8FF',
  },
  {
    icon: 'fa-solid fa-microchip',
    title: 'Embedded Systems',
    desc: 'Firmware and IoT solution development on resource-constrained microcontrollers. Experience integrating sensors, computer vision pipelines, and networked communication between embedded devices and backend systems.',
    tags: ['C++', 'ESP32', 'ESP32-CAM', 'Arduino', 'Wi-Fi/SoftAP'],
    accent: '#F0A832',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'Cybersecurity & Penetration Testing',
    desc: 'Vulnerability assessment, penetration testing in controlled lab environments, SIEM-based monitoring, and secure-by-design development. Hands-on experience with offensive tooling and incident analysis.',
    tags: ['Kali Linux', 'Nmap', 'Metasploit', 'Wazuh', 'Nessus'],
    accent: '#FF4A6E',
  },
  {
    icon: 'fa-solid fa-robot',
    title: 'AI & Machine Learning',
    desc: 'ML-driven application development including LSTM-based prediction models, NLP with transformer architectures, CNN and U-Net-based vision systems, and real-time computer vision integration in embedded and backend contexts using Keras and TensorFlow.',
    tags: ['Python', 'BERT', 'Transformers', 'LSTM', 'CNN', 'U-Net', 'Keras', 'TensorFlow', 'OpenCV'],
    accent: '#8B6FFF',
  },
  {
    icon: 'fa-solid fa-satellite',
    title: 'Real-Time Communication',
    desc: 'WebRTC-based video communication platforms with SFU architecture, signaling server design, session management, and real-time data streaming for multi-user applications.',
    tags: ['WebRTC', 'mediasoup', 'SFU', 'WebSockets', 'Node.js', "Socket.io", "Django Channels","Tokio"],
    accent: '#00E5A0',
  },
  {
    icon: 'fa-solid fa-cloud',
    title: 'Cloud & Distributed Systems',
    desc: 'Cloud application deployment and event-driven architecture design. Experience with AWS infrastructure, asynchronous messaging systems, caching layers, and scalable data processing pipelines.',
    tags: ['AWS', 'Kafka', 'RabbitMQ', 'Redis', 'Elastic Beanstalk','RabbitMQ'],
    accent: '#00C8FF',
  },
];

// ============================================================
// TECH STACK (for node visualization)
// ============================================================


export const STACK_NODES = [
  // --- Languages & Embedded (Left / Top-Left) ---
  { id: 'python',      label: 'Python',        category: 'language',  x: 0.20, y: 0.35 },
  { id: 'rust',        label: 'Rust',          category: 'language',  x: 0.20, y: 0.15 },
  { id: 'javascript',  label: 'JavaScript',    category: 'language',  x: 0.10, y: 0.50 },
  { id: 'cpp',         label: 'C++',           category: 'language',  x: 0.10, y: 0.70 },
  { id: 'sql',         label: 'SQL',           category: 'language',  x: 0.35, y: 0.80 },
  { id: 'esp32',       label: 'ESP32',         category: 'embedded',  x: 0.05, y: 0.85 },

  // --- Runtimes, Frameworks & Core Libraries (Center-Left) ---
  { id: 'tokio',       label: 'Tokio',         category: 'runtime',   x: 0.35, y: 0.15 },
  { id: 'express',     label: 'Express',       category: 'infra',     x: 0.25, y: 0.52 },
  { id: 'django',      label: 'Django',        category: 'infra',     x: 0.38, y: 0.40 },
  { id: 'mediasoup',   label: 'Mediasoup',     category: 'media',     x: 0.25, y: 0.68 },

  // --- Security & Networking (Center) ---
  { id: 'wazuh',       label: 'Wazuh',         category: 'ai',        x: 0.45, y: 0.58 },
  { id: 'cisco',       label: 'Cisco',         category: 'network',   x: 0.52, y: 0.72 },

  // --- Messaging & Queueing (Center-Right) ---
  { id: 'kafka',       label: 'Kafka',         category: 'messaging', x: 0.60, y: 0.45 },
  { id: 'rabbitmq',    label: 'RabbitMQ',      category: 'messaging', x: 0.60, y: 0.30 },

  // --- Databases & Storage (Right / Bottom-Right) ---
  { id: 'postgres',    label: 'PostgreSQL',    category: 'database',  x: 0.75, y: 0.15 },
  { id: 'timescaledb', label: 'TimescaleDB',   category: 'database',  x: 0.90, y: 0.15 },
  { id: 'redis',       label: 'Redis',         category: 'database',  x: 0.78, y: 0.35 },
  { id: 'mongodb',     label: 'MongoDB',       category: 'database',  x: 0.80, y: 0.55 },

  // --- Cloud & Infra (Far Right) ---
  { id: 'aws',         label: 'AWS',           category: 'infra',     x: 0.80, y: 0.75 }
];

export const STACK_EDGES = [
  // --- Existing Connections ---
  ['python',     'postgres'],
  ['python',     'redis'],
  ['python',     'kafka'],
  ['python',     'aws'],
  ['python',     'rabbitmq'],
  ['rust',       'python'],
  ['rust',       'aws'],
  ['rust',       'kafka'],
  ['javascript', 'express'],
  ['javascript', 'python'],
  ['cpp',        'esp32'],
  ['cpp',        'python'],
  ['sql',        'python'],
  ['wazuh',      'kafka'],
  ['aws',        'kafka'],
  ['aws',        'django'],
  ['rabbitmq',   'kafka'],
  ['rabbitmq',   'redis'],
  ['rabbitmq',   'django'],
  ['kafka',      'redis'],
  ['django',     'kafka'],
  ['django',     'postgres'],
  ['django',     'redis'],
  ['django',     'python'],

  // --- New Integrated Connections ---
  // Tokio (Rust async runtime)
  ['rust',       'tokio'],
  ['tokio',      'mediasoup'],

  // Mediasoup (WebRTC server built on C++ / Node)
  ['javascript', 'mediasoup'],
  ['cpp',        'mediasoup'],
  ['express',    'mediasoup'],

  // TimescaleDB (PostgreSQL extension for time-series data)
  ['postgres',   'timescaledb'],
  ['sql',        'timescaledb'],
  ['python',     'timescaledb'],

  // MongoDB (Document database)
  ['express',    'mongodb'],
  ['python',     'mongodb'],
  ['aws',        'mongodb'],

  // Cisco (Network & Infrastructure integration)
  ['cisco',      'aws'],
  ['cisco',      'wazuh'],
  ['esp32',      'cisco']
];

export const STACK_CATEGORIES = {
  language:  { color: '#00C8FF', label: 'Languages' },
  database:  { color: '#F0A832', label: 'Databases' },
  messaging: { color: '#00E5A0', label: 'Messaging' },
  infra:     { color: '#8B6FFF', label: 'Infra' },
  ai:        { color: '#FF4A6E', label: 'Security / AI' },
  embedded:  { color: '#F0A832', label: 'Embedded' },
};

// ============================================================
// CAREER TIMELINE
// ============================================================

export const TIMELINE = [
  {
    id:    'edu-bse',
    year:  '2015-2018',
    type:  'education',
    color: '#00C8FF',
    icon:  'fa-solid fa-graduation-cap',
    title: 'Kenya Certificate of Secondary Education (KCSE)',
    org:   'Alliance High School, Kikuyu',
    desc:  'Completed secondary education with a focus on sciences and mathematics. Graduated with a mean grade of A- (minus) and distinctions in Mathematics, Physics, Chemistry and Business Studies.',
    tags:  ["Mathematics", "Physics", "Chemistry", "Business Studies", "Baseball", "Debate Club","Chinese Club"],
    detail: {
      overview: 'Four-year secondary education with a strong emphasis on STEM subjects, particularly mathematics and physical sciences. Graduated with a mean grade of A- (minus) and distinctions in Mathematics, Physics, Chemistry and Business Studies. Active in extracurriculars including baseball, debate club, and Chinese language club. Developed foundational knowledge in scientific principles, problem-solving skills, and analytical thinking that prepared me for the rigors of engineering studies at the university level.',
      challenges: [
        'Balancing a demanding academic schedule with active participation in multiple extracurricular activities',
      ],
      outcomes: ['Mean grade of A- (minus)', 'Distinctions in 4 subjects', 'Active in extracurriculars'],
      stack: [{ name: 'Mathematics', role: 'Core subject' }, { name: 'Physics', role: 'Core subject' }, { name: 'Chemistry', role: 'Core subject' }, { name: 'Business Studies', role: 'Elective' }],
      pipeline: ['Form 1-4', 'KCSE Exams', 'Graduation', 'University Admission'],
    },
  },
  {
    id:    'edu-bse',
    year:  '2019–2025',
    type:  'education',
    color: '#00C8FF',
    icon:  'fa-solid fa-graduation-cap',
    title: 'B.S. Electronics & Computer Engineering',
    org:   'Jomo Kenyatta University of Agriculture and Technology',
    desc:  'Broad programme covering embedded systems, digital electronics, computer architecture, software development, and signal processing. Graduated Second Class Upper Honors.',
    tags:  ['ECE', 'Embedded Systems', 'Software Development', 'Cybersecurity'],
    detail: {
      overview: 'Five-year programme covering digital logic, microcontroller systems, software engineering, networking, and control theory. Final year included a structured cybersecurity lab project involving penetration testing, SIEM deployment, and incident analysis. Built multiple full-stack and embedded projects throughout the degree.',
      challenges: [
        'Bridging low-level embedded C++ with Python-based backend and ML pipelines',
        'Designing a full virtual penetration testing lab and documenting the attack lifecycle',
        'Implementing real-time video communication with WebRTC and mediasoup SFU architecture',
      ],
      outcomes: ['Second Class Upper Honors', 'Cybersecurity Lab Report', 'Multiple deployed projects'],
      stack: [{ name: 'Python', role: 'Backend & ML' }, { name: 'C++', role: 'Embedded' }, { name: 'JavaScript', role: 'Frontend' }, { name: 'SQL', role: 'Databases' }],
      pipeline: ['Coursework', 'Labs', 'Projects', 'Internships', 'Final Year Project', 'Graduation'],
    },
  },
  {
    id:    'work-intern',
    year:  '2022',
    type:  'work',
    color: '#F0A832',
    icon:  'fa-solid fa-bolt',
    title: 'Electrical Engineering Attaché',
    org:   'Abcos Industrial Limited',
    desc:  'Hands-on participation in industrial electrical panel construction — wiring, frame assembly, installation, and fieldwork. Applied safety standards and worked within structured project timelines.',
    tags:  ['Electrical Panels', 'Wiring', 'Hardware Assembly', 'Fieldwork'],
    detail: {
      overview: 'Industrial attachment focused on the construction and installation of electrical control panels. Participated directly in wiring, component assembly, and field installation work across multiple project sites. Developed an understanding of industrial electrical systems, safety protocols, and collaborative project execution.',
      challenges: [
        'Working to tight installation timelines in live industrial environments',
        'Following strict safety standards during field panel installation',
        'Coordinating tasks across a cross-functional technical team',
      ],
      outcomes: ['Completed full panel installation projects', 'Safety compliance maintained', 'Field installation experience gained'],
      metrics: [
        { label: 'Panel Projects',  value: '3+' },
        { label: 'Duration',        value: '3 months' },
        { label: 'Environment',     value: 'Industrial' },
        { label: 'Team Size',       value: '5+' },
      ],
      stack: [{ name: 'Electrical Systems', role: 'Core work' }, { name: 'Hand Tools', role: 'Assembly' }, { name: 'Safety Standards', role: 'Compliance' }],
      pipeline: ['Briefing', 'Component Prep', 'Panel Wiring', 'Frame Assembly', 'Field Install', 'Sign-off'],
    },
  },
  {
    id:    'work-iot',
    year:  '2023',
    type:  'work',
    color: '#F0A832',
    icon:  'fa-solid fa-microchip',
    title: 'IT Attaché — Systems & Electronics Support',
    org:   'Kitale County Hospital',
    desc:  'System maintenance, database management, networking, and hands-on repair of hospital electronic equipment. Maintained uptime of critical IT infrastructure across departments.',
    tags:  ['IT Support', 'Hardware Repair', 'Networking', 'Database Management'],
    detail: {
      overview: 'Three-month hospital IT attachment covering two functions: IT administration across the hospital\'s networked systems, and electronics maintenance for clinical equipment. Developed practical skills in system monitoring, hardware fault diagnosis, and multi-stakeholder technical support under operational pressure.',
      challenges: [
        'Maintaining system uptime for critical hospital services with minimal downtime windows',
        'Diagnosing and repairing electronic equipment with limited spares availability',
        'Supporting non-technical clinical staff with hardware and software issues',
      ],
      outcomes: ['Critical systems maintained', 'Electronic equipment restored', 'IT admin processes documented'],
      metrics: [
        { label: 'Systems Maintained', value: '20+' },
        { label: 'Duration',           value: '3 months' },
        { label: 'Department',         value: 'IT & Electronics' },
        { label: 'Environment',        value: 'Healthcare' },
      ],
      stack: [{ name: 'Windows/Linux', role: 'OS admin' }, { name: 'Networking', role: 'Infrastructure' }, { name: 'Electronic Tools', role: 'Hardware repair' }],
      pipeline: ['Fault Log', 'Diagnose', 'Repair / Escalate', 'Test', 'Document', 'Close'],
    },
  },
  {
    id:    'work-rts',
    year:  '2024',
    type:  'work',
    color: '#FF4A6E',
    icon:  'fa-solid fa-satellite',
    title: 'IT Support Technician (Attachment)',
    org:   'Kitale National Polytechnic',
    desc:  'Computer maintenance, network support, IT administration, and technical assistance for staff and students. Monitored system performance and conducted software updates across institutional infrastructure.',
    tags:  ['IT Administration', 'Networking', 'Technical Support', 'System Monitoring'],
    detail: {
      overview: 'Three-month institutional IT attachment covering computer lab maintenance, network administration, and end-user technical support. Acted as a liaison between the IT department and the library\'s electronic resources section. Focused on maintaining system reliability and keeping infrastructure current.',
      challenges: [
        'Managing concurrent hardware and software issues across a large multi-lab environment',
        'Coordinating between the IT department and library services for electronic resource availability',
        'Conducting software updates and performance monitoring without disrupting active users',
      ],
      outcomes: ['Lab systems maintained at full capacity', 'User support tickets resolved', 'System update schedule implemented'],
      metrics: [
        { label: 'Systems Managed',  value: '50+' },
        { label: 'Duration',         value: '3 months' },
        { label: 'Support Scope',    value: 'Staff & Students' },
        { label: 'Uptime',           value: 'Maintained' },
      ],
      stack: [{ name: 'Windows/Linux', role: 'OS admin' }, { name: 'Networking', role: 'LAN support' }, { name: 'Hardware Tools', role: 'Maintenance' }, { name: 'Ticketing', role: 'User support' }],
      pipeline: ['Report', 'Triage', 'Diagnose', 'Fix', 'Test', 'Log & Close'],
    },
  },
  {
    id:    'work-infra',
    year:  '2023–now',
    type:  'work',
    color: '#8B6FFF',
    icon:  'fa-solid fa-building',
    title: 'Independent Software Developer',
    org:   'Freelance / Self-Directed Projects',
    desc:  'Designed and built multiple production-grade systems including a WebRTC video platform, LMS with payment integration, job recommendation engine, IoT drowsiness detection prototype, and a Rust-based billing system.',
    tags:  ['Django', 'WebRTC', 'AWS', 'Rust', 'Kafka', 'PostgreSQL'],
    detail: {
      overview: 'Independently designed, built, and deployed a range of full-stack and systems engineering projects spanning real-time communication, embedded computer vision, ML-driven recommendations, cloud infrastructure, and financial data analytics. Projects were deployed on AWS and built with production concerns including authentication, access control, and data integrity.',
      challenges: [
        'Architecting a mediasoup SFU signaling layer for multi-user WebRTC sessions',
        'Integrating M-Pesa Daraja API with Django for real-time payment processing',
        'Running computer vision inference on ESP32-CAM with constrained processing resources',
        'Implementing BERT-based semantic similarity matching for a job recommendation pipeline',
      ],
      outcomes: ['6+ deployed projects', 'AWS production deployments', 'ML models integrated in live systems'],
      metrics: [
        { label: 'Projects Built',   value: '6+' },
        { label: 'Cloud Platform',   value: 'AWS' },
        { label: 'ML Models',        value: 'LSTM, BERT' },
        { label: 'Languages Used',   value: '5' },
      ],
      stack: [{ name: 'Python/Django', role: 'Backend' }, { name: 'Rust/Axum', role: 'Systems' }, { name: 'Node.js', role: 'Real-time' }, { name: 'AWS', role: 'Infra' }, { name: 'PostgreSQL', role: 'Database' }],
      pipeline: ['Design', 'Develop', 'Test', 'Deploy', 'Monitor', 'Iterate'],
    },
  },
  {
    id:    'work-now',
    year:  '2024–Now',
    type:  'work',
    color: '#00E5A0',
    icon:  'fa-solid fa-rocket',
    title: 'Graduate Engineer — Active Development',
    org:   'Independent / Open to Opportunities',
    desc:  'Deepening expertise across backend systems, cybersecurity, and embedded development. Building toward  engineering roles with a focus on secure system design, penetration testing, and distributed architecture.',
    tags:  ['Cybersecurity', 'Penetration Testing', 'Backend', 'Embedded', 'Open to Work'],
    detail: {
      overview: 'Post-graduation phase focused on advancing practical skills in cybersecurity assurance and system engineering. Actively expanding penetration testing capabilities through lab-based practice, studying secure-by-design architecture patterns, and continuing development of backend and embedded systems projects.',
      challenges: [
        'Transitioning from academic lab environments to real-world security assessment frameworks',
        'Building depth in Rust for both systems programming and safety-critical embedded contexts',
        'Preparing for professional cybersecurity certifications and senior engineering readiness',
      ],
      outcomes: ['Active development ongoing', 'Cybersecurity lab portfolio growing', 'Open to junior/mid-level engineering roles'],
      metrics: [
        { label: 'Security Tools',  value: '6+' },
        { label: 'Lab Projects',    value: 'Active' },
        { label: 'Availability',    value: 'Immediate' },
        { label: 'Target Roles',    value: 'SWE / Sec / Embedded' },
      ],
      stack: [{ name: 'Kali Linux', role: 'Security testing' }, { name: 'Rust', role: 'Systems dev' }, { name: 'Wazuh', role: 'SIEM' }, { name: 'Python', role: 'Tooling' }],
      pipeline: ['Learn', 'Lab', 'Build', 'Document', 'Apply', 'Grow'],
    },
  },
];

// ============================================================
// PROJECTS
// ============================================================

export const PROJECTS = [
  {
    id:       'PROJ-001',
    title:    'LMS Ecosystem',
    subtitle: 'Full-Stack Learning Management System with Payment Integration',
    desc:     'A multi-module learning management platform supporting assignments, submissions, grading, student marketplace, and campus events, designed to streamline academic workflows, improve collaboration, and enhance student engagement within a unified digital campus ecosystem that connects learners, instructors, and opportunities.',
    accentBg: 'rgba(0,200,255,0.08)',
    accent:   '#00C8FF',
    tags:     ['Django', 'Node.js', 'WebRTC', 'PostgreSQL', 'Redis'],
    metrics:  [
      { label: 'Auth Roles',       value: '3+' },
      { label: 'Real-Time',        value: 'WebRTC SFU' },
      { label: 'Real-Time',        value: 'Django Channels' },
      { label: 'Cloud',            value: 'AWS' },
    ],
    challenges: [
      'Building a Mediasoup SFU signaling layer for multi-user video sessions',
      'Tracking and recommending events and advertisents across to multiple users',
      'Deployment and monetization ie creating a means to make the site live that is sustainable and getting users',
      'Frontend design, I am majorly a backend engineer',
    ],
    stack: [
      { name: 'Django',      role: 'Backend core' },
      { name: 'Node.js',     role: 'Signaling server' },
      { name: 'mediasoup',   role: 'SFU media engine' },
      { name: 'PostgreSQL',  role: 'Primary database' },
      { name: 'Redis',       role: 'Caching & sessions' },
      {name: 'Celery',      role:  'Background workers and crontabs'},
      {name: 'Django-allauth', role: 'Social Media Oauth'},
      {name: 'Channels',      role:'Websockets & RTC'},
      { name: 'AWS',         role: 'Cloud deployment' },
    ],
    pipeline: ['Auth & RBAC', 'Backend Config', 'FrontEnd Config', 'WebRTC signaling', 'SFU fan-out', 'AWS deploy'],
    archType: 'lms',
  },
  {
    id:       'PROJ-002',
    title:    'Drowsiness Detector',
    subtitle: 'Embedded Computer Vision System on ESP32-CAM & ESP32',
    desc:     'Real-time driver drowsiness detection system using an ESP32-CAM streaming video frames to a Python-based computer vision pipeline for facial landmark analysis and fatigue state classification.',
    accentBg: 'rgba(240,168,50,0.08)',
    accent:   '#F0A832',
    tags:     ['ESP32-CAM','ESP32', 'C++', 'Python', 'OpenCV', 'Keras','Tensorflow','CNN'],
    metrics:  [
      { label: 'Hardware',       value: 'ESP32-CAM' },
      { label: 'Detection',      value: 'Real-time' },
      { label: 'Protocol',       value: 'Websockets' },
      { label: 'Model',         value: 'CNN' },
    ],
    challenges: [
      'Streaming real-time video from ESP32-CAM within constrained memory and power',
      'Achieving reliable facial landmark detection under variable lighting conditions',
      'Synchronising embedded capture hardware with a Python processing backend',
    ],
    stack: [
      { name: 'C++',       role: 'Embedded firmware' },
      { name: 'ESP32-CAM', role: 'Target hardware' },
      { name: 'Python',    role: 'CV pipeline' },
      { name: 'OpenCV',    role: 'Vision processing' },
      { name: 'Wi-Fi',     role: 'Data transport' },
      { name:"CNN",        role: 'Main Model for classification'},
      { name: 'MediaPipe', role: 'Face detection & Landmarks' },
    ],
    pipeline: ['Frame capture', 'Wi-Fi stream', 'Landmark detect', 'Fatigue classify', 'Alert trigger', 'Log'],
    archType: 'embedded',
  },
  {
    id:       'PROJ-003',
    title:    'CyberLab — PenTest & SIEM',
    subtitle: 'Penetration Testing Lab with Wazuh SIEM Integration',
    desc:     'Structured multi-machine virtual penetration testing lab covering the full attack lifecycle — reconnaissance, exploitation, privilege escalation — with Wazuh SIEM monitoring and formal incident reporting.',
    accentBg: 'rgba(255,74,110,0.08)',
    accent:   '#FF4A6E',
    tags:     ['Kali Linux', 'Metasploit', 'Nmap', 'Wazuh', 'Hydra'],
    metrics:  [
      { label: 'Attack Phases',   value: '5' },
      { label: 'SIEM',            value: 'Wazuh' },
      { label: 'Lab Machines',    value: '3' },
      { label: 'Tools Used',      value: '6+' },
    ],
    challenges: [
      'Configuring multi-machine VirtualBox lab with isolated attack and target networks',
      'Executing privilege escalation from low-privilege shell to root-level access',
      'Correlating SIEM log events with observed attack behaviour in real time',
    ],
    stack: [
      { name: 'Kali Linux',   role: 'Attacker machine' },
      { name: 'Wazuh',        role: 'SIEM / log analysis' },
      { name: 'Metasploit',   role: 'Exploitation framework' },
      { name: 'Nmap/Nessus',  role: 'Reconnaissance' },
      { name: 'Hydra',        role: 'Credential attacks' },
      { name: 'VirtualBox',   role: 'Lab virtualisation' },
    ],
    pipeline: ['Recon', 'Vuln Scan', 'Exploit', 'Priv Escalate', 'SIEM Analysis', 'Report'],
    archType: 'cyber-sec',
  },
  {
    id:       'PROJ-004',
    title:    'Job Recommendation Engine',
    subtitle: 'NLP-Powered Career Matching with BERT Embeddings',
    desc:     'Intelligent job recommendation system using BERT-based sentence-transformer embeddings and cosine similarity matching to rank job listings against candidate profiles through structured data pipelines.',
    accentBg: 'rgba(139,111,255,0.08)',
    accent:   '#8B6FFF',
    tags:     ['Python', 'BERT', 'sentence-transformers', 'PostgreSQL', 'Django'],
    metrics:  [
      { label: 'Embedding Model', value: 'BERT' },
      { label: 'Matching',        value: 'Scoring system' },
      { label: 'Pipeline',        value: 'Structured' },
      { label: 'Backend',         value: 'Flask API' },
    ],
    challenges: [
      'Generating and storing high-dimensional embeddings efficiently at query time',
      'Designing a data pipeline that keeps candidate and listing vectors in sync',
      'Balancing recommendation relevance with query response latency',
    ],
    stack: [
      { name: 'Python',               role: 'Pipeline & API' },
      { name: 'sentence-transformers', role: 'BERT embeddings' },
      { name: 'Flask',               role: 'Backend framework' },
      { name: 'PostgreSQL',           role: 'Data storage' },
      { name: 'Redis',                role: 'Result caching' },
    ],
    pipeline : ['Job ingestion (spiders)', 'Extract & clean (ItemLoaders, etc)', 'Normalize & structure data', 'Store in PostgreSQL', 'Cache & track trends (Redis)', 'Generate embeddings (Sentence Transformers)', 'Extract skills (spaCy + SkillNer)', 'Compute similarity (RapidFuzz + vectors)', 'Rank job matches', 'Filter & paginate results', 'Expose via Flask API', 'Serve recommendations to frontend'],
    archType: 'job-sys',
  },
  {
  id:       'PROJ-005',
  title:    'AetherNet Communication System',
  subtitle: 'Modular Rust-Based Multi-Channel Communication Architecture',
  desc:     'A modular Rust communication system supporting structured handling of text, media, and real-time server-client messaging with validation, routing, and extensible transport modules for scalable distributed communication.',
  accentBg: 'rgba(0,200,255,0.08)',
  accent:   '#00C8FF',
  tags:     ['Rust', 'Tokio', 'Axum', 'PostgreSQL', 'WebSockets', 'Serde', 'SeaORM'],

  metrics: [
    { label: 'Architecture', value: 'Modular System' },
    { label: 'Transport',    value: 'WebSockets / TCP / UDP' },
    { label: 'Backend',      value: 'Axum + Tokio' },
    { label: 'Storage',      value: 'PostgreSQL (SeaORM)' },
  ],

  challenges: [
    'Designing modular communication layers for heterogeneous data types',
    'Ensuring safe concurrent message routing in Rust ownership model',
    'Handling real-time server-client messaging with low latency',
    'Building extensible transport layers for future media support (VoIP, video)',
  ],

  stack: [
    { name: 'Rust',    role: 'Core System Language' },
    { name: 'Tokio',   role: 'Async Runtime' },
    { name: 'Axum',    role: 'Server Framework' },
    { name: 'Serde',   role: 'Serialization Layer' },
    { name: 'SeaORM',  role: 'Database ORM' },
    { name: 'PostgreSQL', role: 'Persistent Storage' },
  ],

  pipeline: [
    'Client connection initialization',
    'Session assignment & authentication',
    'Message ingestion (Text/Media/Audio/Video)',
    'Text processing (cleaning, validation, detection)',
    'Metadata enrichment (delivery, encryption, state)',
    'Server routing & WebSocket dispatch',
    'Database persistence (PostgreSQL via SeaORM)',
    'Logging & system monitoring',
    'Client response delivery',
    'Optional media transport (UDP/QUIC expansion)'
  ],

  archType: 'rust-comms'
},
{
  id:       'PROJ-006',
  title:    'EdPal Learning Platform',
  subtitle: 'Self Evaluation and Career Recommdation system',
  desc:     'EdPal is a career guidance and self-assessment platform built for learners aged 12–18. It combines academic performance analysis with psychometric assessments to generate personalized career recommendations aligned with individual strengths, interests, and long-term aspirations. The assessment and recommendation framework is developed in collaboration with educators and education specialists throughout Kenya.',
  accentBg: 'rgba(46,204,113,0.08)',
  accent:   '#2ECC71',
  tags: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'JavaScript'],

  metrics: [
    { label: 'Platform', value: 'Full Evaluation and Recommendation Ecosystem' },
    { label: 'Architecture', value: 'Modular Django Apps' },
    { label: 'Realtime', value: 'WebSockets' },
    { label: 'Deployment', value: 'WSGI + Celery' },
  ],

  challenges: [
    'Designing a robust scoring engine for academic and psychometric assessments',
    'Developing a flexible evaluation engine capable of supporting multiple assessment methodologies',
    'Building an intelligent recommendation engine that accurately maps learner profiles to suitable career pathways',
    'Maintaining a modular application architecture to support independent feature development and scalability',
    'Addressing data scarcity by integrating and validating information from trusted third-party educational resources',
  ],

  stack: [
    { name: 'Python', role: 'Backend Language' },
    { name: 'Django', role: 'Application Framework' },
    { name: 'Django REST Framework', role: 'REST APIs' },
    { name: 'PostgreSQL', role: 'Relational Database' },
    { name: 'Redis', role: 'Caching & Message Broker' },
    { name: 'Celery', role: 'Background Processing' },
    { name: 'JavaScript', role: 'Frontend Interactivity' },
  ],

  pipeline: [
    'User authentication & role validation',
    'Course and academic resource management',
    'Assignment creation & submissions',
    'AI-assisted learning and recommendations',
    'Career assessment & analytics engine',
    'Real-time messaging & notifications',
    'Background processing with Celery',
    'Analytics & reporting dashboard',
    'Institution administration & monitoring',
    'Secure data persistence'
  ],

  archType: 'edpal'
},
{
  id:       'PROJ-007',
  title:    'NexStream',
  subtitle: 'Real-Time Video Conferencing & Media Streaming Platform',
  desc:     'A scalable Selective Forwarding Unit (SFU) platform enabling secure low-latency video conferencing, screen sharing, live collaboration, and media streaming using Mediasoup, WebRTC, Socket.IO, and Node.js.',
  accentBg: 'rgba(52,152,219,0.08)',
  accent:   '#3498DB',
  tags: ['Node.js', 'Express', 'Socket.IO', 'Mediasoup', 'WebRTC', 'Redis', 'PostgreSQL'],

  metrics: [
    { label: 'Streaming', value: 'WebRTC SFU' },
    { label: 'Architecture', value: 'Distributed Media Server' },
    { label: 'Realtime', value: 'Socket.IO' },
    { label: 'Media', value: 'Low Latency Video' },
  ],

  challenges: [
    'Managing large-scale peer media routing using SFU architecture',
    'Synchronizing signaling with media transport',
    'Optimizing bandwidth using producer-consumer media streams',
    'Handling reconnections, recording, and participant state management',
  ],

  stack: [
    { name: 'Node.js', role: 'Backend Runtime' },
    { name: 'Express', role: 'API Framework' },
    { name: 'Mediasoup', role: 'Selective Forwarding Unit' },
    { name: 'WebRTC', role: 'Media Transport' },
    { name: 'Socket.IO', role: 'Realtime Signaling' },
    { name: 'Redis', role: 'Shared Session Store' },
    { name: 'PostgreSQL', role: 'Persistent Storage' },
  ],

  pipeline: [
    'User authentication & room authorization',
    'WebSocket signaling initialization',
    'Router & transport creation',
    'Producer media publishing',
    'Consumer subscription management',
    'Adaptive bitrate & media forwarding',
    'Screen sharing & media synchronization',
    'Recording & metadata storage',
    'Participant monitoring',
    'Session termination & cleanup'
  ],

  archType: 'mediasoup-sfu'
},
{
  id:       'PROJ-008',
  title:    'NexCore',
  subtitle: 'AI-Driven Algorithmic Trading & Quantitative Research Platform',
  desc:     'A quantitative trading platform for research, strategy development, backtesting, paper trading, and live execution. The system integrates machine learning models, financial analytics, risk management, and broker connectivity into a unified trading workflow.',
  accentBg: 'rgba(255,140,0,0.08)',
  accent:   '#FF8C00',
  tags: ['Python', 'Django', 'NautilusTrader', 'Keras', 'LSTM', 'PostgreSQL', 'Celery', 'Redis','Kafka', 'Minio'],

  metrics: [
    { label: 'Trading', value: 'Algorithmic Platform' },
    { label: 'Backtesting', value: 'NautilusTrader' },
    { label: 'Analytics', value: 'AI & ML Models' },
    { label: 'Execution', value: 'Paper / Live Trading' },
  ],

  challenges: [
    'Building an end-to-end quantitative research workflow',
    'Managing large volumes of historical market data efficiently',
    'Designing reusable strategy interfaces for multiple trading models',
    'Integrating machine learning predictions with risk management and execution',
  ],

  stack: [
    { name: 'Python', role: 'Core Development' },
    { name: 'Django', role: 'Web Platform' },
    { name: 'NautilusTrader', role: 'Backtesting Engine' },
    { name: 'Keras', role: 'Machine Learning' },
    { name: 'PostgreSQL', role: 'Market Data Storage' },
    { name: 'Redis', role: 'Caching & Task Queue' },
    { name: 'Celery', role: 'Background Processing' },
  ],

  pipeline: [
    'Historical market data ingestion',
    'Data cleaning & normalization',
    'Feature engineering',
    'Strategy signal generation',
    'Machine learning prediction',
    'Risk management validation',
    'Backtesting & performance evaluation',
    'Paper trading simulation',
    'Broker execution interface',
    'Performance analytics & reporting'
  ],

  archType: 'quant-platform'
},
];

// ============================================================
// TERMINAL LOG LINES
// ============================================================

export const TERMINAL_LINES = [
  { type: 'comment', text: '# Simon Wekesa — Engineering Workspace' },

  // Git
  { type: 'prompt', text: 'git status' },
  { type: 'output', text: 'On branch main' },
  { type: 'output', text: 'Working tree clean ✓' },

  { type: 'prompt', text: 'git log --oneline -3' },
  { type: 'output', text: 'a18c42f feat(auth): migrate Node server to Auth.js' },
  { type: 'output', text: '91ef0da feat(sfu): optimize mediasoup transport routing' },
  { type: 'output', text: '7b1a6d3 feat(edpal): improve recommendation scoring engine' },

  // EdPal
  { type: 'prompt', text: 'python manage.py runserver' },
  { type: 'success', text: 'EdPal LMS running → http://127.0.0.1:8000/' },

  { type: 'prompt', text: 'celery -A edpal inspect active' },
  { type: 'output', text: '3 workers online — recommendation queue healthy' },

  { type: 'prompt', text: 'python manage.py careers:evaluate --student=1024' },
  { type: 'output', text: 'Academic score.............91%' },
  { type: 'output', text: 'Psychometric profile.......Analytical / Creative' },
  { type: 'success', text: 'Recommended pathway → Software Engineering (0.96)' },

  // NexStream
  { type: 'prompt', text: 'docker compose ps nexstream' },
  { type: 'output', text: 'express-api     healthy' },
  { type: 'output', text: 'mediasoup-sfu   healthy' },
  { type: 'output', text: 'redis           healthy' },

  { type: 'prompt', text: 'curl localhost:3000/api/status' },
  { type: 'success', text: 'Active rooms: 28 | Participants: 147 | Avg latency: 32ms' },

  // NexCore
  { type: 'prompt', text: 'python backtest.py --strategy lstm_breakout' },
  { type: 'output', text: 'Loading 2 years of OHLCV market data...' },
  { type: 'output', text: 'Training PyTorch LSTM model...' },
  { type: 'output', text: 'Running NautilusTrader backtest...' },
  { type: 'success', text: 'Sharpe: 2.14 | Max DD: 6.8% | Win Rate: 63.4%' },

  // Rust
  { type: 'prompt', text: 'cargo test --release' },
  { type: 'success', text: 'AetherNet → 94 tests passed (0 failed)' },

  // Auth.js
  { type: 'prompt', text: 'npm run dev' },
  { type: 'output', text: 'Express server listening on :3000' },
  { type: 'output', text: 'Auth.js initialized ✓ JWT strategy active' },

  // Database
  { type: 'prompt', text: 'psql -c "SELECT COUNT(*) FROM users;"' },
  { type: 'output', text: 'users: 18,472' },

  { type: 'prompt', text: 'redis-cli INFO memory | grep used_memory_human' },
  { type: 'output', text: 'used_memory_human:182.6M' },

  // DevOps
  { type: 'prompt', text: 'kubectl get pods -n production' },
  { type: 'output', text: 'edpal-api-6fc88      Running' },
  { type: 'output', text: 'nexstream-sfu-0      Running' },
  { type: 'output', text: 'postgres-primary     Running' },
  { type: 'output', text: 'redis-master         Running' },

  // Security
  { type: 'prompt', text: 'tail -3 /var/ossec/logs/alerts/alerts.log' },
  { type: 'output', text: '[HIGH] SSH brute-force blocked' },
  { type: 'output', text: 'Attacker: 192.168.56.101 (Kali Linux)' },
  { type: 'success', text: 'Wazuh active response executed successfully' },

  // Embedded
  { type: 'prompt', text: 'esptool.py flash_id --port /dev/ttyUSB0' },
  { type: 'output', text: 'ESP32 detected — Flash 4MB' },

  { type: 'prompt', text: 'python drowsiness_detector.py' },
  { type: 'output', text: 'Camera initialized @ 30 FPS' },
  { type: 'output', text: 'EAR = 0.312' },
  { type: 'success', text: 'Driver Status → AWAKE' },

  // AI
  { type: 'prompt', text: 'python embeddings.py' },
  { type: 'output', text: 'SentenceTransformer loaded (all-MiniLM-L6-v2)' },
  { type: 'output', text: 'Generating 1,240 embeddings...' },
  { type: 'success', text: 'Vector index updated successfully' },

  // Deployment
  { type: 'prompt', text: 'git push origin main' },
  { type: 'output', text: 'GitHub Actions pipeline started...' },
  { type: 'output', text: 'Running tests...' },
  { type: 'output', text: 'Deploying to production...' },
  { type: 'success', text: 'Deployment completed ✓ Zero downtime' },

  { type: 'comment', text: '# Ready for the next challenge.' }
];

// ============================================================
// ANIMATION SETTINGS
// ============================================================

export const ANIM = {
  revealThreshold:  0.12,
  revealRootMargin: '0px 0px -60px 0px',
  particleCount: { desktop: 120, mobile: 50 },
  terminalSpeed:  40,   // ms per character
  terminalDelay:  600,  // ms between lines
};