import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Mini Applicants Board
        </h1>
        <p className="text-gray-600">
          Manage applicants, update their status, and soft-delete records.
        </p>
        <Link
          href="/applicants"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Open Applicants Board
        </Link>
      </div>
    </main>
  );
}

