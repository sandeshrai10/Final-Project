package com.example.techrental.service;

import com.example.techrental.model.Equipment;

import java.util.List;

public interface InventoryService {
    List<Equipment> getAllEquipment();
    Equipment getEquipmentById(Long id);
    Equipment addEquipment(Equipment equipment);
    Equipment updateEquipment(Long id, Equipment equipment);
    void deleteEquipment(Long id);
    public Equipment getEquipmentByItemNumber(String itemNumber);

    void reduceStockQuantity(String itemNumber, int quantity);
    void increaseStockQuantity(String itemNumber, int quantity);


}
