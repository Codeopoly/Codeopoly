export function createArray(firstVal, lastVal) {
  const filledArr = []
  for (let i = firstVal; i <= lastVal; i++) {
    filledArr.push(i.toString())
  }
  // Great, I have a filled array, now shuffle it:
  for (let j = 0; j < filledArr.length; j++) {
    let index2 = Math.floor(Math.random() * filledArr.length)
    let copy = filledArr[j]
    filledArr[j] = filledArr[index2]
    filledArr[index2] = copy
  }
  return filledArr
}
