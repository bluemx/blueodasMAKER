import { boot } from "quasar/wrappers";
import mitt from "mitt";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  const emitter = mitt();

  app.provide("EMITTER", emitter);

  //emitter.on("*", (type, e) => console.log(type, e));
});
