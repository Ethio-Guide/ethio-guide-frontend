// // "use client";

// // import { useEffect } from "react";
// // import { useRouter } from "next/router";
// // import { signIn } from "next-auth/react";

// // const AuthCallbackPage = () => {
// //   const router = useRouter();
// //   const { code } = router.query;

// //   useEffect(() => {
// //     if (!code) return;

// //     const authenticateWithBackend = async () => {
// //       const res = await signIn("credentials", {
// //         redirect: false,
// //         provider: "google",
// //         code: code,
// //       });

// //       if (res?.error) {
// //         router.push("/auth/error");
// //       } else if (res?.url) {
// //         router.push(res.url);
// //       } else {
// //         router.push("/dashboard");
// //       }
// //     };

// //     authenticateWithBackend();
// //   }, [code, router]);

// //   return <div className="flex justify-center items-center h-screen">Authenticating...</div>;
// // };

// // export default AuthCallbackPage;

// "use client";

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const AuthCallbackPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const code = searchParams.get("code");
//   const state = searchParams.get("state");

//   useEffect(() => {
//     if (!code) return;

//     const authenticateWithBackend = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/social`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               provider: "google",
//               code,
//               redirect_uri: `${window.location.origin}/auth/callback/google`,
//             }),
//           }
//         );

//         const data = await res.json();
//         console.log("Backend response:", data);

//         if (res.ok && data.access_token) {
//           // save token (later you may integrate NextAuth session here)
//           localStorage.setItem("access_token", data.access_token);

//           // redirect to dashboard (or callbackUrl if provided)
//           router.push("user/dashboard");
//         } else {
//           console.error("Auth failed:", data.message);
//           router.push("/auth/error");
//         }
//       } catch (err) {
//         console.error("Callback error:", err);
//         router.push("/auth/error");
//       }
//     };

//     authenticateWithBackend();
//   }, [code, router]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       Authenticating...
//     </div>
//   );
// };

// export default AuthCallbackPage;
