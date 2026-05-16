import { useState, useEffect, useRef, CSSProperties } from "react";

const data = {
  name: "Sanjana V",
  title: "Full-Stack Developer & Business Intelligence Consultant",
  tagline: "Building scalable systems at the intersection of data, design, and cloud.",
  contact: {
    email: "sanjanav1899@gmail.com",
    phone: "7899773278",
    linkedin: "https://linkedin.com/in/sanjanav",
    github: "https://github.com/sanjanav-github",
  },
  summary: [
    "Building interactive web applications using React, Redux, and Redux Toolkit.",
    "Working with Axios, REST APIs, and GraphQL for robust HTTP communication.",
    "Handling user authentication, authorization, and backend frameworks like Express.js and FastAPI with MongoDB and PostgreSQL.",
  ],
  experience: [
    {
      company: "Applied Materials (via GyanSys Inc.)",
      role: "Business Intelligence Consultant",
      location: "Bangalore, India",
      period: "Oct 2023 – Present",
      highlights: [
        "Architected scalable full-stack apps using React, TypeScript, and FastAPI with Auth0 (OAuth 2.0 / OIDC).",
        "Implemented WebSockets + PostgreSQL LISTEN/NOTIFY for real-time event-driven updates.",
        "Implemented Signalr-based real-time communication with .NET backend and KendoReact frontend.",
        "Built AWS S3 chunked upload pipelines supporting files up to 5TB with presigned URLs.",
        "Developed complex D3.js visualizations integrated with React for data-informed decision-making.",
        "Resolved 900+ SonarQube security hotspots, reducing CI/CD failures by 50%.",
        "Integrated end-to-end usage tracking with sync/async API patterns for KPI monitoring.",
      ],
    },
    {
      company: "NearLearn",
      role: "Python, Data Science & Machine Learning",
      location: "Bangalore, India",
      period: "Feb 2025 – Aug 2025",
      highlights: [
        "Implemented ML models: Regression, Decision Trees, Random Forests, KNN, K-means.",
        "Executed data pipelines: outlier analysis, missing value treatment, feature engineering, and PCA.",
        "Applied Hypothesis Testing (t-Tests, ANOVA, Chi-square) and A/B Testing.",
        "Used NumPy, Pandas, Matplotlib, and Seaborn for full-spectrum data science.",
      ],
    },
    {
      company: "Design Code Test Academy",
      role: "Intern — Full-Stack Development",
      location: "Bangalore, India",
      period: "Oct 2022 – Mar 2023",
      highlights: [
        "Built full-stack apps with JavaScript, TypeScript, React, Redux Toolkit, and Tailwind CSS.",
        "Worked with Node.js, Express.js, and FastAPI backends.",
        "Managed relational (PostgreSQL, MariaDB) and non-relational (MongoDB) databases.",
        "Used Git, GitHub, Postman, Swagger, and Balsamiq in agile workflows.",
      ],
    },
    {
      company: "SCS TECHSOL Pvt. Ltd.",
      role: "React.js Intern",
      location: "Bangalore, India",
      period: "Mar 2022 – Apr 2022",
      highlights: [
        "Built full-stack apps with JavaScript, React, HTML, and CSS.",
        "Implemented RESTful APIs, Worked on Private routes and JWT-based authentication.",
      ],
    },
  ],
  projects: [
    {
      name: "Sanura Ayur Care",
      subtitle: "Wellness begins with health",
      description: "Wellness platform to showcase individual therapies and curated packages. Patients can book treatments and receive booking confirmation notifications.",
      stack: ["React", "Redux", "Redux-Thunk", "Axios", "CSS"],
      color: "#7FB5A0",
    },
    {
      name: "Anahita",
      subtitle: "Grok-Powered AI Assistant",
      description: "Full-stack conversational interface using the xAI Grok API to replicate state-of-the-art AI assistant workflows with real-time response streaming.",
      stack: ["React", "Redux", "Axios", "xAI Grok API"],
      color: "#A67FB5",
    },
    {
      name: "Sahara",
      subtitle: "Neuro-divergent Student Success System",
      description: "Support platform for neurodivergent students combining AI-driven assistance with structured learning tools to improve academic outcomes.",
      stack: ["React", "FastAPI", "PostgreSQL", "Redux"],
      color: "#B58A7F",
    },
    {
      name: "Cafe order management",
      subtitle: "Cafe Order Management Application lists set of food items in a cafe.",
      description: "An admin on searching gets a list of all the items that can be ordered, he can place an order by clicking on the order in the order list. Thereafter Admin is also notified if the item ordered is completed. Application list the items that fall under the category of food and drink separately",
      stack: ["Axios", "HTML", "CSS", "React", "Redux", "Redux-Thunk", "React-Redux"],
      color: "#A67FB5",
    },
    {
      name: "Musically Yours",
      subtitle: "Android Mobile Application as a Final year Project includes both Front End and Back End",
      description: "This app uses a chat bot to interact with the user and analyze his feelings as well as his state of mind, it then provides a music playlist to elate the users' emotion along with related videos and quotes This not only addresses users with stress and depression also those users who seek change or want to feel more cheerful.",
      stack: ["Axios", "HTML", "CSS", "React", "Redux", "Redux-Thunk", "React-Redux"],
      color: "#B58A7F",
    },
    {
      name: "Team Communication platform",
      subtitle: "Real-time messaging using WebSockets via SignalR",
      description: "A full-stack team communication platform featuring workspaces, channels, threaded messaging, presence indicators, and file sharing — built with React and ASP.NET Core SignalR",
      stack: ["Frontend — React + SignalR client + Tailwind", "Backend — ASP.NET Core + SignalR hubs", "Database — PostgreSQL with EF Core", " Real-time layer — Redis pub/sub as the SignalR backplane",],
      color: "#7FB5A0",
    },
  ],
  skills: {
    Languages: ["JavaScript", "TypeScript", "Python", "C# (C-Sharp)", "SQL (Structured Query Language)"],
    Frontend: ["React.js", "Redux Toolkit", "D3.js", "KendoReact", "Tailwind CSS", "HTML5", "CSS3"],
    Backend: [".NET", "FastAPI", "Node.js", "Express.js", "WebSockets", "GraphQL", "REST API"],
    Databases: ["PostgreSQL", "MongoDB", "MariaDB"],
    "Cloud & DevOps": ["AWS S3", "CI/CD", "SonarQube", "Git", "GitHub", "Bitbucket"],
    "Security & Auth": ["OAuth 2.0", "OpenID Connect", "JWT", "Auth0"],
    "Data & ML": ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "PCA", "A/B Testing"],
  },
  education: [
    { institution: "Jyothy Institute of Technology", degree: "B.E. — Computer Science & Engineering", score: "GPA: 8.67 / 10.0", period: "2018 – 2022" },
    { institution: "Sri Kumaran Children's Home Composite Junior College", degree: "PCMB", score: "91.33%", period: "2016 – 2018" },
    { institution: "Silicon City Academy of Secondary Education", degree: "Secondary School", score: "CGPA: 10.0 / 10.0", period: "2005 – 2016" },
  ],
   CoCurricularActivities: [
    { institution: "Jyothy Institute of Technology", degree: "B.E. — Computer Science & Engineering", score: "GPA: 8.67 / 10.0", period: "2018 – 2022" },
    { institution: "Sri Kumaran Children's Home Composite Junior College", degree: "PCMB", score: "91.33%", period: "2016 – 2018" },
    { institution: "Silicon City Academy of Secondary Education", degree: "Secondary School", score: "CGPA: 10.0 / 10.0", period: "2005 – 2016" },
  ],
};

