// Helper to map results to the order of keys
export const mapToKeys = <T, K extends string>(
  keys: readonly number[],
  results: ({ id: number } & Record<K, T[]>)[],
  relationName: K
): T[][] => {
  const map = new Map<number, T[]>()
  for (const result of results) {
    map.set(result.id, result[relationName])
  }
  return keys.map((key) => map.get(key) || [])
}

export const mapToKey = <T, K extends string>(
  keys: readonly number[],
  results: ({ id: number } & Record<K, T | null>)[],
  relationName: K
): (T | null)[] => {
  const map = new Map<number, T | null>()
  for (const result of results) {
    map.set(result.id, result[relationName])
  }
  return keys.map((key) => map.get(key) ?? null)
}
