/* ============================================================
   projects.js — Data-driven projects for Cloud Engineer & Cloud Architect
   ============================================================ */
const projects = [
  {
    badge: "IAC-01 // CLOUD ARCHITECTURE",
    title: "Infrastructure as Code with Terraform",
    metric: "Multi-Tier AWS VPC & Compute",
    problem:
      "Manual console provisioning causes configuration drift, security oversights, and unrepeatable deployments across cloud environments.",
    solution:
      "Architected and provisioned an entire AWS production stack using modular Terraform: custom multi-tier VPC (public & private subnets, route tables, Internet Gateway), EC2 instances, S3 storage, and least-privilege IAM policies as version-controlled code.",
    tech: ["Terraform", "AWS VPC", "AWS EC2", "IAM", "S3", "Security Groups"],
    github: "https://github.com/jimitshah07",
    docs: "https://github.com/jimitshah07",
  },
  {
    badge: "OPS-02 // INCIDENT TRIAGE",
    title: "Production Incident Diagnosis & Runbook Lab",
    metric: "MTTR: < 3 min resolution",
    problem:
      "Production-grade outages (crashed web daemons, SSH lockout from stale Security Group rules, disk saturation) require fast, methodical root-cause analysis rather than ad-hoc trial and error.",
    solution:
      "Engineered an AWS EC2 (Ubuntu) break/fix lab simulating live enterprise failures. Timed each resolution drill under 3 minutes and authored exhaustive runbooks detailing symptoms, diagnostic commands, root cause, fix, and post-incident verification.",
    tech: ["AWS EC2", "Ubuntu", "Nginx", "Security Groups", "Bash", "systemd"],
    github: "https://github.com/jimitshah07/l1l2-troubleshooting-runbook",
    docs: "https://github.com/jimitshah07/l1l2-troubleshooting-runbook#readme",
  },
  {
    badge: "MON-03 // AUTOMATION & ALERTING",
    title: "System Health Observability & Alerting Engine",
    metric: "Slack & SMTP Alerting",
    problem:
      "Silent host resource exhaustion (CPU spikes, memory leaks, I/O bottlenecks) leads to unpredicted application downtime without proactive alerting.",
    solution:
      "Engineered a scheduled Python daemon utilizing psutil to capture CPU, memory, disk, and network metrics. Integrated automated threshold-based alerts via Slack webhooks and SMTP email, paired with a lightweight Flask operational dashboard.",
    tech: ["Python", "psutil", "Flask", "Slack Webhook", "SMTP", "Linux Cron"],
    github: "https://github.com/jimitshah07/system-health-monitor",
    docs: "https://github.com/jimitshah07/system-health-monitor#readme",
  },
];

/* ---- Render Project Cards ---- */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = projects
    .map(
      (p) => `
    <article class="project-card">
      <div class="card-top-bar">
        <span class="card-badge">${p.badge}</span>
        <span class="card-metric">${p.metric}</span>
      </div>
      <div class="card-header">
        <div class="card-title-wrap">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/>
            <line x1="6" y1="18" x2="6.01" y2="18"/>
          </svg>
          <h3>${p.title}</h3>
        </div>
      </div>
      <div class="card-body">
        <div class="case-section">
          <span class="case-label">Architecture Problem</span>
          <p>${p.problem}</p>
        </div>
        <div class="case-section">
          <span class="case-label">Engineering Solution</span>
          <p>${p.solution}</p>
        </div>
        <div class="tech-tags">
          ${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="card-links">
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="card-link primary-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.33-1.76c-1.09-.74.08-.73.08-.73a2.52 2.52 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.6c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 0 1 1.24-3.22 4.3 4.3 0 0 1 .12-3.18s1-.32 3.3 1.23a11.38 11.38 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23a4.3 4.3 0 0 1 .12 3.18 4.64 4.64 0 0 1 1.23 3.22c0 4.61-2.81 5.63-5.48 5.92a2.86 2.86 0 0 1 .82 2.23v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3"/>
          </svg>
          Repository
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
          Architecture / Docs
        </a>
      </div>
    </article>`
    )
    .join("");
}

/* ---- Theme Toggle ---- */
function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const stored = localStorage.getItem("theme");

  if (stored === "dark" || (!stored && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  toggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

/* ---- Mobile Navigation ---- */
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("open")
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---- Smooth Scroll with Offset ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ---- Intersection Observer Reveal ---- */
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
    { threshold: 0.08 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ---- Active Navigation on Scroll ---- */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");
  if (!sections.length || !navItems.length) return;

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
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---- Copy Email Functionality ---- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll(".copy-btn");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const email = btn.getAttribute("data-email") || "jimit07cs@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        const originalText = btn.innerHTML;
        btn.classList.add("copied");
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Copied!
        `;
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.innerHTML = originalText;
        }, 2200);
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }
    });
  });
}

/* ---- Boot Application ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initTheme();
  initMobileNav();
  initSmoothScroll();
  initScrollReveal();
  initActiveNav();
  initCopyEmail();
});
