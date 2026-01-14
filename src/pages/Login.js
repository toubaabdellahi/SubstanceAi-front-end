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
  CssBaseline,
  FormControl,
  Link,
  Stack,
  TextField,
  Typography,
  Divider,
  useTheme,
  InputAdornment,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

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
        localStorage.setItem("token", result.token);
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        body{
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          background: #F9FDFC;
        }

        .login-panel{
          width: 100%;
          max-width: 420px;
          padding: 22px;
          border-radius: 22px;
          background: transparent;
        }

        .field3d .MuiOutlinedInput-root{
          border-radius: 14px !important;
          background: rgba(255,255,255,0.78);
          box-shadow:
            0 10px 22px rgba(15,23,42,0.10),
            inset 0 2px 0 rgba(255,255,255,0.95),
            inset 0 -2px 6px rgba(15,23,42,0.06);
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }

        .field3d .MuiOutlinedInput-notchedOutline{
          border-color: rgba(26,115,232,0.20) !important;
        }

        .field3d .MuiOutlinedInput-root:hover{
          transform: translateY(-1px);
          box-shadow:
            0 14px 28px rgba(15,23,42,0.14),
            inset 0 2px 0 rgba(255,255,255,0.95),
            inset 0 -2px 10px rgba(15,23,42,0.08);
        }

        .field3d .MuiOutlinedInput-root.Mui-focused{
          transform: translateY(-1px);
          box-shadow:
            0 16px 34px rgba(26,115,232,0.18),
            0 0 0 5px rgba(26,115,232,0.14),
            inset 0 2px 0 rgba(255,255,255,0.95);
        }

        .field3d .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
          border-color: rgba(26,115,232,0.55) !important;
        }

        .btn-main{
          height: 52px;
          border-radius: 14px !important;
          font-weight: 900 !important;
          text-transform: none !important;
          box-shadow: 0 14px 30px rgba(26,115,232,0.22);
        }

        .btn-google{
          border-radius: 14px !important;
          text-transform: none !important;
          font-weight: 800 !important;
          background: rgba(255,255,255,0.45);
          backdrop-filter: blur(10px);
        }

        @media (max-width: 420px){
          .login-panel{ padding: 16px; }
        }
      `}</style>

      {/* HEADER */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          <Typography variant="h6" fontWeight="bold">
            Substanc
            <Box component="span" sx={{ color: primaryColor }}>
              IA
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* CONTENU */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <div className="login-panel">
          <Stack spacing={3}>
            {/* ✅ Seul le texte monte (fusée reste à sa place) */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 26,
                  mt: -12, // ✅ ICI : remonte seulement le texte (essaie -1, -2)
                }}
              >
                Reste motivé
              </Typography>

              <RocketLaunchIcon sx={{ fontSize: 26, mt: -12 }} />
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <FormControl>
                  <TextField
                    className="field3d"
                    name="usernameOrEmail"
                    id="usernameOrEmail"
                    placeholder="Entrer votre email ou nom"
                    required
                    fullWidth
                    error={userError}
                    helperText={userErrorMessage}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon sx={{ color: primaryColor }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    className="field3d"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Entrer votre mot de passe"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: primaryColor }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="btn-main"
                >
                  Se connecter
                </Button>
              </Stack>
            </Box>

            <Divider>
              <Typography variant="body2">ou continuer avec</Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              className="btn-google"
              onClick={() => {
                window.location.href = googleLoginUrl;
              }}
            >
              Login avec Google
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              Nouveau ici ?{" "}
              <Link href="/sign-up" underline="none" sx={{ fontWeight: 800 }}>
                Créer un compte gratuit
              </Link>
            </Typography>
          </Stack>
        </div>
      </Box>

      <Box sx={{ py: 2, textAlign: "center" }} />
    </Box>
  );
}
