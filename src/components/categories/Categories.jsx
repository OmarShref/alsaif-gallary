import styles from "./Categories.module.css";
import { gql, useQuery } from "urql";

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
  const [result, reexcuteQuery] = useQuery({ query: categoriesMenuQuery });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no ..... {error.message}</p>;

  return (
    <div className={styles.container}>
      {data.agMegaMenuTree.items.map((item) => (
        <div key={item.id}>
          <img src={`${item.icon}?width=48`} alt="category icon" />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
