import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={10}>
        <Typography variant="h3" gutterBottom>
          🌍 Globetrotter Challenge
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Guess the destination from cryptic clues & challenge your friends!
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/game")}
          >
            Play Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
