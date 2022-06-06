<template lang="pug">

.row.justify-center.items-center.q-col-gutter-sm
  .col: q-checkbox(left-label :label="name" size="lg" v-model="modelValue"  @update:model-value="updateModel" )
  //q-input( outlined dense v-model="modelValue" type="text" @update:model-value="updateModel" :label="name")

</template>

<script setup>
import { ref, inject, onMounted } from "vue";

const emitter = inject("EMITTER");
const props = defineProps({
  modelValue: [String, Number, Boolean],
  name: String,
});
const emit = defineEmits(["update:modelValue"]);
const updateModel = (event) => {
  emit("update:modelValue", event);
  //emitter.emit("updatePreview", {});
};
</script>
