import { ComponentProps } from "react";
import Button from "../Button/Button";

const ButtonOutline: React.FC<ComponentProps<typeof Button>> = ({
  children,
  ...props
}) => {
  const buttonClassName = "button--outline";
  props.className = `${props.className ? props.className + " " : ""}${buttonClassName}`;

  return <Button {...props}>{children}</Button>;
};

export default ButtonOutline;
