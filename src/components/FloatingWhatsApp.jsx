import React from "react";
import { Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { colors } from "../colors";

const FloatingWhatsApp = () => {
  const whatsappNumber = "919655121440";
  const message = "Hi, I'm interested in your crackers. Can you help me?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Tooltip title="Chat with us" placement="right">
      <Fab
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: { xs: 80, sm: 25 }, 
          left: 20,
          bgcolor: "#25D366", // WhatsApp Green
          color: "white",
          zIndex: 1400,
          "&:hover": {
            bgcolor: "#128C7E",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
        }}
      >
        <WhatsAppIcon sx={{ fontSize: "2rem" }} />
      </Fab>
    </Tooltip>
  );
};

export default FloatingWhatsApp;
