<template>
    <div class="container mx-auto px-4 pt-6 lg:px-8 lg:pt-8 xl:max-w-7xl">
      <div
        class="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start"
      >
        <div class="grow">
          <h1 class="mb-1 text-xl font-bold">Dashboard</h1>
          <h2 class="text-sm font-medium text-slate-500">
            Bem-vindo ao painel de pedidos de viagem
          </h2>
        </div>
        <div
          class="flex flex-none items-center justify-center gap-2 rounded-sm px-2 sm:justify-end sm:bg-transparent sm:px-0"
        >
            <DialogCreateTravelRequest>
              <Button>
                Solicitar viagem
              </Button>
            </DialogCreateTravelRequest>
        </div>
      </div>
      <hr class="mt-6 border-slate-200 lg:mt-8" />
    </div>

    <div class="container mx-auto p-4 lg:p-8 xl:max-w-7xl">

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <form class="space-y-6">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <FormField name="destination">
                <FormItem class="lg:col-span-2">
                  <FormLabel>Destino</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Belo Horizonte"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="status">
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl class="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="pending">
                          Pendente
                        </SelectItem>
                        <SelectItem value="approved">
                          Aprovado
                        </SelectItem>
                        <SelectItem value="canceled">
                          Rejeitado
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                <FormMessage />
                </FormItem>
              </FormField>
              <FormField name="period">
                <FormItem class="lg:col-span-2">
                  <FormLabel>Périodo</FormLabel>
                  <FormControl>
                    <Popover class="w-full">
                      <PopoverTrigger as-child>
                        <Button
                          variant="outline"
                          class="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon class="mr-2 h-4 w-4" />
                          <template v-if="period.start">
                            <template v-if="period.end">
                              {{
                                formatter.custom(toDate(period.start), {
                                  dateStyle: "medium",
                                })
                              }}
                              -
                              {{
                                formatter.custom(toDate(period.end), {
                                  dateStyle: "medium",
                                })
                              }}
                            </template>

                            <template v-else>
                              {{
                                formatter.custom(toDate(period.start), {
                                  dateStyle: "medium",
                                })
                              }}
                            </template>
                          </template>
                          <template v-else>
                            Pick a date
                          </template>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent class="w-auto p-0">
                        <RangeCalendarRoot v-slot="{ weekDays }" v-model="period" v-model:placeholder="placeholder" class="p-3">
                          <div
                            class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
                          >
                            <div class="flex flex-col gap-4">
                              <div class="flex items-center justify-between">
                                <button
                                  class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                                  @click="updateMonth('first', -1)"
                                >
                                  <ChevronLeft class="h-4 w-4" />
                                </button>
                                <div
                                  class="text-sm font-medium"
                                >
                                  {{
                                    formatter.fullMonthAndYear(
                                      toDate(firstMonth.value),
                                    )
                                  }}
                                </div>
                                <button
                                  class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                                  @click="updateMonth('first', 1)"
                                >
                                  <ChevronRight class="h-4 w-4" />
                                </button>
                              </div>
                              <RangeCalendarGrid>
                                <RangeCalendarGridHead>
                                  <RangeCalendarGridRow>
                                    <RangeCalendarHeadCell
                                      v-for="day in weekDays"
                                      :key="day"
                                      class="w-full"
                                    >
                                      {{ day }}
                                    </RangeCalendarHeadCell>
                                  </RangeCalendarGridRow>
                                </RangeCalendarGridHead>
                                <RangeCalendarGridBody>
                                  <RangeCalendarGridRow
                                    v-for="(
                                      weekDates, index
                                    ) in firstMonth.rows"
                                    :key="`weekDate-${index}`"
                                    class="mt-2 w-full"
                                  >
                                    <RangeCalendarCell
                                      v-for="weekDate in weekDates"
                                      :key="weekDate.toString()"
                                      :date="weekDate"
                                    >
                                      <RangeCalendarCellTrigger
                                        :day="weekDate"
                                        :month="firstMonth.value"
                                      />
                                    </RangeCalendarCell>
                                  </RangeCalendarGridRow>
                                </RangeCalendarGridBody>
                              </RangeCalendarGrid>
                            </div>
                            <div class="flex flex-col gap-4">
                              <div class="flex items-center justify-between">
                                <button
                                  class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                                  @click="updateMonth('second', -1)"
                                >
                                  <ChevronLeft class="h-4 w-4" />
                                </button>
                                <div
                                  class="text-sm font-medium"
                                >
                                  {{
                                    formatter.fullMonthAndYear(
                                      toDate(secondMonth.value),
                                    )
                                  }}
                                </div>

                                <button
                                  class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                                  @click="updateMonth('second', 1)"
                                >
                                  <ChevronRight class="h-4 w-4" />
                                </button>
                              </div>
                              <RangeCalendarGrid>
                                <RangeCalendarGridHead>
                                  <RangeCalendarGridRow>
                                    <RangeCalendarHeadCell
                                      v-for="day in weekDays"
                                      :key="day"
                                      class="w-full"
                                    >
                                      {{ day }}
                                    </RangeCalendarHeadCell>
                                  </RangeCalendarGridRow>
                                </RangeCalendarGridHead>
                                <RangeCalendarGridBody>
                                  <RangeCalendarGridRow
                                    v-for="(
                                      weekDates, index
                                    ) in secondMonth.rows"
                                    :key="`weekDate-${index}`"
                                    class="mt-2 w-full"
                                  >
                                    <RangeCalendarCell
                                      v-for="weekDate in weekDates"
                                      :key="weekDate.toString()"
                                      :date="weekDate"
                                    >
                                      <RangeCalendarCellTrigger
                                        :day="weekDate"
                                        :month="secondMonth.value"
                                      />
                                    </RangeCalendarCell>
                                  </RangeCalendarGridRow>
                                </RangeCalendarGridBody>
                              </RangeCalendarGrid>
                            </div>
                          </div>
                        </RangeCalendarRoot>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              </FormField>
              <div class="flex col-span-1 items-end justify-between">
                <Button variant="outline">Limpar filtros</Button>
                <Button>Aplicar filtros</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card class="mt-6">
        <CardHeader>
          <CardTitle>Pedidos de Viagem</CardTitle>
          <CardDescription>Aqui você encontra todos os pedidos de viagem.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="min-w-[150px] text-start ">Nome</TableHead>
                <TableHead class="min-w-[120px] text-start ">Data de Ida</TableHead>
                <TableHead class="min-w-[120px] text-start ">Data de Retorno</TableHead>
                <TableHead class="min-w-[150px] text-start ">Destino</TableHead>
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
                  <svg class="size-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"/>
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
                  <svg class="size-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"/>
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
                  <svg class="size-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"/>
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
                  <svg class="size-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"/>
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
                  <svg class="size-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"/>
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
    </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  CalendarDate,
  type DateValue,
  isEqualMonth,
} from '@internationalized/date'

import { type DateRange, RangeCalendarRoot, useDateFormatter } from 'reka-ui'

import { createMonth, type Grid, toDate } from 'reka-ui/date'
import { type Ref, ref, watch } from 'vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
} from '@/components/ui/range-calendar'

const today = new Date();
const period = ref({
  start: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()).subtract({ days: 40 }),
  end: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()),
}) as Ref<DateRange>

const locale = ref('en-US')
const formatter = useDateFormatter(locale.value)

const placeholder = ref(period.value.start) as Ref<DateValue>
const secondMonthPlaceholder = ref(period.value.end) as Ref<DateValue>

const firstMonth = ref(
  createMonth({
    dateObj: placeholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  }),
) as Ref<Grid<DateValue>>
const secondMonth = ref(
  createMonth({
    dateObj: secondMonthPlaceholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  }),
) as Ref<Grid<DateValue>>

function updateMonth(reference: 'first' | 'second', months: number) {
  if (reference === 'first') {
    placeholder.value = placeholder.value.add({ months })
  }
  else {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months,
    })
  }
}

watch(placeholder, (_placeholder) => {
  firstMonth.value = createMonth({
    dateObj: _placeholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  })
  if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months: 1,
    })
  }
})

watch(secondMonthPlaceholder, (_secondMonthPlaceholder) => {
  secondMonth.value = createMonth({
    dateObj: _secondMonthPlaceholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  })
  if (isEqualMonth(_secondMonthPlaceholder, placeholder.value))
    placeholder.value = placeholder.value.subtract({ months: 1 })
})

import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import DialogCreateTravelRequest from '@/components/DialogCreateTravelRequest.vue'

</script>
