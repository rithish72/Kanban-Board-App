<template>
  <div class="card rounded-3 border-0 shadow-sm bg-light" style="min-width: 320px; max-height: 80vh;">
    <div class="card-header bg-white fw-semibold d-flex justify-content-between align-items-center">
      <span>{{ section.title }}</span>
    </div>
    <div class="card-body py-2 px-2">
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
      <button class="btn btn-sm btn-outline-secondary w-100 mt-2" @click="addTask">
        + Add Task
      </button>
    </div>
  </div>
</template>
