"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FLOATING_BOXES = [
  { left: "10%", duration: "20s", delay: "0s", size: 48, isBlue: false },
  { left: "25%", duration: "25s", delay: "2s", size: 64, isBlue: true },
  { left: "45%", duration: "18s", delay: "5s", size: 40, isBlue: false },
  { left: "65%", duration: "22s", delay: "1s", size: 56, isBlue: false },
  { left: "85%", duration: "26s", delay: "4s", size: 48, isBlue: true },
  { left: "15%", duration: "19s", delay: "7s", size: 72, isBlue: false },
  { left: "35%", duration: "24s", delay: "9s", size: 32, isBlue: false },
  { left: "55%", duration: "21s", delay: "3s", size: 60, isBlue: true },
  { left: "75%", duration: "27s", delay: "6s", size: 44, isBlue: false },
  { left: "90%", duration: "23s", delay: "8s", size: 52, isBlue: false },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setIsLoading(false);
    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="relative flex flex-1 w-full min-h-screen items-center justify-center p-8 bg-black overflow-hidden">

      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {FLOATING_BOXES.map((box, i) => (
          <div
            key={i}
            className="absolute bottom-[-100px]"
            style={{
              left: box.left,
              animation: `floatUp ${box.duration} linear ${box.delay} infinite`,
            }}
          >
            {/* SVG Isometric Package */}
            <svg
              width={box.size}
              height={box.size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              // Applies #2563EB if it's a blue box, otherwise uses a subtle white
              className={box.isBlue ? "text-[#2563EB] opacity-60" : "text-white opacity-10"}
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
        ))}
      </div>

      {/* --- INLINE CSS FOR KEYFRAMES --- */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* --- FORM LAYER --- */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-8 rounded-lg shadow-2xl border border-gray-200 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Admin Login
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 mb-4 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-colors"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 mb-6 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-colors"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`cursor-pointer w-full bg-[#2563EB] text-white p-2 rounded-md font-medium hover:bg-blue-700 transition-colors
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}