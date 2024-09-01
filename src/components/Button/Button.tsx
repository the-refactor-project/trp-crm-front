import { ComponentProps, PropsWithChildren } from "react";
import "./Button.css";

type ButtonProps = ComponentProps<"button">;

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  const buttonClassName = "button";
  props.className = `${props.className ? props.className + " " : ""}${buttonClassName}`;

  return <button {...props}>{children}</button>;
};

export default Button;
