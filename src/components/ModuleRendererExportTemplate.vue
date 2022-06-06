<template lang="pug">

q-btn(label="Exportar template" size="sm" unelevated color="white" :text-color="color" @click="exportTemplate")
a(id="exporttemplatebtn" ref="exporttemplatebtn" style="display:none;" :href="dataStr" :download="item.id+'.json'")
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  item: Object,
  color: String,
});
const emit = defineEmits([]);
const exporttemplatebtn = ref();

var dataStr =
  "data:text/json;charset=utf-8," +
  encodeURIComponent(JSON.stringify(props.item));

const exportTemplate = () => {
  exporttemplatebtn.value.click();
};
</script>
