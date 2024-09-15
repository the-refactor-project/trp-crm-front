import { ComponentProps, PropsWithChildren } from "react";
import "./Button.css";

type ButtonProps = ComponentProps<"button"> & {
  hasIcon?: boolean;
  isRound?: boolean;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  hasIcon,
  isRound,
  children,
  ...props
}) => {
  const buttonClassName = "button";
  props.className = `${props.className ? props.className + " " : ""}${buttonClassName}`;

  if (hasIcon) {
    props.className += ` ${buttonClassName}--icon`;
  }

  if (isRound) {
    props.className += ` ${buttonClassName}--round`;
  }

  return (
    <button {...props} type={`${props.type ?? "button"}`}>
      {children}
    </button>
  );
};

export default Button;
