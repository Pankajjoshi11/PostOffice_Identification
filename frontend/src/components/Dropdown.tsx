import React from 'react';

interface DropdownProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ suggestions, onSelect }) => {
  return (
    <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSelect(suggestion)}
          className="p-2 hover:bg-gray-200 cursor-pointer"
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
