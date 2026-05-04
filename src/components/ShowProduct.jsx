import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
  Chip,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import { colors } from "../colors";

import singlesound from "../assets/images/singlesound.jpg";
import chakkers from "../assets/images/chakkers.jpg";
import flowerpots from "../assets/images/flowerpots.jpg";
import garland from "../assets/images/garland.jpg";
import sparklersimg from "../assets/images/sparklersimg.jpg";
import twinkling from "../assets/images/twinkling.jpg";
import pencilCrackers from "../assets/images/pencilCrackers.jpg";
import rocket from "../assets/images/rocket.jpg";
import fancyfountain from "../assets/images/fancyfountain.jpg";
import Bombs from "../assets/images/Bombs.png";
import giftbox from "../assets/images/giftbox.jpg";
import skyshot from "../assets/images/skyshot.jpg";

const ShowProduct = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Kids Friendly", "Loud", "Colorful", "Fancy", "Gift Boxes"];

  const products = [
    {
      title: "Single Sound Crackers",
      description: "Kuruvu, Lakshmi, Ouder...",
      imageUrl: singlesound,
      tags: ["Loud"],
    },
    {
      title: "Chakras",
      description: "Chakkar Big, Special, Asoka...",
      imageUrl: chakkers,
      tags: ["Kids Friendly"],
    },
    {
      title: "Flower Pots",
      description: "Colour pots small, Big, Special...",
      imageUrl: flowerpots,
      tags: ["Kids Friendly", "Colorful"],
    },
    {
      title: "Garlands",
      description: "Deluxe, Giant, Garlands...",
      imageUrl: garland,
      tags: ["Loud"],
    },
    {
      title: "Sparklers",
      description: "Red, Green, Electric...",
      imageUrl: sparklersimg,
      tags: ["Kids Friendly", "Colorful"],
    },
    {
      title: "Twinkling Star",
      description: "4' Twinkling Star, 1 1/2 Twinkling Star,...",
      imageUrl: twinkling,
      tags: ["Kids Friendly"],
    },
    {
      title: "Pencil",
      description: "Star Rain Pencil, Ultra...",
      imageUrl: pencilCrackers,
      tags: ["Kids Friendly"],
    },
    {
      title: "Rockets",
      description: "Baby rocket, Junik, two sound...",
      imageUrl: rocket,
      tags: ["Loud"],
    },
    {
      title: "Sky Shot",
      description: "7shot,12,shot,15shots 240 shot etc..",
      imageUrl: skyshot,
      tags: ["Colorful", "Fancy"],
    },
    {
      title: "Fancy Fountains",
      description:
        "fancy Big Fountain,Fancy Special Fountain,fancy,Ashoka Fountain,Tri-Colour Fountain.",
      imageUrl: fancyfountain,
      tags: ["Colorful", "Fancy"],
    },
    {
      title: "Bombs",
      description: "Atom Bomb,Bullet Bomb,King Bomb.",
      imageUrl: Bombs,
      tags: ["Loud"],
    },
    {
      title: "Gift Boxes",
      description: "Mini,small and special and family gift box.",
      imageUrl: giftbox,
      tags: ["Gift Boxes", "Family"],
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        (product.tags && product.tags.includes(selectedCategory)) ||
        product.title.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleWhatsAppOrder = (productTitle) => {
    const phoneNumber = "919655121440";
    const message = encodeURIComponent(
      `Hi Sri Padmavathi Crackers, I'm interested in "${productTitle}". Could you provide more details and the latest price?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 4, md: 6 },
        backgroundColor: colors.white,
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          id="our-products"
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: { xs: 2, sm: 3 },
            color: colors.primaryRed,
            position: "relative",
            display: "inline-block",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -8,
              left: "25%",
              width: "50%",
              height: 3,
              bgcolor: colors.primaryRed,
            },
          }}
        >
          Our Featured Products
        </Typography>

        {/* Search and Filters */}
        <Box sx={{ mb: 4, mt: 2 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              size="small"
              placeholder="Search for crackers (e.g. Sparklers, Sky Shots)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: { xs: "100%", md: "400px" },
                bgcolor: "white",
                borderRadius: "50px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            justifyContent="center"
            sx={{ mt: 2, gap: 1 }}
          >
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  bgcolor: selectedCategory === cat ? colors.primaryRed : colors.lightBlueGray,
                  color: selectedCategory === cat ? "white" : colors.darkGray,
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: selectedCategory === cat ? colors.darkRed : colors.lightGray,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 1.5, sm: 2, md: 2.5 },
            mb: 4,
          }}
        >
          {filteredProducts.map((product, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: colors.white,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                position: "relative",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                height: { xs: 200, sm: 220, md: 250 },
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                },
              }}
              onClick={() => handleWhatsAppOrder(product.title)}
            >
              <Box
                sx={{
                  height: "100%",
                  backgroundImage: `url(${product.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    pb: 0,
                    animation: "fadeIn 0.8s ease-in-out",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: colors.white,
                      mb: 1,
                      textAlign: "center",
                      px: 2,
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                      width: "100%",
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.white,
                      mb: { xs: 1.5, sm: 2 },
                      textAlign: "center",
                      px: { xs: 2, sm: 2.5 },
                      fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                      opacity: 0.95,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      maxWidth: "90%",
                      mx: "auto",
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Button
                    variant="contained"
                    size={isMobile ? "small" : "medium"}
                    startIcon={<WhatsAppIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppOrder(product.title);
                    }}
                    sx={{
                      bgcolor: "#25D366", // WhatsApp Green
                      color: colors.white,
                      fontWeight: 700,
                      fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                      py: { xs: 0.5, sm: 0.8 },
                      px: { xs: 1.5, sm: 2.5 },
                      borderRadius: "50px",
                      "&:hover": {
                        bgcolor: "#128C7E",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Enquire Now
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
          {filteredProducts.length === 0 && (
            <Box sx={{ gridColumn: "1/-1", textAlign: "center", py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                No products found matching "{searchTerm}"
              </Typography>
            </Box>
          )}
        </Box>
      </Container>

      {/* CSS Keyframes for animations */}
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default ShowProduct;
