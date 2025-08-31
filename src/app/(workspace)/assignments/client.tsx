import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Download,
  File,
  Plus,
  Upload,
} from "lucide-react";

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
              <Plus className="w-5 h-5" />
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
              <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
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
                <Calendar className="w-3 h-3" />
                <span>{new Date().toLocaleDateString()}</span>
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
                    <Calendar className="w-4 h-4" />
                    <span>Due: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Upload"
                >
                  {/* Upload icon */}
                  <Upload className="w-4 h-4" />
                </button>
                <button
                  className="px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Download"
                >
                  {/* Download icon */}
                  <Download className="w-4 h-4" />
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
                    <File className="w-5 h-5 text-gray-600" />
                    <span className="flex-1 text-gray-900">filename.pdf</span>
                    <button
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Download attachment"
                    >
                      {/* Download icon */}
                      <Download className="w-4 h-4" />
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
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
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
