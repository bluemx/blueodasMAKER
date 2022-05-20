<template lang="pug">


</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  schema: Object,
});
const emit = defineEmits(["add"]);
const add = (mod) => {
  emit("add", mod);
};
</script>
