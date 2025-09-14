"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { QRCodeSVG } from "qrcode.react";

interface ShareNoteProps {
  noteId: string;
  isPublic: boolean;
  allowedUsers?: string[];
  onClose: () => void; // close the modal
}

export default function ShareNote({
  noteId,
  isPublic: initialPublic,
  allowedUsers: initialUsers = [],
  onClose,
}: ShareNoteProps) {
  const [isPublic, setIsPublic] = useState(initialPublic);
  const [showQR, setShowQR] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [emailInput, setEmailInput] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(`${window.location.origin}/notes/${noteId}`);
  }, [noteId]);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const togglePublic = async () => {
    const newStatus = !isPublic;
    setIsPublic(newStatus);

    const { error } = await createClient()
      .from("notes")
      .update({ isPublic: newStatus })
      .eq("id", noteId);

    if (error) {
      toast.error("Failed to update note visibility.");
      setIsPublic(!newStatus);
    } else {
      toast.success(`Note is now ${newStatus ? "public" : "private"}`);
    }
  };

  const addUser = async () => {
    const email = emailInput.trim();
    if (!email || users.includes(email)) return;

    const newUsers = [...users, email];
    setUsers(newUsers);
    setEmailInput("");

    const { error } = await createClient()
      .from("notes")
      .update({ allowedUsers: newUsers })
      .eq("id", noteId);

    if (error) {
      toast.error("Failed to add user.");
      setUsers(users);
    } else {
      toast.success(`${email} added to allowed users.`);
    }
  };

  const removeUser = async (email: string) => {
    const newUsers = users.filter((u) => u !== email);
    setUsers(newUsers);

    const { error } = await createClient()
      .from("notes")
      .update({ allowedUsers: newUsers })
      .eq("id", noteId);

    if (error) {
      toast.error("Failed to remove user.");
      setUsers(users);
    } else {
      toast.success(`${email} removed.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md relative space-y-4">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-5 right-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-xl font-bold"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold">Share Note</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 border rounded px-2 py-1 bg-gray-100 dark:bg-gray-700"
          />
          <button
            onClick={copyLink}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" checked={isPublic} onChange={togglePublic} />
            <span>{isPublic ? "Public" : "Private"}</span>
          </label>
        </div>
        {!isPublic && (
          <div className="space-y-2">
            <h3 className="font-medium">Allowed Users</h3>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="user@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 border rounded px-2 py-1 bg-gray-100 dark:bg-gray-700"
              />
              <button
                onClick={addUser}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
            <ul className="space-y-1 max-h-40 overflow-y-auto">
              {users.map((email) => (
                <li
                  key={email}
                  className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                >
                  <span>{email}</span>
                  <button
                    onClick={() => removeUser(email)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={() => setShowQR(!showQR)}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {showQR ? "Hide QR Code" : "Show QR Code"}
        </button>
        {showQR && (
          <div className="mt-4 flex justify-center">
            <QRCodeSVG value={shareUrl} size={256} />
          </div>
        )}
      </div>
    </div>
  );
}
