package com.example.techrental.repository;

import com.example.techrental.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByEquipmentId(Long equipmentId);
}

