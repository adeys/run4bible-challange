import { v7 } from "uuid";
import type { Reading } from "~/components/calendar";

export async function fetchReadings(
  db: D1Database,
): Promise<D1Result<Reading>> {
  const result = await db
    .prepare(
      "SELECT id, uuid, label, passages, date, context, summary, lesson, published FROM readings",
    )
    .run<Reading>();

  result.results = (result.results || []).map(
    (row: any) =>
      ({
        id: row.id,
        uuid: row.uuid,
        label: row.label,
        passages: JSON.parse(row.passages),
        date: new Date(row.date),
        context: row.context,
        summary: row.summary,
        lesson: row.lesson,
        published: row.published === 1,
      }) as Reading,
  );

  return result;
}

export async function findReading(
  db: D1Database,
  readingId: string,
): Promise<Reading | null> {
  const result = await db
    .prepare(
      "SELECT id, uuid, label, passages, date, context, summary, lesson, published FROM readings WHERE uuid = ?",
    )
    .bind(readingId)
    .run();

  const row = result.results[0];
  return result.success && row
    ? ({
        id: row.id,
        uuid: row.uuid,
        label: row.label,
        passages: JSON.parse(row.passages as string),
        date: new Date(row.date as string),
        context: row.context,
        summary: row.summary,
        lesson: row.lesson,
        published: row.published === 1,
      } as Reading)
    : null;
}

export function createReading(
  db: D1Database,
  challengeId: number,
  reading: Reading,
) {
  return db
    .prepare(`INSERT INTO readings 
    (uuid, label, passages, date, context, summary, lesson, published, parent_challenge_id, created_at, updated_at) 
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, datetime('now'), datetime('now'))
    ON CONFLICT (date, parent_challenge_id) 
      DO UPDATE SET label = ?2, passages = ?3, context = ?5, summary = ?6, lesson = ?7, published = ?8, updated_at = datetime('now')
      WHERE readings.parent_challenge_id = ?9 AND readings.date = ?4
    `)
    .bind(
      v7(),
      reading.label,
      JSON.stringify(reading.passages),
      formatDate(new Date(reading.date.setHours(0, 0, 0, 0))),
      reading.context,
      reading.summary,
      reading.lesson,
      reading.published ? 1 : 0,
      challengeId,
    )
    .run();
}

export function updateReading(db: D1Database, reading: Reading) {
  return db
    .prepare(`UPDATE readings 
    SET label = ?, passages = ?, date = ?, context = ?, summary = ?, lesson = ?, published = ?, updated_at = datetime('now') 
    WHERE uuid = ?`)
    .bind(
      reading.label,
      JSON.stringify(reading.passages),
      formatDate(new Date(reading.date.setHours(0, 0, 0, 0))),
      reading.context,
      reading.summary,
      reading.lesson,
      reading.published ? 1 : 0,
      reading.uuid,
    )
    .run();
}

export function deleteReading(db: D1Database, readingId: string) {
  return db
    .prepare("DELETE FROM readings WHERE uuid = ?")
    .bind(readingId)
    .run();
}

function formatDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
