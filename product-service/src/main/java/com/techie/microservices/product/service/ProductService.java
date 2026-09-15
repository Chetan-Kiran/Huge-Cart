package com.techie.microservices.product.service;

import com.techie.microservices.product.dto.ProductRequest;
import com.techie.microservices.product.dto.ProductResponse;
import com.techie.microservices.product.external.client.InventoryClient;
import com.techie.microservices.product.external.dto.InventoryRequest;
import com.techie.microservices.product.external.dto.InventoryResponse;
import com.techie.microservices.product.model.Product;
import com.techie.microservices.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryClient inventoryClient;

    // ---------------- CREATE PRODUCT ----------------

    public ProductResponse createProduct(ProductRequest productRequest) {

        Product product = Product.builder()
                .skuCode(productRequest.skuCode())
                .name(productRequest.name())
                .description(productRequest.description())
                .price(productRequest.price())
                .imageUrl(productRequest.imageUrl())
                .build();

        productRepository.save(product);
        log.info("Product created successfully: {}", product);

        ResponseEntity<InventoryResponse> response =
                inventoryClient.upsertInventory(
                        new InventoryRequest(
                                productRequest.skuCode(),
                                productRequest.quantity()
                        )
                );

        InventoryResponse inventory = response.getBody();
        int quantity = inventory != null ? inventory.quantity() : 0;

        return new ProductResponse(
                product.getId(),
                product.getSkuCode(),          // ✅ Added
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                quantity,
                product.getImageUrl()
        );
    }

    // ---------------- GET ALL PRODUCTS ----------------

    public List<ProductResponse> getAllProducts() {

        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(product -> {

                    ResponseEntity<InventoryResponse> response =
                            inventoryClient.getInventoryBySkuCode(product.getSkuCode());

                    InventoryResponse inventory = response.getBody();
                    int quantity = inventory != null ? inventory.quantity() : 0;

                    return new ProductResponse(
                            product.getId(),
                            product.getSkuCode(),      // ✅ Added
                            product.getName(),
                            product.getDescription(),
                            product.getPrice(),
                            quantity,
                            product.getImageUrl()
                    );
                })
                .toList();
    }
}