export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

export type ToastProps = {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
};
