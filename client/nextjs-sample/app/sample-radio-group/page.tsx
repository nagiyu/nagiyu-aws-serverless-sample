"use client";

import React, { useState } from 'react';
import SimpleRadioGroup, { SimpleRadioGroupOption } from '@client-common/components/inputs/RadioGroups/SimpleRadioGroup';

const SampleRadioGroupPage: React.FC = () => {
  const [selectedValue1, setSelectedValue1] = useState('option1');
  const [selectedValue2, setSelectedValue2] = useState('optionA');

  const options1: SimpleRadioGroupOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3 (disabled)', value: 'option3', disabled: true },
  ];

  const options2: SimpleRadioGroupOption[] = [
    { label: 'Option A', value: 'optionA' },
    { label: 'Option B', value: 'optionB' },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>SimpleRadioGroup Sample</h1>

      <h2>Basic Usage</h2>
      <SimpleRadioGroup
        options={options1}
        value={selectedValue1}
        onChange={(e, value) => setSelectedValue1(value)}
        name="sample1"
        label="Choose an option"
      />

      <h2>Row Layout</h2>
      <SimpleRadioGroup
        options={options2}
        value={selectedValue2}
        onChange={(e, value) => setSelectedValue2(value)}
        name="sample2"
        label="Choose an option"
        row
      />

      <h2>Disabled Group</h2>
      <SimpleRadioGroup
        options={options1}
        value={selectedValue1}
        onChange={(e, value) => setSelectedValue1(value)}
        name="sample3"
        label="Disabled group"
        disabled
      />
    </div>
  );
};

export default SampleRadioGroupPage;
