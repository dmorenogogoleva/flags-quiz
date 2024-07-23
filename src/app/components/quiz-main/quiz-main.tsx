/* eslint-disable @next/next/no-img-element */
import React from "react";
import shuffle from "lodash.shuffle";
import sample from "lodash.sample";
import styles from "./quiz-main.module.css";

import { QuizDynamic } from "../client/quiz-dynamic/quiz-dynamic";

export interface Country {
  code?: string;
  tld: string;
  name: string;
}

interface QuizMainProps {
  countries: Country[];
}

export const QuizMain: React.FC<QuizMainProps> = ({ countries }) => {
  const options = shuffle(countries).slice(0, 4);
  const correctOpt = sample(options) as Country;

  return (
    <div>
      <img
        className={styles.image}
        alt=""
        src={`https://flagcdn.com/${correctOpt?.code?.toLowerCase()}.svg`}
      />
      <QuizDynamic correctOpt={correctOpt} options={options} />
    </div>
  );
};
