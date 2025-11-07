import React from "react";
import styles from "./catagory.module.css";
import Button from "@/components/button/Button";
import Image from "next/image";

export default async function Category({ params }) {
  const { category } = await params;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{category}</h1>

      <div className={styles.item}>
        <div className={styles.content}>
          <h1 className={styles.subtitle}>Test</h1>
          <p className={styles.desc}>Description of the category goes here.</p>
          <Button text="See More" url="#" />
        </div>

        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src="https://images.pexels.com/photos/34505700/pexels-photo-34505700.jpeg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Category Image"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.content}>
          <h1 className={styles.subtitle}>Test</h1>
          <p className={styles.desc}>Description of the category goes here.</p>
          <Button text="See More" url="#" />
        </div>

        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src="https://images.pexels.com/photos/34505700/pexels-photo-34505700.jpeg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Category Image"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.content}>
          <h1 className={styles.subtitle}>Test</h1>
          <p className={styles.desc}>Description of the category goes here.</p>
          <Button text="See More" url="#" />
        </div>

        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src="https://images.pexels.com/photos/34505700/pexels-photo-34505700.jpeg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Category Image"
          />
        </div>
      </div>
    </div>
  );
}
