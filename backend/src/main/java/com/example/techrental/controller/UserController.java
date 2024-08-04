package com.example.techrental.controller;

import com.example.techrental.model.User;
import com.example.techrental.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

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

   // New endpoint to fetch all users
   @GetMapping
   public ResponseEntity<List<User>> getAllUsers() {
    try {
        List<User> users = userService.findAllUsersSortedById();
        return ResponseEntity.ok(users);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(null);
    }
    }

    // New endpoint to search users by name or email
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam("query") String query) {
        try {
            List<User> users = userService.searchUsers(query);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }


    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("ROLE_USER");
            userService.saveUser(user);
            return ResponseEntity.ok().body(new ApiResponse(true, "User created successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ApiResponse(false, "Failed to create user"));
        }
    }


    // New endpoint to update user details
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            User existingUser = userService.findById(id);
            if (existingUser == null) {
                return ResponseEntity.status(404).body(new ApiResponse(false, "User not found"));
            }
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            userService.saveUser(existingUser);
            return ResponseEntity.ok().body(new ApiResponse(true, "User updated successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ApiResponse(false, "Failed to update user"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUserById(id);
            return ResponseEntity.ok().body(new ApiResponse(true, "User deleted successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ApiResponse(false, "Failed to delete user"));
        }
    }

   

}
