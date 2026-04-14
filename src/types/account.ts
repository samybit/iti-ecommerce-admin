export interface ProfileFormData {
  name: string;
  email: string;
}

export interface Passwords {
  current: string;
  newPass: string;
  confirm: string;
}

export interface AlertState {
  type: "success" | "error";
  msg: string;
}

export interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showStrength?: boolean;
  strength?: number; // 0-4
}

export interface ProfileTabProps {
  profile: ProfileFormData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  onSave: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  role?: string;
}

export interface SecurityTabProps {
  passwords: Passwords;
  setPasswords: React.Dispatch<React.SetStateAction<Passwords>>;
  onPasswordSave: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}
