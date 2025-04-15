"use client";
import {
  faCartShopping,
  faLanguage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { StaticImageData } from "next/image";
import CartNav from "./cart";

export default function Navbar({
  cartOb,
  setCartOb,
  setSearch,
}: {
  cartOb: {
    name: string;
    img: StaticImageData;
    description: string;
    code: number;
    price: number;
  }[];
  setCartOb: React.Dispatch<React.SetStateAction<
    {
      name: string;
      img: StaticImageData;
      description: string;
      code: number;
      price: number;
    }[]
  >>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [sear, setSear] = useState(true);
  const [cart, setCart] = useState(false);

  function handleFocus() {
    setSear(() => false);
  }
  function handleBlur() {
    setSear(() => true);
  }

  function showCart() {
    setCart(() => !cart);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar__top}>
          <div className={styles.top__language}>
            <span className={styles.language__ico}>
              <FontAwesomeIcon
                icon={faLanguage}
                style={{ height: "2.6rem", color: "white" }}
              />
            </span>
            <select
              name="language"
              id="language"
              className={styles.language__select}
              defaultValue=""
            >
              <option value="" disabled hidden></option>
              <option value="español">Español</option>
              <option value="ingles">Ingles</option>
              <option value="aleman">Aleman</option>
            </select>
          </div>
          <div className={styles.top__btns}>
            <p>
              <Link className={styles.none} href={""}>
                Sign In
              </Link>{" "}
            </p>
            <p>
              <Link className={styles.none} href={""}>
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <div className={styles.navbar__bottom}>
          <div className={styles.bottom__logo}> <Link href="../../" className={styles.none} style={{fontSize:"3rem"}} >⚛️</Link></div>
          <div className={styles.bottom__search}>
            <input
              className={styles.search__input}
              type="search"
              name="search"
              id="search"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className={styles.search__ico}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ height: "2rem", opacity: `${sear ? ".4" : "0"}` }}
              />
            </span>
            <label className={styles.search__label} htmlFor="search">
              Search
            </label>
          </div>
          <div className={styles.bottom__car}>
            <button onClick={showCart}>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ height: "2rem" }}
              />
            </button>
          </div>
        </div>
      </nav>
      <div className={cart ? styles.cartNav : styles.cartNav__after}>
        <CartNav setCard={showCart} setCart={setCartOb} cart={cartOb} />
      </div>
    </>
  );
}
