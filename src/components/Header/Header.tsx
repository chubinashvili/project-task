import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// hooks
import { useMobileWidth } from "../../hooks/useMobileWidth";

// styles
import styles from "./Header.module.css";

// svg
import { Menu } from "../../svg";

// types
interface NavItem {
  title: string;
  link: string;
}

const Header: React.FC = () => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [navbarActive, setNavbarActive] = useState<boolean>(false);
  const { width } = useMobileWidth();
  const location = useLocation();

  const navList: NavItem[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Users",
      link: "/users",
    },
    {
      title: "Info Chart",
      link: "/info-chart",
    },
  ];

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={`${animate ? styles.animate : ""} ${styles.headerWrapper} ${
        navbarActive && width <= 900 ? styles.headerActive : ""
      } `}>
      <header className={`${styles.header}`}>
        <div className={styles.mainTitleContainer}>
          <div className={styles.mainTitleWrap}>
            <div className={styles.logoContainer}>
              <h3>Task</h3>
            </div>
            <span className={styles.divideBorder}></span>
            <h3>
              <span>Callapp</span>
            </h3>
          </div>
          {width >= 900 && (
            <div className={styles.navigationList}>
              {navList?.map((item: NavItem, index: number) => (
                <div key={index}>
                  <Link
                    to={item.link}
                    className={`${styles.navigationListLink} ${
                      location?.pathname === item.link
                        ? styles.navigationListLinkActive
                        : ""
                    }`}
                    target={item.link.includes("http") ? "_blank" : "_self"}>
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.menuWrapper}>
          {width <= 900 && (
            <Menu
              className={styles.navbarMenu}
              onClick={() => setNavbarActive((prev) => !prev)}
              active={navbarActive}
            />
          )}
        </div>
      </header>
      {width <= 900 && (
        <div
          className={`${styles.navigationList} ${
            navbarActive ? styles.navigationListActive : ""
          }`}>
          {navList?.map((item: NavItem, index: number) => (
            <Link
              to={item.link}
              key={index}
              className={`${styles.navigationListLink} ${
                location?.pathname === item.link
                  ? styles.navigationListLinkActive
                  : ""
              }`}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
