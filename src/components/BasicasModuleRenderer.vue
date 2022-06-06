<template lang="pug">
q-item.q-pr-none.q-px-none.q-py-none(v-if="insync" style="min-height: 32px; margin-top: 0px;" ).full-width
  div(style="width:4px !important; min-height: 20px; margin-right: 1px;" :class="'bg-'+replaceColor(schemaStyles[item.name].color)").rounded
  q-item-section: .row.items-center
    .col-12
      q-item(dense v-if="item" clickable @click="setActive" :class="oda.activeModule == item ? 'border-2 rounded border-dashed':''").q-px-none
        //- NAME - ICON 
        q-item-section(v-motion :initial="{opacity:0, x:-30}" :enter="{opacity:1, x:0}" style="").q-my-none.full-width
          q-item.q-px-none.q-py-none( style="min-height: 32px;" :class="'bg-'+replaceColor(schemaStyles[item.name].color)").rounded-borders
            q-item-section(side).q-px-xs.gt-sm: q-icon(:name="schemaStyles[item.name].icon" size="xs" color="white")
            q-item-section.text-white
              .text-caption.text-bold(style="line-height: 1") {{schemaStyles[item.name].name}}
              
              div.text-caption.text-grey-1(style="line-height: 1" v-if="item.id"): span ({{item.id}})
              //div.text-caption.text-grey-1(style="line-height: 1" v-if="item.id"): span.cursor-pointer ({{item.id}})
                q-popup-edit(v-model="item.id" v-slot="scope" auto-save :class="'bg-'+replaceColor(schemaStyles[item.name].color)").q-pa-none
                  q-input(v-model="scope.value" dense outlined autofocus bg-color="white" :color="replaceColor(schemaStyles[item.name].color)").q-pa-none.q-ma-none
            //-- MINIMIZE MAXIMIZE
            q-space
            q-item-section(side style="padding-left: 4px;" v-if="typeof item.content != 'string' && item.content.length>0")
              q-btn(icon="unfold_less" unelevated :flat="!item.minimize" :text-color="item.minimize?'dark':''" color="blue-grey-1" :label="item.content.length" size="sm" @click="item.minimize= !item.minimize" padding="2px 4px"): q-tooltip Mostrar/Ocultar
            
            q-item-section(side style="padding-left: 4px;")
              q-btn(icon="arrow_upward" size="xs" unelevated @click="moveItem(item, 'up')" :color="schemaStyles[item.name].color" padding="2px 4px" v-show="!(itemIndex-1<0)"): q-tooltip Subir
              q-btn(icon="horizontal_rule" size="xs" unelevated disabled :color="schemaStyles[item.name].color" padding="2px 4px" v-show="(itemIndex-1<0)")
              q-btn(icon="arrow_downward" size="xs" unelevated @click="moveItem(item, 'down')" :color="schemaStyles[item.name].color" padding="2px 4px" v-show="!(itemIndex+1>=itemsLength)"): q-tooltip Bajar
              q-btn(icon="horizontal_rule" size="xs" unelevated disabled :color="schemaStyles[item.name].color"  padding="2px 4px" v-show="(itemIndex+1>=itemsLength)"): q-tooltip Bajar

    //.col: q-item(dense v-if="item"  style="margin-bottom: 0px; background:rgba(255,255,255,0.8)").q-px-none.q-py-none.rounded-borders
        //- BUTTONS
        
        
        //-- CONTENT
        //q-item-section(side v-if="item" ).q-px-xs: q-btn(icon="add_circle" size="xs" flat :color="replaceColor(schemaStyles[item.name].color)"  padding="2px 4px")
          q-tooltip Contenido
          q-menu( @hide="updatePreview" style="background: rgba(200,200,200,0.1);").shadow-20
              div(style="max-width:600px")
                div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                  template(v-if="item.name=='oda-instruccion' || item.name=='oda-icon'")
                    div.q-mb-xs
                      q-btn(@click="openu('https://icon-sets.iconify.design/fxemoji/')" icon="insert_emoticon" size="xs" unelevated :color="replaceColor(schemaStyles[item.name].color)"): q-tooltip Iconos
                  BasicasModulesContent(v-model="item.content" :parent="item")

    
        //--PROPERTIES
        //-q-item-section(side v-if="item && item.attr").q-px-xs: q-btn(icon="settings" size="xs" flat :color="replaceColor(schemaStyles[item.name].color)"  padding="2px 4px")
          q-tooltip Propiedades
          //q-menu(:class="'bg-'+replaceColor(schemaStyles[item.name].color)" @hide="updatePreview" style="opacity:0.8")
          q-menu(@hide="updatePreview" style="background: rgba(200,200,200,0.1);" v-model="propertiesMenu").shadow-20
              div(style="width:100%; height:4px;" :class="'bg-'+replaceColor(schemaStyles[item.name].color)")
              
              div(style="max-width:480px")
                template(v-for="(attr, key) in item.attr")

                  //- Module ALLOK
                  template(v-if="key=='v-bind:allok'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      q-toggle(v-model="item.attr[key]" label="AllOk")
                      .text-caption Cualquier respuesta arroja correcto



                  //- Module Check
                  template(v-if="key=='v-bind' && item.name=='module-check'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesArrayCheck(v-model="item.attr[key]" binded="options,answer")
                  template(v-else-if="key=='float' && item.name=='module-check'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['', 'topleft', 'topright', 'bottomleft', 'bottomright']")
                  //- Module Drag
                  template(v-else-if="key=='dropzone' && item.name=='module-drag'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['drop1', 'drop2', 'drop3', 'drop4', 'drop5']")
                  template(v-else-if="key=='answer' && item.name=='module-drag'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesInput(v-model="item.attr[key]" :name="key")
                  template(v-else-if="key=='liner' && item.name=='module-drag'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="[0,1]")
                  template(v-else-if="key=='connector' && item.name=='module-drag'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="[0,1]")
                  //- Module Drop
                  template(v-else-if="key=='design' && item.name=='module-drag'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="[0,1]")
                  //- Module Drop
                  template(v-else-if="key=='name' && item.name=='module-drop'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['drop1', 'drop2', 'drop3', 'drop4', 'drop5']")
                  //- Module Drop
                  template(v-else-if="key=='answer' && item.name=='module-drop'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesInput(v-model="item.attr[key]" :name="key")
                  //- Module Drop
                  template(v-else-if="key=='design' && item.name=='module-drop'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="[0,1]")

                  //- Module Select
                  template(v-else-if="key=='v-bind:answer' && item.name=='module-select'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesBoolean(v-model="item.attr[key]" name="Respuesta:")

                  //- Module Input
                  template(v-else-if="key=='answer' && item.name=='module-input'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesInput(v-model="item.attr[key]" :name="key")
                  template(v-else-if="key=='placeholder' && item.name=='module-input'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesInput(v-model="item.attr[key]" :name="key")


                  //- Module Choice
                  template(v-if="key=='v-bind:options' && item.name=='module-choice'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesArrayChoice(:options="item.attr['v-bind:options']" :answer="item.attr['v-bind:answer']" @update:options="item.attr['v-bind:options']=$event" @update:answer="item.attr['v-bind:answer']=$event")


                  //- ###################################### Generic
                  

                  //- Layout - box Design
                  template(v-else-if="key=='design' && item.name=='layout-box'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['0','1','2']")
                  //- Columns
                  template(v-else-if="key=='columns'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesNumber(v-model="item.attr[key]" :name="key" :min="1" :max="20")
                  //- Columns-md
                  template(v-else-if="key=='columns-md'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesNumber(v-model="item.attr[key]" :name="key" :min="1" :max="20")
                  //- Gap
                  template(v-else-if="key=='gap'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['0', '0.5', '1', '1.5', '2', '2.5', '3', '4', '5', '8', '10', '16', '20', '40']")

                  //- Design
                  template(v-else-if="key=='design'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['0','1','2','3','4','5','6']")
                  
                  //- Img
                  template(v-else-if="key=='img'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelectImg(v-model="item.attr[key]" :name="key" :options="oda.structure.mediafiles")
                  
                  //- Img-Variable
                  template(v-else-if="key=='v-bind:img-variable'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesInput(v-model="item.attr[key]" :name="key")


                  //- Color
                  template(v-else-if="key=='color'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['1','2', '3', '4', '5', '6']")
                  //- Size
                  template(v-else-if="key=='size'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesSelect(v-model="item.attr[key]" :name="key" :options="['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']")
                  //- Name
                  template(v-else-if="key=='name'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesInput(v-model="item.attr[key]" :name="key")
                  //- Class
                  template(v-else-if="key=='class'")
                    div(style="background: rgba(255,255,255,0.7)").rounded-borders.q-pa-sm.q-ma-xs
                      BasicasModulesClass(v-model="item.attr['class']")


              div(:class="'bg-'+schemaStyles[item.name].color").rounded-borders.q-pa-sm.q-ma-xs
                .row.justify-center.items-center.q-col-gutter-sm.text-center
                  .col-6
                    // MOVE ITEM
                    ModuleRendererMoveItem(:item="item" :color="schemaStyles[item.name].color" @close="()=>{propertiesMenu=false; updatePreview()}")
                  .col-6
                    // EXPORT TEMPLATE
                    ModuleRendererExportTemplate(:item="item" :color="schemaStyles[item.name].color")


        //-- MOVE
        q-item-section(side ).q-px-xs
          q-btn(icon="arrow_upward" size="xs" flat @click="moveItem(item, 'up')" :color="replaceColor(schemaStyles[item.name].color)" padding="2px 4px" v-show="!(itemIndex-1<0)"): q-tooltip Subir
          q-btn(icon="arrow_upward" size="xs" flat color="blue-grey-1" disabled padding="2px 4px" v-show="(itemIndex-1<0)")
          q-btn(icon="arrow_downward" size="xs" flat @click="moveItem(item, 'down')" :color="replaceColor(schemaStyles[item.name].color)" padding="2px 4px" v-show="!(itemIndex+1>=itemsLength)"): q-tooltip Bajar
          q-btn(icon="arrow_downward" size="xs" flat color="blue-grey-1" padding="2px 4px" v-show="(itemIndex+1>=itemsLength)"): q-tooltip Bajar
        //-- DUPLICATE
        //q-item-section(side).q-px-xs: q-btn(icon="content_copy" size="xs" flat @click="duplicateItem(item)" :color="replaceColor(schemaStyles[item.name].color)" padding="2px 4px"): q-tooltip Duplicar
        //-- DELETE
        //q-item-section(side).q-px-xs: q-btn(icon="close" size="xs" flat @click="deleteItem(item, index)" :color="replaceColor(schemaStyles[item.name].color)" padding="2px 4px"): q-tooltip Eliminar

      
    q-list(v-if="item" v-show="!item.minimize").q-px-none.full-width
      template(v-for="(itemInner, indexInner) in item.content")
        template(v-if="typeof itemInner == 'object'")
          BasicasModuleRenderer(:item="itemInner" :itemIndex="indexInner" :itemsLength="item.content.length"  :internal="item")


</template>
<script setup>
import { ref, inject, onMounted } from "vue";
import { uid, useQuasar, openURL } from "quasar";
import BasicasModulesClass from "./BasicasModulesClass.vue";
import BasicasModulesNumber from "./BasicasModulesNumber.vue";
import BasicasModulesSelect from "./BasicasModulesSelect.vue";
import BasicasModulesContent from "./BasicasModulesContent.vue";
import BasicasModulesInput from "./BasicasModulesInput.vue";
import BasicasModulesArrayCheck from "./BasicasModulesArrayCheck.vue";
import BasicasModulesArrayChoice from "./BasicasModulesArrayChoice.vue";
import BasicasModulesBoolean from "./BasicasModulesBoolean.vue";
import BasicasSchema from "./BasicasSchema";
import { useOdaBasicaStore } from "src/stores/odabasica";
import BasicasModulesSelectImg from "./BasicasModulesSelectImg.vue";
import ModuleRendererExportTemplate from "./ModuleRendererExportTemplate.vue";
import ModuleRendererMoveItem from "./ModuleRendererMoveItem.vue";
const schemaStyles = BasicasSchema.styles;
const minimize = ref(false)
const emitter = inject("EMITTER");

const $q = useQuasar();
const props = defineProps({
  item: [Object, String],
  internal: [Object, String],
  itemIndex: Number,
  itemsLength: Number,
});


const setActive = () => {
  oda.setActive(props.item)
}

const emit = defineEmits([]);
const insync = ref(true);

const oda = useOdaBasicaStore();


const propertiesMenu = ref()

const replaceColor = (col) => {
  let newcol = col;
  return newcol;
};

const openu = (url) => {
  openURL(url);
};

const duplicateItem = (item) => {
  const theid = uid().split("-");
  oda.duplicateItem(item, theid[0]);
};
const moveItem = (item, dir) => {
  oda.moveItem(item, dir);
  updatePreview();
};

const deleteItem = (item, index) => {
  $q.dialog({
    title: "Eliminar " + item.name + " " + item.id,
    cancel: true,
  }).onOk(() => {
    oda.removeItem(props.item);
    emitter.emit("updatePreview", {});
  });
};

const updatePreview = () => {
  emitter.emit("updatePreview", {});
};
</script>
