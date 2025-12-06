const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!email) return "Email is required";
  if (!EMAIL_REGEX.test(email)) return "Invalid email format";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(password)) return "Password must contain lowercase letters";
  if (!/[A-Z]/.test(password)) return "Password must contain uppercase letters";
  if (!/\d/.test(password)) return "Password must contain numbers";
  if (!/[@$!%*?&]/.test(password)) return "Password must contain special characters (@$!%*?&)";
  return null;
}
