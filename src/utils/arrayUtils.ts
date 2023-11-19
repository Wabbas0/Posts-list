/**
 * Swaps two items in an array based on their indices.
 *
 * @param array - The array containing the items.
 * @param indexA - The index of the first item to swap.
 * @param indexB - The index of the second item to swap.
 * @throws Will throw an error if the provided indices are invalid.
 * @returns A new array with the items swapped.
 */
export function swapArrayElements<T>(array: T[], indexA: number, indexB: number): T[] {
  // Check if the indices are valid
  if (indexA < 0 || indexA >= array.length || indexB < 0 || indexB >= array.length) {
    throw new Error('Invalid indices provided')
  }

  const newArray = [...array]

  ;[newArray[indexA], newArray[indexB]] = [newArray[indexB], newArray[indexA]]

  return newArray
}

/**
 * Get the edge position of an item in an array.
 *
 * @param index - The index of the item.
 * @param arrayLength - The length of the array.
 * @returns 'FIRST' if the item is the first, 'LAST' if it's the last, or false if it's neither.
 */

export function getEdgePosition(index: number, arrayLength: number): 'FIRST' | 'LAST' | '' {
  if (index === 0) {
    return 'FIRST'
  } else if (index === arrayLength - 1) {
    return 'LAST'
  } else {
    return ''
  }
}
