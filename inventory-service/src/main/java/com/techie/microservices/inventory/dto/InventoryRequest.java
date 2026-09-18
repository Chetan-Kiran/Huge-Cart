package com.techie.microservices.inventory.dto;

public record InventoryRequest(
    String skuCode,
    Integer quantity
) {}