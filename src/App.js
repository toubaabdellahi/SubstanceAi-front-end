import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import GoogleAuthSuccess from "./pages/GoogleAuthSuccess";
import ProfilingTest from "./pages/ProfilingTest";
import PdfManager from "./pages/PdfManager";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
          <Route path="/profiling-test" element={<ProfilingTest />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/pdf-manager"
            element={
              <ProtectedRoute>
                <PdfManager />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
