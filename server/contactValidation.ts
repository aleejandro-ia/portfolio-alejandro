const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;

type ContactField = "name" | "email" | "message";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactValidationError {
  field: ContactField;
  message: string;
}

interface ContactValidationResult {
  valid: boolean;
  errors?: ContactValidationError[];
}

function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateContactForm(data: ContactFormData): ContactValidationResult {
  const errors: ContactValidationError[] = [];

  if (!data.name.trim()) {
    errors.push({
      field: "name",
      message: "El nombre es requerido",
    });
  }

  if (!data.email.trim()) {
    errors.push({
      field: "email",
      message: "El correo es requerido",
    });
  } else if (!validateEmail(data.email)) {
    errors.push({
      field: "email",
      message: "El correo no es válido",
    });
  }

  if (!data.message.trim()) {
    errors.push({
      field: "message",
      message: "El mensaje es requerido",
    });
  } else if (data.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.push({
      field: "message",
      message: `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres`,
    });
  } else if (data.message.length > MAX_MESSAGE_LENGTH) {
    errors.push({
      field: "message",
      message: `El mensaje no puede exceder ${MAX_MESSAGE_LENGTH} caracteres`,
    });
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}
