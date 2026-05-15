import { useEffect } from "react";

const GLOBAL_CSS = `
  :root {
    /* ── ELYASSWEBWORKS CYBER AQUA THEME ── */

    /* Background */
    --ew-bg:        #05070A;
    --ew-surface:   #0A111C;
    --ew-surface-2: #0D1726;

    /* Borders */
    --ew-border:    rgba(255,255,255,0.06);
    --ew-border-2:  rgba(255,255,255,0.10);

    /* Text */
    --ew-text:      #FFFFFF;
    --ew-muted:     rgba(255,255,255,0.62);

    /* ── MAIN CYBER AQUA COLOR ── */
    --ew-accent:    #00FEFB;
    --ew-accent-2:  #00C2FF;

    /* Glow */
    --ew-accent-glow: rgba(0, 254, 251, 0.22);
    --ew-accent-strong-glow: rgba(0, 254, 251, 0.35);

    /* Overlay */
    --ew-overlay:   rgba(0, 0, 0, 0.5);

    /* Divider */
    --ew-rule:      rgba(255,255,255,0.05);

    /* Fonts */
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body:    'DM Sans', system-ui, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--ew-bg);
    color: var(--ew-text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--ew-accent-glow);
    color: #000;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: var(--ew-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.12);
    border-radius: 10px;
  }

  /* ── Typography ── */
  .ew-display {
    font-family: var(--font-display);
    font-weight: 300;
    letter-spacing: -0.02em;
  }

  .ew-label {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ew-muted);
  }

  /* ── Section ── */
  .ew-section {
    padding: 110px 0;
  }

  @media (max-width: 768px) {
    .ew-section {
      padding: 75px 0;
    }
  }

  /* ── Card ── */
  .ew-card {
    background: linear-gradient(180deg, var(--ew-surface), var(--ew-surface-2));
    border: 1px solid var(--ew-border);
    border-radius: 14px;
    padding: 36px 32px;
    transition: all 0.25s ease;
  }

  .ew-card:hover {
    transform: translateY(-4px);
    border-color: var(--ew-accent);
    box-shadow: 0 18px 60px rgba(0, 254, 251, 0.18);
  }

  /* ── Button Primary ── */
  .ew-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 28px;
    background: linear-gradient(135deg, var(--ew-accent), var(--ew-accent-2));
    color: #000;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;
  }

  .ew-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 40px var(--ew-accent-glow);
  }

  /* ── Ghost Button ── */
  .ew-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    background: transparent;
    color: var(--ew-accent);
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    border: 1px solid var(--ew-accent);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .ew-btn-ghost:hover {
    background: var(--ew-accent-glow);
    color: #000;
  }

  /* ── Step item ── */
  .ew-step {
    display: flex;
    gap: 22px;
    align-items: flex-start;
  }

  .ew-step-num {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--ew-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 15px;
    color: var(--ew-accent);
    background: var(--ew-surface);
    transition: all 0.2s ease;
  }

  .ew-step:hover .ew-step-num {
    border-color: var(--ew-accent);
    background: var(--ew-accent-glow);
  }

  /* ── Fade animation ── */
  .ew-fade {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .ew-fade.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Divider ── */
  .ew-rule {
    border: none;
    border-top: 1px solid var(--ew-rule);
  }
`;

export function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById("ew-global")) return;

    const style = document.createElement("style");
    style.id = "ew-global";
    style.textContent = GLOBAL_CSS;

    document.head.appendChild(style);
  }, []);

  return null;
}

export default GlobalStyles;