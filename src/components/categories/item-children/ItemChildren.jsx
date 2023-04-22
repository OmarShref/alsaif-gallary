import styles from "./ItemChildren.module.css";
import { useOutletContext, NavLink } from "react-router-dom";

const ItemChildren = () => {
  const itemChildren = useOutletContext();
  return (
    <div className={styles.item_children}>
      {itemChildren.map((child) => (
        <div className={styles.item_child}>
          <NavLink to="#" className={styles.category_item_link}>
            <img src={child.icon + "?width=64"} alt={child.name} />
            <p>{child.name}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default ItemChildren;
