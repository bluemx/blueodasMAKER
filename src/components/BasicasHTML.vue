<template lang="pug">
.row.column.full-height.bg-blue-grey-1.rounded-borders.q-px-xs.q-pb-xs
  .col-grow
    .row.column.full-height
      q-toolbar.bg-blue-grey-1.col-1.rounded-borders
        .row.full-width.items-center
          .col-6 Vista previa
          .col-6.text-right
            q-btn(unelevated color="purple-6" icon="las la-sync" @click="resync" size="sm").q-mr-sm: q-tooltip Actualizar
            q-btn(unelevated flat color="purple-6" icon="las la-file-archive" @click="download"  size="sm"): q-tooltip Descargar
      .col-grow.bg-white
        iframe(ref="iframe" v-if="insync" style="border:none;").fit.rounded-borders

</template>

<script setup>
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ref, onMounted, inject } from "vue";
import { useOdaBasicaStore } from "src/stores/odabasica";

const emitter = inject("EMITTER");

const iframe = ref(null);
const iDoc = ref(null);

const oda = useOdaBasicaStore();
const appcontainer = ref();
const insync = ref(true);
const downloading = ref(false);

const resync = async () => {
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
      [
        "src",
        "https://cdn.jsdelivr.net/gh/bluemx/blueodasv2/basicas/assets/loader.min.js",
      ],
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

  // ----------------------- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  // ----------------------- modules
  for (var dt of oda.structure.data) {
    let attrs = modulateAttributes(dt.data.attrs);
    createModule(dt.data.tag, attrs, dt.data.content, appcontainer.value);
  }
  //-OdaFinalize
  createTag("oda-finalizar", [], false, appcontainer.value);
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
// ----------------------- ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ----------------------- Download

const download = () => {
  downloading.value = true;
  resync();
  setTimeout(() => {
    var zip = new JSZip();
    var folder = zip.folder("basica");

    //-HTML
    folder.file(
      "index.html",
      iframe.value.contentWindow.document.documentElement.outerHTML.replace(
        "text/test",
        "text/javascript"
      )
    );
    //-JSON
    folder.file("oda.json", JSON.stringify(oda.structure));
    //-IMG
    var img = folder.folder("img");

    //img.file("smile.gif", imgData, { base64: true });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      saveAs(content, "basica.zip");
      downloading.value = false;
      resync();
    });
  }, 750);
};
</script>
