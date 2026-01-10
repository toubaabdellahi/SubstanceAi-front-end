// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CssBaseline,
//   FormControl,
//   FormLabel,
//   Link,
//   Stack,
//   TextField,
//   Typography,
//   Divider,
// } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [userError, setUserError] = useState(false);
//   const [userErrorMessage, setUserErrorMessage] = useState("");
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

//   const GOOGLE_CLIENT_ID =
//     "76497721292-2fmahu68t6r2vaiupdmq6rbbtqsm3jq5.apps.googleusercontent.com";
//   const REDIRECT_URI =
//     "https://substanceai-back-end.onrender.com/api/auth/login/google/callback/";

//   const googleLoginUrl =
//     `https://accounts.google.com/o/oauth2/auth?` +
//     `client_id=${GOOGLE_CLIENT_ID}` +
//     `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
//     `&response_type=code` +
//     `&scope=email%20profile` +
//     `&access_type=offline` +
//     `&prompt=consent`;

//   const validateInputs = () => {
//     const user = document.getElementById("usernameOrEmail");
//     const password = document.getElementById("password");
//     let isValid = true;

//     if (!user.value || user.value.length < 3) {
//       setUserError(true);
//       setUserErrorMessage(
//         "Veuillez entrer un nom d'utilisateur ou email valide."
//       );
//       isValid = false;
//     } else {
//       setUserError(false);
//       setUserErrorMessage("");
//     }

//     if (!password.value || password.value.length < 6) {
//       setPasswordError(true);
//       setPasswordErrorMessage("Mot de passe trop court (min 6 caractères).");
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordErrorMessage("");
//     }

//     return isValid;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateInputs()) return;

//     const data = new FormData(event.currentTarget);
//     const payload = {
//       identifier: data.get("usernameOrEmail"),
//       password: data.get("password"),
//     };

//     try {
//       const res = await fetch(
//         "https://substanceai-back-end.onrender.com/api/auth/login/",
//         {
//           method: "POST",
//           credentials: "include", // Inclure les cookies si nécessaires
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//     if (!res.ok) {
//       const errorData = await res.json();
//       alert(errorData.error || "Erreur de connexion");
//       return;
//     }

//     const result = await res.json();

//     if (result.token) {
//       //  Stocker le token JWT dans localStorage
//       localStorage.setItem("token", result.token);

//       //  Rediriger vers /home
//       navigate("/home");

//       //  Rediriger vers /pdf-manager
//       navigate("/pdf-manager");
//     } else {
//       alert("Token non reçu depuis le serveur !");
//     }
//   } catch (error) {
//     alert("Erreur réseau ou serveur.");
//   }
// };

//   return (
//     <>
//       <CssBaseline />
//       <Box
//         component="main"
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "background.default",
//           p: 1,
//         }}
//       >
//         <Card
//           sx={{
//             width: "100%",
//             maxWidth: 360,
//             p: 2,
//             boxShadow: 3,
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <Stack spacing={1}>
//             <Typography component="h1" variant="h5" textAlign="center" mb={1}>
//               Sign in
//             </Typography>

//             <Box component="form" onSubmit={handleSubmit} noValidate>
//               <Stack spacing={1}>
//                 <FormControl>
//                   <FormLabel
//                     htmlFor="usernameOrEmail"
//                     sx={{ fontSize: "0.9rem" }}
//                   >
//                     Email ou nom d'utilisateur
//                   </FormLabel>
//                   <TextField
//                     name="usernameOrEmail"
//                     id="usernameOrEmail"
//                     placeholder="Email ou nom d'utilisateur"
//                     required
//                     fullWidth
//                     autoComplete="username"
//                     error={userError}
//                     helperText={userErrorMessage}
//                     size="small"
//                   />
//                 </FormControl>

//                 <FormControl>
//                   <FormLabel htmlFor="password" sx={{ fontSize: "0.9rem" }}>
//                     Mot de passe
//                   </FormLabel>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     type="password"
//                     id="password"
//                     placeholder="••••••"
//                     autoComplete="current-password"
//                     error={passwordError}
//                     helperText={passwordErrorMessage}
//                     size="small"
//                   />
//                 </FormControl>

//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 1 }}
//                 >
//                   Se connecter
//                 </Button>
//               </Stack>
//             </Box>

//             <Divider sx={{ my: 1 }}>
//               <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
//                 ou
//               </Typography>
//             </Divider>

//             <Button
//               fullWidth
//               variant="outlined"
//               startIcon={<GoogleIcon />}
//               onClick={() => {
//                 window.location.href = googleLoginUrl;
//               }}
//               size="small"
//             >
//               Connexion avec Google
//             </Button>

