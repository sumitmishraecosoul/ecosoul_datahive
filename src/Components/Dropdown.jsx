import React from 'react';
import Select from 'react-select';

const Dropdown = ({ 
    label, 
    options = [], 
    placeholder = "Select an option", 
    value, 
    onChange, 
    isMulti,
}) => {

    return (
        <div className={`w-full`}>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                {label}
            </label>
            <Select
                options={options}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                isMulti={false}
            />
        </div>
    );
};

export default Dropdown;
