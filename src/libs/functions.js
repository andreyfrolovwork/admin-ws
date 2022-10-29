function sort(array, { currentPage, perPage }) {
  let returnArray = []
  const start = currentPage * perPage - perPage
  const end = currentPage * perPage

  array.forEach((el, i) => {
    const com1 = i >= start
    const com2 = i < end

    const inRange = com1 && com2

    if (inRange) {
      returnArray.push(el)
    }
  })
  return returnArray
}

export default sort

export function getId(state, _id) {
  return state.usersSorted.findIndex((el) => el._id === _id)
}
export function getIdStandart(state, _id) {
  return state.arraySorted.findIndex((el) => el._id === _id)
}
