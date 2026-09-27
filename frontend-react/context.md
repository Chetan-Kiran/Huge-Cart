Customer APIs (What we'll use)
Feature	Endpoint	Frontend Page
View all products	GET /api/product	Home, Shop
View one product	Use product selected from Shop/Home	Product Details
Check stock	GET /api/inventory/{skuCode}	Product Details
Place order	POST /api/order	Checkout
Order success	Response from POST order	Success Page
Admin APIs (Current Backend)
Feature	Endpoint	Status
Add product	POST /api/product	✅ We'll build
Update inventory	POST /api/inventory/updateQuantity	✅ We'll build
Decrease inventory	POST /api/inventory/decrease	Used after order
Edit product	No endpoint	❌ Skip
Delete product	No endpoint	❌ Skip
View all orders	No GET endpoint	⚠️ We'll show latest order only
Final Pages We Will Build
Page	Uses Endpoint
Home	GET /api/product
Shop ⭐	GET /api/product
Product Details	GET /api/inventory/{sku}
Checkout	POST /api/order
Success	Order response
Admin Dashboard	GET /api/product
Admin Products	POST /api/product
Admin Inventory	POST /api/inventory/updateQuantity

No extra backend changes unless absolutely necessary.