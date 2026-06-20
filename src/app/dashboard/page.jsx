"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import styles from "./page.module.css";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [status, router]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const {
    data: posts,
    error,
    isLoading,
    mutate,
  } = useSWR(
    session?.user?.name ? `/api/posts?username=${session.user.name}` : null,
    fetcher
  );

  const handleSubmition = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.user.name,
        }),
      });

      if (res.ok) {
        alert(" Post created successfully!");
        e.target.reset();
        mutate(); // 🔁 Refresh post list after new post
      } else {
        const errorData = await res.json();
        alert(" Failed to create post: " + errorData.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting post with id:", id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("🗑️ Post deleted successfully!");
        mutate(); //  Re-fetch updated list after deletion
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Something went wrong while deleting!");
    }
  };

  if (status === "loading" || isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div>
      <h1 className={styles.main}>Welcome {session?.user?.name}</h1>
      <div className={styles.container}>
        <div>
          <h3 className={styles.title}>Your Posts:</h3>

          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div className={styles.post} key={post._id}>
                <div className={styles.imgContainer}>
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={300}
                    height={220}
                  />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <h2 className={styles.desc}>{post.desc}</h2>

                <button
                  className={styles.delete}
                  onClick={() => handleDelete(post._id?.toString().trim())}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className={styles.postres}>No posts yet.</p>
          )}
        </div>

        <div className={styles.posts}>
          <form className={styles.new} onSubmit={handleSubmition}>
            <h1 className={styles.title}>Add New Post</h1>
            <input
              type="text"
              placeholder="Title"
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Description"
              className={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              className={styles.input}
            />
            <textarea
              placeholder="Content"
              className={styles.textarea}
              cols={30}
              rows={10}
              required
            ></textarea>
            <button type="submit" className={styles.btn}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
