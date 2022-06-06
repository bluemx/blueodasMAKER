<template lang="pug">


.row.column.full-height
  //BasicasModulesPicker( @add="add")
  q-scroll-area.bg-blue-grey-1.q-pa-xs.col-grow.rounded-borders
    q-list()
      template(v-for="(item, index) in oda.structure.data")
        BasicasModuleRenderer(:item="item" :itemIndex="index" :itemsLength="oda.structure.data.length")
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { uid, useQuasar } from "quasar";
import { useOdaBasicaStore } from "src/stores/odabasica";
import BasicasModulesPicker from "./BasicasModulesPicker.vue";
import BasicasModuleRenderer from "./BasicasModuleRenderer.vue";

const $q = useQuasar();
const oda = useOdaBasicaStore();

oda.buildLocations();

const add = (schema) => {
  const sch = JSON.parse(JSON.stringify(schema));
  let id = uid().split("-");
  sch.id = Object.keys(oda.structure.data).length + id[0];
  oda.structure.data.push(sch);
  oda.buildLocations();
};
</script>
