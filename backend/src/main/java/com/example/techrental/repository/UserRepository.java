

package com.example.techrental.repository;

import com.example.techrental.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    // New methods to check for existing email and phone number
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(long phoneNumber);

    // New method to search users by name or email
    List<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String firstName, String lastName, String email);

    List<User> findAllByOrderByIdAsc();
}