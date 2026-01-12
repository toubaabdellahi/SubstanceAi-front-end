import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

import heroProcess from "../assets/hero-process.png";

export default function Home() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_0tgimp7",
        "template_4u68dwh",
        e.target,
        "sTPi3pmQjjxF89p9S"
      )
      .then(
        () => alert("Message envoyé !"),
        () => alert("Erreur, réessayez.")
      );
    e.target.reset();
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
          --card:#ffffff;
          --text:#0f172a;
          --muted:#64748b;
          --stroke:#e7ecff;
          --shadow: 0 18px 50px rgba(15,23,42,0.10);
          --shadow2: 0 10px 30px rgba(15,23,42,0.08);
          --brand:#1a73e8;
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

        /* ===== Background décor ===== */
        .bg-wrap{
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(900px 520px at 15% 15%, rgba(26,115,232,0.16), transparent 60%),
            radial-gradient(900px 520px at 85% 10%, rgba(34,197,94,0.10), transparent 62%),
            radial-gradient(900px 520px at 70% 90%, rgba(26,115,232,0.10), transparent 62%),
            linear-gradient(180deg, var(--bg), var(--bg2));
        }
        .bg-dots{
          position:absolute;
          inset:0;
          opacity:0.45;
          background-image: radial-gradient(rgba(26,115,232,0.12) 1px, transparent 1px);
          background-size: 22px 22px;
          mask-image: radial-gradient(600px 380px at 28% 30%, #000 55%, transparent 75%);
        }

        /* ===== Top bar ===== */
        .topbar{
          position: sticky;
          top: 0;
          z-index: 3500;
          width: 100%;
          background: #0b2a4a;
          color: rgba(255,255,255,0.92);
          font-size: 12px;
          font-weight: 700;
          padding: 7px 5%;
          text-align: center;
        }

        /* ===== NAV ===== */
        .nav-studio {
          position: sticky;
          top: 30px;
          z-index: 3000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 5%;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(231,236,255,0.9);
        }

        .logo-box { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .logo-sq {
          width: 40px; height: 40px;
          display:grid; place-items:center;
          background: linear-gradient(135deg, #1a73e8, #4ea3ff);
          color: white;
          border-radius: 14px;
          font-weight: 900;
          box-shadow: 0 14px 30px rgba(26,115,232,0.22);
        }
        .logo-txt { font-size: 18px; font-weight: 900; color: #0f172a; }

        .nav-links-desktop {
          display: flex;
          gap: 6px;
          padding: 6px;
          border-radius: 999px;
          background: rgba(255,255,255,0.8);
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
          color: #0f172a;
          background: #eaf2ff;
          border: 1px solid rgba(26,115,232,0.18);
        }

        .btn-cta {
          background: #1a73e8;
          color: white;
          border: none;
          padding: 12px 18px;
          border-radius: 14px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.25s;
          box-shadow: 0 16px 34px rgba(26,115,232,0.22);
          white-space: nowrap;
        }

        /* ===== BURGER ===== */
        .burger-menu {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          z-index: 4000;
          padding: 10px;
          border-radius: 14px;
          border: 1px solid rgba(231,236,255,0.9);
          background: rgba(255,255,255,0.85);
        }
        .burger-bar { width: 24px; height: 2.5px; background: #1a73e8; border-radius: 999px; transition: 0.3s; }
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
          display:flex;
          flex-direction:column;
          gap: 10px;
        }
        .mobile-overlay button {
          width: 100%;
          font-size: 18px;
          font-weight: 900;
          color: #0f172a;
          background: #f2f6ff;
          border: 1px solid rgba(26,115,232,0.14);
          border-radius: 16px;
          padding: 14px 16px;
          cursor: pointer;
        }
        .mobile-overlay button.login {
          background: #1a73e8;
          color: #fff;
          border: none;
        }

        /* ===== CONTAINER ===== */
        .section-container {
          position: relative;
          z-index: 1;
          width: 92%;
          max-width: 1140px;
          margin: 0 auto;
          padding: 16px 0 60px;
          flex: 1;
        }

        .page-section{
          scroll-margin-top: 110px;
          padding: 40px 0;
        }

        .page-section.home{
          padding-top: 18px;
          padding-bottom: 34px;
        }

        h1 {
          font-size: clamp(32px, 5.4vw, 66px);
          font-weight: 900;
          line-height: 1.03;
          margin-bottom: 18px;
          letter-spacing: -1px;
        }
        h2 {
          font-size: clamp(24px, 4.4vw, 44px);
          font-weight: 900;
          margin-bottom: 16px;
          text-align: center;
          color: #0f172a;
          letter-spacing: -0.6px;
        }

        .muted {
          color: var(--muted);
          font-size: 18px;
          line-height: 1.75;
        }

        /* ✅ HERO responsive */
        .hero{
          display:grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 26px;
          align-items: center;
        }

        /* ✅ Image responsive : hauteur adaptative */
        .hero-right{
          background: rgba(255,255,255,0.80);
          border: 1px solid var(--stroke);
          border-radius: 28px;
          box-shadow: var(--shadow);
          padding: 0;
          position: relative;
          overflow: hidden;
          min-height: 340px;     /* desktop */
        }

        .hero-illus{
          position:absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display:block;
          filter: none;
          transform: none;
          z-index: 1;
        }

        .topcats{
          margin-top: 44px;
          text-align: center;
        }

        .pill-row{
          margin-top: 18px;
          display:flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content:center;
        }
        .pill{
          display:inline-flex;
          align-items:center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.85);
          border: 1px solid var(--stroke);
          box-shadow: 0 10px 24px rgba(15,23,42,0.06);
          font-weight: 900;
          color: #0f172a;
          font-size: 13px;
        }
        .pill i{
          width: 28px; height: 28px;
          border-radius: 999px;
          display:grid; place-items:center;
          background: #f2f6ff;
          border: 1px solid rgba(26,115,232,0.14);
          font-style: normal;
        }

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
        .f-emoji { font-size: 34px; margin-bottom: 12px; display: block; }
        .f-card h3{ font-size: 18px; font-weight: 900; margin-bottom: 8px; }
        .f-card p{ color: var(--muted); font-weight: 600; line-height: 1.7; }

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
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display:grid;
          place-items:center;
          background: #f2f6ff;
          border: 1px solid rgba(26,115,232,0.14);
          font-size: 16px;
        }

        /* ✅ ABOUT cards responsive */
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
        .about-card:hover{
          transform: translateY(-4px);
          border-color: rgba(26,115,232,0.26);
        }
        .about-ic{
          width: 44px; height: 44px;
          border-radius: 16px;
          display:grid; place-items:center;
          font-size: 22px;
          background: linear-gradient(135deg, rgba(26,115,232,0.16), rgba(78,163,255,0.12));
          border: 1px solid rgba(26,115,232,0.16);
          flex: 0 0 auto;
        }
        .about-txt h3{
          font-size: 16px;
          font-weight: 900;
          margin-bottom: 6px;
        }
        .about-txt p{
          color: var(--muted);
          font-weight: 700;
          line-height: 1.6;
          font-size: 13px;
          margin: 0;
        }

        /* contact */
        .contact-card {
          display: flex;
          border-radius: 26px;
          overflow: hidden;
          background: rgba(255,255,255,0.92);
          border: 1px solid var(--stroke);
          box-shadow: var(--shadow);
        }
        .c-info {
          background: linear-gradient(135deg, #1a73e8, #4ea3ff);
          color: white;
          padding: 42px;
          width: 40%;
        }
        .c-form { padding: 42px; width: 60%; }
        .input-group { margin-bottom: 12px; }
        .input-group input, .input-group textarea {
          width: 100%;
          padding: 12px 12px;
          border-radius: 12px;
          border: 1px solid #e5eafc;
          font-family: inherit;
          outline: none;
          font-weight: 700;
          color: #0f172a;
          background: #fbfcff;
        }

        /* ✅ TABLET */
        @media (max-width: 980px){
          .hero{
            grid-template-columns: 1fr;     /* ✅ 1 colonne */
            gap: 18px;
          }
          .hero-right{
            min-height: 260px;
            width: 100%;
          }
          .muted{ font-size: 16px; }

          .about-cards{
            grid-template-columns: repeat(2, minmax(220px, 1fr)); /* ✅ 2 colonnes */
          }
        }

        /* ✅ MOBILE */
        @media (max-width: 600px){
          .section-container{
            width: 92%;
            padding: 12px 0 50px;
          }
          .page-section{
            padding: 28px 0;
          }
          h1{
            margin-bottom: 14px;
            letter-spacing: -0.6px;
          }
          .topcats{ margin-top: 28px; }

          .pill{
            width: 100%;                 /* ✅ pills full width si petit écran */
            justify-content: center;
          }

          .hero-right{
            min-height: 220px;           /* ✅ évite la coupure */
            border-radius: 22px;
          }

          .about-cards{
            grid-template-columns: 1fr;  /* ✅ 1 colonne */
          }
        }

        @media (max-width: 900px) {
          .nav-links-desktop, .nav-studio .btn-cta { display: none; }
          .burger-menu { display: flex; }
          .contact-card { flex-direction: column; }
          .c-info, .c-form { width: 100%; padding: 28px; }
        }

        .footer-mini {
          position: relative;
          z-index: 1;
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
          >
            Accueil
          </button>
          <button
            className={activeView === "features" ? "active" : ""}
            onClick={() => scrollToSection("features")}
          >
            Fonctionnalités
          </button>
          <button
            className={activeView === "about" ? "active" : ""}
            onClick={() => scrollToSection("about")}
          >
            À propos
          </button>
          <button
            className={activeView === "contact" ? "active" : ""}
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </button>
        </div>

        <button className="btn-cta" onClick={() => navigate("/login")}>
          Démarrer
        </button>

        <div
          className={`burger-menu ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="burger-bar bar1"></div>
          <div className="burger-bar bar2"></div>
          <div className="burger-bar bar3"></div>
        </div>
      </nav>

      <div className={`mobile-overlay ${isMenuOpen ? "active" : ""}`}>
        <div className="mob-card">
          <button onClick={() => scrollToSection("home")}>Accueil</button>
          <button onClick={() => scrollToSection("features")}>
            Fonctionnalités
          </button>
          <button onClick={() => scrollToSection("about")}>À propos</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
          <button className="login" onClick={() => navigate("/login")}>
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
                La première plateforme qui transforme n'importe quel document ou
                page web en un professeur particulier interactif.
              </p>

              <div className="hero-actions" />

              <div className="topcats">
                <h2 style={{ marginBottom: 10 }}>Top Categories</h2>
                <div className="pill-row">
                  <span className="pill">
                    <i>🚀</i> Parcours IA
                  </span>
                  <span className="pill">
                    <i>🎯</i> Évaluations
                  </span>
                  <span className="pill">
                    <i>📊</i> Analyse de Progrès
                  </span>
                  <span className="pill">
                    <i>🌐</i> Mode Web
                  </span>
                </div>
              </div>
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
              <span className="f-emoji">🚀</span>
              <h3>Parcours IA</h3>
              <p>
                Un apprentissage qui s'adapte dynamiquement à votre niveau et à
                vos objectifs.
              </p>
            </div>
            <div className="f-card">
              <span className="f-emoji">🎯</span>
              <h3>Évaluations</h3>
              <p>
                Des quiz générés instantanément pour valider vos connaissances
                sur n'importe quel sujet.
              </p>
            </div>
            <div className="f-card">
              <span className="f-emoji">📊</span>
              <h3>Analyse de Progrès</h3>
              <p>
                Suivez votre évolution grâce à des tableaux de bord détaillés et
                intelligents.
              </p>
            </div>
            <div className="f-card">
              <span className="f-emoji">🌐</span>
              <h3>Mode Web</h3>
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
                <span className="dot">⚡</span> Rapide
              </div>
              <div className="about-chip">
                <span className="dot">🎯</span> Personnalisé
              </div>
              <div className="about-chip">
                <span className="dot">🧠</span> Compréhension
              </div>
              <div className="about-chip">
                <span className="dot">📚</span> Documents
              </div>
              <div className="about-chip">
                <span className="dot">🌐</span> Web
              </div>
              <div className="about-chip">
                <span className="dot">✅</span> Quiz & suivi
              </div>
            </div>

            <div className="about-cards">
              <div className="about-card">
                <div className="about-ic">🌍</div>
                <div className="about-txt">
                  <h3>Mission</h3>
                  <p>Rendre l’apprentissage accessible, partout.</p>
                </div>
              </div>

              <div className="about-card">
                <div className="about-ic">✨</div>
                <div className="about-txt">
                  <h3>Vision</h3>
                  <p>Une expérience d’étude simple et motivante.</p>
                </div>
              </div>

              <div className="about-card">
                <div className="about-ic">🤖</div>
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
                Parlons ensemble 💬
              </h3>
              <p
                style={{
                  marginTop: 18,
                  opacity: 0.95,
                  lineHeight: 1.8,
                  fontWeight: 600,
                }}
              >
                Une question ? Un feedback ? Notre équipe est à votre écoute
                pour vous aider dans votre parcours.
              </p>
              <div style={{ marginTop: 34, fontWeight: 700, lineHeight: 1.9 }}>
                <p>📧 contact@substancia.ia</p>
                <p>📍 Paris, France</p>
              </div>
            </div>

            <div className="c-form">
              <form onSubmit={sendEmail}>
                <div className="input-group">
                  <input
                    name="from_name"
                    type="text"
                    placeholder="Nom complet"
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    name="reply_to"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-group">
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Votre message..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-cta"
                  style={{ width: "100%", margin: 0, borderRadius: 16 }}
                >
                  Envoyer le message
                </button>
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
