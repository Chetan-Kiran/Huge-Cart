# Microservices API Documentation

## Product Service (Port: 8081)

| Service Name | Endpoint | HTTP Method | Description | Request Body | Response Type | Status Code |
|-------------|----------|-------------|-------------|--------------|---------------|-------------|
| Product Service | /api/product | POST | Create a new product | { "name": "string", "description": "string", "price": 0.00 } | { "id": "string", "name": "string", "description": "string", "price": 0.00 } | 201 (Created) |
| Product Service | /api/product | GET | Get all products | - | [ { "id": "string", "name": "string", "description": "string", "price": 0.00 } ] | 200 (OK) |

## Order Service (Port: 8083)

| Service Name | Endpoint | HTTP Method | Description | Request Body | Response Type | Status Code |
|-------------|----------|-------------|-------------|--------------|---------------|-------------|
| Order Service | /api/order | POST | Place a new order | { "id": 0, "orderNumber": "string", "skuCode": "string", "productId": "string", "quantity": 0, "price": 0.00, "userDetails": { "email": "string", "firstName": "string", "lastName": "string" } } | "Order placed successfully" or "Product is not in stock" | 201 (Created) |

## Inventory Service (Port: 8082)

| Service Name | Endpoint | HTTP Method | Description | Parameters | Response Type | Status Code |
|-------------|----------|-------------|-------------|------------|---------------|-------------|
| Inventory Service | /api/inventory | GET | Check if product is in stock | skuCode: String, quantity: Integer | true or false | 200 (OK) |
| Inventory Service | /api/inventory/{skuCode} | GET | Get inventory by SKU code | Path Variable: skuCode | { "id": 0, "skuCode": "string", "quantity": 0 } | 200 (OK) |
| Inventory Service | /api/inventory/updateQuantity | POST | Update product quantity | { "skuCode": "string", "quantity": 0 } | { "id": 0, "skuCode": "string", "quantity": 0 } | 200 (OK) or 201 (Created) |
| Inventory Service | /api/inventory/decrease | POST | Decrease inventory quantity | { "skuCode": "string", "quantity": 0 } | { "id": 0, "skuCode": "string", "quantity": 0 } | 200 (OK) |

## API Gateway (Port: 9000)

| Service Name | Endpoint | Target Service | Target Port | Description |
|-------------|----------|----------------|-------------|-------------|
| API Gateway | /api/product | Product Service | 8081 | Routes to Product Service |
| API Gateway | /api/order | Order Service | 8083 | Routes to Order Service |
| API Gateway | /api/inventory | Inventory Service | 8082 | Routes to Inventory Service |
| API Gateway | /aggregate/product-service/v3/api-docs | Product Service | 8081 | Swagger Documentation |
| API Gateway | /aggregate/order-service/v3/api-docs | Order Service | 8083 | Swagger Documentation |
| API Gateway | /aggregate/inventory-service/v3/api-docs | Inventory Service | 8082 | Swagger Documentation |

## Swagger UI Access Points

| Service | URL |
|---------|-----|
| Product Service | http://localhost:8081/swagger-ui.html |
| Order Service | http://localhost:8083/swagger-ui.html |
| Inventory Service | http://localhost:8082/swagger-ui.html |
| API Gateway | http://localhost:9000/swagger-ui.html |