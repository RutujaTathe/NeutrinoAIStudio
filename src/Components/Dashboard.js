import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Box,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  InputAdornment,
  ListItemIcon,
  Menu,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import LanguageIcon from "@mui/icons-material/Language";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PhotoIcon from "@mui/icons-material/Photo";
import SearchIcon from "@mui/icons-material/Search";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FilterListIcon from "@mui/icons-material/FilterList";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import UseCaseCard from "./UseCaseCard";
import PromptsGallery from "./PromptsGallery";
import "./styles/Dashboard.css";
import useCases from "./useCases";

const groupedByDomain = useCases.reduce((acc, uc) => {
  if (!acc[uc.domain]) acc[uc.domain] = [];
  acc[uc.domain].push(uc);
  return acc;
}, {});

const sortedDomains = Object.keys(groupedByDomain).sort();

const allTools = Array.from(
  new Set(useCases.map((uc) => uc.aiTool || "Unknown"))
).sort();

const toolUrls = {
  "OpenAI GPT-4": "https://platform.openai.com/",
  "GPT-4": "https://platform.openai.com/",
  "Rev AI": "https://www.rev.ai/",
  "Copyscape AI": "https://www.copyscape.com/",
  "Taboola AI": "https://www.taboola.com/ai/",
  "Perspective API": "https://perspectiveapi.com/",
  "Google Vision AI": "https://cloud.google.com/vision/",
  YOLOv5: "https://github.com/ultralytics/yolov5",
  "Microsoft Face API":
    "https://azure.microsoft.com/en-us/services/cognitive-services/face/",
  "Tesseract OCR": "https://github.com/tesseract-ocr/tesseract",
  "Aidoc AI": "https://www.aidoc.com/",
  "DALL-E": "https://labs.openai.com/",
  "GitHub Copilot": "https://github.com/features/copilot",
  "OpenAI Codex": "https://platform.openai.com/docs/guides/codex",
  "Selenium AI": "https://www.selenium.dev/",
  "Doxygen AI": "https://www.doxygen.nl/",
  "SonarQube AI": "https://www.sonarsource.com/",
  "DeepCode AI": "https://www.deepcode.ai/",
  "IBM Watson NLU":
    "https://www.ibm.com/watson/services/natural-language-understanding/",
  "Jasper AI": "https://www.jasper.ai/",
  "Amazon Personalize": "https://aws.amazon.com/personalize/",
  "Gradescope AI": "https://www.gradescope.com/",
  "Google Flights AI": "https://www.google.com/flights",
  "Google Maps AI": "https://cloud.google.com/maps-platform/",
  "Amazon Translate": "https://aws.amazon.com/translate/",
  "Google Places AI":
    "https://developers.google.com/maps/documentation/places/web-service/overview",
  "Google Sheets AI": "https://workspace.google.com/marketplace/app/sheetai/",
  "Google Cloud AI": "https://cloud.google.com/ai-platform/",
  "Google AI": "https://ai.google/",
  "AWS AI": "https://aws.amazon.com/machine-learning/",
  "Amazon SageMaker": "https://aws.amazon.com/sagemaker/",
  "AWS Fraud Detector": "https://aws.amazon.com/fraud-detector/",
  "Vue.ai": "https://vue.ai/",
  "AWS Rekognition": "https://aws.amazon.com/rekognition/",
  "AutoGrid Flex AI": "https://www.auto-grid.com/",
  "Llamasoft AI": "https://www.llamasoft.com/ai/",
  "DJI Terra AI": "https://www.dji.com/terra",
  "Matterport AI": "https://matterport.com/",
  "Locus Robotics AI": "https://locusrobotics.com/",
  "Relativity AI": "https://www.relativity.com/",
  "Deep Genomics": "https://www.deepgenomics.com/",
  "Philips HealthSuite AI":
    "https://www.philips.com/a-w/about/healthsuite.html",
  "DeepMind AlphaFold":
    "https://www.deepmind.com/research/highlighted-research/alphafold",
  "Google Dialogflow": "https://dialogflow.cloud.google.com/",
  "Google Health AI": "https://health.google/health-ai/",
  "Google Cloud Price AI":
    "https://cloud.google.com/solutions/price-optimization",
  "Cogito AI": "https://www.cogitocorp.com/",
  "Amazon Alexa": "https://developer.amazon.com/en-US/alexa",
  "Google Knowledge Graph": "https://developers.google.com/knowledge-graph",
  "Google Translate AI": "https://translate.google.com/",
  "Guru AI": "https://www.getguru.com/",
  "AWS Transcribe": "https://aws.amazon.com/transcribe/",
  "Amazon Polly": "https://aws.amazon.com/polly/",
  "Apple VoiceOver": "https://www.apple.com/accessibility/vision/",
  "OpenCV AI": "https://opencv.org/",
  "Magnifier AI": "https://www.microsoft.com/en-us/p/magnifier/9wzdncrfj9bn",
  "SignAll AI": "https://www.signall.us/",
  "Splunk AI": "https://www.splunk.com/en_us/solutions/ai-ml.html",
  "FICO Score AI": "https://www.fico.com/en/products/fico-score",
  "Quantitative AI": "https://quantitative.ai/",
  "ComplyAdvantage AI": "https://complyadvantage.com/",
  "Syte Visual AI": "https://www.syte.ai/",
  "Sunflower Labs AI": "https://www.sunflower-labs.com/",
};

