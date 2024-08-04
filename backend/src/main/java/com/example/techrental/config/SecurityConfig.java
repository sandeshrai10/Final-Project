// package com.example.techrental.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(authorizeRequests ->
//                 authorizeRequests
//                     .requestMatchers(
//                         "/",
//                         "/adminLogin.html",
//                         "/api/admin/login",

//                         "/index.html",
//                         "/styles/**",
//                         "/scripts/**",
//                         "/images/**",
//                         "/api/users/register",
//                         "/api/users/login",

//                         // "/adminUsers.html",
//                         // "/api/users",
//                         // "/api/users/**",


//                         // "/adminReviews.html",
//                         // "/api/reviews",
//                         // "/api/reviews/**",


//                         "/login.html",
//                         "/register.html",
//                         "/laptops.html",
//                         "/cart.html",
//                         "/cameras.html",
//                         "/tablets.html",
//                         "/headphones.html",
//                         "/equipment.html",
//                         "/availability.html",
//                         "/availability_camera.html",
//                         "/availability_tablet.html",
//                         "/availability_headphone.html",

//                         "/tc.html",
//                         "/reviews.html",
//                         // "/adminRegister.html",
                        


//                         "/api/admin/register",
//                         "/api/payments",


//                         "/api/admin/**",
//                         "/payment.html"


//                     ).permitAll()
//                     .requestMatchers(
//                         "/adminUsers.html",
//                         "/api/admin/login",
//                         "/admin.html",
//                         "/api/admin/**",
//                         "/adminReviews.html",
//                         "/adminUsers.html",
//                         "/api/admin/equipment",
//                         "/api/admin/equipment/**"
//                     ).hasRole("ADMIN")
//                     .anyRequest().authenticated()
//             )
//             .formLogin(formLogin -> {
//                 formLogin
//                     .loginPage("/login.html")
//                     .defaultSuccessUrl("/index.html", true)
//                     .permitAll();
//             })

//             // .formLogin(formLogin -> {
//             //     formLogin
//             //         .loginPage("/adminLogin.html")
//             //         .defaultSuccessUrl("/admin.html", true)
//             //         .permitAll();
//             // })


//             .formLogin(formLogin ->
//                 formLogin
//                     .loginPage("/adminLogin.html")
//                     .defaultSuccessUrl("/admin.html", true)
//                     .permitAll()
//             )

