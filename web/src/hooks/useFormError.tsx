import { useState } from "react";

interface FormError {
  error: boolean;
  message: string | null;
}

export default function useFormError(): [
  FormError,
  React.Dispatch<React.SetStateAction<FormError>>
] {
  const [formError, setFormError] = useState<FormError>({
    error: false,
    message: null,
  });

  return [formError, setFormError];
}
