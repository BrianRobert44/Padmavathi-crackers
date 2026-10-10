import React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Link as MuiLink,
  Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { colors } from "../colors";

const faqData = [
  {
    question: "Where is Sri Padmavathi Crackers located?",
    answer: "Sri Padmavathi Crackers is located at Anuppankulam, Sivakasi, Tamil Nadu."
  },
  {
    question: "What types of crackers are available?",
    answer: "We offer a variety of crackers and fireworks, including sparklers, flower pots, rockets, chakkars, garlands, fountains, sky shots, gift boxes and other festival collections."
  },
  {
    question: "Do you offer wholesale crackers?",
    answer: "Yes. Sri Padmavathi Crackers accepts wholesale and bulk enquiries based on product availability and customer requirements."
  },
  {
    question: "How can I check the available crackers?",
    answer: (
      <>
        You can visit our <MuiLink component={Link} to="/home" color="primary">Products section</MuiLink> to explore the available crackers and fireworks collection.
      </>
    )
  },
  {
    question: "How can I enquire about product prices?",
    answer: "You can contact our team through the phone number or enquiry option available on our website for product availability and pricing details."
  },
  {
    question: "Do you accept bulk requirements?",
    answer: "Yes. Customers with bulk or wholesale requirements can contact our team to discuss their requirements."
  },
  {
    question: "How can I contact Sri Padmavathi Crackers?",
    answer: (
      <>
        You can <MuiLink component={Link} to="/contact" color="primary">contact us</MuiLink> at +91 99525 61300 / +91 96551 21440 or email padmavathicrackers@gmail.com.<br /><br />
        <strong>Location:</strong> 14/496/8, Anuppankulam, Sivakasi – 626189, Tamil Nadu
      </>
    )
  },
  {
    question: "Where can I find the latest crackers collection?",
    answer: (
      <>
        Visit our <MuiLink component={Link} to="/home" color="primary">Products page</MuiLink> to explore the available crackers and fireworks collection.
      </>
    )
  },
  {
    question: "Are festival gift boxes available?",
    answer: "Festival gift boxes and combo collections may be available depending on the current product range. Customers can contact the team for availability."
  },
  {
    question: "How can I enquire about wholesale requirements?",
    answer: "Customers looking for wholesale or bulk requirements can contact our team with their product and quantity requirements."
  }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": typeof faq.answer === 'string' ? faq.answer : "Please visit our website for details."
    }
  }))
};

const FaqPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.white20, pt: { xs: 12, md: 15 }, pb: 10 }}>
      <Helmet>
        <title>FAQ | Sri Padmavathi Crackers – Sivakasi Crackers</title>
        <meta name="description" content="Find answers to common questions about Sri Padmavathi Crackers, Sivakasi fireworks, product varieties, wholesale enquiries, pricing and contact details." />
        <link rel="canonical" href="https://www.sripadmavathicrackers.com/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <Container maxWidth="md">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <MuiLink component={Link} to="/" color="inherit">
            Home
          </MuiLink>
          <Typography color="text.primary">FAQ</Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: "white", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
              color: colors.primaryRed,
              mb: 4,
              textAlign: "center"
            }}
          >
            Frequently Asked Questions – Sri Padmavathi Crackers
          </Typography>

          <Box sx={{ mt: 4 }}>
            {faqData.map((faq, index) => (
              <Accordion 
                key={index}
                elevation={0}
                sx={{
                  mb: 2,
                  '&:before': { display: 'none' },
                  border: `1px solid ${colors.gray70}`,
                  borderRadius: '8px !important',
                  overflow: 'hidden'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: colors.primaryRed }} />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    bgcolor: '#fafafa',
                    '& .MuiAccordionSummary-content': {
                      my: 2
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", color: colors.darkGray }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 3, bgcolor: "white" }}>
                  <Typography component="div" sx={{ color: colors.gray50, lineHeight: 1.6, fontSize: "1.05rem" }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FaqPage;
