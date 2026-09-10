package com.techie.microservices.product.dto;

import java.math.BigDecimal;

public record ProductResponse(
        String id,
        String skuCode,      // ✅ Added
        String name,
        String description,
        BigDecimal price,
        Integer quantity,
        String imageUrl
) {}