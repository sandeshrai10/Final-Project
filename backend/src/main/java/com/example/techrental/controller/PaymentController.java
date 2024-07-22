package com.example.techrental.controller;

import com.example.techrental.model.Payment;
import com.example.techrental.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
}
