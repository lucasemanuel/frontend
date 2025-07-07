<script setup lang="ts">
import { Button } from "@/components/ui/button";
import DialogCreateTravelRequest from "@/components/DialogCreateTravelRequest.vue";
import FiltersCard from "@/components/FiltersCard.vue";
import TravelRequestsList from "@/components/TravelRequestsList.vue";
</script>

<template>
  <div class="container mx-auto px-4 pt-6 lg:px-8 lg:pt-8 xl:max-w-7xl">
    <div
      class="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start"
    >
      <div class="grow">
        <h1 class="mb-1 text-xl font-bold">Dashboard</h1>
        <h2 class="text-sm font-medium text-slate-500">Bem-vindo ao painel de pedidos de viagem</h2>
      </div>
      <div
        class="flex flex-none items-center justify-center gap-2 rounded-sm px-2 sm:justify-end sm:bg-transparent sm:px-0"
      >
        <DialogCreateTravelRequest>
          <Button> Solicitar viagem </Button>
        </DialogCreateTravelRequest>
      </div>
    </div>
    <hr class="mt-6 border-slate-200 lg:mt-8" />
  </div>
  <div class="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
    <FiltersCard></FiltersCard>
    <TravelRequestsList class="mt-6" />
  </div>
</template>
