import styles from "../styles";
import Button from "./Button";

const CTA = () => ( 
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Get started with Service Nexus today!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Everything you need to find, book, and manage top-rated services—anytime, anywhere.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <Button styles={{}} />
    </div>
  </section>
);

export default CTA;
