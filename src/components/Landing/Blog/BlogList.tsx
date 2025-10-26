import { blogPosts } from "@/lib/constants";
import BlogCard from "./BlogCard";

export default function BlogList() {
  return (
    <div className="flex flex-col gap-3 sm:gap-6">
      {blogPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
