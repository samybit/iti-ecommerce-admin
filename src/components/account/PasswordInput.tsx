import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons";
import React from "react";
import { PasswordInputProps } from "@/types/account";

export function PasswordInput({
  label,
  value,
  onChange,
  placeholder = "••••••••",
  showStrength = false,
  strength = 0,
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          tabIndex={-1}
        >
          <HugeiconsIcon
            icon={visible ? ViewOffIcon : ViewIcon}
            className="h-4 w-4"
          />
        </button>
      </div>
      {showStrength && value && (
        <div className="mt-2 space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i <= strength
                    ? strength === 1
                      ? "bg-red-500"
                      : strength === 2
                        ? "bg-orange-400"
                        : strength === 3
                          ? "bg-yellow-400"
                          : "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Password strength:{" "}
            <span className="font-medium">
              {["", "Weak", "Fair", "Good", "Strong"][strength]}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
