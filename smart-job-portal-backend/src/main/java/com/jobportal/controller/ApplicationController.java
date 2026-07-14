package com.jobportal.controller;

import com.jobportal.dto.ApplicationResponse;
import com.jobportal.entity.ApplicationStatus;
import com.jobportal.entity.JobApplication;
import com.jobportal.repository.JobApplicationRepository;
import com.jobportal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;
    private final JobApplicationRepository applicationRepository;

    // ==============================
    // USER : Apply for Job
    // ==============================
    @PostMapping("/{jobId}")
    public ApplicationResponse applyJob(

            @PathVariable Long jobId,

            @RequestParam("resume") MultipartFile resume,

            Authentication authentication

    ) {

        return applicationService.applyJob(
                jobId,
                authentication.getName(),
                resume
        );

    }

    // ==============================
    // USER : View My Applications
    // ==============================
    @GetMapping("/my")
    public List<ApplicationResponse> myApplications(
            Authentication authentication
    ) {

        return applicationService.getUserApplications(
                authentication.getName()
        );

    }

    // ==============================
    // ADMIN : View Applicants
    // ==============================
    @GetMapping("/job/{jobId}")
    public List<ApplicationResponse> applicantsByJob(
            @PathVariable Long jobId
    ) {

        return applicationService.getApplicantsByJob(jobId);

    }

    // ==============================
    // ADMIN : Accept / Reject Application
    // ==============================
    @PutMapping("/{applicationId}/status")
    public ApplicationResponse updateStatus(

            @PathVariable Long applicationId,

            @RequestParam ApplicationStatus status

    ) {

        return applicationService.updateStatus(
                applicationId,
                status
        );

    }

    // ==============================
    // ADMIN : Download Resume
    // ==============================
    @GetMapping("/{applicationId}/resume")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable Long applicationId
    ) throws MalformedURLException {

        JobApplication application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException("Application not found"));

        File file = new File(application.getResumeUrl());

        Resource resource = new UrlResource(file.toURI());

        if (!resource.exists()) {
            throw new RuntimeException("Resume not found");
        }

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getName() + "\""
                )
                .body(resource);

    }

}