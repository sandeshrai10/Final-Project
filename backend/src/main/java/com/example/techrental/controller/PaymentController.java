

package com.example.techrental.controller;

import com.example.techrental.model.PaymentItemDTO;
import com.example.techrental.model.Payment;
import com.example.techrental.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<?> processPayment(@RequestBody PaymentRequest paymentRequest) {
        Payment processedPayment = paymentService.processPayment(paymentRequest.getPayment(), paymentRequest.getPaymentItems());
        return ResponseEntity.ok(processedPayment);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Payment>> getAllOrders() {
        List<Payment> orders = paymentService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/payment-items")
    public ResponseEntity<List<PaymentItemDTO>> getAllPaymentItems() {
        List<PaymentItemDTO> paymentItems = paymentService.getAllPaymentItems();
        return ResponseEntity.ok(paymentItems);
    }

    @DeleteMapping("/payment-items/itemNumber/{itemNumber}")
    public ResponseEntity<?> deletePaymentItemByItemNumber(@PathVariable String itemNumber) {
        paymentService.deletePaymentItemByItemNumber(itemNumber);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/payment-items/{id}")
    public ResponseEntity<?> deletePaymentItem(@PathVariable Long id) {
        paymentService.deletePaymentItem(id);
        return ResponseEntity.ok().body("Item deleted successfully");
    }
}


