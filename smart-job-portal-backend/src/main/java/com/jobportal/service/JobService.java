package com.jobportal.service;
import com.jobportal.dto.JobRequest;
import com.jobportal.dto.JobResponse;
import org.springframework.data.domain.Page;
public interface JobService {
    JobResponse createJob(JobRequest request);
    JobResponse updateJob(Long id, JobRequest request);
    void deleteJob(Long id);
    Page<JobResponse> getAllJobs(int page, int size);
    Page<JobResponse> searchJobs(String keyword, int page, int size);
}
