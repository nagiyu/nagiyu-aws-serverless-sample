'use client';

import React, { useState } from 'react';
import ComboBoxAutocomplete, { Option } from '@client-common/components/inputs/autocomplete/ComboBoxAutocomplete';

export default function SampleSelectPage() {
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  const options: Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleChange = (value: Option | null) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <h1>ComboBoxAutocomplete Sample</h1>
      <ComboBoxAutocomplete
        options={options}
        value={selectedValue}
        onChange={handleChange}
        label="Select an option"
        placeholder="Choose..."
      />
      <p>Selected Value: {selectedValue ? selectedValue.label : 'None'}</p>
    </div>
  );
}
