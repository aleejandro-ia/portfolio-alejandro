export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = "idle" | "sending" | "sent" | "error";

export interface FormValidationError {
  field: keyof ContactFormData;
  message: string;
}

export interface FormValidationResult {
  valid: boolean;
  errors?: FormValidationError[];
}
