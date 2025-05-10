<template>
	<div class="task-card bg-white rounded-2 shadow-sm p-3 mb-2">
		<p class="mb-2 fw-semibold text-dark text-sm">{{ task.title }}</p>
		<div class="d-flex justify-content-between align-items-center">
			<small :class="['text-muted', 'text-sm']">
				{{ formatDate(task.createdAt) }}
			</small>
			<span
				v-if="task.tag"
				class="badge rounded-pill px-2 py-1"
				:class="getTagClass(task.tag)"
			>
				{{ task.tag }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ["task"],
	methods: {
		formatDate(value) {
			if (!value) return "";
			const date = new Date(value);
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const dayDiff = Math.floor((date - today) / (1000 * 60 * 60 * 24));

			if (dayDiff === 0) return "Today";
			if (dayDiff === -1) return "Yesterday";
			if (dayDiff === 1) return "Tomorrow";
			if (Math.abs(dayDiff) < 7) {
				return date.toLocaleDateString(undefined, { weekday: "long" });
			}

			return date.toLocaleDateString(undefined, {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
		},
		getTagClass(tag) {
			const map = {
				Design: "text-primary",
				Programming: "text-danger",
				Managing: "text-success",
			};
			return map[tag] || "bg-secondary-subtle text-secondary";
		},
	},
};
</script>

<style scoped>
.task-card {
	transition: transform 0.2s ease;
	border: 1px solid #f1f1f1;
	cursor: grab;
}

.task-card:hover {
	transform: scale(1.01);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.text-sm {
	font-size: 0.875rem;
}

.badge {
	font-size: 0.75rem;
	font-weight: 500;
}
</style>

