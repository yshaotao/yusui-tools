import type { Page, ResRecords } from '@yusui/types'
import type { FlowTask } from './flow-task'

import { useConfigProvider } from '../composables'

/**
 * 流程运维信息
 */
export interface FlowOps extends FlowTask {
  /** 申请人 */
  applyUserId?: string
  applyUserName?: string
  flowKey?: string
  flowName?: string
  categoryId?: string
  processStartTime?: string
  processStatus?: number
  processTitle?: string
  serialNumber?: string
  version?: number
}

export function useFlowOpsApi() {
  const { request } = useConfigProvider()
  const url = {
    /** 流程运维列表 */
    list: '/sapier-flow/flow-ops/list',
  }
  const getList = (params: Page & FlowOps) => request.get<ResRecords<FlowOps>>(url.list, { params })
  return {
    url,
    getList,
  }
}
