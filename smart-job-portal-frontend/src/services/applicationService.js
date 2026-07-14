import API from "../utils/axiosConfig";

// ======================================
// USER : Apply for Job
// ======================================
export const applyJob = async (jobId, resume) => {

    const formData = new FormData();

    formData.append("resume", resume);

    const response = await API.post(
        `/applications/${jobId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

// ======================================
// USER : View My Applications
// ======================================
export const getMyApplications = async () => {

    const response = await API.get("/applications/my");

    return response.data;

};

// ======================================
// ADMIN : View Applicants by Job
// ======================================
export const getApplicantsByJob = async (jobId) => {

    const response = await API.get(
        `/applications/job/${jobId}`
    );

    return response.data;

};

// ======================================
// ADMIN : Accept / Reject Application
// ======================================
export const updateApplicationStatus = async (
    applicationId,
    status
) => {

    const response = await API.put(
        `/applications/${applicationId}/status?status=${status}`
    );

    return response.data;

};

// ======================================
// ADMIN : Download Resume
// ======================================
export const downloadResume = async (applicationId) => {

    const response = await API.get(
        `/applications/${applicationId}/resume`,
        {
            responseType: "blob"
        }
    );

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute("download", "resume.pdf");

    document.body.appendChild(link);

    link.click();

    link.remove();

};