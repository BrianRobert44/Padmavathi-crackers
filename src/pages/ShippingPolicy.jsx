// src/pages/ShippingPolicy.jsx
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
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { colors } from "../colors";

const ShippingPolicy = () => {
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

  // Shipping highlights
  const shippingHighlights = [
    {
      icon: <LocationOnIcon />,
      title: "Delivery Areas",
      description: "Tamil Nadu, Karnataka, Kerala, Telangana, Andhra Pradesh",
    },
    {
      icon: <PaymentIcon />,
      title: "Minimum Order",
      description: "Tamil Nadu & PY: ₹3,000 | Other States: ₹5,000",
    },
    {
      icon: <LocalShippingIcon />,
      title: "Free Shipping",
      description:
        "Tamil Nadu: Free on orders above ₹3,000 | Other States: Free on orders above ₹5,000",
    },
    {
      icon: <InventoryIcon />,
      title: "Packaging",
      description: "Special cartons used for safe delivery",
    },
  ];

  // Shipping policies
  const shippingPolicies = [
    {
      title: "Delivery Areas",
      icon: <LocationOnIcon />,
      content: [
        "We accept orders from Tamil Nadu, Karnataka, Kerala, Telangana and Andhra Pradesh.",
        "Availability of doorstep delivery depends on the pin code of the area.",
        "Additional delivery charges for doorstep delivery to other regions of Tamil Nadu will be collected on completion of delivery.",
      ],
    },
    {
      title: "Order Processing",
      icon: <AssignmentIcon />,
      content: [
        "Once we receive your order, our customer care executive will call you to confirm and provide delivery details within 24 hours.",
        "Products will be dispatched only after your entire payment is confirmed.",
        "Goods will be packed only in special cartons for maximum protection.",
      ],
    },
    {
      title: "Shipping Charges",
      icon: <PaymentIcon />,
      content: [
        "Free Doorstep delivery is applicable for TamilNadu on all orders above ₹3,000.",
        "Free Doorstep delivery charges for other states are applicable for all orders above ₹5,000.",
        "Orders below the minimum amount may incur additional shipping charges.",
      ],
    },
    {
      title: "Delivery Partners",
      icon: <LocalShippingIcon />,
      content: [
        "Delivery is done by third party agencies.",
        "We continuously monitor shipments to ensure safe delivery.",
        "Delivery timelines may vary based on location and courier partner availability.",
      ],
    },
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
            <LocalShippingIcon
              sx={{ color: colors.primaryRed, fontSize: "1.2rem" }}
            />
            <Typography
              sx={{
                color: colors.primaryRed,
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              SHIPPING POLICY
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
            Shipping & Delivery
          </Typography>

          <Typography
            sx={{
              color: colors.gray60,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            We ensure safe and timely delivery of your crackers through our
            trusted shipping partners.
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
          {shippingHighlights.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 calc(25% - 18px)" },
                minWidth: { sm: "180px" },
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
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    bgcolor: colors.primaryRed + "20",
                    color: colors.primaryRed,
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fontSize: "1.5rem" },
                  })}
                </Box>
                <Box>
                  <Typography
                    sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 0.5 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ color: colors.gray60, fontSize: "0.85rem" }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
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
          {/* Shipping Information Sections */}
          {shippingPolicies.map((section, index) => (
            <Box
              key={index}
              sx={{ mb: index < shippingPolicies.length - 1 ? 4 : 0 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: colors.primaryRed,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {React.cloneElement(section.icon, {
                  sx: { fontSize: "1.8rem" },
                })}
                {section.title}
              </Typography>

              <List sx={{ width: "100%" }}>
                {section.content.map((item, itemIndex) => (
                  <ListItem
                    key={itemIndex}
                    alignItems="flex-start"
                    sx={{
                      px: { xs: 0, sm: 2 },
                      py: 1,
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
                      primary={item}
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

              {index < shippingPolicies.length - 1 && (
                <Divider sx={{ my: 3 }} />
              )}
            </Box>
          ))}

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
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <InfoIcon />
              Important Shipping Information:
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Damage During Transit:</strong> We do not take
                responsibility for any damages incurred by transport. However,
                we will try and deliver the products without any damage by our
                continuous and vigilant monitoring.
              </Typography>

              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Third Party Delivery:</strong> Delivery is done by
                third party agencies. We continuously monitor shipments to
                ensure safe delivery.
              </Typography>

              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Pincode Availability:</strong> Availability of
                doorstep delivery to other regions of Tamil Nadu and other
                states depends on the pin code of the area.
              </Typography>

              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Additional Charges:</strong> Additional delivery
                charges for doorstep delivery to other regions of Tamil Nadu
                will be collected on completion of delivery.
              </Typography>

              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Product Images:</strong> The product images on the
                website are for representative purpose only. The delivered
                product may vary in appearance and packaging.
              </Typography>
            </Box>
          </Box>

          {/* Delivery Timeline Estimate */}
          <Box
            sx={{
              mt: 4,
              p: { xs: 2, md: 3 },
              bgcolor: colors.successGreen + "10",
              borderRadius: 3,
              border: `1px solid ${colors.successGreen}`,
            }}
          >
            <Typography
              sx={{
                color: colors.successGreen,
                fontSize: "1rem",
                fontWeight: 600,
                mb: 1,
              }}
            >
              📦 Estimated Delivery Timeline:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "space-around",
                mt: 2,
              }}
            >
              <Chip
                label="Tamil Nadu: 3-5 Business Days"
                sx={{
                  bgcolor: colors.successGreen + "20",
                  color: colors.successGreen,
                  fontWeight: 600,
                }}
              />
              <Chip
                label="Karnataka: 4-6 Business Days"
                sx={{
                  bgcolor: colors.successGreen + "20",
                  color: colors.successGreen,
                  fontWeight: 600,
                }}
              />
              <Chip
                label="Kerala: 4-6 Business Days"
                sx={{
                  bgcolor: colors.successGreen + "20",
                  color: colors.successGreen,
                  fontWeight: 600,
                }}
              />
              <Chip
                label="Andhra/Telangana: 5-7 Business Days"
                sx={{
                  bgcolor: colors.successGreen + "20",
                  color: colors.successGreen,
                  fontWeight: 600,
                }}
              />
            </Box>
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
            onClick={() => handleNavigation("/terms-conditions")}
            sx={{
              borderColor: colors.primaryRed,
              color: colors.primaryRed,
              "&:hover": {
                borderColor: colors.darkRed,
                bgcolor: colors.primaryRed + "10",
              },
            }}
          >
            Terms & Conditions
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ShippingPolicy;
