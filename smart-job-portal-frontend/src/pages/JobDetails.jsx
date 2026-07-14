import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { getAllJobs } from "../services/jobService";
import { applyJob } from "../services/applicationService";
import LoadingSpinner from "../components/LoadingSpinner";

function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJob();
    }, []);

    const loadJob = async () => {

        try {

            setLoading(true);

            const response = await getAllJobs();

            const selectedJob = response.data.content.find(
                (j) => j.id === Number(id)
            );

            setJob(selectedJob);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load job details.");

        } finally {

            setLoading(false);

        }

    };

    const handleApply = async () => {

        if (!resume) {

            toast.warning("Please select your resume.");

            return;

        }

        const result = await Swal.fire({

            title: "Apply for this Job?",
            text: "Your resume will be submitted to the employer.",
            icon: "question",

            showCancelButton: true,

            confirmButtonColor: "#198754",
            cancelButtonColor: "#6c757d",

            confirmButtonText: "Apply Now",
            cancelButtonText: "Cancel"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            await applyJob(id, resume);

            toast.success("Application Submitted Successfully!");

            await Swal.fire({

                title: "Success!",
                text: "Your application has been submitted.",
                icon: "success",
                timer: 1800,
                showConfirmButton: false

            });

            setResume(null);

            document.getElementById("resumeFile").value = "";

        } catch (error) {

            console.log(error);

            toast.error("Application Failed!");

        }

    };

    if (loading) {

        return <LoadingSpinner />;

    }

    if (!job) {

        return (

            <div className="container mt-5">

                <div className="alert alert-danger text-center">

                    Job not found.

                </div>

            </div>

        );

    }

    return (

        <div className="container mt-5 mb-5">

            <div className="row justify-content-center">

                <div className="col-lg-9">

                    <div className="card shadow-lg border-0">

                        <div className="card-body p-5">

                            <h2 className="fw-bold mb-3">

                                {job.title}

                            </h2>

                            <h4 className="text-primary mb-4">

                                🏢 {job.companyName}

                            </h4>

                            <div className="row mb-4">

                                <div className="col-md-6">

                                    <p>

                                        <strong>📍 Location</strong>

                                        <br />

                                        {job.location}

                                    </p>

                                </div>

                                <div className="col-md-6">

                                    <p>

                                        <strong>📅 Posted On</strong>

                                        <br />

                                        {

                                            job.createdAt
                                                ? new Date(job.createdAt).toLocaleDateString()
                                                : "N/A"

                                        }

                                    </p>

                                </div>

                            </div>

                            <div className="mb-4">

                                <span className="badge bg-success fs-6 me-2">

                                    💰 {

                                        job.salary

                                            ? `₹${Number(job.salary).toLocaleString()}`

                                            : "Salary Not Mentioned"

                                    }

                                </span>

                                <span className="badge bg-primary fs-6">

                                    💼 {

                                        job.jobType

                                            ? job.jobType

                                            : "Not Mentioned"

                                    }

                                </span>

                            </div>

                            <hr />

                            <h4 className="fw-bold">

                                Job Description

                            </h4>

                            <p
                                className="mt-3"
                                style={{
                                    lineHeight: "1.8"
                                }}
                            >

                                {job.description}

                            </p>

                            <hr className="my-4" />

                            <div className="card bg-light border-0">

                                <div className="card-body">

                                    <h4 className="mb-3">

                                        📄 Apply for this Job

                                    </h4>

                                    <p className="text-muted">

                                        Upload your latest resume in PDF, DOC or DOCX format.

                                    </p>

                                    <input
                                        id="resumeFile"
                                        type="file"
                                        className="form-control mb-4"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) =>
                                            setResume(e.target.files[0])
                                        }
                                    />

                                    <button
                                        className="btn btn-success btn-lg w-100"
                                        onClick={handleApply}
                                    >

                                        🚀 Apply Now

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default JobDetails;