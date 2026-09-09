package com.techie.microservices.order.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.techie.microservices.order.client.InventoryClient;
import com.techie.microservices.order.dto.OrderRequest;
import com.techie.microservices.order.dto.OrderResponse;
import com.techie.microservices.order.event.OrderPlacedEvent;
import com.techie.microservices.order.external.dto.InventoryRequest;
import com.techie.microservices.order.external.dto.InventoryResponse;
import com.techie.microservices.order.model.Order;
import com.techie.microservices.order.repository.OrderRepository;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private static final Logger log =
            LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;
    private final KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    // ---------------- PLACE ORDER ----------------

    public boolean placeOrder(OrderRequest orderRequest) {

        try {

            // 1. Check Inventory
            boolean inStock = inventoryClient.isInStock(
                    orderRequest.skuCode(),
                    orderRequest.quantity());

            if (!inStock) {
                log.warn("Product {} is out of stock.", orderRequest.skuCode());
                return false;
            }

            // 2. Read customer details safely
            OrderRequest.UserDetails user = orderRequest.userDetails();

            // 3. Create Order
            Order order = Order.builder()
                    .orderNumber(UUID.randomUUID().toString())
                    .skuCode(orderRequest.skuCode())
                    .quantity(orderRequest.quantity())
                    .price(orderRequest.price())
                    .firstName(user != null ? user.firstName() : "Guest")
                    .email(user != null ? user.email() : "guest@hugecart.com")
                    .createdAt(LocalDateTime.now())
                    .build();

            orderRepository.save(order);

            log.info("Order Saved : {}", order.getOrderNumber());

            // 4. Decrease Inventory
            ResponseEntity<InventoryResponse> response =
                    inventoryClient.decreaseInventory(
                            new InventoryRequest(
                                    orderRequest.skuCode(),
                                    orderRequest.quantity()));

            if (!response.getStatusCode().is2xxSuccessful()
                    || response.getBody() == null) {

                log.error("Inventory update failed.");
                return false;
            }

            // 5. Kafka Event
            kafkaTemplate.send(
                    "order-placed",
                    new OrderPlacedEvent(order.getOrderNumber(), order.getEmail()));

            log.info("Kafka Event Sent.");

            return true;

        } catch (Exception e) {

            log.error("Order Failed", e);
            return false;
        }
    }

    // ---------------- GET ALL ORDERS ----------------

    public List<OrderResponse> getAllOrders() {

    return orderRepository.findAll()
            .stream()
            .map(order -> new OrderResponse(
                    order.getId(),
                    order.getOrderNumber(),
                    order.getSkuCode(),
                    order.getQuantity(),
                    order.getPrice(),
                    order.getFirstName(),
                    order.getEmail(),
                    order.getCreatedAt()
            ))
            .toList();
}
}