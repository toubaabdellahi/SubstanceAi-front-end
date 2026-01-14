// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const APIP = axios.create({
//   baseURL: "https://substanceai-back-end.onrender.com/api/profil/",
// });

// APIP.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default function ProfilingTest() {
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [questionsReponses, setQuestionsReponses] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [currentAnswer, setCurrentAnswer] = useState(null);
//   const [multipleAnswers, setMultipleAnswers] = useState([]);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [maxQuestions, setMaxQuestions] = useState(10);
//   const [questionType, setQuestionType] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Utilisateur non connecté");
//       setLoading(false);
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       const id = decoded.user_id || decoded.id;
//       setUserId(id);
//       startProfiling(id);
//     } catch (e) {
//       console.error("Erreur décodage token:", e);
//       setLoading(false);
//     }
//   }, []);

//   const startProfiling = async (id) => {
//     try {
//       const response = await APIP.post("start/", {
//         user_id: id,
//         num_random_questions: 5,
//       });

//       setQuestionsReponses(response.data.questions_reponses || []);
//       setCurrentQuestion(response.data.next_question || null);
//       setMaxQuestions(response.data.max_questions || 10);
//       setQuestionType(response.data.question_type || "fixed");
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       alert("Erreur lors du démarrage du profil.");
//       setLoading(false);
//     }
//   };

//   const handleSingleChoice = (option) => {
//     setCurrentAnswer(option);
//   };

//   const handleMultipleChoice = (option) => {
//     setMultipleAnswers((prev) => {
//       if (prev.includes(option)) {
//         return prev.filter((item) => item !== option);
//       } else {
//         return [...prev, option];
//       }
//     });
//   };

//   const submitAnswer = async () => {
//     let finalAnswer = null;

//     if (currentQuestion.type === "single") {
//       if (!currentAnswer) {
//         alert("Veuillez sélectionner une option !");
//         return;
//       }
//       finalAnswer = currentAnswer;
//     } else if (currentQuestion.type === "multiple") {
//       if (multipleAnswers.length === 0) {
//         alert("Veuillez sélectionner au moins une option !");
//         return;
//       }
//       finalAnswer = multipleAnswers;
//     }

//     setSubmitting(true);

//     try {
//       const response = await APIP.post("answer/", {
//         user_id: userId,
//         reponse: finalAnswer,
//         questions_reponses: questionsReponses,
//         max_questions: maxQuestions,
//       });

//       setQuestionsReponses(response.data.questions_reponses || []);
//       setCurrentAnswer(null);
//       setMultipleAnswers([]);

//       if (response.data.question_type) {
//         setQuestionType(response.data.question_type);
//       }

//       if (response.data.next_question) {
//         setCurrentQuestion(response.data.next_question);
//       } else {
//         setIsCompleted(true);
//         setCurrentQuestion(null);
//         setTimeout(() => {
//           navigate("/pdf-manager");
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Erreur lors de l'envoi de la réponse:", err);
//       alert("Erreur lors de l'envoi de la réponse.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           padding: "4rem",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div>
//           <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
//           <p style={{ fontSize: "1.2rem", color: "#666" }}>
//             Préparation de votre test...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!userId) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           padding: "2rem",
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
//         <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
//           Utilisateur non connecté
//         </p>
//         <button
//           onClick={() => navigate("/login")}
//           style={{
//             backgroundColor: "#007bff",
//             color: "white",
//             padding: "0.75rem 2rem",
//             border: "none",
//             borderRadius: "5px",
//             fontSize: "1rem",
//             cursor: "pointer",
//           }}
//         >
//           Se connecter
//         </button>
//       </div>
//     );
//   }

//   const answeredQuestionsCount = questionsReponses.filter(
//     (q) => q.reponse !== null
//   ).length;
//   const progressPercentage = (answeredQuestionsCount / maxQuestions) * 100;

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         backgroundColor: "#f5f7fa",
//         position: "relative",
//         overflowY: "scroll",
//       }}
//     >
//       {/* Contenu principal avec scroll */}
//       <div
//         style={{
//           flex: 1,
//           maxWidth: "800px",
//           margin: "0 auto",
//         }}
//       >
//         <div
//           style={{
//             textAlign: "center",
//             marginBottom: "2rem",
//             paddingTop: "1rem",
//           }}
//         >
//           <h1
//             style={{
//               fontSize: "2.5rem",
//               marginBottom: "0.6rem",
//               background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             📝 Test de Profil
//           </h1>
//           <p style={{ color: "#666", fontSize: "1rem" }}>
//             Aidez-nous à personnaliser votre expérience d'apprentissage
//           </p>
//         </div>

