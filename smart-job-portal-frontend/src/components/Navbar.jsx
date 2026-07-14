import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = async () => {

    const result = await Swal.fire({

        title: "Logout?",
        text: "Do you really want to logout?",
        icon: "question",

        showCancelButton: true,

        confirmButtonText: "Logout",
        cancelButtonText: "Stay"

    });

    if (!result.isConfirmed) {

        return;

    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged Out Successfully!");

    navigate("/login");

};
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    💼 Smart Job Portal
                </Link>

                <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
>
    <span className="navbar-toggler-icon"></span>
</button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        {/* Home */}

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        {/* Jobs */}

                        <li className="nav-item">
                            <Link className="nav-link" to="/jobs">
                                Jobs
                            </Link>
                        </li>

                        {/* User Menu */}

                        {
                            token && role === "USER" && (

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/my-applications"
                                    >
                                        My Applications
                                    </Link>

                                </li>

                            )
                        }

                        {/* Admin Menu */}

                        {
                            token && role === "ADMIN" && (

                                <li className="nav-item">

                                    <Link
                                        className="nav-link"
                                        to="/admin"
                                    >
                                        Admin Dashboard
                                    </Link>

                                </li>

                            )
                        }

                        {/* Guest */}

                        {
                            !token ? (

                                <>

                                    <li className="nav-item">

                                        <Link
                                            className="nav-link"
                                            to="/login"
                                        >
                                            Login
                                        </Link>

                                    </li>

                                    <li className="nav-item">

                                        <Link
                                            className="nav-link"
                                            to="/register"
                                        >
                                            Register
                                        </Link>

                                    </li>

                                </>

                            ) : (

                                <li className="nav-item ms-3">

                                    <button
                                        className="btn btn-outline-light"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>

                                </li>

                            )
                        }

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;