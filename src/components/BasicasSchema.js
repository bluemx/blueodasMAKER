const schema = {
  layout: {
    Grid: {
      name: "Grid",
      icon: "las la-border-all",
      color: "blue-4",
      type: "layoutGrid",
      data: {
        tag: "layout-grid",
        attrs: {
          columns: 4,
          "columns-md": 2,
          gap: "2",
          class: "",
        },
        content: [],
      },
    },
    Box: {
      name: "Box",
      icon: "la la-plus-square",
      color: "blue-5",
      type: "layoutBox",
      data: {
        tag: "layout-box",
        attrs: {
          design: "",
          img: "",
          class: "",
        },
        content: [],
      },
    },
    Div: {
      name: "Div",
      icon: "las la-border-style",
      color: "blue-6",
      type: "layoutDiv",
      data: {
        tag: "div",
        attrs: {
          class: "",
        },
        content: [],
      },
    },
  },
  util: {
    Instruction: {
      name: "Instrucción",
      icon: "las la-comment-dots",
      color: "pink-4",
      type: "odaInstruccion",
      data: {
        tag: "oda-instruccion",
        attrs: {
          class: "",
        },
        content: [],
      },
    },
    Icon: {
      name: "Icono",
      icon: "las la-smile",
      color: "pink-4",
      type: "odaIcon",
      data: {
        tag: "oda-icon",
        attrs: {
          name: "",
          class: "",
        },
        content: [],
      },
    },
    Text: {
      name: "Texto",
      icon: "las la-heading",
      color: "pink-4",
      type: "utilText",
      data: {
        tag: "util-text",
        attrs: {
          design: "",
          color: "",
          size: "",
          bold: "",
          extrabold: "",
          class: "",
        },
        content: [],
      },
    },
  },
  module: {
    Check: {
      name: "Check",
      icon: "las la-check-circle",
      color: "amber-7",
      type: "moduleCheck",
      data: {
        tag: "module-check",
        attrs: {
          answer: "",
          options: [""],
          class: "",
        },
        content: [],
      },
    },
    Drag: {
      name: "Drag",
      icon: "las la-expand-arrows-alt",
      color: "amber-8",
      type: "moduleDrag",
      data: {
        tag: "module-drag",
        attrs: {
          dropzone: "",
          answer: "",
          liner: "",
          connector: "",
          class: "",
        },
        content: [],
      },
    },
    Drop: {
      name: "Drop",
      icon: "las la-compress-arrows-alt",
      color: "amber-8",
      type: "moduleDrop",
      data: {
        tag: "module-drop",
        attrs: {
          name: "",
          answer: "",
          design: "",
          class: "",
        },
        content: [],
      },
    },
    Select: {
      name: "Select",
      icon: "las la-circle",
      color: "amber-9",
      type: "moduleSelect",
      data: {
        tag: "module-select",
        attrs: {
          answer: "",
          class: "",
        },
        content: [],
      },
    },
    Input: {
      name: "Check",
      icon: "las la-font",
      color: "amber-10",
      type: "moduleInput",
      data: {
        tag: "module-input",
        attrs: {
          answer: "",
          placeholder: "",
          class: "",
        },
        content: [],
      },
    },
  },
};
export default { schema };
