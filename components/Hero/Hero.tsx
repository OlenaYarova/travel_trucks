import Link from "next/link";
import styles from "./Hero.module.css";

const Hero=() => {
    return (
        <div className={`container ${styles.wrapper}`}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.text}>You can find everything you want in our catalog</p>
            <Link href="/catalog" className={styles.link}>
                View now
            </Link>
            <picture>
                <source
                media="(min-width: 1440px)"
                srcSet="./image/hero_1.jpg 2x, ./image/hero_2.jpg 1x" 
                />
                <img className={styles.image}
                    width="1440"
                    height="696"
                    srcSet="/image/hero_1.jpg 2x, /image/hero_2.jpg 1x"
                    src="/image/hero_2.jpg"
                    alt="Hero image"
/>
            </picture>
        </div>
    );
};

export default Hero;