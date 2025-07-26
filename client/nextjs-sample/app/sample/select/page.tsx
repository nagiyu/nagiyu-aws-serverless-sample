import React, { useState } from 'react';
import ComboBoxAutocomplete, { Option } from '@client-common/components/inputs/autocomplete/ComboBoxAutocomplete';

export default function SelectSamplePage() {
  const options1: Option[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  const options2: Option[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  const [value1, setValue1] = useState<Option | null>(null);
  const [value2, setValue2] = useState<Option | null>(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>ComboBoxAutocomplete Sample</h1>

      <div style={{ marginBottom: 20 }}>
        <ComboBoxAutocomplete
          label="Select Option"
          options={options1}
          value={value1}
          onChange={setValue1}
          placeholder="Choose an option"
        />
      </div>

      <div>
        <ComboBoxAutocomplete
          label="Select Fruit"
          options={options2}
          value={value2}
          onChange={setValue2}
          placeholder="Choose a fruit"
          freeSolo
        />
      </div>
    </div>
  );
}
