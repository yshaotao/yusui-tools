import type { Page, ResRecords } from '@yusui/types'

import { useRequest } from 'vue-request'

import { useConfigProvider } from '../composables'

export interface FormTemplate {
  /** 表单KEY */
  formKey?: string
  /** 表单名称 */
  formName?: string
  /** 表单配置 */
  formOption?: string
  /** 分类ID */
  categoryId?: string
  /** 主键id */
  id?: string
  /** 表单备注 */
  remarks?: string
  /** 排序 */
  sort?: number
  /** 业务状态 */
  status?: number
  /** 版本号 */
  version?: number
}

export function useFormTemplateApi() {
  const { request } = useConfigProvider()
  const url = {
    /** 表单模板列表 */
    list: '/sapier-flow/dev-form/list',
    /** 新增表单模板 */
    save: '/sapier-flow/dev-form/save',
    /** 更新表单模板 */
    update: '/sapier-flow/dev-form/update',
    /** 删除表单模板 */
    remove: '/sapier-flow/dev-form/remove',
  }
  const getList = (params: Page & FormTemplate) => request.get<ResRecords<FormTemplate[]>>(url.list, { params })
  const useList = () => useRequest(() => getList({ size: -1 }).then(res => res.data.records))
  const create = (data: FormTemplate) => request.post(url.save, data)
  const update = (data: FormTemplate) => request.post(url.update, data)
  const remove = (ids: string) => request.post(url.remove, {}, { params: { ids } })
  return {
    url,
    getList,
    useList,
    create,
    update,
    remove,
  }
}
