<template lang="pug">
q-scroll-area.fit
  .row
    .col-6
      q-scroll-area.fit
        pre: code(class="language-html text-xs") {{pretty(htmlModules)}}
    .col-6
      .text-h6 Módulos
      vue-json-pretty(:data="oda.structure.data" :deep="2")
      .text-h6 Media
      vue-json-pretty(:data="oda.structure.mediafiles" :deep="2")
</template>
<script setup>
import { ref, inject, onMounted, watch } from "vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
import pretty from "pretty";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
const props = defineProps({
  htmlModules: String,
});
const emit = defineEmits([]);
const oda = useOdaBasicaStore();
watch(
  () => oda.structure.view,
  (vall) => {
    if (vall) {
      hljs.highlightAll();
    }
  }
);
onMounted(() => {
  setTimeout(() => {
    hljs.highlightAll();
  }, 500);
});
</script>
