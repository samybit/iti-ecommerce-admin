"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockPasswordIcon, Loading03Icon } from "@hugeicons/core-free-icons";
import { PasswordInput } from "./PasswordInput";
import { SecurityTabProps } from "@/types/account";

const getStrength = (pwd: string) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  return score;
};

export function SecurityTab({
  passwords,
  setPasswords,
  onPasswordSave,
  loading,
}: SecurityTabProps) {
  const strength = getStrength(passwords.newPass);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Use a strong and unique password for better security.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onPasswordSave} className="space-y-5">
            <PasswordInput
              label="Current Password"
              value={passwords.current}
              onChange={(v) => setPasswords((p) => ({ ...p, current: v }))}
              placeholder="Enter current password"
            />
            <PasswordInput
              label="New Password"
              value={passwords.newPass}
              onChange={(v) => setPasswords((p) => ({ ...p, newPass: v }))}
              placeholder="Min. 8 characters"
              showStrength
              strength={strength}
            />
            <PasswordInput
              label="Confirm New Password"
              value={passwords.confirm}
              onChange={(v) => setPasswords((p) => ({ ...p, confirm: v }))}
              placeholder="Repeat new password"
            />
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="h-4 w-4 animate-spin"
                />
              ) : (
                <HugeiconsIcon icon={LockPasswordIcon} className="h-4 w-4" />
              )}
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
