import React from "react";
import { Modal, Fade, Backdrop, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./styles/UseCaseModal.css";

export default function UseCaseModal({ open, handleClose, useCase }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={open}>
        <Box className="usecase-modal-box">
          <Box className="usecase-modal-header">
            <Typography variant="h6">{useCase?.title}</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body1" className="usecase-modal-details">
            {useCase?.details}
          </Typography>
          <Box className="usecase-modal-interaction">
            <Typography variant="subtitle2">Try it out:</Typography>
            <Button variant="contained" color="primary" fullWidth style={{ marginTop: 8 }}>
              Demo Action
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
} 