import { Badge } from "@/components/UI";
import { NoteCardProps } from "@/types";

export default function NoteCard({
  note,
  viewMode,
  onSelect,
  onToggleFavorite,
}: NoteCardProps) {
  const subjectColors: Record<string, string> = {
    General: "#be1e1eff",
    Work: "#1765ccff",
    Personal: "#79e459ff",
    School: "#6860e2ff",
  };

  const color = note.color || subjectColors[note.subject] || "#ffffff";
  const maxTags = 3;

  function getContrastYIQ(hexcolor: string) {
    // Remove hash if present
    hexcolor = hexcolor.replace("#", "");

    // Convert 3-digit hex to 6-digit
    if (hexcolor.length === 3) {
      hexcolor = hexcolor
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(hexcolor.substring(0, 2), 16);
    const g = parseInt(hexcolor.substring(2, 4), 16);
    const b = parseInt(hexcolor.substring(4, 6), 16);

    // Calculate YIQ (brightness)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;

    return yiq >= 128 ? "black" : "white";
  }

  return (
    <div
      onClick={() => onSelect(note)}
      className={`rounded-lg cursor-pointer transition hover:shadow-lg bg-white border border border-gray-200 ${
        viewMode === "list" ? "flex" : "flex flex-col"
      }`}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
    >
      {/* Color Bar */}
      <div
        className={`flex-shrink-0 ${
          viewMode === "list" ? "w-4 rounded-l-lg" : "h-4 rounded-t-lg"
        }`}
        style={{ backgroundColor: color }}
      ></div>

      <div className="h-full p-3 flex flex-col flex-1 min-w-0 justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 truncate">
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
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-300 hover:text-yellow-400 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-600 truncate mt-1">{note.content}</p>

          {/* Show placeholder only if no content */}
          {(!note.content || note.content.length === 0) && (
            <p className="text-xs text-gray-400 mt-1">No content available</p>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <Badge variant="secondary">{note.subject}</Badge>
            <span>{new Date(note.updated_at).toISOString().split("T")[0]}</span>
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
                style={{ backgroundColor: color, color: getContrastYIQ(color) }}
              >
                +{note.tags?.length - maxTags}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
