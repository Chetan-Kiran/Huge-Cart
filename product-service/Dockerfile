FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom first (better caching)
COPY pom.xml .
COPY src ./src

# Build application
RUN mvn clean package -DskipTests

# -----------------------------

FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
