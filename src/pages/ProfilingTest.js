import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Instance Axios avec token
const APIP = axios.create({
  baseURL: "http://localhost:8000/api/profil/",
});

APIP.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function ProfilingTest() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questionsReponses, setQuestionsReponses] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Utilisateur non connecté");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const id = decoded.user_id || decoded.id;
      setUserId(id);
      startProfiling(id);
    } catch (e) {
      console.error("Erreur décodage token:", e);
      setLoading(false);
    }
  }, []);

  const startProfiling = async (id) => {
    try {
      const response = await APIP.post("start/", { user_id: id, max_questions: 5 });
      setQuestionsReponses(response.data.questions_reponses || []);
      setCurrentQuestion(response.data.next_question || "");
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors du démarrage du profil.");
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) {
      alert("Veuillez répondre à la question avant de continuer !");
      return;
    }

    setSubmitting(true);

    try {
      const response = await APIP.post("answer/", {
        user_id: userId,
        reponse: currentAnswer,
        questions_reponses: questionsReponses,
        max_questions: 5,
      });

      // Mise à jour des questions-réponses
      setQuestionsReponses(response.data.questions_reponses || []);
      setCurrentAnswer("");

      // Vérification de la prochaine question
      if (response.data.next_question && response.data.next_question.trim() !== "") {
        setCurrentQuestion(response.data.next_question);
      } else {
        // Test terminé
        setIsCompleted(true);
        setCurrentQuestion("");
        setTimeout(() => {
          
          navigate("/pdf-manager");
        }, 100);
        
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi de la réponse:", err);
      alert("Erreur lors de l'envoi de la réponse.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !submitting) {
      submitAnswer();
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="error" style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Utilisateur non connecté</p>
        <button onClick={() => navigate("/login")}>Se connecter</button>
      </div>
    );
  }

  return (
    <div className="profiling-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        📝 Test de Profil 
      </h1>
      
      {/* Progression */}
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <p>Question {questionsReponses.length } / 5</p>
        <div style={{ 
          width: '100%', 
          height: '10px', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((questionsReponses.length) / 5) * 100}%`,
            height: '100%',
            backgroundColor: '#4caf50',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      

      {/* Question actuelle */}
      {currentQuestion && !isCompleted && (
        <div className="question-card" style={{ 
          backgroundColor: '#fff', 
          padding: '2rem', 
          borderRadius: '10px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Question actuelle :</h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{currentQuestion}</p>
          
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre réponse ici..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '1rem',
              border: '2px solid #ddd',
              borderRadius: '5px',
              fontSize: '1rem',
              marginBottom: '1rem',
              resize: 'vertical'
            }}
          />
          
          <button 
            onClick={submitAnswer}
            disabled={submitting || !currentAnswer.trim()}
            className="submit-btn"
            style={{
              backgroundColor: submitting || !currentAnswer.trim() ? '#ccc' : '#007bff',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: submitting || !currentAnswer.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {submitting ? 'Envoi...' : 'Envoyer'}
          </button>
        </div>
      )}

      {/* Message de fin */}
      {isCompleted && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '10px'
        }}>
          
        </div>
      )}
    </div>
  );
}