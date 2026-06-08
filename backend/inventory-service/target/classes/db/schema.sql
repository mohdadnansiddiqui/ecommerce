CREATE TABLE IF NOT EXISTS inventory (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL UNIQUE,
    available_quantity INTEGER NOT NULL,
    warehouse_location VARCHAR(255) NOT NULL
);
