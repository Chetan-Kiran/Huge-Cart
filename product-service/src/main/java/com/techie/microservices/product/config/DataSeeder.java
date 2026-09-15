package com.techie.microservices.product.config;

import com.techie.microservices.product.model.Product;
import com.techie.microservices.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repository) {

        return args -> {

            if(repository.count() > 0){
                return;
            }

            List<Product> products = List.of(

                    Product.builder()
                            .skuCode("IPH17-BLK")
                            .name("iPhone 17")
                            .description("Apple flagship smartphone")
                            .price(new BigDecimal("79999"))
                            .imageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz8-UKGxSD4OoViywtcK35ywtrkLpA4ZlIMnSTx3BHng&s=10")
                            .build(),

                    Product.builder()
                            .skuCode("MB-AIR-M5")
                            .name("MacBook Air M5")
                            .description("13-inch Apple laptop")
                            .price(new BigDecimal("114999"))
                            .imageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuBRIIaeP_Dq7mr3aMzS3sfCY4iw6h3jzI5_25fxNwTw&s=10")
                            .build(),

                    Product.builder()
                            .skuCode("S25-ULTRA")
                            .name("Samsung Galaxy S25 Ultra")
                            .description("Samsung flagship phone")
                            .price(new BigDecimal("99999"))
                            .imageUrl("https://static.wixstatic.com/media/a3451a_afbaacaf64f848748f060b0a085f53ac~mv2.png/v1/fill/w_480,h_456,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/a3451a_afbaacaf64f848748f060b0a085f53ac~mv2.png")
                            .build()

            );

            repository.saveAll(products);

            System.out.println("Sample products inserted.");
        };
    }
}