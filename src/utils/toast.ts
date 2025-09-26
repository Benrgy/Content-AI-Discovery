"use client";

import { toast } from "sonner";

console.log("toast.ts: Initializing toast utilities");

export const showSuccess = (message: string) => {
  console.log("toast.ts: showSuccess called with message:", message);
  toast.success(message, {
    duration: 4000,
  });
};

export const showError = (message: string) => {
  console.log("toast.ts: showError called with message:", message);
  toast.error(message, {
    duration: 5000,
  });
};

export const showInfo = (message: string) => {
  console.log("toast.ts: showInfo called with message:", message);
  toast.info(message, {
    duration: 3000,
  });
};

export const showWarning = (message: string) => {
  console.log("toast.ts: showWarning called with message:", message);
  toast.warning(message, {
    duration: 4000,
  });
};

export const showLoading = (message: string) => {
  console.log("toast.ts: showLoading called with message:", message);
  return toast.loading(message);
};

export const dismissToast = (toastId: string | number) => {
  console.log("toast.ts: dismissToast called with toastId:", toastId);
  toast.dismiss(toastId);
};

export const dismissAllToasts = () => {
  console.log("toast.ts: dismissAllToasts called");
  toast.dismiss();
};