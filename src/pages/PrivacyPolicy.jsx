// src/pages/PrivacyPolicy.jsx
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
import SecurityIcon from "@mui/icons-material/Security";
import GavelIcon from "@mui/icons-material/Gavel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StorageIcon from "@mui/icons-material/Storage";
import UpdateIcon from "@mui/icons-material/Update";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import InfoIcon from "@mui/icons-material/Info";
import { colors } from "../colors";

const PrivacyPolicy = () => {
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

  // Privacy highlights
  const privacyHighlights = [
    {
      icon: <VerifiedUserIcon />,
      title: "Data Protection",
      description: "Advanced encryption & security measures",
    },
    {
      icon: <StorageIcon />,
      title: "Secure Storage",
      description: "Firewall-protected databases",
    },
    {
      icon: <UpdateIcon />,
      title: "Policy Updates",
      description: "Transparent communication on changes",
    },
    {
      icon: <GavelIcon />,
      title: "Grievance Redressal",
      description: "Dedicated officer for complaints",
    },
  ];

  // Privacy policy sections
  const privacySections = [
    {
      title: "Information Security",
      icon: <SecurityIcon />,
      content: [
        "We maintain a secure way to protect against unauthorized access, alteration, disclosure or destruction of your personal information and data stored on our Site.",
        "We take appropriate security measures including internal reviews of our data collection, storage and processing practices.",
        "Security measures include appropriate encryption and physical security measures to guard against unauthorized access to systems where we store personal data.",
      ],
    },
    {
      title: "Data Storage & Protection",
      icon: <StorageIcon />,
      content: [
        "All information gathered on our Website is securely stored within our controlled database.",
        "The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited.",
        "Only authorized personnel have access to personal information, and they are bound by confidentiality obligations.",
      ],
    },
    {
      title: "Policy Updates",
      icon: <UpdateIcon />,
      content: [
        "The internet is an ever evolving medium. We may change our Privacy Policy from time to time to incorporate necessary future changes.",
        "Our use of any information we gather will always be consistent with the policy under which the information was collected, regardless of what the new policy may be.",
        "We encourage users to periodically review this page for the latest information on our privacy practices.",
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
            <SecurityIcon
              sx={{ color: colors.primaryRed, fontSize: "1.2rem" }}
            />
            <Typography
              sx={{
                color: colors.primaryRed,
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              PRIVACY & SECURITY
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
            Privacy Policy
          </Typography>

          <Typography
            sx={{
              color: colors.gray60,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            Your privacy is important to us. This policy describes how we
            protect and handle your information when you use our services.
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
          {privacyHighlights.map((item, index) => (
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
          {/* Privacy Policy Sections */}
          {privacySections.map((section, index) => (
            <Box
              key={index}
              sx={{ mb: index < privacySections.length - 1 ? 4 : 0 }}
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

              {index < privacySections.length - 1 && <Divider sx={{ my: 3 }} />}
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
              Important Privacy Information:
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Security Limitations:</strong> As effective as our
                security measures are, no security system is impenetrable. We
                cannot guarantee the security of our database, nor can we
                guarantee that information you supply will not be intercepted
                while being transmitted to us over the Internet.
              </Typography>

              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Public Information:</strong> Any information you
                include in a posting to the discussion areas is available to
                anyone with Internet access. Please exercise caution when
                sharing personal information in public forums.
              </Typography>

              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Policy Changes:</strong> We reserve the right to
                update this privacy policy at any time. Changes will be
                effective immediately upon posting to the website.
              </Typography>

              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                }}
              >
                <strong>• Data Collection:</strong> We collect only the
                information necessary to process your orders and improve your
                shopping experience. We do not sell or rent your personal
                information to third parties.
              </Typography>
            </Box>
          </Box>

          {/* Grievance Redressal Section */}
          <Box
            sx={{
              mt: 4,
              p: { xs: 2, md: 3 },
              bgcolor: colors.primaryRed + "05",
              borderRadius: 3,
              border: `1px solid ${colors.primaryRed}30`,
            }}
          >
            <Typography
              sx={{
                color: colors.primaryRed,
                fontSize: "1.1rem",
                fontWeight: 700,
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <GavelIcon />
              Grievance Redressal
            </Typography>

            <Typography
              sx={{
                color: colors.darkGray,
                fontSize: "0.95rem",
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              <strong>Redressal Mechanism:</strong> Any complaints, abuse or
              concerns with regards to content or breach of these terms shall be
              immediately informed to the designated Grievance Officer as
              mentioned below.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: colors.white,
                borderRadius: 2,
                border: `1px solid ${colors.primaryRed}20`,
              }}
            >
              <Typography
                sx={{
                  color: colors.darkRed,
                  fontSize: "1rem",
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Grievance Officer
              </Typography>
              <Typography
                sx={{
                  color: colors.darkGray,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                Mr. V. Ravindran
              </Typography>
              <Typography
                sx={{
                  color: colors.gray60,
                  fontSize: "0.9rem",
                }}
              >
                Email: grievance@nachiyarcrackers.com
              </Typography>
            </Paper>
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

export default PrivacyPolicy;
