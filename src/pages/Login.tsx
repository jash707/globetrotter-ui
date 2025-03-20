import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import { loginUser } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      return loginUser(idToken);
    },
    onSuccess: () => {
      navigate("/game");
    },
    onError: (error) => {
      alert(`Login failed: ${error.message}`);
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={400}
      margin="auto"
      mt={5}
    >
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </Button>
      <Typography variant="body2" mt={2}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Box>
  );
};

export default Login;
