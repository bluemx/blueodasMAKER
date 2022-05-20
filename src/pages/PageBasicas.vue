<template lang="pug">
q-page()
  q-layout()
    q-header.q-ma-sm.bg-transparent
      q-toolbar(square).shadow-0.bg-blue-grey-1.text-dark.rounded-borders
        q-toolbar-title: .text-caption.text-bold ODA Básica
        BasicasFormTitle
    q-page-container.window-height
      .row.full-height
        .col-4.full-height.q-py-md.q-px-sm.row.column
          .col-grow: BasicasModules
        .col-8.full-height.q-py-md.q-px-sm.row.column
          BasicasHTML


    //q-footer.q-ma-sm
      q-toolbar.bg-grey
</template>

<script setup>
import { ref, provide } from "vue";
import BasicasHTML from "src/components/BasicasHTML.vue";
import BasicasFormTitle from "../components/BasicasFormTitle.vue";
import BasicasModules from "../components/BasicasModules.vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
</script>
