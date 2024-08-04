// // package com.example.techrental.controller;

// // import com.example.techrental.model.User;
// // import com.example.techrental.service.UserServiceImpl;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.http.ResponseEntity;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.web.bind.annotation.*;

// // @RestController
// // @RequestMapping("/api/admin")
// // public class AdminController {

// //     @Autowired
// //     private UserServiceImpl userService;

// //     @Autowired
// //     private PasswordEncoder passwordEncoder;

// //     @PostMapping("/register")
// //     public ResponseEntity<?> registerAdmin(@RequestBody User user) {
// //         if (user.getEmail() == null || user.getPassword() == null || user.getFirstName() == null || user.getLastName() == null || user.getPhoneNumber() == null) {
// //             return ResponseEntity.badRequest().body(new ApiResponse(false, "Missing required fields"));
// //         }

// //         if (userService.findByEmail(user.getEmail()) != null) {
// //             return ResponseEntity.badRequest().body(new ApiResponse(false, "User already exists"));
// //         }

// //         user.setPassword(passwordEncoder.encode(user.getPassword()));
// //         user.setRole("ROLE_ADMIN");
// //         userService.saveUser(user);
// //         return ResponseEntity.ok().body(new ApiResponse(true, "Admin registered successfully"));
// //     }

// //     // @PostMapping("/login")
// //     // public ResponseEntity<?> loginAdmin(@RequestBody User user) {
// //     //     User foundUser = userService.findByEmail(user.getEmail());
// //     //     if (foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword()) && "ROLE_ADMIN".equals(foundUser.getRole())) {
// //     //         String token = "mock-token"; 
// //     //         return ResponseEntity.ok().body(new AuthResponse(token));
// //     //     }
// //     //     return ResponseEntity.status(401).body(new ApiResponse(false, "Invalid credentials"));
// //     // }

// //         @PostMapping("/login")
// //     public ResponseEntity<?> loginAdmin(@RequestBody User user) {
// //         System.out.println("Login attempt for email: " + user.getEmail()); // Log email attempting to log in
// //         User foundUser = userService.findByEmail(user.getEmail());
// //         if (foundUser != null) {
// //             System.out.println("Found user: " + foundUser.getEmail()); // Log found user email
// //             if (passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
// //                 System.out.println("Password matches for user: " + foundUser.getEmail()); // Log password match
// //                 if ("ROLE_ADMIN".equals(foundUser.getRole())) {
// //                     System.out.println("User has admin role: " + foundUser.getEmail()); // Log admin role
// //                     String token = "mock-token"; 
// //                     return ResponseEntity.ok().body(new AuthResponse(token, foundUser.getEmail(), foundUser.getFirstName()));
// //                 } else if ("ROLE_SUPER_ADMIN".equals(foundUser.getRole())) {
// //                     System.out.println("User has super admin role: " + foundUser.getEmail()); // Log super admin role
// //                     String token = "mock-token"; 
// //                     return ResponseEntity.ok().body(new AuthResponse(token, foundUser.getEmail(), foundUser.getFirstName()));
// //                 } else {
// //                     System.out.println("User does not have admin role: " + foundUser.getEmail()); // Log non-admin role
// //                     return ResponseEntity.status(403).body(new ApiResponse(false, "User does not have admin role"));
// //                 }
// //             } else {
// //                 System.out.println("Password does not match for user: " + foundUser.getEmail()); // Log password mismatch
// //                 return ResponseEntity.status(401).body(new ApiResponse(false, "Invalid credentials"));
// //             }
// //         } else {
// //             System.out.println("User not found with email: " + user.getEmail()); // Log user not found
// //             return ResponseEntity.status(404).body(new ApiResponse(false, "User not found"));
// //         }
// //     }


// // }





// package com.example.techrental.controller;

// import com.example.techrental.model.User;
// import com.example.techrental.service.UserServiceImpl;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// import java.util.Date;

// @RestController
// @RequestMapping("/api/admin")
// public class AdminController {

//     private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
//     private static final byte[] SECRET_KEY = "123456cghuikhgfd9876sdfghnbvbhj0987".getBytes();

//     @Autowired
//     private UserServiceImpl userService;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @PostMapping("/register")
//     public ResponseEntity<?> registerAdmin(@RequestBody User user) {
//         if (user.getEmail() == null || user.getPassword() == null || user.getFirstName() == null || user.getLastName() == null || user.getPhoneNumber() == null) {
//             return ResponseEntity.badRequest().body(new ApiResponse(false, "Missing required fields"));
//         }

