"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Country } from "../quiz-main/quiz-main";
import { Button } from "../ui/button/button";

import styles from "./quiz-buttons.module.css";

interface QuizDynamicProps {
  options?: Country[];
  correctOpt?: Country;
  onNext: VoidFunction;
  updateCount: Dispatch<SetStateAction<number>>;
  setRound: Dispatch<SetStateAction<number>>;
}

export const QuizButtons: React.FC<QuizDynamicProps> = ({
  correctOpt,
  options,
  onNext,
  updateCount,
  setRound,
}) => {
  const [chosenOpt, setChosenOpt] = useState<Country | null>(null);

  const onButtonClick = (country: Country) => {
    setChosenOpt(country);

    if (country?.name === correctOpt?.name) {
      updateCount((prev) => prev + 1);
    }
    setRound((prev) => prev + 1);
  };

  const resetState = () => {
    setChosenOpt(null);
    onNext();
  };

  return (
    <div>
      <div className={styles.buttons}>
        {options?.map((opt, i) => (
          <Button
            key={i}
            disabled={!!chosenOpt}
            onClick={() => onButtonClick(opt)}
            status={chosenOpt ? getStatus(opt, chosenOpt, correctOpt) : "unset"}
          >
            {opt.name}
          </Button>
        ))}
      </div>
      <br />
      <br />
      {chosenOpt && <Button onClick={resetState}>next</Button>}
    </div>
  );
};

const getStatus = (opt: Country, chosenOpt?: Country, correctOpt?: Country) => {
  const isGuessCorrect = chosenOpt?.name === correctOpt?.name;
  const isCurOptChosen = opt.name === chosenOpt?.name;
  const isCurOptCorrect = opt.name === correctOpt?.name;

  if (isCurOptCorrect) {
    return "correct";
  }

  if (isCurOptChosen) {
    return isGuessCorrect ? "correct" : "wrong";
  }

  return "unset";
};
