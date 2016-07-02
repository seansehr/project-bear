export const fieldValue = (field, vField = 'value') => {
  if (typeof field.und != 'undefined' && field.und[0][vField]) {
    return field.und[0][vField]
  }
  return undefined
}
