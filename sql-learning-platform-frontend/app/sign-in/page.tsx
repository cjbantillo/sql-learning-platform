"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith("@carsu.edu.ph")) {
      setError("Only @carsu.edu.ph emails allowed");
      return;
    }
    // Fake auth
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-black">
      <Card className="w-full max-w-md p-8 bg-green-950/50 backdrop-blur border-green-700">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          CSU Digital Academy
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-green-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@carsu.edu.ph"
              required
              className="bg-green-900/50 border-green-600 text-white"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
          >
            Sign In (Magic Link Later)
          </Button>
        </form>
        <p className="text-green-300 text-center mt-6 text-sm">
          Restricted to Caraga State University students
        </p>
      </Card>
    </div>
  );
}
