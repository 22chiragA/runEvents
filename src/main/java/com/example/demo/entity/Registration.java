package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "registration")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bib_number")
    private Integer bibNumber;

    @Column(name = "payment_status")
    private String paymentStatus;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "user_id")
    private Long userId;

    private String name;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "phn_number")
    private String phnNumber;

    @Column(name = "category_id")
    private Long categoryId;
}