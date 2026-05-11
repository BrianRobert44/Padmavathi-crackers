// src/components/AboutVisionSection.jsx
import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { colors } from "../colors";

// Icons for visual appeal (you can replace with your own)
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import VerifiedIcon from "@mui/icons-material/Verified";

const AboutVisionSection = () => {
  // Data for the three cards
  const cardsData = [
    {
      id: "vision",
      icon: <VisibilityIcon sx={{ fontSize: 40, color: colors.primaryRed }} />,
      title: "Our Vision",
      description:
        "To be the top seller of fireworks in the market by providing all branded fireworks that satisfies our customers in all manners.",
    },
    {
      id: "mission",
      icon: <FlagIcon sx={{ fontSize: 40, color: colors.primaryRed }} />,
      title: "Our Mission",
      description:
        "To provide the best branded crackers to our customers to enjoy their celebrations in a safe and colorful way.",
    },
    {
      id: "quality",
      icon: <VerifiedIcon sx={{ fontSize: 40, color: colors.primaryRed }} />,
      title: "Our Quality",
      description:
        "Quality is very important for us and we never compromise with quality. Since we deal with a product that demands safety.",
    },
  ];

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: colors.white20,
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
              color: colors.primaryRed,
              mb: 2,
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "4px",
                backgroundColor: colors.primaryRed,
                borderRadius: "2px",
              },
            }}
          >
            What Defines Us
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: colors.gray60,
              fontSize: "1.1rem",
              maxWidth: "700px",
              mx: "auto",
              mt: 4,
              mb: 6,
            }}
          >
            Our commitment to excellence, safety, and customer satisfaction
            drives everything we do.
          </Typography>
        </motion.div>

        {/* Cards Grid */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {cardsData.map((card, index) => (
            <motion.div
              key={card.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              style={{ flex: 1, display: "flex" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  backgroundColor: colors.white,
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: `1px solid ${colors.gray80}`,
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(221,18,18,0.1)",
                    borderColor: colors.primaryRed,
                  },
                }}
              >
                {/* Icon Container */}
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: `${colors.primaryRed}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  {card.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", md: "1.75rem" },
                    color: colors.primaryRed,
                    mb: 2,
                  }}
                >
                  {card.title}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    lineHeight: 1.7,
                    color: colors.gray50,
                  }}
                >
                  {card.description}
                </Typography>

                {/* Decorative Element */}
                <Box
                  sx={{
                    mt: 3,
                    width: "50px",
                    height: "3px",
                    backgroundColor: colors.primaryRed,
                    borderRadius: "2px",
                    opacity: 0.3,
                  }}
                />
              </Paper>
            </motion.div>
          ))}
        </Box>

        {/* Optional: Add a subtle background element */}
        <Box
          sx={{
            position: "relative",
            mt: 8,
            "&:before": {
              content: '""',
              position: "absolute",
              top: -50,
              left: "50%",
              transform: "translateX(-50%)",
              width: "150px",
              height: "150px",
              background: `radial-gradient(circle, ${colors.primaryRed}10 0%, transparent 70%)`,
              borderRadius: "50%",
              zIndex: 0,
            },
          }}
        />
      </Container>
    </Box>
  );
};

export default AboutVisionSection;
