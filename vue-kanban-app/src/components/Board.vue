<template>
	<div
		class="d-flex flex-row overflow-auto gap-3 px-3 pt-3 pb-4 bg-light"
		style="min-height: 80vh"
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

<script>
import Section from "./Section.vue";

export default {
	props: {
		sections: {
			type: Array,
			required: true,
		},
	},
	components: {
		Section,
	},
};
</script>
