// package com.example.techRental;

// import static org.assertj.core.api.Assertions.assertThat;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// import java.util.Date;
// import java.util.List;

// import com.example.techrental.model.User;
// import com.example.techrental.repository.UserRepository;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.test.web.servlet.MockMvc;

// import com.fasterxml.jackson.databind.ObjectMapper;

// @SpringBootTest
// @AutoConfigureMockMvc
// public class TechRentalApplicationTests {

//     @Autowired
//     private MockMvc mockMvc;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     private User testUser;

//     @BeforeEach
//     public void setUp() {
//         // Clear the repository before each test
//         userRepository.deleteAll();

//         // Create a test user
//         testUser = new User();
//         testUser.setFirstName("Test");
//         testUser.setLastName("User");
//         testUser.setEmail("testuser@example.com");
//         testUser.setPhoneNumber("1234567890");
//         testUser.setPassword(passwordEncoder.encode("password123"));
//         testUser.setUserType("USER");
//         testUser.setRegistrationDate(new Date());
//     }

//     @Test
//     public void testUserRepository() {
//         // Save the user
//         userRepository.save(testUser);

//         // Retrieve the user by email
//         User foundUser = userRepository.findByEmail(testUser.getEmail());
//         assertThat(foundUser).isNotNull();
//         assertThat(foundUser.getEmail()).isEqualTo(testUser.getEmail());
//     }

//     @Test
//     public void testUserRegistration() throws Exception {
//         // Convert the user object to JSON
//         ObjectMapper objectMapper = new ObjectMapper();
//         String userJson = objectMapper.writeValueAsString(testUser);

//         // Perform the registration request
//         mockMvc.perform(post("/api/users/register")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(userJson))
//                 .andExpect(status().isOk());

//         // Verify that the user was saved in the repository
//         List<User> users = userRepository.findAll();
//         assertThat(users).hasSize(1);
//         assertThat(users.get(0).getEmail()).isEqualTo(testUser.getEmail());
//     }

//     @Test
//     public void testUserLogin() throws Exception {
//         // Save the user in the repository
//         userRepository.save(testUser);

//         // Create a login request
//         User loginUser = new User();
//         loginUser.setEmail(testUser.getEmail());
//         loginUser.setPassword("password123"); // Plain text password for login

//         // Convert the login request to JSON
//         ObjectMapper objectMapper = new ObjectMapper();
//         String loginJson = objectMapper.writeValueAsString(loginUser);

//         // Perform the login request
//         mockMvc.perform(post("/api/users/login")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(loginJson))
//                 .andExpect(status().isOk());
//     }

//     @Test
//     public void testInvalidUserLogin() throws Exception {
//         // Create an invalid login request
//         User loginUser = new User();
//         loginUser.setEmail("invaliduser@example.com");
//         loginUser.setPassword("wrongpassword");

//         // Convert the login request to JSON
//         ObjectMapper objectMapper = new ObjectMapper();
//         String loginJson = objectMapper.writeValueAsString(loginUser);

//         // Perform the login request
//         mockMvc.perform(post("/api/users/login")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(loginJson))
//                 .andExpect(status().isUnauthorized());
//     }
// }
