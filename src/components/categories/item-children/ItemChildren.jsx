import styles from "./ItemChildren.module.css";
import { useOutletContext, NavLink } from "react-router-dom";
import imageLoadingGif from "../../../assets/imageLoading.gif";

const ItemChildren = () => {
  const [itemChildren, bannerUrl, categoryName] = useOutletContext();
  return (
    <div className={styles.item_children}>
      {/* banner  */}
      {bannerUrl && (
        <div className={styles.banner}>
          <img
            src={bannerUrl + "?width=300"}
            alt={categoryName + " banner"}
            width="300"
          />
        </div>
      )}
      {/* rest of icons  */}
      {itemChildren &&
        itemChildren.map((child) => (
          <div className={styles.item_child} key={child.id}>
            <NavLink to="#" className={styles.category_item_link}>
              <img
                src={imageLoadingGif}
                alt="image loading gif"
                id={child.id}
                className={styles.image_loading_placeholder}
              />
              <img
                src={child.icon + "?width=128"}
                alt={child.name + " icon"}
                loading="lazy"
                onLoad={() => {
                  document.getElementById(`${child.id}`).style.display = "none";
                }}
              />
              <p>{child.name}</p>
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default ItemChildren;
