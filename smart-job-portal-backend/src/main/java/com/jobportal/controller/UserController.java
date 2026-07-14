package com.jobportal.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping("/profile")
    public String userProfile(){
        return "Welcom user";
    }
    }
    

