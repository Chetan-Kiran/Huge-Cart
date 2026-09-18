package com.techie.microservices.notification.service;

import com.techie.microservices.notification.order.event.OrderPlacedEvent;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender javaMailSender;

    @KafkaListener(
            topics = "order-placed",
            groupId = "notificationService"
    )
    public void handle(OrderPlacedEvent event) {

        log.info("========== EVENT RECEIVED ==========");
        log.info("Order Number : {}", event.getOrderNumber());
        log.info("Email        : {}", event.getEmail());

        try {

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, true);

            helper.setFrom("sandbox@hugecart.com");
            helper.setTo(event.getEmail());
            helper.setSubject("HugeCart - Order Confirmation");

            helper.setText(String.format("""
                    Hi %s,

                    Thank you for shopping with HugeCart.

                    Your order has been placed successfully.

                    Order Number: %s

                    Happy Shopping!

                    HugeCart Team
                    """,
                    event.getFirstName() != null
                            ? event.getFirstName()
                            : "Customer",
                    event.getOrderNumber()));

            javaMailSender.send(mimeMessage);

            log.info("Email sent successfully.");

        } catch (Exception e) {

            log.error("Email sending failed.", e);
        }
    }
}