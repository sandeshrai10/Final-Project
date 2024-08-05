// package com.example.techrental.repository;

// import com.example.techrental.model.PaymentItem;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
// import java.util.Optional;
// @Repository
// public interface PaymentItemRepository extends JpaRepository<PaymentItem, Long> {
//     Optional<PaymentItem> findByItemNumber(String itemNumber);

// }



package com.example.techrental.repository;

import com.example.techrental.model.PaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface PaymentItemRepository extends JpaRepository<PaymentItem, Long> {
    Optional<PaymentItem> findByItemNumber(String itemNumber);

    @Query("SELECT COALESCE(SUM(p.itemQuantity), 0) FROM PaymentItem p WHERE p.itemNumber = :itemNumber AND :date BETWEEN p.startDate AND p.endDate")
    int sumQuantityRentedOnDate(@Param("itemNumber") String itemNumber, @Param("date") LocalDate date);
}
