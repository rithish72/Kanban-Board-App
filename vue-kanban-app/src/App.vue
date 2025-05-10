<script setup>
import { reactive } from "vue"; // ✅ Import reactive
import KanbanColumn from "./components/KanbanColumn.vue";

const columns = reactive([
  {
    title: "To do",
    tasks: [],
  },
  {
    title: "In Progress",
    tasks: [
      {
        text: "Add buttons",
        due: "Yesterday",
        tag: "Programming",
        user: "👩🏻‍💻",
      },
      {
        text: "Logo revision",
        due: "Tomorrow",
        tag: "Design",
        user: "👨🏽‍🎨",
      },
    ],
  },
  {
    title: "Review A",
    tasks: [
      { text: "UI-Kit", due: "Tomorrow", tag: "Design", user: "🧑🏼‍🎨" },
      { text: "Managing", due: "", tag: "Design", user: "🧑🏾‍💼" },
      { text: "Fixing bugs", due: "Today", tag: "Design", user: "🧑🏾‍💼" },
      {
        text: "Design Concept 2",
        due: "Today",
        tag: "Design",
        user: "👨‍💻",
      },
    ],
  },
  {
    title: "Review B",
    tasks: [
      {
        text: "Right text for modal",
        due: "Tomorrow",
        tag: "Design",
        user: "🧑🏻‍🎤",
      },
      { text: "UI-Kit", due: "Today", tag: "Design", user: "🧑🏻‍🎨" },
      {
        text: "Modal design fix",
        due: "Yesterday",
        tag: "Programming",
        user: "👨🏾‍💻",
      },
      {
        text: "Create and finalize the design...",
        due: "",
        tag: "Programming",
        user: "12 Fab",
      },
    ],
  },
]);

const handleAddTask = (idx) => {
  columns[idx].tasks.push({
    text: "New Task",
    due: "",
    tag: "Programming",
    user: "👤",
  });
};
</script>
