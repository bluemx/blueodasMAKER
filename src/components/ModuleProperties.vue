<template lang="pug">

.row.column.full-height(v-if="itemSchema")
  //BasicasModulesPicker( @add="add")
  q-scroll-area(:class="'bg-'+itemSchema.color" :thumb-style="thumbStyle").q-py-xs.col-grow.rounded-borders
    q-list()
        q-item.q-px-xs
            q-item-section(side).q-px-xs: q-icon(:name="itemSchema.icon" size="xs" color="white")
            q-item-section.text-white
                .text-caption.text-bold(style="line-height: 1") {{itemSchema.name}}
                .text-caption.text-grey-1(style="line-height: 1" v-if="item.id"): span.cursor-pointer ({{item.id}})
                    q-popup-edit(v-model="item.id" v-slot="scope" auto-save :class="'bg-'+itemSchema.color").q-pa-none
                        q-input(v-model="scope.value" dense outlined autofocus bg-color="white" :color="itemSchema.color").q-pa-none.q-ma-none
            q-item-section(side style="padding: 0;").bg-white.rounded-borders
                .row
                    //-- DUPLICATE
                    q-item-section(side).q-px-xs: q-btn(icon="content_copy" size="xs" flat @click="duplicateItem()" :color="itemSchema.color" padding="2px 4px"): q-tooltip Duplicar
                    //-- DELETE
                    q-btn(icon="close" size="xs" flat @click="deleteItem()" :color="itemSchema.color" padding="2px 4px"): q-tooltip Eliminar
        BasicasModulesContent(v-model="item.content" :parent="item")
        
        ModulePropertiesList(:item="item")


        div(:class="'bg-'+schemaStyles[item.name].color").rounded-borders.q-pa-sm.q-ma-xs
          .row.justify-center.items-center.q-col-gutter-sm.text-center
            .col-6
              // MOVE ITEM
              ModuleRendererMoveItem(:item="item" :color="schemaStyles[item.name].color" @close="()=>{propertiesMenu=false; updatePreview()}")
            .col-6
              // EXPORT TEMPLATE
              ModuleRendererExportTemplate(:item="item" :color="schemaStyles[item.name].color")

        
        //div {{oda.activeModule}}
</template>
<script setup>
import { ref, provide, inject, onMounted } from "vue";
import { uid, useQuasar, openURL } from "quasar";
import { useOdaBasicaStore } from "src/stores/odabasica";
import BasicasSchema from "./BasicasSchema";
import BasicasModulesContent from "./BasicasModulesContent.vue";
import ModulePropertiesList from "./ModulePropertiesList.vue";
import ModuleRendererExportTemplate from "./ModuleRendererExportTemplate.vue";
import ModuleRendererMoveItem from "./ModuleRendererMoveItem.vue";

const schemaStyles = BasicasSchema.styles;
const $q = useQuasar();
const props = defineProps({})
const emit = defineEmits([])
const emitter = inject("EMITTER");

const oda = useOdaBasicaStore();

const itemSchema = ref(null)
const item = ref(null)

onMounted(() => {
    if(oda.activeModule){
        itemSchema.value = schemaStyles[oda.activeModule.name]
        item.value = oda.activeModule
    }
})



const deleteItem = () => {
  $q.dialog({
    title: "Eliminar " + item.value.name + " " + item.value.id,
    cancel: true,
  }).onOk(() => {
    oda.removeItem(item.value);
    emitter.emit("updatePreview", {});
    oda.activeModule = {}
    item.value = null
  });
};
const duplicateItem = () => {
  const theid = uid().split("-");
  oda.duplicateItem(item.value, theid[0]);
};


const thumbStyle = {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '2px',
    opacity: 0.2
}

const updatePreview = () => {
  emitter.emit("updatePreview", {});
};

</script>