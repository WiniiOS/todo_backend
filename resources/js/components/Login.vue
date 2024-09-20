<!-- resources/js/components/Login.vue -->
<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
        </form>
        <p>Pas encore inscrit ? <router-link to="/register">S'inscrire</router-link></p>
    </div>
</template>
  
  <script setup>

  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const login = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email.value,
        password: password.value,
      });
      localStorage.setItem('access_token', response.data.access_token);
      router.push({ name: 'TaskList' });
    } catch (error) {
      alert('Erreur de connexion. Vérifiez vos informations.');
    }
  };
  </script>
  
  <style scoped>
  .login {
    max-width: 300px;
    margin: auto;
  }
  </style>
  