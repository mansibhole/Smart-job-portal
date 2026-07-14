package com.jobportal.controller;

import com.jobportal.dto.ApiResponse;
import com.jobportal.dto.AuthReponse;
import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.RegisterRequest;
import com.jobportal.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthReponse> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthReponse response = authService.register(request);

        return ApiResponse.<AuthReponse>builder()
                .success(true)
                .message("User registered successfully")
                .data(response)
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<AuthReponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthReponse response = authService.login(request);

        return ApiResponse.<AuthReponse>builder()
                .success(true)
                .message("Login successful")
                .data(response)
                .build();
    }
}