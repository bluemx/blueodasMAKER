const styles = {
  "ROOT": {
    name: "ROOT",
    icon: "las la-flag",
    color: "blue-grey-4",
  },
  "layout-grid": {
    name: "Grid",
    icon: "las la-grip-horizontal",
    color: "blue-4",
  },
  "layout-box": {
    name: "Box",
    icon: "la la-plus-square",
    color: "blue-7",
  },
  div: {
    name: "Div",
    icon: "las la-expand",
    color: "blue-10",
  },
  "layout-img": {
    name: "Img",
    icon: "las la-image",
    color: "blue-13",
  },
  span: {
    name: "Span",
    icon: "las la-font",
    color: "purple-4",
  },
  strong: {
    name: "Strong",
    icon: "las la-bold",
    color: "purple-7",
  },
  em: {
    name: "Em",
    icon: "las la-italic",
    color: "purple-10",
  },
  "oda-instruccion": {
    name: "Instrucción",
    icon: "las la-comment-dots",
    color: "pink-4",
  },
  "oda-icon": {
    name: "Icono",
    icon: "las la-smile",
    color: "pink-7",
  },
  "template": {
    name: "Template",
    icon: "las la-square-full",
    color: "blue-grey-12",
  },
  "util-text": {
    name: "Texto",
    icon: "las la-heading",
    color: "pink-10",
  },
  "module-check": {
    name: "Check",
    icon: "las la-check-circle",
    color: "amber-6",
  },
  "module-drag": {
    name: "Drag",
    icon: "las la-expand-arrows-alt",
    color: "orange-7",
  },
  "module-drop": {
    name: "Dropzone",
    icon: "las la-compress-arrows-alt",
    color: "orange-9",
  },
  "module-select": {
    name: "Select",
    icon: "las la-circle",
    color: "deep-orange-6",
  },
  "module-input": {
    name: "Input",
    icon: "las la-edit",
    color: "deep-orange-9",
  },
  "module-choice": {
    name: "Choice",
    icon: "las la-icons",
    color: "deep-orange-11"
  },
};

const layout = [
  {
    name: "layout-grid",
    minimize: false,
    attr: {
      columns: 2,
      "columns-md": 2,
      gap: "2",
      class: "",
    },
    content: [],
  },
  {
    name: "layout-box",
    minimize: false,
    attr: {
      img: "",
      design: "",
      class: "",
    },
    content: [],
  },
  {
    name: "div",
    minimize: false,
    attr: {
      class: "",
    },
    content: [],
  },
  {
    name: "layout-img",
    minimize: false,
    attr: {
      "v-bind:img-variable": null,
      img: "",
      class: "",
    },
    content: [],
  },
];

const util = [
  {
    name: "oda-instruccion",
    minimize: false,
    attr: {
      class: "",
    },
    content: [],
  },
  {
    name: "oda-icon",
    minimize: false,
    attr: {
      name: "",
      class: "",
    },
    content: [],
  },
  {
    name: "util-text",
    minimize: false,
    attr: {
      design: "",
      class: "",
    },
    content: [],
  },
  {
    name: "span",
    minimize: false,
    attr: {
      class: "",
    },
    content: [],
  },
  {
    name: "strong",
    minimize: false,
    attr: {
      class: "",
    },
    content: [],
  },
  {
    name: "em",
    minimize: false,
    attr: {
      class: "",
    },
    content: [],
  },
];

const module = [
  {
    name: "module-check",
    minimize: false,
    attr: {
      "v-bind": "{options:['fxemoji:crossmark'],answer:1}",
      float: "",
      "v-bind:allok": false,
      class: "",
    },
    content: [],
  },
  {
    name: "module-drag",
    minimize: false,
    attr: {
      "v-bind:only-ok": false,
      "v-bind:allok": false,
      dropzone: "drop1",
      answer: "a",
      liner: 0,
      connector: 0,
      design: "",

      class: "",
    },
    content: [],
  },
  {
    name: "module-drop",
    minimize: false,
    attr: {
      name: "drop1",
      design: "",
      answer: "a",
      limit: 0,
      class: "",
    },
    content: [],
  },
  {
    name: "module-select",
    minimize: false,
    attr: {
      "v-bind:allok": false,
      "v-bind:answer": true,
      class: "",
    },
    content: [],
  },
  {
    name: "module-input",
    minimize: false,
    attr: {
      "v-bind:allok": false,
      answer: "",
      placeholder: "",
      class: "",
    },
    content: [],
  },
  {
    name: "module-choice",
    minimize: true,
    attr: {
      "v-bind:options": "[{v1:'campo 1', v2:'', v3:''}, {v1:'campo 2', v2:'', v3:''}, {v1:'campo 3', v2:'', v3:''}]",
      "v-bind:answer": 0,
      "v-bind:allok": false,
      class: "",
    },
    content: [
      {
        name: "template",
        minimize: false,
        attr: {
          "#option": "{v1,v2,v3}"
        },
        content: [
          {
            name: "div",
            minimize: false,
            attr: {
              class: ""
            },
            content: "{{v1}}"
          }
        ]
      }
      
    ],
  },
];

const modules = {
  layout,
  util,
  module,
};

export default { modules, styles };
