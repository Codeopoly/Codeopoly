export function createArray(firstVal, lastVal) {
  const filledArr = []
  for (let i = firstVal; i <= lastVal; i++) {
    filledArr.push(i.toString())
  }
  return filledArr
}
