<template>
  <div class="board">
    <Section
      v-for="section in sections"
      :key="section._id"
      :section="section"
      :tasks="tasksBySection(section._id)"
      @add-task="addTask"
    />
    <button @click="createSection">+ Add Section</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api';
import Section from './Section.vue';

const sections = ref([]);
const tasks = ref([]);

const fetchData = async () => {
  const [sectionsRes, tasksRes] = await Promise.all([
    api.get('/sections'),
    api.get('/tasks')
  ]);
  sections.value = sectionsRes.data;
  tasks.value = tasksRes.data;
};

const tasksBySection = (sectionId) =>
  tasks.value.filter(task => task.sectionId === sectionId);

const addTask = async (task) => {
  const res = await api.post('/tasks', task);
  tasks.value.push(res.data);
};

const createSection = async () => {
  const title = prompt('Enter section title:');
  if (!title) return;
  const res = await api.post('/sections', { title, boardId: 'default' });
  sections.value.push(res.data);
};

onMounted(fetchData);
</script>

<style scoped>
.board {
  display: flex;
  gap: 16px;
  padding: 1rem;
  overflow-x: auto;
}
</style>
