package com.techie.microservices.product.external.dto;

public record InventoryRequest(
        String skuCode,
        Integer quantity
) {}