const AMBER = "#F59E0B";
const BG = "#0F1117";
const MONO = "'DM Mono', 'Courier New', monospace";
const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'DM Sans', 'Segoe UI', system-ui, sans-serif";

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Components ────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.22em", color: AMBER, textTransform: "uppercase" as const }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, rgba(245,158,11,0.4), transparent)` }} />
    </div>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  const fade = (delay: number): CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
      {/* Grid background */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(${AMBER} 1px, transparent 1px), linear-gradient(90deg, ${AMBER} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "20%", right: "8%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(245,158,11,0.15), transparent)`, filter: "blur(40px)" }} />

      <div style={{ position: "relative", maxWidth: 800 }}>
        <div style={fade(0.1)}>
          <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.3em", color: AMBER, textTransform: "uppercase", marginBottom: 20 }}>Portfolio · 2026</p>
        </div>

        <h1 style={{ ...fade(0.25), fontFamily: SERIF, fontWeight: 900, fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 1, marginBottom: 20, background: "linear-gradient(135deg, #fff 0%, #D1D5DB 50%, #9CA3AF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {data.name}
        </h1>

        <div style={fade(0.45)}>
          <p style={{ fontFamily: SERIF, color: AMBER, fontSize: "clamp(1rem, 2vw, 1.4rem)", marginBottom: 12, fontWeight: 600 }}>{data.title}</p>
          <p style={{ color: "#9CA3AF", maxWidth: 520, lineHeight: 1.7, fontSize: 15 }}>{data.tagline}</p>
        </div>

        <div style={{ ...fade(0.65), display: "flex", flexWrap: "wrap" as const, gap: 12, marginTop: 36 }}>
          {[
            { label: `✉ ${data.contact.email}`, href: `mailto:${data.contact.email}`, accent: true },
            { label: "in LinkedIn", href: data.contact.linkedin },
            { label: "⌥ GitHub", href: data.contact.github },
          ].map((btn, i) => (
            <a key={i} href={btn.href} target="_blank" rel="noreferrer" style={{ padding: "10px 20px", borderRadius: 999, border: btn.accent ? `1px solid rgba(245,158,11,0.5)` : "1px solid rgba(255,255,255,0.12)", color: btn.accent ? AMBER : "#D1D5DB", fontSize: 13, fontFamily: MONO, textDecoration: "none", display: "inline-block" }}>
              {btn.label}
            </a>
          ))}
        </div>

        <div style={{ ...fade(1.2), marginTop: 64, display: "flex", alignItems: "center", gap: 12, opacity: mounted ? 0.5 : 0 }}>
          <div style={{ width: 1, height: 36, background: AMBER }} />
          <span style={{ fontFamily: MONO, fontSize: 10, color: "#6B7280", letterSpacing: "0.2em" }}>SCROLL</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "80px 40px", maxWidth: 960, margin: "0 auto" }}>
      <SectionLabel>About</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <FadeIn>
          <h2 style={{ fontFamily: SERIF, fontWeight: 900, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "white", lineHeight: 1.3 }}>
            Crafting elegant solutions to complex engineering problems.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {data.summary.map((s, i) => (
              <li key={i} style={{ display: "flex", gap: 10, color: "#9CA3AF", lineHeight: 1.65, fontSize: 14 }}>
                <span style={{ color: AMBER, flexShrink: 0 }}>▸</span>{s}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="experience" style={{ padding: "80px 40px", maxWidth: 960, margin: "0 auto" }}>
      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.experience.map((exp, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              onClick={() => setOpen(open === i ? null : i)}
              style={{ border: `1px solid ${open === i ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", background: open === i ? "rgba(245,158,11,0.03)" : "rgba(255,255,255,0.02)", transition: "border-color 0.3s, background 0.3s" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "20px 24px", gap: 16 }}>
                <div>
                  <p style={{ fontWeight: 700, color: "white", fontSize: 16, margin: 0 }}>{exp.role}</p>
                  <p style={{ color: AMBER, fontSize: 12, fontFamily: MONO, marginTop: 4, marginBottom: 0 }}>{exp.company}</p>
                  <p style={{ color: "#6B7280", fontSize: 11, fontFamily: MONO, marginTop: 4, marginBottom: 0 }}>{exp.location} · {exp.period}</p>
                </div>
                <span style={{ color: "#9CA3AF", fontSize: 22, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.3s", flexShrink: 0, lineHeight: 1 }}>+</span>
              </div>
              <div style={{ maxHeight: open === i ? 500 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <ul style={{ padding: "0 24px 20px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, color: "#9CA3AF", fontSize: 13, lineHeight: 1.6 }}>
                      <span style={{ color: AMBER, flexShrink: 0 }}>▸</span>{h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "80px 40px", maxWidth: 960, margin: "0 auto" }}>
      <SectionLabel>Projects</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {data.projects.map((p, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div
              style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: 24, background: "rgba(255,255,255,0.02)", transition: "border-color 0.3s, transform 0.3s", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = p.color + "55"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
            >
              <div style={{ width: 32, height: 32, borderRadius: 10, background: p.color + "22", border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
              </div>
              <p style={{ fontWeight: 700, color: "white", fontSize: 15, margin: 0 }}>{p.name}</p>
              <p style={{ color: p.color, fontSize: 11, fontFamily: MONO, marginTop: 4, marginBottom: 10 }}>{p.subtitle}</p>
              <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.65, flex: 1, margin: 0 }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginTop: 16 }}>
                {p.stack.map((s, j) => (
                  <span key={j} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.05)", color: "#9CA3AF", fontFamily: MONO }}>{s}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "80px 40px", maxWidth: 960, margin: "0 auto" }}>
      <SectionLabel>Skills</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 48px" }}>
        {Object.entries(data.skills).map(([cat, items], i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", color: AMBER, textTransform: "uppercase" as const, marginBottom: 12, marginTop: 0 }}>{cat}</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 7 }}>
                {items.map((skill, j) => (
                  <span key={j} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", color: "#D1D5DB", fontFamily: MONO, background: "rgba(255,255,255,0.02)", cursor: "default" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={{ padding: "80px 40px", maxWidth: 960, margin: "0 auto" }}>
      <SectionLabel>Education</SectionLabel>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom, rgba(245,158,11,0.6), rgba(245,158,11,0.05))` }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingLeft: 36 }}>
          {data.education.map((edu, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -30, top: 6, width: 10, height: 10, borderRadius: "50%", border: `2px solid ${AMBER}`, background: BG }} />
                <p style={{ fontWeight: 700, color: "white", fontSize: 15, margin: 0 }}>{edu.institution}</p>
                <p style={{ color: "#9CA3AF", fontSize: 13, marginTop: 3, marginBottom: 0 }}>{edu.degree}</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6 }}>
                  <span style={{ fontFamily: MONO, fontSize: 12, color: AMBER }}>{edu.score}</span>
                  <span style={{ color: "#374151" }}>·</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: "#6B7280" }}>{edu.period}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "80px 40px", maxWidth: 960, margin: "0 auto" }}>
      <SectionLabel>Contact</SectionLabel>
      <FadeIn>
        <div style={{ border: "1px solid rgba(245,158,11,0.2)", borderRadius: 20, padding: "56px 32px", textAlign: "center" as const, background: "rgba(245,158,11,0.02)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.06), transparent 60%)" }} />
          <h2 style={{ fontFamily: SERIF, fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "white", marginBottom: 12, position: "relative" }}>
            Let's build something great.
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: 32, position: "relative", fontSize: 14 }}>
            Open to full-time roles, freelance projects, and collaborations.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, justifyContent: "center", gap: 12, position: "relative" }}>
            <a href={`mailto:${data.contact.email}`} style={{ padding: "12px 28px", borderRadius: 999, background: AMBER, color: BG, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "inline-block" }}>
              Send an Email
            </a>
            <a href={data.contact.linkedin} target="_blank" rel="noreferrer" style={{ padding: "12px 28px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", color: "#D1D5DB", fontSize: 13, textDecoration: "none", display: "inline-block" }}>
              Connect on LinkedIn
            </a>
          </div>
          <p style={{ fontFamily: MONO, fontSize: 11, color: "#4B5563", marginTop: 24, position: "relative" }}>📞 {data.contact.phone}</p>
        </div>
      </FadeIn>
    </section>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = ["hero", "about", "experience", "projects", "skills", "education", "contact"];

