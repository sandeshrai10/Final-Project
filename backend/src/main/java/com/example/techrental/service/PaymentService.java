package com.example.techrental.service;

import com.example.techrental.model.Payment;
import com.example.techrental.model.PaymentItem;
import java.util.List;

public interface PaymentService {
    Payment processPayment(Payment payment, List<PaymentItem> paymentItems);
}
