// src/components/FAQComponent.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../colors";

// Icons
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GavelIcon from "@mui/icons-material/Gavel";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CelebrationIcon from "@mui/icons-material/Celebration";

const FAQComponent = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const faqs = [
    {
      id: 1,
      question: "What types of crackers does Sri Padmavathi Crackers offer?",
      answer:
        "Sri Padmavathi Crackers offers a wide variety of premium quality fireworks including sparklers, flower pots, rockets, bombs, fancy crackers, and special Diwali combo packs. All our products are sourced from certified manufacturers and meet safety standards.",
      icon: (
        <LocalFireDepartmentIcon
          sx={{ fontSize: 28, color: colors.primaryRed }}
        />
      ),
      category: "Products",
    },
    {
      id: 2,
      question: "Are Sri Padmavathi Crackers products safe and organic?",
      answer:
        "Yes, we prioritize safety and environmental consciousness. Our crackers are manufactured using organic materials and reduced chemical compositions. They produce less smoke and noise pollution while maintaining the traditional festive experience.",
      icon: <SecurityIcon sx={{ fontSize: 28, color: colors.primaryRed }} />,
      category: "Safety",
    },
    {
      id: 3,
      question: "Do you offer wholesale prices for bulk purchases?",
      answer:
        "Absolutely! Padmavathi Crackers specializes in both retail and wholesale supply. We offer competitive wholesale prices for bulk orders, including special discounts for wedding seasons, festivals, and corporate events. Contact our wholesale team for customized quotes.",
      icon: <StorefrontIcon sx={{ fontSize: 28, color: colors.primaryRed }} />,
      category: "Pricing",
    },
    {
      id: 4,
      question: "Is online ordering available for crackers?",
      answer:
        "Due to Supreme Court guidelines, we do not process online orders for crackers. However, you can browse our complete catalog on our website and visit our physical store for purchases. We're here to help you choose the best products for your celebration.",
      icon: <GavelIcon sx={{ fontSize: 28, color: colors.primaryRed }} />,
      category: "Legal",
    },
    {
      id: 5,
      question: "What are your store hours and location?",
      answer:
        "Padmavathi Crackers is open 7 days a week from 9:00 AM to 9:00 PM during festive seasons. We're located in Virudhunagar, Tamil Nadu - the fireworks capital of India. Visit us for the best shopping experience with our expert guidance.",
      icon: <StorefrontIcon sx={{ fontSize: 28, color: colors.primaryRed }} />,
      category: "Store",
    },
    {
      id: 6,
      question: "Do you provide delivery or shipping services?",
      answer:
        "While we don't offer online delivery due to legal restrictions, we provide local delivery services within Virudhunagar for bulk orders. For customers outside the area, we recommend visiting our store or contacting us for alternative arrangements.",
      icon: (
        <LocalShippingIcon sx={{ fontSize: 28, color: colors.primaryRed }} />
      ),
      category: "Delivery",
    },
    {
      id: 7,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including cash, UPI (Google Pay, PhonePe, Paytm), credit/debit cards, and bank transfers for bulk orders. For wholesale customers, we offer flexible payment terms based on order value and relationship.",
      icon: <PaymentIcon sx={{ fontSize: 28, color: colors.primaryRed }} />,
      category: "Payment",
    },
    {
      id: 8,
      question: "Do you have special Diwali combos or gift packs?",
      answer:
        "Yes! Padmavathi Crackers offers exclusive Diwali combo packs and gift boxes for the festive season. These curated sets include a variety of crackers suitable for family celebrations. We also offer customizable gift packs for corporate gifting and special occasions. Visit our store to explore our festive collection!",
      icon: <CelebrationIcon sx={{ fontSize: 28, color: colors.primaryRed }} />,
      category: "Offers",
    },
  ];

  const handleFaqClick = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const faqItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: colors.lightBlueGray,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: `${colors.primaryRed}10`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 250,
          height: 250,
          borderRadius: "50%",
          backgroundColor: `${colors.orange}10`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                color: colors.primaryRed,
                fontWeight: 700,
                fontSize: { xs: "1.8rem", md: "2.2rem", lg: "2.5rem" },
                mb: 2,
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100px",
                  height: "4px",
                  background: `linear-gradient(90deg, ${colors.primaryRed}, ${colors.orange})`,
                  borderRadius: "2px",
                },
              }}
            >
              Frequently Asked Questions
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.2rem" },
                color: colors.gray50,
                maxWidth: "700px",
                mx: "auto",
                mt: 3,
              }}
            >
              Everything you need to know about Padmavathi Crackers
            </Typography>
          </Box>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={faqItemVariants}
                style={{
                  width: isMobile ? "100%" : "calc(50% - 12px)",
                }}
              >
                <Paper
                  elevation={0}
                  onClick={() => handleFaqClick(faq.id)}
                  sx={{
                    p: 3,
                    backgroundColor: colors.white,
                    borderRadius: "16px",
                    border: `1px solid ${expandedFaq === faq.id ? colors.primaryRed : colors.gray70}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "fit-content",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 12px 30px ${colors.primaryRed}20`,
                      borderColor: colors.primaryRed,
                    },
                  }}
                >
                  {/* Category Tag */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: `${colors.primaryRed}10`,
                      color: colors.primaryRed,
                      px: 2,
                      py: 0.5,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      borderBottomLeftRadius: "12px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {faq.category}
                  </Box>

                  {/* Question Section */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: expandedFaq === faq.id ? 2 : 0,
                    }}
                  >
                    {/* Icon Circle */}
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "12px",
                        backgroundColor: `${colors.primaryRed}10`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {faq.icon}
                    </Box>

                    {/* Question and Toggle */}
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            color: colors.darkGray,
                            lineHeight: 1.4,
                            pr: 1,
                          }}
                        >
                          {faq.question}
                        </Typography>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            backgroundColor:
                              expandedFaq === faq.id
                                ? colors.primaryRed
                                : colors.gray70,
                            color:
                              expandedFaq === faq.id
                                ? colors.white
                                : colors.darkGray,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {expandedFaq === faq.id ? (
                            <RemoveIcon sx={{ fontSize: 18 }} />
                          ) : (
                            <AddIcon sx={{ fontSize: 18 }} />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Answer Section with Animation */}
                  <AnimatePresence>
                    {expandedFaq === faq.id && (
                      <motion.div
                        variants={answerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Box
                          sx={{
                            pl: 7, // Align with icon (50px icon + 16px gap)
                            pr: 4,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: "0.95rem", md: "1rem" },
                              color: colors.gray50,
                              lineHeight: 1.7,
                              borderTop: `1px solid ${colors.gray70}`,
                              pt: 2,
                              mt: 1,
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Paper>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 5, md: 7 },
              p: { xs: 3, md: 4 },
              backgroundColor: colors.white,
              borderRadius: "20px",
              boxShadow: `0 10px 30px ${colors.primaryRed}15`,
              border: `1px solid ${colors.gray70}`,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                color: colors.darkGray,
                fontWeight: 500,
                mb: 1,
              }}
            >
              Still have questions?
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                color: colors.gray50,
              }}
            >
              Contact our support team at{" "}
              <Box
                component="span"
                sx={{
                  color: colors.primaryRed,
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                padmavathicrackers@gmail.com
              </Box>{" "}
              or call us at{" "}
              <Box
                component="span"
                sx={{
                  color: colors.primaryRed,
                  fontWeight: 600,
                }}
              >
                +91 99525 61300 | +91 96551 21440
              </Box>
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FAQComponent;
