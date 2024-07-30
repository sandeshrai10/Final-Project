package com.example.techrental.controller;

import com.example.techrental.model.Review;
import com.example.techrental.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/item/{itemNumber}")
    public ResponseEntity<List<Review>> getReviewsByItemNumber(@PathVariable int itemNumber) {
        try {
            List<Review> reviews = reviewRepository.findByItemNumber(itemNumber);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace for debugging
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        try {
            System.out.println("Received review: " + review); // Log incoming review
            Review savedReview = reviewRepository.save(review);
            return ResponseEntity.ok(savedReview);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace for debugging
            return ResponseEntity.status(500).body(null);
        }
    }

    // New endpoint to provide rating summary
    @GetMapping("/item/{itemNumber}/summary")
    public ResponseEntity<Map<String, Object>> getItemRatingSummary(@PathVariable int itemNumber) {
        try {
            List<Review> reviews = reviewRepository.findByItemNumber(itemNumber);
            if (reviews.isEmpty()) {
                Map<String, Object> response = new HashMap<>();
                response.put("averageRating", 0);
                response.put("numberOfRatings", 0);
                return ResponseEntity.ok(response);
            }

            double averageRating = reviews.stream()
                                          .mapToInt(Review::getRating)
                                          .average()
                                          .orElse(0.0);
            int numberOfRatings = reviews.size();

            Map<String, Object> response = new HashMap<>();
            response.put("averageRating", averageRating);
            response.put("numberOfRatings", numberOfRatings);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}



