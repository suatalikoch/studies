export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          About This Project
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          This project is a{" "}
          <span className="font-semibold">Notes Dashboard</span>
          &nbsp;built with{" "}
          <span className="text-indigo-600">Next.js (React + TypeScript)</span>
          and <span className="text-indigo-600">Tailwind CSS</span>. It provides
          an all-in-one space for managing notes, editing content, organizing
          subjects, and keeping track of recent activity.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
            <h3 className="font-semibold text-indigo-700">📒 Features</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>List & Grid views for notes</li>
              <li>Edit titles, subjects, content</li>
              <li>Tag management</li>
              <li>Favorites toggle</li>
              <li>Recent notes preview</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-green-50 border border-green-100">
            <h3 className="font-semibold text-green-700">🛠️ Tech Stack</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Next.js + TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Supabase (backend & DB)</li>
              <li>Shadcn/ui components</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-600 text-center text-sm">
          🚀 Work in progress – more features like collaboration, study
          planning, and syncing are on the way!
        </p>
      </div>
    </div>
  );
}
