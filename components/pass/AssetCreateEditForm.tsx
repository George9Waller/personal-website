import {
  Autocomplete,
  Chip,
  createFilterOptions,
  FormGroup,
  TextField,
} from "@mui/material";
import { AssetType } from "@prisma/client";
import { useState, useEffect, useRef } from "react";
import { TagData } from "../../pages/portal/pass";

export interface TagOption {
  title: string;
  inputValue?: string;
}

const filter = createFilterOptions<TagOption>();

interface Props {
  type: AssetType;
  initialName: string;
  initialTags: string[];
  tagOptions: TagData;
  setAssetDetails: (name: string, tags: string[]) => void;
}

export const AssetCreateEditForm = ({
  type,
  initialName,
  initialTags,
  tagOptions,
  setAssetDetails,
}: Props) => {
  const [name, setName] = useState<string>(initialName);
  const fixedTags = [{ title: type as string }];
  const [tags, setTags] = useState<TagOption[]>([
    ...fixedTags,
    ...initialTags.map((tag) => ({ title: tag })),
  ]);
  const options: TagOption[] = [
    ...Object.keys(AssetType).map((key) => ({
      title: key,
    })),
    ...tagOptions.map((tag) => ({ title: tag[0] })),
  ];

  useEffect(
    () =>
      setTags((tags) => [
        { title: type as string },
        ...tags.filter((tag) => !Object.keys(AssetType).includes(tag.title)),
      ]),
    [type]
  );

  useEffect(
    () =>
      setAssetDetails(
        name,
        tags.map((tag) => tag.title)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [name, tags]
  );

  return (
    <FormGroup className="mt-4">
      <TextField
        label="name"
        id="name"
        variant="outlined"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Autocomplete
        className="mt-4 w-full"
        multiple
        id="tags"
        value={tags}
        onChange={(event, newValue) =>
          setTags([
            ...fixedTags,
            ...newValue
              .map((option) => {
                if (typeof option === "string") {
                  return { title: option };
                } else if (option.inputValue) {
                  return { title: option.inputValue };
                }
                return option;
              })
              .filter(
                (option) => !fixedTags.find((tag) => tag.title === option.title)
              ),
          ])
        }
        options={options}
        filterOptions={(options, params) => {
          const filtered = filter(options, params).filter(
            (option) => !Object.keys(AssetType).includes(option.title)
          );
          const { inputValue } = params;

          const isExisting = options.some(
            (option) => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add '${inputValue}'`,
            });
          }
          return filtered;
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          } else if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              label={option.title}
              {...getTagProps({ index })}
              disabled={Boolean(
                fixedTags.find((tag) => tag.title === option.title)
              )}
            />
          ))
        }
        renderInput={(params) => <TextField {...params} label="tags" />}
      />
    </FormGroup>
  );
};
