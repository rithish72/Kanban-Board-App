<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between mb-3">
      <h2>Kanban Board</h2>
      <button class="btn btn-primary" @click="addSection">+ Add section</button>
    </div>
    <div class="d-flex gap-3 overflow-auto">
      <Section
        v-for="section in sections"
        :key="section._id"
        :section="section"
        @task-added="fetchSections"
      />
    </div>
  </div>
</template>

<script>
import api from './api';
import Section from './components/Section.vue';

export default {
  components: { Section },
  data() {
    return {
      sections: [],
    };
  },
  methods: {
    async fetchSections() {
      try {
        const response = await api.get('/sections');
        this.sections = response.data;
      } catch (err) {
        console.error('Error fetching sections', err);
      }
    },
    async addSection() {
      const title = prompt('Enter section name');
      if (!title) return;
      try {
        await api.post('/sections', { title });
        this.fetchSections();
      } catch (err) {
        console.error('Error adding section', err);
      }
    },
  },
  mounted() {
    this.fetchSections();
  },
};
</script>
