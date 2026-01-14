// import React, { useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import {
//   Box,
//   TextField,
//   IconButton,
//   CircularProgress,
//   InputAdornment,
//   Paper,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Button,
//   Typography,
//   styled,
//   CssBaseline,
//   AppBar,
//   Toolbar,
//   Chip,
// } from "@mui/material";
// import {
//   AttachFile as AttachFileIcon,
//   Send as SendIcon,
//   Menu as MenuIcon,
//   History as HistoryIcon,
//   Add as AddIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";

// const NewChatButton = styled(Button)(({ theme }) => ({
//   borderRadius: "12px",
//   padding: "12px 24px",
//   margin: "16px",
//   backgroundColor: theme.palette.primary.main,
//   color: "white",
//   fontWeight: 500,
//   fontSize: "0.875rem",
//   textTransform: "none",
//   boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.dark,
//     transform: "translateY(-2px)",
//     boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
//   },
//   "& .MuiButton-startIcon": {
//     marginRight: "8px",
//   },
// }));

// function PdfManager() {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showWelcome, setShowWelcome] = useState(true);

//   const token = localStorage.getItem("token");
//   const decoded = jwtDecode(token);
//   const userId = decoded.user_id;
//   const userName = localStorage.getItem("userName");

//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const handleFileChange = (e) => {
//     setSelectedFiles(Array.from(e.target.files));
//     setShowWelcome(false);
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length === 0 && !message.trim()) return;

//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append("file", file);
//     });
//     formData.append("user_id", userId);
//     formData.append("message", message);

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "https://substanceai-back-end.onrender.com/api/auth/upload-pdf/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const newChatItem = {
//         id: response.data.file_ids[0], // Utilise l'ObjectId retourné par le backend
//         text: message,
//         files: selectedFiles.map((f) => f.name),
//         timestamp: new Date().toLocaleTimeString(),
//         date: new Date().toLocaleDateString("en-US", {
//           month: "long",
//           day: "numeric",
//           year: "numeric",
//         }),
//       };
//       setChatHistory((prev) => [newChatItem, ...prev]);
//       setShowWelcome(false);
//       setSelectedFiles([]);
//       setMessage("");
//     } catch (error) {
//       console.error("Erreur :", error);
//       alert("Échec de l'envoi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleUpload();
//   };

//   const triggerFileInput = () => {
//     document.getElementById("file-input").click();
//   };

//   const startNewChat = () => {
//     setMessage("");
//     setSelectedFiles([]);
//     setShowWelcome(true);
//   };

//   const handleDownload = async (fileId, fileName) => {
//     try {
//       // Validation de l'ID
//       if (!fileId || !/^[0-9a-f]{24}$/i.test(fileId)) {
//         throw new Error(
//           `ID ${fileId} invalide - Format MongoDB requis (24 caractères hexadécimaux)`
//         );
//       }

//       const response = await axios.get(
//         `https://substanceai-back-end.onrender.com/api/auth/download_pdf/${fileId}/`,
//         {
//           responseType: "blob",
//           timeout: 10000,
//         }
//       );

//       // Extraction du nom de fichier
//       const contentDisposition = response.headers["content-disposition"];
//       const finalFileName =
//         fileName ||
//         (contentDisposition
//           ? contentDisposition.split("filename=")[1].replace(/"/g, "")
//           : `document_${fileId.slice(-6)}.pdf`);

//       // Création du lien de téléchargement
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = finalFileName;
//       document.body.appendChild(link);
//       link.click();

//       // Nettoyage
//       setTimeout(() => {
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//       }, 100);
//     } catch (error) {
//       console.error("Erreur de téléchargement:", {
//         id: fileId,
//         error: error.response?.data || error.message,
//       });
//       alert(error.response?.data?.message || "Échec du téléchargement");
//     }
//   };

//   const groupedHistory = chatHistory.reduce((acc, chat) => {
//     const date = chat.date || "Autres";
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(chat);
//     return acc;
//   }, {});

//   return (
//     <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f7fa" }}>
//       <CssBaseline />

//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           bgcolor: "#ffffff",
//           color: "#000000",
//           boxShadow: "none",
//           borderBottom: "1px solid #e0e0e0",
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             sx={{ mr: 2, color: "#000000" }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, fontWeight: "bold" }}
//           >
//             Substance IA
//           </Typography>
//           <Typography variant="subtitle1" sx={{ mr: 2 }}>
//             {userName}
//           </Typography>
//           <IconButton
//             color="inherit"
//             onClick={logout}
//             sx={{ color: "#000000" }}
//           >
//             <LogoutIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="persistent"
//         anchor="left"
//         open={sidebarOpen}
//         sx={{
//           width: 300,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: 300,
//             boxSizing: "border-box",
//             marginTop: "64px",
//             bgcolor: "#ffffff",
//             borderRight: "1px solid #e0e0e0",
//           },
//         }}
//       >
//         <Box sx={{ overflow: "auto" }}>
//           <NewChatButton
//             fullWidth
//             startIcon={<AddIcon />}
//             onClick={startNewChat}
//           >
//             New Chat
//           </NewChatButton>

//           <Divider sx={{ my: 1 }} />

