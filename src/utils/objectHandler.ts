export function isObject(obj: any) {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}
