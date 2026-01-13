import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

import heroProcess from "../assets/hero-process.png";

/** ✅ Icônes SVG (100% custom) */
const Icon = ({ name, className = "ui-ic" }) => {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    // ===== Features =====
    case "route":
      return (
        <svg {...common}>
          <path
            d="M7 4h10M7 4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h7a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 4v0M7 20v0"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "quiz":
      return (
        <svg {...common}>
          <path
            d="M7 4h10a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 9h8M8 13h5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16.5 13.2l1 1 2-2.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "dashboard":
      return (
        <svg {...common}>
          <path
            d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 16v-4M12 16V8M17 16v-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "globe":
      return (
        <svg {...common}>
          <path
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 12h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 3c2.7 2.9 3.9 6.3 3.9 9s-1.2 6.1-3.9 9c-2.7-2.9-3.9-6.3-3.9-9S9.3 5.9 12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    // ===== About chips =====
    case "bolt":
      return (
        <svg {...common}>
          <path
            d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "target":
      return (
        <svg {...common}>
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 8V4M12 20v-4M16 12h4M4 12h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "brain":
      return (
        <svg {...common}>
          <path
            d="M9.5 4.5a3 3 0 0 0-3 3v.7a2.8 2.8 0 0 0 0 5.6V16a3 3 0 0 0 3 3h1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14.5 4.5a3 3 0 0 1 3 3v.7a2.8 2.8 0 0 1 0 5.6V16a3 3 0 0 1-3 3h-1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 4.5V19.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      );

    case "file":
      return (
        <svg {...common}>
          <path
            d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M14 3v4h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 12h8M8 16h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path
            d="M9 12.5l2 2L15.5 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );

    // ===== About cards =====
    case "mission":
      return (
        <svg {...common}>
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 6v6l4 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.7"
          />
        </svg>
      );

    case "vision":
      return (
        <svg {...common}>
          <path
            d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7S2.5 12 2.5 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );

    case "ai":
      return (
        <svg {...common}>
          <path
            d="M8 8h8v8H8V8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 11h4M10 13h3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    // ===== Contact =====
    case "user":
      return (
        <svg {...common}>
          <path
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M4 21a8 8 0 0 1 16 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "mail":
      return (
        <svg {...common}>
          <path
            d="M4 6h16v12H4V6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M4 7l8 6 8-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "pin":
      return (
        <svg {...common}>
          <path
            d="M12 22s7-4.4 7-12a7 7 0 1 0-14 0c0 7.6 7 12 7 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M12 11a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );

    case "message":
      return (
        <svg {...common}>
          <path
            d="M4 5h16v12H7l-3 3V5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 9h8M8 12h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
};

export default function Home() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ états UX d'envoi
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // "ok" | "err" | null

  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (viewName) => {
    const map = {
      home: homeRef,
      features: featuresRef,
      about: aboutRef,
      contact: contactRef,
    };

    setActiveView(viewName);
    setIsMenuOpen(false);

    setTimeout(() => {
      const el = map[viewName]?.current;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  // ✅ EmailJS: on garde la variable title MAIS sans input (hidden)
  const sendEmail = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendStatus(null);

    try {
      await emailjs.sendForm(
        "service_ujo1szp",
        "template_bd7eb66",
        e.target,
        "xS1CzobjzPyRVmszt"
      );

      setSendStatus("ok");
      e.target.reset();
    } catch (err) {
      console.log("EmailJS error:", err);
      setSendStatus("err");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const sections = [
      { id: "home", ref: homeRef },
      { id: "features", ref: featuresRef },
      { id: "about", ref: aboutRef },
      { id: "contact", ref: contactRef },
    ];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0)
          )[0];

        if (visible?.target?.dataset?.section) {
          setActiveView(visible.target.dataset.section);
        }
      },
      { root: null, threshold: [0.25, 0.4, 0.55, 0.7] }
    );

    sections.forEach((s) => s.ref.current && obs.observe(s.ref.current));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="substancia-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');

        :root{
          --bg:#f6f8ff;
          --bg2:#eef3ff;
          --text:#0f172a;
          --muted:#64748b;
          --stroke:#e7ecff;
          --shadow: 0 18px 50px rgba(15,23,42,0.10);
          --shadow2: 0 10px 30px rgba(15,23,42,0.08);
          --brand:#1a73e8;
          --black:#0b0f19;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: auto; overflow-x: hidden; background: var(--bg); }

        .substancia-app {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: var(--text);
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* ✅ icônes */
        .ui-ic{ width: 28px; height: 28px; color: var(--brand); flex: 0 0 auto; }
        .ic-badge{
          width: 44px; height: 44px; border-radius: 16px;
          display:grid; place-items:center;
          background: linear-gradient(135deg, rgba(26,115,232,0.16), rgba(78,163,255,0.12));
          border: 1px solid rgba(26,115,232,0.16);
          flex: 0 0 auto;
        }

        /* ✅ icônes dans inputs */
        .input-group{ margin-bottom: 12px; position: relative; }
        .input-ic{
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          width: 18px; height: 18px;
          color: rgba(15,23,42,0.52);
          pointer-events: none;
        }
        .textarea-ic{ top: 18px; transform: none; }

        /* ===== Background ===== */
        .bg-wrap{
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(900px 520px at 15% 15%, rgba(26,115,232,0.16), transparent 60%),
            radial-gradient(900px 520px at 85% 10%, rgba(34,197,94,0.10), transparent 62%),
            radial-gradient(900px 520px at 70% 90%, rgba(26,115,232,0.10), transparent 62%),
            linear-gradient(180deg, var(--bg), var(--bg2));
        }
        .bg-dots{
          position:absolute; inset:0; opacity:0.45;
          background-image: radial-gradient(rgba(26,115,232,0.12) 1px, transparent 1px);
          background-size: 22px 22px;
          mask-image: radial-gradient(600px 380px at 28% 30%, #000 55%, transparent 75%);
        }

        /* ===== Top bar ===== */
        .topbar{
          position: sticky; top: 0; z-index: 3500; width: 100%;
          background: #0b2a4a; color: rgba(255,255,255,0.92);
          font-size: 12px; font-weight: 700; padding: 7px 5%;
          text-align: center;
        }

        /* ===== NAV ===== */
        .nav-studio {
          position: sticky; top: 30px; z-index: 3000;
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 5%;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(231,236,255,0.9);
        }

        .logo-box { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .logo-sq {
          width: 40px; height: 40px; display:grid; place-items:center;
          background: linear-gradient(135deg, #1a73e8, #4ea3ff);
          color: white; border-radius: 14px; font-weight: 900;
          box-shadow: 0 14px 30px rgba(26,115,232,0.22);
        }
        .logo-txt { font-size: 18px; font-weight: 900; color: #0f172a; }

        .nav-links-desktop {
          display: flex; gap: 6px; padding: 6px;
          border-radius: 999px; background: rgba(255,255,255,0.8);
          border: 1px solid var(--stroke);
        }
        .nav-links-desktop button {
          background: none; border: none;
          font-weight: 800; color: #334155;
          cursor: pointer; transition: 0.2s; font-size: 13px;
          padding: 10px 14px; border-radius: 999px;
        }
        .nav-links-desktop button:hover { background: #f2f6ff; }
        .nav-links-desktop button.active {
          color: #0f172a; background: #eaf2ff;
          border: 1px solid rgba(26,115,232,0.18);
        }

        .btn-cta {
          background: var(--brand); color: white; border: none;
          padding: 12px 18px; border-radius: 14px;
          font-weight: 900; cursor: pointer; transition: 0.25s;
          box-shadow: 0 16px 34px rgba(26,115,232,0.22);
          white-space: nowrap;
        }
        .btn-cta:disabled{ opacity: .75; cursor: not-allowed; box-shadow: none; }

        /* ✅ badge */
        .send-hint{
          margin-top: 10px;
          font-weight: 800;
          font-size: 13px;
          padding: 10px 12px;
          border-radius: 14px;
          border: 1px solid rgba(26,115,232,0.16);
          background: rgba(242,246,255,0.85);
          color: #0f172a;
        }
        .send-hint.ok{ border-color: rgba(34,197,94,0.26); background: rgba(34,197,94,0.10); }
        .send-hint.err{ border-color: rgba(239,68,68,0.26); background: rgba(239,68,68,0.10); }

        /* ===== BURGER ===== */
        .burger-menu {
          display: none; flex-direction: column; gap: 6px; cursor: pointer;
          z-index: 4000; padding: 10px; border-radius: 14px;
          border: 1px solid rgba(231,236,255,0.9);
          background: rgba(255,255,255,0.85);
        }
        .burger-bar { width: 24px; height: 2.5px; background: var(--brand); border-radius: 999px; transition: 0.3s; }
        .burger-menu.open .bar1 { transform: translateY(8px) rotate(45deg); }
        .burger-menu.open .bar2 { opacity: 0; }
        .burger-menu.open .bar3 { transform: translateY(-8px) rotate(-45deg); }

        .mobile-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
          background: rgba(246,248,255,0.86);
          backdrop-filter: blur(14px);
          z-index: 2500;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          transform: translateY(-110%);
          transition: transform 0.4s ease-in-out;
          padding: 20px;
        }
        .mobile-overlay.active { transform: translateY(0); }
        .mobile-overlay .mob-card{
          width: min(520px, 94%);
          background: rgba(255,255,255,0.92);
          border: 1px solid var(--stroke);
          border-radius: 22px;
          box-shadow: var(--shadow2);
          padding: 16px;
          display:flex; flex-direction:column; gap: 10px;
        }
        .mobile-overlay button {
          width: 100%;
          font-size: 18px; font-weight: 900;
          color: #0f172a;
          background: #f2f6ff;
          border: 1px solid rgba(26,115,232,0.14);
          border-radius: 16px;
          padding: 14px 16px;
          cursor: pointer;
        }
        .mobile-overlay button.login { background: var(--brand); color: #fff; border: none; }

        /* ===== CONTAINER ===== */
        .section-container {
          position: relative; z-index: 1;
          width: 92%; max-width: 1140px;
          margin: 0 auto; padding: 16px 0 60px;
          flex: 1;
        }
        .page-section{ scroll-margin-top: 110px; padding: 40px 0; }

        h1 {
          font-size: clamp(32px, 5.4vw, 66px);
          font-weight: 900; line-height: 1.03;
          margin-bottom: 18px; letter-spacing: -1px;
        }
        h2 {
          font-size: clamp(24px, 4.4vw, 44px);
          font-weight: 900; margin-bottom: 16px;
          text-align: center; color: #0f172a;
          letter-spacing: -0.6px;
        }

        .muted { color: var(--muted); font-size: 18px; line-height: 1.75; }

        /* ===== HERO ===== */
        .hero{
          display:grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 26px;
          align-items: center;
        }
        .hero-right{
          background: rgba(255,255,255,0.80);
          border: 1px solid var(--stroke);
          border-radius: 28px;
          box-shadow: var(--shadow);
          position: relative;
          overflow: hidden;
          min-height: 340px;
        }
        .hero-illus{
          position:absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          display:block;
          filter: none; transform: none;
          z-index: 1;
        }

        /* ===== FEATURES ===== */
        .f-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
          width: 100%;
          margin-top: 16px;
        }
        .f-card {
          padding: 22px;
          border-radius: 22px;
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,0.90);
          box-shadow: var(--shadow2);
          transition: 0.25s ease;
        }
        .f-card:hover { transform: translateY(-4px); border-color: rgba(26,115,232,0.28); }

        .f-head{ display:flex; align-items:center; gap: 12px; margin-bottom: 10px; }
        .f-ic{
          width: 46px; height: 46px;
          border-radius: 16px;
          display:grid; place-items:center;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(26,115,232,0.16);
          box-shadow: 0 10px 22px rgba(15,23,42,0.06);
          flex: 0 0 auto;
          color: var(--brand);
        }
        .f-card h3{ font-size: 18px; font-weight: 900; margin: 0; }
        .f-card p{ color: var(--muted); font-weight: 600; line-height: 1.7; margin-top: 6px; }

        /* ===== ABOUT ===== */
        .about-wrap{ text-align:center; }
        .about-lead{
          max-width: 820px;
          margin: 0 auto 16px;
          color: var(--muted);
          font-weight: 700;
          line-height: 1.85;
          font-size: 16px;
          padding: 0 6px;
        }

        .about-strip{
          width: min(980px, 100%);
          margin: 14px auto 0;
          padding: 16px;
          border-radius: 22px;
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,0.75);
          box-shadow: 0 12px 26px rgba(15,23,42,0.06);
          display:flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .about-chip{
          display:flex;
          align-items:center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(26,115,232,0.12);
          font-weight: 900;
          color:#0f172a;
          box-shadow: 0 10px 22px rgba(15,23,42,0.06);
          font-size: 13px;
          white-space: nowrap;
        }
        .about-chip .dot{
          width: 30px; height: 30px;
          border-radius: 999px;
          display:grid; place-items:center;
          background: #f2f6ff;
          border: 1px solid rgba(26,115,232,0.14);
        }
        .about-chip .dot .ui-ic{
          width: 18px; height: 18px;
          color: var(--brand);
          opacity: 1;
        }

        .about-cards{
          display:grid;
          grid-template-columns: repeat(3, minmax(220px, 1fr));
          gap: 14px;
          margin-top: 16px;
        }
        .about-card{
          border-radius: 22px;
          border: 1px solid var(--stroke);
          background: rgba(255,255,255,0.92);
          box-shadow: var(--shadow2);
          padding: 18px;
          text-align:left;
          display:flex;
          gap: 14px;
          align-items:flex-start;
          transition: 0.25s ease;
        }
        .about-card:hover{ transform: translateY(-4px); border-color: rgba(26,115,232,0.26); }
        .about-txt h3{ font-size: 16px; font-weight: 900; margin-bottom: 6px; }
        .about-txt p{ color: var(--muted); font-weight: 700; line-height: 1.6; font-size: 13px; margin: 0; }

        /* ===== CONTACT ===== */
        .contact-card {
          display: flex;
          border-radius: 26px;
          overflow: hidden;
          background: rgba(255,255,255,0.92);
          border: 1px solid var(--stroke);
          box-shadow: var(--shadow);
        }
        .c-info {
          background: var(--black);
          color: rgba(255,255,255,0.92);
          padding: 42px;
          width: 40%;
          position: relative;
        }
        .c-info::after{
          content:"";
          position:absolute; inset: 0;
          background: radial-gradient(520px 240px at 25% 30%, rgba(26,115,232,0.18), transparent 55%);
          pointer-events:none;
          opacity: 0.9;
        }
        .c-info > *{ position: relative; z-index: 1; }

        .c-form { padding: 42px; width: 60%; }

        /* ✅ INPUT STYLES */
        .input-group input,
        .input-group textarea {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(26,115,232,0.12);
          background: rgba(255,255,255,0.92);
          font-family: inherit;
          font-weight: 800;
          color: #0f172a;
          outline: none;
          padding: 14px 14px;
          transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease, background .18s ease;
        }
        .has-ic input, .has-ic textarea{ padding-left: 44px; }

        .input-group input::placeholder,
        .input-group textarea::placeholder{
          color: rgba(100,116,139,0.85);
          font-weight: 700;
        }

        .input-group input:hover,
        .input-group textarea:hover{
          border-color: rgba(26,115,232,0.24);
          background: rgba(255,255,255,0.98);
        }

        .input-group input:focus,
        .input-group textarea:focus{
          border-color: rgba(26,115,232,0.55);
          box-shadow: 0 0 0 4px rgba(26,115,232,0.14);
        }

        /* =========================
           ✅ UPDATED: TEXTAREA STYLE
           plus "premium" et lisible
        ========================== */
        .input-group textarea{
          line-height: 1.75;
          resize: vertical;
          min-height: 160px;
          padding-top: 16px;
          padding-bottom: 16px;

          /* petit contraste + douceur */
          background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(242,246,255,0.88));
          border-color: rgba(26,115,232,0.16);
        }

        /* scrollbar douce (Chrome/Edge) */
        .input-group textarea::-webkit-scrollbar{ width: 10px; }
        .input-group textarea::-webkit-scrollbar-track{
          background: rgba(231,236,255,0.7);
          border-radius: 999px;
        }
        .input-group textarea::-webkit-scrollbar-thumb{
          background: rgba(26,115,232,0.28);
          border-radius: 999px;
        }
        .input-group textarea::-webkit-scrollbar-thumb:hover{
          background: rgba(26,115,232,0.38);
        }

        .input-group:focus-within .input-ic{ color: rgba(26,115,232,0.85); }

        /* ===== Responsive ===== */
        @media (max-width: 980px){
          .hero{ grid-template-columns: 1fr; gap: 18px; }
          .hero-right{ min-height: 260px; width: 100%; }
          .muted{ font-size: 16px; }
          .about-cards{ grid-template-columns: repeat(2, minmax(220px, 1fr)); }
        }
        @media (max-width: 600px){
          .section-container{ width: 92%; padding: 12px 0 50px; }
          .page-section{ padding: 28px 0; }
          h1{ margin-bottom: 14px; letter-spacing: -0.6px; }
          .hero-right{ min-height: 220px; border-radius: 22px; }
          .about-cards{ grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .nav-links-desktop, .nav-studio .btn-cta { display: none; }
          .burger-menu { display: flex; }
          .contact-card { flex-direction: column; }
          .c-info, .c-form { width: 100%; padding: 28px; }
        }

        .footer-mini {
          position: relative; z-index: 1;
          text-align: center;
          padding: 28px 0;
          color: rgba(100,116,139,0.95);
          font-size: 13px;
          border-top: 1px solid rgba(231,236,255,0.9);
          margin-top: auto;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
        }
      `}</style>

      <div className="bg-wrap">
        <div className="bg-dots" />
      </div>

      <div className="topbar">
        Your learning journey begins here — now with an exclusive discount!
        Hurry, offer ends soon!
      </div>

      <nav className="nav-studio">
        <div className="logo-box" onClick={() => scrollToSection("home")}>
          <div className="logo-sq">IA</div>
          <span className="logo-txt">SubstancIA</span>
        </div>

        <div className="nav-links-desktop">
          <button
            className={activeView === "home" ? "active" : ""}
            onClick={() => scrollToSection("home")}
            type="button"
          >
            Accueil
          </button>
          <button
            className={activeView === "features" ? "active" : ""}
            onClick={() => scrollToSection("features")}
            type="button"
          >
            Fonctionnalités
          </button>
          <button
            className={activeView === "about" ? "active" : ""}
            onClick={() => scrollToSection("about")}
            type="button"
          >
            À propos
          </button>
          <button
            className={activeView === "contact" ? "active" : ""}
            onClick={() => scrollToSection("contact")}
            type="button"
          >
            Contact
          </button>
        </div>

        <button
          className="btn-cta"
          onClick={() => navigate("/login")}
          type="button"
        >
          Démarrer
        </button>

        <div
          className={`burger-menu ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          role="button"
          aria-label="Open menu"
        >
          <div className="burger-bar bar1"></div>
          <div className="burger-bar bar2"></div>
          <div className="burger-bar bar3"></div>
        </div>
      </nav>

      <div className={`mobile-overlay ${isMenuOpen ? "active" : ""}`}>
        <div className="mob-card">
          <button onClick={() => scrollToSection("home")} type="button">
            Accueil
          </button>
          <button onClick={() => scrollToSection("features")} type="button">
            Fonctionnalités
          </button>
          <button onClick={() => scrollToSection("about")} type="button">
            À propos
          </button>
          <button onClick={() => scrollToSection("contact")} type="button">
            Contact
          </button>
          <button
            className="login"
            onClick={() => navigate("/login")}
            type="button"
          >
            Connexion
          </button>
        </div>
      </div>

      <main className="section-container">
        <section
          ref={homeRef}
          data-section="home"
          className="page-section home"
        >
          <div className="hero">
            <div className="hero-left">
              <h1>
                Apprenez plus vite <br />
                avec <span style={{ color: "#1a73e8" }}>SubstancIA</span>
              </h1>

              <p className="muted" style={{ maxWidth: 650 }}>
                Une plateforme qui transforme n'importe quel document ou page
                web en un professeur particulier interactif.
              </p>

              <div className="hero-actions" />
            </div>

            <div className="hero-right">
              <img
                src={heroProcess}
                alt="Process illustration"
                className="hero-illus"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section
          ref={featuresRef}
          data-section="features"
          className="page-section"
        >
          <h2>Fonctionnalités</h2>
          <div className="f-grid">
            <div className="f-card">
              <div className="f-head">
                <div className="f-ic">
                  <Icon name="route" />
                </div>
                <h3>Parcours IA</h3>
              </div>
              <p>
                Un apprentissage qui s'adapte dynamiquement à votre niveau et à
                vos objectifs.
              </p>
            </div>

            <div className="f-card">
              <div className="f-head">
                <div className="f-ic">
                  <Icon name="quiz" />
                </div>
                <h3>Évaluations</h3>
              </div>
              <p>
                Des quiz générés instantanément pour valider vos connaissances
                sur n'importe quel sujet.
              </p>
            </div>

            <div className="f-card">
              <div className="f-head">
                <div className="f-ic">
                  <Icon name="dashboard" />
                </div>
                <h3>Analyse de Progrès</h3>
              </div>
              <p>
                Suivez votre évolution grâce à des tableaux de bord détaillés et
                intelligents.
              </p>
            </div>

            <div className="f-card">
              <div className="f-head">
                <div className="f-ic">
                  <Icon name="globe" />
                </div>
                <h3>Mode Web</h3>
              </div>
              <p>
                Analysez et apprenez directement depuis vos articles et sites
                favoris.
              </p>
            </div>
          </div>
        </section>

        <section ref={aboutRef} data-section="about" className="page-section">
          <div className="about-wrap">
            <h2>À propos de SubstancIA</h2>

            <p className="about-lead">
              Un assistant d’étude qui transforme vos contenus en apprentissage
              clair, rapide et personnalisé.
            </p>

            <div className="about-strip">
              <div className="about-chip">
                <span className="dot">
                  <Icon name="bolt" />
                </span>{" "}
                Rapide
              </div>
              <div className="about-chip">
                <span className="dot">
                  <Icon name="target" />
                </span>{" "}
                Personnalisé
              </div>
              <div className="about-chip">
                <span className="dot">
                  <Icon name="brain" />
                </span>{" "}
                Compréhension
              </div>
              <div className="about-chip">
                <span className="dot">
                  <Icon name="file" />
                </span>{" "}
                Documents
              </div>
              <div className="about-chip">
                <span className="dot">
                  <Icon name="globe" />
                </span>{" "}
                Web
              </div>
              <div className="about-chip">
                <span className="dot">
                  <Icon name="check" />
                </span>{" "}
                Quiz & suivi
              </div>
            </div>

            <div className="about-cards">
              <div className="about-card">
                <div className="ic-badge">
                  <Icon name="mission" />
                </div>
                <div className="about-txt">
                  <h3>Mission</h3>
                  <p>Rendre l’apprentissage accessible, partout.</p>
                </div>
              </div>

              <div className="about-card">
                <div className="ic-badge">
                  <Icon name="vision" />
                </div>
                <div className="about-txt">
                  <h3>Vision</h3>
                  <p>Une expérience d’étude simple et motivante.</p>
                </div>
              </div>

              <div className="about-card">
                <div className="ic-badge">
                  <Icon name="ai" />
                </div>
                <div className="about-txt">
                  <h3>IA</h3>
                  <p>Des réponses claires + exercices intelligents.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={contactRef}
          data-section="contact"
          className="page-section"
        >
          <h2>Contactez-nous</h2>
          <div className="contact-card">
            <div className="c-info">
              <h3 style={{ fontSize: 22, fontWeight: 900 }}>
                Parlons ensemble
              </h3>

              <p
                style={{
                  marginTop: 18,
                  opacity: 0.92,
                  lineHeight: 1.8,
                  fontWeight: 600,
                }}
              >
                Une question ? Un feedback ? Notre équipe est à votre écoute
                pour vous aider dans votre parcours.
              </p>

              <div style={{ marginTop: 34, fontWeight: 700, lineHeight: 1.9 }}>
                <p style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="mail" className="ui-ic" />
                  substancia@gmail.com
                </p>
                <p style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon name="pin" className="ui-ic" />
                  Mauritanie, Nouakchott
                </p>
              </div>
            </div>

            <div className="c-form">
              <form onSubmit={sendEmail}>
                {/* ✅ Template expects: from_name, reply_to, title, message, time */}
                <div className="input-group has-ic">
                  <Icon name="user" className="input-ic" />
                  <input
                    name="from_name"
                    type="text"
                    placeholder="Nom complet"
                    required
                  />
                </div>

                <div className="input-group has-ic">
                  <Icon name="mail" className="input-ic" />
                  <input
                    name="reply_to"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>

                {/* ✅ SUPPRIMÉ: l'input Sujet
                    ✅ MAIS on garde title pour EmailJS via hidden */}
                <input
                  type="hidden"
                  name="title"
                  value="Message depuis SubstancIA"
                />

                <div className="input-group has-ic">
                  <Icon name="message" className="input-ic textarea-ic" />
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Votre message..."
                    required
                  />
                </div>

                {/* ✅ hidden fields pour template */}
                <input
                  type="hidden"
                  name="time"
                  value={new Date().toLocaleString()}
                />
                <input type="hidden" name="name" value="Website Contact" />

                <button
                  type="submit"
                  className="btn-cta"
                  style={{ width: "100%", margin: 0, borderRadius: 16 }}
                  disabled={sending}
                >
                  {sending ? "Envoi..." : "Envoyer le message"}
                </button>

                {sendStatus === "ok" && (
                  <div className="send-hint ok">✅ Message envoyé. Merci !</div>
                )}
                {sendStatus === "err" && (
                  <div className="send-hint err">
                    ❌ Erreur d’envoi. Vérifie la console (F12) puis réessaie.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-mini">
        © 2026 SubstancIA — Éduquer, Inspirer, Réussir.
      </footer>
    </div>
  );
}
