import React, { useState } from "react";
import {
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Tooltip,
  ListItemIcon,
  Typography,
  Avatar,
  Collapse,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import InfoIcon from "@mui/icons-material/Info";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageIcon from "@mui/icons-material/Image";
import BuildIcon from "@mui/icons-material/Build";
import HistoryIcon from "@mui/icons-material/History";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import HelpIcon from "@mui/icons-material/Help";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PromptsGallery from "./PromptsGallery";
import "./styles/Sidebar.css";

const historyItems = [
  { id: 1, title: "Chat about React components", timestamp: "10:30 AM" },
  { id: 2, title: "Image generation request", timestamp: "Yesterday" },
  { id: 3, title: "Code review session", timestamp: "Jul 20" },
  { id: 4, title: "Project discussion", timestamp: "Jul 18" },
  { id: 5, title: "Meeting notes", timestamp: "Jul 15" },
  { id: 6, title: "UI feedback implementation", timestamp: "9:15 AM" },
  { id: 7, title: "Backend API integration", timestamp: "Yesterday" },
  { id: 8, title: "Dark mode UI testing", timestamp: "Jul 23" },
  { id: 9, title: "Client presentation prep", timestamp: "Jul 21" },
  { id: 10, title: "Bug fixes and QA notes", timestamp: "Jul 17" },
];

const navItems = [
  { text: "Use Cases", icon: <AppsIcon /> },
  {
    text: "Prompts Gallery",
    icon: <AutoAwesomeIcon />,
    tooltip: "Browse example prompts and templates for AI Innovation Studio",
  },
  { text: "History", icon: <HistoryIcon /> },
  { text: "Help & Documentation", icon: <HelpIcon /> },

  { text: "About", icon: <InfoIcon /> },
];
export default function Sidebar({
  active,
  setActive,
  mobileOpen,
  handleDrawerToggle,
  onNavItemClick,
  onLogoClick,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [promptsGalleryOpen, setPromptsGalleryOpen] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [helpExpanded, setHelpExpanded] = useState(false);

  const handlePromptsGalleryToggle = () => {
    setPromptsGalleryOpen(!promptsGalleryOpen);
  };

  const handlePromptSelect = (prompt) => {
    console.log("Selected prompt:", prompt);
  };

  const handleNavItemClick = (item, index) => {
    setActive(index);

    if (item.text === "Prompts Gallery") {
      setPromptsGalleryOpen(!promptsGalleryOpen);
      setHistoryExpanded(false);
      setHelpExpanded(false);
    } else if (item.text === "History") {
      setHistoryExpanded(!historyExpanded);
      setPromptsGalleryOpen(false);
      setHelpExpanded(false);
    } else if (item.text === "Help & Documentation") {
      setHelpExpanded(!helpExpanded);
      setPromptsGalleryOpen(false);
      setHistoryExpanded(false);
    } else if (item.text === "Use Cases") {
      onLogoClick && onLogoClick();
      setHistoryExpanded(false);
      setPromptsGalleryOpen(false);
      setHelpExpanded(false);
    } else {
      onNavItemClick && onNavItemClick(item);
      setHistoryExpanded(false);
      setPromptsGalleryOpen(false);
      setHelpExpanded(false);
    }
    if (
      mobileOpen &&
      item.text !== "History" &&
      item.text !== "Prompts Gallery"
    ) {
      handleDrawerToggle();
    }
  };

  const drawer = (
    <Box
      className="sidebar-drawer-content"
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#001A4D",
        color: "white",
        paddingTop: 2,
      }}
    >
      <Box
        className="sidebar-header-row"
        sx={{
          position: "relative",
          minHeight: 64,
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          pr: 1,
          pt: 1,
        }}
      >
        <Box
          className="sidebar-logo-container"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 2,
            cursor: "pointer",
          }}
          onClick={() => {
            onLogoClick && onLogoClick();
          }}
        />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setCollapsed((c) => !c);
          }}
          size="small"
          className="collapse-button"
          sx={{
            backgroundColor: "#fff",
            color: "#001A4D",
            width: 32,
            height: 32,
            minWidth: 32,
            minHeight: 32,
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease",
            position: "absolute",
            right: 8,
            top: 16,
            zIndex: 1400, 
            "&:hover": {
              backgroundColor: "#f5f5f5",
              transform: "scale(1.1)",
            },
            "& svg": {
              fontSize: "1.25rem",
              display: "block", 
            },
            "&.MuiButtonBase-root": {
              padding: 0, 
            },
          }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Box className="sidebar-list-box" sx={{ flexGrow: 1 }}>
        <List sx={{ mt: 2 }}>
          {navItems.map((item, idx) => {
            const listItem = (
              <ListItem
                component="button"
                key={item.text}
                selected={active === idx}
                onClick={() => handleNavItemClick(item, idx)}
                className={
                  active === idx
                    ? "sidebar-list-item active"
                    : "sidebar-list-item"
                }
                style={{ justifyContent: collapsed ? "center" : "flex-start" }}
              >
                <Box
                  className={
                    active === idx
                      ? "sidebar-accent-bar"
                      : "sidebar-accent-bar transparent"
                  }
                />
                <ListItemIcon
                  className="sidebar-list-icon"
                  sx={{
                    minWidth: 40,
                    marginRight: collapsed ? "auto" : 2,
                    marginLeft: collapsed ? "auto" : 0,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <>
                    <ListItemText primary={item.text} />
                    {item.text === "History" &&
                      (historyExpanded ? <ExpandLess /> : <ExpandMore />)}
                    {item.text === "Help & Documentation" &&
                      (helpExpanded ? <ExpandLess /> : <ExpandMore />)}
                  </>
                )}
              </ListItem>
            );

            return (
              <React.Fragment key={item.text}>
                {item.tooltip ? (
                  <Tooltip
                    title={collapsed ? item.tooltip : ""}
                    placement="right"
                    arrow
                    disableHoverListener={!collapsed}
                  >
                    {listItem}
                  </Tooltip>
                ) : (
                  listItem
                )}

                {!collapsed && item.text === "History" && (
                  <Collapse in={historyExpanded} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "rgba(255, 255, 255, 0.1)",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "3px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "rgba(255, 255, 255, 0.3)",
                        },
                      }}
                    >
                      {historyItems.map((historyItem) => (
                        <Tooltip key={historyItem.id} title={historyItem.title}>
                          <ListItem
                            sx={{
                              pl: 6,
                              py: 1,
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                              },
                            }}
                          >
                            <ListItemText
                              primary={historyItem.title}
                              primaryTypographyProps={{
                                variant: "body2",
                                sx: {
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  color: "rgba(255, 255, 255, 0.7)",
                                },
                              }}
                            />
                          </ListItem>
                        </Tooltip>
                      ))}
                    </List>
                  </Collapse>
                )}
                {!collapsed && item.text === "Help & Documentation" && (
                  <Collapse in={helpExpanded} timeout="auto" unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "rgba(255, 255, 255, 0.1)",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "3px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "rgba(255, 255, 255, 0.3)",
                        },
                      }}
                    >
                      {[
                        "Getting Started",
                        "API Documentation",
                        "Tutorials",
                        "FAQs",
                        "Contact Support",
                      ].map((item, index) => (
                        <Tooltip key={index} title={item}>
                          <ListItem
                            sx={{
                              pl: 6,
                              py: 1,
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                              },
                            }}
                          >
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                variant: "body2",
                                sx: {
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  color: "rgba(255, 255, 255, 0.7)",
                                },
                              }}
                            />
                          </ListItem>
                        </Tooltip>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
  );
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "#001A4D",
            color: "white",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: collapsed ? 80 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? 80 : 240,
            boxSizing: "border-box",
            transition: "width 0.2s ease",
            backgroundColor: "#001A4D",
            color: "white",
            overflowX: "hidden",
          },
        }}
      >
        {drawer}
      </Drawer>

      <PromptsGallery
        open={promptsGalleryOpen}
        onClose={() => setPromptsGalleryOpen(false)}
        onPromptSelect={handlePromptSelect}
      />
    </>
  );
}
