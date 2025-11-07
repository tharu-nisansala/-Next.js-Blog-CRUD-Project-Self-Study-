"use client"

import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // ✅ NextAuth credentials login
    const res = await signIn("credentials", {
      redirect: false, // false = don't auto redirect
      email,
      password,
    });

    if (res?.error) {
      setErr(true);
    } else {
      router.push("/dashboard"); // login success redirect
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" className={styles.input} required />
        <input type="password" name="password" placeholder="Password" className={styles.input} required />
        <button className={styles.btn}>Login</button>
      </form>
      {err && <p style={{ color: "red" }}>Email or Password is incorrect!</p>}
      <p>
        Don't have an account? <Link href="/dashboard/register">Register here</Link>
      </p>
    </div>
  );
}
