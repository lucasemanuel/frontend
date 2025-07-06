<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Loader2 } from 'lucide-vue-next'

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

const router = useRouter()
const loggedUserStore = useLoggedUserStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loader = ref(false);

function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'E-mail e senha são obrigatórios'
    return
  }

  loader.value = true;
  error.value = ''
  api.post('/auth/login', {
    email: email.value,
    password: password.value
  }).then((response) => {
    const data = JSON.parse(atob(response.data.access_token.split('.')[1]))

    loggedUserStore.setUser({
      name: data.name,
      hasAdminPermissions: data.has_admin_permissions,
      isLogged: true
    })

    localStorage.setItem('isLogged', 'true')
    router.push({ name: 'dashboard' })
  }).catch((err) => {
    if (err?.response?.status === 401) {
      error.value = 'E-mail ou senha inválida'
      return
    }

    error.value = err?.response?.data?.message || 'Erro ao fazer login'
  }).finally(() => {
    loader.value = false;
  })
}
</script>

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
            <p v-if="error" class="text-red-500 text-sm text-center ">{{ error }}</p>
          </div>
          <Button type="submit" class="w-full" :disabled="loader">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" :class="{ hidden: !loader }"/>
            Login
          </Button>
          <div class="mt-4 text-center text-sm">
            Leia o README para entrar no sistema
          </div>
        </form>
      </CardContent>
    </Card>
  </main>
</template>


<style scoped>
  main {
    min-height: inherit;
  }
</style>
