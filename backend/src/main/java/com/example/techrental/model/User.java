// package com.example.techrental.model;

// import jakarta.persistence.*;
// import java.util.Date;

// /**
//  * User entity class representing a user in the TechRental application.
//  * This class maps to the "users" table in the database.
//  */
// @Entity
// @Table(name = "users")
// public class User {

//     /**
//      * The unique identifier for the user.
//      * This field is automatically generated.
//      */
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String firstName;
//     private String lastName;
//     private String email;
//     private String phoneNumber;
//     private String password;
//     private String userType;

//     /**
//      * The registration date of the user.
//      * This field is automatically set when a new user is created.
//      */
//     @Temporal(TemporalType.TIMESTAMP)
//     private Date registrationDate;

//     /**
//      * This method is called before the entity is persisted.
//      * It sets the registration date and the default user type if not provided.
//      */
//     @PrePersist
//     protected void onCreate() {
//         registrationDate = new Date();
//         if (userType == null) {
//             userType = "USER"; // default user type
//         }
//     }

//     // Getters and Setters

//     /**
//      * Gets the unique identifier of the user.
//      *
//      * @return the unique identifier of the user
//      */
//     public Long getId() {
//         return id;
//     }

//     /**
//      * Sets the unique identifier of the user.
//      *
//      * @param id the unique identifier of the user
//      */
//     public void setId(Long id) {
//         this.id = id;
//     }

//     /**
//      * Gets the first name of the user.
//      *
//      * @return the first name of the user
//      */
//     public String getFirstName() {
//         return firstName;
//     }

//     /**
//      * Sets the first name of the user.
//      *
//      * @param firstName the first name of the user
//      */
//     public void setFirstName(String firstName) {
//         this.firstName = firstName;
//     }

//     /**
//      * Gets the last name of the user.
//      *
//      * @return the last name of the user
//      */
//     public String getLastName() {
//         return lastName;
//     }

//     /**
//      * Sets the last name of the user.
//      *
//      * @param lastName the last name of the user
//      */
//     public void setLastName(String lastName) {
//         this.lastName = lastName;
//     }

//     /**
//      * Gets the email of the user.
//      *
//      * @return the email of the user
//      */
//     public String getEmail() {
//         return email;
//     }

//     /**
//      * Sets the email of the user.
//      *
//      * @param email the email of the user
//      */
//     public void setEmail(String email) {
//         this.email = email;
//     }

//     /**
//      * Gets the phone number of the user.
//      *
//      * @return the phone number of the user
//      */
//     public String getPhoneNumber() {
//         return phoneNumber;
//     }

//     /**
//      * Sets the phone number of the user.
//      *
//      * @param phoneNumber the phone number of the user
//      */
//     public void setPhoneNumber(String phoneNumber) {
//         this.phoneNumber = phoneNumber;
//     }

//     /**
//      * Gets the password of the user.
//      *
//      * @return the password of the user
//      */
//     public String getPassword() {
//         return password;
//     }

//     /**
//      * Sets the password of the user.
//      *
//      * @param password the password of the user
//      */
//     public void setPassword(String password) {
//         this.password = password;
//     }

//     /**
//      * Gets the user type.
//      *
//      * @return the user type
//      */
//     public String getUserType() {
//         return userType;
//     }

//     /**
//      * Sets the user type.
//      *
//      * @param userType the user type
//      */
//     public void setUserType(String userType) {
//         this.userType = userType;
//     }

//     /**
//      * Gets the registration date of the user.
//      *
//      * @return the registration date of the user
//      */
//     public Date getRegistrationDate() {
//         return registrationDate;
//     }

//     /**
//      * Sets the registration date of the user.
//      *
//      * @param registrationDate the registration date of the user
//      */
//     public void setRegistrationDate(Date registrationDate) {
//         this.registrationDate = registrationDate;
//     }
// }








package com.example.techrental.model;

import jakarta.persistence.*;
import java.util.Date;

/**
 * User entity class representing a user in the TechRental application.
 * This class maps to the "users" table in the database.
 */
@Entity
@Table(name = "users")
public class User {

    /**
     * The unique identifier for the user.
     * This field is automatically generated.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    private String userType;

    private String role; // New field for role

    /**
     * The registration date of the user.
     * This field is automatically set when a new user is created.
     */
    @Temporal(TemporalType.TIMESTAMP)
    private Date registrationDate;

    @PrePersist
    protected void onCreate() {
        registrationDate = new Date();
        if (userType == null) {
            userType = "USER"; // default user type
        }
    }

    // Getters and Setters

    /**
     * Gets the unique identifier of the user.
     *
     * @return the unique identifier of the user
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the user.
     *
     * @param id the unique identifier of the user
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the first name of the user.
     *
     * @return the first name of the user
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name of the user.
     *
     * @param firstName the first name of the user
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets the last name of the user.
     *
     * @return the last name of the user
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name of the user.
     *
     * @param lastName the last name of the user
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Gets the email of the user.
     *
     * @return the email of the user
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email of the user.
     *
     * @param email the email of the user
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the phone number of the user.
     *
     * @return the phone number of the user
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * Sets the phone number of the user.
     *
     * @param phoneNumber the phone number of the user
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * Gets the password of the user.
     *
     * @return the password of the user
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the user.
     *
     * @param password the password of the user
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets the user type.
     *
     * @return the user type
     */
    public String getUserType() {
        return userType;
    }

    /**
     * Sets the user type.
     *
     * @param userType the user type
     */
    public void setUserType(String userType) {
        this.userType = userType;
    }

    /**
     * Gets the role.
     *
     * @return the role
     */
    public String getRole() {
        return role;
    }

    /**
     * Sets the role.
     *
     * @param role the role
     */
    public void setRole(String role) {
        this.role = role;
    }

    /**
     * Gets the registration date of the user.
     *
     * @return the registration date of the user
     */
    public Date getRegistrationDate() {
        return registrationDate;
    }

    /**
     * Sets the registration date of the user.
     *
     * @param registrationDate the registration date of the user
     */
    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }
}


