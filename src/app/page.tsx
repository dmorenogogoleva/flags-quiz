import { QuizMain } from "./components/quiz-main";
import styles from "./page.module.css";

async function getData() {
  const res = await fetch("https://cdn.simplelocalize.io/public/v1/countries");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  if (!data) return <div>500</div>;

  return (
    <main className={styles.container}>{<QuizMain countries={data} />}</main>
  );
}
