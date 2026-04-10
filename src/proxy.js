import authMiddleware from "next-auth/middleware";

// Explicitly export a function to satisfy the Next.js 16+ compiler
export default function proxy(request, event) {
  return authMiddleware(request, event);
}

export const config = {
  // Protect every route except /login, api routes, and static assets
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};