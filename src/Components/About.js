import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* Section 1 - About */}
      <Box
        sx={{
          px: { xs: 3, md: 10 },
          py: { xs: 5, md: 10 },
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "1400px",
            mx: "auto",
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={12} md={7} sx={{ position: "relative", zIndex: 1 }}>
              <Box sx={{ maxWidth: "600px", pr: { md: 5 } }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mb: 3,
                    pb: 1,
                    position: "relative",
                    display: "inline-block",
                    color: "#ff6f00",
                  }}
                >
                  The Year, 2018
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "50%",
                      height: "4px",
                      backgroundColor: "#ff6f00",
                      borderRadius: 2,
                    }}
                  />
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{
                    mb: 3,
                    lineHeight: 1.2,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  We Are The Leader In{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#ff6f00",
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: "5px",
                        width: "100%",
                        height: "10px",
                        backgroundColor: "rgba(255, 111, 0, 0.2)",
                        zIndex: -1,
                      },
                    }}
                  >
                    AI Innovation
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                  }}
                >
                  Established in 2018 and headquartered in{" "}
                  <strong style={{ color: theme.palette.text.primary }}>
                    Texas, USA
                  </strong>
                  ,{" "}
                  <strong style={{ color: theme.palette.text.primary }}>
                    Neutrino Tech Systems
                  </strong>{" "}
                  is a pioneering force in delivering cutting-edge IT services
                  and solutions.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                  }}
                >
                  With a global presence in India, the USA, and Costa Rica, we
                  help healthcare organizations worldwide enhance patient care
                  and improve outcomes.
                </Typography>

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    backgroundColor: "#ff6f00",
                    textTransform: "none",
                    boxShadow: "0px 8px 20px rgba(255, 111, 0, 0.3)",
                    "&:hover": {
                      backgroundColor: "#e65c00",
                    },
                  }}
                >
                  Come, Join Us
                </Button>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={8}
              sx={{
                position: { xs: "static", md: "absolute" },
                right: 0,
                top: "50%",
                transform: { md: "translateY(-50%)" },
                width: { md: "60%" },
                zIndex: 0,
                mt: { xs: 4, md: 0 },
              }}
            >
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Box
                  component="img"
                  src="https://neutrinotechsystems.com/wp-content/uploads/2023/03/Untitled-design-22.png"
                  alt="Teamwork Puzzle"
                  sx={{
                    width: "100%",
                    maxWidth: "700px",
                    height: "auto",
                    borderRadius: 4,
                    border: "6px solid transparent",
                    backgroundImage:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(#121212, #121212), linear-gradient(to right, #ff9800, #ff6f00)"
                        : "linear-gradient(white, white), linear-gradient(to right, #ff9800, #ff6f00)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "content-box, border-box",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    ml: "auto",
                    display: "block",
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          px: { xs: 3, md: 10 },
          py: { xs: 5, md: 10 },
          backgroundColor:
            theme.palette.mode === "dark" ? "#1e1e1e" : "#fffaf0",
          color: theme.palette.text.primary,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 5,
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <motion.img
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            src="https://neutrinotechsystems.com/wp-content/uploads/2023/02/Neutrin-1.jpg"
            alt="Who We Are"
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "16px",
              border: `6px solid orange`,
              objectFit: "cover",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(255, 255, 255, 0.15)"
                  : "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          />

          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ flex: 1 }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ mb: 2, color: "#FF7F50" }}
            >
              Who We Are?
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 2, color: theme.palette.text.secondary }}
            >
              As a leading provider of IT services and solutions, we strive to
              deliver best-in-class solutions tailored to our clients’ unique
              needs. Our passionate determination drives us to achieve
              exceptional results, enabling forward-thinking businesses to grow
              and innovate.
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary }}
            >
              We are a Great Place to Work, with a collaborative environment
              that supports personal and professional growth of our associates.
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default About;
