// Login.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, Typography, TextField, Button } from "@mui/material";

const SHEET_URL =
  "https://opensheet.elk.sh/1kipKG3qgAUdKl6nUhYQdcMU_mfx45vdA7Zte_t_0Jvs/Login Credentials";

function Login({ onLoginSuccess }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    axios
      .get(SHEET_URL)
      .then((res) => setCredentials(res.data))
      .catch((err) => console.error("Failed to load login credentials", err));
  }, []);

  const handleLogin = () => {
    const user = credentials.find(
      (u) => u["Employee ID"] === loginId && u.Password === password
    );

    if (user) {
      setError("");
      onLoginSuccess({
        id: user["Employee ID"],
        name: user.Name,
        role: user.Role,
      });
    } else {
      setError("Incorrect Login ID or Password");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundImage:
          'url("https://i.postimg.cc/cJ9V9Gch/pexels-quang-huy-dao-1662049632-27845253.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          p: 4,
          minWidth: 300,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: 5,
          borderRadius: 3,
        }}
      >
        <Typography
          align="center"
          variant="h4"
          sx={{
            fontFamily: "Cinzel, serif",
            fontWeight: "bold",
          }}
        >
          Login to Krown
        </Typography>

        <TextField
          fullWidth
          label="Login ID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        {error && (
          <Typography color="error" align="center" mt={1}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#C5705D", fontWeight: "bold" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </Box>
  );
}

export default Login;
