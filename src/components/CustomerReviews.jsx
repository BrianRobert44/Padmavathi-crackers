// src/components/CustomerReviews.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Paper,
  Container,
  IconButton,
  Fade,
  Zoom,
  Grow,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { colors } from "../colors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StarIcon from "@mui/icons-material/Star";

// Enhanced reviews with detailed descriptions
const reviews = [
  {
    desc: "Best Value Ever",
    name: "Somashekhar S",
    location: "Bangalore",
    stars: 5,
    detailedDesc:
      "The prices here are unbeatable! Got premium quality crackers at 80% off retail prices. The 5' Lemon and Atom bombs were particularly impressive. Saved over ₹5000 compared to local shops.",
    purchaseDate: "Diwali 2024",
    product: "Diwali Combo Pack",
    verified: true,
    deliveryDays: 4,
  },
  {
    desc: "Super Fast Delivery",
    name: "Priya R",
    location: "Chennai",
    stars: 5,
    detailedDesc:
      "Ordered on Monday, received by Wednesday! The packaging was excellent with multiple layers of protection. All 50+ items were intact and worked perfectly. Special thanks to Veera Vijay for the prompt updates.",
    purchaseDate: "Oct 2024",
    product: "Mixed Crackers Box",
    verified: true,
    deliveryDays: 2,
  },
  {
    desc: "Lowest Price Online",
    name: "Karthik M",
    location: "Hyderabad",
    stars: 5,
    detailedDesc:
      "Compared prices across 5 different websites - Jallikattu had the best rates by far. The 5' Orange crackers were massive and created the loudest sound. Free complimentary items were a nice surprise!",
    purchaseDate: "Nov 2024",
    product: "Premium Crackers Set",
    verified: true,
    deliveryDays: 5,
  },
  {
    desc: "Perfect Packaging",
    name: "Divya S",
    location: "Coimbatore",
    stars: 5,
    detailedDesc:
      "Worried about delivery damage, but everything was packed in heavy-duty carton boxes with bubble wrap. Each cracker box was intact. The Flower Pots and Sparklers were arranged beautifully.",
    purchaseDate: "Diwali 2024",
    product: "Flower Pots Pack",
    verified: true,
    deliveryDays: 3,
  },
  {
    desc: "Awesome Quality",
    name: "Ramesh Kumar",
    location: "Mysore",
    stars: 5,
    detailedDesc:
      "The quality of Sivakasi crackers is unmatched! Every single cracker lit properly - no duds. The sound quality of 1000-wala ladi was thunderous. Pure Sivakasi authentic products.",
    purchaseDate: "Oct 2024",
    product: "Sound Crackers Pack",
    verified: true,
    deliveryDays: 4,
  },
  {
    desc: "Unbeatable Deals",
    name: "Anjali P",
    location: "Vizag",
    stars: 5,
    detailedDesc:
      "The Buy 2 Get 1 free offer on 5' Rings was amazing! Ordered worth ₹10,000 but got ₹12,500 worth products. The team helped customize the combo as per my budget. Excellent service!",
    purchaseDate: "Nov 2024",
    product: "Ring Crackers Set",
    verified: true,
    deliveryDays: 5,
  },
  {
    desc: "Extra Gift Crackers",
    name: "Vikram Singh",
    location: "Puducherry",
    stars: 5,
    detailedDesc:
      "Not only did I get great discounts, they also included free sparklers and chakras worth ₹500! The surprise gift box made my son's day. Truly customer-centric approach.",
    purchaseDate: "Diwali 2024",
    product: "Family Pack",
    verified: true,
    deliveryDays: 3,
  },
  {
    desc: "Trustworthy Seller",
    name: "Lakshmi N",
    location: "Tirupati",
    stars: 5,
    detailedDesc:
      "Was skeptical about online cracker purchase, but Jallikattu proved me wrong. Transparent pricing, no hidden costs, and exactly what I ordered. Even replaced a slightly damaged box immediately.",
    purchaseDate: "Oct 2024",
    product: "Premium Assortment",
    verified: true,
    deliveryDays: 4,
  },
  {
    desc: "Superb Atom Bombs",
    name: "Suresh Babu",
    location: "Vellore",
    stars: 5,
    detailedDesc:
      "The Atom bombs were incredibly powerful! Best quality I've seen in years. Each pack had 50 pieces and every single one worked. Neighbors were impressed by the sound quality.",
    purchaseDate: "Nov 2024",
    product: "Atom Bombs Pack",
    verified: true,
    deliveryDays: 3,
  },
  {
    desc: "Great Discounts",
    name: "Meena Devi",
    location: "Madurai",
    stars: 5,
    detailedDesc:
      "Booked early and got flat 80% off on everything! The early bird discount made it super affordable. Customer service helped me choose age-appropriate crackers for kids.",
    purchaseDate: "Diwali 2024",
    product: "Kids Safe Pack",
    verified: true,
    deliveryDays: 4,
  },
  {
    desc: "Corporate Event Help",
    name: "Arun Kumar",
    location: "Salem",
    stars: 5,
    detailedDesc:
      "Ordered 50+ boxes for our company Diwali party. The team managed bulk order perfectly with customized billing. All items delivered on time with proper GST invoices.",
    purchaseDate: "Oct 2024",
    product: "Bulk Corporate Order",
    verified: true,
    deliveryDays: 5,
  },
  {
    desc: "No Damage Delivery",
    name: "Nandini V",
    location: "Trichy",
    stars: 5,
    detailedDesc:
      "Living in a remote area, I was worried about transport damage. But the gunny bag + carton box packaging protected everything. All 30+ items reached in perfect condition.",
    purchaseDate: "Nov 2024",
    product: "Mixed Variety Pack",
    verified: true,
    deliveryDays: 4,
  },
  {
    desc: "Smooth Kerala Order",
    name: "Rajesh Pillai",
    location: "Kochi",
    stars: 5,
    detailedDesc:
      "First time ordering crackers from Sivakasi to Kerala. The team coordinated with transport partner perfectly. Received updates at every step. Products reached Cochin within 5 days.",
    purchaseDate: "Diwali 2024",
    product: "Kerala Special Pack",
    verified: true,
    deliveryDays: 5,
  },
  {
    desc: "Best Diwali Buy",
    name: "Sneha Thomas",
    location: "Trivandrum",
    stars: 5,
    detailedDesc:
      "Made our Diwali extra special! The variety pack had everything - from phuljhadis for kids to powerful crackers for adults. Great value for money. Will order every year!",
    purchaseDate: "Oct 2024",
    product: "Diwali Delight Pack",
    verified: true,
    deliveryDays: 5,
  },
  {
    desc: "Genuine Sivakasi",
    name: "Mohan Raj",
    location: "Sivakasi",
    stars: 5,
    detailedDesc:
      "Being from Sivakasi, I know quality crackers. These are authentic factory-first quality products. The Bijili crackers were exceptionally bright. Direct factory outlet advantage is real!",
    purchaseDate: "Nov 2024",
    product: "Bijili Crackers Set",
    verified: true,
    deliveryDays: 2,
  },
  {
    desc: "Mix Box Perfect",
    name: "Deepika Reddy",
    location: "Vijayawada",
    stars: 5,
    detailedDesc:
      "The mix box had perfect combination - 40% sound crackers, 30% flower pots, 20% sparklers, 10% novelties. Great for family celebration. Value for money!",
    purchaseDate: "Diwali 2024",
    product: "Family Mix Box",
    verified: true,
    deliveryDays: 4,
  },
  {
    desc: "Kid-Safe Guidance",
    name: "Harish Gowda",
    location: "Mangalore",
    stars: 5,
    detailedDesc:
      "The team suggested perfect kid-friendly options like chakras, sparklers, and phuljhadis. Even included safety tips in the package. My 5-year-old had a blast safely!",
    purchaseDate: "Oct 2024",
    product: "Kids Special Pack",
    verified: true,
    deliveryDays: 4,
  },
  {
    desc: "Top Online Experience",
    name: "Swathi K",
    location: "Hubli",
    stars: 5,
    detailedDesc:
      "Seamless website, easy payment, excellent communication. The order tracking feature was very helpful. Will definitely recommend to friends and family.",
    purchaseDate: "Nov 2024",
    product: "Premium Selection",
    verified: true,
    deliveryDays: 4,
  },
  {
    desc: "Last Minute OK",
    name: "Vigneshwaran P",
    location: "Pondicherry",
    stars: 5,
    detailedDesc:
      "Ordered just 5 days before Diwali and still got delivery on time! The team worked overtime to process my order. Saved my Diwali celebration!",
    purchaseDate: "Diwali 2024",
    product: "Express Delivery Pack",
    verified: true,
    deliveryDays: 3,
  },
  {
    desc: "Amazing Hyderabad Delivery",
    name: "Aishwarya M",
    location: "Hyderabad",
    stars: 5,
    detailedDesc:
      "The 80% discount + free shipping made it incredibly affordable. Quality matches premium brands. The 5' Zulk War Ring was super loud. Best online cracker experience!",
    purchaseDate: "Oct 2024",
    product: "Ring Crackers Combo",
    verified: true,
    deliveryDays: 5,
  },
];

