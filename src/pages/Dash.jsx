import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Button,
  Avatar,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  DescriptionOutlined as FileIcon,
  SettingsOutlined as SettingsIcon,
  GridView as GridIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// --- STYLED COMPONENTS ---

const NotebookCard = styled(Paper)(({ theme }) => ({
  borderRadius: "24px",
  padding: "24px",
  height: "220px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  backgroundColor: "#ffffff",
  border: "1px solid #eef0f2",
  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    borderColor: "#1a73e8",
  },
}));

const CreateCard = styled(NotebookCard)({
  border: "2px dashed #d1d9e0",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#f8faff",
    borderColor: "#1a73e8",
  },
});

const IconWrapper = styled(Box)(({ color }) => ({
  width: "48px",
  height: "48px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color || "#f1f3f4",
  marginBottom: "16px",
}));

// --- COMPOSANT PRINCIPAL ---

const ModernDash = ({ onSelectNotebook }) => {
  const [notebooks, setNotebooks] = useState([
    {
      id: 1,
      title: "Foundations of Linear Algebra and Matrix...",
      date: "Jan 10, 2026",
      sources: 1,
      color: "#e8f0fe",
    },
    {
      id: 2,
      title: "Droit Constitutionnel : Les bases",
      date: "Jan 08, 2026",
      sources: 3,
      color: "#fef7e0",
    },
    {
      id: 3,
      title: "Analyse de Données Python",
      date: "Jan 05, 2026",
      sources: 12,
      color: "#e6f4ea",
    },
  ]);

  return (
    <Box sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <Box
        sx={{
          px: 4,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box component="span" sx={{ color: "#1a73e8" }}>
            ●
          </Box>{" "}
          NotebookLM Clone
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Rechercher..."
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{ color: "text.secondary", mr: 1 }}
                  fontSize="small"
                />
              ),
              sx: { borderRadius: "20px", bgcolor: "#f1f3f4", border: "none" },
            }}
          />
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: "#004d40",
              width: 32,
              height: 32,
              fontSize: "0.8rem",
            }}
          >
            O
          </Avatar>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ mb: 4, color: "#202124" }}
        >
          Recent notebooks
        </Typography>

        <Grid container spacing={3}>
          {/* CARTE CREER */}
          <Grid item xs={12} sm={6} md={3}>
            <CreateCard elevation={0}>
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "#e8f0fe",
                    color: "#1a73e8",
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <AddIcon />
                </Avatar>
                <Typography fontWeight={600}>Create new notebook</Typography>
              </Box>
            </CreateCard>
          </Grid>

          {/* LISTE DES NOTEBOOKS */}
          {notebooks.map((nb) => (
            <Grid item xs={12} sm={6} md={3} key={nb.id}>
              <NotebookCard elevation={0} onClick={() => onSelectNotebook(nb)}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <IconWrapper color={nb.color}>
                      <FileIcon sx={{ color: "#5f6368" }} />
                    </IconWrapper>
                    <IconButton size="small">
                      <MoreIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {nb.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    {nb.date} • {nb.sources} source{nb.sources > 1 ? "s" : ""}
                  </Typography>
                </Box>
              </NotebookCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ModernDash;
