import { filterObj, filterObjDeep, getDataType } from '.'

describe('object utils', () => {
  it('filterObj', () => {
    const testData = { a: 1, b: 'b', c: undefined, d: null }
    expect(filterObj(testData)).toEqual({ a: 1, b: 'b' })
    expect(filterObj(testData, [])).toEqual(testData)
    expect(filterObj(testData, undefined, ['a', 'b'])).toEqual({})
  })
  it('filterObjDeep', () => {
    const testData = { a: undefined, b: { bb: '1' }, c: [{ cc: 1 }] }
    expect(filterObjDeep(testData)).toEqual({ b: { bb: '1' }, c: [{ cc: 1 }] })
    expect(filterObjDeep(testData, [])).toEqual(testData)
    expect(filterObjDeep(testData, undefined, ['cc', 'bb'])).toEqual({ b: {}, c: [{}] })
  })
  it('getDataType', () => {
    expect(getDataType(true)).toBe('Boolean')
    expect(getDataType(null)).toBe('Null')
    expect(getDataType(undefined)).toBe('Undefined')
    expect(getDataType(123)).toBe('Number')
    expect(getDataType('123')).toBe('String')
    expect(getDataType(Symbol('s'))).toBe('Symbol')
    expect(getDataType([])).toBe('Array')
    expect(getDataType({})).toBe('Object')
    expect(getDataType(() => {})).toBe('Function')
    expect(getDataType(new Date())).toBe('Date')
    expect(getDataType(new RegExp(''))).toBe('RegExp')
  })
})
