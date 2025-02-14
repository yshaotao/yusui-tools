import type { EdgeConfig, GraphConfigData, LogicFlow, NodeConfig, Point, TextConfig } from '@logicflow/core'

import { isString, omit } from 'lodash-unified'

export interface ProcessData {
  type?: string
  key?: string
  properties?: {
    name?: string
    category?: string
    icon?: string
    remark?: string
    [x: string]: unknown
  }
}

export interface FlowElement {
  incoming?: string[]
  outgoing?: string[]
  children?: string[]
  type?: string
  key?: string
  groupKey?: string
  properties?: Record<string, unknown>
}

export interface FlowNode extends FlowElement {
  properties?: {
    name?: string
    text?: TextConfig | string
    x?: number
    y?: number
    [x: string]: unknown
  }
}
export interface FlowEdge extends FlowElement {
  properties?: {
    name?: string
    text?: TextConfig | string
    startPoint?: Point
    endPoint?: Point
    pointsList?: Point[]
    [x: string]: unknown
  }
}

export interface TurboData {
  flowElementList?: FlowElement[]
  processData?: ProcessData
  [x: string]: unknown
}

const defaultProcessData = { type: 'process', key: 'Process', properties: {} }

// 将LogicFlow中的Node数据转换为Turbo元素数据
function convertNodeToTurboElement(node: NodeConfig & { children?: string[] }) {
  const { id, type, x, y, properties, children, text } = node
  return {
    incoming: [],
    outgoing: [],
    children,
    type,
    key: id!,
    groupKey: properties?.groupKey as string,
    properties: {
      ...properties,
      name: isString(text) ? text : text?.value ?? '',
      x,
      y,
      text,
    },
  }
}

// 将LogicFlow中的Edge数据转换为Turbo元素数据
function convertEdgeToTurboElement(edge: EdgeConfig) {
  const { id, type, sourceNodeId, targetNodeId, startPoint, endPoint, pointsList, properties, text } = edge
  return {
    incoming: [sourceNodeId],
    outgoing: [targetNodeId],
    type,
    key: id,
    groupKey: properties?.groupKey as string,
    properties: {
      ...properties,
      name: isString(text) ? text : text?.value ?? '',
      text,
      startPoint,
      endPoint,
      pointsList,
    },
  }
}

function convertNodeToProcessData(node: NodeConfig) {
  const { id, type, properties, text } = node
  return {
    type,
    key: id!,
    properties: {
      ...properties,
      name: isString(text) ? text : text?.value ?? '',
    },
  }
}

// 将LogicFlow中数据转换为Turbo数据
export function toTurboData(data: GraphConfigData) {
  const nodeMap = new Map()
  const turboData: TurboData = {
    processData: defaultProcessData,
    flowElementList: [],
  }
  data.nodes.forEach((node) => {
    if (node.type === 'process') {
      turboData.processData = convertNodeToProcessData(node)
    }
    else {
      const flowElement = convertNodeToTurboElement(node)
      turboData.flowElementList?.push(flowElement)
      nodeMap.set(node.id, flowElement)
    }
  })
  data.edges.forEach((edge) => {
    const flowElement = convertEdgeToTurboElement(edge)
    const sourceElement = nodeMap.get(edge.sourceNodeId)
    sourceElement.outgoing.push(flowElement.key)
    const targetElement = nodeMap.get(edge.targetNodeId)
    targetElement.incoming.push(flowElement.key)
    turboData.flowElementList?.push(flowElement as FlowElement)
  })
  return turboData
}

// 将Turbo元素数据转换为LogicFlow中的Edge数据
function convertFlowElementToEdge(element: FlowEdge) {
  const { incoming, outgoing, properties, key, type } = element
  const { text, name, startPoint, endPoint, pointsList } = properties ?? {}
  const edge: EdgeConfig = {
    id: key,
    type,
    sourceNodeId: incoming?.[0] ?? '',
    targetNodeId: outgoing?.[0] ?? '',
    text: text || name,
    startPoint,
    endPoint,
    pointsList,
    properties: {},
  }
  // 这种转换方式，在自定义属性中不能与excludeProperties中的属性重名，否则将在转换过程中丢失
  const excludeProperties = ['startPoint', 'endPoint', 'pointsList', 'text']
  edge.properties = omit(properties, excludeProperties)
  return edge
}

// 将Turbo元素数据转换为LogicFlow中的Node数据
function convertFlowElementToNode(element: FlowNode) {
  const { properties, key, type, children } = element
  const { x, y, text, name } = properties ?? {}
  const node: NodeConfig & { children?: string[] } = {
    id: key,
    type: type ?? '',
    x: x!,
    y: y!,
    text: text || name,
    children,
    properties: {},
  }
  // 这种转换方式，在自定义属性中不能与excludeProperties中的属性重名，否则将在转换过程中丢失
  const excludeProperties = ['x', 'y', 'text']
  node.properties = omit(properties, excludeProperties)
  return node
}

function convertProcessDataToNode(data: ProcessData) {
  const { properties, key, type } = data
  const { name } = properties ?? {}
  const node: NodeConfig = {
    id: key,
    type: type ?? '',
    text: name,
    x: 0,
    y: 0,
  }
  const excludeProperties = ['x', 'y', 'text']
  node.properties = omit(properties, excludeProperties)
  return node
}

// 将Turbo元素数据转换为LogicFlow数据
export function toLogicflowData(data: TurboData) {
  const { flowElementList } = data
  const isFlow = (type: string) => ['sequenceFlow', 'noteFlow'].includes(type)
  const nodes = flowElementList?.filter(e => !isFlow(e.type!)).map(convertFlowElementToNode) ?? []
  const edges = flowElementList?.filter(e => isFlow(e.type!)).map(convertFlowElementToEdge) ?? []
  nodes.unshift(convertProcessDataToNode(data.processData ?? defaultProcessData))
  const lfData: GraphConfigData = {
    nodes,
    edges,
  }
  return lfData
}

export class TurboAdapter {
  static pluginName = 'turboAdapter'
  constructor({ lf }: { lf: LogicFlow }) {
    lf.adapterIn = this.adapterIn
    lf.adapterOut = this.adapterOut
  }

  adapterOut(logicflowData: GraphConfigData) {
    return toTurboData(logicflowData)
  }

  adapterIn(turboData: unknown) {
    return toLogicflowData(turboData as TurboData)
  }
}
