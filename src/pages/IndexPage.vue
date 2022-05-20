<template lang="pug">
q-page.flex.flex-center

  q-btn(to="/avanzadas" unelevated color="primary").q-ma-md Avanzadas
  q-btn(to="/basicas" unelevated color="secondary").q-ma-md Básicas

</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
