<template lang="pug">

.row.justify-center.items-center.q-col-gutter-sm
  .col-8
    q-select(:label="name" v-model="modelValue" outlined dense options-dense :options="options")
  .col: q-input( outlined dense v-model="modelValue" type="text" @update:model-value="updateModel")

</template>

<script setup>
import { ref, inject, onMounted } from "vue";

const emitter = inject("EMITTER");
const props = defineProps({
  modelValue: String,
  name: String,
  options: Array,
});
const emit = defineEmits(["update:modelValue"]);
const updateModel = (event) => {
  emit("update:modelValue", event);
  //emitter.emit("updatePreview", {});
};
</script>