export default function CustomerReviews() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  // Responsive card width
  const getItemWidth = () => {
    if (isMobile) return 280;
    if (isTablet) return 320;
    return 360;
  };

  const itemWidth = getItemWidth();

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * (itemWidth + 24), // 24 is gap
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    setAnimationKey((prev) => prev + 1);
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= reviews.length) {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
            setCurrentIndex(0);
          }
        }, 400);
        return reviews.length;
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setAnimationKey((prev) => prev + 1);
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              left: (reviews.length - 1) * (itemWidth + 24),
              behavior: "auto",
            });
            setCurrentIndex(reviews.length - 1);
          }
        }, 400);
        return -1;
      }
      return prevIndex;
    });
  };

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(
        () => {
          handleNext();
        },
        isMobile ? 5000 : 4000,
      ); // Slower on mobile
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, isMobile]);

  // Pause auto-play on hover (only on non-touch devices)
  const handleMouseEnter = () => !isMobile && setIsAutoPlaying(false);
  const handleMouseLeave = () => !isMobile && setIsAutoPlaying(true);

  // Update scroll position when currentIndex changes
  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex, itemWidth]);

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 12 },
        bgcolor: colors.lightBlueGray,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements - Simplified for mobile */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: { xs: 0.05, sm: 0.1 },
          background: `
            radial-gradient(circle at 10% 20%, ${colors.primaryBlue}30 0%, transparent 30%),
            radial-gradient(circle at 90% 70%, ${colors.primaryRed}30 0%, transparent 30%),
            radial-gradient(circle at 30% 80%, ${colors.orange}30 0%, transparent 30%),
            radial-gradient(circle at 70% 20%, ${colors.successGreen}30 0%, transparent 30%)
          `,
          animation: { xs: "none", sm: "float 20s ease-in-out infinite" },
          "@keyframes float": {
            "0%": { transform: "scale(1) rotate(0deg)" },
            "50%": { transform: "scale(1.1) rotate(2deg)" },
            "100%": { transform: "scale(1) rotate(0deg)" },
          },
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2, px: { xs: 2, sm: 3, md: 4 } }}
      >
        {/* Section Title */}
        <Fade in={true} timeout={1000}>
          <Box>
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
              Our Customer Reviews
            </Typography>

            <Typography
              align="center"
              sx={{
                color: colors.gray50,
                mb: { xs: 4, sm: 5, md: 6 },
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
                maxWidth: "700px",
                mx: "auto",
                lineHeight: 1.6,
                px: { xs: 2, sm: 0 },
              }}
            >
              Join 10,000+ happy customers who trust us for their celebration
              needs
            </Typography>
          </Box>
        </Fade>

        {/* Carousel Container */}
        <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={() => setIsAutoPlaying(false)}
          onTouchEnd={() => setIsAutoPlaying(true)}
          sx={{ position: "relative" }}
        >
          {/* Navigation Buttons - Hide on mobile, show on tablet/desktop */}
          {!isMobile && (
            <>
              <Zoom in={true}>
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    left: { sm: -20, md: -25 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: colors.white,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    width: { sm: 40, md: 48 },
                    height: { sm: 40, md: 48 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: colors.primaryRed,
                      transform: "translateY(-50%) scale(1.1)",
                      "& .MuiSvgIcon-root": {
                        color: colors.white,
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      color: colors.primaryRed,
                      fontSize: { sm: "1.5rem", md: "1.8rem" },
                    },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Zoom>

              <Zoom in={true}>
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    right: { sm: -20, md: -25 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: colors.white,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    width: { sm: 40, md: 48 },
                    height: { sm: 40, md: 48 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: colors.primaryRed,
                      transform: "translateY(-50%) scale(1.1)",
                      "& .MuiSvgIcon-root": {
                        color: colors.white,
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      color: colors.primaryRed,
                      fontSize: { sm: "1.5rem", md: "1.8rem" },
                    },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Zoom>
            </>
          )}

          {/* Scroll Container */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: { xs: 2, sm: 2.5, md: 3 },
              py: { xs: 1, sm: 2 },
              px: { xs: 0.5, sm: 1 },
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
            }}
          >
            {duplicatedReviews.map((review, index) => {
              const isCurrent = index % reviews.length === currentIndex;

              return (
                <Fade in={true} timeout={500} key={`${index}-${animationKey}`}>
                  <Paper
                    elevation={isCurrent ? (isMobile ? 4 : 8) : 2}
                    sx={{
                      minWidth: itemWidth,
                      maxWidth: itemWidth,
                      p: { xs: 2, sm: 2.5, md: 3 },
                      borderRadius: { xs: 2, sm: 2.5, md: 3 },
                      bgcolor: colors.white,
                      border: `2px solid ${isCurrent ? colors.primaryRed : colors.gray70}`,
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                      transform:
                        isCurrent && !isMobile ? "scale(1.02)" : "scale(1)",
                      "&:hover": !isMobile
                        ? {
                            transform: "translateY(-8px) scale(1.03)",
                            boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
                            borderColor: colors.primaryRed,
                          }
                        : {},
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top Accent Bar */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: `linear-gradient(90deg, ${colors.primaryRed}, ${colors.primaryBlue})`,
                      }}
                    />

                    {/* Quote Icon */}
                    <FormatQuoteIcon
                      sx={{
                        fontSize: { xs: "2.5rem", sm: "2.8rem", md: "3rem" },
                        color: colors.gray70,
                        position: "absolute",
                        top: { xs: 5, sm: 8, md: 10 },
                        right: { xs: 10, sm: 12, md: 15 },
                        opacity: 0.2,
                      }}
                    />

                    {/* 3-word description */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: colors.darkGray,
                        fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                        pr: 4,
                        lineHeight: 1.3,
                      }}
                    >
                      {review.desc}
                    </Typography>

                    {/* Reviewer Info - Responsive */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        mb: 1,
                        gap: { xs: 0.5, sm: 1 },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: colors.gray40,
                          fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" },
                        }}
                      >
                        {review.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.gray60,
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.85rem",
                            md: "0.9rem",
                          },
                          "&:before": {
                            content: { xs: '""', sm: '"•"' },
                            mx: { xs: 0, sm: 1 },
                            display: { xs: "none", sm: "inline" },
                          },
                        }}
                      >
                        {review.location}
                      </Typography>
                    </Box>

                    {/* Stars */}
                    <Rating
                      value={review.stars}
                      readOnly
                      precision={0.5}
                      sx={{
                        color: colors.orange,
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                        mb: { xs: 1.5, sm: 2 },
                      }}
                    />

                    {/* Detailed Description - ALWAYS VISIBLE */}
                    <Box
                      sx={{
                        mb: { xs: 1.5, sm: 2 },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.gray50,
                          lineHeight: 1.6,
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.85rem",
                            md: "0.9rem",
                          },
                          borderLeft: `3px solid ${colors.primaryRed}`,
                          pl: { xs: 1.5, sm: 2 },
                          py: 0.5,
                          display: "-webkit-box",
                          WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        "{review.detailedDesc}"
                      </Typography>
                    </Box>

                    {/* Product Info - Responsive */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 0.5, sm: 1 },
                        mb: { xs: 1.5, sm: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: colors.primaryBlue + "10",
                          px: { xs: 1, sm: 1.5 },
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: colors.primaryBlue,
                            fontWeight: 600,
                            fontSize: {
                              xs: "0.65rem",
                              sm: "0.7rem",
                              md: "0.75rem",
                            },
                          }}
                        >
                          {review.product}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          bgcolor: colors.orange + "10",
                          px: { xs: 1, sm: 1.5 },
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: colors.orange,
                            fontWeight: 600,
                            fontSize: {
                              xs: "0.65rem",
                              sm: "0.7rem",
                              md: "0.75rem",
                            },
                          }}
                        >
                          {review.purchaseDate}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Delivery & Verified Badge - Responsive */}
                    <Box
                      sx={{
                        mt: "auto",
                        pt: { xs: 1.5, sm: 2 },
                        borderTop: `1px dashed ${colors.gray70}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 1, sm: 0 },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Box
                          sx={{
                            width: { xs: 6, sm: 8 },
                            height: { xs: 6, sm: 8 },
                            borderRadius: "50%",
                            bgcolor: colors.successGreen,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: colors.gray60,
                            fontSize: {
                              xs: "0.6rem",
                              sm: "0.65rem",
                              md: "0.7rem",
                            },
                          }}
                        >
                          Verified
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <LocalShippingIcon
                          sx={{
                            fontSize: { xs: 12, sm: 14 },
                            color: colors.primaryBlue,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: colors.gray60,
                            fontSize: {
                              xs: "0.6rem",
                              sm: "0.65rem",
                              md: "0.7rem",
                            },
                          }}
                        >
                          {review.deliveryDays} days
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Fade>
              );
            })}
          </Box>

          {/* Progress Indicators - Responsive */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 1, sm: 1.5 },
              mt: { xs: 3, sm: 4 },
              flexWrap: "wrap",
              px: 2,
            }}
          >
            {reviews.map((_, index) => (
              <Box
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                  setAnimationKey((prev) => prev + 1);
                }}
                sx={{
                  width:
                    currentIndex === index
                      ? { xs: 40, sm: 50, md: 60 }
                      : { xs: 25, sm: 30, md: 40 },
                  height: { xs: 4, sm: 5, md: 6 },
                  borderRadius: 3,
                  bgcolor:
                    currentIndex === index ? colors.primaryRed : colors.gray70,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor:
                      currentIndex === index
                        ? colors.primaryRed
                        : colors.primaryBlue,
                  },
                }}
              />
            ))}
          </Box>

          {/* Swipe hint for mobile */}
          {isMobile && (
            <Typography
              variant="caption"
              align="center"
              sx={{
                display: "block",
                mt: 2,
                color: colors.gray60,
                fontSize: "0.7rem",
              }}
            >
              ← Swipe to see more reviews →
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
