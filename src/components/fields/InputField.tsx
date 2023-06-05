import { ChangeEvent } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { FieldType } from "../../store/form";
import styled from "@emotion/styled";
import { useValidation } from "../hooks/useValidation";

type InputFieldProps = Omit<TextFieldProps, "onChange"> & {
  label: string;
  value: string;
  type: FieldType;
  onChange: (value: string) => void;
};

export const InputField = ({
  type,
  label,
  value,
  onChange,
  ...rest
}: InputFieldProps) => {
  // Use the useValidation hook to get the errorMessage and validateField function
  const { errorMessage, validateField } = useValidation(type, value);

  // Handle the blur event when you switch the inputs/focus
  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    validateField();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <>
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        {...rest}
        onBlur={handleBlur}
      />
      {/* Render the error message if it exists */}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </>
  );
};

// Style the error message element using emotion/styled
const ErrorText = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: left;
  color: rgb(255, 0, 0);
  font-size: 0.8rem;
  margin-top: 4px;
`;
