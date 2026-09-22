package com.techie.microservices.inventory.controller;

import com.techie.microservices.inventory.dto.InventoryRequest;
import com.techie.microservices.inventory.dto.InventoryResponse;
import com.techie.microservices.inventory.repository.InventoryRepository;
import com.techie.microservices.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;
    private final InventoryRepository inventoryRepository;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public boolean isInStock(@RequestParam String skuCode, @RequestParam Integer quantity) {
        return inventoryService.isInStock(skuCode, quantity);
    }

    @PostMapping("/updateQuantity")
public ResponseEntity<InventoryResponse> upsertInventory(@RequestBody InventoryRequest request) {
    boolean isNew = !inventoryRepository.findBySkuCode(request.skuCode()).isPresent();
    InventoryResponse response = inventoryService.upsertInventory(request);
    
    return isNew 
        ? ResponseEntity.status(HttpStatus.CREATED).body(response)
        : ResponseEntity.ok(response);
}

@GetMapping("/{skuCode}")
    public ResponseEntity<InventoryResponse> getInventoryBySkuCode(@PathVariable String skuCode) {
        return ResponseEntity.ok(inventoryService.getInventoryBySkuCode(skuCode));
    }

    @PostMapping("/decrease")
    public ResponseEntity<InventoryResponse> decreaseInventory(@RequestBody InventoryRequest request) {
        return ResponseEntity.ok(inventoryService.decreaseInventory(request));
    }
}
