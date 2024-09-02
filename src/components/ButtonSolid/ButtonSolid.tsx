import { ComponentProps } from "react";
import Button from "../Button/Button";

const ButtonSolid: React.FC<ComponentProps<typeof Button>> = ({
  children,
  ...props
}) => {
  const buttonClassName = "button--solid";
  props.className = `${props.className ? props.className + " " : ""}${buttonClassName}`;

  return <Button {...props}>{children}</Button>;
};

export default ButtonSolid;
