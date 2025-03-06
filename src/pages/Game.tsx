import { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../hooks/useApi";
import { motion, AnimatePresence } from "framer-motion";

const Game = () => {
  const navigate = useNavigate();
  const { fetchQuestion, validateGuess } = useApi();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    funFact: string;
  } | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(
    () => Number(localStorage.getItem("score")) || 0
  );
  const [timer, setTimer] = useState(10);

  const { data, isFetching, refetch } = useQuery<{
    clues: string[];
    question: string;
    options: string[];
    correctAnswer: string;
  }>({
    queryKey: ["question"],
    queryFn: fetchQuestion,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (data) {
      setTimer(10);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsCorrect(false);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [data]);

  const handleAnswerClick = async (answer: string) => {
    setSelectedAnswer(answer);

    try {
      const result = await validateGuess(answer, data?.question || "");
      setIsCorrect(result.correct);

      if (result.correct) {
        setScore((prev) => {
          const newScore = prev + 1;
          localStorage.setItem("score", newScore.toString());
          return newScore;
        });
      }

      setFeedback({
        message: result.message,
        funFact: result.fun_fact || "",
      });
    } catch (error) {
      console.error("Error validating guess:", error);
      setIsCorrect(false);
      setFeedback({
        message: "Something went wrong. Please try again.",
        funFact: "",
      });
    }
  };

  const handleNextQuestion = async () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    await refetch();
  };

  return (
    <Box textAlign="center" mt={5}>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h5">{data?.question}</Typography>
          <Typography variant="body2" mt={1} color="text.secondary">
            {data?.clues.join(" | ")}
          </Typography>

          <Typography variant="body1" color="error" mt={1}>
            ⏳ {timer}s left
          </Typography>

          <Box mt={3}>
            {data?.options?.map((option) => (
              <motion.div
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color={selectedAnswer === option ? "secondary" : "primary"}
                  onClick={() => handleAnswerClick(option)}
                  sx={{ m: 1 }}
                  disabled={isCorrect !== null}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </Box>

          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Typography
                  variant="h6"
                  mt={2}
                  color={isCorrect ? "green" : "red"}
                >
                  {feedback?.message}
                </Typography>

                {feedback?.funFact && (
                  <Typography variant="body2" mt={1} color="text.secondary">
                    {feedback.funFact}
                  </Typography>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {isCorrect !== null && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              sx={{ mt: 3 }}
            >
              Next Question
            </Button>
          )}

          <Typography variant="h6" mt={3}>
            Score: {score}
          </Typography>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>

          {isCorrect && <Confetti />}
        </>
      )}
    </Box>
  );
};

export default Game;
