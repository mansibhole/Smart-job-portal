import API from "../utils/axiosConfig";

export const createJob = async (job) => {

    const response = await API.post("/jobs", job);

    return response.data;

};

export const updateJob = async (id, job) => {

    const response = await API.put(`/jobs/${id}`, job);

    return response.data;

};

export const deleteJob = async (id) => {

    const response = await API.delete(`/jobs/${id}`);

    return response.data;

};

export const getApplicantsByJob = async (jobId) => {

    const response = await API.get(`/applications/job/${jobId}`);

    return response.data;

};