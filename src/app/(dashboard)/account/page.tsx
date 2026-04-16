"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  User03Icon,
  LockPasswordIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { AlertBanner } from "@/components/account/AlertBanner";
import { ProfileTab } from "@/components/account/ProfileTab";
import { SecurityTab } from "@/components/account/SecurityTab";
import { useAccountSettings } from "@/hooks/useAccountSettings";

const getInitials = (name: string) =>
  name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "AD";

export default function AccountPage() {
  const {
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
    clearAlert,
  } = useAccountSettings();

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <HugeiconsIcon
          icon={Loading03Icon}
          className="h-8 w-8 animate-spin text-primary"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile and security
        </p>
      </div>

      {/* User Summary Card */}
      <Card className="overflow-hidden border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/10">
              <AvatarFallback className="bg-primary text-lg font-bold text-primary-foreground">
                {getInitials(profileEdit.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-semibold">{profileEdit.name}</p>
              <p className="text-sm text-muted-foreground">
                {profileEdit.email}
              </p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {user?.role || "admin"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Banner */}
      {alert && (
        <AlertBanner type={alert.type} msg={alert.msg} onClose={clearAlert} />
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile" className="gap-2">
            <HugeiconsIcon icon={User03Icon} className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <HugeiconsIcon icon={LockPasswordIcon} className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <ProfileTab
            profile={profileEdit}
            setProfile={setProfileEdit}
            onSave={handleProfileSave}
            loading={loadingProfile}
            role={user?.role ?? undefined}
          />
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <SecurityTab
            passwords={passwords}
            setPasswords={setPasswords}
            onPasswordSave={handlePasswordSave}
            loading={loadingPassword}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
