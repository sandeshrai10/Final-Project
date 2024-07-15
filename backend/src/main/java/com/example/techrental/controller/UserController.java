package com.example.techrental.controller;

import com.example.techrental.model.User;
import com.example.techrental.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        userService.saveUser(user);
        return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
    }

   @PostMapping("/login")
   public ResponseEntity<?> loginUser(@RequestBody User user) {
       User foundUser = userService.findByEmail(user.getEmail());
       if (foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
           // Generate token (mock implementation, replace with actual token generation)
           String token = "mock-token"; 
           return ResponseEntity.ok().body(new AuthResponse(token, foundUser.getEmail(), foundUser.getFirstName()));
       }
       return ResponseEntity.status(401).body(new ApiResponse(false, "Invalid credentials"));
   }
   

}
