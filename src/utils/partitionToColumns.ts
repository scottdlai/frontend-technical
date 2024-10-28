// Partition list of things to a list of columns
// partitionToColumns([1, 2, 3, 4, 5, 6, 7], 3) = [[1, 4, 7], [2, 5], [3, 6]]
export function partitionToColumns<T>(array: T[], count: number): T[][] {
  const columns: T[][] = [];

  for (let i = 0; i < count; i += 1) {
    columns.push([]);
    for (let j = i; j < array.length; j += count) {
      columns[i].push(array[j]);
    }
  }

  return columns;
}
