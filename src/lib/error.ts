import { toast } from "react-toastify";

export function showError(error: Error) {
  console.error("An error occurred:::::::", error);
  toast.error(error?.message || "An unexpected error occurred");
}
