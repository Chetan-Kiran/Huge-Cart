Chetan, this is actually the most important Docker lesson you've learned so far. You're thinking "it randomly works and randomly fails." It isn't random. I'll explain exactly what happened like a backend engineer debugging a production microservice.

# The real reason it failed, then worked

Let's use your own logs.

## Timeline of what happened

So the gateway wasn't ready yet.

## Visual explanation

![](data\:image/svg+xml;charset=utf-8,%3Csvg%20font-family%3D%22-apple-system-body%2C%20ui-sans-serif%2C%20-apple-system%2C%20system-ui%2C%20%26quot%3BSegoe%20UI%26quot%3B%2C%20Helvetica%2C%20%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%20Arial%2C%20sans-serif%2C%20%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%20%26quot%3BSegoe%20UI%20Symbol%26quot%3B%22%20font-weight%3D%22400%22%20data-d-component%3D%22svg%22%20fill%3D%22currentColor%22%20style%3D%22color%3Argb\(255%2C%20255%2C%20255\)%22%20viewBox%3D%220%200%20760%20120%22%20width%3D%22100%25%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cline%20x1%3D%2240%22%20y1%3D%2260%22%20x2%3D%22720%22%20y2%3D%2260%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%2F%3E%3Ccircle%20cx%3D%2270%22%20cy%3D%2260%22%20r%3D%226%22%20fill%3D%22%232563EB%22%2F%3E%3Ctext%20x%3D%2255%22%20y%3D%2240%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%3E08%3A55%3A18%3C%2Ftext%3E%3Ctext%20x%3D%2230%22%20y%3D%2295%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%3EContainer%20starts%3C%2Ftext%3E%3Crect%20x%3D%22100%22%20y%3D%2245%22%20width%3D%22360%22%20height%3D%2230%22%20rx%3D%228%22%20fill%3D%22%23F59E0B%22%2F%3E%3Ctext%20x%3D%22280%22%20y%3D%2264%22%20text-anchor%3D%22middle%22%20font-size%3D%2212%22%20fill%3D%22white%22%3ESpring%20Boot%20loading%20beans%2C%20routes%2C%20configs%3C%2Ftext%3E%3Ccircle%20cx%3D%22500%22%20cy%3D%2260%22%20r%3D%226%22%20fill%3D%22%2316A34A%22%2F%3E%3Ctext%20x%3D%22470%22%20y%3D%2240%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%3E08%3A57%3A39%3C%2Ftext%3E%3Ctext%20x%3D%22455%22%20y%3D%2295%22%20font-size%3D%2211%22%20fill%3D%22currentColor%22%3EApplication%20ready%3C%2Ftext%3E%3Cpath%20d%3D%22M180%2020%20V45%22%20stroke%3D%22%23DC2626%22%20stroke-width%3D%222%22%2F%3E%3Cpolygon%20points%3D%22180%2C45%20174%2C36%20186%2C36%22%20fill%3D%22%23DC2626%22%2F%3E%3Ctext%20x%3D%22190%22%20y%3D%2218%22%20font-size%3D%2211%22%20fill%3D%22%23DC2626%22%3Ecurl%20here%20%E2%86%92%20Empty%20reply%3C%2Ftext%3E%3Cpath%20d%3D%22M570%2020%20V45%22%20stroke%3D%22%2316A34A%22%20stroke-width%3D%222%22%2F%3E%3Cpolygon%20points%3D%22570%2C45%20564%2C36%20576%2C36%22%20fill%3D%22%2316A34A%22%2F%3E%3Ctext%20x%3D%22580%22%20y%3D%2218%22%20font-size%3D%2211%22%20fill%3D%22%2316A34A%22%3Ecurl%20here%20%E2%86%92%20Works%3C%2Ftext%3E%3C%2Fsvg%3E)

Docker says container is Up, but Spring Boot is still loading.

# Why did it take 134 seconds?

Your gateway depends on many services starting at once.

When `docker compose up -d` runs:

Everything starts together, so startup can easily take 1–2 minutes.

# Your daily workflow (this is the one to remember)

## Morning — Start your backend

### Step 1

Bash

```
docker compose up -d
```

### Step 2 — Wait for gateway

Bash

```
docker logs -f api-gateway
```

Wait until you see:

```
Started ApiGatewayApplication
```

Then press Ctrl+C.

> Ctrl+C only stops watching logs. It does not stop Docker.

### Step 3 — Verify health

Run:

Bash

```
curl.exe http://localhost:8080/actuator/health
```

Expected:

JSON

```
{"status":"UP"}
```

### Step 4 — Test APIs

Bash

```
curl.exe http://localhost:8080/api/product
curl.exe http://localhost:8080/api/inventory/IPH17-BLK
```

If these work, your backend is fully ready.

## Evening — Stop your backend

You have three different ways.

### Option A (recommended for daily work)

Bash

```
docker compose stop
```

This stops containers but keeps them.

Tomorrow:

Bash

```
docker compose start
```

Fast startup (usually much quicker).

### Option B (when you're done for the day)

Bash

```
docker compose down
```

Removes containers and network.

Tomorrow:

Bash

```
docker compose up -d
```

Containers are recreated.

### Option C (don't use unless needed)

Bash

```
docker compose down -v
```

Removes volumes.

This deletes MongoDB/MySQL data.

Only use it when you intentionally want a fresh database.

# Which commands should YOU use?

Since you're developing this project every day:

# A debugging checklist you'll use forever

Whenever something doesn't work, run these 5 commands in this order.

### 1. Are containers running?

Bash

```
docker compose ps
```

### 2. Is gateway healthy?

Bash

```
curl.exe http://localhost:8080/actuator/health
```

### 3. Can gateway reach Product Service?

Bash

```
docker exec api-gateway curl http://product-service:8080/api/product
```

### 4. Can gateway reach Inventory Service?

Bash

```
docker exec api-gateway curl http://inventory-service:8080/api/inventory/IPH17-BLK
```

### 5. Check recent logs

Bash

```
docker logs api-gateway --tail=30
docker logs product-service --tail=30
docker logs inventory-service --tail=30
```

This tells you which service is failing in under a minute.

# One improvement I'd make to your project

Right now, `docker compose up -d` starts everything simultaneously. Docker doesn't know when Spring Boot is actually ready.

A production-style improvement is to add health checks and depends_on: condition: service_healthy in `docker-compose.yml` so:

* MongoDB waits until healthy.

* MySQL waits until healthy.

* Product/Inventory wait for databases.

* API Gateway waits for Product and Inventory.

Then `docker compose up -d` becomes much more reliable and you won't see those early `Empty reply from server` responses.

# Save this as your "Run/Stop Cheat Sheet"

## 🚀 Start Backend (every morning)

Bash

```
docker compose start
docker logs -f api-gateway
# Wait for "Started ApiGatewayApplication"
curl.exe http://localhost:8080/actuator/health
```

## 🛑 Stop Backend (every evening)

Bash

```
docker compose stop
```

## 🔨 After changing backend configuration or Dockerfiles

Bash

```
docker compose down
docker compose build
docker compose up -d
```

## Next lesson (worth learning before frontend)

I want to teach you Docker Compose Health Checks. It's about a 30-minute hands-on session where we'll modify your `docker-compose.yml` so the gateway starts only after Product Service and Inventory Service are healthy. That's exactly how real microservice projects avoid this startup timing issue.
