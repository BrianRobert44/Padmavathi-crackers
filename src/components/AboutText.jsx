// src/components/AboutText.jsx
import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Paper,
} from "@mui/material";
import { colors } from "../colors";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarIcon from "@mui/icons-material/Star";
import SpaIcon from "@mui/icons-material/Spa";

// Import images
import aboutImg1 from "../assets/aboutPage/about1.jpg";
import aboutImg2 from "../assets/aboutPage/about2.jpg";
import aboutImg3 from "../assets/aboutPage/about3.jpg";
import aboutImg4 from "../assets/aboutPage/about4.jpg";

const AboutText = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // Refs for animation
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add animation class when element comes into view
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";

              // Add staggered animation for children
              const textBox = entry.target.querySelector(".text-box");
              const imageBox = entry.target.querySelector(".image-box");

              if (textBox) {
                textBox.style.animation = `slideIn${index % 2 === 0 ? "Left" : "Right"} 0.8s ease forwards`;
              }
              if (imageBox) {
                imageBox.style.animation = `slideIn${index % 2 === 0 ? "Right" : "Left"} 0.8s ease forwards`;
              }
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px" },
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const sections = [
    {
      title: "About Us",
      text: "Sri Padmavathi CRACKERS is a leading and famous Sivakasi crackers manufacturer, the premier online crackers shop Sivakasi. Our unique and exquisite collection of high-quality Sivakasi online crackers will add sparkle and joy to your celebration. We are sourced directly from the manufacturing unit, ensuring top-notch quality and safety. Make your online crackers purchase sivakasi from the most trusted shop in Sri Padmavathi CRACKERS are good in quality and the best price online sivakasi crackers shop.",
      image: aboutImg1,
      icon: <StarIcon />,
      bgColor: colors.lightBlueGray,
      imagePosition: "right",
    },
    {
      title: "Sivakasi Crackers Online",
      text: "Welcome to Sri Padmavathi CRACKERS is Sivakasi online crackers shop, a one-stop destination for all your festival needs. Explore a huge collection of Sivakasi crackers and sparklers at your fingertips. Enjoy crackers online shopping and discover a universal range of Sivakasi online crackers waiting for you to light up that sparkle to your Diwali celebration. Sivakasi crackers online have long been a part of celebrations and cultural events around the world, with each culture having its unique traditions and practices. We give more importance to the eco-friendly Sivakasi green crackers environment and customer safety.",
      image: aboutImg2,
      icon: <SpaIcon />,
      bgColor: colors.white,
      imagePosition: "left",
    },
    {
      title: "Quality Assurance",
      text: "We take pride in our rigorous quality control process. Every cracker that leaves our facility undergoes multiple safety checks to ensure it meets the highest standards. Our team of experts carefully monitors the manufacturing process, from raw material selection to final packaging, guaranteeing that you receive only the best products for your celebrations.",
      image: aboutImg3,
      icon: <SafetyCheckIcon />,
      bgColor: colors.lightBlueGray,
      imagePosition: "right",
    },
    {
      title: "Fast Delivery",
      text: "With our efficient logistics network, we ensure that your crackers reach you in perfect condition and on time. We understand the excitement of festival preparations, which is why we offer PAN India delivery with real-time tracking. Our special packaging ensures that your crackers remain safe during transit, so you can focus on celebrating.",
      image: aboutImg4,
      icon: <LocalShippingIcon />,
      bgColor: colors.white,
      imagePosition: "left",
    },
  ];

  // Responsive padding values
  const containerPadding = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
  };

  const sectionGap = {
    xs: 3,
    md: 4,
    lg: 6,
  };

  const titleFontSize = {
    xs: "1.2rem",
    sm: "1.5rem",
    md: "1.8rem",
    lg: "2rem",
  };

  const textFontSize = {
    xs: "0.85rem",
    sm: "0.9rem",
    md: "0.95rem",
    lg: "1rem",
  };

  const imageHeight = {
    xs: 200,
    sm: 250,
    md: 300,
    lg: 350,
    xl: 400,
  };

  const avatarSize = {
    xs: 40,
    sm: 50,
    md: 60,
    lg: 70,
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: colors.white,
        py: { xs: 3, sm: 4, md: 5, lg: 6 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .hover-float:hover {
            animation: float 3s ease-in-out infinite;
          }
          
          .hover-pulse:hover {
            animation: pulse 1s ease-in-out;
          }
          
          .fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
          }
          
          .fade-in-down {
            animation: fadeInDown 0.8s ease forwards;
          }
          
          .zoom-in {
            animation: zoomIn 0.6s ease forwards;
          }
        `}
      </style>

      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          pointerEvents: "none",
          background: `radial-gradient(circle at 10% 20%, ${colors.primaryRed} 0%, transparent 20%),
                      radial-gradient(circle at 90% 80%, ${colors.primaryRed} 0%, transparent 20%)`,
        }}
      />

      <Container maxWidth="xl" sx={{ px: containerPadding }}>
        {/* Header Banner with Animation */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: colors.primaryRed,
            color: colors.white,
            p: { xs: 2, sm: 3, md: 4, lg: 5 },
            mb: { xs: 3, sm: 4, md: 5, lg: 6 },
            borderRadius: { xs: 2, sm: 3, md: 4 },
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(185, 0, 0, 0.3)",
            animation: "fadeInDown 1s ease",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: `linear-gradient(45deg, ${colors.darkRed} 0%, ${colors.primaryRed} 100%)`,
              opacity: 0.5,
              animation: "rotate 20s linear infinite",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant={isMobile ? "h4" : isTablet ? "h3" : "h2"}
              sx={{
                fontWeight: 800,
                mb: { xs: 1, sm: 2 },
                textAlign: "center",
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
                animation: "pulse 2s ease-in-out infinite",
                lineHeight: 1.2,
              }}
            >
              Sri Padmavathi CRACKERS
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{
                textAlign: "center",
                maxWidth: "800px",
                mx: "auto",
                opacity: 0.9,
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                  md: "1rem",
                  lg: "1.1rem",
                },
                px: { xs: 1, sm: 2 },
              }}
            >
              Your Trusted Partner for Safe & Quality Crackers Since 1995
            </Typography>
          </Box>
        </Paper>

        {/* Zigzag Sections using only Box */}
        {sections.map((section, index) => (
          <Box
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: section.imagePosition === "right" ? "row" : "row-reverse",
              },
              gap: sectionGap,
              mb:
                index === sections.length - 1
                  ? 0
                  : { xs: 3, sm: 4, md: 5, lg: 6 },
              opacity: 0,
              transform: "translateY(40px)",
              transition: "all 0.5s ease",
            }}
          >
            {/* Text Section */}
            <Box
              className="text-box"
              sx={{
                flex: { md: 1 },
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 1.5, sm: 2, md: 3, lg: 4 },
                bgcolor: section.bgColor,
                borderRadius: { xs: 2, sm: 3, md: 4 },
                position: "relative",
                transition: "all 0.3s ease",
                opacity: 0,
                transform: `translateX(${index % 2 === 0 ? "-60px" : "60px"})`,
                "&:hover": {
                  transform: {
                    xs: "translateY(-5px)",
                    md: "translateY(-8px) scale(1.02)",
                  },
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Icon with Animation */}
              <Avatar
                className="hover-float"
                sx={{
                  bgcolor: colors.primaryRed,
                  color: colors.white,
                  width: avatarSize,
                  height: avatarSize,
                  mb: { xs: 1, sm: 2 },
                  animation: "pulse 2s ease-in-out infinite",
                  "&:hover": {
                    animation: "rotate 0.6s ease",
                  },
                  "& svg": {
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.5rem",
                      md: "1.8rem",
                      lg: "2rem",
                    },
                  },
                }}
              >
                {section.icon}
              </Avatar>

              {/* Title */}
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  color: colors.primaryRed,
                  fontWeight: 700,
                  mb: { xs: 1, sm: 2 },
                  position: "relative",
                  display: "inline-block",
                  fontSize: titleFontSize,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: { xs: 40, sm: 50, md: 60 },
                    height: 3,
                    bgcolor: colors.warningYellow,
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: { xs: 60, sm: 80, md: 100 },
                  },
                }}
              >
                {section.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: colors.darkGray2,
                  lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
                  fontSize: textFontSize,
                  textAlign: "justify",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: colors.darkRed,
                  },
                }}
              >
                {section.text}
              </Typography>
            </Box>

            {/* Image Section */}
            <Box
              className="image-box"
              sx={{
                flex: { md: 1 },
                width: { xs: "100%", md: "50%" },
                height: imageHeight,
                borderRadius: { xs: 2, sm: 3, md: 4 },
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                transition: "all 0.5s ease",
                opacity: 0,
                transform: `translateX(${index % 2 === 0 ? "60px" : "-60px"})`,
                "&:hover": {
                  transform: {
                    xs: "scale(1.02)",
                    md: "scale(1.03) rotate(1deg)",
                  },
                  boxShadow: "0 25px 50px rgba(185, 0, 0, 0.3)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(45deg, ${colors.primaryRed}40, ${colors.darkRed}40)`,
                  zIndex: 1,
                  opacity: 0,
                  transition: "opacity 0.5s ease",
                },
                "&:hover::before": {
                  opacity: 1,
                },
              }}
            >
              <Box
                component="img"
                src={section.image}
                alt={section.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: { xs: "scale(1.1)", md: "scale(1.15)" },
                  },
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x400?text=Sri+Padmavathi+CRACKERS";
                }}
              />

              {/* Overlay Text on Image with Animation */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: 10, sm: 15, md: 20 },
                  left: { xs: 10, sm: 15, md: 20 },
                  zIndex: 2,
                  bgcolor: "rgba(0,0,0,0.7)",
                  color: colors.white,
                  px: { xs: 1, sm: 1.5, md: 2 },
                  py: { xs: 0.5, sm: 0.8, md: 1 },
                  borderRadius: { xs: 1.5, sm: 2 },
                  backdropFilter: "blur(5px)",
                  transform: "translateY(20px)",
                  opacity: 0,
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translateY(0)",
                    opacity: 1,
                  },
                  ".image-box:hover &": {
                    transform: "translateY(0)",
                    opacity: 1,
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: {
                      xs: "0.6rem",
                      sm: "0.65rem",
                      md: "0.7rem",
                      lg: "0.75rem",
                    },
                  }}
                >
                  <CelebrationIcon
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    }}
                  />
                  {index === 0 && "Premium Quality"}
                  {index === 1 && "Eco Friendly"}
                  {index === 2 && "Safety First"}
                  {index === 3 && "Fast Delivery"}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}

        {/* Stats Section with Animation */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
            mt: { xs: 4, sm: 5, md: 6, lg: 8 },
          }}
        >
          {[
            {
              number: "25+",
              label: "Years of Excellence",
              icon: <StarIcon />,
              delay: "0s",
            },
            {
              number: "10K+",
              label: "Happy Customers",
              icon: <CelebrationIcon />,
              delay: "0.2s",
            },
            {
              number: "100+",
              label: "Product Varieties",
              icon: <SafetyCheckIcon />,
              delay: "0.4s",
            },
            {
              number: "24/7",
              label: "Customer Support",
              icon: <LocalShippingIcon />,
              delay: "0.6s",
            },
          ].map((stat, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                textAlign: "center",
                bgcolor: colors.lightBlueGray,
                borderRadius: { xs: 2, sm: 2.5, md: 3 },
                transition: "all 0.3s ease",
                animation: "zoomIn 0.6s ease forwards",
                animationDelay: stat.delay,
                opacity: 0,
                transform: "scale(0.9)",
                "&:hover": {
                  transform: {
                    xs: "translateY(-5px) scale(1.02)",
                    md: "translateY(-8px) scale(1.05)",
                  },
                  boxShadow: "0 15px 30px rgba(185, 0, 0, 0.2)",
                  bgcolor: colors.primaryRed,
                  "& .stat-number, & .stat-label, & .stat-icon": {
                    color: colors.white,
                  },
                },
              }}
            >
              <Box
                className="stat-icon"
                sx={{
                  color: colors.primaryRed,
                  mb: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  animation: "pulse 2s ease-in-out infinite",
                  "& svg": {
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  },
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                className="stat-number"
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: colors.darkGray,
                  mb: 0.5,
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.5rem",
                    md: "1.8rem",
                    lg: "2rem",
                  },
                }}
              >
                {stat.number}
              </Typography>
              <Typography
                className="stat-label"
                variant="body2"
                sx={{
                  color: colors.gray60,
                  fontSize: {
                    xs: "0.7rem",
                    sm: "0.75rem",
                    md: "0.8rem",
                    lg: "0.9rem",
                  },
                }}
              >
                {stat.label}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AboutText;
