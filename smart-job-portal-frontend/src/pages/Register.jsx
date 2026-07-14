import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "USER"
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

            const response = await registerUser(formData);

            console.log(response);

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            toast.success("Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            if (error.response) {
                toast.success(error.response.data.message);
            } else {
                toast.success("Registration Failed!");
            }

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Register
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

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
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Register
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Already have an account?

                            <Link to="/login">
                                {" "}Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;