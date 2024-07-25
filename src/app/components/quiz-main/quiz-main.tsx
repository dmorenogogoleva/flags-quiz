/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import sample from "lodash.sample";
import sampleSize from "lodash.samplesize";
import styles from "./quiz-main.module.css";

import { Button } from "../ui/button/button";
import { CommonButton } from "../ui/common-button/common-button";
import { GameOverScreen } from "../game-over-screen/game-over-screen";

export const MAX_ROUND_NUM = 10;

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
  const [round, setRound] = useState(1);
  const [chosenOpt, setChosenOpt] = useState<Country | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSrc = `https://flagcdn.com/${correctOpt?.code?.toLowerCase()}.svg`;

  const onButtonClick = (country: Country) => {
    setChosenOpt(country);

    if (country?.name === correctOpt?.name) {
      setCount((prev) => prev + 1);
    }
  };

  const resetState = () => {
    setChosenOpt(null);
    setInitialState();
    setImageLoaded(false);
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
  if (round > MAX_ROUND_NUM) {
    return (
      <GameOverScreen
        count={count}
        onClick={() => {
          resetState();
          setRound(1);
          setCount(0);
        }}
      />
    );
  }

  return (
    <>
      <br />
      <span className={styles.count}>
        your score: {count}/{MAX_ROUND_NUM}. round: {round}
      </span>
      <br />
      <br />
      <img
        onLoad={() => {
          setImageLoaded(true);
        }}
        alt=""
        className={styles.image}
        key={imageSrc}
        src={imageSrc}
      />
      {imageLoaded ? (
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
          {chosenOpt && (
            <CommonButton
              onClick={() => {
                resetState();
                setRound((prev) => prev + 1);
              }}
            >
              next
            </CommonButton>
          )}
        </div>
      ) : (
        "loading...."
      )}
    </>
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
