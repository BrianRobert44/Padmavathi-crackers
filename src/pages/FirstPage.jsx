// src/pages/FirstPage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { colors } from "../colors";

// Import your banner image (adjust path as needed)
// Make sure to add your banner image in the assets folder
import bannerImage from "../assets/homePage/banner1.jpg"; // You'll need to add this image
import BrandsLogo from "../components/BrandsLogo";
import ShowProduct from "../components/ShowProduct";
import BannerVideo from "../components/BannerVideo";
import SpecialOffer from "../components/SpecialOffer";
import CustomerReviews from "../components/CustomerReviews";
import FirstPageContent from "../components/FirstPageContent";
import FAQComponent from "../components/FAQComponent";
import AboutVisionSection from "../components/AboutVisionSection";

export default function FirstPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* Full Width Banner */}

      {/* Hero Banner Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "80vh", md: "90vh" },
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: colors.white,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <Typography
            variant={isMobile ? "h3" : "h1"}
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 1,
              textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Sri Padmavathi Crackers
          </Typography>
          <Typography
            variant={isMobile ? "h5" : "h3"}
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 4,
              color: colors.warningYellow,
            }}
          >
            CRACKERS SIVAKASI
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: colors.primaryRed,
                px: 4,
                py: 1.5,
                fontWeight: 800,
                fontSize: "1.1rem",
                "&:hover": { bgcolor: colors.darkRed },
              }}
              href="/home"
            >
              ORDER ONLINE
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: colors.white,
                borderColor: colors.white,
                px: 4,
                py: 1.5,
                fontWeight: 800,
                fontSize: "1.1rem",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: colors.white },
              }}
            >
              VIEW PRICE LIST
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Optional: Add some content below the banner */}
      <FirstPageContent />
      <AboutVisionSection />
      <ShowProduct />
      <BrandsLogo />
      <SpecialOffer />
      <CustomerReviews />
      <FAQComponent />
    </Box>
  );
}
