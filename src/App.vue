<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import 'vue-sonner/style.css'

import { LayoutLogged } from '@/components/layouts'
import { Toaster } from '@/components/ui/sonner'
import { useLoggedUserStore } from './stores/LoggedUser'

const loggedUserStore = useLoggedUserStore()

onMounted(async () => {

})
</script>

<template>
  <Toaster />

  <template v-if="loggedUserStore.isLogged">
    <LayoutLogged>
      <RouterView />
    </LayoutLogged>
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>
