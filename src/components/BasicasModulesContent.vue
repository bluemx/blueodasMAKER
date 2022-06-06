<template lang="pug">
.row.justify-center.items-center.q-col-gutter-xs.q-px-xs
  .col-12(v-if="modules.length==0")
    q-input(v-model="moduleText" outlined  dense label="Contenido" @update:model-value="changed" bg-color="white" autogrow ).text-caption
  .col-12(v-if="!moduleText"): BasicasModulesPicker(@add="add")

</template>
<script setup>
import { ref, onMounted } from "vue";
import { uid, useQuasar } from "quasar";
import BasicasModulesPicker from "./BasicasModulesPicker.vue";
import BasicasModuleRenderer from "./BasicasModuleRenderer.vue";
import { useOdaBasicaStore } from "src/stores/odabasica";

const oda = useOdaBasicaStore();

const $q = useQuasar();
const props = defineProps({
  modelValue: [Array, String],
  parent: Object,
});
const emit = defineEmits(["update:modelValue"]);

const moduleText = ref();
const modules = ref([]);
const changed = (event) => {
  let content;
  if (moduleText.value) {
    content = moduleText.value;
  } else {
    content = [];
    modules.value.forEach((item) => {
      content.push(item);
    });
  }
  emit("update:modelValue", content);
};

const add = (schema) => {
  const sch = JSON.parse(JSON.stringify(schema));
  let id = uid().split("-");
  sch.id = Object.keys(props.modelValue).length + id[0];
  modules.value.push(sch);
  changed();
  oda.buildLocations();
};

const importModules = () => {
  if (typeof props.modelValue == "string") {
    moduleText.value = props.modelValue;
  } else {
    for (var i in Object.keys(props.modelValue)) {
      modules.value.push(props.modelValue[i]);
    }
  }

  const importdata = Object.keys(props.modelValue);
  /*
  if (typeof importdata == "string") {
    moduleText.value = importdata;
  } else {
  }
*/
  /*
  if (importdata.length > 0) {
    importdata.map((key, index) => {
      const importItem = props.modelValue[key];
      if (importItem != null) {
        if (typeof importItem == "string") {
          if (importItem != "") {
            moduleText.value = importItem;
          }
        } else {
          modules.value.push(importItem);
        }
      }
    });
  }
  */
};

onMounted(() => {
  importModules();
});
</script>
