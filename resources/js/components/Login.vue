<!-- resources/js/components/Login.vue -->
<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Login</h3>
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <p class="text-center mt-3">
                Pas encore inscrit ? <router-link to="/register">S'inscrire</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
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
  /* Ajoute des styles personnalisés si nécessaire */
  </style>
  