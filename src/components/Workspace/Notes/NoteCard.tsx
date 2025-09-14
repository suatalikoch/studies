import { useState } from "react";
import { useRouter } from "next/navigation";
import { NoteCardProps } from "@/types";
import { Star } from "lucide-react";
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
import ShareNote from "./ShareNote";

export default function NoteCard({
  note,
  viewMode,
  onToggleFavorite,
}: NoteCardProps) {
  const router = useRouter();

  const [shareOpen, setShareOpen] = useState(false);

  const subjectColors: Record<string, string> = {
    General: "#be1e1eff",
    Work: "#1765ccff",
    Personal: "#79e459ff",
    School: "#6860e2ff",
  };

  const color = note.color || subjectColors[note.subject] || "#ffffff";
  const maxTags = 3;
  const bannerSizePx = 16;

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
          onClick={() => router.push(`/notes/${note.id}`)}
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
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
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
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>

      {shareOpen && (
        <ShareNote
          noteId={note.id}
          isPublic={note.is_public}
          onClose={() => setShareOpen(false)}
        />
      )}
    </ContextMenu>
  );
}
