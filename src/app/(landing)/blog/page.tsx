import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building a Notes App with Next.js & Supabase",
    excerpt:
      "A step-by-step walkthrough of how I created a notes dashboard using Next.js, TailwindCSS, and Supabase.",
    date: "2025-08-15",
    tags: ["Next.js", "Supabase", "Tailwind"],
  },
  {
    id: 2,
    title: "Why TypeScript Makes Your Life Easier",
    excerpt:
      "Exploring how TypeScript improves developer experience, prevents bugs, and helps scale large projects.",
    date: "2025-08-10",
    tags: ["TypeScript", "Best Practices"],
  },
  {
    id: 3,
    title: "UI/UX Lessons Learned from Building Study Apps",
    excerpt:
      "While designing my student-focused study dashboard, I discovered a few key UI/UX lessons worth sharing.",
    date: "2025-08-05",
    tags: ["UI/UX", "Design", "Productivity"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Blog
        </h1>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border"
            >
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-semibold text-indigo-600 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mt-2">{post.excerpt}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