//         if (userService.findByEmail(user.getEmail()) != null) {
//             return ResponseEntity.badRequest().body(new ApiResponse(false, "User already exists"));
//         }

//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         user.setRole("ROLE_ADMIN");
//         userService.saveUser(user);
//         return ResponseEntity.ok().body(new ApiResponse(true, "Admin registered successfully"));
//     }


//     @PostMapping("/login")
//     public ResponseEntity<?> loginAdmin(@RequestBody User user) {
//         try {
//             logger.info("Login attempt for user: {}", user.getEmail());
//             User foundUser = userService.findByEmail(user.getEmail());
//             if (foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
//                 if ("ROLE_ADMIN".equals(foundUser.getRole())) {
//                     String token = generateToken(foundUser);
//                     logger.info("Login successful for admin: {}", foundUser.getEmail());
//                     return ResponseEntity.ok().body(new AuthResponse(token, foundUser.getEmail(), foundUser.getFirstName()));
//                 } else {
//                     logger.warn("User does not have admin role: {}", foundUser.getEmail());
//                     return ResponseEntity.status(403).body(new ApiResponse(false, "User does not have admin role"));
//                 }
//             }
//             logger.warn("Invalid credentials for user: {}", user.getEmail());
//             return ResponseEntity.status(401).body(new ApiResponse(false, "Invalid credentials"));
//         } catch (Exception e) {
//             logger.error("Error during login: ", e);
//             return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred during login"));
//         }
//     }

//     private String generateToken(User user) {
//         return Jwts.builder()
//                 .setSubject(user.getEmail())
//                 .claim("role", user.getRole())
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
//                 .signWith(Keys.hmacShaKeyFor(SECRET_KEY), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     @GetMapping("/verify-token")
//     public ResponseEntity<?> verifyToken() {
//         logger.info("Token verification request received");
//         return ResponseEntity.ok().body(new ApiResponse(true, "Token is valid"));
//     }
// }





// package com.example.techrental.controller;

// import com.example.techrental.model.User;
// import com.example.techrental.service.UserServiceImpl;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// @RestController
// @RequestMapping("/api/admin")
// public class AdminController {

//     private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

//     @Autowired
//     private UserServiceImpl userService;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     @PostMapping("/register")
//     public ResponseEntity<?> registerAdmin(@RequestBody User user) {
//         if (user.getEmail() == null || user.getPassword() == null || user.getFirstName() == null || user.getLastName() == null || user.getPhoneNumber() == null) {
//             return ResponseEntity.badRequest().body(new ApiResponse(false, "Missing required fields"));
//         }

//         if (userService.findByEmail(user.getEmail()) != null) {
//             return ResponseEntity.badRequest().body(new ApiResponse(false, "User already exists"));
//         }

//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         user.setRole("ROLE_ADMIN");
//         userService.saveUser(user);
//         return ResponseEntity.ok().body(new ApiResponse(true, "Admin registered successfully"));
//     }

//     @PostMapping("/login")
//     public ResponseEntity<?> loginAdmin(@RequestBody User user) {
//         try {
//             logger.info("Login attempt for user: {}", user.getEmail());
//             User foundUser = userService.findByEmail(user.getEmail());
//             if (foundUser != null && passwordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
//                 if ("ROLE_ADMIN".equals(foundUser.getRole())) {
//                     logger.info("Login successful for admin: {}", foundUser.getEmail());
//                     return ResponseEntity.ok().body(new ApiResponse(true, "Login successful"));
//                 } else {
//                     logger.warn("User does not have admin role: {}", foundUser.getEmail());
//                     return ResponseEntity.status(403).body(new ApiResponse(false, "User does not have admin role"));
//                 }
//             }
//             logger.warn("Invalid credentials for user: {}", user.getEmail());
//             return ResponseEntity.status(401).body(new ApiResponse(false, "Invalid credentials"));
//         } catch (Exception e) {
//             logger.error("Error during login: ", e);
//             return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred during login"));
//         }
//     }
// }






package com.example.techrental.controller;

import com.example.techrental.model.User;
import com.example.techrental.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserServiceImpl userService;

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
public ResponseEntity<?> loginAdmin(@RequestParam String username, @RequestParam String password) {
    try {
        User foundUser = userService.findByEmail(username);
        if (foundUser != null && passwordEncoder.matches(password, foundUser.getPassword())) {
            if ("ROLE_ADMIN".equals(foundUser.getRole())) {
                // Authentication successful
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
}