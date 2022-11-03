import { ContentCopy } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { HTMLInputTypeAttribute, useState } from "react";

interface Props {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  initialValue: string;
  required?: boolean;
}

export const CopyableTextField = ({
  id,
  label,
  type,
  initialValue,
  required,
}: Props) => {
  const [value, setValue] = useState(initialValue);

  return (
    <FormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        label={label}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={`copy ${label}`}
              onClick={() => navigator.clipboard.writeText(value)}
              edge="end"
              className="mr-1"
            >
              <ContentCopy />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
