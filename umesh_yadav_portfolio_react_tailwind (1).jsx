import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Trophy,
  BookOpen,
  Code2,
  Cpu,
  Database,
  Wrench,
  Sun,
  Moon,
  ChevronRight,
  Download,
  Phone,
  Globe,
  GraduationCap,
  Award,
  Star,
  Terminal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/*
====================================================
 Umesh Yadav – Portfolio (Full Version)
 - Modern navbar with active link highlight
 - Smooth scrolling
 - Dark/Light mode with persistence
 - Hero, About, Skills, Projects, Internships, Education,
   Certifications, Achievements, Contact, Footer
 - Framer Motion animations + tasteful hover effects
 - Shadcn UI + Tailwind CSS
====================================================
*/

// ----------------------------- Profile Data -----------------------------
const profile = {
  name: "Umesh Yadav",
  title: "Java Full‑Stack Developer | Backend Enthusiast | Problem Solver",
  location: "Bhopal, Madhya Pradesh",
  phone: "6260075196",
  email: "uu820209@gamil.com", // (typo?) change to gmail if needed
  links: {
    github: "https://github.com/Ume-6666",
    linkedin: "https://www.linkedin.com/in/umesh-yadav-1b57b2290/",
    leetcode: "https://leetcode.com/u/Umesh_00/",
    hackerrank: "https://www.hackerrank.com/profile/uu820209",
  },
  summary:
    "Final‑year Computer Science student, strong in Java and backend. I write clean, efficient code, love debugging tricky issues, and collaborate well with teams. Always learning — always building.",
  skills: {
    languages: ["C", "C++", "Java", "SQL"],
    web: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "Spring Boot",
      "JDBC",
      "JSP",
      "Servlet",
    ],
    database: ["MySQL", "MongoDB", "Oracle DB"],
    tools: ["Git", "GitHub", "VS Code", "Eclipse", "LeetCode"],
    strong: ["DSA", "OOPs", "RDBMS"],
    os: ["Windows"],
  },
  internships: [
    {
      org: "RICR – Web Development",
      date: "Nov 2024",
      points: [
        "Developed and deployed a responsive, SEO‑optimized website using Vite + React and Tailwind CSS (Hostinger).",
        "Achieved ~100 Lighthouse scores across categories on test URLs.",
      ],
    },
    {
      org: "CodeSoft – Web Development",
      date: "Jun 2024",
      points: [
        "Completed a focused 6‑week program covering modern frontend fundamentals and deployment.",
      ],
    },
  ],
  projects: [
    {
      name: "Furniture Website (Full‑Stack)",
      date: "Mar 2025",
      tech: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"],
      role: "Research & Development",
      desc:
        "Responsive e‑commerce UI with product galleries and search; Node.js backend for auth, product data, and APIs; SQL for orders & users; version‑controlled on GitHub.",
      link: "#",
    },
    {
      name: "Appointment Booking System (MERN)",
      date: "Mar 2025",
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      role: "Research & Development",
      desc:
        "Full‑stack appointment booking portal with role‑based access; improved scheduling efficiency and reduced wait times.",
      link: "#",
    },
    {
      name: "Tech Grade Portal (Team Project)",
      date: "Nov 2024",
      tech: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"],
      role: "Backend Developer",
      desc:
        "Collaborated in a team of four to build a professional events/production portal with secure APIs and admin workflows.",
      link: "#",
    },
    {
      name: "IoT – Home Automation (Arduino Cloud)",
      date: "Mar 2025",
      tech: ["C", "Arduino", "Arduino Cloud"],
      role: "Research & Development",
      desc:
        "Mobile‑compatible home automation to control household electronics remotely with real‑time monitoring via Arduino Cloud.",
      link: "#",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      org: "Bansal Institute of Research & Technology, M.P.",
      date: "Jun 2026",
      detail: "CGPA: 7.29",
    },
    {
      degree: "Intermediate",
      org: "Board of Higher Secondary Education, M.P.",
      date: "Mar 2022",
      detail: "76%",
    },
    {
      degree: "High School",
      org: "Board of Secondary Education, M.P.",
      date: "Mar 2020",
      detail: "69.75%",
    },
  ],
  certifications: [
    "Java – Infosys Springboard (Jun 2025)",
    "SQL (Intermediate) – HackerRank (2024)",
    "Full Stack Web Development – RICR (Mar 2025)",
    "Java – NPTEL (Jul–Dec 2024)",
    "Master Data Management – TCS Ninja (Jun 2025)",
    "Technology Job Simulation – Deloitte (Jun 2025)",
    "AWS Academy Data Engineering (Dec 2026)",
    "C/C++ Programming (Jun 2023)",
  ],
  achievements: [
    "5‑star in Java on HackerRank (Jun 2024)",
    "Head of Academic Club (Jun 2023)",
  ],
};

// ----------------------------- Helpers & Hooks -----------------------------
const Section = ({ id, icon: Icon, title, children }) => (
  <section id={id} className="scroll-mt-24 py-16">
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-8">
        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h2>
      </div>
      {children}
    </div>
  </section>
);

