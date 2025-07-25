import React, { useState } from 'react';
import SimpleRadioGroup, { SimpleRadioGroupOption } from '../../../common/components/inputs/RadioGroups/SimpleRadioGroup';

const options1: SimpleRadioGroupOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const options2: SimpleRadioGroupOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
];

const SampleRadioGroupPage: React.FC = () => {
  const [value1, setValue1] = useState('1');
  const [value2, setValue2] = useState('banana');

  return (
    <div>
      <h1>SimpleRadioGroup Sample</h1>

      <section>
        <h2>Basic Usage</h2>
        <SimpleRadioGroup
          label="Basic Options"
          name="basic"
          options={options1}
          value={value1}
          onChange={(e, val) => setValue1(val)}
        />
      </section>

      <section>
        <h2>With Disabled Option</h2>
        <SimpleRadioGroup
          label="Fruits"
          name="fruits"
          options={options2}
          value={value2}
          onChange={(e, val) => setValue2(val)}
          row
        />
      </section>
    </div>
  );
};

export default SampleRadioGroupPage;
