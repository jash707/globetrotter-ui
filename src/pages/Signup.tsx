import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import { signUpUser } from "../api/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await getIdToken(userCredential.user);

      return signUpUser(email, token);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      alert(`Signup failed: ${error.message}`);
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
      <Typography variant="h4">Sign Up</Typography>
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
        {mutation.isPending ? "Signing up..." : "Sign Up"}
      </Button>
      <Typography variant="body2" mt={2}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
};

export default Signup;
