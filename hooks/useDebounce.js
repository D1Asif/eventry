import { useEffect, useRef } from "react"

export const useDebounce = (func, duration) => {
    const timerRef = useRef(null);

    useEffect(() => {

        return () => {
            clearInterval()
        }
    }, []);

    return function debouncedFunc(...args) {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            func(...args);
        }, duration);
    }
}