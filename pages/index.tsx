
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">Welcome to Finverse Pulse</h1>
      <p className="text-lg mb-8 text-gray-600">Your personal fintech data playground.</p>
      <Link href="/analyzer">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Go to Analyzer
        </button>
      </Link>
    </main>
  );
}
