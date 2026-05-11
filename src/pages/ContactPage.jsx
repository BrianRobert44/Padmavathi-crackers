// src/pages/ContactPage.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
  Alert,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { collection, getDocs, query, orderBy, addDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { motion } from "framer-motion";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GavelIcon from "@mui/icons-material/Gavel";
import InfoIcon from "@mui/icons-material/Info";
import bannerImage from "../assets/banner/contact.jpg";
import { colors } from "../colors";

// Animation variants (keeping your original ones)
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
  });

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name is too short";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter valid 10-digit Indian mobile number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Save to Firestore as Enquiry
    try {
      await addDoc(collection(db, "enquiries"), {
        ...formData,
        status: "new",
        createdAt: new Date(),
      });
      console.log("Enquiry saved to Firestore");
    } catch (err) {
      console.error("Error saving enquiry:", err);
    }

    const whatsappNumber = "919655121440";

    const message = `
Hello! Quick Enquiry from website:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setFormStatus({ submitted: true, success: true });

    setTimeout(() => {
      setFormStatus({ submitted: false, success: false });
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  // Google Maps iframe
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123456789!2d77.8!3d9.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0f0b123456789%3A0x123456789abcdef!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890";

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
            Contact Us
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
            <Typography color="inherit">Contact Us</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          bgcolor: colors.white,
          py: { xs: 4, md: 6 },
          overflow: "hidden",
        }}
      >
        {/* Animated background blobs */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            overflow: "hidden",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 2, delay: i * 0.3 }}
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: colors.primaryRed,
                filter: "blur(50px)",
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: colors.primaryRed,
                  mb: 1,
                  fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -10,
                    left: "25%",
                    width: "50%",
                    height: 4,
                    background: colors.warningYellow,
                    borderRadius: 2,
                    animation: "underlineExpand 1s ease-out",
                  },
                  "@keyframes underlineExpand": {
                    "0%": { width: "0%", left: "50%" },
                    "100%": { width: "50%", left: "25%" },
                  },
                }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: colors.gray60,
                  fontWeight: 400,
                  maxWidth: "600px",
                  mx: "auto",
                  mt: 2,
                }}
              >
                Get in touch with us for inquiries, bulk orders, or any
                assistance.
              </Typography>
            </Box>
          </motion.div>

          {/* Main flex content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 3, md: 5 },
                mb: 10,
              }}
            >
              {/* Left Column - Contact Info with Legal Notice */}
              <motion.div
                variants={fadeInUp}
                style={{ flex: 1, width: isMobile ? "100%" : "auto" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    height: "100%",
                    bgcolor: colors.lightBlueGray,
                    borderRadius: 4,
                    border: `1px solid ${colors.gray70}`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 40px ${colors.primaryRed}20`,
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: colors.darkGray, mb: 3 }}
                    >
                      Get in Touch
                    </Typography>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mb: 3,
                        cursor: "pointer",
                        "&:hover .icon-box": {
                          transform: "scale(1.1) rotate(10deg)",
                          bgcolor: colors.successGreen,
                        },
                      }}
                    >
                      <Box
                        className="icon-box"
                        sx={{
                          bgcolor: colors.primaryRed,
                          borderRadius: "50%",
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <PhoneIcon sx={{ color: colors.white }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: colors.gray50, fontWeight: 600 }}
                        >
                          Call Us
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: colors.darkGray, fontWeight: 500 }}
                        >
                          +91 99525 61300 | +91 96551 21440
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mb: 3,
                        cursor: "pointer",
                        "&:hover .icon-box": {
                          transform: "scale(1.1) rotate(10deg)",
                          bgcolor: colors.successGreen,
                        },
                      }}
                    >
                      <Box
                        className="icon-box"
                        sx={{
                          bgcolor: colors.primaryRed,
                          borderRadius: "50%",
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <LocationOnIcon sx={{ color: colors.white }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: colors.gray50, fontWeight: 600 }}
                        >
                          Location
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: colors.darkGray, fontWeight: 500 }}
                        >
                          14/496/8, Anuppankulam,
                          <br /> Sivakasi – 626189, Tamil Nadu
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mb: 3,
                        cursor: "pointer",
                        "&:hover .icon-box": {
                          transform: "scale(1.1) rotate(10deg)",
                          bgcolor: colors.successGreen,
                        },
                      }}
                    >
                      <Box
                        className="icon-box"
                        sx={{
                          bgcolor: colors.primaryRed,
                          borderRadius: "50%",
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <EmailIcon sx={{ color: colors.white }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: colors.gray50, fontWeight: 600 }}
                        >
                          Mail Us
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: colors.darkGray, fontWeight: 500 }}
                        >
                          padmavathicrackers@gmail.com
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>

                  {/* Legal Notice Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        mt: 2,
                        p: 2.5,
                        bgcolor: colors.white,
                        borderRadius: 3,
                        border: `2px dashed ${colors.primaryRed}`,
                        boxShadow: `0 4px 12px ${colors.primaryRed}20`,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1.5,
                        }}
                      >
                        <GavelIcon
                          sx={{ color: colors.primaryRed, fontSize: "1.2rem" }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: colors.primaryRed,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Important Legal Notice
                        </Typography>
                      </Box>

                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.darkGray,
                          display: "block",
                          lineHeight: 1.6,
                          fontSize: "0.7rem",
                          mb: 1.5,
                        }}
                      >
                        As per 2018 Supreme Court Order, Online Sale of
                        Firecrackers are NOT permitted. We Value our customers
                        and at the same time, we respect the jurisdiction.
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.darkGray,
                          display: "block",
                          lineHeight: 1.6,
                          fontSize: "0.7rem",
                          mb: 1.5,
                          fontWeight: 500,
                        }}
                      >
                        We request our customers to Select Your Products in
                        Estimate Page to see your Estimation and Submit the
                        required crackers through the Get Estimate Button. We
                        will contact you within 2 hrs and Confirm the Order
                        through Phone Call.
                      </Typography>

                      <Box
                        sx={{
                          bgcolor: colors.successGreen + "10",
                          p: 1.5,
                          borderRadius: 2,
                          border: `1px solid ${colors.successGreen}30`,
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: colors.darkGray,
                            display: "block",
                            lineHeight: 1.5,
                            fontSize: "0.7rem",
                          }}
                        >
                          <strong style={{ color: colors.successGreen }}>
                            ✓
                          </strong>{" "}
                          Please Add and Submit Your enquiries and enjoy your
                          Diwali with Sri Padmavathi CRACKERS.
                        </Typography>
                      </Box>

                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.darkGray,
                          display: "block",
                          lineHeight: 1.5,
                          fontSize: "0.7rem",
                          mb: 1,
                        }}
                      >
                        <InfoIcon
                          sx={{
                            fontSize: "0.7rem",
                            color: colors.brightBlue,
                            mr: 0.5,
                            verticalAlign: "middle",
                          }}
                        />
                        Sri Padmavathi CRACKERS Shop is a shop following 100% legal
                        & statutory compliances and all our shops, go-downs are
                        maintained as per the explosive acts. Our License No is 296/2022.
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: colors.darkGray,
                          display: "block",
                          lineHeight: 1.5,
                          fontSize: "0.7rem",
                        }}
                      >
                        We send the parcels through registered and legal
                        transport service providers as like every other major
                        Companies in Sivakasi is doing so.
                      </Typography>
                    </Box>
                  </motion.div>
                </Paper>
              </motion.div>

              {/* Right - Form with validation */}
              <motion.div variants={fadeInUp} style={{ flex: 1.5 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    bgcolor: colors.white,
                    borderRadius: 4,
                    border: `1px solid ${colors.gray70}`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 40px ${colors.primaryRed}20`,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: colors.darkGray, mb: 3 }}
                  >
                    Send Us a Message
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    {[
                      { id: "name", label: "Your Name", type: "text" },
                      { id: "email", label: "Email Address", type: "email" },
                      { id: "phone", label: "Phone Number", type: "tel" },
                    ].map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      >
                        <Box sx={{ mb: 2 }}>
                          <TextField
                            required
                            fullWidth
                            id={field.id}
                            label={field.label}
                            type={field.type}
                            variant="outlined"
                            value={formData[field.id]}
                            onChange={handleChange}
                            error={!!errors[field.id]}
                            helperText={errors[field.id] || " "}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                transition: "all 0.3s ease",
                                "&:hover fieldset": {
                                  borderColor: colors.primaryRed,
                                  borderWidth: 2,
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: colors.primaryRed,
                                },
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: colors.primaryRed,
                              },
                              "& .MuiFormHelperText-root": {
                                color: errors[field.id]
                                  ? colors.primaryRed
                                  : "inherit",
                              },
                            }}
                          />
                        </Box>
                      </motion.div>
                    ))}

                    {/* Message */}
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <TextField
                          required
                          fullWidth
                          id="message"
                          label="Your Message"
                          multiline
                          rows={4}
                          variant="outlined"
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message || " "}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              transition: "all 0.3s ease",
                              "&:hover fieldset": {
                                borderColor: colors.primaryRed,
                                borderWidth: 2,
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: colors.primaryRed,
                              },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: colors.primaryRed,
                            },
                            "& .MuiFormHelperText-root": {
                              color: errors.message
                                ? colors.primaryRed
                                : "inherit",
                            },
                          }}
                        />
                      </Box>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        endIcon={
                          formStatus.success ? (
                            <CheckCircleIcon />
                          ) : (
                            <SendIcon />
                          )
                        }
                        disabled={formStatus.submitted}
                        sx={{
                          mt: 1,
                          bgcolor: colors.primaryRed,
                          color: colors.white,
                          py: 1.5,
                          fontSize: "1rem",
                          fontWeight: 600,
                          position: "relative",
                          overflow: "hidden",
                          "&:hover": {
                            bgcolor: colors.darkRed,
                          },
                        }}
                      >
                        {formStatus.success
                          ? "Opening WhatsApp..."
                          : formStatus.submitted
                            ? "Sending..."
                            : "Send via WhatsApp"}
                      </Button>
                    </motion.div>
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Box sx={{ mt: { xs: 5, md: 6 } }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  bgcolor: colors.lightBlueGray,
                  borderRadius: 4,
                  border: `1px solid ${colors.gray70}`,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: colors.darkGray,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  Find Our Location
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: "300px", sm: "400px", md: "450px" },
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: `0 10px 30px ${colors.black}20`,
                  }}
                >
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Padmavathi Crackers Location"
                  />

                  {/* Map Overlay on Hover */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      color: colors.white,
                      transform: "translateY(100%)",
                      transition: "transform 0.3s ease",
                      ".MuiPaper-root:hover &": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <LocationOnIcon sx={{ color: colors.primaryRed }} />
                      Flat.No: 14/501/1, Anuppankulam, Sivakasi, Tamil Nadu
                      626189
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default ContactPage;
