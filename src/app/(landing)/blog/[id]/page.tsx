import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/constants";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) return notFound();

  return (
    <div className="px-3 sm:px-6 py-6 sm:py-12">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-950 rounded-lg shadow-md p-8 space-y-6">
        <Link
          href="/blog"
          className="text-indigo-600 dark:text-indigo-500 hover:underline"
        >
          ← Back to Blog
        </Link>

        <h1 className="sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>

        <div className="sm:flex justify-between items-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-400 sm:text-lg leading-relaxed">
          {post.excerpt}
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          🚀 More content coming soon… This is a demo of the blog detail page.
        </p>
      </div>
    </div>
  );
}
