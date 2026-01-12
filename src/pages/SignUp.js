// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CssBaseline,
//   Divider,
//   FormControl,
//   FormLabel,
//   Link,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
// import { useNavigate } from "react-router-dom";

// export default function SignUp() {
//   const navigate = useNavigate();

//   const [emailError, setEmailError] = useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = useState("");
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
//   const [nameError, setNameError] = useState(false);
//   const [nameErrorMessage, setNameErrorMessage] = useState("");
//   const [usernameError, setUsernameError] = useState(false);
//   const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
//   const GOOGLE_CLIENT_ID =
//     "76497721292-2fmahu68t6r2vaiupdmq6rbbtqsm3jq5.apps.googleusercontent.com";
//   const REDIRECT_URI =
//     "https://substanceai-back-end.onrender.com/api/auth/login/google/callback/";
//   //const REDIRECT_URI = "http://localhost:3000/auth/google/callback";
//   const googleLoginUrl =
//     `https://accounts.google.com/o/oauth2/auth?` +
//     `client_id=${GOOGLE_CLIENT_ID}` +
//     `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
//     `&response_type=code` +
//     `&scope=email%20profile`;
//   const validateInputs = () => {
//     const email = document.getElementById("email");
//     const password = document.getElementById("password");
//     const name = document.getElementById("name");
//     const username = document.getElementById("username");

//     let isValid = true;

//     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
//       setEmailError(true);
//       setEmailErrorMessage("Please enter a valid email address.");
//       isValid = false;
//     } else {
//       setEmailError(false);
//       setEmailErrorMessage("");
//     }

//     if (!password.value || password.value.length < 6) {
//       setPasswordError(true);
//       setPasswordErrorMessage("Password must be at least 6 characters long.");
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordErrorMessage("");
//     }

//     if (!name.value || name.value.length < 1) {
//       setNameError(true);
//       setNameErrorMessage("Full name is required.");
//       isValid = false;
//     } else {
//       setNameError(false);
//       setNameErrorMessage("");
//     }

//     if (!username.value || username.value.length < 3) {
//       setUsernameError(true);
//       setUsernameErrorMessage("Username must be at least 3 characters.");
//       isValid = false;
//     } else {
//       setUsernameError(false);
//       setUsernameErrorMessage("");
//     }

//     return isValid;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateInputs()) return;

//     const data = new FormData(event.currentTarget);
//     const payload = {
//       fullname: data.get("name"),
//       username: data.get("username"),
//       email: data.get("email"),
//       password: data.get("password"),
//     };

//     try {
//       const res = await fetch(
//         "https://substanceai-back-end.onrender.com/api/auth/register/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//     if (!res.ok) {
//       const errorData = await res.json();
//       alert(errorData.error || "Erreur lors de l'inscription.");
//       return;
//     }

//     const result = await res.json();

//     // Supposons que ton backend renvoie un token JWT dans result.token
//     const token = result.token;
//     if (token) {
//       // Stockage du token JWT côté client (ici localStorage)
//       localStorage.setItem("token", token);

//       // Optionnel : tu peux aussi stocker les infos utilisateur
//       localStorage.setItem("user", JSON.stringify(result.user));

//       // Redirection après inscription
//       navigate("/profiling-test");

//       //navigate("/pdf-manager");
//     } else {
//       alert("Inscription réussie mais pas de token reçu.");
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
//           overflow: "hidden",
//         }}
//       >
//         <Card
//           sx={{
//             width: "100%",
//             maxWidth: 400,
//             p: 2,
//             boxShadow: 3,
//             maxHeight: "90vh",
//             overflowY: "auto",
//           }}
//         >
//           <Stack spacing={1}>
//             <Typography component="h1" variant="h5" textAlign="center" mb={1}>
//               Sign up
//             </Typography>

//             <Box component="form" onSubmit={handleSubmit} noValidate>
//               <Stack spacing={1}>
//                 <FormControl>
//                   <FormLabel htmlFor="name" sx={{ fontSize: "0.9rem" }}>
//                     Full Name
//                   </FormLabel>
//                   <TextField
//                     autoComplete="name"
//                     name="name"
//                     required
//                     fullWidth
//                     id="name"
//                     placeholder="Full Name"
//                     error={nameError}
//                     helperText={nameErrorMessage}
//                     size="small"
//                   />
//                 </FormControl>

//                 <FormControl>
//                   <FormLabel htmlFor="username" sx={{ fontSize: "0.9rem" }}>
//                     Username
//                   </FormLabel>
//                   <TextField
//                     autoComplete="username"
//                     name="username"
//                     required
//                     fullWidth
//                     id="username"
//                     placeholder="Username"
//                     error={usernameError}
//                     helperText={usernameErrorMessage}
//                     size="small"
//                   />
//                 </FormControl>

//                 <FormControl>
//                   <FormLabel htmlFor="email" sx={{ fontSize: "0.9rem" }}>
//                     Email
//                   </FormLabel>
//                   <TextField
//                     required
//                     fullWidth
//                     id="email"
//                     placeholder="Your email"
//                     name="email"
//                     autoComplete="email"
//                     error={emailError}
//                     helperText={emailErrorMessage}
//                     size="small"
//                   />
//                 </FormControl>

//                 <FormControl>
//                   <FormLabel htmlFor="password" sx={{ fontSize: "0.9rem" }}>
//                     Password
//                   </FormLabel>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     placeholder="••••••"
//                     type="password"
//                     id="password"
//                     autoComplete="new-password"
//                     error={passwordError}
//                     helperText={passwordErrorMessage}
//                     size="small"
//                   />
//                 </FormControl>

