FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar order-service.jar

# port

EXPOSE 8085

ENTRYPOINT ["java","-jar","order-service.jar"]