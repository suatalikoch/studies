"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks";
import { createClient } from "@/lib/supabase/client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/UI";
import ProfileTab from "@/components/Settings/ProfileTab";
import SecurityTab from "@/components/Settings/SecurityTab";
import NotificationsTab from "@/components/Settings/NotificationsTab";
import AppearanceTab from "@/components/Settings/AppearanceTab";
import DangerTab from "@/components/Settings/DangerTab";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function SettingsClient() {
  const { user } = useUser();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [notifications, setNotifications] = useState({
    assignments: true,
    deadlines: true,
    updates: false,
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (user === undefined) {
      setIsFetching(true);
    } else {
      if (user) {
        setName(user.user_metadata?.full_name || "");
        setEmail(user.email || "");
        setTwoFactorAuth(user.user_metadata?.two_factor_auth || false);
        setNotifications(user.user_metadata?.notifications || notifications);
        setDarkMode(user.user_metadata?.dark_mode || false);
        setAvatar(user.user_metadata?.avatar_url || null);
      }

      setIsFetching(false);
    }
  }, [user, notifications]);

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
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      throw error;
    }

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

      toast.success("Settings saved successfully!");

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

  return (
    <div className="flex-1 bg-white dark:bg-neutral-950 p-3 sm:p-4">
      <Card className="bg-primary mb-3 sm:mb-6">
        <CardContent>
          <h1 className="text-white text-lg sm:text-3xl font-bold">Settings</h1>
          <p className="text-white mt-0 sm:mt-1">
            Manage your preferences and account.
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 border-green-500 text-green-700">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSave} className="space-y-6">
            <Tabs defaultValue="profile">
              <TabsList className="mb-3 shadow-xs">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="danger">Danger Zone</TabsTrigger>
              </TabsList>
              <Card>
                <CardContent>
                  <TabsContent value="profile">
                    <ProfileTab
                      isFetching={isFetching}
                      avatar={avatar}
                      name={name}
                      email={email}
                      loading={loading}
                      setName={setName}
                      setEmail={setEmail}
                      handleAvatarChange={handleAvatarChange}
                    />
                  </TabsContent>
                  <TabsContent value="security">
                    <SecurityTab
                      currentPassword={currentPassword}
                      newPassword={newPassword}
                      twoFactorAuth={twoFactorAuth}
                      loading={loading}
                      setCurrentPassword={setCurrentPassword}
                      setNewPassword={setNewPassword}
                      setTwoFactorAuth={setTwoFactorAuth}
                    />
                  </TabsContent>
                  <TabsContent value="notifications">
                    <NotificationsTab
                      notifications={notifications}
                      setNotifications={setNotifications}
                      loading={loading}
                    />
                  </TabsContent>
                  <TabsContent value="appearance">
                    <AppearanceTab
                      darkMode={darkMode}
                      setDarkMode={setDarkMode}
                      loading={loading}
                    />
                  </TabsContent>
                  <TabsContent value="danger">
                    <DangerTab
                      handleDeleteAccount={handleDeleteAccount}
                      loading={loading}
                    />
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
            <div className="flex justify-end">
              <Button variant="default" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
