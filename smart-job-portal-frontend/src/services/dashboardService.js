import API from "../utils/axiosConfig";

export const getDashboardStats = async () => {

    const response = await API.get("/dashboard/stats");

    return response.data;

};