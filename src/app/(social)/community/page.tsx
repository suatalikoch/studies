"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  Input,
  Textarea,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/UI";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Send,
  Ellipsis,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Comment = {
  id: number;
  author: string;
  handle: string;
  text: string;
  time: string;
};

type Post = {
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

type ToastPayload = {
  id: number;
  postId: number;
  kind: "upvote" | "downvote";
  prevCounts: {
    upvotes: number;
    downvotes: number;
  };
};

type LockedPostsState = Record<number, boolean>;

type TrendingItem = {
  id: string;
  topic: string;
  tweets: string;
};

type PopularUser = {
  id: string;
  name: string;
  handle: string;
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "John Doe",
      handle: "johndoe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
      time: "2h",
      content: "What's your favourite study technique? Share tips!",
      upvotes: 12,
      downvotes: 1,
      comments: [
        {
          id: 11,
          author: "Alice",
          handle: "alice",
          text: "Active recall + spaced repetition.",
          time: "1h",
        },
        {
          id: 12,
          author: "Bob",
          handle: "bob",
          text: "Pomodoro + handwritten notes.",
          time: "45m",
        },
      ],
    },
    {
      id: 2,
      author: "Coder123",
      handle: "coder123",
      avatar: "https://ui-avatars.com/api/?name=Coder+123&background=random",
      time: "5h",
      content: "Launched my first React app today 🚀 — feeling excited!",
      upvotes: 7,
      downvotes: 0,
      comments: [
        {
          id: 21,
          author: "DevGal",
          handle: "devgal",
          text: "Congrats! Share a link when ready :)",
          time: "4h",
        },
      ],
    },
  ]);

  const [newPostText, setNewPostText] = useState<string>("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [toast, setToast] = useState<ToastPayload | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const [lockedPosts, setLockedPosts] = useState<LockedPostsState>({});

  const findPost = (id: number) => posts.find((p) => p.id === id);

  const clearToast = () => {
    if (toastTimerRef.current !== null)
      window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = null;
    setToast(null);
    setLockedPosts((prev) => {
      const copy = { ...prev };
      if (toast && copy[toast.postId]) delete copy[toast.postId];
      return copy;
    });
  };

  const finalizeToast = () => {
    if (toastTimerRef.current !== null)
      window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = null;
    setToast(null);
    setLockedPosts((prev) => {
      const copy = { ...prev };
      if (toast && copy[toast.postId]) delete copy[toast.postId];
      return copy;
    });
  };

  const startToast = (payload: ToastPayload) => {
    if (toast && toast.postId !== payload.postId) finalizeToast();
    setToast(payload);
    setLockedPosts((prev) => ({ ...prev, [payload.postId]: true }));

    if (toastTimerRef.current !== null)
      window.clearTimeout(toastTimerRef.current);

    toastTimerRef.current = window.setTimeout(() => finalizeToast(), 4000);
  };

  const handleUpvote = (postId: number) => {
    if (lockedPosts[postId]) return;
    const post = findPost(postId);
    if (!post) return;

    const prevCounts = { upvotes: post.upvotes, downvotes: post.downvotes };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
    startToast({ id: Date.now(), postId, kind: "upvote", prevCounts });
  };

  const handleDownvote = (postId: number) => {
    if (lockedPosts[postId]) return;
    const post = findPost(postId);
    if (!post) return;

    const prevCounts = { upvotes: post.upvotes, downvotes: post.downvotes };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, downvotes: p.downvotes + 1 } : p
      )
    );
    startToast({ id: Date.now(), postId, kind: "downvote", prevCounts });
  };

  const undoVote = () => {
    if (!toast) return;
    const { postId, prevCounts } = toast;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              upvotes: prevCounts.upvotes,
              downvotes: prevCounts.downvotes,
            }
          : p
      )
    );
    clearToast();
  };

  const handleCreatePost = () => {
    const trimmed = newPostText.trim();
    if (!trimmed) return;
    const newPost: Post = {
      id: Date.now(),
      author: "You",
      handle: "you",
      avatar: "https://ui-avatars.com/api/?name=You&background=random",
      time: "now",
      content: trimmed,
      upvotes: 0,
      downvotes: 0,
      comments: [],
    };
    setPosts((p) => [newPost, ...p]);
    setNewPostText("");
  };

  const openThread = (postId: number) => {
    setSelectedPostId(postId);
    setReplyText("");
    if (typeof document !== "undefined")
      document.body.style.overflow = "hidden";
  };

  const closeThread = () => {
    setSelectedPostId(null);
    setReplyText("");
    if (typeof document !== "undefined") document.body.style.overflow = "";
  };

  const postReply = (postId: number) => {
    const text = replyText.trim();
    if (!text) return;
    const newComment: Comment = {
      id: Date.now(),
      author: "You",
      handle: "you",
      text,
      time: "now",
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      )
    );
    setReplyText("");
  };

  const trending: TrendingItem[] = [
    { id: "t1", topic: "Exam Tips", tweets: "9.3K" },
    { id: "t2", topic: "React 19", tweets: "7.1K" },
    { id: "t3", topic: "Tailwind Tricks", tweets: "3.8K" },
  ];

  const popularUsers: PopularUser[] = [
    { id: "u1", name: "MaterialGal", handle: "matgal" },
    { id: "u2", name: "MrInvestor", handle: "investor" },
    { id: "u3", name: "DesignPro", handle: "designpro" },
  ];

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null)
        window.clearTimeout(toastTimerRef.current);
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex justify-center w-full mx-auto">
        <div className="w-full max-w-5xl lg:mx-0 lg:w-2/3 flex flex-col gap-4 pl-6">
          <div className="sticky top-0 z-10 border-b flex items-center gap-4 p-4 bg-background">
            <h2 className="text-xl font-bold">Community Feed</h2>
            <span className="text-sm text-muted-foreground">/ Home</span>
          </div>
          <Card className="border-none shadow-none">
            <CardContent className="flex gap-3 items-start">
              <Avatar>
                <AvatarImage src="https://ui-avatars.com/api/?name=You&background=random" />
              </Avatar>
              <div className="flex-1">
                <Textarea
                  rows={2}
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full resize-none"
                />
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setNewPostText((s) => s + " 🚀")}
                    >
                      🚀
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setNewPostText((s) => s + " ✨")}
                    >
                      ✨
                    </Button>
                  </div>
                  <Button size="sm" onClick={handleCreatePost}>
                    Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarImage src={post.avatar} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-semibold">{post.author}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          @{post.handle} · {post.time}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => alert("Soon!")}
                      >
                        <Ellipsis />
                      </Button>
                    </div>
                    <p className="mt-1">{post.content}</p>
                    <CardFooter className="px-0 flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openThread(post.id)}
                      >
                        <MessageCircle /> {post.comments.length}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpvote(post.id)}
                        disabled={!!lockedPosts[post.id]}
                      >
                        <ArrowUp /> {post.upvotes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownvote(post.id)}
                        disabled={!!lockedPosts[post.id]}
                      >
                        <ArrowDown /> {post.downvotes}
                      </Button>
                      <div className="ml-auto">
                        <Button variant="ghost" size="icon">
                          <Send />
                        </Button>
                      </div>
                    </CardFooter>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <aside className="hidden lg:block w-1/3 px-6">
          <div className="sticky top-4 space-y-4">
            <Input placeholder="Search community" />
            <Card>
              <CardContent className="space-y-3">
                <h3 className="font-semibold text-lg">What&apos;s trending</h3>
                {trending.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between p-2 rounded hover:bg-muted transition"
                  >
                    <div className="flex gap-3 items-center">
                      <Avatar className="rounded-lg">
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${t.topic}`}
                        />
                        <AvatarFallback>TX</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Trending
                        </div>
                        <div className="text-sm">{t.topic}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.tweets}
                    </div>
                  </div>
                ))}
                <Link
                  href="#"
                  className="text-sm text-primary hover:text-primary/75"
                >
                  Show more
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3">
                <h3 className="font-semibold text-lg">You might know</h3>
                {popularUsers.map((u) => (
                  <div key={u.id} className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            u.name
                          )}&background=random`}
                        />
                      </Avatar>
                      <div>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-sm text-muted-foreground">
                          @{u.handle}
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Follow</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
      {selectedPostId && (
        <Dialog open={!!selectedPostId} onOpenChange={closeThread}>
          <DialogContent
            className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            showCloseButton={false}
          >
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DialogTitle className="font-semibold">Thread</DialogTitle>
                  <div className="text-sm text-muted-foreground">Community</div>
                </div>
                <Button variant="ghost" size="icon" onClick={closeThread}>
                  ✕
                </Button>
              </div>
            </DialogHeader>
            {(() => {
              const post = findPost(selectedPostId);
              if (!post) return null;
              return (
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarImage src={post.avatar} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <span className="font-semibold">{post.author}</span>
                      <span className="text-sm text-muted-foreground">
                        @{post.handle} · {post.time}
                      </span>
                    </div>
                    <p className="mt-1">{post.content}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <MessageCircle size={18} /> {post.comments.length}
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp size={18} /> {post.upvotes}
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowDown size={18} /> {post.downvotes}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
            {findPost(selectedPostId)?.comments.map((c) => (
              <div key={c.id} className="flex gap-3 items-start">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      c.author
                    )}&background=random`}
                  />
                </Avatar>
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="font-medium">{c.author}</span>
                    <span className="text-sm text-muted-foreground">
                      @{c.handle} · {c.time}
                    </span>
                  </div>
                  <p className="mt-1">{c.text}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-3 items-start w-full">
              <Avatar>
                <AvatarImage src="https://ui-avatars.com/api/?name=You&background=random" />
              </Avatar>
              <div className="flex-1">
                <Textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Reply to this thread"
                  className="w-full resize-none"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button size="sm" onClick={() => postReply(selectedPostId)}>
                    Reply
                  </Button>
                  <Button size="sm" variant="outline" onClick={closeThread}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {toast && (
        <div aria-live="polite" className="fixed left-6 bottom-6 z-50">
          <div className="bg-muted px-4 py-2 rounded-full shadow flex items-center gap-4 pointer-events-auto min-w-[220px]">
            <span className="text-sm">
              {toast.kind === "upvote" ? "Upvoted" : "Downvoted"} · Undo?
            </span>
            <div className="flex gap-2">
              <Button size="sm" onClick={undoVote}>
                Undo
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => finalizeToast()}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
