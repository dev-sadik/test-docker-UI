import React from "react";
import Button from "@material-ui/core/Button";

//  This is custome Component created from material-ui button Componet

  type ButtonProps = {
    id: string,
    name: string,
    variant?: any,
    color: any,
    value: string,
    type?: "reset" | "button" | "submit" | undefined,
    onClickFunction?: ()=> any
}

const ButtonComponent: React.FC<ButtonProps> = ({
  
  id,
  name,
  value,
  color,
  variant,
  type,
  onClickFunction
}) => {
  return (
    <div style={{ margin: 5 }}>
      
      <Button
        id={id}
        name={name}
        variant={variant}
        color={color}
        type={type}
        onClick={onClickFunction}
      >
        {value}
      </Button>
    </div>
  );
};

export default ButtonComponent;
