import { motion, AnimatePresence } from "framer-motion";
import { ToastProps } from "@/types";

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className={`px-6 py-3 rounded-lg shadow-lg border text-sm font-medium flex items-center gap-2
        ${
          toast.type === "success"
            ? "bg-green-500 border-green-400 text-white"
            : toast.type === "info"
            ? "bg-blue-500 border-blue-400 text-white"
            : "bg-red-500 border-red-400 text-white"
        }
      `}
          >
            {toast.type === "success" && (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {toast.type === "info" && (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12a9 9 0 0115-6.7M3 12h6m-6 0l3-3m-3 3l3 3"
                />
              </svg>
            )}
            {toast.type === "error" && (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span>{toast.message}</span>
            <button
              className="ml-3 text-white hover:text-gray-200"
              onClick={() => removeToast(toast.id)}
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
