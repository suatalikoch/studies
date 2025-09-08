import BlogList from "@/components/Landing/Blog/BlogList";

export default function BlogClient() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
          Blog
        </h1>
        <BlogList />
      </div>
    </div>
  );
}
