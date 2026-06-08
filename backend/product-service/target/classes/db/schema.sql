CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    description VARCHAR(2000),
    category VARCHAR(120) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL
);
