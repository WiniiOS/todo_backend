<template>
    <div class="container mt-5">
      <h2 class="mb-4 text-center">My Tasks</h2>
      <form @submit.prevent="addTask" class="input-group mb-3">
        <input
          type="text"
          v-model="newTask"
          class="form-control"
          placeholder="Add a new task"
          required
        />
        <button type="submit" class="btn btn-outline-primary">Add Task</button>
      </form>
      <ul class="list-group">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span :class="{ 'text-decoration-line-through': task.is_completed }">{{ task.title }}</span>
          <div>
            <button @click="toggleComplete(task)" class="btn btn-sm btn-outline-success me-2">
              {{ task.is_completed ? 'Undo' : 'Complete' }}
            </button>
            <button @click="deleteTask(task)" class="btn btn-sm btn-outline-danger">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const tasks = ref([]);
  const newTask = ref('');
  
  // Récupérer les tâches à l'initialisation
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      tasks.value = response.data;
    } catch (error) {
      alert('Erreur lors de la récupération des tâches.');
    }
  };
  
  const addTask = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/tasks',
        { title: newTask.value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      tasks.value.push(response.data);
      newTask.value = '';
    } catch (error) {
      alert('Erreur lors de l’ajout de la tâche.');
    }
  };
  
  const toggleComplete = async (task) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tasks/${task.id}/complete`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      task.is_completed = !task.is_completed;
    } catch (error) {
      alert('Erreur lors de la mise à jour de la tâche.');
    }
  };
  
  const deleteTask = async (task) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      tasks.value = tasks.value.filter(t => t.id !== task.id);
    } catch (error) {
      alert('Erreur lors de la suppression de la tâche.');
    }
  };
  
  onMounted(fetchTasks);

</script>
  
<style scoped>
  .task-list {
    max-width: 400px;
    margin: auto;
  }
  
  .completed {
    text-decoration: line-through;
  }
</style>
  