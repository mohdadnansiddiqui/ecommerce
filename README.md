# Enterprise E-Commerce Microservices

A production-style learning workspace with nine independent Java 21 / Spring Boot 3 microservices and an Angular 20 frontend.

## Stack

- Java 21, Spring Boot 3.5.13, Maven, PostgreSQL
- Spring Security, JWT, refresh tokens, role-based authorization
- Spring Data JPA, OpenFeign, Lombok, Bean Validation, MapStruct, SLF4J
- Swagger/OpenAPI for every service
- Angular 20, Angular Material, routing, reactive forms, HttpClient interceptor

Version choices were checked against official compatibility pages: Angular 20 supports Node `^20.19.0 || ^22.12.0 || ^24.0.0`, and Spring Cloud 2025.0.x is aligned with Spring Boot 3.5.x.

## Services

| Service | Port | Database |
| --- | ---: | --- |
| auth-service | 8081 | ecommerce_auth |
| customer-service | 8082 | ecommerce_customer |
| product-service | 8083 | ecommerce_product |
| cart-service | 8084 | ecommerce_cart |
| order-service | 8085 | ecommerce_order |
| payment-service | 8086 | ecommerce_payment |
| inventory-service | 8087 | ecommerce_inventory |
| notification-service | 8088 | ecommerce_notification |
| review-service | 8089 | ecommerce_review |

## Structure

```text
ecom/
  backend/
    auth-service/
    customer-service/
    product-service/
    cart-service/
    order-service/
    payment-service/
    inventory-service/
    notification-service/
    review-service/
  frontend/
    ecommerce-web/
  database/
    create-all-databases.sql
    *-service.sql
```

Each backend service is an independent Maven project with this internal layering:

```text
src/main/java/com/ecommerce/<service>/
  domain/model
  domain/repository
  application/dto
  application/mapper
  application/service
  infrastructure/client
  infrastructure/security
  interfaces/rest
  shared/exception
```

## Setup

1. Create PostgreSQL databases:

```bash
psql -U postgres -f database/create-all-databases.sql
```

2. Apply each service schema from `backend/<service>/src/main/resources/db/schema.sql`. Apply `auth-service` data from `db/data.sql` to seed `ADMIN` and `CUSTOMER` roles.

3. Start services in separate terminals:

```bash
cd backend/auth-service && mvn spring-boot:run
cd backend/customer-service && mvn spring-boot:run
cd backend/product-service && mvn spring-boot:run
cd backend/cart-service && mvn spring-boot:run
cd backend/order-service && mvn spring-boot:run
cd backend/payment-service && mvn spring-boot:run
cd backend/inventory-service && mvn spring-boot:run
cd backend/notification-service && mvn spring-boot:run
cd backend/review-service && mvn spring-boot:run
```

4. Start Angular:

```bash
cd frontend/ecommerce-web
npm install
npm start
```

5. Swagger UI is available at `http://localhost:<port>/swagger-ui.html` for every service.

## Authentication Flow

- Register: `POST http://localhost:8081/api/v1/auth/register`
- Login: `POST http://localhost:8081/api/v1/auth/login`
- Refresh: `POST http://localhost:8081/api/v1/auth/refresh`
- Use `Authorization: Bearer <accessToken>` when calling other services.

All services use the same `app.jwt.secret` default for local learning. In real environments, set `JWT_SECRET` consistently for every service.

## Testing

Tests are intentionally generated only for:

- auth-service
- product-service
- order-service

Each includes service tests, controller tests, security/JWT tests, repository integration tests, mock data builders, and test profile configuration.

Run:

```bash
cd backend/auth-service && mvn test
cd backend/product-service && mvn test
cd backend/order-service && mvn test
```

## Extensibility Notes

The code keeps service boundaries independent and avoids the intentionally excluded platform pieces: no Kafka, RabbitMQ, Redis, Eureka, Config Server, API Gateway, Docker, Kubernetes, Saga, CQRS, or observability stack. Those can be added later around the existing boundaries:

- Add Eureka by replacing fixed Feign URLs with service names.
- Add Config Server by externalizing each `application.yml`.
- Add API Gateway in front of the existing REST contracts.
- Add Kafka/Saga later around order, payment, inventory, and notification workflows.
- Add Keycloak/OAuth2 later by replacing the local JWT issuer and validators.
