import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import aboutImage from "../assets/about-us.png";
import emailjs from "emailjs-com";
// import { LocationOn, Email, Phone } from "@mui/icons-material";

function Home() {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0tgimp7", // Ton service ID EmailJS
        "template_4u68dwh", // Ton template ID EmailJS
        e.target,
        "sTPi3pmQjjxF89p9S" // Ton public key EmailJS
      )
      .then(
        (result) => {
          alert("Message envoyé avec succès !");
        },
        (error) => {
          alert("Une erreur est survenue, réessayez.");
        }
      );

    e.target.reset();
  };

  const navigate = useNavigate();

  // Références pour le scroll
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Fonction pour scroller vers une section
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {/* Barre de navigation */}
      <nav className="navbar">
        <div className="logo">SubstanceAi</div>
        <div className="nav-links">
          <a href="#home" onClick={() => scrollToSection(homeRef)}>
            Accueil
          </a>
          <a href="#features" onClick={() => scrollToSection(featuresRef)}>
            Fonctionnalités
          </a>
          <a href="#about" onClick={() => scrollToSection(aboutRef)}>
            À propos
          </a>
          <a href="#contact" onClick={() => scrollToSection(contactRef)}>
            Contacts
          </a>
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="signup-btn" onClick={() => navigate("/sign-up")}>
            Sign up
          </button>
        </div>
      </nav>
      {/* Sections de la page */}
      <section ref={homeRef} className="hero-section">
        <h1>Welcome to the Substance AI</h1>
        <p>
          SubstancIA révolutionne l'apprentissage en ligne en sélectionnant les
          meilleures ressources pour vous, les organisant en parcours sur mesure
          et intégrant des éléments de gamification. Découvrez une expérience
          éducative immersive, efficace, et parfaitement adaptée à vos besoins.
        </p>
        <div className="cta-buttons">
          <button className="demo-btn">Request a demo</button>
          <button className="video-btn">Watch video</button>
        </div>
      </section>
      <section ref={featuresRef} className="features-section">
        <h2 className="features-title">Fonctionnalités</h2>

        <div className="features-grid">
          {/* Fonctionnalité 1 */}
          <div className="feature-card">
            <h3 className="feature-title">Parcours personnalisés</h3>
            <p className="feature-text">
              L'IA adapte le contenu selon votre niveau, vos objectifs et vos
              préférences.
            </p>
          </div>

          {/* Fonctionnalité 2 */}
          <div className="feature-card">
            <h3 className="feature-title">Ressources fiables</h3>
            <p className="feature-text">
              Accès aux meilleurs articles, vidéos, livres et cours disponibles
              en ligne.
            </p>
          </div>

          {/* Fonctionnalité 3 */}
          <div className="feature-card">
            <h3 className="feature-title">Suivi intelligent</h3>
            <p className="feature-text">
              Un tableau de bord pour suivre votre progression et identifier vos
              forces et faiblesses.
            </p>
          </div>

          {/* Fonctionnalité 4 */}
          <div className="feature-card">
            <h3 className="feature-title">Gamification</h3>
            <p className="feature-text">
              Défis, niveaux, badges et classement pour apprendre tout en
              s’amusant.
            </p>
          </div>

          {/* Fonctionnalité 5 */}
          <div className="feature-card">
            <h3 className="feature-title">Recommandation intelligente</h3>
            <p className="feature-text">
              Suggestions de contenus pertinents grâce à un moteur de
              recommandation personnalisé.
            </p>
          </div>

          {/* Fonctionnalité 6 */}
          <div className="feature-card">
            <h3 className="feature-title">Évaluations automatiques</h3>
            <p className="feature-text">
              Quiz et mini-projets corrigés automatiquement avec un retour
              instantané.
            </p>
          </div>
        </div>
      </section>

      {/* <section ref={aboutRef} className="section">
        <h2>À propos</h2>
        <p>Contenu à propos...</p>
      </section> */}
      <section ref={aboutRef} className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src={aboutImage} alt="About SubstanceAI" />
          </div>
          <div className="about-content">
            <h2>ABOUT US</h2>
            <p className="about-text">
              SubstancIA révolutionne l'apprentissage en ligne en sélectionnant
              les meilleures ressources pour vous, les organisant en parcours
              sur mesure et intégrant des éléments de gamification. Découvrez
              une expérience éducative immersive, efficace, et parfaitement
              adaptée à vos besoins.
            </p>
          </div>
        </div>
      </section>
      <section ref={contactRef} className="contact-section">
        <div className="contact-container">
          {/* Bloc GAUCHE : Infos application */}
          <div className="contact-info">
            <h2>Nos informations</h2>
            <p>
              <strong>📍 Adresse :</strong> Rue 123, Nouakchott, Mauritanie
            </p>
            <p>
              <strong>📞 Téléphone :</strong> +222 45 67 89 00
            </p>
            <p>
              <strong>📧 Email :</strong> substanceAi@gmail.com
            </p>
          </div>

          {/* Bloc DROITE : Formulaire */}
          <div className="contact-form">
            <h2>Contactez-nous</h2>
            <form onSubmit={sendEmail}>
              <input type="text" name="name" placeholder="Votre nom" required />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
              />
              <textarea
                name="message"
                placeholder="Votre message"
                required
              ></textarea>
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">Contactez-nous</h2>
        <p className="text-center text-gray-600 mb-8">
          Vous avez une question ? Envoyez-nous un message !
        </p>

        <form
          onSubmit={sendEmail}
          className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="name" // <--- ajouté ici
              placeholder="Votre nom"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email" // <--- ajouté ici
              placeholder="Votre email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message" // <--- ajouté ici
              placeholder="Votre message"
              rows="5"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Envoyer
          </button>
        </form>
      </section>
    </div>
  );
}

export default Home;
