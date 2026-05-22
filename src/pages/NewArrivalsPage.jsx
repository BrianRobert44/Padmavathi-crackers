// src/pages/NewArrivalsPage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
  Rating,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Add this import
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import { colors } from "../colors";

// Placeholder images - Replace with your actual new arrival product images
import newArrival1 from "../assets/images/giftbox.jpg";
import newArrival2 from "../assets/images/colors.jpg";
import newArrival3 from "../assets/images/singlesound.jpg";
import newArrival4 from "../assets/images/dulex.jpg";
import bannerImage from "../assets/banner/newArrival.jpg";

const newArrivalsData = [
  {
    id: 1,
    name: "2026 Premium Gift Box",
    description:
      "Attractive gift box with a list at the rear showing the crackers inside. Safe and economically priced.",
    image: newArrival1,
    discount: "80%",
    rating: 4.8,
    reviews: 128,
    features: ["Zero Failure", "Best Price", "Safe Packaging"],
    category: "GIFT BOXES", // Add category for navigation
  },
  {
    id: 2,
    name: "Innovative Color Effect Crackers",
    description:
      "New arrival crackers with tremendous color effects. Quality with zero failure guarantee.",
    image: newArrival2,
    discount: "80%",
    rating: 4.9,
    reviews: 95,
    features: ["Tremendous Colors", "Innovative Design", "Top Quality"],
    category: "SPARKLERS", // Add category for navigation
  },
  {
    id: 3,
    name: "Premium Sound Crackers Pack",
    description:
      "High-quality sound crackers from our Sivakasi online pattasu shopping store. Zero failure assured.",
    image: newArrival3,
    discount: "80%",
    rating: 4.7,
    reviews: 156,
    features: ["Powerful Sound", "100% Quality", "Safe Fuse"],
    category: "SOUND CRACKERS", // Add category for navigation
  },
  {
    id: 4,
    name: "Deluxe Sparklers Assortment",
    description:
      "A variety of sparklers for a sparkling celebration. Best price online crackers shop in Sivakasi.",
    image: newArrival4,
    discount: "80%",
    rating: 4.8,
    reviews: 112,
    features: ["Long Lasting", "Bright Sparks", "Value Pack"],
    category: "SPARKLERS", // Add category for navigation
  },
];

const NewArrivalsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Add navigate hook
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Navigation handlers
  const handleShopNewArrivals = () => {
    navigate("/"); // Navigate to quick order page
    // Optional: Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewCatalog = () => {
    navigate("/"); // Navigate to quick order page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderNow = (category) => {
    // Navigate to quick order with category filter
    navigate(`/?category=${encodeURIComponent(category)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickView = (category) => {
    // Navigate to quick order with category filter
    navigate(`/?category=${encodeURIComponent(category)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShopNow = () => {
    navigate("/"); // Navigate to quick order page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
  };

  return (
    <>
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
            New Arrival
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
            <Typography color="inherit">New Arrival</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Box sx={{ width: "100%", bgcolor: colors.white, py: { xs: 4, md: 8 } }}>
        <Container maxWidth="xl">
          {/* Hero Section with Stats */}
          <motion.div {...fadeIn}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 3, md: 5 },
                mb: { xs: 6, md: 8 },
              }}
            >
              {/* Main Hero Content */}
              <Box sx={{ flex: 2 }}>
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
                  <NewReleasesIcon
                    sx={{ color: colors.primaryRed, fontSize: "1.2rem" }}
                  />
                  <Typography
                    sx={{
                      color: colors.primaryRed,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    2026 COLLECTION LAUNCHED
                  </Typography>
                </Box>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    lineHeight: 1.1,
                    mb: 2,
                    color: colors.darkRed,
                  }}
                >
                  New Arrival
                  <Box
                    component="span"
                    sx={{ color: colors.primaryRed, display: "block" }}
                  >
                    Crackers 2026
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    color: colors.gray60,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.8,
                    maxWidth: "600px",
                    mb: 4,
                  }}
                >
                  <strong>Padmavathi Crackers</strong> brings you the most
                  innovative collection with{" "}
                  <strong style={{ color: colors.primaryRed }}>
                    80% discount
                  </strong>
                  . Experience the magic of Sivakasi's finest crackers delivered
                  to your doorstep.
                </Typography>

                {/* CTA Buttons with navigation */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleShopNewArrivals}
                    sx={{
                      bgcolor: colors.primaryRed,
                      color: colors.white,
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 700,
                      "&:hover": { bgcolor: colors.darkRed },
                      transition: "all 0.3s ease",
                      transform: "scale(1)",
                      "&:active": { transform: "scale(0.98)" },
                    }}
                  >
                    Shop New Arrivals
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleViewCatalog}
                    sx={{
                      borderColor: colors.primaryRed,
                      color: colors.primaryRed,
                      px: 4,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: colors.darkRed,
                        bgcolor: colors.primaryRed + "10",
                        transform: "translateY(-2px)",
                      },
                      "&:active": { transform: "translateY(0)" },
                    }}
                  >
                    View Catalog
                  </Button>
                </Box>
              </Box>

              {/* Stats Cards */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: { xs: "row", sm: "row", md: "column" },
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    icon: <LocalShippingIcon />,
                    value: "Free Delivery",
                    label: "Above ₹999",
                  },
                  {
                    icon: <SecurityIcon />,
                    value: "100% Safe",
                    label: "Certified Products",
                  },
                  {
                    icon: <CheckCircleIcon />,
                    value: "Zero Failure",
                    label: "Quality Assured",
                  },
                ].map((stat, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      flex: 1,
                      minWidth: { xs: "120px", sm: "150px" },
                      p: 3,
                      bgcolor: colors.lightBlueGray,
                      borderRadius: 3,
                      border: `1px solid ${colors.gray70}`,
                      transition: "transform 0.3s",
                      "&:hover": { transform: "translateY(-5px)" },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: colors.primaryRed + "20",
                        color: colors.primaryRed,
                        width: 48,
                        height: 48,
                        mb: 2,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Typography
                      sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 0.5 }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{ color: colors.gray60, fontSize: "0.9rem" }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Featured Banner */}
          <motion.div {...fadeInUp}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                mb: { xs: 6, md: 8 },
                background: `linear-gradient(135deg, ${colors.primaryRed} 0%, ${colors.darkRed} 100%)`,
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative Circles */}
              <Box
                sx={{
                  position: "absolute",
                  top: -50,
                  right: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  left: -30,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 3,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LocalOfferIcon
                    sx={{ color: colors.white, fontSize: "3rem" }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        color: colors.white,
                        fontSize: "1.5rem",
                        fontWeight: 700,
                      }}
                    >
                      Special Launch Offer
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                      Get 80% discount on all new arrival products
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label="Limited Stock Available"
                  sx={{
                    bgcolor: colors.warningYellow,
                    color: colors.darkRed,
                    fontWeight: 700,
                    px: 2,
                    height: 40,
                    fontSize: "0.9rem",
                  }}
                />
              </Box>
            </Paper>
          </motion.div>

          {/* Products Section */}
          <Box sx={{ mb: 4 }}>
            <motion.div {...fadeInUp}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: colors.darkGray,
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Explore Our{" "}
                <span style={{ color: colors.primaryRed }}>New Collection</span>
              </Typography>
              <Typography
                sx={{
                  color: colors.gray60,
                  fontSize: "1rem",
                  textAlign: "center",
                  maxWidth: "700px",
                  mx: "auto",
                  mb: 6,
                }}
              >
                Discover the latest additions to our family, each crafted with
                precision and care to bring you the best celebration experience.
              </Typography>
            </motion.div>

            {/* Product Cards */}
            <Box
              component={motion.div}
              variants={{
                animate: { transition: { staggerChildren: 0.15 } },
              }}
              initial="initial"
              animate="animate"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                justifyContent: "center",
              }}
            >
              {newArrivalsData.map((product) => (
                <Box
                  key={product.id}
                  component={motion.div}
                  variants={fadeInUp}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.333% - 16px)",
                      lg: "calc(25% - 18px)",
                    },
                    minWidth: { xs: "100%", sm: "280px" },
                  }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 4,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: `0 20px 40px ${colors.primaryRed}30`,
                        "& .product-overlay": { opacity: 1 },
                        "& .product-image": { transform: "scale(1.1)" },
                      },
                    }}
                  >
                    {/* Image Container */}
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={product.image}
                        alt={product.name}
                        className="product-image"
                        sx={{
                          transition: "transform 0.6s ease",
                          objectFit: "cover",
                        }}
                      />

                      {/* Overlay with Quick View button */}
                      <Box
                        className="product-overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                          opacity: 0,
                          transition: "opacity 0.3s",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          p: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleQuickView(product.category)}
                          sx={{
                            bgcolor: colors.white,
                            color: colors.primaryRed,
                            fontWeight: 700,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: colors.primaryRed,
                              color: colors.white,
                              transform: "scale(1.05)",
                            },
                            "&:active": { transform: "scale(0.95)" },
                          }}
                        >
                          Quick View
                        </Button>
                      </Box>

                      {/* Badges */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          right: 12,
                          display: "flex",
                          justifyContent: "space-between",
                          zIndex: 2,
                        }}
                      >
                        <Chip
                          icon={<LocalOfferIcon />}
                          label={`${product.discount} OFF`}
                          size="small"
                          sx={{
                            bgcolor: colors.primaryRed,
                            color: colors.white,
                            fontWeight: 700,
                            "& .MuiChip-icon": { color: colors.white },
                          }}
                        />
                        <Chip
                          icon={<NewReleasesIcon />}
                          label="NEW"
                          size="small"
                          sx={{
                            bgcolor: colors.warningYellow,
                            color: colors.darkRed,
                            fontWeight: 700,
                          }}
                        />
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      {/* Rating */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1.5,
                        }}
                      >
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography
                          sx={{ color: colors.gray60, fontSize: "0.8rem" }}
                        >
                          ({product.reviews})
                        </Typography>
                      </Box>

                      {/* Product Name */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: colors.darkGray,
                          mb: 1,
                          fontSize: "1.1rem",
                        }}
                      >
                        {product.name}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          color: colors.gray60,
                          fontSize: "0.85rem",
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      {/* Features */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        {product.features.map((feature, i) => (
                          <Chip
                            key={i}
                            icon={
                              <CheckCircleIcon
                                sx={{ fontSize: "0.7rem !important" }}
                              />
                            }
                            label={feature}
                            size="small"
                            sx={{
                              bgcolor: colors.successGreen + "10",
                              color: colors.successGreen,
                              fontSize: "0.65rem",
                              height: 22,
                            }}
                          />
                        ))}
                      </Box>

                      {/* Order Now Button with navigation */}
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleOrderNow(product.category)}
                        sx={{
                          bgcolor: colors.primaryRed,
                          color: colors.white,
                          fontWeight: 600,
                          py: 1,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: colors.darkRed,
                            transform: "translateY(-2px)",
                            boxShadow: `0 5px 15px ${colors.primaryRed}50`,
                          },
                          "&:active": { transform: "translateY(0)" },
                        }}
                      >
                        Order Now
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Bottom CTA Section */}
          <motion.div {...fadeInUp}>
            <Box
              sx={{
                mt: { xs: 6, md: 8 },
                textAlign: "center",
                p: { xs: 4, md: 6 },
                bgcolor: colors.lightBlueGray,
                borderRadius: 4,
                border: `1px solid ${colors.gray70}`,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  color: colors.darkRed,
                  mb: 2,
                }}
              >
                Ready to Light Up Your Celebration?
              </Typography>
              <Typography
                sx={{
                  color: colors.gray60,
                  fontSize: "1.1rem",
                  maxWidth: "600px",
                  mx: "auto",
                  mb: 3,
                }}
              >
                Order now and get 80% discount on all new arrival products. Free
                delivery on orders above ₹999.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleShopNow}
                sx={{
                  bgcolor: colors.primaryRed,
                  color: colors.white,
                  px: 6,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: colors.darkRed,
                    transform: "translateY(-2px)",
                    boxShadow: `0 5px 20px ${colors.primaryRed}70`,
                  },
                  "&:active": { transform: "translateY(0)" },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default NewArrivalsPage;
