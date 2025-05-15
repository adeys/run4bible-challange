import { addDays } from "date-fns";
import type { Reading } from "~/components/calendar";

let idx = 0;
const defaultReadings: Reading[] = [
  {
    id: "reading-day-1",
    dayNumber: 1,
    passages: ["Genesis 1-3"],
    date: new Date(),
    context: "Universe Creation",
    summary: "God created the universe in six days.",
    lesson: "God's creation is good.",
  },
  {
    id: "reading-day-2",
    dayNumber: 2,
    passages: ["Genesis 4-6"],
    date: addDays(new Date(), ++idx),
    context: "Cain and Abel",
    summary: "The story of Cain and Abel.",
    lesson: "Sin leads to separation from God.",
  },
  {
    id: "reading-day-3",
    dayNumber: 3,
    passages: ["Genesis 7-9"],
    date: addDays(new Date(), ++idx),
    context: "Noah's Ark",
    summary: "God saves Noah and his family.",
    lesson: "God's judgment and mercy.",
  },
  {
    id: "reading-day-4",
    dayNumber: 4,
    passages: ["Genesis 10-12"],
    date: addDays(new Date(), ++idx),
    context: "Tower of Babel",
    summary: "The Tower of Babel and God's plan.",
    lesson: "God's sovereignty over nations.",
  },
  {
    id: "reading-day-5",
    dayNumber: 5,
    passages: ["Genesis 13-15"],
    date: addDays(new Date(), ++idx),
    context: "Abraham's Covenant",
    summary: "God's covenant with Abraham.",
    lesson: "Faith and obedience to God.",
  },
  {
    id: "reading-day-6",
    dayNumber: 6,
    passages: ["Genesis 16-18"],
    date: addDays(new Date(), ++idx),
    context: "Sodom and Gomorrah",
    summary: "The destruction of Sodom and Gomorrah.",
    lesson: "God's judgment on sin.",
  },
];

export function getAllReadings(): Reading[] {
  let readings = JSON.parse(
    localStorage.getItem("readings") || "[]",
  ) as Reading[];
  if (readings.length === 0) {
    readings = defaultReadings;
    localStorage.setItem("readings", JSON.stringify(readings));
  }

  return readings;
}

export function saveReadings(readings: Reading[]) {
  localStorage.setItem("readings", JSON.stringify(readings));
}

export function addReading(reading: Reading) {
  const readings = getAllReadings();
  readings.push(reading);
  saveReadings(readings);
}

export function updateReading(updatedReading: Reading) {
  const readings = getAllReadings();
  const index = readings.findIndex(
    (reading) => reading.id === updatedReading.id,
  );
  if (index !== -1) {
    readings[index] = updatedReading;
    saveReadings(readings);
  }
}

export function deleteReading(readingId: string) {
  const readings = getAllReadings();
  const updatedReadings = readings.filter(
    (reading) => reading.id !== readingId,
  );
  saveReadings(updatedReadings);
}

export function getReadingById(readingId: string): Reading | undefined {
  const readings = getAllReadings();
  return readings.find((reading) => reading.id === readingId);
}
