package com.jobportal.dto;
import lombok.*;
import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobResponse {
    private Long id;
    private String title;
    private String companyName;
    private String location;
    private String description;
    private Double salary;
    private String jobType;
    private LocalDateTime createdAt;
}
