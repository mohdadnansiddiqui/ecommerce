CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    rating INTEGER NOT NULL,
    review_text VARCHAR(2000) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);
