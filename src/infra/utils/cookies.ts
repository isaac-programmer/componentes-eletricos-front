import {
  setCookie as set,
  deleteCookie as remove,
  hasCookie as has,
} from "cookies-next";

export interface CookieProps {
  key: string;
  value: string;
  expires: number;
}

function setCookie({ key, value, expires }: CookieProps) {
  const encodedValue = encodeURIComponent(value);

  const date = new Date();
  date.setTime(date.getTime() + (expires * 60 * 60 * 1000));

  const data = {
    key,
    value: encodedValue,
    endDate: date,
  };

  set(key, JSON.stringify(data), {
    expires: date,
    maxAge: expires * 60 * 60,
  });
}

function hasCookie(key: string) {
  return has(key);
}

function removeCookie(key: string) {
  remove(key);
}

export { setCookie, removeCookie, hasCookie };
