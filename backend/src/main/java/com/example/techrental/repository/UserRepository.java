// package com.example.techrental.repository;

// import com.example.techrental.model.User;
// import org.springframework.data.jpa.repository.JpaRepository;

// public interface UserRepository extends JpaRepository<User, Long> {
//     User findByEmail(String email);
// }




package com.example.techrental.repository;

import com.example.techrental.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * UserRepository interface that extends JpaRepository to provide CRUD operations for User entities.
 * This interface also includes a custom method to find a user by their email address.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Custom method to find a user by their email address.
     *
     * @param email the email address of the user to be found.
     * @return the User entity with the specified email address, or null if no user found.
     */
    User findByEmail(String email);
}
