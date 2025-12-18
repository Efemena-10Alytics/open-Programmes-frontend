import { useCallback } from "react";

export const usePasswordValidation = () => {
  const validatePassword = useCallback((password = "") => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      //   number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    };

    const isValid = Object.values(checks).every(Boolean);

    return { checks, isValid };
  }, []);

  return validatePassword;
};
