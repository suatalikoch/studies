export default function AssignmentsClient() {
  return (
    <div className="h-full flex">
      {/* Assignments List */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Assignments</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
              {/* Icon placeholder for Plus */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              <span>Add Assignment</span>
            </button>
          </div>

          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option value="all">All Assignments</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="overflow-y-auto">
          {/* Repeat this block for each assignment */}
          <div className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 flex-1">
                Assignment Title
              </h3>
              {/* Conditional alert icon placeholder */}
              <svg
                className="w-4 h-4 text-red-500 ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01"
                ></path>
              </svg>
            </div>

            <p className="text-sm text-gray-600 mb-2">Subject Name</p>

            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                Status
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Priority
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                {/* Calendar icon */}
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Due Date</span>
              </div>
              <span className="font-medium text-gray-600">
                X days left / overdue
              </span>
            </div>
          </div>
          {/* End assignment repeat */}
        </div>
      </div>

      {/* Assignment Details */}
      <div className="flex-1 bg-white">
        {/* If assignment selected */}
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Assignment Title
                </h1>
                <p className="text-lg text-gray-600 mb-4">Subject Name</p>

                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                    Status
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Priority priority
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    {/* Calendar icon */}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="4"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Due: Due Date</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Upload"
                >
                  {/* Upload icon */}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"></path>
                    <polyline points="8 12 12 8 16 12"></polyline>
                    <line x1="12" y1="8" x2="12" y2="20"></line>
                  </svg>
                </button>
                <button
                  className="px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Download"
                >
                  {/* Download icon */}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14"></path>
                    <polyline points="8 15 12 19 16 15"></polyline>
                    <line x1="4" y1="19" x2="20" y2="19"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Status Update Buttons */}
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-200 text-gray-800">
                Not Started
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                In Progress
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-green-100 text-green-600 hover:bg-green-200">
                Completed
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Assignment description text goes here.
                </p>
              </div>

              {/* Attachments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Attachments
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {/* File icon */}
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    <span className="flex-1 text-gray-900">filename.pdf</span>
                    <button
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Download attachment"
                    >
                      {/* Download icon */}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M12 5v14"></path>
                        <polyline points="8 15 12 19 16 15"></polyline>
                        <line x1="4" y1="19" x2="20" y2="19"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Notes
                </h3>
                <textarea
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Add your notes here..."
                ></textarea>
              </div>

              {/* Progress Tracking */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Progress Tracking
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Completion
                    </span>
                    <span className="text-sm text-gray-600">50%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* If no assignment selected */}
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            {/* Book Open Icon */}
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 19l7-7 1 5a2 2 0 01-2 2H6a2 2 0 01-2-2l1-5 7 7z"></path>
              <path d="M12 19V5l-7 7"></path>
            </svg>
            <h3 className="text-lg font-medium mb-2">Select an assignment</h3>
            <p>
              Choose an assignment from the list to view details and track
              progress
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
