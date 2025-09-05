// pages/api/auth/google-social-callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react'; // For calling NextAuth.js signIn

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!; // Not strictly needed here, but good practice to have.

export default async function googleSocialCallback(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { code, state, error, error_description } = req.query;

  if (error) {
    console.error("Google OAuth Error:", error_description || error);
    // Redirect to login page with error
    return res.redirect(`/auth/login?error=${encodeURIComponent(error_description || String(error))}`);
  }

  if (!code || typeof code !== 'string') {
    console.error("No code received from Google.");
    return res.redirect('/auth/login?error=no_google_code');
  }

  console.log("Received code from Google:", code);

  try {
    // 1. Send the Google 'code' to your backend's /auth/social endpoint
    const backendResponse = await fetch(`${API_URL}/auth/social`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code,
        provider: "google", // Your backend expects "google"
      }),
    });

    const backendResult = await backendResponse.json();
    console.log("Backend social login response:", {
      status: backendResponse.status,
      result: backendResult,
    });

    if (backendResponse.ok && backendResult.user && backendResult.access_token) {
      // 2. Use the backend's access_token and user data to sign in with NextAuth.js
      // We will use the CredentialsProvider for this, passing the data we got from backend.
      // Note: signIn() in an API route *redirects* the user to complete the sign-in.
      // The `redirect: false` will prevent the default redirect and let us handle it.
      const signInResponse = await signIn("credentials", {
        redirect: false, // Prevent NextAuth.js from redirecting immediately
        backendAccessToken: backendResult.access_token,
        backendUser: JSON.stringify(backendResult.user), // Stringify complex object
        // The callbackUrl here is where NextAuth.js will redirect the user
        // *after* the credentials provider has successfully authorized.
        callbackUrl: "/", // Or wherever you want to redirect after successful login
      });

      if (signInResponse?.error) {
        console.error("NextAuth signIn error:", signInResponse.error);
        return res.redirect(`/auth/login?error=${encodeURIComponent(signInResponse.error)}`);
      }

      // If signIn was successful, NextAuth.js has set cookies and we can now redirect
      return res.redirect(signInResponse?.url || "/");

    } else {
      console.error("Backend social login failed:", backendResult.message || "Unknown error");
      return res.redirect(`/auth/login?error=${encodeURIComponent(backendResult.message || "Backend social login failed")}`);
    }

  } catch (error) {
    console.error("Error during Google social login callback:", error);
    return res.redirect(`/auth/login?error=${encodeURIComponent("An unexpected error occurred during social login.")}`);
  }
}