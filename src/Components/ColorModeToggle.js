import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./styles/ColorModeToggle.css";

export default function ColorModeToggle({ mode, toggleMode }) {
  return (
    <Box className="color-mode-toggle" style={{ justifyContent: "flex-end" }}>
      <Tooltip title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      
      <IconButton onClick={toggleMode} color="inherit">
       
           <Brightness7Icon sx={{ color: '#fff' }} />
          
      </IconButton>
      </Tooltip>
    </Box>
  );
} 