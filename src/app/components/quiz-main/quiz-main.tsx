/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import sample from "lodash.sample";
import sampleSize from "lodash.samplesize";
import styles from "./quiz-main.module.css";

import { QuizButtons } from "../quiz-dynamic/quiz-buttons";
import { Button } from "../ui/button/button";

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

  if (round >= MAX_ROUND_NUM) {
    return (
      <>
        <h1>G A M E O V E R</h1>
        <p>
          your result: ${count} correct answers of {MAX_ROUND_NUM}
        </p>
        <br />
        <br />
        <Button onClick={setInitialState}>start again</Button>
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
      <QuizButtons
        onNext={setInitialState}
        correctOpt={correctOpt}
        options={options}
        updateCount={setCount}
        setRound={setRound}
      />
    </div>
  );
};
