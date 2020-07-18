import * as CryptoJS from 'crypto-js';

import { pluckProperty } from './pluck-property';

export function createKey<T>(data: T, keys?: string[], hashed: boolean = true): string | null {
    try {
        const keyObject: Partial<T> = keys?.length
            ? keys.reduce((res: Partial<T>, path: string) => {
                  return {
                      ...res,
                      [path]: pluckProperty(data, path),
                  };
              }, {})
            : data;

        const key: string = keyObject ? JSON.stringify(keyObject) : null;

        return hashed ? CryptoJS.SHA1(key).toString() : key;
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.error(error, data);

        return null;
    }
}
