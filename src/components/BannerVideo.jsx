// BannerVideo.jsx
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../colors";
import teaserVideo from "../assets/logo/0303.mp4";
import DownloadPriceList from "../assets/Price-list-25.pdf";

import "./BannerVideo.css";

function BannerVideo() {
  const handleScrollToProducts = () => {
    const productSection = document.getElementById("our-products");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box className="video-background">
      <video
        className="video-element"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={teaserVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Black Overlay for Text Readability */}
      <Box 
        sx={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
          zIndex: 2 
        }} 
      />

      {/* Hero Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          textAlign: "center",
          color: colors.white
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: 900,
              mb: 2,
              textTransform: "uppercase",
              letterSpacing: { xs: "1px", md: "2px" },
              textShadow: "2px 4px 10px rgba(0,0,0,0.6)",
              color: colors.white
            }}
          >
            Sri Padmavathi Crackers
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.5rem" },
              fontWeight: 500,
              mb: 4,
              opacity: 0.95,
              maxWidth: "800px",
              lineHeight: 1.4,
              textShadow: "1px 1px 5px rgba(0,0,0,0.5)"
            }}
          >
            Sivakasi's No.1 Destination for Premium & Safe Crackers. 
            Bring the Sparkle to Your Festivals!
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.4,
            type: "spring",
            stiffness: 100
          }}
        >
          <Button
            variant="contained"
            component="a"
            href={DownloadPriceList}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: colors.primaryRed,
              color: colors.white,
              fontSize: { xs: "0.85rem", md: "1.1rem" },
              fontWeight: 700,
              px: { xs: 4, md: 6 },
              py: { xs: 1.2, md: 1.8 },
              borderRadius: "50px",
              boxShadow: "0 10px 25px rgba(185, 0, 0, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: colors.darkRed,
                transform: "translateY(-2px)",
                boxShadow: "0 15px 30px rgba(185, 0, 0, 0.6)",
              }
            }}
          >
            View Price List
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}

export default BannerVideo;