import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./cart.module.css";
import Image, { StaticImageData } from "next/image";
import blank from "../../../../public/img/blank.png";

export default function CartNav({
  setCard,
  setCart,
  cart,
}: {
  setCard: () => void;
  setCart: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        img: StaticImageData;
        description: string;
        code: number;
        price: number;
      }[]
    >
  >;
  cart: {
    name: string;
    img: StaticImageData;
    description: string;
    code: number;
    price: number;
  }[];
}) {

  function remove(el: { code: number }) {
    setCart((prevCards) => prevCards.filter((card) => card.code !== el.code));
  }
  return (
    <>
      <div className={styles.cartNav}>
        <div className={styles.cart__title}>
          <p>Shopping cart</p>
          <button onClick={setCard}>
            <FontAwesomeIcon icon={faXmark} style={{ height: "1.5rem" }} />
          </button>
        </div>

        <div className={styles.cart__products}>
          {cart.map((el) => (
            <div className={styles.products__card} key={el.code}>
              <div className={styles.card__image}>
                <Image
                  src={el.img ? el.img : blank}
                  width={150}
                  height={95}
                  alt="Product image"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className={styles.card__description}>
                <h3>{el.name ? el.name : ""}</h3>
                <p>{el.description ? el.description : ""}</p>
                <p>{el.code ? el.code : ""}</p>
              </div>
              <div className={styles.card__price}>
                <p>{el.price ? el.price : 0}</p>
                <button onClick={() => remove(el)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cart__footer}>
          <div className={styles.cart__total}>
            <div className={styles.total__description}>
              <h3>Subtotal</h3>
              <p>Shipping and taxes calculated at checkout</p>
            </div>
            <div className={styles.total__price}>
              <p>
                ${cart.reduce((acum, currValue) => acum + currValue.price, 0)}
              </p>
            </div>
          </div>

          <div className={styles.cart__checkout}>
            <button className={styles.checkout__btn}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}
