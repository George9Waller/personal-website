import { FormGroup, FormLabel, TextField } from "@mui/material";
import { Prisma } from "@prisma/client";
import { selectTranslation } from "../../utils/common";

interface Props {
  sourceJSON: Prisma.JsonValue;
  fieldKey: string;
  multiline?: boolean;
}

export const LanguageInputs = ({ sourceJSON, fieldKey, multiline }: Props) => {
  return (
    <FormGroup className="flex flex-col gap-2">
      <FormLabel>{fieldKey}</FormLabel>
      <TextField
        label="en"
        id={`${fieldKey}-en`}
        variant="outlined"
        defaultValue={selectTranslation(sourceJSON, "en-GB")}
        multiline={multiline || false}
        required
      />
      <TextField
        label="fr"
        id={`${fieldKey}-fr`}
        variant="outlined"
        defaultValue={selectTranslation(sourceJSON, "fr")}
        multiline={multiline || false}
      />
    </FormGroup>
  );
};

export default LanguageInputs;
