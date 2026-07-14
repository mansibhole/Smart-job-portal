import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllJobs } from "../services/jobService";
import { updateJob } from "../services/adminService";
import { toast } from "react-toastify";
function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        companyName: "",
        location: "",
        description: "",
        salary: "",
        jobType: ""
    });

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {

        try {

            const response = await getAllJobs();

            const selectedJob = response.data.content.find(
                (j) => j.id === Number(id)
            );

            if (selectedJob) {
                setJob(selectedJob);
            }

        } catch (error) {

            console.log(error);

            toast.success("Unable to load job.");

        }

    };

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateJob(id, job);

            toast.success("Job Updated Successfully!");

            navigate("/admin");

        } catch (error) {

            console.log(error);

            toast.success("Unable to update job.");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    Edit Job
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                        placeholder="Job Title"
                        required
                    />

                    <input
                        className="form-control mb-3"
                        name="companyName"
                        value={job.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        required
                    />

                    <input
                        className="form-control mb-3"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                        placeholder="Location"
                        required
                    />

                    <textarea
                        className="form-control mb-3"
                        rows="4"
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
                        placeholder="Salary"
                    />

                    <select
                        className="form-control mb-3"
                        name="jobType"
                        value={job.jobType}
                        onChange={handleChange}
                    >
                        <option value="">Select Job Type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                    </select>

                    <button
                        className="btn btn-warning w-100"
                        type="submit"
                    >
                        Update Job
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditJob;