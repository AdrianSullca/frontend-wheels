import { RegisterFormData, ValidationErrors } from "../types/interfaces";

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;
const phoneRegex = /^[0-9]{9}$/;

export function validateLoginCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}): ValidationErrors | null {
  const validationErrors: ValidationErrors = {};

  if (!email) {
    validationErrors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    validationErrors.email = "Email is invalid";
  }

  if (!password) {
    validationErrors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    validationErrors.password =
      "The password needs to meet the complexity requirements";
  }

  return Object.keys(validationErrors).length > 0 ? validationErrors : null;
}

export function validateRegisterFormData(
  formData: RegisterFormData
): ValidationErrors | null {
  const validationErrors: ValidationErrors = {};

  if (!formData.name) {
    validationErrors.name = "Name and Surname are required";
  } else if (!nameRegex.test(formData.name)) {
    validationErrors.name =
      "Name and Surname should only contain letters and spaces";
  }

  if (!formData.email) {
    validationErrors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    validationErrors.email = "Email is invalid";
  }

  if (!formData.password) {
    validationErrors.password = "Password is required";
  } else if (!passwordRegex.test(formData.password)) {
    validationErrors.password =
      "The password needs to meet the complexity requirements";
  }

  if (!formData.password_confirmation) {
    validationErrors.password_confirmation = "Confirm Password is required";
  } else if (formData.password !== formData.password_confirmation) {
    validationErrors.password_confirmation = "Passwords do not match";
  }

  if (!formData.phone_number) {
    validationErrors.phone_number = "Phone number is required";
  } else if (!phoneRegex.test(formData.phone_number)) {
    validationErrors.phone_number = "Invalid phone number format";
  }

  return Object.keys(validationErrors).length > 0 ? validationErrors : null;
}
