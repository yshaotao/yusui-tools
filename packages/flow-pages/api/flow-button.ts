import type { ButtonType } from 'element-plus'
import type { Page, ResRecords } from '@yusui/types'

import { useRequest } from 'vue-request'

import { useConfigProvider } from '../composables'

export enum FlowButtonType {
  '默认' = 'default',
  '主要' = 'primary',
  '成功' = 'success',
  '警告' = 'warning',
  '危险' = 'danger',
  '信息' = 'info',
  '文字' = 'text',
}

export enum FlowButtonKey {
  '保存草稿' = 'flow_draft',
  '发送' = 'flow_pass',
  '退回' = 'flow_reject',
  '终止' = 'flow_terminate',
  '撤销' = 'flow_revoke',
  '撤回到发起' = 'flow_withdraw',
  '打印' = 'flow_print',
  '转办' = 'flow_transfer',
  '加签' = 'flow_add_instance',
  '减签' = 'flow_del_instance',
  '指定回退' = 'flow_rollback',
  '绿色通道' = 'flow_green',
}

export enum FlowButtonDisplay {
  '显示' = 'true',
  '隐藏' = 'false',
  '发起人' = 'startUser',
  '处理人' = 'assignee',
  '已办' = 'done',
  '待办' = 'todo',
  '未发起' = 'notstarted',
  '已发起' = 'started',
  '未办结' = 'unfinished',
  '已办结' = 'finished',
}

export enum FlowButtonApproval {
  '不显示' = 'false',
  '审批人' = 'assignee',
  '传阅人' = 'circulate',
  '抄送人' = 'copyUser',
  '意见' = 'comment',
}

export enum FlowButtonStatus {
  '禁用' = 0,
  '正常' = 1,
}

/** 按钮配置 */
export interface FlowButton {
  id?: string
  /** 按钮的key */
  buttonKey?: FlowButtonKey
  /** element的按钮类型 */
  buttonType?: ButtonType
  /** 显示类型 */
  display?: FlowButtonDisplay
  /** 审批弹窗显示 */
  approval?: FlowButtonApproval
  /** 按钮图标 */
  icon?: string
  /** 按钮名称 */
  name?: string
  /** 排序 */
  sort?: number
  /** 0 正常 | 1 禁用 */
  status?: FlowButtonStatus
}

export function useFlowButtonApi() {
  const { request } = useConfigProvider()
  const url = {
    /** 按钮列表 */
    list: '/sapier-flow/dev-button/list',
    /** 新增按钮 */
    save: '/sapier-flow/dev-button/save',
    /** 更新按钮 */
    update: '/sapier-flow/dev-button/update',
    /** 删除按钮 */
    remove: '/sapier-flow/dev-button/remove',
  }
  const getList = (params: Page & FlowButton) => request.get<ResRecords<FlowButton[]>>(url.list, { params })
  const useList = () => useRequest(() => getList({ size: -1, ascs: 'sort' }).then(res => res.data.records))
  const create = (data: FlowButton) => request.post(url.save, data)
  const update = (data: FlowButton) => request.post(url.update, data)
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
