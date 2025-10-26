"use client";

import Link from "next/link";
import { Button } from "@/components/UI";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AnnouncementBar() {
  const title = new String("Our first user conference").toUpperCase();
  const date = new Date("OCT 3 2025").toDateString().toUpperCase();
  const location = new String(
    "Guillermo Rauch, Dylan Field, and More"
  ).toUpperCase();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (dismissed) setIsVisible(false);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div
      id="broadcast-bar"
      className="flex justify-between items-center p-4 border-b"
    >
      <div className="flex-1 flex justify-between items-center px-32">
        <Link
          href="#"
          className="text-lg text-center hover:text-neutral-500 hover:dark:text-neutral-400 transition-colors duration-300"
        >
          Announcement
        </Link>
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
        <p className="text-xs text-muted-foreground">{location}</p>
        <div className="relative">
          <Link href="#">
            <Button className="text-primary bg-primary/10 hover:bg-primary/20 dark:bg-primary/15 dark:hover:bg-primary/30 rounded-none border border-dashed border-primary/50 hover:border-primary transition-colors duration-300">
              Save your seat
            </Button>
          </Link>
          <Plus
            size={10}
            className="absolute top-0 left-0 translate-[-50%] text-primary"
          />
          <Plus
            size={10}
            className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] text-primary"
          />
          <Plus
            size={10}
            className="absolute bottom-0 left-0 translate-x-[-50%] translate-y-[50%] text-primary"
          />
          <Plus
            size={10}
            className="absolute bottom-0 right-0 translate-[50%] text-primary"
          />
        </div>
      </div>
      <div>
        <Button variant="ghost" size="icon" onClick={handleDismiss}>
          <X size={16} className="text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
