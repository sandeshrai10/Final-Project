package com.example.techrental.controller;

import com.example.techrental.model.User;
import com.example.techrental.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null || user.getFirstName() == null || user.getLastName() == null || user.getPhoneNumber() == null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Missing required fields"));
        }

        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "User already exists"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_ADMIN");
        userService.saveUser(user);
        return ResponseEntity.ok().body(new ApiResponse(true, "Admin registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody User user) {
        User foundUser = userService.findByEmail(user.getEmail());
        if (foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword()) && "ROLE_ADMIN".equals(foundUser.getRole())) {
            String token = "mock-token"; 
            return ResponseEntity.ok().body(new AuthResponse(token));
        }
        return ResponseEntity.status(401).body(new ApiResponse(false, "Invalid credentials"));
    }
}
