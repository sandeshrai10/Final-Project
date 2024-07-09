// package com.example.techrental.model;

// import jakarta.persistence.*;
// import java.math.BigDecimal;
// import java.util.Date;

// @Entity
// @Table(name = "equipment")
// public class Equipment {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String name;
//     private String description;
//     private String category;
//     private Boolean availability;
//     private Integer stockQuantity;
//     private BigDecimal dailyRentalRate;

//     @Temporal(TemporalType.TIMESTAMP)
//     private Date dateAdded;

//     @PrePersist
//     protected void onCreate() {
//         dateAdded = new Date();
//     }

//     // Getters and Setters
//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public String getDescription() {
//         return description;
//     }

//     public void setDescription(String description) {
//         this.description = description;
//     }

//     public String getCategory() {
//         return category;
//     }

//     public void setCategory(String category) {
//         this.category = category;
//     }

//     public Boolean getAvailability() {
//         return availability;
//     }

//     public void setAvailability(Boolean availability) {
//         this.availability = availability;
//     }

//     public Integer getStockQuantity() {
//         return stockQuantity;
//     }

//     public void setStockQuantity(Integer stockQuantity) {
//         this.stockQuantity = stockQuantity;
//     }

//     public BigDecimal getDailyRentalRate() {
//         return dailyRentalRate;
//     }

//     public void setDailyRentalRate(BigDecimal dailyRentalRate) {
//         this.dailyRentalRate = dailyRentalRate;
//     }

//     public Date getDateAdded() {
//         return dateAdded;
//     }

//     public void setDateAdded(Date dateAdded) {
//         this.dateAdded = dateAdded;
//     }
// }




package com.example.techrental.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "equipment")
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String category;
    private Boolean availability;
    private Integer stockQuantity;
    private BigDecimal dailyRentalRate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAdded;

    @PrePersist
    protected void onCreate() {
        dateAdded = new Date();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public BigDecimal getDailyRentalRate() {
        return dailyRentalRate;
    }

    public void setDailyRentalRate(BigDecimal dailyRentalRate) {
        this.dailyRentalRate = dailyRentalRate;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }
}



