package com.example.techrental.service;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import com.example.techrental.model.PaymentItemDTO;
import com.example.techrental.model.Payment;
import com.example.techrental.model.PaymentItem;
import com.example.techrental.repository.EquipmentRepository;
import com.example.techrental.repository.PaymentItemRepository;
import com.example.techrental.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentItemRepository paymentItemRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Override
    @Transactional
    public Payment processPayment(Payment payment, List<PaymentItem> paymentItems) {
        Payment savedPayment = paymentRepository.save(payment);
        paymentItems.forEach(item -> item.setPayment(savedPayment));
        paymentItemRepository.saveAll(paymentItems);

        // Update the equipment stock quantity
        for (PaymentItem item : paymentItems) {
            equipmentRepository.reduceStockQuantity(item.getItemNumber(), item.getItemQuantity());
        }

        return savedPayment;
    }

    @Override
    public List<Payment> getAllOrders() {
        return paymentRepository.findAll();
    }

    @Override
    public List<PaymentItemDTO> getAllPaymentItems() {
        List<PaymentItemDTO> paymentItemDTOList = new ArrayList<>();
        List<Payment> payments = paymentRepository.findAll();

        for (Payment payment : payments) {
            for (PaymentItem item : payment.getPaymentItems()) {
                PaymentItemDTO dto = new PaymentItemDTO();
                dto.setId(item.getId());
                dto.setOrderNumber(payment.getOrderNumber());
                dto.setTotalAmount(payment.getTotalAmount());
                dto.setTransactionDate(payment.getTransactionDate()); // Transaction date is now LocalDate
                dto.setItemNumber(item.getItemNumber());
                dto.setItemName(item.getItemName());
                dto.setItemQuantity(item.getItemQuantity());
                dto.setItemPrice(item.getItemPrice());
                dto.setStartDate(item.getStartDate()); // Ensure this is set
                dto.setEndDate(item.getEndDate()); // Ensure this is set
                paymentItemDTOList.add(dto);
            }
        }
        return paymentItemDTOList;
    }

    @Override
    @Transactional
    public void deletePaymentItem(Long id) {
        PaymentItem paymentItem = paymentItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "PaymentItem not found for this id :: " + id));

        // Update the equipment stock quantity
        equipmentRepository.findByItemNumber(paymentItem.getItemNumber()).ifPresent(equipment -> {
            equipment.setStockQuantity(equipment.getStockQuantity() + paymentItem.getItemQuantity());
            equipmentRepository.save(equipment);
        });

        paymentItemRepository.delete(paymentItem);
    }

    @Override
    @Transactional
    public void deletePaymentItemByItemNumber(String itemNumber) {
        PaymentItem paymentItem = paymentItemRepository.findByItemNumber(itemNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "PaymentItem not found for this item number :: " + itemNumber));

        // Update the equipment stock quantity
        equipmentRepository.findByItemNumber(itemNumber).ifPresent(equipment -> {
            equipment.setStockQuantity(equipment.getStockQuantity() + paymentItem.getItemQuantity());
            equipmentRepository.save(equipment);
        });

        paymentItemRepository.delete(paymentItem);
    }
}
