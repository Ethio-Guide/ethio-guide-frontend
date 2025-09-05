import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;
  console.log("Google callback query:", { code, state });

  if (typeof code !== "string") {
    return res.redirect("/auth/error?error=NoCodeProvided");
  }
  console.log("Google code received:", code);
  console.log("Sending to backend:", {
  provider: "google",
  code,
});

  // Send code to backend
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/social`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider: "google",
      code,
    }),
  });

  const result = await response.json();
  console.log("Backend response:", { status: response.status, result });
  

  if (response.ok && result.access_token && result.user) {
    // Store backend response in query params to pass to NextAuth
    const callbackUrl = new URL(`${process.env.NEXTAUTH_URL}/api/auth/callback/google`);
    callbackUrl.searchParams.set("code", code);
    callbackUrl.searchParams.set("state", state as string);
    callbackUrl.searchParams.set("backend_user", JSON.stringify(result.user));
    callbackUrl.searchParams.set("backend_access_token", result.access_token);
    return res.redirect(callbackUrl.toString());
  } else {
    return res.redirect(`/auth/error?error=SocialLoginFailed&message=${encodeURIComponent(result.message || "Backend authentication failed")}`);
  }
}