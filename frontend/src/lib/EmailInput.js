import { Form, FormGroup, FormLabel, FormControl, FormText } from "react-bootstrap";

const EmailInput = (props) => {
  const {
    label,
    value,
    onChange,
    inputErrorHandler,
    handleInputError,
    required,
    className,
  } = props;

  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FormControl
        type="email"
        value={value}
        onChange={onChange}
        onBlur={(event) => {
          if (event.target.value === "") {
            if (required) {
              handleInputError("email", true, "Email is required");
            } else {
              handleInputError("email", false, "");
            }
          } else {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(event.target.value).toLowerCase())) {
              handleInputError("email", false, "");
            } else {
              handleInputError("email", true, "Incorrect email format");
            }
          }
        }}
        isInvalid={inputErrorHandler.email.error}
        className={className}
      />
      {inputErrorHandler.email.error ? (
        <FormText className="text-danger">
          {inputErrorHandler.email.message}
        </FormText>
      ) : null}
    </FormGroup>
  );
};

export default EmailInput;
