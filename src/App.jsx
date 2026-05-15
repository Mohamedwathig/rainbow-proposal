/**
 * Rainbow Group — Website Proposal
 * Designed & developed by Elyass Webworks
 *
 * Two-file React component (drop into a Vite or CRA project).
 * Uses only Tailwind CSS utility classes — no extra dependencies needed
 * beyond react, react-dom, and tailwindcss.
 *
 * Fonts loaded via <link> injected on mount:
 *   Display : "Cormorant Garamond" (editorial, refined)
 *   Body    : "DM Sans" (modern, readable)
 */

import { useEffect, useState } from "react";

/* ─── inject Google Fonts once ─────────────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    if (document.getElementById("ew-fonts")) return;
    const link = document.createElement("link");
    link.id = "ew-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ─── scroll-reveal hook ─────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ew-fade");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── useMediaQuery hook for responsive design ───────────────────────────────── */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  
  return matches;
}

/* ─── Container ─────────────────────────────────────────────────────────────── */
const Container = ({ children, style = {} }) => (
  <div
    style={{
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─── Section Label ─────────────────────────────────────────────────────────── */
const Label = ({ children }) => (
  <span className="ew-label" style={{ display: "block", marginBottom: 16 }}>
    {children}
  </span>
);

/* ─── Arrow icon ──────────────────────────────────────────────────────────────── */
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   1. NAVBAR (responsive, sticky, mobile-friendly)
══════════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    ["#about", "About"],
    ["#services", "Services"],
    ["#pricing", "Pricing"],
    ["#contact", "Contact"],
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled
            ? "rgba(7, 10, 15, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
          transition: "all 0.35s ease",
        }}
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: isMobile ? 64 : 70,
          }}
        >
          {/* LOGO */}
          <a
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <img
              src="/logo2.png"
              alt="Elyass Webworks"
              style={{
                height: isMobile ? 80 : 110,
                width: "auto",
                filter: "drop-shadow(0 0 12px rgba(0,254,251,0.45))",
              }}
            />
          </a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav
              style={{
                display: "flex",
                gap: 32,
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--ew-muted)",
              }}
            >
              {navLinks.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "var(--ew-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--ew-muted)")
                  }
                >
                  {label}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop CTA Button */}
          {!isMobile && (
            <a href="#contact" className="ew-btn" style={{ fontSize: 12 }}>
              Start Project <Arrow />
            </a>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 8,
                zIndex: 101,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ew-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          )}
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(5, 7, 10, 0.98)",
            backdropFilter: "blur(20px)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            animation: "fadeIn 0.3s ease",
          }}
        >
          {navLinks.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: "var(--ew-text)",
                textDecoration: "none",
                fontSize: 24,
                fontFamily: "var(--font-display)",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--ew-accent)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--ew-text)")
              }
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="ew-btn"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: 14, padding: "12px 32px" }}
          >
            Start Project <Arrow />
          </a>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   2. HERO (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  return (
    <section
      id="hero"
      className="ew-section"
      style={{
        paddingTop: isMobile ? 120 : 160,
        paddingBottom: isMobile ? 80 : 120,
        borderBottom: "1px solid var(--ew-rule)",
        background: "var(--ew-bg)",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: isMobile ? 32 : 52,
            flexWrap: "wrap",
          }}
        >
          <span className="ew-label">Proposal Document</span>
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "var(--ew-rule)",
              display: "inline-block",
            }}
          />
          <span className="ew-label">2026</span>
        </div>

        <h1
          className="ew-display"
          style={{
            fontSize: isMobile ? "42px" : "clamp(52px, 7vw, 88px)",
            maxWidth: 780,
            marginBottom: isMobile ? 24 : 32,
            color: "var(--ew-text)",
          }}
        >
          Rainbow Group
          <br />
          <em style={{ color: "var(--ew-accent)", fontStyle: "italic" }}>
            Website Proposal
          </em>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? 18 : 20,
            fontWeight: 300,
            color: "var(--ew-muted)",
            marginBottom: 12,
            letterSpacing: "-0.01em",
          }}
        >
          Crafted by Elyass Webworks
        </p>

        <p
          style={{
            fontSize: 15,
            color: "var(--ew-muted)",
            maxWidth: 520,
            lineHeight: 1.75,
            marginBottom: 48,
          }}
        >
          A tailored proposal to establish Rainbow Group's modern digital
          presence — designed for clarity, built for performance, and delivered
          with precision.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#pricing" className="ew-btn">
            View Pricing <Arrow />
          </a>
          <a href="#services" className="ew-btn-ghost">
            Explore Scope
          </a>
        </div>

        <div
          style={{
            marginTop: isMobile ? 48 : 80,
            paddingTop: isMobile ? 24 : 40,
            borderTop: "1px solid var(--ew-rule)",
            display: "flex",
            gap: isMobile ? 24 : 48,
            flexWrap: "wrap",
            justifyContent: isMobile ? "space-between" : "flex-start",
          }}
        >
          {[
            ["Client", "Rainbow Group"],
            ["Agency", "Elyass Webworks"],
            ["Delivery", "10–14 Business Days"],
            ["Revision Rounds", "3 Included"],
          ].map(([k, v]) => (
            <div key={k} style={{ flex: isMobile ? "0 1 auto" : "none" }}>
              <p className="ew-label" style={{ marginBottom: 4 }}>
                {k}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? 14 : 16,
                  fontWeight: 500,
                  color: "var(--ew-text)",
                }}
              >
                {v}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   3. ABOUT (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
function About() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  return (
    <section
      id="about"
      className="ew-section"
      style={{ borderBottom: "1px solid var(--ew-rule)" }}
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? 40 : 80,
            alignItems: "start",
          }}
        >
          <div className="ew-fade">
            <Label>About the Client</Label>
            <h2
              className="ew-display"
              style={{ 
                fontSize: isMobile ? 32 : 38, 
                color: "var(--ew-text)", 
                lineHeight: 1.15 
              }}
            >
              Rainbow
              <br />
              Group
            </h2>
          </div>

          <div className="ew-fade" style={{ transitionDelay: "0.1s" }}>
            <p
              style={{
                fontSize: isMobile ? 16 : 17,
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "var(--ew-text)",
                marginBottom: 24,
                letterSpacing: "-0.01em",
              }}
            >
              Rainbow Group is a professionally operated business with an
              established market presence and a growing customer base. Their
              reputation for reliability and quality positions them as a trusted
              name in their industry.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ew-muted)",
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              The objective of this engagement is to translate that offline
              credibility into a polished, high-performing digital presence —
              one that reinforces trust, communicates value clearly, and converts
              visitors into long-term clients.
            </p>
            <p style={{ fontSize: 15, color: "var(--ew-muted)", lineHeight: 1.8 }}>
              A well-designed website is no longer optional; it is the
              cornerstone of every modern business's credibility. This proposal
              outlines exactly how Elyass Webworks will deliver that.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   4. SERVICES (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    num: "01",
    title: "Website Design (UI/UX)",
    desc: "Custom interface design tailored to Rainbow Group's brand identity. Every screen is crafted with clarity, hierarchy, and conversion in mind.",
  },
 {
  num: "02",
  title: "WordPress Development",
  desc: "Built on WordPress with a custom, performance-focused setup. The result is a fast, easy-to-manage website that is scalable and simple for your team to update.",
},
  {
    num: "03",
    title: "Mobile Responsive Design",
    desc: "Pixel-perfect responsiveness across all screen sizes — desktop, tablet, and mobile — with a mobile-first development approach.",
  },
  {
    num: "04",
    title: "SEO Setup",
    desc: "Semantic HTML structure, meta tags, Open Graph, sitemap, and on-page optimisation to ensure strong search engine visibility from day one.",
  },
  {
    num: "05",
    title: "Performance Optimisation",
    desc: "Code splitting, lazy loading, image compression, and Lighthouse-tested performance to achieve fast load times and a smooth experience.",
  },
{
  num: "06",
  title: "Deployment & Launch Support",
  desc: "Full deployment walkthrough, DNS configuration, and launch assistance to ensure your website goes live smoothly on your chosen hosting platform.",
},
];

