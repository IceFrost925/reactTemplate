/**
 * @param {string} url
 * @returns {Object}
 */
export const param2Obj = (url) => {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
export const responseBody = (body) => {
  return {
    code: body?.code || '200',
    data: body?.data || null,
    message: body?.message || '操作成功'
  }
}
