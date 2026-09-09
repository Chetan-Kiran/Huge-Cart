package com.techie.microservices.order.external.dto;

public record InventoryRequest(
        String skuCode,
        Integer quantity
) {}
