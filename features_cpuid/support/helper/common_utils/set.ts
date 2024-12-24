export function intersection(array1: any, array2: any) {
  return array1.filter((value: any) => array2.includes(value))
}

export function union(array1: any, array2: any) {
  return Array.from(new Set([...array1, ...array2]))
}
