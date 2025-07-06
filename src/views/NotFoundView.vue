<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <AlertTriangle class="mx-auto h-24 w-24 text-gray-400" />
      </div>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Página Não Encontrada</h2>
      <p class="text-gray-500 mb-8">
        Desculpe, não conseguimos encontrar a página que você está procurando.
        Ela pode ter sido movida, excluída ou o endereço digitado está incorreto.
      </p>
      <div class="space-y-4">
        <Button @click="goHome" class="w-full" size="lg">
          <Home class="mr-2 h-4 w-4" />
          Ir para a página inicial
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  AlertTriangle,
  Home
} from 'lucide-vue-next'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
