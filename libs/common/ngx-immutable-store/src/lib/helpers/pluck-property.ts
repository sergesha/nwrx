export const pluckProperty: Function = <T>(obj: T, path: string): string | number => {
    const property: string | number = path
        .split(/[\.\[\]\"\']{1,2}/)
        .filter((key: string) => !!key)
        .reduce((acc: object, key: string) => (acc ? acc[key] : undefined), { ...obj });

    if (property === undefined && obj !== undefined && obj !== null && obj === Object(obj)) {
        throw Error(`TrackByPropertyPipe: object ${JSON.stringify(obj)} has no property '${path}'.`);
    }

    return property;
};
