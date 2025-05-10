<template>
	<div class="d-flex flex-row overflow-auto gap-3">
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
	props: ["sections"],
	components: { Section },
};
</script>
