import type { NextPage } from "next";
import Head from "next/head";
import styles from "@styles/Home.module.css";
import Counter from "@features/counter/Counter";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
};

export default Home;
