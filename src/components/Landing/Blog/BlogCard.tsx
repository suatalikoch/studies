import { BlogCardProps } from "@/types/blog";
import Link from "next/link";

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div
      key={post.id}
      className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition border"
    >
      <Link href={`/blog/${post.id}`}>
        <h2 className="text-2xl font-semibold text-indigo-600 hover:underline">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 mt-2">{post.excerpt}</p>
      <div className="flex justify-between items-center mt-4">
        <time dateTime={post.date} className="text-sm text-gray-500">
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
    </div>
  );
}
