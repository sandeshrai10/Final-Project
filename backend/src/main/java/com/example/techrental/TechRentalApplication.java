package com.example.techrental;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main class for the TechRental Spring Boot application.
 * This class is responsible for bootstrapping and launching the Spring application.
 */
@SpringBootApplication
@EntityScan(basePackages = {"com.example.techrental.model"})
@EnableJpaRepositories(basePackages = {"com.example.techrental.repository"})
public class TechRentalApplication {

    /**
     * Main method that serves as the entry point of the Spring Boot application.
     *
     * @param args command line arguments (not used)
     */
    public static void main(String[] args) {
        SpringApplication.run(TechRentalApplication.class, args);
    }
}
