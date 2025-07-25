import React, { useState } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AIDemoModal({ open, onClose, useCase }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);

  const isOpenAI =
    useCase?.aiTool?.toLowerCase().includes("openai") ||
    useCase?.aiTool?.toLowerCase().includes("gpt");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setError("");
    setResponse("");
    try {
      if (isOpenAI) {
        const res = await fetch("http://localhost:5001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });
        const data = await res.json();
        if (data.reply) {
          setMessages((msgs) => [...msgs, { sender: "ai", text: data.reply }]);
        } else {
          setError("No response from OpenAI.");
        }
      } else {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "ai",
            text: "Live demo for this AI tool is not yet integrated. Please contact admin or try OpenAI tools.",
          },
        ]);
      }
    } catch (err) {
      setError("Error connecting to AI service.");
    }
    setInput("");
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 540,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 8,
            p: 3,
            outline: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">{useCase?.aiTool} Demo</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {useCase?.title}
          </Typography>
          <Box
            sx={{
              mb: 2,
              maxHeight: 220,
              overflowY: "auto",
              borderRadius: 2,
              p: 1,
            }}
          >
            {messages.map((msg, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{
                  color:
                    msg.sender === "user" ? "primary.main" : "text.secondary",
                  mb: 0.5,
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <b>{msg.sender === "user" ? "You" : "AI"}:</b> {msg.text}
              </Typography>
            ))}
          </Box>
          <TextField
            fullWidth
            label="Enter your prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            sx={{ mb: 2 }}
          >
            {loading ? <CircularProgress size={22} /> : "Send"}
          </Button>
          {response && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: theme.palette.mode === "dark" ? "black" : "white",
                color: theme.palette.mode === "dark" ? "white" : "black",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {response}
              </Typography>
            </Box>
          )}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
