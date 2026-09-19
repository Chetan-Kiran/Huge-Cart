package com.techie.microservices.notification;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KafkaDebugController {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaDebugController(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @GetMapping("/debug/kafka")
    public String send() {

        kafkaTemplate.send("order-placed", "hello-render");

        return "Message Sent";
    }
}