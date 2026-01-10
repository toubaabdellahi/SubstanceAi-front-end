import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "../services/api";

function GoogleAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (!token) {
      console.error("Token non trouvé dans l'URL");
      navigate("/login");
      return;
    }

    // 🔐 Sauvegarde du token
    localStorage.setItem("token", token);

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Échec du décodage du token :", error);
      navigate("/login");
      return;
    }

    const userId = decoded.user_id || decoded.id || decoded.userId;

    if (!userId) {
      console.error("user_id manquant dans le token");
      navigate("/login");
      return;
    }

    // 📡 Vérifie si le profil existe et est complet
    getUserProfile(userId)
      .then((response) => {
        console.log("Profil récupéré :", response);

        // ✅ Vérifier si le profil est complet (5 questions répondues)
        const isComplete =
          response.is_complete ||
          (response.questions_reponses &&
            response.questions_reponses.length >= 5 &&
            response.questions_reponses.every((q) => q.reponse));

        if (isComplete) {
          console.log("✅ Profil complet → Redirection vers /home");
          navigate("/pdf-manager");
        } else {
          console.log("⚠️ Profil incomplet → Redirection vers /profiling-test");
          navigate("/profiling-test");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du profil :", error);

        // Si le profil n'existe pas (404) ou erreur → test de profiling
        if (error.response?.status === 404) {
          console.log(
            "👤 Aucun profil trouvé → Redirection vers /profiling-test"
          );
        }
        navigate("/profiling-test");
      });
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div className="spinner"></div>
    </div>
  );
}

export default GoogleAuthSuccess;
