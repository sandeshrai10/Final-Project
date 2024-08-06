package com.example.techrental.service;

import com.example.techrental.model.User;
import java.util.List;

public interface UserService {
    void saveUser(User user);
    User findByEmail(String email);
    User findById(Long id);
    List<User> findAllUsersSortedById();
    List<User> searchUsers(String query);
    void deleteUserById(Long id);

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(long phoneNumber);

}

