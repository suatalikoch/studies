import { Card, CardContent } from "@/components/UI";
import { BlogCardProps } from "@/types/blog";
import Link from "next/link";

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card key={post.id}>
      <CardContent>
        <Link href={`/blog/${post.id}`}>
          <h2 className="sm:text-2xl font-semibold text-primary hover:underline">
            {post.title}
          </h2>
        </Link>
        <p className="mt-2">{post.excerpt}</p>
        <div className="flex justify-between items-center mt-4">
          <time
            dateTime={post.date}
            className="text-xs sm:text-sm text-muted-foreground"
          >
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
      </CardContent>
    </Card>
  );
}
