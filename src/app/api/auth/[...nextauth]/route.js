import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        // ==========================================
        // 🚨 TEMPORARY DEV BYPASS - REMOVE BEFORE PRODUCTION 🚨
        // ==========================================
        if (credentials.email === "dev@test.com" && credentials.password === "dev") {
          console.log("⚠️ DEV BYPASS ACTIVATED: Logging in with mock user ⚠️");
          return {
            id: "000000000000000000000000", // Fake MongoDB ObjectId
            name: "Dev Teammate",
            email: "dev@test.com",
            role: "super Admin"
          };
        }
        // ==========================================


        // --- THE DEBUG TRAP STARTS HERE ---
        console.log("--- DEBUG START ---");
        console.log("1. EMAIL TYPED:", `"${credentials.email}"`);
        console.log("2. PASSWORD TYPED:", `"${credentials.password}"`);

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        console.log("3. MONGOOSE FOUND USER:", user ? "YES!" : "NULL");

        if (!user) {
          console.log("--- DEBUG END (USER NOT FOUND) ---");
          throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        console.log("4. PASSWORDS MATCH:", isMatch ? "YES!" : "NO");
        console.log("--- DEBUG END ---");
        // --- THE DEBUG TRAP ENDS HERE ---

        if (!isMatch) throw new Error("Invalid email or password");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
