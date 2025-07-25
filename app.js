import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";


import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./src/Components/Sidebar";
import Dashboard from "./src/Components/Dashboard";
import UseCaseModal from "./src/Components/UseCaseModal";
import ColorModeToggle from "./src/Components/ColorModeToggle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./src/Components/styles/Sidebar.css";
import "./src/Components/styles/Dashboard.css";
import "./src/Components/styles/UseCaseModal.css";
import "./src/Components/styles/ColorModeToggle.css";
import { getAppTheme } from "./src/Utils/theme";
import ChatIcon from "@mui/icons-material/Chat";
import Tooltip from "@mui/material/Tooltip";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Person from "@mui/icons-material/Person";
import Chatbot from "./src/Components/Chatbot";
import About from "./src/Components/About";

function App() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState(null);
  const [runLoading, setRunLoading] = useState(null);
  const [mode, setMode] = useState("light");
  const [aiAssistantOpen, setAIAssistantOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); 
  const [selectedPrompt, setSelectedPrompt] = useState("");

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setAIAssistantOpen(true);
  };

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("aiStudioFavorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [user, setUser] = useState({
    name: "Rutuja Tathe",
    avatar: "", 
  });

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("aiStudioFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const theme = getAppTheme(mode);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavItemClick = (item) => {
    if (item.text === 'About') {
      setActiveView('about');
    } else if (item.text === 'Use Cases') {
      setActiveView('dashboard');
      setActive(0);
    }
  };

  const handleLogoClick = () => {
    setActiveView('dashboard');
    setActive(0); 
  };

  const handleDetails = (useCase) => {
    setSelectedUseCase(useCase);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);
  const handleRun = (id) => {
    setRunLoading(id);
    setTimeout(() => setRunLoading(null), 1200);
  };
  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const handleToggleFavorite = (useCaseId) => {
    setFavorites((prev) => {
      if (prev.includes(useCaseId)) {
        return prev.filter((id) => id !== useCaseId);
      } else {
        return [...prev, useCaseId];
      }
    });
  };

  const handleSidebarActive = (idx) => {
    setActive(idx);
  };

  const handleAIClose = () => setAIAssistantOpen(false);

  const drawer = (
    <Sidebar
      active={active}
      setActive={setActive}
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      onNavItemClick={handleNavItemClick}
      onLogoClick={handleLogoClick}
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 1,
            background: "#001A4D",
            color: "white",
            boxShadow: "0 4px 20px 0 rgba(25, 118, 210, 0.15)",
          })}
        >
          <Toolbar
            sx={{
              minHeight: { xs: 56, sm: 72 },
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              px: { xs: 1, sm: 3 },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: { xs: 1, sm: 2 }, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 1,
                minWidth: 0,
                overflow: "hidden",
                maxWidth: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src="https://neutrinotechsystems.com/wp-content/uploads/2023/02/neutrino-logo-2023-white.png"
                  alt="Neutrino Logo"
                  onClick={() => {
                    setActiveView('dashboard');
                    setActive(0); 
                  }}
                  sx={{
                    height: { xs: "26px", sm: "28px", md: "40px" },
                    width: "auto",
                    mr: 3,
                    backgroundColor: "transparent",
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 0.8
                    }
                  }}
                  onError={(e) => {
                    console.error("Failed to load image:", e.target.src);
                    console.log("Trying alternative path...");
                    e.target.src = "/assets/domain-images/Neutrino_Logo.png";
                  }}
                />
               
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <ColorModeToggle
              mode={mode}
              toggleMode={toggleMode}
              sx={{ mr: 0.5 }}
            />

            {isLoggedIn ? (
              <>
                <Tooltip title="Profile">
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{ ml: 0.5 }}
                    size="small"
                  >
                    {user.avatar ? (
                      <Avatar
                        src={user.avatar}
                        sx={{
                          width: 32,
                          height: 32,
                          border: "1px solid rgba(255, 255, 255, 0.5)",
                        }}
                      />
                    ) : (
                      <AccountCircleIcon
                        sx={{
                          width: 32,
                          height: 32,
                          color: "white",
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleProfileMenuClose}
                  onClick={handleProfileMenuClose}
                  PaperProps={{
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      minWidth: 180,
                    },
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    View Profile
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon
                        sx={{
                          color: "#fff",
                          width: 32,
                          height: 32,
                        }}
                      />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Tooltip title="Login">
                <IconButton onClick={handleLogin} sx={{ ml: 0.5 }}>
                  <AccountCircleIcon
                    sx={{
                      color: "#fff",
                      width: 32,
                      height: 32,
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>
        {drawer}
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            width: { sm: `calc(100% - ${240}px)` },
            bgcolor: 'background.default'
          }}
        >
          <Toolbar />
          {activeView === 'dashboard' && (
            <Dashboard
              onDetails={handleDetails}
              onRun={handleRun}
              runLoading={runLoading}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          {activeView === 'about' && <About />}
        </Box>
        <UseCaseModal
          open={modalOpen}
          handleClose={handleModalClose}
          useCase={selectedUseCase}
        />
        <Chatbot
          sx={{ marginTop: "100%" }}
          open={aiAssistantOpen}
          onClose={() => setAIAssistantOpen(false)}
          selectedPrompt={selectedPrompt}
          onPromptSelect={handlePromptSelect}
        />
      </Box>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
