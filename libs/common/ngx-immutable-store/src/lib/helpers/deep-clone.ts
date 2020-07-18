export function deepClone<T>(source: T): T | null {
    try {
        return source ? JSON.parse(JSON.stringify(source)) : null;
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.error(error, source);

        return null;
    }
}
