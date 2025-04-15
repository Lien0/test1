"use client";
import Navbar from "@/app/components/navbar/navbar";
import Image, { StaticImageData } from "next/image";
import styles from "../pages.module.css";
import { deshidratadoData } from "./data";
import { useState } from "react";
import Footer from "@/app/components/footer/footer";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import Link from "next/link";

export default function Page() {
  const [cart, setCart] = useLocalStorage<
    {
      name: string;
      img: StaticImageData;
      description: string;
      code: number;
      price: number;
    }[]
  >("cartData", []);
  const [search, setSearch] = useState<string>("");
  const [cards, setCards] = useState(deshidratadoData);

  function handleSearch() {
    setCards(() =>
      deshidratadoData.filter((el: { name: string; description: string; price: number; imageUrl: StaticImageData }) =>
        el.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  useEffect(() => {
    if (search !== "") {
      const timeoutId = setTimeout(() => {
        handleSearch();
        console.log(cards);
        console.log(search);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
    else if(search === "") {
      setCards(() => deshidratadoData);
    }
  }, [search]);

  return (
    <>
      <div className={styles.home__navbar}>
        <Navbar cartOb={cart} setCartOb={setCart} setSearch={setSearch} />
      </div>
      <main className={styles.home__main}>
        <Main setCart={setCart} cards = {cards} />
      </main>
      <footer className={styles.home__footer}>
        <Footer />
      </footer>
    </>
  );
}

function Main({
  setCart,
  cards,
}: {
  
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
  cards: {
    id:number;
    name: string;
    description: string;
    price: number;
    imageUrl: StaticImageData;
  }[]
}) {
  const [pagination, setPagination] = useState(1);
  const [itemsPerPage] = useState(8);
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  function handleNextPage() {
    if (pagination < totalPages) {
      setPagination(pagination + 1);
    }
  }
  function handlePrevPage() {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  }
  return (
    <div className={styles.main__layout}>
      <aside className={styles.layout__categories}>
        <ul className={styles.categories__list}>
          <li><Link href="./carnaza" className={styles.links} >Carnaza</Link></li>
          <li><Link href="./deshidratado" className={styles.links} >Deshidratado</Link></li>
          <li><Link href="./alimento" className={styles.links} >Alimento</Link></li>
          <li><Link href="./carnaza" className={styles.links} >Carnaza</Link></li>
        </ul>
      </aside>

      <div className={styles.layout__content}>
        <div className={styles.content__cards}>
          {cards
            .slice(8 * (pagination - 1), 8 * pagination)
            .map((carnaza, index) => (
              <Cards
                carnaza={carnaza}
                setCart={setCart}
                index={index}
                key={index}
              />
            ))}
          <Pagination
            page={pagination}
            setPagination={setPagination}
            totalPages={totalPages}
            handleNext={handleNextPage}
            handlePrev={handlePrevPage}
          />
        </div>
      </div>

      <aside className={styles.layout__advertisement}>
        <div className={styles.advertisement__content}>
          <h3 className="advertising__title">Publicidad</h3>
          <p className="advertising__text">Anuncio 1</p>
          <p className="advertising__text">Anuncio 2</p>
        </div>
      </aside>
    </div>
  );
}

function Cards({
  carnaza,
  index,
  setCart,
}: {
  carnaza: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: StaticImageData;
  };
  index: number;
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
}) {
  function addToCart(
    name: string,
    img: StaticImageData,
    description: string,
    code: number,
    price: number
  ) {
    setCart((prev) => [
      ...prev,
      {
        name: name,
        img: img,
        description: description,
        code: code,
        price: price,
      },
    ]);
  }
  return (
    <div className={styles.cards__card} key={index}>
      <div className={styles.card__img}>
        <Image
          src={carnaza.imageUrl}
          height={200}
          width={200}
          alt={carnaza.name}
          style={{
            borderRadius: "10px",
            height: "100%",
            width: "95%",
          }}
        />
      </div>
      <div className={styles.card__description}>
        <div className={styles.description__text}>
          <h3 className={styles.card__title}>{carnaza.name}</h3>
          <p className={styles.card__text}>{carnaza.description}</p>
        </div>
        <p className={styles.card__price}>${carnaza.price}</p>
      </div>
      <div className={styles.card__btns}>
        <button
          className={styles.card__btn}
          onClick={() =>
            addToCart(
              carnaza.name,
              carnaza.imageUrl,
              carnaza.description,
              carnaza.id,
              carnaza.price
            )
          }
        >
          Agregar al carrito
        </button>
        <button className={styles.card__btn}>Ver más</button>
      </div>
    </div>
  );
}

function Pagination({
  page,
  setPagination,
  totalPages,
  handleNext,
  handlePrev,
}: {
  page: number;
  setPagination: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  handleNext: () => void;
  handlePrev: () => void;
}) {
  return (
    <div className={styles.pagination__container}>
      <button onClick={handlePrev} className={styles.pagination__btn}>
        Anterior
      </button>
      <div className={styles.pagination__pages}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={
              page === i + 1
                ? styles.pagination__btnNumberActive
                : styles.pagination__btnNumber
            }
            onClick={() => setPagination(() => i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button onClick={handleNext} className={styles.pagination__btn}>
        Siguiente
      </button>
    </div>
  );
}
