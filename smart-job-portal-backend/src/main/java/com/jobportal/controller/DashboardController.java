package com.jobportal.controller;

import com.jobportal.dto.ApiResponse;
import com.jobportal.dto.DashboardResponse;
import com.jobportal.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ApiResponse<DashboardResponse> getDashboardStats() {

        return ApiResponse.<DashboardResponse>builder()
                .success(true)
                .message("Dashboard statistics fetched successfully")
                .data(dashboardService.getDashboardStats())
                .build();
    }
}