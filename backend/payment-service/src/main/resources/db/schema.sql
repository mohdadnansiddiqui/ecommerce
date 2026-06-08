CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(40) NOT NULL,
    payment_status VARCHAR(40) NOT NULL,
    payment_date TIMESTAMPTZ NOT NULL
);
