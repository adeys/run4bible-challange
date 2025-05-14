import { addDays } from "date-fns";
import { type Reading, ReadingCalendar } from "~/components/calendar";

export function meta() {
  return [
    { title: "#RUN4BIBLE Challenge Calendar" },
    { name: "description", content: "Welcome to the #RUN4BIBLE Challenge" },
  ];
}

let idx = 0;
const readings: Reading[] = [
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
    date: addDays(new Date(), idx++),
    context: "Cain and Abel",
    summary: "The story of Cain and Abel.",
    lesson: "Sin leads to separation from God.",
  },
  {
    id: "reading-day-3",
    dayNumber: 3,
    passages: ["Genesis 7-9"],
    date: addDays(new Date(), idx++),
    context: "Noah's Ark",
    summary: "God saves Noah and his family.",
    lesson: "God's judgment and mercy.",
  },
  {
    id: "reading-day-4",
    dayNumber: 4,
    passages: ["Genesis 10-12"],
    date: addDays(new Date(), idx++),
    context: "Tower of Babel",
    summary: "The Tower of Babel and God's plan.",
    lesson: "God's sovereignty over nations.",
  },
  {
    id: "reading-day-5",
    dayNumber: 5,
    passages: ["Genesis 13-15"],
    date: addDays(new Date(), idx++),
    context: "Abraham's Covenant",
    summary: "God's covenant with Abraham.",
    lesson: "Faith and obedience to God.",
  },
  {
    id: "reading-day-6",
    dayNumber: 6,
    passages: ["Genesis 16-18"],
    date: addDays(new Date(), idx++),
    context: "Sodom and Gomorrah",
    summary: "The destruction of Sodom and Gomorrah.",
    lesson: "God's judgment on sin.",
  },
];

export default function Calendar() {
  return (
    <div className="min-h-screen container mx-auto p-6 lg:p-8">
      <hgroup>
        <h1 className="text-4xl font-bold mb-4">
          #RUN4BIBLE Challenge Calendar
        </h1>
        <p className="text-lg mb-8">
          Join us in the #RUN4BIBLE challenge! Track your progress and stay
          motivated.
        </p>
      </hgroup>

      <ReadingCalendar readings={readings} />
    </div>
  );
}
