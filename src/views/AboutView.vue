<script setup lang="ts">
import api from '@/services/api'
import { useLoggedUserStore } from '@/stores/LoggedUser'

const loggedUserStore = useLoggedUserStore()

async function logout() {
  await api.post('/auth/logout');
  loggedUserStore.clearUser();
}

async function loadTravels() {
  const response = await api.get('/travel-requests');
  console.log(response)
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>User logged: {{ loggedUserStore.name }}</div>
    <button @click="loadTravels">Load Travels</button>
    <button @click="logout">logout</button>
    <router-link to="/login">Go to Login</router-link>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
