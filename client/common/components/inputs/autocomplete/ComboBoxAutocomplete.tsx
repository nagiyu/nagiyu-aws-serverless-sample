import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface Option {
  label: string;
  value: string;
}

interface ComboBoxAutocompleteProps {
  label?: string;
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
  disabled?: boolean;
  freeSolo?: boolean;
  placeholder?: string;
}

export default function ComboBoxAutocomplete({
  label,
  options,
  value,
  onChange,
  disabled = false,
  freeSolo = false,
  placeholder = '',
}: ComboBoxAutocompleteProps) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      disabled={disabled}
      freeSolo={freeSolo}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}
