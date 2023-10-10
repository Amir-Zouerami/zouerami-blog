CREATE TABLE users (
    id TEXT NOT NULL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(13) UNIQUE,
    email_verified TIMESTAMP -- last_name VARCHAR(50),
    -- username VARCHAR(50) UNIQUE NOT NULL,
);

CREATE TABLE lucia_user_keys (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    hashed_password TEXT
);

CREATE TABLE lucia_user_sessions (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    active_expires BIGINT NOT NULL,
    idle_expires BIGINT NOT NULL -- username VARCHAR(50) NOT NULL REFERENCES users(username),
);