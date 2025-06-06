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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`)
    .bind(
      v7(),
      reading.label,
      JSON.stringify(reading.passages),
      reading.date.toISOString(),
      reading.context,
      reading.summary,
      reading.lesson,
      reading.published ? 1 : 0,
      challengeId,
    )
    .run();
}

export function updateReading(db: D1Database, reading: Reading) {
  console.log("Updating reading:", reading);

  return db
    .prepare(`UPDATE readings 
    SET label = ?, passages = ?, date = ?, context = ?, summary = ?, lesson = ?, published = ?, updated_at = datetime('now') 
    WHERE uuid = ?`)
    .bind(
      reading.label,
      JSON.stringify(reading.passages),
      reading.date.toISOString(),
      reading.context,
      reading.summary,
      reading.lesson,
      reading.published ? 1 : 0,
      reading.uuid,
    )
    .run();
}
