FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/review-service-1.0.0.jar review-service.jar

EXPOSE 8089

ENTRYPOINT ["java","-jar","review-service.jar"]