import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingSpinner from "../components/LoadingSpinner";

import {
    getAllJobs,
    deleteJob
} from "../services/jobService";

import { getDashboardStats } from "../services/dashboardService";

function AdminDashboard() {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

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

            setLoading(true);

            const jobsResponse = await getAllJobs();

            setJobs(jobsResponse.data.content);

            const statsResponse = await getDashboardStats();

            setStats(statsResponse.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load dashboard.");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this job?")) {

            return;

        }

        try {

            await deleteJob(id);

            toast.success("Job deleted successfully.");

            loadDashboard();

        } catch (error) {

            console.log(error);

            toast.error("Unable to delete job.");

        }

    };

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="container mt-5 mb-5">

            <div className="bg-dark text-white rounded-4 shadow p-4 mb-5">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="fw-bold">

                            👨‍💼 Admin Dashboard

                        </h2>

                        <p className="mb-0">

                            Manage Jobs, Applicants & Portal Statistics

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

            <div className="row mb-5">

                <div className="col-md-4 mb-3">

                    <div className="card shadow border-0 text-center">

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

                    <div className="card shadow border-0 text-center">

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

                    <div className="card shadow border-0 text-center">

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

            <h3 className="fw-bold mb-4">

                Active Job Listings

            </h3>

            <div className="row">

                {

                    jobs.map(job => (

                        <div
                            key={job.id}
                            className="col-lg-4 col-md-6 mb-4"
                        >

                            <div className="card shadow-lg border-0 h-100">

                                <div className="card-body">

                                    <h4>{job.title}</h4>

                                    <h5 className="text-primary">

                                        🏢 {job.companyName}

                                    </h5>

                                    <hr />

                                    <p>

                                        📍 {job.location}

                                    </p>

                                    <p>

                                        <span className="badge bg-success">

                                            {

                                                job.salary

                                                    ? `₹${Number(job.salary).toLocaleString()}`

                                                    : "Salary Not Mentioned"

                                            }

                                        </span>

                                    </p>

                                    <p>

                                        <span className="badge bg-primary">

                                            {

                                                job.jobType

                                                    ? job.jobType

                                                    : "Not Mentioned"

                                            }

                                        </span>

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