<template lang="pug">
q-btn(unelevated flat color="purple-6" icon="las la-save" @click="download"  size="sm"): q-tooltip Descargar
</template>
<script setup>
import { ref, inject, onMounted } from "vue";
import { useOdaBasicaStore } from "src/stores/odabasica";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
const props = defineProps({
  iframe: [Object, String],
});
const emit = defineEmits(["downloading"]);
const oda = useOdaBasicaStore();

const download = () => {
  emit("downloading", true);
  //downloading.value = true;
  emit("resync");

  //resync();
  setTimeout(() => {
    let iframeTXT =
      props.iframe.contentWindow.document.documentElement.outerHTML;
    iframeTXT = iframeTXT.replace("text/test", "text/javascript");
    var zip = new JSZip();
    var folder = zip.folder("basica");

    //-IMG
    var img = folder.folder("img");
    for (var i in Object.keys(oda.structure.mediafiles)) {
      img.file(
        oda.structure.mediafiles[i].name,
        urlToPromise(oda.structure.mediafiles[i].cdn),
        { binary: true }
      );
      iframeTXT = iframeTXT.replace(
        oda.structure.mediafiles[i].cdn,
        "img/" + oda.structure.mediafiles[i].name
      );
    }

    //-HTML
    folder.file("index.html", iframeTXT);

    //-JSON
    folder.file("oda.json", JSON.stringify(oda.structure));

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "basica.zip");
      emit("downloading", false);
      emit("resync");
    });
  }, 750);
};

const urlToPromise = async (url) => {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
</script>
