
package com.example.techrental.service;

import com.example.techrental.model.Equipment;
import com.example.techrental.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment addEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Equipment updateEquipment(Long id, Equipment equipment) {
        return equipmentRepository.findById(id)
                .map(existingEquipment -> {
                    existingEquipment.setName(equipment.getName());
                    existingEquipment.setDescription(equipment.getDescription());
                    existingEquipment.setCategory(equipment.getCategory());
                    existingEquipment.setStockQuantity(equipment.getStockQuantity());
                    existingEquipment.setDailyRentalRate(equipment.getDailyRentalRate());
                    existingEquipment.setAvailability(equipment.getAvailability());
                    return equipmentRepository.save(existingEquipment);
                })
                .orElse(null);
    }

    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }
}

