export interface Page {
  current?: number
  size?: number
  pageNum?: number
  pageSize?: number
  ascs?: string
  descs?: string
  order?: string
  prop?: string
}

export type Res<T = any> = { code: number; msg: string } & T

export type ResData<T = any> = Res<{ data: T }>

export type ResRows<T = any> = Res<{ rows: T; total: number }>

export type ResRecords<T = any> = ResData<{ records: T; current: number; pages: number; size: number; total: number }>
