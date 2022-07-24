import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  options: string[];
  selection: string[];
  setSelection: (value: string[]) => void;
  label: string;
}

export default function MultipleSelectCheckboxes({
  options,
  selection,
  setSelection,
  label,
}: Props) {
  const handleChange = (event: SelectChangeEvent<typeof selection>) => {
    const {
      target: { value },
    } = event;
    setSelection(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`${label}-multiple-checkbox-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-multiple-checkbox-label`}
          id={`${label}-multiple-checkbox`}
          multiple
          value={selection}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selection.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
