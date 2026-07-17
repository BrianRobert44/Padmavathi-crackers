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
            Premium Sivakasi Crackers – Safe & Quality Fireworks
          </Typography>
          
          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            <strong>Premium Crackers Online</strong>
            <br />
            Welcome to Sri Padmavathi Crackers, your trusted destination for premium Sivakasi crackers at affordable prices. We offer a wide range of high-quality fireworks, including sparklers, flower pots, rockets, chakras, fancy crackers, sound crackers, kids&#39; crackers, and gift boxes. Our products are sourced directly from trusted Sivakasi manufacturers to ensure safety, quality, and reliable performance.
          </Typography>

          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            Whether you&#39;re celebrating Diwali, weddings, temple festivals, birthdays, or special events, we provide premium crackers with attractive discounts, secure packaging, and timely doorstep delivery across India.
          </Typography>

          <Typography variant="h3" component="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.4rem", md: "1.8rem" }, color: colors.darkGray, mt: 4, mb: 2 }}>
            Our Services
          </Typography>

          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            <strong>Online Crackers Shopping</strong>
            <br />
            Buy your favorite Sivakasi crackers online with ease. Our website offers a simple shopping experience, secure payments, and fast delivery.
          </Typography>

          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            <strong>Wholesale Crackers</strong>
            <br />
            We supply wholesale crackers for retailers, businesses, schools, and event organizers at competitive prices with assured quality.
          </Typography>
          
          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            <strong>Festival Combo Packs</strong>
            <br />
            Choose from our exclusive Diwali cracker combo packs and family gift boxes, specially designed for every celebration.
          </Typography>
          
          <Typography variant="body1" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}>
            <strong>Safe Packaging & Delivery</strong>
            <br />
            All orders are securely packed to prevent damage during transit and delivered safely to your doorstep.
          </Typography>

          <Typography variant="h3" component="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.4rem", md: "1.8rem" }, color: colors.darkGray, mt: 4, mb: 2 }}>
            Why Choose Sri Padmavathi Crackers?
          </Typography>
          
          <Box component="ul" sx={{ color: colors.gray50, mb: 2, lineHeight: 1.8, fontSize: "1.1rem", pl: 3 }}>
            <li>Premium Quality Sivakasi Crackers</li>
            <li>Direct Factory Pricing</li>
            <li>Attractive Festival Discounts</li>
            <li>Safe & Secure Packaging</li>
            <li>Wide Variety of Fireworks</li>
            <li>Fast Doorstep Delivery</li>
            <li>Trusted Customer Support</li>
            <li>Bulk Order Facility</li>
          </Box>

          <Typography variant="h3" component="h3" sx={{ fontWeight: 700, fontSize: { xs: "1.4rem", md: "1.8rem" }, color: colors.darkGray, mt: 4, mb: 2 }}>
            Order Premium Sivakasi Crackers Today
          </Typography>

          <Typography variant="body1" sx={{ color: colors.gray50, mb: 3, lineHeight: 1.8, fontSize: "1.1rem" }}>
            Looking for the best online crackers shop in Sivakasi? Sri Padmavathi Crackers offers premium fireworks, wholesale crackers, festival combo packs, and safe doorstep delivery at affordable prices. Celebrate every occasion with genuine Sivakasi crackers and enjoy a colorful, memorable festival experience.
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
};

export default SeoContent;
