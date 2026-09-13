package com.techie.microservices.product.external.client;

import com.techie.microservices.product.external.dto.InventoryRequest;
import com.techie.microservices.product.external.dto.InventoryResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "inventory-client", url = "${inventory.service.url}")
public interface InventoryClient {

    @PostMapping("/updateQuantity")
    ResponseEntity<InventoryResponse> upsertInventory(@RequestBody InventoryRequest request);

    @GetMapping("/{skuCode}")
    public ResponseEntity<InventoryResponse> getInventoryBySkuCode(@PathVariable String skuCode);
}
