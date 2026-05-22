// src/pages/BlogsPage.jsx
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
  useMediaQuery,
  TextField,
  Breadcrumbs,
  Link,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import { colors } from "../colors";
import blog1 from "../assets/blogs/blog1.jpg";
import blog2 from "../assets/blogs/blog2.jpg";
import blog3 from "../assets/blogs/blog3.jpg";
import blog4 from "../assets/blogs/blog4.jpg";
import blog5 from "../assets/blogs/blog5.jpg";
import blog6 from "../assets/blogs/blog6.jpg";
import blog7 from "../assets/blogs/blog7.jpg";
import blog8 from "../assets/blogs/blog8.jpg";
import DownloadPriceList from "../assets/Price-list-25.pdf";
import bannerImage from "../assets/banner/blog.jpg";
// Blog data with your exact content
const blogPosts = [
  {
    id: 1,
    title: "Sivakasi Pattasu Price List",
    date: "July 9, 2025",
    excerpt:
      "Every unforgettable family celebration starts with thoughtful planning — and a big part of that planning is choosing the right fireworks. While exact prices may vary, the real value lies in understanding the variety, quality, and authenticity of original Sivakasi pattasu straight from the source. ✅ …",
    image: blog1,
    category: "Price List",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "Best Online Crackers to Buy in 2025",
    date: "April 21, 2025",
    excerpt:
      "The year 2025 brings a wide variety of exciting options for those looking to celebrate festivals with the best crackers. Whether you are shopping for Diwali, New Year's, or any other occasion, online platforms make it easier than ever to get your hands on top-quality fireworks. If you are looking for the latest and greatest in fireworks, this guide will help you make the right choice.",
    image: blog2,
    category: "Buying Guide",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "Buy Crackers Online Sivakasi",
    date: "April 17, 2025",
    excerpt:
      "Buying crackers has never been easier! If you're looking to buy crackers online Sivakasi, you're in the right place. Sivakasi is famous for its high-quality fireworks, and now, thanks to online shopping, you can get the best crackers from the comfort of your home. With just a few clicks, you can have premium quality crackers delivered to your doorstep.",
    image: blog3,
    category: "Online Shopping",
    gradient: "linear-gradient(135deg, #5f2c82 0%, #49a09d 100%)",
  },
  {
    id: 4,
    title: "Sivakasi Crackers",
    date: "April 12, 2025",
    excerpt:
      "Sivakasi Crackers are known all over India for their quality, safety, and vibrant celebration vibes. The small town of Sivakasi, located in Tamil Nadu, is famous for producing top-quality fireworks. Over the years, Sivakasi Crackers have become a must-have for every celebration – from Diwali and weddings to birthdays and special occasions. Each cracker is crafted with precision and care.",
    image: blog4,
    category: "Quality",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  },
  {
    id: 5,
    title: "Sivakasi Pataka Online",
    date: "April 10, 2025",
    excerpt:
      "Festivals in India are incomplete without fireworks. Whether it's Diwali, a wedding, or a special celebration, firecrackers add joy and excitement to every moment. Thanks to the internet, now you don't have to travel to Sivakasi to buy crackers. With Sivakasi Pattasu online services, everything you need is just a click away. Experience the convenience of online shopping with our extensive collection.",
    image: blog5,
    category: "Online Services",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    id: 6,
    title: "Sivakasi Pattasu Online",
    date: "April 10, 2025",
    excerpt:
      "Festivals in India are incomplete without fireworks. Whether it's Diwali, a wedding, or a special celebration, firecrackers add joy and excitement to every moment. Thanks to the internet, now you don't have to travel to Sivakasi to buy crackers. With Sivakasi Pattasu online services, everything you need is just a click away. Browse our collection and order with confidence.",
    image: blog6,
    category: "Pattasu Online",
    gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  },
  {
    id: 7,
    title: "Diwali Crackers Online Shopping",
    date: "April 8, 2025",
    excerpt:
      "Diwali is a festival filled with joy, lights, and celebrations. Among the many traditions, bursting crackers is one of the most anticipated parts of the festivities. With online shopping becoming the preferred method for many, buying Diwali crackers has become easier than ever. Prepare for the festival of lights with our premium selection of Diwali special crackers.",
    image: blog7,
    category: "Diwali Special",
    gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  },
  {
    id: 8,
    title: "Buy Sivakasi Crackers",
    date: "April 6, 2025",
    excerpt:
      "Sivakasi crackers, known for their vibrant colors, loud pops, and stunning displays, are an excellent choice for anyone looking to add sparkle to their celebrations. If you're thinking of buy sivakasi crackers, online shopping is a convenient and efficient way to get them. Choose from our wide range of products and make your celebrations memorable.",
    image: blog8,
    category: "Shopping",
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
];

const BlogsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));

  // Determine number of cards per row
  const getCardsPerRow = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (isLaptop) return 3;
    return 4;
  };

  const cardsPerRow = getCardsPerRow();

  // Calculate gap based on screen size
  const gap = isMobile ? 16 : isTablet ? 20 : 24;

  // Calculate card width
  const cardWidth = `calc((100% - ${(cardsPerRow - 1) * gap}px) / ${cardsPerRow})`;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
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
            Blogs
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
            <Typography color="inherit">Blogs</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Box sx={{ width: "100%", bgcolor: colors.white, py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          {/* Hero Section with Big Content */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                mb: { xs: 5, md: 7 },
                p: { xs: 3, md: 5 },
                background: `linear-gradient(135deg, ${colors.primaryRed} 0%, ${colors.darkRed} 100%)`,
                borderRadius: 4,
                color: colors.white,
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 20px 40px ${colors.primaryRed}40`,
              }}
            >
              {/* Decorative Elements */}
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
                  bottom: -50,
                  left: -50,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                  position: "relative",
                  zIndex: 2,
                }}
              >
                When it comes to celebrating festivals with color, sound, and
                joy, Sivakasi holds a special place in every Indian heart.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  maxWidth: "900px",
                  opacity: 0.95,
                  lineHeight: 1.8,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Known as the firecracker capital of India, Sivakasi offers an
                unmatched variety of fireworks that light up skies during
                Diwali, weddings, temple festivals, and local traditions like
                Sri Padmavathi. Today, thanks to online platforms, you can access
                the best Sivakasi crackers from anywhere in India. Our
                collection brings you authentic, high-quality fireworks that
                have made Sivakasi famous across the nation.
              </Typography>
            </Box>
          </motion.div>

          {/* Blog Cards Grid - Using only Box with fixed dimensions */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: `${gap}px`,
              justifyContent: "center",
              mb: { xs: 5, md: 7 },
            }}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: index * 0.1 }}
                style={{
                  width: cardWidth,
                  minWidth: isMobile ? "100%" : "auto",
                }}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  style={{ height: "100%" }}
                >
                  <Card
                    sx={{
                      height: "480px", // Fixed height for all cards
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: `0 8px 20px ${colors.black}15`,
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      position: "relative",
                      "&:hover": {
                        boxShadow: `0 20px 30px ${colors.primaryRed}30`,
                        "& .card-media": {
                          transform: "scale(1.05)",
                        },
                      },
                    }}
                  >
                    {/* Image with overlay - Fixed height */}
                    <Box
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        height: "200px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={post.image}
                        alt={post.title}
                        className="card-media"
                        sx={{
                          transition: "transform 0.5s ease",
                          objectFit: "cover",
                          height: "100%",
                          width: "100%",
                        }}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/600x400/${colors.primaryRed.replace("#", "")}/FFFFFF?text=${post.category.replace(" ", "+")}`;
                        }}
                      />

                      {/* Gradient Overlay */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(to bottom, transparent 50%, ${colors.black}90)`,
                        }}
                      />

                      {/* Date Badge */}
                      <Chip
                        icon={
                          <CalendarTodayIcon
                            sx={{ fontSize: "0.7rem !important" }}
                          />
                        }
                        label={post.date}
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 12,
                          left: 12,
                          bgcolor: "rgba(255,255,255,0.95)",
                          color: colors.darkGray,
                          fontWeight: 600,
                          fontSize: "0.65rem",
                          height: 24,
                          "& .MuiChip-icon": {
                            color: colors.primaryRed,
                          },
                        }}
                      />
                    </Box>

                    {/* Card Content - Fixed height with scrolling if needed */}
                    <CardContent
                      sx={{
                        p: { xs: 2, sm: 2.5 },
                        flexGrow: 1,
                        height: "280px",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        "&::-webkit-scrollbar": {
                          width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: colors.lightGray,
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: colors.primaryRed,
                          borderRadius: "4px",
                        },
                      }}
                    >
                      {/* Category Chip */}
                      <Chip
                        label={post.category}
                        size="small"
                        sx={{
                          bgcolor: colors.primaryRed,
                          color: colors.white,
                          fontWeight: 700,
                          fontSize: "0.65rem",
                          height: 22,
                          mb: 1.5,
                          width: "fit-content",
                          "& .MuiChip-label": { px: 1.5 },
                        }}
                      />

                      {/* Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: colors.darkGray,
                          mb: 1.5,
                          lineHeight: 1.3,
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.title}
                      </Typography>

                      {/* Excerpt - Big Content */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.gray60,
                          fontSize: { xs: "0.85rem", sm: "0.9rem" },
                          lineHeight: 1.7,
                          display: "-webkit-box",
                          WebkitLineClamp: 7,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </Box>

          {/* Featured Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                bgcolor: colors.lightBlueGray,
                borderRadius: 4,
                overflow: "hidden",
                border: `1px solid ${colors.gray70}`,
                mb: { xs: 5, md: 7 },
              }}
            >
              {/* Left Image */}
              <Box
                sx={{
                  flex: 1,
                  height: { xs: 200, md: 300 },
                  backgroundImage: 'url("/images/banner-10.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(90deg, ${colors.primaryRed}80, transparent)`,
                  },
                }}
              />

              {/* Right Content */}
              <Box
                sx={{
                  flex: 1,
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: colors.primaryRed,
                    mb: 2,
                    fontSize: { xs: "1.5rem", md: "2rem" },
                  }}
                >
                  Sivakasi Pattasu Price List 2026
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.darkGray,
                    lineHeight: 1.8,
                    mb: 2,
                  }}
                >
                  Every unforgettable family celebration starts with thoughtful
                  planning — and a big part of that planning is choosing the
                  right fireworks. While exact prices may vary, the real value
                  lies in understanding the variety, quality, and authenticity
                  of original Sivakasi pattasu straight from the source. Our
                  price list gives you a comprehensive overview of the best
                  crackers available this season.
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  href={DownloadPriceList}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: colors.primaryRed,
                    color: colors.white,
                    alignSelf: "flex-start",
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: colors.darkRed,
                    },
                  }}
                >
                  View Full Price List
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default BlogsPage;
