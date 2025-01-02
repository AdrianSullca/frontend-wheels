export type ValidationErrors = Record<string, string>;

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string,
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
}
