<template lang="pug">
.row
  template(v-if="!activeOverlap")
    .col
      q-toggle(v-model="activeRelative" label="Relative"  @update:model-value="updateModel").text-caption
        q-tooltip Contenedor de objetos overlap
  template(v-if="!activeRelative")
    .col
      q-toggle(v-model="activeOverlap" label="Overlap"  @update:model-value="updateModel").text-caption
        q-tooltip Objeto flotante
template(v-if="activeOverlap")
  .row.q-col-gutter-xs
      .col-6: q-input(dense outlined type="number" v-model="sizepos.w" label="Width" @update:model-value="updateModel" bg-color="white")
      .col-6: q-input(dense outlined type="number" v-model="sizepos.h" label="Height" @update:model-value="updateModel" bg-color="white")
      .col-6: q-input(dense outlined type="number" v-model="sizepos.left" label="Left" @update:model-value="updateModel" bg-color="white")
      .col-6: q-input(dense outlined type="number" v-model="sizepos.top" label="Top" @update:model-value="updateModel" bg-color="white")

</template>
<script setup>
import { ref, onMounted, watch } from "vue";
const props = defineProps({
  modelValue: [String, Number],
});
const activeOverlap = ref(false);
const activeRelative = ref(false);

const sizepos = ref({
  w: 10,
  h: 10,
  left: 25,
  top: 25,
});
const sizeposclass = () => {
  const res = {
    w: " w-[" + sizepos.value.w + "%]",
    h: " h-[" + sizepos.value.h + "%]",
    left: " left-[" + sizepos.value.left + "%]",
    top: " top-[" + sizepos.value.top + "%]",
  };
  return res.w + res.h + res.left + res.top;
};
const emit = defineEmits(["update:modelValue"]);
const updateModel = () => {
  if (activeOverlap.value) {
    let overlapClasses = "is-overlapping-item absolute " + sizeposclass();
    overlapClasses = overlapClasses.replaceAll("  ", " ").trim();
    emit("update:modelValue", overlapClasses);
  } else {
    if (activeRelative.value) {
      emit("update:modelValue", "relative");
    } else {
      emit("update:modelValue", "");
    }
  }
};

watch(
  () => props.modelValue,
  (val) => {
    importedClasses();
  }
);

const importedClasses = () => {
  if (props.modelValue) {
    if (props.modelValue.includes("is-overlapping-item")) {
      activeOverlap.value = true;
    }
    let allcls = props.modelValue.split(" ");
    allcls.splice(0, 2);
    for (var i of allcls) {
      let nm = i.split("-")[0];
      let val = i.match(/\d+/g);
      sizepos.value[nm] = val;
    }
    //Relative
    if (props.modelValue == "relative") {
      activeRelative.value = true;
    }
  }
};
onMounted(() => {
  importedClasses();
});
</script>
