import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";
import { toast } from "react-toastify";
function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            const response = await getMyApplications();

            setApplications(response);

        } catch (error) {

            console.log(error);

            toast.success("Unable to load applications.");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                My Applications
            </h2>

            {
                applications.length === 0 ?

                    (
                        <div className="toast.success toast.success-info">
                            No applications found.
                        </div>
                    )

                    :

                    (
                        <div className="row">

                            {
                                applications.map(app => (

                                    <div
                                        key={app.applicationId}
                                        className="col-md-6 mb-4"
                                    >

                                        <div className="card shadow h-100">

                                            <div className="card-body">

                                                <h4>{app.jobTitle}</h4>

                                                <h5 className="text-primary">
                                                    {app.companyName}
                                                </h5>

                                                <hr />

                                                <p>
                                                    <strong>Applicant :</strong>{" "}
                                                    {app.applicantName}
                                                </p>

                                                <p>
                                                    <strong>Email :</strong>{" "}
                                                    {app.applicantEmail}
                                                </p>

                                                <p>
                                                    <strong>Status :</strong>{" "}
                                                    {app.status}
                                                </p>

                                                <p>
                                                    <strong>Applied On :</strong>{" "}
                                                    {new Date(app.appliedAt).toLocaleString()}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>
                    )

            }

        </div>

    );

}

export default MyApplications;