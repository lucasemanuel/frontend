<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { LayoutLogged } from './components/layouts'
import { Toaster } from '@/components/ui/sonner'

import 'vue-sonner/style.css'
onMounted(async () => {

})
</script>

<template>
  <Toaster />

  <LayoutLogged>
    <RouterView />
  </LayoutLogged>
</template>
