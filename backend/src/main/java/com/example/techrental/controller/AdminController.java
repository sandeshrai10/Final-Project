
package com.example.techrental.controller;

import com.example.techrental.model.User;
import com.example.techrental.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

// //////
// import jakarta.servlet.http.HttpSession;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null || user.getFirstName() == null || user.getLastName() == null) {
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
public ResponseEntity<?> loginAdmin(@RequestParam String username, @RequestParam String password, HttpSession session) {
    try {
        User foundUser = userService.findByEmail(username);
        if (foundUser != null && passwordEncoder.matches(password, foundUser.getPassword())) {
            if ("ROLE_ADMIN".equals(foundUser.getRole())) {
                // Authentication successful
                    session.setAttribute("adminUser", foundUser);  // Add this line to store the session
                return ResponseEntity.ok().body(new ApiResponse(true, "Login successful"));
            } else {
                return ResponseEntity.status(403).body(new ApiResponse(false, "User does not have admin role"));
            }
        }
        return ResponseEntity.status(401).body(new ApiResponse(false, "Invalid credentials"));
    } catch (Exception e) {
        return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred during login"));
    }
}



//////////
@PostMapping("/logout")
public ResponseEntity<?> logoutAdmin(HttpSession session) {
    session.invalidate();  // Invalidate the session on logout
    return ResponseEntity.ok().body(new ApiResponse(true, "Logout successful"));
}


}