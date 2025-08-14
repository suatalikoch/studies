"use client";

import { useEffect, useState } from "react";
import { Note } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function NotesClient({
  user_id,
  notes,
}: {
  user_id: string;
  notes: Note[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [notesState, setNotesState] = useState<Note[]>(notes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(
    notes[0] || null
  );
  const [draftContent, setDraftContent] = useState(selectedNote?.content || "");
  const [draftTitle, setDraftTitle] = useState(selectedNote?.title || "");
  const [draftTags, setDraftTags] = useState<string[]>(
    selectedNote?.tags || []
  );

  useEffect(() => {
    setDraftContent(selectedNote?.content || "");
    setDraftTitle(selectedNote?.title || "");
    setDraftTags(selectedNote?.tags || []);
    setIsEditing(false);
  }, [selectedNote]);

  // Toggle favorite/star
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
    // Persist favorite change
    const note = notesState.find((n) => n.id === noteId);
    if (note) {
      await createClient()
        .from("notes")
        .update({ is_favourite: !note.is_favourite })
        .eq("id", noteId);
    }
  };

  const saveNote = async () => {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      content: draftContent,
      title: draftTitle,
      tags: draftTags,
    };

    const updatedNotes = notesState.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotesState(updatedNotes);
    setSelectedNote(updatedNote);
    setIsEditing(false);

    const { data, error } = await createClient()
      .from("notes")
      .update(updatedNote)
      .eq("id", selectedNote.id)
      .select();

    if (error) console.error("Failed to save note:", error.message);
  };

  const addNote = async () => {
    const newNote: Omit<Note, "id"> = {
      user_id: user_id,
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
  };

  const deleteNote = async (noteId: number) => {
    setNotesState((prev) => prev.filter((note) => note.id !== noteId));
    if (selectedNote?.id === noteId) setSelectedNote(null);

    const { error } = await createClient()
      .from("notes")
      .delete()
      .eq("id", noteId);
    if (error) console.error("Failed to delete note:", error.message);
  };

  const addTag = (tag: string) => {
    if (!draftTags.includes(tag)) setDraftTags([...draftTags, tag]);
  };

  const removeTag = (tag: string) => {
    setDraftTags(draftTags.filter((t) => t !== tag));
  };

  return (
    <div className="flex h-full overflow-hidden bg-gray-50">
      {/* Notes List */}
      <div className="w-1/3 max-w-128 border-r border-gray-200 flex flex-col bg-white shadow-sm">
        <div className="p-4 flex items-center justify-between sticky top-0 bg-white z-10 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Notes</h2>
          <div className="flex gap-2">
            <Button variant="default" onClick={addNote}>
              + Add
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedNote && deleteNote(selectedNote.id)}
              disabled={!selectedNote}
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {notesState.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-3 rounded-lg cursor-pointer transition hover:shadow-lg ${
                selectedNote?.id === note.id
                  ? "bg-indigo-100 border-l-4 border-indigo-600"
                  : "bg-white"
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
                <span>{new Date(note.updated_at).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {note.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    #{tag} &times;
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 bg-white flex flex-col">
        {selectedNote ? (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10 shadow-sm">
              <div className="flex-1 flex flex-col gap-2">
                {isEditing ? (
                  <Input
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    className="text-2xl font-bold"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {selectedNote.title}
                  </h1>
                )}
                <p className="text-sm text-gray-500">{selectedNote.subject}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleFavorite(selectedNote.id)}>
                  {selectedNote.is_favourite ? (
                    <svg
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-300 hover:text-yellow-400 transition"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  )}
                </button>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
                {isEditing && (
                  <Button onClick={saveNote} variant="default">
                    Save
                  </Button>
                )}
              </div>
            </div>

            <div className="p-4 flex-1 overflow-auto flex flex-col gap-4">
              <Textarea
                className="flex-1 resize-none"
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                readOnly={!isEditing}
                placeholder="Start typing your note..."
              />
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
                        addTag(e.currentTarget.value.trim());
                        e.currentTarget.value = "";
                      }
                    }}
                    className="w-32"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">
                Select a note to view
              </h3>
              <p>Choose a note from the list to start reading or editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
