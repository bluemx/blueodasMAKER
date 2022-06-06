<template lang="pug">
.fit.bg-primary.rounded-borders.q-pa-md
  q-scroll-area.fit
    .text-h6.text-white Media
    .text-caption.text-white Botón derecho para eliminar.
    .row.q-col-gutter-sm
      template(v-for="(item,index) in oda.structure.mediafiles")
        .col-6: q-img(:src="item.cdn" :ratio="1").rounded-borders.shadow-20
          .absolute-bottom.flex.flex-center.text-caption(style="padding:4px; line-height:1; overflow-wrap: anywhere;") {{item.name}}
          q-menu(touch-position context-menu)
            q-list(dense)
              q-item(clickable v-close-popup @click="deleteItem(item, index)")
                q-item-section Eliminar

  UploadFile(@mediafile="storeFiles($event)")
</template>
<script setup>
//https://app.uploadcare.com/projects/ed843b7f034e5b94b294/files/1463ae68-7b2c-4c79-a952-c0d98258e653/?limit=100&ordering=-datetime_uploaded
import { ref, onMounted, inject } from "vue";
import { useQuasar } from "quasar";
import { useOdaBasicaStore } from "src/stores/odabasica";
import { UploadClient } from "@uploadcare/upload-client";
import UploadFile from "./uploadFile.vue";

const client = new UploadClient({ publicKey: "ed843b7f034e5b94b294" });

const props = defineProps({});
const emit = defineEmits([]);
const oda = useOdaBasicaStore();
const $q = useQuasar();
onMounted(() => {});

const deleteItem = (item, index) => {
  oda.structure.mediafiles.splice(index, 1);
};

const openfile = async () => {
  const files = await window.showOpenFilePicker({
    multiple: true,
  });
  for (var i in files) {
    const thefile = await files[i].getFile();
    storeFiles(thefile);
  }
};

const storeFiles = async (fileToUpload) => {
  client.uploadFile(fileToUpload).then((file) => {
    let fileuploaded = {
      name: fileToUpload.name,
      uuid: file.uuid,
      cdn: file.cdnUrl,
    };
    //Rewrite?
    const isRewrite = findRewrite(fileuploaded.name);
    if (isRewrite > -1) {
      oda.structure.mediafiles[isRewrite] = fileuploaded;
      $q.notify("Imagen " + fileuploaded.name + " actualizada");
      oda.buildLocations();
    } else {
      oda.structure.mediafiles.push(fileuploaded);
      $q.notify("Nueva imagen: " + fileuploaded.name);
    }
  });
};

const findRewrite = (byName) => {
  return oda.structure.mediafiles.findIndex((x) => x.name === byName);
};
</script>
