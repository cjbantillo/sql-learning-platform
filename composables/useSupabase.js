import { ref, onUnmounted } from "vue";
import { supabase } from "../lib/supabase";

export function useSupabase() {
  const loading = ref(false);
  const error = ref(null);

  async function execute(fn) {
    loading.value = true;
    error.value = null;

    try {
      const result = await fn();
      return result;
    } catch (err) {
      error.value = err;
      console.error("Supabase error:", err);
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    execute,
    supabase,
  };
}

// Usage in component:
/*
<script setup>
import { useSupabase } from '@/composables/useSupabase'

const { loading, error, execute } = useSupabase()

const lessons = ref([])

async function loadLessons() {
  const result = await execute(async () => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
    
    if (error) throw error
    return data
  })
  
  if (result) {
    lessons.value = result
  }
}
</script>
*/

// -----------------------------
// 10. Error Handling Utility
// -----------------------------

export function handleSupabaseError(error) {
  if (!error) return null;

  const errorMessages = {
    "Invalid login credentials": "Invalid email or password",
    "Email not confirmed": "Please check your email to confirm your account",
    "User already registered": "An account with this email already exists",
    "JWT expired": "Your session has expired. Please login again",
  };

  const message =
    errorMessages[error.message] ||
    error.message ||
    "An unexpected error occurred";

  console.error("Supabase error:", {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });

  return {
    message,
    original: error,
  };
}

// Usage:
/*
const { error } = await signIn(email, password)
if (error) {
  const userError = handleSupabaseError(error)
  alert(userError.message)
}
*/
