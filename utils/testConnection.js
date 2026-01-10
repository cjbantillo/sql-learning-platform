import { supabase } from "../lib/supabase";

export async function testSupabaseConnection() {
  console.log("🔍 Testing Supabase connection...");

  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from("lessons")
      .select("id")
      .limit(1);

    if (error) {
      console.error("❌ Connection test failed:", error.message);
      return { success: false, error };
    }

    console.log("✅ Supabase connection successful!");
    console.log("   Project URL:", import.meta.env.VITE_SUPABASE_URL);
    return { success: true, data };
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return { success: false, error: err };
  }
}

// Usage in your main.js or App.vue:
// import { testSupabaseConnection } from './utils/testConnection'
// testSupabaseConnection()

// -----------------------------
// 5. Basic CRUD Examples
// -----------------------------

// Example 1: Fetch all lessons
export async function fetchLessons() {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching lessons:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

// Example 2: Fetch single lesson with exercises
export async function fetchLessonById(lessonId) {
  const { data, error } = await supabase
    .from("lessons")
    .select(
      `
      *,
      exercises (
        id,
        title,
        description,
        difficulty,
        points
      )
    `
    )
    .eq("id", lessonId)
    .single();

  if (error) {
    console.error("Error fetching lesson:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

// Example 3: Create a new lesson (admin only)
export async function createLesson(lessonData) {
  const { data, error } = await supabase
    .from("lessons")
    .insert({
      title: lessonData.title,
      description: lessonData.description,
      content: lessonData.content,
      difficulty: lessonData.difficulty,
      is_published: lessonData.is_published || false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating lesson:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

// Example 4: Update lesson
export async function updateLesson(lessonId, updates) {
  const { data, error } = await supabase
    .from("lessons")
    .update(updates)
    .eq("id", lessonId)
    .select()
    .single();

  if (error) {
    console.error("Error updating lesson:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

// Example 5: Delete lesson
export async function deleteLesson(lessonId) {
  const { error } = await supabase.from("lessons").delete().eq("id", lessonId);

  if (error) {
    console.error("Error deleting lesson:", error);
    return { error };
  }

  return { error: null };
}

// -----------------------------
// 6. Authentication Examples
// -----------------------------

// Sign up
export async function signUp(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

// Sign in
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    return { error };
  }

  return { error: null };
}

// Get current user
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Get user error:", error);
    return { user: null, error };
  }

  return { user, error: null };
}

// Listen to auth changes
export function onAuthStateChange(callback) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  return subscription;
}

// -----------------------------
// 7. Real-time Subscriptions
// -----------------------------

// Subscribe to lessons changes
export function subscribeToLessons(callback) {
  const channel = supabase
    .channel("lessons_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "lessons",
      },
      (payload) => {
        console.log("Lesson changed:", payload);
        callback(payload);
      }
    )
    .subscribe();

  return channel;
}

// Unsubscribe
export function unsubscribe(channel) {
  supabase.removeChannel(channel);
}

// -----------------------------
// 8. File Upload Examples
// -----------------------------

// Upload user avatar
export async function uploadAvatar(userId, file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Math.random()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error);
    return { data: null, error };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return { data: { path: filePath, url: publicUrl }, error: null };
}
