import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { colors } from "../colors";

const SocialShare = () => {
  const shareUrl = window.location.href;

  const handleWhatsAppShare = () => {
    window.open(`https://api.whatsapp.com/send?text=Check out Sri Padmavathi Crackers: ${shareUrl}`, "_blank");
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleInstagram = () => {
    // Instagram doesn't have a direct share link, so just link to their profile or a general intent
    window.open(`https://www.instagram.com/`, "_blank");
  };

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", my: 3 }}>
      <Tooltip title="Share on WhatsApp">
        <IconButton 
          onClick={handleWhatsAppShare}
          sx={{ 
            bgcolor: "#25D366", 
            color: "white", 
            "&:hover": { bgcolor: "#128C7E" },
            boxShadow: "0 4px 10px rgba(37, 211, 102, 0.3)" 
          }}
        >
          <WhatsAppIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Facebook">
        <IconButton 
          onClick={handleFacebookShare}
          sx={{ 
            bgcolor: "#1877F2", 
            color: "white", 
            "&:hover": { bgcolor: "#1659C7" },
            boxShadow: "0 4px 10px rgba(24, 119, 242, 0.3)" 
          }}
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Visit our Instagram">
        <IconButton 
          onClick={handleInstagram}
          sx={{ 
            background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", 
            color: "white", 
            "&:hover": { filter: "brightness(1.1)" },
            boxShadow: "0 4px 10px rgba(220, 39, 67, 0.3)" 
          }}
        >
          <InstagramIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SocialShare;
