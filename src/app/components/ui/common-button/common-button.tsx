import React from "react";

import styles from "./common-button.module.css";

interface CommonButtonProps {
  children?: React.ReactNode;
  onClick?: VoidFunction;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      type="button"
    >
      {children}
    </button>
  );
};
