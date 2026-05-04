// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { colors } from "../colors";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.jpeg";

export default function Footer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const contactInfo = {
    address: "14/496/8, Anuppankulam, Sivakasi – 626189, Tamil Nadu",
    email: "padmavathicrackers@gmail.com",
    phone: "+91 99525 61300 | +91 96551 21440",
  };

  // Updated Other Pages with navigation paths based on navItems
  const otherPages = [
    { name: "HOME", path: "/home" },
    { name: "ABOUT", path: "/about" },
    { name: "QUICK ORDER", path: "/" },
    { name: "NEW ARRIVALS", path: "/new-arrivals" },
    { name: "CONTACT", path: "/contact" },
    { name: "BLOGS", path: "/blogs" },
    { name: "Online Crackers Sivakasi", path: "/" },
    { name: "Sivakasi Crackers Online", path: "/" },
    { name: "Online Crackers Purchase", path: "/" },
    { name: "Online Crackers 80% Discount", path: "/" },
  ];

  // Updated Tags with navigation paths
  const tags = [
    { name: "Online Pattasu Shopping", path: "/" },
    { name: "Online Crackers Karnataka", path: "/" },
    { name: "Online Crackers Andhra Pradesh", path: "/" },
    { name: "Online Crackers Hyderabad", path: "/" },
    { name: "சிவகாசி பட்டாசு ஆன்லைன்", path: "/" },
    { name: "Shipping Details", path: "/shipping-policy" },
    { name: "Dos and Don'ts Safe Diwali", path: "/safety-tips" },
    { name: "Refund and Returns Policy", path: "/returns-policy" },
  ];

  // Navigation handler with smooth scroll
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: colors.darkRed,
        color: colors.white,
        pt: { xs: 4, sm: 5, md: 6 },
        pb: { xs: 2, sm: 3 },
        borderTop: `4px solid ${colors.primaryRed}`,
      }}
    >
      <Container maxWidth="xl">
        {/* Using Box with flex for layout instead of Grid */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, sm: 5, md: 5 },
          }}
        >
          {/* Contact Us Section */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 2 }}>
              <img src={logo} alt="Sri Padmavathi Crackers Logo" style={{ height: "60px", objectFit: "contain", borderRadius: "4px" }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: colors.white,
                fontWeight: 700,
                mb: 2.5,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 50,
                  height: 3,
                  bgcolor: colors.warningYellow,
                },
              }}
            >
              Contact Us
            </Typography>

            <Stack spacing={2} sx={{ mt: 3 }}>
              {/* Address */}
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <LocationOnIcon
                  sx={{
                    color: colors.warningYellow,
                    fontSize: { xs: "1.2rem", sm: "1.3rem" },
                    flexShrink: 0,
                    mt: 0.3,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.white,
                    lineHeight: 1.6,
                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    opacity: 0.9,
                  }}
                >
                  {contactInfo.address}
                </Typography>
              </Box>

              {/* Email */}
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <EmailIcon
                  sx={{
                    color: colors.warningYellow,
                    fontSize: { xs: "1.2rem", sm: "1.3rem" },
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.white,
                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    wordBreak: "break-word",
                    opacity: 0.9,
                  }}
                >
                  {contactInfo.email}
                </Typography>
              </Box>

              {/* Phone */}
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <PhoneIcon
                  sx={{
                    color: colors.warningYellow,
                    fontSize: { xs: "1.2rem", sm: "1.3rem" },
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.white,
                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    opacity: 0.9,
                  }}
                >
                  {contactInfo.phone}
                </Typography>
              </Box>
            </Stack>

            {/* Social Media Icons */}
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: colors.white,
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  "&:hover": {
                    bgcolor: colors.brightBlue,
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <FacebookIcon
                  sx={{ fontSize: { xs: "1.2rem", sm: "1.3rem" } }}
                />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: colors.white,
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  "&:hover": {
                    bgcolor: "#E1306C",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <InstagramIcon
                  sx={{ fontSize: { xs: "1.2rem", sm: "1.3rem" } }}
                />
              </IconButton>
              <IconButton
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: colors.white,
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  "&:hover": {
                    bgcolor: "#FF0000",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <YouTubeIcon
                  sx={{ fontSize: { xs: "1.2rem", sm: "1.3rem" } }}
                />
              </IconButton>
              <IconButton
                href="https://wa.me/919655121440"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: colors.white,
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  "&:hover": {
                    bgcolor: "#25D366",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <WhatsAppIcon
                  sx={{ fontSize: { xs: "1.2rem", sm: "1.3rem" } }}
                />
              </IconButton>
            </Stack>
          </Box>

          {/* Other Pages Section */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: colors.white,
                fontWeight: 700,
                mb: 2.5,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 50,
                  height: 3,
                  bgcolor: colors.warningYellow,
                },
              }}
            >
              Other Pages
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 2,
              }}
            >
              {otherPages.map((page, index) => (
                <Box
                  key={index}
                  sx={{
                    width: { xs: "100%", sm: "calc(50% - 4px)" },
                  }}
                >
                  <Typography
                    onClick={() => handleNavigation(page.path)}
                    sx={{
                      color: colors.white,
                      textDecoration: "none",
                      fontSize: { xs: "0.85rem", sm: "0.9rem" },
                      display: "inline-block",
                      mb: 1,
                      transition: "all 0.3s ease",
                      opacity: 0.9,
                      cursor: "pointer",
                      "&:hover": {
                        color: "yellow",
                        transform: "translateX(5px)",
                        opacity: 1,
                      },
                    }}
                  >
                    • {page.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Tags Section */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: colors.white,
                fontWeight: 700,
                mb: 2.5,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: 50,
                  height: 3,
                  bgcolor: colors.warningYellow,
                },
              }}
            >
              Tags
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mt: 2,
              }}
            >
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.name}
                  onClick={() => handleNavigation(tag.path)}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: colors.white,
                    fontSize: { xs: "0.75rem", sm: "0.8rem" },
                    height: { xs: 32, sm: 36 },
                    "&:hover": {
                      bgcolor: "yellow",
                      color: colors.primaryRed,
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    borderRadius: "20px",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Legal Disclaimer Section */}
        <Box
          sx={{
            mt: 6,
            p: { xs: 2.5, sm: 3 },
            bgcolor: "rgba(0,0,0,0.2)",
            borderRadius: 2,
            border: `1px solid rgba(255,255,255,0.1)`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.warningYellow,
              fontWeight: 700,
              mb: 1.5,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Statutory Disclaimer & Compliance
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: colors.white,
              lineHeight: 1.8,
              fontSize: { xs: "0.8rem", sm: "0.85rem" },
              opacity: 0.9,
              textAlign: "justify",
            }}
          >
            As per 2018 supreme court order, online sale of firecrackers are not
            permitted! We value our customers and at the same time, respect
            jurisdiction. We request you to add your products to the cart and
            submit the required crackers through the enquiry button. We will
            contact you within 24 hrs and confirm the order through WhatsApp or
            phone call. Please add and submit your enquiries and enjoy your
            Diwali with Sri Padmavathi Crackers. <strong>Our License No. 296/2022.</strong> Sri
            Padmavathi Crackers as a company following 100% legal & statutory
            compliances and all our shops, go-downs are maintained as per the
            explosive acts. We send the parcels through registered and legal
            transport service providers as like every other major companies in
            Sivakasi is doing so.
          </Typography>
        </Box>

        {/* Divider */}
        <Divider
          sx={{
            my: { xs: 3, sm: 4 },
            borderColor: "rgba(255,255,255,0.2)",
          }}
        />

        {/* Copyright Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: colors.white,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              textAlign: { xs: "center", sm: "left" },
              opacity: 0.8,
            }}
          >
            © {new Date().getFullYear()} Sri Padmavathi CRACKERS. All rights
            reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3 },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Typography
              onClick={() => handleNavigation("/privacy-policy")}
              sx={{
                color: colors.white,
                textDecoration: "none",
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                opacity: 0.8,
                cursor: "pointer",
                "&:hover": {
                  color: "yellow",
                  opacity: 1,
                },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              onClick={() => handleNavigation("/terms-conditions")}
              sx={{
                color: colors.white,
                textDecoration: "none",
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                opacity: 0.8,
                cursor: "pointer",
                "&:hover": {
                  color: "yellow",
                  opacity: 1,
                },
              }}
            >
              Terms & Conditions
            </Typography>
            <Typography
              onClick={() => handleNavigation("/shipping-policy")}
              sx={{
                color: colors.white,
                textDecoration: "none",
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                opacity: 0.8,
                cursor: "pointer",
                "&:hover": {
                  color: "yellow",
                  opacity: 1,
                },
              }}
            >
              Shipping Policy
            </Typography>
          </Box>
        </Box>

        {/* Developed by Rohil Technologies */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            textAlign: "center",
            borderTop: "1px dashed rgba(255,255,255,0.2)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: colors.white,
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              flexWrap: "wrap",
            }}
          >
            Developed with{" "}
            <FavoriteIcon
              sx={{ fontSize: "1rem", color: colors.warningYellow, mx: 0.5 }}
            />{" "}
            by{" "}
            <Box
              component="span"
              sx={{
                color: colors.warningYellow,
                fontWeight: 700,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() =>
                window.open("https://rohiltechnologies.com", "_blank")
              }
            >
              Rohil Technologies
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
