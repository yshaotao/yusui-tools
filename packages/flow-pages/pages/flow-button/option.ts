import type { AvueCrudOption } from '@smallwei/avue'
import type { FlowButton } from '../../api'

import { enumToDic } from '@yusui/utils'

import { FlowButtonApproval, FlowButtonDisplay, FlowButtonStatus, FlowButtonType } from '../../api'

export const tableOption: AvueCrudOption<FlowButton & { buttonPreview: any }> = {
  rowKey: 'id',
  align: 'center',
  index: true,
  border: true,
  stripe: true,
  searchMenuSpan: 6,
  labelWidth: 150,
  span: 24,
  column: [
    {
      label: '按钮名称',
      prop: 'name',
    },
    {
      label: '按钮标识',
      prop: 'buttonKey',
    },
    {
      label: '按钮图标',
      prop: 'icon',
      component: 'icon-select',
    },
    {
      label: '按钮类型',
      prop: 'buttonType',
      type: 'select',
      dicData: enumToDic(FlowButtonType),
    },
    {
      label: '默认显示条件',
      prop: 'display',
      type: 'select',
      multiple: true,
      dataType: 'string',
      value: 'false',
      dicData: enumToDic(FlowButtonDisplay),
      tip: '选择多个时,所有条件都满足才显示',
      labelTip: `显示: 始终显示;<br/>隐藏: 始终隐藏;<br/>
      发起人: 用户为发起人时显示;<br/>处理人: 用户为处理人时显示;<br/>
      已办: 任务状态为已办时显示;<br/>待办: 任务状态为待办时显示;<br/>
      未发起: 流程未发起时显示;<br/>已发起: 流程已发起时显示;<br/>
      未办结: 流程未办结时显示;<br/>已办结: 流程已办结时显示;`,
    },
    {
      label: '默认审批窗口显示',
      prop: 'approval',
      type: 'select',
      multiple: true,
      dataType: 'string',
      value: 'false',
      dicData: enumToDic(FlowButtonApproval),
      labelTip: `不显示: 不显示审批窗口;<br/>
      审批人: 显示审批人选择框;<br/>传阅人: 显示传阅人选择框;<br/>
      抄送人: 显示抄送人选择框;<br/>意见: 显示意见输入框;`,
    },
    {
      label: '排序',
      prop: 'sort',
      type: 'number',
      value: 0,
    },
    {
      label: '状态',
      prop: 'status',
      type: 'switch',
      value: 1,
      dicData: enumToDic(FlowButtonStatus),
    },
    {
      label: '按钮预览',
      prop: 'buttonPreview',
      width: 150,
    },
  ],
}
