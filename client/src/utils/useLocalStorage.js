import {useState} from 'react';

export function getStorageItem(key, initialValue) {
    try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
    }
}

export function setStorageItem(key, value) {

    try {
        // Save state
        window.localStorage.setItem(key, JSON.stringify(value));

    } catch (error) {
        console.log(error)
    }
}

// Hook
export default function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        return getStorageItem(key, initialValue);
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        setStorageItem(key, value)
    };

    return [storedValue, setValue];
}