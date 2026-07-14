import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApplicantsByJob } from "../services/adminService";

function ViewApplicants() {

    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplicants();
    }, []);

    const loadApplicants = async () => {

        try {

            const response = await getApplicantsByJob(jobId);

            setApplications(response);

        } catch (error) {

            console.log(error);

            toast.success("Unable to load applicants.");

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="mb-4">
                Applicants
            </h2>

            {
                applications.length === 0 ?

                (
                    <div className="toast.success toast.success-warning">
                        No applicants found.
                    </div>
                )

                :

                (
                    <table className="table table-bordered table-striped">

                        <thead className="table-dark">

                            <tr>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Status</th>

                                <th>Applied On</th>

                                <th>Resume</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                applications.map(app => (

                                    <tr key={app.applicationId}>

                                        <td>{app.applicantName}</td>

                                        <td>{app.applicantEmail}</td>

                                        <td>{app.status}</td>

                                        <td>
                                            {new Date(app.appliedAt).toLocaleString()}
                                        </td>

                                        <td>
                                            <a
                                                href={`http://localhost:8080/${app.resumeUrl}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View Resume
                                            </a>
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                )

            }

        </div>

    );

}

export default ViewApplicants;