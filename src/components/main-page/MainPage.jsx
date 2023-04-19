import styles from "./MainPage.module.css";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import NavigationBar from "../navigation-bar/NavigationBar";
import { Suspense } from "react";

const MainPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Suspense
          fallback={
            <div
              style={{
                position: "fixed",
                inset: "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/src/assets/loading.gif"
                alt="loading gif"
                width="120"
              />
            </div>
          }
        >
          <Outlet />
        </Suspense>
        <NavigationBar />
      </div>
    </>
  );
};

export default MainPage;
