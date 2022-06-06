<template lang="pug">
.col-auto.bg-blue-grey-1.q-pa-xs.rounded-borders
  .row.column.q-col-gutter-xs()
    .q-col(v-for="modname in ['layout', 'util', 'module']")
      q-btn-group(spread unelevated)
        template(v-for="(item, index) in schema[modname]")
          q-btn(:icon="schemaStyles[item.name].icon" size="sm" dense :color="schemaStyles[item.name].color" @click="add(item)"): q-tooltip {{schemaStyles[item.name].name}}


</template>
<script setup>
import { ref } from "vue";
import BasicasSchema from "./BasicasSchema";
const props = defineProps({});
//const schema = BasicasSchema.schema;
const schema = BasicasSchema.modules;
const schemaStyles = BasicasSchema.styles;
const emit = defineEmits(["add"]);
const add = (mod) => {
  emit("add", mod);
};
</script>
