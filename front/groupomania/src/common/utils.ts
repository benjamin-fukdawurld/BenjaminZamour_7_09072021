import PwdValidator from "password-validator";
import emailValidator from "email-validator";
import { ValidatorResult } from "../interfaces/ValidatorResult";

const pwdSchema = new PwdValidator();
pwdSchema
  .is()
  .min(6)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .is()
  .not()
  .oneOf(["Pa$$w0rd", "Pa$sw0rd", "Pas$w0rd"]);

export function checkPassword(password: string): ValidatorResult {
  const errors = pwdSchema.validate(password, { list: true });
  return { isValid: errors.length === 0, errors };
}

export function checkEmail(email: string): ValidatorResult {
  return { isValid: emailValidator.validate(email) };
}

export function formatPasswordErrorMessage(errors: string[]): string {
  let message = "";
  if (errors.includes("min")) {
    message += "Le mot de passe doit contenir au moins 6 caractères\n";
  }

  if (errors.includes("uppercase")) {
    message += "Le mot de passe doit contenir au moins une majuscule\n";
  }

  if (errors.includes("lowercase")) {
    message += "Le mot de passe doit contenir au moins une minuscule\n";
  }

  if (errors.includes("digits")) {
    message += "Le mot de passe doit contenir au moins un chiffre\n";
  }

  if (errors.includes("symbol")) {
    message += "Le mot de passe doit contenir au moins un caractère spécial\n";
  }

  return message;
}

export function getLoginErrors(login: string): string | null {
  const isValid = login.length > 1;
  if (!isValid) {
    return "Pseudonyme invalide";
  } else {
    return null;
  }
}

export function getPasswordErrors(password: string): string | null {
  const result = checkPassword(password);
  if (!result.isValid) {
    return formatPasswordErrorMessage(result.errors as string[]);
  } else {
    return null;
  }
}

export function getEmailErrors(email: string): string | null {
  const { isValid } = checkEmail(email);
  if (!isValid) {
    return "email invalide";
  } else {
    return null;
  }
}
