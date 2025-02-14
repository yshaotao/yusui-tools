import type { Page, ResData, ResRecords } from '@yusui/types'

import { useConfigProvider } from '../composables'

export interface FlowDefinition {
  /** 流程定义数据 */
  flowData?: string
  /** 流程KEY */
  flowKey?: string
  /** 流程定义ID */
  flowModuleId?: string
  /** 流程名称 */
  flowName?: string
  /** 表单配置数据 */
  formOption?: string
  /** 表单路径 */
  formPath?: string
  /** 关联表 */
  formDataTable?: string
  /** 分类ID */
  categoryId?: string
  /** 图标 */
  flowIcon?: string
  /** 流程备注 */
  remarks?: string
  /** 排序 */
  sort?: number
  status?: number
  /** 版本号 */
  version?: number
  /** 主版本 */
  mainVersion?: number
}

export function useFlowDefinitionApi() {
  const { request } = useConfigProvider()
  const url = {
    /** 流程定义列表 */
    list: '/sapier-flow/flow-definition/list',
    /** 新增流程 */
    save: '/sapier-flow/flow-definition/save',
    /** 更新流程 */
    update: '/sapier-flow/flow-definition/update',
    /** 流程定义详情 */
    detail: '/sapier-flow/flow-definition/detail',
    /** 部署流程 */
    deploy: '/sapier-flow/flow-definition/deployFlow',
  }
  const getList = (params: Page & FlowDefinition) => request.get<ResRecords<FlowDefinition[]>>(url.list, { params })
  const getDetail = (params: { flowModuleId?: string; flowDeployId?: string }) => request.get(url.detail, { params })
  const create = (data: Pick<FlowDefinition, 'flowKey' | 'flowName' | 'remarks'>) => request.post<ResData<{ flowModuleId?: string }>>(url.save, data)
  const update = (data: FlowDefinition) => request.post(url.update, data)
  const deploy = (data: Pick<FlowDefinition, 'flowModuleId'>) => request.post(url.deploy, data)
  return {
    url,
    getList,
    create,
    update,
    deploy,
    getDetail,
  }
}
