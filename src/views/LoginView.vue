<template>
  <main class="bg-gray-200 flex items-center">
    <Card class="mx-auto max-w-sm flex-1">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
            Insira seu e-mail abaixo para entrar na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="grid gap-4" @submit.prevent="handleLogin">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="meu@email.com"
              required
              v-model="email"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              v-model="password"
            />
          </div>
          <Button type="submit" class="w-full">
            Login
          </Button>
          <div class="mt-4 text-center text-sm">
            Leia o README para entrar no sistema
          </div>
          <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
        </form>
      </CardContent>
    </Card>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/api'
import { useLoggedUserStore } from '@/stores/LoggedUser'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const loggedUserStore = useLoggedUserStore()
const email = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  error.value = ''
  api.post('/auth/login', {
    email: email.value,
    password: password.value
  }).then((response) => {
    console.log('Login successful')
    const data = JSON.parse(atob(response.data.access_token.split('.')[1]))

    loggedUserStore.setUser({
      name: data.name,
      hasAdminPermissions: data.has_admin_permissions,
      isLogged: true
    })
  }).catch((err) => {
    error.value = err?.response?.data?.message || 'Login failed'
  })
}
</script>

<style scoped>
  main {
    min-height: inherit;
  }
</style>
