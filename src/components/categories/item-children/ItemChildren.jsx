import styles from "./ItemChildren.module.css";
import { useOutletContext, NavLink } from "react-router-dom";

const ItemChildren = () => {
  const itemChildren = useOutletContext();
  return (
    <div className={styles.item_children}>
      {itemChildren.map((child) => (
        <div className={styles.item_child}>
          <NavLink to="#" className={styles.category_item_link}>
            <img
              src={child.icon + "?width=86"}
              alt={child.name}
              style={{ width: "50px" }}
            />
            <p>{child.name}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default ItemChildren;
