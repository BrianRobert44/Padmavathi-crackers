// src/components/FirstPageContent.jsx
import React from "react";
import { Box, Typography, Container, Button, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../colors";
import { useNavigate } from "react-router-dom";

// Icons
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// Import your image (replace with your actual image path)
import crackersImage from "../assets/homePage/banner1.jpg"; // Add your image here

const FirstPageContent = () => {
  const navigate = useNavigate();

  const handleEnquiry = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const features = [
    {
      icon: (
        <LocalFireDepartmentIcon
          sx={{ fontSize: 30, color: colors.primaryRed }}
        />
      ),
      title: "The Best Quality",
      description: "We are providing best price",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 30, color: colors.primaryRed }} />,
      title: "Our Crackers are Organic",
      description: "Eco-friendly & safe",
    },
    {
      icon: (
        <SupportAgentIcon sx={{ fontSize: 30, color: colors.primaryRed }} />
      ),
      title: "24 x 7 Support",
      description: "We're here to help anytime",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: colors.white20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Dynamic Festive Greeting Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              background: `linear-gradient(45deg, ${colors.primaryRed} 0%, ${colors.darkRed} 100%)`,
              color: colors.white,
              borderRadius: "15px",
              p: { xs: 2, md: 3 },
              mb: 6,
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(185, 0, 0, 0.3)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
                animation: "pulse 4s infinite",
              }
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.6rem" }, mb: 1 }}>
              ✨ Now Taking Orders for the Upcoming Festival! ✨
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Get the best deals on premium crackers. Bulk orders open now for wholesale prices.
            </Typography>
          </Box>
        </motion.div>

        {/* Safety & Trust Badges Section */}
        <Box sx={{ mb: 10 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, md: 4 }}
            justifyContent="center"
            alignItems="stretch"
          >
            {[
              { icon: <FamilyRestroomIcon />, title: "Family Safe", desc: "Low-smoke & Kid-friendly" },
              { icon: <WorkspacePremiumIcon />, title: "Premium Quality", desc: "100% Tested & Certified" },
              { icon: <LocalShippingIcon />, title: "Factory Direct", desc: "Best prices from Sivakasi" },
              { icon: <VerifiedUserIcon />, title: "Trusted Brand", desc: "10+ Years of Excellence" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                style={{ flex: 1 }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      bgcolor: `${colors.primaryRed}10`,
                      color: colors.primaryRed,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      fontSize: "2rem"
                    }}
                  >
                    {badge.icon}
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: colors.darkGray }}>
                    {badge.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.gray50, display: "block", lineHeight: 1.2 }}>
                    {badge.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Stack>
        </Box>

        {/* Company Overview Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                color: colors.primaryRed,
                fontWeight: 600,
                fontSize: { xs: "1.8rem", md: "2.2rem" },
                mb: 1,
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "3px",
                  backgroundColor: colors.primaryRed,
                  borderRadius: "2px",
                },
              }}
            >
              Company Overview
            </Typography>
          </Box>
        </motion.div>

        {/* Main Content - Image Left, Content Right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 6 },
            mb: 6,
          }}
        >
          {/* Left Side - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ flex: 1, width: "100%" }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "300px", sm: "400px", md: "500px" },
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease",
                },
              }}
            >
              <Box
                component="img"
                src={crackersImage}
                alt="Harish Crackers Showcase"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              {/* Optional overlay effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(45deg, rgba(221,18,18,0.1), rgba(0,0,0,0))",
                  pointerEvents: "none",
                }}
              />
            </Box>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ flex: 1 }}
          >
            <Box sx={{ width: "100%" }}>
              {/* Company Name */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2rem", md: "2.5rem", lg: "2rem" },
                    color: colors.primaryRed,
                    mb: 1,
                    letterSpacing: "1px",
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                  }}
                >
                  Sri Padmavathi Crackers
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    color: colors.gray50,
                    mb: 3,
                    letterSpacing: "2px",
                  }}
                >
                  RETAILS & WHOLESALE
                </Typography>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    lineHeight: 1.8,
                    color: colors.gray50,
                    mb: 2,
                  }}
                >
                  Diwali without a sparkler won't be fantastic. Not just Diwali,
                  it is used on the carnivals like Marriage, and New Year. It
                  brings your festival a sound feast. What makes crackers even
                  more appealing these days is that there is a platform for you
                  to buy crackers online?
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    lineHeight: 1.8,
                    color: colors.gray50,
                    mb: 4,
                    fontWeight: 500,
                  }}
                >
                  If you are interested to buy crackers{" "}
                  <span style={{ color: colors.primaryRed, fontWeight: 700 }}>
                    Enquiry Now
                  </span>
                  , Harish Crackers is the right platform.
                </Typography>
              </motion.div>

              {/* Enquiry Button */}
              <motion.div variants={itemVariants}>
                <Button
                  variant="contained"
                  onClick={handleEnquiry}
                  sx={{
                    backgroundColor: colors.primaryRed,
                    color: colors.white,
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    fontWeight: 600,
                    px: { xs: 5, md: 6 },
                    py: { xs: 1.5, md: 1.8 },
                    borderRadius: "50px",
                    textTransform: "none",
                    boxShadow: `0 4px 15px ${colors.primaryRed}80`,
                    transition: "all 0.3s ease",
                    mb: 4,
                    "&:hover": {
                      backgroundColor: colors.darkRed,
                      transform: "translateY(-3px)",
                      boxShadow: `0 8px 25px ${colors.primaryRed}`,
                    },
                  }}
                >
                  Enquiry Now
                </Button>
              </motion.div>

              {/* Features - Horizontal layout */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.3,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={featureVariants}
                      style={{ flex: 1 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          backgroundColor: colors.white,
                          borderRadius: "12px",
                          boxShadow: "0 3px 15px rgba(0,0,0,0.05)",
                          transition: "all 0.3s ease",
                          height: "100%",
                          border: `1px solid ${colors.gray70}`,
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                            borderColor: colors.primaryRed,
                          },
                        }}
                      >
                        <Box sx={{ mb: 1 }}>{feature.icon}</Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: colors.darkGray,
                            fontSize: "1rem",
                            mb: 0.5,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: colors.gray50,
                            fontSize: "0.85rem",
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Paper>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Box>

        {/* Legal Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: colors.backgroundPink || "#FADADD",
              borderRadius: "10px",
              border: `1px solid ${colors.primaryRed}30`,
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: colors.darkRed,
                textAlign: "center",
                fontWeight: 500,
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              <strong>Please Note:</strong> The honorable Supreme Court of India
              has banned sales of firecrackers from by 2018. We obey the order
              and we don't permit online purchase of crackers. For the
              convenience of yourself, we show our products on website and we
              don't undertake any online orders.
            </Typography>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FirstPageContent;
