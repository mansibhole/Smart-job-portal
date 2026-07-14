package com.jobportal.repository;
import com.jobportal.entity.Job;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    long count();
}
