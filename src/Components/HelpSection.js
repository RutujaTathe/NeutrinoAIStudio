import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Rocket, Heart, User, HelpCircle } from "lucide-react";

export default function HelpSection() {
  return (
    <Box sx={{ mt: 4, mb: 4, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Help & Documentation
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rocket size={18} style={{ marginRight: 6 }} />
            <Typography>How do I use AI Studio?</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Select a use case from the sidebar, enter your input, and click
            "Run". You can also upload files, search the web, or use the prompt
            gallery for inspiration.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Heart size={18} style={{ marginRight: 6 }} />
            <Typography>How do I save favorites?</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Click the heart icon on any use case to add it to your favorites.
            Access your favorites from the dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <User size={18} style={{ marginRight: 6 }} />
            <Typography>How do I update my profile?</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Click your profile icon in the top right and select "View Profile"
            or "Settings" to update your information and preferences.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HelpCircle size={18} style={{ marginRight: 6 }} />
            <Typography>Where can I get more help?</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            For more support, contact our team or check the official
            documentation linked in the footer.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
