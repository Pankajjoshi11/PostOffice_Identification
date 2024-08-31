// src/components/Autocomplete.tsx
import React from 'react';

interface AutocompleteProps {
    value: string;
    suggestions: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ value, suggestions, onChange, onSelect }) => {
    return (
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="form-input"
                placeholder="Enter branch name"
            />
            {suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                            onClick={() => onSelect(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
