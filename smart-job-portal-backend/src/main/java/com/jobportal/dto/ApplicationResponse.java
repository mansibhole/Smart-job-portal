package com.jobportal.dto;
import com.jobportal.entity.ApplicationStatus;
import lombok.*;
import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponse {
    private Long applicationId;
    private String jobTitle;
    private String companyName;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private String applicantName;
    private String applicantEmail;
    private String resumeUrl;
}
