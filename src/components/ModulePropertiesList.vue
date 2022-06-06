<template lang="pug">
template(v-for="(attr, key) in item.attr")
    div.bg-white.rounded-borders.q-pa-xs.q-ma-xs(:data="key")
        //- Module ALLOK
        template(v-if="key=='v-bind:allok'")
            q-toggle(v-model="item.attr[key]" label="AllOk"):  q-tooltip Cualquier respuesta arroja correcto
        
        //- Module Check
        template(v-if="key=='v-bind' && item.name=='module-check'")
            BasicasModulesArrayCheck(v-model="item.attr[key]" binded="options,answer")
        template(v-else-if="key=='float' && item.name=='module-check'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['', 'topleft', 'topright', 'bottomleft', 'bottomright']")
        //- Module Drag
        template(v-else-if="key=='dropzone' && item.name=='module-drag'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['drop1', 'drop2', 'drop3', 'drop4', 'drop5']")
        template(v-else-if="key=='answer' && item.name=='module-drag'")
            BasicasModulesInput(v-model="item.attr[key]" :name="key")
        template(v-else-if="key=='v-bind:only-ok' && item.name=='module-drag'")
            BasicasModulesBoolean(v-model="item.attr[key]" name="Sólo contar OK")
        template(v-else-if="key=='liner' && item.name=='module-drag'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="[0,1]")
        template(v-else-if="key=='connector' && item.name=='module-drag'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="[0,1]")
        //- Module Drop
        template(v-else-if="key=='design' && item.name=='module-drag'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="[0,1]")
        //- Module Drop
        template(v-else-if="key=='name' && item.name=='module-drop'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['drop1', 'drop2', 'drop3', 'drop4', 'drop5']")
        //- Module Drop
        template(v-else-if="key=='answer' && item.name=='module-drop'")
            BasicasModulesInput(v-model="item.attr[key]" :name="key")
        //- Module Drop
        template(v-else-if="key=='design' && item.name=='module-drop'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="[0,1]")
        //- Columns
        template(v-else-if="key=='limit' && item.name=='module-drop'")
            BasicasModulesNumber(v-model="item.attr[key]" :name="key" :min="0" :max="10")
        //- Module Select
        template(v-else-if="key=='v-bind:answer' && item.name=='module-select'")
            BasicasModulesBoolean(v-model="item.attr[key]" name="Respuesta:")
        //- Module Input
        template(v-else-if="key=='answer' && item.name=='module-input'")
            BasicasModulesInput(v-model="item.attr[key]" :name="key")
        template(v-else-if="key=='placeholder' && item.name=='module-input'")
            BasicasModulesInput(v-model="item.attr[key]" :name="key")
        //- Module Choice
        template(v-if="key=='v-bind:options' && item.name=='module-choice'")
            BasicasModulesArrayChoice(:options="item.attr['v-bind:options']" :answer="item.attr['v-bind:answer']" @update:options="item.attr['v-bind:options']=$event" @update:answer="item.attr['v-bind:answer']=$event")
        //- Columns
        template(v-else-if="key=='columns'")
            BasicasModulesNumber(v-model="item.attr[key]" :name="key" :min="1" :max="20")
        //- Columns-md
        template(v-else-if="key=='columns-md'")
            BasicasModulesNumber(v-model="item.attr[key]" :name="key" :min="1" :max="20")
        //- Gap
        template(v-else-if="key=='gap'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['0', '0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '8', '10', '16', '20', '40']")
        //- Layout - box Design
        
        //- Design
        template(v-else-if="key=='design' && item.name=='layout-box'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['0','1','2']")
        template(v-else-if="key=='design' && item.name=='util-text'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['0','1','2','3','4','5','6']")
        //- Img
        template(v-else-if="key=='img'")
            BasicasModulesSelectImg(v-model="item.attr[key]" :name="key" :options="oda.structure.mediafiles")
        //- Img-Variable
        template(v-else-if="key=='v-bind:img-variable'")
            BasicasModulesInput(v-model="item.attr[key]" :name="key")
        //- Color
        template(v-else-if="key=='color'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['1','2', '3', '4', '5', '6']")
        //- Size
        template(v-else-if="key=='size'")
            BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']")
        //- Name
        template(v-else-if="key=='name' && item.name!='module-drop'")
            BasicasModulesInput(v-model="item.attr[key]" :name="key")
        //- Class
        template(v-else-if="key=='class'")
            BasicasModulesClass(v-model="item.attr['class']")

</template>
<script setup>
import {ref} from 'vue'
import BasicasModulesClass from "./BasicasModulesClass.vue";
import BasicasModulesNumber from "./BasicasModulesNumber.vue";
import BasicasModulesSelect from "./BasicasModulesSelect.vue";
import BasicasModulesContent from "./BasicasModulesContent.vue";
import BasicasModulesInput from "./BasicasModulesInput.vue";
import BasicasModulesArrayCheck from "./BasicasModulesArrayCheck.vue";
import BasicasModulesArrayChoice from "./BasicasModulesArrayChoice.vue";
import BasicasModulesBoolean from "./BasicasModulesBoolean.vue";
import BasicasModulesSelectImg from "./BasicasModulesSelectImg.vue";
import ModuleRendererExportTemplate from "./ModuleRendererExportTemplate.vue";
import ModuleRendererMoveItem from "./ModuleRendererMoveItem.vue";

import { useOdaBasicaStore } from "src/stores/odabasica";
const oda = useOdaBasicaStore();

const props = defineProps({
    item: Object
})
const emit = defineEmits([])
</script>