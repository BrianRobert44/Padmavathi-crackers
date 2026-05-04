// src/components/SpecialOffer.jsx
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../colors";
import { useNavigate } from "react-router-dom";

// Use a clean, high-quality festive background
import offerBg from "../assets/homePage/special-offer-bg.jpg";

const SpecialOffer = () => {
  const navigate = useNavigate();

  const goToShop = () => {
    navigate("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        textAlign: "center",
        backgroundImage: `url(${offerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        color: "#fff",
        minHeight: { xs: "40vh", md: "50vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Dark overlay - exactly like Seo component */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.65)",
          zIndex: 0,
        }}
      />

      <Container sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main heading - all in one line */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 1,
              color: "#fff",
              textTransform: "uppercase"
            }}
          >
            Special Offer
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            sx={{
              mt: 1,
              mb: 3,
              color: colors.white,
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3rem" },
              letterSpacing: "0.8px",
            }}
          >
            SAVE 30%
          </Typography>
          <br />


          {/* CTA Button - exactly like Seo component styling */}
          <Button
            variant="contained"
            onClick={goToShop}
            sx={{
              mt: 0.5,
              px: 6,
              py: 1.8,
              borderRadius: "10px",
              fontSize: { xs: "1.2rem", md: "1.3rem" },
              fontWeight: 600,
              textTransform: "none",
              background: colors.primaryRed,
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: colors.darkRed,
                transform: "translateY(-3px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              },
            }}
          >
            Shop Now →
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SpecialOffer;
