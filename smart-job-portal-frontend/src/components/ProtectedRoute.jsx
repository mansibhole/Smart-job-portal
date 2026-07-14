import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Not logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Admin-only page
    if (adminOnly && role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;