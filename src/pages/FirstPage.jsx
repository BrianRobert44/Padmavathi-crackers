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
import DownloadPriceList from "../assets/Price-list-25.pdf";
import BrandsLogo from "../components/BrandsLogo";
import ShowProduct from "../components/ShowProduct";
import SpecialOffer from "../components/SpecialOffer";
import CustomerReviews from "../components/CustomerReviews";
import FirstPageContent from "../components/FirstPageContent";
import FAQComponent from "../components/FAQComponent";
import AboutVisionSection from "../components/AboutVisionSection";
import SeoContent from "../components/SeoContent";
import SocialShare from "../components/SocialShare";
import { Helmet } from "react-helmet-async";

export default function FirstPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Helmet>
        <title>Sri Padmavathi Crackers | Sivakasi Fireworks</title>
        <meta name="description" content="Buy premium quality crackers online from Sri Padmavathi Crackers, Sivakasi. Get the best wholesale prices, 100% genuine fireworks, and safe doorstep delivery across India." />
        <link rel="canonical" href="https://www.sripadmavathicrackers.com/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Sri Padmavathi Crackers | Sivakasi Fireworks" />
        <meta property="og:description" content="Buy premium quality crackers online from Sri Padmavathi Crackers, Sivakasi. Wholesale prices, safe delivery, and exciting festive offers." />
        <meta property="og:url" content="https://www.sripadmavathicrackers.com/" />
        <meta property="og:image" content="https://www.sripadmavathicrackers.com/logo.jpeg" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sri Padmavathi Crackers | Sivakasi Fireworks" />
        <meta name="twitter:description" content="Buy premium quality crackers online from Sri Padmavathi Crackers, Sivakasi. Wholesale prices, safe delivery, and exciting festive offers." />
        <meta name="twitter:image" content="https://www.sripadmavathicrackers.com/logo.jpeg" />
        
        {/* Structured Data (Schema.org Store / LocalBusiness) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": ["Store", "LocalBusiness"],
              "name": "Sri Padmavathi Crackers",
              "alternateName": "Sri Padmavathi Crackers Sivakasi",
              "description": "Sri Padmavathi Crackers is a premier fireworks dealer and wholesaler in Sivakasi offering premium quality crackers, diwali combos, and doorstep delivery across India.",
              "image": "https://www.sripadmavathicrackers.com/logo.jpeg",
              "@id": "https://www.sripadmavathicrackers.com/#store",
              "url": "https://www.sripadmavathicrackers.com/",
              "telephone": "+919952561300",
              "priceRange": "₹₹",
              "currenciesAccepted": "INR",
              "paymentAccepted": "Cash, UPI, Net Banking, Credit Card",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "14/496/8, Anuppankulam",
                "addressLocality": "Sivakasi",
                "addressRegion": "Tamil Nadu",
                "postalCode": "626189",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 9.4533,
                "longitude": 77.8024
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "09:00",
                  "closes": "21:00"
                }
              ],
              "sameAs": [
                "https://instagram.com/padmavathicrackers",
                "https://facebook.com",
                "https://youtube.com"
              ],
              "hasMap": "https://maps.google.com/?q=Sri+Padmavathi+Crackers+Sivakasi",
              "areaServed": "IN"
            }
          `}
        </script>
      </Helmet>
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
            component="h1"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant={isMobile ? "h3" : "h1"}
              component="span"
              sx={{
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              Sri Padmavathi Crackers
            </Typography>
            <Typography
              variant={isMobile ? "h5" : "h3"}
              component="span"
              sx={{
                fontWeight: 700,
                textTransform: "uppercase",
                mb: 4,
                color: colors.warningYellow,
              }}
            >
              Premium Quality Crackers in Sivakasi
            </Typography>
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
              component="a"
              href={DownloadPriceList}
              target="_blank"
              rel="noopener noreferrer"
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
      <SeoContent />
      <AboutVisionSection />
      <ShowProduct />
      <BrandsLogo />
      <SpecialOffer />
      <CustomerReviews />
      <SocialShare />
      <FAQComponent />
    </Box>
  );
}
