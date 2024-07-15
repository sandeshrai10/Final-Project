package com.example.techrental.controller;

public class AuthResponse {
    private String token;
    private String email;
    private String firstName;

    public AuthResponse(String token, String email, String firstName) {
        this.token = token;
        this.email = email;
        this.firstName = firstName;
    }

    public AuthResponse(String token) {
        this.token = token;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
