import React, { useState, useRef, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  TextField, 
  IconButton, 
  Typography, 
  Fade, 
  useTheme, 
  useMediaQuery, 
  InputAdornment, 
  CircularProgress,
  Paper,
  Drawer
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 380,
    maxWidth: '90vw',
    height: 'calc(100% - 55px)',
    margin: '20px',
    marginTop:"3.5%",
    marginRight:"0%",
    display: 'flex',
    flexDirection: 'column',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      margin: 0,
      borderRadius: 0,
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 'inherit',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: theme.shadows[1],
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#888',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.mode === 'dark' ? theme.palette.grey[600] : '#555',
  },
}));

const UserMessage = styled(Box)(({ theme }) => ({
  alignSelf: 'flex-end',
  maxWidth: '80%',
  padding: theme.spacing(1, 2),
  borderRadius: '18px 18px 0 18px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  wordBreak: 'break-word',
  boxShadow: theme.shadows[1],
}));

const BotMessage = styled(Box)(({ theme }) => ({
  alignSelf: 'flex-start',
  maxWidth: '80%',
  padding: theme.spacing(1, 2),
  borderRadius: '18px 18px 18px 0',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  wordBreak: 'break-word',
  boxShadow: theme.shadows[1],
  '& .MuiTypography-root': {
    color: 'inherit',
  },
}));

const ChatInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const Chatbot = ({ open: isChatOpen, onClose, selectedPrompt, onPromptSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(isChatOpen);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  useEffect(() => {
    setIsOpen(isChatOpen);
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (selectedPrompt) {
      setInput(selectedPrompt);
      setIsOpen(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [selectedPrompt]);

  const handleClickOutside = useCallback((event) => {
    const headerBar = document.querySelector('.MuiAppBar-root');
    if (headerBar && headerBar.contains(event.target)) {
      return;
    }
    
    if (
      chatContainerRef.current && 
      !chatContainerRef.current.contains(event.target) &&
      isOpen
    ) {
      setIsOpen(false);
      if (onClose) onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFileUpload = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      setMessages(prev => [...prev, { text: `Uploaded file: ${file.name}`, sender: 'user' }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'I\'ve received your file. How can I assist you with it?', sender: 'bot' }]);
      }, 1000);
    }
    event.target.value = null;
  };

  const handleWebSearch = () => {
    setMessages(prev => [...prev, { text: 'Searching the web...', sender: 'user' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Here are the search results for your query...', sender: 'bot' }]);
    }, 1000);
    handleMenuClose();
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    
    if (onPromptSelect && input === selectedPrompt) {
      onPromptSelect('');
    }
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      setTimeout(() => {
        const responses = [
          "I'm here to help you explore the AI Innovation Studio. What would you like to know?",
          "That's an interesting question! Let me find more information about that.",
          "I can help you with various AI use cases and features. What are you looking for?",
          "Thanks for your message! How can I assist you further?"
        ];
        const botResponse = {
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error. Please try again later.', 
        sender: 'bot' 
      }]);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Fade in={isOpen} timeout={300}>
        <StyledDrawer
          anchor="right"
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            if (onClose) onClose();
          }}
          variant={isMobile ? 'temporary' : 'persistent'}
          ModalProps={{
            keepMounted: true,
          }}
          ref={chatContainerRef}
        >
          <StyledPaper elevation={3}>
            <ChatHeader>
              <Typography variant="h6">AI Assistant</Typography>
              <IconButton 
                size="small" 
                onClick={() => setIsOpen(false)}
                sx={{ color: 'white' }}
              >
                <CloseIcon />
              </IconButton>
            </ChatHeader>
            <MessageContainer>
              {messages.map((message, index) => (
                message.sender === 'user' ? (
                  <UserMessage key={index}>
                    <Typography variant="body2">{message.text}</Typography>
                  </UserMessage>
                ) : (
                  <BotMessage key={index}>
                    <Typography variant="body2">{message.text}</Typography>
                  </BotMessage>
                )
              ))}
              {isLoading && (
                <BotMessage>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={16} thickness={4} />
                    <Typography variant="body2">Thinking...</Typography>
                  </Box>
                </BotMessage>
              )}
              <div ref={messagesEndRef} />
            </MessageContainer>
            <ChatInputContainer component="form" onSubmit={handleSend}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Write a prompt here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                inputRef={inputRef}
                InputProps={{
                  sx: {
                    borderRadius: 4,
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? theme.palette.grey[900] 
                      : theme.palette.grey[100],
                    '& input::placeholder': {
                      color: theme.palette.mode === 'dark' 
                        ? theme.palette.grey[400] 
                        : theme.palette.text.secondary,
                      opacity: 1,
                    },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        size="small"
                        onClick={handleMenuClick}
                        sx={{
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: 'rgba(249, 111, 58, 0.08)'
                          }
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        disableAutoFocusItem
                        disableEnforceFocus
                        disableAutoFocus
                        disablePortal
                        disableScrollLock
                        disableEscapeKeyDown
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        MenuListProps={{
                          'aria-labelledby': 'file-menu-button',
                        }}
                      >
                        <MenuItem 
                          component="label"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <input
                            type="file"
                            hidden
                            onClick={(e) => e.stopPropagation()}
                            onChange={handleFileUpload}
                          />
                          <Box display="flex" alignItems="center">
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <AttachFileIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Add files" />
                          </Box>
                        </MenuItem>
                        <MenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWebSearch();
                          }}>
                          <ListItemIcon>
                            <SearchIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Search the web</ListItemText>
                        </MenuItem>
                      </Menu>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleListening}
                        color={isListening ? 'success' : 'default'}
                        sx={{
                          mr: 1,
                          backgroundColor: isListening ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                          '&:hover': {
                            backgroundColor: isListening ? 'rgba(125, 197, 118, 0.2)' : 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        <MicIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                      >
                        {isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <SendIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </ChatInputContainer>
          </StyledPaper>
        </StyledDrawer>
      </Fade>
      {!isOpen && (
        <Box
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <ChatIcon />
        </Box>
      )}
    </>
  );
};

export default Chatbot;
