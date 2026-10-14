/* ============================================================
   projects.js — add a new card by pushing one object
   ============================================================ */
const projects = [
  {
    title: "L1/L2 Troubleshooting Runbook",
    problem:
      "Production-like incidents (nginx crash, SSH lockout via Security Group, disk full) need fast, repeatable fixes — but most juniors lack a structured runbook.",
    solution:
      "Built an AWS EC2 (Ubuntu) lab with deliberate break/fix scenarios, timed each resolution, and documented a step-by-step runbook.",
    tech: ["AWS EC2", "Ubuntu", "Nginx", "Security Groups", "Bash"],
    github: "https://github.com/jimitshah07/l1l2-troubleshooting-runbook",
    docs: "https://github.com/jimitshah07/l1l2-troubleshooting-runbook#readme",
  },
  {
    title: "System Health Monitor",
    problem:
      "Manually checking server metrics is error-prone and doesn't scale — teams need automated monitoring with real-time alerts.",
    solution:
      "Python + psutil service that logs CPU/memory/disk/network to CSV on a schedule, fires threshold alerts via SMTP email & Slack webhook, and exposes a Flask dashboard.",
    tech: ["Python", "psutil", "Flask", "SMTP", "Slack API", "CSV"],
    github: "https://github.com/jimitshah07/system-health-monitor",
    docs: "https://github.com/jimitshah07/system-health-monitor#readme",
  },
];

/* ---- render project cards ---- */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (p) => `
    <article class="project-card">
      <div class="card-header">
        <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
        <h3>${p.title}</h3>
      </div>
      <div class="card-body">
        <p><strong>Problem:</strong> ${p.problem}</p>
        <p><strong>Solution:</strong> ${p.solution}</p>
        <div class="tech-tags">
          ${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="card-links">
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="card-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.33-1.76c-1.09-.74.08-.73.08-.73a2.52 2.52 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.6c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 0 1 1.24-3.22 4.3 4.3 0 0 1 .12-3.18s1-.32 3.3 1.23a11.38 11.38 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23a4.3 4.3 0 0 1 .12 3.18 4.64 4.64 0 0 1 1.23 3.22c0 4.61-2.81 5.63-5.48 5.92a2.86 2.86 0 0 1 .82 2.23v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3"/>
          </svg>
          Code
        </a>
        <a href="${p.docs}" target="_blank" rel="noopener noreferrer" class="card-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          Docs
        </a>
      </div>
    </article>`
    )
    .join("");
}

/* ---- theme toggle ---- */
function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const stored = localStorage.getItem("theme");

  if (stored === "dark" || (!stored && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  toggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "light" : "dark"
    );
    localStorage.setItem("theme", isDark ? "light" : "dark");
  });
}

/* ---- mobile nav ---- */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("open")
    );
  });

  // close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---- smooth scroll ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ---- scroll-triggered fade-in ---- */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ---- active nav highlight on scroll ---- */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((a) => a.classList.remove("active"));
          const active = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -60% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initTheme();
  initMobileNav();
  initSmoothScroll();
  initScrollReveal();
  initActiveNav();
});