//             <Typography
//               sx={{ textAlign: "center", fontSize: "0.85rem", mt: 1 }}
//             >
//               Pas encore de compte ?{" "}
//               <Link
//                 href="/sign-up"
//                 variant="body2"
//                 sx={{ fontSize: "0.85rem" }}
//               >
//                 Créer un compte
//               </Link>
//             </Typography>
//           </Stack>
//         </Card>
//       </Box>
//     </>
//   );
// }

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CssBaseline,
  FormControl,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userError, setUserError] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const GOOGLE_CLIENT_ID =
    "76497721292-2fmahu68t6r2vaiupdmq6rbbtqsm3jq5.apps.googleusercontent.com";
  const REDIRECT_URI =
    "https://substanceai-back-end.onrender.com/api/auth/login/google/callback/";

  const googleLoginUrl =
    `https://accounts.google.com/o/oauth2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=email%20profile` +
    `&access_type=offline` +
    `&prompt=consent`;

  const validateInputs = () => {
    const user = document.getElementById("usernameOrEmail");
    const password = document.getElementById("password");
    let isValid = true;

    if (!user.value || user.value.length < 3) {
      setUserError(true);
      setUserErrorMessage(
        "Veuillez entrer un nom d'utilisateur ou email valide."
      );
      isValid = false;
    } else {
      setUserError(false);
      setUserErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Mot de passe trop court (min 6 caractères).");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const payload = {
      identifier: data.get("usernameOrEmail"),
      password: data.get("password"),
    };

    try {
      const res = await fetch(
        "https://substanceai-back-end.onrender.com/api/auth/login/",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Erreur de connexion");
        return;
      }

      const result = await res.json();

      if (result.token) {
        //  Stocker le token JWT dans localStorage
        localStorage.setItem("token", result.token);

        //  Rediriger vers /home
        navigate("/home");

        //  Rediriger vers /pdf-manager
        navigate("/pdf-manager");
      } else {
        alert("Token non reçu depuis le serveur !");
      }
    } catch (error) {
      alert("Erreur réseau ou serveur.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      {/* INJECTION DU STYLE GLOBAL */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body {
          background: radial-gradient(circle at top right, #eff6ff 0%, #ffffff 40%);
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }
      `}</style>

      {/* HEADER / LOGO */}
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              bgcolor: "#1a73e8",
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              fontWeight: 800,
            }}
          >
            IA
          </Box>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#1a73e8",
              letterSpacing: "-0.5px",
            }}
          >
            SubstancIA
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 4,
            borderRadius: "28px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography
                sx={{ fontSize: "28px", fontWeight: 800, color: "#111827" }}
              >
                Bon retour ! 👋
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: "15px", mt: 1 }}>
                Accédez à votre parcours personnalisé.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <FormControl>
                  <FormLabel
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      mb: 1,
                      color: "#374151",
                    }}
                  >
                    Email ou nom d'utilisateur
                  </FormLabel>
                  <TextField
                    name="usernameOrEmail"
                    id="usernameOrEmail"
                    placeholder="votre@email.com"
                    required
                    fullWidth
                    error={userError}
                    helperText={userErrorMessage}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                      },
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      mb: 1,
                      color: "#374151",
                    }}
                  >
                    Mot de passe
                  </FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        bgcolor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                      },
                    }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.8,
                    borderRadius: "12px",
                    bgcolor: "#1a73e8",
                    fontWeight: 800,
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": { bgcolor: "#111827" },
                  }}
                >
                  Se connecter
                </Button>
              </Stack>
            </Box>

            <Divider>
              <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem", px: 1 }}>
                ou continuer avec
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => {
                window.location.href = googleLoginUrl;
              }}
              sx={{
                py: 1.5,
                borderRadius: "12px",
                borderColor: "#e2e8f0",
                color: "#475569",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: "#f8fafc", borderColor: "#cbd5e1" },
              }}
            >
              Google
            </Button>

            <Typography
              sx={{ textAlign: "center", fontSize: "0.9rem", color: "#6b7280" }}
            >
              Nouveau ici ?{" "}
              <Link
                href="/sign-up"
                sx={{
                  color: "#1a73e8",
                  fontWeight: 700,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Créer un compte free
              </Link>
            </Typography>
          </Stack>
        </Card>
      </Box>

      <Box
        sx={{ py: 3, textAlign: "center", color: "#94a3b8", fontSize: "13px" }}
      >
        © 2026 SubstancIA — Apprendre plus intelligemment.
      </Box>
    </Box>
  );
}
