import React from "react";
import { clsx } from "clsx";

import styles from "./button.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  status?: "unset" | "correct" | "wrong";
  onClick?: VoidFunction;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled,
  status = "unset",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.button, styles[status])}
      type="button"
    >
      {children}
    </button>
  );
};
