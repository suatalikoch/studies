import {
  BookType,
  Calendar,
  Clock,
  Download,
  Play,
  Plus,
  Search,
  Upload,
} from "lucide-react";

export default function LecturesClient() {
  return (
    <div className="flex flex-col h-full">
      {/* Lectures List */}
      <div className="flex flex-col gap-4 p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Lectures</h2>
          <div className="flex gap-2">
            <div className="relative">
              {/* Search Icon */}
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search lectures..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              type="button"
            >
              {/* Plus Icon */}
              <Plus className="w-5 h-5" />
              <span>Add Lecture</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
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

      {true && (
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Example lecture item */}
            <div className="bg-white rounded-lg border border-gray-200 hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">
                  Introduction to Biology
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  {/* Icon for lecture type */}
                  <BookType className="w-4 h-4 text-indigo-600" />
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="ml-2 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Science • Prof. Smith
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Recorded
                </span>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    {/* Calendar Icon */}
                    <Calendar className="w-3 h-3" />
                    <span>{new Date("2025-08-07").toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* Clock Icon */}
                    <Clock className="w-3 h-3" />
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
            <div className="bg-white rounded-lg border border-gray-200 hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">
                  Introduction to Biology
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  {/* Icon for lecture type */}
                  <BookType className="w-4 h-4 text-indigo-600" />
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="ml-2 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Science • Prof. Smith
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Recorded
                </span>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    {/* Calendar Icon */}
                    <Calendar className="w-3 h-3" />
                    <span>{new Date("2025-08-07").toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* Clock Icon */}
                    <Clock className="w-3 h-3" />
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
            <div className="bg-white rounded-lg border border-gray-200 hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">
                  Introduction to Biology
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  {/* Icon for lecture type */}
                  <BookType className="w-4 h-4 text-indigo-600" />
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="ml-2 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Science • Prof. Smith
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Recorded
                </span>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    {/* Calendar Icon */}
                    <Calendar className="w-3 h-3" />
                    <span>{new Date("2025-08-07").toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* Clock Icon */}
                    <Clock className="w-3 h-3" />
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
            <div className="bg-white rounded-lg border border-gray-200 hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">
                  Introduction to Biology
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  {/* Icon for lecture type */}
                  <BookType className="w-4 h-4 text-indigo-600" />
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="ml-2 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Science • Prof. Smith
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Recorded
                </span>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    {/* Calendar Icon */}
                    <Calendar className="w-3 h-3" />
                    <span>{new Date("2025-08-07").toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* Clock Icon */}
                    <Clock className="w-3 h-3" />
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
          </div>
        </div>
      )}

      {/* Lecture Details */}
      {true && (
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
                    <span>{new Date("2025-08-07").toLocaleDateString()}</span>
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
                  <Play className="w-4 h-4" />
                  <span>Watch Recording</span>
                </button>

                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  type="button"
                >
                  {/* Download Icon */}
                  <Download className="w-4 h-4" />
                  <span>Export Notes</span>
                </button>

                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                  type="button"
                >
                  {/* Upload Icon */}
                  <Upload className="w-4 h-4" />
                  <span>Upload Files</span>
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Video Player Placeholder */}
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  {/* Large Play Icon */}
                  <Play className="w-14 h-14 mx-auto mb-4" />
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
                    <a
                      href="https://en.wikipedia.org/wiki/Biology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Biology Textbook PDF
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Biology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Practice Questions
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Biology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Supplementary Videos
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
