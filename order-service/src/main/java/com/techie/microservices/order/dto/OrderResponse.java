package com.techie.microservices.order.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderResponse(

        Long id,
        String orderNumber,
        String skuCode,
        Integer quantity,
        BigDecimal price,

        String firstName,
        String email,

        LocalDateTime createdAt

) {}