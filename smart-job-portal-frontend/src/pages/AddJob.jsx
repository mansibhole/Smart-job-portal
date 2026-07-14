import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/adminService";
import { toast } from "react-toastify";
function AddJob() {

    const navigate = useNavigate();

    const [job, setJob] = useState({
        title: "",
        companyName: "",
        location: "",
        description: "",
        salary: "",
        jobType: ""
    });

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createJob(job);

            toast.success("Job Created Successfully!");

            navigate("/admin");

        } catch (error) {

            console.log(error);

            toast.success("Unable to create job.");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    Add New Job
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="form-control mb-3"
                        placeholder="Job Title"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Company Name"
                        name="companyName"
                        value={job.companyName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Location"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Description"
                        name="description"
                        rows="4"
                        value={job.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Salary"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
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
                        className="btn btn-success w-100"
                        type="submit"
                    >
                        Create Job
                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddJob;