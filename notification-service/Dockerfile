# Use Java 21 base image (or match your pom.xml)
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy the built JAR file into the container
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]