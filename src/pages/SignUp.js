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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // ✅ icône "sparkle" comme l'image
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  // États pour la validation
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
    `&scope=email%20profile` +
    `&access_type=offline` +
    `&prompt=consent`;

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
        alert(result.message || "Erreur lors de l'inscription.");
        return;
      }

      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/profiling-test");
      } else {
        alert("Inscription réussie ! Veuillez vous connecter.");
        navigate("/login");
      }
    } catch (error) {
      alert("Erreur réseau ou serveur.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      {/* ✅ Même background que Login */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        body{
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          background: #F9FDFC;
        }

        .signup-panel{
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
          .signup-panel{ padding: 16px; }
        }
      `}</style>

      {/* HEADER (même style SubstancIA) */}
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
        <div className="signup-panel">
          <Stack spacing={3}>
            {/* ✅ Remplace "Go" par "Créer un compte" + icône sparkle blanche */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 26,
                  mt: "-12px", // ✅ même effet que Login
                }}
              >
                Créer un compte
              </Typography>

              {/* ✅ icône "sparkle" en blanc */}
              <Box
                sx={{
                  mt: "-12px",
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  background: primaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 24px rgba(26,115,232,0.22)",
                }}
              >
                <AutoAwesomeIcon sx={{ color: "#fff", fontSize: 26 }} />
              </Box>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <FormControl>
                  <TextField
                    className="field3d"
                    id="name"
                    name="name"
                    placeholder="Nom complet"
                    required
                    fullWidth
                    error={nameError}
                    helperText={nameErrorMessage}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeOutlinedIcon sx={{ color: primaryColor }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    className="field3d"
                    id="username"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    required
                    fullWidth
                    error={usernameError}
                    helperText={usernameErrorMessage}
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
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    fullWidth
                    error={emailError}
                    helperText={emailErrorMessage}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: primaryColor }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    className="field3d"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    required
                    fullWidth
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
                  S'inscrire
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
              S'inscrire avec Google
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              Déjà un compte ?{" "}
              <Link
                onClick={() => navigate("/login")}
                underline="none"
                sx={{ fontWeight: 800, cursor: "pointer" }}
              >
                Se connecter
              </Link>
            </Typography>
          </Stack>
        </div>
      </Box>

      <Box sx={{ py: 2, textAlign: "center" }} />
    </Box>
  );
}
