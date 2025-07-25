import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloudIcon from "@mui/icons-material/Cloud";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import MicIcon from "@mui/icons-material/Mic";
import TranslateIcon from "@mui/icons-material/Translate";
import SecurityIcon from "@mui/icons-material/Security";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import DescriptionIcon from "@mui/icons-material/Description";
import ChatIcon from "@mui/icons-material/Chat";
import VisionIcon from "@mui/icons-material/RemoveRedEye";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareIcon from "@mui/icons-material/Share";
import "./styles/UseCaseCard.css";
import AIDemoModal from "./AIDemoModal";
import {
  GraduationCap,
  Stethoscope,
  ShoppingCart,
  Globe,
  MessageCircle,
  Users,
  Brain,
  HeartPulse,
  Lock,
  Code2,
  Image as LucideImage,
  Bot,
  Languages,
  Rocket,
} from "lucide-react";

const domainImages = {
  healthcare:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  education:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  retail:
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  finance:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  security:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  default:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
};

export default function UseCaseCard({
  useCase,
  onDetails,
  onRun,
  runLoading,
  isFavorite,
  onToggleFavorite,
}) {
  const theme = useTheme();
  const [showSolution, setShowSolution] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  const logoOverrides = {
    ibmwatsonnlu: "/assets/IBMWastson.png", 
  };
  const getLogoSrc = (aiTool) => {
    if (!aiTool) return "/assets/gpt4.jpg";
    const normalized = aiTool
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
    if (logoOverrides[normalized]) return logoOverrides[normalized];
    const pngPath = `/assets/${normalized}.png`;
    const jpgPath = `/assets/${normalized}.jpg`;
    return pngPath;
  };

  const getAIToolIcon = (aiTool) => {
    if (!aiTool) return <SmartToyIcon />;

    const toolLower = aiTool.toLowerCase();

    if (
      toolLower.includes("gpt") ||
      toolLower.includes("openai") ||
      toolLower.includes("codex")
    ) {
      return <AutoAwesomeIcon />;
    }
    if (
      toolLower.includes("google") ||
      toolLower.includes("vision") ||
      toolLower.includes("dialogflow")
    ) {
      return <VisionIcon />;
    }
    if (
      toolLower.includes("amazon") ||
      toolLower.includes("aws") ||
      toolLower.includes("alexa") ||
      toolLower.includes("polly") ||
      toolLower.includes("transcribe") ||
      toolLower.includes("sagemaker")
    ) {
      return <CloudIcon />;
    }
    if (toolLower.includes("microsoft") || toolLower.includes("azure")) {
      return <CloudIcon />;
    }
    if (
      toolLower.includes("github") ||
      toolLower.includes("copilot") ||
      toolLower.includes("selenium") ||
      toolLower.includes("sonar") ||
      toolLower.includes("deepcode") ||
      toolLower.includes("doxygen")
    ) {
      return <CodeIcon />;
    }
    if (
      toolLower.includes("dall-e") ||
      toolLower.includes("yolo") ||
      toolLower.includes("tesseract") ||
      toolLower.includes("opencv")
    ) {
      return <ImageIcon />;
    }
    if (
      toolLower.includes("rev") ||
      toolLower.includes("cogito") ||
      toolLower.includes("voiceover")
    ) {
      return <MicIcon />;
    }
    if (toolLower.includes("translate")) {
      return <TranslateIcon />;
    }
    if (
      toolLower.includes("fraud") ||
      toolLower.includes("security") ||
      toolLower.includes("splunk") ||
      toolLower.includes("fico") ||
      toolLower.includes("comply")
    ) {
      return <SecurityIcon />;
    }
    if (
      toolLower.includes("health") ||
      toolLower.includes("aidoc") ||
      toolLower.includes("genomics") ||
      toolLower.includes("philips") ||
      toolLower.includes("deepmind") ||
      toolLower.includes("alphafold")
    ) {
      return <LocalHospitalIcon />;
    }
    if (
      toolLower.includes("retail") ||
      toolLower.includes("inventory") ||
      toolLower.includes("price")
    ) {
      return <ShoppingCartIcon />;
    }
    if (toolLower.includes("magnifier") || toolLower.includes("signall")) {
      return <AccessibilityIcon />;
    }
    if (
      toolLower.includes("copyscape") ||
      toolLower.includes("perspective") ||
      toolLower.includes("taboola") ||
      toolLower.includes("guru")
    ) {
      return <DescriptionIcon />;
    }
    if (toolLower.includes("chat") || toolLower.includes("bot")) {
      return <ChatIcon />;
    }
    if (toolLower.includes("watson") || toolLower.includes("ibm")) {
      return <SmartToyIcon />;
    }

    return <SmartToyIcon />;
  };

  

  const category = useCase?.domain?.split(" ")[0] || "AI";
  const domainKey = category?.toLowerCase()?.trim() || "default";
  const cardImage = domainImages[domainKey] || domainImages.default;

  return (
    <Card className="usecase-card">
      <div
        className="usecase-card-header"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${cardImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="usecase-category-chip">{category}</div>

        
      </div>

      <CardContent className="usecase-card-content">
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.mode === "white",
          }}
        >
          {useCase.title}
        </Typography>

        <Typography variant="body2" className="usecase-card-description">
          {useCase.solution || useCase.problem || "No description available."}
        </Typography>

        <Box className="usecase-card-footer">
          <Box
            className="usecase-card-actions"
            sx={{ marginTop: "20%", justifyContent: "flex-end" }}
          >
            <Tooltip
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite && onToggleFavorite(useCase.id);
                }}
                sx={{
                  color: isFavorite
                    ? "error.main"
                    : (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(0, 0, 0, 0.6)",
                  "&:hover": {
                    color: "error.main",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                {isFavorite ? (
                  <FavoriteIcon sx={{ fontSize: 20 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              size="small"
              onClick={() => setDemoOpen(true)}
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(90deg, #ff7a2f 0%, #F96F3A 100%)"
                    : "linear-gradient(90deg, #ff7a2f 0%, #F96F3A 100%)",
                color: theme.palette.mode === "dark" ? "black" : "white",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(110, 142, 251, 0.2)",
                borderRadius: 2,
                textTransform: "none",
                px: 2,
                py: 0.75,
                fontSize: "0.8125rem",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(110, 142, 251, 0.3)",
                },
              }}
            >
              Try Demo
            </Button>
          </Box>
        </Box>
      </CardContent>

      <AIDemoModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        useCase={useCase}
      />
    </Card>
  );
}
