import { useState, useEffect } from "react";

const PREFIX = "message-app-";

const getStoredValue = (key, initialValue) => {
  const storedValue = JSON.parse(localStorage.getItem(key));

  return storedValue ?? initialValue;
};

export default function useLocalStorage(key, initialValue, remember) {
  const prefixedKey = PREFIX + key; //To identify keys between applications using the same localhost

  const [value, setValue] = useState(() => {
    return getStoredValue(prefixedKey, initialValue);
  });

  useEffect(() => {
    remember
      ? localStorage.setItem(prefixedKey, JSON.stringify(value))
      : localStorage.setItem(prefixedKey, JSON.stringify(""));
  }, [prefixedKey, value, remember]);

  return [value, setValue];
}
