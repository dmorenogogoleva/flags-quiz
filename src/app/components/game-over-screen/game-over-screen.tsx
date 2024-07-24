import React from "react";

import { MAX_ROUND_NUM } from "../quiz-main/quiz-main";
import { Button } from "../ui/button/button";

import styles from "./game-over-screen.module.css";

interface GameOverScreenProps {
  count: number;
  onClick: VoidFunction;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  count,
  onClick,
}) => {
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>GAME OVER</h1>
      <p>
        your result: <b>{count}</b> correct answers of {MAX_ROUND_NUM}
        <br />
        <br />
        {count > 0 && (
          <span>
            you have <b>{(count / MAX_ROUND_NUM) * 100}%</b> correct answers{" "}
            <br />
            <br />
            it&apos;s awesome! 🎉
          </span>
        )}
      </p>
      <Button className={styles.button} onClick={onClick}>
        start again
      </Button>
    </div>
  );
};
