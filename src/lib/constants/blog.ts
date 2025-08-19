import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
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
