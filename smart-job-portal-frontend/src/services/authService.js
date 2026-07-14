import API from "../utils/axiosConfig";

export const loginUser = async (loginData) => {
    const response = await API.post("/auth/login", loginData);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await API.post("/auth/register", userData);
    return response.data;
};