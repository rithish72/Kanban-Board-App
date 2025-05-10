<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-3 px-3">
      <h5 class="fw-bold mb-0">Kanban Board</h5>
      <button class="btn btn-outline-primary btn-sm" @click="addSection">
        + Add Section
      </button>
    </div>
    <div class="d-flex flex-nowrap overflow-auto px-3 gap-3">
      <Section
        v-for="section in sections"
        :key="section._id"
        :section="section"
        @task-updated="fetchSections"
      />
    </div>
  </div>
</template>
