"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { QRCode } from "@/components/UI";

interface ShareNoteProps {
  noteId: string;
  isPublic: boolean;
  allowedUsers?: string[];
  onClose: () => void;
}

export default function ShareNote({
  noteId,
  isPublic: initialPublic,
  allowedUsers: initialUsers = [],
  onClose,
}: ShareNoteProps) {
  const router = useRouter();

  const [isPublic, setIsPublic] = useState(initialPublic);
  const [showQR, setShowQR] = useState(false);
  const [users, setUsers] = useState<string[]>([]);
  const [userEmails, setUserEmails] = useState<Record<string, string>>({});
  const [emailInput, setEmailInput] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const origin = window.location.origin.replace("localhost", "192.168.0.106");
    setShareUrl(`${origin}/notes/${noteId}`);
  }, [noteId]);

  useEffect(() => {
    async function fetchSharedUsers() {
      const { data, error } = await createClient()
        .from("notes")
        .select("shared_with")
        .eq("id", noteId)
        .single();

      if (error || !data) {
        console.error("Failed to fetch shared users:", error?.message);
        return;
      }

      setUsers([...new Set([...(data.shared_with || []), ...initialUsers])]);
    }

    fetchSharedUsers();
  }, [noteId, initialUsers]);

  useEffect(() => {
    async function fetchUserEmails() {
      if (users.length === 0) return;

      const { data, error } = await createClient()
        .from("auth.users")
        .select("id, email")
        .in("id", users);

      if (error) {
        toast.error("Failed to fetch user emails: " + error.message);
        return;
      }

      const map: Record<string, string> = {};
      data.forEach((u: { id: string; email: string }) => {
        map[u.id] = u.email;
      });
      setUserEmails(map);
    }

    fetchUserEmails();
  }, [users]);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const togglePublic = async () => {
    const newStatus = !isPublic;
    setIsPublic(newStatus);

    const { error } = await createClient()
      .from("notes")
      .update({ is_public: newStatus })
      .eq("id", noteId);

    if (error) {
      toast.error("Failed to update note visibility.");
      setIsPublic(!newStatus);
    } else {
      toast.success(`Note is now ${newStatus ? "public" : "private"}`);
      router.refresh();
    }
  };

  const addUser = async () => {
    const email = emailInput.trim();
    if (!email) return;

    const { data: userId, error: rpcError } = await createClient().rpc(
      "get_user_id_by_email",
      { email }
    );

    if (rpcError) {
      toast.error("Failed to lookup user: " + rpcError.message);
      return;
    }

    if (!userId) {
      toast.error("No user found with that email.");
      return;
    }

    if (users.includes(userId)) {
      toast.error("User already has access.");
      return;
    }

    const newUsers = [...users, userId];

    const { error: updateError } = await createClient()
      .from("notes")
      .update({ shared_with: newUsers })
      .eq("id", noteId);

    if (updateError) {
      toast.error("Failed to add user: " + updateError.message);
      return;
    }

    setUsers(newUsers);
    setUserEmails((prev) => ({ ...prev, [userId]: email }));
    setEmailInput("");
    toast.success(`${email} added to allowed users.`);
  };

  const removeUser = async (email: string) => {
    if (!email) return;

    const { data: userId, error: rpcError } = await createClient().rpc(
      "get_user_id_by_email",
      { email }
    );

    if (rpcError) {
      toast.error("Failed to lookup user: " + rpcError.message);
      return;
    }

    if (!userId) {
      toast.error("No user found with that email.");
      return;
    }

    if (!users.includes(userId)) {
      toast.error("User does not have access.");
      return;
    }

    const newUsers = users.filter((u) => u !== userId);

    const { error: updateError } = await createClient()
      .from("notes")
      .update({ shared_with: newUsers })
      .eq("id", noteId);

    if (updateError) {
      toast.error("Failed to remove user: " + updateError.message);
      return;
    }

    setUsers(newUsers);
    setUserEmails((prev) => {
      const copy = { ...prev };
      delete copy[userId];
      return copy;
    });
    toast.success(`${email} removed from allowed users.`);
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
              {users.map((uuid, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                >
                  <span>{userEmails[uuid]}</span>
                  <button
                    onClick={() => removeUser(userEmails[uuid])}
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
            <QRCode
              data={shareUrl}
              className="w-64 h-64 bg-gray-50 dark:bg-gray-950 p-4 rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
