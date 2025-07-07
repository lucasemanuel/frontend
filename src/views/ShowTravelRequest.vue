
<script setup lang="ts">
import { ArrowLeft, PlaneTakeoff, PlaneLanding, Loader2 } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import { format, subHours } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useLoggedUserStore } from '@/stores/LoggedUser'

const router = useRouter();
const route = useRoute()
const loggedUserStore = useLoggedUserStore();
const loader = ref(false);

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'vue-sonner';
import api from '@/services/api';
import type { Travel } from '@/types';
import { ref } from 'vue';
import TravelStatusBadge from '@/components/TravelStatusBadge.vue';

function goToDashboard() {
  router.push({ name: 'dashboard' });
}

function approve() {
  if (travelRequest.value?.id !== undefined) {
    updateTravelRequestStatus(travelRequest.value.id, 'approved').then((response) => {
      travelRequest.value = response.data;
      toast.success('Viagem aprovada', {
        description: `Viagem de ${travelRequest?.value?.user?.name} com destino ${travelRequest?.value?.destination || ''} aprovada com sucesso.`,
      })
    })
  }
}

function denied() {
  if (travelRequest.value?.id !== undefined) {
    updateTravelRequestStatus(travelRequest.value.id, 'canceled').then((response) => {
      travelRequest.value = response.data;
      toast.error('Viagem negada', {
        description: `Viagem de ${travelRequest?.value?.user?.name} com destino ${travelRequest?.value?.destination || ''} foi negada.`,
      })
    })
  }
}

const travelRequest = ref<Travel | null>(null);

(() => {
  api.get(`/travel-requests/${route.params.id}`)
    .then((response) => {
      travelRequest.value = response.data;
    })
    .catch((error) => {
      if (error.status === 404) {
        toast.error('Solicitação de viagem não encontrada', {
          description: 'A solicitação de viagem que você está tentando acessar não existe.',
        });
        router.push({ name: 'not-found' });
      }
    });
})();

function updateTravelRequestStatus(id: number, status: string) {
  return api.patch(`/travel-requests/${id}`, {
    status: status,
  }).catch((error) => {
    toast.error('Erro ao atualizar o status da viagem', {
      description: error.response?.data?.message || 'Ocorreu um erro ao atualizar o status da viagem.',
    });
    throw error;
  });
}
</script>

<template>
  <div class="container mx-auto px-4 pt-6 lg:px-8 lg:pt-8 xl:max-w-7xl">
    <div
      class="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start"
    >
    <div>
      <ArrowLeft class="h-5 w-5 cursor-pointer" @click="goToDashboard"></ArrowLeft>
    </div>
      <div class="grow">
        <h1 class="mb-1 text-xl font-bold">Pedido de Viagem</h1>
        <h2 class="text-sm font-medium text-slate-500">
          Veja todos os detalhes do pedido de viagem
        </h2>
      </div>
    </div>
    <hr class="mt-6 border-slate-200 lg:mt-8" />
  </div>

  <div class="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
    <Card>
      <CardHeader>
        <CardTitle class="text-xl font-semibold">Solicitação de viagem</CardTitle>
      </CardHeader>
      <CardContent class="text-slate-800">
        <div class="bg-slate-100 rounded-xl p-4">
          <div class="flex items-center gap-4 mb-4">
            <Avatar class="h-10 w-10">
              <AvatarFallback class="bg-slate-500 text-white">LS</AvatarFallback>
            </Avatar>
            <div class="flex justify-between sm:items-center w-full">
              <div>
                <p class="-mb-1">{{ travelRequest?.user.name }}</p>
                <span class="text-sm text-slate-600">{{ travelRequest?.user.email }}</span>
              </div>
              <TravelStatusBadge class="hidden sm:block" :status="travelRequest?.status ?? ''" />
            </div>
          </div>
          <TravelStatusBadge class="sm:hidden" :status="travelRequest?.status ?? ''" />
          <hr class="my-4 border-slate-300" />
          <p class="text-sm sm:text-center -mb-1">Destino</p>
          <p class="sm:text-lg sm:text-center font-semibold sm:font-bold mb-2">{{ travelRequest?.destination }}</p>
          <div class="flex flex-col sm:flex-row justify-center sm:items-center sm:gap-4 sm:mb-4">
            <div class="flex flex-col">
              <p class="text-sm -mb-1">
                <span class="hidden sm:block capitalize">
                  {{ travelRequest?.departure_date ? format(subHours(new Date(travelRequest.departure_date), -3), 'EEEE', { locale: ptBR }) : '' }}
                </span>
                <span class="sm:hidden">Data de ida</span>
              </p>
              <p class="font-semibold mb-2">
                {{ travelRequest?.departure_date ? format(subHours(new Date(travelRequest.departure_date), -3), "dd MMMM 'de' yyyy", { locale: ptBR }) : '' }}
              </p>
            </div>
            <PlaneTakeoff class="hidden sm:block h-6 w-6 text-slate-500" />
            <hr class="hidden sm:block my-4 border-dashed border-1 border-slate-400 sm:w-16 md:w-32" >
            <PlaneLanding class="hidden sm:block h-6 w-6 text-slate-500" />
            <div class="flex flex-col">
              <p class="text-sm -mb-1">
                <span class="hidden sm:block capitalize">
                  {{ travelRequest?.return_date ? format(subHours(new Date(travelRequest.return_date), -3), 'EEEE', { locale: ptBR }) : '' }},
                </span>
                <span class="sm:hidden">Data de retorno</span>
              </p>
              <p class="font-semibold mb-2">
                {{ travelRequest?.return_date ? format(subHours(new Date(travelRequest.return_date), -3), "dd MMMM 'de' yyyy", { locale: ptBR }) : '' }}
              </p>
            </div>
          </div>
          <p class="text-sm sm:text-center -mb-1" :class="{hidden: !travelRequest?.reason}">Motivo</p>
          <p class="sm:text-lg sm:text-center font-semibold mb-2" :class="{hidden: !travelRequest?.reason}">{{ travelRequest?.reason }}</p>
        </div>
      </CardContent>
      <CardFooter class="w-full justify-between" v-if="loggedUserStore.hasAdminPermissions">
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="destructive" :disabled="travelRequest?.status !== 'requested'">
              Rejeitar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. A solicitação de viagem será rejeitada e não poderá ser aprovada posteriormente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction @click="denied" :disable="loader">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" :class="{ hidden: !loader }"/>Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button :disabled="travelRequest?.status !== 'requested'">
              Aprovar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. A solicitação de viagem será aprovada e o solicitante será notificado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction @click="approve" :disable="loader">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" :class="{ hidden: !loader }"/>Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  </div>
</template>
