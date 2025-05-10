<template>
	<div class="task-card bg-white rounded-3 shadow-sm p-3">
		<p class="mb-1 fw-medium">{{ task.title }}</p>
		<div class="d-flex justify-content-between align-items-center">
			<small class="text-muted">{{ formatDate(task.createdAt) }}</small>
			<span
				v-if="task.tag"
				class="badge"
				:class="getTagClass(task.tag)"
				style="font-size: smaller; font-weight: 400"
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
			return map[tag] || "text-secondary";
		},
	},
};
</script>

<style scoped>
.task-card {
	transition: transform 0.2s ease;
}
</style>
