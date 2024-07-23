import React from "react";
import { clsx } from "clsx";

import styles from "./button.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  status?: "unset" | "correct" | "wrong";
  onClick?: VoidFunction;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  status = "unset",
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, styles[status])}
      type="button"
    >
      {children}
    </button>
  );
};