function Services() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section
      id="services"
      className="ew-section"
      style={{ borderBottom: "1px solid var(--ew-rule)" }}
    >
      <Container>
        <div
          className="ew-fade"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: 48,
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <Label>Project Scope</Label>
            <h2
              className="ew-display"
              style={{ fontSize: isMobile ? 32 : 42, color: "var(--ew-text)" }}
            >
              What's Included
            </h2>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "var(--ew-muted)",
              maxWidth: isMobile ? "100%" : 360,
              lineHeight: 1.75,
            }}
          >
           Please note that hosting and domain costs are separate and not included.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className="ew-card ew-fade"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 400,
                  color: "var(--ew-accent)",
                  display: "block",
                  marginBottom: 20,
                  letterSpacing: "0.06em",
                }}
              >
                {s.num}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--ew-text)",
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 13.5,
                  color: "var(--ew-muted)",
                  lineHeight: 1.75,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   5. TIMELINE (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
const TIMELINE = [
  {
    phase: "Phase 1",
    title: "Planning & Structure",
    desc: "Sitemap, content architecture, and project brief review. We define exactly what needs to be built before a single line is written.",
    days: "Day 1–2",
  },
  {
    phase: "Phase 2",
    title: "UI Design",
    desc: "High-fidelity mockups in Figma. You review and approve the design before development begins — no surprises.",
    days: "Day 2–5",
  },
  {
    phase: "Phase 3",
    title: "Development",
    desc: "React build, component architecture, and integration. Clean, commented code built to last.",
    days: "Day 5–10",
  },
  {
    phase: "Phase 4",
    title: "Revisions",
    desc: "Up to three rounds of revisions to ensure every detail aligns with your vision and brand.",
    days: "Day 10–12",
  },
  {
    phase: "Phase 5",
    title: "Launch",
    desc: "Final testing, deployment, DNS configuration, and handoff. Your site goes live.",
    days: "Day 12–14",
  },
];

function Timeline() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section
      id="timeline"
      className="ew-section"
      style={{ borderBottom: "1px solid var(--ew-rule)" }}
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
            gap: isMobile ? 48 : 80,
            alignItems: "start",
          }}
        >
          <div className="ew-fade" style={isMobile ? {} : { position: "sticky", top: 100 }}>
            <Label>Delivery Plan</Label>
            <h2
              className="ew-display"
              style={{ fontSize: isMobile ? 32 : 38, color: "var(--ew-text)", marginBottom: 20 }}
            >
              Timeline
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--ew-muted)",
                lineHeight: 1.75,
                marginBottom: 24,
              }}
            >
              Estimated completion: <strong style={{ color: "var(--ew-text)" }}>10–14 business days</strong>,
              depending on feedback turnaround.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                background: "rgba(0, 254, 251, 0.1)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--ew-accent)",
                fontWeight: 500,
              }}
            >
              5 clear phases
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {TIMELINE.map((t, i) => (
              <div
                key={t.phase}
                className="ew-fade"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  borderBottom: i < TIMELINE.length - 1 ? "1px solid var(--ew-rule)" : "none",
                  padding: isMobile ? "24px 0" : "32px 0",
                }}
              >
                <div className="ew-step">
                  <div className="ew-step-num">{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 8,
                        flexDirection: isMobile ? "column" : "row",
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <div>
                        <span className="ew-label" style={{ marginBottom: 4 }}>
                          {t.phase}
                        </span>
                        <h3
                          style={{
                            fontSize: isMobile ? 15 : 16,
                            fontWeight: 500,
                            color: "var(--ew-text)",
                          }}
                        >
                          {t.title}
                        </h3>
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--ew-muted)",
                          fontFamily: "var(--font-body)",
                          whiteSpace: isMobile ? "normal" : "nowrap",
                        }}
                      >
                        {t.days}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: "var(--ew-muted)", lineHeight: 1.75 }}>
                      {t.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   6. PRICING (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
function Pricing() {
  const PRICE = "1400";
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  return (
    <section
      id="pricing"
      className="ew-section"
      style={{ borderBottom: "1px solid var(--ew-rule)" }}
    >
      <Container>
        <div className="ew-fade" style={{ marginBottom: 40 }}>
          <Label>Investment</Label>
          <h2
            className="ew-display"
            style={{ fontSize: isMobile ? 32 : 42, color: "var(--ew-text)" }}
          >
            Pricing
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* Main card */}
          <div
            className="ew-fade"
            style={{
              background: "var(--ew-surface)",
              border: "1px solid var(--ew-border)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: isMobile ? "24px" : "36px 40px",
                borderBottom: "1px solid var(--ew-rule)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 16,
                background: "rgba(0, 254, 251, 0.03)",
              }}
            >
              <div>
                <Label>Full Project</Label>
                <h3
                  className="ew-display"
                  style={{ 
                    fontSize: isMobile ? 40 : 52, 
                    color: "var(--ew-accent)", 
                    lineHeight: 1 
                  }}
                >
                  AUD ${PRICE}
                </h3>
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--ew-accent)",
                  background: "rgba(0, 254, 251, 0.1)",
                  border: "1px solid rgba(0, 254, 251, 0.2)",
                  borderRadius: 8,
                  padding: "6px 14px",
                }}
              >
                All-inclusive
              </span>
            </div>

            <div style={{ padding: isMobile ? "24px" : "36px 40px" }}>
              <p className="ew-label" style={{ marginBottom: 20 }}>
                Everything included
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "14px 32px",
                }}
              >
                {SERVICES.map((s) => (
                  <li
                    key={s.num}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 13.5,
                      color: "var(--ew-text)",
                    }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "rgba(0, 254, 251, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="var(--ew-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment terms card */}
          <div className="ew-fade" style={{ transitionDelay: "0.1s", display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "var(--ew-surface)",
                border: "1px solid var(--ew-border)",
                borderRadius: 12,
                padding: isMobile ? "24px" : "32px 28px",
              }}
            >
              <Label>Payment Terms</Label>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Upfront deposit", pct: "50%", note: "To begin work" },
                  { label: "On completion", pct: "50%", note: "Before handoff" },
                ].map((p) => (
                  <div
                    key={p.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: 8,
                      border: "1px solid var(--ew-border)",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ew-text)", marginBottom: 2 }}>
                        {p.label}
                      </p>
                      <p style={{ fontSize: 11.5, color: "var(--ew-muted)" }}>{p.note}</p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 22,
                        fontWeight: 500,
                        color: "var(--ew-accent)",
                      }}
                    >
                      {p.pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "rgba(0, 254, 251, 0.03)",
                border: "1px solid var(--ew-border)",
                borderRadius: 12,
                padding: "20px 24px",
              }}
            >
              <p style={{ fontSize: 12.5, color: "var(--ew-muted)", lineHeight: 1.7 }}>
                ✦ Final pricing may adjust based on project scope. Any changes will be discussed and agreed upon before work proceeds.
              </p>
            </div>

            <a href="#contact" className="ew-btn" style={{ textAlign: "center", justifyContent: "center" }}>
              Accept Proposal <Arrow />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   7. HOSTING (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
const HOSTING_ITEMS = [
  { title: "SSL Security", desc: "HTTPS certificate included. Full encryption from day one, trusted by browsers and search engines alike." },
  { title: "Performance Optimisation", desc: "Fast DNS propagation, CDN-ready setup, and server configuration for optimal load speed globally." },
  { title: "Email Hosting Options", desc: "Professional email addresses (@rainbowgroup.com.au) available directly through your existing registrar." },
  { title: "Reliability", desc: "Melbourne IT offers 99.9% uptime SLA, Australian-based support, and a trusted track record for local businesses." },
];

function Hosting() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section
      id="hosting"
      className="ew-section"
      style={{ borderBottom: "1px solid var(--ew-rule)" }}
    >
      <Container>
        <div
          className="ew-fade"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: 40,
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <Label>Recommended Hosting</Label>
            <h2
              className="ew-display"
              style={{ fontSize: isMobile ? 32 : 42, color: "var(--ew-text)" }}
            >
              Hosted on Melbourne IT
            </h2>
          </div>
          
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {HOSTING_ITEMS.map((h, i) => (
            <div
              key={h.title}
              className="ew-card ew-fade"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "rgba(0, 254, 251, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="var(--ew-accent)" strokeWidth="1.2" />
                  <path d="M5.5 8L7.5 10L10.5 6" stroke="var(--ew-accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: "var(--ew-text)", marginBottom: 10 }}>
                {h.title}
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--ew-muted)", lineHeight: 1.75 }}>
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   8. PROCESS (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
const PROCESS = [
  {
    step: "01",
    title: "Client Sends Assets",
    desc: "You share all content — logo, copy, images, brand guidelines.",
  },
  {
    step: "02",
    title: "Design Phase",
    desc: "We translate your assets into a polished UI. You receive Figma mockups for review before development begins.",
  },
  {
    step: "03",
    title: "Development Phase",
    desc: "Built on WordPress with a custom front-end approach, ensuring flexibility, performance, and a tailored user experience.",
  },
  {
    step: "04",
    title: "Testing",
    desc: "Cross-browser testing, mobile QA, performance checks, and a final review before presenting the staging site.",
  },
  {
    step: "05",
    title: "Delivery & Launch",
    desc: "We deploy to your hosting, configure DNS, and hand over all files and access credentials. Done.",
  },
];

function Process() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section
      id="process"
      className="ew-section"
      style={{ borderBottom: "1px solid var(--ew-rule)" }}
    >
      <Container>
        <div className="ew-fade" style={{ marginBottom: 40 }}>
          <Label>How We Work</Label>
          <h2
            className="ew-display"
            style={{ fontSize: isMobile ? 32 : 42, color: "var(--ew-text)" }}
          >
            Our Process
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(196px, 1fr))",
            gap: isMobile ? 16 : 2,
          }}
        >
          {PROCESS.map((p, i) => (
            <div
              key={p.step}
              className="ew-fade"
              style={{
                transitionDelay: `${i * 0.08}s`,
                padding: isMobile ? "28px 20px" : "36px 28px",
                background: "linear-gradient(135deg, var(--ew-surface), var(--ew-surface-2))",
                border: "1px solid var(--ew-border)",
                borderRadius: 10,
                transition: "all 0.25s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--ew-accent)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--ew-border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? 24 : 28,
                  fontWeight: 300,
                  color: "var(--ew-accent)",
                  display: "block",
                  marginBottom: 20,
                  lineHeight: 1,
                }}
              >
                {p.step}
              </span>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--ew-text)",
                  marginBottom: 10,
                  lineHeight: 1.4,
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--ew-muted)", lineHeight: 1.75 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   9. CTA (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
function CTA() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <section
      id="contact"
      className="ew-section"
      style={{
        borderBottom: "1px solid var(--ew-rule)",
        background: "linear-gradient(135deg, var(--ew-surface), var(--ew-surface-2))",
      }}
    >
      <Container>
        <div
          className="ew-fade"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          <Label>Next Step</Label>
          <h2
            className="ew-display"
            style={{
              fontSize: isMobile ? "32px" : "clamp(40px, 5vw, 62px)",
              color: "var(--ew-text)",
              marginTop: 16,
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            Ready to bring Rainbow Group{" "}
            <em style={{ color: "var(--ew-accent)", fontStyle: "italic" }}>
              online?
            </em>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--ew-muted)",
              lineHeight: 1.8,
              marginBottom: 40,
              maxWidth: 440,
            }}
          >
            Accept this proposal and we'll kick off with a brief onboarding
            call, followed by your first design mockup within 48 hours.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
           <a
  href={`mailto:hello@elyasswebworks.com?subject=${encodeURIComponent(
    "Rainbow Group Proposal — Project Acceptance"
  )}&body=${encodeURIComponent(`Hi Elyass,

I’d like to confirm that I accept the proposal for Rainbow Group.

Project Details:
- Company Name: Rainbow Group
- Contact Name:
- Preferred Start Date:
- Notes (if any):

Please let me know the next steps.

Best regards,`)}
  `}
  className="ew-btn"
>
  Accept & Start Project
</a>
          <a
  href="https://www.instagram.com/elyasswebworks/"
  target="_blank"
  rel="noopener noreferrer"
  className="ew-btn-ghost"
  style={{ padding: isMobile ? "12px 28px" : "14px 36px", fontSize: 14 }}
>
  Message on Instagram
</a>
          </div>

          <p
            style={{
              marginTop: 40,
              fontSize: 12,
              color: "var(--ew-muted)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.5 4.5H11L8.25 6.75L9.5 10.5L6 8.25L2.5 10.5L3.75 6.75L1 4.5H4.5L6 1Z" fill="var(--ew-accent)" />
            </svg>
            Trusted boutique agency · Dedicated point of contact · All work done in-house
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   10. FOOTER (Responsive)
══════════════════════════════════════════════════════════════════════════════ */
function Footer() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <footer
      style={{
        padding: "40px 0",
        background: "var(--ew-bg)",
        borderTop: "1px solid var(--ew-rule)",
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          textAlign: isMobile ? "center" : "left",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 500,
            color: "var(--ew-text)",
            letterSpacing: "-0.01em",
          }}
        >
          Elyass Webworks<span style={{ color: "var(--ew-accent)" }}>.</span>
        </span>

        <p style={{ fontSize: 12, color: "var(--ew-muted)" }}>
          Prepared exclusively for Rainbow Group · 2025
        </p>

        <p style={{ fontSize: 12, color: "var(--ew-muted)" }}>
  <a
    href="https://www.instagram.com/elyasswebworks/"
    target="_blank"
    rel="noreferrer"
    style={{
      color: "inherit",
      textDecoration: "none",
    }}
  >
    @elyasswebworks
  </a>
</p>
      </Container>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  useFonts();
  useReveal();

  // Add animation keyframes
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Timeline />
        <Pricing />
        <Hosting />
        <Process />
        <CTA />
      </main>
      <Footer />
    </>
  );
}