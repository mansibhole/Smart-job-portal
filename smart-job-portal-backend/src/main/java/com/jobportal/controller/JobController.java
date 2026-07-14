package com.jobportal.controller;

import com.jobportal.dto.ApiResponse;
import com.jobportal.dto.JobRequest;
import com.jobportal.dto.JobResponse;
import com.jobportal.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    public ApiResponse<JobResponse> createJob(
            @Valid @RequestBody JobRequest request) {

        return ApiResponse.<JobResponse>builder()
                .success(true)
                .message("Job created successfully")
                .data(jobService.createJob(request))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<JobResponse> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequest request) {

        return ApiResponse.<JobResponse>builder()
                .success(true)
                .message("Job updated successfully")
                .data(jobService.updateJob(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteJob(@PathVariable Long id) {

        jobService.deleteJob(id);

        return ApiResponse.<String>builder()
                .success(true)
                .message("Job deleted successfully")
                .data(null)
                .build();
    }

    @GetMapping
    public ApiResponse<Page<JobResponse>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ApiResponse.<Page<JobResponse>>builder()
                .success(true)
                .message("Jobs fetched successfully")
                .data(jobService.getAllJobs(page, size))
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<Page<JobResponse>> searchJobs(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ApiResponse.<Page<JobResponse>>builder()
                .success(true)
                .message("Search completed successfully")
                .data(jobService.searchJobs(keyword, page, size))
                .build();
    }
}