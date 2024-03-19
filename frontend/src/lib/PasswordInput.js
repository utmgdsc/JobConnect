import { useState } from "react";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormGroup>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup className="mb-3">
        <FormControl
          type={showPassword ? "text" : "password"}
          value={props.value}
          onChange={(event) => props.onChange(event)}
          onBlur={props.onBlur ? props.onBlur : null}
          isInvalid={props.error ? props.error : null}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={handleShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputGroup.Append>
      </InputGroup>
      {props.helperText ? (
        <Form.Text className="text-muted">{props.helperText}</Form.Text>
      ) : null}
    </FormGroup>
  );
};

export default PasswordInput;
