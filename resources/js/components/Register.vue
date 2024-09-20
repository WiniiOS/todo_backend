<!-- resources/js/components/Register.vue -->
<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="name" placeholder="Name" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="password" v-model="password_confirmation" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
      <p>Déjà inscrit ? <router-link to="/login">Se connecter</router-link></p>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const password_confirmation = ref('');
  const router = useRouter();
  
  const register = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      });
      router.push({ name: 'Login' });
    } catch (error) {
      alert('Erreur lors de l’inscription. Vérifiez vos informations.');
    }
  };
  </script>
  
  <style scoped>
  .register {
    max-width: 300px;
    margin: auto;
  }
  </style>
  