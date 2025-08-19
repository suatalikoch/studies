import { Metadata } from "next";
import BlogClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Blog",
};

export default function BlogPage() {
  return <BlogClient />;
}
