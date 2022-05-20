<template lang="pug">
.col-auto.bg-blue-grey-1.q-pa-xs.rounded-borders
  q-btn-group(spread unelevated)
    template(v-for="(mod,key, index) in schema.layout" :key="mod.name")
      q-btn(:icon="mod.icon" size="sm" dense :color="mod.color" @click="add(mod)"): q-tooltip {{mod.name}}

  q-btn-group(spread unelevated).q-mt-xs
    template(v-for="(mod,key, index) in schema.util" :key="mod.name")
      q-btn(:icon="mod.icon" size="sm" dense :color="mod.color" @click="add(mod)"): q-tooltip {{mod.name}}

  q-btn-group(spread unelevated).q-mt-xs
    template(v-for="(mod,key, index) in schema.module" :key="mod.name")
      q-btn(:icon="mod.icon" size="sm" dense :color="mod.color" @click="add(mod)"): q-tooltip {{mod.name}}

</template>
<script setup>
import { ref } from "vue";
import BasicasSchema from "./BasicasSchema";
const props = defineProps({});
const schema = BasicasSchema.schema;
const emit = defineEmits(["add"]);
const add = (mod) => {
  emit("add", mod);
};
</script>
