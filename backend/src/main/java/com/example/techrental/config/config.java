// // package com.example.techrental.config;

// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.security.web.SecurityFilterChain;
// // import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

// // @Configuration
// // @EnableWebSecurity
// // public class SecurityConfig {

// //     @Bean
// //     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// //         http
// //             .csrf(csrf -> csrf.disable())
// //             .authorizeHttpRequests(authorizeRequests ->
// //                 authorizeRequests
// //                     .requestMatchers(
// //                         "/",
// //                         "/index.html",
// //                         "/styles/**",
// //                         "/scripts/**",
// //                         "/images/**",
// //                         "/api/users/register",
// //                         "/api/users/login",

// //                         "/adminUsers.html",
// //                         "/api/users",
// //                         "/api/users/**",


// //                         "/adminReviews.html",
// //                         "/api/reviews",
// //                         "/api/reviews/**",


// //                         "/login.html",
// //                         "/register.html",
// //                         "/laptops.html",
// //                         "/cart.html",
// //                         "/cameras.html",
// //                         "/tablets.html",
// //                         "/headphones.html",
// //                         "/equipment.html",
// //                         "/availability.html",
// //                         "/availability_camera.html",
// //                         "/availability_tablet.html",
// //                         "/availability_headphone.html",
// //                         "/admin.html",
// //                         "/tc.html",
// //                         "/reviews.html",
// //                         "/adminRegister.html",
// //                         "/adminLogin.html",


// //                         "/api/admin/register",
// //                         "/api/payments",
// //                         "/api/admin/login",
// //                         "/api/admin/**",
// //                         "/payment.html"
                
// //                     ).permitAll()
// //                     .requestMatchers(
// //                         "/admin.html",
// //                         "/adminReviews.html",
// //                         "/adminUsers.html",
// //                         "/api/admin/**",
// //                         "/api/admin/equipment",
// //                         "/api/admin/equipment/**"
// //                     ).hasRole("ADMIN")
// //                     .anyRequest().authenticated()
// //             )
// //             .formLogin(formLogin ->
// //                 formLogin
// //                     .loginPage("/login.html")
// //                     .successHandler(authenticationSuccessHandler())
// //                     .permitAll()
// //             )
// //             .logout(logout ->
// //                 logout
// //                     .logoutSuccessUrl("/")
// //                     .permitAll()
// //             );

// //         return http.build();
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }

// //     @Bean
// //     public AuthenticationSuccessHandler authenticationSuccessHandler() {
// //         return (request, response, authentication) -> {
// //             String role = authentication.getAuthorities().stream()
// //                                         .map(grantedAuthority -> grantedAuthority.getAuthority())
// //                                         .filter(authority -> authority.equals("ROLE_ADMIN"))
// //                                         .findAny()
// //                                         .orElse("ROLE_USER");

// //             if ("ROLE_ADMIN".equals(role)) {
// //                 response.sendRedirect("/admin.html");
// //             } else {
// //                 response.sendRedirect("/index.html");
// //             }
// //         };
// //     }
// // }






// // package com.example.techrental.config;

// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;
// // import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// // import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// // import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// // import org.springframework.security.crypto.password.PasswordEncoder;
// // import org.springframework.security.web.SecurityFilterChain;
// // import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

// // @Configuration
// // @EnableWebSecurity
// // public class SecurityConfig {

// //     @Bean
// //     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// //         http
// //             .csrf(csrf -> csrf.disable())
// //             .authorizeHttpRequests(authorizeRequests ->
// //                 authorizeRequests
// //                     .requestMatchers(
// //                         "/",
// //                         "/index.html",
// //                         "/styles/**",
// //                         "/scripts/**",
// //                         "/images/**",
// //                         "/api/users/register",
// //                         "/api/users/login",


// //                         "/login.html",
// //                         "/register.html",

// //                         "/adminRegister.html",
// //                         "/adminLogin.html",

// //                         "/api/admin/register",
// //                         "/api/admin/login"
                       
                        
                        
                
// //                     ).permitAll()
// //                     .requestMatchers(
// //                         "/admin.html",
// //                         "/adminLogin.html",
// //                         "/api/admin/login",
// //                         "/api/admin/**"

                        
// //                     ).hasRole("ADMIN")
// //                     .anyRequest().authenticated()
// //             )
// //             .formLogin(formLogin ->
// //                 formLogin
// //                     .loginPage("/login.html")
// //                     .successHandler(authenticationSuccessHandler())
// //                     .permitAll()
// //             )
// //             .logout(logout ->
// //                 logout
// //                     .logoutSuccessUrl("/")
// //                     .permitAll()
// //             );

// //         return http.build();
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }

// //     @Bean
// //     public AuthenticationSuccessHandler authenticationSuccessHandler() {
// //         return (request, response, authentication) -> {
// //             String role = authentication.getAuthorities().stream()
// //                                         .map(grantedAuthority -> grantedAuthority.getAuthority())
// //                                         .filter(authority -> authority.equals("ROLE_ADMIN"))
// //                                         .findAny()
// //                                         .orElse("ROLE_USER");

// //             if ("ROLE_ADMIN".equals(role)) {
// //                 response.sendRedirect("/admin.html");
// //             } else {
// //                 response.sendRedirect("/index.html");
// //             }
// //         };
// //     }
// // }

