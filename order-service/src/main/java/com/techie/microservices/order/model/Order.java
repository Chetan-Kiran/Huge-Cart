package com.techie.microservices.order.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderNumber;

    private String skuCode;

    private Integer quantity;

    private BigDecimal price;

    // Customer Details
    private String firstName;

    private String email;

    // Order Time
    private LocalDateTime createdAt;
}