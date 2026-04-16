import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Local Dev Mock",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password", placeholder: "admin" },
      },
      async authorize(credentials) {

        // 🚨 100% HARDCODED MOCK LOGIN - NO MONGODB 🚨
        if (credentials.email === "admin@a.com" && credentials.password === "a") {
          console.log("Mock Login Successful - Bypassing Database");
          return {
            id: "mock-user-id-123",
            name: "Team Lead",
            email: "admin@local.dev",
            role: "super Admin",
          };
        }

        // If type anything other than admin/admin, reject it
        throw new Error("Use 'admin@a.com' for email and 'a' for password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  // fallback string guarantees NextAuth won't crash 
  // even if their .env.local file is missing
  secret: process.env.NEXTAUTH_SECRET || "temporary_local_dev_secret_key",
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
