<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CalendarDate, type DateValue, isEqualMonth } from "@internationalized/date";
import { type DateRange, RangeCalendarRoot, useDateFormatter } from "reka-ui";
import { createMonth, type Grid, toDate } from "reka-ui/date";
import { type Ref, ref, watch } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
} from "@/components/ui/range-calendar";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-vue-next";

import { useFiltersTravelStore } from '@/stores/FiltersTravel'
import { format } from 'date-fns'

const filtersTravelStore = useFiltersTravelStore();

const today = new Date();
const period = ref({
  start: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()).subtract({
    days: 40,
  }),
  end: new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()),
}) as Ref<DateRange>;

const locale = ref("pt-BR");
const formatter = useDateFormatter(locale.value);

const placeholder = ref(period.value.start) as Ref<DateValue>;
const secondMonthPlaceholder = ref(period.value.end) as Ref<DateValue>;

const firstMonth = ref(
  createMonth({
    dateObj: placeholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  })
) as Ref<Grid<DateValue>>;
const secondMonth = ref(
  createMonth({
    dateObj: secondMonthPlaceholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  })
) as Ref<Grid<DateValue>>;

function updateMonth(reference: "first" | "second", months: number) {
  if (reference === "first") {
    placeholder.value = placeholder.value.add({ months });
  } else {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months,
    });
  }
}

watch(placeholder, (_placeholder) => {
  firstMonth.value = createMonth({
    dateObj: _placeholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });
  if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months: 1,
    });
  }
});

watch(secondMonthPlaceholder, (_secondMonthPlaceholder) => {
  secondMonth.value = createMonth({
    dateObj: _secondMonthPlaceholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });
  if (isEqualMonth(_secondMonthPlaceholder, placeholder.value))
    placeholder.value = placeholder.value.subtract({ months: 1 });
});

import { Label } from "@/components/ui/label";

const destination = ref("");
const status = ref("");

const applyFilters = () => {
  const filters = {
    destination,
    status,
    startDate: period.value.start
      ? format(toDate(period.value.start), 'yyyy-MM-dd')
      : null,
    endDate: period.value.end
      ? format(toDate(period.value.end), 'yyyy-MM-dd')
      : null,
  }

  filtersTravelStore.setFilters(filters);
  filtersTravelStore.setDispatched(new Date().toISOString());
};

const clearFilters = () => {
  status.value = "";
  destination.value = "";
  filtersTravelStore.setFilters({filters: {
    destination: "",
    status: "",
    startDate: null,
    endDate: null,
  }});
  filtersTravelStore.setDispatched(new Date().toISOString());
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Filtros</CardTitle>
    </CardHeader>
    <CardContent>
      <form class="space-y-6">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="destination">Destino</Label>
            <Input id="destination" v-model="destination" type="text" placeholder="Belo Horizonte" />
          </div>
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="status">Destino</Label>
            <Select id="status" v-model="status">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Selecionar o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Todos</SelectItem>
                  <SelectItem value="requested">Pendente</SelectItem>
                  <SelectItem value="approved">Aprovado</SelectItem>
                  <SelectItem value="canceled">Rejeitado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="status">Período</Label>
            <Popover class="w-full">
              <PopoverTrigger as-child>
                <Button variant="outline" class="w-full justify-start text-left font-normal">
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
                  <template v-else> Pick a date </template>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <RangeCalendarRoot
                  locale="pt-BR"
                  v-slot="{ weekDays }"
                  v-model="period"
                  v-model:placeholder="placeholder"
                  class="p-3"
                >
                  <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
                    <div class="flex flex-col gap-4">
                      <div class="flex items-center justify-between">
                        <button
                          class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                          @click="updateMonth('first', -1)"
                        >
                          <ChevronLeft class="h-4 w-4" />
                        </button>
                        <div class="text-sm font-medium">
                          {{ formatter.fullMonthAndYear(toDate(firstMonth.value)) }}
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
                            v-for="(weekDates, index) in firstMonth.rows"
                            :key="`weekDate-${index}`"
                            class="mt-2 w-full"
                          >
                            <RangeCalendarCell
                              v-for="weekDate in weekDates"
                              :key="weekDate.toString()"
                              :date="weekDate"
                            >
                              <RangeCalendarCellTrigger :day="weekDate" :month="firstMonth.value" />
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
                        <div class="text-sm font-medium">
                          {{ formatter.fullMonthAndYear(toDate(secondMonth.value)) }}
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
                            v-for="(weekDates, index) in secondMonth.rows"
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
          </div>
          <div class="flex col-span-1 items-end justify-between">
            <Button variant="outline" type="button" @click.prevent="clearFilters">Limpar filtros</Button>
            <Button type="submit" @click.prevent="applyFilters">Aplicar filtros</Button>
          </div>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