//           <List>
//             <ListItem>
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                 <HistoryIcon sx={{ mr: 1, verticalAlign: "middle" }} />
//                 History
//               </Typography>
//             </ListItem>

//             {Object.entries(groupedHistory).map(([date, chats]) => (
//               <React.Fragment key={date}>
//                 <Typography
//                   variant="caption"
//                   sx={{ px: 2, display: "block", color: "text.secondary" }}
//                 >
//                   {date}
//                 </Typography>
//                 {chats.map((chat) => (
//                   <React.Fragment key={chat.id}>
//                     <ListItem
//                       button
//                       onClick={() => {
//                         setMessage(chat.text);
//                         setShowWelcome(false);
//                       }}
//                       sx={{ py: 1 }}
//                     >
//                       <ListItemText
//                         primary={chat.text || "(No text)"}
//                         secondary={
//                           <>
//                             {chat.files.length > 0 && (
//                               <Box component="span">
//                                 Files:{" "}
//                                 {chat.files.map((file) => (
//                                   <span
//                                     key={file}
//                                     style={{
//                                       color: "#1976d2",
//                                       textDecoration: "underline",
//                                       cursor: "pointer",
//                                       marginRight: "8px",
//                                     }}
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleDownload(chat.id, file);
//                                     }}
//                                   >
//                                     {file}
//                                   </span>
//                                 ))}
//                               </Box>
//                             )}
//                             {chat.files.length > 0 && <br />}
//                             {chat.timestamp}
//                           </>
//                         }
//                         sx={{
//                           "& .MuiListItemText-primary": {
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             fontSize: "0.875rem",
//                           },
//                           "& .MuiListItemText-secondary": {
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             fontSize: "0.75rem",
//                           },
//                         }}
//                       />
//                     </ListItem>
//                     <Divider />
//                   </React.Fragment>
//                 ))}
//               </React.Fragment>
//             ))}

//             {chatHistory.length === 0 && (
//               <ListItem>
//                 <ListItemText secondary="No chat history yet" />
//               </ListItem>
//             )}
//           </List>
//         </Box>
//       </Drawer>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           marginTop: "64px",
//           marginLeft: sidebarOpen ? "300px" : "0px",
//           transition: (theme) =>
//             theme.transitions.create("margin", {
//               easing: theme.transitions.easing.sharp,
//               duration: theme.transitions.duration.leavingScreen,
//             }),
//           display: "flex",
//           flexDirection: "column",
//           height: "calc(100vh - 64px)",
//         }}
//       >
//         {showWelcome && chatHistory.length === 0 ? (
//           <Box
//             sx={{
//               flex: 1,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               textAlign: "center",
//               maxWidth: "800px",
//               margin: "0 auto",
//             }}
//           >
//             <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
//               Welcome to the Chatbot
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{ mb: 4, color: "text.secondary" }}
//             >
//               Your Personal AI Companion
//             </Typography>

//             <Typography variant="h6" sx={{ mb: 3 }}>
//               Explore various subjects
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 justifyContent: "center",
//                 gap: 2,
//                 mb: 6,
//                 maxWidth: "600px",
//               }}
//             >
//               {[
//                 "Can you provide an overview of the latest advancements in chatbot intelligence?",
//                 "What are some effective strategies for improving productivity and time management?",
//                 "How can I enhance my skills in office management departments?",
//               ].map((text) => (
//                 <Chip
//                   key={text}
//                   label={text}
//                   onClick={() => {
//                     setMessage(text);
//                     setShowWelcome(false);
//                   }}
//                   sx={{
//                     borderRadius: "16px",
//                     p: 1.5,
//                     maxWidth: "100%",
//                     cursor: "pointer",
//                     "&:hover": {
//                       backgroundColor: "action.hover",
//                     },
//                   }}
//                 />
//               ))}
//             </Box>

//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 bgcolor: "background.paper",
//                 borderRadius: "12px",
//                 textAlign: "center",
//                 maxWidth: "400px",
//               }}
//             >
//               <Typography
//                 variant="subtitle2"
//                 sx={{ fontWeight: "bold", mb: 1 }}
//               >
//                 Upgrade Premium
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ color: "text.secondary", mb: 2 }}
//               >
//                 Basic space map version
//               </Typography>
//               <Button variant="contained" color="primary">
//                 Upgrade Now
//               </Button>
//             </Paper>
//           </Box>
//         ) : (
//           <Box sx={{ flex: 1, overflow: "auto", mb: 2 }}>
//             {chatHistory.map((chat) => (
//               <Paper
//                 key={chat.id}
//                 sx={{ p: 2, mb: 2, bgcolor: "background.paper" }}
//               >
//                 <Typography variant="body1">{chat.text}</Typography>
//                 {chat.files.length > 0 && (
//                   <Box sx={{ mt: 1 }}>
//                     <Typography variant="caption" color="text.secondary">
//                       Files:{" "}
//                       {chat.files.map((file) => (
//                         <span
//                           key={file}
//                           style={{
//                             color: "#1976d2",
//                             textDecoration: "underline",
//                             cursor: "pointer",
//                             marginRight: "8px",
//                           }}
//                           onClick={() => handleDownload(chat.id, file)}
//                         >
//                           {file}
//                         </span>
//                       ))}
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             ))}
//           </Box>
//         )}

