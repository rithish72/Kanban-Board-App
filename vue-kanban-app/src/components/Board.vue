<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Kanban Board</h2>
      <button class="btn btn-primary" @click="addSection">+ Add Section</button>
    </div>
    <div class="d-flex overflow-auto">
      <Section
        v-for="section in sections"
        :key="section._id"
        :section="section"
        @task-updated="fetchSections"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '@/api';
import Section from './Section.vue';

const sections = ref([]);

const fetchSections = async () => {
  const res = await api.get('/sections');
  sections.value = res.data;
};

const addSection = async () => {
  const title = prompt('Enter section title');
  if (title) {
    await api.post('/sections', { title });
    fetchSections();
  }
};

onMounted(fetchSections);
</script>
