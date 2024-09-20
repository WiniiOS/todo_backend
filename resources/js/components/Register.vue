<!-- resources/js/components/Register.vue -->
<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Register</h3>
              <form @submit.prevent="register">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    class="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>
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
                <div class="mb-3">
                  <label for="password_confirmation" class="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="password_confirmation"
                    v-model="password_confirmation"
                    class="form-control"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <button type="submit" class="btn btn-success w-100">
                  Register
                </button>
              </form>
              <p class="text-center mt-3">
                Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
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
  /* Ajoute des styles personnalisés si nécessaire */
  </style>
  