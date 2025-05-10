<template>
	<div
		class="kanban-container d-flex flex-row gap-4 px-4 pt-4 pb-5 bg-light"
		aria-label="Kanban sections container"
	>
		<Section
			v-for="section in sections"
			:key="section._id"
			:section="section"
			@add-task="$emit('add-task', section._id)"
		/>
	</div>
</template>

<style scoped>
.kanban-container {
	min-height: 80vh;
	overflow-x: auto;
	scroll-behavior: smooth;
	padding-bottom: 2rem;
}

.kanban-container::-webkit-scrollbar {
	height: 8px;
}
.kanban-container::-webkit-scrollbar-thumb {
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 4px;
}
.kanban-container::-webkit-scrollbar-track {
	background: transparent;
}
</style>
