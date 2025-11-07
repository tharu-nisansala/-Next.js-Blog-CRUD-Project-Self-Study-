import React from "react";
import Styles from './portfolio.module.css';
import Link from "next/link";

export default function Home() {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.selectTitle}>Choose a gallery</h1>
      <div className={Styles.items}>
        <Link href="/portfolio/illustrations" className={Styles.item}>
        <span className={Styles.title}>Illustrations</span>
        </Link>  
        <Link href="/portfolio/website" className={Styles.item}>
        <span className={Styles.title}>website</span>
        </Link>  
        <Link href="/portfolio/Application" className={Styles.item}>
        <span className={Styles.title}>Application</span>
        </Link>     
      </div>
    </div>
  );
}