//         {/* Question actuelle */}
//         {currentQuestion && !isCompleted && (
//           <div
//             style={{
//               backgroundColor: "#fff",
//               padding: "2rem",
//               borderRadius: "15px",
//               boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//               marginBottom: "2rem",
//             }}
//           >
//             {/* Catégorie */}
//             <div
//               style={{
//                 display: "inline-block",
//                 backgroundColor: "#f0f0f0",
//                 padding: "0.5rem 1rem",
//                 borderRadius: "20px",
//                 fontSize: "0.85rem",
//                 fontWeight: "600",
//                 color: "#666",
//                 marginBottom: "1rem",
//               }}
//             >
//               {currentQuestion.category}
//             </div>

//             {/* Question */}
//             <h3
//               style={{
//                 fontSize: "1.4rem",
//                 marginBottom: "1.5rem",
//                 lineHeight: "1.6",
//                 color: "#333",
//               }}
//             >
//               {currentQuestion.question}
//             </h3>

//             {/* Options */}
//             <div style={{ marginBottom: "1.5rem" }}>
//               {currentQuestion.type === "single" ? (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "1rem",
//                   }}
//                 >
//                   {currentQuestion.options.map((option, index) => (
//                     <div
//                       key={index}
//                       onClick={() => handleSingleChoice(option)}
//                       style={{
//                         padding: "1rem 1.5rem",
//                         border:
//                           currentAnswer === option
//                             ? "2px solid #667eea"
//                             : "2px solid #e0e0e0",
//                         borderRadius: "10px",
//                         cursor: "pointer",
//                         transition: "all 0.3s ease",
//                         backgroundColor:
//                           currentAnswer === option ? "#f0f4ff" : "#fff",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "1rem",
//                       }}
//                       onMouseEnter={(e) => {
//                         if (currentAnswer !== option) {
//                           e.currentTarget.style.borderColor = "#b8c5f2";
//                           e.currentTarget.style.transform = "translateX(5px)";
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (currentAnswer !== option) {
//                           e.currentTarget.style.borderColor = "#e0e0e0";
//                           e.currentTarget.style.transform = "translateX(0)";
//                         }
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "20px",
//                           height: "20px",
//                           borderRadius: "50%",
//                           border:
//                             currentAnswer === option
//                               ? "6px solid #667eea"
//                               : "2px solid #ccc",
//                           transition: "all 0.3s ease",
//                           flexShrink: 0,
//                         }}
//                       ></div>
//                       <span style={{ fontSize: "1rem", color: "#333" }}>
//                         {option}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div>
//                   <p
//                     style={{
//                       fontSize: "0.9rem",
//                       color: "#666",
//                       marginBottom: "1rem",
//                       fontStyle: "italic",
//                     }}
//                   >
//                     ℹ️ Plusieurs choix possibles
//                   </p>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "1rem",
//                     }}
//                   >
//                     {currentQuestion.options.map((option, index) => (
//                       <div
//                         key={index}
//                         onClick={() => handleMultipleChoice(option)}
//                         style={{
//                           padding: "1rem 1.5rem",
//                           border: multipleAnswers.includes(option)
//                             ? "2px solid #667eea"
//                             : "2px solid #e0e0e0",
//                           borderRadius: "10px",
//                           cursor: "pointer",
//                           transition: "all 0.3s ease",
//                           backgroundColor: multipleAnswers.includes(option)
//                             ? "#f0f4ff"
//                             : "#fff",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "1rem",
//                         }}
//                         onMouseEnter={(e) => {
//                           if (!multipleAnswers.includes(option)) {
//                             e.currentTarget.style.borderColor = "#b8c5f2";
//                             e.currentTarget.style.transform = "translateX(5px)";
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           if (!multipleAnswers.includes(option)) {
//                             e.currentTarget.style.borderColor = "#e0e0e0";
//                             e.currentTarget.style.transform = "translateX(0)";
//                           }
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "20px",
//                             height: "20px",
//                             borderRadius: "4px",
//                             border: multipleAnswers.includes(option)
//                               ? "none"
//                               : "2px solid #ccc",
//                             backgroundColor: multipleAnswers.includes(option)
//                               ? "#667eea"
//                               : "transparent",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             transition: "all 0.3s ease",
//                             flexShrink: 0,
//                           }}
//                         >
//                           {multipleAnswers.includes(option) && (
//                             <span
//                               style={{
//                                 color: "white",
//                                 fontSize: "0.9rem",
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               ✓
//                             </span>
//                           )}
//                         </div>
//                         <span style={{ fontSize: "1rem", color: "#333" }}>
//                           {option}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Bouton */}
//             <button
//               onClick={submitAnswer}
//               disabled={
//                 submitting || (!currentAnswer && multipleAnswers.length === 0)
//               }
//               style={{
//                 width: "100%",
//                 background:
//                   submitting || (!currentAnswer && multipleAnswers.length === 0)
//                     ? "#e0e0e0"
//                     : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 color:
//                   submitting || (!currentAnswer && multipleAnswers.length === 0)
//                     ? "#999"
//                     : "white",
//                 padding: "1rem 2rem",
//                 border: "none",
//                 borderRadius: "10px",
//                 fontSize: "1.1rem",
//                 fontWeight: "600",
//                 cursor:
//                   submitting || (!currentAnswer && multipleAnswers.length === 0)
//                     ? "not-allowed"
//                     : "pointer",
//                 transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                 boxShadow:
//                   submitting || (!currentAnswer && multipleAnswers.length === 0)
//                     ? "none"
//                     : "0 4px 15px rgba(102, 126, 234, 0.4)",
//               }}
//               onMouseEnter={(e) => {
//                 if (
//                   !submitting &&
//                   (currentAnswer || multipleAnswers.length > 0)
//                 ) {
//                   e.target.style.transform = "translateY(-2px)";
//                   e.target.style.boxShadow =
//                     "0 6px 20px rgba(102, 126, 234, 0.5)";
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = "translateY(0)";
//                 e.target.style.boxShadow =
//                   submitting || (!currentAnswer && multipleAnswers.length === 0)
//                     ? "none"
//                     : "0 4px 15px rgba(102, 126, 234, 0.4)";
//               }}
//             >
//               {submitting ? "⏳ Envoi en cours..." : "✓ Valider ma réponse"}
//             </button>
//           </div>
//         )}

//         {/* Message de fin */}
//         {isCompleted && (
//           <div
//             style={{
//               textAlign: "center",
//               padding: "3rem",
//               backgroundColor: "#d4edda",
//               border: "2px solid #c3e6cb",
//               borderRadius: "15px",
//             }}
//           >
//             <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
//             <h2
//               style={{
//                 color: "#155724",
//                 marginBottom: "1rem",
//                 fontSize: "2rem",
//               }}
//             >
//               Profil complété avec succès !
//             </h2>
//             <p style={{ color: "#155724", fontSize: "1.1rem" }}>
//               Merci d'avoir pris le temps de répondre à toutes les questions.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Barre de progression verticale à droite - SUPPRIMÉE */}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  styled,
  CssBaseline,
  Button,
  Paper,
  Container,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  RadioButtonChecked as RadioCheckedIcon,
  CheckBox as CheckboxCheckedIcon,
  CheckBoxOutlineBlank as CheckboxUncheckedIcon,
  Lock as LockIcon,
} from "@mui/icons-material";

const APIP = axios.create({
  baseURL: "https://substanceai-back-end.onrender.com/api/profil/",
});

APIP.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * ✅ Fix responsive / scroll:
 * - on évite double scroll sur mobile en mettant html/body/#root en overflow: hidden
 * - le scroll reste uniquement sur PageWrapper (100vh + overflowY:auto)
 */

const PAGE_BG = "#EAF2FF"; // bleu clair

const PageWrapper = styled(Box)(({ theme }) => ({
  height: "100vh",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  backgroundColor: PAGE_BG,
  backgroundImage:
    "radial-gradient(rgba(26,115,232,0.10) 0.8px, transparent 0.8px)",
  backgroundSize: "22px 22px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "24px 14px",
  [theme.breakpoints.up("sm")]: { padding: "40px 20px" },

  "&::-webkit-scrollbar": { width: "8px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#dadce0",
    borderRadius: "10px",
    border: `2px solid ${PAGE_BG}`,
  },
  "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#bdc1c6" },
}));

const QuestionCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 760,
  padding: 22,
  borderRadius: 24,
  border: "1px solid #e6eaf3",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
  marginBottom: 24,
  [theme.breakpoints.up("sm")]: { padding: 40, marginBottom: 40 },
}));

const OptionButton = styled(Button)(({ selected }) => ({
  justifyContent: "flex-start",
  textTransform: "none",
  width: "100%",
  padding: "16px 18px",
  borderRadius: 14,
  marginBottom: 12,
  fontSize: "1rem",
  fontWeight: 600,
  border: selected ? "2px solid #1a73e8" : "1px solid #dde3f0",
  backgroundColor: selected ? "#e8f0fe" : "#ffffff",
  color: selected ? "#1a73e8" : "#202124",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: selected ? "#dbe8ff" : "#f8fafc",
    borderColor: selected ? "#1a73e8" : "#cfd7ea",
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  height: 56,
  borderRadius: 14,
  textTransform: "none",
  fontWeight: 900,
  fontSize: "1rem",
  backgroundColor: "#1a73e8",
  color: "#000",
  boxShadow: "0 14px 30px rgba(26,115,232,0.22)",
  "&:hover": {
    backgroundColor: "#1765cc",
    boxShadow: "0 18px 36px rgba(26,115,232,0.26)",
  },
  "&.Mui-disabled": {
    backgroundColor: "#e6ebf2",
    boxShadow: "none",
    color: "#000",
  },
  [theme.breakpoints.down("sm")]: { height: 52 },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  height: 56,
  borderRadius: 14,
  textTransform: "none",
  fontWeight: 900,
  fontSize: "1rem",
  color: "#000",
  border: "1px solid #c6dafc",
  backgroundColor: "#ffffff",
  "&:hover": { backgroundColor: "#f6f9ff", borderColor: "#1a73e8" },
  "&.Mui-disabled": { opacity: 0.6, color: "#000" },
  [theme.breakpoints.down("sm")]: { height: 52 },
}));

