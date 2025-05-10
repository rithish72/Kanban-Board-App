<template>
  <div class="card border-0 shadow-sm rounded-3">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <div class="fw-semibold text-truncate" :title="task.title">
          {{ task.title || 'Untitled Task' }}
        </div>
        <span
          class="badge bg-light text-dark border"
          style="font-size: 0.75rem;"
        >
          {{ task.tag || "Task" }}
        </span>
      </div>
      <small class="text-muted">
        {{ dueDateText }}
      </small>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["task"]);

const dueDateText = props.task?.dueDate
  ? new Date(props.task.dueDate).toLocaleDateString()
  : "No due date";
</script>
