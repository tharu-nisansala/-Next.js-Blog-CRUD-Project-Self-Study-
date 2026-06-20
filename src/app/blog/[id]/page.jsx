import Image from "next/image";
import React from "react";
import styles from "./page.module.css";

// Fetch single post data by ID
async function getData(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null; // Prevent crash if data is not fetched
  }
  
}

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { id } = await params; // Must await in Next.js 15+
  const post = await getData(id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "We couldn’t load this blog post.",
    };
  }

  return {
    title: post.title,
    description: post.desc,
  };
}
// Main Component
export default async function Post({ params }) {
  const { id } = await params; // `params` is a Promise in Next.js 15/16
  const data = await getData(id);

  if (!data) {
    return (
      <div className={styles.error}>
        <h2>Post not found</h2>
        <p>We couldn’t load the post right now. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.containerr}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.desc}</p>

          <div className={styles.author}>
            <Image
              src={data.img || "https://via.placeholder.com/40"}
              alt="Author avatar"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>
              {data.username || "Unknown Author"}
            </span>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src={
              data.img ||
              "https://images.pexels.com/photos/34048430/pexels-photo-34048430.jpeg"
            }
            alt={data.title || "Blog image"}
            fill
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
    </div>
  );
}
