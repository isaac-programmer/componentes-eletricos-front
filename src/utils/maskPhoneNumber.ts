import { mask } from "remask";

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return "-";

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
  }

  return phone;
};

export const handlePhoneChange = (newValue: string, oldValue: string): string => {
  let digits = newValue.replace(/\D/g, "");

  if (newValue.length < oldValue.length) {
    const oldDigits = oldValue.replace(/\D/g, "");
    if (oldDigits === digits && digits.length > 0) {
      digits = digits.slice(0, -1);
    }
  }

  return mask(digits, ["(99) 9 9999-9999"]);
};