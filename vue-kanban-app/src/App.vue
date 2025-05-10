<template>
  <div id="app" class="bg-light min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div class="container-fluid px-4">
        <!-- Bootstrap Icon instead of image -->
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-kanban fs-4 text-primary"></i>
          <span class="navbar-brand mb-0 h5 fw-bold">Kanban Board</span>
        </div>

        <div class="ms-auto d-flex gap-3 align-items-center">
          <span class="text-muted small">5 boards • 24 members</span>
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-share-fill"></i>
          </button>
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-gear-fill"></i>
          </button>
        </div>
      </div>
    </nav>

    <main class="mt-4">
      <Board />
    </main>
  </div>
</template>

<script setup>
import Board from '@/components/Board.vue';
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}

::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
