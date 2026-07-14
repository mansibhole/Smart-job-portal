package com.jobportal.service.impl;

import com.jobportal.dto.DashboardResponse;
import com.jobportal.repository.JobApplicationRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final JobApplicationRepository applicationRepository;

    @Override
    public DashboardResponse getDashboardStats() {

        return new DashboardResponse(
                jobRepository.count(),
                userRepository.count(),
                applicationRepository.count()
        );
    }
}