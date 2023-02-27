import type { Resource } from "../types";

import MonacoEditor from "../components/monaco-editor/index.vue";

export const title: Resource = {
  name: "title",
  title: "标题",
  icon: "el-icon-minus",
  group: "其他组件",
  settingsValue: { type: "title", label: "", labelWidth: 0 },
  settings: [
    {
      label: "标题内容",
      prop: "modelValue",
      type: "textarea",
      labelPosition: "top",
      value: "标题"
    },
    {
      label: "样式",
      prop: "styles",
      component: MonacoEditor,
      valueType: "object",
      tooltip: true,
      value: { textAlign: "center" }
    }
  ]
};
