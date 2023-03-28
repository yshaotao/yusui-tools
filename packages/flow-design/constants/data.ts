import { getBpmnId } from "@logicflow/extension/es/bpmn/getBpmnId";

export function defaultGraphData() {
  const StartEventId = "Event_" + getBpmnId();
  const flowId = "Flow_" + getBpmnId();
  const userTaskId = "Activity_" + getBpmnId();
  const processId = "Process_" + getBpmnId();
  return {
    processData: {
      type: "process",
      key: processId,
      properties: {}
    },
    flowElementList: [
      {
        incoming: [],
        outgoing: [flowId],
        type: "startEvent",
        key: StartEventId,
        properties: {
          name: "开始",
          x: 160,
          y: 240,
          text: {
            x: 160,
            y: 280,
            value: "开始"
          }
        }
      },
      {
        incoming: [flowId],
        outgoing: [],
        type: "userTask",
        key: userTaskId,
        properties: {
          name: "",
          x: 290,
          y: 240,
          text: ""
        }
      },
      {
        incoming: [StartEventId],
        outgoing: [userTaskId],
        type: "sequenceFlow",
        key: flowId,
        properties: {
          name: "",
          text: "",
          startPoint: { x: 178, y: 240 },
          endPoint: { x: 240, y: 240 },
          pointsList: [
            { x: 178, y: 240 },
            { x: 240, y: 240 }
          ]
        }
      }
    ]
  };
}
