import React from 'react';

import { TextField } from '@mui/material';

interface TextInputProps {
  label: string,
  onChange: (newValue: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  value: string | undefined
}

const TextInput: React.FC<TextInputProps> = ({ label, onChange, value }) => {
  // Formula for fill percent is
  
  return (
    <div className="text-input-container">
      <TextField 
        label={label} 
        aria-label={label} 
        id={label} 
        type="number" 
        value={value} // Controlled component, value is managed by parent
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e)}></TextField>
    </div>
  )
}

export default TextInput