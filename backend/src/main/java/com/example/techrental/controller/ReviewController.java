package com.example.techrental.controller;

import com.example.techrental.model.Review;
import com.example.techrental.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // Endpoint to fetch all reviews
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        try {
            List<Review> reviews = reviewRepository.findAll();
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Endpoint to fetch reviews by item number
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



    // Endpoint to create a new review
    @PostMapping
    public ResponseEntity<?> createReview(@Valid @RequestBody Review review) {
        try {
            System.out.println("Received review: " + review); // Log incoming review
            Review savedReview = reviewRepository.save(review);
            return ResponseEntity.ok(savedReview);
        } catch (ConstraintViolationException e) {
            Map<String, String> errors = new HashMap<>();
            e.getConstraintViolations().forEach(violation -> 
                errors.put(violation.getPropertyPath().toString(), violation.getMessage()));
            return ResponseEntity.badRequest().body(errors);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace for debugging
            return ResponseEntity.status(500).body("An unexpected error occurred");
        }
    }
        
    

    // Endpoint to provide rating summary for an item
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

    // Endpoint to delete a review by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteReview(@PathVariable Long id) {
        try {
            reviewRepository.deleteById(id);
            Map<String, Boolean> response = new HashMap<>();
            response.put("deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

}
