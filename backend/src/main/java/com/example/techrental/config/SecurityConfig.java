package com.example.techrental.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.techrental.service.CustomUserDetailsService;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
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
                        "/adminLogin.html",
                        "/success.html",
                        "/favicon.ico",

                        "/laptops.html",
                        "/cart.html",
                        "/cameras.html",
                        "/tablets.html",
                        "/headphones.html",
                        "/equipment.html",
                        "/availability.html",
                        "/availability_camera.html",
                        "/availability_tablet.html",
                        "/availability_headphone.html",
                        "/tc.html",
                        "/reviews.html",

                        "/payment.html",
                        "/api/payments",
                        "/api/payments/orders",
                        "/api/payments/**",
                        "/api/payments/payment-items",
                        "/api/payments/payment-items/itemNumber/**",
                        "/api/payments/payment-items/{id}",
                        "/api/payments/payment-items/itemNumber/${itemNumber}",

                        "api/contacts",
                        "api/contacts/**",

                        "/api/admin/equipment",
                        "api/admin/equipment/**",
                        "/api/admin/equipment/{id}",
                        "/api/admin/equipment/itemNumber/{itemNumber}",

                        "/api/admin/**",

                        "/api/reviews",
                        "/api/reviews/**",
                        "/api/reviews/item/{itemNumber}",
                        "/api/reviews/item/{itemNumber}/summary",

                        "/api/stock-handler",
                        "/api/stock-handler/check-availability"

                        // "/adminRegister.html",

                    ).permitAll()
                    .requestMatchers(
                    "/admin/**", 
                    "/admin.html", 
                    "/api/admin/**", 

                    "/adminReviews.html",
                    "/api/reviews/{id}",

                    "/reviews.html",
                    "/api/users",
                    "/api/users/search",
                    "/api/users/create",
                    "/api/users/{id}",

                    "/adminRegister.html",
                    "/api/admin/register",

                    "/adminUsers.html",
                    "/api/users",
                    "/api/users/**",

                    "/ManageOrder.html",

                    "/api/users/create", 
                    "/api/reviews",
                    "/api/reviews/**",

                    "/api/admin/logout"

                    ).hasRole("ADMIN")
                    .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/adminLogin.html")
                .loginProcessingUrl("/api/admin/login")
                .defaultSuccessUrl("/admin.html", true)
                .failureUrl("/adminLogin.html?error=true")
                .permitAll()
            )
            // .logout(logout -> logout
            //     .logoutSuccessUrl("/")
            //     .permitAll()
            // )

             .logout(logout -> logout
                .logoutUrl("/api/admin/logout")
                .logoutSuccessUrl("/adminLogin.html")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            )

            .userDetailsService(customUserDetailsService);

        return http.build();
    }

    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowSemicolon(true);
        return firewall;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8082"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}




                