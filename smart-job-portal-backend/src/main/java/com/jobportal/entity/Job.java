package com.jobportal.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String companyName;
    private String location;
    @Column(length = 2000)
    private String description;
    private Double salary;
    private String jobType;
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "job")
    private List<JobApplication> applications;
}
