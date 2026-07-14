import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobs, deleteJob } from "../services/jobService";
import { getDashboardStats } from "../services/dashboardService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
function AdminDashboard() {

    const [jobs, setJobs] = useState([]);

    const [stats, setStats] = useState({
        totalJobs: 0,
        totalUsers: 0,
        totalApplications: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const jobsResponse = await getAllJobs();
            setJobs(jobsResponse.data.content);

            const statsResponse = await getDashboardStats();
            setStats(statsResponse.data);

        } catch (error) {

            console.log(error);
            toast.success("Unable to load dashboard.");

        }

    };

   const handleDelete = async (id) => {

    const result = await Swal.fire({

        title: "Delete Job?",
        text: "This action cannot be undone!",
        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d",

        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel"

    });

    if (!result.isConfirmed) {

        return;

    }

    try {

        await deleteJob(id);

        toast.success("Job deleted successfully.");

        await Swal.fire({

            title: "Deleted!",
            text: "Job has been deleted successfully.",
            icon: "success",
            timer: 1800,
            showConfirmButton: false

        });

        loadDashboard();

    } catch (error) {

        console.log(error);

        toast.error("Unable to delete job.");

    }

};

    return (

        <div className="container mt-5 mb-5">

            {/* Header */}

            <div className="bg-dark text-white rounded-4 p-4 shadow mb-5">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="fw-bold">
                            👨‍💼 Admin Dashboard
                        </h2>

                        <p className="mb-0">
                            Manage jobs, applicants and portal statistics.
                        </p>

                    </div>

                    <Link
                        to="/admin/add-job"
                        className="btn btn-warning btn-lg"
                    >
                        ➕ Add New Job
                    </Link>

                </div>

            </div>

            {/* Statistics */}

            <div className="row mb-5">

                <div className="col-md-4 mb-3">

                    <div className="card border-0 shadow text-center">

                        <div className="card-body">

                            <h1>💼</h1>

                            <h5>Total Jobs</h5>

                            <h2 className="text-primary">

                                {stats.totalJobs}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card border-0 shadow text-center">

                        <div className="card-body">

                            <h1>📄</h1>

                            <h5>Total Applications</h5>

                            <h2 className="text-success">

                                {stats.totalApplications}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card border-0 shadow text-center">

                        <div className="card-body">

                            <h1>👥</h1>

                            <h5>Registered Users</h5>

                            <h2 className="text-danger">

                                {stats.totalUsers}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* Jobs */}

            <h3 className="mb-4 fw-bold">

                Active Job Listings

            </h3>

            <div className="row">

                {

                    jobs.map(job => (

                        <div
                            key={job.id}
                            className="col-lg-4 col-md-6 mb-4"
                        >

                            <div
                                className="card border-0 shadow-lg h-100"
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

                                        📍 <strong>Location</strong>

                                        <br />

                                        {job.location}

                                    </p>

                                    <p>

                                        💰 <strong>Salary</strong>

                                        <br />

                                        <span className="badge bg-success">

                                            {

                                                job.salary

                                                    ? `₹${Number(job.salary).toLocaleString()}`

                                                    : "Not Mentioned"

                                            }

                                        </span>

                                    </p>

                                    <p>

                                        💼 <strong>Job Type</strong>

                                        <br />

                                        <span className="badge bg-primary">

                                            {

                                                job.jobType

                                                    ? job.jobType

                                                    : "Not Mentioned"

                                            }

                                        </span>

                                    </p>

                                    <small className="text-muted">

                                        Posted on

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
                                        to={`/admin/job/${job.id}/applicants`}
                                        className="btn btn-primary w-100 mb-2"
                                    >
                                        👥 View Applicants
                                    </Link>

                                    <Link
                                        to={`/admin/edit-job/${job.id}`}
                                        className="btn btn-warning w-100 mb-2"
                                    >
                                        ✏ Edit Job
                                    </Link>

                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() =>
                                            handleDelete(job.id)
                                        }
                                    >
                                        🗑 Delete Job
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default AdminDashboard;