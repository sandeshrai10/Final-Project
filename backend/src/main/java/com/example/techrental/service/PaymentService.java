
package com.example.techrental.service;

import com.example.techrental.model.Payment;
import com.example.techrental.model.PaymentItem;
import com.example.techrental.model.PaymentItemDTO;

import java.util.List;

public interface PaymentService {
    Payment processPayment(Payment payment, List<PaymentItem> paymentItems);
    List<Payment> getAllOrders();  // New method
    List<PaymentItemDTO> getAllPaymentItems();
    void deletePaymentItem(Long id);
    void deletePaymentItemByItemNumber(String itemNumber);  // Add this method
}
