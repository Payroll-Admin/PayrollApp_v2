import React, { useState } from "react";
import "@fontsource/cinzel";
import { Box, Card, Typography, TextField, Button } from "@mui/material";

function Login({ onLoginSuccess }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctLoginId = "admin";
  const correctPassword = "123";

  const handleLogin = () => {
    if (loginId === correctLoginId && password === correctPassword) {
      setError("");
      onLoginSuccess({ name: "Admin" }); // Just pass a name, no role
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
        backgroundImage: `url("https://i.postimg.cc/cJ9V9Gch/pexels-quang-huy-dao-1662049632-27845253.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
          gutterBottom
          sx={{
            fontFamily: "Cinzel, serif",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
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
          sx={{
            mt: 2,
            backgroundColor: "#C5705D",
            "&:hover": {
              backgroundColor: "#a15249",
            },
            fontWeight: "bold",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
    </Box>
  );
}

export default Login;
