import { useCallback, useEffect, useRef } from 'react';

// 防抖
// const fun = useDebounce(()=>{},1000)
export function useDebounce(fn: Function, delay: number, deep: Array<string | number> = [], feep: Array<string | number> = []) {
    const { current } = useRef({ fn, timer: null as number | null });
    useEffect(() => {
        current.fn = fn;
    }, [fn, ...feep]);
    useEffect(() => {
        return () => {
            if (current.timer !== null) clearTimeout(current.timer);
        };
    }, []);
    return useCallback(function f(...args: any) {
        if (current.timer !== null) clearTimeout(current.timer);
        current.timer = window.setTimeout(() => {
            current.fn.call(f, ...args);
        }, delay);
    }, deep);
}
