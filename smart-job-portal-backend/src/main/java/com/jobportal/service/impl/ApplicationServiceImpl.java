package com.jobportal.service.impl;

import com.jobportal.dto.ApplicationResponse;
import com.jobportal.entity.ApplicationStatus;
import com.jobportal.entity.Job;
import com.jobportal.entity.JobApplication;
import com.jobportal.entity.User;
import com.jobportal.exception.ResourceNotFoundException;
import com.jobportal.repository.JobApplicationRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    // Upload folder
    private static final String UPLOAD_DIR =
            System.getProperty("user.home")
                    + File.separator
                    + "SmartJobPortal"
                    + File.separator
                    + "uploads"
                    + File.separator
                    + "resumes";

    @Override
    public ApplicationResponse applyJob(
            Long jobId,
            String userEmail,
            MultipartFile resume
    ) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        // Create upload directory if it doesn't exist
        File uploadFolder = new File(UPLOAD_DIR);

        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs();
        }

        String fileName =
                System.currentTimeMillis()
                        + "_"
                        + resume.getOriginalFilename();

        File destinationFile = new File(uploadFolder, fileName);

        try {

            resume.transferTo(destinationFile);

        } catch (IOException e) {

            throw new RuntimeException("Resume upload failed", e);

        }

        JobApplication application =
                JobApplication.builder()
                        .user(user)
                        .job(job)
                        .resumeUrl(destinationFile.getAbsolutePath())
                        .status(ApplicationStatus.APPLIED)
                        .appliedAt(LocalDateTime.now())
                        .build();

        JobApplication savedApplication =
                applicationRepository.save(application);

        return mapToResponse(savedApplication);

    }

    @Override
    public List<ApplicationResponse> getUserApplications(
            String userEmail
    ) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return applicationRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public List<ApplicationResponse> getApplicantsByJob(
            Long jobId
    ) {

        return applicationRepository.findByJobId(jobId)
                .stream()
                .map(this::mapToResponse)
                .toList();

    }

    @Override
    public ApplicationResponse updateStatus(
            Long applicationId,
            ApplicationStatus status
    ) {

        JobApplication application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Application not found"
                                ));

        application.setStatus(status);

        JobApplication updatedApplication =
                applicationRepository.save(application);

        return mapToResponse(updatedApplication);

    }

    private ApplicationResponse mapToResponse(
            JobApplication application
    ) {

        return ApplicationResponse.builder()
                .applicationId(application.getId())
                .applicantName(application.getUser().getFullname())
                .applicantEmail(application.getUser().getEmail())
                .jobTitle(application.getJob().getTitle())
                .companyName(application.getJob().getCompanyName())
                .resumeUrl(application.getResumeUrl())
                .status(application.getStatus())
                .appliedAt(application.getAppliedAt())
                .build();

    }

}