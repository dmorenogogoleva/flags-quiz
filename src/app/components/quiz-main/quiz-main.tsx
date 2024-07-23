/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import shuffle from "lodash.shuffle";
import sample from "lodash.sample";
import sampleSize from "lodash.samplesize";
import styles from "./quiz-main.module.css";

import { QuizDynamic } from "../client/quiz-dynamic/quiz-dynamic";
import { useRerender } from "@/app/hooks/useRerender";

export interface Country {
  code?: string;
  tld: string;
  name: string;
}

interface QuizMainProps {
  countries: Country[];
}

export const QuizMain: React.FC<QuizMainProps> = ({ countries }) => {
  const [options, setOptions] = useState<any>(null);
  const { rerenderKey, rerenderAction } = useRerender();

  useEffect(() => {
    const opts = sampleSize(countries, 4);
    setOptions(opts);
  }, [countries, rerenderKey]);

  // todo: add stub
  if (!options) return "loading.....";

  const correctOpt = sample(options) as Country;

  return (
    <div>
      <img
        alt=""
        className={styles.image}
        // todo: move to func
        src={`https://flagcdn.com/${correctOpt?.code?.toLowerCase()}.svg`}
      />
      <button type="button" onClick={rerenderAction}>
        triggerReshuffle
      </button>
      <QuizDynamic correctOpt={correctOpt} options={options} />
    </div>
  );
};
