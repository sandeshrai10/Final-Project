package com.example.techrental.controller;

import com.example.techrental.model.Review;
import com.example.techrental.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/equipment/{equipmentId}")
    public List<Review> getReviewsByEquipmentId(@PathVariable Long equipmentId) {
        return reviewRepository.findByEquipmentId(equipmentId);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }
}
