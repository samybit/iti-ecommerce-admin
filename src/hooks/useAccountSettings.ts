import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Passwords, ProfileFormData } from "@/types/account";

export function useAccountSettings() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const user = session?.user;

  const [profileEdit, setProfileEdit] = useState<ProfileFormData>({
    name: "",
    email: "",
  });
  const [passwords, setPasswords] = useState<Passwords>({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (user) {
      setProfileEdit({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [status, user, router]);

  const showAlert = (type: "success" | "error", msg: string) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 4000);
  };

  const clearAlert = () => setAlert(null);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileEdit.name.trim() || !profileEdit.email.trim()) {
      showAlert("error", "Name and email are required.");
      return;
    }
    setLoadingProfile(true);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileEdit),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await update({ name: profileEdit.name, email: profileEdit.email });
      showAlert("success", "Profile updated successfully!");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      showAlert("error", errorMessage);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.current) {
      showAlert("error", "Enter your current password.");
      return;
    }
    if (passwords.newPass.length < 8) {
      showAlert("error", "Password must be at least 8 characters.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      showAlert("error", "Passwords do not match.");
      return;
    }
    setLoadingPassword(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.newPass,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPasswords({ current: "", newPass: "", confirm: "" });
      showAlert("success", "Password changed successfully!");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      showAlert("error", errorMessage);
    } finally {
      setLoadingPassword(false);
    }
  };

  return {
    status,
    user,
    profileEdit,
    setProfileEdit,
    passwords,
    setPasswords,
    loadingProfile,
    loadingPassword,
    alert,
    handleProfileSave,
    handlePasswordSave,
    showAlert,
    clearAlert,
  };
}
