CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    message VARCHAR(1000) NOT NULL,
    notification_type VARCHAR(40) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);
