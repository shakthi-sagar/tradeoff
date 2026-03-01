export async function mergeSortAsync<T>(
    array: T[],
    compare: (a: T, b: T) => Promise<number>
): Promise<T[]> {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = await mergeSortAsync(array.slice(0, mid), compare);
    const right = await mergeSortAsync(array.slice(mid), compare);

    return await mergeAsync(left, right, compare);
}

async function mergeAsync<T>(
    left: T[],
    right: T[],
    compare: (a: T, b: T) => Promise<number>
): Promise<T[]> {
    const result: T[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        const cmp = await compare(left[i], right[j]);
        if (cmp < 0) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    // Concatenate remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}
