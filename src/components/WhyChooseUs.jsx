// src/components/WhyChooseUs.jsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { colors } from "../colors"; // Fixed import - using {} since you export as object

// Icons
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FactoryIcon from "@mui/icons-material/Factory";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

// Import background image (adjust path based on your image location)
// Option 1: If image is in src/assets/
import coverImage from "../assets/aboutPage/banner1.jpg";
// Option 2: If image is in src/assets/aboutPage/
// import coverImage from "../assets/aboutPage/coverimage.png";
// Option 3: If image is in public/images/
// const coverImage = "/images/coverimage.png";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Attractive",
      description: "Secure and innovative packaging of Sparklers.",
      icon: <Inventory2Icon sx={{ fontSize: 28, color: colors.white }} />,
      bgColor: colors.primaryRed,
    },
    {
      title: "Manufacturing",
      description: "Made from the finest raw materials.",
      icon: <FactoryIcon sx={{ fontSize: 28, color: colors.white }} />,
      bgColor: colors.darkRed,
    },
    {
      title: "Glittering and Colourful",
      description: "Our sparklers produce less smoke.",
      icon: <ColorLensIcon sx={{ fontSize: 28, color: colors.white }} />,
      bgColor: colors.primaryRed,
    },
    {
      title: "Safety",
      description: "100% safe sparklers for children to use.",
      icon: <VerifiedUserIcon sx={{ fontSize: 28, color: colors.white }} />,
      bgColor: colors.darkRed,
    },
    {
      title: "Wholesale Price",
      description: "We supply all types of crackers at wholesale price.",
      icon: <LocalOfferIcon sx={{ fontSize: 28, color: colors.white }} />,
      bgColor: colors.primaryRed,
    },
    {
      title: "Customer Satisfaction",
      description: "We guarantee your full-hearted pure satisfaction.",
      icon: (
        <SentimentVerySatisfiedIcon
          sx={{ fontSize: 28, color: colors.white }}
        />
      ),
      bgColor: colors.darkRed,
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 5, md: 6, lg: 8 },
        textAlign: "center",
        backgroundImage: `url(${coverImage})`, // Using imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: { xs: "scroll", md: "fixed" }, // Parallax effect on desktop
        position: "relative",
        color: colors.white,
        overflow: "hidden",
        mt: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Animated Particles Effect */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {[...Array(15)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: { xs: 4, sm: 6 },
              height: { xs: 4, sm: 6 },
              background: colors.warningYellow,
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
              animation: `floatParticle ${15 + Math.random() * 20}s linear infinite`,
              "@keyframes floatParticle": {
                "0%": {
                  transform: "translateY(0) translateX(0)",
                  opacity: 0,
                },
                "10%": { opacity: 0.3 },
                "90%": { opacity: 0.3 },
                "100%": {
                  transform: "translateY(-100vh) translateX(100px)",
                  opacity: 0,
                },
              },
            }}
          />
        ))}
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Heading */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: colors.warningYellow,
            mb: { xs: 1, sm: 2 },
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "25%",
              width: "50%",
              height: 4,
              background: colors.primaryRed,
              borderRadius: 2,
            },
          }}
        >
          Why Choose Us
        </Typography>

        {/* Subheading */}
        <Typography
          sx={{
            mb: { xs: 4, sm: 5, md: 6 },
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            lineHeight: 1.6,
            maxWidth: "700px",
            mx: "auto",
            color: "rgba(255,255,255,0.9)",
            mt: { xs: 2, sm: 3 },
          }}
        >
          Delivering safe, sparkling celebrations with trust & innovation!
        </Typography>

        {/* Features Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 4, sm: 5, md: 6 },
            px: { xs: 1, sm: 2, md: 0 },
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: { xs: 3, sm: 4 },
                py: { xs: 4, sm: 5 },
                px: { xs: 2, sm: 3 },
                color: colors.darkGray,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                position: "relative",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: `fadeUp 0.8s ease-out ${index * 0.15}s both`,
                border: "1px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  transform: {
                    xs: "translateY(-5px)",
                    md: "translateY(-10px)",
                  },
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  backgroundColor: colors.white,
                },
                "&:hover .iconCircle": {
                  transform: "translateX(-50%) scale(1.15)",
                  boxShadow: `0 10px 25px ${feature.bgColor}80`,
                },
                "@keyframes fadeUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(40px)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                },
              }}
            >
              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  color: feature.bgColor,
                  fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                }}
              >
                {feature.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  mb: { xs: 4, sm: 5 },
                  fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" },
                  color: colors.black,
                  lineHeight: 1.6,
                  px: { xs: 1, sm: 2 },
                }}
              >
                {feature.description}
              </Typography>

              {/* Icon Circle */}
              <Box
                className="iconCircle"
                sx={{
                  position: "absolute",
                  bottom: -28,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: 52, sm: 56 },
                  height: { xs: 52, sm: 56 },
                  borderRadius: "50%",
                  backgroundColor: feature.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 6px 15px ${feature.bgColor}80`,
                  transition: "all 0.3s ease",
                  border: "3px solid white",
                  "& svg": {
                    fontSize: { xs: 24, sm: 28 },
                  },
                }}
              >
                {feature.icon}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom Decorative Line */}
        <Box
          sx={{
            width: { xs: 100, sm: 150, md: 200 },
            height: 3,
            background: `linear-gradient(90deg, transparent, ${colors.primaryRed}, ${colors.warningYellow}, ${colors.primaryRed}, transparent)`,
            mx: "auto",
            mt: { xs: 6, sm: 7, md: 8 },
            borderRadius: 3,
          }}
        />
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
