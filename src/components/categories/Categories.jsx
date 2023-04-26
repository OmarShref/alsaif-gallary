import styles from "./Categories.module.css";
import { useState, useEffect } from "react";
import { gql, useQuery } from "urql";
import loadingGif from "../../assets/loading.gif";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import getUrl from "../../helper-functions/getting-banner";
import useLastCategoryStore from "../../stores/lastCategoryStore";

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
  // states to pass to the item children component throw the outlet context
  const [itemChildren, setItemChildren] = useState();
  const [bannerUrl, setBannerUrl] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const lastCategory = useLastCategoryStore((state) => state.lastCategory);
  const setLastCategory = useLastCategoryStore(
    (state) => state.setLastCategory
  );
  const index = useLastCategoryStore((state) => state.index);
  const setIndex = useLastCategoryStore((state) => state.setIndex);
  const Navigate = useNavigate();

  const [result, reexcuteQuery] = useQuery({ query: categoriesMenuQuery });
  const { data, fetching, error } = result;

  // to get same page contents after refreshing browser or changing url
  useEffect(() => {
    // to prevent doing any thing before data fetching
    if (data) {
      const createdSideMenuLinks = [
        ...document.getElementsByClassName(styles.side_menu_link),
      ];
      const activeSideMenuLink = createdSideMenuLinks.find((e) =>
        e.classList.contains(styles.active_side_menu_link)
      );
      if (activeSideMenuLink) {
        // trigger active link click
        activeSideMenuLink.click();
      } else if (lastCategory) {
        // getting last category when going out then back to categories again
        Navigate(lastCategory);
        createdSideMenuLinks[index].click();
      } else {
        // setting then trigger active link click
        createdSideMenuLinks[0].click();
      }
    }
  }, [data]);

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
          {data.agMegaMenuTree.items.map((item, i) => (
            <div key={item.id} className={styles.grid_row}>
              <NavLink
                to={`.${item.url}`.replace(".html", "")}
                replace={true}
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
                  setLastCategory(`.${item.url}`.replace(".html", ""));
                  setIndex(i);
                }}
              >
                <img src={`${item.icon}?width=128`} alt={item.name + " icon"} />
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
