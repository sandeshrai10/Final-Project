package com.example.techrental.service;

import com.example.techrental.model.Equipment;
import com.example.techrental.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Override
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    @Override
    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id).orElse(null);
    }

    @Override
    public Equipment addEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    @Override
    public Equipment updateEquipment(Long id, Equipment equipment) {
        Equipment existingEquipment = equipmentRepository.findById(id).orElse(null);
        if (existingEquipment != null) {
            existingEquipment.setName(equipment.getName());
            existingEquipment.setDescription(equipment.getDescription());
            existingEquipment.setCategory(equipment.getCategory());
            existingEquipment.setAvailability(equipment.getAvailability());
            existingEquipment.setStockQuantity(equipment.getStockQuantity());
            existingEquipment.setDailyRentalRate(equipment.getDailyRentalRate());
            return equipmentRepository.save(existingEquipment);
        }
        return null;
    }

    @Override
    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }
}
