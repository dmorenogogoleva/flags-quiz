/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import sample from "lodash.sample";
import sampleSize from "lodash.samplesize";
import styles from "./quiz-main.module.css";

import { Button } from "../ui/button/button";
import { CommonButton } from "../ui/common-button/common-button";

const MAX_ROUND_NUM = 2;

export interface Country {
  code?: string;
  tld: string;
  name: string;
}

interface QuizMainProps {
  countries: Country[];
}

export const QuizMain: React.FC<QuizMainProps> = ({ countries }) => {
  const [options, setOptions] = useState<Country[]>();
  const [correctOpt, setCorrectOpt] = useState<Country>();
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [chosenOpt, setChosenOpt] = useState<Country | null>(null);

  const onButtonClick = (country: Country) => {
    setChosenOpt(country);

    if (country?.name === correctOpt?.name) {
      setCount((prev) => prev + 1);
    }
    setRound((prev) => prev + 1);
  };

  const resetState = () => {
    setChosenOpt(null);
    setInitialState();
  };

  const setInitialState = useCallback(() => {
    if (!countries) return;
    const opts = sampleSize(countries, 4);
    const correctOpt = sample(opts) as Country;
    setOptions(opts);
    setCorrectOpt(correctOpt);
  }, [countries]);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  // todo: add stub
  if (!options) return "loading.....";

  // todo: work on the last screen
  if (round >= MAX_ROUND_NUM) {
    return (
      <>
        <h1>G A M E O V E R</h1>
        <p>
          your result: <h3>{count}</h3> correct answers of {MAX_ROUND_NUM}
        </p>
        <br />
        <br />
        <Button
          onClick={() => {
            resetState();
            setRound(0);
          }}
        >
          start again
        </Button>
      </>
    );
  }

  return (
    <div>
      <br />
      <br />
      <span>
        {count}/{round}
      </span>
      <br />
      <br />
      <img
        alt=""
        className={styles.image}
        // todo: move to func
        src={`https://flagcdn.com/${correctOpt?.code?.toLowerCase()}.svg`}
      />
      <div>
        <div className={styles.buttons}>
          {options?.map((opt, i) => (
            <Button
              key={i}
              disabled={!!chosenOpt}
              onClick={() => onButtonClick(opt)}
              status={
                chosenOpt ? getStatus(opt, chosenOpt, correctOpt) : "unset"
              }
            >
              {opt.name}
            </Button>
          ))}
        </div>
        <br />
        <br />
        {chosenOpt && <CommonButton onClick={resetState}>next</CommonButton>}
      </div>
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
