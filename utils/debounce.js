import { useState, useEffect } from 'react';

/**
 * Debounce function to limit API calls
 */
export const debounce = (func, delay) => {
    let timeoutId;

    return (...args) => {
        // Clear previous timeout
        clearTimeout(timeoutId);

        // Set new timeout
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

/**
 * Debounce hook for React components
 */
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};
