package com.example.demo.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class EventRequest {

    private String name;

    private String location;

    private LocalDate date;

    private int distance;

    private double price;

    private int maxParticipants;
}