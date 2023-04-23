import styles from "./Categories.module.css";
import { useState } from "react";
import { gql, useQuery } from "urql";
import loadingGif from "../../assets/loading.gif";
import { NavLink, Outlet } from "react-router-dom";
import getUrl from "../../helper-functions/getting-banner";

const categoriesMenuQuery = gql`
  query {
    agMegaMenuTree {
      items {
        id
        name
        icon
        url
        label
        label_text_color
        label_background_color
        page_builder {
          json_encoded
        }
        children {
          id
          name
          icon
          url
          label
          label_text_color
          label_background_color
        }
      }
    }
  }
`;

const Categories = () => {
  const [itemChildren, setItemChildren] = useState([
    { icon: "", name: "", id: "123" },
  ]);
  const [bannerUrl, setBannerUrl] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [result, reexcuteQuery] = useQuery({ query: categoriesMenuQuery });
  const { data, fetching, error } = result;
  if (fetching)
    return (
      <div
        style={{
          position: "fixed",
          inset: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={loadingGif} alt="loading gif" width="120" />
      </div>
    );
  if (error) return <p>Oh no ..... {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.side_menu}>
          {data.agMegaMenuTree.items.map((item) => (
            <div key={item.id} className={styles.grid_row}>
              <NavLink
                to={`.${item.url}`.replace(".html", "")}
                end={true}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.side_menu_link} ${styles.active_side_menu_link}`
                    : `${styles.side_menu_link}`
                }
                onClick={() => {
                  setItemChildren(item.children);
                  setBannerUrl(getUrl(item.page_builder.json_encoded));
                  setCategoryName(item.name);
                }}
              >
                <img
                  src={`${item.icon}?width=128`}
                  alt={item.name + " icon"}
                  loading="lazy"
                />
                <p>{item.name}</p>
              </NavLink>
            </div>
          ))}
        </div>
        <Outlet context={[itemChildren, bannerUrl, categoryName]} />
      </div>
    </div>
  );
};

export default Categories;
