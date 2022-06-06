<template lang="pug">
//q-btn(unelevated flat color="purple-6" icon="las la-file-upload"  size="sm" @click="open"): q-tooltip Cargar
q-dialog(v-model="dialog")
  q-card()
    q-card-section
      div(ref="dropArea" style="width: 320px; height: 320px;" :class="ishover?'bg-primary':''").flex.justify-center.items-center
        | Imagenes, recursos o Json

</template>
<script setup>
import { ref, onMounted, inject } from "vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
const oda = useOdaBasicaStore();
const props = defineProps({});
const emit = defineEmits(["mediafile"]);
const dialog = ref();
const dropArea = ref();
const ishover = ref();
const emitter = inject("EMITTER");
const open = () => {
  dialog.value = true;
  setTimeout(() => {
    dropEvents;
  }, 500);
};

const dropEvents = () => {
  //dropArea.value.addEventListener("dragover", (event) => {
  document.body.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    dialog.value = true;
  });

  //dropArea.value.addEventListener("drop", (event) => {
  document.body.addEventListener("drop", (event) => {
    event.stopPropagation();
    event.preventDefault();

    const fileList = event.dataTransfer.files;
    for (var fl of fileList) {
      if (fl.type == "application/json") {
        readFile(fl);
      } else {
        emit("mediafile", fl);
      }
    }
    //readFile(fileList[0]);
    ishover.value = false;
    dialog.value = false;
  });
};

dropEvents();

const readFile = (file) => {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    const result = event.target.result;
    if (
      result.includes("title") &&
      result.includes("subtitle") &&
      result.includes("data")
    ) {
      // ODA
      oda.update(JSON.parse(result));
    } else {
      //TEMPLATE
      oda.structure.data.push(JSON.parse(result));
    }
    oda.buildLocations();
    emitter.emit("updatePreview", {});
  });
  reader.readAsText(file);
};
</script>
