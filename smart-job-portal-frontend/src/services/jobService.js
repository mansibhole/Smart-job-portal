import API from "../utils/axiosConfig";

export const getAllJobs = async () => {
    const response = await API.get("/jobs");
    return response.data;
};

export const searchJobs = async (keyword) => {
    const response = await API.get(`/jobs/search?keyword=${keyword}`);
    return response.data;
};
export const deleteJob = async (id) => {
    const response = await API.delete(`/jobs/${id}`);
    return response.data;
};

export const updateJob = async (id, jobData) => {
    const response = await API.put(`/jobs/${id}`, jobData);
    return response.data;
};