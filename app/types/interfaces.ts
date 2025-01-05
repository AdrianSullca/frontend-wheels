export type ValidationErrors = Record<string, string>;

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
}

export interface Announcement {
  id: number;
  user_id: number;
  title: string;
  price: string;
  description?: string | undefined;
  kilometers?: string | undefined;
  brand?: string | undefined;
  model?: string | undefined;
  year?: string | undefined;
  photoUrls: string[];
  user: {
    created_at: string;
    name: string;
  };
  state?: string | undefined;
  created_at?: string;
  updated_at?: string;
}
