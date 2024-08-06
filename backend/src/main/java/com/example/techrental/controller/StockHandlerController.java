package com.example.techrental.controller;

import com.example.techrental.service.StockHandlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stock-handler")
public class StockHandlerController {
    @Autowired
    private StockHandlerService stockHandlerService;

    @GetMapping("/check-availability")
    public Map<String, Object> checkAvailability(
            @RequestParam String itemNumber,
            @RequestParam String startDate,
            @RequestParam String endDate) {

        LocalDate start = LocalDate.parse(startDate, DateTimeFormatter.ISO_DATE);
        LocalDate end = LocalDate.parse(endDate, DateTimeFormatter.ISO_DATE);

        int stockQuantity = stockHandlerService.calculateEffectiveStockQuantity(itemNumber, start, end);
        String status = stockHandlerService.getAvailabilityStatus(stockQuantity);

        Map<String, Object> response = new HashMap<>();
        response.put("stockQuantity", stockQuantity);
        response.put("status", status);

        return response;
    }
}

