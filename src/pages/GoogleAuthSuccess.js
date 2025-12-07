import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function GoogleAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (!token) {
      console.error("Token non trouvé dans l'URL");
      return;
    }

    // 🔐 Sauvegarde du token dans le localStorage
    localStorage.setItem("token", token);

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error("Échec du décodage du token :", error);
      navigate("/profiling-test");
      return;
    }

    const userId = decoded.user_id || decoded.id || decoded.userId;

    if (!userId) {
      console.error("user_id manquant dans le token");
      navigate("/profiling-test");
      return;
    }

    // 📡 Vérifie si le test de profil est déjà rempli
    axios.get(`http://localhost:8000/api/profil/recuperer_reponses/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // ✅ Si on reçoit des réponses, on redirige vers /home
        if (response.data && Object.keys(response.data).length > 1) {
          navigate("/home");
        } else {
          navigate("/profiling-test");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // 👤 Utilisateur sans test → rediriger vers le test
          navigate("/profiling-test");
        } else {
          console.error("Erreur API :", error);
          navigate("/profiling-test");
        }
      });

  }, [navigate]);

  return <p>Connexion avec Google en cours...</p>;
}

export default GoogleAuthSuccess;