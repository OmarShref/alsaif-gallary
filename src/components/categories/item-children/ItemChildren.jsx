import styles from "./ItemChildren.module.css";
import { useOutletContext, NavLink } from "react-router-dom";
import imageLoadingGif from "../../../assets/imageLoading.gif";

const ItemChildren = () => {
  const itemChildren = useOutletContext();
  return (
    <div className={styles.item_children}>
      {itemChildren.map((child) => (
        <div className={styles.item_child} key={child.id}>
          <NavLink to="#" className={styles.category_item_link}>
            <img
              src={imageLoadingGif}
              alt="image loading gif"
              id={child.id}
              className={styles.image_loading_placeholder}
              loading="lazy"
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
