package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponse {
    private String orderId;
    private String amount;
    private String currency;
    private String keyId;
}
