import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import aboutImage from "../assets/about-us.png";
import emailjs from "emailjs-com";

export default function Home() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("all"); // 'all', 'features', 'about', 'contact'

  const scrollToSection = (viewName) => {
    setActiveView(viewName);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <div className="substanceia-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

        .substancia-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1f2937;
          background-color: #ffffff;
          min-height: 100vh;
        }

        /* NAVBAR */
        .nav-studio {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 8%; background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px); position: fixed; top: 0; width: 84%;
          z-index: 2000; border-bottom: 1px solid #f1f5f9;
        }

        .logo-box { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .logo-sq { background: #1a73e8; color: white; padding: 6px 10px; border-radius: 8px; font-weight: 800; }
        .logo-txt { font-size: 22px; font-weight: 800; color: #1a73e8; letter-spacing: -0.5px; }

        .nav-links { display: flex; gap: 30px; }
        .nav-links button {
          background: none; border: none; font-weight: 600; color: #4b5563;
          cursor: pointer; transition: 0.3s; font-size: 15px;
          padding: 8px 12px; border-radius: 8px;
        }
        .nav-links button.active { color: #1a73e8; background: #eff6ff; }

        .btn-sign {
          background: #1a73e8; color: white; border: none; padding: 10px 24px;
          border-radius: 12px; font-weight: 700; cursor: pointer;
        }

        /* ANIMATION DE TRANSITION */
        .view-container {
          padding-top: 100px;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* SECTIONS ISOLÉES (MAXIMISÉES) */
        .full-screen-section {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 8%;
        }

        /* HERO */
        .hero { text-align: center; padding: 100px 8%; }
        .hero h1 { font-size: clamp(40px, 8vw, 64px); font-weight: 800; margin-bottom: 25px; }
        .hero span { color: #1a73e8; }

        /* FEATURES GRID */
        .f-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px; margin-top: 40px;
        }
        .f-card {
          padding: 35px; border-radius: 24px; border: 1px solid #f1f5f9;
          background: #fff; transition: 0.3s;
        }
        .f-card:hover { border-color: #1a73e8; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }

        /* ABOUT */
        .about-wrap { display: flex; align-items: center; gap: 60px; }
        .about-img { width: 50%; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .about-content { width: 50%; }

        /* CONTACT */
        .contact-box {
          display: flex; background: #fff; border-radius: 32px; overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;
        }
        .contact-l { background: #1a73e8; color: white; padding: 50px; width: 40%; }
        .contact-r { padding: 50px; width: 60%; }
        .form-group input, .form-group textarea {
          width: 100%; padding: 14px; margin-bottom: 15px; border-radius: 12px;
          border: 1px solid #e2e8f0; background: #f8fafc;
        }
        .btn-send {
          width: 100%; padding: 16px; background: #1a73e8; color: white;
          border: none; border-radius: 12px; font-weight: 800; cursor: pointer;
        }

        .section-header { text-align: center; margin-bottom: 50px; }
        .section-header h2 { font-size: 42px; font-weight: 800; }

        @media (max-width: 900px) {
          .about-wrap, .contact-box { flex-direction: column; }
          .about-img, .about-content, .contact-l, .contact-r { width: 100%; }
          .nav-links { display: none; }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className="nav-studio">
        <div className="logo-box" onClick={() => scrollToSection("all")}>
          <div className="logo-sq">IA</div>
          <span className="logo-txt">SubstanceIA</span>
        </div>
        <div className="nav-links">
          <button
            className={activeView === "all" ? "active" : ""}
            onClick={() => scrollToSection("all")}
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
            Contacts
          </button>
        </div>
        <div className="nav-btns">
          <button className="btn-sign" onClick={() => navigate("/sign-up")}>
            Démarrer
          </button>
        </div>
      </nav>

      <main className="view-container">
        {/* SECTION ACCUEIL / HERO (Affichée seulement si 'all') */}
        {activeView === "all" && (
          <header className="hero">
            <div
              style={{
                display: "inline-block",
                padding: "8px 16px",
                background: "#eff6ff",
                color: "#1a73e8",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "800",
                marginBottom: "20px",
              }}
            >
              ✨ PLATEFORME INTELLIGENTE
            </div>
            <h1>
              Apprenez avec
              <br />
              <span>SubstanceIA</span>
            </h1>
            <p>
              La première IA qui transforme le web en votre professeur
              particulier.
            </p>
            <button
              className="btn-sign"
              style={{ padding: "16px 40px" }}
              onClick={() => setActiveView("features")}
            >
              Explorer les fonctions
            </button>
          </header>
        )}

        {/* SECTION FONCTIONNALITÉS (Affichée si 'all' ou 'features') */}
        {(activeView === "all" || activeView === "features") && (
          <section className="full-screen-section">
            <div className="section-header">
              <h2>Nos Fonctionnalités</h2>
              <p style={{ color: "#6b7280" }}>
                Tout ce dont vous avez besoin pour réussir.
              </p>
            </div>
            <div className="f-grid">
              <div className="f-card">
                <h3>🚀 Parcours IA</h3>
                <p>Adaptation en temps réel à votre niveau.</p>
              </div>
              <div className="f-card">
                <h3>🎯 Évaluations </h3>
                <p>Quiz pour valider vos acquis.</p>
              </div>
              <div className="f-card">
                <h3>💎 Suivi intelligent</h3>
                <p>Visualisez votre progression en temps réel.</p>
              </div>
              <div className="f-card">
                <h3>🔮 Recommandations</h3>
                <p>Suggestions de cours basées sur vos intérêts.</p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION À PROPOS (Affichée si 'all' ou 'about') */}
        {(activeView === "all" || activeView === "about") && (
          <section
            className="full-screen-section"
            style={{ background: activeView === "about" ? "#fff" : "#f8fafc" }}
          >
            <div className="about-wrap">
              <img src={aboutImage} alt="About" className="about-img" />
              <div className="about-content">
                <h2 style={{ fontSize: "42px", fontWeight: "800" }}>
                  Révolutionner <br />
                  l'éducation.
                </h2>
                <p
                  style={{
                    color: "#4b5563",
                    margin: "25px 0",
                    fontSize: "18px",
                    lineHeight: "1.7",
                  }}
                >
                  SubstancIA n'est pas qu'un outil, c'est un compagnon
                  intelligent qui vous aide à naviguer dans l'immensité du
                  savoir en ligne.
                </p>
                <button
                  className="btn-sign"
                  onClick={() => scrollToSection("contact")}
                >
                  Nous rejoindre
                </button>
              </div>
            </div>
          </section>
        )}

        {/* SECTION CONTACT (Affichée si 'all' ou 'contact') */}
        {(activeView === "all" || activeView === "contact") && (
          <section className="full-screen-section">
            <div className="contact-box">
              <div className="contact-l">
                <h2>Parlons-en</h2>
                <p style={{ opacity: 0.8, marginTop: "20px" }}>
                  Notre équipe est disponible 24/7 pour vous accompagner.
                </p>
                <div style={{ marginTop: "40px" }}>
                  <p>📍 Nouakchott, Mauritanie</p>
                  <p>📧 contact@substancia.ai</p>
                </div>
              </div>
              <div className="contact-r">
                <form onSubmit={sendEmail} className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom complet"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Votre message"
                    rows="5"
                    required
                  ></textarea>
                  <button type="submit" className="btn-send">
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#9ca3af",
          fontSize: "14px",
        }}
      >
        © 2026 SubstancIA — Éduquer, Inspirer, Réussir.
      </footer>
    </div>
  );
}
