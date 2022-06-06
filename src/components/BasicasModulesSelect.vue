<template lang="pug">

.row.justify-center.items-center.q-col-gutter-sm
  .col-8
    q-select(bg-color="white" :label="name" v-model="modelValue" outlined dense options-dense :options="options"  @update:model-value="updateModel")
  .col: q-input(bg-color="white" :label="name" outlined dense v-model="modelValue" type="text" @update:model-value="updateModel")

</template>

<script setup>
import { ref, inject, onMounted } from "vue";

const emitter = inject("EMITTER");
const props = defineProps({
  modelValue: [String, Number, Boolean],
  name: String,
  options: Array,
});
const emit = defineEmits(["update:modelValue"]);
const updateModel = (event) => {
  emit("update:modelValue", event);
  //emitter.emit("updatePreview", {});
};
</script>
