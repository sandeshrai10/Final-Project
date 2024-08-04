// // package com.example.techrental.security;

// // import io.jsonwebtoken.Claims;
// // import io.jsonwebtoken.Jwts;
// // import io.jsonwebtoken.security.Keys;
// // import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// // import org.springframework.security.core.authority.SimpleGrantedAuthority;
// // import org.springframework.security.core.context.SecurityContextHolder;
// // import org.springframework.stereotype.Component;
// // import org.springframework.web.filter.OncePerRequestFilter;
// // import jakarta.servlet.FilterChain;
// // import jakarta.servlet.ServletException;
// // import jakarta.servlet.http.HttpServletRequest;
// // import jakarta.servlet.http.HttpServletResponse;
// // import org.slf4j.Logger;
// // import org.slf4j.LoggerFactory;

// // import java.io.IOException;
// // import java.util.Collections;


// // @Component
// // public class JwtAuthenticationFilter extends OncePerRequestFilter {
// //     private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
// //     private static final byte[] SECRET_KEY = "123456cghuikhgfd9876sdfghnbvbhj0987".getBytes();

// //     @Override
// //     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
// //             throws ServletException, IOException {
// //         String token = extractToken(request);
// //         logger.info("Processing request for URL: {}", request.getRequestURI());
// //         logger.info("Extracted token: {}", token != null ? token.substring(0, 10) + "..." : "null");

// //         if (token != null) {
// //             try {
// //                 Claims claims = Jwts.parserBuilder()
// //                         .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY))
// //                         .build()
// //                         .parseClaimsJws(token)
// //                         .getBody();

// //                 String username = claims.getSubject();
// //                 String role = claims.get("role", String.class);
// //                 logger.info("Authenticated user: {}, role: {}", username, role);

// //                 UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
// //                         username, null, Collections.singletonList(new SimpleGrantedAuthority(role)));
// //                 SecurityContextHolder.getContext().setAuthentication(authentication);
// //                 logger.info("Token validated successfully");
// //             } catch (Exception e) {
// //                 logger.error("Token validation failed: {}", e.getMessage());
// //             }
// //         }

// //         filterChain.doFilter(request, response);

// //     }

// //     private String extractToken(HttpServletRequest request) {
// //         String bearerToken = request.getHeader("Authorization");
// //         if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
// //             return bearerToken.substring(7);
// //         }
// //         return null;
// //     }

// // }


// package com.example.techrental.security;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// import java.io.IOException;
// import java.util.Collections;

// @Component
// public class JwtAuthenticationFilter extends OncePerRequestFilter {
//     private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
//     private static final byte[] SECRET_KEY = "123456cghuikhgfd9876sdfghnbvbhj0987".getBytes();

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {
//         String token = extractToken(request);
//         String requestURI = request.getRequestURI();
//         logger.info("Processing request for URL: {}", requestURI);
//         logger.info("Extracted token: {}", token != null ? token.substring(0, Math.min(10, token.length())) + "..." : "null");

//         if (token != null) {
//             try {
//                 Claims claims = Jwts.parserBuilder()
//                         .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY))
//                         .build()
//                         .parseClaimsJws(token)
//                         .getBody();

//                 String username = claims.getSubject();
//                 String role = claims.get("role", String.class);
//                 logger.info("Authenticated user: {}, role: {}", username, role);

//                 UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                         username, null, Collections.singletonList(new SimpleGrantedAuthority(role)));
//                 SecurityContextHolder.getContext().setAuthentication(authentication);
//                 logger.info("Token validated successfully");
//             } catch (Exception e) {
//                 logger.error("Token validation failed: {}", e.getMessage());
//                 SecurityContextHolder.clearContext();
//             }
//         } else {
//             logger.warn("No token found for request to: {}", requestURI);
//             SecurityContextHolder.clearContext();
//         }

//         filterChain.doFilter(request, response);
//     }

//     private String extractToken(HttpServletRequest request) {
//         String bearerToken = request.getHeader("Authorization");
//         if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
//             return bearerToken.substring(7);
//         }
//         return null;
//     }
// }

