import Link from 'next/link'
import React from 'react'
import styles from './blog.module.css';
import Image from 'next/image';

async function getData() {
  const res = await fetch('http://localhost:3000/api/posts',{
    cache:"no-store"
  });
  
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function blog() {

  const data = await getData();

  return (
    <div className={styles.mainContainer}>
       {data.map((item) => (
        <Link href={`/blog/${item._id}`} className={styles.container} key={item._id}>
        <div  className={styles.imageContainer}>
            <Image src={item.img || "https://via.placeholder.com/400x250"} alt='' width={400} height={250} className={styles.img}/>
        </div>
        <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
        </div> 
        </Link>
         ))}
    </div>
  )
}
