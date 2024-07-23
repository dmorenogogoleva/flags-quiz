import React from "react";
import { clsx } from "clsx";

import styles from "./button.module.css";

interface ButtonProps {
  onClick?: VoidFunction;
  children?: React.ReactNode;
  status: "unset" | "correct" | "wrong";
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  status,
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
