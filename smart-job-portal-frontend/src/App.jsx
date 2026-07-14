import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";

import AdminDashboard from "./pages/AdminDashboard";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";

import NotFound from "./pages/NotFound";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* =======================
                    Public Routes
                ======================== */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/jobs"
                    element={<Jobs />}
                />

                <Route
                    path="/jobs/:id"
                    element={<JobDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* =======================
                    Protected User Route
                ======================== */}

                <Route
                    path="/my-applications"
                    element={
                        <ProtectedRoute>
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />

                {/* =======================
                    Protected Admin Routes
                ======================== */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/add-job"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AddJob />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/edit-job/:id"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <EditJob />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/job/:jobId/applicants"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <Applicants />
                        </ProtectedRoute>
                    }
                />

                {/* =======================
                    404 Route
                ======================== */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

            <Footer />

        </BrowserRouter>

    );

}

export default App;