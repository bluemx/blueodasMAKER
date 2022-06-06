<template lang="pug">


template(v-for="(item, index) in options")
  .row.items-center.q-mt-xs
    .col-1: q-radio(v-model="answer" dense :val="index" @update:model-value="updateAnswer"): q-tooltip Asignar correcta
    .col: q-input(bg-color="white" outlined dense v-model="options[index].v1" :label="'{{v1}}'"  @update:model-value="updateOptions")
    .col: q-input(bg-color="white" outlined dense v-model="options[index].v2" :label="'{{v2}}'"  @update:model-value="updateOptions")
    .col: q-select(bg-color="white" outlined dense v-model="options[index].v3" :label="'{{v3}}'"  @update:model-value="updateOptions" :options="oda.structure.mediafiles" map-options option-value="cdn" emit-value option-label="name" options-dense)
    .col-1(v-if="options.length>1"): q-btn(padding="4px 2px" icon="delete" unelevated size="xs" @click="deleteItem(index)"): q-tooltip Eliminar opción
  
  //
    .col-10
      div {{index}} {{item}}
      q-input(bg-color="white" outlined dense v-model="output.options[index]" type="text" @update:model-value="updateModel" :label="'Opción '+(index+1)")


.q-my-xs.text-center
  q-btn(icon="add" unelevated size="sm" @click="addItem" label="Añadir opción")

  //.text-caption Opción correcta:
    q-btn-toggle(v-model="output.answer" :options="optionsAnswer" unelevated no-caps size="md" @update:model-value="updateModel")
      template: Icon(icon="fxemoji:crossmark")


</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
const oda = useOdaBasicaStore();


const emitter = inject("EMITTER");
const props = defineProps({
  options: String,
  answer: Number
});
const emit = defineEmits(["update:options", "update:answer"]);

const deleteItem = (index) => {
  options.value.splice(index, 1);
  updateOptions();
};
const addItem = () => {
  options.value.push({'v1':'','v2':'','v3':''});
  updateOptions();
};


const options= ref([])
const answer= ref([])


const updateOptions = (event) => {
  emit("update:options", stringify(options.value).replaceAll('"', "'"));
  emitter.emit("updatePreview", {});
}
const updateAnswer = (event) => {
  emit("update:answer", answer.value);
  emitter.emit("updatePreview", {});
}


const importData = () => {
  options.value = (eval(props.options))
  answer.value = props.answer
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
