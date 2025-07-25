import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText,
  Drawer,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const promptsData = [
  {
    title: "Analyze a research paper",
    description: "Upload a research paper and get insights, summaries, and key findings extracted automatically."
  },
  {
    title: "Generate code documentation",
    description: "Create comprehensive documentation for your codebase with AI-powered analysis."
  },
  {
    title: "Design system architecture",
    description: "Get architectural recommendations and design patterns for your software project."
  },
  {
    title: "Create API endpoints",
    description: "Generate RESTful API endpoints with proper validation and error handling."
  },
  {
    title: "Optimize database queries",
    description: "Analyze and improve your database queries for better performance."
  },
  {
    title: "Generate test cases",
    description: "Create comprehensive unit and integration tests for your application."
  },
  {
    title: "Build responsive UI components",
    description: "Design and implement modern, responsive React components with best practices."
  },
  {
    title: "Implement authentication system",
    description: "Set up secure user authentication with JWT tokens and role-based access."
  },
  {
    title: "Create data visualization",
    description: "Build interactive charts and graphs to visualize your application data."
  },
  {
    title: "Deploy to cloud platforms",
    description: "Configure and deploy your application to AWS, Azure, or Google Cloud."
  },
  {
    title: "Implement real-time features",
    description: "Add WebSocket connections for real-time chat, notifications, or live updates."
  },
  {
    title: "Optimize application performance",
    description: "Identify bottlenecks and implement performance improvements for your app."
  }
];

const PromptsGallery = ({ open, onClose, onPromptSelect }) => {
  const theme = useTheme();

  const handlePromptClick = (prompt) => {
    if (onPromptSelect) {
      onPromptSelect(prompt);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        '& .MuiDrawer-paper': {
          width: 350,
          backgroundColor: theme.palette.background.paper,
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 2,
          pb: 1,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Prompts Gallery
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <List sx={{ p: 0 }}>
            {promptsData.map((prompt, index) => (
              <ListItem
                key={index}
                onClick={() => handlePromptClick(prompt)}
                sx={{
                  cursor: 'pointer',
                  borderRadius: 2,
                  mb: 1,
                  p: 2,
                  backgroundColor: theme.palette.action.hover,
                  border: `1px solid transparent`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.action.selected,
                    border: `1px solid ${theme.palette.primary.main}`,
                    transform: 'translateY(-1px)',
                    boxShadow: theme.shadows[2],
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        mb: 0.5
                      }}
                    >
                      {prompt.title}
                    </Typography>
                  }
                  secondary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                      }}
                    >
                      {prompt.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ 
          pt: 2, 
          borderTop: `1px solid ${theme.palette.divider}`,
          textAlign: 'center'
        }}>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            Click any prompt to get started with AI Innovation Studio
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PromptsGallery;
