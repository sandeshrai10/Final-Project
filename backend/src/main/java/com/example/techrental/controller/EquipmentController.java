package com.example.techrental.controller;

import com.example.techrental.model.Equipment;
import com.example.techrental.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/equipment")
public class EquipmentController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<Equipment> getAllEquipment() {
        return inventoryService.getAllEquipment();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
        Equipment equipment = inventoryService.getEquipmentById(id);
        if (equipment != null) {
            return ResponseEntity.ok(equipment);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
        Equipment newEquipment = inventoryService.addEquipment(equipment);
        return ResponseEntity.ok(newEquipment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment equipment) {
        Equipment updatedEquipment = inventoryService.updateEquipment(id, equipment);
        if (updatedEquipment != null) {
            return ResponseEntity.ok(updatedEquipment);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        inventoryService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/itemNumber/{itemNumber}")
    public ResponseEntity<Equipment> getEquipmentByItemNumber(@PathVariable String itemNumber) {
        System.out.println("Received request for item number: " + itemNumber);
        Equipment equipment = inventoryService.getEquipmentByItemNumber(itemNumber);
        if (equipment != null) {
            return ResponseEntity.ok(equipment);
        }
        return ResponseEntity.notFound().build();
    }
}

