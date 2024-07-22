package com.example.techrental.service;

import com.example.techrental.model.Payment;
import com.example.techrental.model.PaymentItem;
import com.example.techrental.repository.PaymentItemRepository;
import com.example.techrental.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentItemRepository paymentItemRepository;

    @Override
    public Payment processPayment(Payment payment, List<PaymentItem> paymentItems) {
        Payment savedPayment = paymentRepository.save(payment);
        paymentItems.forEach(item -> item.setPayment(savedPayment));
        paymentItemRepository.saveAll(paymentItems);
        return savedPayment;
    }
}
