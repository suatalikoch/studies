export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export interface BlogCardProps {
  post: BlogPost;
}
