package com.jobportal.service;

import com.jobportal.dto.ApplicationResponse;
import com.jobportal.entity.ApplicationStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ApplicationService {

    ApplicationResponse applyJob(
            Long jobId,
            String userEmail,
            MultipartFile resume
    );

    List<ApplicationResponse> getUserApplications(
            String userEmail
    );

    List<ApplicationResponse> getApplicantsByJob(
            Long jobId
    );

    ApplicationResponse updateStatus(
            Long applicationId,
            ApplicationStatus status
    );

}