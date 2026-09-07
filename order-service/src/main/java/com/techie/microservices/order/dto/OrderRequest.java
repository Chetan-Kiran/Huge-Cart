package com.techie.microservices.order.dto;

import java.math.BigDecimal;

public record OrderRequest(Long id,
                           String orderNumber,
                           String skuCode,
                           String productId,
                           Integer quantity,
                           BigDecimal price,
                           UserDetails userDetails) {
    // No additional methods or fields are needed here
    public record UserDetails(String email, String firstName, String lastName) {}
}
