export const objectMap = (obj, callback) => {
  let ret = []
  Object.keys(obj).map((key, index) => {
    ret.push(callback(key, index))
  })
  return ret
}
