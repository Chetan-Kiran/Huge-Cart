package com.techie.microservices.notification.service;

import com.techie.microservices.order.event.OrderPlacedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender javaMailSender;

    @KafkaListener(topics = "order-placed")
    public void listen(OrderPlacedEvent orderPlacedEvent) {
        log.info("Got message from order-place topic: {}", orderPlacedEvent);

        // Logic to send email notification
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("springshop@email.com");
            messageHelper.setTo(orderPlacedEvent.getEmail());
            messageHelper.setSubject("Spring Shop: Order Confirmation");
            messageHelper.setText(String.format("""
                    Hi,
                    
                    Thank you for your order. Your order number is %s.
                    
                    Best regards,
                    Spring Shop Team
                    """, orderPlacedEvent.getOrderNumber()));
        };

        try {
            javaMailSender.send(messagePreparator);
            log.info("Order Notification email sent!!");
        } catch (Exception e) {
            log.error("Exception occured when sending mail: {}", e.getMessage());
            throw new RuntimeException("Exception occured when sending mail  ", e);
        }
    }
}
