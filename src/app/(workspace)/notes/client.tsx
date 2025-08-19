"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { List, Grid } from "lucide-react";
import { Note } from "@/types";
import { useToast } from "@/hooks/useToast";
import { Badge, Button, Input, Label, Textarea } from "@/components/UI";
import MarkdownRenderer from "./markdown";
import Toast from "./toast";

export default function NotesClient({
  user_id,
  notes,
}: {
  user_id: string;
  notes: Note[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [notesState, setNotesState] = useState<Note[]>(notes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [draftContent, setDraftContent] = useState("");
  const [draftTitle, setDraftTitle] = useState("");
  const [draftSubject, setDraftSubject] = useState("");
  const [draftTags, setDraftTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState<Record<number, Note[]>>({});
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    if (selectedNote) {
      // Save initial version if not already saved
      setHistory((prev) => ({
        ...prev,
        [selectedNote.id]: prev[selectedNote.id]
          ? prev[selectedNote.id]
          : [selectedNote],
      }));

      setDraftContent(selectedNote.content || "");
      setDraftTitle(selectedNote.title || "");
      setDraftSubject(selectedNote.subject || "");
      setDraftTags(selectedNote.tags || []);
      setIsEditing(false);
    }
  }, [selectedNote]);

  useEffect(() => {
    if (!isEditing) return;
    const timeout = setTimeout(() => {
      if (
        draftSubject !== selectedNote?.subject ||
        draftContent !== selectedNote?.content
      ) {
        saveNote();
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [draftSubject, draftContent, selectedNote, isEditing]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === "x") {
          e.preventDefault();
          addNote();
        }
        if (e.key === "s" && isEditing) {
          e.preventDefault();
          saveNote();
        }
        if (e.key === "d" && selectedNote) {
          e.preventDefault();
          deleteNote(selectedNote.id);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    isEditing,
    selectedNote,
    draftContent,
    draftTitle,
    draftSubject,
    draftTags,
  ]);

  const toggleFavorite = async (noteId: number) => {
    const updatedNotes = notesState.map((note) =>
      note.id === noteId ? { ...note, is_favourite: !note.is_favourite } : note
    );
    setNotesState(updatedNotes);
    if (selectedNote?.id === noteId) {
      setSelectedNote((prev) =>
        prev ? { ...prev, is_favourite: !prev.is_favourite } : null
      );
    }
    const newFavourite = !notesState.find((n) => n.id === noteId)?.is_favourite;
    await createClient()
      .from("notes")
      .update({ is_favourite: newFavourite })
      .eq("id", noteId);
  };

  const saveNote = async () => {
    if (!selectedNote) return;

    // Add current version to history
    setHistory((prev) => ({
      ...prev,
      [selectedNote.id]: [...(prev[selectedNote.id] || []), selectedNote],
    }));

    const updatedNote = {
      ...selectedNote,
      content: draftContent,
      title: draftTitle,
      subject: draftSubject,
      tags: draftTags,
    };

    setNotesState((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
    setSelectedNote(updatedNote);
    setIsEditing(false);

    await createClient()
      .from("notes")
      .update(updatedNote)
      .eq("id", updatedNote.id);

    showToast("success", "Note saved successfully!");
  };

  const addNote = async () => {
    const newNote: Omit<Note, "id"> = {
      user_id,
      title: "Untitled Note",
      subject: "General",
      content: "",
      tags: [],
      status: "draft",
      priority: 3,
      is_favourite: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await createClient()
      .from("notes")
      .insert([newNote])
      .select();

    if (error) return console.error("Failed to add note:", error.message);
    const insertedNote = data[0];
    setNotesState((prev) => [insertedNote, ...prev]);
    setSelectedNote(insertedNote);
    setIsEditing(true);

    showToast("success", "Note added successfully!");
  };

  const deleteNote = async (noteId: number) => {
    const previousNotes = notesState;
    setNotesState((prev) => prev.filter((note) => note.id !== noteId));
    if (selectedNote?.id === noteId) setSelectedNote(null);

    try {
      await createClient().from("notes").delete().eq("id", noteId);
    } catch (error) {
      setNotesState(previousNotes);
      alert("Failed to delete note.");
      showToast("error", "Failed to delete note: " + error);
    }

    showToast("success", "Note deleted successfully!");
  };

  const addTag = (tag: string) => {
    if (!draftTags.includes(tag)) setDraftTags([...draftTags, tag]);
  };

  const removeTag = (tag: string) =>
    setDraftTags(draftTags.filter((t) => t !== tag));

  const filteredNotes = useMemo(
    () =>
      notesState.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags?.some((tag) => tag.includes(searchTerm.toLowerCase()))
      ),
    [notesState, searchTerm]
  );

  const undo = () => {
    if (!selectedNote) return;
    const noteHistory = history[selectedNote.id];
    if (!noteHistory || noteHistory.length === 0) return;

    const lastVersion = noteHistory[noteHistory.length - 1];

    // Remove last version from history
    setHistory((prev) => ({
      ...prev,
      [selectedNote.id]: prev[selectedNote.id].slice(0, -1),
    }));

    // Revert note
    setSelectedNote(lastVersion);
    setDraftContent(lastVersion.content ? lastVersion.content : "");
    setDraftTitle(lastVersion.title);
    setDraftSubject(lastVersion.subject);
    setDraftTags(lastVersion.tags ? lastVersion.tags : []);

    setNotesState((prev) =>
      prev.map((n) => (n.id === lastVersion.id ? lastVersion : n))
    );

    showToast("info", "Note reverted successfully!");
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {/* MODE 1: Notes List/Grid */}
      {!selectedNote && (
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b bg-white shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Notes</h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-sm"
              />
              <Button onClick={addNote}>+ Add</Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setViewMode((v) => (v === "list" ? "grid" : "list"))
                }
              >
                {viewMode === "list" ? (
                  <Grid className="w-5 h-5" />
                ) : (
                  <List className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          <div
            className={`flex-1 overflow-y-auto p-4 ${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-min"
                : "space-y-2"
            }`}
          >
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`p-3 h-34 rounded-lg cursor-pointer transition hover:shadow-lg bg-white border ${
                  viewMode === "list"
                    ? "hover:border-indigo-400"
                    : "h-40 flex flex-col"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {note.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(note.id);
                    }}
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
                <p className="text-sm text-gray-600 truncate mt-1">
                  {note.content}
                </p>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <Badge variant="secondary">{note.subject}</Badge>
                  <span>
                    {new Date(note.updated_at).toISOString().split("T")[0]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {note.tags?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODE 2: Editor */}
      {selectedNote && (
        <div className="flex flex-col h-full bg-white">
          <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white shadow-sm">
            <Button
              variant="outline"
              onClick={() => {
                if (isEditing && !confirm("Discard unsaved changes?")) {
                  return;
                }

                setSelectedNote(null);
              }}
            >
              ← Back
            </Button>

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="default"
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button onClick={undo} variant="outline">
                    Undo
                  </Button>
                  <Button onClick={saveNote} variant="default">
                    Save
                  </Button>
                </>
              )}
              <Button
                variant="destructive"
                onClick={() => deleteNote(selectedNote.id)}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex-1 overflow-auto flex flex-col gap-4">
            {/* Title */}
            {isEditing ? (
              <Input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="text-2xl font-bold"
              />
            ) : (
              <h1 className="text-2xl font-bold">{selectedNote.title}</h1>
            )}

            {/* Subject */}
            {isEditing ? (
              <Input
                value={draftSubject}
                onChange={(e) => setDraftSubject(e.target.value)}
                className="text-2xl"
              />
            ) : (
              <p className="text-sm text-gray-500">{selectedNote.subject}</p>
            )}

            {/* Content */}
            {!isEditing ? (
              <MarkdownRenderer content={draftContent} />
            ) : (
              <Textarea
                className="flex-1 resize-note"
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                readOnly={!isEditing}
              />
            )}

            {/* Tags */}
            {isEditing && (
              <div className="flex flex-wrap gap-2">
                <Label>Tags:</Label>
                {draftTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} &times;
                  </Badge>
                ))}
                <Input
                  placeholder="Add tag"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      addTag(e.currentTarget.value.trim().toLowerCase());
                      e.currentTarget.value = "";
                    }
                  }}
                  className="w-32"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback messages (Toasts) */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
