import { Link } from "react-router-dom";

function Home() {

    return (

        <div>

            {/* Hero Section */}

            <section
                className="bg-primary text-white py-5"
                style={{ minHeight: "75vh" }}
            >

                <div className="container h-100">

                    <div className="row align-items-center h-100">

                        <div className="col-lg-6">

                            <h1 className="display-3 fw-bold mb-4">
                                Find Your
                                <br />
                                Dream Job Today
                            </h1>

                            <p className="lead mb-4">

                                Smart Job Portal helps job seekers connect with
                                top companies and enables recruiters to hire the
                                best talent quickly.

                            </p>

                            <Link
                                to="/jobs"
                                className="btn btn-light btn-lg me-3"
                            >
                                Browse Jobs
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-warning btn-lg"
                            >
                                Create Account
                            </Link>

                        </div>

                        <div className="col-lg-6 text-center">

                            <div
                                className="bg-white rounded shadow-lg p-5 text-dark"
                            >

                                <h2 className="text-primary fw-bold">
                                    💼 Smart Job Portal
                                </h2>

                                <hr />

                                <h4>✔ 500+ Active Jobs</h4>

                                <h4>✔ 100+ Companies</h4>

                                <h4>✔ Easy Resume Upload</h4>

                                <h4>✔ One Click Apply</h4>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="container py-5">

                <div className="text-center mb-5">

                    <h2 className="fw-bold">

                        Why Choose Smart Job Portal?

                    </h2>

                    <p className="text-muted">

                        Everything you need for a successful job search.

                    </p>

                </div>

                <div className="row">

                    <div className="col-md-4 mb-4">

                        <div className="card shadow border-0 h-100">

                            <div className="card-body text-center">

                                <div
                                    className="display-3 mb-3"
                                >
                                    💼
                                </div>

                                <h4>Latest Jobs</h4>

                                <p>

                                    Explore hundreds of jobs from trusted
                                    companies across multiple domains.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card shadow border-0 h-100">

                            <div className="card-body text-center">

                                <div
                                    className="display-3 mb-3"
                                >
                                    📄
                                </div>

                                <h4>Easy Apply</h4>

                                <p>

                                    Upload your resume once and apply for jobs
                                    with a single click.

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card shadow border-0 h-100">

                            <div className="card-body text-center">

                                <div
                                    className="display-3 mb-3"
                                >
                                    🚀
                                </div>

                                <h4>Career Growth</h4>

                                <p>

                                    Connect with recruiters and discover
                                    exciting career opportunities.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Statistics */}

            <section className="bg-light py-5">

                <div className="container">

                    <div className="row text-center">

                        <div className="col-md-3 mb-4">

                            <h1 className="text-primary fw-bold">

                                500+

                            </h1>

                            <p className="fw-semibold">

                                Jobs Posted

                            </p>

                        </div>

                        <div className="col-md-3 mb-4">

                            <h1 className="text-success fw-bold">

                                100+

                            </h1>

                            <p className="fw-semibold">

                                Companies

                            </p>

                        </div>

                        <div className="col-md-3 mb-4">

                            <h1 className="text-warning fw-bold">

                                1000+

                            </h1>

                            <p className="fw-semibold">

                                Applications

                            </p>

                        </div>

                        <div className="col-md-3 mb-4">

                            <h1 className="text-danger fw-bold">

                                95%

                            </h1>

                            <p className="fw-semibold">

                                Success Rate

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Call To Action */}

            <section className="container py-5 text-center">

                <h2 className="fw-bold mb-3">

                    Ready to Start Your Career?

                </h2>

                <p className="lead text-muted">

                    Join Smart Job Portal today and explore exciting opportunities.

                </p>

                <Link
                    to="/register"
                    className="btn btn-primary btn-lg mt-3"
                >
                    Join Now
                </Link>

            </section>

        </div>

    );

}

export default Home;