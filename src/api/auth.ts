import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const signUpUser = async (email: string, idToken: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/signup`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};

export const loginUser = async (idToken: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/login`,
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};