export default function ProfilingTest() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [goingBack, setGoingBack] = useState(false);

  const [questionsReponses, setQuestionsReponses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [multipleAnswers, setMultipleAnswers] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [maxQuestions, setMaxQuestions] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const id = decoded.user_id || decoded.id;
      setUserId(id);
      startProfiling(id);
    } catch {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startProfiling = async (id) => {
    try {
      const res = await APIP.post("start/", {
        user_id: id,
        num_random_questions: 5,
      });
      setQuestionsReponses(res.data.questions_reponses || []);
      setCurrentQuestion(res.data.next_question || null);
      setMaxQuestions(res.data.max_questions || 10);
    } catch {
      // silence
    } finally {
      setLoading(false);
    }
  };

  const handleSingleChoice = (option) => setCurrentAnswer(option);

  const handleMultipleChoice = (option) => {
    setMultipleAnswers((prev) =>
      prev.includes(option)
        ? prev.filter((i) => i !== option)
        : [...prev, option]
    );
  };

  const answeredCount = questionsReponses.filter(
    (q) => q.reponse !== null
  ).length;
  const progress = maxQuestions ? (answeredCount / maxQuestions) * 100 : 0;

  const goPrevious = async () => {
    if (!userId) return;
    if (answeredCount === 0) return;

    setGoingBack(true);
    try {
      const res = await APIP.post("previous/", { user_id: userId });
      const prevQuestion = res.data.prev_question;
      if (!prevQuestion) return;

      setQuestionsReponses(res.data.questions_reponses || []);
      setCurrentQuestion(prevQuestion);

      if (prevQuestion.type === "single") {
        setCurrentAnswer(prevQuestion.reponse || null);
        setMultipleAnswers([]);
      } else {
        setMultipleAnswers(
          Array.isArray(prevQuestion.reponse) ? prevQuestion.reponse : []
        );
        setCurrentAnswer(null);
      }

      document
        .getElementById("page-wrapper")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Erreur retour arrière");
    } finally {
      setGoingBack(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentQuestion) return;

    const finalAnswer =
      currentQuestion.type === "single" ? currentAnswer : multipleAnswers;

    if (
      !finalAnswer ||
      (Array.isArray(finalAnswer) && finalAnswer.length === 0)
    )
      return;

    setSubmitting(true);
    try {
      const res = await APIP.post("answer/", {
        user_id: userId,
        reponse: finalAnswer,
        questions_reponses: questionsReponses,
      });

      setQuestionsReponses(res.data.questions_reponses || []);
      setCurrentAnswer(null);
      setMultipleAnswers([]);

      if (res.data.next_question) {
        setCurrentQuestion(res.data.next_question);
        document
          .getElementById("page-wrapper")
          ?.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setIsCompleted(true);
        setCurrentQuestion(null);
        setTimeout(() => navigate("/pdf-manager"), 2500);
      }
    } catch {
      alert("Erreur réseau");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper id="page-wrapper" sx={{ justifyContent: "center" }}>
        <CssBaseline />
        <CircularProgress sx={{ color: "#1a73e8" }} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper id="page-wrapper">
      <CssBaseline />

      {/* ✅ Fix responsive: 1 seul scroll (PageWrapper) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        html, body, #root { height: 100%; overflow: hidden; } /* ✅ important */
        body{ font-family: 'Plus Jakarta Sans', sans-serif !important; }
      `}</style>

      {/* LOGO : Substanc noir + IA bleu */}
      <Box sx={{ mb: { xs: 3, sm: 6 }, textAlign: "center" }}>
        <Typography
          sx={{ fontWeight: 900, fontSize: 24, letterSpacing: "-0.5px" }}
        >
          <Box component="span" sx={{ color: "#111" }}>
            Substanc
          </Box>
          <Box component="span" sx={{ color: "#1a73e8" }}>
            IA
          </Box>
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{ width: "100%" }}>
        {/* TEST DU PROFIL centré + % à droite */}
        {!isCompleted && userId && (
          <Box sx={{ width: "100%", maxWidth: 760, mb: { xs: 2.5, sm: 4 } }}>
            <Box sx={{ position: "relative", mb: 1.2, minHeight: 18 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#5f6368",
                  letterSpacing: "0.6px",
                  textAlign: "center",
                }}
              >
                TEST DU PROFIL
              </Typography>

              <Typography
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  fontSize: 13,
                  fontWeight: 900,
                  color: "#1a73e8",
                }}
              >
                {Math.round(progress)}%
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: 6,
                borderRadius: 999,
                backgroundColor: "#dfe6f2",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${Math.round(progress)}%`,
                  backgroundColor: "#1a73e8",
                  borderRadius: 999,
                  transition: "width .25s ease",
                }}
              />
            </Box>
          </Box>
        )}

        {!userId ? (
          <QuestionCard sx={{ textAlign: "center" }}>
            <LockIcon sx={{ fontSize: 48, color: "#c7cfdd", mb: 2 }} />
            <Typography sx={{ fontSize: 22, fontWeight: 900, mb: 1 }}>
              Session requise
            </Typography>
            <Typography sx={{ color: "#5f6368", mb: 4 }}>
              Veuillez vous connecter pour passer le test.
            </Typography>
            <PrimaryButton onClick={() => navigate("/login")} fullWidth>
              Se connecter
            </PrimaryButton>
          </QuestionCard>
        ) : currentQuestion && !isCompleted ? (
          <QuestionCard>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Chip
                label={currentQuestion.category || "Profilage"}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: "#e8f0fe",
                  color: "#1a73e8",
                  fontWeight: 900,
                  borderRadius: "10px",
                }}
              />
            </Box>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: 22, sm: 28 },
                fontWeight: 900,
                color: "#202124",
                mb: { xs: 3, sm: 4 },
                lineHeight: 1.25,
              }}
            >
              {currentQuestion.question}
            </Typography>

            <Box sx={{ mb: 3 }}>
              {currentQuestion.options.map((option, index) => {
                const isSelected =
                  currentQuestion.type === "single"
                    ? currentAnswer === option
                    : multipleAnswers.includes(option);

                const icon =
                  currentQuestion.type === "single" ? (
                    isSelected ? (
                      <RadioCheckedIcon />
                    ) : null
                  ) : isSelected ? (
                    <CheckboxCheckedIcon />
                  ) : (
                    <CheckboxUncheckedIcon />
                  );

                return (
                  <OptionButton
                    key={index}
                    selected={isSelected ? 1 : 0}
                    onClick={() =>
                      currentQuestion.type === "single"
                        ? handleSingleChoice(option)
                        : handleMultipleChoice(option)
                    }
                    startIcon={icon}
                  >
                    {option}
                  </OptionButton>
                );
              })}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <SecondaryButton
                fullWidth
                onClick={goPrevious}
                disabled={goingBack || submitting || answeredCount === 0}
              >
                {goingBack ? (
                  <CircularProgress size={22} sx={{ color: "#000" }} />
                ) : (
                  "Précédent"
                )}
              </SecondaryButton>

              <PrimaryButton
                fullWidth
                onClick={submitAnswer}
                disabled={
                  submitting || (!currentAnswer && multipleAnswers.length === 0)
                }
              >
                {submitting ? (
                  <CircularProgress size={24} sx={{ color: "#000" }} />
                ) : (
                  "Suivant"
                )}
              </PrimaryButton>
            </Box>
          </QuestionCard>
        ) : isCompleted ? (
          <QuestionCard sx={{ textAlign: "center", py: { xs: 5, sm: 6 } }}>
            <CheckIcon sx={{ fontSize: 64, color: "#34a853", mb: 2 }} />
            <Typography
              sx={{ fontSize: { xs: 24, sm: 30 }, fontWeight: 900, mb: 1.5 }}
            >
              Analyse terminée !
            </Typography>
            <Typography sx={{ color: "#5f6368" }}>
              Nous créons votre parcours personnalisé...
            </Typography>
          </QuestionCard>
        ) : null}
      </Container>
    </PageWrapper>
  );
}
