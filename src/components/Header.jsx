// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
  Collapse,
  Menu,
  MenuItem,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { colors } from "../colors";
import { NavLink, useNavigate } from "react-router-dom";
import productData from "./productData";
import DownloadPriceList from "../assets/Price-list-25.pdf";
import logo from "../assets/logo/logo.jpeg";

// ✅ CHANGED: Added # before all href paths
const navItems = [
  { label: "HOME", href: "#/home" },
  { label: "ABOUT", href: "#/about" },
  { label: "QUICK ORDER", href: "#/" },
  { label: "NEW ARRIVALS", href: "#/new-arrivals" },
  { label: "CONTACT", href: "#/contact" },
  { label: "BLOGS", href: "#/blogs" },
];

// Get unique categories from productData
const categories = [
  "ALL CATEGORIES",
  ...productData.map((item) => item.category.toUpperCase()),
];

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMobileCategories, setShowMobileCategories] = useState(false);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const openCategoryMenu = Boolean(categoryAnchorEl);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartTotal = 0.0;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    handleCategoryClose();
    setShowMobileCategories(false);
    if (category === "ALL CATEGORIES") {
      navigate("#/");
    } else {
      // Find the original category name from productData (case-insensitive)
      const originalCategory = productData.find(
        (item) => item.category.toUpperCase() === category,
      )?.category;

      // Navigate with the original category name (not uppercase)
      navigate(
        `#/?category=${encodeURIComponent(originalCategory || category)}`,
      );
    }
  };

  // Mobile Drawer Content
  const drawer = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: colors.white,
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          p: 2.5,
          background: `linear-gradient(135deg, ${colors.primaryRed} 0%, ${colors.darkRed} 100%)`,
          color: colors.white,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={logo} alt="Sri Padmavathi Crackers Logo" style={{ height: "100px", width: "220px", objectFit: "contain", borderRadius: "4px", backgroundColor: "white", padding: "2px" }} />
            <Typography variant="h6" fontWeight={800} fontSize="1.1rem">
              Sri Padmavathi CRACKERS
            </Typography>
          </Box>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ color: colors.white, p: 1 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PhoneIcon sx={{ fontSize: "1rem" }} />
            <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
              99525 61300
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <WhatsAppIcon sx={{ fontSize: "1rem", color: "#25D366" }} />
            <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
              96551 21440
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Categories Section in Drawer */}
      <Box sx={{ px: 2, mb: 1 }}>
        <Button
          fullWidth
          onClick={() => setShowMobileCategories(!showMobileCategories)}
          sx={{
            justifyContent: "space-between",
            bgcolor: colors.lightBlueGray,
            color: colors.darkGray,
            py: 1.5,
            px: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          <span>ALL CATEGORIES</span>
          {showMobileCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>

        <Collapse in={showMobileCategories}>
          <List sx={{ pl: 2, pr: 1 }}>
            {categories.slice(1).map((category) => (
              <ListItem key={category} disablePadding sx={{ py: 0.5 }}>
                <ListItemButton
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    color: colors.darkGray2,
                    "&:hover": { bgcolor: colors.lightBlueGray },
                  }}
                  onClick={() => {
                    handleCategorySelect(category);
                    setMobileOpen(false);
                  }}
                >
                  <ListItemText
                    primary={category}
                    primaryTypographyProps={{ fontSize: "0.9rem" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>

      <Divider sx={{ mx: 2, my: 1 }} />

      {/* Navigation List */}
      <List sx={{ flexGrow: 1, px: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              sx={{
                color: colors.darkGray2,
                fontWeight: 600,
                py: 1.8,
                borderRadius: 2,
                mx: 1,
                my: 0.3,
                "&:hover": {
                  bgcolor: colors.lightBlueGray,
                  color: colors.primaryRed,
                },
                "&.active": {
                  color: colors.primaryRed,
                  bgcolor: colors.lightBlueGray,
                  fontWeight: 700,
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* Download Pricelist Button */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<DownloadIcon />}
          href={DownloadPriceList}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          sx={{
            bgcolor: colors.primaryRed,
            color: colors.white,
            py: 1.8,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: 2,
            fontSize: "1rem",
            boxShadow: "0 4px 12px rgba(185, 0, 0, 0.3)",
            "&:hover": {
              bgcolor: colors.darkRed,
            },
          }}
        >
          Download Pricelist
        </Button>
      </Box>

      {/* Social Icons in Drawer */}
      <Box
        sx={{ p: 2, pt: 0, display: "flex", justifyContent: "center", gap: 2 }}
      >
        <IconButton
          href="https://instagram.com"
          sx={{ color: "#E1306C", bgcolor: colors.lightBlueGray, p: 1.5 }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          href="https://youtube.com"
          sx={{ color: "#FF0000", bgcolor: colors.lightBlueGray, p: 1.5 }}
        >
          <YouTubeIcon />
        </IconButton>
        <IconButton
          href="https://wa.me/919655121440"
          sx={{ color: "#25D366", bgcolor: colors.lightBlueGray, p: 1.5 }}
        >
          <WhatsAppIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        transition: "all 0.3s ease-in-out"
      }}
    >
      {/* TOP RED BANNER - Hides on scroll */}
      <Collapse in={!scrolled}>
        <Box
          sx={{
            bgcolor: colors.primaryRed,
            color: colors.white,
            py: { xs: 1, sm: 1.2, md: 1.5 },
            px: { xs: 1.5, sm: 2, md: 3 },
            borderBottom: `2px solid ${colors.darkRed}`,
          }}
        >
          <Container maxWidth="xl" disableGutters>
            {/* Desktop/Tablet View */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: { xs: 1, md: 2 },
              }}
            >
              {/* Welcome Text */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.9rem", lg: "1rem" },
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Welcome to Sri Padmavathi CRACKERS, We are offering different
                varieties of fireworks and best quality Crackers. Best crackers
                shop in sivakasi.
              </Typography>

              {/* Contact Info */}
              <Stack
                direction="row"
                spacing={{ xs: 1.5, md: 3 }}
                sx={{
                  flexShrink: 0,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PhoneIcon sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.7rem", md: "0.85rem" },
                      fontWeight: 500,
                    }}
                  >
                    +91 99525 61300
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PhoneIcon sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.7rem", md: "0.85rem" },
                      fontWeight: 500,
                    }}
                  >
                    +91 96551 21440
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <EmailIcon sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }} />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.65rem", md: "0.8rem" },
                      fontWeight: 500,
                    }}
                  >
                    padmavathicrackers@gmail.com
                  </Typography>
                </Box>
              </Stack>
            </Box>


            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                flexDirection: "column",
                gap: 0.8,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Welcome to Sri Padmavathi CRACKERS - Best crackers shop in sivakasi
              </Typography>

              <Stack
                direction="row"
                spacing={1.5}
                justifyContent="center"
                alignItems="center"
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                  <PhoneIcon sx={{ fontSize: "0.7rem" }} />
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.6rem", fontWeight: 500 }}
                  >
                    99525 61300
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                  <PhoneIcon sx={{ fontSize: "0.7rem" }} />
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.6rem", fontWeight: 500 }}
                  >
                    96551 21440
                  </Typography>
                </Box>
                <IconButton
                  href="mailto:padmavathicrackers@gmail.com"
                  sx={{ color: colors.white, p: 0 }}
                  size="small"
                >
                  <EmailIcon sx={{ fontSize: "0.8rem" }} />
                </IconButton>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Collapse>

      {/* Main Header */}
      <Box
        sx={{
          backgroundColor: colors.white,
          color: colors.darkGray,
          borderBottom: `1px solid ${colors.lightGray}`,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              minHeight: { xs: 56, sm: 70, md: 80 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 1.5, sm: 2, md: 3 },
            }}
          >
            {/* Logo - ✅ CHANGED: to="#/" */}
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 }, overflow: "hidden" }}>
              <Box component={NavLink} to="#/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
                <Box component="img" src={logo} alt="Sri Padmavathi Crackers Logo" sx={{ height: { xs: "45px", sm: "80px" }, width: { xs: "55px", sm: "100px" }, objectFit: "contain", borderRadius: "4px" }} />
              </Box>
              <Typography
                component={NavLink}
                to="#/"
                sx={{
                  fontWeight: 900,
                  color: colors.primaryRed,
                  textDecoration: "none",
                  letterSpacing: "-0.3px",
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: { xs: "0.85rem", sm: "1.3rem", md: "1.5rem" },
                  lineHeight: 1.1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  whiteSpace: "nowrap"
                }}
              >
                Sri Padmavathi
                <Box
                  component="span"
                  sx={{
                    color: colors.darkRed,
                    display: "block",
                    fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" },
                    fontWeight: 700,
                  }}
                >
                  CRACKERS
                </Box>
              </Typography>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1, md: 2 },
                flexShrink: 0,
              }}
            >
              {/* Cart */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.3,
                  bgcolor: colors.lightBlueGray,
                  py: { xs: 0.4, sm: 0.8 },
                  px: { xs: 0.8, sm: 1.5 },
                  borderRadius: 4,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1rem" },
                    color: colors.darkGray,
                  }}
                >
                  ₹{cartTotal.toFixed(2)}
                </Typography>
                <ShoppingCartIcon
                  sx={{
                    color: colors.primaryRed,
                    fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                  }}
                />
              </Box>

              {/* Mobile Menu Button */}
              {(isMobile || isTablet) && (
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="open menu"
                  onClick={handleDrawerToggle}
                  sx={{
                    bgcolor: colors.primaryRed,
                    color: colors.white,
                    "&:hover": { bgcolor: colors.darkRed },
                    p: { xs: 0.8, sm: 1.2 },
                    ml: { xs: 0.2, sm: 0.5 },
                    display: { xs: "flex", md: "none" },
                  }}
                >
                  <MenuIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* Desktop Navigation - Only show on desktop */}
          {isDesktop && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 1.5,
                px: { md: 2, lg: 3 },
                borderTop: `1px solid ${colors.lightGray}`,
                pt: 1.5,
              }}
            >
              {/* Categories Dropdown */}
              <Box>
                <Button
                  variant="contained"
                  endIcon={<ExpandMoreIcon />}
                  onClick={handleCategoryClick}
                  sx={{
                    bgcolor: colors.primaryRed,
                    color: colors.white,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: { md: "0.85rem" },
                    px: { md: 2 },
                    py: { md: 1 },
                    borderRadius: 1,
                    minWidth: { md: 140 },
                    "&:hover": { bgcolor: colors.darkRed },
                  }}
                >
                  ALL CATEGORIES
                </Button>

                <Menu
                  anchorEl={categoryAnchorEl}
                  open={openCategoryMenu}
                  onClose={handleCategoryClose}
                  MenuListProps={{
                    "aria-labelledby": "categories-button",
                  }}
                  PaperProps={{
                    sx: {
                      maxHeight: 400,
                      width: "220px",
                      mt: 1,
                    },
                  }}
                >
                  {categories.slice(1).map((category) => (
                    <MenuItem
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      sx={{
                        py: 1.5,
                        "&:hover": {
                          bgcolor: colors.lightBlueGray,
                          color: colors.primaryRed,
                        },
                      }}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* Navigation Items */}
              <Stack direction="row" spacing={2}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={NavLink}
                    to={item.href}
                    sx={{
                      color: colors.darkGray,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "0.8rem",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        color: colors.primaryRed,
                        backgroundColor: "transparent",
                      },
                      "&.active": {
                        color: colors.primaryRed,
                        fontWeight: 700,
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>

              {/* Download Pricelist Button */}
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                href={DownloadPriceList}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: colors.primaryRed,
                  color: colors.primaryRed,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  py: 0.8,
                  px: 2,
                  borderRadius: 1,
                  borderWidth: 2,
                  whiteSpace: "nowrap",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    borderColor: colors.darkRed,
                    color: colors.darkRed,
                    borderWidth: 2,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(221, 18, 18, 0.1), transparent)",
                    animation: "shimmer 3s infinite",
                  },
                  "@keyframes shimmer": {
                    "0%": { left: "-100%" },
                    "30%": { left: "100%" },
                    "100%": { left: "100%" }
                  }
                }}
              >
                Download Pricelist
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Mobile/Tablet Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: 320,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}