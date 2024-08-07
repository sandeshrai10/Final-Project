package com.example.techrental.controller;

import com.example.techrental.model.User;
import com.example.techrental.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;
import java.util.regex.Pattern;
import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;



    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid email format"));
        }

        // Check if phone number is numeric and has exactly 10 digits
        if (!String.valueOf(user.getPhoneNumber()).matches("\\d{10}")) {
        return ResponseEntity.badRequest().body(new ApiResponse(false, "Phone number must be exactly 10 digits"));
    }
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email already in use"));
        }
        if (userService.existsByPhoneNumber(user.getPhoneNumber())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Phone number already in use"));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        userService.saveUser(user);
        return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        StringBuilder errorMessage = new StringBuilder();
        ex.getBindingResult().getAllErrors().forEach(error -> errorMessage.append(error.getDefaultMessage()).append("\n"));
        return ResponseEntity.badRequest().body(errorMessage.toString());
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


    @PostMapping ("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (!EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid email format"));
        }

        // Check if phone number is numeric and has exactly 10 digits
        if (!String.valueOf(user.getPhoneNumber()).matches("\\d{10}")) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Phone number must be exactly 10 digits"));
        }

        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email already in use"));
        }

        if (userService.existsByPhoneNumber(user.getPhoneNumber())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Phone number already in use"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        userService.saveUser(user);

        return ResponseEntity.ok().body(new ApiResponse(true, "User created successfully"));
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