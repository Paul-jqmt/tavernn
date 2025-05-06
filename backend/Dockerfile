FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /backend

COPY backend/pom.xml .
RUN mvn dependency:go-offline

COPY backend/src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17

WORKDIR /backend

COPY --from=builder /backend/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]