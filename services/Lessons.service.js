import { supabase } from "../lib/supabase";

export class LessonsService {
  static async getAll(filters = {}) {
    let query = supabase.from("lessons").select("*");

    if (filters.difficulty) {
      query = query.eq("difficulty", filters.difficulty);
    }

    if (filters.isPublished !== undefined) {
      query = query.eq("is_published", filters.isPublished);
    }

    query = query.order("order_index", { ascending: true });

    const { data, error } = await query;

    return { data, error };
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("lessons")
      .select(
        `
        *,
        exercises (*)
      `
      )
      .eq("id", id)
      .single();

    return { data, error };
  }

  static async create(lesson) {
    const { data, error } = await supabase
      .from("lessons")
      .insert(lesson)
      .select()
      .single();

    return { data, error };
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from("lessons")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    return { data, error };
  }

  static async delete(id) {
    const { error } = await supabase.from("lessons").delete().eq("id", id);

    return { error };
  }

  static async search(query) {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(10);

    return { data, error };
  }
}

// -----------------------------
// 12. Vue Component Example
// -----------------------------
// File: src/components/LessonsList.vue
/*
<template>
  <div>
    <h1>Lessons</h1>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="lesson in lessons" :key="lesson.id" class="lesson-card">
        <h3>{{ lesson.title }}</h3>
        <p>{{ lesson.description }}</p>
        <span>{{ lesson.difficulty }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LessonsService } from '@/services/lessons.service'

const lessons = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  const { data, error: err } = await LessonsService.getAll()
  
  if (err) {
    error.value = err
  } else {
    lessons.value = data
  }
  
  loading.value = false
})
</script>
*/
