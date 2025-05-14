import { Link } from "react-router";

export function meta() {
  return [
    { title: "Welcome to the #RUN4BIBLE Challenge" },
    { name: "description", content: "Welcome to the #RUN4BIBLE Challenge" },
  ];
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the #RUN4BIBLE Challenge
      </h1>
      <p className="text-lg mb-8">
        Join us in this exciting challenge to run and spread the word of the
        Bible!
      </p>
      <Link
        to="/calendar"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Join the Challenge
      </Link>
    </main>
  );
}
