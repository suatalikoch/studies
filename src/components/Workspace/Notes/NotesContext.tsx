"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Note, NotesContextType } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({
  children,
  initialNotes,
}: {
  children: ReactNode;
  initialNotes: Note[];
}) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, _setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isEditing, setIsEditing] = useState(false);
  const [history, setHistory] = useState<Record<string, Note[]>>({});
  const [future, setFuture] = useState<Record<string, Note[]>>({});

  const addNote = async (user_id: string) => {
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
      color: "#fef3c7",
    };

    const { data, error } = await createClient()
      .from("notes")
      .insert([newNote])
      .select();

    if (error) {
      toast.error("Failed to add note!", {
        duration: 5000,
        position: "bottom-right",
        richColors: true,
        closeButton: true,
        action: {
          label: "Close",
          onClick: () => console.log("Closed toast."),
        },
      });

      return;
    }

    const insertedNote = data[0];
    setNotes((prev) => [insertedNote, ...prev]);
    _setSelectedNote(insertedNote);
    setIsEditing(true);
    toast.success("Note added successfully!", {
      duration: 5000,
      position: "bottom-right",
      richColors: true,
      closeButton: true,
      action: {
        label: "Close",
        onClick: () => console.log("Closed toast."),
      },
    });
  };

  const saveNote = async (note: Note) => {
    setHistory((prev) => ({
      ...prev,
      [note.id]: [...(prev[note.id] || []), note],
    }));

    setFuture((prev) => ({ ...prev, [note.id]: [] }));

    const updatedNote = { ...note, updated_at: new Date().toISOString() };

    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );

    _setSelectedNote(updatedNote);
    setIsEditing(false);

    await createClient()
      .from("notes")
      .update(updatedNote)
      .eq("id", updatedNote.id);

    toast.success("Note saved successfully!", {
      duration: 5000,
      position: "bottom-right",
      richColors: true,
      closeButton: true,
      action: {
        label: "Close",
        onClick: () => console.log("Closed toast."),
      },
    });
  };

  const undo = (id: string) => {
    if (!history[id] || history[id].length === 0) return;

    const prevHistory = history[id];
    const prevVersion = prevHistory[prevHistory.length - 1];
    const currentNote = selectedNote;

    setHistory((prev) => ({
      ...prev,
      [id]: prev[id].slice(0, -1),
    }));

    setFuture((prev) => ({
      ...prev,
      [id]: [currentNote!, ...(prev[id] || [])],
    }));

    setNotes((prev) => prev.map((n) => (n.id === id ? prevVersion : n)));

    if (selectedNote?.id === id) _setSelectedNote(prevVersion);

    toast.success("Undo applied!", {
      duration: 5000,
      position: "bottom-right",
      richColors: true,
      closeButton: true,
      action: {
        label: "Close",
        onClick: () => console.log("Closed toast."),
      },
    });
  };

  const redo = (id: string) => {
    if (!future[id] || future[id].length === 0) return;

    const nextVersion = future[id][0];
    const currentNote = selectedNote;

    setFuture((prev) => ({
      ...prev,
      [id]: prev[id].slice(1),
    }));

    setHistory((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), currentNote!],
    }));

    setNotes((prev) => prev.map((n) => (n.id === id ? nextVersion : n)));
    if (selectedNote?.id === id) _setSelectedNote(nextVersion);
    toast.success("Redo applied!", {
      duration: 5000,
      position: "bottom-right",
      richColors: true,
      closeButton: true,
      action: {
        label: "Close",
        onClick: () => console.log("Closed toast."),
      },
    });
  };

  const deleteNote = async (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (selectedNote?.id === id) _setSelectedNote(null);

    await createClient().from("notes").delete().eq("id", id);
    toast.success("Note deleted successfully!", {
      duration: 5000,
      position: "bottom-right",
      richColors: true,
      closeButton: true,
      action: {
        label: "Close",
        onClick: () => console.log("Closed toast."),
      },
    });
  };

  const toggleFavorite = (id: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_favourite: !n.is_favourite } : n
      )
    );
  };

  const trackChange = (note: Note | null) => {
    if (!note) {
      _setSelectedNote(null);
      return;
    }

    if (selectedNote && selectedNote.id === note.id) {
      setHistory((prev) => ({
        ...prev,
        [note.id]: [...(prev[note.id] || []), selectedNote],
      }));
      setFuture((prev) => ({ ...prev, [note.id]: [] }));
    }

    _setSelectedNote(note);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNote,
        setSelectedNote: trackChange,
        addNote,
        saveNote,
        deleteNote,
        toggleFavorite,
        undo,
        redo,
        searchTerm,
        setSearchTerm,
        viewMode,
        setViewMode,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used inside NotesProvider");
  return ctx;
}
