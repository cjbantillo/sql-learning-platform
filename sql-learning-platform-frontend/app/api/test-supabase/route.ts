import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return Response.json(
        { error: "Missing Supabase credentials in environment variables" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test connection by querying a table
    const { data, error, status } = await supabase
      .from("lessons")
      .select("count", { count: "exact" });

    if (error) {
      return Response.json(
        {
          error: error.message,
          details: error,
          connected: false,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        connected: true,
        message: "Successfully connected to Supabase!",
        data,
        status,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        error: String(error),
        connected: false,
      },
      { status: 500 }
    );
  }
}
