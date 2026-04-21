import { useState, useCallback, type ChangeEvent, type FormEvent } from "react";
import { ContactFormData, FormStatus } from "../types/forms";
import { validateContactForm } from "../utils/validation";

const TIMEOUT_MS = 10000;

export interface UseContactFormReturn {
  formData: ContactFormData;
  formStatus: FormStatus;
  errors: Record<string, string>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  reset: () => void;
}

export function useContactForm(onSuccess?: () => void): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const validation = validateContactForm(formData);
      if (!validation.valid) {
        const errorMap: Record<string, string> = {};
        validation.errors?.forEach((error) => {
          errorMap[error.field] = error.message;
        });
        setErrors(errorMap);
        return;
      }

      setFormStatus("sending");
      setErrors({});

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

        const response = await fetch(
          "/api/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              message: formData.message,
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeout);

        if (response.ok) {
          setFormStatus("sent");
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => {
            setFormStatus("idle");
            onSuccess?.();
          }, 2000);
        } else {
          const errorData = await response.json().catch(() => null);
          setFormStatus("error");
          const fieldErrors =
            errorData?.fieldErrors?.reduce?.(
              (acc: Record<string, string>, fieldError: { field: string; message: string }) => {
                acc[fieldError.field] = fieldError.message;
                return acc;
              },
              {}
            ) || {};

          setErrors(
            Object.keys(fieldErrors).length > 0
              ? fieldErrors
              : {
                  submit:
                    errorData?.error ||
                    "Error al enviar el mensaje. Por favor, intenta de nuevo.",
                }
          );
          setTimeout(() => setFormStatus("idle"), 3000);
        }
      } catch (error) {
        console.error("Error sending contact form:", error);

        if (error instanceof Error && error.name === "AbortError") {
          setErrors({
            submit:
              "La solicitud tardó demasiado. Por favor, intenta de nuevo.",
          });
        } else {
          setErrors({
            submit:
              "Error de conexión. Por favor, intenta de nuevo o envía un email directamente.",
          });
        }

        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 3000);
      }
    },
    [formData, onSuccess]
  );

  const reset = useCallback(() => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setFormStatus("idle");
  }, []);

  return {
    formData,
    formStatus,
    errors,
    handleChange,
    handleSubmit,
    reset,
  };
}
