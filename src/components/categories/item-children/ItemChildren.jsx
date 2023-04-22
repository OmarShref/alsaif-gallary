import styles from "./ItemChildren.module.css";
import { useOutletContext } from "react-router-dom";

const ItemChildren = () => {
  const itemChildren = useOutletContext();
  return (
    <div className={styles.item_children}>
      {itemChildren.map((child) => (
        <div>
          <img
            src={child.icon + "?width=86"}
            alt={child.name}
            style={{ width: "50px" }}
          />
          <p>{child.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemChildren;
