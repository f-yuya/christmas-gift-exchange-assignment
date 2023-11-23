declare global {
    interface Array<T> {
        shiftLeft(): Array<T>;
    }
}

/**
* 配列を左シフトします。
* @param this 配列
* @returns 左シフトした配列
*/
Array.prototype.shiftLeft = function <T>(this: T[]) {
    const [head, ...tail] = this;
    return [...tail, head];
}


export { };
