package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {

    private Long userId;

    private String name;

    private String emailId;

    private String phnNumber;

    private Integer bibNumber;

    private String paymentStatus;

    private Long categoryId;
}