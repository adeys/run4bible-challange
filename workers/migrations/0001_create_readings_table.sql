-- Migration number: 0001	2025-06-06T19:24:24.986Z

CREATE TABLE IF NOT EXISTS challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_challenges_uuid ON challenges (uuid);
CREATE UNIQUE INDEX IF NOT EXISTS idx_challenges_slug ON challenges (slug);

INSERT INTO
    challenges (uuid, name, slug, description, start_date, end_date)
VALUES ('019746f5-8b89-7fe1-8745-43419f441c51', 'R4B Challenge 2025', 'r4b-2025', 'Default Challenge', '2025-06-01 00:00:00', '2025-12-31 23:59:59');

CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE ,
    label TEXT NOT NULL,
    passages TEXT NOT NULL,
    date TEXT NOT NULL,
    context TEXT DEFAULT NULL,
    summary TEXT DEFAULT NULL,
    lesson TEXT DEFAULT NULL,
    parent_challenge_id INT NOT NULL,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_challenge_id) REFERENCES challenges(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_readings_uuid ON readings (uuid);
CREATE INDEX IF NOT EXISTS idx_readings_parent_challenge_id ON readings (parent_challenge_id);