<template>
  <div id="app" class="bg-light min-vh-100">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container">
        <span class="navbar-brand mb-0 h1">Kanban Board</span>
      </div>
    </nav>
    <main class="container-fluid mt-4">
      <Board />
    </main>
  </div>
</template>

<script setup>
import Board from './components/Board.vue';
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}
</style>
