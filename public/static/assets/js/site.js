(function () {
  const brandImage = "https://avatars.githubusercontent.com/u/121910566?s=400&u=3af69fccc44ae03237b7cd6cac8e2720bfbc726a&v=4";

  const navItems = [
    {
      type: "link",
      label: "Home",
      href: "/",
      icon: "home"
    },
    {
      type: "group",
      label: "R&D",
      href: "/projects/",
      icon: "projects",
      description: "Open-source project lanes, research briefs, and public tooling maps from SkyPenguinLabs.",
      matchPaths: ["/projects/", "/projects/vibelang/", "/projects/r-and-d/pakwolf/", "/projects/r-and-d/mxorame/", "/projects/ctfx/", "/projects/foss-forest/"],
      children: [
        { type: "link", label: "V.I.B.E", href: "/projects/vibelang/", icon: "code", description: "Language and workflow research for readable automation plans and traceable operator execution.", matchPaths: ["/projects/vibelang/"] },
        { type: "link", label: "FOSS Forest", href: "/projects/foss-forest/", icon: "forest", description: "The public catalog for SPL utilities, experiments, documentation tooling, and research briefs.", matchPaths: ["/projects/foss-forest/"] },
        { type: "link", label: "PakWolf", href: "/projects/r-and-d/pakwolf/", icon: "package", description: "R&D for artifact, package, and binary inspection workflows with defensible notes.", matchPaths: ["/projects/r-and-d/pakwolf/"] },
        { type: "link", label: "CTFx", href: "/projects/ctfx/", icon: "flag", description: "Lab and challenge operations for focused security exercises and evidence-oriented practice.", matchPaths: ["/projects/ctfx/"] },
        { type: "link", label: "MxOramë", href: "/projects/r-and-d/mxorame/", icon: "more", description: "Future R&D lane for memory, orchestration, and automation experiments.", matchPaths: ["/projects/r-and-d/mxorame/"] }
      ]
    },
    {
      type: "group",
      label: "Utilities",
      href: "/tools/",
      icon: "tools",
      description: "Practical operator utilities organized by automation, cybersecurity, and reusable snippets.",
      matchPaths: ["/tools/", "/tools/docs/", "/tools/upcoming/"],
      children: [
        { type: "link", label: "Index", href: "/tools/", icon: "tools", description: "The public catalog of SkyPenguinLabs utilities and operational references.", matchPaths: ["/tools/"] },
        { type: "link", label: "Documentation Index", href: "/tools/docs/", icon: "snippets", description: "Future documentation index for utility manuals, field notes, and release references.", matchPaths: ["/tools/docs/"] },
        { type: "link", label: "Upcoming", href: "/tools/upcoming/", icon: "automation", description: "Future queue for utilities that are planned, staged, or being prepared for release.", matchPaths: ["/tools/upcoming/"] }
      ]
    }
  ];

  const icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8v9.7h-6v-6h-6v6H3z"/></svg>',
    projects: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/></svg>',
    tools: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h5l2 2h9v10H4zm2 4v6h12v-6z"/></svg>',
    forest: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 14h4v7h6v-7h4z"/></svg>',
    tips: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2Zm-3 18h6v2H9z"/></svg>',
    shop: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14l-1 14H6zm3-4h8l2 4H6z"/></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8.7 16.6-6-4.6 6-4.6 1.2 1.6-3.9 3 3.9 3zm6.6 0-1.2-1.6 3.9-3-3.9-3 1.2-1.6 6 4.6z"/></svg>',
    package: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 9 5v10l-9 5-9-5V7zm0 2.3L6.2 7.5 12 10.7l5.8-3.2zm-7 5v6.5l6 3.3v-6.5zm14 0-6 3.3v6.5l6-3.3z"/></svg>',
    flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h13l-2 5 2 5H7v8H5z"/></svg>',
    automation: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 2h2v4h-2zM4.2 5.6l1.4-1.4L8.4 7 7 8.4zM18.4 4.2l1.4 1.4L17 8.4 15.6 7zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-8 3h4v2H4zm12 0h4v2h-4zM7 15.6 8.4 17l-2.8 2.8-1.4-1.4zm10 0 2.8 2.8-1.4 1.4-2.8-2.8zM11 18h2v4h-2z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/></svg>',
    snippets: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v4H4zm0 6h10v4H4zm0 6h16v4H4z"/></svg>',
    more: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zm2 3.2V17h14V8.2l-7 5zM6.4 7l5.6 4 5.6-4z"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5.1 0-1.1.4-2.1 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1.1A9.3 9.3 0 0 1 12 6.8c.9 0 1.7.1 2.5.4 1.9-1.4 2.8-1.1 2.8-1.1.5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.8 0 4-2.3 4.8-4.6 5.1.4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 22 12.2C22 6.6 17.5 2 12 2Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.7L23.2 22h-6.3L12 14.6 5.5 22H2.4l7.2-8.3L1.8 2h6.4l4.4 6.8zM17.8 20h1.7L7.3 3.9H5.4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zm4 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/></svg>'
  };

  function pathWithSlash(path) {
    if (path === "/") return "/";
    return path.endsWith("/") ? path : `${path}/`;
  }

  function currentPath() {
    return pathWithSlash(window.location.pathname);
  }

  function isCurrent(item, path = currentPath()) {
    const hashPath = `${path}${window.location.hash || ""}`;
    const paths = [item.href, ...(item.matchPaths || [])].filter(Boolean);
    return paths.some((candidate) => {
      if (candidate.includes("#")) return hashPath === candidate;
      const normalized = pathWithSlash(candidate);
      return normalized === "/" ? path === "/" : path === normalized || path.startsWith(normalized);
    }) || (item.children || []).some((child) => isCurrent(child, path));
  }

  function navLink(item, className = "nav-link") {
    const active = isCurrent(item);
    const description = item.description ? ` data-nav-description="${escapeAttribute(item.description)}"` : "";
    return `<a class="${className}" href="${item.href}"${description}${active ? ' aria-current="page"' : ""}>${icons[item.icon] || ""}<span>${item.label}</span></a>`;
  }

  function escapeAttribute(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function desktopNavItem(item, index) {
    if (item.type !== "group") return `<div class="nav-item">${navLink(item)}</div>`;
    const active = isCurrent(item);
    return `
      <div class="nav-item nav-group${active ? " is-active" : ""}" data-nav-group>
        <button class="nav-link nav-trigger" type="button" aria-expanded="false" aria-controls="nav-panel-${index}" data-nav-trigger>
          ${icons[item.icon] || ""}<span>${item.label}</span><span class="nav-caret" aria-hidden="true"></span>
        </button>
        <div class="nav-panel" id="nav-panel-${index}" data-nav-panel>
          <div class="nav-panel-inner">
            <div class="nav-panel-links">
              ${item.children.map((child) => navLink(child, "nav-panel-link")).join("")}
            </div>
            <div class="nav-panel-brief">
              <span data-nav-brief-title>${item.label}</span>
              <p data-nav-brief-copy>${item.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function mobileNavItem(item, index) {
    if (item.type !== "group") return `<div class="mobile-nav-item">${navLink(item, "mobile-nav-link")}</div>`;
    const active = isCurrent(item);
    return `
      <div class="mobile-nav-group${active ? " is-active" : ""}">
        <button class="mobile-nav-link mobile-nav-trigger" type="button" aria-expanded="false" aria-controls="mobile-nav-panel-${index}" data-mobile-nav-trigger>
          ${icons[item.icon] || ""}<span>${item.label}</span><span class="nav-caret" aria-hidden="true"></span>
        </button>
        <div class="mobile-nav-panel" id="mobile-nav-panel-${index}" hidden>
          ${item.children.map((child) => navLink(child, "mobile-nav-sublink")).join("")}
        </div>
      </div>
    `;
  }

  function header() {
    return `
      <a class="skip-link" href="#main">Skip to content</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="/" aria-label="SkyPenguinLabs home">
            <img class="brand-mark" src="${brandImage}" alt="" width="40" height="40" decoding="async">
            <span>
              <span class="brand-name">SkyPenguinLabs</span>
              <span class="brand-kicker">Security R&D</span>
            </span>
          </a>
          <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle><span></span></button>
          <nav class="site-nav" aria-label="Primary navigation" data-site-nav>
            <div class="desktop-nav" data-desktop-nav>
              ${navItems.map(desktopNavItem).join("")}
            </div>
            <div class="mobile-nav" data-mobile-nav>
              ${navItems.map(mobileNavItem).join("")}
            </div>
          </nav>
        </div>
      </header>
    `;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <section class="footer-brand">
            <a class="brand" href="/" aria-label="SkyPenguinLabs home">
              <img class="brand-mark" src="${brandImage}" alt="" width="40" height="40" loading="lazy" decoding="async">
              <span>
                <span class="brand-name">SkyPenguinLabs</span>
                <span class="brand-kicker">Security R&D / FOSS Engineering</span>
              </span>
            </a>
            <p>Tools, research prototypes, documentation utilities, and contractor-oriented execution for security teams that need direct technical output.</p>
            <div class="social-links" aria-label="SkyPenguinLabs social links">
              <a class="icon-link" href="mailto:skypenguinlabs@gmail.com" aria-label="Email SkyPenguinLabs">${icons.mail}</a>
              <a class="icon-link" href="https://github.com/SkyPenguinLabs" aria-label="SkyPenguinLabs on GitHub">${icons.github}</a>
              <a class="icon-link" href="https://x.com/SkyPenguinLabs" aria-label="SkyPenguinLabs on X">${icons.x}</a>
              <a class="icon-link" href="https://instagram.com/SkyPenguinLabs" aria-label="SkyPenguinLabs on Instagram">${icons.instagram}</a>
            </div>
          </section>
          <nav class="footer-links" aria-label="R&D footer links">
            <h2>R&D</h2>
            <a href="/projects/vibelang/">V.I.B.E</a>
            <a href="/projects/foss-forest/">FOSS Forest</a>
            <a href="/projects/r-and-d/pakwolf/">PakWolf</a>
            <a href="/projects/ctfx/">CTFx</a>
            <a href="/projects/r-and-d/mxorame/">MxOramë</a>
          </nav>
          <nav class="footer-links" aria-label="Follow the War footer links">
            <h2>Follow the War</h2>
            <a href="/war-room/">War Room</a>
            <a href="/whitepapers/">Whitepapers</a>
            <a href="https://github.com/SkyPenguinLabs">GitHub organization</a>
            <a href="https://x.com/SkyPenguinLabs">X / SkyPenguinLabs</a>
            <a href="https://instagram.com/SkyPenguinLabs">Instagram</a>
          </nav>
          <nav class="footer-links" aria-label="About footer links">
            <h2>About</h2>
            <a href="/mission/">Mission</a>
            <a href="/pages/spl_forms_list.html">Forms Page</a>
            <a href="/pages/spl_product_iceberg.html">General Product(s)</a>
            <a href="/pages/spl_product_iceberg.html">Courses &amp; eBooks</a>
            <a href="mailto:skypenguinlabs@gmail.com">Contact</a>
          </nav>
          <nav class="footer-links" aria-label="More footer links">
            <h2>More</h2>
            <a href="/tools/">Utilities Index</a>
            <a href="/tools/docs/">Documentation Index</a>
            <a href="/tools/upcoming/">Upcoming</a>
            <a href="/sec-tips/">Security Tips</a>
            <a href="/404.html">404 Route</a>
          </nav>
        </div>
      </footer>
    `;
  }

  function chrome() {
    const shell = document.querySelector("[data-site-shell]");
    if (!shell) return;
    shell.insertAdjacentHTML("afterbegin", header());
    shell.insertAdjacentHTML("beforeend", footer());

    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-site-nav]");
    if (!toggle || !nav) return;

    const desktopGroups = Array.from(document.querySelectorAll("[data-nav-group]"));
    const mobileTriggers = Array.from(document.querySelectorAll("[data-mobile-nav-trigger]"));
    let closeTimer = null;
    let openTimer = null;

    function closeDesktopGroups(except = null) {
      desktopGroups.forEach((group) => {
        if (group === except) return;
        group.classList.remove("is-open");
        group.querySelector("[data-nav-trigger]")?.setAttribute("aria-expanded", "false");
      });
    }

    function openDesktopGroup(group) {
      if (closeTimer) window.clearTimeout(closeTimer);
      if (openTimer) window.clearTimeout(openTimer);
      closeDesktopGroups(group);
      group.classList.add("is-open");
      group.querySelector("[data-nav-trigger]")?.setAttribute("aria-expanded", "true");
    }

    function scheduleDesktopOpen(group) {
      if (closeTimer) window.clearTimeout(closeTimer);
      if (openTimer) window.clearTimeout(openTimer);
      openTimer = window.setTimeout(() => {
        openDesktopGroup(group);
      }, 90);
    }

    function scheduleDesktopClose(group) {
      if (closeTimer) window.clearTimeout(closeTimer);
      if (openTimer) window.clearTimeout(openTimer);
      closeTimer = window.setTimeout(() => {
        group.classList.remove("is-open");
        group.querySelector("[data-nav-trigger]")?.setAttribute("aria-expanded", "false");
      }, 120);
    }

    desktopGroups.forEach((group) => {
      const trigger = group.querySelector("[data-nav-trigger]");
      const briefTitle = group.querySelector("[data-nav-brief-title]");
      const briefCopy = group.querySelector("[data-nav-brief-copy]");
      const defaultTitle = briefTitle?.textContent || "";
      const defaultCopy = briefCopy?.textContent || "";

      function setBrief(title, copy) {
        if (briefTitle) briefTitle.textContent = title;
        if (briefCopy) briefCopy.textContent = copy;
      }

      group.querySelectorAll(".nav-panel-link").forEach((link) => {
        const updateBrief = () => {
          const label = link.textContent.trim();
          const description = link.dataset.navDescription || defaultCopy;
          setBrief(label, description);
        };
        link.addEventListener("mouseenter", updateBrief);
        link.addEventListener("focus", updateBrief);
      });

      group.addEventListener("mouseenter", () => scheduleDesktopOpen(group));
      group.addEventListener("mouseleave", () => {
        setBrief(defaultTitle, defaultCopy);
        scheduleDesktopClose(group);
      });
      group.addEventListener("focusin", () => scheduleDesktopOpen(group));
      group.addEventListener("focusout", () => {
        window.setTimeout(() => {
          if (!group.contains(document.activeElement)) {
            setBrief(defaultTitle, defaultCopy);
            scheduleDesktopClose(group);
          }
        }, 0);
      });
      trigger?.addEventListener("click", () => {
        const open = group.classList.contains("is-open");
        if (open) {
          closeDesktopGroups();
        } else {
          openDesktopGroup(group);
        }
      });
    });

    function setMobileOpen(open) {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      if (!open) {
        mobileTriggers.forEach((trigger) => {
          trigger.setAttribute("aria-expanded", "false");
          const panel = document.getElementById(trigger.getAttribute("aria-controls"));
          if (panel) panel.hidden = true;
        });
      }
    }

    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      setMobileOpen(open);
    });

    mobileTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const panel = document.getElementById(trigger.getAttribute("aria-controls"));
        const open = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!open));
        if (panel) panel.hidden = open;
      });
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setMobileOpen(false);
        closeDesktopGroups();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      closeDesktopGroups();
      toggle.blur();
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest(".site-header")) return;
      setMobileOpen(false);
      closeDesktopGroups();
    });
  }

  function renderProjectCards(target, projects) {
    if (!target || !Array.isArray(projects)) return;
    target.innerHTML = projects.map((project) => `
      <a class="card" href="${project.path}">
        <div class="card-meta">
          <span class="card-icon" aria-hidden="true">${icons.projects}</span>
          <span class="chip chip-${project.accent}">${project.family}</span>
          <span class="chip">${project.stage}</span>
        </div>
        <h3>${project.name}</h3>
        <p>${project.summary}</p>
        <span class="card-link">Open brief</span>
      </a>
    `).join("");
  }

  function renderProjectList() {
    const target = document.querySelector("[data-project-list]");
    if (!target || !window.SPL_PROJECTS) return;
    const scope = target.dataset.projectList;
    const projects = scope === "forest"
      ? window.SPL_PROJECTS.filter((project) => project.family === "FOSS Forest")
      : window.SPL_PROJECTS.filter((project) => ["vibelang", "ctfx", "pakwolf", "foss-forest"].includes(project.slug));
    renderProjectCards(target, projects);
  }

  function renderBrief() {
    const target = document.querySelector("[data-project-brief]");
    if (!target || !window.SPL_PROJECTS) return;
    const slug = target.dataset.projectBrief;
    const project = window.SPL_PROJECTS.find((item) => item.slug === slug);
    if (!project) {
      console.error(`[SPL] Missing project metadata for ${slug}`);
      return;
    }

    document.title = `${project.name} | SkyPenguinLabs`;
    const forestLink = project.family === "FOSS Forest" && project.slug !== "foss-forest"
      ? '<a class="btn btn-quiet" href="/projects/foss-forest/">FOSS Forest</a>'
      : '<a class="btn btn-quiet" href="/projects/">Project map</a>';

    target.innerHTML = `
      <section class="brief">
        <div class="container brief-layout">
          <article>
            <p class="eyebrow">${project.family}</p>
            <h1>${project.name}</h1>
            <p class="lead">${project.summary}</p>
            <div class="action-row">
              <a class="btn btn-primary" href="${project.repo}">Project source</a>
              ${forestLink}
              <a class="btn btn-secondary" href="mailto:skypenguinlabs@gmail.com?subject=${encodeURIComponent(project.name + " inquiry")}">Discuss use</a>
            </div>
          </article>
          <aside class="brief-panel" aria-label="Project facts">
            <h2>Project Facts</h2>
            <div class="facts">
              <div class="fact"><span>Status</span><strong>${project.status}</strong></div>
              <div class="fact"><span>Maturity</span><strong>${project.stage}</strong></div>
              <div class="fact"><span>Audience</span><strong>${project.audience}</strong></div>
            </div>
          </aside>
        </div>
      </section>
      <section class="section section-alt">
        <div class="container grid grid-2">
          <div class="brief-panel">
            <h2>Problem</h2>
            <p>${project.problem}</p>
          </div>
          <div class="brief-panel">
            <h2>Approach</h2>
            <p>${project.approach}</p>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-head">
            <div>
              <p class="eyebrow">Focus Areas</p>
              <h2>What this brief tracks</h2>
            </div>
            <p class="section-copy">Public labels stay conservative until the implementation, release state, and support model are documented.</p>
          </div>
          <div class="grid grid-3">
            ${project.focus.map((item) => `<div class="card"><span class="chip chip-${project.accent}">Track</span><h3>${item}</h3><p>Scoped as part of the ${project.name} project lane.</p></div>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    chrome();
    renderProjectList();
    renderBrief();
  });
})();
