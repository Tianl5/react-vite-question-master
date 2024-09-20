/**
 *
 * @param object
 * @returns newobj
 */
export const deepClone = (object: any) => {
  let newobj
  object.isArray ? (newobj = []) : (newobj = {})

  for (let key in object) {
    const keyObj = object[key] as any
    typeof keyObj === 'object' && keyObj !== null
      ? (newobj[key] = deepClone(keyObj))
      : (newobj[key] = object[key])
  }

  return newobj
}
