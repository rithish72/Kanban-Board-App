<template>
  <div class="card me-3" style="min-width: 300px; max-height: 80vh; overflow-y: auto;">
    <div class="card-header d-flex justify-content-between align-items-center">
      <strong>{{ section.title }}</strong>
    </div>
    <div class="card-body p-2">
      <draggable
        v-model="tasks"
        group="tasks"
        item-key="_id"
        @end="onDragEnd"
        class="d-flex flex-column gap-2"
      >
        <template #item="{ element }">
          <Task :task="element" />
        </template>
      </draggable>
      <button class="btn btn-sm btn-outline-primary mt-3 w-100" @click="addTask">
        + Add Task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import draggable from 'vuedraggable';
import api from '../api';
import Task from './Task.vue';

const props = defineProps(['section']);
const emit = defineEmits(['task-updated']);

const tasks = ref([]);

const fetchTasks = async () => {
  const res = await api.get('/tasks', {
    params: { sectionId: props.section._id },
  });
  tasks.value = res.data;
};

const addTask = async () => {
  const title = prompt('Enter task title');
  if (title) {
    await api.post('/tasks', {
      title,
      sectionId: props.section._id,
    });
    fetchTasks();
    emit('task-updated');
  }
};

const onDragEnd = async () => {
  // Update sectionId for all tasks
  for (let i = 0; i < tasks.value.length; i++) {
    await api.put(`/tasks/${tasks.value[i]._id}`, {
      sectionId: props.section._id,
    });
  }
  emit('task-updated');
};

onMounted(fetchTasks);
watch(() => props.section._id, fetchTasks);
</script>
