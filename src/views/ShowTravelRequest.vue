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
                <p class="-mb-1">Lucas Emanuel</p>
                <span class="text-sm text-slate-600">lucaxemanuel@gmail.com</span>
              </div>
              <Badge class="hidden sm:block">Pendente</Badge>
            </div>
          </div>
          <Badge class="sm:hidden">Pendente</Badge>

          <hr class="my-4 border-slate-300" />
          <p class="text-sm sm:text-center -mb-1">Destino</p>
          <p class="sm:text-lg sm:text-center font-semibold sm:font-bold mb-2">Belo Horizonte</p>
          <div class="flex flex-col sm:flex-row justify-center sm:items-center sm:gap-4 sm:mb-4">
            <div class="flex flex-col">
              <p class="text-sm -mb-1">
                <span class="hidden sm:block">Segunda-feira,</span>
                <span class="sm:hidden">Data de ida</span>
              </p>
              <p class="font-semibold mb-2">07 de Julho de 2024</p>
            </div>
            <PlaneTakeoff class="hidden sm:block h-6 w-6 text-slate-500" />
            <hr class="hidden sm:block my-4 border-dashed border-1 border-slate-400 sm:w-16 md:w-32" >
            <PlaneLanding class="hidden sm:block h-6 w-6 text-slate-500" />
            <div class="flex flex-col">
              <p class="text-sm -mb-1">
                <span class="hidden sm:block">Quinta-feira,</span>
                <span class="sm:hidden">Data de retorno</span>
              </p>
              <p class="font-semibold mb-2">10 de Julho de 2024</p>
            </div>
          </div>
          <p class="text-sm sm:text-center -mb-1">Motivo</p>
          <p class="sm:text-lg sm:text-center font-semibold mb-2">Onboarding de desenvolvedor Full Stack</p>
        </div>
      </CardContent>
      <CardFooter class="w-full justify-between">
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="outline">
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
              <AlertDialogAction @click="denied">Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button>
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
              <AlertDialogAction @click="approve">Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, PlaneTakeoff, PlaneLanding } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToDashboard() {
  router.push({ name: 'dashboard' });
}

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'vue-sonner';

function approve() {
  console.log('Travel request approved');
  toast('Viagem aprovada', {
    description: 'Viagem de Lucas Emanuel com destino Belo Horizonte aprovada com sucesso.',
  })
}

function denied() {
  toast('Viagem negada', {
    description: 'Viagem de Lucas Emanuel com destino Belo Horizonte foi negada.',
  })}

const travelRequest = ref<any>(null);

// onMounted(() => {
//   axios.get('/api/travel-request/1').then(response => {

// });
</script>
