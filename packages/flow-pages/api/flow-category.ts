import type { Page, ResData } from '@yusui/types'

import { useConfigProvider } from '../composables'

export interface FlowCategory {
  /** 主键id */
  id?: string
  /** 分类名称 */
  name?: string
  /** 上级id */
  parentId?: number
  /** 分类备注 */
  remark?: string
  /** 排序 */
  sort?: number
}

export function useFlowCategoryApi() {
  const { request } = useConfigProvider()
  const url = {
    /** 分类列表 */
    list: '/sapier-flow/flow-category/list',
    /** 新增分类 */
    save: '/sapier-flow/flow-category/save',
    /** 更新分类 */
    update: '/sapier-flow/flow-category/update',
    /** 删除分类 */
    remove: '/sapier-flow/flow-category/remove',
    /** 分类树 */
    tree: '/sapier-flow/flow-category/tree',
  }
  const getList = (params: Page & FlowCategory) => request.get<ResData<FlowCategory[]>>(url.list, { params })
  const getTree = (params: Page & FlowCategory) => request.get<ResData<FlowCategory[]>>(url.tree, { params })
  const create = (data: FlowCategory) => request.post(url.save, data)
  const update = (data: FlowCategory) => request.post(url.update, data)
  const remove = (ids: string) => request.post(url.remove, {}, { params: { ids } })
  return {
    getList,
    getTree,
    create,
    update,
    remove,
  }
}
