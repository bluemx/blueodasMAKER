<template lang="pug">
q-page()
  q-layout(view="lhh lpR lff")
    q-drawer(v-model="mediadrawer" overlay behavior="mobile").bg-transparent.q-pa-sm
      MediaManager
    q-header.q-ma-sm.bg-transparent
      q-toolbar(square).shadow-0.bg-blue-grey-1.text-dark.rounded-borders
        q-toolbar-title: .text-caption.text-bold ODA Básica
          q-badge(size="xs").q-ml-xs {{oda.structure.version}}
            q-tooltip Versión ODAS MAKER
          q-badge(size="xs" color="grey").q-ml-xs {{oda.structure.loaderVersion}}
            q-tooltip Versión ODA 

        q-btn(icon="perm_media" size="md" round flat color="blue" @click="mediadrawer=!mediadrawer")

        q-btn(icon="add_circle" size="md" round flat color="red")
          q-tooltip Añadir módulo
          q-menu(class="bg-grey-100" @hide="updatePreview")
              div(style="width:400px")
                .bg-white.rounded-borders.q-pa-sm.q-ma-xs
                  BasicasModulesPicker( @add="add")
        BasicasFormTitle
        q-btn(icon="power_settings_new" size="md" round flat color="red" @click="reset")
          q-tooltip Reiniciar

    q-page-container.window-height
      .row.full-height
        //.col-2.full-height.q-py-md.q-px-sm.row.column.col-grow
        .col-2.full-height.q-py-md.q-px-xs
            BasicasModules
        .col-3.full-height.q-py-md.q-px-xs
          ModuleProperties(v-if="Object.entries(oda.activeModule).length>0" :key="oda.activeModule.id")
        .col.full-height.q-py-md.q-px-xs.row.column
          BasicasHTML


</template>

<script setup>
import { ref, provide, inject } from "vue";
import BasicasHTML from "src/components/BasicasHTML.vue";
import BasicasFormTitle from "../components/BasicasFormTitle.vue";
import BasicasModules from "../components/BasicasModules.vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
import BasicasModulesPicker from "src/components/BasicasModulesPicker.vue";
import { uid, useQuasar } from "quasar";
import MediaManager from "src/components/MediaManager.vue";
import ModuleProperties from "src/components/ModuleProperties.vue";

const emitter = inject("EMITTER");
const oda = useOdaBasicaStore();
const $q = useQuasar();

const mediadrawer = ref(false);

const add = (schema) => {
  const sch = JSON.parse(JSON.stringify(schema));
  let id = uid().split("-");
  sch.id = Object.keys(oda.structure.data).length + id[0];
  oda.structure.data.push(sch);
  oda.buildLocations();
};

const updatePreview = () => {
  emitter.emit("updatePreview", {});
};

const reset = () => {
  $q.dialog({
    title: "¿Reiniciar oda?",
    message: "No se podrá recuperar",
    cancel: true,
  }).onOk(() => {
    oda.reset();
    location.reload();
  });
};
</script>

<style lang="scss">
.q-drawer {
  background: transparent;
}
</style>
