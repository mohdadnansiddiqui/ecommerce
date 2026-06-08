INSERT INTO roles (role_name)
VALUES ('ADMIN'), ('CUSTOMER')
ON CONFLICT (role_name) DO NOTHING;
