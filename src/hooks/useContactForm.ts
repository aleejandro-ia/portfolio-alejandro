import { useState, useCallback, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
import { ContactFormData, FormStatus } from "../types/forms";
import { validateContactForm } from "../utils/validation";

const TIMEOUT_MS = 15000;

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
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
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

        clearTimeout(timeoutId);

        if (!isMounted.current) return;

        if (response.ok) {
          setFormStatus("sent");
          setFormData({ name: "", email: "", message: "" });
          
          // Trigger success callback after showing "Sent" status for a bit
          setTimeout(() => {
            if (isMounted.current) {
              onSuccess?.();
              // Give some time for the modal to start closing before resetting to idle
              setTimeout(() => {
                if (isMounted.current) setFormStatus("idle");
              }, 500);
            }
          }, 2000);
        } else {
          let errorMessage = "Error al enviar el mensaje. Por favor, intenta de nuevo.";
          let fieldErrors: Record<string, string> = {};

          try {
            const errorData = await response.json();
            if (errorData?.fieldErrors && Array.isArray(errorData.fieldErrors)) {
              errorData.fieldErrors.forEach((fe: { field: string; message: string }) => {
                fieldErrors[fe.field] = fe.message;
              });
            } else if (errorData?.error) {
              errorMessage = errorData.error;
            }
          } catch (e) {
            // If JSON parsing fails, we already have a default errorMessage
            console.error("Could not parse error response:", e);
          }

          setFormStatus("error");
          setErrors(
            Object.keys(fieldErrors).length > 0
              ? fieldErrors
              : { submit: errorMessage }
          );
          
          setTimeout(() => {
            if (isMounted.current) setFormStatus("idle");
          }, 4000);
        }
      } catch (error) {
        clearTimeout(timeoutId);
        console.error("Error sending contact form:", error);

        if (!isMounted.current) return;

        setFormStatus("error");
        
        if (error instanceof Error && error.name === "AbortError") {
          setErrors({
            submit: "La solicitud tardó demasiado. Por favor, comprueba tu conexión e intenta de nuevo.",
          });
        } else {
          setErrors({
            submit: "Error de conexión. Por favor, intenta de nuevo o envía un email directamente.",
          });
        }

        setTimeout(() => {
          if (isMounted.current) setFormStatus("idle");
        }, 4000);
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
