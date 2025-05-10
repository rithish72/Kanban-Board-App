<template>
	<div
		class="section-wrapper bg-light p-3 rounded-4 shadow-sm d-flex flex-column"
		style="min-width: 280px; max-width: 350px"
	>
		<!-- Header -->
		<div class="d-flex justify-content-between align-items-center mb-3">
			<h6
				class="mb-0 text-capitalize fw-semibold text-truncate text-dark"
			>
				{{ section.title }}
			</h6>
			<button
				class="btn btn-sm btn-light rounded-circle"
				style="width: 32px; height: 32px"
				title="Section Options"
				@click="showModal = true"
			>
				<i class="bi bi-three-dots-vertical"></i>
			</button>
		</div>

		<!-- Task List -->
		<div class="d-flex flex-column gap-2">
			<Task v-for="task in tasks" :key="task._id" :task="task" />
		</div>

		<!-- Add Task Form -->
		<div
			v-if="addingTask"
			class="bg-light p-3 mt-3 rounded-3 shadow-sm d-flex flex-column gap-2"
		>
			<input
				type="text"
				class="form-control form-control-sm"
				v-model="newTask.title"
				placeholder="Title"
			/>
			<textarea
				class="form-control form-control-sm"
				v-model="newTask.description"
				placeholder="Description"
				rows="2"
			></textarea>
			<input
				type="date"
				class="form-control form-control-sm"
				v-model="newTask.dueDate"
			/>
			<input
				type="text"
				class="form-control form-control-sm"
				v-model="newTask.assignee"
				placeholder="Assignee"
			/>
			<input
				type="text"
				class="form-control form-control-sm"
				v-model="newTask.tag"
				placeholder="Tag"
			/>
			<div class="d-flex justify-content-end gap-2 mt-2">
				<button class="btn btn-sm btn-secondary" @click="cancelAdd">
					Cancel
				</button>
				<button
					class="btn btn-sm btn-primary"
					:disabled="!newTask.title.trim()"
					@click="submitTask"
				>
					Add Task
				</button>
			</div>
		</div>

		<!-- Add Task Button -->
		<button
			v-else
			class="btn btn-outline-secondary btn-sm mt-3 rounded-pill"
			@click="addingTask = true"
		>
			+ Add Task
		</button>

		<!-- Modal -->
		<div v-if="showModal">
			<div class="modal fade show d-block" tabindex="-1" role="dialog">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Edit Section</h5>
							<button
								type="button"
								class="btn-close"
								@click="closeModal"
							></button>
						</div>
						<div class="modal-body">
							<label for="section-title" class="form-label"
								>Rename Section</label
							>
							<input
								id="section-title"
								type="text"
								v-model.trim="newTitle"
								class="form-control mb-3"
								ref="renameInput"
							/>
							<button
								class="btn btn-danger w-100 mb-2"
								@click="deleteSection"
							>
								Delete Section
							</button>
						</div>
						<div class="modal-footer">
							<button
								class="btn btn-secondary"
								@click="closeModal"
							>
								Cancel
							</button>
							<button
								class="btn btn-primary"
								:disabled="
									!newTitle || newTitle === section.title
								"
								@click="updateSection"
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-backdrop fade show"></div>
		</div>
	</div>
</template>

<script>
import api from "../api";
import Task from "./Task.vue";

export default {
	props: ["section"],
	components: { Task },
	data() {
		return {
			tasks: [],
			showModal: false,
			newTitle: "",
			addingTask: false,
			newTask: {
				title: "",
				description: "",
				dueDate: "",
				assignee: "",
				tag: "",
			},
		};
	},
	methods: {
		async fetchTasks() {
			try {
				const response = await api.get(
					`/sections/${this.section._id}/tasks`
				);
				this.tasks = response.data;
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
		},
		async submitTask() {
			const { title, description, dueDate, assignee, tag } = this.newTask;
			if (!title.trim()) return;

			try {
				await api.post(`/tasks`, {
					title,
					description,
					dueDate,
					assignee,
					tag,
					sectionId: this.section._id,
				});
				this.fetchTasks();
				this.$emit("task-added");
				this.resetTaskForm();
			} catch (error) {
				console.error("Error adding task:", error);
			}
		},
		cancelAdd() {
			this.resetTaskForm();
		},
		resetTaskForm() {
			this.newTask = {
				title: "",
				description: "",
				dueDate: "",
				assignee: "",
				tag: "",
			};
			this.addingTask = false;
		},
		async updateSection() {
			try {
				await api.post(`/sections`, {
					title: this.newTitle,
					boardId: this.section.boardId,
				});
				this.$emit("task-added");
				this.closeModal();
			} catch (error) {
				console.error("Error updating section:", error);
			}
		},
		async deleteSection() {
			if (confirm(`Delete section "${this.section.title}"?`)) {
				try {
					await api.delete(`/sections/${this.section._id}`);
					this.$emit("task-added");
					this.closeModal();
				} catch (error) {
					console.error("Error deleting section:", error);
				}
			}
		},
		closeModal() {
			this.showModal = false;
		},
	},
	mounted() {
		this.fetchTasks();
		this.newTitle = this.section.title;
		this.$watch("showModal", (newVal) => {
			if (newVal) {
				this.$nextTick(() => {
					this.$refs.renameInput?.focus();
				});
			}
		});
	},
};
</script>

<style scoped>
.section-wrapper {
	background-color: #f8f9fa;
	transition: box-shadow 0.2s ease;
}

.section-wrapper:hover {
	box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.03), 0 2px 6px rgba(0, 0, 0, 0.06);
}

.modal {
	z-index: 1050;
}

.modal-backdrop {
	z-index: 1040;
}

button.btn-outline-secondary {
	border-color: #dee2e6;
}

button.btn-outline-secondary:hover {
	background-color: #f1f3f5;
	border-color: #ced4da;
}

input,
textarea {
	border-radius: 0.5rem;
}
</style>
