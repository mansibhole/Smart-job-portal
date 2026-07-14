package com.jobportal.service.impl;
import com.jobportal.dto.*;
import com.jobportal.entity.Job;
import com.jobportal.repository.JobRepository;
import com.jobportal.service.JobService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import com.jobportal.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
        @Override
        public JobResponse createJob(JobRequest request) {
        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .companyName(request.getCompanyName())
                .location(request.getLocation())
                .salary(request.getSalary())
                .jobType(request.getJobType())
                .createdAt(LocalDateTime.now())
                .build();
        Job savedJob = jobRepository.save(job);
        return mapToResponse(savedJob);

}
@Override
public JobResponse updateJob(Long id, JobRequest request) {
    Job job = jobRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
    job.setTitle(request.getTitle());
    job.setDescription(request.getDescription());
    job.setCompanyName(request.getCompanyName());
    job.setLocation(request.getLocation());
    job.setSalary(request.getSalary());
    job.setJobType(request.getJobType());
    Job updatedJob = jobRepository.save(job);
    return mapToResponse(updatedJob);
}
@Override
public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        jobRepository.delete(job);
        }
@Override
public Page<JobResponse> getAllJobs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return jobRepository.findAll(pageable).map(this::mapToResponse);
        }
                
@Override
public Page<JobResponse> searchJobs(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        
        return jobRepository.findByTitleContainingIgnoreCase(keyword, pageable).map(this::mapToResponse);
        }
private JobResponse mapToResponse(Job job) {
        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setCompanyName(job.getCompanyName());
        response.setLocation(job.getLocation());
        response.setSalary(job.getSalary());
        response.setJobType(job.getJobType());
        response.setCreatedAt(job.getCreatedAt());
        return response;
        }
}