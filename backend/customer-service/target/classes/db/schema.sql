CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    address VARCHAR(1000),
    created_at TIMESTAMPTZ NOT NULL
);
