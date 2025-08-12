export default function NotesClient() {
  return (
    <div className="h-full flex">
      {/* Notes List */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Notes</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
              {/* Plus icon placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>New Note</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="all">All Subjects</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              {/* Add your subjects here */}
            </select>
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              {/* Filter icon placeholder */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 018 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto">
          {/* Repeat this block for each note */}
          <div className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors bg-indigo-50 border-indigo-200">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 truncate flex-1">
                Note Title
              </h3>
              <button className="ml-2 text-yellow-500 hover:text-yellow-500">
                {/* Star icon (filled) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              This is the note content preview text...
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-full">Math</span>
              <span>2025-08-07</span>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                #tag1
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                #tag2
              </span>
              {/* more tags */}
            </div>
          </div>
          {/* End note block */}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 bg-white">
        {/* If note selected */}
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {/* BookOpen icon placeholder */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 20l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12v8"
                  />
                </svg>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Selected Note Title
                  </h1>
                  <p className="text-sm text-gray-600">Math</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center space-x-1">
                  {/* Download icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-4-4m4 4l4-4M12 4v8"
                    />
                  </svg>
                  <span>PDF</span>
                </button>

                <button className="px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center space-x-1">
                  {/* Download icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-4-4m4 4l4-4M12 4v8"
                    />
                  </svg>
                  <span>Word</span>
                </button>

                <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-1">
                  {/* Edit3 icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536M9 11l6-6m2 10v4H7v-4m6-6v4m0 0H7m6-4L7 17"
                    />
                  </svg>
                  <span>Edit</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                {/* Calendar icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Created: 2025-08-01</span>
              </div>
              <div className="flex items-center space-x-1">
                {/* Calendar icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Updated: 2025-08-07</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6">
            {/* Editing textarea */}
            <textarea
              className="w-full h-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Start writing your notes..."
              defaultValue="This is the note content..."
            />
            {/* 
            If not editing, replace textarea with:
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                This is the note content...
              </p>
            </div>
          */}
          </div>
        </div>

        {/* If no note selected, show this instead: */}
        {/* 
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8h-6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2h-4z" />
          </svg>
          <h3 className="text-lg font-medium mb-2">Select a note to view</h3>
          <p>Choose a note from the list to start reading or editing</p>
        </div>
      </div>
      */}
      </div>
    </div>
  );
}
