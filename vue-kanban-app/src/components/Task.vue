<template>
  <div class="card shadow-sm">
    <div class="card-body py-2 px-3">
      <div class="d-flex justify-content-between align-items-center">
        <strong>{{ task.title }}</strong>
        <span class="badge bg-secondary">{{ task.tag || 'Task' }}</span>
      </div>
      <small class="text-muted d-block mt-1">
        {{ dueDateText }}
      </small>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['task']);

const dueDateText = props.task.dueDate
  ? new Date(props.task.dueDate).toLocaleDateString()
  : 'No due date';
</script>
