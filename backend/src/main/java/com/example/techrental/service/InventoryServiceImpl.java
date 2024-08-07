package com.example.techrental.service;

import com.example.techrental.model.Equipment;
import com.example.techrental.repository.EquipmentRepository;
import com.example.techrental.repository.PaymentItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.util.List;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private PaymentItemRepository paymentItemRepository;

    @Override
    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    @Override
    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id).orElse(null);
    }

    @Override
    public Equipment getEquipmentByItemNumber(String itemNumber) {
        Equipment equipment = equipmentRepository.findByItemNumber(itemNumber).orElse(null);
        if (equipment != null) {
            equipment.setStockQuantity(calculateAvailableStock(itemNumber, LocalDate.now()));
        }
        return equipment;
    }

    @Override
    public Equipment addEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    @Override
    public Equipment updateEquipment(Long id, Equipment equipment) {
        Equipment existingEquipment = equipmentRepository.findById(id).orElse(null);
        if (existingEquipment != null) {
            existingEquipment.setItemNumber(equipment.getItemNumber());
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

    @Transactional
    @Override
    public void reduceStockQuantity(String itemNumber, int quantity) {
        Equipment equipment = equipmentRepository.findByItemNumber(itemNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipment not found for this item number :: " + itemNumber));
        if (equipment.getStockQuantity() < quantity) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient stock for item number :: " + itemNumber);
        }
        equipment.setStockQuantity(equipment.getStockQuantity() - quantity);
        equipmentRepository.save(equipment);
    }

    @Transactional
    @Override
    public void increaseStockQuantity(String itemNumber, int quantity) {
        Equipment equipment = equipmentRepository.findByItemNumber(itemNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipment not found for this item number :: " + itemNumber));
        equipment.setStockQuantity(equipment.getStockQuantity() + quantity);
        equipmentRepository.save(equipment);
    }

    private int calculateAvailableStock(String itemNumber, LocalDate date) {
        int totalStock = equipmentRepository.findByItemNumber(itemNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipment not found for this item number :: " + itemNumber))
                .getStockQuantity();
        int rentedQuantity = paymentItemRepository.sumQuantityRentedOnDate(itemNumber, date);
        return totalStock - rentedQuantity;
    }
}









