import {
  Download,
  GraduationCap,
  Search,
  Settings,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { IconButton } from "@/components/ui/icon-button";

export default function HeaderLanding() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left Side: Logo + Navigation */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Student Hub</h1>
          </Link>

          {/* Large Dropdown Menus */}
          <nav className="flex items-center space-x-4 z-1">
            {/* Example Dropdown 1 */}
            <div className="relative group">
              <button className="text-lg font-medium text-gray-700 hover:text-indigo-600">
                Courses
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  href="/courses/math"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Mathematics
                </Link>
                <Link
                  href="/courses/science"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Science
                </Link>
                <Link
                  href="/courses/history"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  History
                </Link>
              </div>
            </div>

            {/* Example Dropdown 2 */}
            <div className="relative group">
              <button className="text-lg font-medium text-gray-700 hover:text-indigo-600">
                Resources
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  href="/resources/books"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Books
                </Link>
                <Link
                  href="/resources/videos"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Videos
                </Link>
                <Link
                  href="/resources/tools"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Tools
                </Link>
              </div>
            </div>

            {/* Example Dropdown 3 */}
            <div className="relative group">
              <button className="text-lg font-medium text-gray-700 hover:text-indigo-600">
                Community
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  href="/community/forums"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Forums
                </Link>
                <Link
                  href="/community/events"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Events
                </Link>
                <Link
                  href="/community/groups"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Study Groups
                </Link>
              </div>
            </div>
          </nav>

          {/* Normal Links */}
          <nav className="flex items-center space-x-4">
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Right Side: Search + Buttons */}
        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              aria-label="Search everything"
              placeholder="Search everything..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Link href="/upload">
              <IconButton label="Upload">
                <Upload className="w-5 h-5" />
              </IconButton>
            </Link>
            <Link href="/download">
              <IconButton label="Download">
                <Download className="w-5 h-5" />
              </IconButton>
            </Link>
            <Link href="/settings">
              <IconButton label="Settings">
                <Settings className="w-5 h-5" />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
