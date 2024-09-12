import { useState, useEffect } from "react";
import { Input } from "./input";

const DebouncedInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    // Set a timer to update debounced value after 500ms delay
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    // Cleanup function to clear timeout if inputValue changes within 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Input type="text" value={inputValue} onChange={handleChange} />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
};

export default DebouncedInput;
