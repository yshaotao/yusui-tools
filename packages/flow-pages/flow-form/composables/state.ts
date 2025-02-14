import type { Emit, Props } from '../types'
import type { InjectionKey } from 'vue'

import { computed, inject, provide, ref, watchEffect } from 'vue'
import { useVModels } from '@vueuse/core'

import { useFlowTaskApi } from '../../api'

export const injectionKey: InjectionKey<ReturnType<typeof useProvideState>> = Symbol('flowFormState')

export function useProvideState(props: Props, emit: Emit) {
  const vModels = useVModels(props, undefined, { passive: true, deep: true })
  const { flowDetail, modelValue: formData, formLoading } = vModels

  const { getFlowDetail } = useFlowTaskApi()

  // 获取流程详情
  watchEffect(() => {
    const { flowKey, taskId, instanceId } = props
    if (!flowKey && !taskId && !instanceId)
      return
    formLoading.value = true
    getFlowDetail({ flowKey, taskId, flowInstanceId: instanceId })
      .then((res) => {
        flowDetail.value = res.data
        formData.value = res.data.formData || {}
      })
      .finally(() => {
        formLoading.value = false
      })
  })

  // 显示权限
  const permission = computed(() => ({ fileTab: true, trackTab: true, ...props.permission }))
  const showFileTab = computed(
    () =>
      permission.value.fileTab === true
      && flowDetail.value?.properties?.formProperty?.find(e => e.prop === 'fileTab')?.display,
  )
  const showTrackTab = computed(
    () =>
      permission.value.trackTab === true
      && flowDetail.value?.properties?.formProperty?.find(e => e.prop === 'trackTab')?.display,
  )

  // 审批表单
  const approvalVisible = ref(false)
  const formVariables = computed(() => {
    return Object.entries(formData.value || {})
      .filter(([key]) => !key.startsWith('$'))
      .map(([key, value]) => ({ key, value }))
  })

  const fileIds = ref<string>()

  const state = {
    ...vModels,
    formData,
    formVariables,
    approvalVisible,
    showFileTab,
    showTrackTab,
    permission,
    fileIds,
    emit,
  }

  provide(injectionKey, state)

  return state
}

export function useInjectState() {
  return inject(injectionKey)!
}
