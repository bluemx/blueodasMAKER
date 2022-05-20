<template lang="pug">


.row.justify-center.items-center.q-col-gutter-sm
    .col-6
      q-select(use-chips v-model="classes.padding" outlined dense label="Padding" :options="options.padding" multiple @update:model-value="changed"  :ref="el => { refsdom['padding'] = el }")
    .col-6: q-select(use-chips v-model="classes.margin" outlined dense label="Margin" :options="options.margin" multiple @update:model-value="changed"  :ref="el => { refsdom['margin'] = el }")
    .col-6: q-select(use-chips v-model="classes.text" outlined dense label="Text" :options="options.text" multiple @update:model-value="changed" :ref="el => { refsdom['text'] = el }")
    .col-6: q-select(use-chips v-model="classes.flex" outlined dense label="Flex" :options="options.flex" multiple @update:model-value="changed" :ref="el => { refsdom['flex'] = el }")
    .col-6: q-select(use-chips v-model="classes.width" outlined dense label="Width" :options="options.width" @update:model-value="changed")
    .col-6: q-select(use-chips v-model="classes.height" outlined dense label="Height" :options="options.height" @update:model-value="changed")
    .col-6: q-select(use-chips v-model="classes.background" outlined dense label="Background" :options="options.background" @update:model-value="changed")

    .col-12: q-select(use-chips v-model="classes.customclass" outlined multiple dense label="Custom class" hide-dropdown-icon use-input input-debounce="0" new-value-mode="add-unique" @update:model-value="changed")


</template>

<script setup>
import { ref, inject, onMounted } from "vue";

const emitter = inject("EMITTER");
const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
const updateModel = (event) => {
  emit("update:modelValue", event.target.value);
};

const refsdom = ref([]);

//::::Classes
const classes = ref({
  padding: null,
  margin: null,
  text: null,
  flex: null,
  width: null,
  height: null,
  background: null,
  customclass: null,
});

const changed = () => {
  let classesExport = "";
  Object.keys(classes.value).map((key, index) => {
    let classItem = classes.value[key];
    if (classItem) {
      if (typeof classItem == "object") {
        Object.keys(classItem).map((key2, index2) => {
          classesExport += " " + classItem[key2];
        });
      } else {
        classesExport += " " + classItem;
      }
    }
  });

  emit("update:modelValue", classesExport);
  emitter.emit("updatePreview", {});
};

//::::Options
const options = ref({
  padding: [],
  margin: [],
  text: [
    "text-left",
    "text-center",
    "text-right",
    "uppercase",
    "lowercase",
    "capitalize",
    "text-xs",
    "text-sm",
    "text-md",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
  ],
  flex: [
    "flex",
    "justify-content",
    "items-center",
    "flex-col",
    "flex-row",
    "flex-wrap",
  ],
  width: [],
  height: [],
  background: [
    "bg-main",
    "bg-sec",
    "bg-clear",
    "bg-accent",
    "bg-isok",
    "bg-notok",
    "bg-pastel1",
    "bg-pastel2",
    "bg-pastel3",
    "bg-pastel4",
    "bg-pastel5",
    "bg-pastel6",
    "bg-grey-100",
  ],
});

for (var side of ["a", "x", "y", "t", "r", "b", "l"]) {
  for (var size of ["0", "0.5", "1", "2", "3", "5", "8", "10"]) {
    options.value.padding.push("p" + side + "-" + size);
    options.value.margin.push("m" + side + "-" + size);
  }
}

for (var size of [
  "auto",
  "full",
  "fit",
  "0",
  "1",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "60",
  "80",
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "3/4",
  "1/5",
]) {
  options.value.width.push("w-" + size);
  options.value.height.push("h-" + size);
}

const importClasses = () => {
  if (!props.modelValue) {
    return false;
  }

  let importedClasses = props.modelValue;
  importedClasses = importedClasses.trim().split(" ");
  let classesAdded = [];
  for (var imp of importedClasses) {
    Object.keys(options.value).forEach((key, index) => {
      let opClasses = options.value[key];
      var itemIndex = opClasses.indexOf(imp);
      if (itemIndex > -1) {
        //console.log(key, imp, typeof classes.value[key]);
        //console.log(key, itemIndex, imp, typeof classes.value[key]);
        //if (typeof classes.value[key] == "array") {
        if (
          key == "padding" ||
          key == "margin" ||
          key == "text" ||
          key == "flex"
        ) {
          if (classes.value[key] == null) {
            classes.value[key] = [];
          }
          classes.value[key].push(imp);
        } else {
          classes.value[key] = imp.trim();
        }
        classesAdded.push(imp.trim());
      }
    });
  }
  const customclasses = importedClasses.filter(
    (el) => !classesAdded.includes(el)
  );
  classes.value.customclass = customclasses;
};
onMounted(() => {
  importClasses();
});
</script>
