<template>
  <div class="bg-white p-3 rounded shadow-sm" style="min-width: 250px;">
    <h5>{{ section.title }}</h5>
    <div>
      <Task v-for="task in tasks" :key="task._id" :task="task" />
      <button class="btn btn-sm btn-outline-secondary w-100 mt-2" @click="addTask">+ Add task</button>
    </div>
  </div>
</template>

<script>
import api from '../api';
import Task from './Task.vue';

export default {
  props: ['section'],
  components: { Task },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await api.get(`/tasks`);
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask() {
      const title = prompt('Enter task title:');
      if (title) {
        try {
          await api.post(`/sections/${this.section._id}/tasks`, { title });
          this.fetchTasks();
          this.$emit('task-added');
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
