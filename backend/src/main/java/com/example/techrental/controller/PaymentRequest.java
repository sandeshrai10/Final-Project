package com.example.techrental.controller;

import com.example.techrental.model.Payment;
import com.example.techrental.model.PaymentItem;

import java.util.List;

public class PaymentRequest {
    private Payment payment;
    private List<PaymentItem> paymentItems;

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public List<PaymentItem> getPaymentItems() {
        return paymentItems;
    }

    public void setPaymentItems(List<PaymentItem> paymentItems) {
        this.paymentItems = paymentItems;
    }
}
