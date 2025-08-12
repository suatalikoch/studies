export default function LecturesClient() {
  return (
    <div className="h-full flex">
      {/* Lectures List */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Lectures</h2>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              type="button"
            >
              {/* Plus Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Lecture</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="relative">
              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.75-6.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search lectures..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-2">
              <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                <option value="all">All Subjects</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="history">History</option>
              </select>

              <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                <option value="all">All Types</option>
                <option value="live">Live</option>
                <option value="recorded">Recorded</option>
                <option value="seminar">Seminar</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* Example lecture item */}
          <div className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors bg-indigo-50 border-indigo-200">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 flex-1">
                Introduction to Biology
              </h3>
              <div className="flex items-center space-x-1 ml-2">
                {/* Icon for lecture type */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-6a2 2 0 012-2h4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 11h6m2 0a2 2 0 012 2v4"
                  />
                </svg>
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="ml-2 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-2">Science • Prof. Smith</p>

            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Recorded
              </span>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  {/* Calendar Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                    />
                  </svg>
                  <span>2025-08-07</span>
                </div>
                <div className="flex items-center space-x-1">
                  {/* Clock Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2"
                    />
                  </svg>
                  <span>1h 30m</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                #biology
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                #lecture
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                #recorded
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                +2
              </span>
            </div>
          </div>

          {/* More lectures here... */}
        </div>
      </div>

      {/* Lecture Details */}
      <div className="flex-1 bg-white flex flex-col">
        {/* If a lecture is selected, show details */}
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Introduction to Biology
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span>Science</span>
                  <span>•</span>
                  <span>Prof. Smith</span>
                  <span>•</span>
                  <span>2025-08-07</span>
                  <span>•</span>
                  <span>1h 30m</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  Recorded
                </span>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600">Attended</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                type="button"
              >
                {/* Play Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-6.518-3.75A1 1 0 007 8.25v7.5a1 1 0 001.234.97l6.518-3.75a1 1 0 000-1.684z"
                  />
                </svg>
                <span>Watch Recording</span>
              </button>

              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                type="button"
              >
                {/* Download Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14m-7-7h14"
                  />
                </svg>
                <span>Export Notes</span>
              </button>

              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                type="button"
              >
                {/* Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12v8m0-8l-4 4m4-4l4 4"
                  />
                </svg>
                <span>Upload Files</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* Video Player Placeholder */}
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                {/* Large Play Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-6.518-3.75A1 1 0 007 8.25v7.5a1 1 0 001.234.97l6.518-3.75a1 1 0 000-1.684z"
                  />
                </svg>
                <p className="text-lg">Video Player</p>
                <p className="text-sm text-gray-300">
                  Click to play lecture recording
                </p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Lecture Notes</h2>
              <textarea
                rows={10}
                className="w-full border border-gray-300 rounded-lg p-4 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Write your notes here..."
              ></textarea>
            </div>

            {/* Additional resources */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Resources</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  <a href="#" className="text-indigo-600 hover:underline">
                    Biology Textbook PDF
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-600 hover:underline">
                    Practice Questions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-600 hover:underline">
                    Supplementary Videos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
