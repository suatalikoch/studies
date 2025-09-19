import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NoteCardProps } from "@/types";
import { Star } from "lucide-react";
import ShareNote from "./ShareNote";
import {
  Badge,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/UI";
import { createClient } from "@/lib/supabase/client";

export default function NoteCard({
  note,
  viewMode,
  onToggleFavorite,
  shared,
}: NoteCardProps) {
  const router = useRouter();

  const [shareOpen, setShareOpen] = useState(false);
  const [sharedUsers, setSharedUsers] = useState<
    { id: string; name: string; avatar_url?: string }[]
  >([]);

  const subjectColors: Record<string, string> = {
    General: "#be1e1eff",
    Work: "#1765ccff",
    Personal: "#79e459ff",
    School: "#6860e2ff",
  };

  const color = note.color || subjectColors[note.subject] || "#ffffff";
  const maxTags = 3;
  const bannerSizePx = 16;

  useEffect(() => {
    if (!note.shared_with || note.shared_with.length === 0) return;

    async function fetchUsers() {
      const { data, error } = await createClient().rpc("get_users_by_ids", {
        ids: note.shared_with,
      });

      if (!error && data) {
        setSharedUsers(data);
      } else if (error) {
        console.error("Error fetching shared users:", error.message);
      }
    }

    fetchUsers();
  }, [note.shared_with]);

  function getContrastYIQ(hexcolor: string) {
    hexcolor = hexcolor.replace("#", "");

    if (hexcolor.length === 3) {
      hexcolor = hexcolor
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(hexcolor.substring(0, 2), 16);
    const g = parseInt(hexcolor.substring(2, 4), 16);
    const b = parseInt(hexcolor.substring(4, 6), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? "black" : "white";
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          onClick={() => router.push(`/notes/${note.id}?from=notes`)}
          className={`rounded-lg cursor-pointer transition hover:shadow-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-600 ${
            viewMode === "list" ? "flex" : "flex flex-col"
          }`}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
          style={{
            backgroundImage:
              viewMode === "list"
                ? `linear-gradient(to right, ${color} ${bannerSizePx}px, transparent ${bannerSizePx}px)`
                : `linear-gradient(to bottom, ${color} ${bannerSizePx}px, transparent ${bannerSizePx}px)`,
            backgroundRepeat: "no-repeat",
            backgroundClip: "border-box",
          }}
        >
          <div
            className={`flex-shrink-0 ${viewMode === "list" ? "w-4" : "h-4"}`}
          ></div>
          <div className="h-full p-3 flex flex-col flex-1 min-w-0 justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {note.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(note.id);
                  }}
                  className="cursor-pointer"
                >
                  {note.is_favourite ? (
                    <Star
                      fill="currentColor"
                      stroke="none"
                      className="w-5 h-5 text-yellow-400"
                    />
                  ) : (
                    <Star
                      fill="currentColor"
                      stroke="none"
                      className="w-5 h-5 text-gray-300 hover:text-yellow-400 transition"
                    />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                {note.content}
              </p>
              {(!note.content || note.content.length === 0) && (
                <p className="text-xs text-gray-400 mt-1">
                  No content available
                </p>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                <Badge variant="secondary">{note.subject}</Badge>
                <span>{new Date(note.updated_at).toLocaleDateString()}</span>
              </div>
              {!shared ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {note.tags?.slice(0, maxTags).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {(!note.tags || note.tags.length === 0) && (
                    <Badge variant="outline" className="text-xs text-gray-400">
                      #{"No tags available"}
                    </Badge>
                  )}
                  {note.tags && note.tags.length > maxTags && (
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      style={{
                        backgroundColor: color,
                        color: getContrastYIQ(color),
                      }}
                    >
                      +{note.tags?.length - maxTags}
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="flex justify-between mt-1">
                  <div className="flex flex-wrap gap-1">
                    {note.tags?.slice(0, maxTags).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {(!note.tags || note.tags.length === 0) && (
                      <Badge
                        variant="outline"
                        className="text-xs text-gray-400"
                      >
                        #{"No tags available"}
                      </Badge>
                    )}
                    {note.tags && note.tags.length > maxTags && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: color,
                          color: getContrastYIQ(color),
                        }}
                      >
                        +{note.tags?.length - maxTags}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <img
                      src={"https://avatar.iran.liara.run/public/boy"}
                      alt={note.user_id || "Owner"}
                      className="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-52">
        <ContextMenuItem inset onClick={() => onToggleFavorite(note.id)}>
          {note.is_favourite ? "Remove from Favorites" : "Mark as Favorite"}
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => router.push(`/notes/${note.id}`)}>
          Open Note
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => router.refresh()}>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuSub>
              <ContextMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setShareOpen(true);
                }}
              >
                Share
              </ContextMenuItem>
            </ContextMenuSub>
            <ContextMenuItem>Save Page...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              variant="destructive"
              onClick={() => console.log("Note deleted successfully!")}
            >
              Delete
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuItem>
            <div className="flex flex-row items-center gap-1">
              <img
                src="https://avatar.iran.liara.run/public/boy"
                alt=""
                className="w-6 h-6"
              />
              <span>Suat Alikoch</span>
            </div>
          </ContextMenuItem>
          <ContextMenuItem>
            <div className="flex flex-row items-center gap-1">
              <img
                src="https://avatar.iran.liara.run/public/boy"
                alt=""
                className="w-6 h-6"
              />
              <span>Anton Dimitrov</span>
            </div>
          </ContextMenuItem>
        </ContextMenuRadioGroup>
        <ContextMenuRadioGroup value="">
          {note.shared_with && note.shared_with.length > 3 && (
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>More...</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                {sharedUsers.slice(0, 3).map((user) => (
                  <ContextMenuRadioItem key={user.id} value={user.id}>
                    <div className="flex flex-row justify-between">
                      <img
                        src="https://avatar.iran.liara.run/public/boy"
                        alt=""
                      />
                      {user.name}
                    </div>
                  </ContextMenuRadioItem>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>
          )}
        </ContextMenuRadioGroup>
      </ContextMenuContent>

      {shareOpen && (
        <ShareNote
          noteId={note.id}
          isPublic={note.is_public}
          allowedUsers={note.shared_with || []}
          onClose={() => setShareOpen(false)}
        />
      )}
    </ContextMenu>
  );
}
