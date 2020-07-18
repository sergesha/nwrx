export type TStorageSelector<T> = Partial<{
    filterFn: (data?: T) => boolean;
    compareFn: (a: T, b: T) => number;
    selectorKey: string;
}>;
