// src/components/ShopNowButton.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Typography, Fade } from "@mui/material";
import { colors } from "../colors";

const ShopNowButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Handle shop now click - navigate to home and scroll to top
  const handleShopNow = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/home");
  };

  return (
    <Fade in={isVisible}>
      <Box
        onClick={handleShopNow}
        sx={{
          position: "fixed",
          bottom: "90px",
          right: "20px",
          zIndex: 1000,
          cursor: "pointer",
          bgcolor: colors.primaryRed,
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 75,
          height: 75,
          borderRadius: "50%",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          "&:hover": {
            transform: "scale(1.1) translateY(-5px)",
            bgcolor: colors.darkRed,
            boxShadow: "0 8px 25px rgba(221, 18, 18, 0.4)",
          },
          border: "2px solid white",
          textAlign: "center"
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: "1.4rem", mb: -0.5 }} />
        <Typography
          sx={{
            fontWeight: "900",
            fontSize: "0.65rem",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            mt: 0.5
          }}
        >
          Shop<br />Now
        </Typography>
      </Box>
    </Fade>
  );
};

export default ShopNowButton;

