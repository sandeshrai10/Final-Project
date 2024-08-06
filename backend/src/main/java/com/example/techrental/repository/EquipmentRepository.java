
package com.example.techrental.repository;

import com.example.techrental.model.Equipment;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    Optional<Equipment> findByItemNumber(String itemNumber);

    @Modifying
    @Transactional
    @Query("UPDATE Equipment e SET e.stockQuantity = e.stockQuantity - ?2 WHERE e.itemNumber = ?1")
    void reduceStockQuantity(String itemNumber, int quantity);
}
