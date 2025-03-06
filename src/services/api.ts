import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const fetchQuestion = async (token: string | null) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(`${API_BASE_URL}/api/destination`, {
    headers,
  });
  return response.data;
};

export const validateGuess = async (
  guess: string,
  question: string,
  token: string | null
) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.post(
    `${API_BASE_URL}/api/guess`,
    { guess, question },
    { headers }
  );
  return response.data;
};
