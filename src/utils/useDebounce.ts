import { useCallback, useEffect, useRef } from 'react';

// 防抖
// const fun = useDebounce(()=>{},1000)
export function useDebounce(
    fn: Function, 
    delay: number, 
    deep: Array<string | number> = [], 
    feep: Array<string | number> = []
) {
    const { current } = useRef({ fn, timer: 0 });
    useEffect(() => {
        current.fn = fn;
        return () => {
            clearTimeout(current.timer);
        };
    }, [fn, ...feep]);
    return useCallback(function f(...args: any) {
        console.log(args);
        clearTimeout(current.timer);
        current.timer = window.setTimeout(() => {
            current.fn.call(f, ...args);
        }, delay);
    }, deep);
}
