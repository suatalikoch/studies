export interface Notification {
  id: string;
  user_id: string;
  type?: string;
  message: string;
  link?: string;
  is_read: boolean;
  updated_at: string;
  created_at: string;
}
