<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import 'vue-sonner/style.css'

import { LayoutLogged } from '@/components/layouts'
import { Toaster } from '@/components/ui/sonner'
import { useLoggedUserStore } from './stores/LoggedUser'
import api from '@/services/api'

const loggedUserStore = useLoggedUserStore()

onMounted(async () => {
  const isLogged = localStorage.getItem('isLogged')
  if (!isLogged) {
    loggedUserStore.clearUser();
  } else {
    await api.post('/auth/refresh').then((response) => {
      const data = JSON.parse(atob(response.data.access_token.split('.')[1]))
      loggedUserStore.setUser({
        name: data.name,
        hasAdminPermissions: data.has_admin_permissions,
        isLogged: true
      })
    })
  }
})
</script>

<template>
  <Toaster />

  <RouterView v-slot="{ Component, route }">
    <LayoutLogged v-if="route.meta.requiresAuth && loggedUserStore.isLogged">
      <component :is="Component" />
    </LayoutLogged>
    <component v-else :is="Component" />
  </RouterView>
</template>
