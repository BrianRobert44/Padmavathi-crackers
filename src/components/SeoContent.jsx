import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { colors } from "../colors";

const SeoContent = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: colors.white20 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: "15px",
            backgroundColor: colors.white,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            border: `1px solid ${colors.gray70}`,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              color: colors.primaryRed,
              mb: 3,
              textAlign: "center",
            }}
          >
            Celebrate Every Festival with Sri Padmavathi Crackers
          </Typography>
          
          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            Festivals are all about happiness, togetherness, and unforgettable celebrations. At Sri Padmavathi Crackers, we bring you a wide collection of premium-quality crackers that add excitement, color, and joy to every special occasion. From family celebrations to grand festive events, we ensure every moment becomes brighter and more memorable.
          </Typography>

          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            Explore our extensive range of exciting bombs, colorful aerial fireworks, sparkling lightings, and other festive favourites that are carefully selected to deliver quality, safety, and entertainment. Every product is sourced to provide a spectacular celebration experience while maintaining high safety standards.
          </Typography>

          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            Enhance your festive decorations with elegant candles, beautiful lamps, and stylish light fixtures that create a warm and welcoming atmosphere for your home, office, or celebration venue. Whether you&#39;re decorating for Diwali or any special event, our lighting collection adds the perfect festive touch.
          </Typography>

          <Typography variant="h3" component="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.4rem", md: "1.8rem" }, color: colors.darkGray, mt: 4, mb: 2 }}>
            Quality, Safety, and Trust
          </Typography>

          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            At Sri Padmavathi Crackers, customer satisfaction is our priority. We offer quality products, competitive prices, and reliable service to make your shopping experience simple and enjoyable. Our commitment to quality and safety has made us a trusted choice for customers looking to celebrate with confidence.
          </Typography>

          <Typography variant="body1" sx={{ color: colors.gray50, mb: 3, lineHeight: 1.8, fontSize: "1.1rem" }}>
            Whether you&#39;re planning a small family gathering or a grand festival celebration, Sri Padmavathi Crackers has everything you need to make the occasion truly unforgettable.
          </Typography>

          <Box sx={{ textAlign: "center", mt: 4, p: 3, backgroundColor: `${colors.primaryRed}10`, borderRadius: "10px" }}>
            <Typography variant="h4" component="p" sx={{ fontWeight: 700, fontSize: { xs: "1.2rem", md: "1.5rem" }, color: colors.darkRed }}>
              Light Up Every Celebration with Quality, Safety &amp; Joy – Choose Sri Padmavathi Crackers!
            </Typography>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
};

export default SeoContent;
