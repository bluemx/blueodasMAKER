<template lang="pug">


.row.justify-center.items-center.q-col-gutter-sm
    .col-6: q-select(bg-color="white" use-chips v-model="classes.padding" outlined dense options-dense label="Padding" :options="options.padding" multiple @update:model-value="changed"  :ref="el => { refsdom['padding'] = el }")
    .col-6: q-select(bg-color="white" use-chips v-model="classes.margin" outlined dense options-dense label="Margin" :options="options.margin" multiple @update:model-value="changed"  :ref="el => { refsdom['margin'] = el }")
    .col-6: q-select(bg-color="white" use-chips v-model="classes.text" outlined dense options-dense label="Text" :options="options.text" multiple @update:model-value="changed" :ref="el => { refsdom['text'] = el }")
    .col-6: q-select(bg-color="white" use-chips v-model="classes.utilidades" outlined dense options-dense label="Utilidades" :options="options.utilidades" multiple @update:model-value="changed" :ref="el => { refsdom['utilidades'] = el }")
    .col-6: q-select(bg-color="white" use-chips v-model="classes.width" outlined dense options-dense label="Width" :options="options.width" @update:model-value="changed")
    .col-6: q-select(bg-color="white" use-chips v-model="classes.height" outlined dense options-dense label="Height" :options="options.height" @update:model-value="changed")
    .col-6: q-select(bg-color="white" use-chips v-model="classes.textcolor" outlined dense options-dense label="Text Color" :options="options.textcolor" @update:model-value="changed")
    .col-6: q-select(bg-color="white" use-chips v-model="classes.background" outlined dense options-dense label="Background" :options="options.background" @update:model-value="changed")

    .col-12: ModulesClassOverlap(v-model="classes.overlap" @update:model-value="changed")
    .col-12: q-select( bg-color="white" use-chips v-model="classes.customclass" outlined multiple dense options-dense label="Custom class" hide-dropdown-icon use-input input-debounce="0" new-value-mode="add-unique" @update:model-value="changed")

//.row.justify-center.items-center.q-col-gutter-sm
    .col-12: q-select(bg-color="white" use-chips v-model="classes.padding" outlined dense options-dense label="Padding" :options="options.padding" multiple @update:model-value="changed"  :ref="el => { refsdom['padding'] = el }")
    .col-12: q-select(bg-color="white" use-chips v-model="classes.margin" outlined dense options-dense label="Margin" :options="options.margin" multiple @update:model-value="changed"  :ref="el => { refsdom['margin'] = el }")
    .col-12: q-select(bg-color="white" use-chips v-model="classes.text" outlined dense options-dense label="Text" :options="options.text" multiple @update:model-value="changed" :ref="el => { refsdom['text'] = el }")
    .col-12: q-select(bg-color="white" use-chips v-model="classes.utilidades" outlined dense options-dense label="Utilidades" :options="options.utilidades" multiple @update:model-value="changed" :ref="el => { refsdom['utilidades'] = el }")
    .col-12: q-select(bg-color="white" use-chips v-model="classes.width" outlined dense options-dense label="Width" :options="options.width" @update:model-value="changed")
    .col-12: q-select(bg-color="white" use-chips v-model="classes.height" outlined dense options-dense label="Height" :options="options.height" @update:model-value="changed")
    .col-12: q-select(bg-color="white" use-chips v-model="classes.textcolor" outlined dense options-dense label="Text Color" :options="options.textcolor" @update:model-value="changed")
    .col-12: q-select(bg-color="white" use-chips v-model="classes.background" outlined dense options-dense label="Background" :options="options.background" @update:model-value="changed")

    .col-12: ModulesClassOverlap(v-model="classes.overlap" @update:model-value="changed")
    .col-12: q-select( bg-color="white" use-chips v-model="classes.customclass" outlined multiple dense options-dense label="Custom class" hide-dropdown-icon use-input input-debounce="0" new-value-mode="add-unique" @update:model-value="changed")


</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import ModulesClassOverlap from "./ModulesClassOverlap.vue";

const emitter = inject("EMITTER");
const props = defineProps({
  modelValue: [String, Number],
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
  utilidades: null,
  width: null,
  height: null,
  textcolor: null,
  background: null,
  overlap: null,
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
    "font-bold",
    "font-extrabold",
  ],
  utilidades: [
    "shadow-oda",
    "rounded",
    "rounded-md",
    "rounded-xl",
    "border-0",
    "border-2",
    "border-4",
    "border-8",
    "border-main",
    "border-sec",
    "border-accent",
    "border-clear",
    "border-solid",
    "border-dashed",
    "border-dotted",
    "border-double",
    "flex",
    "justify-center",
    "items-center",
    "flex-col",
    "flex-row",
    "flex-wrap",
  ],
  width: [],
  height: [],
  textcolor: [],
  background: [],
});

for (var side of ["", "x", "y", "t", "r", "b", "l"]) {
  for (var size of ["auto", "0", "0.5", "1", "2", "3", "5", "8", "10"]) {
    options.value.padding.push("p" + side + "-" + size);
    options.value.margin.push("m" + side + "-" + size);
  }
}

for (var col of [
  "main",
  "sec",
  "clear",
  "accent",
  "isok",
  "notok",
  "pastel1",
  "pastel2",
  "pastel3",
  "pastel4",
  "pastel5",
  "pastel6",
  "gray-100",
  "gray-300",
  "gray-500",
  "white",
  "black",
]) {
  options.value.textcolor.push("text-" + col);
  options.value.background.push("bg-" + col);
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
        if (
          key == "padding" ||
          key == "margin" ||
          key == "text" ||
          key == "utilidades"
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
  //Custom classes
  const customclasses = importedClasses.filter(
    (el) => !classesAdded.includes(el)
  );

  classes.value.customclass = customclasses;
  overlappingClasses();
};
const overlappingClasses = () => {
  const overlappingBaseClass = "is-overlapping-item";
  const isoverlappingitem =
    classes.value.customclass.indexOf(overlappingBaseClass);
  const isrelativeitem = classes.value.customclass.indexOf("relative");

  if (isoverlappingitem > -1) {
    classes.value.overlap = overlappingBaseClass;
    classes.value.customclass.splice(isoverlappingitem, 1);
    classes.value.customclass = classes.value.customclass.filter((cls) => {
      let isov = true;
      if (cls.includes("%") || cls == "absolute" || cls == "relative") {
        classes.value.overlap += " " + cls;
        isov = false;
      }
      return isov;
    });
  }

  if (isrelativeitem > -1) {
    classes.value.overlap = "relative";
    classes.value.customclass.splice(isrelativeitem, 1);
  }
};
onMounted(() => {
  importClasses();
});
</script>
