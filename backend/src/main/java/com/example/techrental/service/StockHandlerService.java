package com.example.techrental.service;

import com.example.techrental.model.PaymentItem;
import com.example.techrental.model.Equipment;
import com.example.techrental.repository.PaymentItemRepository;
import com.example.techrental.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StockHandlerService {
    @Autowired
    private PaymentItemRepository paymentItemRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    public int calculateEffectiveStockQuantity(String itemNumber, LocalDate startDate, LocalDate endDate) {
        List<PaymentItem> paymentItems = paymentItemRepository.findAllByItemNumber(itemNumber);

        Equipment equipment = equipmentRepository.findByItemNumber(itemNumber)
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        int stockQuantity = equipment.getStockQuantity();

        for (PaymentItem item : paymentItems) {
            if (startDate.isAfter(item.getEndDate()) || endDate.isBefore(item.getStartDate())) {
                stockQuantity += item.getItemQuantity();
            }
        }

        return stockQuantity;
    }

    public String getAvailabilityStatus(int stockQuantity) {
        return stockQuantity > 0 ? "Available" : "Not Available";
    }
}
