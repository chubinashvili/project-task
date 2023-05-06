import React, { useState, useEffect } from "react";

// styles
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = (): JSX.Element => {
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <header
      className={`${styles.dashboardHeaderContainer} ${
        animate ? styles.animate : ""
      }`}>
      <img src={"/images/dashboard/rocket.png"} className={styles.dashboardHeaderRocketImg} alt='rocket' />
      <div className={styles.dashboardHeader}>
        <img src={"/images/dashboard/dots.png"} className={styles.dashboardHeaderDotsImg} alt='dots' />
        <div className={styles.dashboardHeaderTop}>
          <h1>Hi</h1>
          <h1>I hope you'll enjoy</h1>
        </div>
        <div className={styles.dashboardHeaderBottom}>
          <h1></h1>
          <p>this is just a guess...</p>
        </div>
        <img src={"/images/dashboard/man.png"} className={styles.dashboardHeaderManImg} alt='man' />
        <img
          src={"/images/dashboard/planet.png"}
          className={styles.dashboardHeaderPlanetImg}
          alt='planet'
        />
      </div>
      <img src={"/images/dashboard/dotsRight.png"} className={styles.dashboardHeaderDotsRightImg} alt='dots' />
    </header>
  );
};

export default Dashboard;
