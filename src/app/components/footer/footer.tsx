import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './footer.module.css';
import { faFacebook, faSquareInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return <div className={styles.footer}>
    <div className={styles.footer__content} >
      <div className={styles.footer__contentCertification}>
        <h1>Logo</h1>
        <p>Certification</p>
      </div>
      <div className={styles.footer__contentSocial}>
        <a href="#"><FontAwesomeIcon icon={faFacebook} style={{width: '3rem', height: '3rem'}}/></a>
        <a href="#"><FontAwesomeIcon icon={faSquareXTwitter} style={{width: '3rem', height: '3rem'}} /></a>
        <a href="#"><FontAwesomeIcon icon={faSquareInstagram} style={{width: '3rem', height: '3rem'}} /></a>
      </div>
    </div>
  </div>;
}
