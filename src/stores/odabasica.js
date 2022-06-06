import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import BasicasSchema from "src/components/BasicasSchema";
import { Notify } from "quasar";

const schema = BasicasSchema.modules;
const systemVersion = "0.18";
const loaderVersion = "v1.0.24";



let allitems = []
let itemTreeIds = []

const findAllItems = (structuredata) => {
  allitems = []  
  for (var item of structuredata) {
    allitems.push({name: item.name, id: item.id, location: item.location})
    if(item.content.length>0 && typeof item.content != 'string') {
      findAllItemsInside(item.content)
    }
  }
  return allitems
}

const findAllItemsInside = (itemContent) => {
  for(var item of itemContent){
    allitems.push({name: item.name, id: item.id, location: item.location})
    if(item.content.length>0 && typeof item.content != 'string') {
      findAllItemsInside(item.content)
    }
  }
}

const loaderURL = (loaderVersion) => {
  return "https://cdn.jsdelivr.net/gh/bluemx/blueodasv2" + ("@" + loaderVersion) + "/basicas/assets/loader.min.js"
}

export const useOdaBasicaStore = defineStore("odabasica", {
  state: () => ({
    activeModule: useStorage("odabasica_activeModule", {}),
    structure: useStorage("odabasica_structure", {
      title: "Título",
      subtitle: "Subtítulo",
      data: [],
      view: false,
      version: systemVersion,
      loaderVersion: loaderVersion,
      loader: loaderURL(loaderVersion),
      mediafiles: [],
    }),
  }),

  getters: {
    get(state) {
      return state.structure;
    },
    getData(state) {
      return state.structure.data;
    },
    getAllItems() {
      
      return findAllItems(this.structure.data)
    }
  },

  actions: {
    setActive (data) {
      this.activeModule = data
    },
    update(data) {
      this.structure = data;
    },
    buildLocations() {
      if (this.structure.version != systemVersion) {
        this.structure.version = systemVersion;
        Notify.create("JSON actualizado");
      }
      if (this.structure.loaderVersion != loaderVersion) {
        this.structure.loaderVersion = loaderVersion;
        this.structure.loader = loaderURL(loaderVersion);
        console.log(this.structure.loader)
        Notify.create("ODA actualizada");
      }

      for (var i in this.structure.data) {
        let item = this.structure.data[i];
        if (item) {
          item.location = i;
          this.updateModuleFields(item);
          if (typeof item.content != "string") {
            this.recursiveBuildLocation(item);
          }
        }
      }
    },
    recursiveBuildLocation(itemRecursive) {
      if (itemRecursive && itemRecursive.content) {
        for (var i in itemRecursive.content) {
          let item = itemRecursive.content[i];
          if (typeof item != "string") {
            item.location = itemRecursive.location + "," + i;
            this.recursiveBuildLocation(item);
            this.updateModuleFields(item);
          }
        }
      }
    },

    updateModuleFields(item) {
      let foundSchema;
      foundSchema = schema.layout.find((x) => {
        return x.name == item.name;
      });
      if (!foundSchema) {
        foundSchema = schema.util.find((x) => {
          return x.name == item.name;
        });
      }
      if (!foundSchema) {
        foundSchema = schema.module.find((x) => {
          return x.name == item.name;
        });
      }
      if(foundSchema && foundSchema.attr){
        for (var i of Object.keys(foundSchema.attr)) {
          if (!(i in item.attr)) {
            item.attr[i] = foundSchema.attr[i];
            console.log("updated " + i, item.attr);
            Notify.create(item.name + " actualizado");
          }
        }
      }

    },

    removeItem(item) {
      let keys = item.location.split(",");
      let prop = parseInt(keys.pop());
      if (keys.length == 0) {
        prop = parseInt(item.location);
      }
      let parent = keys.reduce(
        (obj, key) => obj[key].content,
        this.structure.data
      );
      parent.splice(prop, 1);
      //delete parent[prop];
      this.buildLocations();
    },
    duplicateItem(item, uid) {
      let keys = item.location.split(",");
      let prop = parseInt(keys.pop());
      let parent = keys.reduce(
        (obj, key) => obj[key].content,
        this.structure.data
      );
      let newItem = JSON.parse(JSON.stringify(item));
      newItem.id = uid;
      parent.push(newItem);

      this.buildLocations();
    },
    moveItem(item, dir) {
      let keys = item.location.split(",");
      let prop = parseInt(keys.pop());

      if (keys.length == 0) {
        prop = parseInt(item.location);
      }

      let parent = keys.reduce(
        (obj, key) => obj[key].content,
        this.structure.data
      );

      if (dir == "up") {
        if (prop > 0) {
          const prevItem = JSON.parse(
            JSON.stringify(parent[parseInt(prop - 1)])
          );
          const item = JSON.parse(JSON.stringify(parent[prop]));
          parent[parseInt(prop - 1)] = item;
          parent[prop] = prevItem;
        }
      }
      if (dir == "down") {
        if (prop < parent.length - 1) {
          const nextItem = JSON.parse(
            JSON.stringify(parent[parseInt(prop + 1)])
          );
          const item = JSON.parse(JSON.stringify(parent[prop]));
          parent[prop] = nextItem;
          parent[parseInt(prop + 1)] = item;
        }
      }
      this.buildLocations();
    },
    getItemTree (item) {
      let locations = item.location.split(',')
      if(locations.length>0){
        return this.structure.data[locations[0]]
      } else {
        return this.structure.data[item.location]
      }
    },
    getItemTreeIds (item) {
      let rootParent = this.getItemTree(item)
      itemTreeIds = []
      if(!itemTreeIds.includes(rootParent.id)){
        itemTreeIds.push(rootParent.id)
      }
      if(typeof rootParent.content != 'string'){
        this.getItemTreeIdsRecursive(rootParent)
      }
      return itemTreeIds
    },
    getItemTreeIdsRecursive (rootParent) {
      if( typeof rootParent.content != 'string'){
        for(var item of rootParent.content){
          if(!itemTreeIds.includes(item.id)){
            itemTreeIds.push(item.id)
          }
          this.getItemTreeIdsRecursive(item)
        }
      }
    },
    reset() {
      this.activeModule = {};
      this.structure = null;
    },
  },
});
