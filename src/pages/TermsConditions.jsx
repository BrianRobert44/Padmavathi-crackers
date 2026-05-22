// src/pages/TermsConditions.jsx
import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GavelIcon from "@mui/icons-material/Gavel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import { colors } from "../colors";

const TermsConditions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Navigation handlers with smooth scroll
  const handleGoBack = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleGoHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Terms data organized for better display
  const termsHighlights = [
    {
      icon: <LocationOnIcon />,
      title: "Service Areas",
      description: "We accept orders from All Over India",
    },
    {
      icon: <PaymentIcon />,
      title: "Minimum Order",
      description: "Tamil Nadu & PY: ₹5,000 | Other States: ₹10,000",
    },
  ];

  const termsList = [
    "We accept orders from Tamil Nadu, Karnataka, Kerala, Telungana and Andhra.",
    "Minimum order for Tamil Nadu is Rs.5000/- and Rs.10000/- for other states.",
    "Free Doorstep delivery is applicable for TamilNadu on all orders above 5000 and Free Doorstep delivery charges for other states are applicable for all orders above 10000.",
    "Delivery is done by third party agencies.",
    "Availability of doorstep delivery to other regions of Tamil Nadu and other states depends on the pin code of the area.",
    "Additional delivery charges for doorstep delivery to other regions of Tamil Nadu will be collected on completion of delivery.",
    "Products will be dispatched only after your entire payment is confirmed.",
    "Once we receive the Estimation Enquiry, our customer care executive will call you to confirm and provide you the delivery details within 24 hours.",
    "Goods will be packed only in special cartons.",
    "We do not take responsibility for any damages incurred by transport. However, we will try and deliver the products without any damage by our continuous and vigilant monitoring.",
    "The product images on the website are for representative purpose only. The delivered product may vary in appearance and packaging.",
  ];

  return (
    <Box sx={{ width: "100%", bgcolor: colors.white, py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{
              color: colors.primaryRed,
              "&:hover": {
                bgcolor: colors.primaryRed + "10",
              },
            }}
          >
            Go Back
          </Button>
          <Button
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            sx={{
              color: colors.primaryRed,
              "&:hover": {
                bgcolor: colors.primaryRed + "10",
              },
            }}
          >
            Home
          </Button>
        </Box>

        {/* Header Section */}
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: colors.primaryRed + "10",
              px: 2,
              py: 1,
              borderRadius: 30,
              mb: 3,
            }}
          >
            <GavelIcon sx={{ color: colors.primaryRed, fontSize: "1.2rem" }} />
            <Typography
              sx={{
                color: colors.primaryRed,
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              TERMS & CONDITIONS
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.darkRed,
              mb: 2,
            }}
          >
            Terms and Conditions
          </Typography>

          <Typography
            sx={{
              color: colors.gray60,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            This website is owned and operated by Sri Padmavathi CRACKERS and is
            only for your personal use and not for any commercial purpose.
          </Typography>
        </Box>

        {/* Highlights Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 5,
            justifyContent: "center",
          }}
        >
          {termsHighlights.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 calc(33.333% - 16px)" },
                minWidth: { sm: "200px" },
                p: 3,
                bgcolor: colors.lightBlueGray,
                borderRadius: 3,
                border: `1px solid ${colors.gray70}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 25px ${colors.primaryRed}20`,
                  borderColor: colors.primaryRed,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    bgcolor: colors.primaryRed + "20",
                    color: colors.primaryRed,
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fontSize: "1.3rem" },
                  })}
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  {item.title}
                </Typography>
              </Box>
              <Typography sx={{ color: colors.gray60, fontSize: "0.9rem" }}>
                {item.description}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: colors.white,
            border: `1px solid ${colors.gray70}`,
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: `0 10px 40px ${colors.primaryRed}20`,
            },
          }}
        >
          {/* Introduction */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                color: colors.darkGray,
                fontSize: "1rem",
                lineHeight: 1.8,
                fontStyle: "italic",
                bgcolor: colors.lightBlueGray,
                p: 3,
                borderRadius: 3,
              }}
            >
              Your use of this website is subject to the following terms and
              conditions. By checking out, you are agreeing to these terms and
              conditions. Sri Padmavathi CRACKERS holds all the rights to change the
              terms and conditions at any time without any prior notice. We
              request our users to check and be aware of the changes in the
              privacy policy and terms and conditions.
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Detailed Terms List */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: colors.primaryRed,
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <InfoIcon sx={{ fontSize: "1.8rem" }} />
              Detailed Terms & Conditions
            </Typography>

            <List sx={{ width: "100%" }}>
              {termsList.map((term, index) => (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  sx={{
                    px: { xs: 0, sm: 2 },
                    py: 1.5,
                    borderBottom:
                      index < termsList.length - 1
                        ? `1px dashed ${colors.gray70}`
                        : "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: colors.lightBlueGray,
                      borderRadius: 2,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleOutlineIcon
                      sx={{
                        color: colors.primaryRed,
                        fontSize: "1.2rem",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={term}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: { xs: "0.9rem", sm: "0.95rem" },
                        color: colors.darkGray2,
                        lineHeight: 1.6,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Important Notes */}
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              bgcolor: colors.warningYellow + "20",
              borderRadius: 3,
              border: `1px solid ${colors.warningYellow}`,
            }}
          >
            <Typography
              sx={{
                color: colors.darkRed,
                fontSize: "1rem",
                fontWeight: 600,
                mb: 1,
              }}
            >
              ⚠️ Important Notes:
            </Typography>
            <Typography
              sx={{
                color: colors.darkGray,
                fontSize: "0.95rem",
                lineHeight: 1.8,
              }}
            >
              • The product images on the website are for representative purpose
              only. The delivered product may vary in appearance and packaging.
              <br />
              • We do not take responsibility for any damages incurred by
              transport. However, we will try and deliver the products without
              any damage by our continuous and vigilant monitoring.
              <br />• Delivery is done by third party agencies. Availability of
              doorstep delivery depends on the pin code of the area.
            </Typography>
          </Box>

          {/* Last Updated Note */}
          <Box
            sx={{
              mt: 5,
              pt: 3,
              borderTop: `1px dashed ${colors.gray70}`,
              textAlign: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: colors.gray60,
                fontSize: "0.85rem",
              }}
            >
              Last Updated: March 2026
            </Typography>
          </Box>
        </Paper>

        {/* Related Links */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => handleNavigation("/privacy-policy")}
            sx={{
              borderColor: colors.primaryRed,
              color: colors.primaryRed,
              "&:hover": {
                borderColor: colors.darkRed,
                bgcolor: colors.primaryRed + "10",
              },
            }}
          >
            Privacy Policy
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleNavigation("/shipping-policy")}
            sx={{
              borderColor: colors.primaryRed,
              color: colors.primaryRed,
              "&:hover": {
                borderColor: colors.darkRed,
                bgcolor: colors.primaryRed + "10",
              },
            }}
          >
            Shipping Policy
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TermsConditions;
