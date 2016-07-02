export const fieldValue = (field, vField = 'value') => {
  if (typeof field.und != 'undefined') {
    return field.und[0][vField]
  }
  return undefined
}
