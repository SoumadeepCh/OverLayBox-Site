"use client";

import { MouseEvent } from "react";

export default function Home() {
  const applyTheme = (e: MouseEvent, themeName: string) => {
    e.preventDefault();
    
    // Fallback for browsers that don't support View Transitions API
    if (!document.startViewTransition) {
      document.body.setAttribute("data-theme", themeName);
      return;
    }

    // Get click position
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty("--click-x", `${x}px`);
    document.documentElement.style.setProperty("--click-y", `${y}px`);

    document.documentElement.classList.add("theme-transition");
    
    const transition = document.startViewTransition(() => {
      document.body.setAttribute("data-theme", themeName);
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove("theme-transition");
    });
  };

  return (
    <>
      {/* NAV */}
      <nav className="navbar">
        <a href="#" className="navbar-logo">
          <span className="logo-icon">⬡</span>
          OverlayBox
        </a>
        <ul className="navbar-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#commands">Commands</a></li>
          <li><a href="#themes">Themes</a></li>
          <li><a href="#privacy">Privacy</a></li>
          <li><a href="#install">Install</a></li>
          <li>
            <a
              href="https://github.com/SoumadeepCh/OverlayBox"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav"
            >
              GitHub →
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>

        <div className="container" style={{ position: "relative" }}>
          <div className="hero-badge">
            <span className="dot" />
            Manifest V3 · Chrome Extension · 100% Local
          </div>

          <h1 className="hero-title">
            Style Any Website<br />
            with <span className="gradient-text">Plain English</span>
          </h1>

          <p className="hero-subtitle">
            OverlayBox injects a sleek floating panel into any website. Type{" "}
            <em>make headings red</em>, <em>cyberpunk mode</em>, <em>make links glow</em> —
            and watch the page transform instantly. No DevTools. No code. Fully reversible.
          </p>

          <div className="hero-cta-group">
            <a
              href="https://github.com/SoumadeepCh/OverlayBox"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Download on GitHub
            </a>
            <a href="#features" className="btn-secondary">
              Explore Features ↓
            </a>
          </div>

          {/* Terminal Demo */}
          <div className="hero-terminal">
            <div className="terminal-bar">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">OverlayBox — any website</span>
            </div>
            <div className="terminal-body">
              <span className="terminal-line">
                <span className="comment"># Type a command, press Ctrl+Enter</span>
              </span>
              <span className="terminal-line" style={{ marginTop: "8px" }}>
                <span className="prompt">▶ </span>
                <span className="cmd">cyberpunk mode</span>
              </span>
              <span className="terminal-line">
                <span className="ok">✓ </span>Theme applied: cyberpunk
              </span>
              <span className="terminal-line" style={{ marginTop: "4px" }}>
                <span className="prompt">▶ </span>
                <span className="cmd">make headings glow</span>
              </span>
              <span className="terminal-line">
                <span className="ok">✓ </span>Animation applied to h1,h2,h3...
              </span>
              <span className="terminal-line" style={{ marginTop: "4px" }}>
                <span className="prompt">▶ </span>
                <span className="cmd">highlight &quot;important&quot;</span>
              </span>
              <span className="terminal-line">
                <span className="ok">✓ </span>Highlighted 14 matches
              </span>
              <span className="terminal-line" style={{ marginTop: "4px" }}>
                <span className="prompt">▶ </span>
                <span className="cmd">save macro dark: dark mode; make headings glow<span className="typing-cursor" /></span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-strip">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Commands Supported</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8</div>
            <div className="stat-label">CSS Animations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">Theme Presets</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">0</div>
            <div className="stat-label">Network Requests</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Undo History</div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-label">What it does</div>
          <h2 className="section-title">
            Everything You Need to<br />
            <span className="highlight">Transform Any Page</span>
          </h2>
          <p className="section-desc">
            A full-featured DOM manipulation engine hiding behind plain human language.
            No CSS knowledge required — ever.
          </p>

          <div className="features-grid">
            {[
              {
                icon: "🎨",
                title: "Colour & Style",
                desc: "Change colours of headings, links, paragraphs, buttons, images and more — by name or hex code.",
              },
              {
                icon: "👁",
                title: "Visibility Control",
                desc: "Hide or reveal any element type instantly: nav, footer, images, sidebars — with a single word.",
              },
              {
                icon: "🌙",
                title: "Dark / Light Mode",
                desc: "One command switches the entire page between dark (#111827) and light (#ffffff) modes.",
              },
              {
                icon: "✨",
                title: "Animations",
                desc: "Apply bounce, shake, pulse, spin, glow, float, rainbow, and fade animations to any elements.",
              },
              {
                icon: "🎭",
                title: "Theme Presets",
                desc: "Instantly transform any site with Cyberpunk, Minimal, Retro, Neon, or Newspaper themes.",
              },
              {
                icon: "🔍",
                title: "Text Targeting",
                desc: "Colour all numbers, highlight words, or style text containing specific phrases across an entire page.",
              },
              {
                icon: "🧘",
                title: "Focus Mode",
                desc: "Dim distractions and centre the article content for a calm, focused reading experience.",
              },
              {
                icon: "📋",
                title: "Macros",
                desc: "Save multi-step command sequences under a name and replay them with a single word.",
              },
              {
                icon: "📍",
                title: "Site Rules",
                desc: "Persist commands per domain — they auto-run every time you revisit that site.",
              },
              {
                icon: "↩️",
                title: "Full Rollback",
                desc: "Every change is tracked. One Reset click restores the exact pre-modification state — no reload needed.",
              },
              {
                icon: "📝",
                title: "Typography",
                desc: "Bold, italic, underline any element. Increase or decrease font size in 2px steps with plain words.",
              },
              {
                icon: "🔒",
                title: "Shadow DOM Panel",
                desc: "The draggable, resizable panel lives in a Shadow DOM — completely isolated from the page's CSS.",
              },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PANEL SECTION */}
      <section className="section panel-section" id="panel">
        <div className="container">
          <div className="panel-layout">
            {/* Mockup */}
            <div>
              <div className="panel-mockup">
                <div className="panel-header">
                  <span className="panel-header-title">⬡ OverlayBox</span>
                  <div className="panel-controls">
                    <div className="panel-ctrl">?</div>
                    <div className="panel-ctrl">▲</div>
                    <div className="panel-ctrl">🔓</div>
                    <div className="panel-ctrl">✕</div>
                  </div>
                </div>
                <div className="panel-tabs">
                  <div className="panel-tab active">Run</div>
                  <div className="panel-tab">History</div>
                  <div className="panel-tab">Help</div>
                </div>
                <div className="panel-body">
                  <textarea
                    className="panel-textarea"
                    rows={3}
                    defaultValue="cyberpunk mode"
                    readOnly
                  />
                  <div className="panel-actions">
                    <div className="panel-btn run">▶ Run</div>
                    <div className="panel-btn reset">⟲ Reset</div>
                  </div>
                  <div className="panel-status">✓ Theme applied: cyberpunk</div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="section-label">The Panel</div>
              <h2 className="section-title">
                A Floating Cockpit<br />
                <span className="highlight">for Every Tab</span>
              </h2>
              <p className="section-desc" style={{ marginBottom: "24px" }}>
                The panel is always at your fingertips — drag it anywhere, resize it, collapse it, lock it. It sits at the highest possible z-index inside a Shadow DOM so it&apos;s never affected by the host page.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: "↕️", text: "Draggable and resizable — position persisted across sessions" },
                  { icon: "⌨️", text: "Ctrl+Enter / Shift+Enter to submit commands fast" },
                  { icon: "💡", text: "Autocomplete suggests commands and saved macro names" },
                  { icon: "🕐", text: "Last 50 commands in history tab" },
                  { icon: "🟢", text: "Status bar shows success / error with 5s auto-clear" },
                  { icon: "❓", text: "Built-in help tab with clickable command chips" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 16px", background: "rgba(108,99,255,0.05)", borderRadius: "8px", border: "1px solid rgba(108,99,255,0.12)" }}>
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* COMMANDS */}
      <section className="section commands-section" id="commands">
        <div className="container">
          <div className="section-label">Command Reference</div>
          <h2 className="section-title">
            Over 50 Commands,<br />
            <span className="highlight">All Plain English</span>
          </h2>
          <p className="section-desc">
            The built-in NLP regex parser handles flexible phrasing. Most commands work with multiple synonymous verbs.
          </p>

          <div className="commands-layout">
            <div>
              <div className="command-group">
                <div className="command-group-title">🎨 Colour & Style</div>
                <div className="command-chips">
                  {["make headings red", "set links #6c63ff", "turn buttons cyan", "make paragraphs background yellow"].map(c => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="command-group">
                <div className="command-group-title">👁 Visibility</div>
                <div className="command-chips">
                  {["hide images", "show nav", "hide footer", "remove sidebar"].map(c => (
                    <span className="chip cyan" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="command-group">
                <div className="command-group-title">🌙 Background</div>
                <div className="command-chips">
                  {["dark mode", "light mode", "change background to #1a1a2e", "change background to teal"].map(c => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="command-group">
                <div className="command-group-title">📝 Typography</div>
                <div className="command-chips">
                  {["bold headings", "italic paragraphs", "underline links", "increase heading size", "decrease paragraph size"].map(c => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="command-group">
                <div className="command-group-title">🔍 Text Targeting</div>
                <div className="command-chips">
                  {['make numbers orange', 'make text containing "error" red', 'highlight "important"', 'highlight important words'].map(c => (
                    <span className="chip green" key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="command-group">
                <div className="command-group-title">✨ Animations</div>
                <div className="command-chips">
                  {["make headings bounce", "make links glow", "make images float", "make buttons pulse", "add spin effect", "add rainbow effect"].map(c => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="command-group">
                <div className="command-group-title">🎭 Themes</div>
                <div className="command-chips">
                  {["cyberpunk mode", "minimal mode", "retro mode", "neon mode", "newspaper mode", "reset theme"].map(c => (
                    <span className="chip cyan" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="command-group">
                <div className="command-group-title">🧘 Focus</div>
                <div className="command-chips">
                  {["focus mode", "blur everything except headings", "blur everything except main"].map(c => (
                    <span className="chip green" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="command-group">
                <div className="command-group-title">📋 Macros</div>
                <div className="command-chips">
                  {["save macro dark: dark mode; make headings glow", "run macro dark", "list macros", "delete macro dark"].map(c => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="command-group">
                <div className="command-group-title">📍 Site Rules</div>
                <div className="command-chips">
                  {["save rule dark mode", "persist rule hide nav", "list rules", "clear rules"].map(c => (
                    <span className="chip green" key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* THEMES */}
      <section className="section" id="themes">
        <div className="container">
          <div className="section-label">Visual Themes</div>
          <h2 className="section-title">
            5 Instant Themes,<br />
            <span className="highlight">One Command Each</span>
          </h2>
          <p className="section-desc">
            Full-page visual transformations applied as a single scoped style tag — instantly undoable with &ldquo;reset theme&rdquo;.
          </p>

          <div className="themes-grid">
            {[
              {
                key: "default",
                label: "DEFAULT",
                cmd: "reset theme",
                desc: "Original dark glass aesthetics",
              },
              {
                key: "cyberpunk",
                label: "CYBERPUNK",
                cmd: "cyberpunk mode",
                desc: "#0a0014 bg, cyan text, magenta headings, neon glow",
              },
              {
                key: "minimal",
                label: "Minimal",
                cmd: "minimal mode",
                desc: "Clean #fafafa, Georgia serif, hides clutter",
              },
              {
                key: "retro",
                label: "RETRO",
                cmd: "retro mode",
                desc: "Parchment bg, monospace, dark-red uppercase headings",
              },
              {
                key: "neon",
                label: "NEON",
                cmd: "neon mode",
                desc: "#05001a bg, neon green & pink headings, glow",
              },
              {
                key: "newspaper",
                label: "NEWSPAPER",
                cmd: "newspaper mode",
                desc: "Two-column, Times New Roman, sepia filter",
              },
            ].map((t) => (
              <div 
                className={`theme-card ${t.key === 'default' ? 'default-theme' : ''}`} 
                key={t.key}
                onClick={(e) => applyTheme(e, t.key)}
                style={{ cursor: "pointer" }}
              >
                <div className={`theme-preview ${t.key}`}>{t.label}</div>
                <div className="theme-info">
                  <div className="theme-name">{t.key}</div>
                  <div className="theme-cmd">{t.cmd}</div>
                  <div style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "0.78rem" }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* TECH STACK */}
      <section className="section" id="tech">
        <div className="container">
          <div className="section-label">Under the Hood</div>
          <h2 className="section-title">
            Zero Dependencies,<br />
            <span className="highlight">Pure Browser APIs</span>
          </h2>
          <p className="section-desc">
            Every feature is implemented using native browser APIs — no React, no bundler, no cloud service. Just a lean, fast Chrome extension.
          </p>
          <table className="tech-table">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Technology</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Extension Platform", <><code>Manifest V3</code> Chrome Extension</>],
                ["Background", <><code>Service Worker</code> (background.js)</>],
                ["Content Scripts", <>Vanilla <code>JavaScript</code> — ES6+, IIFEs, strict mode</>],
                ["Panel UI", <><code>Shadow DOM</code> + inline CSS-in-JS</>],
                ["NLP / Parsing", <>Custom <code>regex rule-chain</code> parser — no external library</>],
                ["Animations", <><code>@keyframes</code> injected at runtime</>],
                ["Persistence", <><code>chrome.storage.local</code> — macros, rules, panel state</>],
                ["DOM Traversal", <>Native <code>TreeWalker</code> + <code>MutationObserver</code></>],
              ].map(([layer, tech], i) => (
                <tr key={i}>
                  <td>{layer as string}</td>
                  <td>{tech as React.ReactNode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="divider" />

      {/* PRIVACY */}
      <section className="section" id="privacy" style={{ background: "rgba(34,197,94,0.02)" }}>
        <div className="container">
          <div className="section-label">Privacy First</div>
          <h2 className="section-title">
            <span className="highlight-green">100% Local.</span><br />
            Zero Tracking. Ever.
          </h2>
          <p className="section-desc">
            OverlayBox was built with privacy as a hard constraint, not an afterthought.
          </p>

          <div className="privacy-grid">
            {[
              { icon: "🌐", title: "100% Local Execution", desc: "Runs entirely in your browser. Zero network requests. No cloud, no API, no server." },
              { icon: "🚫", title: "No Data Collection", desc: "Nothing is logged, tracked, or sent anywhere. Not your browsing, not your commands." },
              { icon: "⌨️", title: "No Keylogging", desc: "Only reads input you type into the OverlayBox panel itself. Cannot access any other input." },
              { icon: "🔐", title: "No Form Access", desc: "Cannot read passwords, form inputs, or any private page data." },
              { icon: "🎨", title: "Cosmetic Only", desc: "Only modifies CSS/visual presentation. Never touches page JavaScript logic or data." },
              { icon: "↩️", title: "Fully Reversible", desc: "Reset undoes every single change without a page reload. Perfect surgical rollback." },
              { icon: "📖", title: "Open Source", desc: "Every line of code is readable in the extension folder. No hidden behaviour." },
              { icon: "💾", title: "Local Storage Only", desc: "`chrome.storage.local` stores only: macros, site rules, panel position/size/state — all on-device." },
            ].map((item) => (
              <div className="privacy-item" key={item.title}>
                <span className="privacy-icon">{item.icon}</span>
                <div>
                  <div className="privacy-title">{item.title}</div>
                  <div className="privacy-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* INSTALL */}
      <section className="section" id="install">
        <div className="container">
          <div className="section-label">Get Started</div>
          <h2 className="section-title">
            Install in<br />
            <span className="highlight">Under a Minute</span>
          </h2>
          <p className="section-desc">
            No Chrome Web Store needed. Load it directly as an unpacked extension in developer mode.
          </p>

          <div className="install-steps">
            {[
              {
                num: "1",
                title: "Download the Extension",
                desc: <>Clone or download the repository from GitHub. The extension folder is <code>overlaybox/</code>.</>,
              },
              {
                num: "2",
                title: "Open Chrome Extensions",
                desc: <>Navigate to <code>chrome://extensions</code> in your browser address bar.</>,
              },
              {
                num: "3",
                title: "Enable Developer Mode",
                desc: "Toggle the Developer Mode switch in the top-right corner of the Extensions page.",
              },
              {
                num: "4",
                title: "Load Unpacked",
                desc: <>Click <strong>Load unpacked</strong> and select the <code>overlaybox/</code> folder from the download.</>,
              },
              {
                num: "5",
                title: "Done — Visit Any Website",
                desc: "The OverlayBox icon appears in the toolbar. Navigate to any site and the panel loads automatically in the bottom-right corner.",
              },
            ].map((step) => (
              <div className="install-step" key={step.num}>
                <div className="step-num">{step.num}</div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", padding: "16px 20px", background: "rgba(108,99,255,0.08)", borderRadius: "10px", border: "1px solid rgba(108,99,255,0.2)", maxWidth: "680px" }}>
            <strong>💡 Tip:</strong>{" "}
            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              To use OverlayBox on <code style={{ color: "var(--accent)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.82rem" }}>file://</code> URLs, go to the extension detail page in Chrome and enable <strong>&quot;Allow access to file URLs&quot;</strong>.
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <div className="cta-glow" />
          <h2 className="cta-title">
            Ready to Reshape<br />
            <span className="gradient-text">Every Website?</span>
          </h2>
          <p className="cta-desc">
            Download OverlayBox and start transforming the web with plain English — no DevTools, no code, no limits.
          </p>
          <div className="hero-cta-group">
            <a
              href="https://github.com/search?q=overlaybox+chrome+extension&type=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "1.05rem", padding: "16px 40px" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Get OverlayBox Free
            </a>
            <a href="#features" className="btn-secondary">
              See All Features
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>
            <strong>OverlayBox</strong> — A floating, natural-language DOM manipulation panel for any webpage.{" "}
            <a href="https://github.com/search?q=overlaybox+chrome+extension&type=repositories" target="_blank" rel="noopener noreferrer">View on GitHub</a>.
          </p>
          <p style={{ marginTop: "8px" }}>
            Built with Manifest V3 · No network requests · 100% local · Open source
          </p>
        </div>
      </footer>
    </>
  );
}
