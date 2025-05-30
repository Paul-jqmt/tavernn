FROM maven:3.8.5-openjdk-17

WORKDIR /backend

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/tavernn-1.0.jar"]

