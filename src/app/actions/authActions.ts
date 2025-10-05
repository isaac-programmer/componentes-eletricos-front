"use server";

import { cookies } from "next/headers";

export async function saveTokensToCookies(tokens: { accessToken: string; refreshToken: string }) {
  const cookieStore = await cookies();
  
  cookieStore.set("access_token", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  // cookieStore.set("refresh_token", tokens.refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   path: "/",
  // });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}