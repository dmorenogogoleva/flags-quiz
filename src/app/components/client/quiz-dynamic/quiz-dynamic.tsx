"use client";
import React, { useState } from "react";
import { Country } from "../../quiz-main/quiz-main";
import { Button } from "../../ui/button/button";

import styles from "./quiz-dynamic.module.css";

interface QuizDynamicProps {
  options?: Country[];
  correctOpt?: Country;
  onNext: VoidFunction;
}

export const QuizButtons: React.FC<QuizDynamicProps> = ({
  correctOpt,
  options,
  onNext,
}) => {
  const [chosenOpt, setChosenOpt] = useState<Country | null>(null);

  const onButtonClick = (country: Country) => {
    setChosenOpt(country);
  };

  const resetState = () => {
    setChosenOpt(null);
    onNext();
  };

  if (!options) return <div>loading...</div>;

  return (
    <div>
      <div className={styles.buttons}>
        {options.map((opt, i) => (
          <Button
            key={i}
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