export default function Dashboard({
  onDetails,
  onRun,
  runLoading,
  favorites,
  onToggleFavorite,
}) {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const theme = useTheme();
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [messages, setMessages] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTool, setSelectedTool] = useState("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = React.useRef(null);

  const handleAddFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        { type: "file", file }, 
      ]);
    }
  };

  const handleLanguageIconClick = () => {
    window.open("https://www.google.com", "_blank");
  };

  const handlePromptSelect = (prompt) => {
    setInputValue(prompt.title);
    setPromptsGalleryOpen(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [
        ...prev,
        { type: "text", text: inputValue.trim() },
      ]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRemoveFile = (removeIdx) => {
    setMessages((prev) =>
      prev.filter((msg, idx) => !(msg.type === "file" && idx === removeIdx))
    );
  };

  let visibleUseCases =
    selectedDomain === "All" ? useCases : groupedByDomain[selectedDomain] || [];
  if (selectedTool !== "All") {
    visibleUseCases = visibleUseCases.filter(
      (uc) => uc.aiTool === selectedTool
    );
  }
  if (showFavoritesOnly) {
    visibleUseCases = visibleUseCases.filter(
      (uc) => favorites && favorites.includes(uc.id)
    );
  }

  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };
    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
    };
    recognition.start();
  };

  return (
    <Container className="dashboard-container">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mb: 2,
          width: "100%",
          ml: { xs: 0, sm: 6 },
          mr: 0,
        }}
      >
        <Tooltip title="Easily discover AI use cases by filtering across domains, tools, and top solutions.">
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search AI Use Cases by Domain..."
            size="small"
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: 0,
              maxWidth: 400,
              background: (theme) =>
                theme.palette.mode === "dark" ? "#23272f" : "#fff",
              borderRadius: 1.5,
              mr: 1.5,
              "& .MuiOutlinedInput-root": {
                height: 36,
                paddingRight: 0,
                borderRadius: 1.5,
                "& fieldset": {
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "#fff" : "#c5c5c5",
                },
                "&:hover fieldset": {
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "#fff" : "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>

        <Box sx={{ display: "flex", gap: 1.5, mr: 1.5 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<FilterListIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              height: 36,
              minWidth: 100,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 152, 0, 0.8)"
                  : "#FF9800",
              color: "white",
              textTransform: "none",
              borderRadius: 1.5,
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 167, 38, 0.9)"
                    : "#F57C00",
              },
              fontWeight: 500,
              boxShadow: "none",
            }}
          >
            Filter
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              style: {
                width: 600,
                height: "60vh",
                padding: "10px 0",
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                overflow: "auto",
              },
            }}
          >
            <Box
              sx={{ px: 2, py: 1, borderBottom: "1px solid rgba(0,0,0,0.1)" }}
            >
              <Typography variant="subtitle2" fontWeight={600}>
                Filter Options
              </Typography>
            </Box>

            <Box sx={{ px: 2, py: 1 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 0.5, fontSize: "0.75rem" }}
                  >
                    Domain
                  </Typography>
                  <Select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    size="small"
                    fullWidth
                    displayEmpty
                    sx={{
                      '& .MuiSelect-select': {
                        py: 1,
                        fontSize: '0.875rem',
                        overflow: 'auto',
                        maxHeight: '60vh',
                      },
                    }}
                  >
                    <MenuItem value="All">All Domains</MenuItem>
                    {sortedDomains.map((domain) => (
                      <MenuItem key={domain} value={domain}>
                        {domain}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 0.5, fontSize: "0.75rem" }}
                  >
                    Tool
                  </Typography>
                  <Select
                    value={selectedTool}
                    onChange={(e) => setSelectedTool(e.target.value)}
                    size="small"
                    fullWidth
                    displayEmpty
                    sx={{
                      "& .MuiSelect-select": {
                        py: 1,
                        fontSize: "0.875rem",
                        overflow: "auto",
                        maxHeight: "60vh",
                      },
                    }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {Object.keys(toolUrls).map((tool) => (
                      <MenuItem key={tool} value={tool}>
                        {tool}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={showFavoritesOnly}
                    onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                    color="primary"
                    size="small"
                  />
                }
                label="Favorites Only"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 2,
                pt: 1,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <Button
                size="small"
                onClick={() => {
                  setSelectedDomain("All");
                  setSelectedTool("All");
                  setShowFavoritesOnly(false);
                }}
                sx={{
                  color: "text.secondary",
                  textTransform: "none",
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => setAnchorEl(null)}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 152, 0, 0.8)"
                      : "#FF9800",
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255, 167, 38, 0.9)"
                        : "#F57C00",
                  },
                }}
              >
                Apply Filter
              </Button>
            </Box>
          </Menu>
        </Box>
        <Select
          value={selectedTool}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedTool(value);
            if (value !== "All" && toolUrls[value]) {
              window.open(toolUrls[value], "_blank");
            }
          }}
          size="small"
          displayEmpty
          variant="outlined"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
                overflow: "auto",
              },
            },
          }}
          sx={{
            height: 36,
            minWidth: 120,
            background: (theme) =>
              theme.palette.mode === "dark" ? "#23272f" : "#fff",
            borderRadius: 1.5,
            ml: 1.5,
            fontWeight: 500,
            boxShadow: "none",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#c5c5c5",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#888",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#000",
            },
          }}
          inputProps={{ "aria-label": "All Tools" }}
        >
          <MenuItem value="All">All Tools</MenuItem>
          {allTools.map((tool) => (
            <MenuItem key={tool} value={tool}>
              {tool}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant={showFavoritesOnly ? "contained" : "outlined"}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          startIcon={<FavoriteIcon />}
          size="small"
          sx={{
            ml: 1.5,
            height: 36,
            minWidth: 100,
            fontWeight: 500,
            borderRadius: 1.5,
            background: showFavoritesOnly
              ? theme.palette.mode === "dark"
                ? "#e91e63"
                : "#e91e63"
              : "transparent",
            borderColor: showFavoritesOnly
              ? "#e91e63"
              : theme.palette.mode === "dark"
              ? "#b0b0b0"
              : "#666",
            color: showFavoritesOnly
              ? "#fff"
              : theme.palette.mode === "dark"
              ? "#b0b0b0"
              : "#666",
            "&:hover": {
              background: showFavoritesOnly
                ? theme.palette.mode === "dark"
                  ? "#c2185b"
                  : "#c2185b"
                : theme.palette.mode === "dark"
                ? "rgba(224, 30, 99, 0.1)"
                : "rgba(224, 30, 99, 0.1)",
              borderColor: "#e91e63",
              color: showFavoritesOnly ? "#fff" : "#e91e63",
            },
          }}
        >
          {showFavoritesOnly ? "Show All" : "Favorites"}
        </Button>
      </Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, color: "primary.main", ml: { xs: 0, sm: 6 } }}
      >
        {showFavoritesOnly
          ? `My Favorites (${favorites ? favorites.length : 0})`
          : selectedDomain === "All"
          ? "All Domains"
          : selectedDomain}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {visibleUseCases.map((uc) => {
          const search = searchTerm.trim().toLowerCase();
          const matches =
            !search ||
            uc.title.toLowerCase().includes(search) ||
            (uc.description && uc.description.toLowerCase().includes(search));
          return (
            <Grid item xs={12} sm={6} md={4} key={uc.id}>
              <Box
                sx={
                  matches && search
                    ? {
                        border: `2px solid ${
                          theme.palette.mode === "dark" ? "#fff" : "#000"
                        }`,
                        boxShadow: 4,
                        borderRadius: 3,
                        transition: "all 0.2s",
                      }
                    : search
                    ? { opacity: 0.4, transition: "all 0.2s" }
                    : {}
                }
              >
                <UseCaseCard
                  useCase={uc}
                  onDetails={onDetails}
                  onRun={onRun}
                  runLoading={runLoading}
                  isFavorite={favorites && favorites.includes(uc.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
