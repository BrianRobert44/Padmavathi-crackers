// src/pages/AboutPage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { colors } from "../colors";

// Component imports
import AboutText from "../components/AboutText";
import WhyChooseUs from "../components/WhyChooseUs";
import SafetyTips from "../components/SafetyTips";

// Banner image (make sure this file exists in src/assets/banner/)
import bannerImage from "../assets/banner/aboutPage.jpg";

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Banner Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "280px", sm: "320px", md: "420px", lg: "480px" },
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {/* Dark overlay with slight gradient for better text readability */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            // background:
            //   "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.65))",
            zIndex: 1,
          }}
        />

        {/* Content on top */}
        <Box sx={{ position: "relative", zIndex: 2, px: 3 }}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            About
          </Typography>

          <Breadcrumbs
            separator="›"
            sx={{
              justifyContent: "center",
              display: "flex",
              color: "inherit",
              "& .MuiBreadcrumbs-separator": { color: "inherit" },
            }}
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              sx={{ fontWeight: 500 }}
            >
              Home
            </Link>
            <Typography color="inherit">About</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Main Content Sections */}
      <Box component="main">
        <AboutText />
        <WhyChooseUs />
        <SafetyTips />
      </Box>
    </Box>
  );
}
