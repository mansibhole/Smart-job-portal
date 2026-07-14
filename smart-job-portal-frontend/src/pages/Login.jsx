import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(formData);

            console.log("Full Response:", response);

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            // Save User Role
            localStorage.setItem("role", response.data.role);

            // Verify Local Storage
            console.log("Saved Token:", localStorage.getItem("token"));
            console.log("Saved Role:", localStorage.getItem("role"));

            toast.success("Login Successful!");

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            } else {

                navigate("/");

            }

        } catch (error) {

            console.log(error);

            if (error.response) {

                toast.error(error.response.data.message);

            } else {

                toast.error("Login Failed!");
            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <button
                                className="btn btn-success w-100"
                                type="submit"
                            >
                                Login
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Don't have an account?

                            <Link to="/register">
                                {" "}Register
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;