import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useOdaBasicaStore = defineStore("odabasica", {
  state: () => ({
    structure: useStorage("odabasica_structure", {
      title: "Título",
      subtitle: "Subtítulo",
      data: [],
    }),
  }),

  getters: {
    get(state) {
      return state.structure;
    },
    getData(state) {
      return state.structure.data;
    },
  },

  actions: {
    update(data) {
      this.structure = data;
    },
  },
});
