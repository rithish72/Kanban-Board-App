<template>
	<div class="container py-3">
		<!-- Header -->
		<div
			class="d-flex justify-content-between align-items-center mb-3 px-2"
		>
			<!-- Left: Navigation & Board Info -->
			<div class="d-flex align-items-center gap-3">
				<button
					class="btn btn-light rounded-circle d-flex align-items-center justify-content-center shadow-sm"
					style="width: 38px; height: 38px"
				>
					<i class="bi bi-arrow-left"></i>
				</button>

				<div class="d-flex align-items-center gap-3">
					<div
						class="d-flex justify-content-center align-items-center bg-dark"
						style="width: 40px; height: 40px; border-radius: 10px"
					>
						<i class="bi bi-apple text-white fs-5"></i>
					</div>
					<div>
						<h5 class="mb-0 fw-semibold">Apple</h5>
						<small class="text-muted">5 boards · 24 members</small>
					</div>
				</div>
			</div>

			<!-- Right: Search & Icons -->
			<div class="d-flex align-items-center gap-3 justify-content-end">
				<div class="position-relative d-flex align-items-center">
					<input
						type="text"
						class="form-control shadow-sm"
						:class="{ 'border-primary': isSearchFocused }"
						placeholder="Search"
						style="
							padding-left: 38px;
							min-width: 200px;
							max-width: 300px;
							height: 38px;
							border-radius: 50px;
							font-size: 14px;
							font-weight: 500;
							background-color: #f8f9fa;
							border: 1px solid #ced4da;
							transition: border-color 0.3s;
						"
						@focus="isSearchFocused = true"
						@blur="isSearchFocused = false"
						@input="searchTasks"
						@keydown.enter="searchTasks"
						@keydown.esc="clearSearch"
						@keydown="handleKeydown"
						@keyup="handleKeyup"
					/>
					<i
						class="bi bi-search position-absolute"
						style="
							top: 50%;
							left: 12px;
							transform: translateY(-50%);
							color: #aaa;
						"
					></i>
				</div>

				<!-- Action Buttons -->
				<button class="btn rounded shadow-sm p-2">
					<i class="bi bi-share"></i>
				</button>
				<button class="btn rounded shadow-sm p-2">
					<i class="bi bi-gear"></i>
				</button>
				<button
					class="btn btn-light rounded-pill px-3 py-1"
					@click="addSection"
				>
					+ Add section
				</button>
			</div>
		</div>

		<!-- Kanban Sections -->
		<div class="d-flex gap-3 overflow-auto pb-3 px-2">
			<Section
				v-for="section in sections"
				:key="section._id"
				:section="section"
				@task-added="fetchSections"
			/>
		</div>
	</div>
</template>

<script>
import api from "./api";
import Section from "./components/Section.vue";

export default {
	components: { Section },
	data() {
		return {
			sections: [],
			boardId: "663e9e2c9fe372a5f45f94b9",
			isSearchFocused: false,
		};
	},
	methods: {
		async fetchSections() {
			try {
				const response = await api.get(
					`/sections?boardId=${this.boardId}`
				);
				this.sections = response.data;
			} catch (err) {
				console.error("Error fetching sections", err);
			}
		},
		async addSection() {
			const title = prompt("Enter section name");
			if (!title?.trim()) return;

			try {
				await api.post("/sections", {
					title: title.trim(),
					boardId: this.boardId,
				});
				await this.fetchSections();
			} catch (err) {
				console.error(
					"Error adding section",
					err.response?.data || err.message
				);
			}
		},
	},
	mounted() {
		this.fetchSections();
	},
};
</script>

<style scoped>
.container {
	max-width: 100%;
}
</style>
