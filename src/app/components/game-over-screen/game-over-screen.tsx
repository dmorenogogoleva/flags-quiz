import React from "react";

import { MAX_ROUND_NUM } from "../quiz-main/quiz-main";
import { Button } from "../ui/button/button";

import styles from "./game-over-screen.module.css";

interface GameOverScreenProps {
  count: number;
  onClick: VoidFunction;
}

const low = "you can do better. Keep going! 😘 👊";

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  count = 0,
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
            {
              {
                1: low,
                2: low,
                3: low,
                4: "not bad 😎 I bet you can earn more!",
                5: `great job! You're on a roll! 💪 Keep it up!`,
                6: `awesome! You're getting really good at this! 🎉 Go for more!`,
                7: `impressive! You're a star! 🌟 Can you hit the top?`,
                8: `fantastic! You're so close to perfection! 🌟 Keep pushing!`,
                9: `amazing! Just one step away from greatness! 🔥 Go for the perfect score!`,
                10: `perfect! You're a true champion! 🏆 Enjoy your victory!`,
              }[count]
            }
          </span>
        )}
      </p>
      <Button className={styles.button} onClick={onClick}>
        start again
      </Button>
    </div>
  );
};
