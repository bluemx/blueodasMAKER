<template lang="pug">
q-item.flex.align-items.q-px-xs.q-py-xs(v-if="insync")
  q-item-section
    //Header
    q-item(dense).q-px-none.q-py-none(:class="'bg-'+replaceColor(item.color)").rounded-borders
      q-item-section(side).q-px-xs: q-icon(:name="item.icon" size="xs" color="white")
      q-item-section.text-white
        .text-body1 - {{item.name}}
          span.text-caption.text-grey-1.q-ml-sm ({{item.id}})
      q-item-section(side).q-px-xs: q-btn(icon="close" size="xs" flat color="white" @click="deleteItem(item, index)")
    // Configurations
    q-expansion-item(expand-separator label="Propiedades" dense v-if="Object.keys(item.data.attrs).length>1")
      // Module configurations
      template(v-for="(attr, key) in item.data.attrs")

          //- Columns
          template(v-if="key=='columns'")
            .bg-white.rounded-borders.q-pa-sm.q-ma-xs
              BasicasModulesNumber(v-model="item.data.attrs[key]" :name="key" :min="1" :max="20")
          //- Columns-md
          template(v-if="key=='columns-md'")
            .bg-white.rounded-borders.q-pa-sm.q-ma-xs
              BasicasModulesNumber(v-model="item.data.attrs[key]" :name="key" :min="1" :max="20")
          //- Gap
          template(v-if="key=='gap'")
            .bg-white.rounded-borders.q-pa-sm.q-ma-xs
              BasicasModulesSelect(v-model="item.data.attrs[key]" :name="key" :options="['0', '0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '8', '10', '16', '20', '40']")
          //- Design
          template(v-if="key=='design'")
            .bg-white.rounded-borders.q-pa-sm.q-ma-xs
              BasicasModulesSelect(v-model="item.data.attrs[key]" :name="key" :options="[0,1,2,3,4,5,6]")
          //- Img
          template(v-if="key=='img'")
            .bg-white.rounded-borders.q-pa-sm.q-ma-xs
              BasicasModulesSelect(v-model="item.data.attrs[key]" :name="key" :options="['01.png', '02.png', '03.png']")
          //- Color
          template(v-if="key=='color'")
            .bg-white.rounded-borders.q-pa-sm.q-ma-xs
              BasicasModulesSelect(v-model="item.data.attrs[key]" :name="key" :options="['1','2', '3', '4', '5', '6']")
          //- Size
          template(v-if="key=='size'")
            .bg-white.rounded-borders.q-pa-sm.q-ma-xs
              BasicasModulesSelect(v-model="item.data.attrs[key]" :name="key" :options="['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']")

          //- Name
          template(v-if="key=='name'")
            .bg-white.rounded-borders.q-pa-sm.q-ma-xs
              BasicasModulesInput(v-model="item.data.attrs[key]" :name="key")

    q-expansion-item(expand-separator label="Clases" dense)
      .bg-white.rounded-borders.q-pa-sm.q-ma-xs
        BasicasModulesClass(v-model="item.data.attrs['class']")

    q-expansion-item(expand-separator label="Content" dense)
      .bg-white.rounded-borders.q-pa-sm.q-ma-xs
        BasicasModulesContent(v-model="item.data.content" :parent="item")


</template>
<script setup>
import { ref, inject } from "vue";
import { uid, useQuasar } from "quasar";
import BasicasModulesClass from "./BasicasModulesClass.vue";
import BasicasModulesNumber from "./BasicasModulesNumber.vue";
import BasicasModulesSelect from "./BasicasModulesSelect.vue";
import BasicasModulesContent from "./BasicasModulesContent.vue";
import BasicasModulesInput from "./BasicasModulesInput.vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
const emitter = inject("EMITTER");

const $q = useQuasar();
const props = defineProps({
  item: Object,
  itemindex: Number,
  internal: Object,
});
const emit = defineEmits([]);
const insync = ref(true);

const oda = useOdaBasicaStore();

const replaceColor = (col) => {
  let newcol = col;
  if (props.internal) {
    if (newcol.includes("blue")) {
      newcol = newcol.replace("blue", "cyan");
    }
    if (newcol.includes("pink")) {
      newcol = newcol.replace("pink", "purple");
    }
    if (newcol.includes("amber")) {
      newcol = newcol.replace("amber", "orange");
    }
  }
  return newcol;
};

const deleteItem = (item, index) => {
  $q.dialog({
    title: "Eliminar " + item.name + " " + item.id,
    cancel: true,
  }).onOk(() => {
    if (props.internal) {
      deleteInternal(item.id);
    } else {
      oda.structure.data.splice(index, 1);
    }
    emitter.emit("updatePreview", {});
  });
};

const deleteInternal = (id) => {
  const itemindex = props.internal.data.content.findIndex(
    (item) => item == props.item
  );
  delete props.internal.data.content[itemindex];
  insync.value = false;
  /*
  setTimeout(function () {
    insync.value = true;
  }, 100);
  */
};
</script>
