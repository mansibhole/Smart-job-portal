import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingSpinner from "../components/LoadingSpinner";

import {
    getAllJobs,
    searchJobs
} from "../services/jobService";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            setLoading(true);

            const response = await getAllJobs();

            setJobs(response.data.content);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load jobs.");

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = async () => {

        if (keyword.trim() === "") {

            loadJobs();

            return;

        }

        try {

            setLoading(true);

            const response = await searchJobs(keyword);

            setJobs(response.data.content);

        } catch (error) {

            console.log(error);

            toast.error("Search failed.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="container mt-5">

            <h2 className="text-center fw-bold mb-4">

                Latest Job Openings

            </h2>

            <div className="row justify-content-center mb-5">

                <div className="col-md-8">

                    <div className="input-group">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title, company or location..."
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(e.target.value)
                            }
                        />

                        <button
                            className="btn btn-primary"
                            onClick={handleSearch}
                        >

                            Search

                        </button>

                    </div>

                </div>

            </div>

            {

                jobs.length === 0 &&

                <div className="alert alert-warning text-center">

                    No jobs found.

                </div>

            }

            <div className="row">

                {

                    jobs.map(job => (

                        <div
                            key={job.id}
                            className="col-lg-4 col-md-6 mb-4"
                        >

                            <div
                                className="card shadow border-0 h-100"
                                style={{
                                    borderRadius: "18px"
                                }}
                            >

                                <div className="card-body">

                                    <h4 className="fw-bold">

                                        {job.title}

                                    </h4>

                                    <h5 className="text-primary">

                                        🏢 {job.companyName}

                                    </h5>

                                    <hr />

                                    <p>

                                        📍 <strong>Location:</strong>

                                        {" "}

                                        {job.location}

                                    </p>

                                    <p>

                                        💰 <strong>Salary:</strong>

                                        {" "}

                                        <span className="badge bg-success">

                                            {

                                                job.salary

                                                    ? `₹${Number(job.salary).toLocaleString()}`

                                                    : "Not Mentioned"

                                            }

                                        </span>

                                    </p>

                                    <p>

                                        💼 <strong>Job Type:</strong>

                                        {" "}

                                        <span className="badge bg-primary">

                                            {

                                                job.jobType

                                                    ? job.jobType

                                                    : "Not Mentioned"

                                            }

                                        </span>

                                    </p>

                                    <p
                                        style={{
                                            minHeight: "80px"
                                        }}
                                    >

                                        {job.description}

                                    </p>

                                    <small className="text-muted">

                                        Posted:

                                        {" "}

                                        {

                                            new Date(
                                                job.createdAt
                                            ).toLocaleDateString()

                                        }

                                    </small>

                                </div>

                                <div className="card-footer bg-white border-0">

                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="btn btn-success w-100"
                                    >

                                        View Details

                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Jobs;