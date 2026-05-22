// src/components/SafetyTips.jsx
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { colors } from "../colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// Background image (keep your path)
import safetyTipsBg from "../assets/aboutPage/safetytips.jpg";

const doTips = [
  {
    icon: "mdi:fire",
    title: "Open Ground",
    text: "Celebrate and light firecrackers in an open ground.",
  },
  {
    icon: "mdi:water",
    title: "Be Prepared",
    text: "Always keep water, sand and a first-aid box nearby.",
  },
  {
    icon: "mdi:shoe-sneaker",
    title: "Wear Shoes",
    text: "Wear good shoes to protect your feet.",
  },
  {
    icon: "mdi:account-child",
    title: "Supervise Children",
    text: "Always supervise children and never let them light crackers alone.",
  },
  {
    icon: "mdi:glasses",
    title: "Eye Protection",
    text: "Wear safety goggles or glasses to protect your eyes.",
  },
];

const dontTips = [
  {
    icon: "mdi:close-octagon",
    title: "Avoid Checking",
    text: "Do not go back and check crackers if they are igniting or not.",
  },
  {
    icon: "mdi:fire-circle",
    title: "No Hand Lighting",
    text: "Don't light crackers while holding them in your hands.",
  },
  {
    icon: "mdi:tshirt-crew",
    title: "Clothing Safety",
    text: "Do not wear nylon or synthetic clothes while lighting crackers.",
  },
  {
    icon: "mdi:home",
    title: "No Indoor Lighting",
    text: "Never light crackers indoors or in confined spaces.",
  },
  {
    icon: "mdi:restart",
    title: "Don't Relight Duds",
    text: "Do not try to relight crackers that failed to ignite — discard safely.",
  },
];

