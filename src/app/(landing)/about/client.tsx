export default function AboutClient() {
  return (
    <div className="flex flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-12">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 sm:p-8 space-y-6">
        <h1 className="sm:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
          About This Project
        </h1>

        <p className="text-gray-700 dark:text-gray-400 sm:text-lg leading-relaxed">
          This project is a{" "}
          <span className="font-semibold">Notes Dashboard</span>
          &nbsp;built with{" "}
          <span className="text-indigo-600 dark:text-indigo-500">
            Next.js (React + TypeScript)
          </span>
          and{" "}
          <span className="text-indigo-600 dark:text-indigo-500">
            Tailwind CSS
          </span>
          . It provides an all-in-one space for managing notes, editing content,
          organizing subjects, and keeping track of recent activity.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-200 border border-indigo-100">
            <h3 className="font-semibold text-indigo-700">📒 Features</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>List & Grid views for notes</li>
              <li>Edit titles, subjects, content</li>
              <li>Tag management</li>
              <li>Favorites toggle</li>
              <li>Recent notes preview</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-200 border border-green-100">
            <h3 className="font-semibold text-green-700">🛠️ Tech Stack</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Next.js + TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Supabase (backend & DB)</li>
              <li>Shadcn/ui components</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-center text-xs sm:text-sm">
          🚀 Work in progress – more features like collaboration, study
          planning, and syncing are on the way!
        </p>
      </div>
    </div>
  );
}
