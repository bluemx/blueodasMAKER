<template lang="pug">

.row.justify-center.items-center.q-col-gutter-sm
  .col-8
    q-select(bg-color="white" :label="name" v-model="modelValue" outlined dense options-dense :options="options" map-options option-value="cdn" emit-value option-label="name" @update:model-value="updateModel")
  .col: q-input(bg-color="white" outlined dense v-model="modelValue" type="text" @update:model-value="updateModel")

</template>

<script setup>
import { ref, inject, onMounted } from "vue";

const emitter = inject("EMITTER");
const props = defineProps({
  modelValue: [String, Number],
  name: String,
  options: Array,
});
const emit = defineEmits(["update:modelValue"]);
const updateModel = (event) => {
  emit("update:modelValue", event);
  //emitter.emit("updatePreview", {});
};
</script>
