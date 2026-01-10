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
import { ref, onMounted } from "vue";
import { LessonsService } from "@/services/lessons.service";

const lessons = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const { data, error: err } = await LessonsService.getAll();

  if (err) {
    error.value = err;
  } else {
    lessons.value = data;
  }

  loading.value = false;
});
</script>
*/ // ----------------------------- // 13. Add to .gitignore //
----------------------------- /* .env .env.local .env.*.local node_modules dist
