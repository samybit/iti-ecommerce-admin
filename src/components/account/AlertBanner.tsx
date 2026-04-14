import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

interface AlertBannerProps {
  type: "success" | "error";
  msg: string;
  onClose: () => void;
}

export function AlertBanner({ type, msg, onClose }: AlertBannerProps) {
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm font-medium shadow-sm ${
        isSuccess
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      <HugeiconsIcon
        icon={isSuccess ? CheckmarkCircle02Icon : AlertCircleIcon}
        className="mt-0.5 h-5 w-5 shrink-0"
      />
      <span className="flex-1">{msg}</span>
      <button
        onClick={onClose}
        className="ml-auto opacity-60 transition-opacity hover:opacity-100"
        aria-label="Close"
      >
        <HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" />
      </button>
    </div>
  );
}
