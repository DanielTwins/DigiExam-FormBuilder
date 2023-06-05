import { useState } from "react";
import { FieldType } from "../../store/form";

export const useValidation = (fieldType: FieldType, inputValue: string) => {
  // declaring state variable to hold the error message
  const [errorMessage, setErrorMessage] = useState("");

  const validateField = () => {
    switch (fieldType) {
      case FieldType.Number:
        // regex to check if the input contains only numbers
        const numericRegEx = /^\d*$/;
        const isNumber = numericRegEx.test(inputValue);
        console.log("Check isNumber value => ", isNumber);

        // Setting the error message if the input is not a number
        !isNumber
          ? setErrorMessage("Input must contain only numbers!")
          : setErrorMessage(""); // Setting an empty errorMessage if isNumber is true
        return isNumber; // returning a boolean value to check if the input is a number

      case FieldType.String:
        setErrorMessage(""); // Clearing the error message for string fields
        return true; // returning true since no additional validation is needed for string fields

      case FieldType.Date:
        // Checking if the input is a valid date by parsing it using Date.parse()
        const isDate = !isNaN(Date.parse(inputValue));
        console.log("Check isDate value => ", isDate);

        !isDate
          ? setErrorMessage("Input is not a correct date!")
          : setErrorMessage(""); 
        return isDate; 

      case FieldType.Boolean:
        // Converting the input value to lowercase
        const lowercaseInputValue = inputValue.toLowerCase();
        // Checking if the input is either 'true' or 'false'
        const isBoolean =
          lowercaseInputValue === "true" || lowercaseInputValue === "false";
        console.log("Check isBoolean value => ", isBoolean);

        // Setting the error message if the input is not a valid boolean
        !isBoolean
          ? setErrorMessage("Input must be either 'true' or 'false'!")
          : setErrorMessage(""); // Setting an empty errorMessage if isBoolean is true
        return isBoolean; 

      default:
        setErrorMessage(""); 
        return undefined; 
    }
  };

  // returning and exporting the errorMessage and validateField function 
  return { errorMessage, validateField };
};
