package com.techie.microservices.product.external.dto;

public record InventoryResponse(
        Long id,
        String skuCode,
        Integer quantity
) {}
