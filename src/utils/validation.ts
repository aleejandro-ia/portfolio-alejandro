import { ContactFormData, FormValidationResult } from "../types/forms";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateContactForm(
  data: ContactFormData
): FormValidationResult {
  const errors = [];

  if (!data.name.trim()) {
    errors.push({
      field: "name" as const,
      message: "El nombre es requerido",
    });
  }

  if (!data.email.trim()) {
    errors.push({
      field: "email" as const,
      message: "El correo es requerido",
    });
  } else if (!validateEmail(data.email)) {
    errors.push({
      field: "email" as const,
      message: "El correo no es válido",
    });
  }

  if (!data.message.trim()) {
    errors.push({
      field: "message" as const,
      message: "El mensaje es requerido",
    });
  } else if (data.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.push({
      field: "message" as const,
      message: `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres`,
    });
  } else if (data.message.length > MAX_MESSAGE_LENGTH) {
    errors.push({
      field: "message" as const,
      message: `El mensaje no puede exceder ${MAX_MESSAGE_LENGTH} caracteres`,
    });
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
