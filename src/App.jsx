import styles from "./App.module.css";
import { useEffect, lazy } from "react";
import useLanguageStore from "./stores/languageStore";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/main-page/MainPage";
const Home = lazy(() => import("./components/home/Home"));
const Categories = lazy(() => import("./components/categories/Categories"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Offers = lazy(() => import("./components/offers/Offers"));
const Account = lazy(() => import("./components/account/Account"));

function App() {
  const language = useLanguageStore((state) => state.language);
  // change layout direction according to language selected
  useEffect(() => {
    if (language === "en") {
      document.documentElement.style.setProperty("--layout-direction", "ltr");
    } else if (language === "ar") {
      document.documentElement.style.setProperty("--layout-direction", "rtl");
    } else {
      document.documentElement.style.setProperty("--layout-direction", "rtl");
    }
  }, [language]);
  return (
    <>
      {/* <head>
        <meta name="discription" content="Home Page" />
        <title>Home Page</title>
      </head> */}
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
