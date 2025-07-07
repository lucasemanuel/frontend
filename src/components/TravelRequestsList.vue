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
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Pedidos de Viagem</CardTitle>
      <CardDescription>Aqui você encontra todos os pedidos de viagem.</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="min-w-[150px] text-start">Nome</TableHead>
            <TableHead class="min-w-[120px] text-start">Data de Ida</TableHead>
            <TableHead class="min-w-[120px] text-start">Data de Retorno</TableHead>
            <TableHead class="min-w-[150px] text-start">Destino</TableHead>
            <TableHead class="text-start">Status</TableHead>
            <TableHead class="min-w-[90px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="text-slate-600">João Silva</TableCell>
            <TableCell>2023-09-10</TableCell>
            <TableCell>2023-09-15</TableCell>
            <TableCell>São Paulo</TableCell>
            <TableCell>
              <Badge variant="default" class="bg-emerald-100 text-emerald-800">Aprovado</Badge>
            </TableCell>
            <TableCell class="text-end">
              <Button variant="outline" size="sm" class="gap-1">
                Ver
                <svg
                  class="size-5 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="text-slate-600">Maria Oliveira</TableCell>
            <TableCell>2023-10-01</TableCell>
            <TableCell>2023-10-05</TableCell>
            <TableCell>Rio de Janeiro</TableCell>
            <TableCell>
              <Badge variant="default" class="bg-yellow-100 text-yellow-800">Pendente</Badge>
            </TableCell>
            <TableCell class="text-end">
              <Button variant="outline" size="sm" class="gap-1">
                Ver
                <svg
                  class="size-5 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="text-slate-600">Carlos Souza</TableCell>
            <TableCell>2023-11-12</TableCell>
            <TableCell>2023-11-18</TableCell>
            <TableCell>Belo Horizonte</TableCell>
            <TableCell>
              <Badge variant="default" class="bg-red-100 text-red-800">Rejeitado</Badge>
            </TableCell>
            <TableCell class="text-end">
              <Button variant="outline" size="sm" class="gap-1">
                Ver
                <svg
                  class="size-5 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="text-slate-600">Ana Paula</TableCell>
            <TableCell>2023-12-03</TableCell>
            <TableCell>2023-12-10</TableCell>
            <TableCell>Curitiba</TableCell>
            <TableCell>
              <Badge variant="default" class="bg-emerald-100 text-emerald-800">Aprovado</Badge>
            </TableCell>
            <TableCell class="text-end">
              <Button variant="outline" size="sm" class="gap-1">
                Ver
                <svg
                  class="size-5 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell class="text-slate-600">Pedro Lima</TableCell>
            <TableCell>2024-01-15</TableCell>
            <TableCell>2024-01-20</TableCell>
            <TableCell>Salvador</TableCell>
            <TableCell>
              <Badge variant="default" class="bg-yellow-100 text-yellow-800">Pendente</Badge>
            </TableCell>
            <TableCell class="text-end">
              <Button variant="outline" size="sm" class="gap-1">
                Ver
                <svg
                  class="size-5 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <Pagination v-slot="{ page }" :items-per-page="10" :total="30" :default-page="2">
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
          <PaginationEllipsis :index="4" />
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </CardFooter>
  </Card>
</template>
