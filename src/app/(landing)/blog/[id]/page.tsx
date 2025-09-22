import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/constants";
import { Card, CardContent } from "@/components/UI";
import { Rocket } from "lucide-react";

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
      <Card>
        <CardContent>
          <div className="space-y-6">
            <Link href="/blog" className="text-primary hover:underline">
              ← Back to Blog
            </Link>

            <h1 className="sm:text-4xl font-bold">{post.title}</h1>

            <div className="sm:flex justify-between items-center text-muted-foreground text-xs sm:text-sm">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString()}
              </time>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="sm:text-lg leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center gap-2">
              <Rocket className="text-muted-foreground" />
              <p className="text-muted-foreground text-xs sm:text-sm">
                More content coming soon… This is a demo of the blog detail
                page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
