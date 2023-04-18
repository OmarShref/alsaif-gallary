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
            <h3
              style={{
                position: "fixed",
                inset: "0",
                display: "grid",
                placeItems: "center",
                color: "#be1e2d",
              }}
            >
              Loading...
            </h3>
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
