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
  isFavorite?: boolean
}

export interface Review {
  id: number;
  rating: string;
  valuator: User;
  rated_user_id: 2;
  comment: string;
  created_at: string;
  updated_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at?: string;
  updated_at?: string;
  phone_number: string;
  profile_picture_path: string;
  admin: 0;
  enabled: 1;
}

export interface Stats {
  announcements_count: number;
  reviews_count: number;
  total_favorites: number;
}

export interface UserInfo {
  user: User;
  stats: Stats;
}

export interface Favorite {
  id: number;
  user_id: number;
  announcement_id: number;
  created_at: string;
  updated_at: string;
}