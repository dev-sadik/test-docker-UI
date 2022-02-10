import React from "react";
import TextField from "@material-ui/core/TextField";

//This is a custom text filed component created from material-ui textFiled component.

 type FiledProps = {
    type: "text"| "email"|"password";
    placeholder?: string;
    id: string;
    name: string;
    required?: boolean;
    label?: string;
    value: string;
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement> ) => any;
  }

const TextFieldComponent: React.FC<FiledProps> = ({
  type,
  placeholder,
  id,
  label,
  name,
  value,
  required,
  onChangeFunction,
}: FiledProps) => {
  return (
    <div style={{ margin: 5 }}>
      <TextField
        type={type}
        placeholder={placeholder}
        id={id}
        label={label}
        name={name}
        value={value}
        required={required}
        onChange={onChangeFunction}
      />
    </div>
  );
};

export default TextFieldComponent;
