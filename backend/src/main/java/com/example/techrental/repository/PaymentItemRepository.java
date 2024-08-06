package com.example.techrental.repository;

import com.example.techrental.model.PaymentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface PaymentItemRepository extends JpaRepository<PaymentItem, Long> {
    Optional<PaymentItem> findByItemNumber(String itemNumber);

    List<PaymentItem> findAllByItemNumber(String itemNumber);  // Corrected method

    @Query("SELECT COALESCE(SUM(p.itemQuantity), 0) FROM PaymentItem p WHERE p.itemNumber = :itemNumber AND :date BETWEEN p.startDate AND p.endDate")
    int sumQuantityRentedOnDate(@Param("itemNumber") String itemNumber, @Param("date") LocalDate date);


    @Query("SELECT p FROM PaymentItem p WHERE p.itemNumber = :itemNumber AND (p.startDate <= :endDate AND p.endDate >= :startDate)")
    List<PaymentItem> findOverlappingItems(@Param("itemNumber") String itemNumber, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}

