"use client";

import { JSX, useEffect, useState } from "react";
import {
  User,
  Lock,
  Bell,
  Moon,
  Trash2,
  Image,
  Mail,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Tab } from "@/types";

export default function SettingsClient() {
  const user = useUser();
  const router = useRouter();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Profile states
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Security states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState({
    assignments: true,
    deadlines: true,
    updates: false,
  });

  // Appearance
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.full_name || "");
      setEmail(user.email || "");
      setTwoFactorAuth(user.user_metadata?.two_factor_auth || false);
      setNotifications(user.user_metadata?.notifications || notifications);
      setDarkMode(user.user_metadata?.dark_mode || false);
      setAvatar(user.user_metadata?.avatar_url || null);
    }
  }, [user, notifications]);

  // Handlers
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${
      (await supabase.auth.getUser())?.data?.user?.id
    }.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage
      .from("avatars") // your storage bucket name
      .upload(filePath, file, { upsert: true });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        setLoading(true);
        setError(null);

        const { data, error: getUserError } = await supabase.auth.getUser();

        if (getUserError || !data?.user) throw new Error("Not authenticated!");

        const userId = data.user.id;

        const response = await fetch("/api/deleteUser", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const result = await response.json();

        if (!response.ok)
          throw new Error(result.error || "Failed to delete account");

        //router.push("/auth/logout");
        router.push("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error) || "Unexpected error!");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let avatarUrl = avatar;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      // Update auth user metadata and email
      const updates = {
        data: {
          full_name: name,
          two_factor_auth: twoFactorAuth,
          notifications,
          dark_mode: darkMode,
          avatar_url: avatarUrl,
        },
        email,
      };

      // If password change requested
      if (currentPassword && newPassword) {
        if (!supabase.auth.getUser()) {
          throw new Error("User not authenticated");
        }
        // Change password - Supabase requires separate call
        const { error: passErr } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (passErr) throw passErr;
      } else if (currentPassword || newPassword) {
        throw new Error(
          "To change password, fill both current and new password"
        );
      }

      // Update user metadata and email
      const { error } = await supabase.auth.updateUser({
        email,
        data: updates.data,
      });

      if (error) {
        throw error;
      }

      setSuccess("Settings saved successfully!");
      setCurrentPassword("");
      setNewPassword("");

      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error) || "Unexpected error!");
      }
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: JSX.Element }[] = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Lock className="w-5 h-5" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Moon className="w-5 h-5" />,
    },
    {
      id: "danger",
      label: "Danger Zone",
      icon: <Trash2 className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-indigo-100 mt-1">
          Manage your preferences and account.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <nav className="flex md:flex-col border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 rounded-t-xl md:rounded-t-none md:rounded-l-xl">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-4 md:py-5 md:px-6 border-transparent border-b-4 md:border-b-0 md:border-l-4
                ${
                  activeTab === id
                    ? "border-indigo-600 bg-white font-semibold text-indigo-700"
                    : "hover:bg-gray-100 text-gray-600"
                }
                transition-all`}
              aria-current={activeTab === id ? "page" : undefined}
            >
              <span
                className={`${
                  activeTab === id ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                {icon}
              </span>
              <span className="whitespace-nowrap">{label}</span>
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="p-6 flex-1">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Show global error or success */}
            {error && (
              <div className="mb-4 text-red-600 font-semibold">{error}</div>
            )}

            {success && (
              <div className="mb-4 text-green-600 font-semibold">{success}</div>
            )}
            {activeTab === "profile" && (
              <>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                  <User className="w-6 h-6 text-indigo-600" /> Profile
                  Information
                </h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <label
                    className={`bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Change Avatar
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                      disabled={loading}
                    />
                  </label>
                </div>
                <div className="space-y-5 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <span className="px-3 text-gray-400">
                        <Mail className="w-5 h-5" />
                      </span>
                      <input
                        type="email"
                        className="flex-1 px-3 py-2 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                  <Lock className="w-6 h-6 text-indigo-600" /> Security
                </h2>
                <div className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={loading}
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      disabled={loading}
                    />
                    <span className="text-gray-700 flex items-center gap-1">
                      <Shield className="w-4 h-4 text-indigo-600" /> Enable
                      Two-Factor Authentication
                    </span>
                  </label>
                </div>
              </>
            )}

            {activeTab === "notifications" && (
              <>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                  <Bell className="w-6 h-6 text-indigo-600" /> Notifications
                </h2>
                <div className="space-y-4 max-w-md">
                  {Object.entries(notifications).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotifications((prev) => ({
                            ...prev,
                            [key]: e.target.checked,
                          }))
                        }
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        disabled={loading}
                      />
                      <span className="text-gray-700 capitalize">
                        {key} notifications
                      </span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {activeTab === "appearance" && (
              <>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                  <Moon className="w-6 h-6 text-indigo-600" /> Appearance
                </h2>
                <label className="flex items-center gap-3 cursor-pointer select-none max-w-md">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    disabled={loading}
                  />
                  <span className="text-gray-700">Enable Dark Mode</span>
                </label>
              </>
            )}

            {activeTab === "danger" && (
              <>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6 text-red-600">
                  <Trash2 className="w-6 h-6" /> Danger Zone
                </h2>
                <p className="max-w-lg mb-6 text-gray-600">
                  Be careful! Actions here are irreversible.
                </p>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                  disabled={loading}
                >
                  Delete My Account
                </button>
              </>
            )}

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
