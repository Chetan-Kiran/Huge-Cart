FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom first (better Docker caching)
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build Spring Boot jar
RUN mvn clean package -DskipTests

# ---------------- Runtime Image ----------------

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
