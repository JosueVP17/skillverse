<template>
  <div class="pagination">
    <button v-if="total > 0 && page > 1" @click="prev">Anterior</button>
    <span v-if="total === 0 && !isLoading">
        No hay elementos disponibles 
        <i class="mdi mdi-emoticon-sad-outline"></i>

    </span>

    <span v-else-if="total > 0">Página {{ page }} de {{ totalPages }}</span>

    <button v-if="total > 0 && page < totalPages" @click="next">Siguiente</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  page: { type: Number, required: true },
  perPage: { type: Number, default: 10 },
  total: { type: Number, required: true },
  isLoading: { type: Boolean, default: false }
});

const emit = defineEmits(['update:page']);

const totalPages = computed(() => Math.ceil(props.total / props.perPage) || 1);

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

@media (max-width: 1024px) {
  .pagination {
    gap: 12px;
    margin: 16px 0;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .pagination {
    gap: 10px;
    margin: 14px 0;
    font-size: 13px;
  }

  button {
    padding: 8px 14px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .pagination {
    gap: 8px;
    margin: 12px 0;
    flex-wrap: wrap;
    font-size: 12px;
  }

  button {
    padding: 6px 12px;
    font-size: 11px;
    flex: 1;
    min-width: 80px;
  }
}
</style>
