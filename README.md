## Part 1. Field Input Validation:

I started by get familiar with the existing code base and understanding its structure. After analyzing the code, I considered where to handle the validation logic. Initially, I implemented the validation logic within the FormBuilder component, which is the parent component for the InputField component. However, I realized that it would be better to separate the validation logic into a separate file or component to improve code organization and maintainability. As a result, I decided to create a custom hook called useValidation, which can be easily reused throughout the application.

- The useValidation custom hook I created handles validation rules and error handling.

- I used the useState hook to manage the error message state.

- The hook takes two arguments: fieldType (representing the field type) and inputValue (representing the current input value).

- These arguments are passed from the FormBuilder component using the state variables currentType, currentKey, and currentLabel.

- Inside the useValidation hook, I used a switch case statement that checks the fieldType and implement the validation logic for each specific field type.

- The function returns a boolean value which indicate the validity of the input based on the defined validation rules.

- At the end the useValidation hook exports the errorMessage and validateField function in an object.

- This approach would allow the FormBuilder component to access and use these values for error handling and validation checks.

- I believe that this modular approach improves code reusability and maintainability.

Overall, the useValidation hook centralizes the validation logic, making it easier to manage and reuse throughout the application.


Later the FormBuilder component utilizes the useValidation hook for validating the Key and Label fields and handling field submission.

- The useValidation hook is used for validating both fields by passing in the field types and values.

- The validateKeyField and validateLabelField functions are called in the handleAddingField function to validate the respective fields.
	
- I store the result of the validation in constants.

- Moreover, the constants are then used to check if the field validations pass the rules and are valid.

- If the validations pass, the addField action is dispatched.

- If the validations fail, an alert is displayed with an error message.

Later on the InputField component receives an additional prop called type, which represents the FieldType for handling the blur event.

- Initially I pass in the type and value arguments into the useValidation hook and retrieving the errorMessage and validateField function.

- Then the onBlur event is implemented in the TextField component to handle the validation by calling the validateField function in the handleBlur function.

- If the validation fails, the error message is rendered to the user.

- The ErrorText element is created using styled components to render the error message.
So, the onBlur event triggers the validation process and displays error messages if needed. The ErrorText element which is created and styled with styled-component library for rendering the error message to the user.


## Part 2. Dynamic Validation Setting:
I have not implemented or created the dynamic feature yet. However, below is my thought process and approach for solving the task:

- I would start by creating a component called FormRulesView responsible for the UI part.

- In the FormRulesView component, I would implement the JSX code to display the validation rules options to the user, optionally as checkboxes or a dropdown menu.

- In the FormBuilder component, I would create an array of objects that contains the validation rules for each field type. This array will be used to populate the options in the FormRulesView component.
 
- When the user select a field type, I use then a switch case statement to determine the selected type and display the corresponding validation rules options in the UI.

- Then I would implement an onChange event handler in the FormRulesView component to capture the selected rules (checkbox values) and pass them to the useValidation hook for validation.

- Then I handle the validation process in a handleAddingForm function in the FormBuilder component. If the validation is successful, dispatch the addField action and update the state accordingly.











