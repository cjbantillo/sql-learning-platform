import { createClient } from "@supabase/supabase-js";

// Support both Next.js (NEXT_PUBLIC_*) and Vite (VITE_*) environment variables
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase credentials!");
  console.error("Make sure .env file exists with one of:");
  console.error(
    "- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (Next.js)"
  );
  console.error("- VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (Vite)");
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