//             .logout(logout -> 
//                 logout
//                     .logoutSuccessUrl("/")
//                     .permitAll()
//             );

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationSuccessHandler authenticationSuccessHandler() {
//         return (request, response, authentication) -> {
//             String role = authentication.getAuthorities().stream()
//                                         .map(grantedAuthority -> grantedAuthority.getAuthority())
//                                         .findFirst()
//                                         .orElse("ROLE_USER");

//             if ("ROLE_ADMIN".equals(role)) {
//                 response.sendRedirect("/admin.html");
//             } else {
//                 response.sendRedirect("/index.html");
//             }
//         };
//     }
// }






// package com.example.techrental.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import com.example.techrental.security.JwtAuthenticationFilter;

// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .authorizeHttpRequests(authorizeRequests ->
//                 authorizeRequests
//                     .requestMatchers(
//                         "/",
//                         "/index.html",
//                         "/styles/**",
//                         "/scripts/**",
//                         "/images/**",
//                         "/favicon.ico",
//                         "/api/users/register",
//                         "/api/users/login",
//                         "/api/admin/login",
//                         "/login.html",
//                         "/register.html",
//                         "/adminLogin.html"
//                     ).permitAll()
//                     .requestMatchers("/admin.html", "/api/admin/**").hasAuthority("ROLE_ADMIN")
//                     .anyRequest().authenticated()
//             )
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//             .formLogin(formLogin -> formLogin.disable())
//             .logout(logout -> logout.logoutSuccessUrl("/").permitAll());

//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:8082"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("*"));
//         configuration.setAllowCredentials(true);
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

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
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import com.example.techrental.security.JwtAuthenticationFilter;

// import java.util.Arrays;



// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     private final JwtAuthenticationFilter jwtAuthenticationFilter;

//     public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//     }

//        @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
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
//                         "/api/admin/login",
//                         "/login.html",
//                         "/register.html",
//                         "/adminLogin.html",
//                         "/api/admin/verify-token",
//                         "/favicon.ico"
//                     ).permitAll()
//                     // .requestMatchers("/api/admin/verify-token", "/admin.html", "/api/admin/**").hasRole("ADMIN")
//                     .requestMatchers("/api/admin/verify-token", "/admin.html", "/api/admin/**").hasAuthority("ROLE_ADMIN")
//                     .anyRequest().authenticated()
//             )
//             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//             // .formLogin(formLogin -> formLogin.disable())
//             // .logout(logout -> logout.logoutSuccessUrl("/").permitAll());

//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:8082"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("*"));
//         configuration.setAllowCredentials(true);
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

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
// import org.springframework.security.web.firewall.HttpFirewall;
// import org.springframework.security.web.firewall.StrictHttpFirewall;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import com.example.techrental.service.CustomUserDetailsService;

// import org.springframework.security.core.userdetails.UserDetailsService;

// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(csrf -> csrf.disable())
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
//                         "/api/admin/login",
//                         "/login.html",
//                         "/register.html",
//                         "/adminLogin.html",
//                         "/favicon.ico"
//                     ).permitAll()
//                     .requestMatchers("/admin/**", "/admin.html").hasRole("ADMIN")
//                     .anyRequest().authenticated()
//             )
//             .formLogin(form -> form
//                 .loginPage("/adminLogin.html")
//                 .loginProcessingUrl("/login")
//                 .defaultSuccessUrl("/admin.html", true)
//                 .permitAll()
//             )
//             .logout(logout -> logout.logoutSuccessUrl("/").permitAll());

//         return http.build();
//     }

//     @Bean
//     public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
//         StrictHttpFirewall firewall = new StrictHttpFirewall();
//         firewall.setAllowSemicolon(true);
//         return firewall;
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:8082"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("*"));
//         configuration.setAllowCredentials(true);
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public UserDetailsService userDetailsService() {
//         return new CustomUserDetailsService();
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
// import org.springframework.security.web.firewall.HttpFirewall;
// import org.springframework.security.web.firewall.StrictHttpFirewall;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import com.example.techrental.service.CustomUserDetailsService;

// import org.springframework.security.core.userdetails.UserDetailsService;

// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(csrf -> csrf.disable())
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
//                         "/api/admin/login",
//                         "/login.html",
//                         "/register.html",
//                         "/adminLogin.html",
//                         "/favicon.ico"
//                     ).permitAll()
//                     .requestMatchers("/admin/**", "/admin.html").hasRole("ADMIN")
//                     .anyRequest().authenticated()
//             )
//             .formLogin(form -> form
//                 .loginPage("/adminLogin.html")
//                 .loginProcessingUrl("/api/admin/login")
//                 .defaultSuccessUrl("/admin.html", true)
//                 .failureUrl("/adminLogin.html?error=true")
//                 .permitAll()
//             )
//             .logout(logout -> logout.logoutSuccessUrl("/").permitAll());

//         return http.build();
//     }

//     @Bean
//     public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
//         StrictHttpFirewall firewall = new StrictHttpFirewall();
//         firewall.setAllowSemicolon(true);
//         return firewall;
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:8082"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("*"));
//         configuration.setAllowCredentials(true);
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public UserDetailsService userDetailsService() {
//         return new CustomUserDetailsService();
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
// import org.springframework.security.web.firewall.HttpFirewall;
// import org.springframework.security.web.firewall.StrictHttpFirewall;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import com.example.techrental.service.CustomUserDetailsService;

// import org.springframework.security.core.userdetails.UserDetailsService;

// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(csrf -> csrf.disable())
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
//                         "/api/admin/login",
//                         "/login.html",
//                         "/register.html",
//                         "/adminLogin.html",
//                         "/favicon.ico"
//                     ).permitAll()
//                     .requestMatchers("/admin/**", "/admin.html").hasRole("ADMIN")
//                     .anyRequest().authenticated()
//             )
//             .formLogin(form -> form
//                 .loginPage("/adminLogin.html")
//                 .loginProcessingUrl("/api/admin/login")
//                 .defaultSuccessUrl("/admin.html", true)
//                 .failureUrl("/adminLogin.html?error=true")
//                 .permitAll()
//             )
//             .logout(logout -> logout.logoutSuccessUrl("/").permitAll());

//         return http.build();
//     }

//     @Bean
//     public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
//         StrictHttpFirewall firewall = new StrictHttpFirewall();
//         firewall.setAllowSemicolon(true);
//         return firewall;
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:8082"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("*"));
//         configuration.setAllowCredentials(true);
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public UserDetailsService userDetailsService() {
//         return new CustomUserDetailsService();
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
// import org.springframework.security.web.firewall.HttpFirewall;
// import org.springframework.security.web.firewall.StrictHttpFirewall;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import com.example.techrental.service.CustomUserDetailsService;

// import org.springframework.security.core.userdetails.UserDetailsService;

// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(csrf -> csrf.disable())
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
//                         "/adminLogin.html",
//                         "/favicon.ico"
//                     ).permitAll()
//                     .requestMatchers("/admin/**", "/admin.html", "/api/admin/**").hasRole("ADMIN")
//                     .anyRequest().authenticated()
//             )
//             .formLogin(form -> form
//                 .loginPage("/adminLogin.html")
//                 .loginProcessingUrl("/api/admin/login")
//                 .defaultSuccessUrl("/admin.html", true)
//                 .failureUrl("/adminLogin.html?error=true")
//                 .permitAll()
//             )
//             .logout(logout -> logout
//                 .logoutSuccessUrl("/")
//                 .permitAll()
//             );

//         return http.build();
//     }

//     @Bean
//     public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
//         StrictHttpFirewall firewall = new StrictHttpFirewall();
//         firewall.setAllowSemicolon(true);
//         return firewall;
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("http://localhost:8082"));
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(Arrays.asList("*"));
//         configuration.setAllowCredentials(true);
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public UserDetailsService userDetailsService() {
//         return new CustomUserDetailsService();
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
// import org.springframework.security.web.firewall.HttpFirewall;
// import org.springframework.security.web.firewall.StrictHttpFirewall;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import com.example.techrental.service.CustomUserDetailsService;

// import org.springframework.security.core.userdetails.UserDetailsService;

// import java.util.Arrays;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//             .csrf(csrf -> csrf.disable())
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
//                         "/adminLogin.html",
//                         "/favicon.ico"
//                     ).permitAll()
//                     .requestMatchers("/admin/**", "/admin.html", "/api/admin/**").hasRole("ADMIN")
//                     .anyRequest().authenticated()
//             )
//             .formLogin(form -> form
//                 .loginPage("/adminLogin.html")
//                 .loginProcessingUrl("/api/admin/login")
//                 .defaultSuccessUrl("/admin.html", true)
//                 .failureUrl("/adminLogin.html?error=true")
//                 .permitAll()
//             )
//             .logout(logout -> logout
//                 .logoutSuccessUrl("/")
//                 .permitAll()
//             )
//             .userDetailsService(customUserDetailsService);

//         return http.build();
//     }



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
                        
                        
                        "/api/payments",
                        "/api/payments/orders",
                        "/api/payments/**",


                         "/api/admin/**",
                        "/payment.html",

                        "/api/reviews",
                        "/api/reviews/**",


                        "/api/payments/payment-items",
                        "/api/payments/payment-items/${id}",
                        "/api/payments/payment-items/itemNumber/${itemNumber}",

                        "/api/admin/equipment",
                        "api/admin/equipment/**"




                    ).permitAll()
                    .requestMatchers(
                    "/admin/**", 
                    "/admin.html", 
                    "/api/admin/**", 

                    "/adminRegister.html",
                    "/api/admin/register",

                    "/adminUsers.html",
                    "/api/users",
                    "/api/users/**",

                    "/adminReviews.html",

                    "/ManageOrder.html",
                    "/api/admin/equipment",
                    "api/admin/equipment/**"



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
            .logout(logout -> logout
                .logoutSuccessUrl("/")
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







                