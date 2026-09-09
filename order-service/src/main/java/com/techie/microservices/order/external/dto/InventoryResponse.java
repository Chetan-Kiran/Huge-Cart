package com.techie.microservices.order.external.dto;

public record InventoryResponse(
    Long id,
    String skuCode,
    Integer quantity
) {}