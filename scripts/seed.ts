import "dotenv/config"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import Roadmap from "@/models/Roadmap"

const roadmaps = [
  // ─────────────────────────────────────────
  // 1. FRONTEND DEVELOPER
  // ─────────────────────────────────────────
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    description:
      "Pelajari cara membangun website modern dari nol hingga siap kerja menggunakan teknologi frontend terbaru.",
    category: "Programming",
    icon: "Code2",
    level: "Pemula",
    estimatedWeeks: 16,
    totalNodes: 16,
    nodes: [
      {
        id: "internet-basics",
        order: 1,
        estimatedDays: 3,
        difficulty: "Pemula",
        title: "Cara Kerja Internet",
        description:
          "Pahami fondasi sebelum mulai coding. Pelajari DNS, HTTP, browser, dan hosting agar memahami bagaimana website bekerja dari awal sampai tampil di layar pengguna.",
        subtopics: [
          "Apa itu internet",
          "DNS & domain",
          "HTTP vs HTTPS",
          "Cara browser render halaman",
          "Web server & hosting",
          "Client-server model",
        ],
        resources: [
          {
            type: "docs",
            title: "MDN - How the Web Works",
            url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work",
          },
          {
            type: "youtube",
            title: "How the Internet Works in 5 Minutes",
            url: "https://www.youtube.com/watch?v=7_LPdttKXPc",
          },
          {
            type: "website",
            title: "web.dev Learn",
            url: "https://web.dev/learn",
          },
        ],
      },
      {
        id: "html",
        order: 2,
        estimatedDays: 7,
        difficulty: "Pemula",
        title: "HTML Dasar",
        description:
          "HTML adalah fondasi semua halaman web. Pelajari struktur, elemen penting, serta praktik semantik HTML5 untuk membuat website yang rapi dan mudah dipahami browser.",
        subtopics: [
          "Struktur dokumen",
          "Heading & paragraf",
          "Link & gambar",
          "Form & input",
          "Tabel",
          "HTML Semantik",
          "Atribut global",
        ],
        resources: [
          {
            type: "docs",
            title: "MDN HTML Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
          },
          {
            type: "youtube",
            title: "Web Programming UNPAS - HTML Dasar",
            url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
          },
          {
            type: "website",
            title: "W3Schools HTML",
            url: "https://www.w3schools.com/html/",
          },
        ],
      },
      {
        id: "css",
        order: 3,
        estimatedDays: 10,
        difficulty: "Pemula",
        title: "CSS Dasar",
        description:
          "CSS digunakan untuk mengatur tampilan website. Kuasai layout modern seperti Flexbox dan Grid serta teknik responsive design yang dipakai di industri.",
        subtopics: [
          "Selector & spesifisitas",
          "Box model",
          "Flexbox layout",
          "CSS Grid",
          "Positioning",
          "Pseudo-class/element",
          "Variabel CSS",
          "Transisi sederhana",
        ],
        resources: [
          {
            type: "docs",
            title: "MDN CSS Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
          },
          {
            type: "youtube",
            title: "UNPAS CSS Lengkap",
            url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
          },
          {
            type: "website",
            title: "CSS Tricks Flexbox Guide",
            url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
          },
        ],
      },
      {
        id: "javascript",
        order: 4,
        estimatedDays: 21,
        difficulty: "Pemula",
        title: "JavaScript",
        description:
          "JavaScript adalah bahasa utama frontend modern. Pelajari dasar hingga async programming untuk membuat website interaktif dan dinamis.",
        subtopics: [
          "Variabel & tipe data",
          "Function & scope",
          "Array & Object methods",
          "DOM Manipulation",
          "Event handling",
          "Fetch API",
          "ES6+ features",
          "Async/Await & Promise",
        ],
        resources: [
          {
            type: "website",
            title: "javascript.info",
            url: "https://javascript.info",
          },
          {
            type: "docs",
            title: "MDN JavaScript Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          },
          {
            type: "youtube",
            title: "PZN JavaScript Dasar",
            url: "https://www.youtube.com/watch?v=SDROba_M42g",
          },
        ],
      },
      {
        id: "git-github",
        order: 5,
        estimatedDays: 5,
        difficulty: "Pemula",
        title: "Git & GitHub",
        description:
          "Version control wajib untuk semua developer. Pelajari cara mengelola kode, kolaborasi, dan membangun portfolio GitHub profesional.",
        subtopics: [
          "Instalasi & config",
          "git add/commit/push",
          "Branch & merge",
          "Pull request",
          "Merge conflict",
          "GitHub profile & README",
          "Portfolio GitHub",
        ],
        resources: [
          {
            type: "docs",
            title: "GitHub Docs",
            url: "https://docs.github.com",
          },
          {
            type: "youtube",
            title: "PZN Git & GitHub",
            url: "https://www.youtube.com/watch?v=lTMZxWMjXQU",
          },
          {
            type: "website",
            title: "Learn Git Branching",
            url: "https://learngitbranching.js.org/",
          },
        ],
      },
      {
        id: "responsive-design",
        order: 6,
        estimatedDays: 7,
        difficulty: "Pemula",
        title: "Responsive Design",
        description:
          "Website modern harus tampil baik di semua ukuran layar. Pelajari pendekatan mobile-first dan media query untuk membuat UI responsif.",
        subtopics: [
          "Mobile-first approach",
          "Media queries",
          "Viewport meta tag",
          "Gambar responsif",
          "Fluid typography",
          "Flexbox responsif",
          "Grid responsif",
        ],
        resources: [
          {
            type: "website",
            title: "web.dev Responsive Design",
            url: "https://web.dev/learn/design",
          },
          {
            type: "docs",
            title: "MDN Responsive Design",
            url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
          },
          {
            type: "youtube",
            title: "freeCodeCamp Responsive Web Design",
            url: "https://www.youtube.com/watch?v=srvUrASNj0s",
          },
        ],
      },
      {
        id: "tailwind-css",
        order: 7,
        estimatedDays: 7,
        difficulty: "Pemula",
        title: "Tailwind CSS v4",
        description:
          "Tailwind CSS adalah framework utility-first populer yang mempercepat proses styling modern dengan workflow yang konsisten dan scalable.",
        subtopics: [
          "Konsep utility-first",
          "Instalasi & config v4",
          "Typography & spacing",
          "Flexbox & Grid Tailwind",
          "Responsive prefix",
          "Dark mode",
          "@theme customization",
        ],
        resources: [
          {
            type: "docs",
            title: "Tailwind CSS Docs",
            url: "https://tailwindcss.com/docs",
          },
          {
            type: "youtube",
            title: "UNPAS Tailwind CSS",
            url: "https://www.youtube.com/watch?v=elgqxmdVms8",
          },
          {
            type: "website",
            title: "Tailwind Playground",
            url: "https://play.tailwindcss.com",
          },
        ],
      },
      {
        id: "react-basics",
        order: 8,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "React Dasar",
        description:
          "Pelajari React untuk membangun UI modern berbasis komponen. Kuasai state, props, dan rendering dinamis.",
        subtopics: [
          "Komponen & JSX",
          "Props",
          "useState",
          "useEffect",
          "Event handling",
          "Conditional rendering",
          "List & key",
          "React DevTools",
        ],
        resources: [
          {
            type: "docs",
            title: "React Learn",
            url: "https://react.dev/learn",
          },
          {
            type: "youtube",
            title: "PZN React JS",
            url: "https://www.youtube.com/watch?v=4hQAHC5DGlw",
          },
          {
            type: "course",
            title: "Scrimba React Tutorial",
            url: "https://scrimba.com/learn/learnreact",
          },
        ],
      },
      {
        id: "react-advanced",
        order: 9,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "React Lanjutan",
        description:
          "Pelajari hooks lanjutan dan pola React modern untuk project production-scale dan maintainable.",
        subtopics: [
          "useContext",
          "useReducer",
          "Custom Hooks",
          "React Router",
          "useMemo & useCallback",
          "Error Boundary",
          "Composition pattern",
        ],
        resources: [
          {
            type: "docs",
            title: "React Reference",
            url: "https://react.dev/reference/react",
          },
          {
            type: "website",
            title: "Patterns.dev",
            url: "https://www.patterns.dev",
          },
          {
            type: "youtube",
            title: "UNPAS React Hooks",
            url: "https://www.youtube.com/watch?v=L8KX8dK6Sko",
          },
        ],
      },
      {
        id: "nextjs",
        order: 10,
        estimatedDays: 12,
        difficulty: "Menengah",
        title: "Next.js 15",
        description:
          "Framework React production-ready dengan App Router, Server Components, dan optimasi performa modern.",
        subtopics: [
          "App Router",
          "Server Components",
          "Data fetching",
          "Route Handlers",
          "Image optimization",
          "Metadata & SEO",
          "Deploy Vercel",
        ],
        resources: [
          {
            type: "docs",
            title: "Next.js Docs",
            url: "https://nextjs.org/docs",
          },
          {
            type: "course",
            title: "Next.js Learn",
            url: "https://nextjs.org/learn",
          },
          {
            type: "youtube",
            title: "Sonny Sangha Next.js",
            url: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
          },
        ],
      },
      {
        id: "typescript",
        order: 11,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "TypeScript",
        description:
          "TypeScript membantu membuat kode lebih aman dan mudah dirawat dengan sistem tipe statis yang powerful.",
        subtopics: [
          "Tipe dasar",
          "Interface",
          "Generic",
          "React types",
          "Utility types",
          "Union type",
          "Migrasi JS ke TS",
        ],
        resources: [
          {
            type: "docs",
            title: "TypeScript Docs",
            url: "https://www.typescriptlang.org/docs/",
          },
          {
            type: "website",
            title: "TypeScript Playground",
            url: "https://www.typescriptlang.org/play",
          },
          {
            type: "youtube",
            title: "PZN TypeScript",
            url: "https://www.youtube.com/watch?v=JWwSVOo5K_k",
          },
        ],
      },
      {
        id: "api-integration",
        order: 12,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "REST API & Fetch",
        description:
          "Pelajari cara mengambil data dari API dan mengelola loading, error, serta autentikasi di aplikasi modern.",
        subtopics: [
          "REST API",
          "HTTP methods",
          "Fetch API",
          "Axios",
          "TanStack Query",
          "CORS",
          "Auth header",
        ],
        resources: [
          {
            type: "docs",
            title: "MDN Fetch API",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
          },
          {
            type: "website",
            title: "JSONPlaceholder",
            url: "https://jsonplaceholder.typicode.com",
          },
          {
            type: "docs",
            title: "TanStack Query",
            url: "https://tanstack.com/query/latest",
          },
        ],
      },
      {
        id: "state-management",
        order: 13,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "State Management",
        description:
          "Kelola state aplikasi skala besar menggunakan tools modern seperti Zustand dan Redux Toolkit.",
        subtopics: [
          "Kapan butuh state management",
          "Zustand",
          "Redux Toolkit",
          "Jotai",
          "Client vs server state",
          "Context API",
        ],
        resources: [
          {
            type: "docs",
            title: "Zustand Docs",
            url: "https://docs.pmnd.rs/zustand/getting-started/introduction",
          },
          {
            type: "docs",
            title: "Redux Toolkit",
            url: "https://redux-toolkit.js.org",
          },
          {
            type: "youtube",
            title: "Zustand Tutorial",
            url: "https://www.youtube.com/watch?v=_ngCLZ5Iz-0",
          },
        ],
      },
      {
        id: "deployment",
        order: 14,
        estimatedDays: 3,
        difficulty: "Pemula",
        title: "Deploy ke Vercel",
        description:
          "Publish website Next.js ke internet menggunakan Vercel dengan workflow modern dan mudah.",
        subtopics: [
          "Akun Vercel",
          "Connect GitHub",
          "Environment variables",
          "Custom domain",
          "Preview deployment",
          "Analytics",
          "Rollback",
        ],
        resources: [
          {
            type: "docs",
            title: "Vercel Docs",
            url: "https://vercel.com/docs",
          },
          {
            type: "youtube",
            title: "Deploy Next.js ke Vercel",
            url: "https://www.youtube.com/watch?v=VqgTr-nd7Cg",
          },
          {
            type: "website",
            title: "Vercel",
            url: "https://vercel.com",
          },
        ],
      },
      {
        id: "portfolio",
        order: 15,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "Buat Portfolio",
        description:
          "Bangun portfolio profesional untuk menunjukkan kemampuan frontend development ke recruiter dan klien.",
        subtopics: [
          "Project terbaik",
          "Deskripsi project",
          "GitHub optimization",
          "Deploy portfolio",
          "Responsive",
          "Analytics",
        ],
        resources: [
          {
            type: "website",
            title: "Awwwards Portfolio",
            url: "https://www.awwwards.com/websites/portfolio/",
          },
          {
            type: "youtube",
            title: "Portfolio Developer UNPAS",
            url: "https://www.youtube.com/watch?v=ldwlOzRvYOU",
          },
          {
            type: "website",
            title: "Vercel Templates",
            url: "https://vercel.com/templates",
          },
        ],
      },
      {
        id: "job-ready",
        order: 16,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Job Ready",
        description:
          "Persiapkan diri untuk masuk industri frontend developer Indonesia dengan CV, LinkedIn, dan latihan interview.",
        subtopics: [
          "LinkedIn developer",
          "CV tech",
          "Platform job",
          "Tips magang",
          "Interview teknikal",
          "HackerRank",
          "Negosiasi salary",
        ],
        resources: [
          {
            type: "website",
            title: "Glints",
            url: "https://glints.com/id",
          },
          {
            type: "website",
            title: "Kalibrr",
            url: "https://kalibrr.com",
          },
          {
            type: "youtube",
            title: "Interview Frontend Indonesia",
            url: "https://www.youtube.com/results?search_query=interview+frontend+developer+indonesia",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 2. BACKEND DEVELOPER
  // ─────────────────────────────────────────
  {
    slug: "backend-developer",
    title: "Backend Developer",
    description:
      "Pelajari cara membangun server, API, dan database yang scalable menggunakan Node.js dan teknologi backend modern.",
    category: "Programming",
    icon: "Server",
    level: "Menengah",
    estimatedWeeks: 18,
    totalNodes: 14,
    nodes: [
      {
        id: "backend-internet",
        order: 1,
        estimatedDays: 3,
        difficulty: "Pemula",
        title: "Cara Kerja Internet & Web",
        description:
          "Sebelum membangun server, pahami dulu bagaimana request dan response bekerja, termasuk HTTP, DNS, dan arsitektur client-server.",
        subtopics: [
          "HTTP/HTTPS & metode request",
          "DNS & hosting",
          "Client-server model",
          "REST vs GraphQL",
          "Status code HTTP",
          "Header & body request",
        ],
        resources: [
          {
            type: "docs",
            title: "MDN HTTP Overview",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
          },
          {
            type: "youtube",
            title: "How the Backend Works",
            url: "https://www.youtube.com/watch?v=XBu54nfzxAQ",
          },
          {
            type: "website",
            title: "roadmap.sh Backend",
            url: "https://roadmap.sh/backend",
          },
        ],
      },
      {
        id: "backend-javascript",
        order: 2,
        estimatedDays: 14,
        difficulty: "Pemula",
        title: "JavaScript & Node.js Dasar",
        description:
          "Node.js memungkinkan JavaScript berjalan di server. Pelajari dasar JS modern dan ekosistem Node.js untuk memulai backend development.",
        subtopics: [
          "ES6+ fundamentals",
          "Async/Await & Promise",
          "Node.js module system",
          "npm & package.json",
          "File system (fs)",
          "Environment variables",
          "Event emitter",
        ],
        resources: [
          {
            type: "docs",
            title: "Node.js Docs",
            url: "https://nodejs.org/en/docs",
          },
          {
            type: "youtube",
            title: "PZN Node.js Dasar",
            url: "https://www.youtube.com/watch?v=oNVzBJMeubk",
          },
          {
            type: "website",
            title: "javascript.info",
            url: "https://javascript.info",
          },
        ],
      },
      {
        id: "git-backend",
        order: 3,
        estimatedDays: 3,
        difficulty: "Pemula",
        title: "Git & GitHub",
        description:
          "Version control adalah keterampilan wajib developer. Pelajari workflow Git untuk kolaborasi tim dan manajemen kode backend.",
        subtopics: [
          "git init/add/commit/push",
          "Branching strategy",
          "Pull request & code review",
          "Merge conflict resolution",
          ".gitignore",
          "GitHub Actions dasar",
        ],
        resources: [
          {
            type: "docs",
            title: "GitHub Docs",
            url: "https://docs.github.com",
          },
          {
            type: "youtube",
            title: "PZN Git & GitHub",
            url: "https://www.youtube.com/watch?v=lTMZxWMjXQU",
          },
          {
            type: "website",
            title: "Learn Git Branching",
            url: "https://learngitbranching.js.org/",
          },
        ],
      },
      {
        id: "express-js",
        order: 4,
        estimatedDays: 10,
        difficulty: "Pemula",
        title: "Express.js",
        description:
          "Express adalah framework Node.js paling populer untuk membangun REST API. Pelajari routing, middleware, dan penanganan error.",
        subtopics: [
          "Setup & struktur project",
          "Routing & HTTP methods",
          "Middleware",
          "Request & Response object",
          "Error handling",
          "Static files",
          "Express Router",
        ],
        resources: [
          {
            type: "docs",
            title: "Express.js Docs",
            url: "https://expressjs.com",
          },
          {
            type: "youtube",
            title: "PZN Express JS",
            url: "https://www.youtube.com/watch?v=aZ5oiQgp3Cc",
          },
          {
            type: "website",
            title: "roadmap.sh Express",
            url: "https://roadmap.sh/nodejs",
          },
        ],
      },
      {
        id: "database-sql",
        order: 5,
        estimatedDays: 12,
        difficulty: "Menengah",
        title: "Database SQL (PostgreSQL)",
        description:
          "Relational database adalah fondasi mayoritas aplikasi backend. Kuasai SQL dan manajemen database dengan PostgreSQL.",
        subtopics: [
          "Konsep relational database",
          "DDL & DML",
          "SELECT, JOIN, WHERE",
          "Primary & Foreign key",
          "Indexing",
          "Transaction & ACID",
          "Normalisasi tabel",
        ],
        resources: [
          {
            type: "docs",
            title: "PostgreSQL Docs",
            url: "https://www.postgresql.org/docs/",
          },
          {
            type: "youtube",
            title: "PZN PostgreSQL",
            url: "https://www.youtube.com/watch?v=GZ3okIKGMDs",
          },
          {
            type: "website",
            title: "SQLZoo",
            url: "https://sqlzoo.net",
          },
        ],
      },
      {
        id: "database-nosql",
        order: 6,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Database NoSQL (MongoDB)",
        description:
          "MongoDB cocok untuk data yang fleksibel dan tidak terstruktur. Pelajari operasi CRUD dan integrasi dengan Mongoose.",
        subtopics: [
          "Konsep document database",
          "CRUD operasi",
          "Mongoose ODM",
          "Schema & model",
          "Populate & referensi",
          "Aggregation pipeline",
          "Indexing MongoDB",
        ],
        resources: [
          {
            type: "docs",
            title: "MongoDB Docs",
            url: "https://www.mongodb.com/docs/",
          },
          {
            type: "youtube",
            title: "PZN MongoDB",
            url: "https://www.youtube.com/watch?v=oPxEPOzWmGI",
          },
          {
            type: "website",
            title: "MongoDB University",
            url: "https://learn.mongodb.com",
          },
        ],
      },
      {
        id: "rest-api-design",
        order: 7,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "REST API Design",
        description:
          "Belajar merancang dan membangun REST API yang clean, konsisten, dan mudah dikonsumsi oleh frontend.",
        subtopics: [
          "Prinsip REST",
          "Naming convention endpoint",
          "Status code best practice",
          "Pagination & filtering",
          "Versioning API",
          "Error response format",
          "API dokumentasi (Swagger)",
        ],
        resources: [
          {
            type: "website",
            title: "REST API Tutorial",
            url: "https://restfulapi.net",
          },
          {
            type: "docs",
            title: "Swagger / OpenAPI",
            url: "https://swagger.io/docs/",
          },
          {
            type: "youtube",
            title: "REST API Design Best Practices",
            url: "https://www.youtube.com/watch?v=-mN3VyJuCjM",
          },
        ],
      },
      {
        id: "auth-security",
        order: 8,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "Autentikasi & Keamanan",
        description:
          "Keamanan adalah prioritas backend. Pelajari JWT, OAuth, hashing password, dan teknik keamanan API yang wajib dikuasai.",
        subtopics: [
          "Hashing & bcrypt",
          "JWT (JSON Web Token)",
          "OAuth 2.0 & Google Login",
          "Session vs Token",
          "Middleware auth",
          "CORS",
          "Rate limiting",
          "Helmet.js",
        ],
        resources: [
          {
            type: "website",
            title: "JWT.io",
            url: "https://jwt.io",
          },
          {
            type: "youtube",
            title: "PZN JWT Authentication",
            url: "https://www.youtube.com/watch?v=UBUNrFtufWo",
          },
          {
            type: "docs",
            title: "OWASP Top 10",
            url: "https://owasp.org/www-project-top-ten/",
          },
        ],
      },
      {
        id: "typescript-backend",
        order: 9,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "TypeScript untuk Backend",
        description:
          "TypeScript meningkatkan kualitas kode backend dengan type safety. Pelajari penggunaan TypeScript di Node.js dan Express.",
        subtopics: [
          "Tipe dasar & interface",
          "Generic",
          "Utility types",
          "Konfigurasi tsconfig",
          "Type di Express",
          "Zod untuk validasi",
        ],
        resources: [
          {
            type: "docs",
            title: "TypeScript Docs",
            url: "https://www.typescriptlang.org/docs/",
          },
          {
            type: "youtube",
            title: "PZN TypeScript",
            url: "https://www.youtube.com/watch?v=JWwSVOo5K_k",
          },
          {
            type: "docs",
            title: "Zod Docs",
            url: "https://zod.dev",
          },
        ],
      },
      {
        id: "orm-prisma",
        order: 10,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "ORM dengan Prisma",
        description:
          "Prisma adalah ORM modern untuk TypeScript yang membuat operasi database lebih aman dan produktif.",
        subtopics: [
          "Setup Prisma",
          "Schema & model",
          "Migrations",
          "CRUD dengan Prisma Client",
          "Relasi (one-to-many, many-to-many)",
          "Prisma Studio",
          "Query optimasi",
        ],
        resources: [
          {
            type: "docs",
            title: "Prisma Docs",
            url: "https://www.prisma.io/docs",
          },
          {
            type: "youtube",
            title: "Prisma Crash Course",
            url: "https://www.youtube.com/watch?v=RebA5J-rlwg",
          },
          {
            type: "website",
            title: "Prisma Data Guide",
            url: "https://www.prisma.io/dataguide",
          },
        ],
      },
      {
        id: "caching-redis",
        order: 11,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Caching dengan Redis",
        description:
          "Redis adalah in-memory data store untuk mempercepat performa backend. Pelajari caching, session storage, dan queue sederhana.",
        subtopics: [
          "Konsep caching",
          "Instalasi & setup Redis",
          "GET/SET/DEL",
          "TTL (Time to Live)",
          "Cache invalidation",
          "Session dengan Redis",
          "BullMQ job queue",
        ],
        resources: [
          {
            type: "docs",
            title: "Redis Docs",
            url: "https://redis.io/docs/",
          },
          {
            type: "youtube",
            title: "Redis Crash Course",
            url: "https://www.youtube.com/watch?v=jgpVdJB2sKQ",
          },
          {
            type: "docs",
            title: "BullMQ Docs",
            url: "https://docs.bullmq.io",
          },
        ],
      },
      {
        id: "testing-backend",
        order: 12,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Testing API",
        description:
          "Testing penting untuk memastikan API berjalan sesuai ekspektasi. Pelajari unit test dan integration test untuk backend Node.js.",
        subtopics: [
          "Konsep testing",
          "Jest setup",
          "Unit testing",
          "Integration testing",
          "Supertest untuk API",
          "Mocking & spying",
          "Coverage report",
        ],
        resources: [
          {
            type: "docs",
            title: "Jest Docs",
            url: "https://jestjs.io/docs/getting-started",
          },
          {
            type: "youtube",
            title: "Node.js Testing dengan Jest",
            url: "https://www.youtube.com/watch?v=Jv2uxzhPFl4",
          },
          {
            type: "docs",
            title: "Supertest Docs",
            url: "https://github.com/ladjs/supertest",
          },
        ],
      },
      {
        id: "deployment-backend",
        order: 13,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Deployment & DevOps Dasar",
        description:
          "Deploy backend ke cloud dan pelajari dasar-dasar DevOps seperti Docker, CI/CD, dan monitoring sederhana.",
        subtopics: [
          "Linux command line dasar",
          "Docker & docker-compose",
          "Deploy ke Railway/Render",
          "Environment variables production",
          "PM2 process manager",
          "GitHub Actions CI/CD",
          "Logging dengan Winston",
        ],
        resources: [
          {
            type: "docs",
            title: "Docker Docs",
            url: "https://docs.docker.com",
          },
          {
            type: "youtube",
            title: "Docker untuk Node.js",
            url: "https://www.youtube.com/watch?v=3c-iBn73dDE",
          },
          {
            type: "website",
            title: "Railway.app",
            url: "https://railway.app",
          },
        ],
      },
      {
        id: "job-ready-backend",
        order: 14,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Job Ready Backend",
        description:
          "Persiapkan diri masuk industri backend dengan portfolio API, CV teknikal, dan latihan soal interview.",
        subtopics: [
          "Membangun project portfolio API",
          "README & dokumentasi",
          "LinkedIn & CV tech",
          "Interview teknikal backend",
          "System design dasar",
          "LeetCode easy/medium",
          "Negosiasi salary",
        ],
        resources: [
          {
            type: "website",
            title: "Glints",
            url: "https://glints.com/id",
          },
          {
            type: "website",
            title: "LeetCode",
            url: "https://leetcode.com",
          },
          {
            type: "youtube",
            title: "System Design untuk Pemula",
            url: "https://www.youtube.com/watch?v=MbjObHmDbZo",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 3. UI/UX DESIGNER
  // ─────────────────────────────────────────
  {
    slug: "uiux-designer",
    title: "UI/UX Designer",
    description:
      "Pelajari proses desain digital modern dari riset pengguna sampai membangun portfolio UI/UX profesional.",
    category: "Design",
    icon: "Palette",
    level: "Pemula",
    estimatedWeeks: 12,
    totalNodes: 10,
    nodes: [
      {
        id: "design-basics",
        order: 1,
        estimatedDays: 5,
        difficulty: "Pemula",
        title: "Dasar Desain Visual",
        description:
          "Pelajari prinsip dasar desain visual untuk membuat tampilan yang rapi, konsisten, dan nyaman dilihat pengguna.",
        subtopics: [
          "Prinsip desain",
          "Tipografi",
          "Color theory",
          "Whitespace",
          "Alignment",
          "Hierarchy",
          "Contrast",
        ],
        resources: [
          {
            type: "website",
            title: "Canva Design School",
            url: "https://www.canva.com/designschool/",
          },
          {
            type: "youtube",
            title: "DesignCourse UI Basics",
            url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
          },
          {
            type: "website",
            title: "Refactoring UI",
            url: "https://www.refactoringui.com",
          },
        ],
      },
      {
        id: "ux-fundamentals",
        order: 2,
        estimatedDays: 5,
        difficulty: "Pemula",
        title: "Fondasi UX",
        description:
          "UX berfokus pada pengalaman pengguna. Pelajari mindset user-centered design dan cara memahami kebutuhan pengguna.",
        subtopics: [
          "User-centered design",
          "Empati pengguna",
          "Mental model",
          "Pain point",
          "UX process",
          "Accessibility",
        ],
        resources: [
          {
            type: "docs",
            title: "NNGroup UX Basics",
            url: "https://www.nngroup.com/articles/definition-user-experience/",
          },
          {
            type: "youtube",
            title: "UX Design Crash Course",
            url: "https://www.youtube.com/watch?v=Ovj4hFxko7c",
          },
          {
            type: "website",
            title: "Interaction Design Foundation",
            url: "https://www.interaction-design.org",
          },
        ],
      },
      {
        id: "user-research",
        order: 3,
        estimatedDays: 5,
        difficulty: "Pemula",
        title: "User Research",
        description:
          "Riset pengguna adalah pondasi desain yang baik. Pelajari metode wawancara, survei, dan analisis data pengguna.",
        subtopics: [
          "User interview",
          "Survei & kuesioner",
          "Persona",
          "User journey map",
          "Competitive analysis",
          "Affinity mapping",
          "Usability testing",
        ],
        resources: [
          {
            type: "website",
            title: "NNGroup Research Methods",
            url: "https://www.nngroup.com/articles/which-ux-research-methods/",
          },
          {
            type: "youtube",
            title: "User Research Methods",
            url: "https://www.youtube.com/watch?v=bNWDdl2gHIE",
          },
          {
            type: "website",
            title: "UX Planet",
            url: "https://uxplanet.org",
          },
        ],
      },
      {
        id: "wireframing",
        order: 4,
        estimatedDays: 5,
        difficulty: "Pemula",
        title: "Wireframing & Sketching",
        description:
          "Wireframe adalah blueprint desain. Pelajari cara membuat low-fidelity wireframe cepat untuk memvalidasi ide sebelum desain detail.",
        subtopics: [
          "Lo-fi vs Hi-fi wireframe",
          "Sketching cepat",
          "Information architecture",
          "Navigation flow",
          "Wireframe di Figma",
          "User flow diagram",
        ],
        resources: [
          {
            type: "youtube",
            title: "Wireframing Tutorial Figma",
            url: "https://www.youtube.com/watch?v=qpH7-KFWZRI",
          },
          {
            type: "website",
            title: "Whimsical",
            url: "https://whimsical.com",
          },
          {
            type: "website",
            title: "UX Design Wireframing Guide",
            url: "https://www.uxdesign.cc/wireframing",
          },
        ],
      },
      {
        id: "figma-basics",
        order: 5,
        estimatedDays: 10,
        difficulty: "Pemula",
        title: "Figma Dasar",
        description:
          "Figma adalah tools desain UI/UX paling populer di industri. Kuasai fitur utamanya untuk membuat desain yang rapi dan kolaboratif.",
        subtopics: [
          "Frame & layer",
          "Auto layout",
          "Komponen & variant",
          "Styles (warna, teks)",
          "Prototype dasar",
          "Constraints & responsive",
          "Plugin Figma",
        ],
        resources: [
          {
            type: "docs",
            title: "Figma Learn",
            url: "https://help.figma.com/hc/en-us/categories/360002051613",
          },
          {
            type: "youtube",
            title: "Figma Tutorial Lengkap",
            url: "https://www.youtube.com/watch?v=HZuk6Wkx_Eg",
          },
          {
            type: "website",
            title: "Figma Community",
            url: "https://www.figma.com/community",
          },
        ],
      },
      {
        id: "design-system",
        order: 6,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Design System",
        description:
          "Design system memastikan konsistensi visual di seluruh produk. Pelajari cara membangun dan mengelola design system dengan Figma.",
        subtopics: [
          "Atomic design",
          "Token warna & tipografi",
          "Komponen library",
          "Dokumentasi komponen",
          "Spacing system",
          "Icon system",
          "Handoff ke developer",
        ],
        resources: [
          {
            type: "website",
            title: "Design Systems Repo",
            url: "https://designsystemsrepo.com",
          },
          {
            type: "youtube",
            title: "Design System dengan Figma",
            url: "https://www.youtube.com/watch?v=EK-pHkc5EL4",
          },
          {
            type: "website",
            title: "Material Design",
            url: "https://m3.material.io",
          },
        ],
      },
      {
        id: "ui-design",
        order: 7,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "UI Design High-Fidelity",
        description:
          "Buat desain UI yang polished dan siap production. Pelajari best practice visual design untuk mobile dan web.",
        subtopics: [
          "Layout & grid",
          "Visual hierarchy",
          "Microinteraction",
          "Dark mode design",
          "Mobile UI pattern",
          "Empty states & loading",
          "Error states",
        ],
        resources: [
          {
            type: "website",
            title: "UI Design Daily",
            url: "https://www.uidesigndaily.com",
          },
          {
            type: "website",
            title: "Dribbble",
            url: "https://dribbble.com",
          },
          {
            type: "youtube",
            title: "UI Design Tutorial",
            url: "https://www.youtube.com/watch?v=68w2VwalD5w",
          },
        ],
      },
      {
        id: "prototyping",
        order: 8,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Prototyping & Usability Test",
        description:
          "Prototype interaktif membantu memvalidasi desain sebelum development. Pelajari cara membuat prototype dan melakukan usability testing.",
        subtopics: [
          "Interactive prototype Figma",
          "Smart animate",
          "Micro-interaction prototype",
          "Usability test script",
          "Moderated vs unmoderated",
          "Iterasi dari feedback",
        ],
        resources: [
          {
            type: "docs",
            title: "Figma Prototyping",
            url: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma",
          },
          {
            type: "website",
            title: "Maze.co",
            url: "https://maze.co",
          },
          {
            type: "youtube",
            title: "Usability Testing Guide",
            url: "https://www.youtube.com/watch?v=1UCDUOB_aS8",
          },
        ],
      },
      {
        id: "portfolio-uiux",
        order: 9,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "Membangun Portfolio",
        description:
          "Portfolio yang kuat adalah kunci mendapat pekerjaan UI/UX. Pelajari cara membuat case study yang menarik dan platform untuk menampilkannya.",
        subtopics: [
          "Struktur case study",
          "Problem statement",
          "Proses desain (research → wireframe → UI)",
          "Outcome & metric",
          "Behance & Dribbble",
          "Portfolio website",
          "Personal branding",
        ],
        resources: [
          {
            type: "website",
            title: "Behance",
            url: "https://behance.net",
          },
          {
            type: "youtube",
            title: "UX Case Study Tutorial",
            url: "https://www.youtube.com/watch?v=vHmFQBJqMkk",
          },
          {
            type: "website",
            title: "Notion Portfolio Template",
            url: "https://www.notion.so/templates/portfolio",
          },
        ],
      },
      {
        id: "job-ready-uiux",
        order: 10,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Job Ready UI/UX",
        description:
          "Persiapkan diri untuk interview UI/UX designer. Pelajari cara presentasi desain, negosiasi, dan mencari kerja di Indonesia.",
        subtopics: [
          "Presentasi design decision",
          "Whiteboard challenge",
          "Pertanyaan interview umum",
          "CV desainer",
          "LinkedIn desainer",
          "Freelance vs full-time",
          "Platform kerja desainer",
        ],
        resources: [
          {
            type: "website",
            title: "Glints Design Jobs",
            url: "https://glints.com/id/jobs/design",
          },
          {
            type: "youtube",
            title: "UX Interview Tips",
            url: "https://www.youtube.com/watch?v=dLP-8S5BFEM",
          },
          {
            type: "website",
            title: "UX Collective",
            url: "https://uxdesign.cc",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 4. DATA ANALYST
  // ─────────────────────────────────────────
  {
    slug: "data-analyst",
    title: "Data Analyst",
    description:
      "Pelajari cara mengolah, menganalisis, dan memvisualisasikan data untuk menghasilkan insight bisnis yang berharga.",
    category: "Data",
    icon: "BarChart3",
    level: "Menengah",
    estimatedWeeks: 14,
    totalNodes: 12,
    nodes: [
      {
        id: "data-fundamentals",
        order: 1,
        estimatedDays: 4,
        difficulty: "Pemula",
        title: "Fondasi Data Analytics",
        description:
          "Pahami konsep dasar data analytics, jenis-jenis data, dan peran Data Analyst di industri sebelum mulai belajar tools.",
        subtopics: [
          "Apa itu data analytics",
          "Jenis data (kuantitatif, kualitatif)",
          "Data analytics lifecycle",
          "Peran Data Analyst vs Data Scientist",
          "Metrics & KPI",
          "Etika data",
        ],
        resources: [
          {
            type: "website",
            title: "Google Data Analytics Certificate",
            url: "https://grow.google/intl/id_id/certificates/data-analytics/",
          },
          {
            type: "youtube",
            title: "Data Analytics Full Course",
            url: "https://www.youtube.com/watch?v=yZvFH7B6gKI",
          },
          {
            type: "website",
            title: "Towards Data Science",
            url: "https://towardsdatascience.com",
          },
        ],
      },
      {
        id: "spreadsheet-excel",
        order: 2,
        estimatedDays: 7,
        difficulty: "Pemula",
        title: "Excel & Google Sheets",
        description:
          "Spreadsheet adalah tools pertama yang wajib dikuasai analis data. Pelajari formula, pivot table, dan visualisasi dasar.",
        subtopics: [
          "Formula dasar (SUM, IF, VLOOKUP)",
          "Pivot Table",
          "Conditional formatting",
          "Chart & grafik",
          "Data cleaning di Excel",
          "Google Sheets kolaborasi",
          "Macro dasar",
        ],
        resources: [
          {
            type: "youtube",
            title: "Excel Tutorial Bahasa Indonesia",
            url: "https://www.youtube.com/watch?v=rwbho0CgEAI",
          },
          {
            type: "website",
            title: "ExcelJet",
            url: "https://exceljet.net",
          },
          {
            type: "docs",
            title: "Google Sheets Docs",
            url: "https://support.google.com/docs/topic/9054603",
          },
        ],
      },
      {
        id: "sql-data",
        order: 3,
        estimatedDays: 14,
        difficulty: "Pemula",
        title: "SQL untuk Analisis Data",
        description:
          "SQL adalah bahasa wajib Data Analyst untuk mengambil dan mengolah data dari database. Pelajari dari query dasar hingga analitik lanjutan.",
        subtopics: [
          "SELECT & filtering",
          "JOIN (INNER, LEFT, RIGHT)",
          "GROUP BY & agregasi",
          "Subquery & CTE",
          "Window functions",
          "Date functions",
          "Query optimasi",
        ],
        resources: [
          {
            type: "website",
            title: "Mode SQL Tutorial",
            url: "https://mode.com/sql-tutorial/",
          },
          {
            type: "website",
            title: "SQLZoo",
            url: "https://sqlzoo.net",
          },
          {
            type: "youtube",
            title: "SQL untuk Data Analyst",
            url: "https://www.youtube.com/watch?v=7GVFYt6_ZFM",
          },
        ],
      },
      {
        id: "python-data",
        order: 4,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "Python untuk Data",
        description:
          "Python adalah bahasa paling populer untuk analisis data. Pelajari dasar Python dan library utama seperti Pandas dan NumPy.",
        subtopics: [
          "Python dasar",
          "List, dict, loop, function",
          "NumPy array",
          "Pandas DataFrame",
          "Data cleaning dengan Pandas",
          "Merge & join DataFrame",
          "Datetime handling",
        ],
        resources: [
          {
            type: "docs",
            title: "Pandas Docs",
            url: "https://pandas.pydata.org/docs/",
          },
          {
            type: "youtube",
            title: "Python Pandas Tutorial",
            url: "https://www.youtube.com/watch?v=vmEHCJofslg",
          },
          {
            type: "website",
            title: "Kaggle Python Course",
            url: "https://www.kaggle.com/learn/python",
          },
        ],
      },
      {
        id: "data-visualization",
        order: 5,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "Visualisasi Data",
        description:
          "Visualisasi yang baik mengubah data menjadi insight yang mudah dipahami. Pelajari Matplotlib, Seaborn, dan prinsip chart yang efektif.",
        subtopics: [
          "Prinsip visualisasi data",
          "Memilih jenis chart yang tepat",
          "Matplotlib dasar",
          "Seaborn",
          "Plotly interaktif",
          "Dashboard dengan Streamlit",
          "Storytelling dengan data",
        ],
        resources: [
          {
            type: "docs",
            title: "Matplotlib Docs",
            url: "https://matplotlib.org/stable/tutorials/index.html",
          },
          {
            type: "youtube",
            title: "Data Visualization Python",
            url: "https://www.youtube.com/watch?v=a9UrKTVEeZA",
          },
          {
            type: "website",
            title: "From Data to Viz",
            url: "https://www.data-to-viz.com",
          },
        ],
      },
      {
        id: "tableau-powerbi",
        order: 6,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "Tableau & Power BI",
        description:
          "BI tools seperti Tableau dan Power BI digunakan di hampir semua perusahaan untuk dashboard dan laporan bisnis.",
        subtopics: [
          "Tableau Public",
          "Koneksi data source",
          "Calculated fields",
          "Dashboard interaktif",
          "Power BI Desktop",
          "DAX dasar",
          "Publish & share",
        ],
        resources: [
          {
            type: "docs",
            title: "Tableau Training",
            url: "https://www.tableau.com/learn/training",
          },
          {
            type: "youtube",
            title: "Power BI Tutorial Indonesia",
            url: "https://www.youtube.com/watch?v=AGrl-H87pRU",
          },
          {
            type: "website",
            title: "Microsoft Power BI Docs",
            url: "https://learn.microsoft.com/en-us/power-bi/",
          },
        ],
      },
      {
        id: "statistics",
        order: 7,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "Statistik untuk Analisis",
        description:
          "Statistik adalah fondasi analisis data yang benar. Pelajari konsep kunci yang digunakan dalam pekerjaan Data Analyst sehari-hari.",
        subtopics: [
          "Statistik deskriptif",
          "Distribusi data",
          "Korelasi",
          "Hipotesis testing",
          "A/B testing",
          "Confidence interval",
          "Regresi linear",
        ],
        resources: [
          {
            type: "website",
            title: "Khan Academy Statistics",
            url: "https://www.khanacademy.org/math/statistics-probability",
          },
          {
            type: "youtube",
            title: "Statistics for Data Science",
            url: "https://www.youtube.com/watch?v=xxpc-HPKN28",
          },
          {
            type: "website",
            title: "StatQuest",
            url: "https://statquest.org",
          },
        ],
      },
      {
        id: "data-cleaning",
        order: 8,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Data Cleaning & Preprocessing",
        description:
          "80% pekerjaan analis adalah membersihkan data. Pelajari teknik identifikasi dan penanganan data kotor, missing values, dan outlier.",
        subtopics: [
          "Missing values handling",
          "Duplicate removal",
          "Outlier detection",
          "Data type conversion",
          "String cleaning",
          "Feature engineering dasar",
          "Data validation",
        ],
        resources: [
          {
            type: "website",
            title: "Kaggle Data Cleaning",
            url: "https://www.kaggle.com/learn/data-cleaning",
          },
          {
            type: "youtube",
            title: "Pandas Data Cleaning",
            url: "https://www.youtube.com/watch?v=ZOX18HfLHGQ",
          },
          {
            type: "docs",
            title: "Pandas User Guide",
            url: "https://pandas.pydata.org/docs/user_guide/index.html",
          },
        ],
      },
      {
        id: "google-analytics",
        order: 9,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Google Analytics & Looker Studio",
        description:
          "Google Analytics adalah tools wajib untuk analisis web. Pelajari cara membaca data website dan membuat laporan di Looker Studio.",
        subtopics: [
          "Google Analytics 4 setup",
          "Metrik & dimensi utama",
          "Event tracking",
          "Funnel analysis",
          "Looker Studio",
          "Integrasi GA4 ke Looker",
          "Custom report",
        ],
        resources: [
          {
            type: "docs",
            title: "Google Analytics Help",
            url: "https://support.google.com/analytics",
          },
          {
            type: "youtube",
            title: "Google Analytics 4 Tutorial",
            url: "https://www.youtube.com/watch?v=iRCVGbxBvyg",
          },
          {
            type: "website",
            title: "Looker Studio",
            url: "https://lookerstudio.google.com",
          },
        ],
      },
      {
        id: "ml-intro",
        order: 10,
        estimatedDays: 7,
        difficulty: "Lanjutan",
        title: "Pengantar Machine Learning",
        description:
          "Sebagai Data Analyst yang ingin berkembang, pelajari konsep dasar ML seperti regresi, klasifikasi, dan clustering.",
        subtopics: [
          "Supervised vs unsupervised",
          "Regresi linear & logistik",
          "Decision tree",
          "K-Means clustering",
          "Scikit-learn dasar",
          "Model evaluation",
          "Overfitting & underfitting",
        ],
        resources: [
          {
            type: "website",
            title: "Kaggle Intro to ML",
            url: "https://www.kaggle.com/learn/intro-to-machine-learning",
          },
          {
            type: "docs",
            title: "Scikit-learn Docs",
            url: "https://scikit-learn.org/stable/",
          },
          {
            type: "youtube",
            title: "ML untuk Pemula Indonesia",
            url: "https://www.youtube.com/watch?v=gmvvaobm7eQ",
          },
        ],
      },
      {
        id: "portfolio-data",
        order: 11,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "Membangun Portfolio Data",
        description:
          "Portfolio proyek nyata adalah bukti kemampuanmu sebagai analis. Pelajari cara membuat dan mempresentasikan proyek analisis data.",
        subtopics: [
          "Memilih dataset publik",
          "Struktur proyek analisis",
          "Kaggle notebook",
          "Laporan analisis",
          "GitHub untuk data project",
          "Medium / blog teknikal",
          "Presentasi insight",
        ],
        resources: [
          {
            type: "website",
            title: "Kaggle Datasets",
            url: "https://www.kaggle.com/datasets",
          },
          {
            type: "website",
            title: "Data.go.id",
            url: "https://data.go.id",
          },
          {
            type: "youtube",
            title: "Data Analyst Portfolio Projects",
            url: "https://www.youtube.com/watch?v=oake5GEyUoE",
          },
        ],
      },
      {
        id: "job-ready-data",
        order: 12,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Job Ready Data Analyst",
        description:
          "Persiapkan diri untuk interview Data Analyst di Indonesia. Pelajari soal-soal umum, SQL test, dan cara menonjolkan portfolio.",
        subtopics: [
          "SQL interview questions",
          "Case study interview",
          "Business sense",
          "CV Data Analyst",
          "LinkedIn data professional",
          "Platform kerja",
          "Negosiasi salary",
        ],
        resources: [
          {
            type: "website",
            title: "Glints Data Jobs",
            url: "https://glints.com/id/jobs/data-analyst",
          },
          {
            type: "website",
            title: "StrataScratch SQL Practice",
            url: "https://www.stratascratch.com",
          },
          {
            type: "youtube",
            title: "Data Analyst Interview Indonesia",
            url: "https://www.youtube.com/results?search_query=interview+data+analyst+indonesia",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 5. MOBILE DEVELOPER
  // ─────────────────────────────────────────
  {
    slug: "mobile-developer",
    title: "Mobile Developer",
    description:
      "Pelajari cara membangun aplikasi mobile Android dan iOS menggunakan React Native dari nol hingga publish ke Play Store & App Store.",
    category: "Mobile",
    icon: "Smartphone",
    level: "Menengah",
    estimatedWeeks: 15,
    totalNodes: 13,
    nodes: [
      {
        id: "mobile-fundamentals",
        order: 1,
        estimatedDays: 3,
        difficulty: "Pemula",
        title: "Fondasi Mobile Development",
        description:
          "Pahami ekosistem mobile sebelum mulai coding. Pelajari perbedaan native vs cross-platform dan kenapa React Native menjadi pilihan populer.",
        subtopics: [
          "Native vs cross-platform",
          "Android vs iOS perbedaan",
          "React Native overview",
          "Expo vs Bare workflow",
          "Setup environment",
          "Android Studio & Xcode dasar",
        ],
        resources: [
          {
            type: "docs",
            title: "React Native Docs",
            url: "https://reactnative.dev/docs/getting-started",
          },
          {
            type: "youtube",
            title: "React Native untuk Pemula",
            url: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
          },
          {
            type: "docs",
            title: "Expo Docs",
            url: "https://docs.expo.dev",
          },
        ],
      },
      {
        id: "javascript-react",
        order: 2,
        estimatedDays: 14,
        difficulty: "Pemula",
        title: "JavaScript & React Dasar",
        description:
          "React Native dibangun di atas React dan JavaScript. Pastikan kamu menguasai fondasi ini sebelum masuk ke mobile.",
        subtopics: [
          "ES6+ (arrow function, destructuring, spread)",
          "Async/Await & Promise",
          "React komponen & JSX",
          "useState & useEffect",
          "Props & state",
          "Event handling",
          "React DevTools",
        ],
        resources: [
          {
            type: "docs",
            title: "React Learn",
            url: "https://react.dev/learn",
          },
          {
            type: "youtube",
            title: "PZN React JS",
            url: "https://www.youtube.com/watch?v=4hQAHC5DGlw",
          },
          {
            type: "website",
            title: "javascript.info",
            url: "https://javascript.info",
          },
        ],
      },
      {
        id: "react-native-basics",
        order: 3,
        estimatedDays: 14,
        difficulty: "Pemula",
        title: "React Native Dasar",
        description:
          "Pelajari komponen inti React Native dan cara membangun UI mobile yang responsif di berbagai ukuran layar.",
        subtopics: [
          "View, Text, Image",
          "StyleSheet",
          "Flexbox di mobile",
          "ScrollView & FlatList",
          "TextInput & form",
          "Touchable & Pressable",
          "SafeAreaView",
        ],
        resources: [
          {
            type: "docs",
            title: "React Native Core Components",
            url: "https://reactnative.dev/docs/components-and-apis",
          },
          {
            type: "youtube",
            title: "React Native Crash Course",
            url: "https://www.youtube.com/watch?v=qSRrxpdMpVc",
          },
          {
            type: "website",
            title: "Expo Component Guide",
            url: "https://docs.expo.dev/versions/latest/",
          },
        ],
      },
      {
        id: "navigation",
        order: 4,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Navigasi dengan React Navigation",
        description:
          "Navigasi adalah inti aplikasi mobile. Pelajari Stack, Tab, Drawer Navigator untuk membangun alur aplikasi yang intuitif.",
        subtopics: [
          "Stack Navigator",
          "Bottom Tab Navigator",
          "Drawer Navigator",
          "Nested Navigator",
          "Passing params",
          "Deep linking dasar",
          "Navigation lifecycle",
        ],
        resources: [
          {
            type: "docs",
            title: "React Navigation Docs",
            url: "https://reactnavigation.org/docs/getting-started",
          },
          {
            type: "youtube",
            title: "React Navigation Tutorial",
            url: "https://www.youtube.com/watch?v=nQVCkqvU1uE",
          },
          {
            type: "website",
            title: "Expo Router",
            url: "https://docs.expo.dev/router/introduction/",
          },
        ],
      },
      {
        id: "state-management-mobile",
        order: 5,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "State Management",
        description:
          "Kelola state aplikasi mobile yang kompleks menggunakan Context API dan Zustand untuk aplikasi yang maintainable.",
        subtopics: [
          "Context API",
          "Zustand",
          "Redux Toolkit",
          "Persistent state (AsyncStorage)",
          "Global vs local state",
          "Server state dengan TanStack Query",
        ],
        resources: [
          {
            type: "docs",
            title: "Zustand Docs",
            url: "https://docs.pmnd.rs/zustand/getting-started/introduction",
          },
          {
            type: "docs",
            title: "AsyncStorage Docs",
            url: "https://react-native-async-storage.github.io/async-storage/",
          },
          {
            type: "youtube",
            title: "State Management React Native",
            url: "https://www.youtube.com/watch?v=eSWSEF1S6RM",
          },
        ],
      },
      {
        id: "api-mobile",
        order: 6,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Integrasi REST API",
        description:
          "Hubungkan aplikasi mobile ke backend. Pelajari fetch, Axios, dan TanStack Query untuk manajemen data yang optimal.",
        subtopics: [
          "Fetch API di React Native",
          "Axios",
          "TanStack Query mobile",
          "Loading & error state",
          "Offline handling",
          "Auth header & token",
          "Interceptor",
        ],
        resources: [
          {
            type: "docs",
            title: "TanStack Query",
            url: "https://tanstack.com/query/latest",
          },
          {
            type: "youtube",
            title: "Fetching Data React Native",
            url: "https://www.youtube.com/watch?v=l39iO3wRuS0",
          },
          {
            type: "website",
            title: "JSONPlaceholder",
            url: "https://jsonplaceholder.typicode.com",
          },
        ],
      },
      {
        id: "auth-mobile",
        order: 7,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Autentikasi Mobile",
        description:
          "Implementasi autentikasi yang aman di aplikasi mobile menggunakan JWT, Google Sign-In, dan penyimpanan token yang tepat.",
        subtopics: [
          "JWT & refresh token",
          "Secure storage (expo-secure-store)",
          "Google Sign-In",
          "Biometric authentication",
          "Protected routes",
          "Auto-login",
          "Logout & token invalidation",
        ],
        resources: [
          {
            type: "docs",
            title: "Expo SecureStore",
            url: "https://docs.expo.dev/versions/latest/sdk/securestore/",
          },
          {
            type: "youtube",
            title: "Authentication React Native",
            url: "https://www.youtube.com/watch?v=c3bF5BEYI08",
          },
          {
            type: "docs",
            title: "Google Sign-In for React Native",
            url: "https://github.com/react-native-google-signin/google-signin",
          },
        ],
      },
      {
        id: "native-features",
        order: 8,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Fitur Native Device",
        description:
          "Manfaatkan fitur hardware device seperti kamera, GPS, notifikasi, dan sensor untuk membuat aplikasi yang lebih powerful.",
        subtopics: [
          "Kamera & galeri (expo-camera)",
          "GPS & lokasi (expo-location)",
          "Push notification",
          "Sensors (accelerometer)",
          "Haptic feedback",
          "File system",
          "Sharing",
        ],
        resources: [
          {
            type: "docs",
            title: "Expo SDK Docs",
            url: "https://docs.expo.dev/versions/latest/",
          },
          {
            type: "youtube",
            title: "Expo Camera Tutorial",
            url: "https://www.youtube.com/watch?v=cq5MHvNmrpQ",
          },
          {
            type: "docs",
            title: "Expo Notifications",
            url: "https://docs.expo.dev/push-notifications/overview/",
          },
        ],
      },
      {
        id: "ui-libraries",
        order: 9,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "UI Library & Animasi",
        description:
          "Percepat pembangunan UI dengan library komponen dan buat pengalaman yang menarik dengan animasi yang smooth.",
        subtopics: [
          "React Native Paper",
          "NativeWind (Tailwind)",
          "Animated API",
          "React Native Reanimated",
          "Gesture Handler",
          "Lottie animations",
          "Skeleton loading",
        ],
        resources: [
          {
            type: "docs",
            title: "React Native Paper",
            url: "https://reactnativepaper.com",
          },
          {
            type: "docs",
            title: "Reanimated Docs",
            url: "https://docs.swmansion.com/react-native-reanimated/",
          },
          {
            type: "youtube",
            title: "React Native Animations",
            url: "https://www.youtube.com/watch?v=IHFvGmCPM_s",
          },
        ],
      },
      {
        id: "testing-mobile",
        order: 10,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Testing Aplikasi Mobile",
        description:
          "Pelajari cara menulis test untuk aplikasi React Native untuk memastikan kualitas kode dan mengurangi bug.",
        subtopics: [
          "Jest untuk React Native",
          "React Native Testing Library",
          "Component testing",
          "Snapshot testing",
          "Detox E2E testing",
          "Test coverage",
        ],
        resources: [
          {
            type: "docs",
            title: "React Native Testing Library",
            url: "https://callstack.github.io/react-native-testing-library/",
          },
          {
            type: "youtube",
            title: "Testing React Native Apps",
            url: "https://www.youtube.com/watch?v=0kL6nhutjQ8",
          },
          {
            type: "docs",
            title: "Detox Docs",
            url: "https://wix.github.io/Detox/",
          },
        ],
      },
      {
        id: "publish-app",
        order: 11,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Publish ke Play Store & App Store",
        description:
          "Pelajari proses lengkap publish aplikasi Expo ke Google Play Store dan Apple App Store.",
        subtopics: [
          "EAS Build setup",
          "App signing & certificate",
          "Google Play Console",
          "Apple Developer Account",
          "App metadata & screenshot",
          "In-app purchase dasar",
          "Update OTA dengan EAS Update",
        ],
        resources: [
          {
            type: "docs",
            title: "Expo EAS Build",
            url: "https://docs.expo.dev/build/introduction/",
          },
          {
            type: "youtube",
            title: "Publish React Native App",
            url: "https://www.youtube.com/watch?v=oBWBDaqpRPE",
          },
          {
            type: "docs",
            title: "Google Play Docs",
            url: "https://developer.android.com/distribute/google-play",
          },
        ],
      },
      {
        id: "portfolio-mobile",
        order: 12,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "Membangun Portfolio Aplikasi",
        description:
          "Bangun 2-3 aplikasi mobile yang menunjukkan kemampuanmu ke recruiter. Publikasikan di Play Store dan GitHub.",
        subtopics: [
          "Ide project portfolio",
          "README yang baik",
          "Demo video app",
          "GitHub repository",
          "Publish ke Play Store (free)",
          "Expo Snack demo",
          "Deskripsi teknikal project",
        ],
        resources: [
          {
            type: "website",
            title: "Expo Snack",
            url: "https://snack.expo.dev",
          },
          {
            type: "youtube",
            title: "Mobile Portfolio Projects",
            url: "https://www.youtube.com/results?search_query=react+native+portfolio+project",
          },
          {
            type: "website",
            title: "GitHub",
            url: "https://github.com",
          },
        ],
      },
      {
        id: "job-ready-mobile",
        order: 13,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Job Ready Mobile Developer",
        description:
          "Persiapkan diri untuk interview Mobile Developer. Latihan soal teknikal, presentasi portofolio, dan negosiasi gaji.",
        subtopics: [
          "Interview teknikal mobile",
          "React Native performance questions",
          "CV developer mobile",
          "LinkedIn developer",
          "Platform job Indonesia",
          "Freelance mobile dev",
          "Negosiasi salary",
        ],
        resources: [
          {
            type: "website",
            title: "Glints Mobile Jobs",
            url: "https://glints.com/id/jobs/react-native",
          },
          {
            type: "website",
            title: "Upwork Mobile Dev",
            url: "https://www.upwork.com",
          },
          {
            type: "youtube",
            title: "Interview Mobile Developer",
            url: "https://www.youtube.com/results?search_query=react+native+interview+questions",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 6. CYBER SECURITY
  // ─────────────────────────────────────────
  {
    slug: "cyber-security",
    title: "Cyber Security",
    description:
      "Pelajari cara melindungi sistem, jaringan, dan data dari ancaman siber. Persiapkan diri untuk karier di bidang keamanan siber.",
    category: "Security",
    icon: "ShieldCheck",
    level: "Lanjutan",
    estimatedWeeks: 20,
    totalNodes: 14,
    nodes: [
      {
        id: "security-fundamentals",
        order: 1,
        estimatedDays: 5,
        difficulty: "Pemula",
        title: "Fondasi Keamanan Siber",
        description:
          "Pahami konsep dasar keamanan siber: CIA triad, jenis-jenis ancaman, dan peran profesional security di industri.",
        subtopics: [
          "CIA Triad (Confidentiality, Integrity, Availability)",
          "Jenis ancaman siber",
          "Social engineering",
          "Threat actor & motivasi",
          "Security frameworks (NIST)",
          "Karier di cyber security",
        ],
        resources: [
          {
            type: "website",
            title: "Cybersecurity & Infrastructure Security Agency",
            url: "https://www.cisa.gov/topics/cybersecurity-best-practices",
          },
          {
            type: "youtube",
            title: "Cyber Security Full Course",
            url: "https://www.youtube.com/watch?v=U_P23SqJaDc",
          },
          {
            type: "website",
            title: "SANS Cyber Aces",
            url: "https://www.cyberaces.org",
          },
        ],
      },
      {
        id: "networking",
        order: 2,
        estimatedDays: 10,
        difficulty: "Pemula",
        title: "Jaringan Komputer",
        description:
          "Jaringan adalah pondasi keamanan siber. Kuasai konsep TCP/IP, protokol, dan cara kerja jaringan modern.",
        subtopics: [
          "Model OSI & TCP/IP",
          "IP addressing & subnetting",
          "DNS, DHCP, HTTP/S",
          "Firewall & IDS/IPS",
          "VPN & proxy",
          "Packet analysis dengan Wireshark",
          "Port scanning dasar",
        ],
        resources: [
          {
            type: "youtube",
            title: "Networking Full Course",
            url: "https://www.youtube.com/watch?v=IPvYjXCsTg8",
          },
          {
            type: "website",
            title: "Professor Messer Network+",
            url: "https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/",
          },
          {
            type: "docs",
            title: "Wireshark Docs",
            url: "https://www.wireshark.org/docs/",
          },
        ],
      },
      {
        id: "linux-os",
        order: 3,
        estimatedDays: 10,
        difficulty: "Pemula",
        title: "Linux & Command Line",
        description:
          "Linux adalah sistem operasi wajib untuk security professional. Pelajari command line, file system, dan administrasi dasar.",
        subtopics: [
          "Linux file system",
          "Command line dasar",
          "User & permission",
          "Process management",
          "Bash scripting dasar",
          "Log analysis",
          "Kali Linux overview",
        ],
        resources: [
          {
            type: "website",
            title: "OverTheWire Bandit",
            url: "https://overthewire.org/wargames/bandit/",
          },
          {
            type: "youtube",
            title: "Linux untuk Hacking",
            url: "https://www.youtube.com/watch?v=lZAoFs75_cs",
          },
          {
            type: "website",
            title: "TryHackMe Linux",
            url: "https://tryhackme.com/path/outline/presecurity",
          },
        ],
      },
      {
        id: "cryptography",
        order: 4,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Kriptografi",
        description:
          "Kriptografi adalah tulang punggung keamanan digital. Pelajari enkripsi, hashing, sertifikat digital, dan penerapannya.",
        subtopics: [
          "Symmetric vs asymmetric encryption",
          "AES, RSA, ECC",
          "Hashing (SHA, MD5)",
          "Digital signature",
          "TLS/SSL",
          "PKI & Certificate Authority",
          "Password hashing (bcrypt, argon2)",
        ],
        resources: [
          {
            type: "website",
            title: "Crypto101",
            url: "https://www.crypto101.io",
          },
          {
            type: "youtube",
            title: "Cryptography Full Course",
            url: "https://www.youtube.com/watch?v=AQDCe585Lnc",
          },
          {
            type: "website",
            title: "Cryptopals Challenges",
            url: "https://cryptopals.com",
          },
        ],
      },
      {
        id: "web-security",
        order: 5,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "Keamanan Aplikasi Web",
        description:
          "Pahami dan identifikasi celah keamanan web yang paling umum berdasarkan OWASP Top 10. Wajib untuk penetration tester.",
        subtopics: [
          "OWASP Top 10",
          "SQL Injection",
          "Cross-Site Scripting (XSS)",
          "Cross-Site Request Forgery (CSRF)",
          "Broken Authentication",
          "Insecure Direct Object Reference",
          "Security misconfiguration",
        ],
        resources: [
          {
            type: "website",
            title: "OWASP Top 10",
            url: "https://owasp.org/www-project-top-ten/",
          },
          {
            type: "website",
            title: "PortSwigger Web Security Academy",
            url: "https://portswigger.net/web-security",
          },
          {
            type: "youtube",
            title: "Web Application Hacking",
            url: "https://www.youtube.com/watch?v=X4eRbHgRaws",
          },
        ],
      },
      {
        id: "ethical-hacking",
        order: 6,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "Ethical Hacking & Penetration Testing",
        description:
          "Pelajari metodologi penetration testing secara etis dan legal untuk mengidentifikasi celah keamanan sebelum diserang.",
        subtopics: [
          "Metodologi pentest (recon, scan, exploit)",
          "Nmap & port scanning",
          "Metasploit framework",
          "Burp Suite dasar",
          "Password cracking (legal)",
          "Privilege escalation",
          "Pentest report writing",
        ],
        resources: [
          {
            type: "website",
            title: "TryHackMe",
            url: "https://tryhackme.com",
          },
          {
            type: "website",
            title: "Hack The Box",
            url: "https://www.hackthebox.com",
          },
          {
            type: "youtube",
            title: "Ethical Hacking Full Course",
            url: "https://www.youtube.com/watch?v=fNzpcB7ODxQ",
          },
        ],
      },
      {
        id: "network-security",
        order: 7,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "Keamanan Jaringan",
        description:
          "Pelajari cara mengamankan jaringan perusahaan, konfigurasi firewall, deteksi intrusi, dan analisis traffic mencurigakan.",
        subtopics: [
          "Firewall configuration",
          "IDS/IPS (Snort, Suricata)",
          "Network segmentation & VLAN",
          "VPN setup",
          "SIEM dasar",
          "Log analysis",
          "Incident response jaringan",
        ],
        resources: [
          {
            type: "youtube",
            title: "Network Security Tutorial",
            url: "https://www.youtube.com/watch?v=E03gh1huvW4",
          },
          {
            type: "website",
            title: "Snort Docs",
            url: "https://www.snort.org/documents",
          },
          {
            type: "website",
            title: "TryHackMe Network",
            url: "https://tryhackme.com/path/outline/jrpenetrationtester",
          },
        ],
      },
      {
        id: "malware-analysis",
        order: 8,
        estimatedDays: 7,
        difficulty: "Lanjutan",
        title: "Analisis Malware Dasar",
        description:
          "Pelajari cara mengidentifikasi dan menganalisis malware di lingkungan yang aman menggunakan tools analisis statis dan dinamis.",
        subtopics: [
          "Jenis malware",
          "Setup lab (virtual machine)",
          "Static analysis",
          "Dynamic analysis",
          "Sandbox tools",
          "YARA rules",
          "Reverse engineering dasar",
        ],
        resources: [
          {
            type: "website",
            title: "Any.run Sandbox",
            url: "https://any.run",
          },
          {
            type: "youtube",
            title: "Malware Analysis Tutorial",
            url: "https://www.youtube.com/watch?v=yyBk3kp6-8A",
          },
          {
            type: "website",
            title: "MalwareBazaar",
            url: "https://bazaar.abuse.ch",
          },
        ],
      },
      {
        id: "cloud-security",
        order: 9,
        estimatedDays: 7,
        difficulty: "Lanjutan",
        title: "Cloud Security",
        description:
          "Mayoritas sistem modern berjalan di cloud. Pelajari keamanan AWS/GCP/Azure, IAM, dan best practice cloud security.",
        subtopics: [
          "Model tanggung jawab bersama",
          "IAM & least privilege",
          "S3 bucket misconfiguration",
          "Security groups & NACLs",
          "CloudTrail & logging",
          "Container security (Docker)",
          "DevSecOps dasar",
        ],
        resources: [
          {
            type: "website",
            title: "AWS Security Learning Path",
            url: "https://aws.amazon.com/training/learn-about/security/",
          },
          {
            type: "website",
            title: "CloudGoat (Vulnerable AWS)",
            url: "https://github.com/RhinoSecurityLabs/cloudgoat",
          },
          {
            type: "youtube",
            title: "Cloud Security Tutorial",
            url: "https://www.youtube.com/watch?v=M988_fsOSWo",
          },
        ],
      },
      {
        id: "incident-response",
        order: 10,
        estimatedDays: 7,
        difficulty: "Lanjutan",
        title: "Incident Response & Digital Forensics",
        description:
          "Pelajari cara merespons insiden keamanan secara terstruktur dan melakukan investigasi forensik digital.",
        subtopics: [
          "IR lifecycle",
          "Containment & eradication",
          "Memory forensics",
          "Disk forensics (Autopsy)",
          "Log forensics",
          "Chain of custody",
          "IR report writing",
        ],
        resources: [
          {
            type: "website",
            title: "Autopsy Digital Forensics",
            url: "https://www.autopsy.com",
          },
          {
            type: "youtube",
            title: "Digital Forensics Tutorial",
            url: "https://www.youtube.com/watch?v=WNFRcXGRkP0",
          },
          {
            type: "website",
            title: "SANS Incident Response",
            url: "https://www.sans.org/cyber-security-courses/incident-response/",
          },
        ],
      },
      {
        id: "certifications",
        order: 11,
        estimatedDays: 30,
        difficulty: "Menengah",
        title: "Sertifikasi Keamanan",
        description:
          "Sertifikasi adalah bukti kompetensi yang diakui industri. Persiapkan ujian sertifikasi entry-level untuk meningkatkan nilai jual.",
        subtopics: [
          "CompTIA Security+",
          "CEH (Certified Ethical Hacker)",
          "eJPT (eLearnSecurity)",
          "OSCP overview",
          "Belajar mandiri vs bootcamp",
          "Simulasi ujian",
          "Roadmap sertifikasi",
        ],
        resources: [
          {
            type: "website",
            title: "CompTIA Security+",
            url: "https://www.comptia.org/certifications/security",
          },
          {
            type: "website",
            title: "eLearnSecurity eJPT",
            url: "https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester-cert",
          },
          {
            type: "youtube",
            title: "CompTIA Security+ Study Guide",
            url: "https://www.youtube.com/watch?v=9NE33fpQuw8",
          },
        ],
      },
      {
        id: "ctf-practice",
        order: 12,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "CTF & Praktik Hands-on",
        description:
          "Capture The Flag (CTF) adalah cara terbaik mempertajam skill security. Ikuti kompetisi dan selesaikan tantangan nyata.",
        subtopics: [
          "CTF overview & kategori",
          "TryHackMe challenges",
          "HackTheBox starting point",
          "PicoCTF",
          "CTF writeup",
          "Bug bounty dasar",
          "Responsible disclosure",
        ],
        resources: [
          {
            type: "website",
            title: "TryHackMe",
            url: "https://tryhackme.com",
          },
          {
            type: "website",
            title: "PicoCTF",
            url: "https://picoctf.org",
          },
          {
            type: "website",
            title: "CTFTime",
            url: "https://ctftime.org",
          },
        ],
      },
      {
        id: "portfolio-security",
        order: 13,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "Membangun Portfolio Security",
        description:
          "Buat portfolio yang membuktikan kemampuanmu: writeup CTF, sertifikasi, blog teknikal, dan profil platform security.",
        subtopics: [
          "CTF writeup blog",
          "GitHub security tools",
          "Vulnerability disclosure report",
          "Medium/blog teknikal",
          "LinkedIn security professional",
          "TryHackMe profile",
          "HackTheBox ranking",
        ],
        resources: [
          {
            type: "website",
            title: "Medium Security Writing",
            url: "https://medium.com/tag/cybersecurity",
          },
          {
            type: "website",
            title: "GitHub Security Projects",
            url: "https://github.com/topics/cybersecurity",
          },
          {
            type: "youtube",
            title: "Cyber Security Portfolio Tips",
            url: "https://www.youtube.com/results?search_query=cyber+security+portfolio",
          },
        ],
      },
      {
        id: "job-ready-security",
        order: 14,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Job Ready Cyber Security",
        description:
          "Persiapkan diri untuk karier keamanan siber di Indonesia. Kenali jalur karier, platform kerja, dan bagaimana menonjolkan skill.",
        subtopics: [
          "Jalur karier security (SOC, Pentest, DFIR)",
          "Interview security",
          "CV security profesional",
          "Bug bounty sebagai income",
          "Komunitas security Indonesia",
          "Platform kerja",
          "Sertifikasi prioritas",
        ],
        resources: [
          {
            type: "website",
            title: "Glints Security Jobs",
            url: "https://glints.com/id/jobs/cyber-security",
          },
          {
            type: "website",
            title: "HackerOne Bug Bounty",
            url: "https://www.hackerone.com",
          },
          {
            type: "website",
            title: "ID-SIRTII",
            url: "https://idsirtii.or.id",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 7. GAME DEVELOPER
  // ─────────────────────────────────────────
  {
    slug: "game-developer",
    title: "Game Developer",
    description:
      "Pelajari cara membuat game 2D dan 3D menggunakan Unity dari nol hingga publish ke berbagai platform.",
    category: "Programming",
    icon: "Gamepad2",
    level: "Menengah",
    estimatedWeeks: 16,
    totalNodes: 13,
    nodes: [
      {
        id: "game-fundamentals",
        order: 1,
        estimatedDays: 3,
        difficulty: "Pemula",
        title: "Fondasi Game Development",
        description:
          "Pahami dunia game development: istilah penting, jenis game, pipeline pengembangan, dan kenapa Unity menjadi pilihan utama.",
        subtopics: [
          "Game engine overview",
          "Unity vs Godot vs Unreal",
          "Game loop",
          "Genre game",
          "Pipeline game development",
          "2D vs 3D game",
          "Setup Unity",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity Learn",
            url: "https://learn.unity.com",
          },
          {
            type: "youtube",
            title: "Game Dev Introduction",
            url: "https://www.youtube.com/watch?v=tlAoy1gcels",
          },
          {
            type: "website",
            title: "Unity Manual",
            url: "https://docs.unity3d.com/Manual/index.html",
          },
        ],
      },
      {
        id: "csharp-basics",
        order: 2,
        estimatedDays: 14,
        difficulty: "Pemula",
        title: "C# untuk Unity",
        description:
          "Unity menggunakan C# sebagai bahasa scripting. Pelajari dasar-dasar C# yang dibutuhkan untuk membuat game.",
        subtopics: [
          "Variabel & tipe data",
          "Kondisional & loop",
          "Method & class",
          "OOP dasar",
          "Array & List",
          "Inheritance",
          "Interface",
        ],
        resources: [
          {
            type: "docs",
            title: "Microsoft C# Docs",
            url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
          },
          {
            type: "youtube",
            title: "C# untuk Unity Pemula",
            url: "https://www.youtube.com/watch?v=GhQdlIFylQ8",
          },
          {
            type: "website",
            title: "Unity C# Scripting",
            url: "https://docs.unity3d.com/Manual/ScriptingSection.html",
          },
        ],
      },
      {
        id: "unity-basics",
        order: 3,
        estimatedDays: 10,
        difficulty: "Pemula",
        title: "Unity Editor & Scene",
        description:
          "Kenali antarmuka Unity Editor dan konsep fundamental seperti GameObject, Component, dan Scene untuk memulai membuat game.",
        subtopics: [
          "Unity Editor interface",
          "Scene & Game view",
          "GameObject & Component",
          "Transform & positioning",
          "Prefab",
          "Tag & Layer",
          "Hierarchy & Project panel",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity Editor Manual",
            url: "https://docs.unity3d.com/Manual/UsingTheEditor.html",
          },
          {
            type: "youtube",
            title: "Unity Basics Tutorial",
            url: "https://www.youtube.com/watch?v=XtQMytORBmM",
          },
          {
            type: "website",
            title: "Unity Learn Pathways",
            url: "https://learn.unity.com/pathways",
          },
        ],
      },
      {
        id: "game-2d",
        order: 4,
        estimatedDays: 14,
        difficulty: "Pemula",
        title: "Membuat Game 2D",
        description:
          "Buat game 2D pertamamu dengan Unity. Pelajari sprite, Tilemap, Physics 2D, dan animasi karakter.",
        subtopics: [
          "Sprite & SpriteRenderer",
          "Tilemap & Tileset",
          "Rigidbody2D & Collider",
          "Physics 2D",
          "Animator & Animation",
          "Camera follow",
          "Scene management",
        ],
        resources: [
          {
            type: "youtube",
            title: "Unity 2D Platformer Tutorial",
            url: "https://www.youtube.com/watch?v=7iYWpzL9GkM",
          },
          {
            type: "website",
            title: "Unity 2D Game Kit",
            url: "https://unity.com/features/2d",
          },
          {
            type: "docs",
            title: "Unity 2D Docs",
            url: "https://docs.unity3d.com/Manual/Unity2D.html",
          },
        ],
      },
      {
        id: "scripting-gameplay",
        order: 5,
        estimatedDays: 10,
        difficulty: "Menengah",
        title: "Scripting Gameplay",
        description:
          "Buat mekanik gameplay yang interaktif menggunakan C# scripting. Pelajari input, collision, dan logika game.",
        subtopics: [
          "Input System",
          "Collision detection",
          "Trigger events",
          "Game Manager pattern",
          "Scoring system",
          "Health & damage",
          "Coroutines",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity Scripting Reference",
            url: "https://docs.unity3d.com/ScriptReference/",
          },
          {
            type: "youtube",
            title: "Unity Scripting Tutorial",
            url: "https://www.youtube.com/watch?v=wRtp7XPEEBk",
          },
          {
            type: "website",
            title: "Brackeys Game Dev",
            url: "https://www.youtube.com/@Brackeys",
          },
        ],
      },
      {
        id: "ui-game",
        order: 6,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "UI & HUD Game",
        description:
          "Buat antarmuka game yang informatif dan menarik menggunakan Unity UI system. Termasuk menu, health bar, dan inventory.",
        subtopics: [
          "Canvas & RectTransform",
          "Button & event",
          "Text & TextMeshPro",
          "Health bar dengan Slider",
          "Main menu & pause menu",
          "Scene transition",
          "UI animation",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity UI Docs",
            url: "https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/",
          },
          {
            type: "youtube",
            title: "Unity UI Tutorial",
            url: "https://www.youtube.com/watch?v=_RIsfVOqTaE",
          },
          {
            type: "website",
            title: "TextMeshPro Docs",
            url: "https://docs.unity3d.com/Packages/com.unity.textmeshpro@3.0/manual/index.html",
          },
        ],
      },
      {
        id: "audio-game",
        order: 7,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Audio & Sound Design",
        description:
          "Audio membuat game terasa hidup. Pelajari cara mengintegrasikan music, sound effect, dan spatial audio di Unity.",
        subtopics: [
          "AudioSource & AudioListener",
          "BGM & SFX",
          "Audio Mixer",
          "3D spatial audio",
          "Free audio resources",
          "Audio scripting",
          "Volume control",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity Audio Docs",
            url: "https://docs.unity3d.com/Manual/Audio.html",
          },
          {
            type: "youtube",
            title: "Unity Audio Tutorial",
            url: "https://www.youtube.com/watch?v=6OT43pvUyfY",
          },
          {
            type: "website",
            title: "Freesound.org",
            url: "https://freesound.org",
          },
        ],
      },
      {
        id: "game-3d",
        order: 8,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "Pengantar Game 3D",
        description:
          "Ekspansi skill ke game 3D. Pelajari 3D object, material, lighting, dan cara membuat environment 3D sederhana di Unity.",
        subtopics: [
          "3D object & mesh",
          "Material & Shader dasar",
          "Lighting (Directional, Point, Spot)",
          "Terrain tools",
          "Cinemachine camera",
          "Character Controller 3D",
          "NavMesh (pathfinding)",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity 3D Manual",
            url: "https://docs.unity3d.com/Manual/Graphics.html",
          },
          {
            type: "youtube",
            title: "Unity 3D Beginner Tutorial",
            url: "https://www.youtube.com/watch?v=pwZpJzpE2lQ",
          },
          {
            type: "website",
            title: "Unity Asset Store Free",
            url: "https://assetstore.unity.com/?price=0-0",
          },
        ],
      },
      {
        id: "ai-enemy",
        order: 9,
        estimatedDays: 7,
        difficulty: "Menengah",
        title: "AI Musuh & Game Logic",
        description:
          "Buat musuh yang cerdas dengan AI behavior menggunakan State Machine dan NavMesh pathfinding di Unity.",
        subtopics: [
          "State Machine pattern",
          "Enemy patrol & chase",
          "NavMesh Agent",
          "Line of Sight",
          "Wave spawning system",
          "Difficulty scaling",
          "Boss fight pattern",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity NavMesh Docs",
            url: "https://docs.unity3d.com/Manual/nav-BuildingNavMesh.html",
          },
          {
            type: "youtube",
            title: "Unity Enemy AI Tutorial",
            url: "https://www.youtube.com/watch?v=UjkSFoLxesw",
          },
          {
            type: "website",
            title: "Game AI Pro",
            url: "http://www.gameaipro.com",
          },
        ],
      },
      {
        id: "optimization",
        order: 10,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Optimasi Game",
        description:
          "Game yang lambat membuat pemain frustrasi. Pelajari teknik optimasi Unity untuk memastikan game berjalan mulus.",
        subtopics: [
          "Unity Profiler",
          "Object pooling",
          "Draw call optimization",
          "LOD (Level of Detail)",
          "Texture compression",
          "Memory management",
          "Frame rate & target platform",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity Performance Docs",
            url: "https://docs.unity3d.com/Manual/BestPracticeUnderstandingPerformanceInUnity.html",
          },
          {
            type: "youtube",
            title: "Unity Optimization Tutorial",
            url: "https://www.youtube.com/watch?v=W45-fsnPhJY",
          },
          {
            type: "website",
            title: "Unity Blog Performance",
            url: "https://blog.unity.com/technology/optimizing-performance-in-unity",
          },
        ],
      },
      {
        id: "publish-game",
        order: 11,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Publish Game",
        description:
          "Publish game ke berbagai platform seperti WebGL, Android, dan itch.io agar bisa dimainkan banyak orang.",
        subtopics: [
          "Build settings Unity",
          "WebGL build",
          "Android build",
          "itch.io publish",
          "Google Play Games",
          "App signing",
          "Store listing",
        ],
        resources: [
          {
            type: "docs",
            title: "Unity Build Docs",
            url: "https://docs.unity3d.com/Manual/PublishingBuilds.html",
          },
          {
            type: "website",
            title: "itch.io",
            url: "https://itch.io",
          },
          {
            type: "youtube",
            title: "Publish Unity Game Android",
            url: "https://www.youtube.com/watch?v=cVNPbdcEAlw",
          },
        ],
      },
      {
        id: "portfolio-game",
        order: 12,
        estimatedDays: 14,
        difficulty: "Menengah",
        title: "Membangun Portfolio Game",
        description:
          "Buat 2-3 game lengkap yang menunjukkan kemampuanmu. Publish di itch.io dan dokumentasikan prosesnya.",
        subtopics: [
          "Ide game yang achievable",
          "Game Design Document",
          "Scope management",
          "Publish di itch.io",
          "Trailer game singkat",
          "GitHub repository",
          "Devlog / postmortem",
        ],
        resources: [
          {
            type: "website",
            title: "itch.io",
            url: "https://itch.io",
          },
          {
            type: "youtube",
            title: "Game Portfolio Tips",
            url: "https://www.youtube.com/results?search_query=unity+game+developer+portfolio",
          },
          {
            type: "website",
            title: "Game Jams (itch.io)",
            url: "https://itch.io/jams",
          },
        ],
      },
      {
        id: "job-ready-game",
        order: 13,
        estimatedDays: 5,
        difficulty: "Menengah",
        title: "Job Ready Game Developer",
        description:
          "Persiapkan diri untuk karier game developer Indonesia. Pelajari jalur karier, komunitas, dan cara melamar ke studio game.",
        subtopics: [
          "Jalur karier (programmer, designer, artist)",
          "Interview game developer",
          "CV game developer",
          "Studio game Indonesia",
          "Freelance game dev",
          "Game jam sebagai portfolio",
          "Komunitas IndieGame Indonesia",
        ],
        resources: [
          {
            type: "website",
            title: "Agate Studio",
            url: "https://agate.id",
          },
          {
            type: "website",
            title: "Game Developer Conference",
            url: "https://gdconf.com",
          },
          {
            type: "website",
            title: "IndieGameID Discord",
            url: "https://discord.gg/indiegameid",
          },
        ],
      },
    ],
  },
]

async function seed() {
  try {
    await connectDB()

    for (const roadmap of roadmaps) {
      const exists = await Roadmap.findOne({ slug: roadmap.slug })

      if (exists) {
        console.log(`⏭  Skip: ${roadmap.slug}`)
        continue
      }

      await Roadmap.create(roadmap)
      console.log(`✅ Seeded: ${roadmap.slug} (${roadmap.nodes.length} nodes)`)
    }

    await mongoose.disconnect()
    console.log("\n🎉 Database seeding selesai!")
  } catch (error) {
    console.error("❌ Seeding error:", error)
    await mongoose.disconnect()
  }
}

seed()