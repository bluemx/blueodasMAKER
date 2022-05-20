<template lang="pug">
.row.col-grow

  .col-grow: q-input(v-model="oda.structure.title" label="Título" dense outlined)
  .col-grow: q-input(v-model="oda.structure.subtitle" label="Subtítulo" dense outlined)
//.column.q-col-gutter-sm
  .col: q-input(v-model="oda.structure.title" label="Título" dense outlined input-class="bg-white")
  .col: q-input(v-model="oda.structure.subtitle" label="Subtítulo" dense outlined)
</template>

<script setup>
import { useOdaBasicaStore } from "src/stores/odabasica";
import { ref, onMounted, inject } from "vue";

const oda = useOdaBasicaStore();
</script>