//         <Paper
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             borderRadius: "24px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             border: isFocused
//               ? "1px solid #10a37f"
//               : "1px solid rgba(0, 0, 0, 0.1)",
//             transition: "all 0.2s ease",
//             p: 1,
//             bgcolor: "background.paper",
//           }}
//         >
//           <TextField
//             fullWidth
//             variant="standard"
//             placeholder="Ask anything or upload files..."
//             value={message}
//             onChange={(e) => {
//               setMessage(e.target.value);
//               if (e.target.value) setShowWelcome(false);
//             }}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             InputProps={{
//               disableUnderline: true,
//               sx: { px: 2, py: 1 },
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <IconButton
//                     onClick={triggerFileInput}
//                     edge="start"
//                     aria-label="upload file"
//                   >
//                     <AttachFileIcon
//                       color={selectedFiles.length > 0 ? "primary" : "action"}
//                     />
//                   </IconButton>
//                   <input
//                     id="file-input"
//                     type="file"
//                     accept="application/pdf"
//                     multiple
//                     onChange={handleFileChange}
//                     hidden
//                   />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     type="submit"
//                     disabled={
//                       loading || (selectedFiles.length === 0 && !message.trim())
//                     }
//                     aria-label="send"
//                   >
//                     {loading ? (
//                       <CircularProgress size={24} />
//                     ) : (
//                       <SendIcon
//                         color={
//                           selectedFiles.length > 0 || message.trim()
//                             ? "primary"
//                             : "disabled"
//                         }
//                       />
//                     )}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Paper>

//         {selectedFiles.length > 0 && (
//           <Box sx={{ mt: 1, px: 2 }}>
//             <Typography variant="caption" color="text.secondary">
//               Selected files: {selectedFiles.map((f) => f.name).join(", ")}
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default PdfManager;

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import pour la redirection
// import { jwtDecode } from "jwt-decode";
// import {
//   Box,
//   IconButton,
//   CircularProgress,
//   Paper,
//   Typography,
//   styled,
//   CssBaseline,
//   Avatar,
//   Button,
//   Grid,
//   InputBase,
//   Tooltip,
//   Fade,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   SmartToy as RobotIcon,
//   Person as UserIcon,
//   Description as PdfIcon,
//   AutoAwesome as MagicIcon,
//   MenuBook as QuizIcon,
//   Hub as MindMapIcon,
//   Style as FlashcardIcon,
//   Share as ShareIcon,
//   Send as SendIcon,
//   ChatBubbleOutline as ChatIcon,
//   AddComment as NewChatIcon,
//   DeleteOutline as DeleteIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   Logout as LogoutIcon, // Import de l'icône de déconnexion
// } from "@mui/icons-material";

// // --- STYLED COMPONENTS ---
// const MainContainer = styled(Box)({
//   display: "flex",
//   height: "100vh",
//   backgroundColor: "#f0f2f9",
//   padding: "12px",
//   gap: "12px",
// });

// const ColumnPaper = styled(Paper)({
//   height: "100%",
//   borderRadius: "24px",
//   display: "flex",
//   flexDirection: "column",
//   backgroundColor: "#ffffff",
//   border: "1px solid #e0e4f0",
//   boxShadow: "none",
//   overflow: "hidden",
// });

// const HistoryItem = styled(Button)(({ active }) => ({
//   justifyContent: "flex-start",
//   textTransform: "none",
//   width: "100%",
//   padding: "12px 16px",
//   borderRadius: "14px",
//   marginBottom: "6px",
//   color: active ? "#1a73e8" : "#5f6368",
//   backgroundColor: active ? "#e8f0fe" : "transparent",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     backgroundColor: active ? "#d2e3fc" : "#f1f3f4",
//     "& .delete-icon": { opacity: 1 },
//   },
//   "& .MuiTypography-root": {
//     fontSize: "0.85rem",
//     fontWeight: active ? 600 : 500,
//     textAlign: "left",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//   },
// }));

// const StudioCard = styled(Button)(({ bgcolor }) => ({
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "flex-start",
//   padding: "14px",
//   borderRadius: "14px",
//   textTransform: "none",
//   width: "100%",
//   backgroundColor: bgcolor || "#f8f9fa",
//   border: "1px solid #f0f0f0",
//   color: "#3c4043",
//   gap: "12px",
//   "&:hover": { opacity: 0.9, backgroundColor: bgcolor },
// }));

// function PdfManager() {
//   const navigate = useNavigate();

//   // --- ÉTATS PERSISTANTS ---
//   const [conversations, setConversations] = useState(() => {
//     const saved = localStorage.getItem("notebook_history");
//     return saved
//       ? JSON.parse(saved)
//       : [{ id: "1", title: "Ma première note", history: [], sources: [] }];
//   });
//   const [activeChatId, setActiveChatId] = useState(conversations[0]?.id || "1");

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showHistory, setShowHistory] = useState(true);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const scrollRef = useRef(null);

//   const userName = localStorage.getItem("userName") || "User";

//   useEffect(() => {
//     localStorage.setItem("notebook_history", JSON.stringify(conversations));
//     if (scrollRef.current)
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [conversations]);