export default function App() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { threshold: 0.35 }
    );
    NAV_SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: BG, minHeight: "100vh", color: "white", fontFamily: SANS, margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; background: ${BG}; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${AMBER}; }
        @media (max-width: 640px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .side-nav { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(15,17,23,0.95)" : "rgba(15,17,23,0.7)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", transition: "background 0.3s" }}>
        <span style={{ fontFamily: MONO, fontSize: 13, color: AMBER, letterSpacing: "0.15em" }}>SV</span>
        <div style={{ display: "flex", gap: 20 }}>
          {["experience", "projects", "contact"].map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 11, fontFamily: MONO, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
              {id}
            </button>
          ))}
        </div>
      </header>

      {/* Side nav */}
      <nav className="side-nav" style={{ position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 40, display: "flex", flexDirection: "column", gap: 10 }}>
        {NAV_SECTIONS.map(id => (
          <button key={id} onClick={() => scrollTo(id)} title={id} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ width: active === id ? 24 : 7, height: 7, borderRadius: 4, background: active === id ? AMBER : "#374151", transition: "all 0.3s ease" }} />
          </button>
        ))}
      </nav>

      {/* Sections */}
      <main style={{ paddingTop: 60 }}>
        <Hero />
        <div className="about-grid" style={{ display: "contents" }}><About /></div>
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <footer style={{ textAlign: "center", padding: "24px", fontSize: 11, fontFamily: MONO, color: "#374151", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        © 2026 Sanjana V · React + TypeScript
      </footer>
    </div>
  );
}