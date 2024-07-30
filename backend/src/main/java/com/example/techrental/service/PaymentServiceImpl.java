// package com.example.techrental.service;

// import com.example.techrental.model.Payment;
// import com.example.techrental.model.PaymentItem;
// import com.example.techrental.repository.PaymentItemRepository;
// import com.example.techrental.repository.PaymentRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class PaymentServiceImpl implements PaymentService {

//     @Autowired
//     private PaymentRepository paymentRepository;

//     @Autowired
//     private PaymentItemRepository paymentItemRepository;

//     @Override
//     public Payment processPayment(Payment payment, List<PaymentItem> paymentItems) {
//         Payment savedPayment = paymentRepository.save(payment);
//         paymentItems.forEach(item -> item.setPayment(savedPayment));
//         paymentItemRepository.saveAll(paymentItems);
//         return savedPayment;
//     }
// }


package com.example.techrental.service;

import com.example.techrental.model.Payment;
import com.example.techrental.model.PaymentItem;
import com.example.techrental.repository.EquipmentRepository;
import com.example.techrental.repository.PaymentItemRepository;
import com.example.techrental.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
