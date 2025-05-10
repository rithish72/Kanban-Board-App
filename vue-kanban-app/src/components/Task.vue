<template>
	<div class="card my-2">
		<div class="card-body p-2">
			<p class="mb-1">{{ task.title }}</p>
			<small class="text-muted">{{ task.createdAt | formatDate }}</small>
		</div>
	</div>
</template>

<script>
export default {
	props: ["task"],
	filters: {
		formatDate(value) {
			if (!value) return "";
			return new Date(value).toLocaleString();
		},
	},
};
</script>
