<template>
  <div class="pagination">
    <button v-if="total > 0 && page > 1" @click="prev">Anterior</button>
    <span v-if="total === 0">
        No hay elementos disponibles 
        <i class="mdi mdi-emoticon-sad-outline"></i>

    </span>

    <span v-else>Página {{ page }} de {{ totalPages }}</span>

    <button v-if="total > 0 && page < totalPages" @click="next">Siguiente</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  page: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
  total: { type: Number, required: true }
});

const emit = defineEmits(['update:page']);

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)));

const prev = () => {
  if (props.page > 1) emit('update:page', props.page - 1);
};
const next = () => {
  if (props.page < totalPages.value) emit('update:page', props.page + 1);
};
</script>

<style scoped>
.pagination {
  margin: 20px 0;

  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

}
button {
  background: #49bbbd;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
</style>
