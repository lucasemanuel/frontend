<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { computed } from "vue";

interface Props {
  status: string;
}

const props = defineProps<Props>();

const badgeClass = computed(() => {
  switch (props.status) {
    case 'approved':
      return 'bg-emerald-100 text-emerald-800';
    case 'requested':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-red-100 text-red-800';
  }
});

const badgeText = computed(() => {
  switch (props.status) {
    case 'approved':
      return 'Aprovado';
    case 'requested':
      return 'Pendente';
    default:
      return 'Cancelado';
  }
});
</script>

<template>
  <Badge variant="default" :class="badgeClass">
    {{ badgeText }}
  </Badge>
</template>
