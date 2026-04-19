import Link from "next/link";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={`container ${styles.wrapper}`}>
      <h1 className={styles.title}>Campers of your dreams</h1>
      <p className={styles.text}>
        You can find everything you want in our catalog
      </p>
      <Link href="/catalog" className={styles.link}>
        View now
      </Link>
      <picture>
        <source
          type="image/webp"
          srcSet="/image/hero_2.webp 1x, /image/hero_1.webp 2x"
        />
        <img
          className={styles.image}
          width="1440"
          height="696"
          src="/image/hero_2.webp"
          srcSet="/image/hero_2.webp 1x, /image/hero_1.webp 2x"
          alt="Hero image"
        />
      </picture>
    </div>
  );
};

export default Hero;