const SafetyTips = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Mobile view - Stack layout
  if (isMobile) {
    return (
      <Box
        sx={{
          position: "relative",
          py: 4,
          mt: 2,
          overflow: "hidden",
          color: colors.white,
        }}
      >
        {/* Background with shade */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${safetyTipsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 100%)`,
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box sx={{ position: "relative", zIndex: 3, px: 2 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: colors.warningYellow,
                fontSize: "1.75rem",
                textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: "15%",
                  width: "70%",
                  height: 4,
                  bgcolor: colors.primaryRed,
                  borderRadius: 4,
                },
              }}
            >
              Important Safety Rules for Diwali
            </Typography>

            <Typography
              sx={{
                mt: 2,
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.95)",
                px: 2,
              }}
            >
              Essential guidelines to celebrate Diwali safely and joyfully.
            </Typography>
          </Box>

          {/* Do's Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Paper
              elevation={3}
              sx={{
                mb: 3,
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#ffffff",
              }}
            >
              <Box
                sx={{
                  bgcolor: colors.successGreen,
                  py: 1.5,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CheckCircleIcon
                  sx={{ color: "#ffffff", fontSize: "1.5rem" }}
                />
                <Typography
                  sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1.2rem" }}
                >
                  Do's
                </Typography>
              </Box>

              {doTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderBottom:
                        index < doTips.length - 1
                          ? "1px solid rgba(0,0,0,0.08)"
                          : "none",
                      display: "flex",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: `${colors.successGreen}20`,
                        borderRadius: "50%",
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 40,
                        height: 40,
                      }}
                    >
                      <Icon
                        icon={tip.icon}
                        width={22}
                        color={colors.successGreen}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: colors.successGreen,
                          fontSize: "1rem",
                          mb: 0.25,
                        }}
                      >
                        {tip.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: "0.9rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {tip.text}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Paper>

            {/* Don'ts Section */}
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#ffffff",
              }}
            >
              <Box
                sx={{
                  bgcolor: colors.dangerRed,
                  py: 1.5,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CancelIcon sx={{ color: "#ffffff", fontSize: "1.5rem" }} />
                <Typography
                  sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1.2rem" }}
                >
                  Don'ts
                </Typography>
              </Box>

              {dontTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderBottom:
                        index < dontTips.length - 1
                          ? "1px solid rgba(0,0,0,0.08)"
                          : "none",
                      display: "flex",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: `${colors.dangerRed}20`,
                        borderRadius: "50%",
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 40,
                        height: 40,
                      }}
                    >
                      <Icon
                        icon={tip.icon}
                        width={22}
                        color={colors.dangerRed}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: colors.dangerRed,
                          fontSize: "1rem",
                          mb: 0.25,
                        }}
                      >
                        {tip.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: "0.9rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {tip.text}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Paper>
          </motion.div>
        </Box>
      </Box>
    );
  }

  // Tablet and Desktop view - Table layout
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 6, md: 8 },
        mt: { xs: 2, md: 4 },
        overflow: "hidden",
        color: colors.white,
      }}
    >
      {/* Background with shade */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${safetyTipsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Animated particles */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {[...Array(15)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: { xs: 3, md: 5 },
              height: { xs: 3, md: 5 },
              bgcolor: colors.warningYellow,
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3,
              animation: `float ${12 + Math.random() * 18}s linear infinite`,
              "@keyframes float": {
                "0%": { transform: "translateY(0)", opacity: 0 },
                "10%": { opacity: 0.5 },
                "90%": { opacity: 0.5 },
                "100%": { transform: "translateY(-120vh)", opacity: 0 },
              },
            }}
          />
        ))}
      </Box>

      {/* Main Content */}
      <Box sx={{ position: "relative", zIndex: 3, px: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 7 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: colors.warningYellow,
              fontSize: { xs: "2rem", sm: "2.2rem", md: "3.2rem" },
              textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -12,
                left: "15%",
                width: "70%",
                height: { xs: 4, md: 5 },
                bgcolor: colors.primaryRed,
                borderRadius: 4,
              },
            }}
          >
            Important Safety Rules for Diwali
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.15rem" },
              maxWidth: 700,
              mx: "auto",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.7,
              px: { xs: 2, sm: 4, md: 0 },
            }}
          >
            Essential guidelines to celebrate Diwali safely and joyfully.
          </Typography>
        </Box>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <Table
            sx={{
              borderRadius: { xs: 2, md: 3 },
              overflow: "hidden",
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
              border: "1px solid rgba(0,0,0,0.12)",
              maxWidth: "1100px",
              mx: "auto",
              width: { xs: "100%", sm: "95%", md: "90%", lg: "1100px" },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                    color: "#ffffff",
                    bgcolor: colors.successGreen,
                    py: { xs: 1.5, sm: 2, md: 2.5 },
                    borderRight: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: { xs: 0.5, sm: 1, md: 1.5 },
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        fontSize: { xs: "1.2rem", sm: "1.4rem", md: "2rem" },
                      }}
                    />
                    Do's
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                    color: "#ffffff",
                    bgcolor: colors.dangerRed,
                    py: { xs: 1.5, sm: 2, md: 2.5 },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: { xs: 0.5, sm: 1, md: 1.5 },
                    }}
                  >
                    <CancelIcon
                      sx={{
                        fontSize: { xs: "1.2rem", sm: "1.4rem", md: "2rem" },
                      }}
                    />
                    Don'ts
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.from({
                length: Math.max(doTips.length, dontTips.length),
              }).map((_, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { bgcolor: "rgba(245,245,245,0.7)" },
                  }}
                >
                  {/* Do's Column */}
                  <TableCell
                    sx={{
                      borderBottom: "1px solid rgba(0,0,0,0.08)",
                      borderRight: "1px solid rgba(0,0,0,0.06)",
                      p: { xs: 1.5, sm: 2, md: 3 },
                      verticalAlign: "top",
                    }}
                  >
                    {doTips[index] && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.12, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: { xs: 1, sm: 1.5, md: 2 },
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: `${colors.successGreen}20`,
                              borderRadius: "50%",
                              p: { xs: 0.8, sm: 1, md: 1.2 },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: { xs: 36, sm: 40, md: 48 },
                              height: { xs: 36, sm: 40, md: 48 },
                            }}
                          >
                            <Icon
                              icon={doTips[index].icon}
                              width={isTablet ? 22 : 28}
                              color={colors.successGreen}
                            />
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: colors.successGreen,
                                fontSize: {
                                  xs: "0.9rem",
                                  sm: "0.95rem",
                                  md: "1.1rem",
                                },
                                mb: 0.25,
                              }}
                            >
                              {doTips[index].title}
                            </Typography>
                            <Typography
                              sx={{
                                color: "text.primary",
                                fontSize: {
                                  xs: "0.8rem",
                                  sm: "0.85rem",
                                  md: "1rem",
                                },
                                lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                              }}
                            >
                              {doTips[index].text}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    )}
                  </TableCell>

                  {/* Don'ts Column */}
                  <TableCell
                    sx={{
                      borderBottom: "1px solid rgba(0,0,0,0.08)",
                      p: { xs: 1.5, sm: 2, md: 3 },
                      verticalAlign: "top",
                    }}
                  >
                    {dontTips[index] && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.12, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: { xs: 1, sm: 1.5, md: 2 },
                            alignItems: "flex-start",
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: `${colors.dangerRed}20`,
                              borderRadius: "50%",
                              p: { xs: 0.8, sm: 1, md: 1.2 },
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minWidth: { xs: 36, sm: 40, md: 48 },
                              height: { xs: 36, sm: 40, md: 48 },
                            }}
                          >
                            <Icon
                              icon={dontTips[index].icon}
                              width={isTablet ? 22 : 28}
                              color={colors.dangerRed}
                            />
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: colors.dangerRed,
                                fontSize: {
                                  xs: "0.9rem",
                                  sm: "0.95rem",
                                  md: "1.1rem",
                                },
                                mb: 0.25,
                              }}
                            >
                              {dontTips[index].title}
                            </Typography>
                            <Typography
                              sx={{
                                color: "text.primary",
                                fontSize: {
                                  xs: "0.8rem",
                                  sm: "0.85rem",
                                  md: "1rem",
                                },
                                lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                              }}
                            >
                              {dontTips[index].text}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SafetyTips;
