<template lang="pug">
.row.justify-center.items-center.q-col-gutter-sm
  .col-12: q-input(v-model="moduleText" outlined  dense label="Contenido" type="textarea" @update:model-value="changed")
  .col-12: BasicasModulesPicker(@add="add")
q-list(separator)
      template(v-for="(item, index) in modules" :key="item.id")
        BasicasModuleRenderer(:item="item" :itemindex="index" :internal="parent")
</template>
<script setup>
import { ref, onMounted } from "vue";
import { uid, useQuasar } from "quasar";
import BasicasModulesPicker from "./BasicasModulesPicker.vue";
import BasicasModuleRenderer from "./BasicasModuleRenderer.vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
const $q = useQuasar();
const props = defineProps({
  modelValue: Array,
  parent: Object,
});
const emit = defineEmits(["update:modelValue"]);

const moduleText = ref();
const modules = ref([]);
const changed = (event) => {
  let content = [];
  if (moduleText.value) {
    content.push(moduleText.value);
  }
  modules.value.forEach((item) => {
    content.push(item);
  });

  emit("update:modelValue", content);
};

const add = (schema) => {
  const sch = JSON.parse(JSON.stringify(schema));
  let id = uid().split("-");
  sch.id = Object.keys(props.modelValue).length + id[0];
  modules.value.push(sch);
  changed();
};

const importModules = () => {
  const importdata = Object.keys(props.modelValue);
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
};

onMounted(() => {
  importModules();
});
</script>
