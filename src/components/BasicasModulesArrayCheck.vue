<template lang="pug">

.row.items-center.q-col-gutter-sm
    .col-1: q-radio(v-model="output.answer" :val="0" @update:model-value="updateModel" dense): q-tooltip Asignar correcta
    .col-8 Vacío

.row.items-center(v-for="(item, index) in output.options").full-width.q-mt-xs
    .col-1: q-radio(v-model="output.answer" :val="index+1" @update:model-value="updateModel" dense): q-tooltip Asignar correcta
    .col
      q-input(bg-color="white" outlined dense v-model="output.options[index]" type="text" @update:model-value="updateModel" :label="'Opción '+(index+1)")
        template(v-slot:append): Icon(:icon="item")
    .col-1(v-if="output.options.length>1"): q-btn(icon="delete" padding="4px 2px" unelevated size="sm" @click="deleteItem(index)"): q-tooltip Eliminar opción

.q-my-xs.text-center
  q-btn(icon="add" unelevated size="sm" @click="addItem" label="Añadir opción")

</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const emitter = inject("EMITTER");
const props = defineProps({
  modelValue: [String, Number],
  binded: String,
});
const emit = defineEmits(["update:modelValue"]);

const deleteItem = (index) => {
  output.value.options.splice(index, 1);
  updateModel();
};
const addItem = () => {
  output;
  output.value.options.push("fxemoji:crossmark");
  updateModel();
};

const optionsAnswer = ref([{ label: "Ninguno", value: 0 }]);

const output = ref({
  options: ["fxemoji:crossmark"],
  answer: 0,
});

const updateModel = (event) => {
  optionsAnswer.value = [];
  optionsAnswer.value.push({ label: "Ninguno", value: 0 });
  for (var i in output.value.options) {
    optionsAnswer.value.push({
      label: output.value.options[i],
      value: parseInt(i + 1),
    });
  }

  emit("update:modelValue", stringify(output.value).replaceAll('"', "'"));
  emitter.emit("updatePreview", {});
};

const importData = () => {
  let imp = props.modelValue;
  let bindeds = props.binded.split(",");
  for (var i in bindeds) {
    imp = imp.replace(bindeds[i], '"' + bindeds[i] + '"');
  }
  imp = imp.replaceAll("'", '"');
  imp = JSON.parse(imp);
  output.value = imp;
  updateModel();
};

const stringify = (obj_from_json) => {
  if (typeof obj_from_json !== "object" || Array.isArray(obj_from_json)) {
    return JSON.stringify(obj_from_json);
  }
  let props = Object.keys(obj_from_json)
    .map((key) => `${key}:${stringify(obj_from_json[key])}`)
    .join(",");
  return `{${props}}`;
};

onMounted(() => {
  importData();
});
</script>
