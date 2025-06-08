-- Migration number: 0002	2025-06-08T20:22:31.048Z

CREATE UNIQUE INDEX IF NOT EXISTS unique_challenge_date_reading_index ON readings (parent_challenge_id, date);