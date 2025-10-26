export type Post = {
  id: number;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
};
