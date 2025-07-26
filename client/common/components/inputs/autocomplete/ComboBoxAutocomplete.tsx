'use client';

import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';

export interface Option {
  label: string;
  value: string;
}

interface ComboBoxAutocompleteProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  freeSolo?: boolean;
}

export default function ComboBoxAutocomplete({
  options,
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  freeSolo = false,
}: ComboBoxAutocompleteProps) {
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: Option | null,
    reason: AutocompleteChangeReason
  ) => {
    onChange(newValue);
  };

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={handleChange}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          variant="outlined"
          fullWidth
        />
      )}
      freeSolo={freeSolo}
      disableClearable={!freeSolo}
    />
  );
}
