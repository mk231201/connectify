"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSercret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User not logged in");
  if (!apiKey) throw new Error("No API Key");
  if (!apiSercret) throw new Error("No API Sercret");

  const client = new StreamClient(apiKey, apiSercret);

  // This exp means that the token will expire in 60 minutes
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  // This issued means that the token was created at least 60 seconds ago
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user?.id, exp, issued);
  return token;
};
