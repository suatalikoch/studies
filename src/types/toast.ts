export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

export type ToastProps = {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
};
