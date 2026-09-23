package com.techie.microservices.inventory;

import org.springframework.boot.test.context.TestConfiguration;

@TestConfiguration(proxyBeanMethods = false)
class TestcontainersConfiguration {

//	@Bean
//	@ServiceConnection
//	MySQLContainer<?> mysqlContainer() {
//		return new MySQLContainer<>(DockerImageName.parse("mysql:latest"));
//	}

}
