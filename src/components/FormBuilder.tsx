import { Dropdown } from "./fields/Dropdown.tsx";
import { useState } from "react";
import { addField, FieldType } from "../store/form.ts";
import { Button, Grid, Typography } from "@mui/material";
import { InputField } from "./fields/InputField.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/config.ts";
import { useValidation } from "./hooks/useValidation"; // import custom hook useValidation

export const FormBuilder = () => {
  const [currentType, setCurrentType] = useState("");
  const [currentKey, setCurrentKey] = useState("");
  const [currentLabel, setCurrentLabel] = useState("");
  const dispatch = useDispatch();
  const { fields } = useSelector((state: RootState) => state.form);

  // Use the useValidation hook to get validation functions for key and label fields 
  // based on the current type
  const { validateField: validateKeyField } = useValidation(
    currentType as FieldType,
    currentKey
  );
  const { validateField: validateLabelField } = useValidation(
    currentType as FieldType,
    currentLabel
  );

  const handleAddingField = () => {
    if (fields[currentKey] !== undefined) {
      alert("Key already exists");
      return;
    }
    // validate the key and label fields
    const isKeyValid = validateKeyField();
    const isLabelValid = validateLabelField();

    // check first if all the required fields are filled
    if (currentType && currentKey && currentLabel) {
      // check now if the key and label field's value are valid
      if (isKeyValid && isLabelValid) {
        dispatch( // dispatch the action to add new field
          addField({
            key: currentKey,
            type: currentType as FieldType,
            label: currentLabel,
          })
        );
      } else {
        // if a field is not valid alert ther message
        alert("Form validation failed! Try again!");
      }
    }
  };

  return (
    <Grid container spacing={2} sx={{ width: 300, margin: "auto" }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Form Builder
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Dropdown
          label="Choose a field type"
          value={currentType}
          onChange={(type) => setCurrentType(type)}
          options={{
            Number: FieldType.Number,
            String: FieldType.String,
            Date: FieldType.Date,
            Boolean: FieldType.Boolean,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setCurrentKey(value)}
          label="Key"
          value={currentKey}
          type={currentType} // pass in the typ as prop
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          onChange={(value) => setCurrentLabel(value)}
          label="Label"
          value={currentLabel}
          type={currentType} // pass in the typ as prop
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddingField}>
          Add Field
        </Button>
      </Grid>
    </Grid>
  );
};
