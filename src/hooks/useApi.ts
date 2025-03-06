import { useAuth } from "../context/AuthContext";
import {
  fetchQuestion as fetchQuestionApi,
  validateGuess as validateGuessApi,
} from "../services/api";

export const useApi = () => {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("AuthContext is null");
  }
  const { getToken } = authContext;

  const fetchQuestion = async () => {
    const token = await getToken();
    return fetchQuestionApi(token);
  };

  const validateGuess = async (guess: string, question: string) => {
    const token = await getToken();
    return validateGuessApi(guess, question, token);
  };

  return { fetchQuestion, validateGuess };
};
