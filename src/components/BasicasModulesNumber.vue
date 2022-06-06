<template lang="pug">

.row.justify-center.items-center.q-col-gutter-sm
  .col-8
    .text-caption {{name}}
    q-slider(v-model="modelValue" :min="min" :max="max" label @update:model-value="updateModel" type="number")
  .col: q-input( outlined dense :label="name" v-model="modelValue" type="number" @update:model-value="updateModel")

</template>

<script setup>
import { ref, inject, onMounted } from "vue";

const emitter = inject("EMITTER");
const props = defineProps({
  modelValue: [Number, String],
  name: String,
  min: Number,
  max: Number,
});
const emit = defineEmits(["update:modelValue"]);
const updateModel = (event) => {
  emit("update:modelValue", parseInt(event));
  //emitter.emit("updatePreview", {});
};
</script>
