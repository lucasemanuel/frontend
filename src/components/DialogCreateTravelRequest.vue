<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import api from '@/services/api'

import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { toDate } from 'reka-ui/date'
import { useForm } from 'vee-validate'
import { computed, h, ref } from 'vue'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { toast } from 'vue-sonner';

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const isOpen = ref(false);

const formSchema = toTypedSchema(z.object({
  departureDate: z
    .string({
      required_error: "Data de partida é obrigatória.",
      invalid_type_error: "Data de partida inválida."
    })
    .date()
    .refine((val) => {
      const inputDate = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return inputDate >= today
    }, {
      message: 'Só é possível selecionar datas a partir de hoje.',
    }),
  returnDate: z
    .string({
      required_error: "Data de retorno é obrigatória.",
      invalid_type_error: "Data de retorno inválida."
    })
    .date()
    .refine((val) => {
      const inputDate = new Date(val)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      today.setDate(today.getDate() - 1)
      return inputDate >= today
    }, {
      message: 'Só é possível selecionar datas a partir de hoje.',
    }),
  destination: z
    .string({
      required_error: "Destino é obrigatório",
      invalid_type_error: "Destino inválido",
    })
    .min(3, { message: 'Destino deve ter pelo menos 3 caracteres.' })
    .max(200, { message: 'Destino deve ter no máximo 200 caracteres.' }),
  reason: z
    .string({
      required_error: "Motivo é obrigatório",
      invalid_type_error: "Motivo inválido",
    })
    .min(3, { message: 'Motivo deve ter pelo menos 3 caracteres.' })
    .max(200, { message: 'Motivo deve ter no máximo 200 caracteres.' }),
}))

const placeholder = ref()

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
  },
})

const valueDepartureDate = computed({
  get: () => values.departureDate ? parseDate(values.departureDate) : undefined,
  set: val => val,
})

const valueReturnDate = computed({
  get: () => values.returnDate ? parseDate(values.returnDate) : undefined,
  set: val => val,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form values:', values)
  api.post('/travel-requests', {
    destination: values.destination,
    departure_date: values.departureDate,
    return_date: values.returnDate,
    reason: values.reason,
  }).then(() => {
    isOpen.value = false
    toast.success('Solicitação Enviada', {
      description: 'Sua solicitação foi enviada e logo será avaliada.',
    })
  }).catch((error) => {
    let errorMessage = 'Ocorreu um erro ao enviar sua solicitação. Tente novamente mais tarde.';
    if (error.status === 422) {
      const firstErrorKey = error?.response?.data?.errors ? Object.keys(error.response.data.errors)[0] : null;
      errorMessage = firstErrorKey ? error.response.data.errors[firstErrorKey][0] : 'Erro de validação';
    }
    toast.error('Erro ao enviar solicitação', {
      description: errorMessage,
    })
  })
})
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Solicitar viagem</DialogTitle>
        <DialogDescription>
            Preencha o motivo da solicitação de viagem e clique em salvar para continuar.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <form class="grid grid-cols-4 items-center gap-4" id="form-travel" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="destination">
            <FormItem class="col-span-full" >
              <FormLabel>Destino</FormLabel>
              <FormControl>
                <Input type="text" id="destination" placeholder="Reunião com cliente" v-bind="componentField"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="departureDate">
            <FormItem class="flex flex-col col-span-full" >
              <FormLabel>Data de partida</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline" class="text-muted-foreground"
                    >
                      <span>{{ valueDepartureDate ? df.format(toDate(valueDepartureDate)) : "Escolha a data" }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                    <input hidden>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar
                    v-model:placeholder="placeholder"
                    :model-value="valueDepartureDate"
                    calendar-label="Data de partida"
                    initial-focus
                    :min-value="today(getLocalTimeZone())"
                    @update:model-value="(v) => {
                      if (v) {
                        setFieldValue('departureDate', v.toString())
                      }
                      else {
                        setFieldValue('departureDate', undefined)
                      }
                    }"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="returnDate">
            <FormItem class="flex flex-col col-span-full" >
              <FormLabel>Data de retorno</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline" class="text-muted-foreground"
                    >
                      <span>{{ valueReturnDate ? df.format(toDate(valueReturnDate)) : "Escolha a data" }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                    <input hidden>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar
                    v-model:placeholder="placeholder"
                    :model-value="valueReturnDate"
                    calendar-label="Data de retorno"
                    initial-focus
                    :min-value="today(getLocalTimeZone())"
                    @update:model-value="(v) => {
                      if (v) {
                        setFieldValue('returnDate', v.toString())
                      }
                      else {
                        setFieldValue('returnDate', undefined)
                      }

                    }"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="reason">
            <FormItem class="col-span-full" >
              <FormLabel>Motivo</FormLabel>
              <FormControl>
                <Input type="text" id="reason" placeholder="Reunião com cliente" v-bind="componentField"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </div>
      <DialogFooter>
        <Button type="submit" form="form-travel">
          Enviar solicitação
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