//   const currentChat =
//     conversations.find((c) => c.id === activeChatId) || conversations[0];

//   // --- LOGIQUE ACTIONS ---

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userName");
//     // Optionnel : localStorage.removeItem("notebook_history"); si vous voulez vider l'historique au logout
//     navigate("/"); // Redirige vers la page d'accueil
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setOpenSnackbar(true);
//   };

//   const createNewChat = () => {
//     const newId = Date.now().toString();
//     const newChat = {
//       id: newId,
//       title: "Nouveau Chat",
//       history: [],
//       sources: [],
//     };
//     setConversations([newChat, ...conversations]);
//     setActiveChatId(newId);
//   };

//   const deleteChat = (e, id) => {
//     e.stopPropagation();
//     const filtered = conversations.filter((c) => c.id !== id);
//     if (filtered.length === 0) {
//       setConversations([
//         {
//           id: Date.now().toString(),
//           title: "Nouveau Chat",
//           history: [],
//           sources: [],
//         },
//       ]);
//     } else {
//       setConversations(filtered);
//       if (activeChatId === id) setActiveChatId(filtered[0].id);
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
//     const newSources = files.map((f) => ({
//       name: f.name,
//       id: Date.now() + Math.random(),
//     }));

//     setConversations((prev) =>
//       prev.map((chat) =>
//         chat.id === activeChatId
//           ? { ...chat, sources: [...chat.sources, ...newSources] }
//           : chat
//       )
//     );
//   };

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const userMsg = {
//       id: Date.now(),
//       text: message,
//       isUser: true,
//       timestamp: new Date().toLocaleTimeString(),
//     };

//     setConversations((prev) =>
//       prev.map((chat) => {
//         if (chat.id === activeChatId) {
//           const isFirst = chat.history.length === 0;
//           return {
//             ...chat,
//             history: [...chat.history, userMsg],
//             title: isFirst
//               ? message.length > 20
//                 ? message.substring(0, 20) + "..."
//                 : message
//               : chat.title,
//           };
//         }
//         return chat;
//       })
//     );

//     setLoading(true);
//     const textToSend = message;
//     setMessage("");

//     try {
//       const res = await axios.post("http://localhost:8000/api/ask/", {
//         message: textToSend,
//       });
//       const botMsg = {
//         id: Date.now() + 1,
//         answer: res.data.answer,
//         isUser: false,
//         timestamp: new Date().toLocaleTimeString(),
//       };

//       setConversations((prev) =>
//         prev.map((chat) =>
//           chat.id === activeChatId
//             ? { ...chat, history: [...chat.history, botMsg] }
//             : chat
//         )
//       );
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainContainer>
//       <CssBaseline />

//       {/* --- COLONNE GAUCHE : HISTORIQUE, SOURCES ET LOGOUT --- */}
//       <Box
//         sx={{
//           width: showHistory ? "300px" : "80px",
//           transition: "width 0.3s ease",
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <ColumnPaper sx={{ flex: 1, p: 2 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//             }}
//           >
//             {showHistory && (
//               <Typography
//                 variant="subtitle2"
//                 sx={{ fontWeight: 800, color: "#5f6368" }}
//               >
//                 NOTEBOOKS
//               </Typography>
//             )}
//             <IconButton onClick={() => setShowHistory(!showHistory)}>
//               {showHistory ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//             </IconButton>
//           </Box>

//           {showHistory && (
//             <>
//               <Button
//                 fullWidth
//                 startIcon={<NewChatIcon />}
//                 onClick={createNewChat}
//                 sx={{
//                   mb: 3,
//                   borderRadius: "12px",
//                   py: 1.2,
//                   textTransform: "none",
//                   bgcolor: "#1a73e8",
//                   color: "white",
//                   "&:hover": { bgcolor: "#1765cc" },
//                 }}
//               >
//                 Nouveau Chat
//               </Button>

//               <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
//                 {conversations.map((chat) => (
//                   <HistoryItem
//                     key={chat.id}
//                     active={chat.id === activeChatId}
//                     onClick={() => setActiveChatId(chat.id)}
//                     startIcon={<ChatIcon fontSize="small" />}
//                   >
//                     <Typography variant="body2" sx={{ flex: 1 }}>
//                       {chat.title}
//                     </Typography>
//                     <IconButton
//                       className="delete-icon"
//                       size="small"
//                       sx={{ opacity: 0, p: 0 }}
//                       onClick={(e) => deleteChat(e, chat.id)}
//                     >
//                       <DeleteIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                   </HistoryItem>
//                 ))}
//               </Box>

//               <Box sx={{ borderTop: "1px solid #eee", pt: 2, mb: 2 }}>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     fontWeight: 700,
//                     color: "#5f6368",
//                     mb: 1,
//                     display: "block",
//                   }}
//                 >
//                   SOURCES
//                 </Typography>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   size="small"
//                   startIcon={<AddIcon />}
//                   onClick={() => document.getElementById("file-input").click()}
//                   sx={{ borderRadius: "10px", textTransform: "none", mb: 2 }}
//                 >
//                   Ajouter PDF
//                 </Button>
//                 <input
//                   id="file-input"
//                   type="file"
//                   hidden
//                   multiple
//                   onChange={handleFileChange}
//                 />

//                 <Box sx={{ maxHeight: "150px", overflowY: "auto" }}>
//                   {currentChat.sources.map((s) => (
//                     <Box
//                       key={s.id}
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         p: 1,
//                         bgcolor: "#f8f9fa",
//                         borderRadius: "8px",
//                         mb: 0.5,
//                       }}
//                     >
//                       <PdfIcon sx={{ fontSize: 16, color: "#ea4335" }} />
//                       <Typography
//                         variant="caption"
//                         noWrap
//                         sx={{ fontWeight: 500 }}
//                       >
//                         {s.name}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Box>
//               </Box>

//               {/* BOUTON DÉCONNEXION (Positionné en bas du menu) */}
//               <Box sx={{ borderTop: "1px solid #eee", pt: 2 }}>
//                 <Button
//                   fullWidth
//                   startIcon={<LogoutIcon />}
//                   onClick={handleLogout}
//                   sx={{
//                     justifyContent: "flex-start",
//                     borderRadius: "12px",
//                     color: "#d32f2f", // Rouge pour l'alerte
//                     textTransform: "none",
//                     fontWeight: 600,
//                     "&:hover": { bgcolor: "#fdecea" },
//                   }}
//                 >
//                   Déconnexion
//                 </Button>
//               </Box>
//             </>
//           )}
//         </ColumnPaper>
//       </Box>

//       {/* --- COLONNE CENTRALE : CHAT --- */}
//       <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <ColumnPaper>
//           <Box
//             sx={{
//               p: 2,
//               display: "flex",
//               alignItems: "center",
//               borderBottom: "1px solid #f1f3f4",
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ flexGrow: 1, fontWeight: 600, color: "#202124" }}
//             >
//               {currentChat.title}
//             </Typography>

//             <Tooltip title="Partager le lien">
//               <IconButton onClick={handleShare} sx={{ mr: 1 }}>
//                 <ShareIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>

//             <Avatar sx={{ width: 34, height: 34, bgcolor: "#00796b" }}>
//               {userName[0]}
//             </Avatar>
//           </Box>

//           <Box
//             ref={scrollRef}
//             sx={{
//               flex: 1,
//               p: 3,
//               overflowY: "auto",
//               display: "flex",
//               flexDirection: "column",
//               gap: 3,
//             }}
//           >
//             {currentChat.history.length === 0 && (
//               <Box sx={{ textAlign: "center", mt: 10, opacity: 0.5 }}>
//                 <MagicIcon sx={{ fontSize: 60, mb: 2, color: "#e8eaed" }} />
//                 <Typography variant="h5" fontWeight={500}>
//                   Comment puis-je vous aider ?
//                 </Typography>
//                 <Typography variant="body2">
//                   Posez une question sur vos {currentChat.sources.length}{" "}
//                   sources.
//                 </Typography>
//               </Box>
//             )}

//             {currentChat.history.map((chat) => (
//               <Box key={chat.id} sx={{ display: "flex", gap: 2 }}>
//                 <Avatar
//                   sx={{
//                     width: 30,
//                     height: 30,
//                     bgcolor: chat.isUser ? "#1a73e8" : "#f1f3f4",
//                     color: chat.isUser ? "#fff" : "#5f6368",
//                   }}
//                 >
//                   {chat.isUser ? (
//                     <UserIcon fontSize="small" />
//                   ) : (
//                     <RobotIcon fontSize="small" />
//                   )}
//                 </Avatar>
//                 <Box sx={{ flex: 1 }}>
//                   <Typography
//                     variant="body1"
//                     sx={{ color: "#202124", lineHeight: 1.6 }}
//                   >
//                     {chat.text || chat.answer}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//             {loading && <CircularProgress size={20} sx={{ ml: 6 }} />}
//           </Box>

//           <Box sx={{ p: 3 }}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: "10px 20px",
//                 display: "flex",
//                 borderRadius: "30px",
//                 border: "1px solid #dadce0",
//                 bgcolor: "#f8f9fa",
//               }}
//             >
//               <InputBase
//                 fullWidth
//                 placeholder="Posez une question..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSend()}
//               />
//               <IconButton
//                 onClick={handleSend}
//                 disabled={loading || !message.trim()}
//                 sx={{ color: "#1a73e8" }}
//               >
//                 <SendIcon />
//               </IconButton>
//             </Paper>
//           </Box>
//         </ColumnPaper>
//       </Box>

//       {/* --- COLONNE DROITE : STUDIO --- */}
//       <Box sx={{ width: "320px", display: "flex", flexDirection: "column" }}>
//         <ColumnPaper sx={{ p: 2.5 }}>
//           <Typography
//             variant="subtitle2"
//             sx={{ fontWeight: 800, color: "#5f6368", mb: 3 }}
//           >
//             STUDIO AI
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <StudioCard bgcolor="#e8f0fe">
//                 <MindMapIcon color="primary" />
//                 <Typography variant="body2" fontWeight={600}>
//                   Résumé de la discussion
//                 </Typography>
//               </StudioCard>
//             </Grid>
//             <Grid item xs={12}>
//               <StudioCard bgcolor="#e6f4ea">
//                 <QuizIcon sx={{ color: "#1e8e3e" }} />
//                 <Typography variant="body2" fontWeight={600}>
//                   Générer un Quiz
//                 </Typography>
//               </StudioCard>
//             </Grid>
//             <Grid item xs={12}>
//               <StudioCard bgcolor="#fef7e0">
//                 <FlashcardIcon sx={{ color: "#f9ab00" }} />
//                 <Typography variant="body2" fontWeight={600}>
//                   Flashcards
//                 </Typography>
//               </StudioCard>
//             </Grid>
//           </Grid>

//           <Box
//             sx={{
//               mt: "auto",
//               p: 3,
//               textAlign: "center",
//               border: "1px dashed #dadce0",
//               borderRadius: "16px",
//               bgcolor: "#fafafa",
//             }}
//           >
//             <Typography variant="caption" color="text.secondary">
//               Le résultat des outils Studio apparaîtra ici après génération.
//             </Typography>
//           </Box>
//         </ColumnPaper>
//       </Box>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setOpenSnackbar(false)}
//           severity="success"
//           sx={{ width: "100%", borderRadius: "12px" }}
//         >
//           Lien copié !
//         </Alert>
//       </Snackbar>
//     </MainContainer>
//   );
// }

// export default PdfManager;
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  CircularProgress,
  Paper,
  Typography,
  styled,
  CssBaseline,
  Avatar,
  Button,
  Grid,
  InputBase,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  SmartToy as RobotIcon,
  Person as UserIcon,
  Description as PdfIcon,
  AutoAwesome as MagicIcon,
  MenuBook as QuizIcon,
  Hub as MindMapIcon,
  Style as FlashcardIcon,
  Share as ShareIcon,
  Send as SendIcon,
  ChatBubbleOutline as ChatIcon,
  AddComment as NewChatIcon,
  DeleteOutline as DeleteIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Apps as AppsIcon,
} from "@mui/icons-material";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// --- STYLED COMPONENTS ---
const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  backgroundColor: "#f0f2f9",
  padding: "12px",
  gap: "12px",
  [theme.breakpoints.down("md")]: {
    padding: "0",
    gap: "0",
    flexDirection: "column",
  },
}));

const ColumnPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  borderRadius: "24px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffffff",
  border: "1px solid #e0e4f0",
  boxShadow: "none",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    borderRadius: "0",
    border: "none",
  },
}));

const HistoryItem = styled(Button)(({ active }) => ({
  justifyContent: "flex-start",
  textTransform: "none",
  width: "100%",
  padding: "12px 16px",
  borderRadius: "14px",
  marginBottom: "6px",
  color: active ? "#1a73e8" : "#5f6368",
  backgroundColor: active ? "#e8f0fe" : "transparent",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: active ? "#d2e3fc" : "#f1f3f4",
    "& .delete-icon": { opacity: 1 },
  },
  "& .MuiTypography-root": {
    fontSize: "0.85rem",
    fontWeight: active ? 600 : 500,
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const StudioCard = styled(Button)(({ bgcolor }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "0 24px",
  borderRadius: "14px",
  textTransform: "none",
  width: "100%",
  height: "64px",
  backgroundColor: bgcolor || "#f8f9fa",
  border: "1px solid #f0f0f0",
  color: "#3c4043",
  gap: "16px",
  "&:hover": {
    backgroundColor: bgcolor,
    opacity: 0.9,
  },
}));

function PdfManager() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // --- ÉTATS ---
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("notebook_history");
    return saved
      ? JSON.parse(saved)
      : [{ id: "1", title: "Ma première note", history: [], sources: [] }];
  });
  const [activeChatId, setActiveChatId] = useState(conversations[0]?.id || "1");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const scrollRef = useRef(null);

  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId") || "6959abb4042129d51bfe8707";

  useEffect(() => {
    localStorage.setItem("notebook_history", JSON.stringify(conversations));
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [conversations]);

  const currentChat =
    conversations.find((c) => c.id === activeChatId) || conversations[0];

  // --- LOGIQUE ACTIONS ---
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newChat = {
      id: newId,
      title: "Nouveau Chat",
      history: [],
      sources: [],
    };
    setConversations([newChat, ...conversations]);
    setActiveChatId(newId);
  };

  const deleteChat = (e, id) => {
    e.stopPropagation();
    const filtered = conversations.filter((c) => c.id !== id);
    if (filtered.length === 0) {
      setConversations([
        {
          id: Date.now().toString(),
          title: "Nouveau Chat",
          history: [],
          sources: [],
        },
      ]);
    } else {
      setConversations(filtered);
      if (activeChatId === id) setActiveChatId(filtered[0].id);
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("user_id", userId);
    files.forEach((file) => formData.append("file", file));

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/auth/upload-pdf/", // Cette URL existe déjà dans Django
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload réussi:", res.data);
      const newSources = files.map((f) => ({
        name: f.name,
        id: Date.now() + Math.random(),
      }));

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, sources: [...chat.sources, ...newSources] }
            : chat
        )
      );

      alert("PDF uploadé avec succès !");
    } catch (err) {
      console.error("Erreur upload:", err);
      alert(
        `Erreur lors de l'upload: ${err.response?.data?.detail || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Ajout immédiat à l'interface
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, history: [...chat.history, userMsg] }
          : chat
      )
    );

    setLoading(true);
    const textQuestion = message;
    setMessage("");

    try {
      // Construction de l'historique
      const chatHistory = currentChat.history.reduce((acc, msg, idx, arr) => {
        if (msg.isUser && arr[idx + 1] && !arr[idx + 1].isUser) {
          acc.push([msg.text, arr[idx + 1].text]);
        }
        return acc;
      }, []);

      // ENVOI COMPLET VERS DJANGO
      const res = await axios.post(
        "http://localhost:8000/chat_model/",
        {
          question: textQuestion,
          chat_history: chatHistory,
          user_id: userId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // --- CORRECTION DU PROBLÈME D'AFFICHAGE VIDE ---
      // On vérifie d'abord 'answer', sinon on prend le dernier message dans 'chat_history'
      let aiText = res.data.answer;

      if (
        !aiText &&
        res.data.chat_history &&
        res.data.chat_history.length > 0
      ) {
        const lastPair =
          res.data.chat_history[res.data.chat_history.length - 1];
        aiText = lastPair[1]; // Récupère la réponse de l'IA (index 1)
      }

      const botMsg = {
        id: Date.now() + 1,
        text:
          aiText || res.data.detail || "Réponse reçue, mais le texte est vide.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      // ----------------------------------------------

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, history: [...chat.history, botMsg] }
            : chat
        )
      );
    } catch (err) {
      console.error("Erreur:", err);
      const errorMsg = {
        id: Date.now() + 1,
        text: `❌ Erreur: ${
          err.response?.data?.detail || "Le serveur IA est trop lent"
        }`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, history: [...chat.history, errorMsg] }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <CssBaseline />

      {/* --- HEADER MOBILE --- */}
      {isMobile && (
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                bgcolor: "black",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MagicIcon sx={{ color: "white", fontSize: 18 }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              {currentChat.title}
            </Typography>
            <SettingsIcon sx={{ color: "#5f6368", fontSize: 20 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AppsIcon sx={{ color: "#5f6368" }} />
            <Avatar sx={{ width: 34, height: 34, bgcolor: "#00796b" }}>
              {userName[0]}
            </Avatar>
          </Box>
        </Box>
      )}

      {/* --- TABS MOBILE --- */}
      {isMobile && (
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="fullWidth"
          sx={{ bgcolor: "white", borderBottom: "1px solid #e0e4f0" }}
        >
          <Tab
            label="Sources"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
          <Tab
            label="Discussion"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
          <Tab label="Studio" sx={{ textTransform: "none", fontWeight: 600 }} />
        </Tabs>
      )}

      {/* --- COLONNE GAUCHE --- */}
      {(activeTab === 0 || !isMobile) && (
        <Box
          sx={{
            width: isMobile ? "100%" : showHistory ? "300px" : "80px",
            display: isMobile && activeTab !== 0 ? "none" : "flex",
            flexDirection: "column",
            gap: 2,
            transition: "width 0.3s ease",
          }}
        >
          <ColumnPaper sx={{ flex: 1, p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              {(showHistory || isMobile) && (
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 800, color: "#5f6368" }}
                >
                  NOTEBOOKS
                </Typography>
              )}
              {!isMobile && (
                <IconButton onClick={() => setShowHistory(!showHistory)}>
                  {showHistory ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              )}
            </Box>
            {(showHistory || isMobile) && (
              <>
                <Button
                  fullWidth
                  startIcon={<NewChatIcon />}
                  onClick={createNewChat}
                  sx={{
                    mb: 3,
                    borderRadius: "12px",
                    py: 1.2,
                    textTransform: "none",
                    bgcolor: "#1a73e8",
                    color: "white",
                    "&:hover": { bgcolor: "#1765cc" },
                  }}
                >
                  Nouveau Chat
                </Button>
                <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
                  {conversations.map((chat) => (
                    <HistoryItem
                      key={chat.id}
                      active={chat.id === activeChatId}
                      onClick={() => {
                        setActiveChatId(chat.id);
                        if (isMobile) setActiveTab(1);
                      }}
                      startIcon={<ChatIcon fontSize="small" />}
                    >
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {chat.title}
                      </Typography>
                      <IconButton
                        className="delete-icon"
                        size="small"
                        sx={{ opacity: 0, p: 0 }}
                        onClick={(e) => deleteChat(e, chat.id)}
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </HistoryItem>
                  ))}
                </Box>
                <Box sx={{ borderTop: "1px solid #eee", pt: 2, mb: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: "#5f6368",
                      mb: 1,
                      display: "block",
                    }}
                  >
                    SOURCES
                  </Typography>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                    sx={{ borderRadius: "10px", textTransform: "none", mb: 2 }}
                  >
                    Ajouter PDF
                  </Button>
                  <input
                    id="file-input"
                    type="file"
                    hidden
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <Box sx={{ maxHeight: "150px", overflowY: "auto" }}>
                    {currentChat.sources.map((s) => (
                      <Box
                        key={s.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          p: 1,
                          bgcolor: "#f8f9fa",
                          borderRadius: "8px",
                          mb: 0.5,
                        }}
                      >
                        <PdfIcon sx={{ fontSize: 16, color: "#ea4335" }} />
                        <Typography
                          variant="caption"
                          noWrap
                          sx={{ fontWeight: 500 }}
                        >
                          {s.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Button
                  fullWidth
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    justifyContent: "flex-start",
                    borderRadius: "12px",
                    color: "#d32f2f",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Déconnexion
                </Button>
              </>
            )}
          </ColumnPaper>
        </Box>
      )}
      {/* --- COLONNE CENTRALE --- */}
      {(activeTab === 1 || !isMobile) && (
        <Box
          sx={{
            flex: 1,
            display: isMobile && activeTab !== 1 ? "none" : "flex",
            flexDirection: "column",
            height: isMobile ? "calc(100vh - 110px)" : "100%",
          }}
        >
          <ColumnPaper>
            {!isMobile && (
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #f1f3f4",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ flexGrow: 1, fontWeight: 600, color: "#202124" }}
                >
                  {currentChat.title}
                </Typography>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setOpenSnackbar(true);
                  }}
                >
                  <ShareIcon fontSize="small" />
                </IconButton>
                <Avatar
                  sx={{ width: 34, height: 34, bgcolor: "#00796b", ml: 1 }}
                >
                  {userName[0]}
                </Avatar>
              </Box>
            )}
            <Box
              ref={scrollRef}
              sx={{
                flex: 1,
                p: 3,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {currentChat.history.length === 0 && (
                <Box sx={{ textAlign: "center", mt: 10, opacity: 0.5 }}>
                  <MagicIcon sx={{ fontSize: 60, mb: 2, color: "#e8eaed" }} />
                  <Typography variant="h5" fontWeight={500}>
                    Comment puis-je vous aider ?
                  </Typography>
                </Box>
              )}
              {currentChat.history.map((chat) => (
                <Box
                  key={chat.id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignSelf: chat.isUser ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                  }}
                >
                  {!chat.isUser && (
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: "#f1f3f4",
                        color: "#5f6368",
                      }}
                    >
                      <RobotIcon fontSize="small" />
                    </Avatar>
                  )}
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: chat.isUser ? "#1a73e8" : "#f8f9fa",
                      color: chat.isUser ? "white" : "black",
                      borderRadius: "18px",
                    }}
                  >
                    {/* --- MODIFICATION ICI : RENDU MARKDOWN ET MATHS --- */}
                    {chat.isUser ? (
                      <Typography variant="body1">{chat.text}</Typography>
                    ) : (
                      <Box
                        sx={{
                          "& p": { m: 0 }, // Évite les marges inutiles dans les paragraphes Markdown
                          "& table": { borderCollapse: "collapse", my: 1 },
                          "& th, & td": { border: "1px solid #ddd", p: 1 },
                        }}
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {chat.text}
                        </ReactMarkdown>
                      </Box>
                    )}
                  </Paper>
                  {chat.isUser && (
                    <Avatar sx={{ width: 30, height: 30, bgcolor: "#1a73e8" }}>
                      <UserIcon fontSize="small" />
                    </Avatar>
                  )}
                </Box>
              ))}
              {loading && (
                <CircularProgress size={24} sx={{ alignSelf: "center" }} />
              )}
            </Box>
            <Box sx={{ p: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: "10px 20px",
                  display: "flex",
                  borderRadius: "30px",
                  border: "1px solid #dadce0",
                  bgcolor: "#f8f9fa",
                }}
              >
                <InputBase
                  fullWidth
                  placeholder="Posez une question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <IconButton
                  onClick={handleSend}
                  disabled={loading || !message.trim()}
                  sx={{ color: "#1a73e8" }}
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </Box>
          </ColumnPaper>
        </Box>
      )}

      {/* --- COLONNE DROITE (STUDIO AI) --- */}
      {(activeTab === 2 || !isMobile) && (
        <Box
          sx={{
            width: isMobile ? "100%" : "320px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ColumnPaper sx={{ p: 2.5 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, color: "#5f6368", mb: 3 }}
            >
              STUDIO AI
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StudioCard bgcolor="#e6f4ea">
                  <QuizIcon sx={{ color: "#1e8e3e" }} />
                  <Typography variant="body2" fontWeight={600}>
                    Quiz
                  </Typography>
                </StudioCard>
              </Grid>

              <Grid item xs={12}>
                <StudioCard bgcolor="#e8f0fe">
                  <MindMapIcon color="primary" />
                  <Typography variant="body2" fontWeight={600}>
                    Résumé
                  </Typography>
                </StudioCard>
              </Grid>

              <Grid item xs={12}>
                <StudioCard bgcolor="#fef7e0">
                  <FlashcardIcon sx={{ color: "#f9ab00" }} />
                  <Typography variant="body2" fontWeight={600}>
                    Flashcards
                  </Typography>
                </StudioCard>
              </Grid>
            </Grid>
          </ColumnPaper>
        </Box>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Lien copié !
        </Alert>
      </Snackbar>
    </MainContainer>
  );
}

export default PdfManager;
