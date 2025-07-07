<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import api from "@/services/api";
import { computed, ref, watch } from "vue";
import type { PaginatedResponse, Travel } from "@/types";
import { RouterLink } from "vue-router";
import TravelStatusBadge from "@/components/TravelStatusBadge.vue";
import { useLoggedUserStore } from '@/stores/LoggedUser'

const loggedUserStore = useLoggedUserStore();

const travelRequests = ref<PaginatedResponse<Travel>>({
  current_page: 0,
  data: [],
  first_page_url: "",
  from: 0,
  last_page: 0,
  last_page_url: "",
  links: [],
  next_page_url: null,
  path: "",
  per_page: 0,
  prev_page_url: null,
  to: 0,
  total: 0
});

const currentPage = ref(1);
const loader = ref(false);

watch(currentPage, (newValue) => {
  fetchTravelRequests(newValue);
});

function fetchTravelRequests(page: number) {
  loader.value = true;
  api.get(`/travel-requests?page=${page}`).then((response) => {
    travelRequests.value = response.data;
  }).finally(() => {
    loader.value = false;
  });
}

const resultsDisplayed = computed(() => {
  const isLastPage = travelRequests.value.current_page == travelRequests.value.last_page;
  return isLastPage ? travelRequests.value.total : travelRequests.value.per_page * travelRequests.value.current_page;
});

fetchTravelRequests(0)
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Pedidos de Viagem</CardTitle>
      <CardDescription>Resultados: {{ resultsDisplayed }}/{{ travelRequests.total }}</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="min-w-[150px] text-start" v-if="loggedUserStore.hasAdminPermissions">Nome</TableHead>
            <TableHead class="min-w-[120px] text-start">Data de Ida</TableHead>
            <TableHead class="min-w-[120px] text-start">Data de Retorno</TableHead>
            <TableHead class="min-w-[150px] text-start">Destino</TableHead>
            <TableHead class="text-start">Status</TableHead>
            <TableHead class="min-w-[90px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(travel, idx) in travelRequests.data" :key="idx">
            <TableCell class="font-semibold" v-if="loggedUserStore.hasAdminPermissions">{{ travel.user?.name }}</TableCell>
            <TableCell>{{ travel.departure_date }}</TableCell>
            <TableCell>{{ travel.return_date }}</TableCell>
            <TableCell>{{ travel.destination }}</TableCell>
            <TableCell>
              <TravelStatusBadge :status="travel.status" />
            </TableCell>
            <TableCell class="text-end">
              <RouterLink :to="`/travel/${travel.id}`">
                <Button size="sm" class="gap-1">
                Detalhes
                </Button>
              </RouterLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <Pagination :disabled="loader" v-model:page="currentPage" v-slot="{ page }" :items-per-page="travelRequests.per_page" :total="travelRequests.total" :default-page="1">
        <PaginationContent v-slot="{ items }">
          <PaginationPrevious />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </PaginationItem>
          </template>
          <PaginationEllipsis :index="2" />
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </CardFooter>
  </Card>
</template>
