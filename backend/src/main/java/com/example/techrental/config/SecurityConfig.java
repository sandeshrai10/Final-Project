// package com.example.techrental.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(authorizeRequests ->
//                 authorizeRequests
//                     .requestMatchers("/", "/index.html", "/styles/**", "/scripts/**", "/images/**", "/api/users/register", "/api/users/login").permitAll()
//                     .anyRequest().authenticated()
//             )
//             .formLogin(formLogin ->
//                 formLogin
//                     .loginPage("/login")
//                     .defaultSuccessUrl("/")
//                     .permitAll()
//             )
//             .logout(logout ->
//                 logout
//                     .permitAll()
//             );

//         return http.build();
//     }

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
                    .requestMatchers("/", "/index.html", "/styles/**", "/scripts/**", "/images/**", "/api/users/register", "/api/users/login").permitAll()
                    .anyRequest().authenticated()
            )
            // Configure form login
            .formLogin(formLogin ->
                formLogin
                    .loginPage("/login")
                    .defaultSuccessUrl("/")
                    .permitAll()
            )
            // Configure logout
            .logout(logout ->
                logout
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
}
