package com.jobportal.service;
import com.jobportal.dto.AuthReponse;
import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.RegisterRequest;
public interface AuthService {
    AuthReponse register(RegisterRequest request);
    AuthReponse login(LoginRequest request);
}
