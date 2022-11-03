import * as generatePassword from "generate-password";
import { ContentCopy, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { encryptValue, PasswordCreateData } from "../../utils/pass";
import { CopyableTextField } from "../common/CopyableTextField";
import { useAppContext } from "../context/AppContext";

interface Props {
  onSubmit: (password?: PasswordCreateData) => void;
  initialValues: {
    url: string;
    username: string;
    email: string;
    password: string;
    additionalInfo: string;
  };
}

export const PasswordCreateEditForm = ({ onSubmit, initialValues }: Props) => {
  const [values, setValues] = useState({
    showPassword: false,
    password: initialValues.password,
    autoPasswordLength: 32,
    autoPasswordSymbols: true,
    autoPasswordNumbers: true,
  });
  const { getUserSecurePassword, userHashSalt } = useAppContext();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      url: { value: string };
      username: { value: string };
      email: { value: string };
      password: { value: string };
      additionalInfo: { value: string };
    };
    const pass = getUserSecurePassword();
    pass &&
      userHashSalt.hash &&
      onSubmit({
        passwordHash: encryptValue(
          pass,
          userHashSalt.hash,
          target.password.value
        ),
        url: encryptValue(pass, userHashSalt.hash, target.url.value),
        username: encryptValue(pass, userHashSalt.hash, target.username.value),
        email: encryptValue(pass, userHashSalt.hash, target.email.value),
        additionalInfo: encryptValue(
          pass,
          userHashSalt.hash,
          target.additionalInfo.value
        ),
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <CopyableTextField
          id="url"
          label="url"
          type="url"
          initialValue={initialValues.url}
        />
        <CopyableTextField
          id="username"
          label="username"
          type="text"
          initialValue={initialValues.username}
        />
        <CopyableTextField
          id="email"
          label="email"
          type="email"
          initialValue={initialValues.email}
        />
        <FormControl>
          <InputLabel htmlFor="password">password</InputLabel>
          <OutlinedInput
            id="password"
            label="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
            endAdornment={
              <InputAdornment position="end" className="mr-1">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() =>
                    setValues({ ...values, showPassword: !values.showPassword })
                  }
                  edge="end"
                  className="mr-1"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton
                  aria-label="copy password"
                  onClick={() => navigator.clipboard.writeText(values.password)}
                  edge="end"
                  style={{ marginRight: "1px" }}
                >
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {!values.password && (
          <div className=" border border-base-300 p-2 flex flex-col gap-1">
            <button
              className="btn btn-info btn-xs"
              onClick={() =>
                setValues({
                  ...values,
                  password: generatePassword.generate({
                    excludeSimilarCharacters: true,
                    strict: true,
                    symbols: values.autoPasswordSymbols,
                    numbers: values.autoPasswordNumbers,
                    length: values.autoPasswordLength,
                  }),
                })
              }
            >
              Generate password
            </button>
            <FormGroup>
              <TextField
                label="length"
                type="number"
                variant="standard"
                className="mt-1"
                value={values.autoPasswordLength}
                onChange={({ target: { value } }) =>
                  setValues({
                    ...values,
                    autoPasswordLength:
                      parseInt(value) > 5 ? parseInt(value) : 6,
                  })
                }
              />
              <FormControlLabel
                label="include numbers"
                control={
                  <Checkbox
                    checked={values.autoPasswordNumbers}
                    onChange={() =>
                      setValues({
                        ...values,
                        autoPasswordNumbers: !values.autoPasswordNumbers,
                      })
                    }
                  />
                }
              />
              <FormControlLabel
                label="include symbols"
                control={
                  <Checkbox
                    checked={values.autoPasswordSymbols}
                    onChange={() =>
                      setValues({
                        ...values,
                        autoPasswordSymbols: !values.autoPasswordSymbols,
                      })
                    }
                  />
                }
              />
            </FormGroup>
          </div>
        )}
        <TextField
          id="additionalInfo"
          label="additional info"
          defaultValue={initialValues.additionalInfo}
          multiline
          minRows={3}
        />
        <button className="btn btn-primary modal-action" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
