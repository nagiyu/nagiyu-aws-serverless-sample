import React from 'react';

import { TextField } from '@mui/material';

type BasicTextFieldProps = {
    label?: string;
    value?: string;
    readonly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: () => void;
};

export default function BasicTextField({
    label = '',
    value = '',
    readonly = false,
    disabled = false,
    autoFocus = false,
    onChange = () => { },
    onBlur,
}: BasicTextFieldProps) {
    return (
        <TextField
            label={label}
            value={value}
            disabled={disabled}
            autoFocus={autoFocus}
            slotProps={{
                input: {
                    readOnly: readonly,
                }
            }}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
}
