package com.techie.microservices.order.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic orderPlacedTopic() {
        return new NewTopic("order-placed", 1, (short) 1);
    }
}