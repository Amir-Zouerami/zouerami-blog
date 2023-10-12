CREATE TABLE users (
    id TEXT NOT NULL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    phone_number VARCHAR(11) UNIQUE,
    email_verified TIMESTAMP
);

CREATE TABLE lucia_user_keys (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    hashed_password TEXT
);

CREATE TABLE lucia_user_sessions (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    username VARCHAR(50) NOT NULL REFERENCES users(username),
    active_expires BIGINT NOT NULL,
    idle_expires BIGINT NOT NULL
);