<!-- resources/js/components/TaskList.vue -->
<template>
    <div class="task-list">
      <h2>My Tasks</h2>
      <form @submit.prevent="addTask">
        <input type="text" v-model="newTask" placeholder="Add a new task" required />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <span :class="{ completed: task.is_completed }">{{ task.title }}</span>
          <button @click="toggleComplete(task)">{{ task.is_completed ? 'Undo' : 'Complete' }}</button>
          <button @click="deleteTask(task)">Delete</button>
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
  