//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   size="medium"
//                   sx={{ mt: 1 }}
//                 >
//                   Sign up
//                 </Button>
//               </Stack>
//             </Box>

//             <Divider sx={{ my: 1 }}>
//               <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
//                 or
//               </Typography>
//             </Divider>

//             <Stack spacing={0.5}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 startIcon={<GoogleIcon />}
//                 onClick={() => {
//                   window.location.href = googleLoginUrl;
//                 }}
//                 size="small"
//               >
//                 Sign up with Google
//               </Button>
//             </Stack>

//             <Typography
//               sx={{ textAlign: "center", fontSize: "0.85rem", mt: 1 }}
//             >
//               Already have an account?{" "}
//               <Link href="/login" variant="body2" sx={{ fontSize: "0.85rem" }}>
//                 Sign in
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
  Divider,
  FormControl,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const GOOGLE_CLIENT_ID =
    "76497721292-2fmahu68t6r2vaiupdmq6rbbtqsm3jq5.apps.googleusercontent.com";
  const REDIRECT_URI =
    "https://substanceai-back-end.onrender.com/api/auth/login/google/callback/";

  const googleLoginUrl =
    `https://accounts.google.com/o/oauth2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=email%20profile`;

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");
    const username = document.getElementById("username");
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Email invalide.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Min. 6 caractères.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value) {
      setNameError(true);
      setNameErrorMessage("Nom requis.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!username.value || username.value.length < 3) {
      setUsernameError(true);
      setUsernameErrorMessage("Min. 3 caractères.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const payload = {
      fullname: data.get("name"),
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const res = await fetch(
        "https://substanceai-back-end.onrender.com/api/auth/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        const errorData = await res.json();
        alert(result.message || "Erreur lors de l'inscription.");
        return;
      }

      // Supposons que ton backend renvoie un token JWT dans result.token
      const token = result.token;
      if (token) {
        // Stockage du token JWT côté client (ici localStorage)
        localStorage.setItem("token", token);

        // Optionnel : tu peux aussi stocker les infos utilisateur
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirection après inscription
        navigate("/profiling-test");

        //navigate("/pdf-manager");
      } else {
        alert("Inscription réussie mais pas de token reçu.");
      }
    } catch (error) {
      alert("Erreur réseau ou serveur.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
      }}
    >
      <CssBaseline />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        body {
          background: radial-gradient(circle at top left, #eff6ff 0%, #ffffff 40%) !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          margin: 0; padding: 0;
        }
      `}</style>

      {/* HEADER LOGO */}
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
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
            sx={{ fontSize: "22px", fontWeight: 800, color: "#1a73e8" }}
          >
            SubstancIA
          </Typography>
        </Box>
      </Box>

      {/* FORMULAIRE - Centré mais avec scroll autorisé */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          pb: 5,
        }}
      >
        <Card
          sx={{
            width: "90%",
            maxWidth: 450,
            p: { xs: 3, md: 5 },
            borderRadius: "32px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
            bgcolor: "#fff",
          }}
        >
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography sx={{ fontSize: "26px", fontWeight: 800 }}>
                Créer un compte ✨
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: "14px" }}>
                Rejoignez SubstancIA aujourd'hui.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel
                    sx={{ fontSize: "13px", fontWeight: 700, mb: 0.5 }}
                  >
                    Nom Complet
                  </FormLabel>
                  <TextField
                    size="small"
                    name="name"
                    id="name"
                    placeholder="Jean Dupont"
                    required
                    fullWidth
                    error={nameError}
                    helperText={nameErrorMessage}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    sx={{ fontSize: "13px", fontWeight: 700, mb: 0.5 }}
                  >
                    Nom d'utilisateur
                  </FormLabel>
                  <TextField
                    size="small"
                    name="username"
                    id="username"
                    placeholder="jeandupont"
                    required
                    fullWidth
                    error={usernameError}
                    helperText={usernameErrorMessage}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    sx={{ fontSize: "13px", fontWeight: 700, mb: 0.5 }}
                  >
                    Email
                  </FormLabel>
                  <TextField
                    size="small"
                    name="email"
                    id="email"
                    placeholder="jean@exemple.com"
                    required
                    fullWidth
                    error={emailError}
                    helperText={emailErrorMessage}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    sx={{ fontSize: "13px", fontWeight: 700, mb: 0.5 }}
                  >
                    Mot de passe
                  </FormLabel>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.5,
                    mt: 1,
                    borderRadius: "10px",
                    bgcolor: "#1a73e8",
                    fontWeight: 800,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#111827" },
                  }}
                >
                  S'inscrire
                </Button>
              </Stack>
            </Box>

            <Divider>
              <Typography sx={{ color: "#94a3b8", fontSize: "12px", px: 1 }}>
                ou
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
                py: 1.2,
                borderRadius: "10px",
                fontWeight: 700,
                textTransform: "none",
                color: "#475569",
                borderColor: "#e2e8f0",
              }}
            >
              Google
            </Button>

            <Typography sx={{ textAlign: "center", fontSize: "14px" }}>
              Déjà un compte ?{" "}
              <Link
                href="/login"
                sx={{
                  color: "#1a73e8",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Se connecter
              </Link>
            </Typography>
          </Stack>
        </Card>
      </Box>

      {/* FOOTER BAS DE PAGE */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "12px",
          mt: "auto",
        }}
      >
        © 2026 SubstancIA
      </Box>
    </Box>
  );
}
