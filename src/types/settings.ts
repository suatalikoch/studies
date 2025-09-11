export type ProfileTabProps = {
  isFetching: boolean;
  avatar: string | null;
  name: string;
  email: string;
  loading: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type SecurityTabProps = {
  currentPassword: string;
  newPassword: string;
  twoFactorAuth: boolean;
  loading: boolean;
  setCurrentPassword: (val: string) => void;
  setNewPassword: (val: string) => void;
  setTwoFactorAuth: (val: boolean) => void;
};

export type NotificationsTabProps = {
  notifications: { assignments: boolean; deadlines: boolean; updates: boolean };
  setNotifications: React.Dispatch<
    React.SetStateAction<{
      assignments: boolean;
      deadlines: boolean;
      updates: boolean;
    }>
  >;
  loading: boolean;
};

export type AppearanceTabProps = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  loading: boolean;
};

export type DangerTabProps = {
  handleDeleteAccount: () => void;
  loading: boolean;
};
