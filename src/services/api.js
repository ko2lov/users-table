import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.users;
  } catch (error) {
    throw new Error("Ошибка при загрузке данных пользователей");
  }
};

export const searchUsers = async (term) => {
  try {
    const response = await axios.get(`${API_URL}/filter?q=${term}`);
    return response.data.users;
  } catch (error) {
    throw new Error("Ошибка при поиске пользователей");
  }
};
