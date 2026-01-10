// src/services/api.js
import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true,
});

// export des loginUser et signUpUser avec fetch ici...

// export const loginUser = async (credentials) => {
//   const response = await API.post("/login/", credentials);
//   return response.data;
// };
export const loginUser = async (payload) => {
  const response = await fetch("http://localhost:8000/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};
export async function signUpUser(data) {
  try {
    const res = await fetch("http://localhost:8000/api/auth/register/", {
      method: "POST",
      credentials: "include", // pour envoyer les cookies (utile si tu configures des sessions côté backend)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Erreur lors de l'inscription.");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Erreur réseau.");
  }
}

// =========================
// 🔹 PROFILING (MongoDB + Gemini)
// =========================

// Instance pour le profil
const API_PROFIL = axios.create({
  baseURL: "http://localhost:8000/api/profil/",
});

// Ajouter automatiquement le token JWT si présent
API_PROFIL.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -------------------------
// 🚀 1️⃣ START PROFILING
// POST /api/profil/start/
// -------------------------
export const startProfiling = async (userId, maxQuestions = 5) => {
  const res = await API_PROFIL.post("start/", {
    user_id: userId,
    max_questions: maxQuestions,
  });

  return res.data;
};

// -------------------------
// 🚀 2️⃣ ANSWER PROFILING
// POST /api/profil/answer/
// -------------------------
export const answerProfiling = async (payload) => {
  // { user_id, reponse, questions_reponses, max_questions }
  const res = await API_PROFIL.post("answer/", payload);
  return res.data;
};

// -------------------------
// 🚀 3️⃣ GET USER PROFILE
// GET /api/profil/recuperer/<user_id>/
// ✅ Correction :
export const getUserProfile = async (userId) => {
  const res = await API_PROFIL.get(`recuperer/${userId}/`); // ✅ Parenthèses
  return res.data;
};

// =========================

export const uploadPDF = async (formData) => {
  const response = await API.post("/auth/upload-pdf/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // { file_ids: [] }
};

export const askModel = async (message, fileIds) => {
  const response = await API.post("/ask/", {
    message: message,
    file_ids: fileIds,
  });
  return response.data; // { answer, sources }
};
