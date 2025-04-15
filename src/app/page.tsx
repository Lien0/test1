import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBuilding,
  faTruck,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.layout}>
      <main className={styles.layout__main}>
        <div className={styles.main__title}>
          <h1 className={styles.title__1}>Bienvenidos!</h1>
          <h2 className={styles.title__2}>
            Me alegra verte aquí denuevo espero que tu visita sea muy amena y
            encuentres todo lo que estás buscando, suerte.
          </h2>
        </div>
        <div className={styles.main__btn}>
          <Link href="./pages/carnaza" className={styles.a__continue}>
            <button className={styles.btn__continue}>
              <span>Continuar</span>
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ height: "3rem" }}
                />
              </span>
            </button>
          </Link>
        </div>
        <div className={styles.main__cards}>
          <Cards
            ico={faBuilding}
            description="Contamos con más de 100 tiendas destribuidas en el estado."
          />
          <Cards
            ico={faTruck}
            description="Tenemos envios gratis a toda la república."
          />
          <Cards
            ico={faWallet}
            description="Precios que cuidarán tu bolsillo en todo momento"
          />
        </div>
      </main>
    </div>
  );
}

function Cards({
  ico,
  description,
}: {
  ico: IconDefinition;
  description: string;
}) {
  return (
    <div className={styles.cards__card}>
      <div className={styles.card__logo}>
        <div>
          <FontAwesomeIcon icon={ico} style={{ height: "9rem" }} />
        </div>
      </div>
      <div className={styles.card__descriptionContainer}>
        <p className={styles.card__description}>{description}</p>
      </div>
    </div>
  );
}
