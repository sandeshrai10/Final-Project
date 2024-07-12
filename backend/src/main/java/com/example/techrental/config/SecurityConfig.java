// package com.example.techrental.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// /**
//  * Security configuration class for the TechRental application.
//  * This class configures security settings such as authentication,
//  * authorization, and password encoding.
//  */
// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     /**
//      * Configures the security filter chain.
//      * 
//      * @param http the HttpSecurity to modify
//      * @return the SecurityFilterChain
//      * @throws Exception if an error occurs
//      */
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             // Disable CSRF protection
//             .csrf(csrf -> csrf.disable())
//             // Configure authorization requests
//             .authorizeHttpRequests(authorizeRequests ->
//                 authorizeRequests
//                     .requestMatchers(
//                         "/", 
//                         "/index.html", 
//                         "/styles/**", 
//                         "/scripts/**", 
//                         "/images/**", 
//                         "/api/users/register", 
//                         "/api/users/login", 
//                         "/login.html", 
//                         "/register.html",
//                         "/equipment.html",
//                         "/api/laptops.html",
//                         "/laptops.html",  // Explicitly allow access to laptops.html
//                         "/cameras.html",  // Explicitly allow access to cameras.html
//                         "/tablets.html",
//                         "/headphones.html",
//                         "/availability.html",
//                         "/availability_camera.html",
//                         "/availability_tablet.html",
//                         "/availability_headphone.html",
//                         "/payment.html"
//                     ).permitAll()
//                     .anyRequest().authenticated()
//             )
//             // Configure form login
//             .formLogin(formLogin ->
//                 formLogin
//                     .loginPage("/login.html")
//                     .defaultSuccessUrl("/", true)
//                     .permitAll()
//             )
//             // Configure logout
//             .logout(logout ->
//                 logout
//                     .logoutSuccessUrl("/")
//                     .permitAll()
//             );

//         return http.build();
//     }

//     /**
//      * Provides a password encoder bean.
//      * 
//      * @return a BCryptPasswordEncoder
//      */
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }





// package com.example.techrental.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// /**
//  * Security configuration class for the TechRental application.
//  * This class configures security settings such as authentication,
//  * authorization, and password encoding.
//  */
// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     /**
//      * Configures the security filter chain.
//      * 
//      * @param http the HttpSecurity to modify
//      * @return the SecurityFilterChain
//      * @throws Exception if an error occurs
//      */
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             // Disable CSRF protection
//             .csrf(csrf -> csrf.disable())
//             // Configure authorization requests
//             .authorizeHttpRequests(authorizeRequests ->
//                 authorizeRequests
//                     .requestMatchers(
//                         "/", 
//                         "/index.html", 
//                         "/styles/**", 
//                         "/scripts/**", 
//                         "/images/**", 
//                         "/api/users/register", 
//                         "/api/users/login", 
//                         "/login.html", 
//                         "/register.html",
//                         "/equipment.html",
//                         "/api/laptops.html",
//                         "/laptops.html",  // Explicitly allow access to laptops.html
//                         "/cameras.html",  // Explicitly allow access to cameras.html
//                         "/tablets.html",
//                         "/headphones.html",
//                         "/availability.html",
//                         "/availability_camera.html",
//                         "/availability_tablet.html",
//                         "/availability_headphone.html",
//                         "/payment.html"
//                     ).permitAll()
//                     .requestMatchers("/admin/**").hasRole("ADMIN") // Restrict access to admin URLs
//                     .anyRequest().authenticated()
//             )
//             // Configure form login
//             .formLogin(formLogin ->
//                 formLogin
//                     .loginPage("/login.html")
//                     .defaultSuccessUrl("/", true)
//                     .permitAll()
//             )
//             // Configure logout
//             .logout(logout ->
//                 logout
//                     .logoutSuccessUrl("/")
//                     .permitAll()
//             );

//         return http.build();
//     }

//     /**
//      * Provides a password encoder bean.
//      * 
//      * @return a BCryptPasswordEncoder
//      */
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }
// }





package com.example.techrental.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

/**
 * Security configuration class for the TechRental application.
 * This class configures security settings such as authentication,
 * authorization, and password encoding.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configures the security filter chain.
     * 
     * @param http the HttpSecurity to modify
     * @return the SecurityFilterChain
     * @throws Exception if an error occurs
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF protection
            .csrf(csrf -> csrf.disable())
            // Configure authorization requests
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers(
                        "/", 
                        "/index.html", 
                        "/styles/**", 
                        "/scripts/**", 
                        "/images/**", 
                        "/api/users/register", 
                        "/api/users/login", 
                        "/login.html", 
                        "/register.html",
                        "/equipment.html",
                        "/api/laptops.html",
                        "/laptops.html",  // Explicitly allow access to laptops.html
                        "/cameras.html",  // Explicitly allow access to cameras.html
                        "/tablets.html",
                        "/headphones.html",
                        "/availability.html",
                        "/availability_camera.html",
                        "/availability_tablet.html",
                        "/availability_headphone.html",
                        "/payment.html",
                        "/admin.html"
                    ).permitAll()
                    .requestMatchers("/admin/**").hasRole("ADMIN") // Restrict access to admin URLs
                    .anyRequest().authenticated()
            )
            // Configure form login
            .formLogin(formLogin ->
                formLogin
                    .loginPage("/login.html")
                    .successHandler(authenticationSuccessHandler()) // Custom success handler
                    .permitAll()
            )
            // Configure logout
            .logout(logout ->
                logout
                    .logoutSuccessUrl("/")
                    .permitAll()
            );

        return http.build();
    }

    /**
     * Provides a password encoder bean.
     * 
     * @return a BCryptPasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Custom authentication success handler to redirect users based on roles.
     * 
     * @return the authentication success handler
     */
    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            String role = authentication.getAuthorities().stream()
                                        .map(grantedAuthority -> grantedAuthority.getAuthority())
                                        .filter(authority -> authority.equals("ROLE_ADMIN"))
                                        .findAny()
                                        .orElse("ROLE_USER");

            if ("ROLE_ADMIN".equals(role)) {
                response.sendRedirect("/admin.html");
            } else {
                response.sendRedirect("/index.html");
            }
        };
    }
}

