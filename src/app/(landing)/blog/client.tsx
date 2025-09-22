import BlogList from "@/components/Landing/Blog/BlogList";

export default function BlogClient() {
  return (
    <div className="px-3 sm:px-6 py-6 sm:py-12">
      <h1 className="text-xl sm:text-4xl font-bold mb-8 text-center">Blog</h1>
      <BlogList />
    </div>
  );
}
