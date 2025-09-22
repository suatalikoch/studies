"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button, Input, QRCode } from "@/components/UI";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-neutral-950 p-6 rounded-lg w-[90%] max-w-md relative space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Share Note</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X />
          </Button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Input type="text" value={shareUrl} readOnly />
          <Button
            variant="destructive"
            size="sm"
            onClick={copyLink}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Copy
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Input type="checkbox" checked={isPublic} onChange={togglePublic} />
            <span>{isPublic ? "Public" : "Private"}</span>
          </label>
        </div>
        {!isPublic && (
          <div className="flex flex-col gap-2">
            <h3>Allowed Users</h3>
            <div className="flex flex-row items-center gap-2">
              <Input
                type="email"
                placeholder="user@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={addUser}
                className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
              >
                Add
              </Button>
            </div>
            <ul className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {users.map((uuid, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center rounded-md gap-2"
                >
                  <span className="w-full bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-md">
                    {userEmails[uuid] || "errorfetchingemail@gmail.com"}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeUser(userEmails[uuid])}
                    className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button onClick={() => setShowQR(!showQR)}>
          {showQR ? "Hide QR Code" : "Show QR Code"}
        </Button>
        {showQR && (
          <div className="mt-4 flex justify-center">
            <QRCode
              data={shareUrl}
              className="w-64 h-64 bg-neutral-100 dark:bg-neutral-800 p-4 rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
