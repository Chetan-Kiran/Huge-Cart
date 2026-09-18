package com.techie.microservices.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KafkaDebugController {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @GetMapping("/debug/kafka")
    public String send() {

        kafkaTemplate.send("notificationTopic", "hello-render");

        return "Message Sent";
    }
}