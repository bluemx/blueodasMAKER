<template lang="pug">
.row.column.full-height.bg-blue-grey-1.rounded-borders.q-px-xs.q-pb-xs
  .col-grow
    .row.column.full-height
      q-toolbar.bg-blue-grey-1.col-1.rounded-borders
        .row.full-width.items-center
          .col-6 Vista previa
          .col-6.text-right
            q-btn(unelevated flat color="purple-6" :icon="oda.structure.view?'dvr':'html'" @click="changeview" size="sm").q-mr-sm: q-tooltip Ver código
            q-btn(unelevated flat color="purple-8" icon="devices" @click="responsiveView=!responsiveView" size="sm").q-mr-sm: q-tooltip Responsivo
            q-btn(unelevated color="purple-6" icon="las la-sync" @click="resync" size="sm").q-mr-sm: q-tooltip Actualizar
            BasicasHTML_download(@downloading="downloading=$event" @resync="resync()" :iframe="iframe")
            //q-btn(unelevated flat color="purple-6" icon="las la-file-archive" @click="download"  size="sm"): q-tooltip Descargar
      .col-grow(v-show="!oda.structure.view").text-center
        iframe(ref="iframe" v-if="insync" style="border:none;" :class="responsiveView?'responsiveView full-height q-mx-auto':'fit'").rounded-borders.bg-white
      .col-grow.bg-white(v-show="oda.structure.view")
            BasicasHTML_viewcode(:html-modules="htmlModules")

</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
import { Json2Html } from "json-into-html";
import BasicasHTML_viewcode from "./BasicasHTML_viewcode.vue";
import BasicasHTML_download from "./BasicasHTML_download.vue";

const currentScroll = ref(0)

const responsiveView = ref(false);

const htmlModules = ref("loading...");

const emitter = inject("EMITTER");

const iframe = ref(null);
const iDoc = ref(null);

const oda = useOdaBasicaStore();
const appcontainer = ref();
const modulescontainer = ref();
const insync = ref(true);
const downloading = ref(false);

const htmlbody = ref([]);

const changeview = () => {
  oda.structure.view = !oda.structure.view;
};

const resync = async () => {
   currentScroll.value = iDoc.value.body.scrollTop

  oda.buildLocations();
  insync.value = false;

  setTimeout(() => {
    insync.value = true;
    setTimeout(() => {
      
      build();
      
    }, 100);
  }, 100);
};

emitter.on("updatePreview", (e) => resync());

const build = () => {

  htmlModules.value = Json2Html(oda.structure.data);

  iDoc.value = iframe.value.contentWindow.document;

  //-metaCharset
  createTag("meta", [["charset", "UTF-8"]], false, iDoc.value.head);
  //-metaViewport
  createTag(
    "meta",
    [
      ["name", "viewport"],
      ["content", "width=device-width, initial-scale=1.0"],
    ],
    false,
    iDoc.value.head
  );
  //-Title
  createTag("title", [], oda.structure.title, iDoc.value.head);

  //-App Container
  appcontainer.value = createTag(
    "div",
    [
      ["class", "container mx-auto my-5"],
      ["id", "app"],
    ],
    false,
    iDoc.value.body
  );
  //-Script loader
  let scriptloadingprevent = "text/javascript";
  if (downloading.value) {
    scriptloadingprevent = "text/test";
  }
  createTag(
    "script",
    [
      ["src", oda.structure.loader],
      ["data-loader-version", oda.structure.loaderVersion],
      ["type", scriptloadingprevent],
    ],
    false,
    iDoc.value.body
  );
  buildModules();
};

const modulateAttributes = (dattrs) => {
  let dataattributes = dattrs;
  let attrs = [];
  for (const key in dataattributes) {
    let attribute = dataattributes[key];
    if (typeof attribute == "object") {
      let newAttribute = "";
      Object.keys(attribute).map((key, index) => {
        newAttribute += " " + attribute[key];
      });
      attribute = newAttribute;
    }
    attrs.push([key, attribute]);
  }
  return attrs;
};

const buildModules = () => {
  //-OdaTitle
  createTag(
    "oda-titulo",
    [
      ["title", oda.structure.title],
      ["subtitle", oda.structure.subtitle],
    ],
    false,
    appcontainer.value
  );

  modulescontainer.value = createTag("div", [], false, appcontainer.value);

  // ----------------------- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // ----------------------- modules

  modulescontainer.value.innerHTML = htmlModules.value;
  //-OdaFinalize
  createTag("oda-finalizar", [], false, appcontainer.value);
  setTimeout(()=>{
    iframe.value.contentWindow.scrollTo(0, currentScroll.value)
  }, 200)
};

// ----------------------- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ----------------------- createTag
const createTag = (tag, attributes, content, appendTo) => {
  let newTag = iDoc.value.createElement(tag);
  for (let i of attributes) {
    newTag.setAttribute(i[0], i[1]);
  }
  if (content) {
    newTag.innerHTML += content;
  }
  appendTo.appendChild(newTag);
  return newTag;
};
// ----------------------- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ----------------------- createModule
const createModule = (tag, attributes, content, appendTo) => {
  let newTag = iDoc.value.createElement(tag);
  for (let i of attributes) {
    newTag.setAttribute(i[0], i[1]);
  }
  if (content) {
    content.map((key, index) => {
      let item = content[index];

      if (item) {
        if (typeof item == "string") {
          //String content
          newTag.innerHTML += item;
        } else {
          //Module within

          if (item && item.data != null) {
            createModuleInside(newTag, item.data);
          }
        }
      }
    });
  }

  htmlbody.value.push(newTag);
  appendTo.appendChild(newTag);
  return newTag;
};

const createModuleInside = (appendTo, item) => {
  createModule(
    item.tag,
    modulateAttributes(item.attrs),
    item.content,
    appendTo
  );
};

onMounted(() => {
  build();
});
</script>

<style>
.responsiveView {
  width: 320px;
}
</style>
