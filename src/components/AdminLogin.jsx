import React, { useState } from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  CircularProgress
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { colors } from "../colors";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLogin) onLogin();
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Only admin can login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "80vh",
        px: 2
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          width: "100%", 
          maxWidth: 400, 
          borderRadius: 3,
          textAlign: "center"
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1, color: colors.primaryRed }}>
          Admin Login
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: colors.darkGray }}>
          Please enter your credentials to access the admin portal.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 4 }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ 
              bgcolor: colors.primaryRed, 
              color: colors.white,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              "&:hover": { bgcolor: colors.darkRed }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "LOGIN"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
