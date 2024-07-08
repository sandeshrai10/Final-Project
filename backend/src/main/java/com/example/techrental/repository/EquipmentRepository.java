package com.example.techrental.repository;

import com.example.techrental.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Equipment entities.
 * Extends JpaRepository to provide CRUD operations.
 */
@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
}
