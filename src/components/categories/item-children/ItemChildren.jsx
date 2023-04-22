import styles from "./ItemChildren.module.css";
import { useOutletContext } from "react-router-dom";

const ItemChildren = () => {
  const itemChildren = useOutletContext();
  return (
    <div className={styles.container}>
      {itemChildren.map((child) => (
        <div>
          <img src={child.icon + "?width=64"} alt={child.name} />
          <p>{child.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemChildren;
