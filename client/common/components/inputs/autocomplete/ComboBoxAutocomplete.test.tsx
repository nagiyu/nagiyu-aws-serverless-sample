import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ComboBoxAutocomplete, { Option } from './ComboBoxAutocomplete';

describe('ComboBoxAutocomplete', () => {
  const options: Option[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  test('renders with label and placeholder', () => {
    render(
      <ComboBoxAutocomplete
        label="Test Label"
        options={options}
        value={null}
        onChange={() => {}}
        placeholder="Select an option"
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
  });

  test('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(
      <ComboBoxAutocomplete
        label="Test Label"
        options={options}
        value={null}
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option 2' } });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(handleChange).toHaveBeenCalled();
  });

  test('allows freeSolo input when enabled', () => {
    const handleChange = jest.fn();
    render(
      <ComboBoxAutocomplete
        label="Test Label"
        options={options}
        value={null}
        onChange={handleChange}
        freeSolo
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Custom Input' } });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith('Custom Input');
  });
});
