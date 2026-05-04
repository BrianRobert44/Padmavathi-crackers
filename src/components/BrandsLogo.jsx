// src/components/BrandsLogo.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { colors } from "../colors";

// Import your brand images
import Brand1 from "../assets/homePage/brand1.jpg";
import Brand2 from "../assets/homePage/brand2.jpg";
import Brand3 from "../assets/homePage/brand3.jpg";
import Brand4 from "../assets/homePage/brand4.jpg";
import Brand5 from "../assets/homePage/brand5.jpg";
import Brand6 from "../assets/homePage/brand6.jpg";
import Brand7 from "../assets/homePage/brand7.jpg";
import Brand8 from "../assets/homePage/brand8.jpg";
import Brand9 from "../assets/homePage/brand9.jpg";

const brands = [
  { id: 1, name: "Standard", image: Brand1 },
  { id: 2, name: "Cobra", image: Brand2 },
  { id: 3, name: "Ajantha", image: Brand3 },
  { id: 4, name: "Sri Krishna", image: Brand4 },
  { id: 5, name: "Vijay", image: Brand5 },
  { id: 6, name: "Raksha", image: Brand6 },
  { id: 7, name: "Queen", image: Brand7 },
  { id: 8, name: "King", image: Brand8 },
  { id: 9, name: "Spark", image: Brand9 },
];

export default function BrandsLogo() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Duplicate brands 3× for smooth infinite scroll (no visible jump)
  const duplicatedBrands = [...brands, ...brands, ...brands];

  // Slower & smoother animation on larger screens
  const animationSpeed = isMobile ? "35s" : isTablet ? "45s" : "60s";

  // Responsive sizing – bigger & more professional
  const logoSize = {
    xs: { width: 120, height: 70 },
    sm: { width: 140, height: 80 },
    md: { width: 180, height: 100 },
    lg: { width: 220, height: 120 },
  };

  const gap = { xs: 3, sm: 4, md: 6 };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: colors.white,
        py: { xs: 4, md: 6 },
        borderTop: `1px solid ${colors.lightGray}`,
        borderBottom: `1px solid ${colors.lightGray}`,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: colors.primaryRed,
            mb: { xs: 5, md: 6 },
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: "120px",
              height: "4px",
              bgcolor: colors.primaryRed,
              borderRadius: 2,
            },
          }}
        >
          Our Trusted Brands
        </Typography>
      </Container>

      {/* Single smooth infinite scrolling row */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          "&:hover .marquee": {
            animationPlayState: "paused",
          },
        }}
      >
        {/* Fade gradients on edges – professional touch */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: { xs: 60, md: 120 },
            height: "100%",
            background: `linear-gradient(to right, ${colors.white}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: 60, md: 120 },
            height: "100%",
            background: `linear-gradient(to left, ${colors.white}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <Box
          className="marquee"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: gap,
            mt:2,
            animation: `marqueeScroll ${animationSpeed} linear infinite`,
            width: "max-content",
            willChange: "transform", // smoother performance
            "@keyframes marqueeScroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-33.33%)" }, // -1/3 because duplicated 3×
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <Box
              key={`${brand.id}-${index}`}
              sx={{
                width: logoSize.lg.width, // fallback
                height: logoSize.lg.height,
                [theme.breakpoints.down("lg")]: {
                  width: logoSize.md.width,
                  height: logoSize.md.height,
                },
                [theme.breakpoints.down("md")]: {
                  width: logoSize.sm.width,
                  height: logoSize.sm.height,
                },
                [theme.breakpoints.down("sm")]: {
                  width: logoSize.xs.width,
                  height: logoSize.xs.height,
                },
                flexShrink: 0,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: colors.white,
                // Remove the default border and use boxShadow instead
                boxShadow: `0 0 0 1px ${colors.lightGray}`, // This creates a border-like effect
                transition: "all 0.35s ease",
                cursor: "pointer",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.08)",
                  boxShadow: `0 12px 32px rgba(0,0,0,0.12), 0 0 0 2px ${colors.primaryRed}`, // Add border on all 4 sides using boxShadow
                  // No border property needed
                },
              }}
            >
              <Box
                component="img"
                src={brand.image}
                alt={`${brand.name} logo`}
                loading="lazy"
                sx={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                  transition: "transform 0.4s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