const Pill = ({ children }) => (
  <Badge className="rounded-full px-3 py-1.5 text-sm mr-2 mb-2 bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700">
    {children}
  </Badge>
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

function useActiveSection(ids) {
  const [active, setActive] = useState(ids?.[0] || "home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ? saved === "dark" : prefersDark;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark];
}

// ----------------------------- Reusable UI -----------------------------
const NavLink = ({ href, label, active }) => (
  <a
    href={href}
    className={`relative px-2 py-1 transition-colors ${
      active ? "text-blue-700 dark:text-blue-300" : "text-slate-600 dark:text-slate-300"
    }`}
  >
    {label}
    <span
      className={`absolute left-0 -bottom-1 h-0.5 transition-all ${
        active ? "w-full bg-blue-600 dark:bg-blue-400" : "w-0"
      }`}
    />
  </a>
);

const ProjectCard = ({ p }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <Card className="group rounded-2xl hover:shadow-lg transition-all border border-slate-200/70 dark:border-slate-700/70">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{p.name}</CardTitle>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
            {p.date}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{p.desc}</p>
        <div className="flex flex-wrap -m-1 mb-3">
          {p.tech.map((t) => (
            <span
              key={t}
              className="m-1 text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
        {p.link && (
          <a
            className="inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:no-underline"
            href={p.link}
            target="_blank"
            rel="noreferrer"
          >
            View <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const TimelineItem = ({ title, right, children }) => (
  <div className="relative pl-8 pb-8">
    <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400" />
    <div className="ml-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
        {right && <span className="text-sm text-slate-500">{right}</span>}
      </div>
      <div className="mt-2 text-slate-700 dark:text-slate-300">{children}</div>
    </div>
  </div>
);

// ----------------------------- Main Component -----------------------------
export default function Portfolio() {
  const sections = useMemo(
    () => ["home", "about", "skills", "projects", "experience", "education", "certs", "contact"],
    []
  );
  const active = useActiveSection(sections);
  const [dark, setDark] = useDarkMode();

  // Smooth scroll behavior for Safari
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-bold text-lg tracking-tight text-blue-700 dark:text-blue-300">
            {profile.name}
          </a>
          <div className="hidden md:flex items-center gap-5">
            <NavLink href="#about" label="About" active={active === "about"} />
            <NavLink href="#skills" label="Skills" active={active === "skills"} />
            <NavLink href="#projects" label="Projects" active={active === "projects"} />
            <NavLink href="#experience" label="Internships" active={active === "experience"} />
            <NavLink href="#education" label="Education" active={active === "education"} />
            <NavLink href="#certs" label="Certifications" active={active === "certs"} />
            <NavLink href="#contact" label="Contact" active={active === "contact"} />
          </div>
          <div className="flex items-center gap-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDark((d) => !d)}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="home" className="relative">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                {profile.name}
              </h1>
              <p className="mt-3 text-lg md:text-xl text-slate-700 dark:text-slate-300">
                {profile.title}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{profile.location}</span>
                <span className="mx-1">•</span>
                <Mail className="w-4 h-4 text-blue-600" />
                <a className="underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <span className="mx-1">•</span>
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{profile.phone}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects">
                  <Button className="rounded-2xl">View Projects</Button>
                </a>
                <a href="#contact">
                  <Button variant="outline" className="rounded-2xl">
                    Contact Me
                  </Button>
                </a>
                <a href="#" onClick={(e)=>e.preventDefault()}>
                  <Button variant="ghost" className="rounded-2xl">
                    <Download className="w-4 h-4 mr-2" /> Download CV
                  </Button>
                </a>
              </div>
            </motion.div>
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="rounded-2xl shadow-sm border border-slate-200/70 dark:border-slate-700/70">
                <CardHeader>
                  <CardTitle>Career Objective</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {profile.summary}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </header>

      {/* About */}
      <Section id="about" icon={Terminal} title="About Me">
        <motion.p
          {...fadeUp}
          className="max-w-3xl text-slate-700 dark:text-slate-300 leading-7"
        >
          I am a curious engineer who enjoys building full‑stack apps and solving
          real problems with clean, maintainable code. I focus on Java/Spring
          Boot for backend and React for frontend. Beyond coding, I like
          optimizing workflows and automating repetitive tasks.
        </motion.p>
      </Section>

      {/* Skills */}
      <Section id="skills" icon={Wrench} title="Technical Skills">
        <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" /> Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.skills.languages.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5" /> Web / Full‑Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.skills.web.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" /> Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.skills.database.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5" /> Tools & Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.skills.tools.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
              <div className="mt-2" />
              {profile.skills.strong.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* Projects */}
      <Section id="projects" icon={Code2} title="Projects">
        <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-6">
          {profile.projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </motion.div>
      </Section>

      {/* Internships */}
      <Section id="experience" icon={Wrench} title="Internships">
        <motion.div {...fadeUp} className="relative">
          <div className="absolute left-3 md:left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
          <div className="pl-3 md:pl-6">
            {profile.internships.map((i) => (
              <TimelineItem key={i.org} title={i.org} right={i.date}>
                <ul className="list-disc pl-5 space-y-2">
                  {i.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </TimelineItem>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Education */}
      <Section id="education" icon={BookOpen} title="Education">
        <motion.div {...fadeUp} className="grid md:grid-cols-3 gap-6">
          {profile.education.map((e) => (
            <Card key={e.degree} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{e.degree}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{e.org}</p>
                <p className="text-sm text-slate-500">{e.date}</p>
                <p className="text-sm mt-2">{e.detail}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </Section>

      {/* Certifications & Achievements */}
      <Section id="certs" icon={Trophy} title="Certifications & Achievements">
        <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                {profile.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                {profile.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* Contact */}
      <Section id="contact" icon={Mail} title="Contact">
        <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p>
                  Email: {" "}
                  <a className="underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </p>
                <p>Phone: {profile.phone}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={profile.links.github} target="_blank" rel="noreferrer">
                    <Button className="rounded-2xl" variant="outline">
                      <Github className="w-4 h-4 mr-2" /> GitHub
                    </Button>
                  </a>
                  <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                    <Button className="rounded-2xl" variant="outline">
                      <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a
                href={profile.links.leetcode}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 underline"
              >
                LeetCode <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={profile.links.hackerrank}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 underline"
              >
                HackerRank <ExternalLink className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:underline">
              GitHub
            </a>
            <span>•</span>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
